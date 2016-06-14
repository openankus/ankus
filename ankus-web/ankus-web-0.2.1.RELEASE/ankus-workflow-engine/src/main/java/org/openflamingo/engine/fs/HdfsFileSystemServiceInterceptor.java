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
package org.openflamingo.engine.fs;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.openflamingo.model.rest.Context;
import org.openflamingo.provider.locale.ResourceBundleRetreiver;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import java.io.Serializable;

public class HdfsFileSystemServiceInterceptor implements MethodInterceptor, Serializable, ApplicationContextAware {

    private static final long serialVersionUID = 1L;

    /**
     * Spring Framework Applicaton Context
     */
    private ApplicationContext applicationContext;

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        ResourceBundleRetreiver retreiver = applicationContext.getBean(ResourceBundleRetreiver.class);
        try {
            Object[] arguments = invocation.getArguments();
            for (Object argument : arguments) {
                if (Context.class.equals(argument.getClass())) {
                    Context context = (Context) argument;
                    context.putObject(ResourceBundleRetreiver.KEY, retreiver);
                    break;
                }
            }
            return invocation.proceed();
        } catch (Throwable e) {
            throw e;
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

}
