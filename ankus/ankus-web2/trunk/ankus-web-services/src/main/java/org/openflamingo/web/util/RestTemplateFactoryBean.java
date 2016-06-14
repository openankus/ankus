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
package org.openflamingo.web.util;

import org.apache.http.HttpHost;
import org.apache.http.conn.params.ConnRoutePNames;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class RestTemplateFactoryBean implements InitializingBean, FactoryBean {

    private String proxyHost;

    private String proxyPort;

    private int readTimeout;

    private int connectTimeout;

    private RestTemplate restTemplate;

    private List messageConverters;

    @Override
    public void afterPropertiesSet() throws Exception {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(readTimeout);
        factory.setConnectTimeout(connectTimeout);

        if (!StringUtils.isEmpty(proxyHost) && !StringUtils.isEmpty(proxyPort)) {
            HttpHost proxy = new HttpHost(proxyHost, Integer.parseInt(proxyPort), "http");
            factory.getHttpClient().getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, proxy);
        }

        this.restTemplate = new RestTemplate(factory);
        this.restTemplate.setMessageConverters(messageConverters);
    }

    @Override
    public Object getObject() throws Exception {
        return restTemplate;
    }

    @Override
    public Class<?> getObjectType() {
        return RestTemplate.class;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }

    public void setProxyHost(String proxyHost) {
        this.proxyHost = proxyHost;
    }

    public void setProxyPort(String proxyPort) {
        this.proxyPort = proxyPort;
    }

    public void setReadTimeout(int readTimeout) {
        this.readTimeout = readTimeout;
    }

    public void setConnectTimeout(int connectTimeout) {
        this.connectTimeout = connectTimeout;
    }

    public void setMessageConverters(List messageConverters) {
        this.messageConverters = messageConverters;
    }
}
