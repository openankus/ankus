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
package org.openflamingo.web.admin;

import org.openflamingo.model.rest.HiveServer;
import org.openflamingo.model.rest.Response;
import org.openflamingo.web.core.LocaleSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin/hive")
public class HiveAdminController extends LocaleSupport {

    /**
     * SLF4J Logger
     */
    private Logger logger = LoggerFactory.getLogger(HiveAdminController.class);

    /**
     * Hive Admin Service
     */
    @Autowired
    private HiveAdminService adminService;

    /**
     * Hive Server 목록을 반환한다.
     *
     * @return HTTP REST Response (성공적으로 목록을 조회한 경우 {@link org.openflamingo.model.rest.Response#getList()} 를 통해 목록을 얻을 수 있다).
     */
    @RequestMapping(value = "servers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getHiveServers() {
        Response response = new Response();

        try {
            response.setSuccess(true);
            List<HiveServer> servers = adminService.getHiveServers();
            if (servers != null) {
                response.getList().addAll(servers);
                response.setTotal(response.getList().size());
            } else {
                response.setTotal(0);
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_CHECK_HSERVER_INFO"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    /**
     * Hive Server를 추가한다. Hive Server의 이름({@link org.openflamingo.model.rest.HiveServer#getName()}의 양쪽 끝에 공백 문자를 포함하는 경우
     * 자동으로 trim 처리한다.
     *
     * @param hiveServer 추가할 Hive Server
     * @return HTTP REST Response (성공적으로 추가한 경우 {@link org.openflamingo.model.rest.Response#isSuccess()}가 <tt>true</tt>
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response add(@RequestBody HiveServer hiveServer) {
        Response response = new Response();
        if (StringUtils.isEmpty(hiveServer.getName().trim())) {
            response.setSuccess(false);
            return response;
        }

        try {
            hiveServer.setName(hiveServer.getName().trim());
            response.setSuccess(adminService.addHiveServer(hiveServer));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_ADD_HSERVER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    /**
     * Hive Server를 삭제한다. 삭제를 위해서 Hive Server의 식별자를 설정하는 {@link org.openflamingo.model.rest.HiveServer#setId(long)} 메소드를 이용하도록 한다.
     *
     * @param hiveServer 삭제할 Hive Server
     * @return HTTP REST Response (성공적으로 삭제한 경우 {@link org.openflamingo.model.rest.Response#isSuccess()}가 <tt>true</tt>
     */
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response delete(@RequestBody HiveServer hiveServer) {
        Response response = new Response();
        try {
            response.setSuccess(adminService.deleteHiveServer(hiveServer));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(message("S_ADMIN", "CANNOT_DELETE_HSERVER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

}