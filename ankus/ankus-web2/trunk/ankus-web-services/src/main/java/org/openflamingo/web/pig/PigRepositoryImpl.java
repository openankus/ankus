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
package org.openflamingo.web.pig;

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class PigRepositoryImpl extends PersistentRepositoryImpl<Pig, Long> implements PigRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public PigRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public int selectTotalCountByCondition(Map params) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectTotalCountByCondition", params);
    }

    @Override
    public List<Pig> selectByCondition(Map params) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }
}