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

import org.openflamingo.model.rest.HiveHistory;

import java.util.List;

/**
 * Hive Editor Execution History Service Interface.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
public interface HiveHistoryService {

    /**
     * @param hiveHistory Hive Query 실행 이력
     * @return Hive Query 실행 이력
     */
    HiveHistory select(HiveHistory hiveHistory);

    /**
     * 새로운 Hive Query 실행 이력을 추가한다.
     *
     * @param hiveHistory Hive Query 실행 이력
     * @return Hive Query 실행 이력
     */
    HiveHistory insert(HiveHistory hiveHistory);

    /**
     * Hive Query 실행 이력을 업데이트한다.
     *
     * @param hiveHistory Hive Query 실행 이력
     */
    void update(HiveHistory hiveHistory);

    /**
     * Hive Query 실행 이력을 삭제한다.
     *
     * @param hiveHistory Hive Query 실행 이력
     */
    void delete(HiveHistory hiveHistory);

    /**
     * Execution ID로 Hive Query 실행 이력을 반환한다.
     *
     * @param executionId Execution ID
     * @return Hive Query 실행 이력
     */
    List<HiveHistory> selectByExecutionId(String executionId);

    /**
     * 엊그제 날짜의 실행 이력을 삭제한다.
     */
    void deleteBeforeTwoAgo();
}
