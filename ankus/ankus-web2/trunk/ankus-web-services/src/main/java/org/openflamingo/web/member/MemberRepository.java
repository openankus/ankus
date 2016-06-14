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
package org.openflamingo.web.member;

import org.openflamingo.core.repository.PersistentRepository;

import java.util.List;
import java.util.Map;

public interface MemberRepository extends PersistentRepository<Member, Long> {

    public static final String NAMESPACE = MemberRepository.class.getName();

    Member selectByEmail(String email);

    Member selectByPassword(String username, String email);

    Member selectByUser(String username);

    int existUsername(String username);

    List<Member> selectMembers(Map memberInfo);

    int selectEmailCount(String email);

    int registerMember(Member user);

    int updateMember(Member user);
    
    int updateByLanguage(String username, String language);
    
    int existMember(String username, String password);
    
    int updateByPassword(String username, String password);
    
    int updateByLastLogin(String username);
}