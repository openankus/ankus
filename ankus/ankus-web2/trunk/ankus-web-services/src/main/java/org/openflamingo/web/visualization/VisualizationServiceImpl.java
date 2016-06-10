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
package org.openflamingo.web.visualization;

import static org.slf4j.helpers.MessageFormatter.format;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openflamingo.core.exception.PersistenceException;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.rest.Visualization;
import org.openflamingo.model.rest.VisualizationHistory;
import org.openflamingo.model.rest.WorkflowHistory;
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

@Service
public class VisualizationServiceImpl extends LocaleSupport implements VisualizationService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(VisualizationServiceImpl.class);

    @Autowired
    private EngineService engineService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;


    @Override
    public VisualizationHistory run(Visualization visualization,Long engineId) {
    	try
    	{
    		Engine engine = engineService.getEngine(engineId);
    		if (engine == null) 
    		{
    			throw new IllegalArgumentException(message("S_DESIGNER", "NOT_VALID_WORKFLOW_ENG"));
    		}
    		HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
    		JobService job = getJobService(engine);

    		String jobStringId = job.run(visualization, hadoopCluster, SessionUtils.getUsername());
    		
    		Thread.sleep(500);
    		int loopCount = 0;
    		HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
    		List<WorkflowHistory> workflowHistoryList = null;
    		List<VisualizationHistory> visualizationHistoryList = null;
    		WorkflowHistory workflowHistory = null;
    		VisualizationHistory visualizationHistory = null;
    		while(true) {
    			workflowHistoryList = historyService.getWorkflowHistoryByJobStringId(jobStringId);
    			if (workflowHistoryList.size() > 0) {
    				workflowHistory = workflowHistoryList.get(0);
    				State status = workflowHistory.getStatus();
    				if (status.equals(State.SUCCESS)) {
    					visualizationHistoryList = historyService.getVisualizationHistoryByJobStringId(jobStringId); 
    					if (visualizationHistoryList.size() > 0) {
    						visualizationHistory = visualizationHistoryList.get(0);
    						break;
    					}
    				}
    			}
    			
    			if (loopCount++ > 30) {
    				throw new PersistenceException(message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", "visualization", "wait time over. or couldn't create the visualization html file"));
    			}
    			Thread.sleep(500);
    		}
    		
    		return visualizationHistory;
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    		throw new PersistenceException(message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", "visualization", e.getMessage()));
    	}
    }

 
    @Override
	public VisualizationHistory getVisualizationHistoryByJobStringId(String jobStringId, Long engineId) {
    	Engine engine = engineService.getEngine(engineId);
    	HistoryService historyService = getHistoryService(engine.getIp(), engine.getPort());
    	VisualizationHistory visualizationHistory = null;
    	
    	List<VisualizationHistory> visualizationHistoryList = historyService.getVisualizationHistoryByJobStringId(jobStringId); 
		if (visualizationHistoryList.size() > 0) {
			visualizationHistory = visualizationHistoryList.get(0);
		}
    	
		return visualizationHistory;
	}



	/**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private JobService getJobService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (JobService) factoryBean.getObject();
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private JobService getJobService(Engine engine) {
        return getJobService(getJobServiceUrl(engine));
    }

    /**
     * Remote Workflow Engine URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote Workflow Engine의 URL
     */
    private String getJobServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/job", engine.getIp(), engine.getPort()).getMessage();
    }
    
    private HistoryService getHistoryService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getHistoryService(getHistoryServiceUrl(engine));
    }


	/**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private HistoryService getHistoryService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(HistoryService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (HistoryService) factoryBean.getObject();
    }

    /**
     * Remote Workflow Engine URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote Workflow Engine의 URL
     */
    private String getHistoryServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/history", engine.getIp(), engine.getPort()).getMessage();
    }
}
