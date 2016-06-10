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

import org.apache.hadoop.conf.Configuration;
import org.openflamingo.collector.JobContext;
import org.openflamingo.core.exception.SystemException;
import org.openflamingo.model.collector.Cluster;
import org.openflamingo.model.collector.Property;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.StringUtils;

import java.util.List;

/**
 * Abstract Handler.
 *
 * @author Edward KIM
 * @since 0.2
 */
public abstract class DefaultHandler implements Handler {

    /**
     * HDFS URL에 대한 Hadoop Configuration Key
     */
    public final static String HDFS_URL = "fs.default.name";

    /**
     * Job Tracker에 대한 Hadoop Configuration Key
     */
    public final static String JOB_TRACKER = "mapred.job.tracker";

    /**
     * Hadoop Cluster의 이름으로 Cluster의 Hadoop Configuration을 생성한다.
     *
     * @param jobContext  Job Context
     * @param clusterName Hadoop Cluster명
     * @return {@link org.apache.hadoop.conf.Configuration}
     */
    public Configuration getConfiguration(JobContext jobContext, String clusterName) {
        org.apache.hadoop.conf.Configuration configuration = new org.apache.hadoop.conf.Configuration();
        List<Cluster> clusters = jobContext.getModel().getClusters().getCluster();
        for (Cluster cluster : clusters) {
            if (clusterName.equals(cluster.getName())) {
                configuration.set(HDFS_URL, cluster.getFsDefaultName());
                configuration.set(JOB_TRACKER, cluster.getMapredJobTracker());

                List<Property> properties = cluster.getProperties().getProperty();
                for (Property property : properties) {
                    configuration.set(property.getName(), property.getValue());
                }
            }
        }
        return configuration;
    }

    /**
     * 지정한 값이 비어있지 않은지 확인한다.
     *
     * @param value 확인할 문자열
     * @return 입력한 확인할 문자열
     * @throws org.openflamingo.core.exception.SystemException 빈 값이거나 NULL인 경우
     */
    protected String assertNotEmpty(String value) {
        if (StringUtils.isEmpty(value)) {
            throw new SystemException(ExceptionUtils.getMessage("NULL 값이거나 파라미터의 값이 비어있습니다.", value));
        }
        return value;
    }

}
