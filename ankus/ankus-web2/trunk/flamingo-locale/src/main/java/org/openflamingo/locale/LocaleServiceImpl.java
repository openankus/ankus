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
package org.openflamingo.locale;

import org.openflamingo.core.exception.ParsingException;
import org.openflamingo.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 로케일 및 리소스 번들 관련 메시지 서비스를 제공하는 로케일 서비스.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
@Service
public class LocaleServiceImpl implements LocaleService {

    /**
     * 로케일 및 리소스 번들 관련 메시지를 관리하는 Locale Repository
     */
    @Autowired
    private LocaleRepository localeRepository;

    @Override
    public Map getMessage(Locale locale) {
        List<Message> messages = localeRepository.selectMessageByLocale(locale);
        Map<String, String> msgs = new HashMap<String, String>();
        for (Message msg : messages) {
            msgs.put(msg.getGroupKey() + "_" + msg.getMessageKey(), msg.getMessage());
        }
        return msgs;
    }

    @Override
    public List<Locale> getLocales() {
        return localeRepository.selectAll();
    }

    @Override
    public String getMessageJson(Locale locale) {
        try {
            return JsonUtils.format(getMessage(locale));
        } catch (IOException ex) {
            throw new ParsingException(ex);
        }
    }

    @Override
    public String getMessageJson(java.util.Locale locale) {
        Locale loc = new Locale(locale.getLanguage(), locale.getCountry());
        return getMessageJson(loc);
    }

    ////////////////////////////////////////////////
    // Spring Framework Setter Injection
    ////////////////////////////////////////////////

    /**
     * 로케일 및 리소스 번들 관련 메시지를 관리하는 Locale Repository를 설정한다.
     *
     * @param localeRepository 로케일 및 리소스 번들 관련 메시지를 관리하는 Locale Repository
     */
    public void setLocaleRepository(LocaleRepository localeRepository) {
        this.localeRepository = localeRepository;
    }
}
