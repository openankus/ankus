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
package org.openflamingo.engine.hive;

import org.openflamingo.core.repository.PersistentRepository;
import org.openflamingo.model.rest.HiveHistory;

import java.util.List;
import java.util.Map;

/**
 * Hive Editor Execution History Repository Interface.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
public interface HiveHistoryRepository extends PersistentRepository<HiveHistory, Long> {

    public static final String NAMESPACE = HiveHistoryRepository.class.getName();

    /**
     * Execution ID로 Hive Query 실행 이력을 반환한다.
     *
     * @param executionId Execution ID
     * @return Hive Query 실행 이력
     */
    List<HiveHistory> selectByExecutionId(String executionId);

    int getTotalCountByUsername(String username);

    List<HiveHistory> selectByCondition(String username, String status, String orderBy, String desc);

    List<HiveHistory> selectByCondition(Map params);

    List<HiveHistory> selectByCondition(String executionId);

    List<HiveHistory> listHistoriesByCondition(String startDate, String endDate, String scriptName, String status, int start, int limit, String orderBy, String dir, String username);

    int getTotalCountOfHistoriesByCondition(String startDate, String endDate, String scriptName, String status, String username);

    /**
     * 엊그제 날짜의 실행 이력을 모두 삭제한다.
     *
     * @return 삭제한 건수
     */
    int deleteBeforeTwoAgo();
}
