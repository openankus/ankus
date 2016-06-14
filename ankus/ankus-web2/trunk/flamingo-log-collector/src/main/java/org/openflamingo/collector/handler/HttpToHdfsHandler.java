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
package org.openflamingo.collector.handler;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.openflamingo.collector.JobContext;
import org.openflamingo.core.exception.SystemException;
import org.openflamingo.model.collector.*;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemScheme;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.FileCopyUtils;

import java.nio.charset.Charset;
import java.util.List;

import static org.openflamingo.util.FileSystemUtils.checkScheme;
import static org.openflamingo.util.FileSystemUtils.testCreateDir;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

/**
 * Local FileSystem을 이용하여 Ingress 처리를 하는 핸들러.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class HttpToHdfsHandler extends DefaultHandler {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HttpToHdfsHandler.class);

    /**
     * Flamingo Log Collector Job Context
     */
    private JobContext jobContext;

    /**
     * HDFS File Uploder Job
     */
    private Job job;

    /**
     * Job에 정의되어 있는 Ingress 노드
     */
    private FromHttp http;

    /**
     * 기본 생성자.
     *
     * @param jobContext Flamingo Log Collector의 Job Context
     * @param job        Job
     */
    public HttpToHdfsHandler(JobContext jobContext, Job job) {

        System.out.println("==================== HttpToHdfsHandler =====================");
        this.jobContext = jobContext;
        this.job = job;
        this.http = job.getPolicy().getIngress().getFromHttp();
    }

    @Override
    public void execute() throws Exception {
        String response = getResponse(http);

        ToHdfs hdfs = job.getPolicy().getEgress().getToHdfs();

        //2014.02.10 log debuging
        System.out.println("--------------- hdfd -----------------"+hdfs);

        // 파일을 업로드할 HDFS의 FileSystem 정보를 획득한다.
        String cluster = jobContext.getValue(hdfs.getCluster().trim());
        Configuration configuration = getConfiguration(jobContext.getModel(), cluster);
        FileSystem targetFS = FileSystem.get(configuration);
        logger.info("HDFS에 업로드하기 위해서 사용할 Hadoop Cluster '{}'이며 Hadoop Cluster의 파일 시스템을 얻었습니다.", cluster);

        System.out.println("--------------- cluster -----------------"+cluster);



        // HDFS의 target을 얻는다.
        String target = jobContext.getValue(hdfs.getTargetPath().trim());
        logger.info("HDFS에 업로드하기 위해서 사용할 최종 목적지 파일명은 '{}'입니다.", target);

        // HDFS에 경로가 없는 경우 생성한다.
        String path = FileUtils.getPath(target);
        logger.info("HDFS에 '{}' 경로가 존재하는지 확인하고 없다면 생성합니다.", path);
        if (!targetFS.exists(new Path(path))) {
            targetFS.mkdirs(new Path(path));
            logger.info("HDFS에 업로드하기 위해서 사용할 최종 목적지 경로 '{}'가 존재하지 않아서 생성했습니다.", path);
        }

        // 파일을 저장한다.
        FileSystemUtils.saveToFile(response.getBytes(), targetFS, jobContext.getValue(target));
        logger.info("HDFS에 '{}' 파일을 저장했습니다.", target);
    }

    /**
     * HTTP로 해당 URL을 요청한다.
     *
     * @param http HTTP
     * @return HTTP Response String
     * @throws Exception HTTP 호출이 정상적으로 완료되지 않은 경우
     */
    private String getResponse(FromHttp http) throws Exception {
        logger.info("HTTP URL을 호출하기 위해 관련 파라미터 정보를 처리합니다.");

        String url = jobContext.getValue(http.getUrl().trim());
        String method = jobContext.getValue(http.getMethod().getType());

        logger.info("HTTP URL Information :");
        logger.info("   URL = {}", url);
        logger.info("   Method = {}", method);

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        ClientHttpRequest request = null;
        if ("POST".equals(method)) {
            request = factory.createRequest(new java.net.URI(url), POST);
        } else {
            request = factory.createRequest(new java.net.URI(url), GET);
        }

        if (http.getHeaders() != null && http.getHeaders().getHeader().size() > 0) {
            List<Header> header = http.getHeaders().getHeader();
            logger.info("HTTP Header :", new String[]{});
            for (Header h : header) {
                String name = h.getName();
                String value = jobContext.getValue(h.getValue());
                request.getHeaders().add(name, value);
                logger.info("\t{} = {}", name, value);
            }
        }

        String responseBodyAsString = null;
        ClientHttpResponse response = null;
        try {
            response = request.execute();
            responseBodyAsString = new String(FileCopyUtils.copyToByteArray(response.getBody()), Charset.defaultCharset());
            logger.debug("HTTP 요청의 응답 메시지는 다음과 같습니다.\n{}", responseBodyAsString);
            logger.info("HTTP 요청을 완료하였습니다. 상태 코드는 '{}({})'입니다.", response.getStatusText(), response.getRawStatusCode());
            if (response.getRawStatusCode() != HttpStatus.OK.value()) {
                throw new SystemException(ExceptionUtils.getMessage("HTTP URL 호출에 실패하였습니다. 응답코드가 OK가 아닌 '{}({})' 코드가 서버에서 수신하였습니다.", response.getStatusText(), response.getRawStatusCode()));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new SystemException(ExceptionUtils.getMessage("HTTP URL 호출에 실패하였습니다. 에러 메시지: {}", ExceptionUtils.getRootCause(ex).getMessage()), ex);
        } finally {
            try {
                response.close();
            } catch (Exception ex) {
                // Ignored
            }
        }
        return responseBodyAsString;
    }

    @Override
    public void validate() {
        /////////////////////////////////
        // Ingress :: Http
        /////////////////////////////////


        System.out.println("--------------- validate() -----------------");

        assertNotEmpty(jobContext.getValue(http.getUrl()));
        String method = assertNotEmpty(jobContext.getValue(http.getMethod().getType()));
        if ("POST".equals(method)) {
            assertNotEmpty(jobContext.getValue(http.getBody()));
        }

        /////////////////////////////////
        // Target HDFS
        /////////////////////////////////

        ToHdfs hdfs = job.getPolicy().getEgress().getToHdfs();
        String cluster = hdfs.getCluster().trim();

        System.out.println("cluster : "+cluster);

        Configuration configuration = this.getConfiguration(jobContext.getModel(), cluster);

        String targetPath = jobContext.getValue(configuration.get(HDFS_URL) + "/" + jobContext.getValue(FileUtils.getPath(hdfs.getTargetPath().trim())));
        checkScheme(targetPath, FileSystemScheme.HDFS);

        System.out.println("new Path(FileUtils.getPath(hdfs.getTargetPath().trim())) : "+FileUtils.getPath(hdfs.getTargetPath().trim()));


//        testCreateDir(new Path(FileUtils.getPath(hdfs.getTargetPath().trim())));
    }

    /**
     * Hadoop Cluster의 이름으로 Cluster의 Hadoop Configuration을 생성한다.
     *
     * @param model       Flamingo Log Collector의 JAXB ROOT Object
     * @param clusterName Hadoop Cluster명
     * @return {@link org.apache.hadoop.conf.Configuration}
     */
    public static Configuration getConfiguration(Collector model, String clusterName) {
        Configuration configuration = new Configuration();
        List<Cluster> clusters = model.getClusters().getCluster();
        for (Cluster cluster : clusters) {
            if (clusterName.equals(cluster.getName())) {
                configuration.set(HDFS_URL, cluster.getFsDefaultName().trim());
                configuration.set(JOB_TRACKER, cluster.getMapredJobTracker().trim());

                List<Property> properties = cluster.getProperties().getProperty();
                for (Property property : properties) {
                    configuration.set(property.getName().trim(), property.getValue().trim());
                }
            }
        }
        return configuration;
    }
}
