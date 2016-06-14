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

Ext.define('Flamingo.view.admin.engine.History', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.engineHistory',

    layout: 'fit',

    border: false,

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'grid',
                itemId: 'historyGrid',
                stripeRows: true,
                columnLines: true,
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {text: 'ID', width: 50, dataIndex: 'id', align: 'center', hidden: true},
                    {text: 'Name', width: 100, dataIndex: 'instanceName', align: 'center'},
                    {text: 'Status', width: 100, sortable: true, dataIndex: 'status', align: 'center',
                        renderer: function (value, meta) {
                            if (value === 'FAIL') {
                                meta.tdCls = 'status-red';
                            }
                            if (value === 'RUNNING') {
                                meta.tdCls = 'status-blue';
                            }
                            return value;
                        }
                    },
                    {text: 'Server URL', flex: 1, dataIndex: 'serverUrl', align: 'center'},
                    {text: 'Scheduler Name', width: 120, dataIndex: 'schedulerName', align: 'center'},
                    {text: 'Scheduler ID', width: 120, dataIndex: 'schedulerId', align: 'center', hidden: true},
                    {text: 'Address', width: 100, dataIndex: 'hostAddress', align: 'center'},
                    {text: 'Host Name', width: 120, dataIndex: 'hostName', align: 'center'},
                    {text: 'Running Jobs', width: 100, dataIndex: 'runningJob', align: 'center'}
                ],

                store: Ext.create('Ext.data.Store', {
                    fields: ['id', 'instanceName', 'status', 'serverUrl', 'schedulerName', 'schedulerId', 'hostAddress', 'hostName', 'runningJob'],
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: CONSTANTS.CONTEXT_PATH + CONSTANTS.REST_GET_HISTORY,
                        headers: {
                            'Accept': 'application/json'
                        },
                        reader: {
                            type: 'json',
                            root: 'list',
                            successProperty: 'success'
                        }
                    }
                }),
                viewConfig: {
                    enableTextSelection: true,
                    stripeRows: true
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                fieldLabel: 'Log Collector',
                                xtype: 'combo',
                                name: 'server',
                                itemId: 'serverCombo',
                                editable: false,
                                queryMode: 'local',
                                typeAhead: true,
                                selectOnFocus: true,
                                displayField: 'instanceName',
                                valueField: 'serverUrl',
                                forceSelection: true,
                                width: 250,
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['id', 'instanceName', 'serverUrl'],
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: CONSTANTS.REST_GET_COLLECTORS,
                                        headers: {
                                            'Accept': 'application/json'
                                        },
                                        reader: {
                                            type: 'json',
                                            root: 'list'
                                        }
                                    }
                                })
                            },
                            '->',
                            {
                                text: 'Refresh',
                                iconCls: 'common-refresh',
                                itemId: 'refreshButton',
                                handler: function () {
                                    Ext.ComponentQuery.query('#historyGrid')[0].getStore().load()
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    selectionchange: function (sm, selectedRecord) {
                        if (selectedRecord[0]) {
                            var serverUrl = selectedRecord[0].data.serverUrl;
                            var historyGrid = Ext.ComponentQuery.query('#historyGrid')[0];
                            historyGrid.getStore().load(
                                {
                                    params: {
                                        'serverUrl': serverUrl
                                    }
                                }
                            );
                        }
                    }
                }
            }
        ];

        this.callParent(arguments);
    }
});
