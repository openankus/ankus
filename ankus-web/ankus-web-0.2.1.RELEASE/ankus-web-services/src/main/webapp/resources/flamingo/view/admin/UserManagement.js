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

Ext.define('Flamingo.view.admin.UserManagement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userManagement',
    controllers: ['Flamingo.controller.admin.UserManagementController'],
    border: false,
    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;
        var userManagementStore = Ext.create('Flamingo.store.admin.UserManagementStore');
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    itemId: 'userManagementGridPanel',
                    features: [
                        Ext.create('Ext.grid.feature.Grouping', {
                            groupHeaderTpl: '{name} (' + MSG.DASHBOARD_GROUP_TOTAL + ': {rows.length})'
                        })
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        mode: 'MULTI',
                        ignoreRightMouseSelection: true
                    }),
                    border: false,
                    store: userManagementStore,
                    columns: [
                        {text: 'Username', flex: 1, dataIndex: 'username', align: 'center'},
                        {text: 'E-mail', flex: 1, dataIndex: 'email', align: 'center'},
                        {
                            header: 'Enabled',
                            dataIndex: 'enabled',
                            flex: 1,
                            align: 'center',
                            editor: new Ext.form.field.ComboBox({
                                typeAhead: true,
                                triggerAction: 'all',
                                selectOnTab: true,
                                store: [
                                    ['true', 'true'],
                                    ['false', 'false']
                                ],
                                lazyRender: true,
                                listClass: 'x-combo-list-small'
                            })
                        },
                        {
                            header: 'Authority',
                            dataIndex: 'authority',
                            flex: 1,
                            align: 'center',
                            editor: new Ext.form.field.ComboBox({
                                typeAhead: true,
                                triggerAction: 'all',
                                selectOnTab: true,
                                store: [
                                    [CONSTANTS.AUTH_ROLE_USER, CONSTANTS.AUTH_ROLE_USER],
                                    [CONSTANTS.AUTH_ROLE_MANAGER, CONSTANTS.AUTH_ROLE_MANAGER],
                                    [CONSTANTS.AUTH_ROLE_ADMIN, CONSTANTS.AUTH_ROLE_ADMIN]
                                ],
                                lazyRender: true,
                                listClass: 'x-combo-list-small'
                            })
                        },
                        {text: 'Create Date', flex: 1, dataIndex: 'createDate', align: 'center',
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: userManagementStore,
                            dock: 'bottom',
                            pageSize: CONSTANTS.GRID_SIZE_PER_PAGE,
                            displayInfo: true
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        columnLines: true
                    },
                    tbar: [
                        {
                            xtype: 'button',
                            text: MSG.COMMON_SAVE,
                            iconCls: 'common-confirm',
                            handler: function (grid, rowIndex, colIndex) {

                                var gridPanel = Ext.ComponentQuery.query('#userManagementGridPanel')[0];
                                var multiNode = gridPanel.getSelectionModel().getSelection();

                                for (var i = 0; i < multiNode.length; i++) {
                                    var params = {
                                        'username': multiNode[i].get('username'),
                                        'enabled': multiNode[i].get('enabled'),
                                        'authority': multiNode[i].get('authority')
                                    };

                                    Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.ADMIN.USER_MANAGEMENT.UPDATE_USER, params,
                                        function (response) {
                                            var obj = Ext.decode(response.responseText);
                                            var controller = Flamingo.app.controllers.get('Flamingo.controller.admin.UserManagementController');
                                            if (obj.success) {
                                                msg('Saving user has succeeded.', 'User has been saved');
                                                Ext.ComponentQuery.query('#userManagementGridPanel')[0].getStore().load();
                                            } else {
                                                msg('Can not change user. 원인 : ' + obj.error.message);
                                            }
                                        }
                                    );
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'common-delete',
                            handler: function (grid, rowIndex, colIndex) {
                                var gridPanel = Ext.ComponentQuery.query('#userManagementGridPanel')[0];
                                var multiNode = gridPanel.getSelectionModel().getSelection();

                                Ext.MessageBox.show({
                                    title: 'Remove user',
                                    msg: 'Do you want to remove the user?',
                                    width: 300,
                                    buttons: Ext.MessageBox.YESNO,
                                    icon: Ext.MessageBox.INFO,
                                    scope: this,
                                    fn: function (btn, text, eOpts) {

                                        if (btn === 'yes') {
                                            for (var i = 0; i < multiNode.length; i++) {
                                                var params = {
                                                    'username': multiNode[i].get('username'),
                                                    'email': multiNode[i].get('email')
                                                };

                                                Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.ADMIN.USER_MANAGEMENT.REMOVE_USER, params,
                                                    function (response) {
                                                        var obj = Ext.decode(response.responseText);
                                                        var controller = Flamingo.app.controllers.get('Flamingo.controller.admin.UserManagementController');

                                                        if (obj.success) {
                                                            msg('Remove user has succeeded.', 'User has been removed');
                                                            Ext.ComponentQuery.query('#userManagementGridPanel')[0].getStore().load();

                                                        } else {
                                                            msg('Can not remove the user. 원인 : ' + obj.error.message);
                                                        }
                                                    }
                                                );
                                            }
                                        } else {
                                        }
                                    }
                                });
                            }
                        },
                        {
                            xtype: 'tbtext',
                            text: 'Username'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'username',
                            vtype: 'alphanum',
                            width: 80
                        },
                        {
                            xtype: 'tbtext',
                            text: 'Email'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'email',
                            vtype: 'email',
                            width: 100
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: 'Enabled'
                        },
                        {
                            xtype: 'combo',
                            name: 'enabled',
                            itemId: 'enabled',
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                            selectOnFocus: true,
                            displayField: 'name',
                            valueField: 'value',
                            width: 70,
                            value: 'ALL',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value', 'description'],
                                data: [
                                    {name: MSG.DASHBOARD_STATUS_ALL, value: 'ALL'},
                                    {name: 'true', value: '1'},
                                    {name: 'false', value: '0'}
                                ]
                            })
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: 'Authority'
                        },
                        {
                            xtype: 'combo',
                            name: 'authority',
                            itemId: 'authority',
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                            selectOnFocus: true,
                            displayField: 'name',
                            valueField: 'value',
                            width: 100,
                            value: 'ALL',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value', 'description'],
                                data: [
                                    {name: MSG.DASHBOARD_STATUS_ALL, value: 'ALL'},
                                    {name: CONSTANTS.AUTH_ROLE_USER, value: CONSTANTS.AUTH_ROLE_USER},
                                    {name: CONSTANTS.AUTH_ROLE_MANAGER, value: CONSTANTS.AUTH_ROLE_MANAGER},
                                    {name: CONSTANTS.AUTH_ROLE_ADMIN, value: CONSTANTS.AUTH_ROLE_ADMIN}
                                ]
                            })
                        },
                        {
                            xtype: 'tbtext',
                            text: 'Create Date'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            itemId: 'createDate',
                            vtype: 'dateRange',
                            width: 90
                        },
                        {
                            xtype: 'button',
                            itemId: 'findUserManagementButton',
                            formBind: true,
                            text: MSG.DASHBOARD_FIND_FIND,
                            iconCls: 'common-find',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearUserManagementButton',
                            formBind: true,
                            text: MSG.DASHBOARD_FIND_CLEAR,
                            iconCls: 'common-find-clear',
                            labelWidth: 50
                        }
                    ],
                    plugins: [cellEditing],
                    listeners: {
                        afterrender: function () {
                            // Hide a refresh button of paging tool bar
                            var workflowHistoryPanel = Ext.ComponentQuery.query('userManagement')[0].down('gridpanel');
                            Ext.each(workflowHistoryPanel.dockedItems.items, function (item) {
                                // Find a bottom tool bar
                                if (item.dock && item.dock == 'bottom') {
                                    // Find a refresh button
                                    Ext.each(item.items.items, function (comp) {
                                        if (comp.itemId && comp.itemId == 'refresh') {
                                            // Hide a refresh button
                                            comp.hide();
                                        }
                                    });
                                }
                            }, this);
                        }
                    }
                }
            ]
        });

        this.callParent(arguments);
        this.on('afterrender', this.registControllers, this);
    },

    registControllers: function () {
        Ext.each(this.controllers, function (control) {
            var controller = Flamingo.app.controllers.get(control);
            if (!controller) {
                controller = Ext.create(control, {
                    application: Flamingo.app,
                    id: control
                });
                Flamingo.app.controllers.put(control, controller);
                controller.init(); // Run init on the controller
            }
        }, this);
    }
});