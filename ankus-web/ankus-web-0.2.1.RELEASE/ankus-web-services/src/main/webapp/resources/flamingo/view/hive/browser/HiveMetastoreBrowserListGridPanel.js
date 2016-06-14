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

Ext.define('Flamingo.view.hive.browser.HiveMetastoreBrowserListGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hiveBrowserListGridPanel',

    border: false,
    stripeRows: true,
    columnLines: true,
    columns: [
        {text: 'Name', flex: 2, sortable: true, dataIndex: 'name'},
        {text: 'Type', flex: 1, dataIndex: 'type', align: 'center'},
        {text: 'Comment', flex: 2, dataIndex: 'comment'},
        {text: 'Category', flex: 2, dataIndex: 'category', align: 'center'}
    ],
    store: Ext.create('Ext.data.Store', {
        fields: ['name', 'type', 'comment', 'category'],
        proxy: {
            type: 'ajax',
            url: CONSTANTS.CONTEXT_PATH + CONSTANTS.HIVE.BROWSER_GET_COLUMMS,
            headers: {
                'Accept': 'application/json'
            },
            reader: {
                type: 'json',
                root: 'list'
            }
        }
    }),
    tools: [
        {
            type: 'plus',
            tooltip: 'Add',
            handler: function (event, toolEl, panel) {
                // TODO GRID에 컬럼 추가하고 EDIT 모드로 전환
            }
        },
        {
            type: 'minus',
            tooltip: 'Remove',
            handler: function (event, toolEl, panel) {
                // TODO 선택한 컬럼 삭제하고 저장 버튼 활성화
            }
        },
        {
            type: 'close',
            tooltip: 'Remove All',
            handler: function (event, toolEl, panel) {
                // TODO 모두 삭제하고 모두 삭제할 것인지 물어보고 즉시 삭제함.
            }
        }
    ],
    listeners: {
        containercontextmenu: function (grid, e) {
            e.stopEvent();
        }
    }
})