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
package org.openflamingo.engine.hive;

import org.apache.hadoop.conf.Configuration;
import org.apache.hcatalog.api.*;
import org.apache.hcatalog.common.HCatException;
import org.apache.hcatalog.data.schema.HCatFieldSchema;
import org.openflamingo.model.hive.Column;
import org.openflamingo.model.hive.Database;
import org.openflamingo.model.hive.Table;
import org.openflamingo.model.rest.HiveServer;
import org.openflamingo.provider.engine.HCatalogService;
import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public class HCatalogServiceImpl implements HCatalogService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HCatalogService.class);

    @Override
    public void createDatabase(Database database, HiveServer hiveServer) throws HCatException {
        HCatCreateDBDesc.Builder builder = HCatCreateDBDesc.create(database.getName());
        if (!StringUtils.isEmpty(database.getLocation())) builder.location(database.getLocation());
        if (!StringUtils.isEmpty(database.getComment())) builder.comment(database.getLocation());

        getClient(hiveServer).createDatabase(builder.build());

        logger.info("데이터베이스 '{}'을 생성했습니다.", database.getName());
    }

    @Override
    public void dropDatabase(HiveServer hiveServer, Database database) throws HCatException {
        getClient(hiveServer).dropDatabase(database.getName(), true, HCatClient.DropDBMode.RESTRICT);

        logger.info("데이터베이스 '{}'을 삭제했습니다.", database.getName());
    }

    @Override
    public void createTable(HiveServer hiveServer, Table table) throws HCatException {
        HCatCreateTableDesc.Builder builder = HCatCreateTableDesc.create(table.getDatabaseName(), table.getTableName(), getColumns(table.getColumns()));
        if (!StringUtils.isEmpty(table.getLocation())) builder.location(table.getLocation());
        if (table.isPartitioned()) builder.partCols(table.getPartCols());
        builder.isTableExternal(table.isTableExternal());
        getClient(hiveServer).createTable(builder.build());

        logger.info("데이터베이스 '{}'에 테이블 '{}'을 생성했습니다.", table.getDatabaseName(), table.getTableName());
    }

    @Override
    public void dropTable(HiveServer hiveServer, Table table) throws HCatException {
        getClient(hiveServer).dropTable(table.getDatabaseName(), table.getTableName(), table.isTableExternal());

        logger.info("데이터베이스 '{}'에 테이블 '{}'을 삭제했습니다.", table.getDatabaseName(), table.getTableName());
    }

    @Override
    public Collection<Database> getDatabases(HiveServer hiveServer) {
        HCatClient client = getClient(hiveServer);
        try {
            List<String> databases = client.listDatabaseNamesByPattern("*");
            Collection<Database> dbs = new ArrayList();
            for (String db : databases) {
                Database d = new Database(db);
                d.setText(d.getName());
                d.setId("/" + d.getName());
                d.setCls("folder");
                d.setLeaf(false);
                dbs.add(d);
            }
            return dbs;
        } catch (Exception e) {
            throw new IllegalArgumentException("데이터베이스 목록을 확인할 수 없습니다.", e);
        } finally {
            if (client != null) {
                try {
                    client.close();
                } catch (Exception e) {
                    // Ignored
                }
            }
        }
    }

    @Override
    public Collection<Table> getTables(HiveServer hiveServer, String databaseName) throws HCatException {
        HCatClient client = getClient(hiveServer);
        try {
            List<String> tables = client.listTableNamesByPattern(databaseName, "*");
            Collection<Table> tbs = new ArrayList<Table>();
            for (String table : tables) {
                Table t = new Table();
                t.setText(table);
                t.setId("/" + databaseName + "/" + table);
                t.setLeaf(true);
                tbs.add(t);
            }
            return tbs;
        } catch (Exception e) {
            throw new IllegalArgumentException("테이블 목록을 확인할 수 없습니다.", e);
        } finally {
            if (client != null) {
                try {
                    client.close();
                } catch (Exception e) {
                    // Ignored
                }
            }
        }
    }

    @Override
    public Collection<Column> getColumns(HiveServer hiveServer, String database, String table) throws HCatException {
        List<HCatFieldSchema> cols = getClient(hiveServer).getTable(database, table).getCols();
        return bind(cols);
    }

    @Override
    public void updateTable(HiveServer hiveServer, Table table, List<HCatFieldSchema> colSchema) throws HCatException {
        getClient(hiveServer).updateTableSchema(table.getDatabaseName(), table.getTableName(), colSchema);
    }

    @Override
    public void renameTable(HiveServer hiveServer, String databaseName, String sourceTableName, String targetTableName) throws
            HCatException {
        getClient(hiveServer).renameTable(databaseName, sourceTableName, targetTableName);
    }

    // START Mr Song

    public List<HCatPartition> listPartitionsByFilter(String s, String s2, String s3) throws HCatException {
        return getClient().listPartitionsByFilter(s, s2, s3);
    }

    public List<String> listTableNamesByPattern(String s, String s2) throws HCatException {
        return getClient().listTableNamesByPattern(s, s2);
    }

    public Database getDatabase(String databaseName) throws HCatException {
        return bind(getClient().getDatabase(databaseName));
    }

    public List<String> listDatabaseNamesByPattern(String s) throws HCatException {
        return getClient().listDatabaseNamesByPattern(s);
    }

    @Override
    public void updateTableSchema(HiveServer hiveServer, String databaseName, String tableName, List<HCatFieldSchema> columnSchemas) throws HCatException {
        getClient(hiveServer).updateTableSchema(databaseName, tableName, columnSchemas);
    }

    @Override
    public void dropPartitions(HiveServer hiveServer, String databaseName, String tableName, Map<String, String> partSpec, boolean ifExists) throws HCatException {
        getClient(hiveServer).dropPartitions(databaseName, tableName, partSpec, ifExists);
    }

    @Override
    public int addPartitions(HiveServer hiveServer, List<HCatAddPartitionDesc> hCatAddPartitionDescs) throws HCatException {
        return getClient(hiveServer).addPartitions(hCatAddPartitionDescs);
    }

    @Override
    public void addPartition(HiveServer hiveServer, HCatAddPartitionDesc hCatAddPartitionDesc) throws HCatException {
        getClient(hiveServer).addPartition(hCatAddPartitionDesc);
    }

    public HCatPartition getPartition(String s, String s2, Map<String, String> properties) throws HCatException {
        return getClient().getPartition(s, s2, properties);
    }

    @Override
    public List<HCatPartition> getPartitions(HiveServer hiveServer, String databaseName, String tableName, Map<String, String> partitionSpec) throws HCatException {
        return getClient(hiveServer).getPartitions(databaseName, tableName, partitionSpec);
    }

    @Override
    public Collection<Column> getPartitions(HiveServer hiveServer, String databaseName, String tableName) throws HCatException {
        return bind(getClient(hiveServer).getTable(databaseName, tableName).getPartCols());
    }
    // END Mr Song

    private Database bind(HCatDatabase database) {
        return new Database(database.getName(), database.getComment(), database.getLocation(), database.getProperties());
    }

    @Override
    public Table getTable(HiveServer hiveServer, Table table) throws HCatException {
        return bind(getClient(hiveServer).getTable(table.getDatabaseName(), table.getTableName()));
    }

    @Override
    public HCatTable getTable(HiveServer hiveServer, String databaseName, String tableName) throws HCatException {
        return getClient(hiveServer).getTable(databaseName, tableName);
    }


    private Table bind(HCatTable table) {
        return new Table(table.getDbName(), table.getTableName(), table.getLocation(), table.getTabletype(), bind(table.getCols()), false);
    }

    /**
     * Hive 필드 스키마 목록을 컬럼 목록으로 바이딩한다.
     *
     * @param fieldSchemas Hive 필드 스키마 목록
     * @return 컬럼 목록
     */
    private List<Column> bind(List<HCatFieldSchema> fieldSchemas) {
        List<Column> columns = new ArrayList(fieldSchemas.size());
        for (HCatFieldSchema schema : fieldSchemas) {
            columns.add(bind(schema));
        }
        return columns;
    }

    /**
     * Hive 필드 스키마를 컬럼 정보로 바인딩한다.
     *
     * @param schema Hive 필드 스키마
     * @return 컬럼 정보
     */
    private Column bind(HCatFieldSchema schema) {
        return new Column(schema.getName(), schema.getComment(), schema.getTypeString(), schema.getCategory().name());
    }

    /**
     * 컬럼 목록을 Hive 필드 스키마 목록으로 바인딩한다.
     *
     * @param columns 컬럼 목록
     * @return Hive 필드 스키마 목록
     * @throws org.apache.hcatalog.common.HCatException
     *          컬럼 정보를 바인딩할 수 없는 경우
     */
    private List<HCatFieldSchema> getColumns(List<Column> columns) throws HCatException {
        List<HCatFieldSchema> fields = new ArrayList<HCatFieldSchema>(columns.size());
        for (Column column : columns) {
            fields.add(bind(column));
        }
        return fields;
    }

    /**
     * 컬럼 정보를 Hive 필드 스키마로 바인딩한다.
     *
     * @param column 컬럼 정보
     * @return Hive 필드 스키마
     * @throws org.apache.hcatalog.common.HCatException
     *          컬럼 정보를 바인딩할 수 없는 경우
     */
    private HCatFieldSchema bind(Column column) throws HCatException {
        return new HCatFieldSchema(column.getName(), HCatFieldSchema.Type.valueOf(column.getType()), column.getComment());
    }

    @Override
    public HCatClient getClient(HiveServer hiveServer) {
        try {
            Configuration conf = new Configuration();
            conf.set("hive.metastore.uris", hiveServer.getMetastoreUris());

            return HCatClient.create(conf);
        } catch (HCatException e) {
            throw new IllegalArgumentException("Hive Server에 접속할 수 없습니다.", e);
        }
    }

    public HCatClient getClient() {
        return null;
    }

}
