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

import org.apache.commons.lang.StringUtils;
import org.openflamingo.core.exception.FileSystemException;
import org.openflamingo.model.rest.*;
import org.openflamingo.provider.fs.FileSystemAuditService;
import org.openflamingo.provider.fs.FileSystemProvider;
import org.openflamingo.provider.fs.FileSystemService;
import org.openflamingo.provider.locale.ResourceBundleRetreiver;
import org.openflamingo.util.FileUtils;
import org.springframework.util.AntPathMatcher;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Apaceh Hadoop HDFS File System Service Implementation.
 *
 * @author Edward KIM
 * @since 0.4
 */
public class HdfsFileSystemServiceImpl implements FileSystemService {

    /**
     * File System Audit Service
     */
    private FileSystemAuditService auditService;

    @Override
    public void initializeUser(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String userhome = command.getString("userhome");
        String username = command.getString("username");
        String path = userhome + "/" + username;
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            if (!provider.exists(userhome)) {
                provider.mkdir(userhome);
            }

            if (!provider.exists(path)) {
                provider.mkdir(userhome);
            }
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_INIT_USER", username, path), ex);
        }
    }

    private ResourceBundleRetreiver getResourceBundle(Context context) {
        return (ResourceBundleRetreiver) context.getObject(ResourceBundleRetreiver.KEY);
    }

    @Override
    public List<FileInfo> getDirectories(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.list(command.getString("path"), command.getBoolean("directoryOnly"));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_DIRECTORY_INFO"), ex);
        }
    }

    @Override
    public boolean createDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("path");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean created = provider.mkdir(command.getString("path"));
            auditService.log(context, FileSystemType.HDFS, AuditType.CREATE, FileType.DIRECTORY, command.getString("path"), "", 0);
            return created;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_CREATE_DIRECTORY"), ex);
        }
    }

    @Override
    public boolean deleteDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("path");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            long length = getFileInfo(context, command.getString("path")).getLength();
            boolean deleted = provider.delete(command.getString("path"));
            auditService.log(context, FileSystemType.HDFS, AuditType.DELETE, FileType.DIRECTORY, command.getString("path"), "", length);
            return deleted;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_DELETE_DIRECTORY"), ex);
        }
    }

    @Override
    public boolean renameDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("from");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean renamed = provider.rename(command.getString("from"), command.getString("to"));
            auditService.log(context, FileSystemType.HDFS, AuditType.RENAME, FileType.DIRECTORY, command.getString("from"), command.getString("to"), 0);
            return renamed;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_RENAME_DIRECTORY"), ex);
        }
    }

    @Override
    public boolean moveDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("to");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        for (String path : paths) {
            String pathToValid = command.getString("from");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            long length = getFileInfo(context, command.getString("from")).getLength();
            boolean moved = provider.rename(command.getString("from"), command.getString("to"));
            auditService.log(context, FileSystemType.HDFS, AuditType.MOVE, FileType.DIRECTORY, command.getString("from"), command.getString("to"), length);
            return moved;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_MOVE_DIRECTORY"), ex);
        }
    }

    @Override
    public boolean copyDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("to");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean copied = provider.copy(command.getString("from"), command.getString("to"));
            auditService.log(context, FileSystemType.HDFS, AuditType.COPY, FileType.DIRECTORY, command.getString("from"), command.getString("to"), getFileInfo(context, command.getString("from")).getLength());
            return copied;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_COPY_DIRECTORY"), ex);
        }
    }

    @Override
    public FileInfo getFileInfo(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getFileInfo(command.getString("path"));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_INFO"), ex);
        }
    }

    /**
     * 디렉토리 정보를 확인한다.
     *
     * @param context File System Context Object
     * @param path    경로
     * @return 디렉토리 정보 확인 여부
     */
    private HdfsFileInfo getFileInfo(Context context, String path) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return (HdfsFileInfo) provider.getFileInfo(path);
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_DIRECTORY_INFO"), ex);
        }
    }

    @Override
    public List<FileInfo> getFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.list(command.getString("path"));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_LIST_FILES"), ex);
        }
    }

    @Override
    public boolean renameFile(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = FileUtils.getPath(command.getString("path"));
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean renamed = provider.rename(command.getString("path"), command.getString("filename"));
            auditService.log(context, FileSystemType.HDFS, AuditType.RENAME, FileType.FILE, command.getString("path"), FileUtils.getPath(command.getString("path")) + "/" + command.getString("filename"), 0);
            return renamed;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_LIST_FILES"), ex);
        }
    }

    @Override
    public List<String> copyFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String destinationPath = command.getString("to");
            String pathToValid = FileUtils.getPath(destinationPath);
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            List<String> ps = (List<String>) command.getObject("from");
            List<String> copied = new ArrayList();
            for (String p : ps) {
                long length = getFileInfo(context, p).getLength();
                boolean isCopied = provider.copy(p, command.getString("to"));
                if (isCopied) {
                    copied.add(p);
                    auditService.log(context, FileSystemType.HDFS, AuditType.COPY, FileType.FILE, p, command.getString("to"), length);
                }
            }
            return copied;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_COPY_FILE"), ex);
        }
    }

    @Override
    public List<String> moveFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("to");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        for (String path : paths) {
            String destinationPath = ((List<String>) command.getObject("from")).get(0);
            String pathToValid = FileUtils.getPath(destinationPath);
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            List<String> ps = (List<String>) command.getObject("from");
            List<String> moved = new ArrayList();
            for (String p : ps) {
                long length = getFileInfo(context, p).getLength();
                boolean isMoved = provider.move(p, command.getString("to"));
                if (isMoved) {
                    moved.add(p);
                    auditService.log(context, FileSystemType.HDFS, AuditType.MOVE, FileType.FILE, p, command.getString("to"), length);
                }
            }
            return moved;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_MOVE_FILE"), ex);
        }
    }

    @Override
    public List<String> deleteFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        String first = ((List<String>) command.getObject("path")).get(0);
        for (String path : paths) {
            String pathToValid = FileUtils.getPath(first);
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            List<String> ps = (List<String>) command.getObject("path");
            List<String> deleted = new ArrayList();
            for (String p : ps) {
                long length = getFileInfo(context, p).getLength();
                boolean isDeleted = provider.delete(p);
                if (isDeleted) {
                    deleted.add(p);
                    auditService.log(context, FileSystemType.HDFS, AuditType.DELETE, FileType.FILE, p, "", length);
                }
            }
            return deleted;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_DELETE_FILE"), ex);
        }
    }

    @Override
    public FileInfo infoFile(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getFileInfo(command.getString("path"));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_FILE_INFO"), ex);
        }
    }

    @Override
    public boolean save(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("path");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            }
        }

        FileSystemProvider provider = getFileSystemProvider(context);

        if (provider.exists(command.getString("path"))) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "ALREADY_EXISTS_FILE"));
        }

        try {
            boolean saved = provider.save(command.getString("path"), (byte[]) command.getObject("content"));
            auditService.log(context, FileSystemType.HDFS, AuditType.UPLOAD, FileType.FILE, command.getString("path"), "", getFileInfo(context, command.getString("path")).getLength());
            return saved;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_UPLOAD"), ex);
        }
    }

    @Override
    public byte[] load(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            byte[] loaded = provider.load(command.getString("path"), command.getString("filename"));
            auditService.log(context, FileSystemType.HDFS, AuditType.DOWNLOAD, FileType.FILE, command.getString("path"), "", getFileInfo(context, command.getString("path")).getLength());
            return loaded;
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_DOWNLOAD"), ex);
        }
    }

    @Override
    public Map<String, Object> getFileSystemStatus(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getFileSystemStatus(command.getString("status"));
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_FS_INFO"), ex);
        }
    }

    @Override
    public int getSize(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getSize(command.getString("path"), false);
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_CHECK_FILE_SIZE"), ex);
        }
    }

    @Override
    public int getCount(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getCount(command.getString("path"), false);
        } catch (Exception ex) {
            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_CHECK_FOUND_COUNT"), ex);
        }
    }

    /**
     * HDFS File System Provider를 생성한다.
     *
     * @param context File System Context
     * @return HDFS File System Provider
     */
    private FileSystemProvider getFileSystemProvider(Context context) {
        return new HdfsFileSystemProvider(context);
    }

    public void setFileSystemAuditService(FileSystemAuditService auditService) {
        this.auditService = auditService;
    }
}
