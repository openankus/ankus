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

import org.openflamingo.model.rest.State;

import java.util.Map;

/**
 * Workflow를 구성하는 Action의 상태를 관리하는 Context.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface ActionContext {

    /**
     * Action의 ID를 반환한다. Action의 ID는 초기화 한
     *
     * @return Action의 ID
     */
    long getActionId();

    /**
     * Action의 이름을 반환한다.
     *
     * @return Action의 이름
     */
    String getActionName();

    /**
     * Action의 설명을 반환한다.
     *
     * @return Action의 설명
     */
    String getActionDescription();

    /**
     * Action의 상태를 변경한다.
     *
     * @param state 액션의 상태
     */
    void changeState(State state);

    /**
     * 현재 동작중인 Action의 상태를 반환한다.
     *
     * @return Action의 상태
     */
    State getActionState();

    /**
     * Action의 Resolved Variable을 반환한다.
     *
     * @return Action의 Variable
     */
    Map<String, String> getVariables();

    /**
     * Exception이 발생했을 때 Exception을 반환하다.
     *
     * @return Exception
     */
    Exception getException();

    /**
     * Workflow의 상태를 관리하는 Context 정보를 반환한다.
     *
     * @return Workflow Context
     */
    WorkflowContext getWorkflowContext();

    /**
     * Workflow XML의 Action Model 정보를 반환한다.
     *
     * @return Action Model
     */
    Object getActionModel();

    /**
     * 지정한 Key에 대한 문자열을 반환한다.
     *
     * @param key Key
     * @return Value
     */
    String getValue(String key);

    /**
     * 지정한 Key에 대한 객체를 반환한다.
     *
     * @param key Key
     * @return Value
     */
    Object getObject(String key);

    /**
     * 지정한 Key로 값을 설정한다.
     *
     * @param key   Key
     * @param value Value
     */
    void setValue(String key, String value);

    /**
     * 지정한 Key로 객체를 설정한다.
     *
     * @param key    Key
     * @param object Object
     */
    void setObject(String key, Object object);

}
