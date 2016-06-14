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

import org.openflamingo.core.exception.ServiceException;
import org.openflamingo.core.exception.SystemException;
import org.openflamingo.engine.configuration.LocaleSupport;
import org.openflamingo.model.rest.ActionHistory;
import org.openflamingo.model.rest.WorkflowHistory;
import org.openflamingo.provider.engine.HistoryService;
import org.openflamingo.util.FileSystemUtils;
import org.openflamingo.util.FileUtils;
import org.openflamingo.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Workflow & Action History Service Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 0.4
 */
@Service
public class HistoryServiceImpl extends LocaleSupport implements HistoryService {

    @Autowired
    private WorkflowHistoryRepository workflowHistoryRepository;

    @Autowired
    private ActionHistoryRepository actionHistoryRepository;

    @Override
    public ActionHistory getActionHistory(long actionId) {
        ActionHistory selected = actionHistoryRepository.select(actionId);
        if (selected == null) {
            throw new SystemException(message("S_HISTORY_SERVICE", "NOT_FOUND_ACTION_HISTORY"));
        }
        return selected;
    }

    @Override
    public int getTotalCountOfWorkflowHistories(String startDate, String endDate, String workflowName, String jobType, String status, String username) {
        try {
            return workflowHistoryRepository.getTotalCountByUsername(startDate, endDate, workflowName, jobType, status, username);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HISTORY_SERVICE", "CANNOT_LIST_TOTAL_HISTORIES"), ex);
        }
    }

    @Override
    public List<WorkflowHistory> getWorkflowHistories(String startDate, String endDate, String workflowName, String jobType, String username, String status, String orderBy, String desc, int start, int limit) {
        try {
            List<WorkflowHistory> workflowHistories = workflowHistoryRepository.selectByCondition(startDate, endDate, workflowName, jobType, username, status, orderBy, desc, start, limit);
            if ("PIG".equals(jobType)) {
                for (WorkflowHistory workflowHistory : workflowHistories) {
                    Map params = new HashMap();
                    params.put("jobId", workflowHistory.getJobId());
                    params.put("actionName", "Pig");
                    params.put("orderBy", "ID");
                    params.put("desc", "DESC");

                    List<ActionHistory> actionHistories = actionHistoryRepository.selectByCondition(params);
                    if (actionHistories != null && actionHistories.size() > 0) {
                        ActionHistory actionHistory = actionHistories.get(0);
                        String logPath = actionHistory.getLogPath();
                        if (!StringUtils.isEmpty(logPath)) {
                            String basePath = FileUtils.getPath(logPath);
                            workflowHistory.setWorkflowXml(FileSystemUtils.load(basePath + "/script.pig"));
                            workflowHistory.setLogPath(logPath);
                        }
                    } else {
                        workflowHistory.setWorkflowXml("");
                    }
                }
            }
            return workflowHistories;
        } catch (Exception ex) {
            throw new ServiceException(message("S_HISTORY_SERVICE", "CANNOT_LIST_WORKFLOW_HISTORIES"), ex);
        }
    }

    @Override
    public List<ActionHistory> getRunningActionHistories(String username, String status, String orderBy, String desc) {
        try {
            return actionHistoryRepository.selectByCondition(username, status, orderBy, desc);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HISTORY_SERVICE", "CANNOT_LIST_ACTION_HISTORIES"), ex);
        }
    }

    @Override
    public List<ActionHistory> getActionHistories(String jobId) {
        try {
            return actionHistoryRepository.selectByCondition(jobId);
        } catch (Exception ex) {
            throw new ServiceException(message("S_HISTORY_SERVICE", "CANNOT_LIST_ACTION_HISTORIES_BY_JOBID"), ex);
        }
    }

    @Override
    public String getActionLog(long actionId) {
        ActionHistory actionHistory = actionHistoryRepository.select(actionId);
        String logPath = actionHistory.getLogPath();
        if (!StringUtils.isEmpty(logPath) && new File(logPath).exists()) {
            return FileSystemUtils.load(logPath);
        }
        return "";
    }

    @Override
    public String getActionLogByPath(String path) {
        if (!StringUtils.isEmpty(path) && new File(path).exists()) {
            return FileSystemUtils.load(path);
        }
        return "";
    }
}
