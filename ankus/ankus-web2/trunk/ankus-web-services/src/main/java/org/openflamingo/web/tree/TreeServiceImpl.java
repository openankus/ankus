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

import org.openflamingo.model.rest.NodeType;
import org.openflamingo.model.rest.Tree;
import org.openflamingo.model.rest.TreeType;
import org.openflamingo.web.member.Member;
import org.openflamingo.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Tree Service.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Service
public class TreeServiceImpl implements TreeService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(TreeServiceImpl.class);

    /**
     * Tree Repository
     */
    @Autowired
    private TreeRepository treeRepository;
    
    @Override
    public boolean rename(Tree tree, String name) {
        Tree master = treeRepository.select(tree.getId());
        master.setName(name);
        return treeRepository.update(master) > 0;
    }

    @Override
    public boolean delete(long id) {
        return treeRepository.delete(id) > 0;
    }

    @Override
    public Tree create(Tree parent, Tree child, NodeType nodeType) {
        child.setParent(parent);
        child.setNodeType(nodeType);
        child.setTreeType(parent.getTreeType());
        child.setUsername(parent.getUsername());
        child.setRoot(false);
        treeRepository.insert(child);// FIXME
        return child;
    }

    @Override
    public Tree createRoot(TreeType treeType, String username) {
        if (!treeRepository.existRoot(treeType, username)) {
            Tree tree = new Tree("/");
            tree.setTreeType(treeType);
            tree.setNodeType(NodeType.FOLDER);
            tree.setRoot(true);
            tree.setUsername(username);
            int insert = treeRepository.insert(tree);  // FIXME
            return tree;
        }
        return treeRepository.getRoot(treeType, username);
    }

    @Override
    public boolean checkSameNode(Tree parent, Tree child, TreeType treeType, NodeType nodeType) {
        if (nodeType == NodeType.FOLDER) {
            return this.existSubFolder(new Tree(parent.getId()), child.getName(), treeType);
        } else {
            return this.existSubItem(new Tree(parent.getId()), child.getName(), treeType);
        }
    }

    @Override
    public boolean existSubItem(Tree selectedNode, String name, TreeType treeType) {
        return treeRepository.existSameChild(selectedNode, name, treeType, NodeType.ITEM);
    }

    @Override
    public boolean existSubFolder(Tree selectedNode, String name, TreeType treeType) {
        return treeRepository.existSameChild(selectedNode, name, treeType, NodeType.FOLDER);
    }

    @Override
    public Tree getRoot(TreeType treeType, String username) {
        return treeRepository.getRoot(treeType, username);
    }

    @Override
    public List<Tree> getChilds(long parentId) {
        return treeRepository.getChilds(parentId);
    }

    @Override
    public Tree get(long id) {
        return treeRepository.select(id);
    }

    @Override
    public void move(String from, String to, TreeType type) {
        Tree source = treeRepository.select(Long.parseLong(from));
        Tree target;
        if ("/".equals(to)) {
            target = treeRepository.getRoot(type, SessionUtils.getUsername()); // FIXME
        } else {
            target = treeRepository.select(Long.parseLong(to));
        }
        source.setParent(target);
        treeRepository.update(source);
    }

    @Override
    public List<Tree> getWorkflowChilds(long parentId, Member member) { 
        return treeRepository.selectWorkflowChilds(parentId, member);        
    }

    public void setTreeRepository(TreeRepository treeRepository) {
        this.treeRepository = treeRepository;
    }
}
