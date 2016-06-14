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

Ext.define('Flamingo.view.desktop.Hive', {
    extend: 'Flamingo.view.desktop.BogusModule',
    alias: 'widget.hive',

    requires: [
        'Flamingo.view.hive.editor.HiveQueryEditorViewport'
    ],

    id: 'hive-query-win',

    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getQueryEditorWindow();
    },

    getQueryEditorWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('hive-query-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'hive-query-win',
                title: 'Hive Query Editor',
                width: 800,
                height: 550,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                manual: MANUAL.HIVE,
                items: {
                    xtype: 'hiveQueryEditorViewport'

                }
            });
            win.center().show();
        }
        win.show();
        return win;
    },

    getMetastoreBrowserWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('hive-metabrowser-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'hive-metabrowser-win',
                title: 'Hive Metastore Browser',
                width: 700,
                height: 350,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                manual: 'http://wiki.opencloudengine.org/display/F1D/Apache+Hive',
                items: {
                    xtype: 'hiveMetastoreBrowserViewport'
                }
            });
            win.center().show();
        }
        win.show();
        return win;
    },

    init: function () {
        this.launcher = {
            text: 'Apache Hive',
            iconCls: 'bogus',
            handler: function () {
                return false;
            },
            menu: {
                items: [
                    {
                        text: 'Hive Query Editor',
                        iconCls: 'bogus',
                        handler: function (src) {
                            return this.getQueryEditorWindow();
                        },
                        scope: this
                    }
                    /*
                     ,
                     {
                     text: 'Hive Metastore Browser',
                     iconCls: 'bogus',
                     handler: function (src) {
                     return this.getMetastoreBrowserWindow();
                     },
                     scope: this
                     }
                     */
                ]
            }
        };
    }
});