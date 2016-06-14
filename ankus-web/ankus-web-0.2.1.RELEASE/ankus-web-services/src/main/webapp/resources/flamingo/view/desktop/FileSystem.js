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

Ext.define('Flamingo.view.desktop.FileSystem', {
    extend: 'Flamingo.view.desktop.BogusModule',

    requires: [
        'Flamingo.view.fs.hdfs.Viewport',
        'Flamingo.view.fs.audit.AuditHistory',
        'Flamingo.view.designer.Viewport',
        'Flamingo.view.dashboard.Viewport'
    ],

    id: 'fs-hdfs-win',

    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getFileSystemWindow();
    },

    getFileSystemWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('fs-hdfs-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'fs-hdfs-win',
                title: MSG.MENU_FS_HDFS_BROWSER,
                width: 950,
                height: 450,
                iconCls: 'desktop-hdfs-small',
                closeAction: 'hide',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
//	            manual: MANUAL.HDFS_BROWSER,
                items: [
                    Ext.create('Flamingo.view.fs.hdfs.Viewport')
                ]
            });
            win.center().show();
        }
        win.show();
        return win;
    },

    init: function () {
        this.launcher = {
            text: MSG.MENU_FS_MANAGEMENT,
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
                        text: MSG.MENU_FS_HDFS_BROWSER,
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('fs-hdfs-win');
                            if (!win) {
                                win = this.getFileSystemWindow();
                                win.center().show();
                            }
                            win.show();
                            return win;
                        },
                        scope: this
                    },
                    {
                        text: MSG.MENU_FS_HDFS_AUDIT,
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('fs-audit-win');
                            if (!win) {
                                win = desktop.createWindow({
                                    id: 'fs-audit-win',
                                    title: MSG.MENU_FS_HDFS_AUDIT,
                                    width: 1000,
                                    height: 600,
                                    iconCls: 'icon-grid',
                                    animCollapse: false,
                                    border: false,
                                    constrainHeader: true,
                                    layout: 'fit',
                                    manual: MANUAL.HDFS_AUDIT,
                                    items: [
                                        Ext.create('Flamingo.view.fs.audit.AuditHistory')
                                    ]
                                });
                                win.center().show();
                            }
                            win.show();
                            return win;
                        },
                        scope: this
                    }
                    /*
                     ,
                     {
                     text: 'Amazon S3 Browser',
                     iconCls: 'bogus',
                     handler: function (src) {
                     },
                     scope: this
                     },
                     {
                     text: 'Workflow Engine File System Browser',
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