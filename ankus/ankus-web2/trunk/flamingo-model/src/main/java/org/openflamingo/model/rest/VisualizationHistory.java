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

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

/**
 * Visualization Execution History Domain Object.
 *
 * @author Jaesung ahn
 */
public class VisualizationHistory implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String workflowId;

    private long jobId;

    private String jobStringId;

    private String visualizationHtml;

    private Timestamp create;
    
    public VisualizationHistory() {
    }

    public VisualizationHistory(long id) {
    	this.id = id;
    }

    public long getId() {
    	return id;
    }
    
    public void setId(long id) {
    	this.id = id;
    }
    
    public String getWorkflowId() {
    	return workflowId;
    }
    
    public void setWorkflowId(String workflowId) {
    	this.workflowId = workflowId;
    }
    
    public long getJobId() {
    	return jobId;
    }
    
    public void setJobId(long jobId) {
    	this.jobId = jobId;
    }
    
    public String getJobStringId() {
    	return jobStringId;
    }
    
    public void setJobStringId(String jobStringId) {
    	this.jobStringId = jobStringId;
    }
    
    
    public String getVisualizationHtml() {
    	return visualizationHtml;
    }
    
    public void setVisualizationHtml(String visualizationHtml) {
    	this.visualizationHtml = visualizationHtml;
    }
    
    public Timestamp getCreate() {
    	return create;
    }
    
    public void setCreate(Timestamp create) {
    	this.create = create;
    }
    
    @Override
    public boolean equals(Object o) {
    	if (this == o) return true;
    	if (o == null || getClass() != o.getClass()) return false;
    	
    	VisualizationHistory that = (VisualizationHistory) o;
    	
    	if (id != that.id) return false;
    	
    	return true;
    }
    
    @Override
    public int hashCode() {
    	return (int) (id ^ (id >>> 32));
    }

	@Override
	public String toString() {
		return "VisualizationHistory [id=" + id + ", workflowId=" + workflowId
				+ ", jobId=" + jobId + ", jobStringId=" + jobStringId
				+ ", visualizationHtml=" + visualizationHtml + ", create="
				+ create + "]";
	}

	

  
}