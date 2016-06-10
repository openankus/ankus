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

import java.io.Serializable;

/**
 * HCatalog의 컬럼 정보를 JSON으로 주고 받기 위한 컬럼 모델.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class Column implements Serializable {

    /**
     * 컬럼명
     */
    private String name;

    /**
     * 컬럼의 유형
     */
    private String type;

    /**
     * 컬럼의 커멘트.
     */
    private String comment;

    /**
     * 카테고리.
     */
    private String category;

    public Column() {
    }

    public Column(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public Column(String name, String type, String comment) {
        this.name = name;
        this.type = type;
        this.comment = comment;
    }

    public Column(String name, String comment, String type, String category) {
        this.name = name;
        this.comment = comment;
        this.type = type;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Column{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", comment='" + comment + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
