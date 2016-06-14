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
package org.openflamingo.web.core;

import org.openflamingo.model.rest.Engine;

/**
 * Remote Service Interface.
 *
 * @author Edward KIM
 * @since 0.5
 */
public interface RemoteService {

    public static final String HIVE = "hive";

    public static final String JOB = "job";

    public static final String HDFS = "hdfs";

    public static final String AUDIT = "audit";
    
    public static final String MONITORING = "monitoring";

    /**
     * 지정한 워크플로우 엔진의 서비스를 반환한다.
     *
     * @param serviceName 서비스명
     * @param engine      워크플로우 엔진
     * @return 리모트 서비스
     */
    Object getService(String serviceName, Engine engine);

}
