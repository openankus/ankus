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

import org.openflamingo.engine.context.WorkflowContext;
import org.openflamingo.engine.history.WorkflowHistoryRepository;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.model.rest.WorkflowHistory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Workflow의 상태가 Prepare 상태인 경우 상태값을 처리하는 핸들러.
 * Workflow의 상태가 Prepare인 상태는 Workflow의 실행 로그 정보를 추가하는 작업부터 시작한다.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
@Component
public class PrepareWorkflowStateHandler implements WorkflowStateHandler {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(PrepareWorkflowStateHandler.class);

    @Override
    public WorkflowHistory changeStatus(WorkflowContext workflowContext) {
        logger.trace("Workflow의 상태를 Prepare 상태로 전환합니다.");
        Workflow workflowDomain = (Workflow) workflowContext.getObject(JobVariable.WORKFLOW);

        // 워크플로우 실행 이력의 기본 정보를 Persistence Storage에 기로한다.
        WorkflowHistory workflowHistory = new WorkflowHistory();
        workflowHistory.setWorkflowId(workflowDomain.getWorkflowId());
        workflowHistory.setWorkflowName(workflowDomain.getWorkflowName());
        workflowHistory.setWorkflowXml(workflowDomain.getWorkflowXml());
        workflowHistory.setJobName(workflowDomain.getWorkflowName());
        workflowHistory.setVariables(workflowDomain.getVariables());
        workflowHistory.setJobId(Long.parseLong(workflowContext.getGlobalVariables().getProperty("JOB_ID")));
        workflowHistory.setJobStringId(workflowContext.getGlobalVariables().getProperty("JOB_STRING_ID"));
        workflowHistory.setUsername(workflowContext.getWorkflowDomain().getUsername());
        workflowHistory.setJobType(workflowContext.getGlobalVariables().getProperty("JOB_TYPE"));
        workflowHistory.setVariables(workflowContext.getWorkflowDomain().getVariables());
        workflowHistory.setStatus(State.PREPARE);
        workflowHistory.setStartDate(new Date());
        WorkflowHistoryRepository workflowHistoryRepository = workflowContext.getBean(WorkflowHistoryRepository.class);
        workflowHistoryRepository.insert(workflowHistory);

        // Scheduler Context에 워크플로우 실행 이력을 보관한다.
        workflowContext.setObject(JobVariable.WORKFLOW_HISTORY, workflowHistory);

        logger.trace("Workflow '{}({})'의 상태를 Prepare로 변경하였습니다.", workflowDomain.getWorkflowName(), workflowDomain.getId());
        logger.trace("상태를 변경한 Workflow 정보는 다음과 같습니다.\n{}", workflowHistory);
        return workflowHistory;
    }

}