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
package org.openflamingo.web.hive;

import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.Hive;
import org.openflamingo.model.rest.HiveHistory;
import org.openflamingo.model.rest.HiveServer;
import org.openflamingo.web.admin.HiveAdminService;
import org.openflamingo.web.core.RemoteService;
import org.openflamingo.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Hive Query Editor에서 제공하는 Query 실행, History 관련 기능을 제공하는 서비스 구현체.
 *
 * @author Byoung Gon, Kim
 * @version 0.4
 */
@Service
public class HiveServiceImpl implements HiveService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveServiceImpl.class);

    /**
     * Hive Server 정보를 취득하기 위한 Hive Administration Service.
     */
    @Autowired
    private HiveAdminService hiveAdminService;

    /**
     * 원격 호출을 위한 Remote Service
     */
    @Autowired
    private RemoteService remoteService;

    @Override
    public String executeQuery(Engine engine, String database, Hive hive) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
        return hiveService.executeQuery(hiveServer, database, hive, SessionUtils.getUsername());
    }

    @Override
    public boolean createDatabase(Engine engine, HiveServer hiveServer, String database, String location, String comment) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.createDatabase(hiveServer, database, location, comment);
    }

    @Override
    public String validateQuery(Engine engine, String database, Hive hive) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
        return hiveService.validateQuery(hiveServer, database, hive, SessionUtils.getUsername());
    }

    @Override
    public Hive saveQuery(Engine engine, Hive hive) {
        return hive;
    }

    @Override
    public int getTotalCountOfHistoriesByCondition(Engine engine, String startDate, String endDate, String scriptName, String status, String username) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getTotalCountOfHistoriesByCondition(startDate, endDate, scriptName, status, username);
    }

    @Override
    public List<HiveHistory> listHistoriesByCondition(Engine engine, String startDate, String endDate, String scriptName, String status, int start, int limit, String orderBy, String dir, String username) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.listHistoriesByCondition(startDate, endDate, scriptName, status, start, limit, orderBy, dir, username);
    }

    @Override
    public HiveHistory getHistory(Engine engine, String executionId) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getHistory(executionId);
    }

    @Override
    public String getQuery(Engine engine, String executionId) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getQuery(executionId, SessionUtils.getUsername());
    }

    @Override
    public int getCounts(Engine engine, String executionId) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getCounts(executionId);
    }

    @Override
    public List<Map<String, String>> getResults(Engine engine, String executionId, int start, int end) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getResults(executionId, start, end);
    }

    @Override
    public List<String> getDatabases(Engine engine) {
        HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getDatabases(hiveServer);
    }

    @Override
    public void checkSize(Long maxSize, String executionId, Engine engine) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        hiveService.checkSize(maxSize, executionId, SessionUtils.getUsername());
    }

    @Override
    public byte[] load(String executionId, Engine engine) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.load(executionId, SessionUtils.getUsername());
    }

    @Override
    public long getCurrentDate(Engine engine) {
        org.openflamingo.provider.hive.HiveService hiveService = (org.openflamingo.provider.hive.HiveService) remoteService.getService(RemoteService.HIVE, engine);
        return hiveService.getCurrentDate();
    }
}
