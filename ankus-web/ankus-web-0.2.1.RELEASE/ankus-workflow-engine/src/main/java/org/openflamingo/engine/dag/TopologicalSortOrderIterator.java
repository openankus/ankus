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

import java.util.*;

/**
 * Topological Order Iterator.
 *
 * @see <a href="http://www.aistudy.com/heuristic/depth-first_search.htm">Depth-First Search(DFS)</a>
 */
public class TopologicalSortOrderIterator<T> {

    /**
     * 그래프의 노드를 topological sorting을 이용하여 구성한 acyclic graph.
     * 입력 그래프가 Directed Acyclic Graph(DAG)가 아닌 경우 그래프를 구성할 수 없으므로 예외가 발생한다.
     */
    private Iterator iterator;

    /**
     * 그래프의 노드를 topological sorting을 이용하여 구성한 노드 목록
     */
    private List<T> topologicalSortedList;

    /**
     * 기본 생성자. 노드의 그래프 정보를 기반으로 실행할 순서를 Topological Sort Order를 결정한다.
     *
     * @param directedGraph 노드의 그래프 정보
     */
    public TopologicalSortOrderIterator(DirectedGraph<T> directedGraph) {
        // 원 그래프의 역방향 그래프
        DirectedGraph<T> reversedDirectedGraph = reverseGraph(directedGraph);

        // 그래프의 노드를 topological sorting을 이용하여 구성한 노드 목록
        topologicalSortedList = new ArrayList<T>();

        // 방문한 vertex 정보를 가지고 있는 리스트
        Set<T> visited = new HashSet<T>();

        // 탐색이 완료된 목록을 저장하는 리스트
        Set<T> expanded = new HashSet<T>();

        // 그래프의 모든 노드에 대해서 Depth-First Search(DFS) 탐색을 수행한다.
        for (T vertex : reversedDirectedGraph) {
            explore(vertex, reversedDirectedGraph, topologicalSortedList, visited, expanded);
        }

        iterator = topologicalSortedList.iterator();
    }

    /**
     * 그래프의 노드를 topological sorting을 이용하여 구성한 노드 목록을 반환한다.
     *
     * @return 그래프의 노드를 topological sorting을 이용하여 구성한 노드 목록
     */
    public List<T> getTopologicalSortedList() {
        return topologicalSortedList;
    }

    /**
     * 다음 노드 정보를 가지고 있는지 확인한다.
     *
     * @return 다음 노드 정보가 존재한다면 <tt>true</tt>
     */
    public boolean hasNext() {
        return iterator.hasNext();
    }

    /**
     * 다음 노드 정보를 반환한다.
     *
     * @return 다음 노드 정보
     */
    public Object next() {
        return iterator.next();
    }

    /**
     * 지정한 vertex를 탐색하여 정렬 과정을 진행한다. 이 메소드는 재귀 방식으로 처리하며 Depth-First Search(DFS) 탐색을 수행한다.
     *
     * @param vertex   그래프 검색을 시작할 노드(Vertex)
     * @param graph    검색할 그래프
     * @param ordered  Topological Sort 결과를 담아둘 리스트
     * @param visited  방문한 Vertex를 저장하는 리스트
     * @param expanded 탐색 완료 리스트
     * @throws IllegalArgumentException 그래프가 순환하는 경우
     */
    private static <T> void explore(T vertex, DirectedGraph<T> graph, List<T> ordered, Set<T> visited, Set<T> expanded) {
        // 이미 한번 방문한 적이 있는지 확인한다. 방문한 적이 있다면 검색을 중단한다.
        if (visited.contains(vertex)) {
            // 아직 탐색이 완료되지 않았다면 탐색할 vertex가 더 있다는 것으로 간주해야 한다.
            if (expanded.contains(vertex)) {
                return;
            }
            throw new IllegalArgumentException("그래프가 순환합니다.");
        }

        // 방문했음을 기억한다.
        visited.add(vertex);

        // 재귀 호출틀 통해서 현재 vertex의 이전 vertex를 모두 탐색한다.
        for (T predecessor : graph.edgesFrom(vertex))
            explore(predecessor, graph, ordered, visited, expanded);

        // 모든 vertex의 이전 노드를 탐색하였다면 vertex를 정렬한 결과에 담는다.
        ordered.add(vertex);

        // 그리고 현재 vertex를 탐색 완료 리스트에 넣는다.
        expanded.add(vertex);
    }

    /**
     * 입력 그래프를 역으로 구성한다.
     *
     * @param directedGraph 역으로 구성할 그래프
     * @return 그래프
     */
    private static <T> DirectedGraph<T> reverseGraph(DirectedGraph<T> directedGraph) {
        DirectedGraph<T> reversedGraph = new DirectedGraph<T>();

        // 그래프에 속해 있는 Vertex를 추가한다.
        for (T Vertex : directedGraph)
            reversedGraph.addVertex(Vertex);

        // 그래프를 구성하는 모든 Vertex를 스캐닝하여 그래프의 방향을 역으로 구성한다.
        for (T Vertex : directedGraph)
            for (T endpoint : directedGraph.edgesFrom(Vertex))
                reversedGraph.addEdge(endpoint, Vertex);

        return reversedGraph;
    }
}