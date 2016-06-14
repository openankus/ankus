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
package org.openflamingo.fs.audit;

import org.openflamingo.model.rest.*;
import org.openflamingo.provider.fs.FileSystemAuditService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * File System Audit Service Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Service
public class FileSystemAuditServiceImpl implements FileSystemAuditService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(FileSystemAuditServiceImpl.class);

    @Autowired
    private AuditLogRepository repository;

    @Override
    public List<AuditHistory> getAuditHistories(String startDate, String endDate, String path, String username, String type, String orderBy, String desc, int start, int limit) {
        return repository.selectByCondition(startDate, endDate, path, type, start, limit, orderBy, desc, username);
    }

    @Override
    public int getTotalCountOfAuditHistories(String startDate, String endDate, String path, String type, String username) {
        return repository.getTotalCountByCondition(startDate, endDate, path, type, username);
    }

    @Override
    public void log(Context context, FileSystemType fileSystemType, AuditType auditType, FileType fileType, String from, String to, long length) {
        try {
            String username = context.getString("username");

            AuditHistory history = new AuditHistory();
            history.setUsername(username);
            HadoopCluster hadoopCluster = (HadoopCluster) context.getObject(Context.HADOOP_CLUSTER);
            if (hadoopCluster != null) {
                history.setClusterName(hadoopCluster.getName());
                history.setClusterId(hadoopCluster.getId());
            }
            history.setWorkDate(new Date());
            history.setFileSystemType(fileSystemType);
            history.setAuditType(auditType);
            history.setFileType(fileType);
            history.setFrom(from);
            history.setTo(to);
            history.setLength(length);
            repository.insert(history);
        } catch (Exception ex) {
            logger.warn("{}", ex.getMessage(), ex);
        }
    }

}
