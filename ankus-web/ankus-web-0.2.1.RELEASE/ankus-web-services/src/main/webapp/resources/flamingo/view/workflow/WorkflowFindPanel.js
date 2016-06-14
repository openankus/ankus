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

Ext.define('Flamingo.view.workflow.WorkflowFindPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowFindPanel',

    tbar: [
        {
            xtype: 'tbtext',
            text: 'User ID'
        },
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'textfield',
            itemId: 'username',
            width: 80
        },
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'tbtext',
            text: 'Workflow'
        },
        {
            xtype: 'combo',
            name: 'type',
            itemId: 'type',
            editable: false,
            queryMode: 'local',
            typeAhead: true,
            selectOnFocus: true,
            displayField: 'displayName',
            valueField: 'value',
            width: 70,
            value: 'ALL',
            store: Ext.create('Ext.data.Store', {
                fields: ['displayName', 'value'],
                data: [
                    {'displayName': 'ALL', 'value': 'All'},
                    {'displayName': 'ID', 'value': 'ID'},
                    {'displayName': 'NAME', 'value': 'NAME'}
                ]
            }),
            params: {
                startDate: '',
                endDate: '',
                username: '',
                type: '',
                workflowVaule: ''
            },
            listeners: {
                beforeload: function (store, options) {
                    var startDateValue = null;
                    var endDateValue = null;
                    var username = null;
                    var type = null;
                    var workflowValue = null;

                    if (Ext.ComponentQuery.query('#startDate')[0] != null || Ext.ComponentQuery.query('#startDate')[0] != undefined) {
                        startDateValue = Flamingo.Util.Date.formatExtJS(Ext.ComponentQuery.query('#startDate')[0].getValue(), config.dashboard_date_pattern)
                    }

                    if (Ext.ComponentQuery.query('#endDate')[0] != null || Ext.ComponentQuery.query('#endDate')[0] != undefined) {
                        endDateValue = Flamingo.Util.Date.formatExtJS(Ext.ComponentQuery.query('#endDate')[0].getValue(), config.dashboard_date_pattern)
                    }

                    if (Ext.ComponentQuery.query('#username')[0] != null || Ext.ComponentQuery.query('#username')[0] != undefined) {
                        username = Ext.ComponentQuery.query('#username')[0].getValue();
                    }

                    if (Ext.ComponentQuery.query('#type')[0] != null || Ext.ComponentQuery.query('#type')[0] != undefined) {
                        type = Ext.ComponentQuery.query('#type')[0].getValue();
                    }

                    if (Ext.ComponentQuery.query('#workflowValue')[0] != null || Ext.ComponentQuery.query('#workflowValue')[0] != undefined) {
                        workflowValue = Ext.ComponentQuery.query('#workflowValue')[0].getValue();
                    }

                    var params = {
                        startDate: startDateValue,
                        endDate: endDateValue,
                        username: username,
                        type: type,
                        workflowVlaue: workflowValue
                    };

                    Ext.apply(store.proxy.extraParams, params);
                }
            }
        },
        {
            xtype: 'textfield',
            itemId: 'workflowValue'
        },
        {
            xtype: 'tbspacer',
            width: 10
        },
        {
            xtype: 'tbtext',
            text: 'Create Date'
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
            xtype: 'datefield',
            format: config.dashboard_date_pattern,
            itemId: 'endDate',
            vtype: 'dateRange',
            startDateField: 'startDate',
            width: 100
        },
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'button',
            formBind: true,
            text: 'Search',
            iconCls: 'dashboard_search',
            labelWidth: 50,
            handler: function () {

                var startDate = Ext.ComponentQuery.query('#startDate')[0];
                var endDate = Ext.ComponentQuery.query('#endDate')[0];
                var username = Ext.ComponentQuery.query('#username')[0];
                var workflowValue = Ext.ComponentQuery.query('#workflowValue')[0];
                var type = Ext.ComponentQuery.query('#type')[0];

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
                        Ext.Msg.alert({
                            title: msg.button_warn,
                            msg: 'Please select start date',
                            buttons: Ext.Msg.OK,
                            fn: function (e) {
                                return false;
                            }
                        });
                        return false;
                    }
                    else if (endDate.getValue().length <= 1) {
                        Ext.Msg.alert({
                            title: msg.button_warn,
                            msg: 'Please select end date',
                            buttons: Ext.Msg.OK,
                            fn: function (e) {
                                return false;
                            }
                        });
                        return false;
                    }
                }

                var store = Ext.data.StoreManager.get('WorkflowSearch');
                store.load({
                    params: {
                        startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), config.dashboard_date_pattern),
                        endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), config.dashboard_date_pattern),
                        type: type.getValue(),
                        username: username.getValue(),
                        workflowValue: workflowValue.getValue(),
                        start: 0,
                        page: 1,
                        limit: CONSTANTS.GRID_SIZE_PER_PAGE
                    }
                });
            }
        },
        {
            xtype: 'button',
            formBind: true,
            text: 'Clear',
            iconCls: 'dashboard_search_clear',
            labelWidth: 50,
            handler: function () {
                Ext.ComponentQuery.query('#startDate')[0].setValue('');
                Ext.ComponentQuery.query('#startDate')[0].setMinValue();
                Ext.ComponentQuery.query('#startDate')[0].setMaxValue();

                Ext.ComponentQuery.query('#endDate')[0].setValue('');
                Ext.ComponentQuery.query('#endDate')[0].setMinValue();
                Ext.ComponentQuery.query('#endDate')[0].setMaxValue();

                Ext.ComponentQuery.query('#type')[0].setValue('ALL');
                Ext.ComponentQuery.query('#username')[0].setValue('');
                Ext.ComponentQuery.query('#workflowValue')[0].setValue('');
            }
        }
    ],
    border: false,
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        this.items = [
            {
                itemId: 'workflowSearchGridPanel',
                xtype: 'grid',
                border: false,
                stripeRows: true,
                columnLines: true,
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {
                        xtype: 'rownumberer',
                        text: 'No',
                        width: 50,
                        sortable: false
                    },
                    {text: 'User ID', flex: 0.6, dataIndex: 'username', align: 'center', hidden: false, sortable: false},
                    {text: 'Workflow ID', flex: 1, dataIndex: 'workflowId', align: 'center', hidden: false, sortable: false},
                    {text: 'Workflow Name', flex: 1, dataIndex: 'workflowName', align: 'center', hidden: false, sortable: false},
                    {text: 'Job Type', flex: 0.5, dataIndex: 'jobType', align: 'center', hidden: false, sortable: false},
                    {text: 'Tree ID', flex: 0.5, dataIndex: 'workflowTreeId', align: 'center', hidden: true, sortable: false},
                    {text: 'Create Date', flex: 1, dataIndex: 'create', align: 'center', hidden: false, sortable: false}
                ],
                store: Ext.create('', {
                    autoLoad: false,
                    fields: ['name', 'length', 'modificationTime', 'permission', 'group', 'owner', 'replication', 'blocksize'],
                    proxy: {
                        type: 'ajax',
                        url: CONSTANTS.FS.HDFS_GET_FILE,
                        headers: {
                            'Accept': 'application/json'
                        },
                        reader: {
                            type: 'json',
                            root: 'list'
                        }
                    }
                }),
                viewConfig: {
                    stripeRows: true
                }
            }
        ];

        this.callParent(arguments);
    }
});

