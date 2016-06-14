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

Ext.define('Flamingo.view.login.FindEmailPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.findEmailPanel',

    border: false,

    layout: 'border',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    border: false,
                    shadow: false,
                    layout: 'border',
                    items: [
                        {
                            region: 'north',
                            xtype: 'label',
                            height: 60,
                            style: 'background: #FFFFFF'
                        },
                        {
                            region: 'center',
                            xtype: 'displayfield',
                            value: 'Forgot your username?',
                            style: 'background: #FFFFFF',
                            fieldStyle: {
                                fontSize: '24px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                textVAlign: 'center'
                            }
                        },
                        {
                            region: 'south',
                            xtype: 'form',
                            defaultType: 'textfield',
                            collapsed: false,
                            border: false,
                            layout: 'anchor',

                            items: [
                                {
                                    xtype: 'component',
                                    html: '<div><br><br>To show your email you used to sign in to this ankus framework, enter your user name & password here.</div>',
                                    style: {
                                        fontSize: '10pt'
                                    },
                                    height: 100
                                },
                                {
                                    fieldLabel: 'Email',
                                    itemId: 'email',
                                    allowBlank: false,
                                    emptyText: 'Email',
                                    labelWidth: 65,
                                    vtype: 'email',
                                    labelSeparator: ''
                                },
                                {
                                    fieldLabel: 'Password',
                                    inputType: 'password',
                                    itemId: 'password',
                                    allowBlank: false,
                                    emptyText: 'Password',
                                    labelWidth: 65,
                                    labelSeparator: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    style: 'margin-top:5px;margin-left:78px;',
                                    itemId: 'error',
                                    fieldStyle: 'color: #FF0000'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        this.on('afterrender', this.registControllers, this);
    },

    registControllers: function () {
        Ext.each(this.controllers, function (control) {
            var controller = Flamingo.app.controllers.get(control);
            if (!controller) {
                controller = Ext.create(control, {
                    application: Flamingo.app,
                    id: control
                });
                Flamingo.app.controllers.put(control, controller);
                controller.init(); // Run init on the controller
            }
        }, this);
    }
});