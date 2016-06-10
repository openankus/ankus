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
package org.openflamingo.web.designer;

import java.util.Map;

import org.openflamingo.model.rest.Workflow;

public interface DesignerService {

    /**
     * Workflow Id로 Workflow를
     *
     * @param id Workflow의 식별자
     * @return Workflow
     */
    Workflow getWorkflow(long id);

    /**
     * 신규로 Workflow를 등록한다.
     *
     * @param parentTreeId 부모 Tree의 식별자
     * @param xml          Designer XML
     * @param username     Username
     * @return 새로 저장한 Workflow
     */
    Workflow regist(String parentTreeId, String xml, String username);

    /**
     * 이미 등록되어 있는 Workflow를 업데이트한다.
     *
     * @param treeId   Tree의 식별자
     * @param id       Workflow의 식별자
     * @param xml      Designer XML
     * @param username Username
     * @return 업데이트한 Workflow
     */
    Workflow update(Long treeId, Long id, String xml, String username);

    /**
     * 워크플로우를 로딩한다.
     *
     * @param id Workflow의 식별자
     * @return 로딩한 Workflow
     */
    String load(long id);

    /**
     * 워크플로우를 실행한다.
     *
     * @param id       Workflow의 식별자
     * @param engineId Workflow Engine의 식별자
     */
    void run(Long id, Long engineId);

  //  String visulization_run(Long id, Long engineId, String jarparams);    

    /**
     * 지정한 워크플로우를 삭제한다.
     *
     * @param treeId     삭제할 워크플로우의 Tree 식별자
     * @param workflowId 삭제할 워크플로우의 식별자
     */
    void delete(Long treeId, Long workflowId);

    //void getCacheClear(Long engineId);
    
    String getCacheClear(Long engineId);

}
