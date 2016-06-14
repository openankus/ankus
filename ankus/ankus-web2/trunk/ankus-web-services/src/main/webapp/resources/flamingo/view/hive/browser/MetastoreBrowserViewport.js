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

Ext.define('Flamingo.view.hive.browser.MetastoreBrowserViewport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hiveMetastoreBrowserViewport',

    layout: 'border',

    border: false,

    requires: [
        'Flamingo.view.component._StatusBar',


        'Flamingo.view.hive.browser.DatabaseCreatorPanel',
        'Flamingo.view.hive.browser.TableCreator',
        'Flamingo.view.hive.browser.Partition',
        'Flamingo.view.hive.browser.Column',
        'Flamingo.view.hive.browser.RenameTable' ,
        'Flamingo.view.hive.browser.HiveMetastoreBrowserTreePanel',
        'Flamingo.view.hive.browser.HiveMetastoreBrowserListGridPanel'

    ],

    controllers: [ 'Flamingo.controller.hive.HiveMetastoreBrowserController' ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'west',
                    border: false,
                    collapsible: true,
                    split: true,
                    title: 'Database',
                    width: 300,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'hiveBrowserTreePanel'
                        }
                    ]
                },
                {
                    region: 'center',
                    xtype: 'hiveBrowserListGridPanel'

                }
            ],
            bbar: {
                xtype: '_statusBar'
            }
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