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

import org.openflamingo.model.rest.AuditHistory;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.model.rest.Response;
import org.openflamingo.provider.fs.FileSystemAuditService;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.web.core.RemoteService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.security.SessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * File System Audit REST Controller.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Controller
@RequestMapping("/fs/audit")
public class AuditController {

    /**
     * Workflow Engine 정보를 얻기 위한 Engine Service.
     */
    @Autowired
    private EngineService engineService;

    /**
     * Remote Service Lookup Service.
     */
    @Autowired
    private RemoteService lookupService;

    /**
     * 지정한 조건의 파일 처리 이력을 조회한다.
     *
     * @param startDate 시작 날짜
     * @param endDate   종료 날짜
     * @param path      조회할 경로
     * @param engineId  워크플로우 엔진
     * @param type      파일 처리 유형
     * @param start     시작 페이지
     * @param limit     페이지당 건수
     * @return 파일 처리 목록
     */
    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getAuditHistories(@RequestParam(defaultValue = "") String startDate,
                                      @RequestParam(defaultValue = "") String endDate,
                                      @RequestParam(defaultValue = "") String path,
                                      @RequestParam(value = "username") String user_name,//2014.01.30 whitepoo@onycom.com
                                      @RequestParam(defaultValue = "0") long engineId,
                                      @RequestParam(defaultValue = "ALL") String type,
                                      @RequestParam(defaultValue = "0") int start,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "16") int limit) {

    	SessionUtils.setUsername(user_name);//2014.01.30 whitepoo@onycom.com
        Response response = new Response();
        try {
            Engine engine = engineService.getEngine(engineId);
            FileSystemAuditService auditService = (FileSystemAuditService) lookupService.getService(RemoteService.AUDIT, engine);

            response.setSuccess(true);
            List<AuditHistory> auditHistories = auditService.getAuditHistories(startDate, endDate, path, SessionUtils.getUsername(), type, "WORK_DATE", "DESC", start, limit);
            response.getList().addAll(auditHistories);
            response.setTotal(auditService.getTotalCountOfAuditHistories(startDate, endDate, path, type, SessionUtils.getUsername()));
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
}
