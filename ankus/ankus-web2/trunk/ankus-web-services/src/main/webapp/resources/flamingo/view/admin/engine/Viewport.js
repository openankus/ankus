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

Ext.define('Flamingo.view.admin.engine.Viewport', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Flamingo.view.admin.engine.WorkflowEnginesPanel',
        'Flamingo.view.admin.engine.WorkflowEngineDetailTabPanel'
    ],

    controllers: ['Flamingo.controller.admin.WorkflowEngineController'],

    layout: 'fit',

    border: false,

    forceFit: true,

    height: 400,

    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                layout: 'border',
                items: [
                    {
                        region: 'north',
                        border: false,
                        items: {
                            xtype: 'workflowEnginesPanel'
                        }

                    },
                    {
                        region: 'center',
                        layout: 'fit',
                        border: false,
                        items: {
                            xtype: 'workflowEngineDetailTabPanel'
                        }
                    }
                ]
            }
        ];

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
                controller.init(); // Run init on the controller
            }
        }, this);
    }
});
