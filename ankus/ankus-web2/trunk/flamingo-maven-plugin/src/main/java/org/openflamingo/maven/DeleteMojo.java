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

import org.apache.hadoop.fs.FileSystem;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugin.MojoFailureException;
import org.openflamingo.util.HdfsUtils;
import org.springframework.util.Assert;

/**
 * HDFS DELETE Mojo.
 *
 * @goal delete
 */
public class DeleteMojo extends AbstractMojo {

    /**
     * DFS file/directory that needs to be deleted
     *
     * @parameter property="deletePath"
     * @required
     */
    private String deletePath;

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
        Assert.hasLength(deletePath, "'deletePath' is null");

        getLog().info("Namenode is " + namenode);
        getLog().info("Deleting " + deletePath);

        FileSystem fs = HdfsUtils.getFileSystem(namenode);
        HdfsUtils.delete(fs, deletePath);

        getLog().info("Deleted " + deletePath);
    }

}
