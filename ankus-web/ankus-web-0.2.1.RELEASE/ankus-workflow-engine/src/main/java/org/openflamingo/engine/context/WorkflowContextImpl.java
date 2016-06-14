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
package org.openflamingo.engine.context;

import org.openflamingo.core.exception.SystemException;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.el.ELEvaluator;
import org.openflamingo.el.ELService;
import org.openflamingo.el.ELUtils;
import org.openflamingo.engine.dag.TSWorkflowExecutionPlanner;
import org.openflamingo.engine.dag.WorkflowExecutionPlanner;
import org.openflamingo.engine.job.JobIdGenerator;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.engine.scheduler.WorkflowInstanceIdGenerator;
import org.openflamingo.engine.state.WorkflowStateHandler;
import org.openflamingo.engine.state.WorkflowStateRegistry;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.State;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.model.rest.WorkflowHistory;
import org.openflamingo.model.workflow.ActionType;
import org.openflamingo.model.workflow.GlobalVariable;
import org.openflamingo.model.workflow.GlobalVariables;
import org.openflamingo.provider.engine.JobService;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.JVMIDUtils;
import org.openflamingo.util.JaxbUtils;
import org.quartz.JobDataMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.context.ApplicationContext;
import org.springframework.util.StringUtils;

import java.util.*;

import static org.openflamingo.util.StringUtils.isEmpty;

/**
 * Workflow Context Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class WorkflowContextImpl implements WorkflowContext {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(WorkflowContextImpl.class);

    /**
     * Spring Framework Application Context의 Key
     */
    protected final static String APPLICATION_CONTEXT = "CTX";

    /**
     * Scheduler Context
     */
    private SchedulerContext schedulerContext;

    /**
     * Workflow Domain Object
     */
    private Workflow workflowDomain;

    /**
     * Workflow Execution Planner
     */
    private TSWorkflowExecutionPlanner executionPlanner;

    /**
     * Action Context의 Map
     */
    private Map<String, ActionContext> actionContextMap;

    /**
     * Workflow XML의 JAXB Object
     */
    private org.openflamingo.model.workflow.Workflow model;

    /**
     * 현재 노드의 이전 노드의 매핑 정보
     */
    private Map<String, Set<String>> previous;

    /**
     * Global Variables
     */
    private Properties globalVariables;

    /**
     * Expression Language Evaluator
     */
    private ELEvaluator evaluator;

    /**
     * 기본 생성자. 하지만 외부에서 직접 생성할 수 없다.
     */
    private WorkflowContextImpl() {
    }

    /**
     * 기본 생성자.
     *
     * @param schedulerContext Quartz Job Execution Context
     */
    public WorkflowContextImpl(SchedulerContext schedulerContext) {
        try {
            // 워크플로우 실행에 필요한 기본 구성요소를 설정한다.
            this.schedulerContext = schedulerContext;
            this.workflowDomain = (Workflow) getJobDataMap(schedulerContext).get(JobVariable.WORKFLOW);
            this.model = (org.openflamingo.model.workflow.Workflow) JaxbUtils.unmarshal("org.openflamingo.model.workflow", this.workflowDomain.getWorkflowXml());
            this.executionPlanner = new TSWorkflowExecutionPlanner(model);
            this.actionContextMap = new LinkedHashMap<String, ActionContext>();
            this.previous = buildPrevious(this.model);
            this.evaluator = getBean(ELService.class).createEvaluator();

            // Workflow XML에 정의한 Workflow Variable을 Global Variable로 구성한다.
            this.globalVariables = buildGlobalVariables(this.model.getGlobalVariables());

            // Global Variable을 구성한다.
            this.globalVariables.put("USERNAME", this.workflowDomain.getUsername());
            this.globalVariables.put("WORKFLOW_NAME", this.workflowDomain.getWorkflowName());
            this.globalVariables.put("ID", "" + this.workflowDomain.getId());
            this.globalVariables.put("WORKFLOW_ID", this.workflowDomain.getWorkflowId());
            this.globalVariables.put("JOB_ID", JVMIDUtils.generateUUID());
            this.globalVariables.put("JOB_TYPE", this.getJobDataMap(schedulerContext).getString(JobVariable.JOB_TYPE));
            this.globalVariables.put("RANDOM", JVMIDUtils.generateUUID());
            this.globalVariables.put("YYYYMMDD", DateUtils.getCurrentYyyymmdd());
            this.globalVariables.put("NAMENODE", ((HadoopCluster) this.getJobDataMap(schedulerContext).get(JobVariable.HADOOP_CLUSTER)).getHdfsUrl());

            String jobStringId = this.getJobDataMap(schedulerContext).getString(JobVariable.JOB_ID);
            JobDataMap jobDataMap = this.getJobDataMap(schedulerContext);
            if (StringUtils.isEmpty(jobStringId)) { // FIXME : Pig Job
                String jobId = JobIdGenerator.generate(workflowDomain);
                jobDataMap.put(JobVariable.JOB_ID, jobId);
                this.getJobDataMap(schedulerContext).getString(JobVariable.JOB_ID);
                this.globalVariables.put("JOB_STRING_ID", jobId);
            } else {
                this.globalVariables.put("JOB_STRING_ID", this.getJobDataMap(schedulerContext).getString(JobVariable.JOB_ID));
            }

            if (this.getJobDataMap(schedulerContext).get(JobVariable.CURRENT) == null) {
                jobDataMap.put(JobVariable.CURRENT, new Date());
            }

            // FIXME Hadoop/S3 관련 정보도 주입 필요.

            // Scheduler Context에 관련 정보를 보관한다.
            this.setObject(JobVariable.ACTION_CONTEXT, actionContextMap);
            this.setObject(JobVariable.WORKFLOW, workflowDomain);
            this.setObject(JobVariable.PLANNER, executionPlanner);
            this.setObject(JobVariable.WORKFLOW_VARIABLES, getEvaluatedProperties(getGlobalVariables()));

            logger.debug("워크플로우 '{}({})'을 실행합니다.", workflowDomain.getWorkflowName(), workflowDomain.getId());
        } catch (Exception ex) {
            this.setObject(JobVariable.WORKFLOW_EXCEPTION, ex);
            changeState(State.FAIL);

            String jobId = (String) schedulerContext.getJobExecutionContext().getMergedJobDataMap().get(JobVariable.JOB_ID);
            Workflow workflow = (Workflow) schedulerContext.getJobExecutionContext().getMergedJobDataMap().get(JobVariable.WORKFLOW);

            String message = MessageFormatter.arrayFormat("Workflow Job을 초기화할 수 없습니다. Workflow ID : {}, Workflow Name : {}, Job ID : {}", new Object[]{
                    workflow.getId(), workflow.getWorkflowName(), jobId
            }).getMessage();

            throw new WorkflowException(message, ex);
        }
    }

    /**
     * Properties에 속한 Value를 evaluation하겨 Properties를 구성한다.
     *
     * @param props Map
     * @return Properties
     */
    public Properties getEvaluatedProperties(Properties props) throws Exception {
        Properties properties = new Properties();
        Enumeration<Object> keys = props.keys();
        while (keys.hasMoreElements()) {
            String key = (String) keys.nextElement();
            if (!isEmpty(key))
                properties.put(key, ELUtils.evaluate(this.evaluator, props, props.getProperty(key)));
        }
        return properties;
    }

    /**
     * Quartz Job Scheduler의 Data Map을 반환한다.
     *
     * @return Quartz Job Scheduler의 Data Map
     */
    private JobDataMap getJobDataMap(SchedulerContext schedulerContext) {
        return schedulerContext.getJobExecutionContext().getMergedJobDataMap();
    }

    /**
     * Workflow XML의 Global Variables를 Key Value Properties으로 구성한다.
     *
     * @param globalVariables Workflow XML의 Global Variables
     * @return Key Value Properties
     */
    private Properties buildGlobalVariables(GlobalVariables globalVariables) throws Exception {
        Properties props = new Properties();
        if (globalVariables != null && globalVariables.getGlobalVariable().size() > 0) {
            List<GlobalVariable> globalVars = globalVariables.getGlobalVariable();
            for (GlobalVariable var : globalVars) {
                props.put(var.getName(), ELUtils.evaluate(this.evaluator, System.getProperties(), var.getValue()));
            }
        }
        return props;
    }

    /**
     * Spring Framework Application Context를 반환한다.
     *
     * @return Spring Framework Application Context
     */
    private ApplicationContext getApplicationContext() {
        try {
            ApplicationContext appContext = (ApplicationContext) schedulerContext.getJobExecutionContext().getScheduler().getContext().get(APPLICATION_CONTEXT);
            if (appContext == null) {
                throw new SystemException("Spring Framework Application Context does not exists.");
            }
            return appContext;
        } catch (Exception ex) {
            throw new WorkflowException("Invalid Workflow Job", ex);
        }
    }

    @Override
    public Object getBean(String name) {
        return this.getApplicationContext().getBean(name);
    }

    @Override
    public <T> T getBean(Class<T> requiredType) {
        return this.getApplicationContext().getBean(requiredType);
    }

    @Override
    public String getValue(String key) {
        return (String) getSchedulerContext().get(key);
    }

    @Override
    public Object getValue(String prefix, String key) {
        Map map = (Map) getSchedulerContext().get(prefix);
        return map.get(key);
    }

    @Override
    public Object getObject(String key) {
        return getSchedulerContext().get(key);
    }

    @Override
    public void setObject(String key, Object object) {
        getSchedulerContext().put(key, object);
    }

    @Override
    public void setValue(String key, String value) {
        getSchedulerContext().put(key, value);
    }

    @Override
    public void setValue(String prefix, String key, String value) {
        if (getSchedulerContext().get(prefix) == null) {
            getSchedulerContext().put(prefix, new HashMap());
        }
        ((Map) getSchedulerContext().get(prefix)).put(key, value);
    }

    @Override
    public String getWorkflowInstanceId() {
        return WorkflowInstanceIdGenerator.generate(this);
    }

    @Override
    public String getWorkflowId() {
        return "" + this.workflowDomain.getId();
    }

    @Override
    public WorkflowExecutionPlanner getExecutionPlanner() {
        return executionPlanner;
    }

    @Override
    public String getCurrentActionName() {
        return (String) this.getSchedulerContext().get(JobVariable.ACTION_CURRENT);
    }

    @Override
    public String getCurrentActionDescription() {
        return (String) this.getSchedulerContext().get(JobVariable.ACTION_CURRENT_DESC);
    }

    @Override
    public Map<String, ActionContext> getActionContexts() {
        return (Map<String, ActionContext>) this.getSchedulerContext().get(JobVariable.ACTION_CONTEXT);
    }

    @Override
    public Map<String, Object> getActionModel() {
        return this.executionPlanner.getActionMap();
    }

    @Override
    public Object getCurrentActionModel() {
        return this.getActionModel().get(getCurrentActionName());
    }

    @Override
    public ActionContext getCurrentActionContext() {
        return this.getActionContexts().get(getCurrentActionName());
    }

    @Override
    public SchedulerContext getSchedulerContext() {
        return this.schedulerContext;
    }

    @Override
    public Workflow getWorkflowDomain() {
        return workflowDomain;
    }

    @Override
    public Date getStartDate() {
        return this.getWorkflowHistory().getStartDate();
    }

    @Override
    public Date getEndDate() {
        return this.getWorkflowHistory().getEndDate();
    }

    @Override
    public String getUniqueId() {
        return "" + this.getWorkflowHistory().getId();
    }

    @Override
    public void changeState(State state) {
        WorkflowStateHandler handler = WorkflowStateRegistry.getWorkflowStateHandler(state);
        logger.trace("Workflow의 상태를 Workflow Handler '{}'을 이용하여 변경합니다.", handler.getClass().getName());
        handler.changeStatus(this);
    }

    @Override
    public Exception getException() {
        return (Exception) this.getObject(JobVariable.WORKFLOW_EXCEPTION);
    }

    @Override
    public org.openflamingo.model.workflow.Workflow getModel() {
        return this.model;
    }

    @Override
    public Set<String> getPreviousAction(String currentActionName) {
        return previous.get(currentActionName);
    }

    @Override
    public Properties getGlobalVariables() {
        return this.globalVariables;
    }

    /**
     * Workflow XML Model에서 현재 노드에 대한 이전 노드 정보를 모두 추출한다.
     *
     * @param model Workflow XML Model
     * @return 현재 노드의 이전 노드의 목록을 key value로 매핑한 매핑 정보
     */
    private Map<String, Set<String>> buildPrevious(org.openflamingo.model.workflow.Workflow model) {
        Map<String, Set<String>> map = new HashMap<String, Set<String>>();
        List<ActionType> actions = model.getAction();
        for (ActionType action : actions) {
            String from = action.getName();
            if (StringUtils.hasLength(action.getTo())) {
                Set<String> tos = StringUtils.commaDelimitedListToSet(action.getTo());
                for (String to : tos) {
                    if (map.get(to) == null) {
                        map.put(to, new HashSet<String>());
                    }
                    map.get(to).add(from);
                }
            }
        }
        return map;
    }

    /**
     * Workflow의 실행 이력을 반환한다.
     *
     * @return Workflow의 실행 이력
     */
    protected WorkflowHistory getWorkflowHistory() {
        return (WorkflowHistory) this.getSchedulerContext().get(JobVariable.WORKFLOW_HISTORY);
    }

    @Override
    public JobService getJobService() {
        return this.getApplicationContext().getBean(JobService.class);
    }
}