0
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

Ext.define('Flamingo.store.fs.hdfs.DirectoryStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.directoryStore',

    autoLoad: false,

    folderSort: true,

    sorters: [
        {
            property: 'text',
            direction: 'ASC'
        }
    ],

    /**
     * @override
     */
    constructor: function (config) {
        this.proxy = Ext.create('Ext.data.proxy.Ajax', {
            url: CONSTANTS.FS.HDFS_GET_DIRECTORY,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            reader: {
                type: 'json',
                root: 'list'
            },
            extraParams: {
                engineId: ''
            }
        });

        this.callParent(arguments);
    }
});