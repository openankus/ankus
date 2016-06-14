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

import static org.slf4j.helpers.MessageFormatter.format;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.openflamingo.fs.hdfs.HdfsHelper;
import org.openflamingo.model.rest.Authority;
import org.openflamingo.model.rest.Context;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.NodeType;
import org.openflamingo.model.rest.Response;
import org.openflamingo.model.rest.SecurityLevel;
import org.openflamingo.model.rest.Tree;
import org.openflamingo.model.rest.TreeType;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.model.workflow.PreviewFile;
import org.openflamingo.provider.engine.HistoryService;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.core.LocaleSupport;
import org.openflamingo.web.core.RemoteService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.member.Member;
import org.openflamingo.web.member.MemberService;
import org.openflamingo.web.security.SessionUtils;
import org.openflamingo.web.tree.TreeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Workflow Designer Controller.
 *
 * @author Edward KIM
 * @version ankus 0.2.1
 * @modify Suhyun Jeon
 */
@Controller
@RequestMapping("/designer")
public class DesignerController extends LocaleSupport {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(DesignerController.class);

    /**
     * ROOT 노드의 ID
     */
    private final static String ROOT = "/";

    /**
     * Workflow Tree Service
     */
    @Autowired
    private TreeService treeService;
    
    @Autowired
    private RemoteService lookupService;

    /**
     * Designer Service
     */
    @Autowired
    private DesignerService designerService;

    @Autowired
    private EngineService engineService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;
    
    @Autowired
    private MemberService memberService;

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
     * 워크플로우를 등록한다.
     *
     * @param workflowId   워크플로우 식별자 ID
     * @param treeId       트리 노드의 ID
     * @param parentTreeId 부모 트리 노드의 ID
     * @param clusterId    Hadoop Cluster의 ID
     * @param xml          OpenGraph XML
     * @return HTTP Response
     */
    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response save(@RequestParam(defaultValue = "-1") Long id,
    					 @RequestParam(value = "username") String user_name, //2015.01.30 whitepoo@onycom.com
    					 @RequestParam(value = "workflowName") String workflowName,
                         @RequestParam(defaultValue = "") String workflowId,
                         @RequestParam(defaultValue = "-1") Long treeId,
                         @RequestParam(defaultValue = "/") String parentTreeId,
                         @RequestParam(defaultValue = "0") Long clusterId,
                         @RequestBody String xml) {

        if (logger.isDebugEnabled()) {
            logger.debug("Request OpenGraph XML is \n{}", xml);
        }
        
        SessionUtils.setUsername(user_name);//2015.01.30 whitepoo@onycom.com
        
        Response response = new Response();
        
        try {
            Workflow workflow = null;               
            int cnt = wf_list(workflowName, 0);
                        
            if (id > -1 && cnt > 0) {
               	workflow = designerService.update(treeId, id, xml, SessionUtils.getUsername()); 
            }else{	
                workflow = designerService.regist(parentTreeId, xml, SessionUtils.getUsername());
            }

            response.getMap().put("instance_id", workflow.getWorkflowId());
            response.getMap().put("cluster", clusterId); // FIXME
            response.getMap().put("id", String.valueOf(workflow.getId()));
            response.getMap().put("tree_id", String.valueOf(workflow.getWorkflowTreeId()));
            response.getMap().put("name", String.valueOf(workflow.getWorkflowName()));
            response.getMap().put("desc", String.valueOf(workflow.getDescription()));
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_REGIST_WORKFLOW", workflowId, ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }
    
    public int wf_list(String workflowName, int cnt)
    {
     	Connection conn = null;    
    
        try
        {
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    		
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
	    	
	    	java.sql.Statement st = null;
			ResultSet rs = null;
			st = conn.createStatement();
			
			String query = "SELECT COUNT(*)  AS TOTAL FROM WORKFLOW WHERE NAME='" + workflowName + "'";
			rs = st.executeQuery(query);
			
			if(rs.next())
	        {
				cnt = rs.getInt("TOTAL");
	        }
        }
        catch (Exception ex) 
        { 
        	System.out.println("workflowName : " +ex.toString());
        	//time_stamp = "0000-00-00 00:00:00";
        }        
		return cnt;
    }

    /**
     * 워크플로우를 로딩한다. 만약 OpenGraph 기반 워크플로우가 존재하지 않는다면 CLI를 통해서 등록했다는 가정을 할 수 있으므로
     * 클라이언트에게 에러 코드를 전달한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "load", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> load(@RequestParam Long id) {
        MultiValueMap headers = new HttpHeaders();
        try {
            String designerXml = designerService.load(id);
            headers.set("Content-Type", "text/plain; charset=UTF-8");
            return new ResponseEntity<String>(designerXml, headers, HttpStatus.OK);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_LOAD_WORKFLOW", id.toString(), ex.getMessage());
            logger.warn("{}", message, ex);
            headers.set("Content-Type", "text/plain; charset=UTF-8");
            return new ResponseEntity<String>(ex.getMessage(), headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  

    /**
     * 워크플로우를 로딩한다. 만약 OpenGraph 기반 워크플로우가 존재하지 않는다면 CLI를 통해서 등록했다는 가정을 할 수 있으므로
     * 클라이언트에게 에러 코드를 전달한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "previewHDFSFile", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile(@RequestParam String inputPath, String delimiter, long engineId) {
        Response response = new Response();
        
        try {
        	
            // Get hadoop cluster
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
            String hdfsUrl = hadoopCluster.getHdfsUrl();
            Configuration configuration = HdfsHelper.getConfiguration(hadoopCluster);  /*20140917 안재성 추가*/
            
            FileSystem fileSystem = FileSystem.get(configuration);
            Path path = new Path(hdfsUrl + inputPath);
                        
            if (fileSystem.isFile(path)==false) {
              
            	 FileStatus [] statuses = fileSystem.listStatus(path);
            	 path = statuses[0].getPath();
             }
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileSystem.open(path)));
                                    
            String lines;
            int count = 0;
            int keyNumber = -1;
            
            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            Map map = new HashMap();
            String[] splits = {};

            while ((lines = bufferedReader.readLine()) != null) {
                count++;
                
                /*20140917 안재성 수정 ###############*/
                keyNumber++;
                splits = lines.split(delimiter);
                map.put(keyNumber, lines);
                if (count > 5) { break; }
                /*############### 20140917 안재성 수정*/
            }
            
            //Closed bufferedReader
            bufferedReader.close();
            
            int columnLength = splits.length;
            System.out.println("columnLength : " + columnLength);
            StringBuffer stringBuffer = new StringBuffer();

            for (int i = 0; i <= columnLength - 1; i++) {
                columnIndexList.add(i);
                for (Object line : map.values()) {
//                    stringBuffer.append(splits[i]).append(","); /*20140917 안재성 수정*/                	
                    stringBuffer.append(line.toString().split(delimiter)[i]).append(","); /*20140917 안재성 수정*/                   
                }
                stringBuffer.append("::");
            }
            
             for (String row : stringBuffer.toString().split(",::")) {      
            	 
            	int val_count = row.split(",").length;
            	if(val_count < 6){
            		rowDataList.add(row);
            	}else{
            		 rowDataList.add(row + "...");
            	}               
            }

            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);

            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getMessage());
            response.setSuccess(false);
            return response;
        }
    }
    
    /**
     * 워크플로우를 로딩한다. 만약 OpenGraph 기반 워크플로우가 존재하지 않는다면 CLI를 통해서 등록했다는 가정을 할 수 있으므로
     * 클라이언트에게 에러 코드를 전달한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "previewHDFSFile_FP", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile_FP(@RequestParam String inputPath, String delimiter, long engineId) {
        Response response = new Response();
        
        try {
        	
            // Get hadoop cluster
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
            String hdfsUrl = hadoopCluster.getHdfsUrl();
            Configuration configuration = HdfsHelper.getConfiguration(hadoopCluster);  
            
            FileSystem fileSystem = FileSystem.get(configuration);
            Path path = new Path(hdfsUrl + inputPath);
                        
            if (fileSystem.isFile(path)==false) {
              
            	 FileStatus [] statuses = fileSystem.listStatus(path);
            	 path = statuses[0].getPath();
             }
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileSystem.open(path)));
                                    
            String lines;
            int count = 0;

            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            String[] splits = {};
            
            StringBuffer stringBuffer = new StringBuffer();
            int columnLength = 0;
            
            while ((lines = bufferedReader.readLine()) != null) {
            	count++; 
                splits = lines.split(delimiter);                
                columnIndexList.add(count);    
                
                columnLength = splits.length;
                for (int i = 0; i <= columnLength - 1; i++) {    
                	stringBuffer.append(lines.toString().split(delimiter)[i]).append(",");                 
                }
                stringBuffer.append("::");
                columnLength = 0;
                
                if (count > 4) { break; }
            }              

            bufferedReader.close();
            columnLength = splits.length;
          
            
            for (String row : stringBuffer.toString().split(",::")) {
            	int val_count = row.length();
            	System.out.println("val_count" + val_count);
            	if(val_count < 75){
            		rowDataList.add(row);  
            	}else{
            		rowDataList.add(row.substring(0,75) + "...");            		
            	}                           
            }
            
			
            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);

            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getMessage());
            response.setSuccess(false);
            return response;
        }
    }
    
    @RequestMapping(value = "previewHDFSFile_tab", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile_tab(@RequestParam String inputPath, String delimiter, long engineId) {
        Response response = new Response();
        
        try {
        	
            // Get hadoop cluster
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
            String hdfsUrl = hadoopCluster.getHdfsUrl();
            Configuration configuration = HdfsHelper.getConfiguration(hadoopCluster);  
            
            FileSystem fileSystem = FileSystem.get(configuration);
            Path path = new Path(hdfsUrl + inputPath);
                        
            if (fileSystem.isFile(path)==false) {
              
            	 FileStatus [] statuses = fileSystem.listStatus(path);
            	 path = statuses[0].getPath();
             }
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileSystem.open(path)));
                                    
            String lines;
            int count = 0;

            List<Integer> columnIndexList = new ArrayList<Integer>();            
            ArrayList<String> rowDataList = new ArrayList<String>();
            String[] splits = {};
            
            StringBuffer stringBuffer = new StringBuffer();
            int columnLength = 0;
            
            while ((lines = bufferedReader.readLine()) != null) {
            	System.out.println("lines : "+ lines);
            	
            	count++; 
                splits = lines.split(delimiter);                
                columnIndexList.add(count);    
                
                System.out.println("splits : "+ splits);
                
                columnLength = splits.length;
                for (int i = 0; i < columnLength; i++) {    
                	if(i != columnLength - 1){
                		stringBuffer.append(lines.toString().split(delimiter)[i]).append(','); 
                	}else{
                		stringBuffer.append(lines.toString().split(delimiter)[i]); 
                	}              
                }
                stringBuffer.append("::");
                
                System.out.println("stringBuffer : "+ stringBuffer);
                columnLength = 0;
                
                if (count > 50) { break; }
            }              

            bufferedReader.close();
            columnLength = splits.length;
          
            
            for (String row : stringBuffer.toString().split("::")) {
            	//int val_count = row.length();
            	
            	//if(val_count < 75){
            		rowDataList.add(row);  
            	//}else{
            	//	rowDataList.add(row.substring(0,75) + "...");            		
            	//}                           
            }
            
			
            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);

            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getMessage());
            response.setSuccess(false);
            return response;
        }
    }
    
    /**
     * 하둡 파일을 읽어서 프리뷰에 표시할 형태로 가져온다.<br>
     * TAJO사용
     * @param inputPath 파일위치
     * @param delimiter 구분자
     * @param engineId 엔진ID
     * @param maxLine 최대 라인수
     * @param maxColumn 최대 컬럼수
     * @return
     */
    @RequestMapping(value = "previewHDFSFile_FP_ORIGINAL", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response previewHDFSFile_FP_ORIG(@RequestParam String inputPath, String delimiter, long engineId
    		, @RequestParam(value = "maxLine", required=false, defaultValue="-1") int maxLine
    		, @RequestParam(value = "maxColumn", required=false, defaultValue="-1") int maxColumn
    		) {
        Response response = new Response();
        
        try {
        	
            // Get hadoop cluster
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
            String hdfsUrl = hadoopCluster.getHdfsUrl();
            Configuration configuration = HdfsHelper.getConfiguration(hadoopCluster);
            
            FileSystem fileSystem = FileSystem.get(configuration);
            Path path = new Path(hdfsUrl + inputPath);
                        
            if (fileSystem.isFile(path)==false) {
              
            	 FileStatus [] statuses = fileSystem.listStatus(path);
            	 path = statuses[0].getPath();
             }
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileSystem.open(path)));
            String lines;
            int count = 0;

            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            String[] splits = {};
            
            
            StringBuffer stringBuffer = new StringBuffer();
            int columnLength = 0;
            
            while ((lines = bufferedReader.readLine()) != null) {
            	if(maxLine != -1){ // 라인수 제한인 경우
            		if (count >= maxLine){ // 라인 수 제한
            			break;
            		}
            	}
            	
                splits = lines.split(delimiter, maxColumn);                
                columnIndexList.add(count);    
                
                columnLength = splits.length;
                for (int i = 0; i <= columnLength - 1; i++) {    
                	stringBuffer.append(lines.toString().split(delimiter)[i]).append(",");                 
                }
                stringBuffer.append("::");
                
                count++; 
            }              

            bufferedReader.close();
            
            for (String row : stringBuffer.toString().split(",::")) {
        		rowDataList.add(row);  
            } 
            
			
            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);
            return response;

        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            response.getError().setMessage(ex.getMessage());
            response.setSuccess(false);
            return response;
        }
    }

    /**
     * 워크플로우를 로딩한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "get", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response get(@RequestParam Long id) {
        Response response = new Response();
        try {
            Workflow workflow = designerService.getWorkflow(id);
            response.setSuccess(true);
            response.setObject(workflow);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_LOAD_WORKFLOW", id.toString(), ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    @RequestMapping(value = "run", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response run(@RequestBody Map<String, String> params) {
        long id = Long.parseLong(params.get("id"));
        Response response = new Response();
        try {
        	long engineid = Long.parseLong(params.get("engineId"));
        	
            designerService.run(id, engineid);
            
            Workflow workflow = designerService.getWorkflow(id);
            
            response.getMap().put("instance_id", workflow.getWorkflowId());
            response.getMap().put("id", String.valueOf(workflow.getId()));
            response.getMap().put("tree_id", String.valueOf(workflow.getWorkflowTreeId()));
            response.getMap().put("name", String.valueOf(workflow.getWorkflowName()));
            response.getMap().put("desc", String.valueOf(workflow.getDescription()));
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", Long.toString(id), ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }

    private Context getContext(Engine engine) {
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority(SessionUtils.getUsername(), SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        context.putString("username", SessionUtils.getUsername());
        return context;
    }
    
    /**
     * 워크플로우의 상태코드를 확인한다.
     *
     * @param workflowId 워크플로우의 식별자
     * @return 워크플로우의 상태코드
     */
    @RequestMapping(value = "status", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getWorkflowStatus(@RequestParam(defaultValue = "-1") long workflowId) {
        Response response = new Response();
        response.setSuccess(true);
        if (workflowId < 0) {
            response.getMap().put("count", "0");
            return response;
        }
        try {
            Workflow workflow = designerService.getWorkflow(workflowId);
            response.getMap().put("status", workflow.getStatus());
            response.getMap().put("id", workflow.getId());
            response.getMap().put("instance_id", workflow.getWorkflowId());
            response.getMap().put("tree_id", workflow.getWorkflowTreeId());
            response.getMap().put("name", workflow.getWorkflowName());
            // response.getMap().put("count", jobService.getScheduledCountByWorkflowId(workflow.getId()));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /*
    //whitpeootest
    @SuppressWarnings("unused")
	@RequestMapping(value = "visualization_run", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response visualization_run(@RequestParam(defaultValue = "") long engineId, long id, String driver, String jar, String input, 
    		String delimiter, String firstRecord, String titlename, String xIndex, String xLabel, String printValue, String yIndexList, String yMax) 
    {
    	Response response = new Response();    
    	String output= "/Test_barplot_output";
    	
    	
    	String visual_run_code = jar +" ";
    	visual_run_code += driver;
    	visual_run_code += " -input ";
    	visual_run_code += input;
    	visual_run_code += " -output ";
    	visual_run_code += output;
    	visual_run_code += " -delimiter ";
    	visual_run_code += delimiter;
    	visual_run_code += " -firstRecord ";
    	visual_run_code += firstRecord;
    	
    	visual_run_code += " -xIndex ";
    	visual_run_code += xIndex;
    	visual_run_code += " -xLabel ";
    	visual_run_code += xLabel;
    	visual_run_code += " -printValue ";
    	visual_run_code += printValue;
    	visual_run_code += " -yIndexList ";
    	visual_run_code += yIndexList;
    	visual_run_code += " -yMax ";
    	visual_run_code += yMax;
    	
        try
        {
        	String[] vcode = visual_run_code.split(" ");
        	
        	List<String> cmdList = new ArrayList<String>(Arrays.asList(vcode));
        	
        	//remote call
        	String Visual_jobId = designerService.visulization_run(id, engineId, visual_run_code); //시각화 실행.
        	System.out.println("jobId:" + Visual_jobId);
        	
        	Thread.sleep(1000);
            Engine engine = engineService.getEngine(engineId);
            //remote call
            HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
           
            int delay_count = 0;
            Thread.sleep(1000);
            while(true)
            {
            	String state = historyService.getVisualStatus(Visual_jobId, "admin");
            	Thread.sleep(1000);
            	delay_count ++;
             	if(delay_count > 10)
             	{
             		break;//강제 종료 
             	}
             	 System.out.println("STATE:" + state);
            	if(state.equals("success") == true)
            	{
		            try 
		            {
		                FileSystemCommand command = new FileSystemCommand();
		                int outputIndex = cmdList.indexOf("-output") + 1;
		                
		                String path = cmdList.get(outputIndex) + "/bar_result.html";
		                
		                String contents = HDFS_FullView(engineId, path);
		                System.out.println("D3 RESULT:" + contents);
		                response.getMap().put("name", contents);
		                response.setSuccess(true);
		                return response;
		            } catch (Exception ex) {
		                response.setSuccess(false);
		                response.getError().setMessage(ex.getMessage());
		                if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
		                response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		                return response;
		            }
            	}
            	else if(state.equals("faile") == true)
                {
            		response.getMap().put("name", "fail");
	                response.setSuccess(true);
	                return response;
                }
            	
            	else if(state.equals("ready") == true)
            	{
            		//Thread.sleep(100);
            		continue;
            	}
            	else 
            	{
            		//Thread.sleep(100);
            		continue;
            	}
	            
            }
            
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", Long.toString(id), ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }
    */
    private HistoryService getHistoryService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getHistoryService(getHistoryServiceUrl(engine));
    }
    private HistoryService getHistoryService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(HistoryService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (HistoryService) factoryBean.getObject();
    }
    private String getHistoryServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/history", engine.getIp(), engine.getPort()).getMessage();
    }

    private String HDFS_FullView(long engineId, String path)
    {
    	String fileContents = "";
    	try {
        	
            // Get hadoop cluster
            Engine engine = engineService.getEngine(engineId);
            if (engine == null) {
                throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
            }
            HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
            String hdfsUrl = hadoopCluster.getHdfsUrl();
            Configuration configuration = HdfsHelper.getConfiguration(hadoopCluster);  /*20140917 안재성 추가*/
            
            FileSystem fileSystem = FileSystem.get(configuration);
            Path file_path = new Path(hdfsUrl + path);
                        
            if (fileSystem.isFile(file_path)==false) {
              
            	 FileStatus [] statuses = fileSystem.listStatus(file_path);
            	 file_path = statuses[0].getPath();
             }
            
            List<PreviewFile> list = new ArrayList<PreviewFile>();   
            PreviewFile previewFile = new PreviewFile();
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileSystem.open(file_path)));
                                    
            String lines;
            int count = 0;
            int keyNumber = -1;

            List<Integer> columnIndexList = new ArrayList<Integer>();
            ArrayList<String> rowDataList = new ArrayList<String>();
            Map map = new HashMap();
            String[] splits = {};

            while ((lines = bufferedReader.readLine()) != null) {
            	fileContents += lines;
            }
            
            bufferedReader.close();
            /*
            int columnLength = splits.length;
            StringBuffer stringBuffer = new StringBuffer();

            for (int i = 0; i <= columnLength - 1; i++) {
                columnIndexList.add(i);
                for (Object line : map.values()) 
                {
                    stringBuffer.append(line.toString().split(delimiter)[i]).append(","); 
                }
                stringBuffer.append("::");
            }

            for (String row : stringBuffer.toString().split(",::")) {
                rowDataList.add(row + "...");
            }

            //Set field number
            previewFile.setColumnIndex(columnIndexList);
            //Set field data
            previewFile.setRowData(rowDataList);
            list.add(previewFile);

            response.getList().addAll(list);
            response.setObject(delimiter);
            response.setTotal(columnLength);
            response.setSuccess(true);

            return response;
            */
            return fileContents;
            
        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
            return ex.toString();
        }
    }
    /**
     * 워크플로우 XML을 HTML로 변환한다.
     *
     * @param id 워크플로우의 식별자
     * @return 워크플로우 XML
     */
    @RequestMapping(value = "xml", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getWorkflowXml(@RequestParam(defaultValue = "-1") long id) {
        Response response = new Response();
        try {
            Workflow workflow = designerService.getWorkflow(id);
            
            //String xml = workflow.getWorkflowXml();
            String xml = workflow.getWorkflowXml().replace("&lt;", "<").replace("amp;", "").replace("&gt", ">");
            
            response.setSuccess(true);
            response.getMap().put("xml", OpenGraphMarshaller.escape(xml));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /**
     * 워크플로우 목록을 확인한다.
     *
     * @param type 트리 노드의 유형
     * @param node 워크플로우 노드
     * @return HTTP REST Response JAXB Object
     */
    @RequestMapping(value = "tree/get", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response get(@RequestParam String type,
			    		@RequestParam String node,
			    		@RequestParam(value = "username") String user_name)//2015.01.30 whitepoo@onycom.com
    {
        logger.debug("[WF][TREE][GET] Type '{}' Path '{}'", type, node);

        Response response = new Response();
        SessionUtils.setUsername(user_name);//2015.01.30 whitepoo@onycom.com
        Tree treeNode = null;
        if (ROOT.equals(node)) {
            // if root, return root node
            treeNode = treeService.getRoot(TreeType.valueOf(type.trim()), SessionUtils.getUsername());

            // if root does not exist, create root.
            if (treeNode == null) {
                treeNode = treeService.createRoot(TreeType.valueOf(type.trim()), SessionUtils.getUsername());
            }
        } else {
            // ROOT 노드가 아니라면 PK인 Tree Id를 부모 노드로 설정한다.
            treeNode = treeService.get(Long.parseLong(node));
        }

        Member member = memberService.getMemberByUser(user_name);
        
        // Get childs from parent.
        List<Tree> childs = treeService.getWorkflowChilds(treeNode.getId(), member);
        for (Tree tree : childs) {
            Map map = new HashMap();
            map.put("id", tree.getId());
            if (NodeType.FOLDER.equals(tree.getNodeType())) {
                map.put("cls", "folder");
            } else {
                setStatus(tree.getId(), map);
            }
            map.put("text", tree.getName());
            map.put("workflowId", tree.getReferenceId());
            map.put("leaf", NodeType.FOLDER.equals(tree.getNodeType()) ? false : true);
            response.getList().add(map);
        }
        response.setSuccess(true);
        return response;
    }

    
    /**
     * 지정한 워크플로우를 삭제한다. 삭제는 워크플로우의 식별자를 기준으로 하지 않고
     * TREE의 식별자를 기준으로 한다.
     *
     * @return Response REST JAXB Object
     */
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response deleteWorkflow(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            String nodeType = params.get("nodeType");
            if ("folder".equals(nodeType)) {
                treeService.delete(Long.parseLong(params.get("id")));
            } else {
                designerService.delete(Long.parseLong(params.get("id")), Long.parseLong(params.get("workflowId")));
            }
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_DELETE_SELECTION", params.get("text"), ex.getMessage());
            logger.warn("{}", message, ex);

            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    /**
     * 지정한 워크플로우의 상태 코드의 CSS와 해당 워크플로우의 배치 개수를 설정한다.
     *
     * @param treeId 워크플로우의 상태 코드를 확인할 Tree ID
     */
    private void setStatus(long treeId, Map map) {
/*
        Workflow workflow = jobService.getWorkflowByTeeId(treeId);
        Long count = jobService.getCountByWorkflowId(workflow.getId());
        map.put("job", count);
        if (StringUtils.isEmpty(workflow.getDesignerXml())) {
            map.put("iconCls", "designer_not_load");
            map.put("qtip", "CLI를 통해 등록한 워크플로우 (" + workflow.getWorkflowId() + ")");
            return;
        }
        if (count > 0) {
            map.put("iconCls", "designer_not_remove");
            map.put("qtip", "등록되어 있는 배치 작업의 개수 :: " + count + "개 (" + workflow.getWorkflowId() + ")");
            return;
        }
        map.put("iconCls", "designer_load");
        map.put("qtip", workflow.getWorkflowId());
*/

        map.put("iconCls", "status-blue");
    }
    
    /**
     * Cache Clear
     *
     * @param params cacheClear 삭제하는 경로 및 Engine
     * @return REST Response JAXB Object
     */ 
    @RequestMapping(value = "cacheClear", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response cacheClear(Long engineId) {
        Response response = new Response();
        long clear_cnt =0;
        try {
        	Engine engine = engineService.getEngine(engineId);        	
        	 System.out.println("engine:" + engine.getIp());        	 
        	designerService.getCacheClear(engineId);
        	response.setSuccess(true);	
        	
        } catch (Exception ex) {
            String message = message("Cache Clear", "Fail Clear Cache",  ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    }  

}
