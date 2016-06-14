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

import org.apache.hcatalog.data.schema.HCatFieldSchema;
import org.openflamingo.model.rest.ExtJSTreeNode;

import java.util.ArrayList;
import java.util.List;

/**
 * HCatalog의 테이블 정보를 JSON으로 주고 받기 위한 테이블 모델.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class Table extends ExtJSTreeNode {

    /**
     * 데이터베이스명
     */
    private String databaseName;

    /**
     * 테이블명
     */
    private String tableName;

    /**
     * Comment
     */
    private String comment;

    /**
     * 테이블의 파일 시스템 경로
     */
    private String location;

    /**
     * 테이블 유형
     */
    private String tableType;

    /**
     * 테이블을 구성하는 컬럼 목록
     */
    private List<Column> columns;

    /**
     * External Table 여부
     */
    private boolean tableExternal;

    private boolean isPartitioned;

    private List<Column> partitions;

    private List<HCatFieldSchema> partCols; // FIXME will remove

    /**
     * 기본 생성자.
     */
    public Table() {
    }

    public Table(String databaseName, String tableName) {
        this.databaseName = databaseName;
        this.tableName = tableName;
    }

    public Table(String databaseName, String tableName, String location, String tableType, List<Column> columns, boolean isPartitioned) {
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.location = location;
        this.tableType = tableType;
        this.columns = columns;
        this.isPartitioned = isPartitioned;
    }

    public Table(String databaseName, String tableName, String location, String tableType, List<Column> columns, List<HCatFieldSchema> partCols, boolean isPartitioned) {
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.location = location;
        this.tableType = tableType;
        this.columns = columns;
        this.partCols = partCols;
        this.isPartitioned = isPartitioned;
    }

    public Table(String databaseName, String tableName, String location, List<Column> columns, List<HCatFieldSchema> partCols, boolean isPartitioned) {
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.location = location;
        this.columns = columns;
        this.partCols = partCols;
        this.isPartitioned = isPartitioned;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTableType() {
        return tableType;
    }

    public void setTableType(String tableType) {
        this.tableType = tableType;
    }

    public List<Column> getColumns() {
        if (columns == null) {
            columns = new ArrayList<Column>();
        }
        return columns;
    }

    public void setColumns(List<Column> columns) {
        this.columns = columns;
    }

    public boolean isTableExternal() {
        return tableExternal;
    }

    public void setTableExternal(boolean tableExternal) {
        this.tableExternal = tableExternal;
    }

    public List<HCatFieldSchema> getPartCols() {
        return partCols;
    }

    public void setPartCols(List<HCatFieldSchema> partCols) {
        this.partCols = partCols;
    }

    public boolean isPartitioned() {
        return isPartitioned;
    }

    public void setPartitioned(boolean isPartitioned) {
        this.isPartitioned = isPartitioned;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<Column> getPartitions() {
        return partitions;
    }

    public void setPartitions(List<Column> partitions) {
        this.partitions = partitions;
    }

    @Override
    public String toString() {
        return "Table{" +
                "databaseName='" + databaseName + '\'' +
                ", tableName='" + tableName + '\'' +
                ", comment='" + comment + '\'' +
                ", location='" + location + '\'' +
                ", tableType='" + tableType + '\'' +
                ", columns=" + columns +
                ", tableExternal=" + tableExternal +
                ", isPartitioned=" + isPartitioned +
                ", partCols=" + partCols +
                '}';
    }
}
