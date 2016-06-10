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

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.hadoop.fs.Path;
import org.openflamingo.core.exception.WorkflowException;
import org.openflamingo.engine.configuration.ConfigurationManagerHelper;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.HttpStatusCodeResolver;
import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author Byung Gon, Kim
 * @version 0.3
 */
public class MavenArtifactLoader {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(MavenArtifactLoader.class);

    /**
     * 지정한 Maven Artifact의 경로를 구성한다. 다음과 같이 파라미터를 지정한 경우
     * <p/>
     * <ul>
     * <li>Group Id - <tt>org.openflamingo</tt></li>
     * <li>Artifact Id - <tt>flamingo-mapreduce</tt></li>
     * <li>Version - <tt>0.1</tt></li>
     * </ul>
     * <p/>
     * 위 파라미터에 대해서 <tt>/org/openflamingo/flamingo-mapreduce/0.1/flamingo-mapreduce-0.1.jar</tt>의 다운로드 URL를 생성한다.
     *
     * @param groupId    Maven Group Id
     * @param artifactId Maven Artifact Id
     * @param version    Artifact Version
     * @return 다운로드 URL
     */
    private static String getArtifactPath(String groupId, String artifactId, String version) {
        return "/" + StringUtils.replace(groupId, ".", "/") + "/" + artifactId + "/" + version + "/" + artifactId + "-" + version + ".jar";
    }

    /**
     * 지정한 Artifact를 다운로드한다.
     *
     * @param groupId          Maven Group Id
     * @param artifactId       Maven Artifact Id
     * @param version          Artifact Version
     * @param url              Maven Repository URL
     * @param workingDirectory Local Working Directory
     * @param retry            Retry
     * @return 다운로드한 Artifact의 Local FileSystem Path
     */
    public static String downloadArtifactFromRepository(String groupId, String artifactId, String version, String url, String workingDirectory, String retry) {
        boolean isCaching = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().getBoolean("artifact.caching", true);
        String filename = workingDirectory + "/" + artifactId + "-" + version + ".jar";
        String cachePath = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("artifact.cache.path", "/temp/cache");
        String cachedFilename = cachePath + "/" + artifactId + "-" + version + ".jar";
        String artifactPath = null;

        if (isCaching) {
            artifactPath = cachedFilename;
        } else {
            artifactPath = filename;
        }

        if (url == null || workingDirectory == null) {
            String message = ExceptionUtils.getMessage("Maven Repository에 접근하기 위한 필수 파라미터가 필요합니다. Maven Repository URL '{}' Working Directory '{}'", url, workingDirectory);
            throw new IllegalArgumentException(message);
        }

        if (!new File(artifactPath).exists()) {
            String artifactUrl = url + getArtifactPath(groupId.trim(), artifactId.trim(), version.trim());
            HttpClient httpClient = new HttpClient();
            GetMethod method = new GetMethod(artifactUrl);
            method.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler(Integer.valueOf(retry), false));
            int statusCode = 0;
            try {
                logger.debug("Artifact [{}]을 다운로드합니다.", artifactUrl);
                statusCode = httpClient.executeMethod(method);
            } catch (IOException e) {
                throw new WorkflowException(ExceptionUtils.getMessage("Artifact '{}'을 다운로드할 수 없습니다.", artifactUrl), e);
            }

            if (statusCode != HttpStatus.SC_OK) {
                throw new WorkflowException(ExceptionUtils.getMessage("Artifact '{}'을 다운로드하였으나 정상적으로 다운로드하지 못헀습니다. HTTP 상태 코드는 '{}' 상태 메시지 '{}'", artifactUrl, statusCode, HttpStatusCodeResolver.resolve(statusCode)));
            }

            // 다운로드한 파일을 저장하기 위해한 fully qualified file name을 구성한다.
            FileSystemUtils.testCreateDir(new Path(FileSystemUtils.correctPath(cachePath)));
            try {
                InputStream is = method.getResponseBodyAsStream();
                File outputFile = new File(artifactPath);
                FileOutputStream fos = new FileOutputStream(outputFile);
                org.springframework.util.FileCopyUtils.copy(is, fos);
                logger.info("Artifact [{}]을 다운로드하여 [{}] 파일로 저장하였습니다.", artifactUrl, artifactPath);
                return artifactPath;
            } catch (IOException e) {
                throw new WorkflowException(ExceptionUtils.getMessage("다운로드한 Artifact를 '{}' 파일로 저장할 수 없습니다.", artifactPath), e);
            }
        } else {
            logger.info("캐쉬에 있는 Artifact [{}]을 사용합니다.", artifactPath);
            return artifactPath;
        }
    }
}
