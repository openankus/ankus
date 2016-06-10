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
package org.openflamingo.web.pig;

import org.openflamingo.core.exception.ServiceException;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.provider.engine.HistoryService;
import org.openflamingo.provider.engine.JobService;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.core.LocaleSupport;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.security.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.slf4j.helpers.MessageFormatter.format;

/**
 * Pig Editor의 각종 기능을 제공하는 서비스 구현체.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
@Service
public class PigServiceImpl extends LocaleSupport implements PigService {

    @Autowired
    private PigRepository pigRepository;

    @Autowired
    private EngineService engineService;

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Override
    public Pig save(Long scriptId, String scriptName, String script) {
        Pig pig = new Pig();
        pig.setScriptId(scriptId);
        pig.setScriptName(scriptName);
        pig.setScript(script);
        pig.setUsername(SessionUtils.getUsername());

        if (scriptId != null && scriptId > 0) {
            int count = pigRepository.update(pig);
            if (count == 0) {
                throw new ServiceException(message("S_PIG", "CANNOT_UPDATE_SCRIPT", scriptName));
            }
        } else {
            int count = pigRepository.insert(pig);
            if (count == 0) {
                throw new ServiceException(message("S_PIG", "CANNOT_SAVE_SCRIPT", scriptName));
            }
        }
        return pig;
    }

    @Override
    public Pig delete(Long scriptId) {
        try {
            Pig pig = new Pig();
            pig.setScriptId(scriptId);

            if (scriptId != null && scriptId > 0) {
                pigRepository.delete(scriptId);
            }

            return pig;
        } catch (Exception ex) {
            throw new ServiceException(message("S_PIG", "CANNOT_DELETE_PIG_SCRIPT", scriptId), ex);
        }
    }

    @Override
    public Workflow run(long engineId, org.openflamingo.model.rest.Pig pig) {
        Engine engine = engineService.getEngine(engineId);
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        JobService jobService = getJobService(engine);
        return jobService.run(pig, hadoopCluster, SessionUtils.getUsername());
    }

    @Override
    public String getLog(long engineId, String path) {
        try {
            Engine engine = engineService.getEngine(engineId);
            HistoryService historyService = getHistoryService(getHistoryServiceUrl(engine));
            return historyService.getActionLogByPath(path);
        } catch (Exception ex) {
            throw new ServiceException(message("S_PIG", "CANNOT_GET_PIG_LOG"), ex);
        }
    }

    @Override
    public List<Pig> listByCondition(String startDate, String endDate, String scriptName, int start, int limit, String orderBy, String dir, String username) {
        try {
            Map params = new HashMap();
            params.put("startDate", startDate);
            params.put("endDate", endDate);
            params.put("scriptName", scriptName);
            params.put("start", start);
            params.put("limit", limit);
            params.put("orderBy", orderBy);
            params.put("desc", dir);
            params.put("username", username);

            return pigRepository.selectByCondition(params);
        } catch (Exception ex) {
            throw new ServiceException(message("S_PIG", "CANNOT_LIST_PIG_SCRIPT"), ex);
        }
    }

    @Override
    public int getTotalCountByCondition(String startDate, String endDate, String scriptName, String username) {
        try {
            Map params = new HashMap();
            params.put("startDate", startDate);
            params.put("endDate", endDate);
            params.put("scriptName", scriptName);
            params.put("username", username);

            return pigRepository.selectTotalCountByCondition(params);
        } catch (Exception ex) {
            throw new ServiceException(message("S_PIG", "CANNOT_LIST_TOTAL_SCRIPTS"), ex);
        }
    }

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @param ip   Workflow Engine의 IP
     * @param port Workflow Engine의 Port
     * @return Remote Workflow Engine Service
     */
    private JobService getJobService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getJobService(engine.getIp(), engine.getPort());
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

    /**
     * Remote Workflow Engine Service를 가져온다.
     *
     * @param ip   Workflow Engine의 IP
     * @param port Workflow Engine의 Port
     * @return Remote Workflow Engine Service
     */
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
