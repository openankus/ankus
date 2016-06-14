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

import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.history.ActionHistoryService;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.engine.util.ManagedProcess;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.workflow.Pig;
import org.openflamingo.model.workflow.Variable;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;

import java.io.*;
import java.util.*;

/**
 * Apache Pig를 실행하는 Handler.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class PigHandler extends ELSupportHandler<Pig> {

    private Logger logger = LoggerFactory.getLogger(PigHandler.class);

    private Pig pig;

    public static final int STRING_BUFFER_SIZE = 100;

    private static final String JOB_ID_LOG_PREFIX = "HadoopJobId: ";

    /**
     * Apache Hadoop Cluster
     */
    private HadoopCluster hadoopCluster;

    public PigHandler(Object pig) {
        this.pig = (Pig) pig;
    }

    @Override
    void before() {
        this.hadoopCluster = (HadoopCluster) this.getJobDataMap().get(JobVariable.HADOOP_CLUSTER);
    }

    @Override
    void after() {
    }

    @Override
    void executeInternal() {
        log(true, "-------------------------------------------");
        log(true, "Apache Pig Job");
        log(true, "-------------------------------------------");

        log(true, "Workflow ID   : {}", this.actionContext.getWorkflowContext().getWorkflowId());
        log(true, "Workflow Name : {}", this.actionContext.getWorkflowContext().getWorkflowDomain().getWorkflowName());
        log(true, "Action ID     : {}", this.actionContext.getActionId());
        log(true, "Action Name   : {}", this.actionContext.getActionDescription());
        log(true, "Base Path     : {}", actionBasePath);

        log(true, "-------------------------------------------");
        if (globalVariables != null) {
            if (globalVariables.size() > 0) {
                log(true, "Global Variables     :");
                Set<Object> keys = globalVariables.keySet();
                for (Iterator<Object> iterator = keys.iterator(); iterator.hasNext(); ) {
                    String key = (String) iterator.next();
                    log(true, "\t{} = {}", key, globalVariables.getProperty(key));
                }
            }
        }
        // Pig Runner의 파라미터
        List<String> params = new ArrayList<String>();

        StringBuilder udfBuilder = new StringBuilder();
        if (pig.getUdfJar() != null) {
            List<String> udfJars = pig.getUdfJar();
            for (String udfJar : udfJars) {
                ArtifactLoader artifactLoader = ArtifactLoaderFactory.getArtifactLoader(actionContext.getWorkflowContext());
                String jarPath = artifactLoader.load(udfJar.trim());
                udfBuilder.append("REGISTER ").append(jarPath).append(";").append("\n");
            }
        }

        Properties varProps = new Properties();
        if (pig.getVariables() != null && pig.getVariables().getVariable().size() > 0) {
            List<Variable> vars = pig.getVariables().getVariable();
            for (Variable var : vars) {
                varProps.put(var.getName(), get(var.getValue()));
            }
        }

        // Pig Script를 evaluation한다.
        String pigScript = pig.getScript();
        String evaluatedScript = udfBuilder.toString() + get(pigScript, varProps);

        log(true, "Pig Script : \n{}", evaluatedScript);

        // Pig Script를 저장하고 커맨드 라인을 구성한다.
        String pigScriptPath = actionBasePath + "/script.pig";
        FileSystemUtils.saveToFile(evaluatedScript.getBytes(), pigScriptPath);
        FileSystemUtils.saveToFile(getHadoopSiteXml().getBytes(), actionBasePath + "/core-site.xml");

        params.add("-file");
        params.add(pigScriptPath);
        logger.debug("Pig Script를 '{}'에 저장했습니다.", pigScriptPath);

        String propertiesPath = actionBasePath + "/pig.properties";
        String props = getPropertyFile(pig);
        FileSystemUtils.saveToFile(props.getBytes(), propertiesPath);
        params.add("-propertyFile");
        params.add(propertiesPath);
        logger.debug("Properties 파일을 '{}'에 저장했습니다.", propertiesPath);

        // Pig의 Log4J Properties 파일을 저장하고 커맨드 라인을 구성한다.
        String log4jPath = getLog4JPropertiesPath(actionBasePath, logPath);

        actionContext.setValue("basePath", actionBasePath);
        actionContext.setValue("logPath", logPath);
        actionContext.setValue("scriptPath", pigScriptPath);
        actionContext.setValue("propertyPath", propertiesPath);
        actionContext.setValue("script", pigScriptPath);

/*
        params.add("-log4jconf");
        params.add(log4jPath);
        params.add("-logfile");
        params.add(logPath);
*/

        logger.debug("Pig 실행 로그를 남기기 위한 Log4J 설정 파일({})을 기록하였습니다.", log4jPath);

        if (pig.getVariables() != null && pig.getVariables().getVariable().size() > 0) {
            List<Variable> variables = pig.getVariables().getVariable();
            log(true, "Variables :");
            for (Variable var : variables) {
                log(true, "\t{} = {}", var.getName(), get(var.getValue()));
            }
        }

        log(true, "-------------------------------------------");
        log(true, "Hadoop Cluster  :");
        log(true, "\tfs.default.name = {}", hadoopCluster.getHdfsUrl());
        log(true, "\tmapred.job.tracker = {}", hadoopCluster.getJobTrackerIP() + ":" + hadoopCluster.getJobTrackerPort());

        log(true, "-------------------------------------------");
        log(true, "Environments :");
        Map<String, String> environment = getEnv();
        Set<String> envsKeySet = environment.keySet();
        for (String key : envsKeySet) {
            log(true, "\t{} = {}", key, environment.get(key));
        }

        log(true, "-------------------------------------------");
        log(true, "Java System Properties : ");
        Properties properties = System.getProperties();
        Set<Object> keys = properties.keySet();
        for (Object key : keys) {
            log(true, "\t{} = {}", key, get((String) properties.get(key)));
        }

        String[] args = params.toArray(new String[params.size()]);
        List<String> command = buildCommand();
        for (String arg : args) {
            command.add(arg);
        }

        log(true, "-------------------------------------------");
        String commandline = StringUtils.collectionToDelimitedString(command, " ");
        FileSystemUtils.saveToFile(commandline.getBytes(), actionBasePath + "/command.sh");
        log(true, "Command : {}", commandline);
        log(true, "-------------------------------------------");

        // Update Action History
        ActionHistory actionHistory = getActionHistory();
        actionHistory.setLogPath(logPath);
        actionHistory.setCommand(commandline);
        actionHistory.setScript(evaluatedScript);
        actionContext.getWorkflowContext().getBean(ActionHistoryService.class).update(actionHistory);
        actionContext.setObject(JobVariable.ACTION_HISTORY, actionHistory);

        try {
            ManagedProcess managedProcess = new ManagedProcess(
                    command,
                    getEnv(),
                    actionBasePath,
                    logger,
                    fileWriter
            );
            managedProcess.run();

            if (new File(logPath).exists()) {
                handleError(logPath);
                String jobIds = getHadoopJobIds(logPath);
                if (!StringUtils.isEmpty(jobIds)) {
                    actionContext.setValue("hadoopJobIds", jobIds);
                    log(true, " Pig가 실행한 Hadoop Job ID는 {} 입니다.", jobIds);
                }
            }
        } catch (Exception e) {
            if (new File(logPath).exists()) {
                handleError(logPath);
                String jobIds = getHadoopJobIds(logPath);
                if (!StringUtils.isEmpty(jobIds)) {
                    actionContext.setValue("hadoopJobIds", jobIds);
                    log(true, " Pig가 실행한 Hadoop Job ID는 {} 입니다.", jobIds);
                }
            }
            String cause = getFailedCause(logPath);
            throw new WorkflowException(ExceptionUtils.getMessage("{}", cause), e);
        }
    }

    private String getFailedCause(String logFile) {
        try {
            StringBuilder builder = new StringBuilder(STRING_BUFFER_SIZE);
            if (!new File(logFile).exists()) {
                logger.warn("Pig 로그 파일({})이 존재하지 않으므로 에러의 원인을 찾을 수 없습니다.", logFile);
                return builder.toString();
            }
            BufferedReader br = new BufferedReader(new FileReader(logFile));
            String line = br.readLine();
            String separator = "";
            while (line != null) {
                String prefix = "org.apache.pig.impl.logicalLayer.FrontendException:";
                if (line.contains(prefix)) {
                    int start = line.indexOf(prefix) + prefix.length();
                    String cause = line.substring(start).trim();
                    builder.append(separator).append(cause);
                    break;
                }
                line = br.readLine();
            }
            br.close();
            return builder.toString();
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot load a log file '{}' of Apache Pig.", logFile), ex);
        }
    }

    /**
     * Hadoop MapReduce Job을 실행시키기 위한 커맨드 라인을 구성한다.
     *
     * @return Hadoop MapReduce Job을 실행시키기 위한 커맨드 라인
     */
    private List<String> buildCommand() {
        List<String> command = new LinkedList<String>();
        command.add("/bin/bash");
        command.add(getFlamingoConf("pig.home") + "/bin/pig");
        return command;
    }

    private String getHadoopSiteXml() {
        StringBuilder builder = new StringBuilder();
        builder.append("<configuration>");
        builder.append(MessageFormatter.format("<property><name>fs.default.name</name><value>{}</value></property>", hadoopCluster.getHdfsUrl()).getMessage());
        builder.append(MessageFormatter.format("<property><name>mapred.job.tracker</name><value>{}</value></property>", hadoopCluster.getJobTrackerIP() + ":" + hadoopCluster.getJobTrackerPort()).getMessage());

        if (pig.getConfiguration() != null && pig.getConfiguration().getVariable() != null) {
            List<Variable> vars = pig.getConfiguration().getVariable();
            for (Variable var : vars) {
                builder.append(MessageFormatter.format("<property><name>{}</name><value>{}</value></property>", var.getName(), get(var.getValue())).getMessage());
            }
        }

        builder.append("</configuration>");
        return builder.toString();
    }

    private String getPropertyFile(Pig pig) {
        Properties props = new Properties();

        props.put("fs.default.name", hadoopCluster.getHdfsUrl());
        props.put("mapred.job.tracker", hadoopCluster.getJobTrackerIP() + ":" + hadoopCluster.getJobTrackerPort());

        if (pig.getVariables() != null && pig.getVariables().getVariable().size() > 0) {
            List<Variable> vars = pig.getVariables().getVariable();
            for (Variable variable : vars) {
                props.put(variable.getName(), get(variable.getValue()));
            }
        }

        if (pig.getConfiguration() != null && pig.getConfiguration().getVariable() != null) {
            List<Variable> vars = pig.getConfiguration().getVariable();
            for (Variable var : vars) {
                props.put(var.getName(), get(var.getValue()));
            }
        }

        StringWriter writer = new StringWriter();
        props.list(new PrintWriter(writer));
        String properties = writer.getBuffer().toString();
        logger.debug("Properties 파일의 내용은 다음과 같습니다.\n{}", properties);
        return properties;
    }

    /**
     * Action의 기준 경로에 Pig 실행을 위한 Log4J Properties 파일을 저장한다.
     *
     * @param actionBasePath 액션의 기준 경로
     * @param logPath        로그파일의 경로
     * @return 저장한 Log4J Properties 파일의 경로
     */
    private String getLog4JPropertiesPath(String actionBasePath, String logPath) {
        String propertiesPath = actionBasePath + "/log4j.properties";
        try {
            Properties props = new Properties();
            props.setProperty("log4j.logger.org.apache.pig", "INFO, B, stdout");
            props.setProperty("log4j.logger.org.apache.hadoop", "INFO, B, stdout");
            props.setProperty("log4j.logger.org.apache.commons", "INFO, B, stdout");
            props.setProperty("log4j.appender.B", "org.apache.log4j.FileAppender");
            props.setProperty("log4j.appender.B.file", logPath);
            props.setProperty("log4j.appender.B.layout", "org.apache.log4j.PatternLayout");
            props.setProperty("log4j.appender.B.layout.ConversionPattern", "%d %-5p [%c] %m%n");
            props.setProperty("log4j.appender.stdout", "org.apache.log4j.ConsoleAppender");
            props.setProperty("log4j.appender.stdout.layout", "org.apache.log4j.PatternLayout");
            props.setProperty("log4j.appender.stdout.layout.ConversionPattern", "%d %-5p [%c] %m%n");

            OutputStream os = new FileOutputStream(propertiesPath);
            props.store(os, "");
            os.close();
            return propertiesPath;
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Action의 Log4J 설정 파일 '{}'을 저장할 수 없습니다.", actionBasePath), ex);
        }
    }

    /**
     * Pig가 정상적으로 동작하지 않은 경우 로그 파일을 로그에 남긴다.
     *
     * @param pigLogPath Pig Log 파일의 위치
     */
    private void handleError(String pigLogPath) {
        try {
            String log = FileSystemUtils.loadFromFile(pigLogPath);
            logger.warn("Pig 로그파일의 내용은 다음과 같습니다.\n{}", log);
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Pig 로그파일 '{}'을 로딩할 수 없습니다.", pigLogPath), ex);
        }
    }

    /**
     * Pig 로그 파일에서 Hadoop Job ID를 찾아서 반환한다.
     *
     * @param logFile Pig 로그 파일
     * @return comma-separated 문자열
     */
    public static String getHadoopJobIds(String logFile) {
        try {
            StringBuilder builder = new StringBuilder(STRING_BUFFER_SIZE);
            if (!new File(logFile).exists()) {
                return builder.toString();
            }
            BufferedReader br = new BufferedReader(new FileReader(logFile));
            String line = br.readLine();
            String separator = ",";
            while (line != null) {
                if (line.contains(JOB_ID_LOG_PREFIX)) {
                    int jobIdStarts = line.indexOf(JOB_ID_LOG_PREFIX) + JOB_ID_LOG_PREFIX.length();
                    String jobId = line.substring(jobIdStarts);
                    int jobIdEnds = jobId.indexOf(" ");
                    if (jobIdEnds > -1) {
                        jobId = jobId.substring(0, jobId.indexOf(" "));
                    }
                    if (builder.length() > 0) {
                        builder.append(separator);
                    }
                    builder.append(jobId);
                }
                line = br.readLine();
            }
            br.close();
            return builder.toString();
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Pig 로그 파일({})을 로딩할 수 없습니다.", logFile), ex);
        }
    }

    @Override
    public Pig getModel() {
        return pig;
    }

    /**
     * Java Virtual Machine을 실행하는 쉘의 환경 변수를 Key Value로 구성한다.
     *
     * @return Key Value로 구성되어 있는 쉘의 환경 변수 목록
     */
    private Map<String, String> getEnv() {
        Map<String, String> envs = new HashMap();
        envs.putAll(System.getenv());
        envs.put("HADOOP_CONF_DIR", actionBasePath);

        if (getFlamingoConf("java.home") != null) envs.put("JAVA_HOME", getFlamingoConf("java.home"));
        if (getFlamingoConf("hadoop.home") != null) envs.put("HADOOP_HOME", getFlamingoConf("hadoop.home"));
        if (getFlamingoConf("pig.home") != null) envs.put("PIG_HOME", getFlamingoConf("pig.home"));
        if (getFlamingoConf("hive.home") != null) envs.put("HIVE_HOME", getFlamingoConf("hive.home"));
        if (getFlamingoConf("hadoop.user.name") != null && !StringUtils.isEmpty(getFlamingoConf("hadoop.user.name"))) {
            envs.put("HADOOP_USER_NAME", getFlamingoConf("hadoop.user.name"));
        }
        return envs;
    }
}
