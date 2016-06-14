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
import org.openflamingo.model.rest.Response;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.web.engine.EngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/job")
public class JobController {

    /**
     * Flamingo Engine Management Remote Service
     */
    @Autowired
    private EngineService engineService;

    @Autowired
    private JobService jobService;

    @RequestMapping(value = "valid", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response isValidCronExpression(@RequestParam String cronExpression) {
        Response response = new Response();
        try {
            CronExpression.isValidExpression(cronExpression);
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage("유효하지 않은 Cron Expression입니다.");
            if (ex.getCause() != null) response.getError().setCause(ex.getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    @RequestMapping(value = "regist", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response regist(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            String jobId = jobService.regist(Long.parseLong(params.get("engineId")), params.get("jobName"), Long.parseLong(params.get("wid")), params.get("cron"), new HashMap());
            response.setSuccess(true);
            response.getMap().put("jobId", jobId);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage("배치 작업을 등록할 수 없습니다.");
            if (ex.getCause() != null) response.getError().setCause(ex.getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }

    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response list(@RequestParam(defaultValue = "") String startDate, @RequestParam(defaultValue = "") String endDate,
                         @RequestParam(defaultValue = "") String jobName,
                         @RequestParam(defaultValue = "WORKFLOW") String jobType,
                         @RequestParam(defaultValue = "0") long engineId,
                         @RequestParam(defaultValue = "ALL") String status,
                         @RequestParam(defaultValue = "ID") String sort,
                         @RequestParam(defaultValue = "DESC") String dir,
                         @RequestParam(defaultValue = "0") int start, @RequestParam(defaultValue = "16") int limit) {

        Response response = new Response();
        try {
            Engine engine = engineService.getEngine(engineId);
            List<Map> jobs = jobService.getJobs(engine);
            response.getList().addAll(jobs);
            response.setTotal(jobs.size());
            response.getMap().put("current", jobService.getCurrentDate(engine));
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage("배치 작업 목록을 조회할 수 없습니다.");
            if (ex.getCause() != null) response.getError().setCause(ex.getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        return response;
    }
}
