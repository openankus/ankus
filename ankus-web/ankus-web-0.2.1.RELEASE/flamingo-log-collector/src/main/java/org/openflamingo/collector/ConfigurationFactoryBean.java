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

import org.openflamingo.model.collector.Collector;
import org.openflamingo.util.ResourceUtils;
import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

/**
 * Flamingo Log Colllector XML 파일을 로딩하여 JAXB Configuration Object를 생성하는 Factory Bean.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Component
public class ConfigurationFactoryBean implements InitializingBean, FactoryBean<Collector> {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ConfigurationFactoryBean.class);

    /**
     * Log Collector XML 파일
     */
    private Resource configurationFile;

    /**
     * Flamingo Log Collector XML의 JAXB Configuration Object
     */
    private Collector collector;

    /**
     * Flamingo Log Collector XML의 JAXB Object 패키지명
     */
    private String JAXB_PACKAGE_NAME = "org.openflamingo.model.collector";

    /**
     * HDFS Log Collector Job XML File
     */
    @Value("#{config['collector.job.xml']}")
    private String jobXml;

    @Override
    public void afterPropertiesSet() throws Exception {
        /*
            설정 파일을 로딩하는 규칙은 다음과 같다.
              1. -Dcollector.job.xml 옵션으로 지정한 절대 경로
              2. config.properties 파일의 collector.job.xml 옵션으로 지정한 절대 경로
              3. 아무것도 없으면 CLASSPATH의 job.xml
         */
        if (System.getProperty("collector.job.xml") != null) {
            logger.info("'-Dcollector.job.xml={}'으로 지정한 설정 파일을 사용합니다.", System.getProperty("collector.job.xml"));
            configurationFile = ResourceUtils.getResource(System.getProperty("collector.job.xml"));
        } else if (!StringUtils.isEmpty(jobXml)) {
            logger.info("config.properties 파일에 지정한 collector.job.xml의 값인 로컬 파일 시스템의 절대 경로({})로 지정한 설정 파일을 사용합니다.", jobXml);
            configurationFile = ResourceUtils.getResource(jobXml);
        } else {
            logger.info("옵션이 별도로 지정되어 있지 않아서 CLASSPATH에서 /job.xml 파일을 기본으로 로딩합니다.", jobXml);
            configurationFile = new ClassPathResource("classpath:/job.xml");
        }

/*
        String xml = ResourceUtils.getResourceTextContents(configurationFile);
        collector = (Collector) JaxbUtils.unmarshal(JAXB_PACKAGE_NAME, xml);
        logger.info("Collector Job이 등록되어 있는 XML 파일({})을 로딩하였습니다.\n{}", configurationFile.getFile().getAbsolutePath(), xml);
*/
    }

    @Override
    public Collector getObject() throws Exception {
        return collector;
    }

    @Override
    public Class<?> getObjectType() {
        return Collector.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
