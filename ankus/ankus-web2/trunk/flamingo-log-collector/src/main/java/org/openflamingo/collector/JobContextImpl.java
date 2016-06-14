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
package org.openflamingo.collector;

import org.openflamingo.el.ELEvaluator;
import org.openflamingo.el.ELUtils;
import org.openflamingo.model.collector.Collector;
import org.openflamingo.model.collector.GlobalVariable;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;
import java.util.Properties;

/**
 * Job Context Implementation.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class JobContextImpl implements JobContext {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(JobContextImpl.class);

    /**
     * Log Collector XML의 JAXB ROOT Object
     */
    private Collector model;

    /**
     * 글로별 변수
     */
    private Properties props;

    /**
     * Expression Language Evaluator
     */
    private ELEvaluator evaluator;

    /**
     * Job의 시작 시간
     */
    private Date startDate;

    /**
     * 기본 생성자.
     *
     * @param model     HDFS Log Collector XML의 JAXB ROOT
     * @param evaluator Expression Language Evaluator
     */
    public JobContextImpl(Collector model, ELEvaluator evaluator) {
        this.model = model;
        this.props = this.globalVariablesToProperties();
        this.evaluator = evaluator;
        this.startDate = new Date();
    }

    /**
     * 글로별 변수를 {@link java.util.Properties}로 변환한다.
     *
     * @return 문자열 Key Value의 Properties
     */
    protected Properties globalVariablesToProperties() {
        if (model != null && model.getGlobalVariables() != null) {
            List<GlobalVariable> vars = model.getGlobalVariables().getGlobalVariable();
            Properties props = new Properties();
            for (GlobalVariable var : vars) {
                props.put(var.getName(), var.getValue());
            }
            return props;
        }
        return new Properties();
    }

    /**
     * Property의 <code>name</code>에 해당하는 값을 반환한다. 해당 속성값이 존재하지 않으면 <code>null</code>을 반환한다.
     * <code>name</code>에 해당하는 값은 변수의 expression을 처리를 통해서 값을 얻는다.
     *
     * @param name Property 명
     * @return Property의 <code>name</code>에 해당하는 값, 존재하지 않는 경우 <code>null</code>
     */
    public String getValue(String name) {
        return evaluate(ELUtils.resolve(props, name));
    }

    /**
     * Property의 <code>name</code>에 해당하는 값을 반환한다. 해당 속성값이 존재하지 않으면 <code>null</code>을 반환한다.
     * <code>name</code>에 해당하는 값은 변수의 expression을 처리를 통해서 값을 얻는다.
     *
     * @param name         Property 명
     * @param defaultValue 기본값
     * @return Property의 <code>name</code>에 해당하는 값, 존재하지 않는 경우 <code>null</code>
     */
    public String getValue(String name, String defaultValue) {
        String evaluate = evaluate(ELUtils.resolve(props, name));
        if ("".equals(evaluate) || name.equals(evaluate)) {
            return defaultValue;
        }
        return evaluate;
    }

    /**
     * 주어진 값에 포함되어 있는 EL을 Evaluator를 이용하여 EL과 Function을 해석한다.
     *
     * @param value EL을 포함하는 문자열
     * @return EL과 Function을 해석한 문자열
     */
    private String evaluate(String value) {
        if (StringUtils.isEmpty(value)) {
            return "";
        }
        try {
            return evaluator.evaluate(value, String.class);
        } catch (Exception e) {
            logger.warn(ExceptionUtils.getMessage("EL이 포함되어 있는 문자열({})을 해석할 수 없습니다.", value), e);
            return value;
        }
    }

    @Override
    public Collector getModel() {
        return this.model;
    }

    @Override
    public Date getStartDate() {
        return this.startDate;
    }

}
