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

/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Flamingo.view.desktop.JobManagement', {
    extend: 'Flamingo.view.desktop.BogusModule',

    init: function () {

        this.launcher = {
            text: 'Job Management',
            iconCls: 'bogus',
            handler: function () {
                return false;
            },
            menu: {
                items: [
                    {
                        text: 'Scheduling',
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('job-scheduling-win');
                            if (!win) {
                                win = desktop.createWindow({
                                    id: 'job-scheduling-win',
                                    title: 'Job Scheduling',
                                    width: 950,
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
                        scope: this
                    },
                    {
                        text: 'History',
                        iconCls: 'bogus',
                        handler: function (src) {
                        },
                        scope: this
                    }
                ]
            }
        };
    }
});