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

/**
 * Bucket의 이름을 필터링하는 필터.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public interface BucketFilter {

    /**
     * 지정한 이름을 다른 형태의 이름으로 필터링한다.
     *
     * @param name 필터링할 이름
     * @return 필터링한 이름
     */
    String filter(String name);

}
