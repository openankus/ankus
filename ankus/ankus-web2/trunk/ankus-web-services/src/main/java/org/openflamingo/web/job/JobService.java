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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface JobService {

    /**
     * Job을 등록한다.
     *
     * @param engineId       Engine ID
     * @param jobName        Job Name
     * @param workflowId     Workflow ID
     * @param cronExpression Cron Expression
     * @param hashMap        Job Variables
     * @return Job ID
     */
    String regist(long engineId, String jobName, long workflowId, String cronExpression, HashMap hashMap);

    /**
     * 지정한 워크플로우 엔진에 등록되어 있는 모든 작업을 반환한다.
     *
     * @param engine Workflow Engine
     * @return 작업 목록
     */
    List<Map> getJobs(Engine engine);

    /**
     * 현재 시간을 반환한다.
     *
     * @param engine Workflow Engine
     * @return 현재 시간
     */
    long getCurrentDate(Engine engine);
}
