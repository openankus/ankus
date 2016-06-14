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

import com.amazonaws.services.s3.model.Bucket;
import org.openflamingo.model.rest.FileInfo;

/**
 * Amazon S3 Bucket.
 *
 * @author Soryoung KIM
 * @since 0.3
 */
public class S3BucketInfo implements FileInfo {

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
    private String owner;

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
    private boolean directory = true;

    /**
     * 기본 생성자
     *
     * @param bucket S3 Bucket
     */
    public S3BucketInfo(Bucket bucket) {
        this.filename = bucket.getName();
        this.path = "/";
        this.fullyQualifiedPath = this.path + this.filename;
        this.owner = bucket.getOwner().getDisplayName();
        this.modificationTime = bucket.getCreationDate().getTime();
        this.accesTime = bucket.getCreationDate().getTime();
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
        throw new UnsupportedOperationException();
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
        return owner;
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
        return modificationTime;
    }

    @Override
    public long getAccessTime() {
        return accesTime;
    }

    @Override
    public String getPermission() { //FIXME
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public String toString() {
        return "S3BucketInfo{" +
            "filename='" + filename + '\'' +
            ", fullyQualifiedPath='" + fullyQualifiedPath + '\'' +
            ", path='" + path + '\'' +
            ", owner='" + owner + '\'' +
            ", modificationTime=" + modificationTime +
            ", accesTime=" + accesTime +
            ", directory=" + directory +
            '}';
    }
}
