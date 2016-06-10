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

import java.sql.Connection;

/**
 * @author Byoung Gon, Kim
 * @version 1.0-RC1
 */
public interface HiveClient {

    /**
     * Hive Server 2와 연결한다.
     *
     * @param jdbcUrl      Hive Server 2 JDBC URL
     * @param databaseName Hive Query를 실행할 Hive Database
     * @return JDBC Conenction
     */
    Connection openConnection(String jdbcUrl, String databaseName);

    /**
     * Hive Server 2와 연결을 종료한다.
     */
    void closeConnection();

    /**
     * Hive Server 2 서버에 연결되어 있는지 확인한다.
     *
     * @return 연결된 경우 <tt>true</tt>
     */
    boolean isConnected();

    /**
     * Hive Query를 실행한다.
     *
     * @param executionId Execution ID
     * @param logPath     Hive Query의 실행 이력을 파일로 남기기 위한 로그 경로
     * @param query       Hive Query
     * @return Query 실행 결과
     */
    String executeQuery(String executionId, String logPath, String query);
}
