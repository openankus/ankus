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
import org.openflamingo.el.ELEvaluator;
import org.openflamingo.el.ELService;
import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.engine.context.ActionContext;
import org.openflamingo.engine.context.WorkflowContext;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.engine.util.FileWriter;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.rest.WorkflowHistory;
import org.openflamingo.util.FileSystemUtils;
import org.quartz.JobDataMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;

import java.util.Properties;

/**
 * Before After Interceptor를 지원하는 Around Handler.
 * 이 Handler는 Action의 실행 상태를 persistenct object를 통해 관리하고 작업의 예외 발생 유무를 모니터링한다.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public abstract class DefaultHandler<T> implements Handler<T> {

    /**
     * SLF4J Logging
     */
    protected Logger logger = LoggerFactory.getLogger(DefaultHandler.class);

    /**
     * Action Context.
     */
    protected ActionContext actionContext;

    /**
     * Expression Language Evaluator
     */
    protected ELEvaluator evaluator;

    /**
     * 로그 저장을 위한 File Writer
     */
    protected FileWriter fileWriter;

    /**
     * Action Base Path
     */
    protected String actionBasePath;

    /**
     * 액션 실행시 생성되는 로그파일의 절대 경로
     */
    protected String logPath;

    /**
     * Handler가 실행되기 직전에 호출되는 콜백.
     */
    abstract void before();

    /**
     * Global Variable
     */
    protected Properties globalVariables;

    @Override
    public void execute(WorkflowContext context) {
        this.actionContext = context.getCurrentActionContext();

        ELService service = this.actionContext.getWorkflowContext().getBean(ELService.class);
        this.evaluator = service.createEvaluator();
        this.globalVariables = actionContext.getWorkflowContext().getGlobalVariables();

        this.actionBasePath = ActionBasePathGenerator.getActionBasePath(actionContext);
        FileSystemUtils.testCorrentAndCreateDir(actionBasePath);

        this.logPath = actionBasePath + "/action.log";

        long actionLogMaxSize = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().getLong("action.log.max.size");
        this.fileWriter = new FileWriter(logger, logPath, actionLogMaxSize);

        try {
            actionContext.changeState(State.PREPARE);
            before();

            actionContext.changeState(State.RUNNING);
            executeInternal();

            after();
            actionContext.changeState(State.SUCCESS);
        } catch (Exception ex) {
            actionContext.setObject(JobVariable.ACTION_EXCEPTION, ex);
            fail();
            String message = MessageFormatter.format("Cannot execute '{}' of action", new String[]{
                    context.getCurrentActionDescription()
            }).getMessage();
            throw new WorkflowException(message, ex);
        } finally {
            if (fileWriter != null) {
                try {
                    fileWriter.close();
                } catch (Exception ex) {
                }
            }
        }
    }

    /**
     * Handler가 실행된 직후에 호출되는 콜백.
     */
    abstract void after();

    /**
     * Action을 실행한다.
     */
    abstract void executeInternal() throws Exception;

    /**
     * Action Handler 실행중 에러가 발생한 경우 에러를 처리한다.
     */
    private void fail() {
        try {
            actionContext.changeState(State.FAIL);
        } catch (Exception fe) {
            logger.warn("Action의 상태를 Fail로 기록할 수 없습니다. Data Store가 정상적이지 않을 수 있습니다.", fe);
        }
    }

    /**
     * 입력한 메시지가 공백 문자를 한 개 이상 포함하고 있다면 double quote를 붙인다.
     *
     * @param message 메시지
     * @return double quote를 붙인 메시지
     */
    public String wrapDoubleQuote(String message) {
        if (org.springframework.util.StringUtils.countOccurrencesOf(message, " ") > 0) {
            return "\"" + message + "\"";
        }
        return message;
    }

    /**
     * 지정한 Key의 값을 <tt>flamingo-site.xml</tt> 파일에서 찾아서 반환한다.
     *
     * @param key <tt>flamingo-site.xml</tt> 파일에서 환경설정을 식별하는 key의 이름
     * @return <tt>flamingo-site.xml</tt> 파일에서 환경설정을 식별하는 key의 값
     */
    public static String getFlamingoConf(String key) {
        return ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get(key);
    }

    /**
     * Quartz Job Scheduler의 Job Data Map을 반환한다.
     *
     * @return Job Data Map
     */
    public JobDataMap getJobDataMap() {
        return actionContext.getWorkflowContext().getSchedulerContext().getJobExecutionContext().getMergedJobDataMap();
    }

    /**
     * Action History를 반환한다.
     *
     * @return Action History
     */
    public ActionHistory getActionHistory() {
        return (ActionHistory) actionContext.getObject(JobVariable.ACTION_HISTORY);
    }

    /**
     * Workflow History를 반환한다.
     *
     * @return Workflow History
     */
    public WorkflowHistory getWorkflowHistory() {
        return (WorkflowHistory) actionContext.getWorkflowContext().getObject(JobVariable.WORKFLOW_HISTORY);
    }

    /**
     * Handler 자체 로그 파일에 로그를 기록한다.
     *
     * @param pattern 로그 패턴
     * @param args    로그 패턴에서 사용하는 변수의 값
     */
    public void log(String pattern, Object... args) {
        String message = MessageFormatter.arrayFormat(pattern, args).getMessage();
        fileWriter.log(message);
    }

    /**
     * Handler 자체 로그 파일에 로그를 기록한다.
     *
     * @param isLogging 시스템 로그에 기록을 남길지 여부 (<tt>true</tt>인 경우 시스템 로그에도 같이 기록을 남김)
     * @param pattern   로그 패턴
     * @param args      로그 패턴에서 사용하는 변수의 값
     */
    public void log(boolean isLogging, String pattern, Object... args) {
        String message = MessageFormatter.arrayFormat(pattern, args).getMessage();
        fileWriter.log(message);
        if (isLogging) {
            logger.info("{}", message);
        }
    }

    /**
     * Handler 자체 로그 파일에 로그를 기록한다.
     *
     * @param message 로그에 기록할 메시지
     */
    public void log(String message) {
        fileWriter.log(message);
    }
}
