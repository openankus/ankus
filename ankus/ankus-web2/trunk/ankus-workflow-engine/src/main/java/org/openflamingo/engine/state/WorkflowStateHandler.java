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
package org.openflamingo.engine.state;

import org.openflamingo.engine.context.WorkflowContext;
import org.openflamingo.model.rest.WorkflowHistory;

/**
 * Workflow의의 상태를 처리하는 핸들러. Workflow의의 상태가 여러 종류인 경우 각각의 상태에 따라서 핸들러를 구현해야 한다.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface WorkflowStateHandler {

    /**
     * Workflow의 상태를 변경한다.
     *
     * @param workflowContext {@link org.openflamingo.engine.context.WorkflowContext}
     */
    WorkflowHistory changeStatus(WorkflowContext workflowContext);

}
