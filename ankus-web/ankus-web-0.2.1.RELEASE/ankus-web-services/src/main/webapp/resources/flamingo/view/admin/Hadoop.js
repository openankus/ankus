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

Ext.define('Flamingo.view.admin.Hadoop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.adminHadoopPanel',

    layout: 'fit',

    border: false,

    requires: [
        'Flamingo.view.component._StatusBar'
    ],

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'grid',
                itemId: 'hadoopGrid',
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {text: MSG.ADMIN_H_ID, width: 50, dataIndex: 'id', align: 'center', hidden: true},
                    {text: MSG.ADMIN_H_NAME, width: 120, dataIndex: 'name', align: 'center'},
                    {text: 'Scheme', width: 120, dataIndex: 'name', align: 'center', hidden: true},
                    {text: 'Namenode IP', width: 120, dataIndex: 'namenodeIP', align: 'center', hidden: true},
                    {text: 'Namenode Port', width: 120, dataIndex: 'namenodePort', align: 'center', hidden: true},
                    {text: MSG.ADMIN_H_NAMENODE, flex: 2, dataIndex: 'hdfsUrl', align: 'center'},
                    {text: 'Job Tracker IP', width: 120, dataIndex: 'jobTrackerIP', align: 'center', hidden: true},
                    {text: 'Job Tracker Port', width: 120, dataIndex: 'jobTrackerPort', align: 'center', hidden: true},
                    {text: MSG.ADMIN_H_JOBTRACKER, flex: 2, dataIndex: 'hdfsUrl', align: 'center',
                        renderer: function (value, p, record) {
                            return Ext.String.format(
                                '{0}:{1}', record.data.jobTrackerIP, record.data.jobTrackerPort
                            );
                        }
                    },
                    {text: MSG.ADMIN_H_NN_CONSOLE, flex: 2, dataIndex: 'namenodeConsole', align: 'center',
                        renderer: function (value, p, record) {
                            return Ext.String.format(
                                '<a href="{0}" target="_blank">{0}</a>', record.data.namenodeConsole
                            );
                        }
                    },
                    {text: MSG.ADMIN_H_JT_CONSOLE, flex: 2, dataIndex: 'jobTrackerConsole', align: 'center',
                        renderer: function (value, p, record) {
                            return Ext.String.format(
                                '<a href="{0}" target="_blank">{0}</a>', record.data.jobTrackerConsole
                            );
                        }
                    },
                    {text: '', flex: 2, dataIndex: 'namenodeMonitoringPort', align: 'center', hidden: true},
                    {text: 'Job Tracker Thrift', flex: 2, dataIndex: 'jobTrackerMonitoringPort', align: 'center'}
                ],
                store: Ext.create('Flamingo.store.admin.hadoop.HadoopClusterStore', {
                    autoLoad: true
                }),
                viewConfig: {
                    columnLines: true,
                    stripeRows: true
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                text: MSG.COMMON_ADD,
                                iconCls: 'common-add',
                                disabled: toBoolean(config.demo_mode),
                                handler: function () {

                                    var popWindow = Ext.create('Ext.Window', {
                                        title: 'Add a Hadoop Cluster',
                                        width: 380,
                                        height: 370,
                                        modal: true,
                                        resizable: false,
                                        constrain: true,
                                        layout: 'fit',
                                        items: {
                                            xtype: 'form',
                                            itemId: 'hadoopClusterForm',
                                            border: false,
                                            bodyPadding: 10,
                                            defaults: {
                                                anchor: '100%',
                                                labelWidth: 120
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'name',
                                                    itemId: 'name',
                                                    fieldLabel: MSG.ADMIN_H_NAME,
                                                    allowBlank: false,
                                                    minLength: 6
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: 'Namenode & Job Tracker',
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    itemId: 'protocolContainer',
                                                                    fieldLabel: 'File System Scheme',
                                                                    layout: 'hbox',
                                                                    combineErrors: true,
                                                                    defaultType: 'textfield',
                                                                    defaults: {
                                                                        hideLabel: 'true'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'combo',
                                                                            name: 'protocolCombo',
                                                                            itemId: 'protocolCombo',
                                                                            value: 'HDFS',
                                                                            width: 70,
                                                                            forceSelection: true,
                                                                            multiSelect: false,
                                                                            editable: false,
                                                                            displayField: 'name',
                                                                            valueField: 'value',
                                                                            mode: 'local',
                                                                            queryMode: 'local',
                                                                            triggerAction: 'all',
                                                                            store: Ext.create('Ext.data.Store', {
                                                                                fields: ['name', 'value', 'description'],
                                                                                data: [
                                                                                    {name: 'HDFS', value: 'hdfs://', description: 'HDFS'},
                                                                                    {name: 'S3', value: 's3:/', description: 'Amazon S3'},
                                                                                    {name: 'S3N', value: 's3n:/', description: 'Amazon S3'},
                                                                                    {name: 'HTTP', value: 'http://', description: 'HTTP'}
                                                                                ]
                                                                            })
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    fieldLabel: MSG.ADMIN_H_NAMENODE,
                                                                    layout: 'hbox',
                                                                    combineErrors: true,
                                                                    defaultType: 'textfield',
                                                                    defaults: {
                                                                        hideLabel: 'true'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            name: 'namenodeIP',
                                                                            itemId: 'namenodeIP',
                                                                            fieldLabel: MSG.COMMON_IP,
                                                                            flex: 4,
                                                                            emptyText: '192.168.0.1',
                                                                            allowBlank: false
                                                                        },
                                                                        {
                                                                            name: 'namenodePort',
                                                                            itemId: 'namenodePort',
                                                                            fieldLabel: MSG.COMMON_PORT,
                                                                            flex: 2,
                                                                            margins: '0 0 0 6',
                                                                            emptyText: '9000',
                                                                            allowBlank: false
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    fieldLabel: MSG.ADMIN_H_JOBTRACKER,
                                                                    layout: 'hbox',
                                                                    combineErrors: true,
                                                                    defaultType: 'textfield',
                                                                    defaults: {
                                                                        hideLabel: 'true'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            name: 'jobTrackerIP',
                                                                            itemId: 'jobTrackerIP',
                                                                            fieldLabel: MSG.COMMON_IP,
                                                                            flex: 4,
                                                                            emptyText: '192.168.0.1',
                                                                            allowBlank: false
                                                                        },
                                                                        {
                                                                            name: 'jobTrackerPort',
                                                                            itemId: 'jobTrackerPort',
                                                                            fieldLabel: MSG.COMMON_PORT,
                                                                            flex: 2,
                                                                            margins: '0 0 0 6',
                                                                            emptyText: '9001',
                                                                            allowBlank: false
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: 'Hadoop Web Console',
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'namenodeConsole',
                                                                    itemId: 'namenodeConsole',
                                                                    emptyText: 'http://192.168.0.1:50070',
                                                                    fieldLabel: MSG.ADMIN_H_NN_CONSOLE,
                                                                    allowBlank: true,
                                                                    minLength: 15
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'jobTrackerConsole',
                                                                    itemId: 'jobTrackerConsole',
                                                                    emptyText: 'http://192.168.0.1:50030',
                                                                    fieldLabel: MSG.ADMIN_H_JT_CONSOLE,
                                                                    allowBlank: true,
                                                                    minLength: 15
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: 'Monitoring API',
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'namenodeMonitoringPort',
                                                                    itemId: 'namenodeMonitoringPort',
                                                                    fieldLabel: 'Namenode Monitoring Port',
                                                                    emptyText: '28080',
                                                                    allowBlank: true,
                                                                    maxLength: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    itemId: 'jobTrackerMonitoringPort',
                                                                    name: 'jobTrackerMonitoringPort',
                                                                    fieldLabel: 'Job Tracker Monitoring Port',
                                                                    emptyText: '18080',
                                                                    allowBlank: true,
                                                                    maxLength: 5
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        buttons: [
                                            {
                                                text: MSG.COMMON_OK,
                                                iconCls: 'common-confirm',
                                                handler: function () {
                                                    var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HADOOP.ADD_HADOOP_CLUSTER;
                                                    var win = popWindow;
                                                    var param = {
                                                        "name": Flamingo.Util.String.trim(popWindow.down('#name').getValue()),
                                                        "namenodeProtocol": Flamingo.Util.String.trim(popWindow.down('#protocolCombo').getValue()),
                                                        "namenodeIP": Flamingo.Util.String.trim(popWindow.down('#namenodeIP').getValue()),
                                                        "namenodePort": Flamingo.Util.String.trim(popWindow.down('#namenodePort').getValue()),
                                                        "jobTrackerIP": Flamingo.Util.String.trim(popWindow.down('#jobTrackerIP').getValue()),
                                                        "jobTrackerPort": Flamingo.Util.String.trim(popWindow.down('#jobTrackerPort').getValue()),
                                                        "namenodeConsole": Flamingo.Util.String.trim(popWindow.down('#namenodeConsole').getValue()),
                                                        "jobTrackerConsole": Flamingo.Util.String.trim(popWindow.down('#jobTrackerConsole').getValue()),
                                                        "namenodeMonitoringPort": Flamingo.Util.String.trim(popWindow.down('#namenodeMonitoringPort').getValue()),
                                                        "jobTrackerMonitoringPort": Flamingo.Util.String.trim(popWindow.down('#jobTrackerMonitoringPort').getValue())
                                                    };
                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                        function (response) {
                                                            var result = Ext.decode(response.responseText);
                                                            var grid = Ext.ComponentQuery.query('#hadoopGrid')[0]
                                                            grid.getStore().load();
                                                            win.close();
                                                        },
                                                        function (response) {
                                                            var result = Ext.decode(response.responseText);
                                                            var popup = win;
                                                            Ext.MessageBox.show({
                                                                title: '하둡 클러스터 추가',
                                                                msg: result.error.message,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.WARNING,
                                                                fn: function handler(btn) {
                                                                    popup.close();
                                                                }
                                                            });
                                                        }
                                                    );
                                                }
                                            },
                                            {
                                                text: MSG.COMMON_CANCEL,
                                                iconCls: 'common-cancel',
                                                handler: function () {
                                                    var win = this.up('window');
                                                    win.close();
                                                }
                                            }
                                        ]
                                    }).show();
                                }
                            },
                            '-',
                            {
                                text: MSG.COMMON_DELETE,
                                iconCls: 'common-delete',
                                disabled: toBoolean(config.demo_mode),
                                handler: function () {
                                    var grid = Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0];
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    if (selection) {
                                        Ext.MessageBox.show({
                                            title: MSG.COMMON_WARN,
                                            msg: MSG.ADMIN_DELETE_HADOOP_CLUSTER_YN,
                                            buttons: Ext.MessageBox.YESNO,
                                            icon: Ext.MessageBox.WARNING,
                                            fn: function handler(btn) {
                                                if (btn == 'yes') {
                                                    var grid = Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0];
                                                    var store = grid.getStore();
                                                    var selection = grid.getSelectionModel().getSelection()[0];

                                                    var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HADOOP.DELETE_HADOOP_CLUSTER;
                                                    var param = {
                                                        "id": selection.data.id
                                                    };

                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                        function (response) {
                                                            store.remove(selection);
                                                            Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().removeAll()
                                                            Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().load()
                                                        },
                                                        function (response) {
                                                            var msg = Ext.decode(response.responseText);

                                                            Ext.MessageBox.show({
                                                                title: MSG.ADMIN_DELETE_HADOOP_CLUSTER,
                                                                msg: msg.message,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.WARNING
                                                            });
                                                        }
                                                    );
                                                }
                                            }
                                        });
                                    }
                                }
                            },
                            /*
                             '-',
                             {
                             text: 'Show File Browser',
                             iconCls: 'collector-show-fs',
                             handler: function () {
                             var grid = Ext.ComponentQuery.query('#serversGrid')[0];
                             var selection = grid.getSelectionModel().getSelection()[0];
                             if (selection) {
                             var popWindow = Ext.create('Ext.Window', {
                             title: 'Local File System Browser',
                             width: 700,
                             height: 450,
                             modal: true,
                             resizable: true,
                             constrain: true,
                             padding: '5 5 5 5',
                             layout: 'fit',
                             items: [
                             Ext.create('Collector.view.FileSystemBrowser', {
                             serverUrl: selection.data.serverUrl
                             })
                             ],
                             buttons: [
                             {
                             text: MSG.COMMON_OK,
                             iconCls: 'common-confirm',
                             handler: function () {
                             popWindow.close();
                             }
                             }
                             ]
                             }).show();
                             }
                             }
                             },
                             */
                            '->',
                            {
                                text: MSG.COMMON_REFRESH,
                                iconCls: 'common-refresh',
                                itemId: 'refreshButton',
                                handler: function () {
                                    Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().removeAll();
                                    Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().load();
                                }
                            }
                        ]
                    }
                ],
                bbar: {
                    xtype: '_statusBar'
                },
                listeners: {
                    selectionchange: function (sm, selectedRecord) {
                    }
                }
            }
        ];

        this.callParent(arguments);
    }
});
