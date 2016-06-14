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

Ext.define('Flamingo.controller.pig.PigController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.pigController',

    requires: [
        'Flamingo.view.pig.PigHistoryPanel',
        'Flamingo.view.dashboard.JobDetail'
    ],

    init: function () {
        log('Initializing Pig Controller');

        this.control({
            // Editor
            'pigEditorPanel #saveButton': {
                click: this.onSaveButtonClick
            },
            'pigEditorPanel #runButton': {
                click: this.onRunButtonClick
            },

            // History
            'pigHistoryPanel #first': {
                click: this.onPagingClick
            },
            'pigHistoryPanel #prev': {
                click: this.onPagingClick
            },
            'pigHistoryPanel #next': {
                click: this.onPagingClick
            },
            'pigHistoryPanel #last': {
                click: this.onPagingClick
            },
            'pigHistoryPanel #findButton': {
                click: this.onFindClick
            },
            'pigHistoryPanel #clearButton': {
                click: this.onClearClick
            },
            'pigHistoryPanel > grid': {
                itemclick: this.onPigHistoryItemClick
            },
            'pigHistoryPanel #detailTabPanel': {
                tabchange: this.onDetailTabPanelTabChange
            },

            // Pig Script
            'pigScriptPanel > grid': {
                itemclick: this.onPigScriptItemClick
            },
            'pigScriptPanel #first': {
                click: this.onPigScriptPagingClick
            },
            'pigScriptPanel #prev': {
                click: this.onPigScriptPagingClick
            },
            'pigScriptPanel #next': {
                click: this.onPigScriptPagingClick
            },
            'pigScriptPanel #last': {
                click: this.onPigScriptPagingClick
            },
            'pigScriptPanel #findButton': {
                click: this.onPigScriptFindClick
            },
            'pigScriptPanel #clearButton': {
                click: this.onPigScriptClearClick
            }
        });

        log('Initialized Pig Controller');

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched Pig Controller');
    },

    onSaveButtonClick: function () {
        var panel = Ext.ComponentQuery.query('pigEditorPanel')[0];
        var scriptId = panel.query('#scriptId')[0].getValue();
        var scriptName = panel.query('#scriptName')[0].getValue();

        if (scriptName) {
            var script = panel.query('#pigScript')[0].getValue();
            var configurationGrid = panel.query('#confs')[0];
            var variableGrid = panel.query('#vars')[0];
            var externalGrid = panel.query('#externals')[0];

            var varaible = {}, cofiguration = {}, external = [];

            variableGrid.getStore().each(function (record, idx) {
                varaible[String(record.get('variableNames'))] = record.get('variableValues');
            });

            configurationGrid.getStore().each(function (record, idx) {
                cofiguration[String(record.get('hadoopKeys'))] = record.get('hadoopValues');
            });

            externalGrid.getStore().each(function (record, idx) {
                external.push(record.get('input'));
            });

            var body = {
                configuration: cofiguration,
                variable: varaible,
                external: external,
                script: escape(script),
                id: scriptId ? scriptId : "",
                name: scriptName
            };

            Flamingo.Ajax.Request.invokePostByText(CONSTANTS.CONTEXT_PATH + CONSTANTS.PIG.SAVE, '', Ext.encode(body),
                function (response) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.success) {
                        msg(MSG.PIG_DIALOG_TITLE_SCRIPT_SAVE_SUCC, MSG.PIG_MSG_SCRIPT_SAVE_SUCC);
                        Ext.ComponentQuery.query('pigEditorPanel #scriptId')[0].setValue(obj.map.scriptId);
                        Ext.ComponentQuery.query('pigEditorPanel #scriptName')[0].setValue(obj.map.scriptName);
                    } else {
                        msg(MSG.PIG_DIALOG_TITLE_SCRIPT_SAVE_FAIL, obj.error.cause);
                    }
                },
                function (response) {
                    msg(MSG.PIG_DIALOG_TITLE_SCRIPT_SAVE_FAIL, response.statusText);
                }
            )
        } else {
            Ext.Msg.alert({
                title: MSG.DIALOG_TITLE_WARN,
                msg: MSG.PIG_MSG_ENTER_SCRIPT_NAME,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                fn: function (e) {
                    return false;
                }
            });
        }
    },

    /**
     * Run Pig Latin script.
     */
    onRunButtonClick: function () {
        var panel = Ext.ComponentQuery.query('pigEditorPanel')[0];
        var engineCombo = panel.query('#editorEngineCombo')[0];

        if (engineCombo.getValue()) {
            var script = panel.query('#pigScript')[0].getValue();
            var configurationGrid = panel.query('#confs')[0];
            var variableGrid = panel.query('#vars')[0];
            var externalGrid = panel.query('#externals')[0];
            var scriptName = panel.query('#scriptName')[0];

            var varaible = {}, cofiguration = {}, external = [];

            variableGrid.getStore().each(function (record, idx) {
                varaible[String(record.get('hadoopKeys'))] = record.get('hadoopValues');
            });

            configurationGrid.getStore().each(function (record, idx) {
                cofiguration[String(record.get('hadoopKeys'))] = record.get('hadoopValues');
            });

            externalGrid.getStore().each(function (record, idx) {
                external.push(record.get('input'));
            });

            var params = {
                engineId: engineCombo.getValue()
            };

            var body = {
                configuration: cofiguration,
                variable: varaible,
                external: external,
                script: escape(script),
                name: scriptName.getValue()
            };

            Ext.MessageBox.show({
                title: MSG.PIG_DIALOG_TITLE_SCRIPT_RUN,
                msg: MSG.PIG_MSG_WANNA_RUN_SCRIPT,
                width: 300,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.INFO,
                scope: this,
                fn: function (btn, text, eOpts) {
                    if (btn === 'yes') {
                        Flamingo.Ajax.Request.invokePostByText(CONSTANTS.CONTEXT_PATH + CONSTANTS.PIG.RUN, params, Ext.encode(body),
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    msg(MSG.PIG_DIALOG_TITLE_SCRIPT_RUNNING, Ext.String.format(MSG.PIG_MSG_WANNA_RUNNING_SCRIPT, obj.map.id));
                                } else {
                                    msg(MSG.PIG_DIALOG_TITLE_SCRIPT_RUN_FAIL, obj.error.cause);
                                }
                            },
                            function (response) {
                                msg(MSG.PIG_DIALOG_TITLE_SCRIPT_RUN_FAIL, response.statusText);
                            }
                        );
                    }
                }
            });
        } else {
            Ext.Msg.alert({
                title: MSG.DIALOG_TITLE_WARN,
                msg: MSG.PIG_MSG_SELECT_WORKFLOW_ENGINE,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                fn: function (e) {
                    return false;
                }
            });
        }
    },

    onPagingClick: function () {
        var panel = query('pigHistoryPanel');
        var engineId = panel.query('#engineId')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var status = panel.query('#status')[0];

        var pigHistoryPanel = query('pigHistoryPanel').down('gridpanel');
        pigHistoryPanel.getStore().getProxy().extraParams.engineId = engineId;
        pigHistoryPanel.getStore().getProxy().extraParams.startDate = Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d');
        pigHistoryPanel.getStore().getProxy().extraParams.endDate = Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d');
        pigHistoryPanel.getStore().getProxy().extraParams.status = status.getValue();
        pigHistoryPanel.getStore().getProxy().extraParams.jobType = 'PIG';
    },

    onPigScriptPagingClick: function () {
        var panel = query('pigScriptPanel');
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var scriptName = panel.query('#scriptName')[0];

        var pigScriptPanel = query('pigScriptPanel').down('gridpanel');
        pigScriptPanel.getStore().getProxy().extraParams.scriptName = scriptName.getValue();
        pigScriptPanel.getStore().getProxy().extraParams.startDate = Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d');
        pigScriptPanel.getStore().getProxy().extraParams.endDate = Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d');
    },

    onClearClick: function () {
        var panel = query('pigHistoryPanel');
        panel.query('#startDate')[0].setValue('');
        panel.query('#startDate')[0].setMaxValue();
        panel.query('#startDate')[0].setMinValue();

        panel.query('#endDate')[0].setValue('');
        panel.query('#endDate')[0].setMinValue();
        panel.query('#endDate')[0].setMaxValue();

        panel.query('#status')[0].setValue('ALL');
    },

    onFindClick: function () {
        var panel = query('pigHistoryPanel');
        var engineId = panel.query('#engineId')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var status = panel.query('#status')[0];

        if (engineId) {
            if ((startDate.getValue() != null && endDate.getValue() == null)
                || endDate.getValue() != null && startDate.getValue() == null) {
                Ext.Msg.alert({
                    title: MSG.PIG_DIALOG_TITLE_SEARCHING_EXEC_HIST,
                    msg: MSG.PIG_MSG_SELECT_START_END_DATE,
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
                        title: MSG.PIG_DIALOG_TITLE_SEARCHING_EXEC_HIST,
                        msg: MSG.PIG_MSG_ENTER_SEARCH_DATE,
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
                        title: MSG.PIG_DIALOG_TITLE_SEARCHING_EXEC_HIST,
                        msg: MSG.PIG_MSG_ENTER_SEARCH_DATE,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        fn: function (e) {
                            return false;
                        }
                    });
                    return false;
                }
            }

            var pigHistoryPanel = query('pigHistoryPanel').down('gridpanel');
            pigHistoryPanel.getStore().load({
                params: {
                    startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d'),
                    endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d'),
                    status: status.getValue(),
                    engineId: engineId,
                    jobType: 'PIG',
                    start: 0,
                    page: 1,
                    limit: 5
                },
                callback: function (records, operation, success) {
                    var obj = Ext.decode(operation.response.responseText);
                    query('pigHistoryPanel #currentDate').setValue(obj.map.current);
                }
            });
        } else {
            Ext.MessageBox.show({
                title: MSG.PIG_DIALOG_TITLE_SEARCHING_EXEC_HIST,
                msg: MSG.PIG_MSG_SELECT_WORKFLOW_ENGINE,
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

    onPigScriptClearClick: function () {
        var panel = query('pigScriptPanel');
        panel.query('#scriptName')[0].setValue('');
        panel.query('#startDate')[0].setValue('');
        panel.query('#startDate')[0].setMaxValue();
        panel.query('#startDate')[0].setMinValue();

        panel.query('#endDate')[0].setValue('');
        panel.query('#endDate')[0].setMinValue();
        panel.query('#endDate')[0].setMaxValue();
    },

    onPigScriptFindClick: function () {
        var panel = query('pigScriptPanel');
        var scriptName = panel.query('#scriptName')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];

        if ((startDate.getValue() != null && endDate.getValue() == null)
            || endDate.getValue() != null && startDate.getValue() == null) {
            Ext.Msg.alert({
                title: MSG.PIG_DIALOG_TITLE_SEARCHING_SCRIPT,
                msg: MSG.PIG_MSG_SELECT_START_END_DATE,
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
                    title: MSG.PIG_DIALOG_TITLE_SEARCHING_SCRIPT,
                    msg: MSG.PIG_MSG_ENTER_SEARCH_DATE,
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
                    title: MSG.PIG_DIALOG_TITLE_SEARCHING_SCRIPT,
                    msg: MSG.PIG_MSG_ENTER_SEARCH_DATE,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (e) {
                        return false;
                    }
                });
                return false;
            }
        }

        var pigScriptPanel = query('pigScriptPanel').down('gridpanel');
        pigScriptPanel.getStore().load({
            params: {
                startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d'),
                endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d'),
                scriptName: scriptName,
                start: 0,
                page: 1,
                limit: 5
            }
        });
    },

    /**
     * 그리드의 아이템을 더블클릭시 처리하는 이벤트 핸들러.
     */
    onPigHistoryItemClick: function (view, record, item, index, e, opts) {
        var panel = query('pigHistoryPanel');
        var historyPigScript = panel.query('#historyPigScript')[0];
        var historyLog = panel.query('#historyLog')[0];

        historyPigScript.setValue(record.data.workflowXml);
        historyLog.setValue('');

        var engineCombo = panel.query('#historyEngineCombo')[0];
        var engineId = engineCombo.getValue();

        // Get Log
        Ext.Ajax.request({
            url: CONSTANTS.PIG.GET_LOG + '?path=' + record.data.logPath + "&engineId=" + engineId,
            success: function (response) {
                historyLog.setValue(response.responseText);
            },
            failure: function (response) {
                historyLog.setValue(response.status);
            }
        });
    },

    /**
     * 상세내역 tabChange 이벤트
     * 쿼리결과 탭에서 이력을 선택했을 때 Hive쿼리 탭이 안바뀌는 현상 해결
     * */
    onDetailTabPanelTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        //향후 탭이 늘어날경우 아래 로직에 대해서 확인해야함.
        //현재는 탭 2개에 대해서 스크립트 에디터가 있기 때문에 탭이 변경될때 마다 refresh를 하도록 했음.
        newCard.items.items[0].editor.refresh();
    },

    /**
     * 그리드의 아이템을 더블클릭시 처리하는 이벤트 핸들러.
     */
    onPigScriptItemClick: function (view, record, item, index, e, opts) {
        var panel = query('pigScriptPanel');
        var savedPigScript = panel.query('#savedPigScript')[0];

        var json = Ext.decode(record.data.script);

        savedPigScript.setValue(unescape(json.script));
    },

    onTabChange: function (tabPanel, tab) {
        var panel = query('pigHistoryPanel');
        var pigHistoryGridPanel = panel.query('#pigHistoryGridPanel')[0];
        var selection = pigHistoryGridPanel.getSelectionModel().getSelection();

        var historyPigScript = panel.query('#historyPigScript')[0];
        var historyLog = panel.query('#historyLog')[0];

        historyPigScript.setValue(selection[0].data.workflowXml);
        historyLog.setValue('');

        var engineCombo = panel.query('#historyEngineCombo')[0];
        var engineId = engineCombo.getValue();

        // Get Log
        Ext.Ajax.request({
            url: CONSTANTS.PIG.GET_LOG + '?path=' + selection[0].data.logPath + "&engineId=" + engineId,
            success: function (response) {
                historyLog.setValue(response.responseText);
            },
            failure: function (response) {
                historyLog.setValue(response.status);
            }
        });
    }
});