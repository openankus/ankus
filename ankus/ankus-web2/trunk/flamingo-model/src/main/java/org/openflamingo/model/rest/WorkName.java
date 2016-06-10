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
import java.util.Date;

/**
 * Workflow Execution History Domain Object.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class WorkName implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;


    private String WorkName;
    private String WorkId;

   
    public String getWorkName() {
        return WorkName;
    }
    public String getWorkId() {
        return WorkId;
    }

    public void setWorkName(String WorkName) {
        this.WorkName = WorkName;
    }
    public void setWorkId(String WorkId) {
        this.WorkId = WorkId;
    }
   
    @Override
    public String toString() {
        return "WorkName{WorkName=" +WorkName + ",WorkId=" + WorkId + "}";
    }
}