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

Ext.define('Flamingo.store.admin.hive.HiveServerStore', {
    extend: 'Ext.data.Store',

    fields: ['id', 'name', 'jdbcDriver', 'jdbcUrl', 'metastoreUris'],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HIVE.GET_HIVE_SERVERS,
        headers: {
            'Accept': 'application/json'
        },
        reader: {
            type: 'json',
            root: 'list',
            successProperty: 'success'
        }
    }
});