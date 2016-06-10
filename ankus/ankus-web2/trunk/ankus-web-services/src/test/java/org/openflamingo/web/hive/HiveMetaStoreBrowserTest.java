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
package org.openflamingo.web.hive;

import com.google.common.base.Joiner;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.slf4j.helpers.MessageFormatter.arrayFormat;
import static org.slf4j.helpers.MessageFormatter.format;

/**
 * Description.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class HiveMetaStoreBrowserTest {

    public static void main(String[] args) throws IOException {
        String json = "{\"tableName\":\"ankus\",\"comment\":\"ANKUS Sample DB\",\"location\":\"/prd-eu-usr-log/helloworld/htables/ankus\",\"delimiter\":\",\",\"columns\":[{\"name\":\"asdf\",\"type\":\"STRING\",\"comment\":\"\"},{\"name\":\"adsf\",\"type\":\"STRING\",\"comment\":\"\"}],\"partitions\":[{\"name\":\"aaaa\",\"type\":\"STRING\",\"comment\":\"\"},{\"name\":\"adfadfa\",\"type\":\"STRING\",\"comment\":\"\"}]} ";
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(json);

        System.out.println(arrayFormat("CREATE TABLE {} ({}) COMMENT '{}' {} {} {} {}", new String[]{
                getTableName("", jsonNode.get("tableName").getTextValue()),
                getColumns(jsonNode.findValue("columns").getElements()),
                jsonNode.get("comment").getTextValue(),
                getPartitions(jsonNode.findValue("partitions").getElements()),
                getDelimiter(jsonNode.get("delimiter").getTextValue()),
                getLineTerminator(""),
                getLocation(jsonNode.get("location").getTextValue())

        }).getMessage());

    }

    public static String getPartitions(Iterator<JsonNode> iterator) {
        return format("PARTITIONED BY ({})", getColumns(iterator)).getMessage();
    }

    public static String getDelimiter(String delimiter) {
        if (!StringUtils.isEmpty(delimiter)) {
            return format("ROW FORMAT DELIMITED FIELDS TERMINATED BY '{}'", delimiter).getMessage();
        }
        return "";
    }

    public static String getLineTerminator(String terminator) {
        if (!StringUtils.isEmpty(terminator)) {
            return format("LINES TERMINATED BY '{}'", terminator).getMessage();
        }
        return "LINES TERMINATED BY '\\n'";
    }

    public static String getColumns(Iterator<JsonNode> iterator) {
        List<String> columns = new ArrayList();
        while (iterator.hasNext()) {
            JsonNode node = iterator.next();
            if (StringUtils.isEmpty(node.get("comment").getTextValue())) {
                columns.add(arrayFormat("{} {}", new Object[]{node.get("name").getTextValue(), node.get("type").getTextValue()}).getMessage());
            } else {
                columns.add(arrayFormat("{} {} COMMENT '{}'", new Object[]{node.get("name").getTextValue(), node.get("type").getTextValue(), node.get("comment").getTextValue()}).getMessage());
            }
        }
        return Joiner.on(", ").join(columns);
    }

    public static String getTableName(String db, String table) {
        if (!StringUtils.isEmpty(db) && !StringUtils.isEmpty(table)) {
            return format("{}.{}", db, table).getMessage();
        } else if (StringUtils.isEmpty(db) && !StringUtils.isEmpty(table)) {
            return format("{}", table).getMessage();
        }
        throw new IllegalArgumentException("Database and table is null value");
    }

    public static String getLocation(String location) {
        if (!StringUtils.isEmpty(location)) {
            return "LOCATION '" + location + "'";
        }
        return "";
    }
}
