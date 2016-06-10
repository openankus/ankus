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
Ext.define('Flamingo.controller.tajo.TajoMetaManagerController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.tajoMetaManagerController',
    
    hadoopIP:"", // 선택된 하둡IP 정보
    hdfsUrl:"", // 선택된 하둡URL
    sql:"", // 테이블 생성DDL
    
    init: function () {
//        log('Initializing TajoMetaManagerController');
        this.control({
            'tajoMetaDirectoryPanel': {
                itemcollapse: this.onItemCollapse,
                itemexpand: this.onItemExpand,
                itemclick: this.onItemClick
            },
            'tajoMetaDirectoryPanel #refreshButton': {
                click: this.onRefreshClick
            },
            'tajoMetaDirectoryPanel _workflowEngineCombo': {
                change: this.onEngineChange
            },

            'tajoMetaFilePanel > grid': {
                itemclick: this.onItemFileClick
            },
            
            'tajoMetaManagerPanel #comboDBSelect': {
            	select: this.onComboSelectDB
            },
            
            'tajoMetaManagerPanel #comboTableDel': {
            	select: this.onComboSelectTable
            },
            'tajoMetaManagerPanel #btnDBDel': {
            	click: this.onClickDeleteDB
            },
            'tajoMetaManagerPanel #btnDBCreate': {
            	click: this.onClickCreateDB
            },
            'tajoMetaManagerPanel #btnTableDel': {
            	click: this.onClickDeleteTable
            },
            'tajoMetaManagerPanel #btnTableCreate': {
            	click: this.onClickCreateTable
            },
            'tajoMetaManagerPanel #btnPreview': {
            	click: this.onClickPreview
            },
            'tajoMetaManagerPanel #checkIdentifier': {
            	change: this.onCheckCheckIdentifier
            }
        });
//        log('Initialized TajoMetaManagerController');

        this.onLaunch();
    },

    onLaunch: function () {
//        log('Launched TajoMetaManagerController');

        var filePanel = Ext.ComponentQuery.query('tajoMetaFilePanel')[0];
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        
        var textfPort = Ext.ComponentQuery.query('#textfPort')[0]; // Tajo 디폴트 포트 설정
        var comboDBSelect = Ext.ComponentQuery.query('#comboDBSelect')[0]; // DB 선택
        var btnDBDel = Ext.ComponentQuery.query('#btnDBDel')[0]; // DB 삭제
        var textfDBName = Ext.ComponentQuery.query('#textfDBName')[0]; // 생성할 DB 입력창
        var btnDBDel = Ext.ComponentQuery.query('#btnDBCreate')[0]; // DB 생성
        var comboTableDel = Ext.ComponentQuery.query('#comboTableDel')[0]; // 삭제할 테이블 선택
        var btnTableDel = Ext.ComponentQuery.query('#btnTableDel')[0]; // 테이블 삭제
        var textfTable = Ext.ComponentQuery.query('#textfTable')[0]; // 생성할 테이블 입력창
        var textfMaxLine = Ext.ComponentQuery.query('#textfMaxLine')[0]; // 최대 라인 수
        var btnTableCreate = Ext.ComponentQuery.query('#btnTableCreate')[0]; // 테이블 생성
        var comboDelimiter = Ext.ComponentQuery.query('#comboDelimiter')[0]; // 필드구분자 선택
        var checkIdentifier = Ext.ComponentQuery.query('#checkIdentifier')[0]; // 첫라인 컬럼 식별자
    },
    

    /**
     * Workflow Engine Combo를 변경한 경우 이벤트를 처리한다.
     * Workflow Engine을 변경하게 되면 디렉토리와 파일 목록을 /를 기준으로 모두 업데이트하고
     * lastCluster에 선택한 Workflow Engine을 설정한다.
     */
    onEngineChange: function (combo, newValue, oldValue, eOpts) {
    	var me = this;
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        directoryPanel.query('#lastCluster')[0].setValue(newValue);

        directoryPanel.getStore().getProxy().extraParams.engineId = newValue;

        this.updateDirectoryStore(newValue, '/');
        this.updateFileStore(newValue, '/');

        this._info(MSG.HDFS_MSG_CLUSTER_SELECTED);
        
        me.requestHadoopInfo();
    },

    /**
     * 디렉토리를 선택했을 때 파일 목록 정보를 업데이트한다.
     */
    onItemClick: function (view, node, item, index, event, opts) {
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        var filePanel = Ext.ComponentQuery.query('tajoMetaFilePanel > grid')[0];
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        
        lastPathComp.setValue(node.data.id);

        var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
        directoryPanel.getStore().getProxy().extraParams.engineId = engineCombo.getValue();
        
        var params = {
            path: node.data.id,
            engineId: engineCombo.getValue()
        };

        filePanel.getStore().load({
            scope: this,
            params: params
        });
    },

    /**
     * Tree에서 노드를 접었을 때 Grid 정보를 업데이트한다.
     *
     * @param node 노드 정보
     * @param opts 옵션 정보
     */
    onItemCollapse: function (node, opts) {
        var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
        this.updateFileStore(engineCombo.getValue(), node);
    },

    /**
     * 디렉토리 목록을 보여주는 Directory Panel을 갱신한다.
     */
    updateDirectoryStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        directoryPanel.getStore().load({
            params: {
                engineId: engineId,
                node: path
            }
        });
    },

    /**
     * 파일 목록을 보여주는 File Panel을 갱신한다.
     */
    updateFileStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }

        var fileStore = Ext.ComponentQuery.query('tajoMetaFilePanel > grid')[0].getStore()
        fileStore.removeAll();
        fileStore.load({
            scope: this,
            params: {
                engineId: engineId,
                path: path
            }
        });
    },

    /**
     * 디렉토리를 펼쳤을 때 서브 디렉토리와 파일 목록을 조회하여 업데이트한다.
     */
    onItemExpand: function (node, opts) {
        var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        var engineId = engineCombo.getValue();
        var path = node.data.id;

        directoryPanel.getStore().getProxy().extraParams.engineId = engineId;
        this.updateFileStore(engineId, path);
    },

    /**
     * Directory Panel의 Refresh를 눌렀을 경우 Tree와 Grid를 모두 갱신한다.
     */
    onRefreshClick: function () {
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
        var engineId = engineCombo.getValue();
        var lastPathComp = directoryPanel.query('#lastPath')[0];

        lastPathComp.setValue("/");

        this.updateDirectoryStore(engineId, '/');
        this.updateFileStore(engineId, '/');
    },

    /////////////////
    // File Grid
    /////////////////

    /**
     * 파일 목록에서 선택한 모든 파일 목록을 반환한다.
     */
    getSelectedItemIds: function () {
        var fileStore = Ext.ComponentQuery.query('tajoMetaFilePanel > grid')[0];
        var sm = fileStore.getSelectionModel().getSelection();
        var list = [];
        for (var i = 0; i <= sm.length - 1; i++) {
            var file = new Object();
            file.path = sm[i].get('id');
            file.name = sm[i].get('name');
            file.text = sm[i].get('text');
            list.push(file);
        }
        return list;
    },

    /**
     * 파일 클릭시 최근 경로에 선택한 경로를 선택한다.
     */
    onItemFileClick: function (view, record, item, index, e, opts) {
//    	console.log("onItemFileClick");
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        lastPathComp.setValue(record.data.id);
    },

    /**
     * 가장 마지막에 선택한 Hadoop Cluster를 반환한다.
     */
    getCluster: function () {
        var lastCluster = query('tajoMetaDirectoryPanel #lastCluster');
        return lastCluster.getValue();
    },

    /**
     * 현재 선택한 노드를 반혼한다.
     *
     * @return 현재 선택한 노드
     */
    getSelectedNode: function () {
        var directoryPanel = Ext.ComponentQuery.query('tajoMetaDirectoryPanel')[0];
        var selModel = directoryPanel.getSelectionModel();
        return selModel.getLastSelected();
    },

    /**
     * 현재 선택한 노드가 Leaf인지 확인한다.
     *
     * @return Leaf 여부
     */
    isLeaf: function () {
        return this.getSelectedNode().isLeaf();
    },

    /**
     * 선택한 노드에 자식 노드를 포함하고 있는지 확인한다.
     *
     * @return 자식 노드를 포함하고 있으면 true
     */
    hasChildNodes: function () {
        return this.getSelectedNode().hasChildNodes();
    },

    /**
     * 에러메시지를 팝업한다.
     *
     * @param {String} message
     * @private
     */
    _error: function (message) {
        var statusBar = Ext.ComponentQuery.query('_statusBar')[0];
        if (statusBar) {
            Ext.defer(function () {
                statusBar.setStatus({
                    text: message,
                    iconCls: 'x-status-error',
                    clear: true
                });
            }, 1500);
        }

        return false;
    },

    /**
     * 정보메시지를 팝업한다.
     *
     * @param {String} message
     * @private
     */
    _info: function (message) {
        var statusBar = Ext.ComponentQuery.query('_statusBar')[0];
        if (statusBar) {
            Ext.defer(function () {
                statusBar.setStatus({
                    text: message,
                    iconCls: 'x-status-valid',
                    clear: true
                });
            }, 1500);
        }
    }
    
    /**
     * 데이터베이스 선택 이벤트
     */
    ,onComboSelectDB: function(combo, records, eOpts){
//    	console.log("onComboSelectDB");
    	this.requestTajoTableList();
    }
    
    /**
     * 테이블 선택 이벤트
     */
    ,onComboSelectTable: function(){
//    	console.log("onComboSelectTable");
    }
    
    /**
     * DB 생성
     */
    ,onClickCreateDB: function(){
//    	console.log("onClickCreateDB");
    	var me = this;
    	
    	// 엔진 값 설정
    	var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
    	var engineId = engineCombo.getValue();
    	var textfPort = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
    	var textfDBName = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfDBName')[0]; // 생성할 DB 입력창
    	
    	var dasebaseName = textfDBName.getValue();
    	
    	if(engineId === undefined){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.ADMIN_SELECT_WORKFLOW_ENG);
    		return;
    	}
    	
    	if(dasebaseName.length === 0){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_NOT_DASEBASE);
    		return;
    	}
    	
    	var param = {"ip":me.hadoopIP, "port":textfPort.getValue(), "database":dasebaseName};
    	me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_CREATE_DATABASE, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	textfDBName.setValue(); // 데이터베이스명 초기화
                	me.requestTajoDBList();
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
                }
			}
		);
    }
    
    /**
     * DB 삭제
     */
    ,onClickDeleteDB: function(){
//    	console.log("onClickDeleteDB");
    	var me = this;
    	
    	// 엔진 값 설정
    	var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
    	var engineId = engineCombo.getValue();
    	var textfPort = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
    	var comboDBSelect = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboDBSelect')[0]; // DB 선택
    	
    	var dasebaseName = comboDBSelect.getValue();
    	
    	if(engineId === undefined){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.ADMIN_SELECT_WORKFLOW_ENG);
    		return;
    	}
    	
    	if(dasebaseName === undefined || dasebaseName === null){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_DASEBASE_SELECT);
    		return;
    	}
    	
    	var param = {"ip":me.hadoopIP, "port":textfPort.getValue(), "database":dasebaseName};
    	me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_DELETE_DATABASE, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	msg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_DELETE_DATABASE_SUCC);
                	me.requestTajoDBList();
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
                }
			}
		);
    }
    
    /**
     * 테이블 생성
     */
    ,onClickCreateTable: function(){
//    	console.log("onClickCreateTable");
    	me = this;
    	
    	// 엔진 값 설정
    	var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
    	var comboDBSelect = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboDBSelect')[0]; // DB 선택
    	var engineId = engineCombo.getValue();
    	var dasebaseName = comboDBSelect.getValue();
    	
    	if(engineId === undefined){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.ADMIN_SELECT_WORKFLOW_ENG);
    		return;
    	}
    	
    	if(dasebaseName === undefined || dasebaseName === null){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_DASEBASE_SELECT);
    		return;
    	}
    	
    	var popWindow = Ext.create('Ext.Window', {
            title: MSG.TAJO_TABLE_CREATE,
            itemId: 'popTajoTableCreate',
            width: 300,
            height: 120,
            modal: true,
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: {
                xtype: 'form',
                border: false,
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 80
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'tableName',
                        itemId: 'textfTable',
                        fieldLabel: MSG.TAJO_TABLE_NAME,
                    }
                ]
            },
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                    	me.requestTajoCreateTable();
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
    
    /**
     * 테이블 삭제
     */
    ,onClickDeleteTable: function(){
//    	console.log("onClickDeleteTable");
    	var me = this;
    	
    	var comboDBSelect = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboDBSelect')[0]; // DB 선택
    	var comboTableDel = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboTableDel')[0]; // 삭제할 테이블 선택
    	var textfPort = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
    	
    	var dasebaseName = comboDBSelect.getValue();
    	var tableName = comboTableDel.getValue();
    	
    	if(dasebaseName === undefined || dasebaseName === null){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_DASEBASE_SELECT);
    		return;
    	}
    	
    	if(tableName === undefined || tableName === null){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_TABLE_SELECT);
    		return;
    	}
    	
        var param = {"ip":me.hadoopIP, "port":textfPort.getValue(), "database":dasebaseName, "table":tableName};
        me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_DELETE_TABLE, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	msg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_DELETE_TABLE_SUCC);
                	
                	me.requestTajoTableList();
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
                }
			}
		);
    }
    
    /**
     * 프리뷰를 생성한다
     */
    ,onClickPreview: function(){
//    	console.log("onClickPreview");
    	var me = this;
    	
    	// 엔진 값 설정
    	var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
    	var engineId = engineCombo.getValue();
    	
    	if(engineId === undefined){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.ADMIN_SELECT_WORKFLOW_ENG);
    		return;
    	}
    	
    	// 파일위치 설정
        var fileStore = Ext.ComponentQuery.query('tajoMetaFilePanel > grid')[0];
        var fileInfo = fileStore.getSelectionModel().getSelection()[0];
        var filePath;
        
        var isFile = false;
        if(fileInfo === undefined){
        }else{
        	if(fileInfo.data.directory === true){
        	}else{
        		filePath = fileInfo.data.id;
        		isFile = true;
        	}
        }
        
        if(isFile == false){
        	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_FILE_SELECT);
        	return;
        }
        
        // 구분자 설정
    	var delimiter = Ext.ComponentQuery.query('_tajoDelimiterSelCmbField #delimiterType')[0].getValue();
    	if (delimiter === 'CUSTOM'){
    		var customDelimiter = Ext.ComponentQuery.query('_tajoDelimiterSelCmbField #delimiterValue')[0].getValue();
    		if(customDelimiter === ""){
    			return;
    		}
    		delimiter = customDelimiter;
    	}
    	
    	var textfMaxLine = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfMaxLine')[0]; // 최대 라인 수
    	
    	var param = {
			"inputPath":filePath,
			"delimiter":delimiter,
			"engineId":engineId,
			"maxLine":textfMaxLine.getValue()
        };
    	
    	me.showLoading();
        Flamingo.Ajax.Request.invokeGet(CONSTANTS.DESIGNER.LOAD_HDFS_FILE_FP_ORIGINAL, param,
            function (response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                	me.setPreview(obj);
        		} else {
        			me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
        		}
            },
            function (failure) {
            	me.closeLoading();
            	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
            	console.log(failure);
            }
        );
    }
    
    /**
     * 첫라인 컬럼 식별자 체크 이벤트
     */
    ,onCheckCheckIdentifier: function (checkbox, newVal, oldVal) {
		if(newVal === true){
		}else{
		}
    }
    
    /**
     * 하둡 정보를 요청한다.
     */
    ,requestHadoopInfo:function(){
//    	console.log("requestHadoopInfo");
    	var me = this;
    	
    	var engineCombo = Ext.ComponentQuery.query('tajoMetaDirectoryPanel _workflowEngineCombo')[0];
        var hadoopId = engineCombo.findRecordByValue(engineCombo.getValue()).data.hadoopClusterId;
        
        var param = {
            id: hadoopId,
        };
        me.showLoading();
        Flamingo.Ajax.Request.invokeGet(CONSTANTS.ADMIN.HADOOP.GET_HADOOP_CLUSTER, param,
                function (response) {
        			me.closeLoading();
                    var obj = Ext.decode(response.responseText);
                    if (obj.success) {
                    	me.hadoopIP = obj.map.namenodeIP;
                    	me.hdfsUrl = obj.map.hdfs_url;
                    	me.requestTajoDBList();
            		} else {
            			me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
            		}
                },
                function (failure) {
                }
            );
    }
    
    /**
     * 타조 DB 목록을 요청한다.
     */
    ,requestTajoDBList:function(){
//    	console.log("requestTajoDBList");
    	var me = this;
    	var textfPort = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
        var param = {"ip":me.hadoopIP, "port":textfPort.getValue()};
        me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_GET_DATABASES, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	me.setTajoDBList(obj.data);
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
                }
			}
		);
    }
    
    /**
     * DB 목록을 설정한다.
     */
    ,setTajoDBList:function(obj){
//    	console.log("setTajoDBList");
    	var storeData = [];
    	Ext.each(obj, function(name, index) {
    		storeData.push({"name":name});
    	});
    	var store = Ext.create('Ext.data.Store', {
    	    fields: ['name'],
    	    data : storeData
    	});
    	var comboDBSelect = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboDBSelect')[0];
    	comboDBSelect.bindStore(store);
    	
    	// DB 선택값 초기화
    	comboDBSelect.setValue();
    	
    	// 테이블 초기화
    	var comboTableDel = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboTableDel')[0]; // 삭제할 테이블 선택
    	comboTableDel.getStore().removeAll();
    	comboTableDel.bindStore(comboTableDel.getStore());
    	comboTableDel.setValue();
    }
    
    /**
     * 타조 테이블 목록을 요청한다.
     */
    ,requestTajoTableList:function(){
//    	console.log("requestTajoTableList");
    	var me = this;
    	
    	var comboDBSelect = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboDBSelect')[0]; // DB 선택
    	var textfPort = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
        
        var param = {"ip":me.hadoopIP, "port":textfPort.getValue(), "database":comboDBSelect.getValue()};
        me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_GET_TABLES, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	me.setTajoTableList(obj.data);
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
                }
			}
		);
    }
    
    /**
     * 테이블 목록을 설정한다.
     */
    ,setTajoTableList:function(obj){
    	var storeData = [];
    	Ext.each(obj, function(name, index) {
    		storeData.push({"name":name});
    	});
    	
    	var store = Ext.create('Ext.data.Store', {
    		autoLoad:true,
    	    fields: ['name'],
    	    data : storeData
    	});
    	
    	var comboTableDel = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboTableDel')[0]; // 삭제할 테이블 선택
    	comboTableDel.bindStore(store);
    	
    	// 테이블 선택값 초기화
    	comboTableDel.setValue();
    }
    
    /**
     * 프리뷰 설정
     */
    ,setPreview:function(obj){
    	var me = this;
    	var gridPreview = Ext.ComponentQuery.query('tajoMetaManagerPanel #gridPreview')[0]; // 그리드뷰
    	
    	// 구분자 설정
    	var delimiter = Ext.ComponentQuery.query('_tajoDelimiterSelCmbField #delimiterType')[0].getValue();
    	if (delimiter === 'CUSTOM'){
    		var customDelimiter = Ext.ComponentQuery.query('_tajoDelimiterSelCmbField #delimiterValue')[0].getValue();
    		if(customDelimiter === ""){
    			return;
    		}
    		delimiter = customDelimiter;
    	}
    	
    	// 첫라인 헤더 여부
    	var checkIdentifier = Ext.ComponentQuery.query('tajoMetaManagerPanel #checkIdentifier')[0];  
		var ishead = checkIdentifier.checked;
    	
    	var lines = obj.list[0].rowData;
    	
    	var headers = [];
    	var datas = []
    	for(var i=0; i<lines.length; i++){
    		var cols = lines[i].split(delimiter);
    		if(i==0){
    			for(var j=0; j<cols.length; j++)
    				if(ishead === true){
    					headers.push(cols[j]);
    				}else{
    					headers.push('col'+j);
    				}
    			
    			if(ishead) continue;
    		}
    		datas.push(cols);
    	}
    	
    	var columns = [];
        var fields = [];
    	for (var i = 0; i < headers.length; i++) {
			columns.push({
				text : headers[i],
				dataIndex : headers[i],
				items : [
			         {
						xtype : 'textfield',
						name : 'cnames',
						value : headers[i]
						,listeners : {
							change : function(field) {
//								me.requestTajoCreateTable();
							}
						}

					},
					{
						xtype : 'combobox',
						editable : false,
						name : 'ctypes',
						store : [ 'bool', 'int1', 'int2',
								'int4', 'int',
								'bit varying', 'int8',
								'float4', 'float8', 'text',
								'date', 'time',
								'timestamp', 'inet4' ]
						,listeners : {
							render : function(field) {
								field.setValue('text');
							},
							change : function(field) {
//								me.requestTajoCreateTable();
							}
						}

					} ]
			});
			fields.push({
				name : headers[i],
				type : 'text'
			});
		}
    	
    	var store = new Ext.data.ArrayStore({
    		autoDestroy: true,
            fields: fields
        });
        store.loadData(datas);
        
        gridPreview.reconfigure(store, columns);
    }
    
    ,requestTajoCreateTable :function(){
//    	console.log("requestTajoCreateTable");
    	var me = this;
    	
    	var textfPort = Ext.ComponentQuery.query('tajoMetaManagerPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
    	var textfTable = Ext.ComponentQuery.query('#popTajoTableCreate #textfTable')[0]; // 생성할 테이블 입력창
    	var comboDBSelect = Ext.ComponentQuery.query('tajoMetaManagerPanel #comboDBSelect')[0]; // DB 선택
    	
    	var dasebaseName = comboDBSelect.getValue();
    	var tableName = textfTable.getValue();
    	
    	if(dasebaseName === undefined || dasebaseName === null){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_DASEBASE_SELECT);
    		return;
    	}
    	
    	if(tableName.length === 0){
    		me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_NOT_TABLE);
    		return;
    	}
    	
    	var ctypes = Ext.ComponentQuery.query('tajoMetaManagerPanel combobox[name=ctypes]');
    	var cnames = Ext.ComponentQuery.query('tajoMetaManagerPanel textfield[name=cnames]');
    	
    	// 파일위치 설정
        var fileStore = Ext.ComponentQuery.query('tajoMetaFilePanel > grid')[0];
        var fileInfo = fileStore.getSelectionModel().getSelection()[0];
        var filePath;
        
        var isFile = false;
        if(fileInfo === undefined){
        }else{
        	if(fileInfo.data.directory === true){
        	}else{
        		filePath = fileInfo.data.id;
        		isFile = true;
        	}
        }
        
        if(isFile == false){
        	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_FILE_SELECT);
        	return;
        }
    	
    	// 구분자 설정
    	var delimiter = Ext.ComponentQuery.query('_tajoDelimiterSelCmbField #delimiterType')[0].getValue();
    	if (delimiter === 'CUSTOM'){
    		var customDelimiter = Ext.ComponentQuery.query('_tajoDelimiterSelCmbField #delimiterValue')[0].getValue();
    		if(customDelimiter === ""){
    			return;
    		}
    		delimiter = customDelimiter;
    	}
    	
    	if(ctypes === undefined || ctypes.length === 0){
    		return;
    	}
    	
    	var sql = "CREATE EXTERNAL TABLE IF NOT EXISTS "+tableName+" (\n";
    	var fs = "";
    	for(var i = 0 ; i<ctypes.length; i++)
    	{
    		fs += (i==0?"":",\n");
    		fs += cnames[i].getValue()+ " " + ctypes[i].getValue();
    	}
    	sql += fs + ") USING TEXT WITH ('text.delimiter'='"+ delimiter +"') LOCATION '"+ me.hdfsUrl + filePath + "'";
    	
    	var param = {"ip":me.hadoopIP, "port":textfPort.getValue(), "database":dasebaseName, "createSql":sql};
    	me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_CREATE_TABLE, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	msg(MSG.MENU_TAJO_META_MANAGER, MSG.TAJO_MSG_TABLE_CREATED);
                	
                	var win = Ext.ComponentQuery.query('#popTajoTableCreate')[0];
                    win.close();
                	
                	me.requestTajoTableList();
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_META_MANAGER, MSG.COMMON_FAIL);
                }
			}
		);
    	
    }
    /**
     * 메시지 팝업
     */
    , showMsg:function(title, message){
    	Ext.MessageBox.show({
            title: title,
            msg: message,
            width: 300,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING,
            scope: this,
            fn: function (btn, text, eOpts) { return false; }
        });
    }
    
    /**
     * 로딩 팝업
     */
    , showLoading:function(){
    	var win = Ext.ComponentQuery.query('#tajo-meta-manager-win')[0];
		win.setLoading(true);
    }
    
    /**
     * 로딩 팝업 종료
     */
    , closeLoading:function(){
    	var win = Ext.ComponentQuery.query('#tajo-meta-manager-win')[0];
    	win.setLoading(false);
    }
});