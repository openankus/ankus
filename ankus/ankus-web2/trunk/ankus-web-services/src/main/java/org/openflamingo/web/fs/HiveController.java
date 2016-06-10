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
package org.openflamingo.web.fs;

import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.HiveServer;
import org.openflamingo.model.rest.Response;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.admin.HiveAdminService;
import org.openflamingo.web.core.LocaleSupport;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.hive.HiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Hive REST Controller for HDFS Browser.
 *
 * @author Edward KIM
 * @since 1.0
 */
@Controller
@RequestMapping("/fs/hive")
public class HiveController extends LocaleSupport {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveController.class);

    /**
     * Hadoop Cluster 정보를 얻기 위한 Hadoop Cluster Admin Service.
     */
    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Autowired
    private HiveAdminService hiveAdminService;

    /**
     * Workflow Engine 정보를 얻기 위한 Engine Service.
     */
    @Autowired
    private EngineService engineService;

    /**
     * Hive Service
     */
    @Autowired
    private HiveService hiveService;

    /**
     * 디렉토리를 생성한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(path, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "db", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response createHiveDB(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            String comment = params.get("comment");
            String location = params.get("location");
            String database = params.get("database");

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            HiveServer hiveServer = hiveAdminService.getHiveServer(engine.getHiveServerId());
            boolean created = hiveService.createDatabase(engine, hiveServer, database, location, comment);
            response.setSuccess(created);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }
}