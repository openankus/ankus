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
package org.openflamingo.engine.handler;

import java.util.HashMap;
import java.util.Map;

/**
 * Workflow JAXB Object의 Model에 대응하는 Handler 매핑 정보를 유지하는 Registry.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class ActionHandlerRegistry {

    /**
     * Workflow JAXB Object의 Model에 대응하는 Handler 매핑 정보
     */
    private static Map<String, Class> handlerMap = new HashMap<String, Class>();

    static {
        handlerMap.put("org.openflamingo.model.workflow.Mapreduce", MapReduceHandler.class);
        handlerMap.put("org.openflamingo.model.workflow.NodeType", StartHandler.class);
        handlerMap.put("org.openflamingo.model.workflow.BaseType", EndHandler.class);
        handlerMap.put("org.openflamingo.model.workflow.Pig", PigHandler.class);
        handlerMap.put("org.openflamingo.model.workflow.Shell", ShellHandler.class);
//        handlerMap.put("org.openflamingo.model.workflow.Hive", HiveHandler.class);
//        handlerMap.put("org.openflamingo.model.workflow.Java", JavaHandler.class);
    }

    /**
     * Workflow JAXB Object의 Model 노드를 처리하는 Handler 클래스를 반환한다.
     *
     * @param node Workflow JAXB Object의 Model 노드
     * @return Handler 클래스
     */
    public static Class getClass(Object node) {
        return handlerMap.get(node.getClass().getName());
    }
}