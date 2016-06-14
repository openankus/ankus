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
package org.openflamingo.engine.dag;

import org.openflamingo.model.workflow.BaseType;

import java.util.List;
import java.util.Map;

/**
 * Workflow를 실행하기 위한 실행 계획을 수립하는 Planner.
 * 이 Workflow Execution Planner는 정적 계획을 수립하르모 실행중에 실행 계획이 변하는 경우
 * 다른 Workflow Execution Planner가 필요하다.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface WorkflowExecutionPlanner {

    /**
     * Workflow의 노드명 목록을 반환한다.
     *
     * @return Workflow를 구성하는 노드명 목록
     */
    List<String> getNamesOfActions();

    /**
     * Workflow의 노드명 맵 정보를 반환한다.
     * 맵은 노드명과 노드에 대한 메타 정보로 구성되어 있다.
     *
     * @return 노드명과 노드의 메타 정보로 구성되어 있는 맵
     */
    Map<String, Object> getActionMap();

    /**
     * 글로벌 변수를 반환한다.
     *
     * @return 글로벌 변수
     */
    Map<String, String> getGlobalVariables();

    /**
     * Workflow를 구성하는 노드의 실행 순서에 따른 리스트를 반환한다.
     *
     * @return 워크플로우
     */
    List<BaseType> getOrderedActions();

    /**
     * 다음 노드 정보를 반환한다.
     *
     * @return 다음 노드 정보
     */
    Map<String, String> getNextOfAction();

    /**
     * 액션의 From To를 거꾸로 구성한 맵 정보를 반환한다.
     *
     * @return 액션의 From To를 거꾸로 구성한 맵 정보
     */
    Map<String, String> getReversedActions();

}