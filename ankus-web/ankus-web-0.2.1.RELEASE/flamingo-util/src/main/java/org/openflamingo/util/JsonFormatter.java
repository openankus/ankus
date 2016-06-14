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

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * JSON을 들여쓰기를 이용하여 포맷팅하는 Formatter.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class JsonFormatter {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(JsonFormatter.class);

    /**
     * 지정한 JSON을 포맷팅한다. 이 메소드는 디버그 용도로만 사용해야 한다.
     *
     * @param json JSON
     * @return Formatted JSON
     */
    public static String format(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(SerializationConfig.Feature.INDENT_OUTPUT, true);
            JsonNode tree = objectMapper.readTree(json);
            return objectMapper.writeValueAsString(tree);
        } catch (Exception ex) {
            logger.warn("Cannot format JSON. JSON is \n{}", json, ex);
            return json;
        }
    }
}
