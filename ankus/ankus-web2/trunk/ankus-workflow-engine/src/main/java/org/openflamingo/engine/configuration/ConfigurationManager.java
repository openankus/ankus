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

import org.apache.commons.lang.StringUtils;
import org.openflamingo.el.ELUtils;
import org.openflamingo.model.site.Configuration;
import org.openflamingo.model.site.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Flamingo Site XML의 Property Key Value 값을 관리하는 Configuration Manager.
 *
 * @author Byoung Gon, Kim
 * @since 0.1
 */
@Component
public class ConfigurationManager implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ConfigurationManager.class);

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
     * System Properties 적용 여부
     */
    private
    @Value("#{config['system.properties.apply']}")
    boolean applySystemProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
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

        // if applySystemProperties = true, then inject System Properties to Map
        if (applySystemProperties) {
            Properties props = System.getProperties();
            Enumeration<?> names = props.propertyNames();
            while (names.hasMoreElements()) {
                String name = (String) names.nextElement();
                String value = System.getProperty(name);
                map.put(name, value);
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

    /**
     * EL이 Resolved된 Key를 포함하는 Property List로 반환한다.
     *
     * @return Resolved Key의 Property List
     */
    public List<Property> resolvedProperties() {
        List<Property> properties = new ArrayList<Property>();
        Set<String> keys = map.keySet();
        for (String key : keys) {
            String value = map.get(key);
            logger.debug("Key '{}' :: Value '{}' ==> Resovled Value '{}'", new String[]{
                    key, value, get(key)
            });
            if (propertyMap.get(key).isExpose()) {
                properties.add(new Property(key, get(key), propertyMap.get(key).isExpose()));
            }
        }
        return properties;
    }

    ////////////////////////////////////////////////////
    // Spring Framework Setter Injection
    ////////////////////////////////////////////////////

    /**
     * {@link org.openflamingo.model.site.Configuration}을 설정한다.
     *
     * @param configuration {@link org.openflamingo.model.site.Configuration}
     */
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }
}
