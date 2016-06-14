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

Ext.define('Flamingo.view.desktop.Admin', {
    extend: 'Flamingo.view.desktop.BogusModule',

    requires: [
        'Flamingo.view.admin.Hadoop',
//        'Flamingo.view.admin.Hive',
        'Flamingo.view.admin.engine.Viewport',
        'Flamingo.view.admin.UserManagement'
    ],

    id: 'user-win',

    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getUserManagementWindow();
    },

    getUserManagementWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('user-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'user-win',
                title: 'User Management',
                width: 1000,
                height: 400,
                iconCls: 'icon-grid',
                closeAction: 'hide',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
//	            manual: MANUAL.HDFS_BROWSER,
                items: [
                    Ext.create('Flamingo.view.admin.UserManagement')
                ]
            });
            win.center().show();
        }
        win.show();
        return win;
    },


    init: function () {

        this.launcher = {
            text: MSG.MENU_ADMIN,
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
                        text: MSG.MENU_S_HADOOP,
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('hadoop-config-win');
                            if (!win) {
                                win = desktop.createWindow({
                                    id: 'hadoop-config-win',
                                    title: MSG.MENU_S_HADOOP,
                                    width: 900,
                                    height: 250,
                                    iconCls: 'icon-grid',
                                    animCollapse: false,
                                    constrainHeader: true,
                                    layout: 'fit',
                                    items: [
                                        Ext.create('Flamingo.view.admin.Hadoop')
                                    ]
                                });
                                win.center().show();
                            }
                        },
                        scope: this
                    },
                    /*
                     {
                     text: MSG.MENU_HIVE,
                     iconCls: 'bogus',
                     handler: function (src) {
                     var desktop = this.app.getDesktop();
                     var win = desktop.getWindow('hive-config-win');
                     if (!win) {
                     win = desktop.createWindow({
                     id: 'hive-config-win',
                     title: MSG.MENU_HIVE,
                     width: 400,
                     height: 230,
                     iconCls: 'icon-grid',
                     animCollapse: false,
                     constrainHeader: true,
                     layout: 'fit',
                     items: [
                     Ext.create('Flamingo.view.admin.Hive')
                     ]
                     });
                     win.center().show();
                     }
                     },
                     scope: this

                     },
                     {
                     // text: MSG.MENU_S_AWS,
                     text: 'Amazon Web Services',
                     iconCls: 'bogus',
                     handler: function (src) {
                     },
                     scope: this
                     },
                     */
                    {
//                        text: MSG.MENU_S_FLAMINGO,
                        text: 'Server Management',
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('admin-engine-win');
                            if (!win) {
                                win = desktop.createWindow({
                                    id: 'admin-engine-win',
//                                    title: MSG.MENU_S_FLAMINGO,
                                    title: 'Server Management - Log Collection',
                                    width: 1000,
                                    height: 550,
                                    iconCls: 'icon-grid',
                                    closeAction: 'hide',
                                    animCollapse: false,
                                    constrainHeader: true,
                                    layout: 'fit',
                                    items: [
                                        Ext.create('Flamingo.view.admin.engine.Viewport')
                                    ]
                                });
                                win.center().show();
                            }

                        },
                        scope: this
                    },
                    {
                        // text: MSG.MENU_S_USER,
                        text: 'User Management',
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('user-win');
                            if (!win) {
                                win = this.getUserManagementWindow();
                                win.center().show();
                            }
                            win.show();
                            return win;
                        },
                        scope: this
                    }
                    /*
                     ,{
                     // text: MSG.MENU_S_USER,
                     text: 'User Management',
                     iconCls: 'bogus',
                     handler: function (src) {
                     },
                     scope: this
                     },
                     {
                     // text: MSG.MENU_S_SYSTEM,
                     text: 'System Management',
                     iconCls: 'bogus',
                     handler: function (src) {
                     },
                     scope: this
                     }
                     */
                ]
            }
        };
    }
});