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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Member의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Myeong Ha, Kim
 * @since 1.0.1
 */
@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public Member getMemberByEmail(String email) {
        return memberRepository.selectByEmail(email);
    }

    @Override
    public Member getMemberByPassword(String username, String email) {
        return memberRepository.selectByPassword(username, email);
    }

    @Override
    public Member getMemberByUser(String username) {
        return memberRepository.selectByUser(username);
    }

    @Override
    public int existUsername(String username) {
        return memberRepository.existUsername(username);
    }

    @Override
    public List<Member> getMembers(Map memberInfo) {
        return memberRepository.selectMembers(memberInfo);
    }

/*    @Override
    public List<Member> getMembers(Member memberInfo) {
        return memberRepository.selectMembers(memberInfo);
    }*/

    @Override
    public int getEmailCount(String email) {
        return memberRepository.selectEmailCount(email);
    }

    @Override
    public int registerMember(Member user) {
        return memberRepository.registerMember(user);
    }

    @Override
    public int updateMember(Member user) {
        return memberRepository.updateMember(user);
    }

	@Override
	public int updateByLanguage(String username, String language) {
		return memberRepository.updateByLanguage(username, language);
	}

	@Override
	public int existMember(String username, String password) {
		return memberRepository.existMember(username, password);
	}

	@Override
	public int updateByPassword(String username, String password) {
		return memberRepository.updateByPassword(username, password);
	}

	@Override
	public int updateByLastLogin(String username) {
		return memberRepository.updateByLastLogin(username);
	}
	
	
}

