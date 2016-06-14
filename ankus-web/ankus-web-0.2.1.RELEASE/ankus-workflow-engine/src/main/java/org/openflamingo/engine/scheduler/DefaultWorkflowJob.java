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
package org.openflamingo.engine.scheduler;

import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.context.ActionContext;
import org.openflamingo.engine.context.ActionContextImpl;
import org.openflamingo.engine.context.WorkflowContext;
import org.openflamingo.engine.handler.ActionHandlerRegistry;
import org.openflamingo.engine.handler.Handler;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.workflow.ActionType;
import org.openflamingo.model.workflow.BaseType;
import org.openflamingo.util.ReflectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;

import java.lang.reflect.Constructor;
import java.util.List;

/**
 * Quartz Job Scheduler 기반 Workflow Job.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class DefaultWorkflowJob extends DefaultQuartzJob {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(DefaultWorkflowJob.class);

    @Override
    public void executeInternal(WorkflowContext workflowContext) {
        logger.info("==========================================================");
        logger.info("'{}({})'을 시작합니다.", workflowContext.getWorkflowDomain().getWorkflowName(), workflowContext.getWorkflowDomain().getId());
        logger.info("==========================================================");

        // Workflow Execution Planner는 Workflow XML을 DAG에 따라서 실행 순서를 결정한다.
        List<String> actions = workflowContext.getExecutionPlanner().getNamesOfActions();
        workflowContext.setValue(JobVariable.TOTAL_STEPS, String.valueOf(actions.size()));
        workflowContext.setValue(JobVariable.CURRENT_STEP, "1");

        // 실행 상태로 변경한다.
        workflowContext.changeState(State.RUNNING);

        // 실행할 순서가 결정되면 순차적으로 하나씩 실행한다.
        Integer currentPos = 1;
        for (String action : actions) {
            // Context에 현재 노드의 위치 정정보를 기록한다.
            Object type = workflowContext.getExecutionPlanner().getActionMap().get(action);
            workflowContext.setValue(JobVariable.ACTION_CURRENT, action);
            workflowContext.setValue(JobVariable.ACTION_CURRENT_DESC, ((BaseType) type).getDescription());
            workflowContext.setValue(JobVariable.CURRENT_STEP, String.valueOf(currentPos));

            // 실행할 노드의 Model 정보를 추출하여 Model을 유형별로 처리한다.
            Object node = workflowContext.getExecutionPlanner().getActionMap().get(action);
            Object current = null;
            if (node instanceof ActionType) { // Start End를 제외한 모든 노드는 Action Type이다.
                ActionType actionType = (ActionType) node;
                if (actionType.getMapreduce() != null && actionType.getMapreduce().size() > 0) {
                    current = actionType.getMapreduce().get(0);
                } else if (actionType.getShell() != null && actionType.getShell().size() > 0) {
                    current = actionType.getShell().get(0);
                } else if (actionType.getPig() != null && actionType.getPig().size() > 0) {
                    current = actionType.getPig().get(0);
                } else if (actionType.getHive() != null && actionType.getHive().size() > 0) {
                    current = actionType.getHive().get(0);
                } else if (actionType.getJava() != null && actionType.getJava().size() > 0) {
                    current = actionType.getJava().get(0);
                }
            } else {
                current = node;
            }

            String actionName = workflowContext.getValue(JobVariable.ACTION_CURRENT_DESC);
            logger.debug("실행할 노드 '{}'을 처리하는 Handler는 '{}'입니다.", actionName, current.getClass().getName());
            Class clazz = ActionHandlerRegistry.getClass(current);

            // 노드를 수행하는 Action Handler는 반드시 Object를 인자로 받는 생성자를 가져야 한다.
            if (!ReflectionUtils.hasConstructor(clazz, new Class[]{Object.class})) {
                String message = MessageFormatter.format("Workflow의 '{}' 노드를 처리하는 Handler를 찾을 수 없습니다.", actionName).getMessage();
                throw new WorkflowException(message);
            }

            try {
                logger.info("Workflow의 '{}' 노드를 실행합니다.", actionName);
                Constructor constructor = clazz.getConstructor(Object.class);
                ActionContext actionContext = new ActionContextImpl(workflowContext);
                workflowContext.getActionContexts().put(action, actionContext);
                Handler handler = (Handler) constructor.newInstance(current);
                handler.execute(workflowContext);
                logger.info("Workflow의 '{}' 노드를 정상적으로 실행하였습니다.", actionName);
            } catch (Exception ex) {
                workflowContext.setObject(JobVariable.WORKFLOW_EXCEPTION, ex);
                workflowContext.changeState(State.FAIL);

                String message = MessageFormatter.format("Workflow의 Action '{}' 을 실행할 수 없습니다.", actionName).getMessage();
                throw new WorkflowException(message, ex);
            }
            currentPos++;
        }
    }
}
