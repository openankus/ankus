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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.PathFilter;
import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.configuration.ConfigurationUtils;
import org.openflamingo.engine.history.ActionHistoryService;
import org.openflamingo.engine.history.VisualizationHistoryRepository;
import org.openflamingo.engine.scheduler.JobVariableWorkFlow;
import org.openflamingo.engine.util.HdfsUtils;
import org.openflamingo.engine.util.ManagedProcess;
import org.openflamingo.engine.util.WorkflowUtils;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.VisualizationHistory;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.model.workflow.Classpath;
import org.openflamingo.model.workflow.Mapreduce;
import org.openflamingo.model.workflow.Variable;
import org.openflamingo.model.workflow.Variables;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.StringUtils;

import com.google.common.base.Joiner;
/**
 * MapReduce 모듈을 실행하는 Handler.
 *
 * @author Byoung Gon, Kim
 * @since 0.4
 */
public class MapReduceHandler extends ELSupportHandler<Mapreduce> {

    /**
     * MapReduce Workflow Action Model
     */
    private Mapreduce mapreduce;

    /**
     * Hadoop Configuration
     */
    private Map<String, String> hadoopConf;

    public static final int STRING_BUFFER_SIZE = 100;

    private static final String JOB_ID_LOG_PREFIX = "Running job: ";

    /**
     * Apache Hadoop Cluster
     */
    private HadoopCluster hadoopCluster;

    /**
     * 기본 생성자.
     *
     * @param mapreduce Workflow의 MapReduce
     */
    public MapReduceHandler(Object mapreduce) {
        this.mapreduce = (Mapreduce) mapreduce;
        this.hadoopConf = new HashMap();
    }

    @Override
    void before() {
        this.hadoopCluster = (HadoopCluster) this.getJobDataMap().get(JobVariableWorkFlow.HADOOP_CLUSTER);

        if (mapreduce.getConfiguration() != null && mapreduce.getConfiguration().getVariable().size() > 0) {
            Map<String, String> confs = WorkflowUtils.variablesToMap(mapreduce.getConfiguration().getVariable());
            if (mapreduce.getVariables() != null && mapreduce.getVariables().getVariable().size() > 0) {
                Map<String, String> vars = WorkflowUtils.variablesToMap(mapreduce.getVariables());
                if ("on".equals(vars.get("deleteIfExistOutput"))) {
                    FileSystem fs = HdfsUtils.getFileSystem(hadoopCluster.getHdfsUrl());
                    String outputPath = get(confs.get("mapred.output.dir"));
                    try {
                        if (HdfsUtils.isExist(fs, outputPath)) {
                            HdfsUtils.delete(fs, outputPath);
                            logger.info("MapReduce의 출력 경로 '{}'이 존재하므로 삭제하였습니다.", outputPath);
                        }
                    } catch (Exception ex) {
                    }
                }
            }
        }
    }

    @Override
    void after() {
    	String workflowId = this.actionContext.getWorkflowContext().getWorkflowId();
    	String jobType = this.actionContext.getWorkflowContext().getGlobalVariables().getProperty("JOB_TYPE");
    	String jobId = this.actionContext.getWorkflowContext().getGlobalVariables().getProperty("JOB_ID");
    	String jobStringId = this.actionContext.getWorkflowContext().getGlobalVariables().getProperty("JOB_STRING_ID");
    	String html = "";
    	String output = "";
    	String filePath = "";
    	if ("VISUALIZATION".equals(jobType)) {
    		
    		List<Variable> cmds = mapreduce.getCommand().getVariable();
    		boolean flag = false;
    		for (Variable cmd : cmds) {
    			String arg = get(cmd.getValue());
    			if (flag) {
    				output = arg;
    				break;
    			}
    			if (arg.indexOf("-output") >= 0) {
    				flag = true;
    			}
    		}
    		final FileSystem fs = HdfsUtils.getFileSystem(hadoopCluster.getHdfsUrl());
    		try {
    			if (HdfsUtils.isExist(fs, output)) {

    					FileStatus[] files = fs.listStatus(new Path(output), new PathFilter() {
    						@Override
    						public boolean accept(Path path) {
    							try {
    								return fs.isFile(path);
    							} catch (IOException e) {
    								// Hadoop FileSystem Access Error
    							}
    							return false;
    						}
    					});
    					if (files.length > 0) {
    						filePath = files[0].getPath().toString();
    						BufferedReader br = new BufferedReader(new InputStreamReader(HdfsUtils.getInputStream(fs, filePath)));
    						String line;
    						while ((line = br.readLine()) != null) {
    							html += line + "\n";
    						}
    						VisualizationHistory visualizationHistory = new VisualizationHistory();
    						visualizationHistory.setWorkflowId(workflowId);
    						visualizationHistory.setJobId(Long.parseLong(jobId));
    						visualizationHistory.setJobStringId(jobStringId);
    						visualizationHistory.setVisualizationHtml(html);
    						visualizationHistory.setCreate(new Timestamp(System.currentTimeMillis()));
    						VisualizationHistoryRepository visualizationHistoryRepository = this.actionContext.getWorkflowContext().getBean(VisualizationHistoryRepository.class);
    						visualizationHistoryRepository.insert(visualizationHistory);
    						
    					}
    				HdfsUtils.delete(fs, output);
    			}
    		} catch (Exception ex) {
    			logger.info(ex.toString());
    			//HdfsUtils.delete(fs, output);
    		}
    	}
    }

    @Override
    public void executeInternal() {
        log(true, "-------------------------------------------");
        log(true, "Apache Hadoop MapReduce Job");
        log(true, "-------------------------------------------");

        downloadDependencies();

        log(true, "Workflow ID   : {}", this.actionContext.getWorkflowContext().getWorkflowId());
        log(true, "Workflow Name : {}", this.actionContext.getWorkflowContext().getWorkflowDomain().getWorkflowName());
        log(true, "Action ID     : {}", this.actionContext.getActionId());
        log(true, "Action Name   : {}", this.actionContext.getActionDescription());
        log(true, "Base Path     : {}", actionBasePath);

        log(true, "Driver        : {}", get(mapreduce.getClassName().getValue()));
        log(true, "JAR Path      : {}", get(actionContext.getValue(JobVariableWorkFlow.MAPREDUCE_JAR)));
        log(true, "Classpath     : {}", getClasspaths());

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

        buildMasterConf();
        buildMapReduceConf();
        setupConfigXml();

        List<String> command = buildCommand();

        log(true, "-------------------------------------------");
        log(true, "Hadoop Cluster  :");
        log(true, "\tfs.default.name = {}", hadoopCluster.getHdfsUrl());
        log(true, "\tmapred.job.tracker = {}", hadoopCluster.getJobTrackerIP() + ":" + hadoopCluster.getJobTrackerPort());

        log(true, "-------------------------------------------");
        log(true, "Hadoop Configuration  :");
        if (mapreduce.getConfiguration() != null && mapreduce.getConfiguration().getVariable().size() > 0) {
            List<Variable> configurations = mapreduce.getConfiguration().getVariable();
            for (Variable var : configurations) {
                log(true, "\t{} = {}", var.getName(), get(var.getValue()));
            }
        }

        log(true, "-------------------------------------------");
        log(true, "Environments  :");
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
            if (key != null) log(true, "\t{} = {}", key, properties.get(key));
        }

        log(true, "-------------------------------------------");
        log(true, "Command Line Parameters :");
        List<Variable> cmds = mapreduce.getCommand().getVariable();
        for (Variable cmd : cmds) {
            String arg = get(cmd.getValue());
            logger.info("args: " + arg);
            if(arg.indexOf("&lt;") >= 0)
            {
            	arg = arg.replaceAll("&lt;", "<");
            }
            
            if(arg.indexOf("&gt;") >= 0)
            {
            	arg = arg.replaceAll("&gt;", ">");
            }
            if(arg.indexOf("&amp;") >= 0)
            {
            	arg = arg.replaceAll("&amp;", "&");
            }
            log(true, "\t{}", arg);
            logger.info("args: " + arg);
            command.add(arg);
        }

        log(true, "-------------------------------------------");
        String commandline = StringUtils.collectionToDelimitedString(command, " ");
        FileSystemUtils.saveToFile(commandline.getBytes(), actionBasePath + "/script.sh");
        log(true, "Command : {}", commandline);
        log(true, "-------------------------------------------\n");

        // 액션 이력을 업데이트 한다.
        ActionHistory actionHistory = getActionHistory();
        actionHistory.setLogPath(logPath);
        actionHistory.setCommand(commandline);
        actionContext.getWorkflowContext().getBean(ActionHistoryService.class).update(actionHistory);
        actionContext.setObject(JobVariableWorkFlow.ACTION_HISTORY, actionHistory);

        // 프로세스를 시작한다.
        try {
            ManagedProcess managedProcess = new ManagedProcess(
                    command,
                    getEnv(),
                    actionBasePath,
                    logger,
                    fileWriter
            );
            managedProcess.run();
        } catch (Exception e) {
            String message = ExceptionUtils.getMessage("MapReduce Job '{}' is failed. Cause: {}", this.actionContext.getActionDescription(), e.getMessage());
            try {
				String utf8String = new String(message.getBytes("UTF-8"));
				logger.warn(utf8String, e);
	            throw new WorkflowException(utf8String, e);
			} catch (UnsupportedEncodingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}   
            
        }
    }

    /**
     * Dependency를 다운로드한다.
     */
    private void downloadDependencies() {
        // MapReduce JAR 파일을 다운로드한다.
    	String jar_name = mapreduce.getJar().getValue();
    		 if (mapreduce.getJar() != null && !StringUtils.isEmpty(mapreduce.getJar().getValue())) 
 	        {
 	        	
 	            ArtifactLoader artifactLoader = ArtifactLoaderFactory.getArtifactLoader(actionContext.getWorkflowContext());
 	            String jarPath = artifactLoader.load(mapreduce.getJar().getValue().trim());
 	            actionContext.setValue(JobVariableWorkFlow.MAPREDUCE_JAR, jarPath);
 	        }
 	        else 
 	        {
 	            throw new IllegalArgumentException("You must specify MapReduce JAR File");
 	        }
    }

    @Override
    public Mapreduce getModel() {
        return mapreduce;
    }

    /**
     * Hadoop MapReduce Job을 실행시키기 위한 커맨드 라인을 구성한다.
     *
     * @return Hadoop MapReduce Job을 실행시키기 위한 커맨드 라인
     */
    private List<String> buildCommand() {
        List<String> command = new LinkedList<String>();
        command.add("/bin/bash");
        command.add(getFlamingoConf("hadoop.home") + "/bin/hadoop");
        command.add("jar");
        command.add(actionContext.getValue(JobVariableWorkFlow.MAPREDUCE_JAR));
        command.add(get(mapreduce.getClassName().getValue()).trim());

        // -D파라미터를 처리한다.
        Set<String> keys = hadoopConf.keySet();
        for (String key : keys) {
            command.add("-D" + key + "=" + get(hadoopConf.get(key)));
        }

        // Library를 처리한다.
        buildLibJars(command);

        // 커맨드 라인 변수를 처리한다.
        Variables variables = mapreduce.getVariables();
        if (variables != null && variables.getVariable().size() > 0) {
            List<Variable> vars = variables.getVariable();
            for (Variable var : vars) {
                command.add(get(var.getValue()).trim());
            }
        }

        return command;
    }

    private String setupConfigXml() {
        try {
            String temporaryPath = actionBasePath + "/core-site.xml";
            actionContext.setValue("basePath", actionBasePath);
            String confXml = ConfigurationUtils.mapToXML(this.hadoopConf);
            FileSystemUtils.saveToFile(confXml.getBytes(), temporaryPath);
            getActionHistory().setScript(confXml);
            return temporaryPath;
        } catch (Exception ex) {
            throw new FileSystemException("Cannot save a Hadoop Config Xml.", ex);
        }
    }

    /**
     * Hadoop 커맨드 라인의 <tt>-libjars</tt> 옵션을 구성한다.
     */
    private void buildLibJars(List<String> command) {
        if (mapreduce.getClasspaths() != null && mapreduce.getClasspaths().getClasspath().size() > 0) {
            command.add("-libjars");

            List<String> dependencies = new ArrayList();
            List<Classpath> classpaths = mapreduce.getClasspaths().getClasspath();
            for (Classpath classpath : classpaths) {
                ArtifactLoader artifactLoader = ArtifactLoaderFactory.getArtifactLoader(actionContext.getWorkflowContext());
                String jarPath = artifactLoader.load(classpath.getValue().trim());
                dependencies.add(jarPath);
            }
            command.add(Joiner.on(",").join(dependencies));
        }
    }

    private String getClasspaths() {
        List<String> dependencies = new ArrayList();
        if (mapreduce.getClasspaths() != null && mapreduce.getClasspaths().getClasspath().size() > 0) {
            List<Classpath> classpaths = mapreduce.getClasspaths().getClasspath();
            for (Classpath classpath : classpaths) {
                dependencies.add(classpath.getValue().trim());
            }
        }
        return Joiner.on(",").join(dependencies);
    }

    /**
     * Hadoop MapReduce Job 동작에 필요한 Hadoop Configuration의 Key Value 옵션을 구성한다.
     * 기본적으로 옵션은 <tt>-DKEY=VALUE</tt> 형식이다.
     */
    private void buildMapReduceConf() {
        if (mapreduce.getConfiguration() != null && mapreduce.getConfiguration().getVariable().size() > 0) {
            List<Variable> configurations = mapreduce.getConfiguration().getVariable();
            for (Variable var : configurations) {
                hadoopConf.put(var.getName(), get(var.getValue()));
            }
        }
    }

    /**
     * Hadoop MapReduce Job 동작에 필요한 Key Value 형식의 파라미터를 구성한다.
     * Key와 Value를 모두 지정하는 경우 기본 형식은 <tt>--KEY VALUE</tt> 이며
     * Key를 생략하는 경우 <tt>VALUE1 VALUE2 ...</tt> 형식으로 구성한다.
     */
    private void buildMasterConf() {
        hadoopConf.put("fs.default.name", hadoopCluster.getHdfsUrl());
        hadoopConf.put("mapred.job.tracker", hadoopCluster.getJobTrackerIP() + ":" + hadoopCluster.getJobTrackerPort());
    }

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
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot load a log file of MapReduce '{}'", logFile), ex);
        }
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
