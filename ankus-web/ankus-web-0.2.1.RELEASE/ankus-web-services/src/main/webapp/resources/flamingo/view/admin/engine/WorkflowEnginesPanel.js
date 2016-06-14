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

Ext.define('Flamingo.view.admin.engine.WorkflowEnginesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowEnginesPanel',

    layout: 'fit',

    border: false,

    height: 180,

    requires: [
        'Flamingo.view.component._AIOLocalFileSystemBrowser',
        'Flamingo.view.component._StatusBar',
        'Flamingo.view.component._HadoopClusterCombo',
        'Flamingo.view.component._HiveServerCombo'
    ],

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'grid',
                itemId: 'enginesGrid',
                stripeRows: true,
                columnLines: true,
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {text: 'ID', width: 50, dataIndex: 'id', align: 'center', hidden: true},
                    {text: MSG.ADMIN_SERVER_NAME, width: 120, dataIndex: 'instanceName', align: 'center'},
                    {text: MSG.ADMIN_H_STATUS, width: 80, sortable: true, dataIndex: 'status', align: 'center',
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
                    {text: MSG.ADMIN_H_TITLE_CLUSTER, width: 120, dataIndex: 'hadoopClusterName', align: 'center'},
                    {text: MSG.HIVE_HIVE_SERVER, width: 120, dataIndex: 'hiveServerName', align: 'center'},
                    {text: MSG.ADMIN_SERVER_URL, flex: 1, dataIndex: 'serverUrl', align: 'center'},
                    {text: 'Scheduler', width: 100, dataIndex: 'schedulerName', align: 'center'},
                    {text: 'Scheduler ID', width: 120, dataIndex: 'schedulerId', align: 'center', hidden: true},
                    {text: MSG.ADMIN_IP_ADDRESS, width: 100, dataIndex: 'hostAddress', align: 'center'},
                    {text: 'Host Name', width: 180, dataIndex: 'hostName', align: 'center', hidden: true},
                    {text: MSG.HIVE_RUNNING, width: 80, dataIndex: 'runningJob', align: 'center'}
                ],
                store: Ext.create('Flamingo.store.admin.engine.WorkflowEngineStore', {
                    autoLoad: true
                }),
                viewConfig: {
                    stripeRows: true
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                text: MSG.COMMON_ADD,
                                itemId: 'addEngineButton',
                                disabled: toBoolean(config.demo_mode),
                                iconCls: 'common-add'
                            },
                            '-',
                            {
                                text: MSG.COMMON_DELETE,
                                itemId: 'deleteEngineButton',
                                disabled: toBoolean(config.demo_mode),
                                iconCls: 'common-delete'
                            },
                            '-',
                            {
//                                text: MSG.COMMON_SAVE,
                                text: 'Log Collector',
                                itemId: 'registJobButton',
                                disabled: toBoolean(config.demo_mode),
                                iconCls: 'collector-regist'
                            },
                            '-',
                            {
                                text: MSG.ADMIN_SHOW_FILE_BROWSER,
                                itemId: 'showFileSystemBrowserButton',
                                iconCls: 'collector-show-fs'
                            },
                            '->',
                            {
                                text: MSG.COMMON_REFRESH,
                                itemId: 'refreshEngineButton',
                                iconCls: 'common-refresh'
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
