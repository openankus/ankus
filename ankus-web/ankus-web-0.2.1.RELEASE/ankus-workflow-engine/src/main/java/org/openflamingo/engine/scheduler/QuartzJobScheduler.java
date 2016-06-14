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

import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.util.DateUtils;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;

import java.util.*;

/**
 * Quartz Job Scheduler 기반 Scheduler Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class QuartzJobScheduler implements JobScheduler {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(QuartzJobScheduler.class);

    /**
     * Quartz Job Scheduler
     */
    private Scheduler scheduler;

    @Override
    public JobKey startJob(String jobName, String jobGroupName, String cronExpression, Map<String, Object> dataMap) throws WorkflowException {
        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            JobDetail job = JobBuilder.newJob(DefaultWorkflowJob.class).withIdentity(jobKey).build();
            job.getJobDataMap().putAll(dataMap);
            logger.info("새로운 배치 작업을 등록하기 위해 배치 작업을 생성하였습니다.");

            CronTrigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity(jobName, jobGroupName)
                    .startAt(new Date())
                    .withSchedule(CronScheduleBuilder.cronSchedule(cronExpression)).build();
            logger.info("등록한 배치 작업의 실행 주기를 Cron Expression '{}'으로 등록하였습니다.", cronExpression);

            Date scheduledTime = scheduler.scheduleJob(job, trigger);

            logger.info("다음 실행할 시간은 '{}'입니다.", DateUtils.parseDate(trigger.getNextFireTime(), DateUtils.DATE_FORMAT[2]));

            logger.info("Job '{}' Group '{}' 으로 배치 작업 등록이 완료되었습니다. 작업이 등록되면 해당 시간에 즉시 동작하게 됩니다.", jobName, jobGroupName);
            return jobKey;
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 스케줄러에 등록할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public JobKey startJobImmediatly(String jobName, String jobGroupName, Map<String, Object> dataMap) throws WorkflowException {
        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            JobDetail job = JobBuilder.newJob(DefaultWorkflowJob.class).withIdentity(jobKey).build();
            job.getJobDataMap().putAll(dataMap);

            logger.info("새로운 배치 작업을 등록하기 위해 배치 작업을 생성하였습니다.");

            SimpleTrigger trigger = (SimpleTrigger) TriggerBuilder.newTrigger()
                    .withIdentity(jobName, jobGroupName)
                    .startAt(DateUtils.addSeconds(new Date(), 1))
                    .forJob(jobName, jobGroupName)
                    .build();

            logger.info("등록한 배치 작업은 즉시 1회 실행하도록 등록하였습니다.");

            Date scheduledTime = scheduler.scheduleJob(job, trigger);
            logger.info("Job '{}' Group '{}' 으로 배치 작업 등록이 완료되었습니다. 작업이 등록되면 해당 시간에 즉시 동작하게 됩니다.", jobName, jobGroupName);
            return jobKey;
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 스케줄러에 등록할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public JobKey updateJob(String jobName, String jobGroupName, String cronExpression, Map<String, Object> dataMap) throws WorkflowException {
        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            boolean exists = scheduler.checkExists(jobKey);

            if (exists) {
                JobDetail job = scheduler.getJobDetail(jobKey);
                this.stopJob(jobName, jobGroupName);

                CronTrigger trigger = TriggerBuilder.newTrigger()
                        .withIdentity(jobName, jobGroupName)
                        .startAt(new Date())
                        .withSchedule(CronScheduleBuilder.cronSchedule(cronExpression)).build();

                scheduler.scheduleJob(job, trigger);

                logger.info("Job '{}' Group '{}' 으로 배치 작업 업데이트를 완료하였습니다.", jobName, jobGroupName);
                return jobKey;
            } else {
                return this.startJob(jobName, jobGroupName, cronExpression, dataMap);
            }
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 업데이트할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public JobKey deleteJob(String jobName, String jobGroupName) throws WorkflowException {
        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            scheduler.deleteJob(jobKey);
            logger.info("Job '{}' Group '{}' 작업을 스케줄러에서 삭제하였습니다.", jobName, jobGroupName);
            return jobKey;
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 스케줄러에서 삭제할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public JobKey triggerJob(String jobName, String jobGroupName) throws WorkflowException {
        try {
            TriggerKey triggerKey = new TriggerKey(jobName, jobGroupName);
            Trigger trigger = scheduler.getTrigger(triggerKey);
            if (trigger == null) {
                String message = MessageFormatter.format("Job '{}' Group '{}' 작업의 트리거 정보를 확인할 수 없습니다.", jobName, jobGroupName).getMessage();
                throw new IllegalStateException(message);
            }
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업의 스케줄 정보가 등록되어 있지 않아서 스케줄링할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }

        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            scheduler.triggerJob(jobKey);
            return jobKey;
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 스케줄링할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public void pauseJob(String jobName, String jobGroupName) throws WorkflowException {
        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            scheduler.pauseJob(jobKey);
            logger.info("Job '{}' Group '{}' 작업을 스케줄러에서 일시 중지하였습니다.", jobName, jobGroupName);
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 스케줄러에서 일시 중지할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public void resumeJob(String jobName, String jobGroupName) throws WorkflowException {
        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            scheduler.resumeJob(jobKey);
            logger.info("Job '{}' Group '{}' 작업을 스케줄러에서 다시 시작하였습니다.", jobName, jobGroupName);
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 스케줄러에서 다시 시작할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public void stopJob(String jobName, String jobGroupName) throws WorkflowException {
        try {
            scheduler.unscheduleJob(new TriggerKey(jobName, jobGroupName));
            logger.info("Job '{}' Group '{}' 작업을 스케줄러에서 중지하였습니다. 스케줄러 정보가 삭제되었으므로 '시작'하기 전까지 동작하지 않습니다.", jobName, jobGroupName);
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업을 스케줄러에서 중지할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public List<String> getJobNames(String jobGroupName) throws WorkflowException {
        // TODO FIXME
        return null;
    }

    @Override
    public List<String> getJobNames() throws WorkflowException {
        // TODO FIXME
        return null;
    }

    @Override
    public List<JobExecutionContext> getCurrentExecutingJobs() throws WorkflowException {
        try {
            return scheduler.getCurrentlyExecutingJobs();
        } catch (SchedulerException e) {
            throw new WorkflowException("현재 수행중인 스케줄러의 작업 목록을 확인할 수 없습니다.", e);
        }
    }

    @Override
    public List<Map> getJobs() throws WorkflowException {
        try {
            List<Map> jobs = new ArrayList();
            for (String groupName : scheduler.getJobGroupNames()) {
                for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {
                    Map job = new HashMap();
                    JobDetail jobDetail = scheduler.getJobDetail(jobKey);
                    List<Trigger> triggers = (List<Trigger>) scheduler.getTriggersOfJob(jobKey);
                    Trigger first = triggers.get(0);
                    Date nextFireTime = first.getNextFireTime();
                    Workflow workflow = (Workflow) jobDetail.getJobDataMap().get(JobVariable.WORKFLOW);
                    logger.info("{}", workflow);


                    if (workflow != null) {
                        job.put("groupName", jobKey.getGroup());
                        job.put("jobName", jobKey.getName());
                        job.put("name", jobDetail.getJobDataMap().get(JobVariable.JOB_NAME));
                        job.put("jobId", jobDetail.getJobDataMap().get(JobVariable.JOB_KEY));
                        job.put("start", first.getStartTime());
                        job.put("next", nextFireTime.getTime());
                        job.put("cron", jobDetail.getJobDataMap().get("cron"));
                        job.put("workflowId", workflow.getWorkflowId());
                        job.put("username", workflow.getUsername());
                        job.put("designerXml", workflow.getDesignerXml());
                        job.put("workflowXml", workflow.getWorkflowXml());
                        jobs.add(job);
                    }
                }
            }
            return jobs;
        } catch (SchedulerException e) {
            throw new WorkflowException("현재 수행중인 스케줄러의 작업 목록을 확인할 수 없습니다.", e);
        }
    }

    @Override
    public boolean isCurrentExecutingJob(String jobName, String jobGroupName) {
        try {
            TriggerKey triggerKey = new TriggerKey(jobName, jobGroupName);
            Trigger.TriggerState triggerState = scheduler.getTriggerState(triggerKey);
            logger.info("Job '{}' Group '{}' 작업의 현재 상태는 '{}'입니다.", new Object[]{
                    jobName, jobGroupName, triggerState.name()
            });
            return triggerState == Trigger.TriggerState.NORMAL;
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업의 상태 정보를 확인할 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    @Override
    public Map<String, Object> getJobDataMap(String jobName, String jobGroupName) throws WorkflowException {
        try {
            JobKey jobKey = new JobKey(jobName, jobGroupName);
            JobDetail jobDetail = scheduler.getJobDetail(jobKey);
            logger.info("Job '{}' Group '{}' 작업에 대한 Key Value 형식의 Map을 반환하였습니다.", jobName, jobGroupName);
            return jobDetail.getJobDataMap();
        } catch (SchedulerException e) {
            String message = MessageFormatter.format("Job '{}' Group '{}' 작업에 대한 Key Value 형식의 Map을 가져올 수 없습니다.", jobName, jobGroupName).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    ////////////////////////////////////////////////
    // Spring Framework Setter Injection
    ////////////////////////////////////////////////

    /**
     * Quartz Job Scheduler를 설정한다.
     *
     * @param scheduler Quartz Job Scheduler
     */
    public void setScheduler(Scheduler scheduler) {
        this.scheduler = scheduler;
    }
}
