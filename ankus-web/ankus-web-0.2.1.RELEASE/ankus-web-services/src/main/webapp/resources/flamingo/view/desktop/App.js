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

Ext.define('Flamingo.view.desktop.App', {
    extend: 'Flamingo.view.desktop.ux.App',
    alias: 'widget.app',

    requires: [
        'Ext.window.MessageBox',
        'Flamingo.view.desktop.ux.ShortcutModel',
        'Flamingo.view.desktop.Dashboard',
        'Flamingo.view.desktop.Designer',
        'Flamingo.view.desktop.BogusModule',
        'Flamingo.view.desktop.About',
        'Flamingo.view.desktop.Admin',
        'Flamingo.view.desktop.Settings',
        'Flamingo.view.desktop.FileSystem'
    ],

    init: function () {
        this.callParent(arguments);

        if (!(Ext.isIE10 || Ext.isChrome || Ext.isSafari)) {
            log('Error', 'Not supported web browser.');
        }
    },

    getModules: function () {

        var sessionAuthority = Ext.util.Cookies.get("Authority");
        if (sessionAuthority === CONSTANTS.AUTH_ROLE_USER) {
            return [
                Ext.create('Flamingo.view.desktop.About'),
                Ext.create('Flamingo.view.desktop.Designer'),
                Ext.create('Flamingo.view.desktop.Dashboard'),
                Ext.create('Flamingo.view.desktop.FileSystem')
            ];
        } else {
            return [
                Ext.create('Flamingo.view.desktop.About'),
                Ext.create('Flamingo.view.desktop.Designer'),
                Ext.create('Flamingo.view.desktop.Dashboard'),
                Ext.create('Flamingo.view.desktop.FileSystem'),
                Ext.create('Flamingo.view.desktop.Admin')
            ];
        }
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
        var sessionAuthority = Ext.util.Cookies.get("Authority");

        console.log('sessionAuthority...')
        console.log(sessionAuthority)


        // Check user authority - are you admin? you can change authority anyone to the user management menu
        if (sessionAuthority === CONSTANTS.AUTH_ROLE_USER) {
            return Ext.apply(ret, {
                contextMenuItems: [
                    { text: MSG.DESKTOP_CHANGE_SETTINGS, handler: me.onSettings, scope: me }
                ],

                shortcuts: Ext.create('Ext.data.Store', {
                    model: 'Flamingo.view.desktop.ux.ShortcutModel',
                    data: [
                        { name: 'Ankus Analyzer', iconCls: 'desktop-workflow', module: 'designer-win'},
                        { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard', module: 'dashboard-win'},
                        { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs', module: 'fs-hdfs-win'}
                    ]
                }),

                wallpaper: CONSTANTS.DEFAULT_WALLPAPER,
                wallpaperStretch: true
            });
        } else {
            return Ext.apply(ret, {
                contextMenuItems: [
                    { text: MSG.DESKTOP_CHANGE_SETTINGS, handler: me.onSettings, scope: me }
                ],

                shortcuts: Ext.create('Ext.data.Store', {
                    model: 'Flamingo.view.desktop.ux.ShortcutModel',
                    data: [
                        { name: 'Ankus Analyzer', iconCls: 'desktop-workflow', module: 'designer-win'},
                        { name: 'User Management', iconCls: 'desktop-user', module: 'user-win'},
                        { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard', module: 'dashboard-win'},
                        { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs', module: 'fs-hdfs-win'}
                    ]
                }),

                wallpaper: CONSTANTS.DEFAULT_WALLPAPER,
                wallpaperStretch: true
            });
        }
    },

    // config for the start menu
    getStartConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'User',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    /*
                     {
                     text: MSG.COMMON_SETTING,
                     iconCls: 'settings',
                     handler: me.onSettings,
                     scope: me
                     },
                     '-',
                     */
                    {
                        text: MSG.COMMON_SIGNOUT,
                        iconCls: 'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();
        var sessionAuthority = Ext.util.Cookies.get("Authority");

        if (sessionAuthority === CONSTANTS.AUTH_ROLE_USER) {
            return Ext.apply(ret, {
                width: 100,
                quickStart: [
                    //                { name: MSG.DESKTOP_HIVE_EDITOR, iconCls: 'icon-grid', module: 'hive-query-win' },
                    { name: 'Ankus Analyzer', iconCls: 'desktop-workflow-small', module: 'designer-win' },
                    { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard-small', module: 'dashboard-win' },
                    { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs-small', module: 'fs-hdfs-win' }
                ],
                trayItems: [
                    { xtype: 'trayclock', flex: 1 }
                ]
            });
        } else {
            return Ext.apply(ret, {
                width: 100,
                quickStart: [
                    //                { name: MSG.DESKTOP_HIVE_EDITOR, iconCls: 'icon-grid', module: 'hive-query-win' },
                    { name: 'Ankus Analyzer', iconCls: 'desktop-workflow-small', module: 'designer-win' },
                    { name: 'User Management', iconCls: 'desktop-user-small', module: 'user-win' },
                    { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard-small', module: 'dashboard-win' },
                    { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs-small', module: 'fs-hdfs-win' }
                ],
                trayItems: [
                    { xtype: 'trayclock', flex: 1 }
                ]
            });
        }
    },

    onLogout: function () {
        Ext.Msg.confirm(MSG.COMMON_SIGNOUT, MSG.DIALOG_MSG_LOG_OUT,
            function (btn) {
                if (btn === 'yes') {
                    window.location = '/logout';
                }
            }
        );
    },

    onSettings: function () {
        var dlg = Ext.create('Flamingo.view.desktop.Settings', {
            desktop: this.desktop
        });
        dlg.show();
    }
});