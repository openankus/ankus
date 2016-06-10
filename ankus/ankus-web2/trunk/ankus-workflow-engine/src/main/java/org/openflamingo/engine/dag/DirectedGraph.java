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
 * 방향성을 가진 그래프를 표현하는 Directed Graph.
 */
public final class DirectedGraph<T> implements Iterable<T> {

    /**
     * 그래프를 구성하는 노드의 정보를 담고 있는 맵으로 특정 노드와 연결되어 있는 다수의 노드 정보를 유지한다.
     */
    public final Map<T, Set<T>> graph = new HashMap<T, Set<T>>();

    /**
     * 그래프를 구성하는 새로운 노드(Vertex)를 추가한다. 이미 노드가 있다면 아무 동작도 하지 않는다.
     *
     * @param vertex 추가할 노드
     * @return 추가할 노드가 이미 추가되어 있다면 <tt>false</tt>
     */
    public boolean addVertex(T vertex) {
        // Vertex를 추가한다. 이미 Vertex가 존재한다면 추가할 필요없다.
        if (graph.containsKey(vertex))
            return false;

        // Vertex를 추가하면 해당 Vertex가 연결될 타 노드 정보를 저장하기 위한 새로운 Set을 하나 구성한다.
        graph.put(vertex, new HashSet<T>());
        return true;
    }

    /**
     * 두 노드의 관계 방향성을 설정한다. 관계 방향성을 설정할 두 노드는 반드시 그래프의 구성원으로 참여해 있어야 한다.
     *
     * @param src  시작 노드
     * @param dest 목적 노드
     * @throws java.util.NoSuchElementException
     *          시작 및 목적 노드가 그래프에 구성요소로 참여하고 있지 않는 경우
     */
    public void addEdge(T src, T dest) {
        // 관계를 제대로 형성하려면 관계를 형성할 두 노드(Vertex)가 정의되어 있어야 한다.
        if (!graph.containsKey(src) || !graph.containsKey(dest))
            throw new NoSuchElementException("그래프에 노드가 정의되어 있지 않습니다. 관계를 구성할 노드는 모두 그래프로 구성되어야 합니다.");

        // Edge를 추가하여 관계 방향성을 설정한다. 관계는 각 노드가 가지고 있는 Set에 연결한 노드를 추가하는 방식이다.
        graph.get(src).add(dest);
    }

    /**
     * 관계 방향성을 가진 두 노드의 관계 방향성을 제거한다.
     *
     * @param src  시작 노드
     * @param dest 목적 노드
     * @throws java.util.NoSuchElementException
     *          시작 및 목적 노드가 그래프에 구성요소로 참여하고 있지 않는 경우
     */
    public void removeEdge(T src, T dest) {
        // 관계를 제대로 형성하려면 관계를 형성할 두 노드(Vertex)가 정의되어 있어야 한다.
        if (!graph.containsKey(src) || !graph.containsKey(dest))
            throw new NoSuchElementException("그래프에 노드가 정의되어 있지 않습니다. 관계를 구성할 노드는 모두 그래프로 구성되어야 합니다.");

        graph.get(src).remove(dest);
    }

    /**
     * 그래프의 특정 노드에 대해서 두번째 파라미터 노드가 존재하는지 확인한다.
     *
     * @param src  시작 노드
     * @param dest 목적 노드
     * @return 시작 노드에서 목적 노드로 이동 가능하다면 <tt>true</tt>
     * @throws java.util.NoSuchElementException
     *          시작 및 목적 노드가 그래프에 구성요소로 참여하고 있지 않는 경우
     */
    public boolean edgeExists(T src, T dest) {
        // 관계를 제대로 형성하려면 관계를 형성할 두 노드(Vertex)가 정의되어 있어야 한다.
        if (!graph.containsKey(src) || !graph.containsKey(dest))
            throw new NoSuchElementException("그래프에 노드가 정의되어 있지 않습니다. 관계를 구성할 노드는 모두 그래프로 구성되어야 합니다.");

        return graph.get(src).contains(dest);
    }

    /**
     * 그래프의 지정한 노드에서 다음 노드 목록을 반환한다.
     *
     * @param node 다음 노드 목록을 확인하기 위한 노드
     * @return 나가는 노드 목록
     * @throws java.util.NoSuchElementException
     *          노드가 존재하지 않는 경우
     */
    public Set<T> edgesFrom(T node) {
        // 노드가 존재하는지 확인한다.
        Set<T> directedRelation = graph.get(node);
        if (directedRelation == null) {
            throw new NoSuchElementException("소스 노드가 존재하지 않습니다.");
        }

        return Collections.unmodifiableSet(directedRelation);
    }

    /**
     * 그래프의 노드를 순차적으로 꺼낼 수 있도록 하는 Iteator를 반환한다.
     *
     * @return 그래프의 노드 정보를 담고 있는 Iterator
     */
    public Iterator<T> iterator() {
        return graph.keySet().iterator();
    }

    /**
     * 그래프가 비어있는지 확인한다.
     *
     * @return 그래프가 비어있다면 <tt>true</tt>
     */
    public boolean isEmpty() {
        return graph.isEmpty();
    }
}