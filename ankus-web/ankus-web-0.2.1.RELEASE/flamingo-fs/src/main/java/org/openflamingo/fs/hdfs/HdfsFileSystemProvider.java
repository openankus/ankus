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

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.SystemUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.hdfs.DFSClient;
import org.apache.hadoop.hdfs.protocol.FSConstants;
import org.apache.hadoop.util.StringUtils;
import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.model.rest.Authority;
import org.openflamingo.model.rest.Context;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.model.rest.HadoopCluster;
import org.openflamingo.provider.fs.FileSystemProvider;
import org.openflamingo.provider.locale.ResourceBundleRetreiver;
import org.openflamingo.util.FileUtils;
import org.openflamingo.util.HdfsUtils;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.PathMatcher;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

import static org.apache.hadoop.util.StringUtils.byteDesc;
import static org.apache.hadoop.util.StringUtils.formatPercent;
import static org.openflamingo.model.rest.Context.AUTORITY;
import static org.openflamingo.model.rest.Context.HADOOP_CLUSTER;

/**
 * Hadoop HDFS File System Provider.
 * 사용자의 요청마다 생성되는 File System Provider는 다수의 Hadoop Cluster를 지원하기 위해서
 * Workflow Engine에 File System과 관련된 정보를 전달한다. Workflow Engine은 Hadoop Cluster 정보를 받아서
 * File System Provider를 생성한 후 File System 관련 작업을 수행하게 된다.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsFileSystemProvider implements FileSystemProvider<org.apache.hadoop.fs.FileSystem> {

    /**
     * HDFS File System
     */
    private org.apache.hadoop.fs.FileSystem fs;

    /**
     * User Authority
     */
    private Authority authority;

    /**
     * Apache Ant Path Pattern Matcher
     */
    private final static PathMatcher antPathMatcher = new AntPathMatcher();

    private ResourceBundleRetreiver bundle;

    /**
     * 기본 생성자.
     */
    private HdfsFileSystemProvider() {
        // Nothing
    }

    /**
     * 기본 생성자.
     *
     * @param context File System Context
     */
    public HdfsFileSystemProvider(Context context) {
        HadoopCluster hadoopCluster = (HadoopCluster) context.getObject(HADOOP_CLUSTER);
        this.authority = (Authority) context.getObject(AUTORITY);
        this.bundle = (ResourceBundleRetreiver) context.getObject(ResourceBundleRetreiver.KEY);
        try {
            this.fs = FileSystem.get(HdfsHelper.getConfiguration(hadoopCluster));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_ACCESS_FS", hadoopCluster.getHdfsUrl()), ex);
        }
    }

    @Override
    public List<FileInfo> list(String path, boolean directoryOnly) {
        List<FileInfo> fileInfos = new ArrayList<FileInfo>();
        try {
            FileStatus[] files = null;
            if (directoryOnly) {
                files = fs.listStatus(new Path(path), new HdfsDirectoryPathFilter(fs));
            } else {
                files = fs.listStatus(new Path(path));
            }
            for (FileStatus file : files) {
                fileInfos.add(new HdfsFileInfo(file));
            }
            return fileInfos;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_GET_LIST", path), ex);
        }
    }

    @Override
    public List<FileInfo> list(String path) {
        List<FileInfo> fileInfos = new ArrayList<FileInfo>();
        try {
            FileStatus[] files = fs.listStatus(new Path(path), new PathFilter() {
                @Override
                public boolean accept(Path path) {
                    try {
                        return fs.isFile(path);
                    } catch (IOException e) {
                        // Hadoop FileSystem Access Error
                    }
                    return false;
                }
            });

            for (FileStatus file : files) {
                fileInfos.add(new HdfsFileInfo(file));
            }
            return fileInfos;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_GET_LIST", path), ex);
        }
    }

    @Override
    public boolean exists(String path) {
        try {
            return fs.exists(new Path(path));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_CHECK_EXIST", path), ex);
        }
    }

    @Override
    public int getCount(String path, boolean directoryOnly) {
        try {
            return this.list(path, directoryOnly).size();
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_GET_COUNTS", path), ex);
        }
    }

    @Override
    public int getSize(String path, boolean directoryOnly) {
        int sumSize = 0;

        for (FileInfo fileInfo : this.list(path, directoryOnly)) {
            sumSize += fileInfo.getBlockSize();
        }

        return sumSize;
    }

    @Override
    public byte[] load(String path, String filename) {
        InputStream content = null;
        try {
            content = getContent(path);
            return FileCopyUtils.copyToByteArray(content);
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_LOAD_FILE", path), ex);
        } finally {
            IOUtils.closeQuietly(content);
        }
    }

    @Override
    public FileInfo getFileInfo(String path) {
        try {
            FileStatus fileStatus = fs.getFileStatus(new Path(path));
            HdfsFileInfo hdfsFileInfo = new HdfsFileInfo(fileStatus);

            ContentSummary summary = fs.getContentSummary(new Path(path));
            hdfsFileInfo.setBlockSize(fileStatus.getBlockSize());
            hdfsFileInfo.setReplication(fileStatus.getReplication());
            hdfsFileInfo.setDirectoryCount(summary.getDirectoryCount());
            hdfsFileInfo.setFileCount(summary.getFileCount());
            hdfsFileInfo.setQuota(summary.getQuota());
            hdfsFileInfo.setSpaceQuota(summary.getSpaceQuota());
            hdfsFileInfo.setSpaceConsumed(StringUtils.byteDesc(summary.getSpaceConsumed()));
            hdfsFileInfo.setLength(summary.getLength());

            return hdfsFileInfo;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_GET_FILE_INFO", path), ex);
        }
    }

    @Override
    public InputStream getContent(String path) {
        if (!exists(path) || !getFileInfo(path).isFile()) {
            throw new FileSystemException(bundle.message("S_FS", "NOT_EXISTS_AND_NOT_FILE", path));
        }

        try {
            return HdfsUtils.getInputStream(fs, path);
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_OPEN_IS", path));
        }
    }

    /**
     * HDFS의 파일 또는 디렉토리를 삭제한다.
     *
     * @param path HDFS의 파일 또는 디렉토리
     * @return 정상적으로 삭제된 경우 <tt>true</tt>, 그렇지 않은 경우는 <tt>false</tt>
     * @throws FileSystemException 파일 시스템에 접근할 수 없는 경우
     */
    @Override
    public boolean delete(String path) {
        try {
            boolean delete = fs.delete(new Path(path), true);
            return !this.exists(path) && delete;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_DELETE", path), ex);
        }
    }

    /**
     * 다수의 HDFS 파일 또는 디렉토리를 삭제한다.
     *
     * @param paths 삭제할 경로
     * @return 삭제되지 않은 파일 또는 디렉토리 목록
     */
    @Override
    public List<String> delete(List<String> paths) {
        List<String> deleted = new ArrayList<String>();
        for (String path : paths) {
            try {
                if (this.delete(path)) {
                    deleted.add(path);
                }
            } catch (Exception ex) {
            }
        }
        return deleted;
    }

    @Override
    public List<String> delete(String[] paths) {
        return delete(Arrays.asList(paths));
    }

    @Override
    public FSDataOutputStream create(String path) {
        if (exists(path)) {
            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_CREATE", path));
        }

        try {
            return fs.create(new Path(path));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_CREATE", path), ex);
        }
    }

    @Override
    public boolean rename(String from, String to) {
        Path srcPath = new Path(from);
        Path dstPath = new Path(FileUtils.getPath(from), to);

        try {
            boolean result = fs.rename(srcPath, dstPath);
            if (!result) {
                throw new FileSystemException(bundle.message("S_FS", "CANNOT_RENAME", srcPath.toString(), dstPath.toString()));
            }
            return result;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_RENAME", srcPath.toString(), dstPath.toString()));
        }
    }

    /**
     * 파일 또는 디렉토리를 지정한 경로로 이동한다.
     * <p/>
     * <ul>
     * <li>대상 경로가 존재하지 않는다면 이름이 변경된다.</li>
     * <li>대상 경로가 존재하고 파일인 경우 이동하지 않는다(예외 발생).</li>
     * <li>대상 경로가 존재하고 디렉토리인 경우 대상 경로로 이동한다.</li>
     * </ul>
     *
     * @param from 이동할 파일 또는 디렉토리의 원본 경로
     * @param to   이동할 대상 경로
     * @return 정상적으로 이동한 경우 <tt>true</tt>, 그렇지 않은 경우 <tt>false</tt>
     */
    @Override
    public boolean move(String from, String to) {
        if (!exists(from)) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_MOVE", from));
        }

        if (getFileInfo(to).isFile()) {
            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_MOVE", to, from));
        }

        // 파일을 옮기기 위해서 옮겨질 위치에 이미 동일한 파일이 있다면 건너뛴다.
        String target = to + SystemUtils.FILE_SEPARATOR + FileUtils.getFilename(from);
        if (exists(target)) {
            throw new FileSystemException(bundle.message("S_FS", "ALREADY_EXISTS_NOT_MOVE", target));
        }

        try {
            Path srcPath = new Path(from);
            Path dstPath = new Path(to);

            return fs.rename(srcPath, dstPath);
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_MOVE", from, to), ex);
        }
    }

    @Override
    public List<String> move(List<String> files, String to) {
        List<String> moved = new ArrayList<String>();
        for (String file : files) {
            boolean move = move(file, to);
            if (move) moved.add(file);
        }
        return moved;
    }

    @Override
    public boolean copy(String from, String to) {
        // 파일을 옮기기 위해서 옮겨질 위치에 이미 동일한 파일이 있다면 건너뛴다.
        String target = null;
        if ("/".equals(to)) {
            target = to + FileUtils.getFilename(from);
        } else {
            target = to + SystemUtils.FILE_SEPARATOR + FileUtils.getFilename(from);
        }

        if (exists(target))
            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_COPY", target));

        try {
            if (fs.isFile(new Path(from))) {
                FSDataInputStream fis = fs.open(new Path(from));
                FSDataOutputStream fos = fs.create(new Path(target));

                org.springframework.util.FileCopyUtils.copy(fis, fos);

                IOUtils.closeQuietly(fos);
                IOUtils.closeQuietly(fis);
            } else {
                FileUtil.copy(fs, new Path(from), fs, new Path(to), false, new Configuration());
            }

            return true;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_COPY", from, to), ex);
        }
    }

    @Override
    public boolean mkdir(String path) {
        if (exists(path)) {
            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_CREATE", path));
        }

        try {
            return fs.mkdirs(new Path(path));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_CREATE_DIR", path), ex);
        }
    }

    @Override
    public List<String> copy(List<String> files, String to) {
        List<String> copied = new ArrayList<String>();
        for (String file : files) {
            boolean result = copy(file, to);
            if (result) {
                copied.add(file);
            }
        }
        return copied;
    }

    @Override
    public boolean isMatch(String pathPattern, String path) {
        return antPathMatcher.match(pathPattern, path);
    }

    @Override
    public boolean save(String path, byte[] content) {
        ByteArrayInputStream bais = new ByteArrayInputStream(content);
        return save(bais, path);
    }

    @Override
    public boolean save(InputStream is, String path) {
        OutputStream os = null;
        try {
            if (fs.exists(new Path(path))) {
                return false;
            }
            os = fs.create(new Path(path));
            org.springframework.util.FileCopyUtils.copy(is, os);
            return true;
        } catch (Exception ex) {
            return false;
        } finally {
            try {
                if (os != null) os.close();
            } catch (Exception ex) {
                // Ignored
            }

            try {
                if (is != null) is.close();
            } catch (Exception ex) {
                // Ignored
            }
        }
    }

    @Override
    public org.apache.hadoop.fs.FileSystem getNativeFileSystem() {
        return fs;
    }

    @Override
    public Map<String, Object> getFileSystemStatus(String type) {
        Map<String, Object> map = new HashMap();
        DFSClient dfsClient = null;
        try {
            dfsClient = new DFSClient(fs.getConf());
            map.put("canonicalServiceName", fs.getCanonicalServiceName());
            map.put("defaultReplication", fs.getDefaultReplication());
            map.put("defaultBlockSize", fs.getDefaultBlockSize());
            map.put("workingDirectory", fs.getWorkingDirectory().toUri().getPath());
            map.put("homeDirectory", fs.getHomeDirectory().toUri().getPath());
            map.put("corruptBlocksCount", dfsClient.getCorruptBlocksCount());
            map.put("missingBlocksCount", dfsClient.getMissingBlocksCount());
            map.put("underReplicatedBlocksCount", dfsClient.getUnderReplicatedBlocksCount());
            map.put("capacity", dfsClient.getDiskStatus().getCapacity());
            map.put("used", dfsClient.getDiskStatus().getDfsUsed());
            map.put("remaining", dfsClient.getDiskStatus().getRemaining());
            map.put("deadNodes", dfsClient.namenode.getDatanodeReport(FSConstants.DatanodeReportType.DEAD).length);
            map.put("liveNodes", dfsClient.namenode.getDatanodeReport(FSConstants.DatanodeReportType.LIVE).length);
            map.put("humanCapacity", byteDesc(dfsClient.getDiskStatus().getCapacity()));
            map.put("humanUsed", byteDesc(dfsClient.getDiskStatus().getDfsUsed()));
            map.put("humanProgressPercent", formatPercent((double) dfsClient.getDiskStatus().getRemaining() / (double) dfsClient.getDiskStatus().getCapacity(), 2));
            map.put("humanProgress", (float) dfsClient.getDiskStatus().getRemaining() / (float) dfsClient.getDiskStatus().getCapacity());
            map.put("humanRemaining", byteDesc(dfsClient.getDiskStatus().getRemaining()));
            map.put("humanDefaultBlockSize", byteDesc(fs.getDefaultBlockSize()));
            dfsClient.close();
            return map;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS", "CANNOT_ACCESS_FS_STATUS"), ex);
        } finally {
            IOUtils.closeQuietly(dfsClient);
        }
    }
}
