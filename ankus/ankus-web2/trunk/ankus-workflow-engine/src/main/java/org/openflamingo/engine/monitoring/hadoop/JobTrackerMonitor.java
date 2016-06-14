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
package org.openflamingo.engine.monitoring.hadoop;

import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.JobQueueInfo;
import org.apache.hadoop.mapred.JobStatus;

import java.io.IOException;

public class JobTrackerMonitor {

    public void printJobs() throws IOException {
        JobConf conf = new JobConf();
        conf.set("mapred.job,tracker", "localhost:9001");

        JobClient jobClient = new JobClient(conf);
        JobStatus[] allJobs = jobClient.getAllJobs();
        if (allJobs != null) {
            for (JobStatus status : allJobs) {
                System.out.println(status.getJobID());
                System.out.println(status.getSchedulingInfo());
            }
        }

        System.out.println(jobClient.getClusterStatus().getMapTasks());

        JobQueueInfo[] queues = jobClient.getQueues();
        if (queues != null)
            for (JobQueueInfo queue : queues) {
                System.out.println(queue.getQueueName());
                System.out.println(queue.getSchedulingInfo());
                System.out.println(queue.getQueueState());
            }

        JobStatus[] jobStatuses = jobClient.jobsToComplete();
        if (jobStatuses != null)
            for (JobStatus jobStatus : jobStatuses) {
                System.out.println(jobStatus.getJobID().getId());
                System.out.println(jobStatus.getSchedulingInfo()
                );
            }
    }

    public static void main(String[] args) throws IOException {
        JobTrackerMonitor monitor = new JobTrackerMonitor();
        monitor.printJobs();
    }
}
