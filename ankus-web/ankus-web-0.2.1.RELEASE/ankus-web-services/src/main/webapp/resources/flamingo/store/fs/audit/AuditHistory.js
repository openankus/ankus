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

Ext.define('Flamingo.store.fs.audit.AuditHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.auditHistory',

    autoLoad: false,

    fields: ['id', 'clusterId', 'clusterName', 'fileSystemType', 'fileType', 'auditType' , 'from' , 'to', 'length', 'workDate', 'username'],

    pageSize: CONSTANTS.GRID_SIZE_PER_PAGE,

    proxy: {
        type: 'ajax',
        url: CONSTANTS.FS.AUDIT_HISTORY,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8;'
        },
        extraParams: {
            startDate: '',
            endDate: '',
            type: '',
            path: ''
        },
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'total',
            idProperty: 'id'
        }
    }
});
