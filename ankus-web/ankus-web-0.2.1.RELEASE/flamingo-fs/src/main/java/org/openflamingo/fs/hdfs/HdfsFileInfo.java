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

import org.apache.hadoop.fs.FileStatus;
import org.openflamingo.model.rest.ExtJSTreeNode;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.util.FileUtils;
import org.openflamingo.util.StringUtils;

/**
 * HDFS File Info.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsFileInfo extends ExtJSTreeNode implements FileInfo {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String filename;

    private String fullyQualifiedPath;

    private String path;

    private long length;

    private boolean directory;

    private boolean file;

    private String owner;

    private String group;

    private long blockSize;

    private int replication;

    private long modificationTime;

    private long accessTime;

    private String permission;

    private long spaceQuota;

    private String spaceConsumed;

    private long quota;

    private long fileCount;

    private long directoryCount;

    /**
     * 기본 생성자.
     *
     * @param fileStatus HDFS File Status
     */
    public HdfsFileInfo(FileStatus fileStatus) {
        this.fullyQualifiedPath = fileStatus.getPath().toUri().getPath();
        this.filename = StringUtils.isEmpty(FileUtils.getFilename(fullyQualifiedPath)) ? FileUtils.getDirectoryName(fullyQualifiedPath) : FileUtils.getFilename(fullyQualifiedPath);
        this.length = fileStatus.getLen();
        this.path = FileUtils.getPath(fullyQualifiedPath);
        this.directory = fileStatus.isDir();
        this.file = !fileStatus.isDir();
        this.owner = fileStatus.getOwner();
        this.group = fileStatus.getGroup();
        this.blockSize = fileStatus.getBlockSize();
        this.replication = fileStatus.getReplication();
        this.modificationTime = fileStatus.getModificationTime();
        this.accessTime = fileStatus.getAccessTime();
        this.setText(this.filename);
        this.setLeaf(file ? true : false);
        this.setCls(directory ? "folder" : "file");
        this.setId(fullyQualifiedPath);
        this.permission = fileStatus.getPermission().toString();
    }

    @Override
    public String getFilename() {
        return filename;
    }

    @Override
    public String getFullyQualifiedPath() {
        return fullyQualifiedPath;
    }

    @Override
    public long getLength() {
        return length;
    }

    @Override
    public String getPath() {
        return path;
    }

    @Override
    public boolean isFile() {
        return file;
    }

    @Override
    public boolean isDirectory() {
        return directory;
    }

    @Override
    public String getOwner() {
        return owner;
    }

    @Override
    public String getGroup() {
        return group;
    }

    @Override
    public long getBlockSize() {
        return blockSize;
    }

    @Override
    public int getReplication() {
        return replication;
    }

    @Override
    public long getModificationTime() {
        return modificationTime;
    }

    @Override
    public long getAccessTime() {
        return accessTime;
    }

    public String getPermission() {
        return permission;
    }

    public void setSpaceQuota(long spaceQuota) {
        this.spaceQuota = spaceQuota;
    }

    public long getSpaceQuota() {
        return spaceQuota;
    }

    public void setSpaceConsumed(String spaceConsumed) {
        this.spaceConsumed = spaceConsumed;
    }

    public String getSpaceConsumed() {
        return spaceConsumed;
    }

    public void setQuota(long quota) {
        this.quota = quota;
    }

    public long getQuota() {
        return quota;
    }

    public void setFileCount(long fileCount) {
        this.fileCount = fileCount;
    }

    public long getFileCount() {
        return fileCount;
    }

    public void setDirectoryCount(long directoryCount) {
        this.directoryCount = directoryCount;
    }

    public long getDirectoryCount() {
        return directoryCount;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void setFullyQualifiedPath(String fullyQualifiedPath) {
        this.fullyQualifiedPath = fullyQualifiedPath;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void setLength(long length) {
        this.length = length;
    }

    public void setDirectory(boolean directory) {
        this.directory = directory;
    }

    public void setFile(boolean file) {
        this.file = file;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public void setBlockSize(long blockSize) {
        this.blockSize = blockSize;
    }

    public void setReplication(int replication) {
        this.replication = replication;
    }

    public void setModificationTime(long modificationTime) {
        this.modificationTime = modificationTime;
    }

    public void setAccessTime(long accessTime) {
        this.accessTime = accessTime;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }
}
