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
package org.openflamingo.el;

import com.google.common.base.Joiner;
import org.slf4j.helpers.MessageFormatter;

import java.util.*;

/**
 * EL Service를 Standalone Application에서 사용하기 위한 초기화
 *
 * @author Edward KIM
 * @since 0.2
 */
public class ELServiceInitiator {

    /**
     * EL Service를 초기화한다.
     *
     * @param constants 상수가 Key, 값이 Value
     * @param functions 함수가 Key, 값이 Value
     * @return EL Service
     * @throws Exception EL Service를 초기화할 수 없는 경우
     */
    public static ELServiceImpl getELService(Map<String, String> constants, Map<String, String> functions) throws Exception {
        ELServiceImpl service = new ELServiceImpl();
        service.setDefinitions(getDefinitions(constants, functions));
        service.afterPropertiesSet();
        return service;
    }

    /**
     * EL Service의 함수 및 상수를 담고 있는 map을 반환한다.
     *
     * @param constants 상수가 Key, 값이 Value
     * @param functions 함수가 Key, 값이 Value
     * @return 함수와 상수를 포함하는 Map
     */
    private static Map<String, String> getDefinitions(Map<String, String> constants, Map<String, String> functions) {
        Map<String, String> definitions = new HashMap<String, String>();
        definitions.put(ELServiceImpl.CONF_CONSTANTS, getDefinitions(constants));
        definitions.put(ELServiceImpl.CONF_FUNCTIONS, getDefinitions(functions));
        return definitions;
    }

    /**
     * EL Service의 Comma Separated EL 정의 문자열을 반환한다.
     *
     * @param keyValue 함수 또는 상수가 Key, 값이 Value
     * @return EL Service의 Comma Separated EL 정의 문자열
     */
    private static String getDefinitions(Map<String, String> keyValue) {
        Set<String> keys = keyValue.keySet();
        List<String> list = new ArrayList<String>();
        for (String key : keys) {
            String value = keyValue.get(key);
            list.add(MessageFormatter.format("{}={}", key, value).getMessage());
        }
        return Joiner.on(",").join(list);
    }
}
