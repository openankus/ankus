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
package org.openflamingo.fs;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.openflamingo.core.exception.ServiceException;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ServiceExceptionTranslatorInterceptor implements MethodInterceptor, Serializable {

    private static final long serialVersionUID = 1L;

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        try {
            Method method = invocation.getMethod();
            return invocation.proceed();
        } catch (Throwable e) {
            throw translateException(e);
        }
    }

    static RuntimeException translateException(Throwable e) {
        ServiceException serviceException = new ServiceException();
        try {
            serviceException.setStackTrace(e.getStackTrace());
            serviceException.setMessage(e.getClass().getName() + ": " + e.getMessage());
            getField(Throwable.class, "detailMessage").set(serviceException, e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                getField(Throwable.class, "cause").set(serviceException, translateException(cause));
            }
        } catch (IllegalArgumentException e1) {
            // Should never happen, ServiceException is an instance of Throwable
        } catch (IllegalAccessException e2) {
            // Should never happen, we've set the fields to accessible
        } catch (NoSuchFieldException e3) {
            // Should never happen, we know 'detailMessage' and 'cause' are valid fields
        }
        return serviceException;
    }

    static Field getField(Class<?> clazz, String fieldName) throws NoSuchFieldException {
        Field f = clazz.getDeclaredField(fieldName);
        if (!f.isAccessible()) {
            f.setAccessible(true);
        }
        return f;
    }
}
