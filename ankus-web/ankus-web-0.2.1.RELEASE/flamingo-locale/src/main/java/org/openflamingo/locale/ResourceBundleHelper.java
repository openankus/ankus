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
package org.openflamingo.locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ResourceBundleHelper를 Singleton Instance로 접근하기 위한 Helper.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Component
public class ResourceBundleHelper implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ResourceBundleHolder.class);

    /**
     * ResourceBundleHelper의 Singleton Instance
     */
    private static ResourceBundleHelper helper;

    /**
     * Flamingo Site XML의 Configuration Manager
     */
    @Autowired
    private LocaleService localeService;

    /**
     * 메시지 번들과 로케일을 매핑하여 캐슁하는 메시지 번들 캐쉬.
     */
    private Map localeMap;

    /**
     * Default constructor.
     */
    public ResourceBundleHelper() {
        this.localeMap = new HashMap();
    }

    /**
     * ResourceBundleHelper의 Singleton Instance를 반환한다.
     *
     * @return ResourceBundleHelper의 Singleton Instance
     */
    public static ResourceBundleHelper getHelper() {
        return helper;
    }

    /**
     * 메시지 번들 캐쉬를 반환한다.
     *
     * @return 메시지 번들 캐쉬
     */
    public Map getLocaleMap() {
        return localeMap;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        helper = this;
        List<Locale> locales = localeService.getLocales();
        for (Locale locale : locales) {
            Map<String, Map> message = localeService.getMessage(locale);
            localeMap.put(locale.getName(), message);
            logger.info("Loaded {} bundles for '{}'.", locale.getName(), message.size());
        }
    }
}
