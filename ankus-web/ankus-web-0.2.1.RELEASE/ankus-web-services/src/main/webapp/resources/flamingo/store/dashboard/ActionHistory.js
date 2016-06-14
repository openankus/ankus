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

Ext.define('Flamingo.store.dashboard.ActionHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.actionHistory',

    autoLoad: false,

    fields: [
        {name: 'id'},
        {name: 'workflowId'},
        {name: 'jobId'},
        {name: 'jobStringId'},
        {name: 'actionName'},
        {name: 'workflowName'},
        {name: 'jobName'},
        {name: 'startDate'},
        {name: 'endDate'},
        {name: 'cause'},
        {name: 'currentStep'},
        {name: 'totalStep'},
        {name: 'elapsed'},
        {name: 'exception'},
        {name: 'logPath'},
        {name: 'script'},
        {name: 'command'},
        {name: 'status'},
        {name: 'username'}
    ],

    pageSize: CONSTANTS.GRID_SIZE_PER_PAGE,

    proxy: {
        type: 'ajax',
        url: CONSTANTS.DASHBOARD.GET_ACTION_HISTORY,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8;'
        },
        extraParams: {
            status: 'RUNNING'
        },
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'total',
            idProperty: 'id'
        }
    }
});


