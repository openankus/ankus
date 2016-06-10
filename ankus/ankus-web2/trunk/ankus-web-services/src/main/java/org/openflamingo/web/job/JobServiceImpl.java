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
package org.openflamingo.web.job;

import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.designer.DesignerService;
import org.openflamingo.web.engine.EngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.slf4j.helpers.MessageFormatter.format;

@Service
public class JobServiceImpl implements org.openflamingo.web.job.JobService {

    @Autowired
    private EngineService engineService;

    @Autowired
    private DesignerService designerService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Override
    public String regist(long engineId, String jobName, long workflowId, String cronExpression, HashMap vars) {
        Engine engine = engineService.getEngine(engineId);
        org.openflamingo.provider.engine.JobService jobService = getJobService(engine);
        Workflow workflow = designerService.getWorkflow(workflowId);
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        return jobService.regist(1, jobName, workflow, cronExpression, vars, hadoopCluster);
    }

    @Override
    public List<Map> getJobs(Engine engine) {
        org.openflamingo.provider.engine.JobService jobService = getJobService(engine);
        return jobService.getJobs();
    }

    @Override
    public long getCurrentDate(Engine engine) {
        org.openflamingo.provider.engine.JobService jobService = getJobService(engine);
        return jobService.getCurrentDate();
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private org.openflamingo.provider.engine.JobService getJobService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(org.openflamingo.provider.engine.JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (org.openflamingo.provider.engine.JobService) factoryBean.getObject();
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private org.openflamingo.provider.engine.JobService getJobService(Engine engine) {
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
}
