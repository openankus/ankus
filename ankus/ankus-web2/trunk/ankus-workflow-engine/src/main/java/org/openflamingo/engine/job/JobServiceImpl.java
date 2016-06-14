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

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.xml.bind.JAXBException;

import org.codehaus.jackson.map.ObjectMapper;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.engine.configuration.LocaleSupport;
import org.openflamingo.engine.scheduler.JobScheduler;
import org.openflamingo.engine.scheduler.JobVariableWorkFlow;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.Pig;
import org.openflamingo.model.rest.Visualization;
import org.openflamingo.model.rest.Workflow;
import org.openflamingo.model.workflow.ActionType;
import org.openflamingo.model.workflow.BaseType;
import org.openflamingo.model.workflow.ClassName;
import org.openflamingo.model.workflow.Command;
import org.openflamingo.model.workflow.Configuration;
import org.openflamingo.model.workflow.Jar;
import org.openflamingo.model.workflow.NodeType;
import org.openflamingo.model.workflow.Variable;
import org.openflamingo.model.workflow.Variables;
import org.openflamingo.provider.engine.JobService;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.JVMIDUtils;
import org.openflamingo.util.JaxbUtils;
import org.openflamingo.util.StringUtils;
import org.quartz.JobKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
            variables.put(JobVariableWorkFlow.WORKFLOW, workflow);
            variables.put(JobVariableWorkFlow.JOB_ID, jobId);
            variables.put(JobVariableWorkFlow.CURRENT, new Date());
            variables.put(JobVariableWorkFlow.HADOOP_CLUSTER, hadoopCluster);
            variables.put(JobVariableWorkFlow.JOB_TYPE, "PIG");

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
    @SuppressWarnings({ "unchecked", "unused" })
	@Override
    public String run(Workflow workflow, HadoopCluster hadoopCluster) {
        String jobGroupName = workflow.getWorkflowId();
        String jobId = JobIdGenerator.generate(workflow);

        @SuppressWarnings("rawtypes")
		HashMap variables = new HashMap();
        variables.put(JobVariableWorkFlow.WORKFLOW, workflow);
        variables.put(JobVariableWorkFlow.JOB_ID, jobId);
        variables.put(JobVariableWorkFlow.CURRENT, new Date());
        variables.put(JobVariableWorkFlow.HADOOP_CLUSTER, hadoopCluster);
        variables.put(JobVariableWorkFlow.JOB_TYPE, "WORKFLOW");

        logger.info("--------------------------");
        logger.info("Scheduler", jobScheduler);
        logger.info("JOB ID", jobId);
        logger.info("Job Gropu", jobGroupName);
        JobKey jobKey = jobScheduler.startJobImmediatly(jobId, jobGroupName, variables);
        logger.info("--------------------------");
        
        return jobId;
    }

    
    @SuppressWarnings({ "unchecked", "unused" })
	@Override
    public String run(Visualization visualization, HadoopCluster hadoopCluster, String username) {
    	try {
            Workflow workflow = new Workflow();
            workflow.setWorkflowName(visualization.getTitle() != null && !"".equals(visualization.getTitle()) ? visualization.getTitle() : "Visualization Job");
            workflow.setCreate(new Timestamp(System.currentTimeMillis()));
            workflow.setId(Long.parseLong(JVMIDUtils.generateUUID()));
            workflow.setWorkflowId("V_" + DateUtils.parseDate(new Date(), "yyyyMMddHHmm") + "_" + workflow.getId());
            workflow.setUsername(username);
            String workflowXml = getWorkflowXml(visualization);
            workflow.setWorkflowXml(workflowXml);

            String jobGroupName = workflow.getWorkflowId();
            String jobId = JobIdGenerator.generate(workflow);
            
            @SuppressWarnings("rawtypes")
            Map<String, Object> variables = new HashMap();
            variables.put(JobVariableWorkFlow.WORKFLOW, workflow);
            variables.put(JobVariableWorkFlow.JOB_ID, jobId);
            variables.put(JobVariableWorkFlow.CURRENT, new Date());
            variables.put(JobVariableWorkFlow.HADOOP_CLUSTER, hadoopCluster);
            variables.put(JobVariableWorkFlow.JOB_TYPE, "VISUALIZATION");
            JobKey jobKey = jobScheduler.startJobImmediatly(jobId, jobGroupName, variables);
            return jobId;
    	} catch (Exception ex) {
            throw new WorkflowException(ex);
    	}
    }
    
    /**
     * Visualization Job의 워크플로우를 구성한다.
     *
     * @param visualization Visualization
     * @return Workflow XML
     * @throws JAXBException XML을 생성할 수 없는 경우
     * @throws IOException   XML을 생성할 수 없는 경우
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
	private String getWorkflowXml(Visualization visualization) throws JAXBException, IOException {
        org.openflamingo.model.workflow.Workflow workflow = new org.openflamingo.model.workflow.Workflow();

        // Set Workflow Name 
        workflow.setWorkflowName(visualization.getTitle() != null && !"".equals(visualization.getTitle()) ? visualization.getTitle() : "Visualization Job");

        // Set Start
        NodeType startAction = new NodeType();
        startAction.setName("Start");
        startAction.setDescription("Start");
        startAction.setTo(visualization.getChartType());
        workflow.setStart(startAction);

        // Set Visualization
        ActionType action = new ActionType();
        action.setName(visualization.getChartType());
        action.setDescription(visualization.getChartType());
        action.setTo("End");

        // Set Visualization Action
        org.openflamingo.model.workflow.Mapreduce visualizationAction = new org.openflamingo.model.workflow.Mapreduce();
        action.getMapreduce().add(visualizationAction);

        Jar jar = new Jar();
        jar.setValue(visualization.getJar());
        visualizationAction.setJar(jar);
        
        ClassName className = new ClassName();
        className.setValue(visualization.getChartType());
        visualizationAction.setClassName(className);
        
        Command command = new Command();
        List<Variable> variables = command.getVariable();

        Variable variable = new Variable();
        variable.setValue("-input");
        variables.add(variable);
        variable = new Variable();
        variable.setValue(visualization.getInput());
        variables.add(variable);

        variable = new Variable();
        variable.setValue("-output");
        variables.add(variable);
        variable = new Variable();
        String input = visualization.getInput();
        String [] inputs = input.split("/");
        input = "";
        for (int i=0; i<inputs.length-1; i++) {
        	input += inputs[i] + "/";
        }
        variable.setValue(input+ "visualization_" + JVMIDUtils.generateUUID());//경로 이상으로 수정 whitepoo@onycom.com
        variables.add(variable);
        
        if (visualization.getUseFirstRecord() != null) {
        	variable = new Variable();
        	variable.setValue("-useFirstRecord");
        	variables.add(variable);
        	variable = new Variable();
        	variable.setValue(visualization.getUseFirstRecord());
        	variables.add(variable);
        }
        
        if (visualization.getDelimiter() != null && !"".equals(visualization.getDelimiter())) {
        	variable = new Variable();
        	variable.setValue("-delimiter");
        	variables.add(variable);
        	variable = new Variable();
        	variable.setValue(visualization.getDelimiter());
        	variables.add(variable);
        }

        if (visualization.getTitle() != null && !"".equals(visualization.getTitle())) {
        	variable = new Variable();
        	variable.setValue("-title");
        	variables.add(variable);
        	variable = new Variable();
        	variable.setValue(visualization.getTitle());
        	variables.add(variable);
        }
        
        if (visualization.getChartParam().size() > 0) {
        	Map map = visualization.getChartParam();
        	Set<String> keySet = map.keySet();
        	for (String key : keySet) {
        		String value = String.valueOf(map.get(key));
        		variable = new Variable();
        		variable.setValue("-" + key);
        		variables.add(variable);
        		variable = new Variable();
        		variable.setValue(value);
        		variables.add(variable);
        	}
        }
        visualizationAction.setCommand(command);
        
        
        // Set End
        BaseType endAction = new BaseType();
        endAction.setName("End");
        endAction.setDescription("End");
        workflow.setEnd(endAction);

        workflow.getAction().add(action);
        return JaxbUtils.marshal(WORKFLOW_JAXB_PACKAGE_NAME, workflow);
    }
    @Override
    public void kill(long jobId) {
    }

    @Override
    public String regist(long jobId, String jobName, Workflow workflow, String cronExpression, HashMap vars, HadoopCluster hadoopCluster) {
        String key = JobIdGenerator.generateKey(workflow);

        vars.put("jobDomainId", jobId);
        vars.put("cron", cronExpression);
        vars.put(JobVariableWorkFlow.WORKFLOW, workflow);
        vars.put(JobVariableWorkFlow.JOB_TYPE, "WORKFLOW");
        vars.put(JobVariableWorkFlow.HADOOP_CLUSTER, hadoopCluster);
        vars.put(JobVariableWorkFlow.JOB_NAME, jobName);
        vars.put(JobVariableWorkFlow.JOB_KEY, key);

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

    @Override
    public String cacheClear(long engineId) {

        String cachePath = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("artifact.cache.path");
        File dir = new File(cachePath);
    	String[] children = dir.list();
    	if (children != null) {
	    	for (int i=0; i<children.length; i++) {
		    	String org_filename = children[i];		    	
		    	String filename = org_filename.substring(0, 10);
		    	
		    	if("ankus-core".equals(filename)){
		    		File f = new File(cachePath + "/" + org_filename);
		    		if (f.exists()) {
			    		f.delete();
			    	}
		    	}		    	
	    	}	
    	}
    	
    	System.out.println("jar_count : " + children.length);
    	String myIp="";
    	
    	try {
			myIp = InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {		
			e.printStackTrace();
		}    	
    
		return myIp;
    }

   @Override
    public String getModuleInfos(String path) {
    	
    	String ModuleInfo="";
    	System.out.println("======> 6 :");
    	try {
    		
    		ArrayList<HashMap<String, Object>> metainfos = readmetainfos(path);
			
	        ObjectMapper mapper = new ObjectMapper();
	        
	        ModuleInfo = mapper.writeValueAsString(metainfos);
	        
		} catch (Exception e) {		
			e.printStackTrace();
		}    	
    
		return ModuleInfo;
    }
 
    private ArrayList<HashMap<String, Object>> readmetainfos(String folder)
    {
    
		File path  = new File(folder);
        ObjectMapper mapper = new ObjectMapper();
		ArrayList<HashMap<String, Object>> algorithms = new ArrayList<HashMap<String, Object>>(); 
		
		File[] files = path.isDirectory() ? path.listFiles(): new File[]{path};
		for(File f:files)
		{
			if(f.isFile())
			{
				String fname = f.getAbsolutePath();
				String ext = "";
				int p = fname.lastIndexOf(".");
				if(p>=0) ext = fname.substring(p+1);

				if(ext.equalsIgnoreCase("jar"))
				{
					try {
						byte[] meta = readfile(fname, "res/appinfo.json");
						
						if(meta != null){
							
							HashMap<String, Object> metainfo = mapper.readValue(new String(meta), new HashMap<String, Object>().getClass());
		                    
		                    for(HashMap<String, Object> ainfo:(ArrayList<HashMap<String, Object>>)metainfo.get("applist"))
		                    {
		                    	ainfo.put("path", fname);
		                    	ainfo.put("author", metainfo.get("author"));
		                    	ainfo.put("create", metainfo.get("create"));
		                    	ainfo.put("packagename", metainfo.get("packagename"));
		                    	algorithms.add(ainfo);
		                    }
						}	                    

					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}				
			}
		}

		return algorithms;
    }   
  
    public byte[] readfile (String zipFilePath, String fname) throws IOException {
        ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));
        ZipEntry entry = zipIn.getNextEntry();
        // iterates over entries in the zip file
       
        byte[] read = null;
        
        if(fname.startsWith("/")) fname = fname.substring(1);
        
        while (entry != null) {
            if (!entry.isDirectory()) {
                // if the entry is a file, extracts it
            	if(entry.getName().equals(fname))
            	{
            		read = extractFileRead(zipIn);
            		break;
            	}
            }
            zipIn.closeEntry();
            entry = zipIn.getNextEntry();
        }
        zipIn.close();
        return read;
    	
    }

    private byte[] extractFileRead(ZipInputStream zipIn) throws IOException {
    	ByteArrayOutputStream bs = new ByteArrayOutputStream();
        
        byte[] bytesIn = new byte[8192];
        int read = 0;
        while ((read = zipIn.read(bytesIn)) != -1) {
        	bs.write(bytesIn, 0, read);
        }
        return bs.toByteArray();
    }
  
}