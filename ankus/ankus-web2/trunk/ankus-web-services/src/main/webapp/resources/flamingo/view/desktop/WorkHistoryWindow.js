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

/**
 * 
 DBLinkTest의 Work내역을 출력합니다.
 재사용을 위해 일부 정보를 리턴합니다.
 호출 위치 DBLinkTest.js 450line
 
 이하 참조..
 
 */
Ext.define('DBLinkWorkHistory_Model',{
		extend:'Ext.data.Model',
		fields:[
		        	 {name:'workid'},
			       	 {name:'workname'},
			       	 {name:'dbname'},
			       	 {name:'tablename'},
			       	 {name:'query'},
			       	 {name:'hdfs'},
			       	 {name:'start_time'},
			       	 {name:'end_time'},
			       	 {name:'user'},
			       	 {name:'status'},
			       	 {name:'database_TYPE'},
			       	 {name:'database_ADDRESS'},
			       	 {name:'database_PORT'},
			       	 {name:'database_ID'},
			       	 {name:'database_PASSWORD'}
		       	 ]
});

var DBLinkWorkHistory_columns = [
								{
									text:'Work ID',
									dataIndex: 'workid',
									align: 'center',
									width:80
								}
								,
							 	{
									text:'Work Name',
									dataIndex: 'workname',
									align: 'center',
									width:80
								}
							 	,
							 	{
							 		text:'DB Name',
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
									text: 'Start', 
									width: 95, 
									dataIndex: 'start_time',
									align: 'center'										
									,renderer: function (value) {
										if(value.length > 0)
			                           return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
			                        }
			                    },
			                    {
			                    	text: 'End', 
			                    	width: 95, 
			                    	dataIndex: 'end_time',			                   
			                    	align: 'center'										
									,renderer: function (value) {
										if(value.length > 0)
			                           return Flamingo.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
			                        }
			                    },
								{
			                    	text: 'User', 
			                    	width: 70, 
			                    	dataIndex: 'user', 
			                    	align: 'center'
								}
			                    ,
								{
			                    	text: 'Type', 
			                    	width: 70, 
			                    	dataIndex: 'database_TYPE', 
			                    	align: 'center'
								}
			                    ,
			                    {
			                    	text: 'Address', 
			                    	width: 70, 
			                    	dataIndex: 'database_ADDRESS', 
			                    	align: 'center'
								}
			                    ,
			                    {
			                    	text: 'Access Port', 
			                    	width: 100, 
			                    	dataIndex: 'database_PORT', 
			                    	align: 'center'
								}
			                    ,
								{
			                    	text: 'DB ID', 
			                    	width: 70, 
			                    	dataIndex: 'database_ID', 
			                    	align: 'center'
								},
								{
									text: 'DB Password',
			                    	width: 90, 
			                    	dataIndex: 'database_PASSWORD', 
			                    	align: 'center',
			                    	hidden:true
			                    
								}
							];



var DBLinkWorkHistory_store = Ext.create('Ext.data.Store',  
		{
		    	model:'DBLinkWorkHistory_Model',
		     	pageSize:50,
		     	proxy: {
		        	type: 'ajax',
		        	url: "/fs/hdfs/worklist_history",
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
				listeners:
				{
				    load: function(store, records, success)
				    {
				    	//console.info('work name store loaded');
				    	console.info(records);
				    }
				}
		}); 		
Ext.define('Flamingo.view.desktop.WorkHistoryWindow', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    border: true,
    constructor: function (config) {
    	DBLinkWorkHistory_store.getProxy().extraParams.ENGINE_ID = config.engineId;
    	DBLinkWorkHistory_store.load();//Ajax call function
        this.callParent(arguments);
    },

    initComponent: function ()
    {
        this.items = 
        {
            layout: 'border',
            border: false,
            items: 	[
			                {
			                	
			                	xtype:'grid',
			                	title:'WorkHistory',
								iconCls: 'status-green',
								id:'db_link_WorkHistoryGrid',
								width: 1120,
						        height: 350,
								store:  DBLinkWorkHistory_store,
								columns:DBLinkWorkHistory_columns,
								selType:'rowmodel',
								autoScroll: true,
								 layout:'fit'
								//singleSelect:true
								
			                }
		                ]
        };
	
        this.callParent(arguments);
        this.on('afterrender', this.registControllers, this);
    },
    registControllers: function () {
        Ext.each(this.controllers, function (control) {
            var controller = Flamingo.app.controllers.get(control);
            if (!controller) {
                controller = Ext.create(control, {
                    application: Flamingo.app,
                    engineId:engineId,
                    id: control
                });
                Flamingo.app.controllers.put(control, controller);
            }

            controller.init(); // Run init on the controller
        }, this);
    }
});