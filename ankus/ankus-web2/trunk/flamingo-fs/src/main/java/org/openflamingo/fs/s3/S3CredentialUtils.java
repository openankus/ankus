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
package org.openflamingo.fs.s3;

import org.slf4j.helpers.MessageFormatter;
import org.w3c.dom.Document;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

/**
 * Amazon S3 Credential Utility.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class S3CredentialUtils {

    /**
     * 지정한 조건에 따른 Credential를 확인하고 허가 여부를 반환한다.
     *
     * @param document Credential DOM Object
     * @param bucket   Bucket Name (RAW)
     * @param role     Role Name (MEMBER)
     * @param type     Permission Name (file)
     * @param detail   Action Name (copy)
     * @return 접근 가능 여부
     * @throws javax.xml.xpath.XPathExpressionException XPath Expression 오류시
     */
    public static Boolean lookup(Document document, String bucket, String role, String type, String detail) throws XPathExpressionException {
        String xpathString = MessageFormatter.arrayFormat("/security/s3/regions/region/regionKey/role[@type='{}']/permission/{}[@{}='true']",
            new String[]{
                bucket, role, type, detail
            }
        ).getMessage().toString();
        XPath xpath = XPathFactory.newInstance().newXPath();
        Boolean b = (Boolean) xpath.evaluate(xpathString, document, XPathConstants.BOOLEAN);
        return b == null ? Boolean.valueOf(false) : b;
    }
}
