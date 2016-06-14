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
Ext.define('Flamingo.view.designer.property.browser.hdfs.BrowserPanel', {
    extend: 'Ext.panel.Panel',
    aliase: 'widget.hdfsBrowserPanelForDesigner',

    layout: 'fit',

    requires: [
        'Flamingo.view.designer.property.browser.hdfs.DirectoryPanel',
        'Flamingo.view.designer.property.browser.hdfs.FilePanel'
    ],

    border: true,

    engineId: {},

    controllers: ['Flamingo.controller.designer.HdfsBrowserController'],

    constructor: function (config) {
        this.engineId = config.engineId;
        this.callParent(arguments);
    },

    initComponent: function () {
        this.items = {
            layout: 'border',
            border: false,
            items: [
                {
                    region: 'west',
                    collapsible: true,
                    split: true,
                    title: MSG.HDFS_DIRECTORY,
                    width: 240,
                    layout: 'fit',
                    border: false,
                    items: [
                        {
                            split: true,
                            autoScroll: true,
                            xtype: 'hdfsDirectoryPanelForDesigner',
                            engineId: this.engineId
                        }
                    ]
                },
                {
                    region: 'center',
                    title: MSG.HDFS_FILE,
                    border: false,
                    layout: 'fit',
                    items: [
                        {
                            split: true,
                            xtype: 'hdfsFilePanelForDesigner',
                            engineId: this.engineId
                        }
                    ]
                }
            ]
        };

        this.callParent(arguments);
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
            }

            controller.init(); // Run init on the controller
        }, this);
    }
});