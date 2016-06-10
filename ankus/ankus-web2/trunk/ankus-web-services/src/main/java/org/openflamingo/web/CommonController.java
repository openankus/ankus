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
package org.openflamingo.web;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.Response;
import org.openflamingo.web.member.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.onycom.common.util.Util_tajo_n_shell;

/**
 * 인덱스 페이지 및 기본적인 페이지 이동 기능을 제공하는 컨트롤러.
 */
@Controller
@RequestMapping("/")
public class CommonController {
    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(CommonController.class);

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
    
    /**
     * 인덱스 페이지로 이동한다.
     *
     * @return Model And View
     */
 /*   @RequestMapping(method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView("/index");
        mav.addObject("locale", ConfigurationHelper.getHelper().get("application.locale", "English"));
        mav.addObject("mode", ConfigurationHelper.getHelper().get("application.mode", "development"));

        mav.addObject("version", ConfigurationHelper.getHelper().get("version"));
        mav.addObject("timestamp", ConfigurationHelper.getHelper().get("build.timestamp"));
        mav.addObject("buildNumber", ConfigurationHelper.getHelper().get("build.number"));
        mav.addObject("revision", ConfigurationHelper.getHelper().get("revision.number"));
        mav.addObject("buildKey", ConfigurationHelper.getHelper().get("build.key"));
        return mav;
    }
 */ 
	@RequestMapping(value = "user_info/get", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.OK)
//    @ResponseBody
    public void get_userinfo(HttpServletRequest req, HttpServletResponse resp
    		, @RequestParam(value = "method", required=true) String method
    		, @RequestParam(value = "username", required=true) String username
    		) throws Exception {
    	// key와 value로 구성되어있는 HashMap 생성.
		
		System.out.printf("============>get_userinfo\n");
		
    	PrintWriter out = null;
		out = resp.getWriter();
		
    	String sreq_username  = username;
    	String str_method = method;
//    	str_method = req.getParameter("method");
//    	sreq_username = req.getParameter("username");
    	
    	Connection conn = null;  
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	JSONObject userinfo = new JSONObject();
	    	java.sql.Statement st = null;
	    	ResultSet rs = null;
			st = conn.createStatement();
			JSONObject data = new JSONObject();
	    	if(str_method.equals("get"))
	    	{
		    	//SELECT BLOCK
				
				rs = st.executeQuery("SELECT * FROM USER WHERE USERNAME='" + sreq_username +"'");	
		        
		        if (rs.next ())
		        {
			        data.put("USERNAME", rs.getString("USERNAME"));
			        data.put("PASSWD", rs.getString("PASSWD"));
			        data.put("NAME", rs.getString("NAME"));
			        data.put("EMAIL", rs.getString("EMAIL"));		         
		        }	      
		        rs.close();		        
		        userinfo.put("success", "true");
		        userinfo.put("data", data);
	    	}
	    	else
	    	{
	    		String str_name = "", str_passwd="", str_email= "";
	    		str_name = req.getParameter("name");
	    		str_passwd = req.getParameter("passwd");
	    		str_email = req.getParameter("email");
	        	
	    		String update_query="";
				update_query = "UPDATE USER SET PASSWD='" + str_passwd + "',";
				//update_query += "NAME='" + str_name + "',";
				update_query += "EMAIL='" + str_email + "' ";
				update_query += "WHERE USERNAME = '" + sreq_username + "'";
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
				if(rtn >= 0)
				{
					userinfo.put("success", "true");
				}
				else
				{
					userinfo.put("success", "fail");
				}
	    	}	        
	        st.close();
	        conn.close();   
	      	out.print(userinfo);
	        //req.setAttribute("jsonStr", userinfo);
	        System.out.println(userinfo);
	      	        
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }
	
	@RequestMapping(value = "admin/hadoop/update_a_cluster", method = RequestMethod.GET)
	public void update_a_cluster(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "id", required=true) String p_id
  		, @RequestParam(value = "name", required=true) String p_name
  		, @RequestParam(value = "namenodeProtocol", required=true) String p_namenodeProtocol
  		, @RequestParam(value = "namenodeIP", required=true) String p_namenodeIP
  		, @RequestParam(value = "namenodePort", required=true) String p_namenodePort
  		, @RequestParam(value = "jobTrackerIP", required=true) String p_jobTrackerIP
  		, @RequestParam(value = "jobTrackerPort", required=true) String p_jobTrackerPort
  		, @RequestParam(value = "namenodeConsole", required=true) String p_namenodeConsole
  		, @RequestParam(value = "jobTrackerConsole", required=true) String p_jobTrackerConsole
  		, @RequestParam(value = "namenodeMonitoringPort", required=true) String p_namenodeMonitoringPort
  		, @RequestParam(value = "jobTrackerMonitoringPort", required=true) String p_jobTrackerMonitoringPort
  		) throws Exception {
  	// key와 value로 구성되어있는 HashMap 생성.
		
		System.out.printf("============>update_a_cluster\n");
		
    	PrintWriter out = resp.getWriter();
    	
    	Connection conn = null;                                        // null로 초기화 한다.
    	String target_id  = "";
    	String name = "";
    	String protocol = "", namenode_ip = "", namenode_port="",
    			jobtrackerIP= "", jobtrackerPORT= "", namenodeConsole="",
    			jobtrackerConsole="", namenodeMonitorPort="",jobtrackerMonitorPort="";
    			
    	try
    	{
    		
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	// 사용자 계정의 패스워드
	    	target_id = p_id;
	    	
	    	name = p_name;
	    	protocol = p_namenodeProtocol;
	    	
	    	namenode_ip = p_namenodeIP;
	    	namenode_port = p_namenodePort;
	    	
	    	jobtrackerIP = p_jobTrackerIP;
	    	jobtrackerPORT = p_jobTrackerPort;
	    	
	    	namenodeConsole = p_namenodeConsole;
	    	jobtrackerConsole = p_jobTrackerConsole;
	    
	    	namenodeMonitorPort = p_namenodeMonitoringPort;
	    	jobtrackerMonitorPort = p_jobTrackerMonitoringPort;
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("제대로 연결되었습니다.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	
	    	//동일한 클러스터 명이 있는지 조사하여 있으면 등록 거부함.-삭제.
	    	
	    	java.sql.Statement st = null;
		
					
			String update_query="";
			update_query = "UPDATE ADMIN_HADOOP_CLUSTER SET name='" + name + "',";
			update_query += "NN_PROTOCOL='" + protocol + "',";
			update_query += "NN_IP='" + namenode_ip + "',";
			update_query += "NN_PORT=" + Integer.parseInt(namenode_port) + ",";
			
			//update_query += "HDFS_URL='" + protocol + "://" + namenode_ip +":" + namenode_port+ "',";
			update_query += "HDFS_URL='" + protocol  + namenode_ip +":" + namenode_port+ "',";
			
			update_query += "JT_IP='" + jobtrackerIP + "',";
			update_query += "JT_PORT=" + Integer.parseInt(jobtrackerPORT) + ",";
			
			update_query += "NN_CONSOLE='" + namenodeConsole + "',";
			update_query += "JT_CONSOLE='" + jobtrackerConsole + "',";
			
			update_query += "JT_MONITORING_PORT=" + Integer.parseInt(jobtrackerMonitorPort) + ",";
			update_query += "NN_MONITORING_PORT=" + Integer.parseInt(namenodeMonitorPort) + "";
			update_query += " WHERE ID = " + target_id;
			
			System.out.println(update_query);
			
			st = conn.createStatement();
			int rtn = st.executeUpdate(update_query);
			JSONObject data = new JSONObject();
			if(rtn >= 0)
			{
				data.put("success", "true");
		        out.print(data);
			}
			else
			{
				data.put("success", "failed");
				req.setAttribute("jsonStr", data);
		        out.print(data);
			}
	        st.close();
	        conn.close();
	        
	        	
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
    }

	@RequestMapping(value = "admin/hadoop/check_enginewithCluster", method = RequestMethod.GET)
	public void check_enginewithCluster(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "id", required=true) String p_id
  		) throws Exception {
		
		System.out.printf("============>check_enginewithCluster\n");
		
    	PrintWriter out = resp.getWriter();
    	
    	Connection conn = null;                                        // null로 초기화 한다.
    	String sReqid  = "";
    	
    	
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	sReqid = p_id;
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	System.out.println("MYSQL DB CONNECTED.");                            // 커넥션이 제대로 연결되면 수행된다.
	    	
	    	java.sql.Statement st = null;
			ResultSet rs = null;
			st = conn.createStatement();
			
			rs = st.executeQuery("SELECT COUNT(*) AS RC , NAME FROM ENGINE WHERE CLUSTER_ID =" + sReqid);
	
			JSONObject data = new JSONObject();
	        if(rs.next())
	        {
		        data.put("rc", rs.getString("RC"));
		        data.put("eng_name", rs.getString("NAME"));
	        }
	        //JSONObject spec = new JSONObject();
	        //spec.put("data", data);
	        
	        rs.close();
	        st.close();
	        conn.close();
	        JSONObject match_result = new JSONObject();
	        match_result.put("success", "true");
	        match_result.put("data", data);
	        
	        req.setAttribute("jsonStr", match_result);
	        System.out.println(match_result);
	        out.print(match_result);	
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
	}

	@RequestMapping(value = "mrjar/get", method = RequestMethod.GET)
	public void get_mrjar(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "method", required=true) String method
  		, @RequestParam(value = "group", required=false) String p_group
  		, @RequestParam(value = "artifact", required=false) String p_artifact
  		, @RequestParam(value = "version", required=false) String p_version
  		, @RequestParam(value = "code", required=false) String p_code
  		, @RequestParam(value = "state", required=false) String p_state
  		) throws Exception {
		
		System.out.printf("============>mrjar/get\n");		
		
    	PrintWriter out = resp.getWriter();
           
    	String str_group  = "A01";    	
    	String str_method = "";
    	str_method = method;    	
    	
    	Connection conn = null;  
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	JSONObject JARversion = new JSONObject();
	    	java.sql.Statement st = null;
	    	ResultSet rs = null;
			st = conn.createStatement();	
						 
			 System.out.println("--------->" + str_method);			 
			 
			if("get".equals(str_method))
	    	{
		    	//SELECT BLOCK
				
				rs = st.executeQuery("SELECT  CODE, CODENAME,  VERCHECK  FROM  ANKUS_CODE WHERE CODE <> 0 AND CODEGROUP ='" + str_group +"'");	
		        JSONArray arr = new JSONArray();
		      
		        while (rs.next ())
		        {		        
		        	String code = rs.getString("CODE");
		        	String codename = rs.getString("CODENAME");
		        	String state = rs.getString("VERCHECK");
		        	
		        	String [] array = codename.split(":");		        	
		        	String group = array[0];
			        String artifact = array[1];
			        String version = array[2];	
			        		        			        
		        	 JSONObject data = new JSONObject();
		        	 
			        data.put("CODE", code);
			        data.put("CODENAME", codename);		
			        data.put("GROUP", group);		
			        data.put("ARTIFACT", artifact);		
			        data.put("VERSION", version);	
			        data.put("STATE", state);
			       	
			        if(data != null){
			        arr.add(data);
			        }
		        }	      
		        rs.close();			        
		        JARversion.put("success", "true");
		        JARversion.put("data", arr);		        
	    	}	    	
	    	else if("update".equals(str_method))
	    	{
	    		String str_code = p_code;	    	
	    		String str_state = p_state;    	
	        	
	    		String before_query = "";
	    		before_query = "UPDATE ANKUS_CODE SET VERCHECK='N'";
	    		before_query  += "WHERE CODEGROUP ='" + str_group +"'";
	    		st.executeUpdate(before_query);    		
	    		
	    		String update_query="";
				update_query = "UPDATE ANKUS_CODE SET VERCHECK='" + str_state + "'";				
				update_query += "WHERE CODEGROUP ='" + str_group +"'";
				update_query += "AND CODE ='" + str_code +"'";
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("gubun".equals(str_method)){
	    		
	    		String selectQuery = "";
	    		
	    		selectQuery = "SELECT  CODENAME  FROM  ANKUS_CODE ";
	    		selectQuery  += "WHERE CODEGROUP ='" + str_group +"'";
	    		selectQuery  += " AND VERCHECK ='Y'";
	    		
	    		rs = st.executeQuery(selectQuery);	
	    		JSONObject data = new JSONObject();	
	    		
		        if (rs.next ())
		        {		            
		        	String codename = rs.getString("CODENAME");		        				        
			        data.put("CODENAME_VAR", codename);		
		        }
		        
		        rs.close();		        
		        JARversion.put("success", "true");		       
		        JARversion.put("data", data);
		        
	    	}else if("add".equals(str_method))
	    	{	    		
	    		String group = p_group;	
	    		String artifact = p_artifact;	
	    		String version = p_version;
	    		String str_codename = group + ":" + artifact + ":" + version;	    
	        		    		
	    		String add_query="";
	    		add_query = "INSERT INTO ANKUS_CODE (SEQ, CODEGROUP, GROUPNAME, CODE, CODENAME, DESCRIPTION, VERCHECK, CREATE_DT, MODIFY_DT)";			
	    		add_query += " VALUES ( (SELECT MAX(SEQ)+1 FROM ANKUS_CODE AS TMB_ANKUS),'A01','JAR',(SELECT MAX(CODE)+1 FROM ANKUS_CODE AS TMB_ANKUS WHERE CODEGROUP='A01'),'" + str_codename + " ','','N',current_date()+0,'')";	    
				System.out.println(add_query);
				int rtn = st.executeUpdate(add_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("edit".equals(str_method)){
	    		String str_code = p_code;
	    		String group = p_group;	
	    		String artifact = p_artifact;	
	    		String version = p_version;
	    		String str_codename = group + ":" + artifact + ":" + version;	       	
	        		    			    		
	    		String update_query="";
				update_query = "UPDATE ANKUS_CODE SET CODENAME='" + str_codename + "'";				
				update_query += "WHERE CODEGROUP ='" + str_group +"'";
				update_query += "AND CODE ='" + str_code +"'";
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}else if("delete".equals(str_method)){
	    		String str_code = p_code;
	    			        		    			    		
	    		String update_query="";
				update_query = "DELETE FROM ANKUS_CODE WHERE CODE='" + str_code + "' AND CODEGROUP='A01'";				
				System.out.println(update_query);
				int rtn = st.executeUpdate(update_query);
				
				if(rtn >= 0)
				{
					JARversion.put("success", "true");
				}
				else
				{
					JARversion.put("success", "fail");
				}
	    	}
	        st.close();
	        conn.close();        
	      	out.print(JARversion);
	        System.out.println(JARversion);
	      	        
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
	}

	@RequestMapping(value = "wfexport/get", method = RequestMethod.GET)
	public void get_wfexport(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "method", required=true) String method
  		, @RequestParam(value = "wf_id", required=true) String p_wf_id
  		, @RequestParam(value = "name", required=true) String p_name
  		) throws Exception {
		
		System.out.printf("============>wfexport/get\n");
		
    	String str_method = "";
    	str_method = method;    	
    	
    	String str_wf_id = "";	
		String str_name = "";	
		String str_wfxml = "";
		String str_dsxml = "";
		
    	str_wf_id = p_wf_id;	    	
		String rename = p_name;
		
		
    	Connection conn = null;      	
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	JSONObject JARversion = new JSONObject();
	    	java.sql.Statement st = null;
	    	ResultSet rs = null;
			st = conn.createStatement();					
		    //SELECT BLOCK
			 
			if("export".equals(str_method))	{	
				rs = st.executeQuery("SELECT  WORKFLOW_XML, DESIGNER_XML  FROM  WORKFLOW WHERE WORKFLOW_ID='" + str_wf_id +"'");	
				
				while (rs.next ()){
					str_wfxml = rs.getString("WORKFLOW_XML");
					str_dsxml = rs.getString("DESIGNER_XML");
				}
				 // 파일 객체 생성
				if(str_name != null){
				str_name = (rename.replace(" ","_")+".workflow.ankus");
				}
				
				Configuration conf = new Configuration();				
				//conf.set("fs.default.name", "hdfs://localhost:9000");
				//conf.set("fs.default.name", "hdfs://server:9000");
				FileSystem dfs = FileSystem.get(conf);
				
				//FileSystem dfs = HdfsUtils.getFileSystemFromPath("/temp/"+str_name);
				
				Path filenamePath = new Path("/temp/"+str_name);
				System.out.println("File Exists : " + dfs.exists(filenamePath));
				  
				if(dfs.exists(filenamePath)) {
					dfs.delete(filenamePath, true);
				}
				  
				FSDataOutputStream tmpout = dfs.create(filenamePath);
				tmpout.writeUTF(str_wfxml + "xx_srt_workflow_xx" + str_dsxml);	
				tmpout.close();
				
				FSDataInputStream in = dfs.open(filenamePath);
				String messageIn = in.readUTF();
				System.out.print(messageIn);			
				in.close();				
		        dfs.close();		       
	    	}
			/*
			else if("deletet".equals(str_method)){					
	    		Configuration conf = new Configuration();				
	    		conf.set("fs.default.name", "hdfs://localhost:9000");	
	    		FileSystem dfs = FileSystem.get(conf);		
	    		 // 파일 객체 생성
				if(str_name != null){
				str_name = (rename.replace(" ","_")+".workflow.ankus");
				}	    		
	    		Path filenamePath = new Path("/temp/"+str_name);
	    		dfs.delete(filenamePath, true);
	    		dfs.close();	
	    	}
	    	*/
			else{
				PrintWriter out = resp.getWriter();
	    		rs = st.executeQuery("SELECT  WORKFLOW_ID, NAME,  WORKFLOW_XML, DESIGNER_XML  FROM  WORKFLOW");	
			    JSONArray arr = new JSONArray();
			      
			    while (rs.next ())
			    {			    	
			      	String wf_id = rs.getString("WORKFLOW_ID");
			       	String name = rs.getString("NAME");
			       	String wfxml = rs.getString("WORKFLOW_XML");
			       	String dsxml = rs.getString("DESIGNER_XML");
				        		        			        
			      	 JSONObject data = new JSONObject();
			        	 
				    data.put("WORKFLOW_ID", wf_id);
				    data.put("NAME", name);		
				    data.put("WORKFLOW_XML", wfxml);		
				    data.put("DESIGNER_XML", dsxml);	
				       	
				    if(data != null){
				    	arr.add(data);
				    }
			    }	      
			    rs.close();			        
			    JARversion.put("success", "true");
			    JARversion.put("data", arr);		
			    out.print(JARversion);
			    System.out.println(JARversion);   
	    	}
	        st.close();
	        conn.close();        
	                
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}   	 
	}
	
	@RequestMapping(value = "wfimport/get", method = RequestMethod.GET)
	public void get_wfimport(HttpServletRequest req, HttpServletResponse resp
  		, @RequestParam(value = "name", required=true) String name
  		) throws Exception {
		
		System.out.printf("============>wfimport/get\n");
		
    	PrintWriter out = resp.getWriter();
    	
    	String str_name = name;   
    	
    	String str_wf_id = "";	
    	String str_wfxml = "";
		String str_dsxml = "";
    	
    	Connection conn = null;  
    	
    	try{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	JSONObject JARversion = new JSONObject();
	    	java.sql.Statement st = null;
	    	PreparedStatement pstmt = null;
	    	ResultSet rs = null;
			st = conn.createStatement();					
		    //SELECT BLOCK
						
			Configuration conf = new Configuration();				
			//conf.set("fs.default.name", "hdfs://localhost:9000");
			conf.set("fs.default.name", "hdfs://server:9000");
			FileSystem dfs = FileSystem.get(conf);			
			Path filenamePath = new Path("/temp/"+str_name);			
			StringBuilder sb=new StringBuilder();
			BufferedReader bfr=new BufferedReader(new InputStreamReader(dfs.open(filenamePath)));  
			String str = null;
			
			 while ((str = bfr.readLine())!= null) {
				 sb.append(str);
				 sb.append("\n");				 
  	         }		
			 String [] str_xml = sb.toString().split("xx_srt_workflow_xx");
			 str_wfxml = str_xml[0];	
			 str_dsxml = str_xml[1];	
			
			 pstmt = conn.prepareStatement("INSERT INTO TREE ( ID, NAME, TREE, NODE, ROOT, USERNAME, PARENT_ID ) VALUES ( 0, ?, 'WORKFLOW','ITEM', 0, 'admin', 1 )" );
			 pstmt.setString(1, str_name);
			 pstmt.executeUpdate();
			 
			 rs = st.executeQuery("SELECT MAX(ID) AS ID FROM TREE");	
			 while (rs.next ()){
				 str_wf_id = rs.getString("ID");					
			}
			 
			 pstmt = conn.prepareStatement("INSERT INTO WORKFLOW ( ID, WORKFLOW_ID, NAME, DESCRIPTION, VARIABLE, WORKFLOW_XML, DESIGNER_XML, CREATE_DT, STATUS, TREE_ID, USERNAME ) VALUES ( 0, CONCAT('WF_',CURDATE()+0,'_',FLOOR(RAND()*1000000000)), ?,'',NULL, ?, ?, NOW(), 'REGISTERED',?, 'admin' )" );
			 pstmt.setString(1, str_name);
			 pstmt.setString(2, str_wfxml);
			 pstmt.setString(3, str_dsxml);
			 pstmt.setString(4, str_wf_id);
			 pstmt.executeUpdate();
			 
			 dfs.delete(filenamePath, true);
			 
	    }
    	catch(Exception e)
    	{                                                    // 예외가 발생하면 예외 상황을 처리한다.
	    	System.out.println(e.toString());
    	}
	}
	
	// 2016-03-08 hadoop append api 
	@RequestMapping(value = "/addline", method = RequestMethod.POST)
	public void addline(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "hadoopurl", required=true) String hadoopurl
	  	, @RequestParam(value = "file", required=true) String file
	  	, @RequestParam(value = "data", required=true) String data
	  	, @RequestParam(value = "account", required=false) String account
  		) throws Exception {
		
//		System.out.printf("============>addline\n");
		
		Date ct = new Date();
		
		String year = String.format("%04d", ct.getYear()+1900);
		String month = String.format("%02d", ct.getMonth()+1);
		String day = String.format("%02d", ct.getDate());
		String hour = String.format("%02d", ct.getHours());
		String minute = String.format("%02d", ct.getMinutes());
		String second = String.format("%02d", ct.getSeconds());

		file = file.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second);
		data = data.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second).replaceAll("\\\\r", "\r").replaceAll("\\\\n", "\n").replaceAll("\\\\t", "\t");
		
		try {
			Configuration conf = new Configuration();
			
			conf.set("fs.hdfs.impl", org.apache.hadoop.hdfs.DistributedFileSystem.class.getName());
			conf.set("fs.file.impl", org.apache.hadoop.fs.LocalFileSystem.class.getName());			  
//			conf.set("fs.default.name", hadoopurl, account);
//			FileSystem dfs = FileSystem.get(conf);
			FileSystem dfs = null;
			if(account==null) dfs = FileSystem.get(new URI(hadoopurl), conf);
			else dfs = FileSystem.get(new URI(hadoopurl), conf, account);
			
			Path filePath = new Path(file);
			if(dfs.exists(filePath)) { // append
				FSDataOutputStream out = dfs.append(filePath);
				out.writeBytes(data);
				out.close();
			}
			else
			{
				  FSDataOutputStream out = dfs.create(filePath);
				  out.writeBytes(data);
				  out.close();
			}

			PrintWriter out = resp.getWriter();
			out.write(data);
			
		} catch (Exception e) {
		
			System.out.print(e.getMessage());
		}
	}
	
	// 2016-03-08 hadoop append api 
	@RequestMapping(value = "/addlineget", method = RequestMethod.GET)
	public void addlineget(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "hadoopurl", required=true) String hadoopurl
	  	, @RequestParam(value = "file", required=true) String file
	  	, @RequestParam(value = "data", required=true) String data
	  	, @RequestParam(value = "account", required=false) String account
  		) throws Exception {
		
//		System.out.printf("============>addline\n");

		Date ct = new Date();
		
		String year = String.format("%04d", ct.getYear()+1900);
		String month = String.format("%02d", ct.getMonth()+1);
		String day = String.format("%02d", ct.getDate());
		String hour = String.format("%02d", ct.getHours());
		String minute = String.format("%02d", ct.getMinutes());
		String second = String.format("%02d", ct.getSeconds());

		file = file.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second);
		data = data.replaceAll("\\{year\\}", year).replaceAll("\\{month\\}", month).replaceAll("\\{day\\}", day).replaceAll("\\{hour\\}", hour).replaceAll("\\{minute\\}", minute).replaceAll("\\{second\\}", second).replaceAll("\\\\r", "\r").replaceAll("\\\\n", "\n").replaceAll("\\\\t", "\t");
		
		try {
			Configuration conf = new Configuration();
			conf.set("fs.hdfs.impl", org.apache.hadoop.hdfs.DistributedFileSystem.class.getName());
			conf.set("fs.file.impl", org.apache.hadoop.fs.LocalFileSystem.class.getName());			  
//			conf.set("fs.default.name", hadoopurl, account);
//			FileSystem dfs = FileSystem.get(conf);
			FileSystem dfs = null;
			if(account==null) dfs = FileSystem.get(new URI(hadoopurl), conf);
			else dfs = FileSystem.get(new URI(hadoopurl), conf, account);
			
			Path filePath = new Path(file);
			if(dfs.exists(filePath)) { // append
				FSDataOutputStream out = dfs.append(filePath);
				out.writeBytes(data);
				out.close();
			}
			else
			{
				  FSDataOutputStream out = dfs.create(filePath);
				  out.writeBytes(data);
				  out.close();
			}

			PrintWriter out = resp.getWriter();
			out.write(data);
			
		} catch (Exception e) {
		
			System.out.print(e.getMessage());
		}
	}
	
	/*
	// 2016-03-08 algorithm meta info load from jar file 
	@RequestMapping(value = "getmoduleinfos", method = RequestMethod.POST)
	public void getmoduleinfos(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "path", required=false) String path
  		) throws Exception {
		
//		System.out.printf("============>getmoduleinfos\n");
		
		if(path==null) path = "/tmp/cache/";
		
		ArrayList<HashMap<String, Object>> metainfos = readmetainfos(path);
		
    	PrintWriter out = null;
		out = resp.getWriter();
		
        ObjectMapper mapper = new ObjectMapper();
        
        out.write(mapper.writeValueAsString(metainfos));
	}	

	// 2016-03-08 get resource from jar file 
	@RequestMapping(value = "getmoduleresource", method = RequestMethod.GET)
	public void getmoduleresource(HttpServletRequest req, HttpServletResponse resp
		, @RequestParam(value = "jarfile", required=true) String jarfile
		, @RequestParam(value = "resource", required=true) String resource
  		) throws Exception {
		
//		System.out.printf("============>getmoduleresource\n");
		
		byte[] data = readfile(jarfile, resource);

        IOUtils.write(data, resp.getWriter());
		
	}	
	*/
	// 2016-04-20 Tajo REST 관련 API 
	@RequestMapping(value = "/get_tajotables", method = RequestMethod.POST) //(ip,port,database)
	@ResponseBody
	public HashMap<String, Object> get_tajotables(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			mv.put("code",0);
			mv.put("data",Util_tajo_n_shell.tajo_getTables(ip, port, database));
			mv.put("message","success");
		} catch(Exception e) {
			mv.put("code",500);
			mv.put("message",e.getMessage());
			
		}
		
		return mv;
	}
	
	@RequestMapping(value = "/get_tajodatabases", method = RequestMethod.POST) //(ip,port)
	@ResponseBody
	public HashMap<String, Object> get_tajodatabases(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try{
			mv.put("code",0);
			mv.put("data",Util_tajo_n_shell.tajo_getDatabases(ip, port));
			mv.put("message","success");
		}
		catch(Exception e) {
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	@RequestMapping(value = "/run_tajoQuery", method = RequestMethod.POST)//(ip,port,database,sql)
	@ResponseBody
	public HashMap<String, Object> run_tajoQuery(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
					, @RequestParam(value = "sql", required=true) String sql
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		Connection conn = null;

		try {
			conn = Util_tajo_n_shell.tajo_connect(ip, port, database);
		} catch(Exception e)
		{
			mv.put("code",500);
			mv.put("message",e.getMessage());
			return mv;
		}
		
		try {
			ResultSet rs = Util_tajo_n_shell.tajo_query(conn, sql);
	
			ArrayList<Object> datas = new ArrayList<Object>();
			boolean bfirst = true;
			int fcnt = 0;
			while(rs.next())
			{
				if(bfirst)
				{
					ArrayList<String> flds = new ArrayList<String>();
					
					ResultSetMetaData meta = rs.getMetaData();
					
//					System.out.printf("sql=%s, cnt=%d\n", sql, meta.getColumnCount());
					for(int i=1; i<=meta.getColumnCount(); i++)
					{
						String n = meta.getColumnName(i);
//						System.out.printf("field=%s, idx=%d\n", n, i);
	
						flds.add(meta.getColumnName(i));
					}
					mv.put("fields", flds);
					fcnt = meta.getColumnCount();
				}
	
				ArrayList<Object> cols = new ArrayList<Object>();
				for(int i=1; i<=fcnt; i++)
				{
					cols.add(rs.getObject(i));
				}
				datas.add(cols);
	
			}
			rs.close();
			conn.close();
			mv.put("code",0);
			mv.put("data",datas);
			mv.put("message","success");
		}
		catch(Exception e) {
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}

	@RequestMapping(value = "/create_tajoDatabase", method = RequestMethod.POST)//(ip,port,database)
	@ResponseBody
	public HashMap<String, Object> create_tajoDatabase(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_createDatabase(ip, port, database);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		}
		catch(Exception e) 
		{
			mv.put("code",500);
			mv.put("message", e.getMessage());
		}
		
		return mv;
	}

	@RequestMapping(value = "/create_tajoTable", method = RequestMethod.POST) //(ip,port,database,createSql)
	@ResponseBody
	public HashMap<String, Object> create_tajoTable(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
					, @RequestParam(value = "createSql", required=true) String createSql
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_createTable(ip, port, database, createSql);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		} catch(Exception e){
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	
	@RequestMapping(value = "/del_tajoTable", method = RequestMethod.POST) //(ip,port,database,table)
	@ResponseBody
	public HashMap<String, Object> del_tajoTable(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
					, @RequestParam(value = "table", required=true) String table
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_dropTable(ip, port, database, table);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		} catch(Exception e){
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	
	
	@RequestMapping(value = "/del_tajoDatabase", method = RequestMethod.POST) //(ip,port,database)
	@ResponseBody
	public HashMap<String, Object> del_tajoDatabase(HttpServletRequest req, HttpServletResponse resp
					, @RequestParam(value = "ip", required=true) String ip
					, @RequestParam(value = "port", required=false, defaultValue="26002") Long port
					, @RequestParam(value = "database", required=true) String database
			  		) {
		
		HashMap<String, Object> mv = new HashMap<String, Object>();
		
		try {
			boolean issuccess = Util_tajo_n_shell.tajo_dropdatabase(ip, port, database);
			
			if(issuccess)
			{
				mv.put("code",0);
				mv.put("message","success");
			}
			else
			{
				mv.put("code",500);
				mv.put("message","fail");
			}
		} catch(Exception e){
			mv.put("code",500);
			mv.put("message",e.getMessage());
		}
		
		return mv;
	}
	
	// 2016-03-08 algorithm meta info load from jar file 
	@RequestMapping(value = "getmoduleinfos", method = RequestMethod.POST)
	public void getmoduleinfos(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "path", required=false) String path
  		) throws Exception {
		
		System.out.printf("============>getmoduleinfos\n");
		
		if(path==null) path = "/tmp/cache/jar";
		
		ArrayList<HashMap<String, Object>> metainfos = readmetainfos(path);
		
    	PrintWriter out = null;
		out = resp.getWriter();
		
        ObjectMapper mapper = new ObjectMapper();
        
        out.write(mapper.writeValueAsString(metainfos));
	}	

	// 2016-03-08 get resource from jar file 
	@RequestMapping(value = "getmoduleresource", method = RequestMethod.GET)
	public void getmoduleresource(HttpServletRequest req, HttpServletResponse resp
		, @RequestParam(value = "jarfile", required=true) String jarfile
		, @RequestParam(value = "resource", required=true) String resource
  		) throws Exception {
		/*
		System.out.printf("============>getmoduleresource\n");
		
		byte[] data = readfile(jarfile, resource);

        IOUtils.write(data, resp.getWriter());
        */
        byte[] data = readfile(jarfile, resource);

        System.out.printf("============>getmoduleresource(%s:%d)\n", resource, data.length);
        
        BufferedOutputStream output = new BufferedOutputStream(resp.getOutputStream());   
        
        output.write(data);
        output.close();
		
	}	
	
	// --------------------- jar func ....
	// 2016-03-08 meta정보 load 기초함수..
    private ArrayList<HashMap<String, Object>> readmetainfos(String folder)
    {
    
		File path  = new File(folder);
        ObjectMapper mapper = new ObjectMapper();
		ArrayList<HashMap<String, Object>> algorithms = new ArrayList<HashMap<String, Object>>(); 
		
		File[] files = path.isDirectory() ? path.listFiles(): new File[]{path};
		for(File f:files)
		{
			if(f.isFile())
			{
				String fname = f.getAbsolutePath();
				String ext = "";
				int p = fname.lastIndexOf(".");
				if(p>=0) ext = fname.substring(p+1);

				if(ext.equalsIgnoreCase("jar"))
				{
					try {
						byte[] meta = readfile(fname, "res/appinfo.json");
	                    HashMap<String, Object> metainfo = mapper.readValue(new String(meta), new HashMap<String, Object>().getClass());
	                    
	                    for(HashMap<String, Object> ainfo:(ArrayList<HashMap<String, Object>>)metainfo.get("applist"))
	                    {
	                    	ainfo.put("path", fname);
	                    	ainfo.put("author", metainfo.get("author"));
	                    	ainfo.put("create", metainfo.get("create"));
	                    	ainfo.put("packagename", metainfo.get("packagename"));
	                    	algorithms.add(ainfo);
	                    }

					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}				
			}
		}

		return algorithms;
    }    
    private byte[] readfile(String zipFilePath, String fname) throws IOException {
        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));
        ZipEntry entry = zipIn.getNextEntry();
        // iterates over entries in the zip file
        
        byte[] read = null;
        
        if(fname.startsWith("/")) fname = fname.substring(1);
        
        while (entry != null) {
            if (!entry.isDirectory()) {
                // if the entry is a file, extracts it
            	if(entry.getName().equals(fname))
            	{
            		read = extractFileRead(zipIn);
            		break;
            	}
            }
            zipIn.closeEntry();
            entry = zipIn.getNextEntry();
        }
        zipIn.close();
        return read;
    	
    }
    
    private byte[] extractFileRead(ZipInputStream zipIn) throws IOException {
    	ByteArrayOutputStream bs = new ByteArrayOutputStream();
        
        byte[] bytesIn = new byte[8192];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
        	bs.write(bytesIn, 0, read);
        }
        return bs.toByteArray();
    }	
}
