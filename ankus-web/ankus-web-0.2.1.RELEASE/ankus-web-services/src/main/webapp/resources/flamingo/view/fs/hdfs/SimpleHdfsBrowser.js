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

Ext.define('Flamingo.view.fs.hdfs.SimpleHdfsBrowser', {
    extend: 'Ext.window.Window',
    alias: 'widget.hdfsSimpleHdfsBrowserWindow',

    engineId: {},

    constructor: function (config) {
        this.engineId = config.engineId;
        this.callParent(arguments);
    },

    title: MSG.MENU_FS_HDFS_BROWSER,
    height: 400,
    width: 400,
    layout: 'fit',
    modal: true,
    closeAction: 'hide',
    items: [
        {
            xtype: 'treepanel',
            store: Ext.create('Ext.data.TreeStore', {
                autoLoad: false,
                proxy: {
                    type: 'ajax',
                    url: CONSTANTS.FS.HDFS_GET_DIRECTORY,
                    headers: {
                        'Accept': 'application/json'
                    },
                    reader: {
                        type: 'json',
                        root: 'list'
                    },
                    extraParams: {
                        engineId: this.engineId
                    }
                },
                root: {
                    text: '/',
                    id: '/',
                    expanded: true
                },
                folderSort: true,
                sorters: [
                    {
                        property: 'text',
                        direction: 'ASC'
                    }
                ]
            }),
            rootVisible: 'true',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            text: MSG.COMMON_OK,
                            iconCls: 'common-confirm',
                            itemId: 'okButton'
                        },
                        '-',
                        {
                            text: MSG.COMMON_CANCEL,
                            iconCls: 'common-cancel',
                            itemId: 'cancelButton'
                        }
                    ]
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
    },

    listeners: {
        beforerender: function (comp, opts) {
            var treepanel = comp.query('treepanel')[0];
            treepanel.getStore().getProxy().extraParams.engineId = this.engineId;
            treepanel.getStore().load();
        }
    }
});