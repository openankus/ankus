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

import org.openflamingo.engine.context.WorkflowContext;

/**
 * Workflow JAXB Object의 Model을 처리하는 Handler Interface.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface Handler<T> {

    /**
     * 노드를 처리하는 Handler를 실행한다.
     *
     * @param context {@link org.openflamingo.engine.context.WorkflowContext}
     */
    void execute(WorkflowContext context);

    /**
     * Workflow JAXB Object의 Model을 반환한다.
     *
     * @return Workflow JAXB Object
     */
    T getModel();
}
