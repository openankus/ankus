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
package org.openflamingo.engine.configuration;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * ConfigurationManager를 Singleton Instance로 접근하기 위한 Helper.
 *
 * @author Byoung Gon, Kim
 * @since 0.1
 */
@Component
public class ConfigurationManagerHelper implements InitializingBean {

    /**
     * ConfigurationManagerHelper의 Singleton Instance
     */
    private static ConfigurationManagerHelper configurationManagerHelper;

    /**
     * Flamingo Site XML의 Configuration Manager
     */
    @Autowired
    private ConfigurationManager configurationManager;

    /**
     * 기본 생성자.
     */
    public ConfigurationManagerHelper() {
    }

    /**
     * Configuration Manager의 Singleton Instance를 반환한다.
     *
     * @return Configuration Manager의 Singleton Instance
     */
    public static ConfigurationManagerHelper getConfigurationManagerHelper() {
        return configurationManagerHelper;
    }

    /**
     * {@link org.openflamingo.engine.configuration.ConfigurationManager}을 반환한다.
     *
     * @return {@link org.openflamingo.engine.configuration.ConfigurationManager}
     */
    public ConfigurationManager getConfigurationManager() {
        return configurationManager;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        configurationManagerHelper = this;
    }
}
