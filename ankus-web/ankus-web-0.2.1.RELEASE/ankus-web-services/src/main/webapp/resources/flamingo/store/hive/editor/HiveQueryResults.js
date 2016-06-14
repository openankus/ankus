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

Ext.define('Flamingo.store.hive.editor.HiveQueryResults', {
    extend: 'Ext.data.Store',

    requires: ['Ext.ux.data.reader.DynamicReader'],

    fields: [],
    autoLoad: false,
    pageSize: 100,

    proxy: {
        type: 'ajax',
        totalProperty: 'total',
        url: CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.RESULTS,
        headers: {
            'Accept': 'application/json'
        },
        extraParams: {
            engineId: '',
            executionId: ''
        },
        reader: {
            type: 'dynamicReader',
            root: 'list'
        }
    }
});