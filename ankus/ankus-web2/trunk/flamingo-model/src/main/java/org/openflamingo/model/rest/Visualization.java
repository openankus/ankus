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
import java.util.Map;

/**
 * Visualization Domain Object.
 *
 * @author Jaesung Ahn
 */
public class Visualization implements Serializable {
	
	private static final long serialVersionUID = 1;
	
			private long engine;
	
    private String jar;

    private String chartType;

    private String input;

    private String useFirstRecord;

    private String delimiter;

    private String title;

    private Map chartParam;


    public Visualization() {
    }

    




public long getEngine() {
		return engine;
	}






	public void setEngine(long engine) {
		this.engine = engine;
	}






public String getJar() {
		return jar;
	}


	public void setJar(String jar) {
		this.jar = jar;
	}


	public String getChartType() {
		return chartType;
	}


	public void setChartType(String chartType) {
		this.chartType = chartType;
	}


	public String getInput() {
		return input;
	}


	public void setInput(String input) {
		this.input = input;
	}




	public String getUseFirstRecord() {
		return useFirstRecord;
	}






	public void setUseFirstRecord(String useFirstRecord) {
		this.useFirstRecord = useFirstRecord;
	}






	public String getDelimiter() {
		return delimiter;
	}


	public void setDelimiter(String delimiter) {
		this.delimiter = delimiter;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public Map getChartParam() {
		return chartParam;
	}


	public void setChartParam(Map chartParam) {
		this.chartParam = chartParam;
	}

	@Override
	public String toString() {
		return "Visualization [jar=" + jar + ", chartType=" + chartType
				+ ", input=" + input + ", useFirstRecord=" + useFirstRecord
				+ ", delimiter=" + delimiter + ", title=" + title
				+ ", chartParam=" + chartParam + "]";
	}



}