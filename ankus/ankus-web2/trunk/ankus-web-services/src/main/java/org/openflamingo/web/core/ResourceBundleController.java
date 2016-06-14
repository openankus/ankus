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

import org.openflamingo.locale.ResourceBundleHelper;
import org.openflamingo.web.configuration.ConfigurationManager;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;
import java.util.Map;

/**
 * ExtJS의 UI Component에서 I18N을 적용하기 위해서 리소스 번들을 로딩하여
 * 리소스 번들의 Key와 Value를 자바스크립트로 생성하는 리소스 번들 컨트롤러.
 *
 * @author Edward KIM
 * @since 0.1
 */
@Controller
@RequestMapping("/message")
public class ResourceBundleController implements InitializingBean {

    /**
     * JavaScript Variable Prefix
     */
    private final static String JS_PREFIX = "var MSG = ";

    /**
     * JavaScript End Postfix
     */
    private final static String JS_POSTFIX = ";";

    /**
     * JavaScript Content Type
     */
    private final static String CONTENT_TYPE = "application/x-javascript; charset=UTF-8";

    /**
     * Resource Bundle JSON
     */
    private String json;

    @Autowired
    private ConfigurationManager configurationManager;

    @Autowired
    private ResourceBundleHelper resourceBundleHelper;

    @Override
    public void afterPropertiesSet() throws Exception {
        String applicationLocale = configurationManager.get("application.locale", "English");
        Map bundles = (Map) resourceBundleHelper.getLocaleMap().get(applicationLocale);
        json = org.openflamingo.util.JsonUtils.format(bundles);
    }

    @RequestMapping(value = "bundle", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<String> getResourceBundle(final HttpServletRequest request, final HttpServletResponse response, final Locale locale) throws IOException {
        MultiValueMap headers = new HttpHeaders();
        headers.set("Content-Type", CONTENT_TYPE);
        return new ResponseEntity(JS_PREFIX + json + JS_POSTFIX, headers, HttpStatus.OK);
    }
}
