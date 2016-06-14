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

var windowIndex = 0;

Ext.define('Flamingo.view.desktop.BogusModule', {
    extend: 'Flamingo.view.desktop.ux.Module',

    init: function () {
        this.launcher = {
            text: 'Window ' + (++windowIndex),
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this,
            windowId: windowIndex
        }
    },

    createWindow: function (src) {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bogus' + src.windowId);
        if (!win) {
            win = desktop.createWindow({
                id: 'bogus' + src.windowId,
                title: src.text,
                width: 640,
                height: 480,
                html: '<p>Something useful would be in here.</p>',
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true
            });
        }
        win.show();
        return win;
    }
});