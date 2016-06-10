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
package org.openflamingo.web.menu;

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MenuRepositoryImpl extends DefaultSqlSessionDaoSupport implements MenuRepository {

    @Autowired
    public MenuRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<Menu> selectTopMenu() {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectTopMenu");
    }

    @Override
    public List<Menu> selectSubMenu(int parentId) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectSubMenu", parentId);
    }

    @Override
    public List<Menu> selectUserMenu() {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectUserMenu");
    }

    @Override
    public Menu selectMenu(int menuID) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectMenu", menuID);
    }

    @Override
    public Menu selectMenuByLabel(String label) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectMenuByLabel", label);
    }

    @Override
    public Menu selectMenuByCode(String topCode, String subCode) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("topCode", topCode);
        param.put("subCode", subCode);

        return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectMenuByCode", param);
    }

    @Override
    public int insertMenu(Menu menu) {
        return getSqlSessionTemplate().insert(NAMESPACE + ".insertMenu", menu);
    }

    @Override
    public int updateMenu(Menu menu) {
        return getSqlSessionTemplate().update(NAMESPACE + ".updateMenu", menu);
    }

    @Override
    public int deleteMenu(int menuID) {
        return getSqlSessionTemplate().delete(NAMESPACE + ".deleteMenu", menuID);
    }
}
