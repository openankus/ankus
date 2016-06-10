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

Ext.define('Flamingo.view.desktop.Admin', {
    extend: 'Flamingo.view.desktop.BogusModule',
    alias: 'widget.Admin',

    requires: [
        'Flamingo.view.admin.Hadoop',
        'Flamingo.view.admin.engine.Viewport',
        'Flamingo.view.admin.UserManagement',
        'Flamingo.view.desktop.MRJAREdit'
    ],

    id: 'user-win',
    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getUserManagementWindow();
    },

    getUserManagementWindow: function () {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('user-win');
        if (!win) {
            win = desktop.createWindow({
                id: 'user-win',
                title: MSG.MENU_USER_MANAGEMENT,
                width: 1000,
                height: 400,
                iconCls: 'desktop-usermgr-small',
                closeAction: 'hide',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
//	            manual: MANUAL.HDFS_BROWSER,
                items: [
                    Ext.create('Flamingo.view.admin.UserManagement')
                ]
            });
            win.center().show();
        }
        win.show();
        return win;
    },


    init: function () {

        this.launcher = {
            text: MSG.MENU_ADMIN,
            iconCls: 'bogus',
            handler: function () {
                return false;
            },
            menu: {
                listeners: {
                    mouseleave: function (menu, e, eOpts) {
                        Ext.getCmp('deskmenu').deactivateActiveItem();
                    }
                },
                items: [
                    {
                        text: MSG.MENU_S_HADOOP,
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('hadoop-config-win');
                            console.info(win);
                            if (!win) {
                                win = desktop.createWindow({
                                    id: 'hadoop-config-win',
                                    title: MSG.MENU_S_HADOOP,
                                    width: 900,
                                    height: 250,
                                    iconCls: 'icon-grid',
                                    animCollapse: false,
                                    constrainHeader: true,
                                    layout: 'fit',
                                    items: [
                                        Ext.create('Flamingo.view.admin.Hadoop')
                                    ]
                                });
                                win.center().show();
                            }
                        },
                        scope: this
                    }, 
                    {
                        text: 'Server Management',
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('admin-engine-win');
                            if (!win) {
                                win = desktop.createWindow({
                                    id: 'admin-engine-win',
                                    title: 'Server Management - Log Collection',
                                    width: 1000,
                                    height: 550,
                                    iconCls: 'icon-grid',
                                    closeAction: 'hide',
                                    animCollapse: false,
                                    constrainHeader: true,
                                    layout: 'fit',
                                    items: [
                                        Ext.create('Flamingo.view.admin.engine.Viewport')
                                    ]
                                });
                                win.center().show();
                            }

                        },
                        scope: this
                    },
                    {
                        // text: MSG.MENU_S_USER,
                        text: 'User Management',
                        iconCls: 'bogus',
                        handler: function (src) {
                            var desktop = this.app.getDesktop();
                            var win = desktop.getWindow('user-win');
                            if (!win) {
                                win = this.getUserManagementWindow();
                                win.center().show();
                            }
                            win.show();
                            return win;
                        },
                        scope: this
                    },
                    {
                        // text: MSG.MENU_S_USER,
                        text: 'Core Version Setting',
                        iconCls: 'bogus',                                                
                        handler: function (src) { 
                        	var desktop = this.app.getDesktop();                         
                            var win = desktop.getWindow('mrjaredit-win');    
                            if (!win) {
                                win = desktop.createWindow({
                                    id: 'mrjaredit-win',                                 
                                    title: 'Core Version Setting',
                                    width: 345,
                                    height: 260,
                                    iconCls: 'icon-grid',
                                    closeAction: 'hide',
                                    animCollapse: false,
                                    constrainHeader: true,
                                    layout: 'fit',
                                    items: [                                                                   
                                        	 Ext.create('Flamingo.view.desktop.MRJAREdit')                                                                           
                                    ],
                                    buttons: [ 
                                           
                                          
                                        {
                                        	text: 'Cache Clear', 
	                        				iconCls: 'common-delete',	
	                        				handler: function () {                                           	
                                               var popWindow = Ext.create('Ext.Window',
                                               {             
                                            	   title: 'Cache Clear',
                                                   width: 380,
                                                   height: 110,
                                                   modal: true,
                                                   resizable: false,
                                                   constrain: true,
                                                   layout: 'fit',
                                                   id:'CacheClear',
                                                   items:  
                                                   {
                                                	   xtype: 'form',                                                    
                                                       border: false,
                                                       bodyPadding: 10,
                                                       defaults:
                                                       {anchor:'100%',labelWidth:120},
                                                       items:[
	                                                        {
																xtype: '_workflowEngineCombo',
																fieldLabel: 'Engine',	                               								
																labelWidth: 40,
																filter: 'HADOOP',																
																listeners: {
																	select :function(combo, value){
																		var str_select = combo.getValue();																		
																		Ext.getCmp('cache_engine_id').setValue(str_select);
																	}
																}
															},                                                       
															{
																xtype: 'hidden',
																id: 'cache_engine_id',
																itemId: 'cache_engine_id',
																name: 'engineid',	                                                           
																allowBlank: false,
																
															}
                                                        ]
                                                   },
                                                   buttons: [
                                                             {
                                                             	//추가 버튼 클릭
                                                                 text: MSG.COMMON_OK,
                                                                 iconCls: 'common-confirm',
                                                                 handler: function () 
                                                                 { 
                                                                	 var str_engine = Ext.getCmp('cache_engine_id').getValue();                                                                	 
                                                                	 if(str_engine == null  || str_engine == undefined || str_engine == ''){
                                                                		 msg(MSG.COMMON_WARN, 'Please select the engine');
                                                                		 return;
                                                                	 }
                                                                	 
                                                                	 Ext.MessageBox.show({
                                                                         title: 'Cache Clear',                      
                                                                     	 msg: 'Do you want to clear the stored cache?',
                                                                         width: 300,
                                                                         buttons: Ext.MessageBox.YESNO,
                                                                         icon: Ext.MessageBox.INFO,
                                                                         scope: this,
                                                                         fn: function (btn, text, eOpts) {
                                                                        	 if (btn === 'yes') {
                                                                        		 var win = popWindow;                                                            	   
                                                                                 Ext.Ajax.request({
                                                                              	    url:'/designer/cacheClear',                                                                  	
                                                              						method:'GET',
                                                              						params:{  
                                     	                                                'engineId': Ext.getCmp('cache_engine_id').getValue()
                                                              						},
                                                              						success:function( result, request )
                                                              						{
                                                              							console.info(result.responseText);                                                              							
                                                              							Ext.Msg.alert( "Success", "Cache has been cleared" );
                                                              							win.close();  
                                                              						},
                                                              						failure: function( result, request ){
                                                              							Ext.Msg.alert( "Failed", "Not connected Engine");
                                                              						}      	                         				
                                                                    	      	});                                                    
                                                                        	 }
                                                                         }                                                                             
                                                                	 });
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
                                           }
                                        },     
                              
                                        
	                    				{
	                        				text: 'Apply', 
	                        				iconCls: 'common-confirm',
	                        				handler: function ()
                        					{	   
	                        					var grid = Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0];
	                        					var selection = grid.getSelectionModel().getSelection()[0];  	
	                        					console.info("A CORE " + selection.data.CODE);
                                        
	                        					if(selection.data.CODE == null){
	                        						Ext.Msg.alert("Warning", "Codename is empty");
	                        						return;
		                        				}else{                        	
		                        	  				Ext.Ajax.request({
		                								url:'/mrjar/get',
		                								method:'GET',
		                								params:{                					 
		                					 				'method':'update', 
		                					 				'code': selection.data.CODE,                					 				                                      
		                					 				'state':'Y'                					 
		                								},
		                								success:function( result, request )
		                								{
		                									console.info(result);
		                									Ext.Msg.alert( "Success", "Core version change successfully " );
		                									//win.close();
		                									Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0].getStore().load();
		                								},
		                								failure: function( result, request ){
		                									Ext.Msg.alert( "Failed", result.responseText );
		                								}      	                         				
		                      	      				});
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
                                });                                
                             	win.show();
                             }                                                        
                        },
                        
                        scope: this                        
                    }                    
                ]
            }
        };
    }
});
