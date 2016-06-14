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

import org.apache.commons.lang.StringUtils;
import org.openflamingo.el.ELUtils;
import org.openflamingo.model.site.Property;
import org.openflamingo.web.configuration.ConfigurationUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;

/**
 * ResourceBundleHelper를 Singleton Instance로 접근하기 위한 Helper.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Component
public class ConfigurationHelper implements InitializingBean {

    /**
     * Flamingo Site XML의 JAXB Configuration Object
     */
    @Autowired
    private org.openflamingo.model.site.Configuration configuration;

    /**
     * Flamingo Site XML의 Property Key Value를 담고 있는 map
     */
    private Map<String, String> map;

    /**
     * Flamingo Site XML의 Property Key Value를 담고 있는 properties.
     */
    private Properties props;

    /**
     * Flamingo Site XML의 Property Key를 기준으로 Property를 담고 있는 Map
     */
    private Map<String, Property> propertyMap = new TreeMap<String, Property>();

    /**
     * ResourceBundleHelper의 Singleton Instance
     */
    private static ConfigurationHelper helper;

    /**
     * Default constructor.
     */
    public ConfigurationHelper() {
    }

    /**
     * ConfigurationHelper의 Singleton Instance를 반환한다.
     *
     * @return ConfigurationHelper의 Singleton Instance
     */
    public static ConfigurationHelper getHelper() {
        return helper;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        this.helper = this;
        this.map = getConfiguratioMap(configuration);
        this.props = ConfigurationUtils.mapToProperties(map);
    }

    /**
     * Flamingo Site XML 파일의 설정 정보를 Key Value Map으로 변환한다.
     *
     * @param configuration {@link org.openflamingo.model.site.Configuration}
     * @return Key Value Map
     */
    public Map getConfiguratioMap(org.openflamingo.model.site.Configuration configuration) {
        List<Property> properties = configuration.getProperty();
        Map<String, String> map = new TreeMap<String, String>();
        for (Property property : properties) {
            if (!StringUtils.isEmpty(property.getName())) {
                String name = property.getName();
                String value = property.getValue();
                propertyMap.put(name, property);

                if (StringUtils.isEmpty(value)) {
                    String defautlVaule = property.getDefautlVaule();
                    if (!StringUtils.isEmpty(defautlVaule)) {
                        map.put(name, defautlVaule);
                    }
                } else {
                    map.put(name, value);
                }
            }
        }
        return map;
    }

    /**
     * Flamingo Site XML의 Property Key Value를 담고 있는 properties을 반환한다.
     *
     * @return Flamingo Site XML의 Property Key Value를 담고 있는 properties
     */
    public Properties getProperties() {
        return this.props;
    }

    /**
     * 설정 정보의 크기를 반환한다.
     *
     * @return 크기
     */
    public int size() {
        return map.size();
    }

    /**
     * 입력 문자열의 EL을 평가한다.
     *
     * @param value 입력 문자열
     * @return EL을 포함한 문자열을 평가한 문자열
     */
    public String evaluate(String value) {
        return ELUtils.resolve(props, value);
    }

    /**
     * 지정한 Key의 Value를 평가한다.
     *
     * @param key Key
     * @return Key의 Value에 대해서 평가한 문자열
     */
    public String get(String key) {
        String value = map.get(key);
        if (StringUtils.isEmpty(value)) {
            return value;
        }
        return ELUtils.resolve(props, value);
    }

    /**
     * 지정한 Key의 Value를 평가한다.
     *
     * @param key          Key
     * @param defaultValue 기본값
     * @return Key의 Value에 대해서 평가한 문자열
     */
    public String get(String key, String defaultValue) {
        String value = map.get(key);
        if (!StringUtils.isEmpty(value)) {
            return ELUtils.resolve(props, value);
        }
        return defaultValue;
    }

    /**
     * 지정한 Key가 존재하는지 확인한다.
     *
     * @param key 존재 여부를 확인할 Key
     * @return 존재하지 않는다면 <tt>false</tt>
     */
    public boolean containsKey(String key) {
        return map.containsKey(key);
    }

    /**
     * 지정한 Key에 대해서 Long Value를 반환한다.
     *
     * @param key Key
     * @return Key에 대한 Long Value
     */
    public long getLong(String key) {
        return Long.parseLong(get(key));
    }

    /**
     * 지정한 Key에 대해서 Boolean Value를 반환한다.
     *
     * @param key Key
     * @return Key에 대한 Boolean Value
     */
    public boolean getBoolean(String key) {
        try {
            return Boolean.parseBoolean(get(key));
        } catch (Exception ex) {
            return false;
        }
    }

    /**
     * 지정한 Key에 대해서 Boolean Value를 반환한다.
     *
     * @param key          Key
     * @param defaultValue 기본값
     * @return Key에 대한 Boolean Value
     */
    public boolean getBoolean(String key, boolean defaultValue) {
        if (containsKey(key)) {
            return Boolean.parseBoolean(get(key));
        } else {
            return defaultValue;
        }
    }

    /**
     * 지정한 Key에 대해서 Long Value를 반환한다. 값이 없다면 기본값을 반환한다.
     *
     * @param key          Key
     * @param defaultValue 기본값
     * @return Key에 대한 Long Value
     */
    public long getLong(String key, long defaultValue) {
        if (containsKey(key)) {
            return Long.parseLong(get(key));
        } else {
            return defaultValue;
        }
    }
}
