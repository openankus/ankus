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

Ext.define('Flamingo.view.pig.PigEditorViewport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pigEditorViewport',

    requires: [
        'Flamingo.view.pig.PigEditorPanel',
        'Flamingo.view.pig.PigHistoryPanel',
        'Flamingo.view.pig.PigScriptPanel'
    ],

    layout: 'fit',

    border: false,

    controllers: ['Flamingo.controller.pig.PigController'],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 2,
                    items: [
                        {
                            xtype: 'pigHistoryPanel',
                            title: MSG.PIG_HISTORY,
                            closable: false,
                            tabConfig: {
                                margin: '0 0 0 0'
                            }
                        },
                        {
                            xtype: 'pigScriptPanel',
                            title: MSG.PIG_PIG_SCRIPT,
                            closable: false,
                            tabConfig: {
                                margin: '0 20 0 0'
                            }
                        },
                        {
                            xtype: 'pigEditorPanel',
                            title: MSG.PIG_PIG_SCRIPT_EDITOR,
                            closable: false
                        }
                    ]
                    /*
                     ,
                     tabBar: {
                     items: [
                     {
                     xtype: 'tbfill'
                     },
                     {
                     iconCls: 'common-add',
                     closable: false,
                     handler: function (btn, e) {
                     var tabpanel = btn.up('tabpanel');
                     tabpanel.add({
                     xtype: 'pigEditorPanel',
                     title: 'Unnamed ' + tabpanel.items.length,
                     closable: true
                     });
                     }
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