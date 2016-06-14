/*
 * Copyright 2012 Stanley Shyiko
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.openflamingo.maven;

import org.apache.commons.io.IOUtils;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.openflamingo.util.FileUtils;
import org.openflamingo.util.HdfsUtils;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.util.Assert;

import java.io.File;
import java.io.FileInputStream;

/**
 * HDFS PUT Mojo.
 *
 * @goal put
 */
public class PutMojo extends AbstractMojo {

    /**
     * 파일을 업로드할 HDFS의 경로
     *
     * @parameter property="hdfsPath"
     * @required
     */
    private String hdfsPath;

    /**
     * 업로드할 파일의 이름
     *
     * @parameter property="artifactPath" default-value="${project.build.finalName}"
     * @required
     */
    private String artifactPath;

    /**
     * 업로드할 경로에 이미 존재하는 경우 삭제 여부.
     *
     * @parameter property="deleteIfExists" default-value="true"
     */
    private boolean deleteIfExists;

    /**
     * Namenode RPC URL (e.g. hdfs://localhost:9000)
     *
     * @parameter property="namenode"
     * @required
     */
    private String namenode;

    @Override
    public void execute() throws MojoExecutionException, MojoFailureException {
        Assert.hasLength(namenode, "'namenode' is null");
        Assert.hasLength(artifactPath, "'artifactPath' is null");
        Assert.hasLength(hdfsPath, "'hdfsPath' is null");

        getLog().info("Namenode is " + namenode);
        getLog().info(MessageFormatter.format("Copying {} to {}", hdfsPath, artifactPath).getMessage());

        if (!new File(artifactPath).exists()) {
            String message = MessageFormatter.format("'{}' doesn't exists", artifactPath).getMessage();
            getLog().error(message);
            throw new MojoExecutionException(message);
        }

        FileSystem fs = HdfsUtils.getFileSystem(namenode);
        if (deleteIfExists && HdfsUtils.isExist(fs, artifactPath)) {
            HdfsUtils.delete(fs, artifactPath);
            getLog().info(MessageFormatter.format("Deleted {}", artifactPath).getMessage());
        }

        if (!HdfsUtils.isExist(fs, hdfsPath)) {
            HdfsUtils.mkdir(fs, hdfsPath);
            getLog().info(MessageFormatter.format("Created {}", hdfsPath).getMessage());
        }

        FileInputStream fis = null;
        FSDataOutputStream fdos = null;
        try {
            fis = new FileInputStream(artifactPath);
            String filename = FileUtils.getFilename(artifactPath);
            fdos = fs.create(new Path(hdfsPath, filename));
            IOUtils.copy(fis, fdos);

            getLog().info(MessageFormatter.format("Copied {} to {}", hdfsPath, artifactPath).getMessage());
        } catch (Exception ex) {
            String message = MessageFormatter.format("Cannot copied {} to {}", hdfsPath, artifactPath).getMessage();
            throw new MojoExecutionException(message, ex);
        } finally {
            IOUtils.closeQuietly(fdos);
            IOUtils.closeQuietly(fis);
        }
    }

}
