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

Ext.define('Flamingo.view.login.LoginPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.loginPanel',

    requires: [
        'Flamingo.view.login.FindEmailPanel',
        'Flamingo.view.login.FindPassPanel'
    ],
    border: false,

    layout: 'border',

    controllers: ['Flamingo.controller.login.LoginController'],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    region: 'north',
                    layout: 'fit',
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'table',
                                columns: 3,
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
                                    height: 150,
                                    colspan: 3
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'center',
                    border: false,
                    layout: 'hbox',
                    layoutConfig: {
                        padding: '5',
                        pack: 'center',
                        align: 'middle'
                    },
                    
                    items: [
                        {
                            xtype: 'form',
                            border: false,                            
                            bodyStyle: 'padding:0px 0px 0px 100px',                            
                            fieldDefaults: {
                                msgTarget: 'side',
                                labelWidth: 75
                            },                            
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%'
                            },
                           
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: MSG.COMMON_ID,
                                    allowBlank: false,
                                    minLength: 5,
                                    vtype: 'alphanum',
                                    itemId: 'username',
                                    listeners: {
                                        afterrender: function (field) {
                                           field.focus(false, 500);
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'password',
                                    fieldLabel: MSG.COMMON_PWD,
                                    inputType: 'password',
                                    style: 'margin-top:5px',
                                    allowBlank: false,
                                    minLength: 5,
                                    itemId: 'password'                                  
                                },   
                                {
                                    xtype: 'displayfield',
                                    style: 'margin-top:5px;margin-left:78px;',
                                    itemId: 'error',
                                    fieldStyle: 'color: #FF0000'
                                },
                                {
                                xtype: 'component',
                                html: ' ',
                                height: 10
                                },
                                                                                              
                                {                               	
                                    xtype: 'box',   
                                    style:'margin-left:40px',
                                    autoEl: {tag: 'a', href: '#', html: MSG.COMMON_ID_FIND},                                        
                                    listeners: {
                                        render: function (field) {
                                            this.getEl().on('click', function (e) {
                                                var popWindow = Ext.create('Ext.Window', {
                                                    title: MSG.COMMON_ID_FIND_TITLE,
                                                    width: 380,
                                                    height: 150,
                                                    modal: true,
                                                    resizable: false,
                                                    constrain: true,
                                                    layout: 'fit',
                                                    items: {
                                                        xtype: 'form',
                                                        itemId: 'findUsernameForm',
                                                        border: false,
                                                        bodyPadding: 10,
                                                        defaults: {
                                                            anchor: '100%',
                                                            labelWidth: 120
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                name: 'email',
                                                                itemId: 'email',
                                                                fieldLabel: MSG.COMMON_EMAIL,
                                                                vType: 'email',
                                                                emptyText: MSG.COMMON_EMAIL,
                                                                allowBlank: false
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                name: 'password',
                                                                itemId: 'password',
                                                                fieldLabel: MSG.COMMON_PWD,
                                                                inputType: 'password',
                                                                emptyText: MSG.COMMON_PWD,
                                                                allowBlank: false,
                                                                minLength: 4
                                                            },
                                                            {
                                                                xtype: 'displayfield',
                                                                name: 'error',
                                                                itemId: 'error',
                                                               
                                                                fieldStyle: 'color: #FF0000'
                                                            }
                                                        ]
                                                    },
                                                    buttons: [
                                                        {
                                                            text: MSG.COMMON_OK,
                                                            iconCls: 'common-confirm',
                                                            handler: function () {
                                                                var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.FIND_USERNAME;

                                                                var email = Flamingo.Util.String.trim(popWindow.down('#email').getValue());
                                                                var password = Flamingo.Util.String.trim(popWindow.down('#password').getValue());

                                                                var param = {
                                                                    "email": email,
                                                                    "password": password
                                                                };

                                                                if (email == '') {
                                                                    popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_EMAIL);
                                                                }

                                                                if (password == '') {
                                                                    popWindow.down('#error' + '').setValue(MSG.LOGIN_NOT_INPUT_PWD);
                                                                }

                                                                Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                                    function (response) {
                                                                        var obj = Ext.decode(response.responseText);
                                                                        console.log(obj);
                                                                        if (obj.success) {
                                                                            var username = obj.object;
                                                                            popWindow.down('#error').setValue("<b>" + MSG.FIND_ID_SUCCESS.replace("%s", username) + "</b>");
                                                                        } else {
                                                                        	var code = obj.map.code;
                                                                        	if(code == -100){ // 이메일사용자없음
                                                                                popWindow.down('#error').setValue(MSG.FIND_NOT_EXIST_EMAIL);
                                                                        	}else if(code == -101){ // 비밀번호틀림
                                                                                popWindow.down('#error').setValue(MSG.LOGIN_NOT_PWD);
                                                                        	}
                                                                        }
                                                                    },
                                                                    function (response) {
                                                                        popWindow.down('#error').setValue(response.statusText);
                                                                    }
                                                                );
                                                            }
                                                        },
                                                        {
                                                            text: MSG.COMMON_CANCEL,
                                                            iconCls: 'common-cancel',
                                                            handler: function () {
                                                                var win = this.up('window');
                                                                win.close();
                                                            }
                                                        }
                                                    ]

                                                }).show();
                                            });
                                        }
                                    }                                    
                                },                                
                                {                                 	
                                    xtype: 'box',
                                    autoEl: {tag: 'a', href: '#', html: ' / ' + MSG.COMMON_PWD_FIND}, 
                                    listeners: {
                                        render: function (field) {
                                            this.getEl().on('click', function (e) {
                                                var popWindow = Ext.create('Ext.Window', {
                                                    title: MSG.COMMON_PWD_FIND_TITLE,
                                                    width: 380,
                                                    height: 150,
                                                    modal: true,
                                                    resizable: false,
                                                    constrain: true,
                                                    layout: 'fit',
                                                    items: {
                                                        xtype: 'form',
                                                        itemId: 'findPasswordForm',
                                                        border: false,
                                                        bodyPadding: 10,
                                                        defaults: {
                                                            anchor: '100%',
                                                            labelWidth: 120
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                name: 'username',
                                                                itemId: 'username',
                                                                fieldLabel: MSG.COMMON_ID,
                                                                emptyText: MSG.COMMON_ID,
                                                                allowBlank: false,
                                                                minLength: 5,
                                                                vtype: 'alphanum'
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                name: 'email',
                                                                itemId: 'email',
                                                                fieldLabel: MSG.COMMON_EMAIL,
                                                                vType: 'email',
                                                                emptyText: MSG.COMMON_EMAIL,
                                                                allowBlank: false
                                                            },
                                                            {
                                                                xtype: 'displayfield',
                                                                name: 'error',
                                                                itemId: 'error',
                                                                fieldStyle: 'color: #FF0000'
                                                            }
                                                        ]
                                                    },
                                                    buttons: [
                                                        {
                                                        	//20150205 whitepoo@onycom.com
                                                            text: MSG.COMMON_ID_FIND_OK,
                                                            iconCls: 'common-confirm',
                                                            handler: function () {
                                                                var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.FIND_PASSWORD;
                                                                var username = Flamingo.Util.String.trim(popWindow.down('#username').getValue());
                                                                var email = Flamingo.Util.String.trim(popWindow.down('#email').getValue());

                                                                var param = {
                                                                    "username": username,
                                                                    "email": email
                                                                };

                                                                if (username == '') {
                                                                    popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_ID);
                                                                }
                                                                if (email == '') {
                                                                    popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_EMAIL);
                                                                }

                                                                Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                                    function (response) {
                                                                        var obj = Ext.decode(response.responseText);
                                                                        if (obj.success) {
                                                                            var password = obj.object;
                                                                            popWindow.down('#error').setValue("<b>" + MSG.FIND_PWD_SUCCESS.replace("%s", password) + "</b>");
	                                                                    } else {
	                                                                    	var code = obj.map.code;
	                                                                    	if(code == -100){ // 아이디 및 이메일이 일치하지 않음
	                                                                            popWindow.down('#error').setValue("<b>" + MSG.FIND_PWD_NOT_UNMATCHED_ID_EMAIL+ "</b> ");
	                                                                    	}
	                                                                    }
                                                                    },
                                                                    function (response) {
                                                                        popWindow.down('#error').setValue(response.statusText);
                                                                    }
                                                                );
                                                            }
                                                        },
                                                        {
                                                            text: MSG.COMMON_CANCEL,
                                                            iconCls: 'common-cancel',
                                                            handler: function () {
                                                                var win = this.up('window');
                                                                win.close();
                                                            }
                                                        }
                                                    ]

                                                }).show();
                                            });
                                        }
                                    },                                   
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