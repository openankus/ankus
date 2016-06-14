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

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberRepositoryImpl extends PersistentRepositoryImpl<Member, Long> implements MemberRepository {

    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public MemberRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public Member selectByEmail(String email) {
        Member member = new Member();
        member.setEmail(email);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByEmail", member);
    }

    @Override
    public Member selectByPassword(String username, String email) {

        Member member = new Member();
        member.setUsername(username);
        member.setEmail(email);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByPassword", member);
    }

    @Override
    public Member selectByUser(String username) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByUser", username);
    }

    @Override
    public int existUsername(String username) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".existUsername", username);
    }

/*    @Override
    public List<Member> selectMembers(Member memberInfo) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectMembers", memberInfo);
    }*/

    @Override
    public List<Member> selectMembers(Map memberInfo) {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectMembers", memberInfo);
    }

    @Override
    public int selectEmailCount(String email) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectEmailCount", email);
    }

    @Override
    public int registerMember(Member user) {
        return this.getSqlSessionTemplate().insert(this.getNamespace() + ".registerMember", user);
    }

    @Override
    public int updateMember(Member user) {
        return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateMember", user);
    }

	@Override
	public int updateByLanguage(String username, String language) {
		Member member = new Member();
        member.setUsername(username);
        member.setLanguage(language);
        
		return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateByLanguage", member);
	}

	@Override
	public int existMember(String username, String password) {
		Member member = new Member();
        member.setUsername(username);
        member.setPassword(password);
		return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".existMember", member);
	}

	@Override
	public int updateByPassword(String username, String password) {
		Member member = new Member();
        member.setUsername(username);
        member.setPassword(password);
		return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateByPassword", member);
	}

	@Override
	public int updateByLastLogin(String username) {
		Member member = new Member();
        member.setUsername(username);
		return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateByLastLogin", member);
	}
	
	
}