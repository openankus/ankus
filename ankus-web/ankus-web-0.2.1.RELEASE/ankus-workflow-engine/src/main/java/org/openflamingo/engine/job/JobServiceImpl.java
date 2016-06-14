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

import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.configuration.LocaleSupport;
import org.openflamingo.engine.scheduler.JobScheduler;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.Pig;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.model.workflow.*;
import org.openflamingo.provider.engine.JobService;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.JVMIDUtils;
import org.openflamingo.util.JaxbUtils;
import org.openflamingo.util.StringUtils;
import org.quartz.JobKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

/**
 * 워크플로우의 실행과 관련된 기능을 제공하는 Job Service.
 *
 * @author Byoung Gon, Kim
 * @see {@link org.openflamingo.engine.scheduler.DefaultQuartzJob}
 * @since 0.4
 */
public class JobServiceImpl extends LocaleSupport implements JobService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(JobServiceImpl.class);

    /**
     * Flamingo Workflow XML의 JAXB Object 패키지명
     */
    public static String WORKFLOW_JAXB_PACKAGE_NAME = "org.openflamingo.model.workflow";

    /**
     * Job Scheduler
     */
    private org.openflamingo.engine.scheduler.JobScheduler jobScheduler;

    @Override
    public Workflow run(Pig pig, HadoopCluster hadoopCluster, String username) {
        try {
            Workflow workflow = new Workflow();
            if (StringUtils.isEmpty(pig.getName())) {
                workflow.setWorkflowName("Pig Job");
            } else {
                workflow.setWorkflowName(pig.getName());
            }
            workflow.setCreate(new Timestamp(System.currentTimeMillis()));
            workflow.setId(Long.parseLong(JVMIDUtils.generateUUID()));
            workflow.setWorkflowId("P_" + DateUtils.parseDate(new Date(), "yyyyMMddHHmm") + "_" + workflow.getId());
            workflow.setUsername(username);
            String workflowXml = getWorkflowXml(pig);
            workflow.setWorkflowXml(workflowXml);

            logger.info("{}", message("S_PIG", "EXECUTE_TO_PIG_SCRIPT", workflowXml));

            String jobGroupName = workflow.getWorkflowId();
            String jobId = JobIdGenerator.generate(workflow);

            Map<String, Object> variables = new HashMap();
            variables.put(JobVariable.WORKFLOW, workflow);
            variables.put(JobVariable.JOB_ID, jobId);
            variables.put(JobVariable.CURRENT, new Date());
            variables.put(JobVariable.HADOOP_CLUSTER, hadoopCluster);
            variables.put(JobVariable.JOB_TYPE, "PIG");

            JobKey jobKey = jobScheduler.startJobImmediatly(jobId, jobGroupName, variables);

            return workflow;
        } catch (Exception ex) {
            throw new WorkflowException(message("S_PIG", "CANNOT_EXECUTE_QUERY"), ex);
        }
    }

    /**
     * Pig Script Job의 워크플로우를 구성한다.
     *
     * @param pig Pig
     * @return Workflow XML
     * @throws JAXBException XML을 생성할 수 없는 경우
     * @throws IOException   XML을 생성할 수 없는 경우
     */
    private String getWorkflowXml(Pig pig) throws JAXBException, IOException {
        org.openflamingo.model.workflow.Workflow workflow = new org.openflamingo.model.workflow.Workflow();

        // Set Workflow Name
        workflow.setWorkflowName("Pig Script Job");

        // Set Start
        NodeType startAction = new NodeType();
        startAction.setName("Start");
        startAction.setDescription("Start");
        startAction.setTo("Pig");
        workflow.setStart(startAction);

        // Set Pig
        ActionType action = new ActionType();
        action.setName("Pig");
        action.setDescription("Pig");
        action.setTo("End");

        // Set Pig Action
        org.openflamingo.model.workflow.Pig pigAction = new org.openflamingo.model.workflow.Pig();
        action.getPig().add(pigAction);

        // Set Script of Pig
        pigAction.setScript(pig.getScript());

        // Set Variables of Pig
        if (pig.getVariable().size() > 0) {
            Variables vars = new Variables();
            Map varMap = pig.getVariable();
            Set<String> varKeySet = varMap.keySet();
            for (String key : varKeySet) {
                String value = (String) varMap.get(key);
                Variable var = new Variable();
                var.setName(key);
                var.setValue(value);
                if (!StringUtils.isEmpty(key)) vars.getVariable().add(var);
            }
            pigAction.setVariables(vars);
        }

        // Set Configuration of Pig
        if (pig.getConfiguration().size() > 0) {
            Configuration conf = new Configuration();
            Map configMap = pig.getConfiguration();
            Set<String> varKeySet = configMap.keySet();
            for (String key : varKeySet) {
                String value = (String) configMap.get(key);
                Variable var = new Variable();
                var.setName(key);
                var.setValue(value);
                if (!StringUtils.isEmpty(key)) conf.getVariable().add(var);
            }
            pigAction.setConfiguration(conf);
        }

        // Set UDF Function of Pig
        if (pig.getExternal().size() > 0) {
            List<String> external = pig.getExternal();
            for (String udf : external) {
                if (!StringUtils.isEmpty(udf)) pigAction.getUdfJar().add(udf);
            }
        }

        // Set End
        BaseType endAction = new BaseType();
        endAction.setName("End");
        endAction.setDescription("End");
        workflow.setEnd(endAction);

        workflow.getAction().add(action);
        return JaxbUtils.marshal(WORKFLOW_JAXB_PACKAGE_NAME, workflow);
    }

    /**
     * 워크플로우를 실행한다.
     *
     * @param workflow 워크플로우
     * @return Job ID
     */
    @Override
    public String run(Workflow workflow, HadoopCluster hadoopCluster) {
        String jobGroupName = workflow.getWorkflowId();
        String jobId = JobIdGenerator.generate(workflow);

        HashMap variables = new HashMap();
        variables.put(JobVariable.WORKFLOW, workflow);
        variables.put(JobVariable.JOB_ID, jobId);
        variables.put(JobVariable.CURRENT, new Date());
        variables.put(JobVariable.HADOOP_CLUSTER, hadoopCluster);
        variables.put(JobVariable.JOB_TYPE, "WORKFLOW");

        logger.info("--------------------------");
        logger.info("Scheduler", jobScheduler);
        logger.info("JOB ID", jobId);
        logger.info("Job Gropu", jobGroupName);
        JobKey jobKey = jobScheduler.startJobImmediatly(jobId, jobGroupName, variables);
        logger.info("--------------------------");

        return jobId;
    }

    @Override
    public void kill(long jobId) {
    }

    @Override
    public String regist(long jobId, String jobName, Workflow workflow, String cronExpression, HashMap vars, HadoopCluster hadoopCluster) {
        String key = JobIdGenerator.generateKey(workflow);

        vars.put("jobDomainId", jobId);
        vars.put("cron", cronExpression);
        vars.put(JobVariable.WORKFLOW, workflow);
        vars.put(JobVariable.JOB_TYPE, "WORKFLOW");
        vars.put(JobVariable.HADOOP_CLUSTER, hadoopCluster);
        vars.put(JobVariable.JOB_NAME, jobName);
        vars.put(JobVariable.JOB_KEY, key);

        JobKey jobKey = jobScheduler.startJob(key, "Scheduled Job", cronExpression, vars);
        logger.info("{}", message("S_PIG", "START_PIG_JOB"));
        return jobKey.getName();
    }

    @Override
    public List<Map> getJobs() {
        return jobScheduler.getJobs();
    }

    @Override
    public long getCurrentDate() {
        return System.currentTimeMillis();
    }

    public void setJobScheduler(JobScheduler jobScheduler) {
        this.jobScheduler = jobScheduler;
    }

}