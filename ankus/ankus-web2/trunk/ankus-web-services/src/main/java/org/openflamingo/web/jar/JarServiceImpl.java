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

import static org.slf4j.helpers.MessageFormatter.format;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openflamingo.provider.engine.HistoryService;
import org.openflamingo.provider.engine.JobService;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.core.LocaleSupport;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Service;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.provider.engine.JobService;

@Service
public class JarServiceImpl extends LocaleSupport implements JarService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(JarServiceImpl.class);

    @Autowired
    private EngineService engineService;
    
    @Override
	public String getModuleInfos(Long engineId, String path){
    //public ArrayList<HashMap<String, Object>> readmetainfos(Long engineId, String folder){	
		String moduleinfo = "";
		try
    	{				
			Engine engine = engineService.getEngine(engineId);		
			if (engine == null) {
		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
		    } 			
			JobService job = getModuleService(engine.getIp(), engine.getPort());		
			moduleinfo = job.getModuleInfos(path);
			
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return moduleinfo;
	}
    
    @Override
	public byte[] getReadfile(Long engineId, String zipFilePath, String fname){
   
    	byte[] readfile = null;
		try
    	{	
			
			Engine engine = engineService.getEngine(engineId);
			
			if (engine == null) {
		            throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
		    } 
			
			JobService job = getModuleService(engine.getIp(), engine.getPort());
			
			readfile = job.readfile(zipFilePath, fname);
		             	
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return readfile;
	}
   
    private JobService getModuleService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (JobService) factoryBean.getObject();
    }
   
    private JobService getModuleService(String ip, String port) {
    	Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getModuleService(getModuleServiceUrl(engine));
    }
   
    private String getModuleServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/module", engine.getIp(), engine.getPort()).getMessage();
    }  
	
}
