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

Ext.define('Flamingo.view.component._AIOLocalFileSystemBrowser', {
    extend: 'Ext.panel.Panel',
    alias: 'widget._aioLocalFileSystemBrowser',

    border: false,

    autoCreate: true,

    layout: 'border',

    engine: {},

    constructor: function (config) {
        this.engine = config.engine;
        this.callParent(arguments);
    },

    initComponent: function () {
        this.items = [
            {
                region: 'center',
                border: false,
                width: 200,
                layout: 'fit',
                items: [
                    {
                        itemId: 'browserTree',
                        border: false,
                        xtype: 'treepanel',
                        rootVisible: true,
                        store: Ext.create('Ext.data.TreeStore', {
                            proxy: {
                                type: 'ajax',
                                url: CONSTANTS.ADMIN.WE.GET_AIO,
                                actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
                                headers: {
                                    'Accept': 'application/json'
                                },
                                reader: {
                                    type: 'json',
                                    root: 'list'
                                },
                                extraParams: {
                                    engineId: this.engine.id
                                }
                            },
                            root: {
                                text: '/',
                                id: '/',
                                expanded: true
                            }
                        }),
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                items: [
                                    '->',
                                    {
                                        text: 'Refresh',
                                        iconCls: 'common-refresh',
                                        tooltip: '현재 디렉토리의 파일 목록을 갱신합니다.',
                                        handler: function () {
                                            var treePanel = Ext.ComponentQuery.query('#browserTree')[0];
                                            treePanel.getStore().load();
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});