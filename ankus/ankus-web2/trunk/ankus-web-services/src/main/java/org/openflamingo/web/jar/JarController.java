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
package org.openflamingo.web.jar;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.openflamingo.model.rest.Response;
import org.openflamingo.model.rest.VisualizationHistory;
import org.openflamingo.provider.fs.FileSystemService;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.web.core.RemoteService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.job.JobService;
import org.openflamingo.web.member.Member;
import org.openflamingo.web.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.web.jar.JarService;
/**
 * 인덱스 페이지 및 기본적인 페이지 이동 기능을 제공하는 컨트롤러.
 */
@Controller
@RequestMapping("/")
public class JarController {
    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(JarController.class);
    
    @Autowired
    private JarService jarService;
    
    @Autowired
    private EngineService engineService;
    
    @Autowired
    private RemoteService lookupService;
    
    @Autowired
    private MemberService memberService;
    
	// 2016-03-08 algorithm meta info load from jar file 
	@RequestMapping(value = "getmoduleinfos1", method = RequestMethod.POST)
	public void getmoduleinfos(HttpServletRequest req, HttpServletResponse resp
	  	, @RequestParam(value = "path", required=false) String path
	  	, @RequestParam(defaultValue = "6") long engineId
  		) throws Exception{
		
		String metainfos = "";
		
		System.out.printf("============>getmoduleinfos1\n");		
		
		if(path==null) path = "/tmp/cache/jar";
		
		 metainfos = jarService.getModuleInfos(engineId, path);
		 System.out.println("metainfos------>" + metainfos);
		 PrintWriter out = null;
		 out = resp.getWriter();
		 out.write(metainfos);
	}
	
	// 2016-03-08 get resource from jar file 
	@RequestMapping(value = "getmoduleresource1", method = RequestMethod.GET)
	public void getmoduleresource(HttpServletRequest req, HttpServletResponse resp
		, @RequestParam(value = "jarfile", required=true) String jarfile
		, @RequestParam(value = "resource", required=true) String resource
		, @RequestParam(defaultValue = "") String username
		, @RequestParam(defaultValue = "6") long engineId
  		) throws Exception {
		
		Member member = memberService.getMemberByUser(username);
        List<Engine> engines = engineService.getEngines(member);
		
		Engine engine = engineService.getEngine(engineId);
		
		//FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.MODULE, engine);
		
		System.out.printf("============>getmoduleresource\n");
		
		String zipFilePath = jarfile;
		String fname = resource;
		
		//byte[] data = fileSystemService.getReadfile(zipFilePath, fname);
		
		byte[] data = jarService.getReadfile(engineId, zipFilePath, fname);
			      
		System.out.println("--------> : 222" + data.toString());
	    BufferedOutputStream output = new BufferedOutputStream(resp.getOutputStream());   
	      
	    output.write(data);
	    output.close();
        		
	}	
}
