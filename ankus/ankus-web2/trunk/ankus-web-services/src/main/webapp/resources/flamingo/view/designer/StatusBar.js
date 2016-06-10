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
Ext.define('Flamingo.view.designer.StatusBar', {
    extend: 'Ext.ux.statusbar.StatusBar',
    alias: 'widget.workflowStatusBar',

    defaultText: MSG.COMMON_READY,
    defaultIconCls: 'x-status-valid',
    text: MSG.COMMON_READY,
    border: false,
    iconCls: 'x-status-valid',
    items: [
        '->',
        {
            itemId: 'clock',
            xtype: 'tbtext',
            text: Ext.Date.format(new Date(), 'g:i:s A')
        }
    ],
    listeners: {
        render: function (statusbar) {
            Ext.TaskManager.start({
                run: function () {
                    Ext.fly(statusbar.getComponent('clock').getEl()).update(Ext.Date.format(new Date(), 'g:i:s A'));
                },
                interval: 1000
            });
        }
    }
});