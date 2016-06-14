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
package org.openflamingo.engine.context;

import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.workflow.BaseType;

import java.util.HashMap;
import java.util.Map;

/**
 * Workflow를 구성하는 Action의 상태를 관리하는 Context.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class ActionContextImpl extends DefaultActionContext {

    /**
     * 기본 생성자. 외부에서 직접 호출 불가.
     */
    private ActionContextImpl() {
    }

    /**
     * 기본 생성자.
     *
     * @param workflowContext Workflow Context
     */
    public ActionContextImpl(WorkflowContext workflowContext) {
        this.workflowContext = workflowContext;
        this.actionName = workflowContext.getValue(JobVariable.ACTION_CURRENT);
        this.params = new HashMap<String, Object>();
        this.model = workflowContext.getCurrentActionModel();
    }

    @Override
    public long getActionId() {
        return actionHistory.getId();
    }

    @Override
    public String getActionName() {
        return ((BaseType) model).getName();
    }

    @Override
    public String getActionDescription() {
        return ((BaseType) model).getDescription();
    }

    @Override
    public State getActionState() {
        return workflowContext.getCurrentActionContext().getActionState();
    }

    @Override
    public Map<String, String> getVariables() {
        return workflowContext.getCurrentActionContext().getVariables();
    }

}
