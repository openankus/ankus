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

var column_title = "";
Ext.require([
    'Ext.tab.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border',
    'Flamingo.view.desktop.Login',
    'Flamingo.view.login.LoginPanel',
    'Flamingo.view.desktop.WorkHistoryWindow'
]);

Ext.define('DB_Link_EngineStore', {
    extend: 'Ext.data.Store',
    fields:['id','instanceName'],
    autoLoad: true,
    constructor: function (config) {
        this.callParent(arguments);

        if (config && config.type) {
            this.getProxy().extraParams.type = config.type;
        }
    },
    proxy: {
        type: 'ajax',
        url: CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.WE.LIST_ENGINES,
        headers: {
            'Accept': 'application/json'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: { // Workflow Engine 목록 필터링 파라미터. 기본값은 모두 다 보임.
            'type': 'ALL'
        }
    }
});

Ext.define('DB_Link_EngineCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.DB_Link_EngineCombo',
    type: 'HADOOP',
    name: 'DB_Link_EngineCombo',
    editable: false,
    typeAhead: true,
    selectOnFocus: true,
    displayField: 'instanceName',
    valueField: 'id',
    tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="Hadoop Cluster: {hadoopClusterName}">{instanceName}</div></tpl>',

    constructor: function (config) {
        this.type = config.type;
        this.store = Ext.create('DB_Link_EngineStore');
        this.callParent(arguments);
    },

    listeners: {
        beforerender: function () {
            this.getStore().getProxy().extraParams.type = this.type;
            this.getStore().load();
        }
    }
});

var database_columns =  [{
	text: 'Name',
	dataIndex: 'databaseName',
	width:10,
	flex: 1
}];


var table_columns = [{
text: 'Name',
dataIndex: 'tableName',
width:10,
flex: 1
}]; 


var fields_columns =  [{
	text: 'Name',
	dataIndex: 'fieldName',
	width:10,
	flex: 1, 
}
,
{
	text: 'Type',
	dataIndex: 'fieldType',
    width:10,
    flex: 1, 
}];                    


var preview_columns =  [{
							//xtype: 'checkcolumn',
							dataIndex: 'fieldName',
							width:10,
							flex: 1, 
							columnHeaderCheckbox: true,
							sortable: false
						}];        

var fields_store = Ext.create('Ext.data.Store',{
	fields:[ 
			{name : 'fieldName'},
			{ name : 'fieldType'} 
		],
 	pageSize:50,
 	proxy: {
    	type: 'ajax',
    	url: "/fs/hdfs/GetFields",
    	
   		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json; charset=utf-8;'
    	},
    
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'total',
            idProperty: 'id'
        }
		 }
}); 			        
var table_store = Ext.create('Ext.data.Store',   {
	fields:[ {name:'tableName'} ],
 	pageSize:50,
 	proxy: {
    	type: 'ajax',
    	url: "/fs/hdfs/tableList",
    	
   		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json; charset=utf-8;'
    	},
    
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'total',
            idProperty: 'id'
        }
		 }
}); 			        

var db_store = Ext.create('Ext.data.Store',   {
	fields:[ {name:'databaseName'} ],
 	pageSize:50,
 	proxy: {
    	type: 'ajax',
    	url: "/fs/hdfs/dblist",
    	
   		headers: {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json; charset=utf-8;'
    	},
    
        reader: {
            type: 'json',
            root: 'list',
            totalProperty: 'total',
            idProperty: 'id'
        }
		 }
});

Ext.define('WORK_NAME_Model',{
	extend:'Ext.data.Model',
	fields:[ 
	        	{name : 'workName'}
	        	,{ name : 'workId'}
	        ]
});
var DB_LOCAL_STORE = ({
	type:'array',
	fields:['name'],
	data:[['MySQL'],['MSSQL']]
	
	/*
	data:[['MySQL'],
			['MS-SQL'],	
			['ORACLE']]
			*/
});
var WORK_NAME_STORE = Ext.create('Ext.data.Store',
		{
			model:'WORK_NAME_Model',	
			proxy:
			{
			    type: 'ajax',
			    url: '/fs/hdfs/work_name_list',
			    headers:
			    {
			        'Accept': 'application/json'
			    },
			    reader:
			    {
			    	type: 'json',
					root: 'list',
					totalProperty: 'total',
					idProperty: 'id'
			    }
			},
			listeners:
			{
			    load: function(store, records, success)
			    {
			    	//console.info('work name store loaded');
			    	//console.info(records);
			    }
			}
		});
var link_meta_items =	[										
                     	 				{
                     	 					xtype:'panel',	
                     	 					layout:'vbox',
                     	 					border:false,
											items:[											
											{
												xtype:'DB_Link_EngineCombo',
												id:'db_link_enginecombo',
												fieldLabel: 'Hadoop Cluster',
												width:230,
												labelWidth:90,
												labelAlign:'right',
												forceselection:true,
												listeners:
												{
													'change':function(newValue, oldValue)
													{
														var engineCombo = Ext.getCmp('db_link_enginecombo');
														var engineDisplay = engineCombo.getRawValue();
														var engineStore = engineCombo.getStore();
														var items = engineStore.data.items;
														var item_length = items.length;
														var EngineID = "";
														for(var itemi = 0; itemi < item_length; itemi++)
														{
															if( items[itemi].data.instanceName == engineDisplay)
															{
																EngineID = items[itemi].data.id;
																break;
															}
														}
														//WORK_NAME_STORE.getProxy().extraParams.ENGINE_ID = EngineID;
														//WORK_NAME_STORE.load();
													}
												}
											}											
											,
											{													
	                     	 					layout:'hbox',
	                     	 					border:false,
												items:[
														{       
															//Work Name Combo Handler
															xtype: 'textfield',
															fieldLabel: 'Work Name',
															editable:true,
															//store:WORK_NAME_STORE,
															//displayField:'workName',
															//valueField:'workName',
															id:'db_link_worknamecombo',
															value:'',																									
															width:203,
															labelWidth:90,
															labelAlign:'right'																						
														},
														{       
															xtype: 'textfield',
															fieldLabel: 'Work Id',
															id:'db_link_workid',
															value:'0'																									
															,hidden:true																		
														},
														{
					                   	                    xtype: 'tbspacer',
					                   	                    width:3
					                     	 			} ,
					                     	 			
														{
															xtype: "button",
															height: 22,
															width: 25,
															text: '...',
															id:'db_link_history_button',
															history_load:false,
															handler: function() 
															{
																var engineCombo = Ext.getCmp('db_link_enginecombo');
																var engineDisplay = engineCombo.getRawValue();
																var engineStore = engineCombo.getStore();
																var items = engineStore.data.items;
																var item_length = items.length;
																var EngineID = "";
																for(var itemi = 0; itemi < item_length; itemi++)
																{
																	if( items[itemi].data.instanceName == engineDisplay)
																	{
																		EngineID = items[itemi].data.id;
																		break;
																	}
																}
															
																if(EngineID == "") 
																{
																	Ext.Msg.alert('Work Name Error', 'Please select Hadoop Cluster'); 
																	return;
																}
																var popWindow = Ext.create('Ext.Window',
																	    {
																	        title: MSG.DESIGNER_TITLE_FILE_BROWSER,
																	        width: 1140,
																	        height: 410,
																	        modal: true,
																	        resizable: true,
																	        constrain: true,
																	        layout: 'fit',
																	        items: [
																	                	Ext.create('Flamingo.view.desktop.WorkHistoryWindow', 
																	            		{
																	                		engineId: EngineID
																	            		})
																	            	],        
																	            	buttonAlign: 'center',
																			        buttons: [
																			            {
																			                text: MSG.COMMON_OK,
																			                iconCls: 'common-confirm',
																			                handler: function ()
																			                {
																			                	var WorkHistoryGrid = Ext.getCmp('db_link_WorkHistoryGrid');						
																			                	var record = WorkHistoryGrid.getView().selModel.getSelection()[0];	
																			                	
																								var workname = record.get('workname');
																								Ext.getCmp('db_link_worknamecombo').setRawValue(workname);
																								
																								var workid = record.get('workid');
																								Ext.getCmp('db_link_workid').setRawValue(workid);
																								
																								var database_TYPE = record.get('database_TYPE');
																								Ext.getCmp('db_link_dbtype').setRawValue(database_TYPE);
																								
																								var database_ADDRESS = record.get('database_ADDRESS');
																								Ext.getCmp('db_link_dbaddress').setValue(database_ADDRESS);
																								
																								var database_PORT = record.get('database_PORT');
																								Ext.getCmp('db_link_db_port').setValue(database_PORT);
																								
																								var database_id = record.get('database_ID');
																								Ext.getCmp('db_link_user_id').setValue(database_id);
																								
																								var hdfs_path = record.get('hdfs');
																								Ext.getCmp('db_link_import_path').setValue(hdfs_path);
																								
																								var database_PASSWORD = record.get('database_PASSWORD');
																								Ext.getCmp('db_link_user_password').setValue(database_PASSWORD);
																								
																								var dbname = record.get('dbname');																								
																								var tablename = record.get('tablename');																								
																								Ext.getCmp('db_link_databasename').selected_database_name = dbname;
																								Ext.getCmp('db_link_tablelist').selected_table_name = tablename;	
																								
																								var query_history= record.get('query');
																								Ext.getCmp('db_link_sql_textareafield').setValue(query_history);																							
																			                	popWindow.close();																			                	
																			                	Ext.getCmp('db_link_history_button').history_load = true;
																			                	worknameCombo_select();
																			                	console.info("history used:" + Ext.getCmp('db_link_history_button').history_load);
																			                	
																			                	var import_button = Ext.getCmp('db_link_import_button');                	
																			                	import_button.setDisabled(false);
																			                	
																			                }
																			            },
																			            {
																			                text: MSG.COMMON_CANCEL,
																			                iconCls: 'common-cancel',
																			                handler: function ()
																			                {
																			                    popWindow.close();
																			                }
																			            }
																			        ]	        
																	    }).center().show();
									                        }
														}
												]
											}
											]
                     	 				},  
                     	 				{
                   	                     xtype: 'tbspacer',
                   	                      width:35
                     	 				} ,
                     	 				{
										xtype:'panel',	
										layout:'vbox',
										border:false,
										items:[
											       {
										       			xtype: "textfield",
										       			fieldLabel: 'DB Address',														
										       			inputType: "text",
										       			id:'db_link_dbaddress',
										       			width:215,
										       			labelWidth:80,
										       			labelAlign:'right'
										       		},													
													{                	
									                	 xtype: "textfield",
									                	 inputType: "text",
									                	 id:'db_link_user_id',											                	
									                	 fieldLabel: 'ID',
									                	 width:215,		
									                	 labelWidth:80,
									                	 labelAlign:'right'
													}
												]
									},									
									 {
												xtype:'panel',		
												layout:'vbox',	
												border:false,												
												items:[
												       		{                	
											                	xtype: 'combo',
											                	id:'db_link_dbtype',
											                	fieldLabel: 'DB Type',
											                	store:DB_LOCAL_STORE
											                	,displayField:'name'
											                	,mode:'local',
											                	width:230,
											                	labelWidth:90,
											                	labelAlign:'right',
											                	listeners:
											                	{
											                		'change':function(newValue, oldValue)
											                		{
											                			console.info(newValue.value);
											                			if(newValue.value == "MySQL") 
										                				{
										                					console.info("3306 WILL SET");
										                					Ext.getCmp('db_link_db_port').setValue('3306');
										                				}
											                			else if(newValue.value == "MSSQL") 
										                				{
										                					console.info("3306 WILL SET");
										                					Ext.getCmp('db_link_db_port').setValue('1433');
										                				}
											                			
											                		}
											                	}
															},
															{                	
											                	 xtype: "textfield",
											                	 inputType: "text",
											                	 id:'db_link_user_password',
											                	 fieldLabel: 'Password',
											                	 value:'',
											                	 width:230,
											                	 labelWidth:90,
											                	 labelAlign:'right'
															}
												      ]
									 } ,									
									 {
										xtype:'panel',		
										layout:'vbox',											
										border:false,										
										items:[
										       		{                	
														xtype: "textfield",
		                								inputType: "text",
									                	id:'db_link_db_port',
									                	fieldLabel: 'Port',
									                	width:180,		
									                	labelWidth:55,
									                	labelAlign:'right'
									             
													}													
										      ]
									 },
									 {
						                    xtype: 'tbspacer',
						                    width: 5
						             },									
					                {
					                	 	xtype:'panel',	layout:'anchor',	border:false,
											items:[
														{
															xtype: "button",
															height: 50,
															width: 75,
															text: 'Connect',
															iconCls: 'common-confirm',
															id:'btn_db_link_connect',
															handler: function() 
															{
							                                 	fun_connect();
							                                 	myMask.hide();
									                        }
										             	}
													]
									}
					                 ,
					                {
					                	 	xtype:'panel',	
					                	 	layout:'anchor',
					                	 	border:false,
					                	 	hidden:true,
											items:[
												        {
															xtype:'label',
															text:'             ',
															id:'db_link_ConnectLabel'
														}
													]
									}
					                 ];
					    
var database_grid ;
/*
var import_argu_panel = Ext.create('Ext.panel.Panel', {				
			xtype:'panel', layout:'vbox',border:false,
			items:[
			    
							{
		                      	layout:'hbox',
		                      	border:false,						                      	
		                      	items: link_meta_items
	                      }
	                
	                 ]
});
*/		
		
var worknameCombo_select = function()
{
			var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();
   			var WORK_ID = Ext.getCmp('db_link_workid').getValue();
   			if(WORK_NAME != null)
   			{
   				var DATABASE_NAME ="";
   				var TABLE_NAME  = "";
   				var dbaddress = "";
				var user_id =  "";
				var user_password =  "";
				var db_port =  "";
   				myMask.show();
       			//해당 워크 네임ID로 설정 내용을 가져온다.
				var engineCombo = Ext.getCmp('db_link_enginecombo');
				var engineDisplay = engineCombo.getRawValue();
				var engineStore = engineCombo.getStore();
				var items = engineStore.data.items;
				var item_length = items.length;
				var EngineID = "";
				for(var itemi = 0; itemi < item_length; itemi++)
				{
					if( items[itemi].data.instanceName == engineDisplay)
					{
						EngineID = items[itemi].data.id;
						break;
					}
				}
				
       			//Flamingo.Ajax.Request.invokeGet("/fs/hdfs/WorkNameParameter",{ENGINE_ID:EngineID, WORK_NAME:WORK_NAME },
       			Flamingo.Ajax.Request.invokeGet("/fs/hdfs/WorkNameParameter",{	
       																												ENGINE_ID:EngineID, 
       																												WORK_ID:WORK_ID 
       																											},
				function (response) 
				{
					var obj = Ext.decode(response.responseText);
					
					if (obj.success) 
					{
						DATABASE_NAME = obj.list[0].database_NAME;
						TABLE_NAME = obj.list[0].table_NAME;
						
						//SAVE WORK에서 이용가능하도록 컴포넌트에 별도 저장한다.
						Ext.getCmp('db_link_databasename').selected_database_name = DATABASE_NAME;
						Ext.getCmp('db_link_tablelist').selected_table_name = TABLE_NAME;
						
						var dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
						var user_id =  Ext.getCmp('db_link_user_id').getValue();
						var user_password =  Ext.getCmp('db_link_user_password').getValue();
						var db_port =  Ext.getCmp('db_link_db_port').getValue();
						var DBType = Ext.getCmp('db_link_dbtype').getValue();
						Flamingo.Ajax.Request.invokeGet("/fs/hdfs/WORKHISTORY_DBCHECK", {ENGINE_ID:EngineID, 
																																 DBNAME: DATABASE_NAME, 
																																 DBTYPE: DBType, 
																																 db_address:dbaddress, 
																																 db_port:db_port,
																																 id:user_id,
																																 pw:user_password}, 
                         function (response) 
						{
						        var obj = Ext.decode(response.responseText);
						        
						        if (obj.success) 
						        {
						        	db_store.loadData(obj.list);
						        	if(obj.list.length > 0)
						        	{
							        	database_grid = Ext.getCmp('db_link_databasename');
							        	database_grid.gridRowCount = database_grid.store.getCount();
							        	database_grid.selected_database_name = DATABASE_NAME;
							        	var DBType = Ext.getCmp('db_link_dbtype').getValue();
										//TABLE LIST CHECK
										Flamingo.Ajax.Request.invokeGet("/fs/hdfs/WORKHISTORY_TABLECHECK", {
											ENGINE_ID:EngineID,
											DBNAME: DATABASE_NAME,
											DBTYPE: DBType, 
											TABLENAME:TABLE_NAME, 
											db_address:dbaddress, 
											db_port:db_port, 
											id:user_id, 
											pw:user_password}, function (response) 
											{
										        var obj = Ext.decode(response.responseText);
										        if (obj.success) 
										        {
										        	table_store.loadData(obj.list);//테이블 목록 저장.
										        	if(obj.list.length > 0)
										        	{
											        	var table_grid = Ext.getCmp('db_link_tablelist');
											        	var DBType = Ext.getCmp('db_link_dbtype').getValue();
														Flamingo.Ajax.Request.invokeGet("/fs/hdfs/GetFields", {		
																	ENGINE_ID:EngineID,
																	DBTYPE: DBType,
																	db_address:dbaddress, 
																	id:user_id, 
																	pw:user_password, 
																	dbname:DATABASE_NAME,
																	tablename:TABLE_NAME},
																function (response)
																{
																	var obj = Ext.decode(response.responseText);													                
																	if (obj.success)
																	{
																		fields_store.loadData(obj.list); //
																		run_preview_Query();//저장된 데이터베이스, 테이블, 필드들을 기반으로 미리 보기 쿼리 실행.
																		
																		import_progress_timerid=setInterval(function(){
									                            											console.log('setInterval');
									                            											//var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();
									                            											var WORK_ID = Ext.getCmp('db_link_workid').getValue();
									                            											var engineCombo = Ext.getCmp('db_link_enginecombo');
									                            											var engineDisplay = engineCombo.getRawValue();
									                            											var engineStore = engineCombo.getStore();
									                            											var items = engineStore.data.items;
									                            											var item_length = items.length;
									                            											var EngineID = "";
									                            											for(var itemi = 0; itemi < item_length; itemi++)
									                            											{
									                            												console.info(items[itemi].data.instanceName);
									                            												if( items[itemi].data.instanceName == engineDisplay)
									                            												{
									                            													EngineID = items[itemi].data.id;
									                            													break;
									                            												}
									                            											}
									                            											Flamingo.Ajax.Request.invokeGet("/fs/hdfs/PROGRESSRATE", 
									                            													{
									                            														ENGINE_ID:EngineID,
									                            														WORK_ID:WORK_ID
									                            													},
									                            											function (response)
									                            											{
									                            												var obj = Ext.decode(response.responseText);
									                            												var pgb = Ext.getCmp('pgb');
									                            												if (obj.success)
									                            												{
									                            													if(obj.list[0] == undefined)
									                            													{
									                            														clearInterval(import_progress_timerid);
									                            														return;
									                            													}
									                            													var progress = obj.list[0].progress;
									                            													var totalcount = obj.list[0].totalcount;					
									                            													var status = obj.list[0].status;
									                            													
									                            													
									                            													var rate = parseFloat(progress) / parseFloat(totalcount);		
									                            													console.info(status +":" + rate +":" + progress +":" + totalcount);
									                            													if(isNaN(rate) == true) rate = 0;																																			
									                            													var pgb = Ext.getCmp('pgb');	
											                    													switch (status) 
											                    													{
											                            														case 0    :
											                            															if(obj.list[0].progress != 'undefined' && obj.list[0].totalcount != 'undefined')
													                            													{
													                            															console.info("Ready");
													                            															rate = 0;
													                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'Ready...', true);
													                            													}
											                            															break;
											                            														case 2    :
											                            														case 3    : 
											                            															if(obj.list[0].progress != 'undefined' && obj.list[0].totalcount != 'undefined')
													                            													{

											                            																if((obj.list[0].progress == obj.list[0].totalcount)&&(obj.list[0].progress > 0))
													                            														{
													                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'completed...' +obj.list[0].log , true);
													                            															console.info("Complete status");
													                            															clearInterval(import_progress_timerid);
													                            															return;
													                            														}
											                            																
											                            																else if((obj.list[0].progress <= obj.list[0].totalcount) && (obj.list[0].totalcount > 0))
													                            														{
											                            																	console.info("Running status");
													                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'completed...' +obj.list[0].log , true);
													                            														}
													                            													}
											                            															break;
											                            														case 4    : 
									                            																	pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'Failed by '+ obj.list[0].log, true);
									                            																	clearInterval(import_progress_timerid);
											                            															break;
											                            															
											                            														case 5   :														                            															
											                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+ 'killed...' +obj.list[0].log , true);	
											                            															clearInterval(import_progress_timerid);
											                            															break;
											                            													default : break;
									                            													}
									                            												
									                            												}
									                            												else if(obj.fail)
									                            												{
									                            														console.info('Fail timer stop');
									                            														clearInterval(import_progress_timerid);
									                            												}
									                            											}
									                            											);
									                            											}, 1000);
																	}
																}
														);
										        	}
										        	else
										        	{
										        		Ext.MessageBox.show(
														{
															title: 'Work Info',
															msg: "The Database '" + DATABASE_NAME + "' is not exist",
															buttons: Ext.MessageBox.OK,
															icon: Ext.MessageBox.WARNING
														});
										        	}
										        }
										        else
										        {
										        	var connection_status = Ext.getCmp('db_link_ConnectLabel');
										        	connection_status.setText(obj.error.message);
										        }
										});
						        	}
						        	else
						        	{
						        		Ext.MessageBox.show(
										{
											title: 'Work Info',
											msg: "The Database '" + DATABASE_NAME + "' is not exist",
											buttons: Ext.MessageBox.OK,
											icon: Ext.MessageBox.WARNING
										});
						        	}
						        }
						        else
						        {
						        	var connection_status = Ext.getCmp('db_link_ConnectLabel');
						        	connection_status.setText(obj.error.message);
						        }
						});
					}
				}); //End of Get Parameter
				myMask.hide();
       			
   			}
      
}
var fun_connect = function()
{
	clearInterval(import_progress_timerid);
	var pgb = Ext.getCmp('pgb');
	var rate =0;
	pgb.updateProgress( rate, ' ', true);
	
		
	
	Ext.getCmp('db_link_import_path').setValue("");
	
	var databasegrid = Ext.getCmp('db_link_databasename');	
	db_store.clearData();
	db_store.removeAll();	
	databasegrid.view.refresh();

	var tablegrid = Ext.getCmp('db_link_tablelist');		
	table_store.clearData();
	table_store.removeAll();
	tablegrid.view.refresh();
		
	var fieldGrid = Ext.getCmp('db_link_fieldlist');
	fields_store.clearData();
	fields_store.removeAll();
	fieldGrid.view.refresh();
	
	clear_prieviewGrid();

	var str_workNmae = Ext.getCmp('db_link_worknamecombo').getValue();
	var dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
	var str_DBType = Ext.getCmp('db_link_dbtype').getValue();
	var db_port =  Ext.getCmp('db_link_db_port').getValue();
	var user_id =  Ext.getCmp('db_link_user_id').getValue();
	var user_password =  Ext.getCmp('db_link_user_password').getValue();
	
	myMask.show();
	var connection_status = Ext.getCmp('db_link_ConnectLabel');
	connection_status.setText('');
	var engineCombo = Ext.getCmp('db_link_enginecombo');
	var engineDisplay = engineCombo.getRawValue();
	var engineStore = engineCombo.getStore();
	var items = engineStore.data.items;
	var item_length = items.length;
	var EngineID = "";
	
	for(var itemi = 0; itemi < item_length; itemi++)
	{
		console.info(items[itemi].data.instanceName);
		if( items[itemi].data.instanceName == engineDisplay)
		{
			EngineID = items[itemi].data.id;
			break;
		}
	}
	
	//Hadoop Cluster
	if(EngineID == undefined || EngineID==null || EngineID=='')
	{
		Ext.MessageBox.show(
			{
				title: 'Hadoop Cluster',
				msg: "Please select a Hadoop Cluster",
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});		
		return;		
	}
	
	//WORK NAME
	if(str_workNmae == undefined || str_workNmae==null || str_workNmae=='')
	{
			Ext.MessageBox.show(
				{
					title: 'Work Name',
					msg: "Please input or select the Work Name",
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});		
			return;		
	}
	
	//DB ADDRESS
	if(dbaddress == undefined || dbaddress==null || dbaddress=='')
	{
			Ext.MessageBox.show(
				{
					title: 'DB Address',
					msg: "Please input a DB Address",//obj.error.message,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});		
			Ext.getCmp('db_link_dbaddress').focus(false, 5);
			return;		
	}
	
	//DB TYPE
	if(str_DBType == undefined || str_DBType==null || str_DBType=='')
	{
		Ext.MessageBox.show(
				{
					title: 'DB Type',
					msg: "Please select a DB type",
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});		
		return;		
	}
	
	//PORT
	if(db_port == undefined || db_port==null || db_port=='')
	{
		Ext.MessageBox.show(
			{
				title: 'DB Port',
				msg: "Please input DB Access Port",//obj.error.message,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		Ext.getCmp('db_link_db_port').focus();
		return;		
	}
	
	//ID
	user_id  = user_id.trim();
	if(user_id == undefined || user_id==null || user_id=='')
	{
			Ext.MessageBox.show(
				{
					title: 'ID',
					msg: "Please input a Access ID",//obj.error.message,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});
			Ext.getCmp('db_link_user_id').focus();
			return;
	}
	
	console.info(EngineID);
	var DBType = Ext.getCmp('db_link_dbtype').getValue();
	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/dblist", {ENGINE_ID:EngineID, 
																				DBTYPE:DBType,
																				db_address:dbaddress, 
																				db_port:db_port, 
																				id:user_id, 
																				pw:user_password}, function (response) 
	{
	        var obj = Ext.decode(response.responseText);
	      
	        if (obj.success) 
	        {
	        	db_store.clearData();
	        	db_store.removeAll();
	        	db_store.loadData(obj.list);
	        	
	        	var connection_status = Ext.getCmp('db_link_ConnectLabel');	        	
	        	connection_status.setText('Connected');	        	
	        	database_grid = Ext.getCmp('db_link_databasename');	        	
	        	database_grid.gridRowCount = database_grid.store.getCount();	        	
	        	console.info("Ajax row count :" + database_grid.gridRowCount);
	        }
	        else
	        {
	        	Ext.MessageBox.show(
	    		{
	    					title: 'Connect Info',
	    					msg: 'There is error with connection information',//obj.error.message,
	    					buttons: Ext.MessageBox.OK,
	    					icon: Ext.MessageBox.WARNING
	    		});
	    		Ext.getCmp('db_link_user_id').focus();
	    			
	        	return 0;
	        }
	        Ext.getCmp('db_link_sql_textareafield').setValue("");
	        
	});
	var pgb = Ext.getCmp('pgb');
	var rate =0;
	pgb.updateProgress( rate, ' ', true);

	myMask.hide();
}

var run_preview_Query=function()
{
		var dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
		var user_id =  Ext.getCmp('db_link_user_id').getValue();
		var user_password =  Ext.getCmp('db_link_user_password').getValue();				
		var input_sql = Ext.getCmp('db_link_sql_textareafield').getValue() ;																		
		var database_name = Ext.getCmp('db_link_databasename').selected_database_name;
		var previewGrid = Ext.getCmp('db_link_previeGrid');			
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var engineCombo = Ext.getCmp('db_link_enginecombo');
		var engineDisplay = engineCombo.getRawValue();
		var engineStore = engineCombo.getStore();
		var items = engineStore.data.items;
		var item_length = items.length;
		var EngineID = "";
		for(var itemi = 0; itemi < item_length; itemi++)
		{
			if( items[itemi].data.instanceName == engineDisplay)
			{
				EngineID = items[itemi].data.id;
				break;
			}
		}
		myMask.show();	
		var DBType = Ext.getCmp('db_link_dbtype').getValue();
		var DBPORT = Ext.getCmp('db_link_db_port').getValue();
		/*
		if(DBType == "MySQL")
		{
			if(input_sql.indexOf("limit 100") == -1) //제안이 쿼리 상에 존재하지 않는 경우 제한을 추가한다.
			{
				input_sql = input_sql + " limit 100";
			}						
		}
		else if(DBType == "MSSQL")
		{
			//input_sql = "select TOP 100 " + query_field + " from  [" + database_name+"].[" + "dbo].[" + table_name+"]";
			if(input_sql.indexOf("TOP 100") == -1) //제안이 쿼리 상에 존재하지 않는 경우 제한을 추가한다.
			{
				input_sql = input_sql.replace("select", "select top 100");
			}	
		}
		*/
		Flamingo.Ajax.Request.invokeGet("/fs/hdfs/SQLBODY", 
														{
															ENGINE_ID:EngineID,
															DBTYPE:DBType,
															DBPORT:DBPORT,
															db_address:dbaddress,
															id:user_id, 
															pw:user_password, 
															dbname:database_name,
															tablename:"",
															query:input_sql
														},
		function (response) 
		{
			var import_path = Ext.getCmp('db_link_import_path');
			var database_name = Ext.getCmp('db_link_databasename').selected_database_name ;
			var table_name = Ext.getCmp('db_link_tablelist').selected_table_name ;
			if(Ext.getCmp('db_link_history_button').history_load == true)
			{
				console.info("use history path");
			}
			else
			{
				console.info("use new path");
				//import_path.setValue("/" + database_name + "." + table_name);
			}
			
			var obj = Ext.decode(response.responseText);																															                
			if(obj.success) 
			{
				var head_length = obj.map.HEAD.length;																							                	
				var fields = [];
				for(var hi = 0; hi < head_length; hi++)
				{
					var name_value = obj.map.HEAD[hi].previewSQLHead ;
					fields.push( { name:name_value.toString() } ); //dataindex 설정
				}
																																						
				var data = [];																																							
				var store2 = Ext.create('Ext.data.Store', {  fields:fields, data:data });																																				 					
				store2.load({
					callback: function(records)
					{
						store2.loadData( obj.map.BODY);																																																				
					}
				});	
				var model2 = [];
				for(var hi =0; hi < head_length; hi++)
				{
					var dataIndexValue = fields[hi].name.toString();
					prevGridColumn.push(dataIndexValue);																																																																																									
					model2.push(
					{
						text : dataIndexValue,
						flex : 1,																																																																																			
						dataIndex : dataIndexValue	
					});																																
				}																																	
				previewGrid.reconfigure(store2, model2);
				
			}
			myMask.hide();
		}
		
		)
		
}
var dbDatabaseNameClick = function()
{
	var datbase_name_grid = Ext.getCmp('db_link_databasename');						
	var record = datbase_name_grid.getView().selModel.getSelection()[0];							
	var database_name = record.get('databaseName');
	
	Ext.getCmp('db_link_databasename').selected_database_name = database_name;
	
	var tablegrid = Ext.getCmp('db_link_tablelist');		
	table_store.clearData();
	table_store.removeAll();
	tablegrid.view.refresh();
	
	var fieldGrid = Ext.getCmp('db_link_fieldlist');
	fields_store.clearData();
	fields_store.removeAll();
	fieldGrid.view.refresh();		
	
	//TABLE LIST 조회.
	var dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
  	var user_id =  Ext.getCmp('db_link_user_id').getValue();
  	var user_password =  Ext.getCmp('db_link_user_password').getValue();
    //console.info('ADDRESS : ' + dbaddress + ' ID ' + user_id + ' PWD ' + user_password + " DATA BASE " + database_name);
    myMask.show();
    
    var engineCombo = Ext.getCmp('db_link_enginecombo');
	var engineDisplay = engineCombo.getRawValue();
	var engineStore = engineCombo.getStore();
	var items = engineStore.data.items;
	var item_length = items.length;
	var EngineID = "";
	for(var itemi = 0; itemi < item_length; itemi++)
	{
		console.info(items[itemi].data.instanceName);
		if( items[itemi].data.instanceName == engineDisplay)
		{
			EngineID = items[itemi].data.id;
			break;
		}
	}
	console.info(EngineID);
	//RUN QUERY
	var DBType = Ext.getCmp('db_link_dbtype').getValue();
	var DBPORT = Ext.getCmp('db_link_db_port').getValue();
	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/tableList", 
														{
														ENGINE_ID:EngineID, 
														DBTYPE:DBType, 
														DBPORT:DBPORT,
														db_address:dbaddress,
														id:user_id, 
														pw:user_password, 
														dbname:database_name
														},
		
				function (response) {
				                var obj = Ext.decode(response.responseText);
				                
				                if (obj.success) {
				                	//console.info("Table list request success");
				                	//console.info(obj);
				                	table_store.loadData(obj.list);
				              }
				});		
	Ext.getCmp('db_link_history_button').history_load = false;
	myMask.hide();
};
							
var dbTableNameClick= function()
	{
		var database_name = Ext.getCmp('db_link_databasename').selected_database_name;
	
		var tablegrid = Ext.getCmp('db_link_tablelist');						
		var tablerecord = tablegrid.getView().selModel.getSelection()[0];							
		var table_name = tablerecord.get('tableName');
		console.info(table_name);
		
		Ext.getCmp('db_link_tablelist').selected_table_name = table_name;
		
		var fieldGrid = Ext.getCmp('db_link_fieldlist');
		fields_store.clearData();
		fields_store.removeAll();
		
		fieldGrid.view.refresh();
		
		
		var dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
		var user_id =  Ext.getCmp('db_link_user_id').getValue();
		var user_password =  Ext.getCmp('db_link_user_password').getValue();
		console.info("Get Fields");
		var engineCombo = Ext.getCmp('db_link_enginecombo');
		var engineDisplay = engineCombo.getRawValue();
		var engineStore = engineCombo.getStore();
		var items = engineStore.data.items;
		var item_length = items.length;
		var EngineID = "";
		for(var itemi = 0; itemi < item_length; itemi++)
		{
			console.info(items[itemi].data.instanceName);
			if( items[itemi].data.instanceName == engineDisplay)
			{
				EngineID = items[itemi].data.id;
				break;
			}
		}
		console.info("EngieID:" + EngineID);
		myMask.show();
		var DBType = Ext.getCmp('db_link_dbtype').getValue();
		var DBPORT = Ext.getCmp('db_link_db_port').getValue();
		Flamingo.Ajax.Request.invokeGet("/fs/hdfs/GetFields", 
														{ 
															ENGINE_ID:EngineID, 
															DBTYPE:DBType,
															DBPORT:DBPORT,
															db_address:dbaddress, 
															id:user_id, 
															pw:user_password, 
															dbname:database_name, 
															tablename:table_name
														},
					function (response)
					{
						var obj = Ext.decode(response.responseText);													                
						if (obj.success)
						{
							
							fields_store.loadData(obj.list);
							console.info(obj.list);
							console.info("Fields Search success");
						}
						else
						{
							console.info("Fields Search Failed");
						}
					}
			);
		Ext.getCmp('db_link_history_button').history_load = false;
		var import_path = Ext.getCmp('db_link_import_path');
		var database_name = Ext.getCmp('db_link_databasename').selected_database_name ;
		var table_name = Ext.getCmp('db_link_tablelist').selected_table_name ;
		if(Ext.getCmp('db_link_history_button').history_load == true)
		{
			console.info("use history path");
		}
		else
		{
			console.info("use new path");
			//import_path.setValue("/" + database_name + "." + table_name);
		}		
		myMask.hide();
	};
	
	Ext.define('Ext.ux.grid.column.Progress', {
	    extend: 'Ext.grid.column.Column'
		     ,alias: 'widget.progresscolumn'		 
		    ,progressCls: 'x-progress'

			,progressText: '{0} %'
		    ,constructor: function(config)
		    {
		        var me = this
		        ,cfg = Ext.apply({}, config)
		        ,cls = me.progressCls;	        
		        me.callParent([cfg]);	        
		        me.renderer = function(v, meta) 
		        {
		        	var text, newWidth;
		            
		            newWidth = Math.floor((v/100) * me.getWidth(true));

		            v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, arguments)||v : v; //this = renderer scope
		            text = Ext.String.format(me.progressText, Math.round(v));		              
		            v =   '<div class="x-progress x-progress-default x-border-box">' +
		                    '<div class="x-progress-text x-progress-text-back" style="width: 130px;">' + text + '</div>' + 
	            	        '<div class="x-progress-bar x-progress-bar-default" style="width: '+ newWidth + 'px;">' +  	 
	            	        '<div class="x-progress-text" style="width: 130px;"><div>' +text+'</div></div></div></div>'
		            return v;		        	
		        };    
		    }//eof constructor
		    
		    ,destroy: function() {
		        delete this.renderer;
		        return this.callParent(arguments);
		    }//eof destroy
}); //eo extend
	
	

var fun_savework = function()
{
	var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();		
	/*
	var WORK_ID = Ext.getCmp('db_link_workid').getValue();
	if(WORK_ID == "0")
	{
		alert("WORK_ID IS NOT VALID (0) for save work");
		return;
	}
	*/
	var engineCombo = Ext.getCmp('db_link_enginecombo');
	var ENGINE_NAME = engineCombo.getRawValue();
	var engineStore = engineCombo.getStore();
	var items = engineStore.data.items;
	var item_length = items.length;
	var ENGINE_ID = "";
    for(var itemi = 0; itemi < item_length; itemi++)
    {
	   if( items[itemi].data.instanceName == ENGINE_NAME)
	   {
		   ENGINE_ID = items[itemi].data.id;
		   break;
	   }
    }
	var DATABASE_TYPE = Ext.getCmp('db_link_dbtype').getValue();
	var DATABASE_ADDRESS = Ext.getCmp('db_link_dbaddress').getValue();
	var DATABASE_PORT = Ext.getCmp('db_link_db_port').getValue();
	var DBid =  Ext.getCmp('db_link_user_id').getValue();
	var DBPassword =  Ext.getCmp('db_link_user_password').getValue();
	var SQLSTATEMENT = Ext.getCmp('db_link_sql_textareafield').getValue();
	var HDFSImportPath = Ext.getCmp('db_link_import_path').getValue();
	var database_name  = Ext.getCmp('db_link_databasename').selected_database_name;
	var table_name = Ext.getCmp('db_link_tablelist').selected_table_name ;
	var user_name = getCookie('user_name')
	
	var delimiter = Ext.getCmp('delimiterValue').getValue();	
	delimiter = delimiter.replace("\\t","\t");	
	var param = {
			ENGINE_ID:ENGINE_ID,
			ENGINE_NAME:ENGINE_NAME,
			WORK_NAME:WORK_NAME,
		//	WORK_ID:WORK_ID,
			DATABASE_TYPE:DATABASE_TYPE,
			DATABASE_ADDRESS:DATABASE_ADDRESS,
			DATABASE_PORT:DATABASE_PORT,
			DBid:DBid,
			DBPassword:DBPassword,
			SQLSTATEMENT:SQLSTATEMENT,
			HDFSPATH:HDFSImportPath,
			DATABASE_NAME:database_name,
			TABLE_NAME:table_name,
			FILE_MODE:Ext.getCmp('hiddentextfield').getValue(),
			USER_NAME:user_name, 
			DELIMITER:delimiter
		};
		
	var insert_param = "ENGINE_NAME:"+ENGINE_NAME +"<br>"+
	"WORK_NAME:"+WORK_NAME +"<br>"+
	"DATABASE_TYPE:"+DATABASE_TYPE +"<br>"+
	"DATABASE_ADDRESS:"+DATABASE_ADDRESS +"<br>"+
	"DATABASE_PORT:"+DATABASE_PORT +"<br>"+
	"DBid:"+DBid +"<br>"+
	"DBPassword:"+DBPassword +"<br>"+
	"SQLSTATEMENT:"+SQLSTATEMENT +"<br>"+
	"HDFSPATH:"+HDFSImportPath +"<br>"+
	"DATABASE_NAME:"+database_name +"<br>"+
	"TABLE_NAME:"+table_name +"<br>"+
	"FILE_MODE:"+Ext.getCmp('hiddentextfield').getValue() +"<br>"+
	"USER_NAME:"+user_name +"<br>"+
	"DELIMITER:"+delimiter;
		
	var rate = 0;
	var pgb = Ext.getCmp('pgb');
	pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ 0 +'/' + 0 +']'+ 'ready...', true);
	console.info("save param:");
	console.info(param);
	
	//SAVE WORK QUERY
	Flamingo.Ajax.Request.invokePostByMap('/fs/hdfs/db_work_insert', param,function (response)
	{
		var obj = Ext.decode(response.responseText);
		if (obj.success) 
		{
			console.info("new work id");
			console.info(obj.list[0]);
			console.info(obj.list[0].workId);
			Ext.getCmp('db_link_workid').setValue(obj.list[0].workId);
		}
		else
		{
			
		}
	}
	,
	function (response)
	{
		/*
		Ext.MessageBox.show({
			title: 'Import work save Error',
			msg: response.statusText + '(' + response.status + ')',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
		console.info("2:");
		console.info(response.status);
		*/
	});//END OF INVOKE
	
}

var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
var prevGridColumn = [];
var showBrowser = function(engineId)
{
	if (engineId) 
	{
	    var popWindow = Ext.create('Ext.Window',
	    	{
	        title: MSG.DESIGNER_TITLE_FILE_BROWSER,
	        width: 800,
	        height: 400,
	        modal: true,
	        resizable: true,
	        constrain: true,
	        layout: 'fit',
	        items: [
	                	Ext.create('Flamingo.view.desktop.dblink_hdfsBrowser', 
	            		{
	                		engineId: engineId
	            		})
	            	],        
	            	buttonAlign: 'center',
			        buttons: [
			            {
			                text: MSG.COMMON_OK,
			                iconCls: 'common-confirm',
			                handler: function ()
			                {
			                    var lastPathComp = popWindow.query('dblinkhdfsDirectory #lastPath')[0];
			                    if (lastPathComp.getValue()) 
			                    {
			                        var textfield = Ext.getCmp('db_link_import_path')
			                        textfield.setValue(lastPathComp.getValue());
			                        popWindow.close();
			                    }
			                }
			            },
			            {
			                text: MSG.COMMON_CANCEL,
			                iconCls: 'common-cancel',
			                handler: function ()
			                {
			                    popWindow.close();
			                }
			            }
			        ]	        
	    }).center().show();
	}
	else 
	{
		Ext.MessageBox.show(
				{
					title: 'PATH',
					msg: "Please select a Hadoop Cluster",//obj.error.message,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});
			return;		
	}
};  


function getCBSValue(cb, nameIn, nameOut){
     try{
          var r = cb.getStore().find(nameIn,cb.getValue());
          return r.get(nameOut);
     }
     catch(err){
          return'error';
     }
};


function ozit_interval_test( start,  end,  status,  workname){ 
	var engineCombo = Ext.getCmp('db_link_dashboard_enginecombo');
	if ( engineCombo + "" == 'undefined')
	{
		console.info("Close");
		//clearInterval(dashboard_timerid);
		return;
	}
	var engineDisplay = engineCombo.getRawValue();
	
	var engineStore = engineCombo.getStore();
	var items = engineStore.data.items;
	var item_length = items.length;
	var EngineID = "";
	for(var itemi = 0; itemi < item_length; itemi++)
	{
		if( items[itemi].data.instanceName == engineDisplay)
		{
			EngineID = items[itemi].data.id;
			break;
		}
	}
	
	myMask.show();
	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/worknamelistbydashboard", 
		{
			ENGINE_ID:EngineID,
			SEARCH_START:start,
			SEARCH_END:end,
			SEARCH_STATUS:status,
			SEARCH_WORKNAME:workname,
		},
				function (response)
				{
					var obj = Ext.decode(response.responseText);													                
					if (obj.success)
					{
						console.info(obj.list);
						DBLinkDashBord_store.loadData(obj.list);					
					}
					else
					{
						//clearInterval(dashboard_timerid);
					}
				}
		);
	myMask.hide();
	}

var c = 0;
var t;
var timer_is_on = 0;
function doTimer() 
{
    if (!timer_is_on)
    {
    	timer_is_on = 1;
    	timedCount();
    }
}

function clear_prieviewGrid()
{
	var previewGrid = Ext.getCmp('db_link_previeGrid');
	
	var head_length = 1;																							                	
	var fields = [];
	for(var hi = 0; hi < head_length; hi++)
	{
		var name_value = "";
		fields.push( { name:name_value.toString() } ); //dataindex 설정
	}
																																							
	var data = [];																																							
	var store2 = Ext.create('Ext.data.Store', {  fields:fields, data:data });																																				 					
	store2.load({
	callback: function(records)
	{
		store2.loadData("");																																																				
	}
	});	

	var model2 = [];
	for(var hi =0; hi < head_length; hi++)
	{
		var dataIndexValue = fields[hi].name.toString();
		prevGridColumn.push(dataIndexValue);																																																																																									
		model2.push({
					text : dataIndexValue,
					flex : 1,																																																																																			
					dataIndex : dataIndexValue	
		});																																
	}																																	
	previewGrid.reconfigure(store2, model2);
	
}
var prog = 0;
function timedCount()
{
		var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();
		console.info('workname');
		console.info(WORK_NAME);
		var engineCombo = Ext.getCmp('db_link_enginecombo');
		var engineDisplay = engineCombo.getRawValue();
		var engineStore = engineCombo.getStore();
		var items = engineStore.data.items;
		var item_length = items.length;
		var EngineID = "";
		for(var itemi = 0; itemi < item_length; itemi++)
		{
			console.info(items[itemi].data.instanceName);
			if( items[itemi].data.instanceName == engineDisplay)
			{
				EngineID = items[itemi].data.id;
				break;
			}
		}
		Flamingo.Ajax.Request.invokeGet("/fs/hdfs/PROGRESSRATE", {
																										ENGINE_ID:EngineID,
																										WORK_NAME:WORK_NAME
																									},
		function (response)
		{
			var obj = Ext.decode(response.responseText);
			if (obj.success)
			{
				console.info(obj.list[0].progress);
				console.info(obj.list[0].totalcount);					
				if(obj.list[0].progress != 'undefined' && obj.list[0].totalcount != 'undefined')
				{
					
					if(obj.list[0].totalcount > 0)
					{
							if(obj.list[0].progress == obj.list[0].totalcount)
							{
								console.info('Complete timer stop');
								timer_is_on = 0;
								clearTimeout(t);
								
								import_button.disable();
								import_button.setDisabled(true);
							}	
							var rate = parseFloat(obj.list[0].progress) / parseFloat(obj.list[0].totalcount);
							console.info('rate' + Math.round(100* rate)+'% completed');
							var pgb = Ext.getCmp('pgb');
							pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+ 'completed...', true);
					}
				}
			}
			else if(obj.fail)
			{
					console.info('Fail timer stop');
					clearTimeout(import_t);
			}
		}
	);
	
	t = setTimeout(function(){timedCount()}, 1000); 	
}




Ext.define('DBLinkDashBord_Model',{
		extend:'Ext.data.Model',
		fields:	[
		       	 {name:'workname'},
		       	 {name:'dbname'},
		       	 {name:'tablename'},
		       	 {name:'query'},
		       	 {name:'hdfs'},
		       	 {name:'progress', type:'int'},
		       	 {name:'start_time'},
		       	{name:'end_time'},
		       	{name:'user'},
		       	{name:'status'}
]
});
var DBLinkDashBord_store = Ext.create('Ext.data.Store',  
{
    	model:'DBLinkDashBord_Model',
     	pageSize:50,
     	proxy: {
        	type: 'ajax',
        	url: "/fs/hdfs/worknamelistbydashboard",
       		headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json; charset=utf-8;'
        	},
	        reader: {
	            type: 'json',
	            root: 'list',
	            totalProperty: 'total',
	            idProperty: 'id'
	        }
   		 },
}); 			        
var DBLinkDashBord_columns = [                                
							 	{
									text:'Work Name',
									dataIndex: 'workname',
									align: 'center',
									width:80
								}
							 	,
							 	{
							 		text:'Database Name',
									dataIndex: 'dbname',
									align: 'center',
									width:95
								}
							 	,
							 	{
							 		text:'Table Name',
									dataIndex: 'tablename',
									align: 'center',
									width:95
								}
							 	,
							 	{
							 		text:'Query',
									dataIndex: 'query',
									align: 'center',
									width:95
								}
							 	,
							 	{
							 		text:'HDFS',
									dataIndex: 'hdfs',
									align: 'center',
									width:95
								},	
								{
									text: 'Start Date', 
									width: 95, 
									dataIndex: 'start_time',
									align: 'center'
										
									,renderer: function (value) {
										if(value.length > 0)
											return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
			                        }
			                    },
			                    {
			                    	text: 'End Date', 
			                    	width: 95, 
			                    	dataIndex: 'end_time',			                   
			                    	align: 'center'										
									,renderer: function (value) {
										
										if(value.length > 0)
											return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
			                        }
			                    },
								{
								     text: "Progress", 
								    dataIndex: 'progress', 
								    align:'center',
								    xtype: 'progresscolumn',								    
								    menuDisabled : true,
								    hideable:false,
								    resizable:false,								    
								    width  : 138,
								    editor: {
								        xtype:'numberfield',
								        minValue: 0,
								        maxValue: 100,                    
								        allowBlank: false
								    }								    
								},
								{
									text: 'Status', 
									width: 90, 
									dataIndex: 'status', 
									align: 'center',
									renderer: function (value, meta) {
										if (value === 'READY') {
			                                meta.tdCls = 'status-yellow';
			                                return 'Ready';//MSG.DASHBOARD_STATUS_READY;
			                            }
										 if (value === 'RUNNING') {
				                                meta.tdCls = 'status-green';
				                                return MSG.DASHBOARD_STATUS_RUNNING;
				                            }
										 
										if (value === 'SUCCESS') {
			                                meta.tdCls = 'status-blue';
			                                return MSG.DASHBOARD_STATUS_SUCCESS;
			                            }
			                            if (value === 'FAIL') {
			                                meta.tdCls = 'status-red';
			                                return MSG.DASHBOARD_STATUS_FAIL;
			                            }
			                            if (value === 'KILL') {
			                                meta.tdCls = 'status-gray';
			                                return MSG.DASHBOARD_STATUS_KILL;
			                            }
			                           
			                            return value;
								}
							},
							{
							text: 'User ID', 
							 width: 70, 
							 dataIndex: 'user', 
							 align: 'center'
							 }
							];
var dashboard_timerid = "";
var import_progress_timerid = "";


//WINDOW START
Ext.define('Flamingo.view.desktop.DBLinkTest', {
	extend: 'Flamingo.view.desktop.ux.Module',
	requires: [
		  'Flamingo.view.desktop.dblink_hdfsBrowser'
	],
	windowId: 'DBLinkTest_Classs',
	id:'DBLinkTest_Classs',
	tipWidth: 160,
    tipHeight: 96,
    init: function () {    	
        this.launcher = {
            text: 'DB LINK',//start button icon text
            iconCls: 'bogus'
        }
    },
   
    createWindow: function (src) 
    {
    	var me = this, desktop = me.app.getDesktop(),
        win = desktop.getWindow(me.id);
    	
		if (!win) 
		{
			win = desktop.createWindow({
			 			id: me.id,
			 			maximizable: true,
		                animateTarget: 'button',
			 			title: 'DB Import / Export', 
		                width: 996,
		                //width: 1450,
		                height: 600,
		                iconCls: 'desktop-DBLink-small',
		                animCollapse: false,
		                closeAction: 'hide',
		                border: false,
		                tools: [{type: 'pin'}],
		                layout: { type: 'border', padding: 5  },
		                items: [{
					                    region: 'center',
					                    xtype: 'tabpanel',
					                    items: [
					                            {	
							                        title: 'DashBoard',
							                        items: [
							                                
															{
								                                tbar: [
																		{
																			xtype:'DB_Link_EngineCombo',
																			id:'db_link_dashboard_enginecombo',
																			fieldLabel: 'Hadoop Cluster',
																			width:200,
																			labelWidth:90,
																			labelAlign:'right',
																			forceselection:true,
																			listeners:
																			{
																				'change':function(newValue, oldValue)
																				{
																					//dashboard_timerid = setInterval(function(){ozit_interval_test()}, 1000);
																					var start_date = Ext.getCmp('db_link_dashboard_startDate').getSubmitValue();
																					var end_date = Ext.getCmp('db_link_dashboard_endDate').getSubmitValue();
																					var status = Ext.getCmp('db_link_dashboard_status').getValue();
																					var work_name = Ext.getCmp('db_link_dashboard_workname').getValue();
																																										
																					ozit_interval_test(start_date, end_date, status, work_name);
																				}
																			}
																		},
												                        {
												                            xtype: 'datefield',
												                            fieldLabel: 'Start',
												                            format: 'Y-m-d',
												                            id: 'db_link_dashboard_startDate',
												                            itemId: 'db_link_dashboard_startDate',
												                            vtype: 'dateRange',
												                            endDateField: 'db_link_dashboard_endDate',
												                            width:140,
																		    labelWidth:40,
																		    labelAlign:'right'
												                        },										                      
												                        {
												                            xtype: 'datefield',
												                            fieldLabel: 'End',
												                            format: 'Y-m-d',
												                            itemId: 'db_link_dashboard_endDate',
												                            id: 'db_link_dashboard_endDate',
												                            vtype: 'dateRange',
												                            startDateField: 'db_link_dashboard_startDate',
												                            width:140,
																		    labelWidth:40,
																		    labelAlign:'right'
												                        },										                      
												                        {
												                            xtype: 'combo',
												                            fieldLabel: 'Status',
												                            name: 'status',
												                            id: 'db_link_dashboard_status',
												                            editable: false,
												                            queryMode: 'local',
												                            typeAhead: true,
												                            selectOnFocus: true,
												                            displayField: 'name',
												                            valueField: 'value',
												                            width:140,
																		    labelWidth:50,
																		    labelAlign:'right',
												                            value: 'ALL',
												                            store: Ext.create('Ext.data.Store', {
												                                fields: ['name', 'value', 'description'],
												                                data: [
												                                    {name: MSG.DASHBOARD_STATUS_ALL, value: 'ALL'},
												                                    {name: MSG.DASHBOARD_STATUS_RUNNING, value: 'RUNNING'},
												                                    {name: MSG.DASHBOARD_STATUS_SUCCESS, value: 'SUCCESS'},
												                                    {name: MSG.DASHBOARD_STATUS_FAIL, value: 'FAIL'},
												                                    {name: MSG.DASHBOARD_STATUS_KILL, value: 'KILL'}
												                                ]
												                            })
												                        },										                        
												                        {
												                            xtype: 'textfield',
												                            fieldLabel: 'Work Name',
												                            id: 'db_link_dashboard_workname',
												                            width:170,
																		    labelWidth:70,
																		    labelAlign:'right'
												                        },
												                        {
												                            xtype: 'tbspacer',
												                            width: 10
												                        },
												                        {
												                            xtype: 'button',
												                            //itemId: 'findDBLinkBtn',
												                            id: 'dblink_dashboard_findDBLinkBtn',
												                            formBind: true,
												                            text: 'Find',
												                            iconCls: 'common-find',
												                            labelWidth: 50
												                            ,listeners :
												                            {
												                                click: function(btn, e, eOpts) 
												                                {
												                                	var start_date = Ext.getCmp('db_link_dashboard_startDate').getSubmitValue();
																					var end_date = Ext.getCmp('db_link_dashboard_endDate').getSubmitValue();
																					var status = Ext.getCmp('db_link_dashboard_status').getValue();
																					var work_name = Ext.getCmp('db_link_dashboard_workname').getValue();
																																										
																					ozit_interval_test(start_date, end_date, status, work_name);
												                                  }
												                             }
												                        },										                     
												                        {
												                            xtype: 'button',
												                            id: 'dblink_dashboard_clearDBLinkBtn',
												                            formBind: true,
												                            text: 'Clear',
												                            iconCls: 'common-find-clear',
												                            labelWidth: 50
												                            ,listeners :
												                            {
												                                click: function(btn, e, eOpts) 
												                                {
												                                	Ext.getCmp('db_link_dashboardgrid').getStore().removeAll();
												                                    console.log(btn, e, eOpts);
												                                  }
												                             }
												                        },										                     
												                        {
												                            xtype: 'button',
												                            id: 'dblink_dashboard_KillDBLinkBtn',
												                            formBind: true,
												                            text: 'Stop',
												                            iconCls: 'common-cancel',
												                            labelWidth: 50
												                            ,listeners :
												                            {
												                                click: function(btn, e, eOpts) 
												                                {
												                                	/*
												                                	 아래의 코드에 문제가 있을시 사용할 것.												                                	
												                                	var selectedRowIndexes = [];
												                                	// returns an array of selected records
												                                	var Dash_Grid = Ext.getCmp('db_link_dashboardgrid');
												                                	var selectedBanners = Dash_Grid.getSelectionModel().getSelections(); 

												                                	Ext.iterate(selectedBanners, function(banner, index) {
												                                	    // push the row indexes into your array
												                                	    selectedRowIndexes.push(Dash_Grid.getStore().indexOf(banner)); 
												                                	});  
												                                	console.info(selectedRowIndexes.length);
												                                	*/
												                                	
												                                	var Dash_Grid = Ext.getCmp('db_link_dashboardgrid');												                                	
												                                    var row = Dash_Grid.getSelectionModel().getSelection();
												                                    console.info("dashboard selected works:"+ row.length);
												                                    if(row.length > 0)//체크된 워크가 있을 때만 작동한다.
												                                    {
													                                	Ext.MessageBox.show({
													                                		title:'Warning',
													                                		msg: 'Do you want to stop the selected works?',
													                                		buttonText: {yes: "Stop",no: "No"},
													                                		fn: function(btn)
													                                		{  
													                                			if (btn == 'yes') 
													                                			{
													                                				var engineCombo = Ext.getCmp('db_link_dashboard_enginecombo');
																                                	if ( engineCombo + "" == 'undefined')
																                                	{
																                                		Ext.MessageBox.show(
																							        			{
																							        				title: 'Engine',
																							        				msg: start_method + " is not supported query",
																							        				buttons: Ext.MessageBox.OK,
																							        				icon: Ext.MessageBox.WARNING
																							        			});
																                                		return;
																                                	}
																                                	var engineDisplay = engineCombo.getRawValue();												                                	
																                                	var engineStore = engineCombo.getStore();
																                                	var items = engineStore.data.items;
																                                	var item_length = items.length;
																                                	var EngineID = "";
																                                	for(var itemi = 0; itemi < item_length; itemi++)
																                                	{
																                                		if( items[itemi].data.instanceName == engineDisplay)
																                                		{
																                                			EngineID = items[itemi].data.id;
																                                			break;
																                                		}
																                                	}
																                                	var Dash_Grid = Ext.getCmp('db_link_dashboardgrid');												                                	
																                                    var row = Dash_Grid.getSelectionModel().getSelection();
																                                    for(var i = 0; i < row.length; i++)
																                                    {
																                                    	console.log(row[i].raw.workname);
																                                    	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/kill_work", 
																                                    	{
																                                    		ENGINE_ID:EngineID, 
																                                    		WORK_NAME:row[i].raw.workname
																                                    	},
																										function (response)
																										{
																											var obj = Ext.decode(response.responseText);																							
																											if (obj.success)
																											{
																												console.info("Kill work Setted");
																												var start_date = Ext.getCmp('db_link_dashboard_startDate').getSubmitValue();
																												var end_date = Ext.getCmp('db_link_dashboard_endDate').getSubmitValue();
																												var status = Ext.getCmp('db_link_dashboard_status').getValue();
																												var work_name = Ext.getCmp('db_link_dashboard_workname').getValue();
																																																	
																												ozit_interval_test(start_date, end_date, status, work_name);
																											}
																											else
																											{
																												console.info("Kill work Set failed");
																											}
																										});
																                                    }
																                                   
													                                			}
													                                		},
													                                		animateTarget: 'mb4',
													                                		icon: Ext.MessageBox.WARNING
													                                	});
													                                	//End of messagebox
												                                    }
												                                    else
												                                    {
												                                    	//체크된 워크가 없을 시 경고 창 올림.
												                                    	Ext.Msg.alert('Work name stop error', 'Please select work'); 												                                    	
												                                    }
												                                    
												                                }
												                             }
												                        }
																	]
								                                }
							                                ,
															{
										                        xtype: 'grid',
																title:'Import Work DashBorad',
																iconCls: 'status-green',
																id:'db_link_dashboardgrid',
																height: 500,
																width: 975,
																store:  DBLinkDashBord_store,
																columns:DBLinkDashBord_columns,
																selType:'rowmodel',
																selModel: Ext.create('Ext.selection.CheckboxModel', {
												                    ignoreRightMouseSelection: true
												                })
															}]
					                            }
					                            ,
					                            {	
						                        title: 'Import',
						                        items: [
															{
																 //xtype:  import_argu_panel 
																xtype:'panel', 
					                    						layout:'hbox',
					                    						border:false,						                      	
					            		                      	items: link_meta_items
															},																											
					                        				{
					                        					title:'Database&Preview',
					                        					iconCls: 'status-blue',
					                    						xtype:'panel', 
					                    						layout:'hbox',
					                    						id:'panel_db_query_import',					                    						
					                    						items:[							                    						     
				                    									{
								                    					xtype:'panel',
								                    					title: 'Database',
								                    					iconCls: 'status-green',
								                    					id:'panel_dbms_preview',   
								                    					//collapsible: true,
								                    					items: [
							                    					            {
																					xtype: 'grid',
																					id:'db_link_databasename',
																					title:'Database Name',
																					iconCls: 'status-green',
																					height: 175,
																					gridRowCount:0,
																					width: 230,		                    
																					columns:database_columns, 
																					store: db_store,
																					selModel:{
																						selType:'cellmodel'
																					},
																					singleSelect:true,
																					listeners:
																					{
																						itemdblclick : dbDatabaseNameClick	                    		
																					},
																					loadMask:true,
																					split: true,
																					////collapsible: true,
																					setted_database_name:'',
																					floatable: false
																               }
																               ,
																               {
																				xtype: 'grid',
																				title:'Table Name',
																				iconCls: 'status-green',
																				id:'db_link_tablelist',
																				height: 250,
																				width: 230,
																				store: table_store, 
																				columns: table_columns, 
																				selType:'rowmodel',
																				singleSelect:true,
																				listeners:{
																				itemdblclick : dbTableNameClick	                    		
																				},
																				loadMask:true,
																				split: true,
																				////collapsible: true,
																				floatable: false
																               }]     
																		},
																		{
																			xtype:'panel', layout:'hbox', border:false,
																			layoutConfig:{
																				pack:'center',
																				align:'middle'
																			},
																			id:'panel_selected_query_run',
																			items:
																			[
																				{
																				xtype: 'grid',
																				title: 'Fields',
																				iconCls: 'status-green',
																				id:'db_link_fieldlist',
																				height:450,
																				width: 180,
																				multiSelect:true,
																				selType:'checkboxmodel',//행단위로 선택된다.
																				store: fields_store, 
																				columns:fields_columns,	                    	
																				split: true,
																				floatable: false,
																				listeners:
																				{
																					selectionchange: function(value, meta, record, row, rowIndex, colIndex)
																					{
																						var database_name = Ext.getCmp('db_link_databasename').selected_database_name;
																						var table_name = Ext.getCmp('db_link_tablelist').selected_table_name ;																						
																						var field_Grid = Ext.getCmp('db_link_fieldlist');
																						var field_list = '';																						
																						var selectedRecords = field_Grid.getSelectionModel().getSelection();																						
																						for(var i =0, len = selectedRecords.length; i < len; i++)
																						{	
																						  field_list += selectedRecords[i].data.fieldName +',';
																						}
																						var query_field = field_list.substr(0, field_list.length-1);			
																						var DBType = Ext.getCmp('db_link_dbtype').getValue();
																						var new_query = "";
																						
																						if(DBType == "MySQL")
																						{
																							new_query = 'select ' + query_field + ' from ' + database_name +'.' + table_name;
																						}
																						else if(DBType == "MSSQL")
																						{
																							new_query = "select " + query_field + " from  [" + database_name+"].[" + "dbo].[" + table_name+"]";																										
																						}
																						
																						Ext.getCmp('db_link_sql_textareafield').setValue(new_query);																						
																						
																						//run query
																						var sql = new_query.toLowerCase();
																						var start_method = sql.substring(0, 6);
																				        start_method = start_method.toLowerCase();
																				        if(start_method === "select")
																				        {
																				                console.info(start_method);
																				        }
																				        else
																				        {
																				                console.info(start_method +" is not supported query");
																				                /*
																				                Ext.MessageBox.show(
																					        			{
																					        				title: 'Preview query',
																					        				msg: start_method + " is not supported query",
																					        				buttons: Ext.MessageBox.OK,
																					        				icon: Ext.MessageBox.WARNING
																					        			});
																				                */
																					        	Ext.getCmp('db_link_sql_textareafield').focus();
																				                return;
																				        }
																				        sql = sql.toLowerCase();
																				        
																				        var sel_start = sql.indexOf("select");
																				        var from_start = sql.indexOf("from");
																				        
																				        if(from_start <= 0)
																				        {
																				                console.info("Query Error No from");
																				                /*
																				                Ext.MessageBox.show(
																					        			{
																					        				title: 'Query',
																					        				msg: "Query Error No from",//obj.error.message,
																					        				buttons: Ext.MessageBox.OK,
																					        				icon: Ext.MessageBox.WARNING
																					        			});
																				                */
																					        		Ext.getCmp('db_link_sql_textareafield').focus();
																				                return;
																				        }
																				        
																				        var sub_query = sql.substring(sel_start+6, from_start);
																				        sub_query = sub_query.trim();
																				        if(sub_query.length == 0)
																				        {
																				        	/*
																				        	Ext.MessageBox.show(
																				        			{	
																				        				title: 'Query',
																				        				msg: "Please Input Fields",//obj.error.message,
																				        				buttons: Ext.MessageBox.OK,
																				        				icon: Ext.MessageBox.WARNING
																				        			});
																				        	*/
																				        	Ext.getCmp('db_link_sql_textareafield').focus();
																				        }
																				        else
																				        {
																				                run_preview_Query();
																				        }
																					}
																				
																				
																				}
																		        }
																				,
																				{
																				xtype:'panel', 
																				layout:'vbox',
																				title: 'Query', 
																				iconCls: 'status-orange',
																				border:false,
																				id:'panel_query_run_preview',
																				items:
																						[
																							{
																								xtype:'panel',
																								layout:'hbox',
																								border:false,
																								id:'panel_user_query_run',
																								items:[
																								       {
																											//TEXTAREA
																											xtype     : 'textareafield',
																											id:'db_link_sql_textareafield',//SQL(MYSQL) INPUT TEXTBOX
																											value : '',
																											width : 480,
																											grow      : true,
																											anchor:'100%',
																											name      : 'message'
																										},
																										{
																											xtype: 'tbspacer',
																											width: 4
																								        },
																		                      			{
													                      									//PREVIEW BUTTON AND HANDLER
																						                	layout:'vbox',
																				                      		border:false,
																				                      		items:[
																				                      		       {
																						                      			xtype: "button",
																						                      			height: 60,
																						                      			width: 73,
																									                	text: 'Preview',  //SQL RESULT PREVIEW
																									                	iconCls: 'common-confirm',
																														handler: function() 
																														{
																															if(Ext.getCmp('db_link_sql_textareafield').getValue() != '')
																															{
																																var sql = Ext.getCmp('db_link_sql_textareafield').getValue() ;
																																var start_method = sql.substring(0, 6);
																														        start_method = start_method.toLowerCase();
																												
																														        if(start_method ===  "select")
																														        {
																														                console.info(start_method);
																														        }
																														        else
																														        {
																														                console.info(start_method + " is not supported query");	
																														                Ext.MessageBox.show(
																															        			{
																															        				title: 'Preview query',
																															        				msg: start_method + " is not supported query",
																															        				buttons: Ext.MessageBox.OK,
																															        				icon: Ext.MessageBox.WARNING
																															        			});
																															        	Ext.getCmp('db_link_sql_textareafield').focus();		
																														        }
																														        var sel_start = sql.indexOf("select");
																														        var from_start = sql.indexOf("from");
																														        if(from_start <= 0)
																														        {
																														                console.info("Query Error No from");
																														                Ext.MessageBox.show(
																															        			{
																															        				title: 'Query',
																															        				msg: "Query Error No from",//obj.error.message,
																															        				buttons: Ext.MessageBox.OK,
																															        				icon: Ext.MessageBox.WARNING
																															        			});
																															        		Ext.getCmp('db_link_sql_textareafield').focus();																													
																														                
																														        }
																														        var sub_query = sql.substring(sel_start+6, from_start);
																														        sub_query = sub_query.trim();
																														        if(sub_query.length == 0)
																														        {
																														                console.info("Query Error");
																														                Ext.MessageBox.show(
																															        			{
																															        				title: 'Query',
																															        				msg: "Query Error No Fields",//obj.error.message,
																															        				buttons: Ext.MessageBox.OK,
																															        				icon: Ext.MessageBox.WARNING
																															        			});
																															        		Ext.getCmp('db_link_sql_textareafield').focus();																														                
																														        }
																														        else
																														        {
																														                console.info("Maybe ok");
																														                run_preview_Query();
																														        }

																																
																															}
																															
																														}//end of handler
																												    }]
																		                      			}]
																							},
																							{
																								xtype: 'grid',
																								title:'Preview',
																								iconCls: 'status-orange',
																								id:'db_link_previeGrid',
																								height: 282,
																								width: 560,
																								// store: table_store, 
																								columns: preview_columns, 
																								selType:'cellmodel',//셀 단위 선택
																								singleSelect:true,
																								listeners:
																								{
																									itemclick : function(columns, dataIndex)
																									{
																									
																									} ,
																									cellclick : function(view, cell, cellIndex, record, row, rowIndex, e) 
																									{
																								        console.info('cellIndex' + cellIndex);
																								        
								                            											var previewGrid = Ext.getCmp('db_link_previeGrid');	
									                            										var records = previewGrid.getStore().queryBy(function(record)
									                            										{
									                            											return record.get('selected'+prevGridColumn[cellIndex]) === true;
									                            										});																			                            										
																										
																										records.each(function(record) {
																										   field.push(record.get(prevGridColumn[i]));
																										});
																								    }
																								},
																								loadMask:true,
																								split: true,
																								//collapsible: true,
																								floatable: false
																							}
																							,
																							{
																								xtype: 'toolbar',
																					            dock: 'top',
																			                	items:[
																										{
																											xtype: "textfield",
											                            									inputType: "text",
											                            									width:291,
																						                	id:'db_link_import_path',
																						                	columnWidth:.3
																						                	,value:'/'
																						                	,enableKeyEvents: true
																					                		,listeners :
																					                		{
																					                			keypress : function(textfield, e, options)
																					                		    {
																					                				console.info("Path key event");
																					                				var db_link_import_button = Ext.getCmp('db_link_import_button');																												
																													db_link_import_button.setDisabled(false);	
																					                		    }
																					                		}
																										}
																										,																										
																						                {
																						            	   text:'PATH',		
																						            	   iconCls: 'common-folder',
																						            	   handler:function()
																						            	   {
											                            									   var engineCombo = Ext.getCmp('db_link_enginecombo');
											                            									   var engineDisplay = engineCombo.getRawValue();
																						            		   var engineStore = engineCombo.getStore();
																						            		   var items = engineStore.data.items;
																						            		   var item_length = items.length;
																						            		   var EngineID = "";
																						            		   for(var itemi = 0; itemi < item_length; itemi++)
																						            		   {
																						            			   console.info(items[itemi].data.instanceName);
																						            			   if( items[itemi].data.instanceName == engineDisplay)
																						            			   {
																						            				   EngineID = items[itemi].data.id;
																						            				   break;
																						            			   }
																						            		   }
																						            		   console.info(EngineID);
																						            		   showBrowser(EngineID);
																						            		
											                            									}
																				                        }
																										,																										
																										{
																										     xtype: 'combo',
																										     name: 'delimiter',
																										     width:100,
																										     value: '\\t',
																										     flex: 1,
																										     forceSelection: true,
																										     multiSelect: false,
																										     editable: false,
																										     
																										     readOnly: this.readOnly,
																										     displayField: 'name',
																										     valueField: 'value',
																										     mode: 'local',
																										     queryMode: 'local',
																										     triggerAction: 'all',
																										     tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
																										     store: Ext.create('Ext.data.Store', {
																										         fields: ['name', 'value', 'description'],
																										         data: [
																										             {name: MSG.COMMON_DOUBLE_COLON, value: '::', description: '::'},
																										             {name: MSG.COMMON_COMMA, value: ',', description: ','},
																										             {name: MSG.COMMON_TAB, value: '\\t', description: '\\t'},
																										             {name: MSG.COMMON_BLANK, value: '\\s', description: '\\s'},
																										             {name: MSG.COMMON_USER_DEFINED, value: 'CUSTOM', description: MSG.COMMON_USER_DEFINED}
																										         ]
																										     }),
																										     listeners: {
																										         change: function (combo, newValue, oldValue, eOpts) {
																										             // 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
																										             var customValueField = combo.nextSibling('textfield');
																										             if (newValue === 'CUSTOM') {
																										                 customValueField.enable();
																										                 customValueField.isValid();
																										             } else {
																										             	if(customValueField!=null){
																										             		customValueField.disable();
																										                     if (newValue) {
																										                         customValueField.setValue(newValue);
																										                     } else {
																										                         customValueField.setValue('::');
																										                     }             		
																										             	}else{
																										             		customValueField = '\\t';
																										             	}
																										             }
																										         }
																										     }
																										},
																										{
																										     xtype: 'textfield',
																										     name: 'delimiterValue',
																										     width:100,
																										     id: 'delimiterValue',
																										     vtype: 'exceptcommaspace',
																										     flex: 1,
																										     disabled: true,
																										     //readOnly: this.readOnly,
																										     allowBlank: false,
																										     value: '\\t'
																										}																									
																									]	
																							},
																							{
																								xtype: 'toolbar',
																					            dock: 'top',
																					            width:560,																					           
																			                	items:[																																														                
																						                {
																											text:'SAVE WORK',
																											iconCls: 'designer-save',
																											tooltip: 'Saves a currently working database',
																											//HISTORY SAVE
																											hidden:true,
																											handler:function(){}
																				                		},																				                		
																						                {
											                            							   		xtype:'textfield',
											                            							   		id:'hiddentextfield',
											                            							   		text:'LABEL',
											                            							   		hidden:true,
											                            							   		handler:function(){}
											                            								},
																				                        '-',
																						                {
											                            							   		text:'New Work',		
											                            							   		iconCls: 'designer-create',
											                            							   		tooltip: 'Meta information reset',
											                            									handler:function(){	
											                            										Ext.getCmp('db_link_dbtype').setValue("");
																												Ext.getCmp('db_link_dbaddress').setValue("");
																												Ext.getCmp('db_link_db_port').setValue("");
																												Ext.getCmp('db_link_user_id').setValue("");
																												Ext.getCmp('db_link_user_password').setValue("");
																												Ext.getCmp('db_link_sql_textareafield').setValue("");
																												Ext.getCmp('db_link_import_path').setValue("");
																												
																												Ext.getCmp('db_link_worknamecombo').setRawValue("");
																												Ext.getCmp('db_link_enginecombo').setRawValue("");
																												
																												var databasegrid = Ext.getCmp('db_link_databasename');	
																												db_store.clearData();
																												db_store.removeAll();	
																												databasegrid.view.refresh();

																												var tablegrid = Ext.getCmp('db_link_tablelist');		
																												table_store.clearData();
																												table_store.removeAll();
																												tablegrid.view.refresh();
																													
																												var fieldGrid = Ext.getCmp('db_link_fieldlist');
																												fields_store.clearData();
																												fields_store.removeAll();
																												fieldGrid.view.refresh();
																												
																												clear_prieviewGrid();
																										
																												Ext.getCmp('db_link_history_button').history_load = false;
																												
																												var rate =0;
																												var pgb = Ext.getCmp('pgb');
																												pgb.updateProgress( rate, ' ', true);
																												
																												if(import_progress_timerid != undefined)
																												{
																													clearInterval(import_progress_timerid);
																												}
																												
																												
																												var db_link_import_button = Ext.getCmp('db_link_import_button');																												
																												db_link_import_button.setDisabled(true);
											                            									}
											                            								},																				                       
																				                		'-',
											                            								{
											                            									text:'Import',											                            									
											                            									iconCls: 'hdfs-file-upload',
											                            									id:'db_link_import_button',
											                            									tooltip: 'Import a currently data',
											                            									disabled: true,
											                            									handler:function()
											                            									{	
											                            										//******WORK SAVE AREA
											                            										var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();																										
											                            										var engineCombo = Ext.getCmp('db_link_enginecombo');
											                            										var ENGINE_NAME = engineCombo.getRawValue();
											                            										var engineStore = engineCombo.getStore();
											                            										var items = engineStore.data.items;
											                            										var item_length = items.length;
											                            										var ENGINE_ID = "";
											                            										for(var itemi = 0; itemi < item_length; itemi++)
											                            										{
											                            										   if( items[itemi].data.instanceName == ENGINE_NAME)
											                            										   {
											                            											   ENGINE_ID = items[itemi].data.id;
											                            											   break;
											                            										   }
											                            										}
											                            										var DATABASE_TYPE = Ext.getCmp('db_link_dbtype').getValue();
											                            										var DATABASE_ADDRESS = Ext.getCmp('db_link_dbaddress').getValue();
											                            										var DATABASE_PORT = Ext.getCmp('db_link_db_port').getValue();
											                            										var DBid =  Ext.getCmp('db_link_user_id').getValue();
											                            										var DBPassword =  Ext.getCmp('db_link_user_password').getValue();
											                            										var SQLSTATEMENT = Ext.getCmp('db_link_sql_textareafield').getValue();
											                            										var HDFSImportPath = Ext.getCmp('db_link_import_path').getValue();

											                            										console.info("HDFSImportPath:" + HDFSImportPath);

											                            										var database_name  = Ext.getCmp('db_link_databasename').selected_database_name
											                            										if(database_name == undefined)
											                            										{
											                            											Ext.MessageBox.show(
									                            													{
									                            														title: 'SAVE  Error',
									                            														msg: "Please select a Database",//obj.error.message,
									                            														buttons: Ext.MessageBox.OK,
									                            														icon: Ext.MessageBox.WARNING
									                            													});
											                            											return;
											                            										}

											                            										var table_name = Ext.getCmp('db_link_tablelist').selected_table_name
											                            										if(table_name == undefined)
											                            										{
											                            											Ext.MessageBox.show(
											                            											{
																															title: 'SAVE  Error',
																															msg: "Please select a Table",//obj.error.message,
																															buttons: Ext.MessageBox.OK,
																															icon: Ext.MessageBox.WARNING
											                            											});
											                            											return
											                            										}																								

											                            										if(ENGINE_NAME == "" || 
												                            										WORK_NAME == "" || 
												                            										DATABASE_TYPE == "" ||
												                            										DATABASE_ADDRESS == "" ||
												                            										DATABASE_PORT == ""||
												                            										DBid == ""||
												                            										SQLSTATEMENT ==""||
												                            										HDFSImportPath =="" )
											                            										{
											                            											Ext.MessageBox.show({
											                            															title :'Work Save Validation',
											                            															msg:'Please check Work Parmeter'
											                            											});
											                            										}
											                            										else
											                            										{
											                            											//Empty Folder Check																													
											                            											Flamingo.Ajax.Request.invokeGet("/fs/hdfs/PathEmpty", 
											                            											{
											                            												engineId:ENGINE_ID, 
											                            												path:HDFSImportPath
											                            											},
												                            										function (response)
												                            										{
												                            											var obj = Ext.decode(response.responseText);
												                            											if (obj.success)
												                            											{	
												                            												//정상 저장.
												                            												Ext.getCmp('hiddentextfield').setRawValue('2');
												                            												fun_savework();	//SAVE AND ASSINGN WORK ID
												                            												
													                            										}
													                            										else
													                            										{
													                            											console.info(obj.error);
													                            											if(obj.error.message == "-2")
													                            											{
													                            												//Directory is not empty
													                            												Ext.MessageBox.show(
															                            												{
															                            													title:'Importing Directory is not empty',
															                            													msg: 'You can not this importing directory<BR>Please use other directory',
															                            													buttonText: {ok: "Confirm"},
															                            													fn: function(btn)
															                            													{
															                            														if (btn == 'ok'){}
															                            										        	}
															                            												});
													                            											}
												                            											}
												                            										}
											                            										);
											                            										}

											                            										//SET IMPORT RUN
											                            										var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();
											                            										var engineCombo = Ext.getCmp('db_link_enginecombo');
																												var engineDisplay = engineCombo.getRawValue();
																												var engineStore = engineCombo.getStore();
																												var items = engineStore.data.items;
																												var item_length = items.length;
																												var EngineID = "";
																												for(var itemi = 0; itemi < item_length; itemi++)
																												{
																													console.info(items[itemi].data.instanceName);
																													if( items[itemi].data.instanceName == engineDisplay)
																													{
																														EngineID = items[itemi].data.id;
																														break;
																													}
																												}
																												if(EngineID.length == 0)			
																												{
																													alert('engineid is error');
																												}
																												
																												
																												Ext.MessageBox.show({
																														title:'Import work process',
																														msg: 'Do you want to run the import work?',
																														buttonText: {yes: "Run",no: "Cancel"},
																														fn: function(btn)
																														{  
																			     			            	        	   	if (btn == 'yes') 
																													       	{
																			     			            	        	   			var WORK_ID = Ext.getCmp('db_link_workid').getValue();
																			     			            	        	   			Flamingo.Ajax.Request.invokeGet("/fs/hdfs/import", 
															                            											{
															                            												ENGINE_ID:EngineID,
															                            												WORK_ID:WORK_ID
															                            											},
																																	function (response)
																																	{
																																		var obj = Ext.decode(response.responseText);
																																		if (obj.success)
																																		{
																																			//PROGRES BAR ACTION
																		                            										var pgb = Ext.getCmp('pgb');
																		                            										var rate = 0;
																		                            										pgb.updateProgress( rate, ' ', true);
														                            														
																		                            										console.info('Import WORK RUNNING');														                            										
																		                            										import_progress_timerid=setInterval(function(){
																					                            											console.log('setInterval');
																					                            											var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();
																					                            											console.info('workname');
																					                            											console.info(WORK_NAME);
																					                            											if(WORK_NAME.length == 0)
																					                            											{
																					                            												clearInterval(import_progress_timerid);
																					                            											}
																					                            											
																					                            											var engineCombo = Ext.getCmp('db_link_enginecombo');
																					                            											var engineDisplay = engineCombo.getRawValue();
																					                            											var engineStore = engineCombo.getStore();
																					                            											var items = engineStore.data.items;
																					                            											var item_length = items.length;
																					                            											var EngineID = "";
																					                            											for(var itemi = 0; itemi < item_length; itemi++)
																					                            											{
																					                            												console.info(items[itemi].data.instanceName);
																					                            												if( items[itemi].data.instanceName == engineDisplay)
																					                            												{
																					                            													EngineID = items[itemi].data.id;
																					                            													break;
																					                            												}
																					                            											}
																					                            											var WORK_ID = Ext.getCmp('db_link_workid').getValue();
																					                            											
																					                            											Flamingo.Ajax.Request.invokeGet("/fs/hdfs/PROGRESSRATE", 
																					                            											{
																					                            														ENGINE_ID:EngineID,
																					                            														WORK_ID:WORK_ID
																					                            											},
																					                            											function (response)
																					                            											{
																					                            												var obj = Ext.decode(response.responseText);
																					                            												var pgb = Ext.getCmp('pgb');
																					                            												var rate = 0;
																					                            												if (obj.success)
																					                            												{
																					                            													console.info(obj.list[0]);
																					                            													var status =obj.list[0].status;
																					                            													var progress = obj.list[0].progress;
																					                            													var totalcount = obj.list[0].totalcount;					
																					                            													var status = obj.list[0].status;
																					                            													
																					                            													var rate = parseFloat(progress) / parseFloat(totalcount);		
																					                            													if(isNaN(rate) == true)
																					                            														rate = 0;
																					                            													console.info(status +":" + rate +":" + progress +":" + totalcount);
																					                            													switch (status) 
																					                            													{
																					                            														case 0    :
																					                            															if(obj.list[0].progress != 'undefined' && obj.list[0].totalcount != 'undefined')
																							                            													{
																							                            															console.info("Ready");
																							                            															rate = 0;
																							                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'Ready...', true);
																							                            													}
																					                            															break;
																					                            														case 2    :
																					                            														case 3    : 
																					                            															if(obj.list[0].progress != 'undefined' && obj.list[0].totalcount != 'undefined')
																							                            													{

																					                            																if((obj.list[0].progress == obj.list[0].totalcount)&&(obj.list[0].progress > 0))
																							                            														{
																							                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'completed...' +obj.list[0].log , true);
																							                            															console.info("Complete status");
																							                            															clearInterval(import_progress_timerid);
																							                            															return;
																							                            														}
																					                            																
																					                            																else if((obj.list[0].progress <= obj.list[0].totalcount) && (obj.list[0].totalcount > 0))
																							                            														{
																					                            																	console.info("Running status");
																							                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'completed...' +obj.list[0].log , true);
																							                            														}
																					                            																
																							                            														
																							                            													}
																					                            															break;
																					                            														case 4    : 
																			                            																	pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+'Failed by '+ obj.list[0].log, true);
																			                            																	clearInterval(import_progress_timerid);
																					                            															break;
																					                            														case 5   :
																					                            															
																					                            															pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+ 'killed...' +obj.list[0].log , true);	
																					                            															clearInterval(import_progress_timerid);
																					                            															break;
																					                            													default : break;
																					                            														console.info('Undefined status');	
																					                            													}
																					                            													
																					                            													/*
																					                            													if(obj.list[0].status == 5)
																					                            													{
																					                            														clearInterval(import_progress_timerid);
																					                            														pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+ 'killed...', true);
																					                            														return;
																					                            													}			
																					                            													if(obj.list[0].progress != 'undefined' && obj.list[0].totalcount != 'undefined')
																					                            													{
																					                            														if(obj.list[0].totalcount > 0)
																					                            														{
																					                            																var rate = parseFloat(obj.list[0].progress) / parseFloat(obj.list[0].totalcount);
																					                            																if(obj.list[0].progress == obj.list[0].totalcount)
																					                            																{
																					                            																	console.info('Complete timer stop' + import_progress_timerid);
																					                            																	clearInterval(import_progress_timerid);
																					                            																	pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+ 'completed...', true);
																					                            																}			
																					                            																else
																					                            																{
																					                            																	console.info('rate' + Math.round(100* rate)+'% completed');
																					                            																	pgb.updateProgress( rate, Math.round(100* rate)+'%' + '['+ obj.list[0].progress +'/' + obj.list[0].totalcount +']'+ 'completed...', true);
																					                            																}
																					                            														}
																					                            													}
																					                            													*/
																					                            													
																					                            												}
																					                            												else if(obj.fail)
																					                            												{
																					                            														console.info('Fail timer stop');
																					                            														clearInterval(import_progress_timerid);
																					                            												}
																					                            											}
																					                            											);
																					                            											}, 1000);
																																		}
																																		else
																																		{
																																			Ext.MessageBox.show({
																																				title:'Import Info',
																																				msg:'Import work fail'
																																			});
																																		}
																																	}
																																);
																													       	}
																			     			            	           }
																												});
																												
											                            										
											                            									}
																						               }
																									]																											                	
																				            },																				            
																				            {
																				            	xtype: 'progressbar',
																				            	id: 'pgb',
																								width: 560,																							
																								height: 25,																						     
																								text: '',
																								value: 0
																				            }																												
																						]
																				}
																			]
																		}]										           	
									                      }]
									     	}]
							                      
							          	}]
			                })
        	}
		Ext.getCmp('db_link_import_button').setDisabled(true);
		return win;
	    }  
});