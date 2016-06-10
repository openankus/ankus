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
package org.openflamingo.engine.monitoring.cleaning;

import org.openflamingo.core.exception.ServiceException;
import org.openflamingo.core.exception.SystemException;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.engine.hive.HiveHistoryService;
import org.openflamingo.util.DateUtils;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

import java.io.File;
import java.util.Date;

public class HiveLogCleaningQuartzJob extends QuartzJobBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveLogCleaningQuartzJob.class);

    /**
     * Spring Framework Application Context의 Key
     */
    protected final static String APPLICATION_CONTEXT = "CTX";

    /**
     * Quartz Job Scheduler's Job Execution Context
     */
    private JobExecutionContext context;

    protected void executeInternal(JobExecutionContext ctx) throws JobExecutionException {
        this.context = context;
        try {
            String path = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("hive.query.log.path");

            Date date = DateUtils.addDays(new Date(), -2);
            String yyyy = DateUtils.parseDate(date, "yyyy");
            String mm = DateUtils.parseDate(date, "MM");
            String dd = DateUtils.parseDate(date, "dd");
            String twoAgoPath = path + "/" + yyyy + "/" + mm + "/" + dd;

            if (new File(twoAgoPath).exists()) {
                new File(twoAgoPath).delete();
                logger.info("Removed before 2 days for '{}' of Hive Query", twoAgoPath);
            }

            HiveHistoryService historyService = getBean(HiveHistoryService.class);
            historyService.deleteBeforeTwoAgo();
        } catch (Exception e) {
            throw new ServiceException("Cannot remove before 2 days for log files of Hive Query", e);
        }
    }

    public <T> T getBean(Class<T> requiredType) {
        return this.getApplicationContext().getBean(requiredType);
    }

    /**
     * Spring Framework Application Context를 반환한다.
     *
     * @return Spring Framework Application Context
     */
    private ApplicationContext getApplicationContext() {
        try {
            ApplicationContext appContext = (ApplicationContext) context.getScheduler().getContext().get(APPLICATION_CONTEXT);
            if (appContext == null) {
                throw new SystemException("Spring Framework Application Context does not exists.");
            }
            return appContext;
        } catch (Exception ex) {
            throw new WorkflowException("Invalid Hive Log Cleaning Job", ex);
        }
    }
}