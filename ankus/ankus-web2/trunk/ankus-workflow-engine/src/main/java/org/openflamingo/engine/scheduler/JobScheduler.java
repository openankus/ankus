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
import org.quartz.JobExecutionContext;
import org.quartz.JobKey;

import java.util.List;
import java.util.Map;

/**
 * Job Scheduler를 관리하기 위한 다양한 기능을 제공하는 Job Scheduler Interface.
 *
 * @author Byoung Gon, Kim
 * @version 0.2
 */
public interface JobScheduler {

    /**
     * 새로운 Job을 등록하고 Cron Expression에 따라서 지정한 시간에 동작을 시작한다.
     *
     * @param jobName        Job Name
     * @param jobGroupName   Job Group Name
     * @param cronExpression Cron Expression
     * @param dataMap        Job Varaibles
     * @return Job Key
     */
    JobKey startJob(String jobName, String jobGroupName, String cronExpression, Map<String, Object> dataMap) throws WorkflowException;

    /**
     * 새로운 Job을 등록하고 바로 동작을 시작한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     * @param dataMap      Job Varaibles
     * @return Job Key
     */
    JobKey startJobImmediatly(String jobName, String jobGroupName, Map<String, Object> dataMap) throws WorkflowException;

    /**
     * 등록된 Job의 실행 주기를 변경한다.
     *
     * @param jobName        Job Name
     * @param jobGroupName   Job Group Name
     * @param cronExpression Cron Expression
     * @param dataMap        Job Varaibles
     * @return Job Key
     */
    JobKey updateJob(String jobName, String jobGroupName, String cronExpression, Map<String, Object> dataMap) throws WorkflowException;

    /**
     * 등록된 Job을 삭제한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     * @return Job Key
     */
    JobKey deleteJob(String jobName, String jobGroupName) throws WorkflowException;

    /**
     * Job을 즉시 실행한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     * @return Job Key
     */
    JobKey triggerJob(String jobName, String jobGroupName) throws WorkflowException;

    /**
     * 동작중인 Job을 일시 중지한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     */
    void pauseJob(String jobName, String jobGroupName) throws WorkflowException;

    /**
     * 일지 중지 상태인 Job을 다시 시작한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     */
    void resumeJob(String jobName, String jobGroupName) throws WorkflowException;

    /**
     * 실행 중인 Job을 중지한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     */
    void stopJob(String jobName, String jobGroupName) throws WorkflowException;

    /**
     * Quartz Scheduler에 등록되어 있는 Job Name을 조회한다.
     *
     * @param jobGroupName Job Group Name
     */
    List<String> getJobNames(String jobGroupName) throws WorkflowException;

    /**
     * Quartz Scheduler에 등록되어 있는 Job Name을 조회한다.
     */
    List<String> getJobNames() throws WorkflowException;

    /**
     * 실행 중인 Job을 조회한다.
     *
     * @return Quartz Job Execution Context 목록
     */
    List<JobExecutionContext> getCurrentExecutingJobs() throws WorkflowException;

    /**
     * 지정한 Job Name의 Job이 현재 실행중인지 확인한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     * @return 실행중인 경우 <tt>true</tt>
     */
    public boolean isCurrentExecutingJob(String jobName, String jobGroupName);

    /**
     * Job Id의 저장된 Job Data Map을 조회한다.
     *
     * @param jobName      Job Name
     * @param jobGroupName Job Group Name
     * @return Job의 Key Value 형식의 메타 정보
     */
    Map<String, Object> getJobDataMap(String jobName, String jobGroupName) throws WorkflowException;

    /**
     * @return
     * @throws WorkflowException
     */
    List<Map> getJobs() throws WorkflowException;

}