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
import org.openflamingo.core.exception.ServiceException;
import org.openflamingo.el.ELService;
import org.openflamingo.el.ELUtils;
import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.engine.configuration.LocaleSupport;
import org.openflamingo.engine.util.FileReader;
import org.openflamingo.model.rest.Hive;
import org.openflamingo.model.rest.HiveHistory;
import org.openflamingo.model.rest.HiveServer;
import org.openflamingo.provider.hive.HiveService;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.JVMIDUtils;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.*;

/**
 * Remote Hive Service Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 0.5
 */
@Service
public class HiveServiceImpl extends LocaleSupport implements HiveService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveServiceImpl.class);

    /**
     * 3자리 단위로 숫자에 comma를 추가하는 숫자 포맷팅
     */
    private DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");

    /**
     * Hive History Repository
     */
    @Autowired
    private HiveHistoryRepository historyRepository;

    /**
     * Job Scheduler
     */
    @Autowired
    private Scheduler scheduler;

    /**
     * Expression Language Service
     */
    @Autowired
    private ELService elService;

    @Override
    public List<HiveHistory> listHistoriesByCondition(String startDate, String endDate, String scriptName, String status, int start, int limit, String orderBy, String dir, String username) {
        try {
            List<HiveHistory> histories = historyRepository.listHistoriesByCondition(startDate, endDate, scriptName, status, start, limit, orderBy, dir, username);
            for (HiveHistory history : histories) {
                String logPath = history.getLogPath();
                File data = new File(logPath, "data.log");
                if (data.exists()) {
                    long length = data.length();
                    history.setLength(length);
                }
            }
            return histories;
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_HIVE_HISTORIES"), ex);
        }
    }

    @Override
    public int getTotalCountOfHistoriesByCondition(String startDate, String endDate, String scriptName, String status, String username) {
        try {
            return historyRepository.getTotalCountOfHistoriesByCondition(startDate, endDate, scriptName, status, username);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_TOTAL_HISTORIES"), ex);
        }
    }

    @Override
    public HiveHistory getHistory(String executionId) {
        try {
            return historyRepository.selectByCondition(executionId).get(0);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_HISTORY", executionId), ex);
        }
    }

    @Override
    public List<Map<String, String>> getResults(String executionId, int start, int end) {
        List<Map<String, String>> results = new ArrayList<>(COUNT_PER_PAGE);
        List<String> columns = new ArrayList<>();

        try {
            HiveHistory history = getHistory(executionId);
            String logPath = getLogPath(executionId, history.getUsername());

            columns.addAll(Arrays.asList(FileReader.read(1, 1, logPath + "/metadata.log").trim().split("\\t")));

            String[] logs = FileReader.read(start, end, logPath + "/data.log").split("\\n");
            for (String log : logs) {
                Map<String, String> row = new HashMap<>();

                int i = 0;
                for (String data : log.split("\t")) {
                    row.put(columns.get(i), data);
                    ++i;
                }

                results.add(row);
            }
            return results;
        } catch (Exception e) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_RESULT", executionId), e);
        }
    }

    @Override
    public int getCounts(String executionId) {
        HiveHistory history = getHistory(executionId);
        String dataPath = history.getLogPath() + "/data.log";
        try {
            if (new File(dataPath).exists()) {
                return FileReader.lines(dataPath);
            }
            return 0;
        } catch (Exception e) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_RESULT_COUNT", executionId), e);
        }
    }

    @Override
    public String executeQuery(HiveServer hiveServer, String database, Hive hive, String username) {
        String script = hive.getScript();
        script = HiveQueryUtils.removeComments(script);
        script = HiveQueryUtils.applyVariables(script, hive.getVariable());
        script = HiveQueryUtils.removeBlankLines(script).trim();
        if (script.endsWith(";")) script = StringUtils.removeEnd(script, ";");

        String executionId = getExecutionId();
        validateQuery(hiveServer, database, hive, executionId, username);

        try {
            return executeQuery(hiveServer, database, hive, executionId, script, username);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_EXECUTE_QUERY"), ex);
        }
    }

    private String load(String sourceFilePath) {
        try {
            String filePath = FileSystemUtils.correctPath(sourceFilePath);
            return FileSystemUtils.loadFromFile(filePath);
        } catch (Exception ex) {
            return "Not Exists";
        }
    }

    @Override
    public String getQuery(String executionId, String username) {
        try {
            String logPath = getLogPath(executionId, username);

            StringBuilder builder = new StringBuilder();

            if (new File(logPath, "/explain.log").exists()) {
                builder.append("===========================").append("\n");
                builder.append("= Explain").append("\n");
                builder.append("===========================").append("\n").append("\n");

                builder.append(load(logPath + "/explain.log")).append("\n");
            } else {
                builder.append("===========================").append("\n");
                builder.append("= Hive Query").append("\n");
                builder.append("===========================").append("\n").append("\n");

                builder.append(load(logPath + "/hive.script")).append("\n").append("\n");
            }

            return builder.toString();
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_QUERY_INFO", executionId), ex);
        }
    }

    @Override
    public List<String> getDatabases(HiveServer hiveServer) {
        try {
            SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
            dataSource.setDriverClass(org.apache.hive.jdbc.HiveDriver.class);
            dataSource.setUrl(hiveServer.getJdbcUrl());

            final List<String> list = new ArrayList<String>();
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            jdbcTemplate.query("show databases", new RowCallbackHandler() {
                @Override
                public void processRow(ResultSet resultSet) throws SQLException {
                    list.add(resultSet.getString("database_name"));
                }
            });
            return list;
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_HIVE_DBS"), ex);
        }
    }

    @Override
    public void checkSize(Long maxSize, String executionId, String username) {
        try {
            String logPath = getLogPath(executionId, username);
            long length = new File(logPath, "data.log").length();
            if (length > maxSize) {
                throw new ServiceException(message("S_HIVE", "EXCEED_RESULT_SIZE", decimalFormat.format(maxSize), decimalFormat.format(length)));
            }
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_RESULT_SIZE", executionId), ex);
        }
    }

    @Override
    public byte[] load(String executionId, String username) {
        try {
            String logPath = getLogPath(executionId, username);
            File file = new File(logPath, "data.log");
            return FileSystemUtils.loadBytes(file.getAbsolutePath());
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_LOAD_RESULT", executionId), ex);
        }
    }

    @Override
    public long getCurrentDate() {
        return System.currentTimeMillis();
    }

    @Override
    public boolean createDatabase(HiveServer hiveServer, String database, String location, String comment) {
        HiveClient hiveClient = new HiveJdbcClient();

        try {
            String script = org.slf4j.helpers.MessageFormatter.arrayFormat("CREATE DATABASE IF NOT EXISTS {} COMMENT '{}' LOCATION '{}'", new String[]{
                    database, comment, location
            }).getMessage();

            String executeUser = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("hive.query.execute.user");

            if (!hiveClient.isConnected()) {
                hiveClient.openConnection(hiveServer.getJdbcUrl() + "/" + database + ";user=" + executeUser, "default");
            }

            hiveClient.executeQuery(JVMIDUtils.generateUUID(), "", script);
            return true;
        } catch (Exception ex) {
            logger.warn("Cannot create Hive Database '{}' for '{}'", database, location, ex);
            return false;
        } finally {
            hiveClient.closeConnection();
        }
    }

    /**
     * Hive Query를 실행한다.
     *
     * @param hiveServer  Hive Server
     * @param database    Database
     * @param hive        Hive 쿼리 정보
     * @param executionId Hive Query Execution ID
     * @param query       Hive Query
     * @param username    사용자명
     * @return Hive Query의 검증 결과
     */
    private String executeQuery(HiveServer hiveServer, String database, Hive hive, String executionId, String query, String username) {
        int runningJobs = getRunningJobs(username);
        long maxCount = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().getLong("hive.query.simultaneously.per.user", 3);
        if (runningJobs > maxCount) {
            throw new ServiceException(message("S_HIVE", "EXCEED_MAX_QUERY", maxCount));
        }

        try {
            String logPath = getLogPath(executionId, username);
            JobKey jobKey = new JobKey(executionId, username);
            JobDetail job = JobBuilder.newJob(HiveJob.class).withIdentity(jobKey).build();
            job.getJobDataMap().put("hive", hive);
            job.getJobDataMap().put("logPath", logPath);
            job.getJobDataMap().put("executionId", executionId);
            job.getJobDataMap().put("username", username);
            job.getJobDataMap().put("query", query);
            job.getJobDataMap().put("hiveServer", hiveServer);
            job.getJobDataMap().put("database", database);

            logger.info("{}", message("S_HIVE", "CREATE_NEW_JOB"));

            SimpleTrigger trigger = (SimpleTrigger) TriggerBuilder.newTrigger()
                    .withIdentity(executionId, username)
                    .startAt(DateUtils.addSeconds(new Date(), 1))
                    .forJob(executionId, username)
                    .build();

            logger.info("{}", message("S_HIVE", "ONE_RUN"));

            scheduler.scheduleJob(job, trigger);
            logger.info("{}", message("S_HIVE", "EXECUTE_QUERY", executionId, username));

            return message("S_HIVE", "EXECUTE_QUERY", executionId);
        } catch (Exception e) {
            throw new ServiceException(message("S_HIVE", "CANNOT_REGIST", executionId, username), e);
        }
    }

    /**
     * 지정한 사용자가 실행하고 있는 작업의 개수를 반환한다.
     *
     * @param username 사용자명
     * @return 실행중인 작업의 개수
     */
    private int getRunningJobs(String username) {
        try {
            List<JobExecutionContext> currentlyExecutingJobs = scheduler.getCurrentlyExecutingJobs();
            Iterator<JobExecutionContext> iterator = currentlyExecutingJobs.iterator();
            int count = 0;
            while (iterator.hasNext()) {
                JobExecutionContext context = iterator.next();
                if (username.equals(context.getJobDetail().getKey().getGroup())) {
                    count++;
                }
            }
            return count;
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_RUNNING_JOBS"), ex);
        }
    }

    /**
     * 해당 사용자의 Hive Query Execution에 대한 Log Path를 반환한다.
     *
     * @param username Username
     * @return Log Path
     * @throws Exception Expression Language를 처리할 수 없는 경우
     */
    private String getLogPath(String executionId, String username) throws Exception {
        try {
            String path = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("hive.query.log.path") + USER_PATH;

            Properties props = new Properties();
            props.put("executionId", executionId);
            props.put("username", username);
            return ELUtils.evaluate(elService.createEvaluator(), props, path);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_GET_LOG_PATH", executionId), ex);
        }
    }

    /**
     * Hive Query Execution ID를 생성한다.
     *
     * @return Hive Query Execution ID
     */
    private String getExecutionId() {
        return DateUtils.parseDate(new Date(), "yyyyMMddHHmmss") + "_" + JVMIDUtils.generateUUID();
    }

    /**
     * Hive Query를 검증한다.
     *
     * @param hiveServer  Hive Server
     * @param database    Database
     * @param hive        Hive 쿼리 정보
     * @param executionId Hive Query Execution ID
     * @param username    사용자명
     * @return Hive Query의 검증 결과
     */
    private String validateQuery(HiveServer hiveServer, String database, Hive hive, String executionId, String username) {
        HiveClient hiveClient = new HiveJdbcClient();

        try {
            String script = hive.getScript();

            script = HiveQueryUtils.removeComments(script);
            script = HiveQueryUtils.applyVariables(script, hive.getVariable());
            script = HiveQueryUtils.removeBlankLines(script).trim();
            if (script.endsWith(";")) script = StringUtils.removeEnd(script, ";");

            String executeUser = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("hive.query.execute.user");

            if (!hiveClient.isConnected()) {
                hiveClient.openConnection(hiveServer.getJdbcUrl() + "/" + database + ";user=" + executeUser, database);
            }

            if (!script.toUpperCase().startsWith("EXPLAIN") && !script.toUpperCase().startsWith("DESCRIBE")) {
                script = "EXPLAIN " + script;
            }

            return hiveClient.executeQuery(executionId, "", script);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HIVE", "CANNOT_VALIDATE_QUERY", executionId, hive.getScript()), ex);
        } finally {
            hiveClient.closeConnection();
        }
    }

    @Override
    public String validateQuery(HiveServer hiveServer, String database, Hive hive, String username) {
        return validateQuery(hiveServer, database, hive, getExecutionId(), username);
    }

}
