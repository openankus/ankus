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

import org.apache.hadoop.hive.conf.HiveConf;
import org.apache.hadoop.hive.metastore.HiveMetaStoreClient;
import org.apache.hadoop.hive.metastore.api.*;
import org.apache.thrift.TException;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Map;

public class HiveMetastoreClient {

    private HiveConf conf;

    private HiveMetaStoreClient client;

    public HiveMetastoreClient(Map<String, String> params) throws MetaException {
        this(params.get("username"), params.get("password"), params.get("jdbcUrl"));
    }

    public HiveMetastoreClient(String username, String password, String jdbcUrl) throws MetaException {
        Assert.notNull(username, "ConnectionUserName of Hive Site is null");
        Assert.notNull(password, "ConnectionPassword of Hive Site is null");
        Assert.notNull(jdbcUrl, "ConnectionURL of Hive Site is null");

        this.conf = new HiveConf();
        conf.set("javax.jdo.option.ConnectionUserName", username);
        conf.set("javax.jdo.option.ConnectionPassword", password);
        conf.set("javax.jdo.option.ConnectionURL", jdbcUrl);

        this.client = new HiveMetaStoreClient(conf);
    }

    public static HiveMetastoreClient create(Map<String, String> params) throws MetaException {
        return new HiveMetastoreClient(params);
    }

    public void createDatabase(Database db) throws AlreadyExistsException, InvalidObjectException, MetaException, TException {
        client.createDatabase(db);
    }

    public void createTable(Table tbl) throws AlreadyExistsException, InvalidObjectException, MetaException, NoSuchObjectException, TException {
        client.createTable(tbl);
    }

    public void dropDatabase(String name) throws NoSuchObjectException, InvalidOperationException, MetaException, TException {
        client.dropDatabase(name);
    }

    public void dropTable(String dbname, String name, boolean deleteData, boolean ignoreUnknownTab) throws MetaException, TException, NoSuchObjectException, UnsupportedOperationException {
        client.dropTable(dbname, name, deleteData, ignoreUnknownTab);
    }

    public void dropDatabase(String name, boolean deleteData, boolean ignoreUnknownDb) throws NoSuchObjectException, InvalidOperationException, MetaException, TException {
        client.dropDatabase(name, deleteData, ignoreUnknownDb);
    }

    public List<String> getAllTables(String dbname) throws MetaException {
        return client.getAllTables(dbname);
    }

    public Table getTable(String dbname, String name) throws MetaException, TException, NoSuchObjectException {
        return client.getTable(dbname, name);
    }

    public Database getDatabase(String name) throws NoSuchObjectException, MetaException, TException {
        return client.getDatabase(name);
    }

    public List<String> getAllDatabases() throws MetaException {
        return client.getAllDatabases();
    }

    public List<String> getDatabases(String databasePattern) throws MetaException {
        return client.getDatabases(databasePattern);
    }

    public List<String> listTableNamesByFilter(String dbName, String filter, short maxTables) throws MetaException, TException, InvalidOperationException, UnknownDBException {
        return client.listTableNamesByFilter(dbName, filter, maxTables);
    }
}
