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

import org.openflamingo.model.workflow.NodeType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Workflow JAXB Object의 {@link org.openflamingo.model.workflow.NodeType} Model을 실행하는 Handler.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class StartHandler extends DefaultHandler<NodeType> {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(StartHandler.class);

    /**
     * Workflow JAXB Object의 {@link org.openflamingo.model.workflow.NodeType} Model
     */
    private NodeType start;

    /**
     * 기본 생성자.
     *
     * @param start Workflow JAXB Object의 {@link org.openflamingo.model.workflow.NodeType} Model
     */
    public StartHandler(Object start) {
        this.start = (NodeType) start;
    }

    @Override
    void before() {
    }

    @Override
    void after() {
    }

    @Override
    public void executeInternal() {
        logger.info("Now Start Handler running....");
    }

    @Override
    public NodeType getModel() {
        return start;
    }

}
