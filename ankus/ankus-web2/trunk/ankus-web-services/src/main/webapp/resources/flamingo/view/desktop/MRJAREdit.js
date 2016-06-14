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

Ext.define('Flamingo.view.desktop.MRJAREdit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.adminHadoopPanel',
    layout: 'fit',
    border: false,	
    requires: [
               'Flamingo.view.component._StatusBar'                
           ],
    initComponent: function (){
        var me = this; 
       
        var requestsStore= Ext.create('Flamingo.store.admin.CoreVersionStore', {
            autoLoad: true                          
        });     
        
        this.items = [
                      {
                      xtype: 'grid',
                      itemId: 'mrjaredit-win',                    
                      store: requestsStore,                     
                      viewConfig: {
                          columnLines: true,
                         stripeRows: false,
                         trackOver: false,
                          getRowClass: function(data, rowIndex, rowParams, store) {
                        	     var val = data.get('STATE') ;                        	    
                        	     if(val == "Y"){                        	    	
                        	    	 return  'state-check';
                        	     }                               
                           }
                      }, 
                      columns: [     
                                 {                                   	 
                                     text: 'GROUP NAME',
                                     id: 'group',
                                     width: 110, 
                                     dataIndex: 'GROUP',
                                     sortable: false,
                                     align: 'center'                                     
                                 },
                                 {                                   	 
                                     text: 'ARTIFACT NAME',
                                     id: 'artifact',
                                     width: 110, 
                                     dataIndex: 'ARTIFACT',
                                     sortable: false,
                                     align: 'center'                                     
                                 },
                                 {                                   	 
                                     text: 'VERSION',
                                     id: 'version',
                                     width: 110, 
                                     dataIndex: 'VERSION',
                                     sortable: false,
                                     align: 'center'                                     
                                 },
                                 {
                                 	text: 'code',
                                 	id : 'code',
                                      width: 25, 
                                      dataIndex: 'CODE',
                                      sortable: false,
                                      hidden:true
                                  },         
                                 {
                                 	text: 'state',
                                 	id : 'state',
                                      width: 25, 
                                      dataIndex: 'STATE',
                                      sortable: false,
                                      hidden:true
                                  }   
                      ],                      
                      dockedItems:[
                                   {
                                   xtype: 'toolbar',
                                   items: [
                                           {
                                               text: MSG.COMMON_ADD,
                                               iconCls: 'common-add',
                                               disabled: toBoolean(config.demo_mode),
                                               handler: function () {
                                               	//추가 버튼 클릭시.
                                                   var popWindow = Ext.create('Ext.Window',
                                                   {
                                                	   title: 'Add Core',
                                                       width: 380,
                                                       height: 160,
                                                       modal: true,
                                                       resizable: false,
                                                       constrain: true,
                                                       layout: 'fit',
                                                       id:'AddCore',
                                                       items:  
                                                       {
                                                    	   xtype: 'form',
                                                           itemId: 'CoreForm',
                                                           id:'CoreForm',
                                                           border: false,
                                                           bodyPadding: 10,
                                                           defaults:
                                                           {anchor:'100%',labelWidth:120},
                                                           items:
                                                           	[
                                                               {
                                                            	xtype: 'textfield',
                        	                                    name: 'group_name',
                        	                                    id:'GROUP_NAME',
                        	                                    itemId: 'group_name',
                        	                                    fieldLabel: 'GROUP NAME',
                        	                                    allowBlank: false,
                        	                                    minLength: 1                                   
                                                               } ,
                                                          	   {                                                    	  		
                        	                                    xtype: 'textfield',
                        	                                    name: 'artifact_name',
                        	                                    id:'ARTIFACT_NAME',
                        	                                    itemId: 'artifact_name',
                        	                                    fieldLabel: 'ARTIFACT NAME',
                        	                                    allowBlank: false,
                        	                                    minLength: 1
                                                          	   },
                                                          	   {                                                    	  		
                        	                                     xtype: 'textfield',
                        	                                     name: 'version_name',
                        	                                     id:'VERSION_NAME',
                        	                                     itemId: 'version_name',
                        	                                     fieldLabel: 'VERSION',
                        	                                     allowBlank: false,
                        	                                     minLength: 1
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
                                                            	   var win = popWindow;
                                                            	   /*
                                                            	   if(this.down('#group_name').getValue() == null){
                                                   					Ext.Msg.alert("Warning", "Group name is empty");
                                                   					return;
                                                   					}
                                                            	   
                                                            	   if(this.down('#artifact_name').getValue() == null){
                                                      					Ext.Msg.alert("Warning", "Artifact name is empty");
                                                      					return;
                                                      					}
                                                            	   
                                                            	   if(this.down('#version_name').getValue() == null){
                                                      					Ext.Msg.alert("Warning", "Version name is empty");
                                                      					return;
                                                      					}
                                                            	   */                                                            	  
                                                            	   
                                                                   Ext.Ajax.request({
                                                                	   url:'/mrjar/get',
                                                						method:'GET',
                                                						params:{                					 
                                                							'method':'add', 
                                                					 		'group': Flamingo.Util.String.trim(win.down('#group_name').getValue()),
                       	                                                    'artifact': Flamingo.Util.String.trim(win.down('#artifact_name').getValue()),
                       	                                                    'version': Flamingo.Util.String.trim(win.down('#version_name').getValue()) 
                                                						},
                                                						success:function( result, request )
                                                						{
                                                							console.info(result);
                                                							Ext.Msg.alert( "Success", "Core version Add successfully " );
                                                							win.close();        
                                                							Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0].getStore().load();
                                                						},
                                                							failure: function( result, request ){
                                                							Ext.Msg.alert( "Failed", result.responseText );
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
                                               text: 'Edit',
                                               iconCls: 'common-edit',
                                               disabled: toBoolean(config.demo_mode),
                                               handler: function () {                                            	   
                                            	   var grid = Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0];
                                                   var selection = grid.getSelectionModel().getSelection()[0]; 
                                                   if(typeof selection == "undefined")
                                                   {
                                                   	
                                                   	Ext.MessageBox.show({
                                                           title: 'Info',
                                                           msg: 'Please select Core name to edit',
                                                           buttons: Ext.MessageBox.OK,
                                                           icon: Ext.MessageBox.WARNING,
                                                           fn: function handler(btn) {
                                                               popup.close();
                                                           }
                                                       });
                                                   	return null;
                                                   }
                                                 
                                               	//추가 버튼 클릭시.
                                                   var popEdit_Window = Ext.create('Ext.Window',
                                                   {
                                                	   title: 'Edit Core',
                                                       width: 380,
                                                       height: 160,
                                                       modal: true,
                                                       resizable: false,
                                                       constrain: true,
                                                       layout: 'fit',
                                                       id:'EditCore',
                                                       items:  
                                                       {
                                                    	   xtype: 'form',
                                                           itemId: 'CoreForm',
                                                           id:'CoreForm',
                                                           border: false,
                                                           bodyPadding: 10,
                                                           defaults:
                                                           {anchor:'100%',labelWidth:120},
                                                           items:
                                                           	[
                                                           	  { 
                                                           		xtype: 'textfield',  
                                                             	name: 'CODE',
                                                             	id:'CODE',
                                                             	itemId : 'CODE',
                                                                width: 25,                                                                
                                                                sortable: false,
                                                                hidden:true
                                                               },     
                                                               {
                                                            	xtype: 'textfield',
                        	                                    name: 'GROUP',
                        	                                    id:'GROUP',
                        	                                    itemId: 'GROUP',
                        	                                    fieldLabel: 'GROUP NAME',
                        	                                    allowBlank: false,
                        	                                    minLength: 1                                   
                                                               } ,
                                                          	   {                                                    	  		
                        	                                    xtype: 'textfield',
                        	                                    name: 'ARTIFACT',
                        	                                    id:'ARTIFACT',
                        	                                    itemId: 'ARTIFACT',
                        	                                    fieldLabel: 'ARTIFACT NAME',
                        	                                    allowBlank: false,
                        	                                    minLength: 1
                                                          	   },
                                                          	   {                                                    	  		
                        	                                     xtype: 'textfield',
                        	                                     name: 'VERSION',
                        	                                     id:'VERSION',
                        	                                     itemId: 'VERSION',
                        	                                     fieldLabel: 'VERSION',
                        	                                     allowBlank: false,
                        	                                     minLength: 1
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
                                                            	   alert(popEdit_Window.down('#ARTIFACT').getValue());
                                                                         	
                                                                         		Ext.Ajax.request({
                                                								url:'/mrjar/get',
                                                								method:'GET',
                                                								params:{                					 
                                                					 				'method':'edit', 
                                                					 				'code': Flamingo.Util.String.trim(popEdit_Window.down('#CODE').getValue()),
                                                					 				'group': Flamingo.Util.String.trim(popEdit_Window.down('#GROUP').getValue()),
                       	                                                            'artifact': popEdit_Window.down('#ARTIFACT').getValue(),
                       	                                                            'version': Flamingo.Util.String.trim(popEdit_Window.down('#VERSION').getValue()) 
                                                								},
                                                								success:function( result, request )
                                                								{
                                                									console.info(result);
                                                									Ext.Msg.alert( "Success", "Core version Edit successfully " );
                                                									popEdit_Window.close();         
                                                									Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0].getStore().load();
                                                								},
                                                								failure: function( result, request ){
                                                									Ext.Msg.alert( "Failed", result.responseText );
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
                                                   
                                                   popEdit_Window.down('#CODE').setValue(selection.data.CODE);      
                                                   popEdit_Window.down('#GROUP').setValue(selection.data.GROUP);      
                                                   popEdit_Window.down('#ARTIFACT').setValue(selection.data.ARTIFACT);      
                                                   popEdit_Window.down('#VERSION').setValue(selection.data.VERSION);      
      
                                               }
                                           },
                                           '-',
                                           {
                                           text: MSG.COMMON_DELETE,
                                           iconCls: 'common-delete',
                                           disabled: toBoolean(config.demo_mode),
                                           handler: function () {
           									boolean_link = false;
           									eng_name = "";
           									num_rc = 0;           									
           									var grid = Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0];
                                            var selection = grid.getSelectionModel().getSelection()[0];  
                                            Ext.MessageBox.show({
		                                            title: MSG.COMMON_WARN,
		                                            msg: "Do you want remove this CORE?",
		                                            buttons: Ext.MessageBox.YESNO,
		                                            icon: Ext.MessageBox.WARNING,
		                                            fn: function handler(btn){
		                                            	if (btn=='yes'){
		                                            		Ext.Ajax.request({
		                   	                         	    	url:'/mrjar/get',
		                   	                         	        method:"GET",
		                   	                         	        params:{
		                   	                         	        	'method':'delete', 
		                   	                         	        	'code': selection.data.CODE
		                   	                         	        },
                                								success:function( result, request )
                                								{
                                									console.info(result);
                                									Ext.Msg.alert( "Success", "Core remove successfully " );           
                                									Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0].getStore().load();
                                								},
                                								failure: function( result, request ){
                                									Ext.Msg.alert( "Failed", result.responseText );
                                								}      	                         				
                                      	      				}); 
		                                            	}
		                                            }	
                                           });
                                           }
                                           },
                                           '->',
                                           {
                                               text: MSG.COMMON_REFRESH,
                                               iconCls: 'common-refresh',
                                               itemId: 'refreshButton',
                                               handler: function () {
                                                   Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0].getStore().removeAll();
                                                   Ext.ComponentQuery.query('adminHadoopPanel #mrjaredit-win')[0].getStore().load();
                                               }
                                           }
                                   ]
                                   }
                      ],
                      bbar: {
                          xtype: '_statusBar'
                      },
                      listeners: {
                          selectionchange: function (sm, selectedRecord) {
                          }
                      }
               }
        ];
      this.callParent(arguments);
    }
});




