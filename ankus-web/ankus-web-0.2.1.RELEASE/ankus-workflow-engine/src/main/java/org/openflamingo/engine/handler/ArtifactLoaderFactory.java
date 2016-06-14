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
 * JAR 파일과 같은 Artifact를 다운로드하는 Artifact Loader를 생성하는 Factory.
 * 다양한 환경에 따라서 Artifact를 로딩하는 전략이 다를 수 있으므로 다운로드하는 전략을 추가하기 위해서는
 * 여기에 Artifact Loader를 추가할 수 있다.
 * <p/>
 * <pre>
 * ArtifactLoader loader = ArtifactLoaderFactory.getArtifactLoader(context);
 * String fullyQualifiedPath = loader.load(filename);
 * </pre>
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class ArtifactLoaderFactory {

    /**
     * Artifact Loader를 생성한다.
     *
     * @param context Workflow Context
     * @return Artifact Loader의 구현체
     */
    public static ArtifactLoader getArtifactLoader(WorkflowContext context) {
        return new HdfsArtifactLoader(context);
    }

}
