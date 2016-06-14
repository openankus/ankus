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
package org.openflamingo.web.engine;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.web.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EngineRepositoryImpl extends PersistentRepositoryImpl<Engine, Long> implements EngineRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public EngineRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<Engine> selectAll(Member member) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectAll", member);
    }

	@Override
	public int addPermission(long engineId, String username) {
		HashMap map = new HashMap();
		map.put("id", engineId);
		map.put("username", username);
		return this.getSqlSessionTemplate().insert(this.getNamespace() + ".insertPermission", map);
	}
	
	@Override
	public int deletePermission(long engineId) {
		return this.getSqlSessionTemplate().delete(this.getNamespace() + ".deletePermission", engineId);
	}


	
	
}
