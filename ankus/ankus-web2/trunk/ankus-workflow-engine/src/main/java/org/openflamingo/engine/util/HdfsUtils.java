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
package org.openflamingo.engine.util;

import org.apache.commons.io.IOUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.fs.permission.FsPermission;
import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileUtils;
import org.slf4j.helpers.MessageFormatter;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

/**
 * Hadoop HDFS Utility.
 *
 * @author Byoung Gon, Kim
 * @since 0.1
 */
public class HdfsUtils {

    /**
     * 기본 HDFS URL의 Prefix
     */
    public static final String HDFS_URL_PREFIX = "hdfs://";

    /**
     * 파일을 문자열로 변환시 사용할 수 있는 최대 문자열의 길이
     */
    public static final long MAX_SIZE = 500 * FileUtils.KB;

    /**
     * 입력으로 선택한 경로를 지정한 목적 경로로 이동한다.
     *
     * @param source 이동할 경로
     * @param target 이동할 위치
     * @param fs     Hadoop FileSystem
     */
    public static void move(String source, String target, FileSystem fs) throws Exception {
        Path srcPath = new Path(source);
        Path[] srcs = FileUtil.stat2Paths(fs.globStatus(srcPath), srcPath);
        Path dst = new Path(target);
        if (srcs.length > 1 && !fs.getFileStatus(dst).isDir()) {
            throw new FileSystemException("When moving multiple files, destination should be a directory.");
        }
        for (int i = 0; i < srcs.length; i++) {
            if (!fs.rename(srcs[i], dst)) {
                FileStatus srcFstatus = null;
                FileStatus dstFstatus = null;
                try {
                    srcFstatus = fs.getFileStatus(srcs[i]);
                } catch (FileNotFoundException e) {
                    throw new FileNotFoundException(srcs[i] + ": No such file or directory");
                }
                try {
                    dstFstatus = fs.getFileStatus(dst);
                } catch (IOException e) {
                    // Nothing
                }
                if ((srcFstatus != null) && (dstFstatus != null)) {
                    if (srcFstatus.isDir() && !dstFstatus.isDir()) {
                        throw new FileSystemException("cannot overwrite non directory " + dst + " with directory " + srcs[i]);
                    }
                }
                throw new FileSystemException("Failed to rename " + srcs[i] + " to " + dst);
            }
        }
    }

    /**
     * 지정한 HDFS의 파일에 대한 InputStream을 반환한다.
     *
     * @param fs       FileSystem
     * @param filename fully qualified path
     * @return 입력 스트립
     * @throws java.io.IOException 파일에 접근할 수 없는 경우
     */
    public static InputStream getInputStream(FileSystem fs, String filename) throws IOException {
        return fs.open(new Path(filename));
    }

    /**
     * "<tt>fs.default.name</tt>"에 해당하는 HDFS URL 정보로 Hadoop FileSystem을 반환한다.
     *
     * @param fsDefaultName "<tt>core-site.xml</tt>"에 포함되어 있는 "<tt>fs.default.name</tt>" 값
     * @return FileSystem
     */
    public static FileSystem getFileSystem(String fsDefaultName) {
        Configuration conf = new Configuration();
        conf.set("fs.default.name", fsDefaultName);
        try {
            return FileSystem.get(conf);
        } catch (IOException e) {
            throw new FileSystemException("Cannot get FileSystem. " + ExceptionUtils.getFullStackTrace(e), e);
        }
    }

    /**
     * 지정한 경로의 파일을 로딩하여 문자열로 구성한다.
     *
     * @param fs   FileSystem
     * @param path 확인할 Path
     * @return 로딩한 파일의 문자열
     */
    public static String load(FileSystem fs, String path) {
        return load(fs, path, "UTF-8");
    }

    /**
     * 지정한 경로가 디렉토리인지 확인한다.
     *
     * @param fs   FileSystem
     * @param path 확인할 Path
     * @return 디렉토리인 경우 <tt>true</tt>
     */
    public static boolean isDir(FileSystem fs, String path) {
        try {
            return !fs.isFile(new Path(path));
        } catch (Exception ex) {
            String message = MessageFormatter.format("지정한 경로 '{}'에 접근할 수 있습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    /**
     * 지정한 경로가 파일인지 확인한다.
     *
     * @param fs   FileSystem
     * @param path 확인할 Path
     * @return 파일인 경우 <tt>true</tt>
     */
    public static boolean isFile(FileSystem fs, String path) {
        try {
            return fs.isFile(new Path(path));
        } catch (Exception ex) {
            String message = MessageFormatter.format("지정한 경로 '{}'에 접근할 수 있습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    /**
     * 지정한 경로를 삭제한다.
     *
     * @param fs   FileSystem
     * @param path 삭제할 경로
     * @return 정상적으로 삭제한 경우 <tt>true</tt>
     */
    public static boolean delete(FileSystem fs, String path) {
        try {
            return fs.delete(new Path(path), true);
        } catch (Exception ex) {
            String message = MessageFormatter.format("지정한 경로 '{}'을 삭제할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    /**
     * 지정한 경로를 생성한다.
     *
     * @param fs   FileSystem
     * @param path 생성할 경로
     * @return 정상적으로 생성한 경우 <tt>true</tt>
     */
    public static boolean mkdir(FileSystem fs, String path) {
        try {
            return FileSystem.mkdirs(fs, new Path(path), FsPermission.getDefault());
        } catch (Exception ex) {
            String message = MessageFormatter.format("지정한 경로 '{}'을 생성할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    /**
     * 지정한 경로의 파일을 문자열로 로딩한다. 다음의 조건에 해당하면 처리하지 않는다.
     * <ul>
     * <li>파일이 아닌 경우</li>
     * <li>파일의 크기가 </li>
     * </ul>
     *
     * @param fs       Hadoop의 {@link org.apache.hadoop.fs.FileSystem}
     * @param path     Path
     * @param encoding 인코딩
     * @return 문자열
     */
    public static String load(FileSystem fs, String path, String encoding) {
        try {
            FileStatus fileStatus = fs.getFileStatus(new Path(path));
            long length = fileStatus.getLen();
            if (length > MAX_SIZE) {
                throw new IllegalArgumentException("로딩할 파일이 " + MAX_SIZE + " bytes를 넘습니다.");
            }
        } catch (Exception ex) {
            String message = MessageFormatter.format("지정한 경로 '{}'에 접근할 수 있습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }

        FSDataInputStream is = null;
        try {
            is = fs.open(new Path(path));
            return IOUtils.toString(is, encoding);
        } catch (IOException e) {
            String message = MessageFormatter.format("지정한 '{}' 파일을 로딩할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, e);
        } finally {
            IOUtils.closeQuietly(is);
        }
    }

    /**
     * "<tt>hdfs://</tt>"으로 시작하는 HDFS의 경로를 기반으로 Hadoop의 FileSystem을 반환한다.
     *
     * @param path HDFS Path
     * @return FileSystem
     */
    public static FileSystem getFileSystemFromPath(String path) {
        if (!path.startsWith(HDFS_URL_PREFIX) || path.startsWith("file:///")) {
            try {
                Configuration conf = new Configuration();
                return FileSystem.getLocal(conf);
            } catch (IOException e) {
                throw new FileSystemException("Apache Hadoop의 Local FileSystem을 생성할 수 없습니다.", e);
            }
        }

        StringBuilder builder = new StringBuilder();
        builder.append(HDFS_URL_PREFIX);
        builder.append(getIpAddressFromPath(path));
        builder.append(getPortFromPath(path));
        return getFileSystem(builder.toString());
    }

    /**
     * HDFS Path에서 IP주소를 추출한다.
     *
     * @param path HDFS Path
     * @return IP Address
     */
    public static String getIpAddressFromPath(String path) {
        if (!path.startsWith(HDFS_URL_PREFIX)) {
            throw new FileSystemException(MessageFormatter.format("지정한 경로 '{}'이 유효하지 않습니다.", path).getMessage());
        }
        String[] split = org.springframework.util.StringUtils.delete(path, HDFS_URL_PREFIX).split(":");
        return split[0];
    }

    /**
     * HDFS Path에서 Port를 추출한다.
     *
     * @param path HDFS Path
     * @return Port
     */
    public static String getPortFromPath(String path) {
        if (!path.startsWith(HDFS_URL_PREFIX)) {
            throw new FileSystemException(MessageFormatter.format("지정한 경로 '{}'이 유효하지 않습니다.", path).getMessage());
        }
        String[] split = org.springframework.util.StringUtils.delete(path, HDFS_URL_PREFIX).split(":");
        if (split.length != 2) {
            throw new FileSystemException("경로 패턴의 형식이 틀립니다. 경로 패턴은 \"hdfs://IP:PORT\" 형식으로 작성해주십시오.");
        }
        return split[1];
    }

    /**
     * 지정한 경로의 디렉토리 또는 파일이 존재하는지 확인한다.
     *
     * @param fs   Hadoop {@link org.apache.hadoop.fs.FileSystem}
     * @param path 경로
     * @return 존재하는 경우 <tt>true</tt>
     */
    public static boolean isExist(FileSystem fs, String path) {
        try {
            return fs.exists(new Path(path));
        } catch (IOException e) {
            return false;
        }
    }

    /**
     * Hadoop {@link org.apache.hadoop.conf.Configuration}으로 FileSystem을 생성한다.
     *
     * @param conf {@link org.apache.hadoop.conf.Configuration}
     * @return FileSystem
     */
    public static FileSystem getFileSystem(Configuration conf) {
        try {
            return FileSystem.get(conf);
        } catch (Exception e) {
            throw new FileSystemException("Apache Hadoop의 FileSystem에 접근할 수 없습니다.", e);
        }
    }
}
