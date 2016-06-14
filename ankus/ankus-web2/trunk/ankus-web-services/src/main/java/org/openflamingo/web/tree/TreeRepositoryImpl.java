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
package org.openflamingo.web.tree;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.openflamingo.model.rest.NodeType;
import org.openflamingo.model.rest.Tree;
import org.openflamingo.model.rest.TreeType;
import org.openflamingo.web.member.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Hibernate Tree Repository.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Repository
public class TreeRepositoryImpl extends PersistentRepositoryImpl<Tree, Long> implements TreeRepository {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(TreeRepositoryImpl.class);

    /**
     * Hibernate Session Factory
     */
    private SessionFactory sessionFactory;

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public TreeRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<Tree> getChilds(long parentId) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectChilds", parentId);
    }

    @Override
    public List<Tree> getChilds(long parentId, TreeType treeType, NodeType nodeType) {
        Tree parent = select(parentId);
        Session currentSession = sessionFactory.getCurrentSession();
        Criteria criteria = currentSession.createCriteria(Tree.class);
        return criteria
                .add(Restrictions.eq("parent", parent))
                .add(Restrictions.eq("treeType", treeType))
                .add(Restrictions.eq("nodeType", nodeType))
                .add(Restrictions.eq("root", "false"))
                .list();
    }

    @Override
    public boolean existSameChild(Tree current, String name, TreeType treeType, NodeType nodeType) {
        Session currentSession = sessionFactory.getCurrentSession();
        Criteria criteria = currentSession.createCriteria(Tree.class);
        return ((Long) criteria
                .add(Restrictions.eq("parent", current))
                .add(Restrictions.eq("treeType", treeType))
                .add(Restrictions.eq("nodeType", nodeType))
                .add(Restrictions.eq("name", name.trim()))
                .add(Restrictions.eq("root", "false"))
                .setProjection(Projections.rowCount())
                .list().get(0)).longValue() > 0;
    }

    @Override
    public boolean existRoot(TreeType treeType, String username) {
        return getRoot(treeType, username) != null;
    }

    @Override
    public Tree getRoot(TreeType treeType, String username) {
        Tree tree = new Tree();
        tree.setUsername(username);
        tree.setTreeType(treeType);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectRoot", tree);
    }

    @Override
    public List<Tree> selectWorkflowChilds(long parentId, Member member) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectWorkflowChilds", member);
    }

    @Override
    public Tree getParent(Tree child) {
        if (child.getParent() != null) {
            return child.getParent();
        }
        return this.select(child.getId()).getParent();
    }
}
