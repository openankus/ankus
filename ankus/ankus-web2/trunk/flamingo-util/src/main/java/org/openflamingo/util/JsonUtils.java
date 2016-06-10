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
package org.openflamingo.util;

import org.codehaus.jackson.map.ObjectMapper;

import java.io.IOException;

/**
 * Jackson JSON Utility.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class JsonUtils {

    /**
     * Jackson JSON Object Mapper
     */
    private static ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 지정한 Object를 Jackson JSON Object Mapper를 이용하여 JSON으로 변환한다.
     *
     * @param obj JSON으로 변환할 Object
     * @return JSON String
     * @throws java.io.IOException JSON으로 변환할 수 없는 경우
     */
    public static String marshal(Object obj) throws IOException {
        return objectMapper.writeValueAsString(obj);
    }


    /**
     * 지정한 Object를 Jackson JSON Object Mapper를 이용하여 JSON으로 변환한다.
     *
     * @param obj JSON으로 변환할 Object
     * @return JSON String
     * @throws java.io.IOException JSON으로 변환할 수 없는 경우
     */
    public static String format(Object obj) throws IOException {
        return objectMapper.defaultPrettyPrintingWriter().writeValueAsString(obj);
    }

}
