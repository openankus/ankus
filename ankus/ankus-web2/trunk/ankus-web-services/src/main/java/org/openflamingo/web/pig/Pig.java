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
package org.openflamingo.web.pig;

import java.io.Serializable;
import java.sql.Timestamp;

public class Pig implements Serializable {

    public Long scriptId;

    public String username;

    public String scriptName;

    public String script;

    private Timestamp createDate;

    public Pig() {
    }

    public Long getScriptId() {
        return scriptId;
    }

    public void setScriptId(Long scriptId) {
        this.scriptId = scriptId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getScriptName() {
        return scriptName;
    }

    public void setScriptName(String scriptName) {
        this.scriptName = scriptName;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
        this.createDate = createDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Pig pig = (Pig) o;

        if (scriptId != null ? !scriptId.equals(pig.scriptId) : pig.scriptId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return scriptId != null ? scriptId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Pig{" +
                "scriptId=" + scriptId +
                ", username='" + username + '\'' +
                ", scriptName='" + scriptName + '\'' +
                ", script='" + script + '\'' +
                ", createDate=" + createDate +
                '}';
    }
}