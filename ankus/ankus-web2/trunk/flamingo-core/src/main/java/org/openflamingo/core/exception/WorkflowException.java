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
package org.openflamingo.core.exception;

/**
 * Hadoop Manager 전체에서 사용하는 런타임 예외.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class WorkflowException extends RuntimeException {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * 기본 생성자.
     */
    public WorkflowException() {
        super();
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public WorkflowException(String message) {
        super(message);
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public WorkflowException(String message, Throwable throwable) {
        super(message, throwable);
    }

    /**
     * 기본 생성자.
     */
    public WorkflowException(Throwable throwable) {
        super(throwable);
    }
}
