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

import org.openflamingo.core.exception.ServiceException;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.User;
import org.openflamingo.model.rest.WorkflowHistory;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.FileUtils;
import org.openflamingo.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserAdminServiceImpl implements UserAdminService {

    @Autowired
    private UserAdminRepository userAdminRepository;

    @Override
    public List<User> getUsers() {
        return userAdminRepository.selectAll();
    }

    @Override
    public List<User> getUserList(String jobType, String createDate, String username, String email, String enabled, String authority, String orderBy, String desc, int start, int limit) {
        return userAdminRepository.selectByCondition(jobType, createDate, username, email, enabled, authority, orderBy, desc, start, limit);
    }

    @Override
    public boolean exist(User user) {
        return userAdminRepository.selectByName(user.getUsername());
    }

    @Override
    public int updateUser(User user) {
        return userAdminRepository.updateUser(user);
    }

    @Override
    public int deleteUser(User user) {
        return userAdminRepository.deleteUser(user);
    }
    
    @Override
    public int getCount() {
        return userAdminRepository.count();
    }
}
