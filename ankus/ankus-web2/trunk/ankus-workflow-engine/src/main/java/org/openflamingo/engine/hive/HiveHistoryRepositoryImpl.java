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

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.openflamingo.model.rest.HiveHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.openflamingo.util.StringUtils.isEmpty;

/**
 * Hive Editor Execution History Repository Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
@Repository
public class HiveHistoryRepositoryImpl extends PersistentRepositoryImpl<HiveHistory, Long> implements HiveHistoryRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public HiveHistoryRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<HiveHistory> selectByExecutionId(String executionId) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByExecutionId", executionId);
    }

    @Override
    public int getTotalCountByUsername(String username) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".getTotalCountByUsername", username);
    }

    @Override
    public List<HiveHistory> selectByCondition(String username, String status, String orderBy, String desc) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("status")) params.put("status", status);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }

    @Override
    public List<HiveHistory> selectByCondition(Map params) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }

    @Override
    public List<HiveHistory> selectByCondition(String executionId) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByExecutionId", executionId);
    }

    @Override
    public List<HiveHistory> listHistoriesByCondition(String startDate, String endDate, String scriptName, String status, int start, int limit, String orderBy, String dir, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("scriptName")) params.put("scriptName", scriptName);
        if (!isEmpty("status")) params.put("status", status);

        params.put("orderBy", orderBy);
        params.put("desc", dir);
        params.put("start", start);
        params.put("limit", limit);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }

    @Override
    public int getTotalCountOfHistoriesByCondition(String startDate, String endDate, String scriptName, String status, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("scriptName")) params.put("scriptName", scriptName);
        if (!isEmpty("status")) params.put("status", status);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".getTotalCountByUsername", params);
    }

    @Override
    public int deleteBeforeTwoAgo() {
        return this.getSqlSessionTemplate().delete(this.getNamespace() + ".deleteBeforeTwoAgo");
    }

}
