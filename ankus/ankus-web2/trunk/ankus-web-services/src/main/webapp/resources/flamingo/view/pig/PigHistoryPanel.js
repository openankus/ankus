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

Ext.define('Flamingo.view.pig.PigHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pigHistoryPanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo'
    ],

    border: false,

    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;

        var pigHistoryStore = Ext.create('Flamingo.store.pig.PigHistory');

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    xtype: 'gridpanel',
                    itemId: 'pigHistoryGridPanel',
                    features: [
                        Ext.create('Ext.grid.feature.Grouping', {
                            groupHeaderTpl: '{name} (Total: {rows.length})'
                        })
                    ],
                    border: false,
                    store: pigHistoryStore,
                    columns: [
                        {text: MSG.PIG_NO, width: 60, dataIndex: 'id', align: 'center'},
                        {text: MSG.PIG_ID, width: 160, dataIndex: 'workflowId', align: 'center', hidden: true, sortable: false},
                        {text: MSG.PIG_JOB_ID, width: 120, dataIndex: 'workflowId', align: 'center', sortable: false,
                            renderer: function (value) {
                                return value.split('_')[2];
                            }
                        },
                        {text: MSG.PIG_SCRIPT_NAME, flex: 1, dataIndex: 'jobName', align: 'center', sortable: false,
                            renderer: function (value) {
                                if (value == 'Pig Job') {
                                    return 'Unnamed Pig Latin Script';
                                }
                                return value;
                            }
                        },
                        {text: MSG.PIG_START, width: 130, dataIndex: 'startDate', align: 'center',
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        },
                        {text: MSG.PIG_END, width: 130, dataIndex: 'endDate', align: 'center',
                            renderer: function (value, item) {
                                if (item.record.data.status == 'RUNNING') {
                                    return '';
                                } else {
                                    return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                                }
                            }
                        },
                        {text: MSG.PIG_ELAPSED, width: 60, dataIndex: 'elapsed', align: 'center',
                            renderer: function (value, item) {
                                if (item.record.data.status == 'RUNNING') {
                                    var start = new Date(item.record.data.startDate);
                                    var end = new Date(item.record.data.endDate);
                                    var diff = (end.getTime() - start.getTime()) / 1000;
                                    return Flamingo.Util.Date.toHumanReadableTime(Math.floor(diff));
                                } else {
                                    return Flamingo.Util.Date.toHumanReadableTime(value);
                                }
                            }
                        },
                        {text: MSG.PIG_STATUS, width: 90, dataIndex: 'status', align: 'center',
                            renderer: function (value, meta) {
                                if (value === 'SUCCESS') {
                                    meta.tdCls = 'status-blue';
                                }
                                if (value === 'FAIL') {
                                    meta.tdCls = 'status-red';
                                }
                                if (value === 'KILL') {
                                    meta.tdCls = 'status-gray';
                                }
                                if (value === 'PREPARE') {
                                    meta.tdCls = 'status-yellow';
                                }
                                if (value === 'RUNNING') {
                                    meta.tdCls = 'status-green';
                                }
                                return eval('MSG.PIG_' + value);
                            }
                        },
                        {text: 'User', width: 70, dataIndex: 'username', align: 'center', hidden: true}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: pigHistoryStore,
                            dock: 'bottom',
                            pageSize: 5,
                            displayInfo: true
                        }
                    ],
                    viewConfig: {
                        enableTextSelection: true,
                        stripeRows: true,
                        columnLines: true
                    },
                    tbar: [
                        {
                            xtype: 'tbtext',
                            text: MSG.COMMON_WORKFLOW_ENGINE
                        },
                        {
                            xtype: '_workflowEngineCombo',
                            itemId: 'historyEngineCombo',
                            type: 'HADOOP',
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    Ext.ComponentQuery.query('pigHistoryPanel #engineId')[0].setValue(newValue);

                                    // Fire a click event of find button.
                                    var findButton = Ext.ComponentQuery.query('pigHistoryPanel #findButton')[0];
                                    findButton.fireHandler();
                                }
                            }
                        },
                        {
                            xtype: 'hidden',
                            itemId: 'currentDate',
                            name: 'currentDate',
                            allowBlank: true
                        },
                        {
                            xtype: 'hidden',
                            itemId: 'engineId',
                            name: 'engineId',
                            tooltip: MSG.PIG_TIP_WORKFLOW_ENGINE_ID,
                            allowBlank: true
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.PIG_START
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            itemId: 'startDate',
                            vtype: 'dateRange',
                            endDateField: 'endDate',
                            width: 90
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.PIG_END
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y-m-d',
                            itemId: 'endDate',
                            vtype: 'dateRange',
                            startDateField: 'startDate',
                            width: 90
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.PIG_STATUS
                        },
                        {
                            xtype: 'combo',
                            name: 'status',
                            itemId: 'status',
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
                                    {name: MSG.PIG_ALL, value: 'ALL', description: '모든 상태 코드 전부'},
                                    {name: MSG.PIG_RUNNING, value: 'RUNNING', description: '실행중인 상태'},
                                    {name: MSG.PIG_SUCCESS, value: 'SUCCESS', description: '성공적으로 작업이 완료된 상태'},
                                    {name: MSG.PIG_FAIL, value: 'FAIL', description: '작업이 실패한 상태'},
                                    {name: MSG.PIG_KILL, value: 'KILL', description: '작업을 강제 종료한 상태'}
                                ]
                            })
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'findButton',
                            formBind: true,
                            text: MSG.PIG_FIND,
                            iconCls: 'common-find',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearButton',
                            formBind: true,
                            text: MSG.PIG_CLEAR,
                            iconCls: 'common-find-clear',
                            labelWidth: 50
                        }
                    ],
                    listeners: {
                        afterrender: function () {
                            // Hide a refresh button of paging tool bar
                            var pigHistoryPanel = Ext.ComponentQuery.query('pigHistoryPanel')[0].down('gridpanel');
                            Ext.each(pigHistoryPanel.dockedItems.items, function (item) {
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
                },
                {
                    region: 'south',
                    xtype: 'tabpanel',
                    itemId: 'detailTabPanel',
                    layout: 'fit',
                    deferredRender: false,
                    layoutOnTabChange: true,
                    hideMode: 'offsets',
                    collapsible: true,
                    split: true,
                    height: 300,
                    title: MSG.PIG_DETAIL,
                    items: [
                        {
                            xtype: 'panel',
                            title: MSG.PIG_PIG_LATIN_SCRIPT,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'codemirror',
                                    itemId: 'historyPigScript',
                                    flex: 1,
                                    padding: '5 5 5 5',
                                    layout: 'fit',
                                    pathModes: '/resources/lib/codemirror-2.35/mode',
                                    pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                    readOnly: true,
                                    lineNumbers: true,
                                    matchBrackets: true,
                                    indentUnit: 2,
                                    mode: "text/x-pig",
                                    showModes: false,
                                    modes: [
                                        {
                                            mime: ['text/x-pig'],
                                            dependencies: ['x-pig/x-pig.js']
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: MSG.PIG_LOG,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'codemirror',
                                    itemId: 'historyLog',
                                    flex: 1,
                                    padding: '5 5 5 5',
                                    layout: 'fit',
                                    pathModes: '/resources/lib/codemirror-2.35/mode',
                                    pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                    readOnly: true,
                                    lineNumbers: true,
                                    matchBrackets: true,
                                    indentUnit: 2,
                                    mode: "text/plain",
                                    showModes: false
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    }
});