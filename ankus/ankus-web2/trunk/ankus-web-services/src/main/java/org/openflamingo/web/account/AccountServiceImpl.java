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

package org.openflamingo.web.account;

import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.tree.TreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private TreeService treeService;

    /**
     * Workflow Engine 정보를 얻기 위한 Engine Service.
     */
    @Autowired
    private EngineService engineService;

    /**
     * Hadoop Cluster 정보를 얻기 위한 Hadoop Cluster Admin Service.
     */
    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Override
    public void initilizeUser(String username) {
    }

}
