/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.openflamingo.engine.handler;

import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.history.ActionHistoryService;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.engine.util.ManagedProcess;
import org.openflamingo.engine.util.WorkflowUtils;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.workflow.Shell;
import org.openflamingo.model.workflow.Variable;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.StringUtils;

import java.util.*;

/**
 * Shell based Command 실행하는 핸들러.
 *
 * @author Byoung Gon, Kim
 * @since 0.4
 */
public class ShellHandler extends ELSupportHandler<Shell> {

    /**
     * Workflow의 Shell Action
     */
    protected Shell shell;

    /**
     * 기본 생성자.
     *
     * @param shell Workflow의 Shell Action
     */
    public ShellHandler(Object shell) {
        this.shell = (Shell) shell;
    }

    @Override
    void before() {
    }

    @Override
    void after() {
    }

    @Override
    void executeInternal() throws Exception {
        log(true, "-------------------------------------------");
        log(true, "Script Job");
        log(true, "-------------------------------------------");

        log(true, "Workflow ID   : {}", this.actionContext.getWorkflowContext().getWorkflowId());
        log(true, "Workflow Name : {}", this.actionContext.getWorkflowContext().getWorkflowDomain().getWorkflowName());
        log(true, "Action ID     : {}", this.actionContext.getActionId());
        log(true, "Action Name   : {}", this.actionContext.getActionDescription());
        log(true, "Base Path     : {}", actionBasePath);

        log(true, "-------------------------------------------");
        if (globalVariables != null) {
            if (globalVariables.size() > 0) {
                log(true, "Global Variables     :");
                Set<Object> keys = globalVariables.keySet();
                for (Iterator<Object> iterator = keys.iterator(); iterator.hasNext(); ) {
                    String key = (String) iterator.next();
                    log(true, "\t{} = {}", key, globalVariables.getProperty(key));
                }
            }
        }

        StringBuilder commandBuilder = new StringBuilder();
        commandBuilder.append(get(shell.getPath()));
        Properties scriptVars = new Properties();
        if (shell.getArgs() != null) {
            log(true, "-------------------------------------------");
            List<Variable> vars = shell.getArgs().getVariable();
            if (vars.size() > 0) {
                log(true, "Script Variables     :");
                for (Variable var : vars) {
                    String evaluatedValue = get(var.getValue());
                    log(true, "\t{} = {}", var.getName(), get(var.getValue()));
                    scriptVars.put(var.getName(), get(var.getValue()));
                }
            }
        }

        if (shell.getEnvs() != null) {
            log(true, "-------------------------------------------");
            List<Variable> vars = shell.getEnvs().getVariable();
            if (vars.size() > 0) {
                log(true, "Environments  :");
                for (Variable var : vars) {
                    log(true, "\t{} = {}", var.getName(), get(var.getValue()));
                }
            }
        }

        if (shell.getCommand() != null) {
            log(true, "-------------------------------------------");
            List<Variable> vars = shell.getCommand().getVariable();
            if (vars.size() > 0) {
                log(true, "Parameters  :");
                for (Variable var : vars) {
                    log(true, "\t{} = {}", var.getName(), get(var.getValue()));
                }
            }
        }

        // 쉘 스크립트를 평가하고 평가한 결과를 파일로 저장한다.
        String evaluatedScript = get(shell.getScript(), scriptVars);
        String targetFilePath = actionBasePath + "/script.sh";
        FileSystemUtils.saveToFile(evaluatedScript.getBytes(), targetFilePath);
        List<String> command = buildCommand(targetFilePath);

        log(true, "-------------------------------------------");
        log(true, "Shell Script  :\n\n{}", evaluatedScript);

        log(true, "-------------------------------------------");
        String commandline = StringUtils.collectionToDelimitedString(command, " ");
        log(true, "Command : {}", commandline);
        log(true, "-------------------------------------------");

        // 액션 이력을 업데이트 한다.
        ActionHistory actionHistory = getActionHistory();
        actionHistory.setLogPath(logPath);
        actionHistory.setScript(evaluatedScript);
        actionHistory.setCommand(commandline);
        actionContext.getWorkflowContext().getBean(ActionHistoryService.class).update(actionHistory);
        actionContext.setObject(JobVariable.ACTION_HISTORY, actionHistory);

        // 프로세스를 시작한다.
        try {
            ManagedProcess managedProcess = new ManagedProcess(
                    command,
                    getEnv(),
                    StringUtils.isEmpty(this.shell.getWorking()) ? actionBasePath : this.shell.getWorking(),
                    logger,
                    fileWriter
            );
            managedProcess.run();
        } catch (Exception e) {
            throw new WorkflowException(ExceptionUtils.getMessage("Cannot execute shell program : " + e.getMessage()), e);
        }
    }

    @Override
    public Shell getModel() {
        return this.shell;
    }

    /**
     * Hadoop MapReduce Job을 실행시키기 위한 커맨드 라인을 구성한다.
     *
     * @return Hadoop MapReduce Job을 실행시키기 위한 커맨드 라인
     */
    private List<String> buildCommand(String targetFilePath) {
        List<String> command = new LinkedList<String>();

        command.add(get(shell.getPath()));
        command.add(targetFilePath);

        List<Variable> cmds = this.shell.getCommand().getVariable();
        for (Variable cmd : cmds) {
            command.add(wrapDoubleQuote(get(cmd.getValue())));
        }

        return command;
    }

    /**
     * 환경 변수를 Key Value로 구성한다.
     *
     * @return Key Value로 구성되어 있는 쉘의 환경 변수 목록
     */
    private Map<String, String> getEnv() {
        if (shell.getEnvs() != null) {
            List<Variable> vars = shell.getEnvs().getVariable();
            return WorkflowUtils.variablesToMap(vars, this.evaluator);
        }
        return new HashMap<String, String>();
    }
}
