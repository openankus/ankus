/*
 * Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Flamingo.controller.hive.HiveEditorController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.hiveEditorController',

    requires: [
        'Ext.ux.data.reader.DynamicReader'
    ],

    init: function () {
        log('Initializing Hive Controller');

        this.control({
            'hiveExecutionLogPanel #logRefreshButton': {
                click: this.onLogRefreshButtonClick
            },
            'hiveQueryEditorPanel #metaBrowserButton': {
                click: this.onMetaBrowserButtonClick
            },
            'hiveQueryEditorPanel #runButton': {
                click: this.onRunButtonClick
            },
            'hiveQueryEditorPanel #saveButton': {
                click: this.onSaveButtonClick
            },
            'hiveQueryEditorViewport #addTabButton': {
                click: this.addEditorTab
            },

            // History
            'hiveQueryHistoryPanel #first': {
                click: this.onHiveQueryHistoryPagingClick
            },
            'hiveQueryHistoryPanel #prev': {
                click: this.onHiveQueryHistoryPagingClick
            },
            'hiveQueryHistoryPanel #next': {
                click: this.onHiveQueryHistoryPagingClick
            },
            'hiveQueryHistoryPanel #last': {
                click: this.onHiveQueryHistoryPagingClick
            },
            'hiveQueryHistoryPanel #findButton': {
                click: this.onHiveQueryHistoryFindClick
            },
            'hiveQueryHistoryPanel #clearButton': {
                click: this.onHiveQueryHistoryClearClick
            },
            'hiveQueryHistoryPanel #downloadButton': {
                click: this.onHiveQueryResultDownloadClick
            },
            'hiveQueryHistoryPanel > grid': {
                itemclick: this.onHiveQueryHistoryItemClick
            },
            'hiveQueryHistoryPanel #detailTabPanel': {
                tabchange: this.onDetailTabPanelTabChange
            }
        });

        log('Initialized Hive Controller');

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched Hive Controller');

        /*
         var codemirror = query('hiveQueryEditorPanel codemirror');
         codemirror.getEl().on('keypress', function (event, target) {
         log(event);
         if (event.ctrlKey && !event.shiftKey) {
         event.stopEvent();
         switch (event.getKey()) {
         case event.ENTER : // this is actually the "S" key
         var findButton = query('hiveQueryEditorPanel #runButton');
         findButton.fireHandler();
         break;
         }
         }
         });
         */
    },

    onSaveButtonClick: function () {
        var panel = query('hiveQueryEditorPanel');
        var script = panel.down('codemirror').lastValue;

        var params = {
            query: script ? escape(script) : ""
        };
    },

    onRunButtonClick: function (button) {
        var panel = button.up('hiveQueryEditorPanel');
        var engineId = panel.down('_workflowEngineCombo').getValue();
        var database = panel.down('_hiveDatabaseCombo').getValue();
        if (engineId && database) {
            var script = panel.down('codemirror').lastValue;

            var params = {
                engineId: engineId,
                database: database,
                hive: Ext.encode({
                    script: script ? escape(script) : ""
                })
            };
            Ext.MessageBox.show({
                title: MSG.HIVE_DIALOG_TITLE_QUERY_RUN,
                msg: MSG.HIVE_MSG_QUERY_RUN,
                width: 300,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.INFO,
                scope: this,
                fn: function (btn, text, eOpts) {
                    if (btn === 'yes') {
                        Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.EXECUTE, params,
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                var grid = query('hiveQueryEditorPanel gridpanel');
                                if (obj.success) {
                                    grid.getStore().insert(0, {
                                        time: Flamingo.Util.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                        message: unescape(obj.map.validation)
                                    });
                                    info(MSG.HIVE_DIALOG_TITLE_QUERY_RUNNING, unescape(obj.map.validation));
                                } else {
                                    if (obj.error.cause) {
                                        grid.getStore().insert(0, {
                                            time: Flamingo.Util.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                            message: obj.error.cause
                                        });
                                    } else {
                                        grid.getStore().insert(0, {
                                            time: Flamingo.Util.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                            message: obj.error.message
                                        });
                                    }
                                    error(MSG.HIVE_DIALOG_TITLE_QUERY_FAIL, MSG.HIVE_MSG_CHECK_LOG);
                                }
                            },
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                grid.getStore().insert(0, {
                                    time: Flamingo.Util.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                    message: response.responseText
                                });
                                error(MSG.HIVE_DIALOG_TITLE_QUERY_FAIL, response.responseText);
                            }
                        );
                    }
                }
            });

        } else {
            Ext.MessageBox.show({
                title: MSG.DIALOG_TITLE_WARN,
                msg: MSG.HIVE_MSG_SELECT_SERVER,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                width: 300,
                scope: this,
                fn: function (e) {
                    return true;
                }
            });
        }
    },

    onAddTableButtonClick: function () {
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
                    text: 'Create',
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

                        if (tableName == '') {
                            Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_INFO, MSG.HIVE_MSG_ENTER_TABLE_NAME);
                            return;
                        }

                        var params = {
                            tableName: tableName,
                            comment: comment,
                            location: location,
                            columns: [],
                            partitions: []
                        };

                        Ext.each(columnGridStore.getRange(), function (item, idx, a) {
                            if (item.data.name == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_INFO, MSG.HIVE_MSG_ENTER_COLUMN_NAME);
                                return;
                            }

                            if (item.data.type == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_INFO, MSG.HIVE_MSG_SELECT_COLUMN_TYPE);
                                return;
                            }

                            params.columns.push({
                                'name': item.data.columnNames,
                                'type': item.data.columnTypes,
                                'comment': item.data.columnDescriptions
                            });
                        });

                        Ext.each(partitionGridStore.getRange(), function (item, idx, a) {
                            if (item.data.name == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_INFO, MSG.HIVE_MSG_ENTER_PARTITION_NAME);
                                return;
                            }

                            if (item.data.type == '') {
                                Ext.MessageBox.alert(MSG.HIVE_DIALOG_TITLE_INFO, MSG.HIVE_MSG_SELECT_PARTITION_TYPE);
                                return;
                            }

                            params.partitions.push({
                                'name': item.data.columnNames,
                                'type': item.data.columnTypes,
                                'comment': item.data.columnDescriptions
                            });
                        });

                        log(params);

                        Flamingo.Ajax.Request.invokePostByMap(
                            CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_CREATE_TABLE,
                            params,
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    popWindow.close();
                                    var treeStore = Ext.ComponentQuery.query('#hiveBrowserTree')[0].getStore();
                                    var gridStore = Ext.ComponentQuery.query('#hiveBrowserListGrid')[0].getStore();
                                    var combo = Ext.ComponentQuery.query('#hiveServers')[0];

                                    var selectedValue = combo.getValue();
                                    if (selectedValue != null) {
                                        treeStore.load({ params: { id: selectedValue } });
                                        gridStore.removeAll();
                                    }

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

    onLogRefreshButtonClick: function () {
        log('onLogRefreshButtonClick');
    },

    onMetaBrowserButtonClick: function () {
        var win = Ext.create('Ext.Window', {
            title: MSG.HIVE_DIALOG_TITLE_HIVE_METASTORE_BROWSER,
            width: 700,
            height: 350,
            iconCls: 'icon-grid',
            animCollapse: false,
            constrainHeader: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'hiveMetastoreBrowserViewport'
                }
            ]
        });
        win.center().show();
    },

    adjustTabClosable: function () {
        var viewport = query('hiveQueryEditorViewport');
        var tabpanel = viewport.down('tabpanel');

        if (tabpanel == undefined)
            return;

        var tabs = tabpanel.getTabBar().items;

        for (var i = 1; tabs.get(i).xtype == 'tab'; ++i) {
            if ((tabs.length > 4 && arguments.length == 0) || (tabs.length - 1 > 4 && arguments.length >= 1)) {
                tabs.get(i).setClosable(true);
            } else {
                tabs.get(i).setClosable(false);
            }
        }
    },

    addEditorTab: function (btn) {
        var tabpanel = btn.up('tabpanel');
        tabpanel.add({
            xtype: 'hiveQueryEditorPanel',
            title: 'Unnamed ' + (tabpanel.items.length - 1),
            closable: true
        });
    },

    onHiveQueryHistoryPagingClick: function () {
        var panel = Ext.ComponentQuery.query('hiveQueryHistoryPanel')[0];
        var engineId = panel.query('#engineId')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var status = panel.query('#status')[0];

        var pigHistoryPanel = Ext.ComponentQuery.query('hiveQueryHistoryPanel')[0].down('gridpanel');
        pigHistoryPanel.getStore().getProxy().extraParams.engineId = engineId;
        pigHistoryPanel.getStore().getProxy().extraParams.startDate = Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d');
        pigHistoryPanel.getStore().getProxy().extraParams.endDate = Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d');
        pigHistoryPanel.getStore().getProxy().extraParams.status = status.getValue();
    },

    onHiveQueryHistoryClearClick: function () {
        var panel = Ext.ComponentQuery.query('hiveQueryHistoryPanel')[0];
        panel.query('#startDate')[0].setValue('');
        panel.query('#startDate')[0].setMaxValue();
        panel.query('#startDate')[0].setMinValue();

        panel.query('#endDate')[0].setValue('');
        panel.query('#endDate')[0].setMinValue();
        panel.query('#endDate')[0].setMaxValue();

        panel.query('#status')[0].setValue('ALL');
    },

    onHiveQueryHistoryFindClick: function () {
        var panel = Ext.ComponentQuery.query('hiveQueryHistoryPanel')[0];
        var engineId = panel.query('#engineId')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var status = panel.query('#status')[0];

        if (engineId) {
            if ((startDate.getValue() != null && endDate.getValue() == null)
                || endDate.getValue() != null && startDate.getValue() == null) {
                Ext.Msg.alert({
                    title: MSG.HIVE_DIALOG_TITLE_QUERY_HISTORY_CHECK,
                    msg: MSG.HIVE_MSG_SET_START_END_DATE,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (e) {
                        return false;
                    }
                });
                return false;
            }

            if (startDate.getValue() != null || endDate.getValue() != null) {
                if (startDate.getValue().length <= 1) {
                    Ext.Msg.alert({
                        title: MSG.HIVE_DIALOG_TITLE_QUERY_HISTORY_CHECK,
                        msg: MSG.HIVE_MSG_SET_DATE_TO_SEARCH,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        fn: function (e) {
                            return false;
                        }
                    });
                    return false;
                }
                else if (endDate.getValue().length <= 1) {
                    Ext.Msg.alert({
                        title: MSG.HIVE_DIALOG_TITLE_QUERY_HISTORY_CHECK,
                        msg: MSG.HIVE_MSG_SET_DATE_TO_SEARCH,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        fn: function (e) {
                            return false;
                        }
                    });
                    return false;
                }
            }

            var hiveQueryHistoryPanel = Ext.ComponentQuery.query('hiveQueryHistoryPanel')[0].down('gridpanel');
            hiveQueryHistoryPanel.getStore().load({
                params: {
                    startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d'),
                    endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d'),
                    status: status.getValue(),
                    engineId: engineId,
                    start: 0,
                    page: 1,
                    limit: 5
                }
            });
        } else {
            Ext.MessageBox.show({
                title: MSG.HIVE_DIALOG_TITLE_QUERY_HISTORY_CHECK,
                msg: MSG.HIVE_MSG_SELCECT_HIVE_SERVER,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                scope: this,
                fn: function (btn, text, eOpts) {
                    return false;
                }
            });
        }
    },

    /**
     * Hive Query의 실행 결과를 보여준다.
     */
    onHiveQueryHistoryItemClick: function (view, record, item, index, e, opts) {
        var panel = query('hiveQueryHistoryPanel');
        var historyHiveQuery = panel.query('#historyHiveQuery')[0];
        var resultGrid = panel.query('#resultGrid')[0];

        resultGrid.getStore().removeAll();
        resultGrid.reconfigure(resultGrid.getStore(), []);
        resultGrid.getView().refresh();

        var downloadButton = query('hiveQueryHistoryPanel #downloadButton');
        if (record.data.status == 'FAIL') {
            historyHiveQuery.setValue(wrap(record.raw.cause, 100, '\r', 0));
        } else if (record.data.status == 'SUCCESS' || record.data.status == 'RUNNING') {

            if (record.data.status == 'SUCCESS' && record.data.length > 0) {
                downloadButton.setDisabled(false);
            } else {
                downloadButton.setDisabled(true);
            }

            var engineCombo = query('hiveQueryHistoryPanel #historyEngineCombo');
            var engineId = engineCombo.getValue();

            var store = resultGrid.getStore();
            var params = store.getProxy().extraParams;

            var executionId = query('hiveQueryHistoryPanel #executionId');
            executionId.setValue(record.data.executionId);

            params.executionId = record.data.executionId;
            params.engineId = engineId;

            resultGrid.getStore().load();
            resultGrid.getView().refresh();

            invokeGet(CONSTANTS.HIVE.QUERY, {engineId: engineId, executionId: record.data.executionId},
                function (response) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.success) {
                        historyHiveQuery.setValue(unescape(obj.map.query));
                    }
                },
                function (response) {
                    historyHiveQuery.setValue(response.responseText);
                }
            );
        } else {
            downloadButton.setDisabled(true);
        }
    },

    /**
     * Hive Query의 처리 결과를 다운로드한다.
     */
    onHiveQueryResultDownloadClick: function () {
        var executionId = query('hiveQueryHistoryPanel #executionId');
        var engineCombo = query('hiveQueryHistoryPanel #historyEngineCombo');

        var param = {
            executionId: executionId.getValue(),
            engineId: engineCombo.getValue(),
            maxSize: config.hive_query_result_max_download_size
        };

        var selected = query('hiveQueryHistoryPanel > gridpanel').getView().getSelectionModel().getSelection()[0];
        if (selected.data.status == 'SUCCESS') {
            Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.HIVE.CHECK_SIZE, param,
                function (response) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.success) {
                        Ext.core.DomHelper.append(document.body, {
                            tag: 'iframe',
                            id: 'testIframe' + new Date().getTime(),
                            css: 'display:none;visibility:hidden;height:0px;',
                            src: CONSTANTS.HIVE.DOWNLOAD + "?executionId=" + executionId.getValue() + "&engineId=" + engineCombo.getValue(),
                            frameBorder: 0,
                            width: 0,
                            height: 0
                        });
                    } else {
                        msg(MSG.HIVE_DIALOG_TITLE_DOWNLOAD_FAIL, obj.error.message);
                    }
                },
                function (response) {
                    msg(MSG.HIVE_DIALOG_TITLE_DOWNLOAD_FAIL, response.responseText);
                }
            );
        } else {
            msg(MSG.HIVE_DIALOG_TITLE_NOTICE, MSG.HIVE_MSG_HIVE_QUERY_STILL_RUNNING);
        }
    },

    /**
     * 상세내역 tabChange 이벤트
     * 쿼리결과 탭에서 이력을 선택했을 때 Hive쿼리 탭이 안바뀌는 현상 해결
     **/
    onDetailTabPanelTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var tabIndex = tabPanel.items.indexOf(newCard);

        if (tabIndex == 0) {
            newCard.items.items[0].editor.refresh();
        }
    }
});