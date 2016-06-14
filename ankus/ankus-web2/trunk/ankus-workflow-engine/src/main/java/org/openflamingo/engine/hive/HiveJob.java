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
package org.openflamingo.engine.hive;

import org.apache.commons.lang.StringUtils;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.engine.configuration.LocaleSupport;
import org.openflamingo.model.rest.Hive;
import org.openflamingo.model.rest.HiveHistory;
import org.openflamingo.model.rest.HiveServer;
import org.openflamingo.model.rest.State;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.FileSystemUtils;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import java.util.Date;

/**
 * Quartz Job Scheduler에서 동작하는 Quartz Job의 기본 기능을 제공하는 Quartz Job.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class HiveJob extends LocaleSupport implements Job {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveJob.class);

    /**
     * Spring Framework Application Context의 Key
     */
    protected final static String APPLICATION_CONTEXT = "CTX";

    /**
     * Quartz Job Scheduler's Job Execution Context
     */
    private JobExecutionContext context;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        this.context = context;

        String logPath = (String) context.getMergedJobDataMap().get("logPath");
        String query = (String) context.getMergedJobDataMap().get("query");
        String username = (String) context.getMergedJobDataMap().get("username");
        String database = (String) context.getMergedJobDataMap().get("database");
        String executionId = (String) context.getMergedJobDataMap().get("executionId");
        HiveServer hiveServer = (HiveServer) context.getMergedJobDataMap().get("hiveServer");
        Hive hive = (Hive) context.getMergedJobDataMap().get("hive");
        String executeUser = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("hive.query.execute.user");

        HiveHistoryRepository repository = getBean(HiveHistoryRepository.class);
        HiveHistory history = getHistory(logPath, query, executionId, username, database);
        repository.insert(history);

        FileSystemUtils.testCorrentAndCreateDir(FileSystemUtils.correctPath(logPath));

        HiveClient hiveClient = new HiveJdbcClient();
        try {
            query = HiveQueryUtils.removeComments(query);
            query = HiveQueryUtils.applyVariables(query, hive.getVariable());
            query = HiveQueryUtils.removeBlankLines(query).trim();
            if (query.endsWith(";")) query = StringUtils.removeEnd(query, ";");

            if (!hiveClient.isConnected()) {
                String jdbcUrl = hiveServer.getJdbcUrl() + "/" + database + ";user=" + executeUser;
                hiveClient.openConnection(jdbcUrl, database);

                logger.info("{}", message("S_HIVE", "CONNECTED_HIVE_SERVER", jdbcUrl));
            }

            hiveClient.executeQuery(executionId, logPath, query);

            logger.info("{}", message("S_HIVE", "EXECUTE_2", executionId));

            history.setStatus(State.SUCCESS);
            history.setEndDate(new Date());
            history.setElapsed(DateUtils.getDiffSeconds(history.getEndDate(), history.getStartDate()));
            repository.update(history);
        } catch (Exception ex) {
            logger.warn("{}", message("S_HIVE", "DIALOG_TITLE_QUERY_FAIL"), ex);
            history.setStatus(State.FAIL);
            history.setEndDate(new Date());
            history.setCause(ex.getMessage());
            history.setElapsed(DateUtils.getDiffSeconds(history.getEndDate(), history.getStartDate()));
            repository.update(history);

            throw new JobExecutionException(ex.getMessage(), ex);
        } finally {
            hiveClient.closeConnection();
        }
    }

    /**
     * Spring Framework Application Context에서 지정한 유형의 Bean을 반환한다.
     *
     * @param requiredType Bean의 유형
     * @param <T>          Bean의 유형
     * @return Bean의 인스턴스
     */
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
            return (ApplicationContext) context.getScheduler().getContext().get(APPLICATION_CONTEXT);
        } catch (Exception ex) {
            throw new WorkflowException(message("S_CORE", "INVALID_SPRING"), ex);
        }
    }

    private HiveHistory getHistory(String logPath, String query, String executionId, String username, String database) {
        HiveHistory hiveHistory = new HiveHistory();
        hiveHistory.setDatabaseName(database);
        hiveHistory.setQueryName("");
        hiveHistory.setLogPath(logPath);
        hiveHistory.setStartDate(new Date());
        hiveHistory.setStatus(State.RUNNING);
        hiveHistory.setExecutionId(executionId);
        hiveHistory.setQuery(query);
        hiveHistory.setUsername(username);

        return hiveHistory;
    }
}
