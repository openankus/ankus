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
package org.openflamingo.engine.monitoring.system;

import org.openflamingo.collector.JobRegister;
import org.openflamingo.model.collector.Collector;
import org.openflamingo.provider.engine.WorkflowEngineService;
import org.openflamingo.util.DateUtils;
import org.openflamingo.util.JaxbUtils;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobKey;
import org.quartz.Trigger;
import org.quartz.impl.matchers.GroupMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.File;
import java.net.InetAddress;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.*;

@Service
public class WorkflowEngineServiceImpl implements WorkflowEngineService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(WorkflowEngineServiceImpl.class);

    private static final DecimalFormat decimalFormat;

    static {
        NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.ENGLISH);
        decimalFormat = (DecimalFormat) numberFormat;
        decimalFormat.applyPattern("#.##");
    }

    /**
     * 배치 작업 스케줄러.
     */
    @Autowired
    private org.quartz.Scheduler scheduler;

    /**
     * 로그 수집 작업을 등록하는 등록기
     */
    @Autowired
    private JobRegister jobRegister;

    /**
     * 시스템의 인스턴스 정보
     */
    @Value("#{config['instance.name']}")
    private String instanceName;

    /**
     * 숨김 파일을 보여줄지 여부
     */
    @Value("#{config['hide.hidden.file']}")
    private boolean isHideHiddenFile;

    @Override
    public Map getStatus() {
        try {
            Map map = new HashMap();
            InetAddress address = InetAddress.getLocalHost();
            map.put("instanceName", instanceName);
            map.put("hostAddress", address.getHostAddress());
            map.put("hostName", address.getHostName());
            map.put("status", "RUNNING");
            map.put("cannonicalHostName", address.getCanonicalHostName());
            map.put("runningJob", scheduler.getCurrentlyExecutingJobs().size());
            map.put("schedulerId", scheduler.getSchedulerInstanceId());
            map.put("schedulerName", scheduler.getSchedulerName());
            return map;
        } catch (Exception ex) {
            throw new RuntimeException("Workflow Engine의 System 값에 접근할 수 없습니다.", ex);
        }
    }

    @Override
    public List<Map> getEnvironments() {
        List<Map> list = new ArrayList();
        try {
            Map<String, String> envs = System.getenv();
            Set<String> keys = envs.keySet();
            for (String key : keys) {
                String value = envs.get(key);
                if (!StringUtils.isEmpty(value)) {
                    Map m = new HashMap();
                    m.put("name", key);
                    m.put("value", value);
                    list.add(m);
                }
            }
            return list;
        } catch (Exception ex) {
            throw new RuntimeException("Workflow Engine의 환경 변수에 접근할 수 없습니다.", ex);
        }
    }

    @Override
    public boolean registCollectionJob(String xml) {
        logger.debug("로그 수집 요청을 처리합니다. 처리할 로그 수집 요청은 다음과 같습니다.\n{}", xml);

        try {
            Collector collector = (Collector) JaxbUtils.unmarshal("org.openflamingo.model.collector", xml);
            jobRegister.regist(collector);
            logger.info("로그 수집 요청을 처리하였습니다.");
            return true;
        } catch (Exception ex) {
            throw new RuntimeException("로그 수집 요청을 스케줄링할 수 없습니다.", ex);
        }
    }

    @Override
    public List<Map> getSystemProperties() {
        List<Map> list = new ArrayList();
        try {
            Properties properties = System.getProperties();
            Set<Object> keys = properties.keySet();
            for (Object key : keys) {
                String value = (String) properties.get(key);
                if (!StringUtils.isEmpty(value)) {
                    Map m = new HashMap();
                    m.put("name", key);
                    m.put("value", value);
                    list.add(m);
                }
            }
            return list;
        } catch (Exception ex) {
            throw new RuntimeException("Workflow Engine의 System Properties에 접근할 수 없습니다.", ex);
        }
    }

    @Override
    public List<Map> getTriggers() {
        List<Map> list = new ArrayList();

        try {
            for (String groupName : scheduler.getJobGroupNames()) {
                for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {
                    String jobName = jobKey.getName();
                    String jobGroup = jobKey.getGroup();

                    List<Trigger> triggers = (List<Trigger>) scheduler.getTriggersOfJob(jobKey);
                    Date nextFireTime = triggers.get(0).getNextFireTime();
                    Date startTime = triggers.get(0).getStartTime();
                    Date endTime = triggers.get(0).getEndTime();
                    Date previousFireTime = triggers.get(0).getPreviousFireTime();
                    Date finalFireTime = triggers.get(0).getFinalFireTime();

                    Map param = new HashMap();
                    param.put("name", jobName);
                    param.put("group", jobGroup);
                    param.put("nextFireTime", nextFireTime != null ? DateUtils.parseDate(nextFireTime, DateUtils.DATE_FORMAT[2]) : "");
                    param.put("startTime", startTime != null ? DateUtils.parseDate(startTime, DateUtils.DATE_FORMAT[2]) : "");
                    param.put("endTime", endTime != null ? DateUtils.parseDate(endTime, DateUtils.DATE_FORMAT[2]) : "");
                    param.put("previousFireTime", previousFireTime != null ? DateUtils.parseDate(previousFireTime, DateUtils.DATE_FORMAT[2]) : "");
                    param.put("finalFireTime", finalFireTime != null ? DateUtils.parseDate(finalFireTime, DateUtils.DATE_FORMAT[2]) : "");
                    list.add(param);
                }
            }
            return list;
        } catch (Exception ex) {
            throw new RuntimeException("Workflow Engine의 스케줄링 정보를 확인할 수 없습니다.", ex);
        }
    }

    @Override
    public List<Map> getJobInfos(String jobName, String jobGroup) {
        List<Map> list = new ArrayList();
        try {
            JobKey jobKey = new JobKey(jobName, jobGroup);
            JobDetail jobDetail = scheduler.getJobDetail(jobKey);

            List<Trigger> triggers = (List<Trigger>) scheduler.getTriggersOfJob(jobKey);
            Date nextFireTime = triggers.get(0).getNextFireTime();
            Date startTime = triggers.get(0).getStartTime();
            Date endTime = triggers.get(0).getEndTime();
            Date previousFireTime = triggers.get(0).getPreviousFireTime();
            Date finalFireTime = triggers.get(0).getFinalFireTime();

            for (Trigger trigger : triggers) {
                Map map = new HashMap();
                map.put("name", jobName);
                map.put("group", jobGroup);
                map.put("startTime", DateUtils.parseDate(trigger.getStartTime(), DateUtils.DATE_FORMAT[2]));
                map.put("nextFireTime", nextFireTime != null ? DateUtils.parseDate(trigger.getNextFireTime(), DateUtils.DATE_FORMAT[2]) : "");
                map.put("endTime", endTime != null ? DateUtils.parseDate(trigger.getEndTime(), DateUtils.DATE_FORMAT[2]) : "");
                map.put("previousFireTime", previousFireTime != null ? DateUtils.parseDate(trigger.getPreviousFireTime(), DateUtils.DATE_FORMAT[2]) : "");
                map.put("finalFireTime", finalFireTime != null ? DateUtils.parseDate(trigger.getFinalFireTime(), DateUtils.DATE_FORMAT[2]) : "");

                Map dataMap = new HashMap(jobDetail.getJobDataMap());
                map.put("dataMap", dataMap);
                list.add(map);
            }

            return list;
        } catch (Exception ex) {
            throw new RuntimeException("Workflow Engine의 스케줄 작업 정보를 확인할 수 없습니다.", ex);
        }
    }

    @Override
    public List<Map> getRunningJob() {
        try {
            List<Map> list = new ArrayList();
            List<JobExecutionContext> currentlyExecutingJobs = scheduler.getCurrentlyExecutingJobs();
            for (JobExecutionContext context : currentlyExecutingJobs) {
                Map param = new HashMap();
                param.put("name", context.getJobDetail().getKey().getName());
                param.put("group", context.getJobDetail().getKey().getGroup());
                param.put("jobName", context.getMergedJobDataMap().get("jobName"));
                param.put("fireTime", context.getFireTime() != null ? DateUtils.parseDate(context.getFireTime(), DateUtils.DATE_FORMAT[2]) : "");
                param.put("previousFireTime", context.getPreviousFireTime() != null ? DateUtils.parseDate(context.getPreviousFireTime(), DateUtils.DATE_FORMAT[2]) : "");
                param.put("nextFireTime", context.getNextFireTime() != null ? DateUtils.parseDate(context.getNextFireTime(), DateUtils.DATE_FORMAT[2]) : "");
                param.put("scheduledFireTime", context.getScheduledFireTime() != null ? DateUtils.parseDate(context.getScheduledFireTime(), DateUtils.DATE_FORMAT[2]) : "");
                param.put("refireCount", context.getRefireCount());
                param.put("finalFireTime", context.getTrigger().getFinalFireTime() != null ? DateUtils.parseDate(context.getTrigger().getFinalFireTime(), DateUtils.DATE_FORMAT[2]) : "");
                param.put("startTime", context.getTrigger().getStartTime() != null ? DateUtils.parseDate(context.getTrigger().getStartTime(), DateUtils.DATE_FORMAT[2]) : "");
                param.put("endTime", context.getTrigger().getEndTime() != null ? DateUtils.parseDate(context.getTrigger().getEndTime(), DateUtils.DATE_FORMAT[2]) : "");
                list.add(param);
            }
            return list;
        } catch (Exception ex) {
            throw new RuntimeException("Workflow Engine의 실행중인 작업의 정보를 확인할 수 없습니다.", ex);
        }
    }

    @Override
    public Map getSystemMemoryInformation() {
        Map map = new HashMap();
        Runtime runtime = Runtime.getRuntime();
        map.put("avaliableProcessor", runtime.availableProcessors());
        map.put("freeMemory", runtime.freeMemory());
        map.put("maxMemory", runtime.maxMemory());
        map.put("totalMemory", runtime.totalMemory());
        return map;
    }

    @Override
    public List<Map> getDirectory(String path) {
        List<Map> list = new ArrayList();
        try {
            File[] files = new File(path).listFiles();
            for (File file : files) {
                if (file.isDirectory()) {
                    if (file.isHidden() && isHideHiddenFile) {
                        continue;
                    }
                    Map param = new HashMap();
                    param.put("name", file.getName());
                    param.put("text", file.getName());
                    param.put("node", file.getPath());
                    param.put("id", file.getPath());
                    param.put("absolutePath", file.getAbsolutePath());
                    param.put("canonicalPath", file.getCanonicalPath());
                    param.put("totalSpace", file.getTotalSpace());
                    param.put("totalSpaceDesc", byteDesc(file.getTotalSpace()));
                    param.put("freeSpace", file.getFreeSpace());
                    param.put("freeSpaceDesc", byteDesc(file.getFreeSpace()));
                    param.put("usableSpace", file.getUsableSpace());
                    param.put("usableSpaceDesc", byteDesc(file.getUsableSpace()));
                    param.put("permission", getPermission(file));
                    param.put("path", file.getPath());
                    param.put("length", byteDesc(file.length()));
                    param.put("isDirectory", file.isDirectory());
                    param.put("isFile", file.isFile());
                    param.put("isHidden", file.isHidden());
                    param.put("lastModified", DateUtils.parseDate(new Date(file.lastModified()), DateUtils.DATE_FORMAT[2]));
                    param.put("uri", file.toURI());
                    param.put("qtip", file.getPath());
                    param.put("leaf", false);
                    param.put("cls", "folder");
                    list.add(param);
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException("요청한 경로에 접근할 수 없습니다.", ex);
        }
        return list;
    }

    @Override
    public List<Map> getDirectoryAndFiles(String path) {
        List<Map> list = new ArrayList();
        try {
            File[] files = new File(path).listFiles();
            for (File file : files) {
                if (file.isDirectory()) {
                    if (file.isHidden() && isHideHiddenFile) {
                        continue;
                    }
                    Map param = new HashMap();
                    param.put("name", file.getName());
                    param.put("text", file.getName());
                    param.put("node", file.getPath());
                    param.put("id", file.getPath());
                    param.put("absolutePath", file.getAbsolutePath());
                    param.put("canonicalPath", file.getCanonicalPath());
                    param.put("totalSpace", file.getTotalSpace());
                    param.put("totalSpaceDesc", byteDesc(file.getTotalSpace()));
                    param.put("freeSpace", file.getFreeSpace());
                    param.put("freeSpaceDesc", byteDesc(file.getFreeSpace()));
                    param.put("usableSpace", file.getUsableSpace());
                    param.put("usableSpaceDesc", byteDesc(file.getUsableSpace()));
                    param.put("permission", getPermission(file));
                    param.put("path", file.getPath());
                    param.put("length", byteDesc(file.length()));
                    param.put("isDirectory", file.isDirectory());
                    param.put("isFile", file.isFile());
                    param.put("isHidden", file.isHidden());
                    param.put("lastModified", DateUtils.parseDate(new Date(file.lastModified()), DateUtils.DATE_FORMAT[2]));
                    param.put("uri", file.toURI());
                    param.put("qtip", file.getPath());
                    param.put("leaf", false);
                    param.put("cls", "folder");
                    param.put("files", getFiles(file.getPath()));
                    list.add(param);
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException("요청한 경로에 접근할 수 없습니다.", ex);
        }
        return list;
    }

    @Override
    public List<Map> getFiles(String path) {
        List<Map> list = new ArrayList();
        try {
            File[] files = new File(path).listFiles();
            for (File file : files) {
                if (file.isFile()) {
                    if (file.isHidden() && isHideHiddenFile) {
                        continue;
                    }

                    Map param = new HashMap();
                    param.put("name", file.getName());
                    param.put("text", file.getName());
                    param.put("absolutePath", file.getAbsolutePath());
                    param.put("canonicalPath", file.getCanonicalPath());
                    param.put("totalSpace", file.getTotalSpace());
                    param.put("totalSpaceDesc", byteDesc(file.getTotalSpace()));
                    param.put("freeSpace", file.getFreeSpace());
                    param.put("freeSpaceDesc", byteDesc(file.getFreeSpace()));
                    param.put("usableSpace", file.getUsableSpace());
                    param.put("usableSpaceDesc", byteDesc(file.getUsableSpace()));
                    param.put("permission", getPermission(file));
                    param.put("path", file.getPath());
                    param.put("length", byteDesc(file.length()));
                    param.put("isDirectory", file.isDirectory());
                    param.put("isFile", file.isFile());
                    param.put("isHidden", file.isHidden());
                    param.put("lastModified", DateUtils.parseDate(new Date(file.lastModified()), DateUtils.DATE_FORMAT[2]));
                    param.put("uri", file.toURI());
                    param.put("qtip", file.getPath());
                    param.put("leaf", true);
                    list.add(param);
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException("요청한 경로에 접근할 수 없습니다.", ex);
        }
        return list;
    }

    @Override
    public boolean isValidCronExpression(String expression) {
        return org.quartz.CronExpression.isValidExpression(expression);
    }

    /**
     * 파일의 Permission을 문자열로 반환한다.
     *
     * @param file Permission을 확인할 파일
     * @return <tt>RWX</tt> 형식의 문자열
     */
    private String getPermission(File file) {
        StringBuilder builder = new StringBuilder();
        if (file.canRead()) {
            builder.append("R");
        } else {
            builder.append("-");
        }
        if (file.canWrite()) {
            builder.append("W");
        } else {
            builder.append("-");
        }
        if (file.canExecute()) {
            builder.append("X");
        } else {
            builder.append("-");
        }
        return builder.toString();
    }

    /**
     * 파일의 크기를 읽기 편한 문자열 형식으로 변환한다.
     *
     * @param length 파일의 크기
     * @return 문자열 형식의 파일 크기
     */
    public static String byteDesc(long length) {
        double val = 0.0;
        String ending = "";
        if (length < 1024 * 1024) {
            val = (1.0 * length) / 1024;
            ending = " KB";
        } else if (length < 1024 * 1024 * 1024) {
            val = (1.0 * length) / (1024 * 1024);
            ending = " MB";
        } else if (length < 1024L * 1024 * 1024 * 1024) {
            val = (1.0 * length) / (1024 * 1024 * 1024);
            ending = " GB";
        } else if (length < 1024L * 1024 * 1024 * 1024 * 1024) {
            val = (1.0 * length) / (1024L * 1024 * 1024 * 1024);
            ending = " TB";
        } else {
            val = (1.0 * length) / (1024L * 1024 * 1024 * 1024 * 1024);
            ending = " PB";
        }
        return limitDecimalTo2(val) + ending;
    }

    public static synchronized String limitDecimalTo2(double d) {
        return decimalFormat.format(d);
    }
}
