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

Ext.define('Flamingo.view.job.JobListPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jobListPanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo'
    ],

    controllers: ['Flamingo.controller.job.JobController'],

    border: false,

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;

        var jobStore = Ext.create('Flamingo.store.job.Job');

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    itemId: 'workflowGridPanel',
                    features: [
                        Ext.create('Ext.grid.feature.Grouping', {
                            groupHeaderTpl: '{name} (Total: {rows.length})'
                        })
                    ],
                    border: false,
                    store: jobStore,
                    columns: [
                        {text: 'Job Key', width: 170, dataIndex: 'jobId', align: 'center', sortable: false},
                        {text: 'Workflow ID', width: 150, dataIndex: 'workflowId', align: 'center', sortable: false},
                        {text: 'Group Name', flex: 1, dataIndex: 'groupName', align: 'center', sortable: false, hidden: true},
                        {text: 'Job Name', flex: 1, dataIndex: 'name', align: 'center', sortable: false},
                        {text: 'Schedule', width: 160, dataIndex: 'cron', align: 'center'},
                        {text: 'Start', width: 130, dataIndex: 'start', align: 'center',
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        },
                        {text: 'Next', width: 130, dataIndex: 'next', align: 'center',
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        },
                        {text: 'Status', width: 90, dataIndex: 'status', align: 'center',
                            renderer: function (value, meta) {
                                if (value === 'START') {
                                    meta.tdCls = 'status-blue';
                                }
                                if (value === 'KILL') {
                                    meta.tdCls = 'status-red';
                                }
                                if (value === 'SUSPEND') {
                                    meta.tdCls = 'status-gray';
                                }
                                if (value === 'RESUME') {
                                    meta.tdCls = 'status-yellow';
                                }
                                if (value === 'RUNNING') {
                                    meta.tdCls = 'status-green';
                                }
                                return value;
                            }
                        },
                        {text: 'User', width: 70, dataIndex: 'username', align: 'center', sortable: false},
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: jobStore,
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
                            itemId: 'registJobButton',
                            text: 'New Job',
                            iconCls: 'common-add'
                        },
                        '-',
                        {
                            xtype: 'tbtext',
                            text: 'Workflow Engine'
                        },
                        {
                            xtype: '_workflowEngineCombo',
                            filter: 'HADOOP',
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    Ext.ComponentQuery.query('jobListPanel #engineId')[0].setValue(newValue);

                                    // Fire a click event of find button.
                                    var findButton = Ext.ComponentQuery.query('jobListPanel #findJobButton')[0];
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
                            xtype: 'tbtext',
                            text: 'Start'
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
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: 'End'
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
                            text: 'Status'
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
                                    {name: 'ALL', value: 'ALL', description: '모든 상태 코드 전부'},
                                    {name: 'RUNNING', value: 'RUNNING', description: '실행중인 상태'},
                                    {name: 'SUSPEND', value: 'SUSPEND', description: '일시 중지 상태'},
                                    {name: 'STOP', value: 'STOP', description: '중지 상태'},
                                    {name: 'START', value: 'START', description: '시작 상태'},
                                    {name: 'KILL', value: 'KILL', description: '강제 종료 상태'}
                                ]
                            })
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: "Job Name"
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'jobName'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            itemId: 'findJobButton',
                            formBind: true,
                            text: 'Find',
                            iconCls: 'common-find',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearJobButton',
                            formBind: true,
                            text: 'Clear',
                            iconCls: 'common-find-clear',
                            labelWidth: 50
                        }
                    ],
                    listeners: {
                        afterrender: function () {
                            // Hide a refresh button of paging tool bar
                            /*
                             var workflowHistoryPanel = Ext.ComponentQuery.query('workflowHistory')[0].down('gridpanel');
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
                             */
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