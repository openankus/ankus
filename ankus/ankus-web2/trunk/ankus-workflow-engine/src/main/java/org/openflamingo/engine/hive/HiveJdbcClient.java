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

import com.google.common.base.Joiner;
import org.openflamingo.core.exception.ServiceException;
import org.openflamingo.engine.configuration.LocaleSupport;
import org.openflamingo.engine.util.FileWriter;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * JDBC Client for Hive Server 2
 *
 * @author Byoung Gon, Kim
 * @author Chi Wan, Park
 * @version 0.5
 * @see <a href="http://svn.apache.org/repos/asf/hive/trunk/jdbc/src/java/org/apache/hive/jdbc/Utils.java">Hive Utils</a>
 */
public class HiveJdbcClient extends LocaleSupport implements HiveClient {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(HiveJdbcClient.class);

    /**
     * Hive Server 2 JDBC Driver Class
     */
    private static final String HIVE_JDBC_DRIVER = "org.apache.hive.jdbc.HiveDriver";

    /**
     * Hive JDBC Conection
     */
    private Connection connection;

    /**
     * Hive Database Name.
     */
    private String databaseName;

    @Override
    public Connection openConnection(String jdbcUrl, String databaseName) {
        this.databaseName = databaseName;
        try {
            Class.forName(HIVE_JDBC_DRIVER);
        } catch (Exception e) {
            throw new ServiceException(message("S_HIVE", "CANNOT_LOAD_DRIVER"), e);
        }

        try {
            Properties props = new Properties();
            connection = DriverManager.getConnection(jdbcUrl, props);
            return connection;
        } catch (Exception e) {
            throw new ServiceException(message("S_HIVE", "CANNOT_CONNECT_HIVE_SERVER"), e);
        }
    }

    @Override
    public void closeConnection() {
        try {
            if (connection != null) {
                connection.close();
            }
        } catch (Exception ignored) {

        }
    }

    @Override
    public boolean isConnected() {
        return connection != null;
    }

    @Override
    public String executeQuery(String executionId, String logPath, String query) {
        Statement statement = null;
        ResultSet resultSet = null;
        try {
            if (!StringUtils.isEmpty(databaseName)) {
                useDatabase(databaseName);
            } else {
                useDatabase("default");
            }

            statement = connection.createStatement();
            boolean hasResultSet = statement.execute(query);

            if (!"".equals(logPath)) { // if executeQuery is not called by validateQuery
                FileSystemUtils.saveToFile(query.getBytes(), logPath + "/hive.script");
            }

            if (hasResultSet) {
                resultSet = statement.getResultSet();
                ResultSetMetaData metaData = resultSet.getMetaData();
                List<String> columns = new ArrayList<>(metaData.getColumnCount());
                int size = metaData.getColumnCount();
                for (int i = 0; i < size; ++i) {
                    columns.add(metaData.getColumnName(i + 1));
                }

                logger.debug("Columns Names : {}", Joiner.on("\t").join(columns));
                logger.debug("Columns Size : {}", size);

                if (columns.size() == 1 && isDescribe(query)) {
                    StringBuilder builder = new StringBuilder();
                    while (resultSet.next()) {
                        builder.append(resultSet.getString(1)).append("\n");
                    }
                    FileSystemUtils.saveToFile(builder.toString().getBytes(), logPath + "/explain.log");
                } else {
                    if (!"".equals(logPath)) { // if executeQuery is not called by validateQuery
                        FileSystemUtils.saveToFile(Joiner.on("\t").join(columns).getBytes(), logPath + "/metadata.log");

                        FileWriter fileWriter = new FileWriter(logger, logPath + "/data.log");
                        List<String> cols = new ArrayList();
                        while (resultSet.next()) {
                            for (String col : columns) {
                                cols.add(resultSet.getString(col));
                            }
                            fileWriter.log(Joiner.on("\t").join(cols));
                            cols.clear();
                        }
                        fileWriter.close();
                    }
                }
            }
            return message("S_HIVE", "EXECUTE_QUERY", executionId);
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (Exception ignored) {
                }
            }
            if (statement != null) {
                try {
                    statement.close();
                } catch (Exception ignored) {
                }
            }
        }
    }

    /**
     * 데이터베이스 사용을 등록한다.
     *
     * @param databaseName 데이터베이스명
     */
    private void useDatabase(String databaseName) {
        Statement statement = null;
        ResultSet resultSet = null;
        try {
            statement = connection.createStatement();
            boolean hasResultSet = statement.execute("use " + databaseName);
            if (hasResultSet) {
                resultSet = statement.getResultSet();
            }
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (Exception ignored) {
                }
            }
            if (statement != null) {
                try {
                    statement.close();
                } catch (Exception ignored) {
                }
            }
        }
    }

    /**
     * Describe Hive Query인지 확인한다.
     *
     * @param query Hive Query
     * @return 'describe' 또는 'explain'을 수행하는 쿼리인 경우우 <tt>true</tt>
     */
    private boolean isDescribe(String query) {
        String upperCase = query.toUpperCase().trim();
        return upperCase.startsWith("EXPLAIN") || upperCase.startsWith("DESCRIBE");
    }
}
