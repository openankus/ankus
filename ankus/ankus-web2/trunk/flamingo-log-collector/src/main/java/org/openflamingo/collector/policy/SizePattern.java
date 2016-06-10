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
package org.openflamingo.collector.policy;

import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.openflamingo.collector.JobContext;
import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileSystemUtils;

/**
 * File Size Selection Pattern.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class SizePattern implements SelectorPattern {

    /**
     * Flamingo Log Collector Job Context
     */
    private JobContext jobContext;

    /**
     * File Size
     */
    String pattern;

    /**
     * 기본 생성자.
     *
     * @param pattern    파일의 크기
     * @param jobContext Job Context
     */
    public SizePattern(String pattern, JobContext jobContext) {
        this.pattern = pattern;
        this.jobContext = jobContext;
    }

    @Override
    public boolean accept(Path path) {
        try {
            String evaluated = jobContext.getValue(path.getName());
            long size = Long.parseLong(evaluated);
            FileSystem fs = FileSystemUtils.getFileSystem(path);
            FileStatus fileStatus = fs.getFileStatus(path);
            return fileStatus.getLen() > size ? true : false;
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("파일({})의 크기를 확인할 수 없습니다.", path), ex);
        }
    }
}
