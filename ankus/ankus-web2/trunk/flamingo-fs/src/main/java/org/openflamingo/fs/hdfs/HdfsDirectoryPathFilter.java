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
package org.openflamingo.fs.hdfs;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.PathFilter;
import org.openflamingo.core.exception.FileSystemException;
import org.slf4j.helpers.MessageFormatter;

import java.io.IOException;

/**
 * Hadoop HDFS의 디렉토리만 필터링하는 경로 필터.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsDirectoryPathFilter implements PathFilter {

    /**
     * Hadoop HDFS File System
     */
    private org.apache.hadoop.fs.FileSystem fs;

    /**
     * 기본 생성자.
     *
     * @param fs Hadoop HDFS File System
     */
    public HdfsDirectoryPathFilter(org.apache.hadoop.fs.FileSystem fs) {
        this.fs = fs;
    }

    @Override
    public boolean accept(Path path) {
        try {
            return !fs.isFile(path);
        } catch (IOException e) {
            String message = MessageFormatter.format("Cannot access '{}'", path.toUri().getPath()).getMessage();
            throw new FileSystemException(message, e);
        }
    }

}
