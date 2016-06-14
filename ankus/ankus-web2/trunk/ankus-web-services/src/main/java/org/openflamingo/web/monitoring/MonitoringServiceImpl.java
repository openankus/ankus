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

import java.io.File;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.lang.reflect.Method;
import java.util.ArrayList;

import org.openflamingo.model.monitoring.DiskInfo;
import org.openflamingo.model.monitoring.HealthInfo;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.provider.engine.MonitoringEngineService;
import org.openflamingo.web.core.RemoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MonitoringServiceImpl implements MonitoringService {
	
	/**
     * Remote Service Lookup Service.
     */
    @Autowired
    private RemoteService lookupService;
    
    OperatingSystemMXBean systeminfo;
    
	@Override
	public HealthInfo getStatus(String hadoopurl, Engine engine) {
		MonitoringEngineService monitoringEngineService = (MonitoringEngineService) lookupService.getService(RemoteService.MONITORING, engine);
		
		HealthInfo stat = new HealthInfo();
		if(systeminfo==null) systeminfo = ManagementFactory.getOperatingSystemMXBean();
		
		// grep -c processor /proc/cpuinfo
		stat.corecnt = Runtime.getRuntime().availableProcessors();
		stat.cpuload = (Double)getsystemvalue("getSystemCpuLoad");
		stat.totalmemory = (Long)getsystemvalue("getTotalPhysicalMemorySize");
		stat.freememory = (Long)getsystemvalue("getFreePhysicalMemorySize");
		
		File[] roots = File.listRoots();
		stat.disks = new ArrayList<DiskInfo>();
		for (File root : roots)
		{
			DiskInfo d = new DiskInfo();
			d.path = root.getAbsolutePath();
			d.size = root.getTotalSpace();
			d.free = root.getFreeSpace();
			stat.disks.add(d);
		}
		
    	HealthInfo engineHealthInfo = monitoringEngineService.getStatus(hadoopurl);
    	if(engineHealthInfo != null){
    		stat.hadoopclusterinfo = engineHealthInfo.hadoopclusterinfo; 
    	}
		return stat;
	}

	private Object getsystemvalue(String func)
	{
		try {
			if(systeminfo==null) return null;
			Method method = systeminfo.getClass().getDeclaredMethod(func);
			if(method==null) return null;
			method.setAccessible(true);
			return method.invoke(systeminfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
}

