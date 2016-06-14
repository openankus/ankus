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

Ext.define('Flamingo.view.desktop.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    requires: [
        'Flamingo.view.login.LoginPanel'
    ],

//    title: 'Welcome to the ankus world!',
    title: 'Big Data Analytics Platform',
    iconCls: 'ankus-small',
    width: 400,
    height: 340,
    resizable: false,
    maximizable: false,
    animCollapse: false,
    border: false,
    closeAction: 'hide',
    layout: 'fit',
    closable: false,
    modal: true,

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'loginPanel'
                }
            ],
            buttons: [
                {
                    text: 'Sign Up',
                    iconCls: 'common-add',
                    itemId: 'signUpButton'
                },
                '->',
                {
                    text: 'Sign In',
                    iconCls: 'common-confirm',
                    itemId: 'signInButton'
                },
                {
                    text: 'Reset',
                    iconCls: 'common-find-clear',
                    itemId: 'resetButton'
                }
            ]
        });

        me.callParent(arguments);
    }
});

