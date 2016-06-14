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
package org.openflamingo.engine.state;

import org.openflamingo.engine.context.ActionContext;
import org.openflamingo.engine.context.WorkflowContext;
import org.openflamingo.engine.history.ActionHistoryService;
import org.openflamingo.engine.history.WorkflowHistoryRepository;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.rest.WorkflowHistory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Action의 상태가 Prepare 상태인 경우 상태값을 처리하는 핸들러.
 * Action의 상태가 Prepare인 상태는 Action의 실행 로그 정보를 추가하는 작업부터 시작한다.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
@Component
public class PrepareActionStateHandler implements ActionStateHandler {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(PrepareActionStateHandler.class);

    @Override
    public ActionHistory changeStatus(ActionContext actionContext) {
        logger.trace("Action의 상태를 Prepare 상태로 전환합니다.");

        // 시스템의 ID를 추가한다.

        ActionHistory actionHistory = new ActionHistory();
        actionHistory.setActionName(actionContext.getActionDescription());
        actionHistory.setWorkflowName(actionContext.getWorkflowContext().getWorkflowDomain().getWorkflowName());
        actionHistory.setJobName(actionContext.getWorkflowContext().getWorkflowDomain().getWorkflowName());
        actionHistory.setStartDate(new Date());
        actionHistory.setStatus(State.PREPARE);
        actionHistory.setUsername(actionContext.getWorkflowContext().getWorkflowDomain().getUsername());
        actionHistory.setJobId(Long.parseLong(actionContext.getWorkflowContext().getGlobalVariables().getProperty("JOB_ID")));
        actionHistory.setJobStringId(actionContext.getWorkflowContext().getGlobalVariables().getProperty("JOB_STRING_ID"));
        actionHistory.setWorkflowId(actionContext.getWorkflowContext().getWorkflowDomain().getWorkflowId());
        actionHistory.setTotalStep(Integer.parseInt(actionContext.getWorkflowContext().getValue(JobVariable.TOTAL_STEPS)));
        actionHistory.setCurrentStep(Integer.parseInt(actionContext.getWorkflowContext().getValue(JobVariable.CURRENT_STEP)));
        actionContext.setObject(JobVariable.ACTION_HISTORY, actionHistory);

        ActionHistory inserted = actionContext.getWorkflowContext().getBean(ActionHistoryService.class).insert(actionHistory);
        actionContext.setObject(JobVariable.ACTION_HISTORY, inserted);

        updateWorkflowStep(actionContext);

        logger.trace("Action '{}({})'의 상태를 Prepare로 변경하였습니다.", actionContext.getActionName(), inserted.getId());
        logger.trace("상태를 변경한 Action 정보는 다음과 같습니다.\n{}", inserted);
        return inserted;
    }

    /**
     * 현재 실행중인 Step의 정보를 업데이트 한다.
     *
     * @param actionContext {@link org.openflamingo.engine.context.ActionContext}
     */
    private void updateWorkflowStep(ActionContext actionContext) {
        int totalStep = Integer.parseInt(actionContext.getWorkflowContext().getValue(JobVariable.TOTAL_STEPS));
        int currentStep = Integer.parseInt(actionContext.getWorkflowContext().getValue(JobVariable.CURRENT_STEP));

        WorkflowContext workflowContext = actionContext.getWorkflowContext();
        WorkflowHistory workflowHistory = (WorkflowHistory) workflowContext.getObject(JobVariable.WORKFLOW_HISTORY);
        workflowHistory.setCurrentStep(currentStep);
        workflowHistory.setTotalStep(totalStep);
        workflowHistory.setCurrentAction(workflowContext.getCurrentActionDescription());
        workflowContext.getBean(WorkflowHistoryRepository.class).update(workflowHistory);
    }

}
