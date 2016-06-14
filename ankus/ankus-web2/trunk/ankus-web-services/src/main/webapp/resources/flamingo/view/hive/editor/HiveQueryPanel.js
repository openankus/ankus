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

Ext.define('Flamingo.view.hive.HiveQueryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hiveQueryPanel',

    border: false,

    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;
        var hiveQueryStore = Ext.create('Flamingo.store.hive.editor.HiveQuery');

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
                    store: hiveQueryStore,
                    columns: [
                        {text: 'ID', width: 60, dataIndex: 'scriptId', align: 'center', sortable: true},
                        {text: 'Script Name', flex: 1, dataIndex: 'scriptName', align: 'center', sortable: true},
                        {text: 'Saved Time', width: 130, dataIndex: 'createDate', align: 'center', sortable: true,
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        },
                        {text: 'Username', width: 120, dataIndex: 'username', align: 'center', sortable: true}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: hiveQueryStore,
                            dock: 'bottom',
                            pageSize: 5,
                            displayInfo: true
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        columnLines: true
                    },
                    tbar: [
                        {
                            xtype: 'tbtext',
                            text: 'Hive Query Name'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'scriptName'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
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
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'findButton',
                            formBind: true,
                            text: 'Find',
                            iconCls: 'common-find'
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearButton',
                            formBind: true,
                            text: 'Clear',
                            iconCls: 'common-find-clear'
                        }
                    ],
                    listeners: {
                        afterrender: function () {
                            // Hide a refresh button of paging tool bar
                            var hiveQueryPanel = query('hiveQueryPanel').down('gridpanel');
                            Ext.each(hiveQueryPanel.dockedItems.items, function (item) {
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
                    xtype: 'panel',
                    layout: 'fit',
                    title: 'Hive Query',
                    collapsible: true,
                    split: true,
                    height: 300,
                    items: [
                        {
                            xtype: 'codemirror',
                            itemId: 'savedHiveQuery',
                            flex: 1,
                            padding: '5 5 5 5',
                            layout: 'fit',
                            pathModes: '/resources/lib/codemirror-2.35/mode',
                            pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                            readOnly: true,
                            lineNumbers: true,
                            matchBrackets: true,
                            indentUnit: 2,
                            mode: "text/x-plsql",
                            showModes: false,
                            modes: [
                                {
                                    mime: ['text/x-plsql'],
                                    dependencies: ['plsql/plsql.js']
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