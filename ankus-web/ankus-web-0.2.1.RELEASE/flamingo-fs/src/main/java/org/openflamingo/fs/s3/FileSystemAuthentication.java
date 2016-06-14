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
package org.openflamingo.fs.s3;

import java.util.Properties;

/**
 * S3 Authentication 정보를 유지하는 Single Authentication.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class FileSystemAuthentication {

    static ThreadLocal<Properties> threadLocal = new ThreadLocal<Properties>();

    /**
     * 기본 생성자. 직접 호출이 불가하다.
     */
    private FileSystemAuthentication() {
    }

    public static void setProperties(Properties properties) {
        threadLocal.set(properties);
    }

    public static void remove() {
        threadLocal.remove();
    }

    public static Properties getProperties() {
        return threadLocal.get();
    }

    public static String getAccessKey() {
        return getProperties().getProperty("s3.accessKey");
    }

    public static String getSecretKey() {
        return getProperties().getProperty("s3.secretKey");
    }

    public static String getProxyAddress() {
        return getProperties().getProperty("network.proxy.host");
    }

    public static String getProxyPort() {
        return getProperties().getProperty("network.proxy.port");
    }

    public static boolean isTestEnvironment() {
        try {
            return Boolean.parseBoolean(getProperties().getProperty("test.env"));
        } catch (Exception ex) {
            return false;
        }
    }
}
