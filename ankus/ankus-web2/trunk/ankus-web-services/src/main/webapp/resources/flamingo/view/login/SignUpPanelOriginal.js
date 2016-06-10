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

Ext.define('Flamingo.view.login.SignUpPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.signUpPanel',
    id: 'signUpPanel',
    border: false,
    layout: 'border',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'center',
                    border: false,
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
                            value: 'Sign Up',
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
                            xtype: 'panel',
                            border: false,

                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },

                            items: [
                                {
                                    xtype: 'form',
                                    defaultType: 'textfield',
                                    collapsed: false,
                                    border: false,
                                    flex: 1,
                                    layout: 'anchor',

                                    items: [
                                        {
                                            fieldLabel: 'Username',
                                            itemId: 'username',
                                            allowBlank: false,
                                            emptyText: 'Username',
                                            labelWidth: 65,
                                            minLength: 5,
                                            vtype: 'alphanum',
                                            labelSeparator: ''
                                        },
                                        {
                                            fieldLabel: 'E-mail',
                                            itemId: 'email',
                                            vtype: 'email',
                                            allowBlank: false,
                                            emptyText: 'Email',
                                            labelWidth: 65,
                                            labelSeparator: ''
                                        },
                                        {
                                            colspan: 2,
                                            fieldLabel: ' ',
                                            labelSeparator: '',
                                            itemId: 'check_email',
                                            vtype: 'email',
                                            allowBlank: false,
                                            emptyText: 'Re email',
                                            labelWidth: 65
                                        },
                                        {
                                            fieldLabel: 'Password',
                                            inputType: 'password',
                                            itemId: 'password',
                                            minLength: 12,
                                            maxLength: 255,
                                            allowBlank: false,
                                            emptyText: 'Password',
                                            labelWidth: 65,
                                            labelSeparator: ''
                                        },
                                        {
                                            fieldLabel: ' ',
                                            labelSeparator: '',
                                            inputType: 'password',
                                            itemId: 'check_password',
                                            minLength: 12,
                                            maxLength: 255,
                                            allowBlank: false,
                                            emptyText: 'enter password again.',
                                            labelWidth: 65

//                                            handler: this.checkPasswordInput()
                                        },
                                        {
                                            xtype: 'displayfield',
                                            style: 'margin-top:5px;margin-left:78px;',
                                            itemId: 'error',
                                            fieldStyle: 'color: #FF0000'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'form',
                                    defaultType: 'textfield',
                                    collapsed: false,
                                    border: false,
                                    flex: 1,
                                    layout: 'anchor',

                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'username_error',
                                            fieldStyle: 'color: #FF0000'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'email_error',
                                            fieldStyle: 'color: #FF0000'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'check_email_error',
                                            fieldStyle: 'color: #FF0000'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'password_error',
                                            fieldStyle: 'color: #FF0000'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'check_password_error',
                                            fieldStyle: 'color: #FF0000'
                                        }
                                    ]
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