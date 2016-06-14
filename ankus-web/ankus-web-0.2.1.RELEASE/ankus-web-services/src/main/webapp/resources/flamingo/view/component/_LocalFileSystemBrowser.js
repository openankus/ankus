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

Ext.define('Flamingo.view.component._LocalFileSystemBrowser', {
    extend: 'Ext.panel.Panel',
    alias: 'widget._localFileSystemBrowser',

    border: false,

    autoCreate: true,

    layout: 'border',

    serverUrl: '',

    initComponent: function () {
        var me = this;
        this.items = [
            {
                region: 'west',
                border: false,
                collapsible: true,
                split: true,
                title: 'Directory',
                width: 200,
                layout: 'fit',
                items: [
                    {
                        itemId: 'browserTree',
                        border: false,
                        xtype: 'treepanel',
                        rootVisible: true,
                        store: Ext.create('Ext.data.TreeStore', {
                            proxy: {
                                type: 'ajax',
                                url: CONSTANTS.REST_GET_DIRECTORY,
                                actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
                                headers: {
                                    'Accept': 'application/json'
                                },
                                reader: {
                                    type: 'json',
                                    root: 'list'
                                },
                                extraParams: {
                                    'serverUrl': me.serverUrl
                                }
                            },
                            root: {
                                text: '/',
                                id: '/',
                                expanded: true
                            }
                        }),
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                items: [
                                    '->',
                                    {
                                        text: 'Refresh',
                                        iconCls: 'common-refresh',
                                        tooltip: MSG.HDFS_TIP_FILE_REFRESH,
                                        handler: function () {
                                            var treePanel = Ext.ComponentQuery.query('#browserTree')[0];
                                            treePanel.getStore().load();

                                            var gridPanel = Ext.ComponentQuery.query('#browserListGrid')[0];
                                            gridPanel.getStore().removeAll();
                                        }
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            itemclick: function (view, node, item, index, event, opts) {
                                var listStore = Ext.ComponentQuery.query('#browserListGrid')[0].getStore();
                                listStore.removeAll();

                                listStore.load({ scope: this, params: {'node': node.data.qtip} });
                            },
                            afterrender: function (comp, opts) {
                                var gridPanel = Ext.ComponentQuery.query('#browserListGrid')[0];
                                gridPanel.getStore().removeAll();
                            }
                        }
                    }
                ]
            },
            {
                region: 'center',
                title: 'File',
                border: false,
                layout: 'fit',
                items: [
                    {
                        itemId: 'browserListGrid',
                        xtype: 'grid',
                        border: false,
                        stripeRows: true,
                        columnLines: true,
                        columns: [
                            {
                                xtype: 'rownumberer',
                                text: 'No',
                                width: 30,
                                sortable: false
                            },
                            {text: 'Filename', flex: 1, dataIndex: 'name'},
                            {text: 'Size', width: 80, sortable: true, dataIndex: 'length', align: 'right'},
                            {text: 'Permission', width: 80, dataIndex: 'permission', align: 'center'},
                            {text: 'Timestamp', width: 140, dataIndex: 'lastModified', align: 'center'}
                        ],
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'length', 'permission', 'lastModified'],
                            proxy: {
                                type: 'ajax',
                                url: CONSTANTS.REST_GET_FILE,
                                actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
                                headers: {
                                    'Accept': 'application/json'
                                },
                                reader: {
                                    type: 'json',
                                    root: 'list'
                                },
                                extraParams: {
                                    'serverUrl': me.serverUrl,
                                    'node': '/'
                                }
                            }
                        })
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                text: 'Refresh',
                                iconCls: 'common-refresh',
                                tooltip: MSG.HDFS_TIP_FILE_REFRESH,
                                handler: function () {
                                    var treePanel = Ext.ComponentQuery.query('#browserTree')[0];
                                    var selectedNode = treePanel.getSelectionModel().getLastSelected();

                                    var listStore = Ext.ComponentQuery.query('#browserListGrid')[0].getStore();
                                    if (selectedNode) {
                                        listStore.load({ scope: this, params: {'node': selectedNode.data.id} });
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});