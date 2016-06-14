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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Hive Editor Execution History Service Implemetation.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
@Service
public class HiveHistoryServiceImpl implements HiveHistoryService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveHistoryServiceImpl.class);

    @Autowired
    private HiveHistoryRepository repository;

    @Override
    public HiveHistory select(HiveHistory hiveHistory) {
        return repository.select(hiveHistory.getId());
    }

    @Override
    public HiveHistory insert(HiveHistory hiveHistory) {
        int insert = repository.insert(hiveHistory);
        return hiveHistory;
    }

    @Override
    public void update(HiveHistory hiveHistory) {
        repository.update(hiveHistory);
    }

    @Override
    public void delete(HiveHistory hiveHistory) {
        repository.delete(hiveHistory.getId());
    }

    @Override
    public List<HiveHistory> selectByExecutionId(String executionId) {
        return repository.selectByExecutionId(executionId);
    }

    @Override
    public void deleteBeforeTwoAgo() {
        int deleted = repository.deleteBeforeTwoAgo();
        logger.info("엊그제 날짜의 Hive Query 실행 이력을 {}건 삭제했습니다.", deleted);
    }
}
