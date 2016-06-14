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
package org.openflamingo.provider.engine;

import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.model.rest.Workflow;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface JobService extends PigSupport, HiveSupport {

    /**
     * 워크플로우를 실행한다.
     *
     * @param workflow      Workflow
     * @param hadoopCluster Hadoop Cluster
     * @return Job ID
     */
    String run(Workflow workflow, HadoopCluster hadoopCluster);

    /**
     * 지정한 Job을 강제 종료한다.
     *
     * @param jobId Job ID
     */
    void kill(long jobId);

    /**
     * Job을 등록한다.
     *
     * @param jobId          Job ID
     * @param jobName        Job Name
     * @param workflow       Workflow
     * @param cronExpression Cron Expression
     * @param hashMap        Job Variables
     * @param hadoopCluster  Hadoop Cluster
     * @return Job ID
     */
    String regist(long jobId, String jobName, Workflow workflow, String cronExpression, HashMap hashMap, HadoopCluster hadoopCluster);

    /**
     * 스케줄러의 등록되어 있는 모든 작업을 반환한다.
     *
     * @return 작업 목록
     */
    List<Map> getJobs();

    /**
     * 현재 시간을 반환한다.
     *
     * @return 현재 시간
     */
    long getCurrentDate();

}
