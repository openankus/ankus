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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Workflow History Service Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Service
public class WorkflowHistoryServiceImpl implements WorkflowHistoryService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(WorkflowHistoryServiceImpl.class);

    /**
     * Workflow History Repository
     */
    @Autowired
    private WorkflowHistoryRepository workflowHistoryRepository;

    @Override
    public WorkflowHistory get(long id) {
        return workflowHistoryRepository.select(id);
    }

    @Override
    public WorkflowHistory create(WorkflowHistory workflowHistory) {
        int insert = workflowHistoryRepository.insert(workflowHistory); // FIXME
        return workflowHistory;
    }

    @Override
    public List<Map<String, Object>> getStatisticsByStatus(long workflowId) {
        List<Map<String, Object>> statistics = new ArrayList<Map<String, Object>>();
        return statistics;
    }

    /**
     * 상태 코드와 개수를 Map으로 구성한다.
     *
     * @param status 상태 코드
     * @param count  개수
     * @return Map
     */
    private Map<String, Object> getStatus(String status, int count) {
        Map<String, Object> statistics = new HashMap<String, Object>();
        statistics.put("Status", status);
        statistics.put("Count", count);
        return statistics;
    }

    @Override
    public WorkflowHistory select(long id) {
        return workflowHistoryRepository.select(id);
    }
}
