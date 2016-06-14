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

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.openflamingo.model.rest.AuditHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.openflamingo.util.StringUtils.isEmpty;

@Repository
public class AuditLogRepositoryImpl extends PersistentRepositoryImpl<AuditHistory, Long> implements AuditLogRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public AuditLogRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<AuditHistory> selectByCondition(String startDate, String endDate, String path, String type, int start, int limit, String orderBy, String desc, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("path")) params.put("path", path);
        if (!isEmpty("auditType")) params.put("auditType", type);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        params.put("start", start);
        params.put("limit", limit);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }

    @Override
    public int getTotalCountByCondition(String startDate, String endDate, String path, String type, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("path")) params.put("path", path);
        if (!isEmpty("auditType")) params.put("auditType", type);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".getTotalCountByUsername", params);
    }
}