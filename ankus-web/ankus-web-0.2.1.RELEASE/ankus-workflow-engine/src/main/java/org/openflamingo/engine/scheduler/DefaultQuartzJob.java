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

import org.openflamingo.engine.context.QuartzJobSchedulerContext;
import org.openflamingo.engine.context.WorkflowContextImpl;
import org.openflamingo.model.rest.State;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Quartz Job Scheduler에서 동작하는 Quartz Job의 기본 기능을 제공하는 Quartz Job.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public abstract class DefaultQuartzJob implements Job, WorkflowJob {

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        WorkflowContextImpl ctx = null;
        QuartzJobSchedulerContext schedulerContext = new QuartzJobSchedulerContext(context);
        ctx = new WorkflowContextImpl(schedulerContext);

        ctx.changeState(State.PREPARE);
        executeInternal(ctx);
        ctx.changeState(State.SUCCESS);
    }

}
