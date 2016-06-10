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
package org.openflamingo.engine.history;

import org.mybatis.spring.SqlSessionTemplate;
import org.openflamingo.core.repository.PersistentRepositoryImpl;
import org.openflamingo.model.rest.WorkflowHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.openflamingo.util.StringUtils.isEmpty;

@Repository
public class WorkflowHistoryRepositoryImpl extends PersistentRepositoryImpl<WorkflowHistory, Long> implements WorkflowHistoryRepository {

	/*
	 * db config 정보
	 *  2016.01.06
	 *
	 *  by shm7255@onycom.com
	 */

	@Value("${jdbc.driver}")
	public String jdbc_driver;

	@Value("${jdbc.url}")
	public String jdbc_url;

	@Value("${jdbc.username}")
	public String jdbc_username;

	@Value("${jdbc.password}")
	public String jdbc_password;
	
    @Override
    public String getNamespace() {
        return NAMESPACE;
    }

    @Autowired
    public WorkflowHistoryRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }
    
    @SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<WorkflowHistory> selectByJobStringId(String jobStringId) {
		Map params = new HashMap();
		if (!isEmpty("jobStringId")) params.put("jobStringId", jobStringId);
		
		return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByJobStringId", params);	
		
	}
    
    public String getSecurityRole(String user_id)
	{
		/*
		 2015.01.27 
		 FLAMINGO.USER 테이블을 이용하여
		 사용자의 인증 권한을 얻어온다.
		 whitepoo@onycom.com
		 */
		
		Connection conn = null;                                        // null로 초기화 한다.
    	String authority  = "ROLE_USER";
    	
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("제대로 연결되었습니다.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	
	    	java.sql.Statement st = null;
			ResultSet rs = null;
			st = conn.createStatement();
			rs = st.executeQuery("SELECT AUTHORITY FROM USER WHERE USERNAME ='" + user_id+"'");
	
			ResultSetMetaData rsmd = null;
			
	        if(rs.next ())
	        {
		        authority = rs.getString("AUTHORITY");
		                	
	        }
	        rs.close();
	        st.close();
	        conn.close();
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    	return authority;
    }
    /*
    2015.01.28
    사용자 계정 수준에 따른 접근 제어
    whitepoo@onycom.com
    */
   
    @Override
    public Integer getTotalCountByUsername(String startDate, String endDate, String workflowName, String jobType, String status, String username) {
        Map params = new HashMap();
        String role_level = getSecurityRole(username);
        //관리 계정이 아닌경우 검색 조건에 사용자를 추가함.
        if(role_level.equals("ROLE_ADMIN") == false)
        	if (!isEmpty("username")) params.put("username", username);
        
        	
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("workflowName")) params.put("workflowName", workflowName);
        if (!isEmpty("status")) params.put("status", status);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".getTotalCountByUsername", params);
    }
    /*
     2014년 버전. 
     */
    /*
  
    @Override
    public Integer getTotalCountByUsername(String startDate, String endDate, String workflowName, String jobType, String status, String username) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("workflowName")) params.put("workflowName", workflowName);
        if (!isEmpty("status")) params.put("status", status);

        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".getTotalCountByUsername", params);
    }
    */
      
    /*
     2015.01.28
     사용자 계정 수준에 따른 접근 제어
     whitepoo@onycom.com
     */
    
    @Override
    public List<WorkflowHistory> selectByCondition(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit) {
        Map params = new HashMap();
        //관리 계정이 아닌경우 검색 조건에 사용자를 추가함.
        String role_level = getSecurityRole(username);
        if(role_level.equals("ROLE_ADMIN") == false)
        	if (!isEmpty("username")) params.put("username", username);
        
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("workflowName")) params.put("workflowName", workflowName);
        if (!isEmpty("status")) params.put("status", status);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        params.put("start", start);
        params.put("limit", limit);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }
    
    @Override
    public List<WorkflowHistory> selectByConditionViz(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit) {
        Map params = new HashMap();
        //관리 계정이 아닌경우 검색 조건에 사용자를 추가함.
        String role_level = getSecurityRole(username);
        if(role_level.equals("ROLE_ADMIN") == false)
        	if (!isEmpty("username")) params.put("username", username);
        
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("workflowName")) params.put("workflowName", workflowName);
        if (!isEmpty("status")) params.put("status", status);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        params.put("start", start);
        params.put("limit", limit);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByConditionViz", params);
    }
    
    /*
    2014년 version
    */
    /*
    @Override
    public List<WorkflowHistory> selectByCondition(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit) {
        Map params = new HashMap();
        if (!isEmpty("username")) params.put("username", username);
        if (!isEmpty("jobType")) params.put("jobType", jobType);
        if (!isEmpty("startDate")) params.put("startDate", startDate);
        if (!isEmpty("endDate")) params.put("endDate", endDate);
        if (!isEmpty("workflowName")) params.put("workflowName", workflowName);
        if (!isEmpty("status")) params.put("status", status);

        params.put("orderBy", orderBy);
        params.put("desc", desc);
        params.put("start", start);
        params.put("limit", limit);
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectByCondition", params);
    }
    */

}