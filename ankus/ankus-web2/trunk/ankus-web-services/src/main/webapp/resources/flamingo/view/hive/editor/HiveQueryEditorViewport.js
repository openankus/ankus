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

Ext.define('Flamingo.view.hive.editor.HiveQueryEditorViewport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hiveQueryEditorViewport',

    requires: [
        'Flamingo.view.component._StatusBar',

        'Flamingo.view.hive.editor.HiveQueryHistoryPanel',
//        'Flamingo.view.hive.editor.HiveQueryPanel',
        'Flamingo.view.hive.editor.HiveQueryEditorPanel'
    ],

    layout: 'fit',

    border: false,

    controllers: ['Flamingo.controller.hive.HiveEditorController'],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 1,
                    items: [
                        {
                            xtype: 'hiveQueryHistoryPanel',
                            title: MSG.HIVE_HISTORY,
                            closable: false,
                            tabConfig: {
                                margin: '0 20 0 0'
                            }
                        },
                        /*
                         {
                         xtype: 'hiveQueryPanel',
                         title: 'Hive Query',
                         closable: false,
                         tabConfig: {
                         margin: '0 20 0 0'
                         }
                         },
                         */
                        {
                            xtype: 'hiveQueryEditorPanel',
                            title: MSG.HIVE_HIVE_QUERY_EDITOR,
                            closable: false
                        }
                    ]
                    /*
                     tabBar: {
                     items: [
                     {
                     xtype: 'tbfill'
                     },
                     {
                     iconCls: 'common-add',
                     itemId: 'addTabButton',
                     closable: false
                     }
                     ]
                     }
                     */
                }
            ]
        });

        me.callParent(arguments);
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