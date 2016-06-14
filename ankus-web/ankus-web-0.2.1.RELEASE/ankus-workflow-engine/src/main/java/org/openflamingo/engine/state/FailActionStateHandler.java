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
import org.openflamingo.engine.history.ActionHistoryService;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.State;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Action의 상태가 Fail 상태인 경우 상태값을 처리하는 핸들러.
 * Action의 상태가 Fail인 상태는 Action의 실행 로그 정보를 추가하는 작업부터 시작한다.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
@Component
public class FailActionStateHandler implements ActionStateHandler {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(FailActionStateHandler.class);

    @Override
    public ActionHistory changeStatus(ActionContext actionContext) {
        logger.trace("Action의 상태를 Fail 상태로 전환합니다.");

        ActionHistory actionHistory = (ActionHistory) actionContext.getObject(JobVariable.ACTION_HISTORY);
        actionHistory.setStatus(State.FAIL);
        actionHistory.setEndDate(new Date());
        actionHistory.setElapsed(DateUtils.getDiffSeconds(actionHistory.getEndDate(), actionHistory.getStartDate()));
        actionHistory.setCause(actionContext.getException().getMessage());
        actionHistory.setException(ExceptionUtils.getFullStackTrace(actionContext.getException()));
        actionHistory.setCause(actionContext.getException().getMessage().length() > 200 ? actionContext.getException().getMessage().substring(0, 200) : actionContext.getException().getMessage());
        actionContext.getWorkflowContext().getBean(ActionHistoryService.class).update(actionHistory);
        actionContext.setObject(JobVariable.ACTION_HISTORY, actionHistory);

        logger.trace("Action '{}({})'의 상태를 Fail으로 변경하였습니다.", actionHistory.getActionName(), actionHistory.getId());
        logger.trace("상태를 변경한 Action 정보는 다음과 같습니다.\n{}", actionHistory);
        return actionHistory;
    }
}
