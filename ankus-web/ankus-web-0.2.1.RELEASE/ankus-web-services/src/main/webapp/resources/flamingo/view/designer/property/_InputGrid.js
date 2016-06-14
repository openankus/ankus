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

/**
 * Inner Grid : InputPath Grid
 *
 * @class
 * @extends Flamingo.view.designer.property._Grid
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._InputGrid', {
    extend: 'Flamingo.view.designer.property._Grid',
    alias: 'widget._inputGrid',

    requires: ['Flamingo.view.designer.property.browser.hdfs.BrowserPanel'],

    store: {
        type: 'input'
    },
    selType: 'rowmodel',
    forceFit: true,
    columnLines: true,
    columns: [
        {
            text: MSG.DESIGNER_PATH,
            dataIndex: 'input',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }
    ],

    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],

    initComponent: function () {
        this.callParent(arguments);

        this.tools = [
            {
                type: 'plus',
                tooltip: MSG.COMMON_ADD,
                handler: function (event, toolEl, panel) {
                    var grid = panel.up('_grid'),
                        store = grid.getStore();

                    var canvas = Ext.ComponentQuery.query('canvas')[0];
                    var form = canvas.getForm();
                    var engineId = form.getValues()['engine_id'];

                    if (engineId) {
                        var popWindow = Ext.create('Ext.Window', {
                            title: MSG.DESIGNER_TITLE_FILE_BROWSER,
                            width: 800,
                            height: 400,
                            modal: true,
                            resizable: true,
                            constrain: true,
                            layout: 'fit',
                            items: [
                                Ext.create('Flamingo.view.designer.property.browser.hdfs.BrowserPanel', {
                                    engineId: engineId
                                })
                            ],
                            buttonAlign: 'center',
                            buttons: [
                                {
                                    text: MSG.COMMON_OK,
                                    iconCls: 'common-confirm',
                                    handler: function () {

                                        var lastPathComp = popWindow.query('hdfsDirectoryPanelForDesigner #lastPath')[0];
                                        if (lastPathComp.getValue()) {
                                            var textfield = panel.query('textfield')[0];
                                            var selection = grid.getSelectionModel().getSelection()[0]

                                            store.insert(store.getCount(), {
                                                    input: lastPathComp.getValue()
                                                }
                                            );
                                            popWindow.close();
                                        }

                                    }
                                },
                                {
                                    text: MSG.COMMON_CANCEL,
                                    iconCls: 'common-cancel',
                                    handler: function () {
                                        popWindow.close();
                                    }
                                }
                            ]
                        }).center().show();
                    } else {
                        errormsg(MSG.COMMON_WARN, MSG.DESIGNER_MSG_SELECT_CLUSTER);
                    }
                }
            },
            {
                type: 'minus',
                tooltip: MSG.COMMON_REMOVE,
                handler: function (event, toolEl, panel) {
                    var grid = panel.up('_grid'),
                        store = grid.getStore(),
                        selectionModel = grid.getSelectionModel();
                    store.remove(selectionModel.getSelection());
                }
            },
            {
                type: 'close',
                tooltip: MSG.COMMON_REMOVE_ALL,
                handler: function (event, toolEl, panel) {
                    var grid = panel.up('_grid'),
                        store = grid.getStore();
                    store.removeAll();
                }
            }
        ];
    }
});