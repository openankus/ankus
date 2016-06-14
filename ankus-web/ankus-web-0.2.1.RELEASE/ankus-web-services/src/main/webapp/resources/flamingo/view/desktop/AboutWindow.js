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

Ext.define('Flamingo.view.desktop.AboutWindow', {
    extend: 'Flamingo.view.desktop.ux.Module',

    windowId: 'about-window',

    tipWidth: 160,
    tipHeight: 96,

    init: function () {
        this.launcher = {
            text: MSG.MENU_ABOUT,
            iconCls: 'video'
        }
    },

    createWindow: function () {
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                id: me.windowId,
                title: MSG.MENU_ABOUT,
                width: 450,
                height: 340,
                resizable: false,
                maximizable: false,
                iconCls: 'video',
                animCollapse: false,
                border: false,
                manual: MANUAL.ABOUT,
                layout: 'fit',
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {
                                    width: '100%'
                                }
                            }
                        },
                        width: '100%',
                        padding: 5,
                        border: 0,
                        style: {
                            background: '#ffffff'
                        },
                        defaults: {
                            xtype: 'displayfield',
                            cls: 'about-window-field'
                        },
                        items: [
                            {
                                xtype: 'component',
                                cls: 'about-window-logo',
                                height: 140,
                                colspan: 2
                            },
                            {
                                fieldLabel: MSG.COMMON_VERSION,
                                labelWidth: 45,
                                value: '<b>' + config.version + ' (rev ' + config.revision_number + ')</b>',
                                tdAttrs: {
                                    align: 'center'
                                },
                                colspan: 2
                            },
                            {
                                fieldLabel: MSG.COMMON_BUILD_NUMBER,
                                labelWidth: 80,
                                value: '<b>' + config.build_number + ' (' + new Date(config.build_timestamp).toDateString() + ')</b>',
                                tdAttrs: {
                                    align: 'center'
                                },
                                colspan: 2
                            },
                            {
                                colspan: 2
                            },
                            {
                                value: '<a href="' + MANUAL.SITE + '" target="_blank">' + MSG.COMMON_OFFICIAL + '</a>',
                                tdAttrs: {
                                    align: 'center'
                                }
                            },
                            {
                                value: '<a href="' + MANUAL.JIRA + '" target="_blank">' + MSG.COMMON_ISSUE + '</a>',
                                tdAttrs: {
                                    align: 'center'
                                }
                            },
                            {
                                value: '<a href="' + MANUAL.WIKI + '" target="_blank">' + MSG.COMMON_WIKI + '</a>',
                                tdAttrs: {
                                    align: 'center'
                                }
                            },
                            {
                                value: '<a href="' + MANUAL.CI + '" target="_blank">' + MSG.COMMON_BUILD_SERVER + '</a>',
                                tdAttrs: {
                                    align: 'center'
                                }
                            },
                            {
                                colspan: 2
                            },
                            {
                                value: config.copyright,
                                tdAttrs: {
                                    align: 'center'
                                },
                                colspan: 2
                            }
                        ]
                    }
                ]
            });
        }

        return win;
    }
});

