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
package org.openflamingo.engine.scheduler;

import org.openflamingo.engine.context.WorkflowContext;
import org.slf4j.helpers.MessageFormatter;

import java.text.SimpleDateFormat;

/**
 * Workflow Instance Id Generator.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class WorkflowInstanceIdGenerator {

    /**
     * Workflow Instance Id를 생성한다.
     *
     * @param workflowContext Workflow Context
     * @return Workflow Instance Id
     */
    public static String generate(WorkflowContext workflowContext) {
        return MessageFormatter.arrayFormat("{}_{}_{}", new String[]{
                workflowContext.getWorkflowId(),
                new SimpleDateFormat("yyyyMMddHHmm").format(workflowContext.getStartDate()),
                workflowContext.getUniqueId()
        }).getMessage();
    }

}
