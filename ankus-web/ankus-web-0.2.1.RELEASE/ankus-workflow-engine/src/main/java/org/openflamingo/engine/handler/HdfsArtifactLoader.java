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

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.engine.context.WorkflowContext;
import org.openflamingo.engine.scheduler.JobVariable;
import org.openflamingo.engine.util.HdfsUtils;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Apache Hadoop FileSystem Artifact Loader.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class HdfsArtifactLoader implements ArtifactLoader {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HdfsArtifactLoader.class);

    /**
     * Workflow Context
     */
    private WorkflowContext context;

    /**
     * Apache Hadoop FileSystem
     */
    private FileSystem fs;

    /**
     * 기본 생성자.
     *
     * @param context Workflow Context
     */
    public HdfsArtifactLoader(WorkflowContext context) {
        this.context = context;
        try {
            HadoopCluster hadoopCluster = (HadoopCluster) context.getSchedulerContext().getJobExecutionContext().getMergedJobDataMap().get(JobVariable.HADOOP_CLUSTER);
            Configuration conf = new Configuration();
            conf.set("fs.default.name", hadoopCluster.getHdfsUrl());

            this.fs = FileSystem.get(conf);
        } catch (IOException e) {
            throw new FileSystemException("HDFS를 초기화할 수 없습니다.", e);
        }
    }

    @Override
    public String load(String groupId, String artifactId, String version) {
        throw new UnsupportedOperationException();
    }

    @Override
    public String loadArtifact(String artifactIdentifier) {
        throw new UnsupportedOperationException();
    }

    @Override
    public List<String> loadArtifacts(List<String> artifactIdentifiers) {
        List<String> artifacts = new ArrayList<String>();
        for (String artifact : artifactIdentifiers) {
            artifacts.add(this.load(artifact));
        }
        return artifacts;
    }

    @Override
    public String load(String filename) {
        String actionBasePath = ActionBasePathGenerator.getActionBasePath(context.getCurrentActionContext());
        String jarPath = actionBasePath + "/jars";
        String temporaryPath = FileUtils.getFilename(filename);

        // Maven Artifact인 경우 Maven Repository에서 다운로드한다.
        if (StringUtils.countOccurrencesOf(filename, ":") == 2) {
            String mavenUrl = DefaultHandler.getFlamingoConf("maven.repository.url");
            String[] strings = org.apache.commons.lang.StringUtils.splitPreserveAllTokens(filename, ":");
            return MavenArtifactLoader.downloadArtifactFromRepository(strings[0], strings[1], strings[2], mavenUrl, jarPath, "20000");
        } else {
            boolean isCaching = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().getBoolean("artifact.caching", true);
            String cachePath = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("artifact.cache.path", "/temp/cache");
            String cachedFilename = cachePath + filename;
            String artifactPath = null;

            // 캐슁 기능이 켜져 있는 경우 캐쉬에 저장되어 있는 파일을 사용한다.
            if (isCaching) {
                artifactPath = cachedFilename;
            } else {
                artifactPath = jarPath + "/" + temporaryPath;
            }

            FileSystemUtils.testCreateDir(new Path(FileSystemUtils.correctPath(FileUtils.getPath(artifactPath))));

            try {
                InputStream is = HdfsUtils.getInputStream(fs, filename);
                File outputFile = new File(artifactPath);
                FileOutputStream fos = new FileOutputStream(outputFile);
                org.springframework.util.FileCopyUtils.copy(is, fos);
                logger.info("Artifact [{}]을 다운로드하여 [{}] 파일로 저장하였습니다.", filename, artifactPath);
                return artifactPath;
            } catch (IOException e) {
                throw new WorkflowException(ExceptionUtils.getMessage("다운로드한 Artifact를 '{}' 파일로 저장할 수 없습니다.", artifactPath), e);
            }
        }
    }
}
