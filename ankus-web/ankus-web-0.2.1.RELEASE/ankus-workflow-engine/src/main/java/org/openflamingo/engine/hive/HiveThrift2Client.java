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

import org.apache.hive.jdbc.Utils;
import org.apache.hive.service.auth.KerberosSaslHelper;
import org.apache.hive.service.auth.PlainSaslHelper;
import org.apache.hive.service.cli.*;
import org.apache.hive.service.cli.thrift.*;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;
import org.openflamingo.model.hive.Schema;
import org.openflamingo.util.StringUtils;

import javax.security.sasl.SaslException;
import java.sql.SQLException;
import java.util.*;

/**
 * Thrift API를 이용한 Hive Server 2 Client.
 *
 * @author Chiwan Park
 * @since 0.4
 */
public class HiveThrift2Client {

    private static final String HIVE_AUTH_TYPE = "auth";
    private static final String HIVE_AUTH_SIMPLE = "noSasl";
    private static final String HIVE_AUTH_USER = "user";
    private static final String HIVE_AUTH_PRINCIPAL = "principal";
    private static final String HIVE_AUTH_PASSWD = "password";
    private static final String HIVE_ANONYMOUS_USER = "anonymous";
    private static final String HIVE_ANONYMOUS_PASSWD = "anonymous";

    private final List<TProtocolVersion> supportedProtocols = new LinkedList<>();

    private String jdbcUri;

    private Utils.JdbcConnectionParams connectionParams;

    private Map<String, String> sessConf;

    private Map<String, String> hiveConf;

    private Map<String, String> hiveVar;

    private TTransport transport;
    private CLIServiceClient client;
    private SessionHandle currentSession;
    private OperationHandle currentOperation;

    protected HiveThrift2Client(String uri) {
        this.jdbcUri = uri;
        this.connectionParams = Utils.parseURL(uri);
        this.sessConf = connectionParams.getSessionVars();
        this.hiveConf = connectionParams.getHiveConfs();
        this.hiveVar = connectionParams.getHiveVars();
    }

    public void addHiveVariable(String key, String value) {
        hiveVar.put(key, value);
    }

    public void addHiveConfiguration(String key, String value) {
        hiveConf.put(key, value);
    }

    public String getUsername() {
        String userName = sessConf.get(HIVE_AUTH_USER);

        if (StringUtils.isEmpty(userName)) {
            return HIVE_ANONYMOUS_USER;
        }

        return userName;
    }

    public String getPassword() {
        String password = sessConf.get(HIVE_AUTH_PASSWD);

        if (StringUtils.isEmpty(password)) {
            return HIVE_ANONYMOUS_PASSWD;
        }

        return password;
    }

    private void createTransport() throws SQLException {
        transport = new TSocket(connectionParams.getHost(), connectionParams.getPort());
        if (!sessConf.containsKey(HIVE_AUTH_TYPE) || !sessConf.get(HIVE_AUTH_TYPE).equals(HIVE_AUTH_SIMPLE)) {
            try {
                if (sessConf.containsKey(HIVE_AUTH_PRINCIPAL))
                    transport = KerberosSaslHelper.getKerberosTransport(sessConf.get(HIVE_AUTH_PRINCIPAL), connectionParams.getHost(), transport, new HashMap<String, String>());
                else
                    transport = PlainSaslHelper.getPlainTransport(getUsername(), getPassword(), transport);
            } catch (SaslException e) {
                throw new SQLException("Could not establish secure connection to " + jdbcUri + ": " + e.getMessage(), " 08S01");
            }
        }
    }

    public void openSession() throws SQLException {
        if (currentSession != null) {
            throw new SQLException("Session is already opened.");
        }

        currentSession = client.openSession(getUsername(), getPassword());
    }

    public void closeSession() throws HiveSQLException {
        if (currentOperation != null) {
            closeOperation();
        }

        client.closeSession(currentSession);
        currentSession = null;
    }

    private void closeOperation() throws HiveSQLException {
        client.closeOperation(currentOperation);
        currentOperation = null;
    }

    public void connect() throws SQLException {
        createTransport();
        client = new ThriftCLIServiceClient(new TCLIService.Client(new TBinaryProtocol(transport)));

        try {
            transport.open();
        } catch (TTransportException e) {
            e.printStackTrace();
            throw new SQLException("Could not establish connection to " + jdbcUri + ": " + e.getMessage(), " 08S01");
        }
    }

    public void execute(String query) throws SQLException {
        if (currentSession == null) {
            openSession();
        }

        currentOperation = client.executeStatement(currentSession, query, hiveConf);
    }

    public void execute(List<String> queries) throws SQLException {
        for (int i = 0, size = queries.size(); i < size; ++i) {
            String query = queries.get(i).trim();
            if (!"".equals(query))
                execute(queries.get(i));
        }
    }

    public List<Schema> getResultSchema() throws SQLException {
        if (currentOperation == null) {
            throw new SQLException("Least one operation is executed.");
        }

        if (!currentOperation.hasResultSet()) {
            return new ArrayList<>();
        }

        TableSchema rsMetadata = client.getResultSetMetadata(currentOperation);
        List<ColumnDescriptor> descriptors = rsMetadata.getColumnDescriptors();
        List<Schema> schemas = new ArrayList<>(descriptors.size());

        for (ColumnDescriptor descriptor : descriptors) {
            Schema schema = new Schema(descriptor.getName(), descriptor.getTypeName(), descriptor.getComment());
            schemas.add(schema);
        }

        return schemas;
    }

    public List<Map<String, String>> getResults() throws SQLException {
        if (currentOperation == null)
            throw new SQLException("Least one operation is executed.");

        if (!currentOperation.hasResultSet())
            return new ArrayList<>();

        List<Schema> schemas = getResultSchema();
        TRowSet rowSet = client.fetchResults(currentOperation, FetchOrientation.FETCH_PRIOR, 1).toTRowSet();

        List<Map<String, String>> results = new ArrayList<>(rowSet.getRowsSize());

        Iterator<TRow> rowIter = rowSet.getRowsIterator();
        while (rowIter.hasNext()) {
            TRow row = rowIter.next();

            List<TColumnValue> values = row.getColVals();
            Map<String, String> rowMap = new HashMap<>();
            for (int i = 0, size = values.size(); i < size; ++i) {
                String key = schemas.get(i).name;
                String value = FieldReader.readToString(values.get(i));

                rowMap.put(key, value);
            }

            results.add(rowMap);
        }

        return results;
    }

    private static class FieldReader {
        public static String readToString(TColumnValue value) {
            TColumnValue._Fields fields = value.getSetField();
            switch (fields) {
                case BOOL_VAL:
                    return String.valueOf(value.getBoolVal().isValue());
                case DOUBLE_VAL:
                    return String.valueOf(value.getDoubleVal().getValue());
                case STRING_VAL:
                    return String.valueOf(value.getStringVal().getValue());
                case I16_VAL:
                    return String.valueOf(value.getI16Val().getValue());
                case I32_VAL:
                    return String.valueOf(value.getI32Val().getValue());
                case I64_VAL:
                    return String.valueOf(value.getI64Val().getValue());
                case BYTE_VAL:
                    return String.valueOf(value.getByteVal().getValue());
                default:
                    return "";
            }
        }
    }

    public static class Factory {
        public static HiveThrift2Client getClient(String uri) {
            return new HiveThrift2Client(uri);
        }
    }
}
