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
package org.openflamingo.web.fs;

import static org.slf4j.helpers.MessageFormatter.format;

import org.codehaus.jackson.map.ObjectMapper;
import org.openflamingo.fs.hdfs.HdfsFileInfo;
import org.openflamingo.model.rest.*;
import org.openflamingo.provider.engine.JobService;
import org.openflamingo.provider.fs.FileSystemService;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.FileUtils;
import org.openflamingo.util.StringUtils;
import org.openflamingo.web.admin.HadoopClusterAdminService;
import org.openflamingo.web.configuration.ConfigurationManager;
import org.openflamingo.web.core.LocaleSupport;
import org.openflamingo.web.core.RemoteService;
import org.openflamingo.web.engine.EngineService;
import org.openflamingo.web.security.SessionUtils;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * HDFS Browser REST Controller.
 *
 * @author Edward KIM
 * @since 0.3
 */
@Controller
@RequestMapping("/fs/hdfs")
public class HdfsBrowserController extends LocaleSupport {

    /**
     * HDFS Folder Separator
     */
    private static final String FILE_SEPARATOR = "/";

    /**
     * Parameter Encoding Option
     */
    private static final String CHARSET = "UTF-8";

    /**
     * Hadoop Cluster 정보를 얻기 위한 Hadoop Cluster Admin Service.
     */
    @Autowired
    private HadoopClusterAdminService hadoopClusterAdminService;

    /**
     * Workflow Engine 정보를 얻기 위한 Engine Service.
     */
    @Autowired
    private EngineService engineService;

    /**
     * Remote Service Lookup Service.
     */
    @Autowired
    private RemoteService lookupService;

    /**
     * 기본 금지 경로 목록
     */
    public static String DEFAULT_FORBIDDEN_PATH = "/tmp,/tmp/**/*,/user,/user/hive/**/*";

    /**
     * 지정한 경로의 디렉토리 목록을 획득한다.
     *
     * @param node     디렉토리 목록을 획득한 경로(ExtJS에서 사용하는 파라미터)
     * @param engineId 파일 시스템에 접근하기 위해서 필요한 워크플로우 엔진
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "directory", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getDirectories(@RequestParam String node,
                                   @RequestParam(defaultValue = "") String engineId) {
        Response response = new Response();

        if (StringUtils.isEmpty(node) || StringUtils.isEmpty(engineId)) {
            response.setSuccess(true);
            return response;
        }

        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", node);
            command.putBoolean("directoryOnly", true);

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            List<FileInfo> directories = fileSystemService.getDirectories(getContext(engine), command); 
            response.getList().addAll(directories);
            response.setTotal(directories.size());
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 디렉토리를 생성한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(path, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "newDirectory", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response createDirectory(@RequestBody Map<String, String> params) {
        Response response = new Response();

        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", params.get("path"));

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            boolean directory = fileSystemService.createDirectory(context, command);
            response.setSuccess(directory);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 디렉토리를 삭제한다.
     *
     * @param params 디렉토리를 삭제하는 경로 및 Engine
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "deleteDirectory", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response deleteDirectory(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", params.get("path"));

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            boolean directory = fileSystemService.deleteDirectory(context, command);
            response.setSuccess(directory);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 디렉토리명을 변경한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(from, to, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "renameDirectory", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response renameDirectory(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("from", params.get("from"));
            command.putString("to", params.get("to"));

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            boolean directory = fileSystemService.renameDirectory(context, command);
            response.setSuccess(directory);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 디렉토리를 이동한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(from, to, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "moveDirectory", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response moveDirectory(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("from", params.get("from"));
            command.putString("to", params.get("to"));

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            boolean directory = fileSystemService.moveDirectory(context, command);
            response.setSuccess(directory);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 디렉토리를 복사한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(from, to, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "copyDirectory", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response copyDirectory(@RequestBody Map<String, String> params) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("from", params.get("from"));
            command.putString("to", params.get("to"));

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            boolean directory = fileSystemService.copyDirectory(context, command);
            response.setSuccess(directory);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 디렉토리의 정보를 확인한다.
     *
     * @param path 정보를 확인할 디렉토리 경로
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "infoDirectory", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response infoDirectory(@RequestParam String path,
                                  @RequestParam(defaultValue = "") String engineId) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", path);

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            FileInfo fileInfo = fileSystemService.getFileInfo(getContext(engine), command);

            Map<String, Object> map = new HashMap();
            // Basic
            map.put("name", fileInfo.getFilename());
            map.put("path", fileInfo.getFullyQualifiedPath());
            map.put("length", fileInfo.getLength());
            
            map.put("modification", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date(fileInfo.getModificationTime())));
            map.put("isFile", fileInfo.isFile());
            map.put("isDirectory", fileInfo.isDirectory());

            // Permission
            map.put("ownerRead", fileInfo.getPermission().charAt(0) != '-' ? true : false);
            map.put("ownerWrite", fileInfo.getPermission().charAt(1) != '-' ? true : false);
            map.put("ownerExecute", fileInfo.getPermission().charAt(2) != '-' ? true : false);
            map.put("groupRead", fileInfo.getPermission().charAt(3) != '-' ? true : false);
            map.put("groupWrite", fileInfo.getPermission().charAt(4) != '-' ? true : false);
            map.put("groupExecute", fileInfo.getPermission().charAt(5) != '-' ? true : false);
            map.put("otherRead", fileInfo.getPermission().charAt(6) != '-' ? true : false);
            map.put("otherWrite", fileInfo.getPermission().charAt(7) != '-' ? true : false);
            map.put("otherExecute", fileInfo.getPermission().charAt(8) != '-' ? true : false);

            // Space
            map.put("blockSize", fileInfo.getBlockSize());
            map.put("replication", fileInfo.getReplication());
            map.put("directoryCount", fileInfo.getReplication());
            map.put("fileCount", ((HdfsFileInfo) fileInfo).getFileCount());
            map.put("quota", ((HdfsFileInfo) fileInfo).getQuota());
            map.put("spaceConsumed", ((HdfsFileInfo) fileInfo).getSpaceConsumed());
            map.put("spaceQuota", ((HdfsFileInfo) fileInfo).getSpaceQuota());

            response.getMap().putAll(map);
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 지정한 경로의 파일 목록을 획득한다.
     *
     * @param path 정보를 획득할 경로
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "file", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getFiles(@RequestParam(defaultValue = "") String engineId,
                             @RequestParam(defaultValue = "/") String path) {
        Response response = new Response();
        if (StringUtils.isEmpty(engineId)) {
            response.setSuccess(true);
            return response;
        }

        try {
        	/*
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", path);

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            List<FileInfo> files = fileSystemService.getFiles(getContext(engine), command);
            response.getList().addAll(files);
            response.setTotal(files.size());
            response.setSuccess(true);
            */
            //Directory get list
        	
        	FileSystemCommand command = new FileSystemCommand();
        	command.putString("path", path);
            command.putBoolean("directoryOnly", false); //folder and files
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            
            System.out.printf("getService_name====>[%s_%s:%s]\n", RemoteService.HDFS, engine.getIp(), engine.getPort());
            
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            
            List<FileInfo> directories = fileSystemService.getDirectories(getContext(engine), command);
            List<HdfsFileInfo> fileInfos = new ArrayList<HdfsFileInfo>();
            for(FileInfo finfo: directories)
            {
            	if( finfo.getPath().equals("/") == true)
            	{
            		command.putString("path", finfo.getPath() +finfo.getFilename());
            	}
            	else
            	{
            		command.putString("path", finfo.getPath() +"/"+ finfo.getFilename());
            	}
            	
            	System.out.println(finfo.getPath() + "/"+ finfo.getFilename());
            	HdfsFileInfo fileInfo = (HdfsFileInfo) fileSystemService.infoFile(getContext(engine), command);
            	//System.out.println("DIR SIZE1 " +fileInfo.getLength());
            	
            	fileInfos.add(fileInfo);
            }
            
            //response.getList().addAll(directories);
            response.getList().addAll(fileInfos);
            response.setTotal(directories.size());
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    @RequestMapping(value = "PathEmpty", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getPathEmpty(@RequestParam(defaultValue = "") String engineId,
                             @RequestParam(defaultValue = "/") String path) {
        Response response = new Response();
        if (StringUtils.isEmpty(engineId)) {
            response.setSuccess(true);
            return response;
        }

		Engine engine = engineService.getEngine(Long.parseLong(engineId));		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);       
    	response  = fileSystemService.DirectoryFile_Exit(path);    	
		return response;
    }
    
    /**
     * 지정한 파일의 이름을 변경한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(path, filename, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "rename", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response renameFile(@RequestBody Map<String, String> params) {
        String path = params.get("path");
        String filename = params.get("filename");

        Response response = new Response();

        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", path);
            command.putString("filename", filename);

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            boolean renamed = fileSystemService.renameFile(context, command);
            response.setSuccess(renamed);
            response.getMap().put("path", FileUtils.getPath(path));
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 지정한 경로의 파일을 복사한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(paths, to, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "copy", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response copyFiles(@RequestBody Map<String, String> params) {
        String paths = params.get("paths");
        String to = params.get("to");

        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            String[] fromItems = paths.split(",");
            List<String> files = new java.util.ArrayList<String>();
            for (String item : fromItems) {
                files.add(item);
            }
            command.putObject("from", files);
            command.putString("to", to);

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            List<String> copied = fileSystemService.copyFiles(context, command);
            response.setSuccess(true);
            response.getMap().put("path", FileUtils.getPath(fromItems[0]));
            response.getList().addAll(copied);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 지정한 경로의 파일을 이동한다.
     *
     * @param params 클라이언트에서 전송한 파라마터(paths, to, engineId)
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "move", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response moveFiles(@RequestBody Map<String, String> params) {
        String paths = params.get("paths");
        String to = params.get("to");

        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            String[] fromItems = paths.split(",");
            List<String> files = new java.util.ArrayList<String>();
            for (String item : fromItems) {
                files.add(item);
            }
            command.putObject("from", files);
            command.putString("to", to);

            Engine engine = engineService.getEngine(Long.parseLong(params.get("engineId")));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            List<String> copied = fileSystemService.moveFiles(context, command);
            response.setSuccess(true);
            response.getMap().put("path", FileUtils.getPath(fromItems[0]));
            response.getList().addAll(copied);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    @RequestMapping(value = "deleteFiles", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response deleteFiles(@RequestParam String engineId,
                                @RequestBody String[] paths) throws IOException {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", Arrays.asList(paths));

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
                     
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);
            
            List<String> notDeleted = fileSystemService.deleteFiles(context, command);            
            response.setSuccess(true);
            response.getList().addAll(notDeleted);
            response.getMap().put("path", FileUtils.getPath(paths[0]));
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 지정한 경로의 파일을 삭제한다.
     *
     * @param path 삭제할 경로
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "deleteFile", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response deleteFiles(@RequestParam List<String> path,
                                @RequestParam(defaultValue = "") String engineId) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", path);

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            List<String> notDeleted = fileSystemService.deleteFiles(context, command);
            response.setSuccess(true);
            response.getList().addAll(notDeleted);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 지정한 경로의 파일 정보를 획득한다.
     *
     * @param path 정보를 획득할 경로
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "info", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getInfo(@RequestParam String path,
                            @RequestParam(defaultValue = "") String engineId) {
        if (StringUtils.isEmpty(path)) {
            path = "/";
        }
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", path);

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            HdfsFileInfo fileInfo = (HdfsFileInfo) fileSystemService.infoFile(getContext(engine), command);

            Map<String, Object> map = new HashMap();
            // Basic
            map.put("name", fileInfo.getFilename());
            map.put("path", fileInfo.getFullyQualifiedPath());
            map.put("length", fileInfo.getLength());
                    
            map.put("modification", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date(fileInfo.getModificationTime())));
            map.put("isFile", fileInfo.isFile());
            map.put("isDirectory", fileInfo.isDirectory());

            // Permission
            map.put("ownerRead", fileInfo.getPermission().charAt(0) != '-' ? true : false);
            map.put("ownerWrite", fileInfo.getPermission().charAt(1) != '-' ? true : false);
            map.put("ownerExecute", fileInfo.getPermission().charAt(2) != '-' ? true : false);
            map.put("groupRead", fileInfo.getPermission().charAt(3) != '-' ? true : false);
            map.put("groupWrite", fileInfo.getPermission().charAt(4) != '-' ? true : false);
            map.put("groupExecute", fileInfo.getPermission().charAt(5) != '-' ? true : false);
            map.put("otherRead", fileInfo.getPermission().charAt(6) != '-' ? true : false);
            map.put("otherWrite", fileInfo.getPermission().charAt(7) != '-' ? true : false);
            map.put("otherExecute", fileInfo.getPermission().charAt(8) != '-' ? true : false);

            // Space
            map.put("blockSize", fileInfo.getBlockSize());
            map.put("replication", fileInfo.getReplication());
            map.put("directoryCount", fileInfo.getDirectoryCount());
            map.put("fileCount", fileInfo.getFileCount());
            map.put("quota", fileInfo.getQuota());
            map.put("spaceConsumed", fileInfo.getSpaceConsumed());
            map.put("spaceQuota", fileInfo.getSpaceQuota());

            response.getMap().putAll(map);
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 파일을 업로드한다.
     *
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "upload", method = RequestMethod.POST,
            consumes = {"multipart/form-data"}
    )
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> upload(HttpServletRequest req) throws IOException {
        Response response = new Response();
        if (!(req instanceof DefaultMultipartHttpServletRequest)) {
            response.setSuccess(false);
            response.getError().setCause(message("S_FS_SERVICE", "CANNOT_UPLOAD_INVALID", null));
            response.getError().setMessage(message("S_FS_SERVICE", "CANNOT_UPLOAD", null));
            String json = new ObjectMapper().writeValueAsString(response);
            return new ResponseEntity(json, HttpStatus.BAD_REQUEST);
        }

        InputStream inputStream = null;
        try {
            DefaultMultipartHttpServletRequest request = (DefaultMultipartHttpServletRequest) req;
            String pathToUpload = request.getParameter("path");           
            
            String engineId = req.getParameter("engineId");
            MultipartFile uploadedFile = request.getFile("file");
            String originalFilename = uploadedFile.getOriginalFilename();
            String fullyQualifiedPath = pathToUpload.equals("/") ? pathToUpload + originalFilename : pathToUpload + FILE_SEPARATOR + originalFilename;
            inputStream = uploadedFile.getInputStream();
            byte[] bytes = FileCopyUtils.copyToByteArray(inputStream);
            
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);

            Context context = getContext(engine);
            String forbiddenPaths = ConfigurationManager.getConfigurationManager().get("hdfs.delete.forbidden.paths", DEFAULT_FORBIDDEN_PATH);
            context.putString("hdfs.delete.forbidden.paths", forbiddenPaths);

            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", fullyQualifiedPath);
            command.putObject("content", bytes);

            boolean file = fileSystemService.save(context, command);
            response.setSuccess(file);
            response.getMap().put("directory", pathToUpload);

            String json = new ObjectMapper().writeValueAsString(response);
            return new ResponseEntity(json, HttpStatus.OK);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));

            String json = new ObjectMapper().writeValueAsString(response);
            return new ResponseEntity(json, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 파일을 다운로드한다.
     *
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "download", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity download(HttpServletResponse res, @RequestParam String path,
                                   @RequestParam(defaultValue = "") String engineId) {
        HttpHeaders headers = new HttpHeaders();
        if (org.apache.commons.lang.StringUtils.isEmpty(path)) {
            headers.set("message", message("S_FS_SERVICE", "INVALID_PARAMETER", null));
            return new ResponseEntity(headers, HttpStatus.BAD_REQUEST);       }

        String filename = FileUtils.getFilename(path);
        
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putObject("path", path);
            command.putObject("filename", filename);
            System.out.println("333333333333333333333333 " + engineId);
            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            System.out.println("4444444444444444" + engine.getName());
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            byte[] bytes = fileSystemService.load(getContext(engine), command);
        
            res.setHeader("Content-Length", "" + bytes.length);
            res.setHeader("Content-Type", MediaType.APPLICATION_OCTET_STREAM_VALUE);
            res.setHeader("Content-Disposition", MessageFormatter.format("form-data; name={}; filename={}", URLEncoder.encode(path, CHARSET), URLEncoder.encode(filename, CHARSET)).getMessage());
            res.setStatus(200);
            FileCopyUtils.copy(bytes, res.getOutputStream());
            res.flushBuffer();
            
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception ex) {
            headers.set("message", ex.getMessage());
            if (ex.getCause() != null) headers.set("cause", ex.getCause().getMessage());
            return new ResponseEntity(headers, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 파일 시스템의 상태 정보를 확인한다.
     *
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "fileSystemStatus", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getFileSystemStatus(@RequestParam(defaultValue = "") String engineId) {
        Response response = new Response();

        if (StringUtils.isEmpty(engineId)) {
            response.setSuccess(true);
            return response;
        }

        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("status", "hdfs");

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            Map<String, Object> param = fileSystemService.getFileSystemStatus(getContext(engine), command);
            response.getMap().putAll(param);
            response.setTotal(param.size());
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 지정한 디렉토리의 파일 용량를 확인한다.
     *
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "size", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getSize(@RequestParam String path,
                            @RequestParam(defaultValue = "") String engineId) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", path);

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            int size = fileSystemService.getSize(getContext(engine), command);
            Map<String, Object> map = new HashMap();
            map.put("size", size);
            response.setMap(map);
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    /**
     * 지정한 디렉토리의 파일 갯수를 확인한다.
     *
     * @return REST Response JAXB Object
     */
    @RequestMapping(value = "count", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getCount(@RequestParam String path,
                             @RequestParam(defaultValue = "") String engineId) {
        Response response = new Response();
        try {
            FileSystemCommand command = new FileSystemCommand();
            command.putString("path", path);

            Engine engine = engineService.getEngine(Long.parseLong(engineId));
            FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
            int count = fileSystemService.getCount(getContext(engine), command);
            Map<String, Object> map = new HashMap();
            map.put("count", count);
            response.setMap(map);
            response.setSuccess(true);
            return response;
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            return response;
        }
    }

    private Context getContext(Engine engine) {
        HadoopCluster hadoopCluster = hadoopClusterAdminService.getHadoopCluster(engine.getHadoopClusterId());
        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority(SessionUtils.getUsername(), SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster(hadoopCluster.getHdfsUrl()));
        context.putString("username", SessionUtils.getUsername());
        return context;
    }   
    
    //DAEMON 제어 구간
    @RequestMapping(value = "db_work_insert", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response insert_db_work(@RequestBody Map<String, String> params)
	{
		String ENGINE_ID = params.get("ENGINE_ID");
		String ENGINE_NAME = params.get("ENGINE_NAME") ;
		String WORK_NAME = params.get("WORK_NAME").trim() ;
		//String WORK_ID = params.get("WORK_ID").trim() ;
		String DATABASE_TYPE = params.get("DATABASE_TYPE") ;
		String DATABASE_ADDRESS = params.get("DATABASE_ADDRESS");
		String DATABASE_PORT = params.get("DATABASE_PORT");
		String DBid = params.get("DBid");
		String DBPassword  = params.get("DBPassword");
		String SQLSTATEMENT  = params.get("SQLSTATEMENT");
		String HDFSPATH  = params.get("HDFSPATH");
		String DATABASE_NAME = params.get("DATABASE_NAME");
		String TABLE_NAME = params.get("TABLE_NAME");
		String FILE_MODE = params.get("FILE_MODE");
		String USER_NAME = params.get("USER_NAME");
		String DELIMITER = params.get("DELIMITER");
		Response response  = new Response();
		
		Connection conn = null;                                        // null로 초기화 한다.
		PreparedStatement pstmt = null;
		int last_work_id = 0;
		int last_proccess_id = 0;
		ResultSet rs  = null;
		
		Engine engine = engineService.getEngine(Long.parseLong(params.get("ENGINE_ID")));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
        response = fileSystemService.insert_db_work(ENGINE_ID,
        														ENGINE_NAME,
        														//WORK_ID ,
																WORK_NAME ,
																DATABASE_TYPE,
																DATABASE_ADDRESS,
																DATABASE_PORT ,
																DBid,
																DBPassword  ,
																SQLSTATEMENT ,
																HDFSPATH ,																
																DATABASE_NAME ,
																TABLE_NAME , 
																FILE_MODE,
																USER_NAME,
																DELIMITER );
       
	            return response;
	}
    
    @RequestMapping(value = "WORKHISTORY_DBCHECK", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response getCheckWorkHistoyDB(@RequestParam(defaultValue = "") String ENGINE_ID,
																	@RequestParam(defaultValue = "") String DBNAME,
																	@RequestParam(defaultValue = "") String DBTYPE,
												    				@RequestParam(defaultValue = "") String db_address,
																	@RequestParam(defaultValue = "") String db_port,
												    				@RequestParam(defaultValue = "") String id,
												    				@RequestParam(defaultValue = "") String pw)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	response  = fileSystemService.getCheckWorkHistoyDB(DBNAME, DBTYPE, db_address, db_port, id, pw);
    	
		return response;
	}
	
	@RequestMapping(value = "WORKHISTORY_TABLECHECK", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response getCheckWorkHistoyTABLE(@RequestParam(defaultValue = "") String ENGINE_ID,
																		@RequestParam(defaultValue = "") String DBNAME,
																		@RequestParam(defaultValue = "") String DBTYPE,
																		@RequestParam(defaultValue = "") String TABLENAME,
													    				@RequestParam(defaultValue = "") String db_address,
																		@RequestParam(defaultValue = "") String db_port,
													    				@RequestParam(defaultValue = "") String id,
													    				@RequestParam(defaultValue = "") String pw)
	{
		
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	response  = fileSystemService.getCheckWorkHistoyTABLE(DBNAME, DBTYPE, TABLENAME, db_address, db_port, id, pw);
    	
    	return response;
    			
	}
	
	@RequestMapping(value = "import", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	//public Response getImport(@RequestParam(defaultValue = "")String ENGINE_ID,	String WORK_NAME)
    public Response getImport(@RequestParam(defaultValue = "")String ENGINE_ID,	String WORK_ID)
	{
		
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	//response  = fileSystemService.getImport(WORK_NAME);
    	response  = fileSystemService.getImport(WORK_ID);
    	
		return response;
	}
	
	
	@RequestMapping(value = "PROGRESSRATE", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	//public Response getProgressRate(@RequestParam(defaultValue = "") String ENGINE_ID,	@RequestParam(defaultValue = "") String WORK_NAME)
	public Response getProgressRate(@RequestParam(defaultValue = "") String ENGINE_ID,	
														@RequestParam(defaultValue = "") String WORK_ID)
	{
		
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	//response  = fileSystemService.getProgressRate(WORK_NAME);
    	response  = fileSystemService.getProgressRate(WORK_ID);
    	
    	return response;
    			
		
	}
	
	@RequestMapping(value = "WorkNameParameter", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	//public Response getWorkNameParameter(@RequestParam(defaultValue = "")  String ENGINE_ID,	@RequestParam(defaultValue = "") String WORK_NAME	)
	public Response getWorkNameParameter(@RequestParam(defaultValue = "")  String ENGINE_ID, 
																		@RequestParam(defaultValue = "") String WORK_ID	)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	//response  = fileSystemService.getWorkNameParameter(WORK_NAME);
        response  = fileSystemService.getWorkNameParameter(WORK_ID);
    	
    	return response;
	}
	
	@RequestMapping(value = "workhistory", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response workhistory(@RequestParam(defaultValue = "")  String ENGINE_ID)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));

		//remote method call
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
        
        long enigneid = Long.parseLong(ENGINE_ID);
        response  = fileSystemService.workdashboard_list(enigneid, "","","","");
        
    	return response;
	}
	@RequestMapping(value = "worklist_history", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response worklist_history(@RequestParam(defaultValue = "")  String ENGINE_ID)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));

		//remote method call
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
        
        long enigneid = Long.parseLong(ENGINE_ID);
        response  = fileSystemService.workdashboard_list(enigneid, "","","","");
        
    	return response;
	}
	
	@RequestMapping(value = "work_name_list", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response work_name_list(@RequestParam(defaultValue = "")  String ENGINE_ID)
	{
		Response response = new Response();		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);       
    	response  = fileSystemService.work_name_list();    	
    	return response;
	}
	
	@RequestMapping(value = "worknamelistbydashboard", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response worknamelistbydashboard(@RequestParam(defaultValue = "")  String ENGINE_ID,
			@RequestParam(defaultValue = "")  String SEARCH_START,
			@RequestParam(defaultValue = "")  String SEARCH_END,
			@RequestParam(defaultValue = "")  String SEARCH_STATUS,
			@RequestParam(defaultValue = "")  String SEARCH_WORKNAME)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));

		//remote method call
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
        
        long enigneid = Long.parseLong(ENGINE_ID);
        response  = fileSystemService.workdashboard_list(enigneid,
        		SEARCH_START,SEARCH_END,SEARCH_STATUS,
        		SEARCH_WORKNAME);
        
    	return response;
	}
	
	
	
	@RequestMapping(value = "dblist", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response getDBlist(@RequestParam(defaultValue = "") String ENGINE_ID,
											@RequestParam(defaultValue = "") String DBTYPE,
											@RequestParam(defaultValue = "") String db_address,
											@RequestParam(defaultValue = "") String db_port,
						    				@RequestParam(defaultValue = "") String id,
						    				@RequestParam(defaultValue = "") String pw		
			)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	response  = fileSystemService.getDBlist(db_address, DBTYPE, db_port, id, pw);
    	
    	return response;
	}
	
	@RequestMapping(value = "tableList", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response getTableList(	@RequestParam(defaultValue = "") String ENGINE_ID,
											@RequestParam(defaultValue = "") String DBTYPE,
											@RequestParam(defaultValue = "") String DBPORT,
											@RequestParam(defaultValue = "") String db_address,
						    				@RequestParam(defaultValue = "") String id,
						    				@RequestParam(defaultValue = "") String pw,
						    				@RequestParam(defaultValue = "") String dbname
			)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	response  = fileSystemService.getTableList(db_address, DBTYPE, DBPORT,  id, pw, dbname);
    	
    	return response;
	}
	//다이나믹 필드
	@RequestMapping(value = "GetFields", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response getGetFields(	@RequestParam(defaultValue = "") String ENGINE_ID,
													@RequestParam(defaultValue = "") String DBTYPE,
													@RequestParam(defaultValue = "") String DBPORT,
													@RequestParam(defaultValue = "") String db_address,
								    				@RequestParam(defaultValue = "") String id,
								    				@RequestParam(defaultValue = "") String pw,
								    				@RequestParam(defaultValue = "") String dbname,
								    				@RequestParam(defaultValue = "") String tablename								    				
			)
	{
		Response response = new Response();
		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));
		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);
       
    	response  = fileSystemService.getGetFields(db_address, DBTYPE, DBPORT, id, pw, dbname, tablename);
    	
    	return response;
	}
	
	
	@RequestMapping(value = "SQLHEAD", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    //테스트를 위해 데이터베이스, 테이블 명은 받지 않는다.
	public Response sqlhead(@RequestParam(defaultValue = "") String ENGINE_ID,
											@RequestParam(defaultValue = "") String DBTYPE,
											@RequestParam(defaultValue = "") String DBPORT,
											@RequestParam(defaultValue = "") String db_address,
						    				@RequestParam(defaultValue = "") String id,
						    				@RequestParam(defaultValue = "") String pw,
						    				@RequestParam(defaultValue = "") String dbname,
						    				@RequestParam(defaultValue = "") String tablename,
						    				@RequestParam(defaultValue = "") String query
						    				
			)
	{
		Response response = new Response();		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);       
    	response  = fileSystemService.sqlhead(db_address, DBTYPE, DBPORT, id, pw, dbname, tablename, query);    	
    	return response;
	}
	
	@RequestMapping(value = "SQLBODY", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    //테스트를 위해 데이터베이스, 테이블 명은 받지 않는다.
	public Response sqlrun(@RequestParam(defaultValue = "") String ENGINE_ID,
											@RequestParam(defaultValue = "") String DBTYPE,
											@RequestParam(defaultValue = "") String DBPORT,
											@RequestParam(defaultValue = "") String db_address,
						    				@RequestParam(defaultValue = "") String id,
						    				@RequestParam(defaultValue = "") String pw,
						    				@RequestParam(defaultValue = "") String dbname,
						    				@RequestParam(defaultValue = "") String tablename,
						    				@RequestParam(defaultValue = "") String query
						    				
			)
	{
		Response response = new Response();		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);       
        response  = fileSystemService.sqlrun(db_address, DBTYPE,DBPORT, id, pw, dbname, tablename, query);    	
    	return response;
	}
	
	@RequestMapping(value = "kill_work", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public Response kill_work(@RequestParam(defaultValue = "")
			String ENGINE_ID,
			String WORK_NAME)
	{
		
		Response response = new Response();		
		Engine engine = engineService.getEngine(Long.parseLong(ENGINE_ID));		
        FileSystemService fileSystemService = (FileSystemService) lookupService.getService(RemoteService.HDFS, engine);       
    	response  = fileSystemService.kill_work(WORK_NAME);    	
		return response;
	}
	
    private JobService getJobService(String url) {
        HttpInvokerProxyFactoryBean factoryBean = new HttpInvokerProxyFactoryBean();
        factoryBean.setServiceUrl(url);
        System.out.println("url:" + url);
        
        factoryBean.setServiceInterface(JobService.class);
        HttpComponentsHttpInvokerRequestExecutor httpInvokerRequestExecutor = new HttpComponentsHttpInvokerRequestExecutor();
        factoryBean.setHttpInvokerRequestExecutor(httpInvokerRequestExecutor);
        factoryBean.afterPropertiesSet();
        return (JobService) factoryBean.getObject();
    }
   
    private JobService getJobService(Engine engine) {
        return getJobService(getJobServiceUrl(engine));
    }
   
    private String getJobServiceUrl(Engine engine) {   	
    	 System.out.println("engine.getIp():" + engine.getIp());
    	 System.out.println("engine.getPort():" + engine.getPort());
    	return format("http://{}:{}/remote/job", engine.getIp(), engine.getPort()).getMessage();        
    }
}