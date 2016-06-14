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

Ext.define('Flamingo.view.hive.browser.Partition', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hivePartition',

    layout: 'border',

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                region: 'north',
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        defaults: {
                            width: 340
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'tableName',
                                itemId: 'tableTextField',
                                fieldLabel: 'Table Name',
                                value: ''
                            },
                            {
                                xtype: 'textfield',
                                name: 'comment',
                                itemId: 'commentTextField',
                                fieldLabel: 'Comment'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'gridpanel',
                itemId: 'partitionGrid',
                region: 'center',
                title: 'Partition',
                stripeRows: true,
                columnLines: true,
                height: 150,
                store: {
                    autoLoad: true,
                    fields: ['name', 'type', 'comment'],
                    proxy: {
                        type: 'ajax',
                        url: CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_GET_PARTITIONS,
                        headers: {
                            'Accept': 'application/json'
                        },
                        reader: {
                            type: 'json',
                            root: 'list'
                        }
                    }
                },
                columns: [
                    {
                        header: 'Column Name',
                        itemId: 'nameColumn',
                        xtype: 'gridcolumn',
                        dataIndex: 'name',
                        flex: 1,
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false
                        }
                    },
                    {
                        header: 'Type',
                        xtype: 'gridcolumn',
                        dataIndex: 'type',
                        flex: 1,
                        editor: {
                            xtype: 'combo',
                            allowBlank: false,
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender: true,
                            mode: 'local',
                            store: new Ext.data.ArrayStore(
                                {
                                    id: 0,
                                    fields: ['typeId', 'typeString'],
                                    data: [
                                        ['1', 'ARRAY'],
                                        ['2', 'BIGINT'],
                                        ['3', 'BINARY'],
                                        ['4', 'BOOLEAN'],
                                        ['5', 'DOUBLE'],
                                        ['6', 'FLOAT'],
                                        ['7', 'INT'],
                                        ['8', 'MAP'],
                                        ['9', 'SMALLINT'],
                                        ['10', 'STRING'],
                                        ['11', 'STRUCT'],
                                        ['12', 'TINYINT']
                                    ]
                                }
                            ),
                            valueField: 'typeString',
                            displayField: 'typeString'
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'comment',
                        text: 'Comment',
                        flex: 1,
                        editor: {
                            xtype: 'textfield'
                        }
                    }
                ],
                tbar: [
                    {
                        text: 'Add',
                        iconCls: 'column-add',
                        handler: function () {
                            var gridStore = Ext.ComponentQuery.query('#partitionGrid')[0].getStore();
                            var length = gridStore.data.length;
                            gridStore.insert(length, 0);
                        }
                    },
                    {
                        text: 'Remove',
                        iconCls: 'column-remove',
                        handler: function () {
                            var grid = Ext.ComponentQuery.query('#partitionGrid')[0];
                            var rowEditor = grid.getPlugin('rowEditorPlugin');
                            rowEditor.cancelEdit();

                            var sm = grid.getSelectionModel();
                            var gridStore = grid.getStore();
                            gridStore.remove(sm.getSelection());
                            sm.select(0);
                        }
                    }

                ],
                selType: 'cellmodel',
                plugins: [
                    Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 2,
                        pluginId: 'rowEditorPlugin',
                        listeners: {
                            canceledit: function (editor, e, eOpts) {
                                // Cancel Edit 시 유효하지 않으면 추가된 레코드를 삭제한다.
                                if (e.store.getAt(e.rowIdx) != undefined && !e.store.getAt(e.rowIdx).isValid()) {
                                    e.store.removeAt(e.rowIdx);
                                }
                            },

                            beforeedit: function (e, editor) {
                                if (e.colIdx == 1)
                                    return false;
                            },

                            edit: function (editor, e) {
                            }

                        }
                    })
                ],

                listeners: {
                    'selectionchange': function (view, records) {
                    }
                }
            }
        ];

        this.callParent(arguments);
    }

})
