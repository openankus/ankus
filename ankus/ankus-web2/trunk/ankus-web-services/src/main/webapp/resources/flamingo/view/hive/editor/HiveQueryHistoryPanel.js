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

Ext.define('Flamingo.view.hive.editor.HiveQueryHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hiveQueryHistoryPanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo'
    ],

    border: false,

    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;

        var hiveQueryHistoryStore = Ext.create('Flamingo.store.hive.editor.HiveQueryHistory');

        var hiveQueryResultsStore = Ext.create('Flamingo.store.hive.editor.HiveQueryResults', {
            listeners: {
                'metachange': function (store, meta) {
                    meta.columns.splice(0, 0, {
                        xtype: 'rownumberer',
                        text: 'No',
                        width: 60,
                        sortable: false
                    });
                    me.query('#resultGrid')[0].reconfigure(store, meta.columns);
                }
            }
        });

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    xtype: 'gridpanel',
                    features: [
                        Ext.create('Ext.grid.feature.Grouping', {
                            groupHeaderTpl: '{name} (Total: {rows.length})'
                        })
                    ],
                    border: false,
                    store: hiveQueryHistoryStore,
                    columns: [
                        {text: 'No', width: 60, dataIndex: 'id', align: 'center', hidden: true},
                        {text: MSG.HIVE_EXECUTION_ID, width: 180, dataIndex: 'executionId', align: 'center', sortable: false},
                        {text: MSG.HIVE_DATABASE, width: 100, dataIndex: 'databaseName', align: 'center', sortable: false},
                        {text: MSG.HIVE_QUERY, flex: 1, dataIndex: 'query', align: 'center', sortable: false,
                            renderer: function (value, meta, record) {
                                if (record.data.status === 'FAIL') {
                                    meta.style = '!important;cursor: pointer;';
                                    meta.tdAttr = 'data-qtip="' + record.raw.cause + '"';
                                }
                                return value;
                            }
                        },
                        {text: MSG.HIVE_LENGTH, width: 100, dataIndex: 'length', align: 'center', sortable: false,
                            renderer: function (value) {
                                return toCommaNumber(value);
                            }
                        },
                        {text: MSG.HIVE_START, width: 130, dataIndex: 'startDate', align: 'center',
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        },
                        {text: MSG.HIVE_END, width: 130, dataIndex: 'endDate', align: 'center',
                            renderer: function (value, item) {
                                if (item.record.data.status == 'RUNNING') {
                                    return '';
                                } else {
                                    return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                                }
                            }
                        },
                        {text: MSG.HIVE_ELAPSED, width: 60, dataIndex: 'elapsed', align: 'center',
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
                        {text: MSG.HIVE_STATUS, width: 90, dataIndex: 'status', align: 'center',
                            renderer: function (value, meta, record) {
                                if (value === 'SUCCESS') {
                                    meta.tdCls = 'status-blue';
                                    return MSG.HIVE_SUCCESS;
                                }
                                if (value === 'FAIL') {
                                    meta.tdCls = 'status-red';
                                    return MSG.HIVE_FAIL;
                                }
                                if (value === 'RUNNING') {
                                    meta.tdCls = 'status-green';
                                    return MSG.HIVE_RUNNING;
                                }
                            }
                        },
                        {text: 'User', width: 70, dataIndex: 'username', align: 'center', hidden: true}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: hiveQueryHistoryStore,
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
                            text: MSG.HIVE_HIVE_SERVER
                        },
                        {
                            xtype: '_workflowEngineCombo',
                            itemId: 'historyEngineCombo',
                            width: 150,
                            type: 'HIVE',
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    query('hiveQueryHistoryPanel #engineId').setValue(newValue);
                                    var findButton = query('hiveQueryHistoryPanel #findButton');
                                    findButton.fireHandler();
                                }
                            }
                        },
                        {
                            xtype: 'hidden',
                            itemId: 'engineId',
                            name: 'engineId',
                            tooltip: 'This is the Engine ID of workflow.',
                            allowBlank: true
                        },
                        {
                            xtype: 'hidden',
                            itemId: 'executionId',
                            name: 'executionId',
                            allowBlank: true
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.HIVE_START
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
                            text: MSG.HIVE_END
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
                            text: MSG.HIVE_STATUS
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
                            width: 90,
                            value: 'ALL',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value', 'description'],
                                data: [
                                    {name: MSG.HIVE_ALL, value: 'ALL', description: MSG.HIVE_ALL_DESC},
                                    {name: MSG.HIVE_RUNNING, value: 'RUNNING', description: MSG.HIVE_RUNNING_DESC},
                                    {name: MSG.HIVE_SUCCESS, value: 'SUCCESS', description: MSG.HIVE_SUCCESS_DESC},
                                    {name: MSG.HIVE_FAIL, value: 'FAIL', description: MSG.HIVE_FAIL_DESC}
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
                            text: MSG.HIVE_FIND,
                            iconCls: 'common-find',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearButton',
                            formBind: true,
                            text: MSG.HIVE_CLEAR,
                            iconCls: 'common-find-clear',
                            labelWidth: 50
                        }
                    ],
                    listeners: {
                        afterrender: function () {
                            // Hide a refresh button of paging tool bar
                            var hiveQueryHistoryPanel = query('hiveQueryHistoryPanel').down('gridpanel');
                            Ext.each(hiveQueryHistoryPanel.dockedItems.items, function (item) {
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
                    title: MSG.HIVE_DETAIL,
                    items: [
                        {
                            xtype: 'panel',
                            title: MSG.HIVE_HIVE_QUERY,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'codemirror',
                                    itemId: 'historyHiveQuery',
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
                        },
                        {
                            xtype: 'gridpanel',
                            title: MSG.HIVE_RESULT,
                            itemId: 'resultGrid',
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true,
                                columnLines: true
                            },
                            columns: [],
                            store: hiveQueryResultsStore,
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    store: hiveQueryResultsStore,
                                    dock: 'bottom',
                                    displayInfo: true
                                }
                            ],
                            tbar: [
                                {
                                    xtype: 'tbtext',
                                    text: MSG.HIVE_MSG_RESULT_DOWNLOAD_1 + toCommaNumber(config.hive_query_result_max_download_size) + MSG.HIVE_MSG_RESULT_DOWNLOAD_2
                                },
                                '->',
                                {
                                    text: MSG.COMMON_DOWNLOAD,
                                    iconCls: 'hdfs-file-download',
                                    itemId: 'downloadButton',
                                    disabled: true,
                                    tooltip: '처리 결과를 다운로드합니다.'
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