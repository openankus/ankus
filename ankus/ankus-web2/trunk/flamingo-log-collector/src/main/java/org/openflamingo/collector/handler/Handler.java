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
package org.openflamingo.collector.handler;

/**
 * Ingress 처리를 하는 핸들러 인터페이스.
 *
 * @author Edward KIM
 * @since 0.1
 */
public interface Handler {

    /**
     * 핸들러를 실행한다.
     *
     * @throws Exception 핸들러가 정상적으로 실행할 수 없는 경우
     */
    void execute() throws Exception;

    /**
     * 동작을 위한 기본 조건이 준비되었는지 검증한다.
     */
    void validate();

}
