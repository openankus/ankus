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
package org.openflamingo.model.hive;

import org.openflamingo.model.rest.ExtJSTreeNode;

import java.util.Map;

/**
 * HCatalog의 데이터베이스 정보를 JSON으로 주고 받기 위한 데이터베이스 모델.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class Database extends ExtJSTreeNode {

    /**
     * Database's name
     */
    private String name;

    /**
     * Database's comment
     */
    private String comment;

    /**
     * Database's location
     */
    private String location;

    /**
     * Database's properties
     */
    private Map<String, String> properties;

    public Database() {
    }

    public Database(String name) {
        this.name = name;
    }

    public Database(String name, String comment) {
        this.name = name;
        this.comment = comment;
    }

    public Database(String name, String comment, String location) {
        this.name = name;
        this.comment = comment;
        this.location = location;
    }

    /**
     * Default Constructore.
     *
     * @param name       Database's name
     * @param comment    Database's comment
     * @param location   Database's location
     * @param properties Database's properties
     */
    public Database(String name, String comment, String location, Map<String, String> properties) {
        this.name = name;
        this.comment = comment;
        this.location = location;
        this.properties = properties;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "Database{" +
                "name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", location='" + location + '\'' +
                ", properties=" + properties +
                '}';
    }
}
