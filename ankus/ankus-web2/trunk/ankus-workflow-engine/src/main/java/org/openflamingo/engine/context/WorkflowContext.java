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

import org.openflamingo.engine.dag.WorkflowExecutionPlanner;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.provider.engine.JobService;

import java.util.Date;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * Workflow의 상태를 관리하고 관련 정보를 유지하는 Context.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface WorkflowContext {

    /**
     * 지정한 이름의 Spring Bean을 반환한다.
     *
     * @param name Spring Bean Name
     * @return Spring Bean
     */
    Object getBean(String name);

    /**
     * 지정한 유형의 Spring Bean을 반환한다.
     *
     * @param requiredType Spring Bean Type
     * @return Spring Bean
     */
    <T> T getBean(Class<T> requiredType);

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
     * 지정한 Key에 대한 값을 가져온다.
     *
     * @param prefix Key의 Prefix (예; Workflow XML의 노드명)
     * @param key    Key
     * @return Value
     */
    Object getValue(String prefix, String key);

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

    /**
     * 지정한 Key의 Prefix를 추가하여 Key를 구성하고 값을 설정한다.
     *
     * @param prefix Key의 Prefix (예; Workflow XML의 노드명)
     * @param key    Key
     * @param value  Value
     */
    void setValue(String prefix, String key, String value);

    /**
     * Workflow의 인스턴스 식별자를 반환한다.
     *
     * @return Workflow의 인스턴스 식별자
     */
    String getWorkflowInstanceId();

    /**
     * Workflow의 식별자를 반환한다.
     *
     * @return Workflow 식별자
     */
    String getWorkflowId();

    /**
     * Workflow를 실행하기 위한 실행 계획을 구성하는 Planner를 반환한다.
     *
     * @return Workflow Execution Planner
     */
    WorkflowExecutionPlanner getExecutionPlanner();

    /**
     * 현재 노드명을 반환한다.
     *
     * @return 현재 노드명
     */
    String getCurrentActionName();

    /**
     * 현재 노드의 설명을 반환한다.
     *
     * @return 현재 노드의 설명
     */
    String getCurrentActionDescription();

    /**
     * 노드의 실행 이력 목록을 반환한다.
     *
     * @return 노드의 실행 이력 목록
     */
    Map<String, ActionContext> getActionContexts();

    /**
     * 각각의 노드명에 대한 Workflow XML의 Action Model을 반환한다.
     *
     * @return Action Model
     */
    Map<String, Object> getActionModel();

    /**
     * 현재 실행중인 노드의 Context를 반환한다.
     *
     * @return 현재 실행중인 노드의 Context
     */
    ActionContext getCurrentActionContext();

    /**
     * 현재 동작중인 Workflow XML의 Action Model을 반환한다.
     *
     * @return 현재 동작중인 Workflow XML의 Action Model
     */
    Object getCurrentActionModel();

    /**
     * Scheduler Context를 반환한다.
     *
     * @return Scheduler Context
     */
    SchedulerContext getSchedulerContext();

    /**
     * Workflow Domain Model을 반환한다.
     *
     * @return Workflow Domain Model
     */
    Workflow getWorkflowDomain();

    /**
     * Workflow의 시작 시간을 반환한다.
     *
     * @return Workflow의 시작 시간
     */
    Date getStartDate();

    /**
     * Workflow의 종료 시간을 반환한다.
     *
     * @return Workflow의 종료 시간
     */
    Date getEndDate();

    /**
     * Workflow에 할당된 unique id. 이 번호는 Workflow Context가 생성될 때 마다 자동으로 부여되며 JVM에 대해서 unique하다.
     */
    String getUniqueId();

    /**
     * Workflow의 상태를 변경한다.
     *
     * @param state 액션의 상태
     */
    void changeState(State state);

    /**
     * Job Service를 반환한다.
     *
     * @return Job Service
     */
    JobService getJobService();

    /**
     * Workflow 실행중 발생한 예외를 반환한다.
     *
     * @return Workflow 실행중 발생한 예외
     */
    Exception getException();

    /**
     * Workflow XML의 JAXB Object를 반환한다.
     *
     * @return Workflow XML의 JAXB Object
     */
    org.openflamingo.model.workflow.Workflow getModel();

    /**
     * 현재 노드의 이전 노드 정보를 반환한다.
     *
     * @param currentActionName 현재 노드의 이름름
     * @return 이전 노드 목록
     */
    Set<String> getPreviousAction(String currentActionName);

    /**
     * Workflow XML에 등록되어 있는 Global Variables를 반환한다.
     *
     * @return Global Varaibles Properties
     */
    Properties getGlobalVariables();

}
