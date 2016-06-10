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
package org.openflamingo.web.core;

import org.apache.ibatis.exceptions.TooManyResultsException;
import org.openflamingo.model.rest.Response;
import org.openflamingo.util.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ServiceExceptionHandler implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ServiceExceptionHandler.class);

    @Override
    public void afterPropertiesSet() throws Exception {
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Response handleIllegalArgument(IllegalArgumentException e, WebRequest request) {
        Response response = new Response();
        response.setSuccess(false);
        response.getError().setCause(e.getMessage());
        response.getError().setMessage("Illegal Argument");
        response.getError().setException(ExceptionUtils.getFullStackTrace(e));
        return response;
    }

    @ExceptionHandler(value = TooManyResultsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Response handleTooManyResultsException(TooManyResultsException e, WebRequest request) {
        Response response = new Response();
        response.setSuccess(false);
        response.getError().setCause(e.getMessage());
        response.getError().setMessage("Too Many Results");
        response.getError().setException(ExceptionUtils.getFullStackTrace(e));
        return response;
    }

}