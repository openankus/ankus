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
package org.openflamingo.web.monitoring;

import org.openflamingo.model.monitoring.DiskInfo;
import org.openflamingo.model.monitoring.HealthInfo;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.HiveServer;
import org.openflamingo.model.rest.Response;
import org.openflamingo.provider.engine.MonitoringEngineService;
import org.openflamingo.provider.fs.FileSystemService;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.StringUtils;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.admin.HiveAdminService;
import org.openflamingo.web.core.LocaleSupport;
import org.openflamingo.web.core.RemoteService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.hive.HiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController extends LocaleSupport {
	
    private Logger logger = LoggerFactory.getLogger(MonitoringController.class);

    /** Workflow Engine 정보를 얻기 위한 Engine Service. */
    @Autowired
    private EngineService engineService;
    
    /** Hadoop Cluster 정보를 얻기 위한 Hadoop Cluster Admin Service. */
    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;
    
    @Autowired
    private MonitoringService monitoringService;
    
    @RequestMapping(value = "get_hadoopstatus", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> get_hadoopstatus(HttpServletRequest req, HttpServletResponse resp
                              , @RequestParam(defaultValue = "", required=true) String engineId
                               ) {
    	HashMap<String, Object> mv = new HashMap<>();
    	
    	if (StringUtils.isEmpty(engineId)) {
    		mv.put("code",500);
    		mv.put("message","fail");
            return mv;
        }
          
    	Engine engine = engineService.getEngine(Long.parseLong(engineId));
    	HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
    	
    	HealthInfo stat = monitoringService.getStatus(hadoopCluster.getHdfsUrl(), engine);
    	
		if (stat != null) {
			mv.put("code", 0);
			mv.put("data", stat);
			mv.put("message", "success");
		} else {
			mv.put("code", 500);
			mv.put("message", "fail");
		}
		return mv;
    }      
}