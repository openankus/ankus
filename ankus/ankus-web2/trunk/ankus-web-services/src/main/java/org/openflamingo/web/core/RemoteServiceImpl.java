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
package org.openflamingo.web.core;

import org.openflamingo.core.exception.SystemException;
import org.openflamingo.model.rest.Engine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;

import java.util.Map;

import static org.slf4j.helpers.MessageFormatter.arrayFormat;

/**
 * Remote Service Implementation.
 *
 * @author Edward KIM
 * @since 0.5
 */
public class RemoteServiceImpl extends LocaleSupport implements RemoteService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(RemoteServiceImpl.class);

    /**
     * Remote Service Mapping.
     */
    private Map<String, Class> serviceMap;

    @Override
    public Object getService(String serviceName, Engine engine) {
        try {
            System.out.printf("getService_name====>[%s_%s:%s]\n", serviceName, engine.getIp(), engine.getPort());
            String remoteServiceUrl = getRemoteServiceUrl(engine, serviceName);
            
            System.out.printf("getService====>[%s]\n", remoteServiceUrl);
            
            return getRemoteService(remoteServiceUrl, serviceMap.get(serviceName));
        } catch (Exception ex) {
            String message = message("S_REMOTE", "CANNOT_GET_REMOTE_SERVICE", serviceName);
            logger.warn(message, ex);
            throw new SystemException(message, ex);
        }
    }

    private Object getRemoteService(String url, Class clazz) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(clazz);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return factoryBean.getObject();
    }

    private String getRemoteServiceUrl(Engine engine, String serviceName) {
        return arrayFormat("http://{}:{}/remote/{}", new Object[]{
                engine.getIp(), engine.getPort(), serviceName
        }).getMessage();
    }

    /////////////////////////////////////////
    // Spring Framework Setter Injection
    /////////////////////////////////////////

    public void setServiceMap(Map<String, Class> serviceMap) {
        this.serviceMap = serviceMap;
    }

}