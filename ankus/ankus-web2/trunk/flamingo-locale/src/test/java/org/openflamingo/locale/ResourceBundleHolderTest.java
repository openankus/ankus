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

import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("applicationContext.xml")
public class ResourceBundleHolderTest {

    @Autowired
    private LocaleService localeService;

    @Test
    public void getMessageUsingCustomLocale() {
        java.util.Locale defaultLocale = java.util.Locale.getDefault();
        Locale locale = new Locale(defaultLocale.getLanguage(), defaultLocale.getCountry());

        Map message = localeService.getMessage(locale);
        message.put("PATTERN", "{0} is {1}");

        String localeKey = ResourceBundleHolder.getLocaleKey(defaultLocale.getLanguage(), defaultLocale.getCountry());
        ResourceBundleHolder.addResourceBundleMap(localeKey, message);

        Assert.assertEquals("1 is 2", ResourceBundleHolder.getMessage(defaultLocale, "PATTERN", "1", "2"));
        Assert.assertEquals("도움말", ResourceBundleHolder.getMessage(defaultLocale, "COMMON_HELP"));
    }

    @Test
    public void getMessage() {
        Assert.assertEquals("'{}' is '1'", ResourceBundleHolder.getMessage("'{}' is '{0}'", "1"));
        Assert.assertEquals("'1' is '2'", ResourceBundleHolder.getMessage("'{0}' is '{1}'", "1", "2"));
        Assert.assertEquals("'1' is '2' or '2'", ResourceBundleHolder.getMessage("'{0}' is '{1}' or '{1}'", "1", "2"));
        Assert.assertEquals("1 is 2", ResourceBundleHolder.getMessage("{0} is {1}", "1", "2"));
        Assert.assertEquals("1 is 2 or 3", ResourceBundleHolder.getMessage("{0} is {1} or {2}", "1", "2", "3"));
        Assert.assertEquals("1 is 2 or 3 or 4", ResourceBundleHolder.getMessage("{0} is {1} or {2} or {3}", "1", "2", "3", "4"));
    }
}

