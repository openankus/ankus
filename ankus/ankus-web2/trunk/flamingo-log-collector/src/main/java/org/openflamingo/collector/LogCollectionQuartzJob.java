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
package org.openflamingo.collector;

import org.openflamingo.collector.handler.Handler;
import org.openflamingo.model.collector.Collector;
import org.openflamingo.util.DateUtils;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;

/**
 * Quartz Job Scheduler based Flamingo Log Collector Job.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class LogCollectionQuartzJob implements Job {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(Job.class);

    /**
     * Log Collector Job XML의 JAXB ROOT Object
     */
    private Collector model;

    /**
     * HDFS Log Collector Job Context
     */
    private JobContext jobContext;

    /**
     * HDFS Log Collector Job XML에서 정의되어 있는 현재 처리해야할 노드
     */
    private org.openflamingo.model.collector.Job job;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        //////////////////////////////////////
        // Quartz Job Scheduler Context에서
        // 필요한 각종 정보를 꺼내오는 부분
        //////////////////////////////////////

        JobDataMap dataMap = context.getMergedJobDataMap();
        model = (Collector) dataMap.get("model");
        job = (org.openflamingo.model.collector.Job) dataMap.get("job");
        jobContext = (JobContext) dataMap.get("context");

        //////////////////////////////////////
        // 핸들러를 이용하여 처리하는 부분
        //////////////////////////////////////

        Date startDate = new Date();

        logger.info("--------------------------------------------");
        logger.info("Job '{}'을 시작합니다", job.getName());
        logger.info("--------------------------------------------");

        try {
            Handler handler = HandlerRegistry.getHandlerRegistry().getHandler(jobContext, job);
            handler.validate();
            handler.execute();
        } catch (Exception ex) {
            String msg = "Log Collector를 실행하던 도중 예외가 발생하여 Quartz Job이 실패하였습니다.";
            logger.warn(msg, ex);
            throw new JobExecutionException(msg, ex, false);
        }

        Date endDate = new Date();
        logger.info("Job '{}'을 완료하였습니다", job.getName());
        logger.info("Job '{}'을 처리하는데 소요된 총 시간은 {} (시작: {} / 종료: {})입니다.", new String[]{
            job.getName(), DateUtils.formatDiffTime(endDate, startDate), DateUtils.parseDate(startDate, "yyyy-MM-dd HH:mm:ss"), DateUtils.parseDate(endDate, "yyyy-MM-dd HH:mm:ss")
        });
    }
}
