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

import org.openflamingo.locale.ResourceBundleHelper;
import org.openflamingo.locale.ResourceBundleHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

/**
 * Locale 기반 Resource Bundle을 지원하는 최상위 객체.
 *
 * @author Edward KIM
 * @since 1.0
 */
public class LocaleSupport {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(LocaleSupport.class);

    public static String message(String mainKey, String subKey, Object... args) {
        String key = mainKey + "_" + subKey;
        try {
            String applicationLocale = ConfigurationManagerHelper.getConfigurationManagerHelper().getConfigurationManager().get("application.locale", "English");
            Map bundles = (Map) ResourceBundleHelper.getHelper().getLocaleMap().get(applicationLocale);
            String message = (String) bundles.get(key);
            return ResourceBundleHolder.getMessage(message, args);
        } catch (Exception e) {
            logger.warn("Invalid Resource Bundle : {}", key, e);
            return "Unknown";
        }
    }

}
