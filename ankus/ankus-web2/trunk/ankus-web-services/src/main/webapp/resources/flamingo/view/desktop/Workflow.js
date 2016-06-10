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

Ext.define('Flamingo.view.desktop.Workflow', {
    extend: 'Flamingo.view.desktop.BogusModule',

    requires: [
        'Flamingo.view.designer.Viewport',
        'Flamingo.view.dashboard.Viewport',
        'Flamingo.view.job.Viewport',
        'Flamingo.controller.designer.DesignerController'
    ],

    id: 'desiger-win',

    controllers: ['Flamingo.controller.designer.DesignerController'],

    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getDesginerWindow();
    },

    getDesginerWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('designer-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'designer-win',
//                title: MSG.MENU_WF_DESIGNER,
                title: 'Ankus Analyzer',
                width: 1000,
                height: 600,
                iconCls: 'icon-grid',
                closeAction: 'hide',
                animCollapse: false,
                constrainHeader: true,
                border: false,
                layout: 'fit',
                manual: MANUAL.DESIGNER,
                items: {
                    xtype: 'designerViewport'
                }
            });
            win.center().show();
        }
        win.show();
        return win;
    },

    getJobSchedulingWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('job-scheduling-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'job-scheduling-win',
                title: MSG.MENU_JOB_MANAGEMENT,
                width: 1050,
                height: 500,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                manual: MANUAL.JOB,
                items: [
                    Ext.create('Flamingo.view.job.Viewport')
                ]
            });
            win.center().show();
        }
        win.show();
        return win;
    },

    getDashboardWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dashboard-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'dashboard-win',
                title: MSG.MENU_WF_DASHBOARD,
                width: 1000,
                height: 600,
                iconCls: 'icon-grid',
                animCollapse: false,
                closeAction: 'hide',
                constrainHeader: true,
                border: false,
                layout: 'fit',
                manual: MANUAL.DASHBOARD,
                items: {
                    xtype: 'dashboardViewport'
                }
            });
            win.center().show();
        }
        win.show();
        return win;
    },

    init: function () {
        this.registControllers();

        this.launcher = {
            text: MSG.MENU_WF_MANAGEMENT,
            iconCls: 'bogus',
            handler: function () {
                return false;
            },
            menu: {
                listeners: {
                    mouseleave: function (menu, e, eOpts) {
                        Ext.getCmp('deskmenu').deactivateActiveItem();
                    }
                },
                items: [
                    {
//                        text: MSG.MENU_WF_DESIGNER,
                        text: 'Ankus Analyzer',
                        iconCls: 'bogus',
                        handler: function (src) {
                            return this.getDesginerWindow();
                        },
                        scope: this
                    },
                    {
                        text: MSG.MENU_WF_DASHBOARD,
                        iconCls: 'bogus',
                        handler: function (src) {
                            return this.getDashboardWindow();
                        },
                        scope: this
                    }
                    /*
                     ,
                     {
                     text: 'Job Scheduling',
                     iconCls: 'bogus',
                     handler: function (src) {
                     return this.getJobSchedulingWindow();
                     },
                     scope: this
                     }
                     */
                ]
            }
        };
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