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
package org.openflamingo.web.viz;

import org.openflamingo.model.rest.*;
import org.openflamingo.provider.fs.FileSystemService;
import org.openflamingo.util.FileUtils;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.security.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import static org.apache.commons.lang.StringUtils.splitPreserveAllTokens;
import static org.slf4j.helpers.MessageFormatter.format;

@Controller
@RequestMapping("/viz")
public class VizController {

    private Logger logger = LoggerFactory.getLogger(VizController.class);

    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    @Autowired
    private EngineService engineService;

    @RequestMapping(value = "file", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getFile(@RequestParam String path, @RequestParam String params) {
        Response response = new Response();

        if (StringUtils.isEmpty(params) || StringUtils.isEmpty(path)) {
            response.setSuccess(false);
            response.getError().setMessage("Invalid Parameter. 'path' and 'params' parameters is required.");
            return response;
        }

        try {
            response.setSuccess(true);

            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", path);
            command.putObject("filename", FileUtils.getFilename(path));

            String[] names = splitPreserveAllTokens(params, ",");

            Engine engine = engineService.getEngine(1L);
            Context context = getContext(engine);
            byte[] bytes = getFileSystemService(engine.getIp(), engine.getPort()).load(context, command);
            String file = new String(bytes);

            String[] rows = splitPreserveAllTokens(file, "\n");
            for (int i = 0; i < rows.length; i++) {
                String row = rows[i];
                if (!StringUtils.isEmpty(row)) {
                    String[] columns = splitPreserveAllTokens(row, ",");
                    if (columns.length != 0 && columns.length != names.length) {
                        response.setSuccess(false);
                        response.getError().setMessage("Invalid File Structure");
                        return response;
                    }

                    HashMap map = new HashMap();
                    for (int j = 0; j < columns.length; j++) {
                        try {
                            map.put(names[j].trim(), Integer.parseInt(columns[j].trim()));
                        } catch (Exception ex) {
                            map.put(names[j].trim(), columns[j].trim());
                        }
                    }
                    response.getList().add(map);
                }
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage("Cannot load a file on HDFS");
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    //////////////////////////////////////////////////////////////////////////////


    private Context getContext() {
        Engine engine = new Engine();
        engine.setId(new Long(1));
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        logger.debug("접근할 Hadoop Cluster는 '{}'입니다.", hadoopCluster.getName());

        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority(SessionUtils.getUsername(), SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        return context;
    }

    private Context getContext(Engine engine) {
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority(SessionUtils.getUsername(), SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        return context;
    }

    /**
     * Remote File System Service를 가져온다.
     *
     * @param ip   Workflow Engine의 IP
     * @param port Workflow Engine의 Port
     * @return Remote File System Service
     */
    private FileSystemService getFileSystemService(String ip, String port) {
        Engine engine = new Engine();
        engine.setIp(ip);
        engine.setPort(port);
        return getFileSystemService(getFileSystemServiceUrl(engine));
    }

    /**
     * Remote File System Service를 가져온다.
     *
     * @return Remote Workflow Engine Service
     */
    private FileSystemService getFileSystemService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        factoryBean.setServiceInterface(FileSystemService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (FileSystemService) factoryBean.getObject();
    }

    /**
     * Remote File System URL을 구성한다.
     *
     * @param engine Workflow Engine
     * @return Remote File System의 URL
     */
    private String getFileSystemServiceUrl(Engine engine) {
        return format("http://{}:{}/remote/hdfs", engine.getIp(), engine.getPort()).getMessage();
    }

}