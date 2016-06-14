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

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * ELUtils에 대한 단위 테스트 케이스.
 *
 * @author Edward KIM
 * @since 0.3
 */
public class ELServiceInitiatorTest {

    /**
     * 모든 조건에 충족하는 경우 정상적으로 처리하는지 확인한다.
     */
    @Test
    public void evaluate() throws Exception {
        Properties props = new Properties();
        props.put("rain", "/rain/upload");
        props.put("path", "${rain}");
        props.put("basedir", "${path}");
        props.put("user", "users");
        props.put("group", "${user}");

        Map<String, String> constants = new HashMap<String, String>();
        constants.put("KB", "org.openflamingo.el.ELConstantsFunctions#KB");

        Map<String, String> functions = new HashMap<String, String>();
        functions.put("trim", "org.openflamingo.el.ELConstantsFunctions#trim");
        functions.put("dateFormat", "org.openflamingo.el.ELConstantsFunctions#dateFormat");

        ELServiceInitiator initiator = new ELServiceInitiator();
        ELServiceImpl service = initiator.getELService(constants, functions);

        String value = "${basedir}/${group}/${sun.cpu.endian}/${dateFormat('yyyy')}";
        String evaluated = ELUtils.evaluate(service.createEvaluator(), props, value);
        Assert.assertEquals("/rain/upload/users/little/2014", evaluated);
    }

    /**
     * 해석이 불가능한 Expression이 포함되어 있는 경우 예외가 발생하는지 여부를 확인한다.
     */
    @Test(expected = ELEvaluationException.class)
    public void evaluateWhenNotExists() throws Exception {
        Properties props = new Properties();
        props.put("rain", "/rain/upload");
        props.put("path", "${rain}");
        props.put("basedir", "${path}");
        props.put("user", "users");
        props.put("group", "${user}");

        Map<String, String> constants = new HashMap<String, String>();
        constants.put("KB", "org.openflamingo.el.ELConstantsFunctions#KB");

        Map<String, String> functions = new HashMap<String, String>();
        functions.put("trim", "org.openflamingo.el.ELConstantsFunctions#trim");
        functions.put("dateFormat", "org.openflamingo.el.ELConstantsFunctions#dateFormat");

        ELServiceInitiator initiator = new ELServiceInitiator();
        ELServiceImpl service = initiator.getELService(constants, functions);

        String value = "${basedir}/${group1}/${sun.cpu.endian}/${dateFormat('yyyy')}";
        String evaluated = ELUtils.evaluate(service.createEvaluator(), props, value);
    }
}
