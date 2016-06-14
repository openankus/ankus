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

Ext.define('Flamingo.view.dashboard.ActionHistory', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.actionHistory',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo'
    ],

    controllers: ['Flamingo.controller.dashboard.ActionHistoryController'],

    border: false,

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'gridpanel',
                itemId: 'actionGridPanel',
                features: [
                    Ext.create('Ext.grid.feature.Grouping', {
                        groupHeaderTpl: '{name} (' + MSG.DASHBOARD_GROUP_TOTAL + ': {rows.length})'
                    })
                ],
                border: false,
                store: Ext.create('Flamingo.store.dashboard.ActionHistory'),
                columns: [
                    {text: MSG.DASHBOARD_HEADER_NO, width: 60, dataIndex: 'id', align: 'center'},
                    {text: MSG.DASHBOARD_HEADER_ID, width: 160, dataIndex: 'workflowId', align: 'center', hidden: true, sortable: false},
                    {text: MSG.DASHBOARD_HEADER_WF_NAME, flex: 1, dataIndex: 'workflowName', align: 'center', sortable: false},
                    {text: MSG.DASHBOARD_HEADER_AC_NAME, flex: 1, dataIndex: 'currentAction', align: 'center', sortable: false},
                    {text: MSG.DASHBOARD_HEADER_START, width: 130, dataIndex: 'startDate', align: 'center',
                        renderer: function (value) {
                            return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                        }
                    },
                    {text: MSG.DASHBOARD_HEADER_END, width: 130, dataIndex: 'endDate', align: 'center',
                        renderer: function (value, item) {
                            if (item.record.data.status == 'RUNNING') {
                                return '';
                            } else {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
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
                                return Flamingo.Util.Date.toHumanReadableTime(value);
                            }
                        }
                    },
                    {
                        text: MSG.DASHBOARD_HEADER_PROGRESS, width: 90, dataIndex: 'PROGRESS', align: 'center', sortable: false,
                        renderer: function (value, metaData, record, row, col, store, gridView) {
                            var percent = Math.floor(100 * (record.data.currentStep / record.data.totalStep));
                            return Ext.String.format('<div class="x-progress x-progress-default x-border-box">' +
                                '<div class="x-progress-text x-progress-text-back" style="width: 76px;">{0}%</div>' +
                                '<div class="x-progress-bar x-progress-bar-default" role="presentation" style="width:{0}%">' +
                                '<div class="x-progress-text" style="width: 76px;"><div>{0}%</div></div></div></div>', percent);
                        }
                    },
                    {text: MSG.DASHBOARD_HEADER_STATUS, width: 90, dataIndex: 'status', align: 'center',
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
                    },
                    {text: MSG.DASHBOARD_HEADER_USERNAME, width: 70, dataIndex: 'username', align: 'center'}
                ],
                viewConfig: {
                    stripeRows: true,
                    columnLines: true
                },
                tbar: [
                    {
                        xtype: 'tbtext',
                        text: MSG.DASHBOARD_FIND_WF_ENGINE
                    },
                    {
                        xtype: '_workflowEngineCombo',
                        filter: 'HADOOP',
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                Ext.ComponentQuery.query('actionHistory #engineIdAction')[0].setValue(newValue);

                                // Fire a click event of find button.
                                var refreshButton = Ext.ComponentQuery.query('actionHistory #refreshButton')[0];
                                refreshButton.fireHandler();
                            }
                        }
                    },
                    {
                        xtype: 'hidden',
                        name: 'engineIdAction',
                        itemId: 'engineIdAction',
                        allowBlank: true
                    },
                    '->',
                    {
                        text: MSG.COMMON_REFRESH,
                        iconCls: 'common-refresh',
                        itemId: 'refreshButton'
                    }
                ]
            }
        ];

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