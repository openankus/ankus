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
package org.openflamingo.engine.handler;

import com.mysql.jdbc.StringUtils;
import org.openflamingo.el.ELEvaluationException;
import org.openflamingo.el.ELUtils;
import org.slf4j.helpers.MessageFormatter;

import java.util.Properties;
import java.util.Set;

/**
 * Expression Language를 해석하는 기능을 제공하는 Handler.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public abstract class ELSupportHandler<T> extends DefaultHandler<T> {

    /**
     * Expression Language를 해석한다.
     *
     * @param expr Expression Language
     * @return 해석한 Expression Language
     */
    protected String get(String expr) {
        if (!StringUtils.isNullOrEmpty(expr.trim())) {

            String resolved = ELUtils.resolve(this.globalVariables, expr);
            logger.trace("지정한 EL을 포함함 문자열 '{}'을 System Properties와 Global Variables로 해석한 결과는 '{}'입니다.", expr, resolved);

            try {
                String evaluated = evaluator.evaluate(resolved, String.class);
                logger.trace("EL을 포함한 문자열 '{}'을 해석한 최종 결과는 '{}'입니다.", resolved, evaluated);
                return evaluated;
            } catch (Exception ex) {
                String message = MessageFormatter.format("Cannot resolv EL '{}'", expr).getMessage();
                throw new ELEvaluationException(message, ex);
            }
        }
        return expr;
    }

    /**
     * Expression Language를 해석한다.
     *
     * @param expr       Expression Language
     * @param properties Action Variable
     * @return 해석한 Expression Language
     */
    protected String get(String expr, Properties properties) {
        if (!StringUtils.isNullOrEmpty(expr.trim())) {
            properties.putAll(this.globalVariables);

            if (logger.isDebugEnabled()) {
                Set<Object> keys = properties.keySet();
                for (Object key : keys) {
                    logger.debug("[EL Property] {}={}", key, properties.get(key));
                }
            }

            String resolved = ELUtils.resolve(properties, expr);
            logger.trace("지정한 EL을 포함함 문자열 '{}'을 System Properties와 Global Variables로 해석한 결과는 '{}'입니다.", expr, resolved);

            try {
                String evaluated = evaluator.evaluate(resolved, String.class);
                logger.trace("EL을 포함한 문자열 '{}'을 해석한 최종 결과는 '{}'입니다.", resolved, evaluated);
                return evaluated;
            } catch (Exception ex) {
                String message = MessageFormatter.format("Cannot resolv EL '{}'", expr).getMessage();
                throw new ELEvaluationException(message, ex);
            }
        }
        return expr;
    }

}
