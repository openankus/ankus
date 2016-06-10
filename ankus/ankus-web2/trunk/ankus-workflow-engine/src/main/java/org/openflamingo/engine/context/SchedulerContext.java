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
package org.openflamingo.engine.context;

import org.quartz.JobExecutionContext;

/**
 * Scheduler Context.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public interface SchedulerContext {

    /**
     * 지정한 Key로 값을 추가한다.
     *
     * @param key    추가할 값의 식별자 Key
     * @param object 추가할 값
     */
    void put(String key, Object object);

    /**
     * 지정한 Key의 값을 반환한다.
     *
     * @param key 가져올 값의 식별자 Key
     * @return Key에 대한 값
     */
    Object get(String key);

    /**
     * Quartz Job Scheduler의 Job Execution Context를 반환한다.
     *
     * @return Quartz Job Scheduler의 Job Execution Context
     */
    JobExecutionContext getJobExecutionContext();
}
