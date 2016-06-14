/*
 * Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Flamingo.store.dashboard.WorkflowHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.workflowHistory',

    autoLoad: false,

    fields: ['id', 'workflowId', 'jobId', 'jobStringId', 'workflowName', 'currentStep', 'totalStep', 'startDate', 'endDate', 'elapsed', 'status', 'username', 'currentAction', 'workflowXml', 'cause', 'exception', 'variables'],

    pageSize: CONSTANTS.GRID_SIZE_PER_PAGE,

    proxy: {
        type: 'ajax',
        url: CONSTANTS.DASHBOARD.GET_WORKFLOW_HISTORY,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8;'
        },
        extraParams: {
            startDate: '',
            endDate: '',
            status: '',
            workflowName: '',
            jobType: 'WORKFLOW'
        },
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'total',
            idProperty: 'id'
        }
    }
});
