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

import org.openflamingo.provider.fs.FileSystemAuditService;
import org.openflamingo.provider.fs.FileSystemProvider;

/**
 * Amazon S3 Object Provider Factory.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class S3ObjectProviderFactory {

    /**
     * Amazon Region 정보를 기반으로 {@link org.openflamingo.provider.fs.FileSystemProvider}를 생성한다.
     *
     * @param auditService File System Audit Service Implemention
     * @return {@link org.openflamingo.provider.fs.FileSystemProvider}
     */
    public static FileSystemProvider getFileSystemProvider(FileSystemAuditService auditService) {
        return new S3ObjectProvider(auditService);
    }

}
