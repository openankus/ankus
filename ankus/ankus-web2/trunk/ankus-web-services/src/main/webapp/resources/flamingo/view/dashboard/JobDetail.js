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

Ext.define('Flamingo.view.dashboard.JobDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jobDetail',

    border: false,

    layout: {
        type: 'border'
    },

    job: {},

    constructor: function (config) {
        this.job = config.param;
        this.callParent(arguments);
    },

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'panel',
                height: 600,
                region: 'center',
                border: false,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'tabpanel',
                        activeTab: 0,
                        flex: 1,
                        bodyPadding: 5,
                        border: false,
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'panel',
                                title: MSG.DASHBOARD_TITLE_JOB,
                                layout: {
                                    type: 'border'
                                },
                                border: false,
                                items: [
                                    {
                                        title: MSG.DASHBOARD_TITLE_JOB_INFO,
                                        region: 'north',
                                        border: false,
                                        items: [
                                            {
                                                xtype: 'form',
                                                itemId: 'jobInfoForm',
                                                border: false,
                                                autoScroll: true,
                                                layout: {
                                                    type: 'hbox'
                                                },
                                                defaults: {
                                                    anchor: '100%',
                                                    margins: '10 10 10 10'
                                                },
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        labelStyle: 'font-weight:bold;padding:0',
                                                        layout: 'vbox',
                                                        flex: 1.3,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_JOB_ID,
                                                                xtype: 'displayfield',
                                                                name: 'jobId',
                                                                value: this.job.jobStringId + ' (' + this.job.jobId + ')'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_WF_ID,
                                                                xtype: 'displayfield',
                                                                name: 'workflowId',
                                                                value: this.job.workflowId + ' (' + this.job.id + ')'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_WF_NAME,
                                                                xtype: 'displayfield',
                                                                name: 'workflowName',
                                                                value: this.job.workflowName
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_WF_STATUS,
                                                                xtype: 'displayfield',
                                                                name: 'status',
                                                                value: this.getStatus(this.job.status)
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_LAST_STEP,
                                                                xtype: 'displayfield',
                                                                name: 'lastStep',
                                                                value: this.job.currentAction
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        labelStyle: 'font-weight:bold;padding:0',
                                                        layout: 'vbox',
                                                        flex: 1,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_START,
                                                                xtype: 'displayfield',
                                                                name: 'startDate',
                                                                value: this.job.startDate
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_END,
                                                                xtype: 'displayfield',
                                                                name: 'endDate',
                                                                value: this.job.endDate
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_ELAPSED,
                                                                xtype: 'displayfield',
                                                                name: 'elapsed',
                                                                value: this.job.elapsed
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_PROGRESS,
                                                                xtype: 'displayfield',
                                                                name: 'progress',
                                                                value: this.job.progress
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_USER,
                                                                xtype: 'displayfield',
                                                                name: 'username',
                                                                value: this.job.username
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        region: 'center',
                                        layout: 'fit',
                                        border: false,
                                        items: {
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            bodyPadding: 5,
                                            border: false,
                                            items: [
                                                {
                                                    title: MSG.DASHBOARD_TITLE_XML,
                                                    layout: 'fit',
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'codemirror',
                                                            name: 'xml',
                                                            flex: 1,
                                                            padding: '5 5 5 5',
                                                            pathModes: '/resources/lib/codemirror-2.35/mode',
                                                            pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                                            readOnly: true,
                                                            lineNumbers: true,
                                                            lineWrapping: true,
                                                            matchBrackets: true,
                                                            indentUnit: 2,
                                                            mode: "application/xml",
                                                            showModes: false,
                                                            value: this.job.workflowXml,
                                                            modes: [
                                                                {
                                                                    mime: ['application/xml'],
                                                                    dependencies: ['xml/xml.js']
                                                                }
                                                            ],
                                                            extraKeys: {
                                                                "Ctrl-Space": "autocomplete",
                                                                "Tab": "indentAuto"
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: MSG.DASHBOARD_TITLE_ERROR,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    border: false,
                                                    items: [
                                                        {
                                                            padding: '5 5 5 5',
                                                            xtype: 'displayfield',
                                                            name: 'jobId',
                                                            value: this.job.cause
                                                        },
                                                        {
                                                            xtype: 'codemirror',
                                                            name: 'script',
                                                            flex: 1,
                                                            padding: '5 5 5 5',
                                                            pathModes: '/resources/lib/codemirror-2.35/mode',
                                                            pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                                            readOnly: true,
                                                            lineNumbers: true,
                                                            textWrapping: true,
                                                            matchBrackets: true,
                                                            indentUnit: 2,
                                                            mode: "text/plain",
                                                            showModes: false,
                                                            value: this.job.exception,
                                                            extraKeys: {
                                                                "Ctrl-Space": "autocomplete",
                                                                "Tab": "indentAuto"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                title: MSG.DASHBOARD_TITLE_ACTION,
                                border: false,
                                items: [
                                    {
                                        itemId: 'actionListGrid',
                                        height: 140,
                                        xtype: 'grid',
                                        border: true,
                                        columnLines: true,
                                        selModel: Ext.create('Ext.selection.RowModel', {
                                            singleSelect: true
                                        }),
                                        columns: [
                                            {text: MSG.DASHBOARD_HEADER_NO, flex: 0.6, dataIndex: 'id', align: 'center', hidden: true, sortable: false},
                                            {text: MSG.DASHBOARD_HEADER_ID, flex: 1, dataIndex: 'workflowId', align: 'center', sortable: false},
                                            {text: MSG.DASHBOARD_HEADER_AC_NAME, flex: 1.2, dataIndex: 'actionName', align: 'center', sortable: false},
                                            {text: MSG.DASHBOARD_HEADER_JOB_ID, flex: 1.2, dataIndex: 'jobId', align: 'center', hidden: true, sortable: false},
                                            {text: MSG.DASHBOARD_HEADER_START, width: 130, dataIndex: 'startDate', align: 'center', hidden: false, sortable: false},
                                            {text: MSG.DASHBOARD_HEADER_END, width: 130, dataIndex: 'endDate', align: 'center',
                                                renderer: function (value, item) {
                                                    if (item.record.data.status == 'RUNNING') {
                                                        return '';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {text: MSG.DASHBOARD_HEADER_ELAPSED, width: 60, dataIndex: 'elapsed', align: 'center',
                                                renderer: function (value, item) {
                                                    if (item.record.data.status == 'RUNNING') {
                                                        var start = new Date(item.record.data.startDate);
                                                        var end = new Date(item.record.data.endDate);
                                                        var diff = (end.getTime() - start.getTime()) / 1000;
                                                        return Flamingo.Util.Date.toHumanReadableTime(Math.floor(diff));
                                                    } else {
                                                        return value;
                                                    }
                                                }
                                            },
                                            {text: MSG.DASHBOARD_HEADER_STATUS, flex: 0.6, dataIndex: 'status', align: 'center', hidden: false, sortable: false,
                                                renderer: function (value, meta) {
                                                    if (value === 'SUCCESS') {
                                                        meta.tdCls = 'status-blue';
                                                        return MSG.DASHBOARD_STATUS_SUCCESS;
                                                    }
                                                    if (value === 'FAIL') {
                                                        meta.tdCls = 'status-red';
                                                        return MSG.DASHBOARD_STATUS_FAIL;
                                                    }
                                                    if (value === 'KILL') {
                                                        meta.tdCls = 'status-gray';
                                                        return MSG.DASHBOARD_STATUS_KILL;
                                                    }
                                                    if (value === 'RUNNING') {
                                                        meta.tdCls = 'status-green';
                                                        return MSG.DASHBOARD_STATUS_RUNNING;
                                                    }
                                                    return value;
                                                }
                                            }
                                        ],
                                        store: Ext.create('Ext.data.Store', {
                                            fields: [
                                                'id',
                                                'actionName',
                                                'workflowId',
                                                'jobId',
                                                'status',
                                                {
                                                    name: 'startDate',
                                                    convert: function (v, record) {
                                                        if (v == null || v == '' || v == undefined) {
                                                            return '';
                                                        } else {
                                                            return Ext.Date.format(new Date(v), "Y-m-d H:i:s");
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'endDate',
                                                    convert: function (v, record) {
                                                        if (v == null || v == '' || v == undefined) {
                                                            return '';
                                                        } else {
                                                            return Ext.Date.format(new Date(v), "Y-m-d H:i:s");
                                                        }
                                                    }
                                                },
                                                'cause',
                                                'command',
                                                'exception',
                                                'logPath',
                                                {
                                                    name: 'elapsed',
                                                    convert: function (v, record) {
                                                        if (v == null || v == '' || v == undefined || v == '0') {
                                                            return '0:00';
                                                        } else {
                                                            return Flamingo.Util.Date.toHumanReadableTime(v);
                                                        }
                                                    }
                                                }
                                            ],
                                            autoLoad: true,
                                            proxy: {
                                                type: 'ajax',
                                                url: CONSTANTS.DASHBOARD.GET_ACTION_HISTORY,
                                                headers: {
                                                    'Accept': 'application/json'
                                                },
                                                reader: {
                                                    type: 'json',
                                                    root: 'list'
                                                },
                                                extraParams: {
                                                    'jobId': this.job.jobId,
                                                    'engineId': this.job.engineId
                                                }
                                            }
                                        }),
                                        viewConfig: {
                                            stripeRows: true
                                        },
                                        tbar: [
                                            '->',
                                            {
                                                text: MSG.COMMON_REFRESH,
                                                iconCls: 'common-refresh',
                                                itemId: 'actionListRefreshButton',
                                                handler: function () {
                                                    var grid = Ext.ComponentQuery.query('#actionListGrid')[0];
                                                    grid.getStore().load();
                                                }
                                            }
                                        ],
                                        listeners: {
                                            afterrender: function (comp, opts) {
                                                var grid = Ext.ComponentQuery.query('#actionListGrid')[0];
                                                var lastIndex = grid.getStore().getCount() - 1;
                                                var last = grid.getStore().getAt(lastIndex);

                                                var actionInfo = Ext.ComponentQuery.query('#actionInfoForm')[0];
                                                actionInfo.loadRecord(last);

                                                if (last.command) Ext.ComponentQuery.query('jobDetail #command')[0].setValue('<div style="font-family: monospace">' + last.command + '</div>');
                                                if (last.cause) Ext.ComponentQuery.query('jobDetail #cause')[0].setValue('<div style="font-family: monospace">' + last.cause + '</div>');

                                                var engineId = this.up('jobDetail').job.engineId;

                                                // Get Log
                                                Ext.Ajax.request({
                                                    url: CONSTANTS.DASHBOARD.GET_LOG + '?actionId=' + last.data.id + "&engineId=" + engineId,
                                                    success: function (response) {
                                                        var actionLog = Ext.ComponentQuery.query('jobDetail #actionLog')[0];
                                                        actionLog.setValue(response.responseText);
                                                    }
                                                });

                                                // Get Script
                                                Ext.Ajax.request({
                                                    url: CONSTANTS.DASHBOARD.GET_SCRIPT + '?actionId=' + last.data.id + "&engineId=" + engineId,
                                                    success: function (response) {
                                                        var actionScript = Ext.ComponentQuery.query('jobDetail #actionScript')[0];
                                                        actionScript.setValue(response.responseText);
                                                    }
                                                });
                                            },
                                            selectionchange: function (sm, selectedRecord) {
                                                if (selectedRecord[0]) {
                                                    // Set Form
                                                    var actionInfo = Ext.ComponentQuery.query('#actionInfoForm')[0];

                                                    actionInfo.loadRecord(selectedRecord[0]);

                                                    Ext.ComponentQuery.query('jobDetail #command')[0].setValue('<div style="font-family: monospace">' + selectedRecord[0].data.command + '</div>');
                                                    Ext.ComponentQuery.query('jobDetail #logPath')[0].setValue('<div style="font-family: monospace">' + selectedRecord[0].data.logPath + '</div>');
                                                    if (selectedRecord[0].data.cause) {
                                                        Ext.ComponentQuery.query('jobDetail #cause')[0].setValue('<div style="font-family: monospace">' + selectedRecord[0].data.cause + '</div>');
                                                    } else {
                                                        Ext.ComponentQuery.query('jobDetail #cause')[0].setValue('<div style="font-family: monospace"></div>');
                                                    }

                                                    Ext.ComponentQuery.query('jobDetail #status')[0].setValue(query('jobDetail').getStatus(selectedRecord[0].data.status));

                                                    var engineId = this.up('jobDetail').job.engineId;

                                                    // Get Log
                                                    Ext.Ajax.request({
                                                        url: CONSTANTS.DASHBOARD.GET_LOG + '?actionId=' + selectedRecord[0].data.id + "&engineId=" + engineId,
                                                        success: function (response) {
                                                            var actionLog = Ext.ComponentQuery.query('jobDetail #actionLog')[0];
                                                            actionLog.setValue(response.responseText);
                                                        }
                                                    });

                                                    // Get Script
                                                    Ext.Ajax.request({
                                                        url: CONSTANTS.DASHBOARD.GET_SCRIPT + '?actionId=' + selectedRecord[0].data.id + "&engineId=" + engineId,
                                                        success: function (response) {
                                                            var actionScript = Ext.ComponentQuery.query('jobDetail #actionScript')[0];
                                                            actionScript.setValue(response.responseText);
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    },
                                    {
                                        title: MSG.DASHBOARD_TITLE_ACTION_INFO,
                                        layout: 'fit',
                                        border: false,
                                        items: [
                                            {
                                                xtype: 'form',
                                                itemId: 'actionInfoForm',
                                                border: false,
                                                autoScroll: true,
                                                layout: {
                                                    type: 'hbox'
                                                },
                                                defaults: {
                                                    anchor: '100%',
                                                    margins: '10 10 10 10'
                                                },
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        layout: 'vbox',
                                                        flex: 1,
                                                        defaultType: 'textfield',
                                                        defaults: {
                                                            labelWidth: 80
                                                        },
                                                        items: [
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_AC_ID,
                                                                xtype: 'displayfield',
                                                                name: 'id'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_JOB_ID,
                                                                xtype: 'displayfield',
                                                                name: 'jobId'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_WF_ID,
                                                                xtype: 'displayfield',
                                                                name: 'workflowId'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_LOG_PATH,
                                                                xtype: 'displayfield',
                                                                itemId: 'logPath'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        labelStyle: 'font-weight:bold;padding:0',
                                                        layout: 'vbox',
                                                        flex: 1,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_START,
                                                                xtype: 'displayfield',
                                                                name: 'startDate'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_END,
                                                                xtype: 'displayfield',
                                                                name: 'endDate'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_AC_NAME,
                                                                xtype: 'displayfield',
                                                                name: 'actionName'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        labelStyle: 'font-weight:bold;padding:0',
                                                        layout: 'vbox',
                                                        flex: 1,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_ELAPSED,
                                                                xtype: 'displayfield',
                                                                name: 'elapsed'
                                                            },
                                                            {
                                                                fieldLabel: MSG.DASHBOARD_LABEL_AC_STATUS,
                                                                xtype: 'displayfield',
                                                                itemId: 'status',
                                                                name: 'status'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'tabpanel',
                                        activeTab: 0,
                                        height: 270,
                                        bodyPadding: 5,
                                        border: false,
                                        items: [
                                            {
                                                title: MSG.DASHBOARD_TITLE_COMMAND,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                border: false,
                                                items: [
                                                    {
                                                        padding: '5 5 5 5',
                                                        xtype: 'displayfield',
                                                        labelWidth: 80,
                                                        itemId: 'command'
                                                    }
                                                ]
                                            },
                                            {
                                                title: MSG.DASHBOARD_TITLE_SCRIPT,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                border: false,
                                                items: [
                                                    {
                                                        xtype: 'codemirror',
                                                        name: 'script',
                                                        itemId: 'actionScript',
                                                        layout: 'fit',
                                                        flex: 1,
                                                        padding: '5 5 5 5',
                                                        pathModes: '/resources/lib/codemirror-2.35/mode',
                                                        pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                                        readOnly: true,
                                                        lineNumbers: true,
                                                        textWrapping: true,
                                                        matchBrackets: true,
                                                        indentUnit: 2,
                                                        mode: "text/plain",
                                                        showModes: false,
                                                        extraKeys: {
                                                            "Ctrl-Space": "autocomplete",
                                                            "Tab": "indentAuto"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                title: MSG.DASHBOARD_TITLE_LOG,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                border: false,
                                                items: [
                                                    {
                                                        xtype: 'codemirror',
                                                        name: 'log',
                                                        itemId: 'actionLog',
                                                        layout: 'fit',
                                                        flex: 1,
                                                        padding: '5 5 5 5',
                                                        pathModes: '/resources/lib/codemirror-2.35/mode',
                                                        pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                                        readOnly: true,
                                                        lineNumbers: true,
                                                        textWrapping: true,
                                                        matchBrackets: true,
                                                        indentUnit: 2,
                                                        mode: "text/plain",
                                                        showModes: false,
                                                        extraKeys: {
                                                            "Ctrl-Space": "autocomplete",
                                                            "Tab": "indentAuto"
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                title: MSG.DASHBOARD_TITLE_ERROR_MSG,
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                border: false,
                                                items: [
                                                    {
                                                        padding: '5 5 5 5',
                                                        xtype: 'displayfield',
                                                        itemId: 'cause'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    },

    getStatus: function (status) {
        if (status === 'SUCCESS') {
            return MSG.DASHBOARD_STATUS_SUCCESS;
        }
        if (status === 'FAIL') {
            return MSG.DASHBOARD_STATUS_FAIL;
        }
        if (status === 'KILL') {
            return MSG.DASHBOARD_STATUS_KILL;
        }
        if (status === 'RUNNING') {
            return MSG.DASHBOARD_STATUS_RUNNING;
        }
    }
});