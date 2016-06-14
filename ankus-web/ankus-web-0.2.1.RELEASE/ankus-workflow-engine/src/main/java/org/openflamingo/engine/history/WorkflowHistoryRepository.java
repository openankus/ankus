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

import org.openflamingo.core.repository.PersistentRepository;
import org.openflamingo.model.rest.WorkflowHistory;

import java.util.List;

public interface WorkflowHistoryRepository extends PersistentRepository<WorkflowHistory, Long> {

    public static final String NAMESPACE = WorkflowHistoryRepository.class.getName();

    /**
     * 지정한 사용자의 워크플로우 실행 이력의 총 건수를 반환한다.
     *
     * @param startDate    시작날짜
     * @param endDate      종료 날짜
     * @param workflowName 워크플로우명
     * @param jobType      Job 유형
     * @param status       상태코드
     * @param username     사용자
     * @return 워크플로우 싫행 이력의 총 건수
     */
    Integer getTotalCountByUsername(String startDate, String endDate, String workflowName, String jobType, String status, String username);

    /**
     * 지정한 조건의 워크플로우 실행 이력을 조회한다.
     *
     * @param startDate    시작날짜
     * @param endDate      종료 날짜
     * @param workflowName 워크플로우명
     * @param jobType      Job 유형
     * @param username     사용자명
     * @param status       상태코드
     * @param orderBy      정렬할 컬럼명
     * @param desc         정렬 방식(ASC, DESC)
     * @param start        시작 페이지
     * @param limit        페이지당 건수
     * @return 워크플로우 실행 이력
     */
    List<WorkflowHistory> selectByCondition(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit);
}
