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

Ext.define('Flamingo.controller.hive.HiveMetastoreBrowserController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.hiveMetastoreBrowserController',

    init: function () {
        log('Initializing Hive Metastore Browser Controller');
        this.control({
            'hiveBrowserTreePanel #metastoreEngineCombo': {
                change: this.onWorkflowEngineChange
            },

            'hiveBrowserTreePanel': {
                afterrender: this.onTreeAfterRender,
                itemclick: this.onTreeItemClick,
                itemcontextmenu: this.onTreeItemContextMenu,
                containercontextmenu: this.onTreeContainerContextMenu

            }
        })

        log('Initialized Hive Metastore Browser Controller');
        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched Hive Metastore Browser Controller');
    },

    onWorkflowEngineChange: function (combo, newValue, oldValue, eOpts) {
        Ext.ComponentQuery.query('hiveBrowserTreePanel #engineId')[0].setValue(newValue);

        var treeStore = Ext.ComponentQuery.query('hiveBrowserTreePanel')[0].getStore();
        var gridStore = Ext.ComponentQuery.query('hiveBrowserListGridPanel')[0].getStore();
        if (newValue) {
            Ext.apply(treeStore.getProxy().extraParams, {
                engineId: newValue
            });

            treeStore.load();
            gridStore.removeAll();
        }
    },


    onTreeAfterRender: function () {

    },

    onTreeItemClick: function () {

    },

    onTreeItemContextMenu: function (dv, record, item, index, e, combo, eOpts) {
        var me = this;
        var position = e.getXY();
        e.stopEvent();
        var engineId = Ext.ComponentQuery.query('hiveBrowserTreePanel #metastoreEngineCombo')[0].getValue();

        var databaseName = '';
        var tableName = '';

        if (!record.isLeaf()) {
            databaseName = record.data.text;
        }
        else if (record.isLeaf()) {
            databaseName = record.data.parentId.split("/")[1];
            tableName = record.data.text;
        }
        if (record.data.id == '/') { //root에서 right click

            var rootMenu = new Ext.menu.Menu({
                items: [
                    {
                        text: MSG.HIVE_ADD_DATABASE,
                        handler: function () {
                            me.onAddDatabase(engineId);
                        }
                    }
                ]
            })

            rootMenu.showAt(position);

        }
        else if (!record.data.leaf && record.data.parentId == '/') //database 이름을 right click
        {
            var databaseMenu = new Ext.menu.Menu({
                items: [
                    {
                        text: MSG.HIVE_ADD_TABLE,
                        handler: function () {
                            me.onAddTable(engineId, tableName, databaseName);
                        }
                    },
                    {
                        text: MSG.HIVE_DELETE_DATABASE,
                        handler: function () {
                            me.onDeleteDatabase(engineId, databaseName);
                        }
                    }
                ]

            })

            databaseMenu.showAt(position);
        }
        else if (record.data.leaf) //table을 right click
        {
            var tableMenu = Ext.menu.Menu({
                items: [
                    {
                        text: MSG.HIVE_RENAME_TABLE,
                        handler: function () {
                            me.onRenameTable(engineId, databaseName);
                        }
                    },
                    {
                        text: MSG.HIVE_MODIFY_COLUMNS,
                        handler: function () {
                            me.onModifyColumns(engineId, tableName, databaseName);
                        }
                    },
                    {
                        text: MSG.HIVE_MODIFY_PARTITIONS,
                        handler: function () {
                            me.onModifyPartitions(engineId, tableName, databaseName);
                        }
                    },
                    {
                        text: MSG.HIVE_DELETE_TABLE,
                        handler: function () {
                            me.onDeleteTable(engineId, tableName, databaseName);
                        }
                    }
                ]
            });

            tableMenu.showAt(position);
        }
    },

    onTreeContainerContextMenu: function (grid, e) {
        e.stopEvent();
    },

    onAddDatabase: function (engineId) {
        var me = this;
        if (engineId == 0 || engineId < 0) {
            me._error(MSG.HIVE_MSG_SELCECT_HIVE_SERVER);
        }

        var popWindow = Ext.create('Ext.Window', {
            title: MSG.HIVE_DIALOG_TITLE_HIVE_DB_CREATE,
            width: 450,
            height: 170,
            modal: true,
            padding: '5 5 5 5',
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: {
                xtype: 'hiveDBCreator'
            },
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    handler: function () {
                        me.onAddDatabaseOK(popWindow, engineId);
                    }
                },
                {
                    text: MSG.COMMON_CANCEL,
                    handler: function () {
                        popWindow.close();
                    }

                }
            ]
        }).center().show();
    },

    onDeleteDatabase: function (engineId, databaseName) {
        Ext.MessageBox.show({
            title: MSG.HIVE_DIALOG_TITLE_CAUTION,
            msg: MSG.HIVE_MSG_WANNA_DELETE_DATABASE,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function handler(btn) {
                if (btn == 'yes') {


                    var params = {
                        engineId: engineId,

                        databaseName: databaseName
                    };

                    Flamingo.Ajax.Request.invokeGet(
                        CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_DROP_DATABASE,
                        params,
                        function (response) {

                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                var treeStore = Ext.ComponentQuery.query('hiveBrowserTreePanel')[0].getStore();
                                var gridStore = Ext.ComponentQuery.query('hiveBrowserListGridPanel')[0].getStore();

                                treeStore.load({ params: { engineId: engineId } });
                                gridStore.removeAll();

                                Ext.Msg.alert({
                                    title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                    msg: MSG.HIVE_MSG_DELETE_DATABASE_SUCC,
                                    buttons: Ext.Msg.OK,
                                    fn: function (e) {
                                        return true;
                                    }
                                });
                            }
                            else {
                                Ext.Msg.alert({
                                    title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                    msg: MSG.HIVE_MSG_DELETE_DATABASE_FAIL,
                                    buttons: Ext.Msg.OK,
                                    fn: function (e) {
                                        return false;
                                    }
                                });
                            }
                        },

                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            Ext.Msg.alert({
                                title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                msg: MSG.HIVE_MSG_DELETE_DATABASE_FAIL,
                                buttons: Ext.Msg.OK,
                                fn: function (e) {
                                    return false;
                                }
                            });
                        }

                    )
                }
                else if (btn == 'no') {
                    this.close();
                }
            }
        });
    },

    onAddTable: function (engineId, tableName, databaseName) {
        if (engineId == null || engineId < 0) {
            Ext.Msg.alert({
                title: msg.button_warn,
                msg: MSG.HIVE_MSG_SELCECT_HIVE_SERVER,
                buttons: Ext.Msg.OK,
                fn: function (e) {
                    return false;
                }
            });
            return false;
        }

        var popWindow = Ext.create('Ext.Window', {
            title: MSG.HIVE_DIALOG_TITLE_CREATE_TABLE,
            width: 450,
            height: 500,
            modal: true,
            padding: '5 5 5 5',
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: {
                xtype: 'tableCreator'
            },
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                        // 서버 갔다가 저장함.
                        var tableCreator = popWindow.down('tableCreator');
                        var partitionGrid = popWindow.down('#partitionGrid');
                        var columnGrid = popWindow.down('#columnGrid');
                        var tableName = popWindow.down('#tableTextField').getValue();
                        var comment = popWindow.down('#commentTextField').getValue();
                        var location = popWindow.down('#locationTextField').getValue();
                        var columnGridStore = columnGrid.getStore();
                        var partitionGridStore = partitionGrid.getStore();
                        var columnArray = [];
                        var partitionArray = [];

                        if (tableName == '') {
                            Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_ENTER_TABLE_NAME);
                        }

                        Ext.each(columnGridStore.getRange(), function (item, idx, a) {
                            if (item.data.name == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_ENTER_COLUMN);
                            }
                            else if (item.data.type == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_SELECT_COLUMN_TYPE);
                            }

                            Ext.Array.push(columnArray, item.data);

                        });

                        Ext.each(partitionGridStore.getRange(), function (item, idx, a) {
                            if (item.data.name == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_ENTER_PARTITION_NAME);
                            }
                            else if (item.data.type == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_SELECT_PARTITION_TYPE);
                            }

                            Ext.Array.push(partitionArray, item.data);

                        });

                        var params = {
                            engineId: engineId,
                            tableName: tableName,
                            databaseName: databaseName,
                            location: location,
                            columnInfo: Ext.encode(columnArray),
                            partitionInfo: Ext.encode(partitionArray)
                        };

                        Flamingo.Ajax.Request.invokeGet(
                            CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_CREATE_TABLE,
                            params,
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    popWindow.close();
                                    var treeStore = Ext.ComponentQuery.query('hiveBrowserTreePanel')[0].getStore();
                                    var gridStore = Ext.ComponentQuery.query('hiveBrowserListGridPanel')[0].getStore();

                                    treeStore.load({ params: { engineId: engineId } });
                                    gridStore.removeAll();

                                    Ext.Msg.alert({
                                        title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                        msg: MSG.HIVE_MSG_TABLE_CREATED,
                                        buttons: Ext.Msg.OK,
                                        fn: function (e) {
                                            return true;
                                        }
                                    });
                                }

                            },
                            function (response) {
                                Ext.Msg.alert({
                                    title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                    msg: MSG.HIVE_MSG_TABLE_CREATE_FAIL,
                                    buttons: Ext.Msg.OK,
                                    fn: function (e) {
                                        return false;
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
                        popWindow.close();
                    }
                }
            ]
        }).center().show();
    },

    onDeleteTable: function (engineId, tableName, databaseName) {
        Ext.MessageBox.show({
            title: MSG.HIVE_DIALOG_TITLE_CAUTION,
            msg: MSG.HIVE_MSG_WANNA_DELETE_TABLE,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function handler(btn) {
                if (btn == 'yes') {
                    var params = {
                        engineId: engineId,
                        tableName: tableName,
                        databaseName: databaseName
                    };

                    Flamingo.Ajax.Request.invokeGet(
                        CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_DROP_TABLE,
                        params,
                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {

                                var treeStore = Ext.ComponentQuery.query('hiveBrowserTreePanel')[0].getStore();
                                var gridStore = Ext.ComponentQuery.query('hiveBrowserListGridPanel')[0].getStore();
                                treeStore.load({ params: { engineId: engineId } });
                                gridStore.removeAll();

                                Ext.Msg.alert({
                                    title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                    msg: MSG.HIVE_MSG_DELETE_TABLE_SUCC,
                                    buttons: Ext.Msg.OK,
                                    fn: function (e) {
                                        return true;
                                    }
                                });
                            }
                            else {
                                Ext.Msg.alert({
                                    title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                    msg: MSG.HIVE_MSG_DELETE_TABLE_FAIL + ' ' + MSG.HIVE_CAUSE + ': ' + obj.error.cause,
                                    buttons: Ext.Msg.OK,
                                    fn: function (e) {
                                        return false;
                                    }
                                });
                            }
                        },

                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            Ext.Msg.alert({
                                title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                msg: MSG.HIVE_MSG_DELETE_TABLE_FAIL + ' ' + MSG.HIVE_CAUSE + ': ' + obj.error.cause,
                                buttons: Ext.Msg.OK,
                                fn: function (e) {
                                    return false;
                                }
                            });
                        }

                    )
                }
                else if (btn == 'no') {
                    return false;
                }
            }
        });
    },

    onRenameTable: function (engineId, databaseName) {
        var popWindow = Ext.create('Ext.Window', {
            title: MSG.HIVE_DIALOG_TITLE_RENAME_TABLE,
            width: 450,
            height: 150,
            modal: true,
            padding: '5 5 5 5',
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: {
                xtype: 'hiveRenameTable'
            },
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                        // 서버 갔다가 저장함.


                        var currTableName = popWindow.down('#currTableNameTextField').getValue();
                        var newTableName = popWindow.down('#newTableNameTextField').getValue();
                        var params = {engineId: engineId, databaseName: databaseName, oldTableName: currTableName, newTableName: newTableName};

                        if (newTableName == '') {
                            Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_ENTER_NEW_TABLE_NAME);
                        }

                        popWindow.close();

                        Flamingo.Ajax.Request.invokeGet(CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_RENAME_TABLE, params,
                            function (response) {
                                var obj = Ext.decode(response.responseText);

                                if (obj.success) {
                                    Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, '테이블 이름이 변경 되었습니다.');
                                    var treeStore = Ext.ComponentQuery.query('#hiveBrowserTree')[0].getStore();
                                    var gridStore = Ext.ComponentQuery.query('#hiveBrowserListGrid')[0].getStore();
                                    treeStore.load({ params: { engineId: engineId } });
                                    gridStore.removeAll();
                                }
                                else {
                                    Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_RENAME_TABLE_FAIL + ' ' + MSG.HIVE_CAUSE + ': ' + obj.error.cause);
                                }
                            },

                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_RENAME_TABLE_FAIL + ' ' + MSG.HIVE_CAUSE + ': ' + obj.error.cause);
                            }
                        );


                    }
                },
                {
                    text: MSG.COMMON_CANCEL,
                    iconCls: 'common-cancel',
                    handler: function () {
                        popWindow.close();
                    }
                }
            ]
        }).center().show();
    },

    onModifyColumns: function (engineId, tableName, databaseName) {
        var popWindow = Ext.create('Ext.Window', {
            title: MSG.HIVE_DIALOG_TITLE_MODIFY_COLUMNS,
            width: 450,
            height: 470,
            modal: true,
            padding: '5 5 5 5',
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: {
                xtype: 'hiveColumn'
            },
            buttons: [
                {
                    text: 'Save',
                    handler: function () {

                        var columnGrid = popWindow.down('#columnGrid');

                        var columnGridStore = columnGrid.getStore();

                        var columnArray = [];

                        Ext.each(columnGridStore.getRange(), function (item, idx, a) {
                            if (item.data.name == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_ENTER_COLUMN_NAME);

                            }
                            else if (item.data.type == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_SELECT_COLUMN_TYPE);
                            }
                            Ext.Array.push(columnArray, item.data);
                        });

                        var params = {
                            id: hiveServerId,
                            tableName: tableName,
                            databaseName: databaseName,

                            columnSchema: Ext.encode(columnArray)
                        };

                        Flamingo.Ajax.Request.invokeGet(
                            CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_UPDATE_TABLE,
                            params,
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    var treeStore = Ext.ComponentQuery.query('#hiveBrowserTree')[0].getStore();
                                    var gridStore = Ext.ComponentQuery.query('#hiveBrowserListGrid')[0].getStore();
                                    treeStore.load({ params: { engineId: engineId } });
                                    gridStore.removeAll();

                                    Ext.Msg.alert({
                                        title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                        msg: MSG.HIVE_MSG_UPDATE_TABLE_SUCC,
                                        buttons: Ext.Msg.OK,
                                        fn: function (e) {
                                            return true;
                                        }
                                    });
                                }

                            },
                            function (response) {
                                Ext.Msg.alert({
                                    title: MSG.HIVE_DIALOG_TITLE_NOTICE,
                                    msg: MSG.HIVE_MSG_UPDATE_TABLE_FAIL,
                                    buttons: Ext.Msg.OK,
                                    fn: function (e) {
                                        return false;
                                    }
                                });
                            }
                        );
                    }
                },
                {
                    text: 'Close',
                    handler: function () {
                        popWindow.close();
                    }
                }
            ]
        }).center().show();

    },

    onModifyPartitions: function (engineId, tableName, databaseName) {
        var popWindow = Ext.create('Ext.Window', {
            title: MSG.HIVE_DIALOG_TITLE_MODIFY_PARTITIONS,
            width: 450,
            height: 470,
            modal: true,
            padding: '5 5 5 5',
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: {
                xtype: 'hivePartition'
            },
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                    }
                },
                {
                    text: MSG.COMMON_CANCEL,
                    iconCls: 'common-cancel',
                    handler: function () {
                        popWindow.close();
                    }
                }
            ]
        }).center().show();

        popWindow.down('#tableTextField').setValue(tableName);
        popWindow.down('#partitionGrid').getStore().load({params: {engineId: engineId, databaseName: databaseName, tableName: tableName}});

    },

    onAddDatabaseOK: function (popWindow, engineId) {
        var dbName = popWindow.down('#dbTextField').getValue();
        var comment = popWindow.down('#commentTextField').getValue();
        var location = popWindow.down('#locationTextField').getValue();
        var params = {engineId: engineId, databaseName: dbName};
        var me = this;
        if (dbName == '') {
            me._error(MSG.HIVE_MSG_ENTER_DB_NAME);
        }

        popWindow.close();

        Flamingo.Ajax.Request.invokeGet(CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_CREATE_DATABASE, params,
            function (response) {
                var obj = Ext.decode(response.responseText);

                if (obj.success) {
                    Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_DB_CREATE_SUCC);
                    var treeStore = Ext.ComponentQuery.query('hiveBrowserTreePanel')[0].getStore();
                    var gridStore = Ext.ComponentQuery.query('hiveBrowserListGridPanel')[0].getStore();


                    if (engineId > 0) {
                        treeStore.load({ params: { engineId: engineId } });
                        gridStore.removeAll();
                    } else {
                        // TODO Alert
                    }
                }
                else {
                    me._error(MSG.HIVE_MSG_DB_CREATE_FAIL + ' ' + MSG.HIVE_CAUSE + ': ' + obj.error.cause);
                }
            },

            function (response) {
                var obj = Ext.decode(response.responseText);
                me._error(MSG.HIVE_MSG_DB_CREATE_FAIL + ' ' + MSG.HIVE_CAUSE + ': ' + obj.error.cause);

            }
        );
    }
});