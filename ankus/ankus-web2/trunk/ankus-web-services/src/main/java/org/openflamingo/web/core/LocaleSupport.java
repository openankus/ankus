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

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

/**
 * Locale 기반 Resource Bundle을 지원하는 최상위 객체.<br>
 * kangsy 2016.02.15 DB->소스 리소스화
 * @author Edward KIM
 * @since 1.0
 */
public class LocaleSupport {
	
    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(LocaleSupport.class);
    
    /** 다국어 */
   	@Autowired
   	MessageSource mMsgSource;

    public String message(String mainKey, String subKey, Object... args) {
    	/* DB에서 가져와서 설정 구조
        String key = mainKey + "_" + subKey;
        try {
            String applicationLocale = ConfigurationHelper.getHelper().get("application.locale", "English");
            Map bundles = (Map) ResourceBundleHelper.getHelper().getLocaleMap().get(applicationLocale);
            String message = (String) bundles.get(key);
            return ResourceBundleHolder.getMessage(message, args);
        } catch (Exception e) {
            logger.warn("Invalid Resource Bundle : {}", key, e);
            return "Unknown";
        }
        */
    	
    	/* 메시지 properties를 사용한 리소스화 */
    	String key = mainKey + "_" + subKey;
    	try {
    		return mMsgSource.getMessage(key, args, Locale.getDefault());
		} catch (Exception e) {
			logger.warn("Invalid Resource Bundle : {}", key, e);
            return "Unknown";
		}
    }

}
