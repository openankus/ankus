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

package org.openflamingo.web.designer;

import java.io.BufferedInputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.net.URLEncoder;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.openflamingo.model.rest.Authority;
import org.openflamingo.model.rest.Context;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.FileSystemCommand;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.Response;
import org.openflamingo.model.rest.SecurityLevel;
import org.openflamingo.provider.fs.FileSystemService;
import org.openflamingo.util.FileUtils;
import org.openflamingo.util.HdfsUtils;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.core.RemoteService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.security.SessionUtils;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

import org.openflamingo.provider.fs.FileSystemService;
public class WorkflowExport extends HttpServlet {
	
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
	
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    	// key와 value로 구성되어있는 HashMap 생성.    
    	String str_method = "";
    	str_method = req.getParameter("method");    	
    	
    	String str_wf_id = "";	
		String str_name = "";	
		String str_wfxml = "";
		String str_dsxml = "";
		
    	str_wf_id = req.getParameter("wf_id");	    	
		String rename = req.getParameter("name");
		
		
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

    
}
	    	