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

Ext.define('Flamingo.view.desktop.Designer', {
    extend: 'Flamingo.view.desktop.ux.Module',

    requires: [
        'Flamingo.view.designer.Viewport',
        'Flamingo.view.job.Viewport',
        'Flamingo.controller.designer.DesignerController'
    ],

    id: 'designer-win',

    tipWidth: 160,
    tipHeight: 96,

    controllers: ['Flamingo.controller.designer.DesignerController'],

    init: function () {
        this.registControllers();

        this.launcher = {
            text: 'Ankus Analyzer',
            iconCls: 'bogus'
        }
    },

    createWindow: function () {
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.id);

        if (!win) {
            win = desktop.createWindow({
                id: 'designer-win',
                title: 'Ankus Analyzer',
                width: 1000,
                height: 600,
                iconCls: 'desktop-workflow-small',
                closeAction: 'hide',
                animCollapse: false,
                border: false,
                layout: 'fit',
                items: {
                    xtype: 'designerViewport'
                }
            });
        }

        return win;
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

