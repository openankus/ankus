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

import org.junit.Assert;
import org.junit.Test;

import java.util.Properties;

/**
 * ELUtils에 대한 단위 테스트 케이스.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class ELUtilsTest {

    @Test
    public void resolve1() throws Exception {
        Properties props = new Properties();
        props.put("DATE", "20121111");
        props.put("group", "users");
        props.put("basedir", "/rain/upload");

        String value = "${basedir}/${group}/fharenheit/${DATE}/${dateFormat('yyyy')}/${dateFormat('MM')}/${dateFormat('dd')}";
        String resolved = ELUtils.resolve(props, value);
        Assert.assertEquals("/rain/upload/users/fharenheit/20121111/${dateFormat('yyyy')}/${dateFormat('MM')}/${dateFormat('dd')}", resolved);
    }

    @Test
    public void resolve2() throws Exception {
        Properties props = new Properties();
        props.put("user", "users");
        props.put("group", "${user}");

        String value = "/${group}/${sun.cpu.endian}/${dateFormat('yyyy')}/${dateFormat('MM')}/${dateFormat('dd')}";
        String resolved = ELUtils.resolve(props, value);
        Assert.assertEquals("/users/little/${dateFormat('yyyy')}/${dateFormat('MM')}/${dateFormat('dd')}", resolved);
    }

}
