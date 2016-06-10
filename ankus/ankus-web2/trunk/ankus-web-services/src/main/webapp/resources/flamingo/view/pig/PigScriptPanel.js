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

Ext.define('Flamingo.view.pig.PigScriptPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pigScriptPanel',

    border: false,

    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;
        var pigScriptStore = Ext.create('Flamingo.store.pig.PigScript');

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    xtype: 'gridpanel',
                    itemId: 'pigScriptGridPanel',
                    features: [
                        Ext.create('Ext.grid.feature.Grouping', {
                            groupHeaderTpl: '{name} (Total: {rows.length})'
                        })
                    ],
                    border: false,
                    store: pigScriptStore,
                    columns: [
                        {text: MSG.PIG_ID, width: 60, dataIndex: 'scriptId', align: 'center', sortable: true},
                        {text: MSG.PIG_SCRIPT_NAME, flex: 1, dataIndex: 'scriptName', align: 'center', sortable: true},
                        {text: MSG.PIG_SAVED_TIME, width: 130, dataIndex: 'createDate', align: 'center', sortable: true,
                            renderer: function (value) {
                                return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }
                        },
                        {text: MSG.PIG_USERNAME, width: 120, dataIndex: 'username', align: 'center', sortable: true}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: pigScriptStore,
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
                            text: MSG.PIG_PIG_SCRIPT_NAME
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
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'findButton',
                            formBind: true,
                            text: MSG.PIG_FIND,
                            iconCls: 'common-find'
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearButton',
                            formBind: true,
                            text: MSG.PIG_CLEAR,
                            iconCls: 'common-find-clear'
                        }/*,
                         {
                         xtype: 'button',
                         itemId: 'deleteButton',
                         formBind: true,
                         text: 'Delete',
                         iconCls: 'common-delete'
                         }*/
                    ],
                    listeners: {
                        afterrender: function () {
                            // Hide a refresh button of paging tool bar
                            var pigScriptPanel = Ext.ComponentQuery.query('pigScriptPanel')[0].down('gridpanel');
                            Ext.each(pigScriptPanel.dockedItems.items, function (item) {
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
                    title: MSG.PIG_PIG_LATIN_SCRIPT,
                    collapsible: true,
                    split: true,
                    height: 300,
                    items: [
                        {
                            xtype: 'codemirror',
                            itemId: 'savedPigScript',
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
                }
            ]
        });

        this.callParent(arguments);
    }
});