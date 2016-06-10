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
package org.openflamingo.web.admin;

import org.openflamingo.model.rest.HadoopCluster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HadoopClusterAdminServiceImpl implements HadoopClusterAdminService {

    @Autowired
    private HadoopClusterAdminRepository adminRepository;

    @Override
    public boolean exist(HadoopCluster hadoopCluster) {
        return adminRepository.exists(hadoopCluster.getId());
    }

    @Override
    public boolean deleteHadoopCluster(long hadoopClusterId) {
        return adminRepository.delete(hadoopClusterId) > 0;
    }

    @Override
    public boolean addHadoopCluster(HadoopCluster hadoopCluster) {
        hadoopCluster.setHdfsUrl(org.slf4j.helpers.MessageFormatter.arrayFormat("{}{}:{}", new Object[]{
                hadoopCluster.getNamenodeProtocol(), hadoopCluster.getNamenodeIP(), hadoopCluster.getNamenodePort()
        }).getMessage());
        return adminRepository.insert(hadoopCluster) > 0;
    }

    @Override
    public HadoopCluster getHadoopCluster(long hadoopClusterId) {
        return adminRepository.select(hadoopClusterId);
    }

    @Override
    public List<HadoopCluster> getHadoopClusters() {
        return adminRepository.selectAll();
    }
}
