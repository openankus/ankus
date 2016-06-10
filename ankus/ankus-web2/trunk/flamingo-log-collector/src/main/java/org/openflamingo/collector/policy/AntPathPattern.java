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

import org.apache.hadoop.fs.Path;
import org.openflamingo.collector.JobContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.AntPathMatcher;

/**
 * Start With File Selection Pattern.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class AntPathPattern implements SelectorPattern {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(AntPathPattern.class);

    /**
     * 파일명이 지정한 문자열로 시작하는지 확인하기 위한 패턴
     */
    private String pattern;

    /**
     * Flamingo Log Collector Job Context
     */
    private JobContext jobContext;

    /**
     * 기본 생성자.
     *
     * @param pattern    Ant Path에 적용할 문자열 패턴
     * @param jobContext Job Context
     */
    public AntPathPattern(String pattern, JobContext jobContext) {
        this.pattern = pattern;
        this.jobContext = jobContext;
    }

    @Override
    public boolean accept(Path path) {
        String evaluated = jobContext.getValue(path.getName());
        boolean matched = new AntPathMatcher().match(pattern, evaluated);
        if (!matched) {
            logger.debug("'{}' 파일은 Ant Path Pattern '{}'와 일치하지 않아서 사용하지 않습니다.", evaluated, pattern);
        }
        return matched;
    }
}
