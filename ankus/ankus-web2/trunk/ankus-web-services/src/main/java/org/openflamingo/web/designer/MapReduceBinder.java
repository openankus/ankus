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

package org.openflamingo.web.designer;

import org.openflamingo.model.opengraph.Opengraph;
import org.openflamingo.model.workflow.*;
import org.openflamingo.util.StringUtils;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * MapReduce Binder
 * <p/>
 * <pre>hadoop --config <> jar <jarname> <main class> -D mapred.child.java.opts=-Xmx1024M -libjars ${LIBJARS}</pre>
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class MapReduceBinder implements Binder<Mapreduce> {

    /**
     * OpenGraph Cell의 Filtered Properties
     */
    private Map filteredProperties;

    /**
     * OpenGraph Cell의 Action Type
     */
    private ActionType actionType;

    /**
     * Workflow의 MapReduce
     */
    private Mapreduce mapreduce = new Mapreduce();

    /**
     * 기본 생성자.
     *
     * @param cell               OpenGraph Cell
     * @param cellMap            OpenGraph Cell ID와 Cell Map
     * @param metadata           OpenGraph Cell의 Metadata
     * @param properties         OpenGraph Cell의 Properties
     * @param filteredProperties OpenGraph Cell의 Filtered Properties
     * @param actionType         OpenGraph Cell의 Action Type
     */
    public MapReduceBinder(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap,
                           Map metadata, Map properties, Map filteredProperties, ActionType actionType) {
        this.filteredProperties = filteredProperties;
        this.actionType = actionType;
    }

    @Override
    public Mapreduce bind() {
        Map mr = (Map) filteredProperties.get("mapreduce");

        bindDriver(mr);
        bindJar(mr);
        bindHadoopConfiguration(mr);
        bindCommandline(mr);

        actionType.getMapreduce().add(mapreduce);
        return mapreduce;
    }

    private void bindJar(Map params) {
        if (!StringUtils.isEmpty((String) params.get("jar"))) {
            Jar jar = new Jar();
            jar.setValue((String) params.get("jar"));
            mapreduce.setJar(jar);
        }
    }

    private void bindDriver(Map params) {
        if (!StringUtils.isEmpty((String) params.get("driver"))) {
            ClassName value = new ClassName();
            value.setValue((String) params.get("driver"));
            mapreduce.setClassName(value);
        }
    }

    private void bindHadoopConfiguration(Map params) {
        if (params.get("confKey") != null && !StringUtils.isEmpty((String) params.get("confKey"))) {
            String[] keys = org.apache.commons.lang.StringUtils.splitPreserveAllTokens((String) params.get("confKey"), ",");
            String[] values = org.apache.commons.lang.StringUtils.splitPreserveAllTokens((String) params.get("confValue"), ",");
            Configuration configuration = new Configuration();

            for (int i = 0; i < keys.length; i++) {
                Variable var = new Variable();
                var.setName(keys[i]);
                var.setValue(values[i]);
                configuration.getVariable().add(var);
            }
            mapreduce.setConfiguration(configuration);
        }
    }

    private void bindCommandline(Map params) {
        List list = (List) params.get("params");
        Command command = new Command();

        for (Iterator iterator = list.iterator(); iterator.hasNext(); ) {
            String arg = (String) iterator.next();

            Variable variable = new Variable();
            variable.setValue(arg);
            command.getVariable().add(variable);
        }

        mapreduce.setCommand(command);
    }

    public void cleanup() {
    }
}
