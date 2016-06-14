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

Ext.define('Flamingo.view.admin.Hive', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.adminHivePanel',

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
                itemId: 'hiveGrid',
                stripeRows: true,
                columnLines: true,
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {
                        text: 'ID', width: 50, dataIndex: 'id', align: 'center', hidden: true
                    },
                    {
                        text: 'Name', width: 100, dataIndex: 'name', align: 'center'
                    },
                    {
                        text: 'Configuration', flex: 1, dataIndex: 'instanceName', align: 'left',
                        renderer: function (value, p, record) {
                            return Ext.String.format(
                                'Hive JDBC Driver : {0}</br>' +
                                    'Hive JDBC URL : {1}</br>' +
                                    'Hive Metastore Thrift URIs : {2}</br>',
                                record.data.jdbcDriver,
                                record.data.jdbcUrl,
                                record.data.metastoreUris
                            );
                        }
                    }
                ],
                store: Ext.create('Flamingo.store.admin.hive.HiveServerStore'),
                viewConfig: {
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
                                        title: 'Hive Server',
                                        width: 420,
                                        height: 220,
                                        modal: true,
                                        resizable: false,
                                        constrain: true,
                                        layout: 'fit',
                                        items: {
                                            xtype: 'form',
                                            border: false,
                                            bodyPadding: 10,
                                            defaults: {
                                                anchor: '100%',
                                                labelWidth: 120
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'name',
                                                    name: 'name',
                                                    fieldLabel: 'Hive Server',
                                                    allowBlank: false,
                                                    minLength: 6
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 10',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: MSG.ADMIN_HIVE_CONFIG,
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    itemId: 'jdbcDriver',
                                                                    name: 'jdbcDriver',
                                                                    fieldLabel: 'Hive JDBC Driver',
                                                                    value: 'org.apache.hive.jdbc.HiveDriver',
                                                                    allowBlank: false,
                                                                    minLength: 6
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    itemId: 'jdbcUrl',
                                                                    name: 'jdbcUrl',
                                                                    fieldLabel: 'Hive JDBC URL',
                                                                    value: 'jdbc:hive2://192.168.0.1:10000',
                                                                    allowBlank: false,
                                                                    minLength: 6
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    itemId: 'metastoreUris',
                                                                    name: 'metastoreUris',
                                                                    fieldLabel: 'Hive Metastore URIs',
                                                                    value: 'thrift://192.168.0.1:9083',
                                                                    allowBlank: false,
                                                                    minLength: 6
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
                                                    var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HIVE.ADD_HIVE_SERVER;
                                                    var win = popWindow;
                                                    var param = {
                                                        "name": popWindow.down('#name').getValue(),
                                                        "jdbcDriver": popWindow.down('#jdbcDriver').getValue(),
                                                        "jdbcUrl": popWindow.down('#jdbcUrl').getValue(),
                                                        "metastoreUris": popWindow.down('#metastoreUris').getValue()
                                                    };
                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                        function (response) {
                                                            var result = Ext.decode(response.responseText);
                                                            var grid = Ext.ComponentQuery.query('adminHivePanel #hiveGrid')[0]
                                                            grid.getStore().load();
                                                            win.close();
                                                        },
                                                        function (response) {
                                                            var result = Ext.decode(response.responseText);
                                                            var popup = win;
                                                            Ext.MessageBox.show({
                                                                title: '하이브 서버 추가',
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
                                disabled: toBoolean(config.demo_mode),
                                iconCls: 'common-delete',
                                handler: function () {
                                    var grid = Ext.ComponentQuery.query('adminHivePanel #hiveGrid')[0];
                                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                                    if (selection) {
                                        Ext.MessageBox.show({
                                            title: MSG.ADMIN_HIVE_DELETE,
                                            msg: MSG.ADMIN_MSG_HIVE_DELETE,
                                            buttons: Ext.MessageBox.YESNO,
                                            icon: Ext.MessageBox.WARNING,
                                            fn: function handler(btn) {
                                                if (btn == 'yes') {
                                                    var grid = Ext.ComponentQuery.query('adminHivePanel #hiveGrid')[0];
                                                    var store = grid.getStore();
                                                    var selection = grid.getView().getSelectionModel().getSelection()[0];

                                                    var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HIVE.DELETE_HIVE_SERVER;
                                                    var param = {
                                                        "id": selection.data.id
                                                    };

                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                        function (response) {
                                                            store.remove(selection);
                                                            Ext.ComponentQuery.query('adminHivePanel #hiveGrid')[0].getStore().removeAll()
                                                            Ext.ComponentQuery.query('adminHivePanel #hiveGrid')[0].getStore().load()
                                                        },
                                                        function (response) {
                                                            var msg = Ext.decode(response.responseText);

                                                            Ext.MessageBox.show({
                                                                title: MSG.COMMON_WARN,
                                                                msg: msg.message,
                                                                buttons: Ext.MessageBox.OK,
                                                                fn: function handler(btn) {
                                                                }
                                                            });
                                                        }
                                                    );
                                                }
                                            }
                                        });
                                    }
                                }
                            },
                            '->',
                            {
                                text: MSG.COMMON_REFRESH,
                                iconCls: 'common-refresh',
                                itemId: 'refreshButton',
                                handler: function () {
                                    Ext.ComponentQuery.query('adminHivePanel #hiveGrid')[0].getStore().removeAll();
                                    Ext.ComponentQuery.query('adminHivePanel #hiveGrid')[0].getStore().load();
                                }
                            }
                        ]
                    }
                ],
                bbar: {
                    xtype: '_statusBar'
                }
            }
        ];

        this.callParent(arguments);
    }
});
