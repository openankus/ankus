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

import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.provider.fs.FileSystemProvider;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.util.Assert;

import java.io.*;
import java.util.List;
import java.util.Map;

public class LoalFileSystemProvider implements FileSystemProvider<Object> {

    @Override
    public List<FileInfo> list(String path, boolean directoryOnly) {
        return null;
    }

    @Override
    public List<FileInfo> list(String path) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean exists(String path) {
        return new File(path).exists();
    }

    @Override
    public int getCount(String path, boolean directoryOnly) {
        File file = new File(path);
        if (file.isFile()) {
            return 1;
        }

        try {
            if (directoryOnly) {
                return new File(path).list(new FilenameFilter() {
                    @Override
                    public boolean accept(File file, String name) {
                        return !file.isFile();
                    }
                }).length;
            } else {
                return new File(path).list().length;
            }
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 경로를 접근할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public FileInfo getFileInfo(String path) {
        File file = new File(path);
        return null;
    }

    @Override
    public InputStream getContent(String path) {
        File file = new File(path);
        if (!file.isFile()) {
            String message = MessageFormatter.format("'{}'은 디렉토리입니다.", path).getMessage();
            throw new FileSystemException(message);
        }
        try {
            return new FileInputStream(file);
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 경로를 접근할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public boolean delete(String path) {
        Assert.hasLength(path, "삭제할 파일 또는 디렉토리 'path'을 입력해 주십시오.");

        File file = new File(path);
        if (!file.isFile()) {
            String message = MessageFormatter.format("'{}'은 디렉토리입니다.", path).getMessage();
            throw new FileSystemException(message);
        }

        try {
            return new File(path).delete();
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 파일을 삭제할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public List<String> delete(List<String> paths) {
        return null;
    }

    @Override
    public List<String> delete(String[] paths) {
        return null;
    }

    @Override
    public DataOutput create(String fileName) {
        return null;
    }

    @Override
    public boolean rename(String from, String name) {
        return false;
    }

    @Override
    public boolean move(String file, String to) {
        return false;
    }

    @Override
    public List<String> move(List<String> files, String to) {
        return null;
    }

    @Override
    public boolean copy(String file, String to) {
        return false;
    }

    @Override
    public boolean mkdir(String path) {
        File file = new File(path);
        if (file.isFile()) {
            String message = MessageFormatter.format("'{}'은 파일 입니다.", path).getMessage();
            throw new FileSystemException(message);
        }

        try {
            return new File(path).mkdir();
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 디렉토리를 생성할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public List<String> copy(List<String> files, String to) {
        return null;
    }

    @Override
    public boolean isMatch(String path, String antPathPattern) {
        return false;
    }

    @Override
    public boolean save(InputStream is, String path) {
        return false;
    }

    @Override
    public boolean save(String path, byte[] content) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Object getNativeFileSystem() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Map<String, Object> getFileSystemStatus(String type) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public int getSize(String path, boolean directoryOnly) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public byte[] load(String path, String filename) {
        return new byte[0];  //To change body of implemented methods use File | Settings | File Templates.
    }
}
