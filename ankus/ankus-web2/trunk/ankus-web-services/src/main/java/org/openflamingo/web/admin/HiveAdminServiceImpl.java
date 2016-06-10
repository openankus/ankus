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

import org.openflamingo.model.rest.HiveServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HiveAdminServiceImpl implements HiveAdminService {

    @Autowired
    private HiveAdminRepository adminRepository;

    @Override
    public List<HiveServer> getHiveServers() {
        return adminRepository.selectAll();
    }

    @Override
    public boolean deleteHiveServer(HiveServer hiveServer) {
        return adminRepository.delete(hiveServer.getId()) > 0;
    }

    @Override
    public boolean exist(HiveServer hiveServer) {
        return adminRepository.selectByName(hiveServer.getName());
    }

    @Override
    public boolean addHiveServer(HiveServer hiveServer) {
        return adminRepository.insert(hiveServer) > 0;
    }

    @Override
    public HiveServer getHiveServer(long hiveServerId) {
        return adminRepository.select(hiveServerId);
    }

}
