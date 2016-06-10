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
package org.openflamingo.web.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @see http://doanduyhai.wordpress.com/2012/04/21/spring-security-part-vi-session-timeout-handling-for-ajax-calls/
 * @see http://stackoverflow.com/questions/4964145/detect-session-timeout-in-ajax-request-in-spring-mvc
 * @see http://stackoverflow.com/questions/1268220/intercepting-requests-before-they-go-to-the-controller-in-an-annotation-based-sp
 */
public class ExpiredSessionFilter extends GenericFilterBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ExpiredSessionFilter.class);

    private int customSessionExpiredErrorCode = 901;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        logger.info("Request URI : {}", request.getRequestURI());

        HttpSession currentSession = request.getSession(false);
        if (currentSession == null) {
            if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
                logger.info("Ajax call detected, send {} error code", this.customSessionExpiredErrorCode);
                response.sendError(this.customSessionExpiredErrorCode);
            } else {
                chain.doFilter(request, response);
            }
        }
        chain.doFilter(request, response);
    }


}