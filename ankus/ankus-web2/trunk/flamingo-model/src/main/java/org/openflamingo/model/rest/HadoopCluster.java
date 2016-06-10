
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
package org.openflamingo.model.rest;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "id",
        "name",
        "namenodeProtocol",
        "namenodeIP",
        "namenodePort",
        "hdfsUrl",
        "jobTrackerIP",
        "jobTrackerPort",
        "namenodeConsole",
        "jobTrackerConsole",
        "namenodeMonitoringPort",
        "jobTrackerMonitoringPort"
})
@XmlRootElement(name = "hadoopCluster")
@JsonAutoDetect(
        getterVisibility = JsonAutoDetect.Visibility.ANY,
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.ANY
)
@JsonIgnoreProperties
public class HadoopCluster implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String name;

    private String namenodeProtocol;

    private String namenodeIP;

    private int namenodePort;

    private String hdfsUrl;

    private String jobTrackerIP;

    private int jobTrackerPort;

    private String namenodeConsole;

    private String jobTrackerConsole;

    private String namenodeMonitoringPort;

    private String jobTrackerMonitoringPort;

    public HadoopCluster() {
    }

    public HadoopCluster(String hdfsUrl) {
        this.hdfsUrl = hdfsUrl;
    }

    public HadoopCluster(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNamenodeProtocol() {
        return namenodeProtocol;
    }

    public void setNamenodeProtocol(String namenodeProtocol) {
        this.namenodeProtocol = namenodeProtocol;
    }

    public String getNamenodeIP() {
        return namenodeIP;
    }

    public void setNamenodeIP(String namenodeIP) {
        this.namenodeIP = namenodeIP;
    }

    public int getNamenodePort() {
        return namenodePort;
    }

    public void setNamenodePort(int namenodePort) {
        this.namenodePort = namenodePort;
    }

    public String getHdfsUrl() {
        return hdfsUrl;
    }

    public void setHdfsUrl(String hdfsUrl) {
        this.hdfsUrl = hdfsUrl;
    }

    public String getJobTrackerIP() {
        return jobTrackerIP;
    }

    public void setJobTrackerIP(String jobTrackerIP) {
        this.jobTrackerIP = jobTrackerIP;
    }

    public int getJobTrackerPort() {
        return jobTrackerPort;
    }

    public void setJobTrackerPort(int jobTrackerPort) {
        this.jobTrackerPort = jobTrackerPort;
    }

    public String getNamenodeConsole() {
        return namenodeConsole;
    }

    public void setNamenodeConsole(String namenodeConsole) {
        this.namenodeConsole = namenodeConsole;
    }

    public String getJobTrackerConsole() {
        return jobTrackerConsole;
    }

    public void setJobTrackerConsole(String jobTrackerConsole) {
        this.jobTrackerConsole = jobTrackerConsole;
    }

    public String getNamenodeMonitoringPort() {
        return namenodeMonitoringPort;
    }

    public void setNamenodeMonitoringPort(String namenodeMonitoringPort) {
        this.namenodeMonitoringPort = namenodeMonitoringPort;
    }

    public String getJobTrackerMonitoringPort() {
        return jobTrackerMonitoringPort;
    }

    public void setJobTrackerMonitoringPort(String jobTrackerMonitoringPort) {
        this.jobTrackerMonitoringPort = jobTrackerMonitoringPort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HadoopCluster that = (HadoopCluster) o;

        if (id != that.id) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
