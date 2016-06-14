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
package org.openflamingo.engine.state;

import org.openflamingo.model.rest.State;

import java.util.HashMap;
import java.util.Map;

/**
 * Action의 상태 변화에 따라서 상태를 처리하는 핸들러를 등록하고 있는 레지스트리.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class ActionStateRegistry {

    /**
     * 상태별 핸들러 맵
     */
    private static Map<State, ActionStateHandler> handlerMap = new HashMap<State, ActionStateHandler>();

    static {
        handlerMap.put(State.PREPARE, new PrepareActionStateHandler());
        handlerMap.put(State.RUNNING, new RunningActionStateHandler());
        handlerMap.put(State.SUCCESS, new SuccessActionStateHandler());
        handlerMap.put(State.FAIL, new FailActionStateHandler());
    }

    /**
     * 상태를 처리하는 상태 핸들러를 반환한다.
     *
     * @param state 상태
     * @return 핸들러
     */
    public static ActionStateHandler getActionStateHandler(State state) {
        return handlerMap.get(state);
    }
}
