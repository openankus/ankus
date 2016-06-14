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
package org.openflamingo.engine.history;

import org.openflamingo.model.rest.WorkflowHistory;

import java.util.List;
import java.util.Map;

/**
 * 워크플로우 실행 이력 서비스 인터페이스.
 * 워크플로우가 실행되면 워크플로우의 인스턴스가 생성되며 이때 이 해당 인스턴스에 대한 실행 이력을 관리하는 기능을 제공한다.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface WorkflowHistoryService {

    /**
     * 워크플로우 ID에 해당하는 워크플로우를 반환한다.
     *
     * @param id 워크플로우 식별자
     * @return 워크플로우 실행이력
     */
    WorkflowHistory get(long id);

    /**
     * 새로운 워크플로우 실행 이력을 추가한다.
     *
     * @param workflowHistory 워크플로우 실행이력
     * @return 워크플로우 실행이력
     */
    WorkflowHistory create(WorkflowHistory workflowHistory);

    /**
     * 지정한 워크플로우의 상태별 건수를 반환한다.
     *
     * @param workflowId 워크플로우 ID
     * @return 워크플로우의 상태별 건수
     */
    List<Map<String, Object>> getStatisticsByStatus(long workflowId);

    /**
     * JOB ID에 해당하는 워크플로우를 반환한다.
     *
     * @param id Job Id
     * @return 워크플로우 실행이력
     */
    WorkflowHistory select(long id);

}
