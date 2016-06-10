/**
 * Copyright (C) 2011  ankus Framework (http://www.openankus.org).
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

//20150205 whitepoo@onycom.com
/*
 User information edit
 */
Ext.define('Flamingo.view.desktop.AccountEdit', {
    extend: 'Flamingo.view.desktop.ux.Module',

    windowId: 'accountedit-window',

    tipWidth: 160,
    tipHeight: 96,
	id:'accountedit-win',
	
    init: function () {
        this.launcher = {
            text: MSG.MENU_MY_INFO,//start button icon text
            iconCls: 'bogus'
        }
    },

    createWindow: function () {
        var me = this, 
        desktop = me.app.getDesktop(),        
        win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                title: MSG.MENU_MY_INFO,
                width: 340,
                height: 250,
                modal: true,
                resizable: false,
                constrain: true,
                layout: 'fit',
                iconCls: 'desktop-user-small',
                id:'Edit Account',
                items:
                {
                    xtype: 'form',
                    itemId: 'edit_accout_form',
                    id:'edit_accout_form',
                    border: false,
                    bodyPadding: 10,
                    defaults:
                    {anchor:'100%',labelWidth:120},
                    items:
                    	[
                        {
                            xtype: 'textfield',
                            name: 'name',
                            id:'user_name',
                            itemId: 'user_name',
                            fieldLabel: MSG.COMMON_ID,
                            allowBlank: false,
                            readOnly: true,
                            minLength:1                                                  
                        },
                        {
                            xtype: 'textfield',
                            name: 'name',
                            id:'name',
                            itemId: 'name',
                            fieldLabel: MSG.COMMON_NAME,
                            allowBlank: false,
                            readOnly: true,
                            minLength:1                                                  
                        },
                        ,
                        {
                            xtype: 'textfield',
                            name: 'passwd_cur',
                            id:'passwd_cur',
                            itemId: 'passwd_cur',
                            fieldLabel: MSG.COMMON_PWD_CURRENT, //현재 패스워드 입력 필드.
                            inputType: 'password',
                            allowBlank: false,
                            readOnly: false,
                            minLength:1,
                        	listeners:
                        	{
	             				specialkey: function(f,e)
	             				{
			    					if (e.getKey() == e.ENTER)
			    					{
			    						me.checkPwd(win);
			    					}
		        				},
		        				blur: function(d) {
		        					me.checkPwd(win);
            					}
	            			}                                        
                        },
                        {
                            xtype: 'textfield',
                            name: 'passwd_new',
                            id:'passwd_new',
                            itemId: 'passwd_new',
                            fieldLabel: MSG.COMMON_PWD_NEW,
                            inputType: 'password',
                            allowBlank: false,
                           	readOnly: true,
                          	disabled: true,
                            minLength:1                                                  
                        },
                        {
                            xtype: 'textfield',
                            name: 'passwd_re',
                            id:'passwd_re',
                            itemId: 'passwd_re',
                            fieldLabel: MSG.COMMON_PWD_NEW_OK,
                            inputType: 'password',
                            allowBlank: false,
                            readOnly: true,
                          	disabled: true,
                            minLength:1                                                  
                        },                        
                        {
                            xtype: 'textfield',
                            name: 'email',
                            id:'email',
                            itemId: 'email',
                            fieldLabel: MSG.COMMON_EMAIL,
                            allowBlank: false,
                            readOnly: true,
                            disabled: true,
                            minLength:1                                                  
                        }
                    ]
                },
                buttons: [
                    {
                        text: MSG.COMMON_APPLY, 
                        iconCls: 'common-confirm',
                        handler: function ()
                        {
                        	if(win.down('#email').getValue().length < 1)
                        	{
                        		Ext.Msg.alert("Warning", "E-Mail is empty");
                        		return;
                        	}
                        	if(win.down('#passwd_re').getValue().length < 1)
                        	{
                        		Ext.Msg.alert("Warning", "Password is empty");
                        		return;
                        	}
                        	else if(win.down('#passwd_new').getValue() == win.down('#passwd_re').getValue())
                        	{
                        		Ext.Ajax.request({
                					url:'/user_info/get',
                					method:'GET',
                					params:{
                					 'username':CONSTANTS.AUTH.USERNAME,
                					 'method':'update', 
                					 'name':win.down('#name').getValue(),
                					 'passwd':win.down('#passwd_re').getValue(),
                					 'email':win.down('#email').getValue()
                					},
                					success:function( result, request )
                					{
                						console.info(result);
                						Ext.Msg.alert( "Success", "User Information updated successfully " );
                						 win.close();
                					},
                					failure: function( result, request ){
                						Ext.Msg.alert( "Failed", result.responseText );
                					}      	                         				
                      	      });
                        	}
                        	else 
                        	{
                        		Ext.Msg.alert("Warning", "Please check Password");
                        	}
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

            Ext.Ajax.request({
					url:'/user_info/get',
					method:'GET',
					params:{
					 'username':CONSTANTS.AUTH.USERNAME,
					 'method':'get'
					},
					success:function( result, request )
					{
						var jsonData = Ext.JSON.decode( result.responseText );//ExtJS4       		
						if(jsonData.success == "true"){ 
					        win.down('#user_name').setValue(jsonData.data.USERNAME);
					        //win.down('#passwd').setValue(jsonData.data.PASSWD);
					        win.down('#name').setValue(jsonData.data.NAME);
					        win.down('#email').setValue(jsonData.data.EMAIL);
					    }
						else{
							console.info(result);
						}     	                       	                	     	                         	 
					},
					failure: function( result, request ){
						Ext.Msg.alert( "Failed", result.responseText );
					}      	                         				
      	      });
        }

        return win;
    }
    /**
     * 로그인 사용자 비밀번호를 체크해서 비밀번호 변경 가능 상태를 표시한다.
     */
    , checkPwd:function(win){
    	var cur_pwd = win.down('#passwd_cur').getValue();
		var user_id = win.down('#user_name').getValue();
		
		Flamingo.Ajax.Request.invokeGet('/edit_authenticate', { 'id':user_id, 'passwd':cur_pwd },
    		function (response) 
    		{
        		var jsonData = Ext.decode(response.responseText);
        		
        		if(jsonData.success == true){
        				win.down('#passwd_new').setDisabled(false);
        				win.down('#passwd_re').setDisabled(false);
        				win.down('#email').setDisabled(false);
        				
        				win.down('#passwd_new').setReadOnly(false);
        				win.down('#passwd_re').setReadOnly(false);
        				win.down('#email').setReadOnly(false);
        		}else{
        			var code = jsonData.map.code;
        			if(code == -100){ // 비밀번호 입력정보 없음
        			}else if(code == -101){ // 비밀번호 틀림
        				Ext.Msg.alert("Warning", MSG.LOGIN_NOT_PWD);
        			}
        			win.down('#passwd_new').setDisabled(true);
    				win.down('#passwd_re').setDisabled(true);
    				win.down('#email').setDisabled(true);
    				
    				win.down('#passwd_new').setReadOnly(true);
    				win.down('#passwd_re').setReadOnly(true);
    				win.down('#email').setReadOnly(true);
        		}	
        		
    		}
    	);
    }
});

