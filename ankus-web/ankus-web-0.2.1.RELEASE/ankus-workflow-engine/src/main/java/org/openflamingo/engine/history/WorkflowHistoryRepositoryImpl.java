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

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.openflamingo.model.rest.WorkflowHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.openflamingo.util.StringUtils.isEmpty;

@Repository
public class WorkflowHistoryRepositoryImpl extends PersistentRepositoryImpl<WorkflowHistory, Long> implements WorkflowHistoryRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public WorkflowHistoryRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public Integer getTotalCountByUsername(String startDate, String endDate, String workflowName, String jobType, String status, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("workflowName")) params.put("workflowName", workflowName);
        if (!isEmpty("status")) params.put("status", status);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".getTotalCountByUsername", params);
    }

    @Override
    public List<WorkflowHistory> selectByCondition(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("workflowName")) params.put("workflowName", workflowName);
        if (!isEmpty("status")) params.put("status", status);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        params.put("start", start);
        params.put("limit", limit);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }

}