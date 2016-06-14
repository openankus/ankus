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
package org.openflamingo.engine.history;

import org.openflamingo.model.rest.ActionHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Action History Service Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
@Service
public class ActionHistoryServiceImpl implements ActionHistoryService {

    @Autowired
    private ActionHistoryRepository actionHistoryRepository;

    @Override
    public ActionHistory select(ActionHistory actionHistory) {
        return actionHistoryRepository.select(actionHistory.getId());
    }

    @Override
    public ActionHistory insert(ActionHistory actionHistory) {
        int insert = actionHistoryRepository.insert(actionHistory); // FIXME
        return actionHistory;
    }

    @Override
    public void update(ActionHistory actionHistory) {
        actionHistoryRepository.update(actionHistory);
    }
}
