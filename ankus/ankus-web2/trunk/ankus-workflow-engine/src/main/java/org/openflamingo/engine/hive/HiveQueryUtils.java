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
package org.openflamingo.engine.hive;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HiveQueryUtils {

    private static Pattern COMMENT_PATTERN = Pattern.compile("\\-\\-.*?\\n");
    private static Pattern BLANK_LINE_PATTERN = Pattern.compile("\\n+");
    private static Pattern VARIABLE_PATTERN = Pattern.compile("\\$\\{([0-9A-Za-z._]+)\\}");

    public static String removeComments(String query) {
        return COMMENT_PATTERN.matcher(query).replaceAll("");
    }

    public static String removeBlankLines(String query) {
        return BLANK_LINE_PATTERN.matcher(query).replaceAll("");
    }

    public static String applyVariables(String query, Map<String, String> variableMap) {
        Matcher matcher = VARIABLE_PATTERN.matcher(query);
        StringBuilder builder = new StringBuilder();
        int lastPosition = 0;

        while (matcher.find()) {
            String key = matcher.group(1);
            if (variableMap.containsKey(key)) {
                builder.append(query.substring(lastPosition, matcher.start()));
                builder.append(variableMap.get(key));
                lastPosition = matcher.end();
            }
        }

        builder.append(query.substring(lastPosition, query.length()));
        return builder.toString();
    }

    public static List<String> splitScriptToQueries(String script) {
        // TODO: Need an more elaborate method.
        return new ArrayList<>(Arrays.asList(script.split(";")));
    }
}
