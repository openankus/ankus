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

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * FormatterUtils의 단위 테스트 케이스.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class FormatterUtilsTest {

    @Test
    public void formatResultSet2() throws Exception {
        StringBuilder builder = new StringBuilder();
        String[] headers = {"Workflow ID", "Workflow Name", "Username", "Description", "Start"};
        List<Object[]> values = new ArrayList<Object[]>();
        values.add(new String[]{"WF_20120801_1", "Seoul Rain Put Job", "user", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801_2", "Hello World Job", "fharenheit", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801_100", "Seoul Rain Get Job", "user", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801_14", "Hello World", "user", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801", "Hello World", "user", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801_111", "Hello World", "user", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801_1111", "Hello World", "user", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801_4", "Hello World", "user", "Hello", "2012-08-12 11:11:11"});
        values.add(new String[]{"WF_20120801_5", "Hello World", "user", "Hello", "2012-08-12 11:11:11"});
        System.out.println(FormatterUtils.formatResultSet(headers, values));
    }
}
