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

import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <code>ResourceBundleHolder</code> provides a means to produce concatenated
 * messages in a language-neutral way. Use this to construct messages
 * displayed for end users.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
public class ResourceBundleHolder {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(ResourceBundleHolder.class);

    private static Pattern variableRegex = Pattern.compile("\\{[^\\}\\$\u0020]+\\}");

    private static Map<String, Map> resourceBundleMap = new HashMap<String, Map>();

    private static Map<String, String> jsonMap = new HashMap<String, String>();

    public static String getMessage(String pattern, Object... args) {
        try {
            String finalMessage = "" + pattern;
            Matcher matcher = variableRegex.matcher(pattern);
            while (matcher.find()) {
                String var = matcher.group();
                String number = var.substring(1, var.length() - 1);
                if (!StringUtils.isEmpty(number)) {
                    int no = Integer.parseInt(number);
                    finalMessage = org.apache.commons.lang.StringUtils.replace(finalMessage, var, String.valueOf(args[no]));
                }
            }
            return finalMessage;
        } catch (Exception ex) {
            return pattern;
        }
    }

    public static String getLocaleMessage(String pattern, Object... args) {
        return getMessage(Locale.getDefault(), pattern, args);
    }

    public static String getMessage(Locale locale, String pattern, Object... args) {
        String localeKey = getLocaleKey(locale.getLanguage(), locale.getCountry());
        Map map = resourceBundleMap.get(localeKey);
        return MessageFormat.format((String) map.get(pattern), args);
    }

    public static String getDefaultLocale() {
        Locale defaultLocale = Locale.getDefault();
        return getLocaleKey(defaultLocale.getLanguage(), defaultLocale.getCountry());
    }

    public static String getLocaleKey(String language, String country) {
        return language + "_" + country;
    }

    public static String formatMessage(String pattern, String... args) {
        return MessageFormat.format(pattern, args);
    }

    public static void addResourceBundleMap(String locale, Map<String, String> resoucebundle) {
        if (!resourceBundleMap.containsKey(locale)) resourceBundleMap.put(locale, resoucebundle);
    }

    public static void addJsonMap(String locale, String json) {
        if (!jsonMap.containsKey(locale)) jsonMap.put(locale, json);
    }
}
