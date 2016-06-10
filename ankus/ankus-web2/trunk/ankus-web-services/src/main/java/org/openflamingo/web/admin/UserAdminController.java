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
package org.openflamingo.web.admin;

import java.util.List;

import org.openflamingo.model.rest.Response;
import org.openflamingo.model.rest.User;
import org.openflamingo.web.core.LocaleSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/admin/user")
public class UserAdminController extends LocaleSupport {

    /**
     * SLF4J Logger
     */
    private Logger logger = LoggerFactory.getLogger(UserAdminController.class);

	/*
	 * db config 정보
	 *  2016.01.06
	 *
	 *  by shm7255@onycom.com
	 */

    @Value("${jdbc.driver}")
	public String jdbc_driver;

	@Value("${jdbc.url}")
	public String jdbc_url;

	@Value("${jdbc.username}")
	public String jdbc_username;

	@Value("${jdbc.password}")
	public String jdbc_password;
    
    /**
     * User Admin Service
     */
    @Autowired
    private UserAdminService userAdminService;

    /**
     * Admin Server 목록을 반환한다.
     *
     * @return HTTP REST Response (성공적으로 목록을 조회한 경우 {@link org.openflamingo.model.rest.Response#getList()} 를 통해 목록을 얻을 수 있다).
     */
    @RequestMapping(value = "servers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getAdminServers(@RequestParam(defaultValue = "") String createDate,
                                    @RequestParam(defaultValue = "") String username,
                                    @RequestParam(defaultValue = "") String email,
                                    @RequestParam(defaultValue = "USERMANAGEMENT") String jobType,
                                    @RequestParam(defaultValue = "") String enabled,
                                    @RequestParam(defaultValue = "") String authority,
                                    @RequestParam(defaultValue = "USERNAME") String orderBy,
                                    @RequestParam(defaultValue = "DESC") String desc,
                                    @RequestParam(defaultValue = "0") int start,
                                    @RequestParam(defaultValue = "16") int limit) {

        Response response = new Response();
        try {
            response.setSuccess(true);
            List<User> userList = userAdminService.getUserList(jobType, createDate, username, email, enabled, authority, orderBy, desc, start, limit);
            
            if (userList != null) {
                response.getList().addAll(userList);
                response.setTotal(userAdminService.getCount());
                response.setSuccess(true);
            } else {
                response.setTotal(0);
            }
        } catch (Exception ex) {
            response.setSuccess(false);
//            response.getError().setMessage(message("S_ADMIN", "CANNOT_CHECK_USER-LIST_INFO"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    /**
     * User 의 enabeld와 authority를 수정한다.
     *
     * @param user
     * @return HTTP REST Response (성공적으로 추가한 경우 {@link org.openflamingo.model.rest.Response#isSuccess()}가 <tt>true</tt>
     */
    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response update(@RequestBody User user) {
        Response response = new Response();
        try {
            userAdminService.updateUser(user);

            response.getMap().put("username", user.getUsername());
            response.getMap().put("enabled", user.isEnabled());
            response.getMap().put("authority", user.getAuthority());
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
//            response.getError().setMessage(message("S_ADMIN", "CANNOT_UPDATE_USER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }

    /**
     * User를 삭제한다
     *
     * @param user
     * @return HTTP REST Response (성공적으로 추가한 경우 {@link org.openflamingo.model.rest.Response#isSuccess()}가 <tt>true</tt>
     */
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response delete(@RequestBody User user) {
        Response response = new Response();
        try {
            userAdminService.deleteUser(user);

            response.getMap().put("username", user.getUsername());
            response.getMap().put("email", user.getEmail());
            response.setSuccess(true);
        } catch (Exception ex) {
            response.setSuccess(false);
//            response.getError().setMessage(message("S_ADMIN", "CANNOT_DELETE_USER"));
            response.getError().setCause(ex.getMessage());
        }
        return response;
    }
}