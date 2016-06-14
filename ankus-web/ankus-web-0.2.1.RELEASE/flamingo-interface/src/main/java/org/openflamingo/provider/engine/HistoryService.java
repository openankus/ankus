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
package org.openflamingo.provider.engine;

import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.WorkflowHistory;

import java.util.List;

/**
 * 워크플로우 실행과 관련된 각종 이력 서비스를 제공하는 Provider Interface.
 *
 * @author Byoung Gon, Kim
 * @version 0.4
 */
public interface HistoryService {

    /**
     * 지정한 액션의 식별자 ID에 대한 액션 실행 이력을 반환한다.
     *
     * @param actionId 워크플로우를 구성하는 Action의 식별자 ID
     * @return 액션 실행 이력
     */
    ActionHistory getActionHistory(long actionId);

    /**
     * 지정한 사용자의 워크플로우 실행 이력의 개수룰 반환한다.
     *
     * @param startDate    시작날짜
     * @param endDate      종료 날짜
     * @param workflowName 워크플로우명
     * @param jobType      Job 유형
     * @param status       상태코드
     * @param username     사용자명
     * @return 워크플로우 실행 이력의 개수
     */
    int getTotalCountOfWorkflowHistories(String startDate, String endDate, String workflowName, String jobType, String status, String username);

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
     * @return 워크플로우 실행 이력 목록
     */
    List<WorkflowHistory> getWorkflowHistories(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit);

    /**
     * 지정한 조건의 워크플로우 실행 이력을 조회한다.
     *
     * @param username 사용자명
     * @param status   상태코드
     * @param orderBy  정렬할 컬럼명
     * @param desc     정렬 방식(ASC, DESC)
     * @return 워크플로우 실행 이력 목록
     */
    List<ActionHistory> getRunningActionHistories(String username, String status, String orderBy, String desc);

    /**
     * 지정한 Job ID로 실행한 워크플로우를 구성하는 액션 목록을 조회한다.
     *
     * @param jobId Job ID (e.g. <tt>1231123</tt>)
     * @return 액션 목록
     */
    List<ActionHistory> getActionHistories(String jobId);

    /**
     * 지정한 Action의 로그 파일을 반환한다.
     *
     * @param actionId Action ID
     * @return 로그 파일
     */
    String getActionLog(long actionId);

    /**
     * Action Log Path로 Action의 로그 파일을 반환한다.
     *
     * @param path Action Log Path
     * @return 로그 파일
     */
    String getActionLogByPath(String path);
}
