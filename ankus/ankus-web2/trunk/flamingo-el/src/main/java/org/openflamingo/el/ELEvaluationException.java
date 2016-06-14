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

import org.openflamingo.core.exception.SystemException;

/**
 * 파일 시스템을 처리할 수 없는 경우 던지는 예외.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class ELEvaluationException extends SystemException {

    private static final long serialVersionUID = 1;

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public ELEvaluationException(String message) {
        super(message);
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public ELEvaluationException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * 기본 생성자.
     *
     * @param cause 예외 원인
     */
    public ELEvaluationException(Throwable cause) {
        super(cause);
    }

}