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
package org.openflamingo.engine.job;

import org.openflamingo.model.rest.Workflow;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.JVMIDUtils;
import org.slf4j.helpers.MessageFormatter;

import java.util.Date;

/**
 * Job ID를 생성한다.
 *
 * @author Byoung Gon, Kim
 * @version 0.4
 */
public class JobIdGenerator {

    /**
     * 해당 워크플로우의 Job ID를 생성한다.
     *
     * @param workflow 워크플로우
     * @return Job ID
     */
    public static String generate(Workflow workflow) {
        String random = JVMIDUtils.generateUUID();
        long workflowId = workflow.getId();
        Date date = new Date();
        return MessageFormatter.arrayFormat("JOB_{}_{}_{}_{}", new Object[]{
                DateUtils.parseDate(date, "yyyyMMdd"), DateUtils.parseDate(date, "HHmmss"), workflowId, random
        }).getMessage();
    }

    /**
     * 해당 워크플로우의 Job ID를 생성한다.
     *
     * @param workflow 워크플로우
     * @return Job ID
     */
    public static String generateKey(Workflow workflow) {
        String random = JVMIDUtils.generateUUID();
        long workflowId = workflow.getId();
        Date date = new Date();
        return MessageFormatter.arrayFormat("JOB_{}_{}_{}", new Object[]{
                DateUtils.parseDate(date, "yyyyMMdd"), workflowId, random
        }).getMessage();
    }

}
