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

import java.util.List;

/**
 * JAR 파일과 같은 Artifact를 로딩하는 loader의 추상화 인터페이스.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface ArtifactLoader {

    /**
     * Artifact를 로딩한다.
     *
     * @param groupId    Maven Group Id
     * @param artifactId Maven Artifact Id
     * @param version    Artifact Version
     * @return 실제 Artifact가 있는 물리 경로의 위치
     */
    String load(String groupId, String artifactId, String version);

    /**
     * Artifact를 로딩한다.
     *
     * @param artifactIdentifier Artitact 식별자(<tt>groupId:artifactId:version</tt>)
     * @return 실제 Artifact가 있는 물리 경로의 위치
     */
    String loadArtifact(String artifactIdentifier);

    /**
     * Artifact를 로딩한다.
     *
     * @param artifactIdentifiers Artitact 식별자(<tt>groupId:artifactId:version</tt>)
     * @return 실제 Artifact가 있는 물리 경로의 위치
     */
    List<String> loadArtifacts(List<String> artifactIdentifiers);

    /**
     * Artifact를 로딩한다.
     *
     * @param filename 다운로드할 Artifact의 파일명
     * @return 실제 Artifact가 있는 물리 경로의 위치
     */
    String load(String filename);

}
