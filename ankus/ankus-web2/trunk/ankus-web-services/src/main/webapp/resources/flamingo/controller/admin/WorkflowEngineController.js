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
 //2015.01.30 whitepoo@onycom.com
var enginePkID = 0;
Ext.define('Flamingo.controller.admin.WorkflowEngineController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.workflowEngineAdminController',

    init: function () {
        log('Initializing Workflow Engine Admin Controller');
        this.control({
            '#enginesGrid': {
                itemclick: this.onItemClick
            },
            '#showFileSystemBrowserButton': {
                click: this.onShowFileSystemBrowserButton
            },
            '#refreshEngineButton': {
                click: this.onRefreshEngineButton
            },
            '#registJobButton': {
                click: this.onRegistJobButton
            },
            '#deleteEngineButton': {
                click: this.onDeleteEngineButton
            },
            '#addEngineButton': {
                click: this.onAddEngineButton
            },
            //2015.01.30 whitepoo@onycom.com
            '#editEngineButton': {
                click: this.onEditEngineButton
            },
            '#refreshTriggers': {
                click: this.onRefreshTriggers
            },
            '#refreshRunningJobs': {
                click: this.onRefreshRunningJobs
            }
        });
        log('Initialized Workflow Engine Admin Controller');

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched Workflow Engine Admin Controller');
    },

    /**
     * Workflow Engine의 Trigger 정보를 갱신한다.
     */
    onRefreshTriggers: function () {
        var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var serverUrl = selection.data.serverUrl;

        var triggersGrid = Ext.ComponentQuery.query('workflowEngineTriggersPanel #triggersGrid')[0];
        triggersGrid.getStore().load(
            {
                params: {
                    'serverUrl': serverUrl
                }
            }
        );
    },

    /**
     * Workflow Engine의 Running Job 정보를 갱신한다.
     */
    onRefreshRunningJobs: function () {
        var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var serverUrl = selection.data.serverUrl;

        var runningTrigger = Ext.ComponentQuery.query('workflowEngineRunningJobsPanel #runningTrigger')[0];
        runningTrigger.getStore().load(
            {
                params: {
                    'serverUrl': serverUrl
                }
            }
        );
    },

    //새로운 Workflow Engine을 등록한다.    
    onAddEngineButton: function () {
        var popWindow = Ext.create('Ext.Window', {
            title: MSG.ADMIN_REG_WORKFLOW_ENG,
            width: 320,
            height: 300,
            modal: true,
            resizable: true,
            constrain: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'form',
                    itemId: 'workflowEngineForm',
                    border: false,
                    bodyPadding: 10,
                    defaults: {
                        anchor: '100%',
                        labelWidth: 80
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'name',
                            itemId: 'name',
                            fieldLabel: 'Engine Name',
                            allowBlank: false,
                            minLength: 1,
                            //value:'TEST_ENGINE'                            
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 0',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: 'Connection',
                                    layout: 'anchor',
                                    defaults: {
                                        anchor: '100%',
                                        labelWidth: 100,
                                        hideEmptyLabel: false
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Engine',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'textfield',
                                            defaults: {
                                                hideLabel: 'true'
                                            },
                                            items: [
                                                {
                                                    name: 'engineIP',
                                                    itemId: 'engineIP',
                                                    fieldLabel: MSG.COMMON_IP,
                                                    flex: 4,                                                    
                                                    value:'127.0.0.1',
                                                    allowBlank: false
                                                },
                                                {
                                                    name: 'enginePort',
                                                    itemId: 'enginePort',
                                                    fieldLabel: MSG.COMMON_PORT,
                                                    flex: 2,
                                                    margins: '0 0 0 6',
                                                    value:'28080',
                                                    allowBlank: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 0',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: 'Assignment',
                                    layout: 'anchor',
                                    defaults: {
                                        anchor: '100%',
                                        labelWidth: 100,
                                        hideEmptyLabel: false
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Hadoop Custer',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            
                                            defaults: {
                                                hideLabel: 'true'
                                            },
                                            items: [
                                                {
                                                    xtype: '_hadoopClusterCombo'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Hive Server',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            hidden:true,  //콤보상자를 가려줌.//2015.01.30 whitepoo@onycom.com
                                            defaults: {
                                                hideLabel: 'true'
                                            },
                                            items: [
                                                {
                                                    xtype: '_hiveServerCombo'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 0',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: 'Permission',
                                    layout: 'anchor',
                                    defaults: {
                                        anchor: '100%',
                                        labelWidth: 100,
                                        hideEmptyLabel: false
                                    },
                                    items: [
                                        {
                                        	xtype      : 'checkboxfield',
                                            fieldLabel : 'Public',
                                            itemId : 'checkPublic',
                                            items: [
                                                {
                                                    boxLabel  : '',
                                                    name      : 'public',
                                                    inputValue: '1',
                                                    checked   : true,
                                                    id        : 'isPublic'
                                                }
                                            ],
                                            listeners: {
                                                change: function (checkbox, newVal, oldVal) {
                                                	var permisssionCombo = Ext.ComponentQuery.query('#cboAdminPermission');
                                                	
                                                	// 전체공개인 경우 사용자 선택 비활성화
                                                	if(newVal == true){
                                                		permisssionCombo[0].clearValue();
                                                		permisssionCombo[0].disable();
                                                	}else{
                                                		permisssionCombo[0].enable();
                                                	}
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'User',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            
                                            defaults: {
                                                hideLabel: 'true'
                                            },
                                            items: [
                                                {
                                                	itemId : 'cboAdminPermission',
                                                    xtype: '_AdminPermissionCombo'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]

                }
            ],
            buttons: [
            		//엔진 추가 버튼
                     /*2015.01.26
                     등일 이름 엔진이 존재 확인 추가
                     whitepoo@onycom.com
                     */
                     {
                      text: MSG.COMMON_OK,
                      iconCls: 'common-confirm',
                      handler: function () {
                    	  var engine_name = popWindow.down('#name').getValue();
                    	  var hadoopClusterCombo = popWindow.down('_hadoopClusterCombo').getValue();
                    	  var adminPermissionCombo = popWindow.down('_AdminPermissionCombo').getValue();
                    	  var checkPublic = Ext.ComponentQuery.query('#checkPublic')[0].getValue();
                    	  
                    	  //이름이 공백일 경우 ajax를 수행하지 않음.
                    	  if(engine_name.length == 0 || hadoopClusterCombo == null)
                          {
                    		  return;
                          }
                    	  
                    	  //권한예외처리:전체공개가 아닌 경우 유저를 선택해야지 등록가능
                    	  if(checkPublic == false && adminPermissionCombo == ''){
                    		  return;
                    	  }
                    	  
                    	  var url = '/admin/engine/name_exist';
                    	  var param = {
                    			  'name':engine_name
                    	  }
                    	  Flamingo.Ajax.Request.invokePostByMap(url, param,
                                  //내부 함수 정의
                                  function (response) {
                                  	//response : 최상위 그룹
                                  	//response.responseText : 하위 그룹
                                      var result = Ext.decode(response.responseText);
                                      //결과 확인
                                      if(result.success = "true")
                                      {
                                      	//동일 이름의 클러스터 개수 반환
                                      	var result_exist = Number(result.object);
                                      	//존재할 경우 경고 메시지 
                                      	if(result_exist > 0)
                                      	{
                                      		name_exist = 1;
                                      		Ext.MessageBox.show({
                                                title: 'Engine edit',
                                                msg: 'The ' + engine_name + ' is already exist. Please choose a different name.',
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.WARNING,
                                                fn: function handler(btn) {
                                                	popWindow.close();
                                                }
                                            });
                                      	}
                                      	else
                                      	{
                                      		//존재 하지 않을 경우 추가 함.
                                      		var name = popWindow.down('#name').getValue();
                                            var engineIP = popWindow.down('#engineIP').getValue();
                                            var enginePort = popWindow.down('#enginePort').getValue();
                                            var hadoopClusterCombo = popWindow.down('_hadoopClusterCombo');
                                            var hiverServerCombo = popWindow.down('_hiveServerCombo');
                                            var isPublic;
                                            if(checkPublic == true){
                                            	isPublic = 1;
                                            }else{
                                            	isPublic = 0;
                                            }
                                            var permission;
                                            Ext.each(adminPermissionCombo, function(username, index) {
                                            	if(index == 0){
                                            		permission = username; 
                                            	}else{
                                            		permission = permission + "," + username; 
                                            	}
                                        	});
                                            
                                            var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.WE.ADD_ENGINE;
                                            var param = {
                                                'name': name,
                                                'ip': engineIP,
                                                'port': enginePort,
                                                'hadoopClusterId': hadoopClusterCombo.getValue(),
                                                'hiveServerId': hiverServerCombo.getValue(),
                                                'isPublic': isPublic,
                                                'permission':permission
                                            };

                                            var win = popWindow;
                                            Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                function (response)
                                                {
                                            		var result = Ext.decode(response.responseText);
                                            		var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
                                                    grid.getStore().load();

                                                    var popup = win;
                                                    popup.close();
                                                },
                                                function (response)
                                                {
                                                    var result = Ext.decode(response.responseText);
                                                    var popup = win;
                                                    Ext.MessageBox.show({
                                                        title: MSG.ADMIN_REG_WORKFLOW_ENG,
                                                        msg: result.error.message,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.WARNING,
                                                        fn: function handler(btn) {
                                                            popup.close();
                                                        }
                                                    });
                                                }
                                            );
                                      	}
                                      }
                                  }
                              );
                      	}
                  },
                /*
                //엔진 추가 이전 로직.
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                        var name = popWindow.down('#name').getValue();
                        var engineIP = popWindow.down('#engineIP').getValue();
                        var enginePort = popWindow.down('#enginePort').getValue();
                        var hadoopClusterCombo = popWindow.down('_hadoopClusterCombo');
                        var hiverServerCombo = popWindow.down('_hiveServerCombo');

                        var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.WE.ADD_ENGINE;
                        var param = {
                            'name': name,
                            'ip': engineIP,
                            'port': enginePort,
                            'hadoopClusterId': hadoopClusterCombo.getValue(),
                            'hiveServerId': hiverServerCombo.getValue()
                        };

                        var win = popWindow;
                        Flamingo.Ajax.Request.invokePostByMap(url, param,
                            function (response)
                            {
                        		var result = Ext.decode(response.responseText);
                        		var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
                                grid.getStore().load();

                                var popup = win;
                                popup.close();
                            },
                            function (response)
                            {
                                var result = Ext.decode(response.responseText);
                                var popup = win;
                                Ext.MessageBox.show({
                                    title: MSG.ADMIN_REG_WORKFLOW_ENG,
                                    msg: result.error.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING,
                                    fn: function handler(btn) {
                                        popup.close();
                                    }
                                });
                            }
                        );
                    }
                },
                */
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
        
        // 기본설정
        // 전체공개로 설정
        var checkPublic = Ext.ComponentQuery.query('#checkPublic'); // 전체공개 여부 체크박스
        var permisssionCombo = popWindow.down('#cboAdminPermission'); // 권한 사용자 박스
        permisssionCombo.clearValue();
		permisssionCombo.disable();
		checkPublic[0].setValue(true);
    },
    
	//2015.01.30 whitepoo@onycom.com
    /*
    등록된 엔진의 설정을 수정함.
    2015.01.20
    whitepoo@onycom.com
    */
    onEditEngineButton: function ()
    {
    	
    	var clusterID =0;
    	var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];		
		var selected_row = grid.getView().getSelectionModel().getSelection()[0];
		if(typeof selected_row == 'undefined')
		{
			Ext.MessageBox.show({title: 'Info',msg: 'Please select engine name to edit',buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
            return null;        	
        }
			
        var popEdit_Window = Ext.create('Ext.Window', 
		{
		            title: 'Edit Engine', width: 320,height: 210,modal: true, resizable: true, constrain: true,layout: 'fit',
		            //start copy
		            width: 320,
		            height: 300,
		            modal: true,
		            resizable: true,
		            constrain: true,
		            layout: 'fit',
		            items: [
		                {
		                    xtype: 'form',
		                    itemId: 'workflowEngineForm',
		                    border: false,
		                    bodyPadding: 10,
		                    defaults: {
		                        anchor: '100%',
		                        labelWidth: 80
		                    },
		                    items: [
		                        {
		                            xtype: 'textfield',
		                            name: 'name',
		                            itemId: 'name',
		                            fieldLabel: 'Engine Name',
		                            allowBlank: false,
		                            minLength: 1,
		                            readOnly: true
		                            //value:'TEST_ENGINE'                            
		                        },
		                        {
		                            xtype: 'container',
		                            layout: 'hbox',
		                            margin: '0 0 0',
		                            items: [
		                                {
		                                    xtype: 'fieldset',
		                                    flex: 1,
		                                    title: 'Connection',
		                                    layout: 'anchor',
		                                    defaults: {
		                                        anchor: '100%',
		                                        labelWidth: 100,
		                                        hideEmptyLabel: false
		                                    },
		                                    items: [
		                                        {
		                                            xtype: 'fieldcontainer',
		                                            fieldLabel: 'Engine',
		                                            layout: 'hbox',
		                                            combineErrors: true,
		                                            defaultType: 'textfield',
		                                            defaults: {
		                                                hideLabel: 'true'
		                                            },
		                                            items: [
		                                                {
		                                                    name: 'engineIP',
		                                                    itemId: 'engineIP',
		                                                    fieldLabel: MSG.COMMON_IP,
		                                                    flex: 4,                                                    
		                                                    value:'127.0.0.1',
		                                                    allowBlank: false
		                                                },
		                                                {
		                                                    name: 'enginePort',
		                                                    itemId: 'enginePort',
		                                                    fieldLabel: MSG.COMMON_PORT,
		                                                    flex: 2,
		                                                    margins: '0 0 0 6',
		                                                    value:'28080',
		                                                    allowBlank: false
		                                                }
		                                            ]
		                                        }
		                                    ]
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'container',
		                            layout: 'hbox',
		                            margin: '0 0 0',
		                            items: [
		                                {
		                                    xtype: 'fieldset',
		                                    flex: 1,
		                                    title: 'Assignment',
		                                    layout: 'anchor',
		                                    defaults: {
		                                        anchor: '100%',
		                                        labelWidth: 100,
		                                        hideEmptyLabel: false
		                                    },
		                                    items: [
		                                        {
		                                            xtype: 'fieldcontainer',
		                                            fieldLabel: 'Hadoop Custer',
		                                            layout: 'hbox',
		                                            combineErrors: true,
		                                            
		                                            defaults: {
		                                                hideLabel: 'true'
		                                            },
		                                            items: [
		                                                {
		                                                	id:'cboHadoopCluster',
		                                                	hiddenName  : 'cboHadoopCluster',
		                                                    xtype: '_hadoopClusterCombo'
		                                                }
		                                            ]
		                                        },
		                                        {
		                                            xtype: 'fieldcontainer',
		                                            fieldLabel: 'Hive Server',
		                                            layout: 'hbox',
		                                            combineErrors: true,
		                                            hidden:true,  //콤보상자를 가려줌.
		                                            defaults: {
		                                                hideLabel: 'true'
		                                            },
		                                            items: [
		                                                {
		                                                	id:'cboHiveCluster',
		                                                    xtype: '_hiveServerCombo'
		                                                }
		                                            ]
		                                        }
		                                    ]
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'container',
		                            layout: 'hbox',
		                            margin: '0 0 0',
		                            items: [
		                                {
		                                    xtype: 'fieldset',
		                                    flex: 1,
		                                    title: 'Permission',
		                                    layout: 'anchor',
		                                    defaults: {
		                                        anchor: '100%',
		                                        labelWidth: 100,
		                                        hideEmptyLabel: false
		                                    },
		                                    items: [
		                                        {
		                                        	xtype      : 'checkboxfield',
		                                            fieldLabel : 'Public',
		                                            itemId : 'checkPublic',
		                                            items: [
		                                                {
		                                                    boxLabel  : '',
		                                                    name      : 'public',
		                                                    inputValue: '1',
		                                                    checked   : true,
		                                                    id        : 'isPublic'
		                                                }
		                                            ],
		                                            listeners: {
		                                                change: function (checkbox, newVal, oldVal) {
		                                                	var permisssionCombo = Ext.ComponentQuery.query('#cboAdminPermission');
		                                                	
		                                                	// 전체공개인 경우 사용자 선택 비활성화
		                                                	if(newVal == true){
		                                                		permisssionCombo[0].clearValue();
		                                                		permisssionCombo[0].disable();
		                                                	}else{
		                                                		permisssionCombo[0].enable();
		                                                	}
		                                                }
		                                            }
		                                        },
		                                        {
		                                            xtype: 'fieldcontainer',
		                                            fieldLabel: 'User',
		                                            layout: 'hbox',
		                                            combineErrors: true,
		                                            
		                                            defaults: {
		                                                hideLabel: 'true'
		                                            },
		                                            items: [
		                                                {
		                                                	itemId : 'cboAdminPermission',
		                                                    xtype: '_AdminPermissionCombo'
		                                                }
		                                            ]
		                                        }
		                                    ]
		                                }
		                            ]
		                        }
		                    ]
		
		                }
		            ],		            
		            //end copy
		            buttons:
		            	[{
		                    //엔진 정보 수정 버튼.
		                	text: 'Apply',
		                    iconCls: 'common-confirm',
		                    handler: function () {
		                    	var name = popEdit_Window.down('#name').getValue();
	                            var engineIP = popEdit_Window.down('#engineIP').getValue();
	                            var enginePort = popEdit_Window.down('#enginePort').getValue();
	                            var hadoopClusterCombo = popEdit_Window.down('#cboHadoopCluster').getValue();
	                            var adminPermissionCombo = popEdit_Window.down('_AdminPermissionCombo').getValue();
	                      	    var checkPublic = Ext.ComponentQuery.query('#checkPublic')[0].getValue();
                                var hiverServerCombo = popEdit_Window.down('#cboHiveCluster').getValue();
                                
	                            //이름이 공백일 경우 ajax를 수행하지 않음.
	                          	if(hadoopClusterCombo == null){
	                          		return;
	                            }
	                          	  
	                          	//권한예외처리:전체공개가 아닌 경우 유저를 선택해야지 등록가능
	                          	if(checkPublic == false && adminPermissionCombo == ''){
	                          		return;
	                          	}
	                          	
	                          	var win = popEdit_Window;
                          		
                          		var isPublic;
                                if(checkPublic == true){
                                	isPublic = 1;
                                }else{
                                	isPublic = 0;
                                }
                                var permission;
                                Ext.each(adminPermissionCombo, function(username, index) {
                                	if(index == 0){
                                		permission = username; 
                                	}else{
                                		permission = permission + "," + username; 
                                	}
                            	});
                                
        						Ext.Ajax.request({
              	       				url : '/admin/engine/update_engineinfo',
              	       				method:"GET",
		              	       		headers: {
		              	                 'Accept': 'application/json',
		              	                 'Content-Type': 'application/json; charset=utf-8;'
		              	            },
              	       				params : {
                                		'id':enginePkID,
                                 	   	'name': name,
                                	    'engineIP': engineIP,
                                	    'enginePort': enginePort,
                                	    'hadoopClusterId': hadoopClusterCombo,
                                	    'hiveServerId': hiverServerCombo,
                                	    'isPublic': isPublic,
                                        'permission':permission
                               		},              	        	
              	       				success:function(result,request)
              	       				{
              	                  		if(result.statusText == "OK")
              	                  	  	{ 
                                        	var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
                                        	grid.getStore().load();
                                        	win.close();	                                            	
              	                    	}
              	              		}	                  	              	
                            	}); 
		                    },//end of function handler
		                },
		                {
		                    text: MSG.COMMON_CANCEL,
		                    iconCls: 'common-cancel',
		                    handler: function () { 
		                    	var win = this.up('window');
		                        win.close();
		                    }
		                }] //end of buttons
		});
		popEdit_Window.show();
		//엔진 클릭시 데이터 로드 
		
		Ext.Ajax.request({
			url:'/admin/engine/load_engineinfo',
			method:"GET",
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8;'
            },
			params:{
				'id':selected_row.data.id
			},              	        	
			success:function(result,request)
			{
				var jsonData = Ext.JSON.decode( result.responseText );//ExtJS4       		
				if(jsonData.success == "true")
				{
					enginePkID = Number(jsonData.data.ID);

					popEdit_Window.down('#name').setValue(jsonData.data.NAME);
					popEdit_Window.down('#engineIP').setValue(jsonData.data.IP);
					popEdit_Window.down('#enginePort').setValue(jsonData.data.PORT);
					popEdit_Window.down('#cboHadoopCluster').setValue(Number(jsonData.data.CLUSTER_ID));
					
					var permission = jsonData.data.PERMISSION;
					if(permission != undefined){
						popEdit_Window.down('#cboAdminPermission').setValue(permission.split(","));
					}
					
					var checkPublic = Ext.ComponentQuery.query('#checkPublic'); // 전체공개 여부 체크박스
					
					// 권한설정 전체 또는 사용자별 체크 여부에 따른 체크 설정
					var isPublic = jsonData.data.ISPUBLIC;
					var permisssionCombo = popEdit_Window.down('#cboAdminPermission');
					if(isPublic == 1){ // Check Ok
						permisssionCombo.clearValue();
                		permisssionCombo.disable();
                		checkPublic[0].setValue(true);
					}else{
						permisssionCombo.enable();
						checkPublic[0].setValue(false);
					}
					
					popEdit_Window.down('#cboHiveCluster').setValue();
					clusterID = Number(jsonData.data.CLUSTER_ID);
				}
				else
				{
				}
			},
			failure: function( result, request )
			{
				Ext.Msg.alert( "Failed", result.responseText );
			}
		});
    },
 
    /**
     * 등록한 Workflow Engine을 삭제한다.
     */
    onDeleteEngineButton: function () {
        var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
        var selection = grid.getView().getSelectionModel().getSelection()[0];
      
        if (selection) {
            Ext.MessageBox.show({
                title: MSG.ADMIN_DELETE_WORKFLOW_ENG,
                msg: MSG.ADMIN_DELETE_WORKFLOW_ENG_YN,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.WARNING,
                fn: function handler(btn) {
                    if (btn == 'yes') {
                        var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
                        var store = grid.getStore();
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.WE.DEL_ENGINE;
                        var param = {
                            "id": selection.data.id
                        };

                        Ext.Msg.hide();
                        Flamingo.Ajax.Request.invokePostByMap(url, param,
                            function (response) {
                                store.remove(selection);

                                Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0].getStore().removeAll();
                                Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0].getStore().load();
                                Ext.ComponentQuery.query('workflowEngineEnvsPanel #environmentGrid')[0].getStore().removeAll();
                                Ext.ComponentQuery.query('workflowEnginePropsPanel #propsGrid')[0].getStore().removeAll();
                                Ext.ComponentQuery.query('workflowEngineTriggersPanel #triggersGrid')[0].getStore().removeAll();
                                Ext.ComponentQuery.query('workflowEngineRunningJobsPanel #runningTrigger')[0].getStore().removeAll();
                            },
                            function (response) {
                                var msg = Ext.decode(response.responseText);
                                Ext.MessageBox.show({
                                    title: MSG.ADMIN_DELETE_WORKFLOW_ENG,
                                    msg: msg.error.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING,
                                    fn: function handler(btn) {
                                        Ext.Msg.hide();
                                    }
                                });
                            }
                        );
                    }
                }
            });
        } else {
            msg(MSG.DIALOG_TITLE_WARN, MSG.ADMIN_SELECT_WORKFLOW_ENG);
        }
    },

    /**
     * Workflow Engine에 로그 수집 작업을 등록한다.
     */
    onRegistJobButton: function () {
        var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var popWindow = Ext.create('Ext.Window', {
                title: MSG.ADMIN_REG_LOG_COLLECT,
                width: 700,
                height: 450,
                modal: true,
                resizable: true,
                constrain: true,
                padding: '5 5 5 5',
                layout: 'fit',
                items: [
                    {
                        xtype: 'textareafield',
                        itemId: 'xmlTextArea',
                        grow: false,
                        name: 'xml',
                        fieldStyle: {
                            'fontFamily': 'Monaco',
                            'fontSize': '12px',
                            padding: '5 5 5 5'
                        },
                        anchor: '100%'
                    }
                ],
                buttons: [
                    {
                        text: 'Register',
                        iconCls: 'common-confirm',
                        handler: function () {
                            var textarea = Ext.ComponentQuery.query("textareafield[name='xml']")[0];
                            var xml = textarea.getValue();
                            var serverId = selection.data.id;

                            var params = {
                                serverId: serverId
                            };

                            var p = popWindow;
                            Flamingo.Ajax.Request.invokePostByXML(CONSTANTS.ADMIN.WE.REGIST_JOB, params, xml,
                                function (response) {
                                    // FIXME 에러 대응 필요.
                                    var obj = Ext.decode(response.responseText);
                                    if (obj.success) {
                                        p.close();
                                    }
                                },
                                function (response) {
                                }
                            );
                        }
                    },
                    {
                        text: MSG.COMMON_CANCEL,
                        iconCls: 'common-cancel',
                        handler: function () {
                            popWindow.close();
                        }
                    }
                ]
            }).show();
        } else {
            msg(MSG.DIALOG_TITLE_WARN, 'Workflow Engine을 선택하십시오.');
        }
    },

    /**
     * Workflow Engine 목록 및 관련 화면을 갱신한다.
     */
    onRefreshEngineButton: function () {
        Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0].getStore().removeAll();
        Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0].getStore().load();
        Ext.ComponentQuery.query('workflowEngineEnvsPanel #environmentGrid')[0].getStore().removeAll();
        Ext.ComponentQuery.query('workflowEnginePropsPanel #propsGrid')[0].getStore().removeAll();
        Ext.ComponentQuery.query('workflowEngineTriggersPanel #triggersGrid')[0].getStore().removeAll();
        Ext.ComponentQuery.query('workflowEngineRunningJobsPanel #runningTrigger')[0].getStore().removeAll();
    },

    /**
     * 파일 시스템 브라우저를 화면에 표시한다.
     */
    onShowFileSystemBrowserButton: function () {
        var grid = Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0];
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var popWindow = Ext.create('Ext.Window', {
                title: 'Local File System Browser',
                width: 350,
                height: 600,
                modal: true,
                resizable: true,
                constrain: true,
                padding: '5 5 5 5',
                layout: 'fit',
                items: [
                    Ext.create('Flamingo.view.component._AIOLocalFileSystemBrowser', {
                        engine: selection.data
                    })
                ],
                buttons: [
                    {
                        text: MSG.COMMON_OK,
                        iconCls: 'common-confirm',
                        handler: function () {
                            popWindow.close();
                        }
                    }
                ]
            }).show();
        } else {
            msg(MSG.DIALOG_TITLE_WARN, MSG.ADMIN_SELECT_WORKFLOW_ENG);
        }
    },

    /**
     * Workflow Engine Grid를 선택했을 때 하단의 Detail Panel의 정보를 갱신한다.
     */
    onItemClick: function (dv, selectedRecord, item, index, e) {
        if (selectedRecord) {
        
            var serverUrl = selectedRecord.data.serverUrl;

            var envGrid = Ext.ComponentQuery.query('workflowEngineEnvsPanel #environmentGrid')[0];
            envGrid.getStore().load(
                {
                    params: {
                        'serverUrl': serverUrl
                    }
                }
            );

            var propsGrid = Ext.ComponentQuery.query('workflowEnginePropsPanel #propsGrid')[0];
            propsGrid.getStore().load(
                {
                    params: {
                        'serverUrl': serverUrl
                    }
                }
            );

            var triggersGrid = Ext.ComponentQuery.query('workflowEngineTriggersPanel #triggersGrid')[0];
            triggersGrid.getStore().load(
                {
                    params: {
                        'serverUrl': serverUrl
                    }
                }
            );

            var runningTrigger = Ext.ComponentQuery.query('workflowEngineRunningJobsPanel #runningTrigger')[0];
            runningTrigger.getStore().load(
                {
                    params: {
                        'serverUrl': serverUrl
                    }
                }
            );
        }
    }
    
});