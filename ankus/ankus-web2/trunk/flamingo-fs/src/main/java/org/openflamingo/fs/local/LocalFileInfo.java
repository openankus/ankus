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
package org.openflamingo.fs.local;

import org.openflamingo.model.rest.ExtJSTreeNode;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.util.FileUtils;

import java.io.File;

public class LocalFileInfo extends ExtJSTreeNode implements FileInfo {

    private long modificationTime;

    private long length;

    private boolean file;

    private boolean directory;

    private String absolutePath;

    private String filename;

    public LocalFileInfo(File file) {
        this.file = file.isFile();
        this.directory = !this.file;
        this.filename = file.getName();
        this.absolutePath = file.getAbsolutePath();
        this.length = file.length();
        this.modificationTime = file.lastModified();

        this.setText(this.filename);
        this.setLeaf(this.file);
        this.setCls(directory ? "folder" : "file");
        this.setId(absolutePath);
    }

    @Override
    public String getFilename() {
        return filename;
    }

    @Override
    public String getFullyQualifiedPath() {
        return absolutePath;
    }

    @Override
    public long getLength() {
        return length;
    }

    @Override
    public String getPath() {
        return FileUtils.getPath(absolutePath);
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
        return "";
    }

    @Override
    public String getGroup() {
        return "";
    }

    @Override
    public long getBlockSize() {
        return 1;
    }

    @Override
    public int getReplication() {
        return 1;
    }

    @Override
    public long getModificationTime() {
        return modificationTime;
    }

    @Override
    public long getAccessTime() {
        return modificationTime;
    }

    @Override
    public String getPermission() {
        return "";
    }
}
