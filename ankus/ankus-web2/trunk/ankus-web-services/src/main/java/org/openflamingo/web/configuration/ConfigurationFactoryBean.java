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
package org.openflamingo.web.configuration;

import org.openflamingo.model.site.Configuration;
import org.openflamingo.util.JaxbUtils;
import org.openflamingo.util.ResourceUtils;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;

/**
 * Flamingo Site XML 파일을 로딩하여 JAXB Configuration Object를 생성하는 Factory Bean.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class ConfigurationFactoryBean implements InitializingBean, FactoryBean<Configuration> {

    /**
     * Flamingo Site XML 파일
     */
    private Resource configurationFile;

    /**
     * Flamingo Site XML의 JAXB Configuration Object
     */
    private Configuration configuration;

    /**
     * Flamingo Site XML의 JAXB Object 패키지명
     */
    public static String JAXB_PACKAGE_NAME = "org.openflamingo.model.site";

    @Override
    public void afterPropertiesSet() throws Exception {
        String xml = ResourceUtils.getResourceTextContents(configurationFile);
        configuration = (Configuration) JaxbUtils.unmarshal(JAXB_PACKAGE_NAME, xml);
    }

    @Override
    public Configuration getObject() throws Exception {
        return configuration;
    }

    @Override
    public Class<?> getObjectType() {
        return Configuration.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    ////////////////////////////////////////////////////
    // Spring Framework Setter Injection
    ////////////////////////////////////////////////////

    /**
     * Flamingo Site XML 파일을 설정한다.
     *
     * @param configurationFile Flamingo Site XML 파일
     */
    public void setConfigurationFile(Resource configurationFile) {
        this.configurationFile = configurationFile;
    }
}
