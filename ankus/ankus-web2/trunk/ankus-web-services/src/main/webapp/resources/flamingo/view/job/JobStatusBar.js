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

/**
 * Workflow Designer : StatusBar View
 *
 * @class
 * @extends Ext.ux.statusbar.StatusBar
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.job.JobStatusBar', {
    extend: 'Ext.ux.statusbar.StatusBar',
    alias: 'widget.jobStatusBar',

    defaultText: MSG.COMMON_READY,
    defaultIconCls: 'x-status-valid',
    text: MSG.COMMON_READY,
    iconCls: 'x-status-valid',
    height: 25,
    listeners: {
        render: function (statusbar) {
        }
    }
});