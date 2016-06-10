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

Ext.define('Flamingo.view.fs.audit.AuditHistory', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.auditHistory',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo'
    ],

    controllers: ['Flamingo.controller.fs.hdfs.AuditController'],

    border: true,

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;

        var auditHistoryStore = Ext.create('Flamingo.store.fs.audit.AuditHistory');

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    itemId: 'auditGridPanel',
                    features: [
                        Ext.create('Ext.grid.feature.Grouping', {
                            groupHeaderTpl: '{name} (' + MSG.AUDIT_GROUP_TOTAL + ': {rows.length})'
                        })
                    ],
                    border: false,
                    store: auditHistoryStore,
                    columns: [
                        {text: MSG.AUDIT_HEADER_NO, width: 60, dataIndex: 'id', align: 'center'},
                        {text: MSG.AUDIT_HEADER_USERNAME, width: 70, dataIndex: 'username', align: 'center'},
                        {text: MSG.AUDIT_HEADER_FS, width: 80, dataIndex: 'fileSystemType', align: 'center', sortable: false},
                        {text: MSG.AUDIT_HEADER_TYPE, width: 80, dataIndex: 'fileType', align: 'center', sortable: false,
                            renderer: function (value) {
                                if (value == 'FILE') {
                                    return MSG.AUDIT_FILE;
                                }
                                if (value == 'DIRECTORY') {
                                    return MSG.AUDIT_DIRECTORY;
                                }
                            }
                        },
                        {text: MSG.AUDIT_HEADER_ACTION, width: 80, dataIndex: 'auditType', align: 'center', sortable: false,
                            renderer: function (value) {
                                if (value == 'CREATE') {
                                    return MSG.AUDIT_CREATE;
                                }
                                if (value == 'DELETE') {
                                    return MSG.AUDIT_DELETE;
                                }
                                if (value == 'RENAME') {
                                    return MSG.AUDIT_RENAME;
                                }
                                if (value == 'COPY') {
                                    return MSG.AUDIT_COPY;
                                }
                                if (value == 'MOVE') {
                                    return MSG.AUDIT_MOVE;
                                }
                                if (value == 'UPLOAD') {
                                    return MSG.AUDIT_UPLOAD;
                                }
                                if (value == 'DOWNLOAD') {
                                    return MSG.AUDIT_DOWNLOAD;
                                }
                            }
                        },
                        {text: MSG.AUDIT_HEADER_PATH, flex: 1, dataIndex: 'from', align: 'left', sortable: false,
                            renderer: function (value, metadata, record, rowIndex, colIndex, store) {
                                if (isBlank(record.data.to)) {
                                    if (record.data.from.length > 69) {
                                        metadata.style = '!important;cursor: pointer;';
                                        metadata.tdAttr = 'data-qtip="' + record.data.from + '"';
                                    }
                                    return value;
                                } else {
                                    var msg = Ext.String.format(
                                        '{0} &#187; {1}',
                                        record.data.from,
                                        record.data.to
                                    );
                                    if (msg.length > 69) {
                                        var message = Ext.String.format(
                                            MSG.AUDIT_TIP_FROM + ' : {0}</br>' + MSG.AUDIT_TIP_TO + ' : {1}',
                                            record.data.from,
                                            record.data.to
                                        );

                                        metadata.style = '!important;cursor: pointer;';
                                        metadata.tdAttr = 'data-qtip="' + message + '"';
                                    }

                                    return msg;
                                }
                            }
                        },
                        {text: MSG.AUDIT_HEADER_SIZE, width: 100, dataIndex: 'length', align: 'center', sortable: true,
                            renderer: function (value) {
                                return toCommaNumber(value);
                            }
                        },
                        {text: MSG.AUDIT_HEADER_DATE, width: 130, dataIndex: 'workDate', align: 'center',
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: auditHistoryStore,
                            dock: 'bottom',
                            pageSize: CONSTANTS.GRID_SIZE_PER_PAGE,
                            displayInfo: true
                        }
                    ],
                    viewConfig: {
                        enableTextSelection: true,
                        stripeRows: true,
                        columnLines: true,
                        getRowClass: function (record) {
                            return 'audit-cell-height';
                        }
                    },
                    tbar: [
                        {
                            xtype: 'tbtext',
                            text: MSG.AUDIT_FIND_H_CLUSTER
                        },
                        {
                            xtype: '_workflowEngineCombo',
                            filter: 'HADOOP',
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    query('auditHistory #engineId').setValue(newValue);
                                    var findButton = query('auditHistory #findButton').fireHandler();
                                }
                            }
                        },
                        {
                            xtype: 'hidden',
                            itemId: 'engineId',
                            name: 'engineId',
                            allowBlank: true
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.AUDIT_FIND_START
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
                            text: MSG.AUDIT_FIND_END
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
                            text: MSG.AUDIT_FIND_TYPE
                        },
                        {
                            xtype: 'combo',
                            name: 'type',
                            itemId: 'type',
                            editable: false,
                            queryMode: 'local',
                            typeAhead: true,
                            selectOnFocus: true,
                            displayField: 'name',
                            valueField: 'value',
                            width: 90,
                            value: 'ALL',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                    {name: MSG.AUDIT_ALL, value: 'ALL'},
                                    {name: MSG.AUDIT_DELETE, value: 'DELETE'},
                                    {name: MSG.AUDIT_CREATE, value: 'CREATE'},
                                    {name: MSG.AUDIT_COPY, value: 'COPY'},
                                    {name: MSG.AUDIT_MOVE, value: 'MOVE'},
                                    {name: MSG.AUDIT_RENAME, value: 'RENAME'},
                                    {name: MSG.AUDIT_UPLOAD, value: 'UPLOAD'},
                                    {name: MSG.AUDIT_DOWNLOAD, value: 'DOWNLOAD'}
                                ]
                            })
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.AUDIT_FIND_PATH
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'path'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'findButton',
                            formBind: true,
                            text: MSG.AUDIT_FIND_FIND,
                            iconCls: 'common-find',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearButton',
                            formBind: true,
                            text: MSG.AUDIT_FIND_CLEAR,
                            iconCls: 'common-find-clear',
                            labelWidth: 50
                        }
                    ],
                    listeners: {
                        afterrender: function () {
                            // Hide a refresh button of paging tool bar
                            var workflowHistoryPanel = Ext.ComponentQuery.query('auditHistory')[0].down('gridpanel');
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