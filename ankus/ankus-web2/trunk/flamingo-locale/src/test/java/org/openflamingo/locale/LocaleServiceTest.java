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

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("applicationContext.xml")
public class LocaleServiceTest {

    @Autowired
    private LocaleService localeService;

    @Test
    public void getLocales() {
        List<Locale> locales = localeService.getLocales();
        Assert.assertEquals(1, locales.size());
    }

    @Test
    public void getMessageJson() throws IOException {
        String messageJson = localeService.getMessageJson(java.util.Locale.getDefault());
        System.out.println(messageJson);
    }

    @Test
    public void getMessage() {
        java.util.Locale defaultLocale = java.util.Locale.getDefault();
        Locale locale = new Locale(defaultLocale.getLanguage(), defaultLocale.getCountry());

        Map message = localeService.getMessage(locale);

        Assert.assertNotNull(message);
    }
}

