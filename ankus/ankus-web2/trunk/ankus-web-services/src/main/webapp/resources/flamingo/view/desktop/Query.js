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

Ext.define('Flamingo.view.desktop.Query', {
    extend: 'Flamingo.view.desktop.BogusModule',
    alias: 'widget.hive',

    requires: [
        'Flamingo.view.hive.editor.HiveQueryEditorViewport',
        'Flamingo.view.pig.PigEditorViewport'
    ],

    id: 'query-win',

    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getQueryEditorWindow();
    },

    getPigEditorWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('pig-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'pig-win',
                title: MSG.MENU_PIG_EDITOR,
                width: 800,
                height: 550,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                manual: MANUAL.PIG,
                items: [
                    Ext.create('Flamingo.view.pig.PigEditorViewport')
                ]
            });
            win.center().show();
        }
        win.show();
        return win;
    },

    getQueryEditorWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('hive-query-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'hive-query-win',
                title: MSG.MENU_HIVE_EDITOR,
                width: 1010,
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

    init: function () {
        this.launcher = {
            text: MSG.MENU_QUERY,
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
                        text: MSG.MENU_HIVE_EDITOR,
                        iconCls: 'bogus',
                        handler: function (src) {
                            return this.getQueryEditorWindow();
                        },
                        scope: this
                    },
                    {
                        text: MSG.MENU_PIG_EDITOR,
                        iconCls: 'bogus',
                        handler: function (src) {
                            return this.getPigEditorWindow();
                        },
                        scope: this
                    }
                ]
            }
        };
    }
});