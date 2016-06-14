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
package org.openflamingo.fs.audit;

import org.openflamingo.provider.fs.FileSystemAuditService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.AfterReturningAdvice;

import java.lang.reflect.Method;

public class AuditLoggingAdvice implements AfterReturningAdvice {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(AuditLoggingAdvice.class);

    /**
     * File System Audit Service.
     */
    private FileSystemAuditService auditService;

    /**
     * Callback after a given method successfully returned.
     *
     * @param returnValue the value returned by the method, if any
     * @param method      method being invoked
     * @param args        arguments to the method
     * @param target      target of the method invocation. May be {@code null}.
     * @throws Throwable if this object wishes to abort the call.
     *                   Any exception thrown will be returned to the caller if it's
     *                   allowed by the method signature. Otherwise the exception
     *                   will be wrapped as a runtime exception.
     */
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        logger.debug("{}", method.getName());
    }

    public void setAuditService(FileSystemAuditService auditService) {
        this.auditService = auditService;
    }
}