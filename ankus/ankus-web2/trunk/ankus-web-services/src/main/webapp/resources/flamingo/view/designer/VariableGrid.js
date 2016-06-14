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
 * Workflow Designer : VariableGrid View
 *
 * @class
 * @extends Ext.grid.Panel
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.VariableGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.variableGrid',

    requires: [
        'Flamingo.store.designer.Variable'
    ],

    store: {
        type: 'variable'
    },
    selType: 'rowmodel',
    forceFit: true,
    columnLines: true,
    border: false,
    columns: [
        {
            text: MSG.DESIGNER_COL_NAME,
            dataIndex: 'name',
            editor: {
                vtype: 'alphanum',
                allowBlank: false,
                listeners: {
                    errorchange: function (comp, error, eopts) {
                        comp.focus(false, 50);
                    }
                }
            }
        },
        {
            text: MSG.DESIGNER_COL_VALUE,
            dataIndex: 'value',
            editor: {
                vtype: 'exceptcomma',
                allowBlank: false,
                listeners: {
                    errorchange: function (comp, error, eopts) {
                        comp.focus(false, 50);
                    }
                }
            }
        }
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            pluginId: 'rowEditorPlugin',
            listeners: {
                canceledit: function (editor, e, eOpts) {
                    // Cancel Edit 시 유효하지 않으면 추가된 레코드를 삭제한다.
                    if (!e.store.getAt(e.rowIdx).isValid()) {
                        e.store.removeAt(e.rowIdx);
                    }
                }
            }
        })
    ],
    tools: [
        {
            type: 'plus',
            tooltip: MSG.COMMON_ADD,
            handler: function (event, toolEl, panel) {
                var grid = panel.up('variableGrid'),
                    store = grid.getStore(),
                    rowEditor = grid.getPlugin('rowEditorPlugin');
                rowEditor.cancelEdit();
                store.insert(store.getCount(), {name: '', value: ''});
                rowEditor.startEdit(store.getCount() - 1, 0);
            }
        },
        {
            type: 'minus',
            tooltip: MSG.COMMON_DELETE,
            handler: function (event, toolEl, panel) {
                var grid = panel.up('variableGrid'),
                    store = grid.getStore(),
                    selectionModel = grid.getSelectionModel();
                store.remove(selectionModel.getSelection());
            }
        },
        {
            type: 'close',
            tooltip: MSG.COMMON_REMOVE_ALL,
            handler: function (event, toolEl, panel) {
                var grid = panel.up('variableGrid'),
                    store = grid.getStore();
                store.removeAll();
            }
        }
    ]
});