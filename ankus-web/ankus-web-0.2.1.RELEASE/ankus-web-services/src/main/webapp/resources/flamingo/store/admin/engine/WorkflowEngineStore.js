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

Ext.define('Flamingo.store.admin.engine.WorkflowEngineStore', {
    extend: 'Ext.data.Store',

    fields: [
        'id', 'instanceName', 'status', 'serverUrl', 'hadoopClusterName', 'hiveServerName',
        'schedulerName', 'schedulerId', 'hostAddress', 'hostName', 'runningJob'
    ],

    autoLoad: true,

    constructor: function (config) {
        this.callParent(arguments);

        /**
         * Workflow Engine 목록 필터링 파라미터.
         */
        if (config && config.type) {
            this.getProxy().extraParams.type = config.type;
        }
    },

    proxy: {
        type: 'ajax',
        url: CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.WE.LIST_ENGINES,
        headers: {
            'Accept': 'application/json'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: { // Workflow Engine 목록 필터링 파라미터. 기본값은 모두 다 보임.
            'type': 'ALL'
        }
    }
});