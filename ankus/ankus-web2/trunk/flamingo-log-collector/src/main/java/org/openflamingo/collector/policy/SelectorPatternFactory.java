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
package org.openflamingo.collector.policy;

import org.openflamingo.collector.JobContext;
import org.openflamingo.core.exception.SystemException;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.ReflectionUtils;

import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;

/**
 * Selector Pattern Registry.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class SelectorPatternFactory {

    private static Map<String, Class> patterns = new HashMap<String, Class>();

    static {
        patterns.put("startWith", StartWithPattern.class);
        patterns.put("endWith", EndWithPattern.class);
        patterns.put("antPattern", AntPathPattern.class);
        patterns.put("datePattern", DatePattern.class);
        patterns.put("regEx", RegExPattern.class);
        patterns.put("size", SizePattern.class);
    }

    /**
     * 지정한 유형의 Selector Pattern을 새로 생성하여 반환한다.
     *
     * @param type       Selector Pattern의 식별자(예; startWith, endWith, antPattern, datePattern, regEx)
     * @param pattern    Selector Pattern에서 사용하는 문자열 패턴
     * @param jobContext Flamingo Log Collector Job Context
     * @return Selector Pattern
     */
    public static SelectorPattern getSelectorPattern(String type, String pattern, JobContext jobContext) {
        Class clazz = patterns.get(type);
        try {
            Constructor constructor = ReflectionUtils.getConstructorIfAvailable(clazz, new Class[]{String.class, JobContext.class});
            return (SelectorPattern) constructor.newInstance(pattern, jobContext);
        } catch (Exception ex) {
            throw new SystemException(ExceptionUtils.getMessage("Selector Pattern 클래스인 {}을 생성할 수 없습니다.", clazz.getClass().getName()), ex);
        }
    }

}
