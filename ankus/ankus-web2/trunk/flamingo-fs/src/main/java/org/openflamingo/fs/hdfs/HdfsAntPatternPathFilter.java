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
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

/**
 * Hadoop HDFS의 Apache Ant Path Pattern을 이용한 경로 필터.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsAntPatternPathFilter implements PathFilter {

    /**
     * Apache Ant Path Pattern
     */
    private String antPattern;

    /**
     * Apache Ant Path Pattern Matcher
     */
    private PathMatcher antPathMatcher;

    /**
     * 기본 생성자.
     *
     * @param antPattern Apache Ant Path Pattern
     */
    public HdfsAntPatternPathFilter(String antPattern) {
        this.antPattern = antPattern;
        this.antPathMatcher = new AntPathMatcher();
    }

    @Override
    public boolean accept(Path path) {
        return antPathMatcher.match(antPattern, path.toUri().getPath());
    }

}
