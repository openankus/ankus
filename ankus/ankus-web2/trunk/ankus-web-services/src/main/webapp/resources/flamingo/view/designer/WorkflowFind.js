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

Ext.define('Flamingo.view.designer.WorkflowFind', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowFind',

    tbar: [
        {
            xtype: 'tbtext',
            text: msg.dashboard_toolbar_start_date
        },
        {
            xtype: 'datefield',
            format: config.dashboard_date_pattern,
            itemId: 'startDate',
            vtype: 'dateRange',
            endDateField: 'endDate',
            width: 100
        },
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'tbtext',
            text: msg.dashboard_toolbar_end_date
        },
        {
            xtype: 'datefield',
            format: config.dashboard_date_pattern,
            itemId: 'endDate',
            vtype: 'dateRange',
            startDateField: 'startDate',
            width: 100
        },
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'tbtext',
            text: msg.dashboard_toolbar_status
        },
        {
            xtype: 'combo',
            name: 'status',
            itemId: 'status',
            editable: false,
            queryMode: 'local',
            typeAhead: true,
            selectOnFocus: true,
            store: 'Code',
            displayField: 'name',
            valueField: 'name',
            width: 100,
            value: 'ALL'
        },
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'tbtext',
            text: msg.dashboard_toolbar_workflow_name
        },
        {
            xtype: 'textfield',
            itemId: 'workflowName'
        },
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'button',
            formBind: true,
            text: msg.dashboard_button_search,
            iconCls: 'dashboard_search',
            labelWidth: 50,
            handler: function () {
                var startDate = Ext.ComponentQuery.query('#startDate')[0];
                var endDate = Ext.ComponentQuery.query('#endDate')[0];
                var status = Ext.ComponentQuery.query('#status')[0];
                var workflowName = Ext.ComponentQuery.query('#workflowName')[0];

                if ((startDate.getValue() != null && endDate.getValue() == null)
                    || endDate.getValue() != null && startDate.getValue() == null) {
                    Ext.Msg.alert({
                        title: msg.button_warn,
                        msg: msg.dashboard_error_input_all_dates,
                        buttons: Ext.Msg.OK,
                        fn: function (e) {
                            return false;
                        }
                    });
                    return false;
                }

                if (startDate.getValue() != null || endDate.getValue() != null) {
                    if (startDate.getValue().length <= 1) {
                        //TODO message 작업 하기.(location)
                        Ext.Msg.alert({
                            title: msg.button_warn,
                            msg: "Please enter a correct search date.", //msg.dashboard_error_input_all_dates,
                            buttons: Ext.Msg.OK,
                            fn: function (e) {
                                return false;
                            }
                        });
                        return false;
                    }
                    else if (endDate.getValue().length <= 1) {
                        //TODO message 작업 하기.(location)
                        Ext.Msg.alert({
                            title: msg.button_warn,
                            msg: "Please enter a correct search date.",
                            buttons: Ext.Msg.OK,
                            fn: function (e) {
                                return false;
                            }
                        });
                        return false;
                    }
                }


                var storeManager = Ext.data.StoreManager.get('WorkflowHistory');
                storeManager.load({
                    params: {
                        startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), config.dashboard_date_pattern),
                        endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), config.dashboard_date_pattern),
                        status: status.getValue(),
                        workflowName: workflowName.getValue(),
                        start: 0,
                        page: 1,
                        limit: CONSTANTS.GRID_SIZE_PER_PAGE
                    }
                });

                Ext.ComponentQuery.query('#jobGridPanel')[0].store.currentPage = 1;
            }
        },
        {
            xtype: 'button',
            formBind: true,
            text: msg.dashboard_button_search_clear,
            iconCls: 'dashboard_search_clear',
            labelWidth: 50,
            handler: function () {
                Ext.ComponentQuery.query('#startDate')[0].setValue('');
                Ext.ComponentQuery.query('#startDate')[0].setMaxValue();
                Ext.ComponentQuery.query('#startDate')[0].setMinValue();

                Ext.ComponentQuery.query('#endDate')[0].setValue('');
                Ext.ComponentQuery.query('#endDate')[0].setMinValue();
                Ext.ComponentQuery.query('#endDate')[0].setMaxValue();

                Ext.ComponentQuery.query('#status')[0].setValue('ALL');
                Ext.ComponentQuery.query('#workflowName')[0].setValue('');
            }
        }
    ],
    border: false,
    layout: {
        type: 'fit'
    },
    stores: ['WorkflowHistory'],
    initComponent: function () {
        this.items = [
            {
                itemId: 'jobGridPanel',
                xtype: 'grid',
                stripeRows: true,
                columnLines: true,
                features: [
                    Ext.create('Ext.grid.feature.Grouping', {
                        groupHeaderTpl: '{name} ({rows.length}개)'
                    })
                ],
                columns: [
                    {text: 'History number', width: 60, dataIndex: 'ID', align: 'center', hidden: false, sortable: false},
                    {text: 'Workflow ID', width: 160, dataIndex: 'WORKFLOW_ID', align: 'center', sortable: false},
                    {text: msg.dashboard_toolbar_workflow_name, flex: 1, dataIndex: 'WORKFLOW_NAME', align: 'center', sortable: false},
                    {text: 'Action', flex: 1, dataIndex: 'CURRENT_ACTION', align: 'center', hidden: false, sortable: false},
                    /*
                     {text:msg.dashboard_grid_vars, flex:1, dataIndex:'VARS', align:'center', hidden:true, sortable:false},
                     */
                    {text: msg.dashboard_toolbar_start_date, width: 140, dataIndex: 'START_DATE', align: 'center', sortable: false},
                    {text: msg.dashboard_toolbar_end_date, width: 140, dataIndex: 'END_DATE', align: 'center', sortable: false},
                    {text: msg.dashboard_grid_elapsed, width: 80, dataIndex: 'ELAPSED', align: 'center', sortable: false},
                    {
                        text: msg.dashboard_grid_progress, width: 100, dataIndex: 'PROGRESS', align: 'center', sortable: false,
                        renderer: function (value) {
                            return value + '%';
                        }
                    },
                    {text: msg.dashboard_grid_cause, flex: 1, dataIndex: 'CAUSE', align: 'center', hidden: true},
                    {text: msg.dashboard_grid_exception, flex: 1, dataIndex: 'EXCEPTION', align: 'center', hidden: true},
                    {text: msg.dashboard_toolbar_status, width: 100, dataIndex: 'STATUS', align: 'center', sortable: false,
                        renderer: function (value, meta) {
                            if (value === 'SUCCESS') {
                                meta.tdCls = 'status_dashboard_success';
                            }
                            if (value === 'FAIL') {
                                meta.tdCls = 'status_dashboard_fail';
                            }
                            if (value === 'KILL') {
                                meta.tdCls = 'status_dashboard_kill';
                            }
                            if (value === 'PREPARE') {
                                meta.tdCls = 'status_dashboard_prepare';
                            }
                            if (value === 'RUNNING') {
                                meta.tdCls = 'status_dashboard_running';
                            }
                            return value;
                        }
                    },
                    {text: msg.dashboard_grid_username, width: 70, dataIndex: 'USERNAME', align: 'center', sortable: false}
                ],
                store: 'WorkflowHistory',
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'WorkflowHistory',
                    displayInfo: true,
                    pageSize: 20,
                    displayMsg: msg.dashboard_msg_paging_display, //'Displaying topics {0} - {1} of {2}',
                    emptyMsg: msg.dashboard_msg_paging_empty
                }),
                viewConfig: {
                    stripeRows: true
                }
            }
        ];

        this.callParent(arguments);
    }
});