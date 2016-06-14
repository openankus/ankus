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
package org.openflamingo.engine.handler;

import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.engine.context.ActionContext;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.JVMIDUtils;

import java.util.Date;

/**
 * Action의 기준 경로를 생성하는 Path Generator.
 *
 * @author Byoung Gon, Kim
 * @version 0.2
 */
public class ActionBasePathGenerator {

    /**
     * Action의 기준 경로를 반환한다.
     *
     * @param actionContext Action Context
     * @return Action의 기준 경로
     */
    public static String getActionBasePath(ActionContext actionContext) {
        String workingPath = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("working.path");
        String jobId = actionContext.getWorkflowContext().getGlobalVariables().getProperty("JOB_STRING_ID");
        Date current = (Date) actionContext.getWorkflowContext().getSchedulerContext().getJobExecutionContext().getMergedJobDataMap().get(JobVariable.CURRENT);
        String workflowId = actionContext.getWorkflowContext().getWorkflowId();
        return workingPath + "/" + DateUtils.parseDate(current, "yyyy") + "/" + DateUtils.parseDate(current, "MM") + "/" + DateUtils.parseDate(current, "dd") + "/" + workflowId + "/" + jobId + "/" + JVMIDUtils.generateUUID();
    }

}
