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

import com.amazonaws.services.s3.model.S3Object;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.util.FileUtils;

/**
 * Amazon S3 File Object.
 *
 * @author Soryoung KIM
 * @since 0.3
 */
public class S3ObjectInfo implements FileInfo {

    /**
     *
     */
    private String filename;

    /**
     *
     */
    private String fullyQualifiedPath;

    /**
     *
     */
    private String path;

    /**
     *
     */
    private long length;

    /**
     *
     */
    private long modificationTime;

    /**
     *
     */
    private long accesTime;

    /**
     *
     */
    private boolean directory = false;

    /**
     * 기본 생성자
     *
     * @param object Amazon S3 Object
     */
    public S3ObjectInfo(S3Object object, String filename) {
        this.fullyQualifiedPath = "/" + object.getBucketName() + "/" + object.getKey();
        this.filename = filename;
        this.path = FileUtils.getPath(this.fullyQualifiedPath);
        this.length = object.getObjectMetadata().getContentLength();
        this.modificationTime = object.getObjectMetadata().getLastModified().getTime();
        this.accesTime = object.getObjectMetadata().getLastModified().getTime();
    }

    /**
     * 기본 생성자.
     *
     * @param bucketName Bucket Name
     * @param key        Object Key
     * @param filename   Filename
     * @param modified   Modified Date
     * @param size       Size
     */
    public S3ObjectInfo(String bucketName, String key, String filename, long modified, long size) {
        this.fullyQualifiedPath = "/" + bucketName + "/" + key;
        this.filename = filename;
        this.path = FileUtils.getPath(this.fullyQualifiedPath);
        this.length = size;
        this.modificationTime = modified;
        this.accesTime = modified;
    }

    @Override
    public String getFilename() {
        return this.filename;
    }

    @Override
    public String getFullyQualifiedPath() {
        return this.fullyQualifiedPath;
    }

    @Override
    public long getLength() {
        return this.length;
    }

    @Override
    public String getPath() {
        return this.path;
    }

    @Override
    public boolean isFile() {
        return !directory;
    }

    @Override
    public boolean isDirectory() {
        return directory;
    }

    @Override
    public String getOwner() {
        throw new UnsupportedOperationException();
    }

    @Override
    public String getGroup() {
        throw new UnsupportedOperationException();
    }

    @Override
    public long getBlockSize() {
        throw new UnsupportedOperationException();
    }

    @Override
    public int getReplication() {
        throw new UnsupportedOperationException();
    }

    @Override
    public long getModificationTime() {
        return this.modificationTime;
    }

    @Override
    public long getAccessTime() {
        return this.accesTime;
    }

    @Override
    public String getPermission() { //FIXME
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public String toString() {
        return "S3ObjectInfo{" +
            "filename='" + filename + '\'' +
            ", fullyQualifiedPath='" + fullyQualifiedPath + '\'' +
            ", path='" + path + '\'' +
            ", length=" + length +
            ", modificationTime=" + modificationTime +
            ", accesTime=" + accesTime +
            ", directory=" + directory +
            '}';
    }
}
