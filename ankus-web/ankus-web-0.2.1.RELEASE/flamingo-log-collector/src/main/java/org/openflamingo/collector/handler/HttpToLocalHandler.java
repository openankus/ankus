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

import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.openflamingo.collector.JobContext;
import org.openflamingo.core.exception.SystemException;
import org.openflamingo.model.collector.*;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemScheme;
import org.openflamingo.util.FileSystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.FileCopyUtils;

import java.nio.charset.Charset;
import java.util.List;

import static org.openflamingo.util.FileSystemUtils.*;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

/**
 * HTTP URL 호출을 통해 얻는 결과물을 파일로 저장하는 핸들러.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class HttpToLocalHandler extends DefaultHandler {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HttpToLocalHandler.class);


    /**
     * HDFS Log Collector Job Context
     */
    private JobContext jobContext;

    /**
     * HDFS Log Collector Job
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
    public HttpToLocalHandler(JobContext jobContext, Job job) {
        this.jobContext = jobContext;
        this.job = job;
        this.http = job.getPolicy().getIngress().getFromHttp();
    }

    @Override
    public void execute() throws Exception {
        String response = getResponse(http);

        Policy.Egress egress = job.getPolicy().getEgress();
        String filename = jobContext.getValue(egress.getToLocal().getFilename().trim());
        String target = jobContext.getValue(egress.getToLocal().getTargetPath().trim());

        String targetPath = correctPath(target);
        FileSystem fs = FileSystemUtils.getFileSystem(targetPath);
        saveResponseToFS(response, fs, targetPath, filename);
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

    /**
     * HTTP Response를 파일로 기록한다.
     *
     * @param response        HTTP Response
     * @param fs              FileSystem
     * @param targetDirectory Target Directory
     * @param filename        Filename
     */
    private void saveResponseToFS(String response, FileSystem fs, String targetDirectory, String filename) {
        FSDataOutputStream dos = null;
        Path path = new Path(targetDirectory, filename);
        try {
            dos = fs.create(path);
            org.apache.commons.io.IOUtils.write(response.getBytes(), dos);
            logger.info("HTTP Response의 결과를 '{}' 파일에 기록했습니다.", path);
        } catch (Exception ex) {
            throw new SystemException(ExceptionUtils.getMessage("HTTP 응답을 파일로 '{}'에 기록할 수 없습니다.", path), ex);
        } finally {
            if (dos != null) {
                org.apache.commons.io.IOUtils.closeQuietly(dos);
            }
        }
    }

    @Override
    public void validate() {
        assertNotEmpty(jobContext.getValue(http.getUrl()));
        String method = assertNotEmpty(jobContext.getValue(http.getMethod().getType()));
        if ("POST".equals(method)) {
            assertNotEmpty(jobContext.getValue(http.getBody()));
        }

        ToLocal local = job.getPolicy().getEgress().getToLocal();
        String directory = assertNotEmpty(jobContext.getValue(local.getTargetPath().trim()));
        assertNotEmpty(jobContext.getValue(local.getFilename()));

        String targetPath = correctPath(directory);
        checkScheme(targetPath, FileSystemScheme.LOCAL);
        testCreateDir(new Path(targetPath));
    }

}
