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

Ext.define('Flamingo.view.desktop.Notepad', {
    extend: 'Flamingo.view.desktop.ux.Module',

    requires: [
        'Ext.form.field.HtmlEditor'
        //'Ext.form.field.TextArea'
    ],

    id: 'notepad',

    init: function () {
        this.launcher = {
            text: 'Notepad',
            iconCls: 'notepad'
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('notepad');
        if (!win) {
            win = desktop.createWindow({
                id: 'notepad',
                title: 'Notepad',
                width: 600,
                height: 400,
                iconCls: 'notepad',
                animCollapse: false,
                border: false,
                //defaultFocus: 'notepad-editor', EXTJSIV-1300

                // IE has a bug where it will keep the iframe's background visible when the window
                // is set to visibility:hidden. Hiding the window via position offsets instead gets
                // around this bug.
                hideMode: 'offsets',

                layout: 'fit',
                items: [
                    {
                        xtype: 'htmleditor',
                        //xtype: 'textarea',
                        id: 'notepad-editor',
                        value: ''
                    }
                ]
            });
        }
        return win;
    }
});
