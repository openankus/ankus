var column_title = "";
Ext.require([
    'Ext.tab.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border',
    'Flamingo.view.desktop.Login',
    'Flamingo.view.login.LoginPanel'
   
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



var database_columns =  [{
							text: 'Name',
							dataIndex: 'databaseName',
							width:10,
							flex: 1
						}];

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

var table_columns = [{
						text: 'Name',
						dataIndex: 'tableName',
						width:10,
						flex: 1
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

var DB_LOCAL_STORE = ({
	type:'array',
	fields:['name'],
	data:[['MySQL'],
			['MS-SQL'],	
			['ORACLE']]
});

Ext.define('WORK_NAME_Model',{
		extend:'Ext.data.Model',
		fields:[ 
		        	{name : 'workName'}
		        	,{ name : 'workId'}
		        ]
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

var worknameCombo_select = function()
{
	           			var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();	        		
   			
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
								console.info(items[itemi].data.instanceName);
								if( items[itemi].data.instanceName == engineDisplay)
								{
									EngineID = items[itemi].data.id;
									break;
								}
							}
							console.info("EngineID : " + EngineID);	           				
		           			Flamingo.Ajax.Request.invokeGet("/fs/hdfs/WorkNameParameter",{ENGINE_ID:EngineID, WORK_NAME:WORK_NAME },
							function (response) 
							{
								var obj = Ext.decode(response.responseText);
								
								if (obj.success) 
								{
									Ext.getCmp('db_link_dbaddress').setValue(obj.list[0].databaseAddress);//set textbox value
									Ext.getCmp('db_link_dbtype').setRawValue(obj.list[0].databaseType);//set comboxbox value
									Ext.getCmp('db_link_db_port').setValue(obj.list[0].databasePort);
									Ext.getCmp('db_link_user_id').setValue(obj.list[0].databaseId);
									Ext.getCmp('db_link_user_password').setValue(obj.list[0].databasePassword);
									
									//QUERY SETTING
									Ext.getCmp('db_link_sql_textareafield').setValue(obj.list[0].sqlstatement);
									
									//ENGINE SETTING
									console.info('EngineName:' + obj.list[0].enginename);
									Ext.getCmp('db_link_enginecombo').setValue(obj.list[0].enginename);
									
									//PATH (import) SETTING
									Ext.getCmp('db_link_import_path').setValue(obj.list[0].hdfspath);
									
									var progress = obj.list[0].progress;
									var totalcount = obj.list[0].totalcount;																				
									var rate = parseFloat(progress) / parseFloat(totalcount);																																								
									var pgb = Ext.getCmp('pgb');																				
									pgb.updateProgress( rate, Math.round(100* rate)+'% completed...', true);																				
									
									DATABASE_NAME = obj.list[0].database_NAME;
									TABLE_NAME = obj.list[0].table_NAME;
									
									//SAVE WORK에서 이용가능하도록 컴포넌트에 별도 저장한다.
									Ext.getCmp('db_link_databasename').selected_database_name = DATABASE_NAME;
									Ext.getCmp('db_link_tablelist').selected_table_name = TABLE_NAME;
									
									console.info("LOADED DB NAME:" + Ext.getCmp('db_link_databasename').selected_database_name );
									console.info("LOADED TABLE NAME:" + Ext.getCmp('db_link_tablelist').selected_table_name );																			
									
									dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
									user_id =  Ext.getCmp('db_link_user_id').getValue();
									user_password =  Ext.getCmp('db_link_user_password').getValue();
									db_port =  Ext.getCmp('db_link_db_port').getValue();
									
									console.info('CHECK DATABASE NAME FOR '+ DATABASE_NAME);
									
									var dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
									var user_id =  Ext.getCmp('db_link_user_id').getValue();
									var user_password =  Ext.getCmp('db_link_user_password').getValue();
									var db_port =  Ext.getCmp('db_link_db_port').getValue();
									if (DATABASE_NAME =="") return;
									Flamingo.Ajax.Request.invokeGet("/fs/hdfs/WORKHISTORY_DBCHECK", {ENGINE_ID:EngineID, DBNAME: DATABASE_NAME, db_address:dbaddress, db_port:db_port, id:user_id, pw:user_password}, function (response) 
									{
									        var obj = Ext.decode(response.responseText);
									        if (obj.success) 
									        {
									        	db_store.loadData(obj.list);
									        	if(obj.list.length > 0)
									        	{
										        	var connection_status = Ext.getCmp('db_link_ConnectLabel');
										        	connection_status.setText('Connected');
										        	database_grid = Ext.getCmp('db_link_databasename');
										        	database_grid.gridRowCount = database_grid.store.getCount();
										        	database_grid.selected_database_name = DATABASE_NAME;
										        	console.info('Target DB NAME:'+ DATABASE_NAME);
													console.info('Row count:'+ database_grid.gridRowCount );

													//TABLE LIST CHECK
													Flamingo.Ajax.Request.invokeGet("/fs/hdfs/WORKHISTORY_TABLECHECK", {
														ENGINE_ID:EngineID,
														DBNAME: DATABASE_NAME,
														TABLENAME:TABLE_NAME, 
														db_address:dbaddress, 
														db_port:db_port, 
														id:user_id, 
														pw:user_password}, function (response) 
													{
													        var obj = Ext.decode(response.responseText);
													        if (obj.success) 
													        {
													        	table_store.loadData(obj.list);
													        	if(obj.list.length > 0)
													        	{
														        	var connection_status = Ext.getCmp('db_link_ConnectLabel');
														        	connection_status.setText('Connected');
														        	var table_grid = Ext.getCmp('db_link_tablelist');
														        	console.info('Target Table NAME:'+ TABLE_NAME);
																	console.info('Row count:'+ table_grid.store.getCount());//table_store
																	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/GetFields", {		
																				ENGINE_ID:EngineID,
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
																					fields_store.loadData(obj.list);
																					run_preview_Query();
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

function sleep(seconds) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

var workhistoryFormPanel = Ext.create('Ext.grid.Panel',{
							title:'Work History',
							renderTo:Ext.getBody(),
							authHeight:true,
							width:300,
							selType:'rowmodel',
							singleSelect:true,
							columns:[
							         {
							        	 header:'NAME',
							        	 dataIndex:'history_name',
							         }]
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
															console.info(items[itemi].data.instanceName);
															if( items[itemi].data.instanceName == engineDisplay)
															{
																EngineID = items[itemi].data.id;
																break;
															}
														}
														WORK_NAME_STORE.getProxy().extraParams.ENGINE_ID = EngineID;
														WORK_NAME_STORE.load();
													}
												}
											},											
											{       
												//Work Name Combo Handler
												xtype: 'combo',
												fieldLabel: 'WORK NAME',
												editable:true,
												store:WORK_NAME_STORE,
												displayField:'workName',
												valueField:'workName',
												id:'db_link_worknamecombo',
												value:'',																									
												width:230,
												labelWidth:90,
												labelAlign:'right',
												disableKeyFilter:'true',
												listeners:
														{
									               			select:function()//(newValue, oldValue)
									               			{ 
									               				worknameCombo_select();
									               				var pgb = Ext.getCmp('pgb');
                        										console.info('Import WORK RUNNING');
                            									doTimer();
									               				var import_button = Ext.getCmp('db_link_import_button');
									               				import_button.enable();
									               			}
											          }
											}
											]
                     	 				},  
                     	 				{
                   	                      xtype: 'tbspacer',
                   	                      width:20
                     	 				} ,
                     	 				{
										xtype:'panel',	
										layout:'vbox',
										border:false,
										items:[
											       {
										       			xtype: "textfield",
										       			fieldLabel: 'DB ADDRESS',														
										       			inputType: "text",
										       			id:'db_link_dbaddress',
										       			width:230,
										       			labelWidth:90,
										       			labelAlign:'right'
										       		},													
													{                	
									                	 xtype: "textfield",
									                	 inputType: "text",
									                	 id:'db_link_user_id',											                	
									                	 fieldLabel: 'ID',
									                	 width:230,		
									                	 labelWidth:90,
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
											                	fieldLabel: 'DB TYPE',
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
											                			
											                		}
											                	}
															},
															{                	
											                	 xtype: "textfield",
											                	 inputType: "text",
											                	 id:'db_link_user_password',
											                	 fieldLabel: 'PASSWORD',
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
									                	fieldLabel: 'PORT',
									                	width:180,		
									                	labelWidth:55,
									                	labelAlign:'right'
									             
													}													
										      ]
									 },
									 {
						                    xtype: 'tbspacer',
						                    width: 6
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
									} ];
					    
var database_grid ;
var fun_connect = function()
{
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
				msg: "Please select a hadoop cluster",
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
				msg: "Please input or select the work name",
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
				title: 'DB ADDRESS',
				msg: "Please input a DB address",//obj.error.message,
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
				title: 'DB TYPE',
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
				title: 'PORT',
				msg: "Please input a port",//obj.error.message,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		Ext.getCmp('db_link_db_port').focus();
		return;		
	}
	
	//ID
	if(user_id == undefined || user_id==null || user_id=='')
	{
	Ext.MessageBox.show(
			{
				title: 'ID',
				msg: "Please input a ID",//obj.error.message,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		Ext.getCmp('db_link_user_id').focus();
		return;		
	}
	
	console.info(EngineID);
	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/dblist", {ENGINE_ID:EngineID, db_address:dbaddress, db_port:db_port, id:user_id, pw:user_password}, function (response) 
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
	        	var connection_status = Ext.getCmp('db_link_ConnectLabel');
	        	connection_status.setText(obj.error.message);
	        	return 0;
	        }
	        
	});
	
	myMask.hide();
}
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
			                        //FILE 존재 검사.
			                        //Overwrite, Sequence File, DoNothing
			                        console.info(" Path" + lastPathComp.getValue());
			                        
			                        Flamingo.Ajax.Request.invokeGet("/fs/hdfs/file", {engineId:engineId, 
			                        																		path:lastPathComp.getValue()
			                        																		},
		            					function (response)
		            					{
			                        		//console.info(response);
		            						var obj = Ext.decode(response.responseText);
		            						
		            						if (obj.success)
		            						{
		            							
		            							var filecount = 0;
		            							for(var listidx = 0; listidx < obj.total; listidx ++)
		            							{
		            								filecount += obj.list[listidx].fileCount; 
		            							}
		            							console.info('File Count:' + filecount);
		            							if(filecount > 0)
		            							{
			     			            		    Ext.MessageBox.show({
			     			            	           title:'Save Changes?',
			     			            	           msg: 'Directory not empty <br> YES : Overwrite, NO: Sequence, CANCEL : Do Nothing',
			     			            	           buttons: Ext.MessageBox.YESNOCANCEL,
			     			            	           fn: function(btn)
			     			            	           {  
			     			            	        	   	if (btn == 'yes') 
													       	{
			     			            	        	   		Ext.Msg.alert('Process', 'Over Write'); 
													    		Ext.getCmp('hiddentextfield').setRawValue('2');
													       	}
													       	else if (btn == 'no') 
													   		{				            	        	   
														   		Ext.Msg.alert('Process', 'Sequence File');
														   		Ext.getCmp('hiddentextfield').setRawValue('1');
													   		}else
															{
													   			Ext.Msg.alert('Process', 'Do Nothing');  
													   			Ext.getCmp('hiddentextfield').setRawValue('0');
													    	}				            	           
													   },
			     			            	           animateTarget: 'mb4',
			     			            	           icon: Ext.MessageBox.QUESTION
			     			            	       });
		            							}
		            						}
		            						else
		            						{
		            							
		            						}
		            					}
			            			);
			                       
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


function ozit_interval_test(){ // 이 함수는 5초마다 실행됩니다.
	var engineCombo = Ext.getCmp('db_link_dashboard_enginecombo');

	if ( engineCombo + "" == 'undefined')
	{
		console.info("Close");
		clearInterval(dashboard_timerid);
		return;
	}
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
	console.info('EngineID '+ EngineID);																		
	myMask.show();
	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/worknamelistbydashboard", { ENGINE_ID:EngineID},
				function (response)
				{
					var obj = Ext.decode(response.responseText);													                
					if (obj.success)
					{
						console.info(obj.list);
						DBLinkDashBord_store.loadData(obj.list);					
						console.info("Dashboard search success");
					}
					else
					{
						clearInterval(dashboard_timerid);
						console.info("Dashboard search Fail");
					}
				}
		);
	myMask.hide();
	}

function import_progress()
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
							clearInterval(import_progress_timerid);
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
				clearInterval(import_progress_timerid);
		}
	}
	);
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

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}

var run_preview_Query=function()
{
	
		var dbaddress = Ext.getCmp('db_link_dbaddress').getValue();
		var user_id =  Ext.getCmp('db_link_user_id').getValue();
		var user_password =  Ext.getCmp('db_link_user_password').getValue();				
		var input_sql = Ext.getCmp('db_link_sql_textareafield').getValue() + " limit 100";																					
																																	
		var database_name="" ;
		var previewGrid = Ext.getCmp('db_link_previeGrid');	
		myMask.show();	
		var sm = Ext.create('Ext.selection.CheckboxModel');
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
		Flamingo.Ajax.Request.invokeGet("/fs/hdfs/SQLBODY", {
															ENGINE_ID:EngineID,
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
			
			import_path.setValue("/" + database_name + "." + table_name);
			
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
																																							
				var store2 = Ext.create('Ext.data.Store', {  fields:fields,
				data:data
				});
																																				 					
				store2.load({
					callback: function(records)
					{
						console.info(obj.map.BODY);
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
	Flamingo.Ajax.Request.invokeGet("/fs/hdfs/tableList", 
				{ENGINE_ID:EngineID, db_address:dbaddress, id:user_id, pw:user_password, dbname:database_name},
				function (response) {
				                var obj = Ext.decode(response.responseText);
				                
				                if (obj.success) {
				                	//console.info("Table list request success");
				                	//console.info(obj);
				                	table_store.loadData(obj.list);
				              }
				});			
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
		Flamingo.Ajax.Request.invokeGet("/fs/hdfs/GetFields", { ENGINE_ID:EngineID, db_address:dbaddress, id:user_id, pw:user_password, dbname:database_name, tablename:table_name},
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
		myMask.hide();
	};
	
	Ext.define('Ext.ux.grid.column.Progress', {
	    extend: 'Ext.grid.column.Column'
		    ,alias: 'widget.progresscolumn'
		    ,cls: 'x-progress-column'
		  //  ,progressCls: 'x-progress'
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
		            
		            meta.tdCls += ' ' + cls + ' ' + cls + '-' + me.ui;
		           
		            if (v <= 100 && v > 79)
		                style = 'x-progress-bar-green';
		              if (v < 78 && v > 35)
		                style = 'x-progress-bar-orange';
		              if (v < 34)
		                style = 'x-progress-bar-red';    

		            v =   '<div class="' + style + '" style="width: '+ newWidth + 'px; text-align:center; ">' +  
		                    '<div class="' + cls + '-text">' +   text + '</div>' +  '</div>' 
		                    
		            return v;
		        };    
		    }//eof constructor
		    
		    ,destroy: function() {
		        delete this.renderer;
		        return this.callParent(arguments);
		    }//eof destroy
}); //eo extend

Ext.define('DBLinkDashBord_Model',{
		extend:'Ext.data.Model',
		fields:	[
		       	 {name:'workname'},
		       	 {name:'dbname'},
		       	 {name:'tablename'},
		       	 {name:'query'},
		       	 {name:'hdfs'},
		       	{name:'progress', type:'int'},
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
									text:'WORKNAME',
									dataIndex: 'workname',
									align: 'center',
									width:80
								}
							 	,
							 	{
							 		text:'DBNAME',
									dataIndex: 'dbname',
									align: 'center',
									width:95
								}
							 	,
							 	{
							 		text:'TABLENAME',
									dataIndex: 'tablename',
									align: 'center',
									width:95
								}
							 	,
							 	{
							 		text:'QUERY',
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
									text: 'START DATE', 
									width: 95, 
									dataIndex: 'DBLink_startDate',
									align: 'center',
			                        renderer: function (value) {
			                          //  return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
			                        }
			                    },
			                    {
			                    	text: 'END DATE', 
			                    	width: 95, 
			                    	dataIndex: 'DBLink_endDate',
			                    	align: 'center',
			                        renderer: function (value, item) {
			                            if (item.record.data.status == 'RUNNING') {
			                                return '';
			                            } else {
			                            //    return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
			                            }
			                        }
			                    },
								{
								    text: "PROGRESS", 
								    dataIndex: 'progress', 
								    style : 'text-align:center',
								    xtype: 'progresscolumn',								    
								    menuDisabled : true,
								    hideable:false,
								    resizable:false,								    
								    width  : 160,
								    editor: {
								        xtype:'numberfield',
								        minValue: 0,
								        maxValue: 100,                    
								        allowBlank: false
								    }								    
								},
								{
									text: 'STATUS', 
									width: 90, 
									dataIndex: 'DBLink_status', 
									align: 'center',
									renderer: function (value, meta) {
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
			                            if (value === 'RUNNING') {
			                                meta.tdCls = 'status-green';
			                                return MSG.DASHBOARD_STATUS_RUNNING;
			                            }
			                            return value;
								}
							},
							{
							text: 'USER', 
							 width: 70, 
							 dataIndex: 'username', 
							 align: 'center'
							 }
							];
var dashboard_timerid = "";
var import_progress_timerid = "";

var fun_savework = function()
{
	var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();																												
	var engineCombo = Ext.getCmp('db_link_enginecombo');
	var ENGINE_NAME = engineCombo.getRawValue();
	var engineStore = engineCombo.getStore();
	var items = engineStore.data.items;
	var item_length = items.length;
	var ENGINE_ID = "";
    for(var itemi = 0; itemi < item_length; itemi++)
    {
	   console.info(items[itemi].data.instanceName);
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
	var param = {
			ENGINE_ID:ENGINE_ID,
			ENGINE_NAME:ENGINE_NAME,
			WORK_NAME:WORK_NAME,
			DATABASE_TYPE:DATABASE_TYPE,
			DATABASE_ADDRESS:DATABASE_ADDRESS,
			DATABASE_PORT:DATABASE_PORT,
			DBid:DBid,
			DBPassword:DBPassword,
			SQLSTATEMENT:SQLSTATEMENT,
			HDFSPATH:HDFSImportPath,
			DATABASE_NAME:database_name,
			TABLE_NAME:table_name,
			FILE_MODE:Ext.getCmp('hiddentextfield').getValue()																							
		};
	var app = Ext.getCmp('app');
	console.info("user name: " + app.user_name);
	return;
	//SAVE WORK QUERY
	Flamingo.Ajax.Request.invokePostByMap('/fs/hdfs/db_work_insert', param,function (response)
	{
		var obj = Ext.decode(response.responseText);
		if (obj.success) 
		{
			Ext.MessageBox.show({
				title:  'Import Info',
                msg: 'The Import work saved',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                fn: function handler(btn) {
                	var import_button = Ext.getCmp('db_link_import_button');
                	import_button.enable();
                	import_button.setDisabled(false);
                	WORK_NAME_STORE.reload();
                }
			});
		}
		else
		{
			Ext.MessageBox.show(
			{
				title: 'Import work Error',
				msg: obj.error.message,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
			console.info("1:");
			console.info(obj.error.message);
			
			var import_button = Ext.getCmp('db_link_import_button');
			import_button.disable();
			import_button.setDisabled(true);
			
		}
	}
	,
	function (response)
	{
		Ext.MessageBox.show({
			title: 'Import work save Error',
			msg: response.statusText + '(' + response.status + ')',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
		console.info("2:");
		console.info(response.status);
	});//END OF INVOKE
}
//WINDOW START
Ext.define('Flamingo.view.desktop.DBLinkTest', {
	extend: 'Flamingo.view.desktop.ux.Module',
	requires: [
		  'Flamingo.view.desktop.hdfsBrowser'
	],
	windowId: 'DBLinkTest_Classs',
	id:'DBLinkTest_Classs',
	
    init: function () {
        this.launcher = {
            text: 'DB LINK',//start button icon text
            iconCls: 'bogus'
        }
    },
   
    createWindow: function (src) 
    {
		var me = this;
		var desktop = me.app.getDesktop();
		var win = desktop.getWindow(me.id);			
	
		if (!win) 
		{
			win = desktop.createWindow({
			 			title: 'DB Import / Export', 
			 			//header: {  titlePosition: 2, titleAlign: 'center' },
		                closable: true,
		                listeners:{
		                	close:function(win){
		                		console.info('windows close');
		               			clearInterval(dashboard_timerid);
		               			clearInterval(import_progress_timerid);
		                	},
		                   
		                    scope:this
		                },
		                closeAction: 'hide',
		                maximizable: true,
		                animateTarget: 'button',
		                id:'DB_LINK_WINDOW',
		                itemId:'DB_LINK_WINDOW',
		                width: 1000,
		                minWidth: 450,
		                height: 600,
		                iconCls: 'hdfs-database',
		                tools: [{type: 'pin'}],
		                layout: { type: 'border', padding: 5  },
		                items: [{
					                    region: 'center',
					                    xtype: 'tabpanel',
					                    items: [
					                            {	
							                        title: 'DashBord',
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
																					dashboard_timerid = setInterval(function(){ozit_interval_test()}, 1000);
																				}
																			}
																		},
												                        {
												                            xtype: 'datefield',
												                            fieldLabel: 'Start',
												                            format: 'Y-m-d',
												                            itemId: 'startDate',
												                            vtype: 'dateRange',
												                            endDateField: 'endDate',
												                            width:140,
																		    labelWidth:40,
																		    labelAlign:'right'
												                        },										                      
												                        {
												                            xtype: 'datefield',
												                            fieldLabel: 'End',
												                            format: 'Y-m-d',
												                            itemId: 'endDate',
												                            vtype: 'dateRange',
												                            startDateField: 'startDate',
												                            width:140,
																		    labelWidth:40,
																		    labelAlign:'right'
												                        },										                      
												                        {
												                            xtype: 'combo',
												                            fieldLabel: 'Status',
												                            name: 'status',
												                            itemId: 'status',
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
												                            itemId: 'workname',
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
												                            itemId: 'findDBLinkBtn',
												                            formBind: true,
												                            text: 'Find',
												                            iconCls: 'common-find',
												                            labelWidth: 50
												                        },										                     
												                        {
												                            xtype: 'button',
												                            itemId: 'clearDBLinkBtn',
												                            formBind: true,
												                            text: 'Clear',
												                            iconCls: 'common-find-clear',
												                            labelWidth: 50
												                        },										                     
												                        {
												                            xtype: 'button',
												                            itemId: 'KillDBLinkBtn',
												                            formBind: true,
												                            text: 'Kill',
												                            iconCls: 'common-cancel',
												                            labelWidth: 50
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
																singleSelect:true
															}]
					                            }
					                            ,
					                            {	
						                        title: 'Import',
						                        items: [
															{
																 xtype:  import_argu_panel 
															},															
					                        				{
					                        					title:'DB&PREVIEW',
					                        					iconCls: 'status-blue',
					                    						xtype:'panel', 
					                    						layout:'hbox',
					                    						id:'panel_db_query_import',
					                    						items:[							                    						     
				                    									{
								                    					xtype:'panel',
								                    					title: 'DBMS',
								                    					iconCls: 'status-green',
								                    					id:'panel_dbms_preview',   
								                    					items: [
							                    					            {
																					xtype: 'grid',
																					id:'db_link_databasename',
																					title:'DatabaseName',
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
																					//collapsible: true,
																					setted_database_name:'',
																					floatable: false
																               }
																               ,
																               {
																				xtype: 'grid',
																				title:'TableName',
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
																				//collapsible: true,
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
																				//loadMask:  {msg: 'Loading Data...'},
																				store: fields_store, 
																				columns:fields_columns,	                    	
																				split: true,
																				//collapsible: true,
																				floatable: false,
																				listeners:
																				{
																					selectionchange: function(value, meta, record, row, rowIndex, colIndex)
																					{
																						console.info("apply");
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
																						   
																						var new_query = 'select ' + query_field + ' from ' + database_name +'.' + table_name;
																						console.info(new_query);
																						
																						Ext.getCmp('db_link_sql_textareafield').setValue(new_query);		
																						
																						//run query
																						var sql = new_query;
																						var start_method = sql.substring(0, 6);
																				        start_method = start_method.toLowerCase();

																				        if(start_method == "select")
																				        {
																				                console.info(start_method);
																				        }
																				        else
																				        {
																				                console.info("Not supported query");
																				                Ext.MessageBox.show(
																					        			{
																					        				title: 'Query',
																					        				msg: "Not supported query",//obj.error.message,
																					        				buttons: Ext.MessageBox.OK,
																					        				icon: Ext.MessageBox.WARNING
																					        			});
																					        		Ext.getCmp('db_link_sql_textareafield').focus();
																				                return;
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
																				                return;
																				        }
																				        var sub_string = sql.substring(sel_start+6, from_start);
																				        var sub_query = sql.substring(sel_start+6, from_start);
																				        sub_query = sub_query.trim();
																				        if(sub_query.length == 0)
																				        {
																				        	Ext.MessageBox.show(
																				        			{
																				        				title: 'Query',
																				        				msg: "Please Input Fiedls",//obj.error.message,
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
																											width: 5
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
																												
																														        if(start_method != "select")
																														        {
																														                console.info(start_method);
																														        }
																														        else
																														        {
																														                console.info("Not supported query");	
																														                Ext.MessageBox.show(
																															        			{
																															        				title: 'Query',
																															        				msg: "Not supported query",//obj.error.message,
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
																								height: 310,
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
																			                	/*
																								xtype:'panel', 
																			                	layout:'hbox',
																			                	border:false,
																			                	*/
																								xtype: 'toolbar',
																					            dock: 'top',
																			                	items:[
																										
																										{
																											xtype: "textfield",
											                            									inputType: "text",
											                            									width:215,
																						                	id:'db_link_import_path',
																						                	columnWidth:.3
																						                	,value:'/'
																						                },																										
																						                {
																						            	  // xtype: "button",height: 20,width: '20',
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
																						            		   /*
																						            		   Ext.MessageBox.show({
																						            	           title:'Save Changes?',
																						            	           msg: 'You are closing a tab that has unsaved changes. <br />Would you like to save your changes?',
																						            	           buttons: Ext.MessageBox.YESNOCANCEL,
																						            	           fn: showResult,
																						            	           animateTarget: 'mb4',
																						            	           icon: Ext.MessageBox.QUESTION
																						            	       });
																						            	       */
											                            									}
																				                        },
																				                        '-',																						                
																						                {
																											text:'SAVE WORK',
																											iconCls: 'designer-save',
																											tooltip: 'Saves a currently working database',
																											//HISTORY SAVE
																											handler:function()
																											{
																												var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();																												
																												var engineCombo = Ext.getCmp('db_link_enginecombo');
																												var ENGINE_NAME = engineCombo.getRawValue();
																												var engineStore = engineCombo.getStore();
																												var items = engineStore.data.items;
																												var item_length = items.length;
																												var ENGINE_ID = "";
																						            		    for(var itemi = 0; itemi < item_length; itemi++)
																						            		    {
																						            			   console.info(items[itemi].data.instanceName);
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
																												
																										        
																												console.info("DB NAME " + database_name + " TABLE NAME " + table_name+ " User ID " + username);
																												return;
																												if(ENGINE_NAME == "" || 
																													WORK_NAME == "" || 
																													DATABASE_TYPE == "" ||
																													DATABASE_ADDRESS == "" ||
																													DATABASE_PORT == ""||
																													DBid == ""||
																													SQLSTATEMENT ==""||
																													HDFSImportPath =="" )
																												{
																													Ext.MessageBox.show(
																															{
																																title :'Work Save Validation',
																																msg:'At least, One parameter for Work is Empty'
																															});
																												}
																												else
																												{
																												var param = {
																																ENGINE_ID:ENGINE_ID,
																																ENGINE_NAME:ENGINE_NAME,
																																WORK_NAME:WORK_NAME,
																																DATABASE_TYPE:DATABASE_TYPE,
																																DATABASE_ADDRESS:DATABASE_ADDRESS,
																																DATABASE_PORT:DATABASE_PORT,
																																DBid:DBid,
																																DBPassword:DBPassword,
																																SQLSTATEMENT:SQLSTATEMENT,
																																HDFSPATH:HDFSImportPath,
																																DATABASE_NAME:database_name,
																																TABLE_NAME:table_name
																															};
																												//SAVE WORK QUERY
																				                            	Flamingo.Ajax.Request.invokePostByMap('/fs/hdfs/db_work_insert', param,function (response)
																												{
																													var obj = Ext.decode(response.responseText);
																													if (obj.success) 
																													{
																														Ext.MessageBox.show({
																															title:  'SAVE',
																			                                                msg: 'The  work saved',
																			                                                buttons: Ext.MessageBox.OK,
																			                                                icon: Ext.MessageBox.WARNING,
																			                                                fn: function handler(btn) {
																			                                                	var import_button = Ext.getCmp('db_link_import_buttun');
																			                                                	import_button.enable();
																			                                                	WORK_NAME_STORE.reload();
																			                                                }
																														});
																													}
																													else
																													{
																														Ext.MessageBox.show(
																														{
																															title: 'SAVE Error',
																															msg: obj.error.message,
																															buttons: Ext.MessageBox.OK,
																															icon: Ext.MessageBox.WARNING
																														});
																														console.info("1:");
																														console.info(obj.error.message);
																													}
																												}
																												,
																												function (response)
																												{
																													Ext.MessageBox.show({
																														title: 'SAVE Error',
																														msg: response.statusText + '(' + response.status + ')',
																														buttons: Ext.MessageBox.OK,
																														icon: Ext.MessageBox.WARNING
																													});
																													console.info("2:");
																													console.info(response.status);
																											});//END OF INVOKE

																													
																													//Empty Folder Check
																													Flamingo.Ajax.Request.invokeGet("/fs/hdfs/file", {engineId:ENGINE_ID, 
						                        																																			path:HDFSImportPath},
																					            					function (response)
																					            					{
																						                        		//console.info(response);
																					            						var obj = Ext.decode(response.responseText);
																					            						
																					            						if (obj.success)
																					            						{
																					            							
																					            							var filecount = 0;
																					            							for(var listidx = 0; listidx < obj.total; listidx ++)
																					            							{
																					            								filecount += obj.list[listidx].fileCount; 
																					            							}
																					            							console.info('File Count:' + filecount);
																					            							if(filecount > 0)
																					            							{
																						     			            		    Ext.MessageBox.show({
																						     			            	           title:'Save Changes?',
																						     			            	           msg: 'Directory not empty <br> YES : Overwrite, NO: Sequence, CANCEL : Do Nothing',
																						     			            	           buttons: Ext.MessageBox.YESNOCANCEL,
																						     			            	           fn: function(btn)
																						     			            	           {  
																						     			            	        	   	if (btn == 'yes') 
																																       	{
																						     			            	        	   		Ext.Msg.alert('Process', 'Over Write'); 
																																    		Ext.getCmp('hiddentextfield').setRawValue('2');
																																    		
																																       	}
																																       	else if (btn == 'no') 
																																   		{				            	        	   
																																	   		Ext.Msg.alert('Process', 'Sequence File');
																																	   		Ext.getCmp('hiddentextfield').setRawValue('1');
																																	   		
																																   		}else
																																		{
																																   			Ext.Msg.alert('Process', 'Do Nothing');  
																																   			Ext.getCmp('hiddentextfield').setRawValue('0');
																																   			return;
																																    	}	
																						     			            	        	   fun_savework();
																																   },
																						     			            	           animateTarget: 'mb4',
																						     			            	           icon: Ext.MessageBox.QUESTION
																						     			            	       });
																					            							}
																					            						}
																					            						else
																					            						{
																					            							Ext.getCmp('hiddentextfield').setRawValue('0');
																					            							fun_savework();
																					            						}
																					            					}
																						            			);
																												
																				                            	var import_button = Ext.getCmp('db_link_import_button');
															                                                	import_button.setDisabled(false);

																												}
																											}
																				                		},
																				                		
																						                {
											                            							   		xtype:'textfield',
											                            							   		id:'hiddentextfield',
											                            							   		text:'LABEL',
											                            							   		hidden:true,
											                            							   		handler:function(){
											                            							   		
											                            									}
											                            								},
																				                        '-',
																						                {
											                            							   		text:'REMOVE WORK',		
											                            							   		iconCls: 'common-delete',
											                            							   		tooltip: 'Remove a currently working database',
											                            									handler:function(){		
											                            									}
											                            								},
																				                       
																				                		'-',
											                            								{
											                            									//xtype: "button",height: 20,width: '20',
											                            									text:'Import',
											                            									iconCls: 'hdfs-file-upload',
											                            									id:'db_link_import_button',
											                            									tooltip: 'Import a currently data',
											                            									disabled:true,
											                            									renderTo:Ext.getBody(),
											                            									handler:function()
											                            									{	
											                            										//UPDATE PROCESS STATUS FROM 0 TO 1
											                            										var WORK_NAME = Ext.getCmp('db_link_worknamecombo').getValue();
											                            										console.info('WORK_NAME ' + WORK_NAME + '의 상태를 1로 변경');
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
											                            										Flamingo.Ajax.Request.invokeGet("/fs/hdfs/import", 
											                            																		{
											                            											ENGINE_ID:EngineID,
											                            											WORK_NAME:WORK_NAME
											                            																		},
																													function (response)
																													{
																														var obj = Ext.decode(response.responseText);
																														if (obj.success)
																														{
																															msg('Import',  'The Import work saved');
																															
																															//PROGRES BAR ACTION
														                            										var pgb = Ext.getCmp('pgb');
														                            										console.info('Import WORK RUNNING');
														                            										
														                            										import_progress_timerid = setInterval(function(){import_progress()}, 1000);
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
			console.info('window loaded');
			
			var import_button = Ext.getCmp('db_link_import_button');
			
			import_button.setDisabled(true);
			console.info(import_button.disabled);
	        return win;
        }
  
});

/**
 * 
 */