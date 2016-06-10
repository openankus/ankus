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
package org.openflamingo.fs.audit;

import org.openflamingo.core.repository.PersistentRepository;
import org.openflamingo.model.rest.AuditHistory;

import java.util.List;

/**
 * Audit Log Repository Interface.
 *
 * @author Byoung Gon, Kim`
 * @since 1.0
 */
public interface AuditLogRepository extends PersistentRepository<AuditHistory, Long> {

    public static final String NAMESPACE = AuditLogRepository.class.getName();

    /**
     * 지정한 조건의 파일 시스템 처리 이력을 조회한다.
     *
     * @param startDate 시작날짜
     * @param endDate   종료 날짜
     * @param path      조회할 경로
     * @param type      파일 처리 유형
     * @param start     시작 페이지
     * @param limit     페이지당 건수
     * @param orderBy   정렬할 컬럼명
     * @param desc      정렬 방식(ASC, DESC)
     * @param username  사용자명
     * @return 파일 시스템 처리 이력 목록
     */
    List<AuditHistory> selectByCondition(String startDate, String endDate, String path, String type, int start, int limit, String orderBy, String desc, String username);

    /**
     * 지정한 사용자의 파일 시스템 처리 이력의 개수룰 반환한다.
     *
     * @param startDate 시작날짜
     * @param endDate   종료 날짜
     * @param path      조회할 경로
     * @param type      파일 처리 유형
     * @param username  사용자명
     * @return 파일 시스템 처리 이력의 개수
     */
    int getTotalCountByCondition(String startDate, String endDate, String path, String type, String username);

}
