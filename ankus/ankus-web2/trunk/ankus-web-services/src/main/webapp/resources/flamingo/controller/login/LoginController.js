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

Ext.define('Flamingo.controller.login.LoginController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.loginController',

    requires: [
        'Flamingo.view.desktop.Login',
        'Flamingo.view.login.LoginPanel'
    ],

    init: function () {
        log('Initializing Login Controller');

        this.control({
            'login #signInButton': {
                click: this.onSignInButtonClick
            },
            'login #signUpButton': {
                click: this.onSignUpButtonClick
            },
            'login #resetButton': {
                click: this.onResetButtonClick
            },
            'loginPanel #password': {
                specialkey: this.onEnterSpecialkey
            }
        });

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched Login Controller');
    },

    /**
     * Do login when press enter key on password field.
     *
     * @param f Field
     * @param e Event
     */
    onEnterSpecialkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSignInButtonClick();
        }
    },

    /**
     * Clear username and password field when press reset button.
     */
    onResetButtonClick: function () {
        var panel = Ext.ComponentQuery.query('login')[0];
        var username = panel.query('#username')[0].setValue('');
        var password = panel.query('#password')[0].setValue('');
    },

    /**
     * Do login when press signin button.
     */
    onSignInButtonClick: function () {
        var panel = Ext.ComponentQuery.query('login')[0];
        var username = panel.query('#username')[0].getValue();
        var password = panel.query('#password')[0].getValue();

        var params = {
            username: username,
            password: password
        };

        invokePostByMap(CONSTANTS.CONTEXT_PATH + CONSTANTS.USER.AUTH, params,
            function (response) {
                var obj = Ext.decode(response.responseText);

                if (obj.success) {
                    window.location.href = CONSTANTS.CONTEXT_PATH + '/login.do';
                } else {
                	var code = obj.map.code;
                	var message;
                	if(code == -100){ // 아이디,비번입력값 없음
                		message = MSG.LOGIN_NOT_INPUT;
                	}else if(code == -101){ // 등록된 사용자 아님
                		message = MSG.LOGIN_NOT_USER;
                	}else if(code == -102){ // 권한 없는사용자
                		message = MSG.LOGIN_NOT_PERMISSION;
                	}else if(code == -103){ // 비밀번호틀림
                		message = MSG.LOGIN_NOT_PWD;
                	}else if(code == -104){ // DB연결 오류
                		message = MSG.LOGIN_NOT_DB;
                	}else if(code == -105){ // 인증과정문제
                		message = MSG.LOGIN_NOT_FAIL;
                	}else{
                		message = MSG.LOGIN_NOT_FAIL;
                	}
                	Ext.MessageBox.show({
                        title: '',
                        msg: message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        fn: function handler(btn) {
                        }
                    });
                }
            },
            function (response) {
                console.log(response.statusText);
            }
        )
    },

    /**
     * Do sign up when press signup button.
     * @auth shjeon
     * @date 2014.2.3
     */
    onSignUpButtonClick: function () {
//        var signUp = Ext.get('signUpWindow');
//        if (!signUp) {
//            signUp = Ext.create('Flamingo.view.login.popup.SignUpWindow');
//        }
//        signUp.show();

        var popWindow = Ext.create('Ext.Window', {
            title: MSG.COMMON_SIGNUP,
            width: 430,
            height: 240,
            modal: true,
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: {
                xtype: 'form',
                itemId: 'signUpForm',
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
                        xtype: 'textfield',
                        name: 'check_password',
                        itemId: 'check_password',
                        fieldLabel: MSG.COMMON_PWD_RE,
                        inputType: 'password',
                        emptyText: MSG.COMMON_PWD_RE,
                        allowBlank: false,
                        minLength: 4
                    },
                    {
                    	layout : 'hbox',
                    	border: false,
                    	items: [
							{
							    xtype: 'label',
							    width: 125,
							    text: MSG.JOIN_NOTI_LABEL,
							},
							{
								layout : 'vbox',
								border: false,
		                    	items: [
	    							{
	    							    xtype: 'label',
	    							    text: MSG.JOIN_NOTI,
	    							},
	    							{
	    							    xtype: 'label',
	    							    text: MSG.JOIN_NOTI_2,
	    							}
    							]
							}
        		        ]
                    },
                    // view message
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
                        var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.SIGNUP;

                        var username = Flamingo.Util.String.trim(popWindow.down('#username').getValue());
                        var email = Flamingo.Util.String.trim(popWindow.down('#email').getValue());
                        var password = Flamingo.Util.String.trim(popWindow.down('#password').getValue());
                        var check_password = Flamingo.Util.String.trim(popWindow.down('#check_password').getValue());
                        var error = Flamingo.Util.String.trim(popWindow.down('#error').getValue());
                        var language = Ext.util.Cookies.get("language");

                        var param = {
                            "username": username,
                            "email": email,
                            "password": password,
                            "language": language
                        };

                        if (username == '') {
                            popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_ID);
                            return;
                        }
                        if (email == '') {
                            popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_EMAIL);
                            return;
                        }

                        if (password == '') {
                            popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_PWD);
                            return;
                        }

                        if (check_password == '') {
                            popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_PWD_RE);
                            return;
                        }
                        else if (password != check_password) {
                            popWindow.down('#error').setValue(MSG.LOGIN_NOT_INPUT_PWD_UNMATCHED);
                            return;
                        }


                        Flamingo.Ajax.Request.invokePostByMap(url, param,
                            function (response) {
                                var obj = Ext.decode(response.responseText);

                                if (obj.success){
                                    Ext.MessageBox.show({
                                        title: 'Welcome',
//                                        msg: "Congratulations! Welcome to the ankus framework! ['" + param.username + "'] ",
                                        msg: MSG.JOIN_SUCCESS,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING,
                                        fn: function handler(btn) {
                                        	popWindow.close();
                                        }
                                    });
//                                    Flamingo.Util.String.trim(popWindow.down('#error').setValue("Congratulation! '"+param.username+"' became a member of this site!"));
                                    popWindow.close();

                                } else {
                                	var code = obj.map.code;
                                	if(code == -100){ // 아이디존재
                                		popWindow.down('#error').setValue(MSG.JOIN_EXIST_ID);
                                	}else if(code == -101){ // 이메일존재
                                		popWindow.down('#error').setValue(MSG.JOIN_EXIST_EMAIL);
                                	}
                                }
                            },
                            function (response) {
                                Flamingo.Util.String.trim(popWindow.down('#error').setValue(response.statusText));
//                                console.log(response.statusText);
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
    },

    redundancyCheckOnUserName: function (userNm) {

    },
    validateEmail: function () {

    },
    validatePass: function () {

    },
    validateSignUp: function () {

    }
});