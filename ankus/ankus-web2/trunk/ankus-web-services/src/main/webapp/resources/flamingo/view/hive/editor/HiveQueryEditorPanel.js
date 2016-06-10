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

Ext.define('Flamingo.view.hive.editor.HiveQueryEditorPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hiveQueryEditorPanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo',
        'Flamingo.view.component._HiveDatabaseCombo',

        'Flamingo.view.hive.editor.HiveQueryEditor'
    ],

    layout: 'border',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                /*
                 {
                 xtype      : 'panel',
                 region     : 'west',
                 split      : true,
                 minWidth   : 200,
                 width      : 300,
                 maxWidth   : 500,
                 border     : false,
                 layout     : 'fit'
                 },
                 */
                {
                    xtype: 'hiveQueryEditor',
                    region: 'center'
                },
                {
                    xtype: 'panel',
                    title: MSG.HIVE_LOG_MESSAGE,
                    region: 'south',
                    layout: 'fit',
                    collapsible: true,
                    split: true,
                    height: 220,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'gridpanel',
                            autoScroll: true,
                            border: false,
                            store: Ext.create('Ext.data.Store', {
                                fields: ['time', 'message']
                            }),
                            columns: [
                                {text: MSG.HIVE_TIME, width: 130, dataIndex: 'time', align: 'center'},
                                {text: MSG.HIVE_MESSAGE, flex: 1, dataIndex: 'message', align: 'left', sortable: false,
                                    renderer: function (val) {
                                        return '<pre class="code">' + wrap(escapeHTML(val), 120, '\r', 0) + '</pre>';
                                    }
                                }
                            ],
                            viewConfig: {
                                enableTextSelection: true,
                                stripeRows: true,
                                columnLines: true
                            }
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbtext',
                            text: MSG.HIVE_HIVE_SERVER
                        },
                        {
                            xtype: '_workflowEngineCombo',
                            itemId: 'editorEngineCombo',
                            type: 'HIVE',
                            width: 150,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    if (newValue) {
                                        var combo = query('hiveQueryEditorPanel _hiveDatabaseCombo');
                                        combo.setDisabled(false);

                                        var refreshButton = query('hiveQueryEditorPanel #refreshButton');
                                        refreshButton.setDisabled(false);

                                        var store = combo.getStore();
                                        store.getProxy().extraParams.engineId = newValue;
                                        store.load();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.HIVE_DATABASE
                        },
                        {
                            xtype: '_hiveDatabaseCombo',
                            itemId: 'databaseCombo',
                            name: 'databaseCombo',
                            width: 150,
                            disabled: true
                        },
                        {
                            tooltip: MSG.COMMON_REFRESH,
                            iconCls: 'common-refresh',
                            itemId: 'refreshButton',
                            disabled: true,
                            handler: function () {
                                var combo = query('hiveQueryEditorPanel #databaseCombo');
                                combo.getStore().load();
                            }
                        },
                        '->',
                        {
                            xtype: 'button',
                            iconCls: 'designer-action',
                            text: MSG.HIVE_RUN,
                            itemId: 'runButton'
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});