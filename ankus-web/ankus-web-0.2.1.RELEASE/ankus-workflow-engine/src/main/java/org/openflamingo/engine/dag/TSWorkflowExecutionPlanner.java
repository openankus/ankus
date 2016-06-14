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
package org.openflamingo.engine.dag;

import org.apache.commons.lang.StringUtils;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DirectedMultigraph;
import org.jgrapht.traverse.TopologicalOrderIterator;
import org.openflamingo.engine.util.WorkflowUtils;
import org.openflamingo.model.workflow.ActionType;
import org.openflamingo.model.workflow.BaseType;
import org.openflamingo.model.workflow.NodeType;
import org.openflamingo.model.workflow.Workflow;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * Topological Sort Graph Algorithm 기반 Workflow Execution Planner.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class TSWorkflowExecutionPlanner implements WorkflowExecutionPlanner {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(TSWorkflowExecutionPlanner.class);

    /**
     * Workflow Action의 실행 순서에 따른 JAXB Object
     */
    private List<BaseType> orderedActions;

    /**
     * Workflow Action의 실행 순서에 따른 Name
     */
    private List<String> namesOfActions;

    /**
     * Workflow Action에 대한 JAXB Object 매핑
     */
    private Map<String, String> nextOfAction;

    /**
     * 현재 노드의 이전 노드 정보를 담고 있는 Workflow Action 맵
     */
    private Map<String, String> reversedActions;

    /**
     * Workflow Action에 대한 JAXB Object 매핑
     */
    private Map<String, Object> actionMap;

    /**
     * Workflow XML JAXB Object
     */
    private Workflow workflow;

    /**
     * Topological Sort Iterator. 이 Iterator의 순서는
     * 실제 Workflow XML에 정의되어 있는 순서가 아니라 from to에 따른 실행순서가 들어있다.
     */
    private TopologicalOrderIterator iterator;

    /**
     * 기본 생성자. 이 기본 생성자는 실행할 순서를 결정하게 되며
     * 실행시 이전 노드 정보를 역추적하기 위한 정보를 생성시 구성하게 된다.
     *
     * @param workflow Workflow XML JAXB Object
     * @throws Exception 초기화할 수 없는 경우
     */
    public TSWorkflowExecutionPlanner(Workflow workflow) throws Exception {
        this.workflow = workflow;
        this.namesOfActions = new LinkedList<String>();
        this.orderedActions = new LinkedList<BaseType>();
        this.actionMap = new HashMap<String, Object>();
        this.reversedActions = new HashMap<String, String>();
        this.nextOfAction = new HashMap<String, String>();
        this.iterator = new TopologicalOrderIterator(createGraph());

        // 각 노드의 Action Name을 기록한다. 들어가는 순서는 실질적으로 동작하는 순서이다.
        while (iterator.hasNext()) {
            namesOfActions.add((String) iterator.next());
        }

        // 각 노드의 정보를 기준으로 이전 노드 정보를 구성한다.
        for (String currentAction : namesOfActions) {
            if (actionMap.get(currentAction) instanceof NodeType) {
                // 현재 노드 정보를 꺼내서 이동할 다음 노드 정보를 찾아낸다.
                NodeType node = (NodeType) actionMap.get(currentAction);
                String[] tos = StringUtils.splitPreserveAllTokens(node.getTo(), ',');

                // 이동할 다음 노드에 대해서 이전 노드가 어떤 노드인지 역추적하기 위한 정보를 구성한다.
                for (String to : tos) {
                    String reversedActions = buildReversedActions(this.reversedActions.get(to), currentAction);
                    this.reversedActions.put(to, reversedActions);
                }

                // 동작하는 순서대로 for 처리를 하고 있으므로 실제로 구성하는 값 정보는 동작하는 순서가 된다.
                orderedActions.add((BaseType) actionMap.get(currentAction));
            } else { // BaseType 유형인 경우 여기에서 처리하며 End 노드가 여기에 해당한다.
                // 동작하는 순서대로 for 처리를 하고 있으므로 실제로 구성하는 값 정보는 동작하는 순서가 된다.
                orderedActions.add((BaseType) actionMap.get(currentAction));
            }
        }
    }

    /**
     * 현재 노드와 현재 노드의 다음 노드가 실질적으로 참조하는 이전 노드 목록을 구성한다.
     * 예를 들어 현재 노드(node1)가 이동할 다음 노드가 node2라면 node2를 기준으로 이전 노드 정보를 구성한다.
     * 이때 중요한 것은 node2의 이전 노드가 node1만 존재하지 않으므로 역으로 추적하여 하나 이상 존재하는지 확인한다.
     * Hadoop 기반 Workflow에서는 이전 노드의 출력 정보를 사용하기 때문에 가능한 모든 노드 정보를 확인해야 한다.
     *
     * @param predecessor 현재 노드의 이전 노드
     * @param current     현재 노드
     * @return 현재 노드와 현재 노드의 다음 노드가 실질적으로 참조하는 이전 노드 목록
     */
    private String buildReversedActions(String predecessor, String current) {
        List<String> nodes = new ArrayList<String>();
        if (predecessor != null) {
            String[] strings = StringUtils.splitPreserveAllTokens(predecessor, ',');
            Collections.addAll(nodes, strings);
        }
        nodes.add(current);
        return org.springframework.util.StringUtils.collectionToCommaDelimitedString(nodes);
    }

    /**
     * Topological Sort Graph Algorithm에 따른 그래프를 생성한다.
     *
     * @return Topological Sort Graph
     */
    private DirectedMultigraph<String, DefaultEdge> createGraph() {
        DirectedMultigraph<String, DefaultEdge> graph = new DirectedMultigraph<String, DefaultEdge>(DefaultEdge.class);

        // Add Action's Vertex
        List<ActionType> actions = workflow.getAction();
        for (ActionType actionType : actions) {
            graph.addVertex(actionType.getName());
            actionMap.put(actionType.getName(), actionType);
        }

        // Add Start's Vertex
        if (workflow.getStart() != null) {
            graph.addVertex(workflow.getStart().getName());
            actionMap.put(workflow.getStart().getName(), workflow.getStart());
        }

        // Add End's Vertex
        if (workflow.getEnd() != null) {
            graph.addVertex(workflow.getEnd().getName());
            actionMap.put(workflow.getEnd().getName(), workflow.getEnd());
        }

        // Add Action's Edge
        for (ActionType actionType : actions) {
            if (!StringUtils.isEmpty(actionType.getTo())) {
                nextOfAction.put(actionType.getName(), actionType.getTo());
                String[] targets = StringUtils.splitPreserveAllTokens(actionType.getTo(), ",");
                for (String target : targets) {
                    logger.trace("[Graph] {} => {}", actionType.getName(), target);
                    graph.addEdge(actionType.getName(), target);
                }
            }
        }

        // Add Start's Edge
        if (workflow.getStart() != null) {
            if (!StringUtils.isEmpty(workflow.getStart().getTo())) {
                nextOfAction.put(workflow.getStart().getName(), workflow.getStart().getTo());
                String[] targets = StringUtils.splitPreserveAllTokens(workflow.getStart().getTo(), ",");
                for (String target : targets) {
                    logger.trace("[Graph] {} => {}", workflow.getStart().getName(), target);
                    graph.addEdge(workflow.getStart().getName(), target);
                }
            }
        }

        return graph;
    }

    @Override
    public List<String> getNamesOfActions() {
        return namesOfActions;
    }

    @Override
    public Map<String, Object> getActionMap() {
        return actionMap;
    }

    @Override
    public Map<String, String> getGlobalVariables() {
        return WorkflowUtils.getGlobalVariables(workflow);
    }

    @Override
    public List<BaseType> getOrderedActions() {
        return orderedActions;
    }

    @Override
    public Map<String, String> getNextOfAction() {
        return nextOfAction;
    }

    @Override
    public Map<String, String> getReversedActions() {
        return reversedActions;
    }
}