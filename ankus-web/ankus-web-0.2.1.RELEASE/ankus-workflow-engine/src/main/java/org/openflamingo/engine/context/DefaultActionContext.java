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

import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.engine.state.ActionStateHandler;
import org.openflamingo.engine.state.ActionStateRegistry;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.State;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;

import java.util.Map;

/**
 * Workflow를 구성하는 Action의 상태를 관리하는 기본 기능을 제공하는 Context 구현체.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public abstract class DefaultActionContext implements ActionContext {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(DefaultActionContext.class);

    /**
     * Action의 실행 이력
     */
    protected ActionHistory actionHistory;

    /**
     * Object Model
     */
    protected Object model;

    /**
     * Workflow Context
     */
    protected WorkflowContext workflowContext;

    /**
     * 현재 수행중인 Action Name
     */
    protected String actionName;

    /**
     * Key Value Param
     */
    protected Map<String, Object> params;

    @Override
    public void changeState(State state) {
        ActionStateHandler actionStateHandler = ActionStateRegistry.getActionStateHandler(state);
        if (actionStateHandler == null) {
            throw new WorkflowException(MessageFormatter.format("Action의 상태 '{}'을 처리하는 handler가 등록되어 있지 않습니다.", state.toString()).getMessage());
        }
        logger.trace("Action의 상태를 Action Handler '{}'을 이용하여 변경합니다.", actionStateHandler.getClass().getName());
        this.actionHistory = actionStateHandler.changeStatus(this);
        logger.trace("Action의 실행 이력 정보는 다음과 같습니다.\n{}", this.actionHistory);
    }

    @Override
    public Object getActionModel() {
        return this.model;
    }

    @Override
    public WorkflowContext getWorkflowContext() {
        return this.workflowContext;
    }

    @Override
    public Exception getException() {
        return (Exception) getObject(JobVariable.ACTION_EXCEPTION);
    }

    @Override
    public String getValue(String key) {
        return (String) params.get(key);
    }

    @Override
    public Object getObject(String key) {
        return params.get(key);
    }

    @Override
    public void setValue(String key, String value) {
        setObject(key, value);
    }

    @Override
    public void setObject(String key, Object object) {
        params.put(key, object);
    }
}
