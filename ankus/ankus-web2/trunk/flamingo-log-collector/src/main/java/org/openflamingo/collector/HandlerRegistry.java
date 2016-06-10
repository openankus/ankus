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
package org.openflamingo.collector;


import org.apache.commons.collections.keyvalue.MultiKey;
import org.openflamingo.collector.handler.Handler;
import org.openflamingo.model.collector.Collector;
import org.openflamingo.model.collector.Job;
import org.openflamingo.model.collector.Mapping;
import org.openflamingo.model.collector.Policy;
import org.openflamingo.util.JaxbUtils;
import org.openflamingo.util.ResourceUtils;
import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.springframework.util.ClassUtils;

import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Edward KIM
 * @since 0.3
 */
@Component
public class HandlerRegistry implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HandlerRegistry.class);

    private static HandlerRegistry handlerRegistry;

    private static Map<MultiKey, String> handlerMapping = new HashMap<MultiKey, String>();

    public HandlerRegistry() {
        try {
            String mappingXml = ResourceUtils.getResourceTextContents("classpath:/mapping.xml");
            Collector collector = (Collector) JaxbUtils.unmarshal("org.openflamingo.model.collector", mappingXml);
            List<Mapping> mappings = collector.getMapping();
            for (Mapping mapping : mappings) {
                MultiKey key = new MultiKey(mapping.getIngress(), mapping.getEgress());
                handlerMapping.put(key, mapping.getHandler());
                logger.info("Registering a handler '{}' = Ingress '{}', Egress '{}'", new String[]{
                    mapping.getHandler(), mapping.getIngress(), mapping.getEgress()
                });
            }
        } catch (Exception ex) {
            throw new IllegalArgumentException("'classpath:/mapping.xml'을 로딩할 수 없습니다.", ex);
        }
    }

    public Handler getHandler(JobContext jobContext, Job job) {
        try {
            Policy.Ingress ingress = job.getPolicy().getIngress();
            Policy.Egress egress = job.getPolicy().getEgress();
            String handlerClassName = getHandlerClassName(ingress, egress);
            if (StringUtils.isEmpty(handlerClassName)) {
                String message = MessageFormatter.format("Job '{}'의 Ingress, Egress 조합이 올바르지 않습니다.", job.getName()).getMessage();
                throw new IllegalArgumentException(message);
            }

            Class clazz = ClassUtils.forName(handlerClassName, Thread.currentThread().getContextClassLoader());
            Constructor constructor = ClassUtils.getConstructorIfAvailable(clazz, JobContext.class, Job.class);
            return (Handler) BeanUtils.instantiateClass(constructor, jobContext, job);
        } catch (Exception ex) {
            String message = MessageFormatter.format("Job '{}'의 Ingress, Egress를 처리하는 Handler를 초기화할 수 없습니다.", job.getName()).getMessage();
            logger.warn("{}", message, ex);
            throw new IllegalArgumentException(message, ex);
        }
    }

    private String getHandlerClassName(Policy.Ingress ingress, Policy.Egress egress) throws Exception {
        String ingressClassName = this.getIngress(ingress);
        String egressClassName = this.getEgress(egress);
        logger.debug("Ingress '{}', Egress '{}'를 처리할 Handler를 찾습니다.", ingressClassName, egressClassName);
        return handlerMapping.get(new MultiKey(ingressClassName, egressClassName));
    }

    private String getIngress(Policy.Ingress ingress) throws Exception {
        return getClassName(ingress, ingress.getClass());
    }

    private String getEgress(Policy.Egress egress) throws Exception {
        return getClassName(egress, egress.getClass());
    }

    private String getClassName(Object obj, Class clazz) throws Exception {
        for (PropertyDescriptor propertyDescriptor : Introspector.getBeanInfo(clazz).getPropertyDescriptors()) {
            if (propertyDescriptor.getReadMethod() != null && !"class".equals(propertyDescriptor.getName())) {
                Method readMethod = propertyDescriptor.getReadMethod();
                Object invoke = readMethod.invoke(obj);
                if (invoke != null) {
                    return invoke.getClass().getName();
                }
            }
        }
        throw new IllegalArgumentException("Handler를 찾을 수 없습니다.");
    }

    public static HandlerRegistry getHandlerRegistry() {
        return handlerRegistry;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        handlerRegistry = this;
    }
}