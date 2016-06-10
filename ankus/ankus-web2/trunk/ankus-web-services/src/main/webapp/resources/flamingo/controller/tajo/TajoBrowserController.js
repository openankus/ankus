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
Ext.define('Flamingo.controller.tajo.TajoBrowserController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.tajoBrowserController',
    
    hadoopIP:"", // 선택된 하둡IP 정보
    hdfsUrl:"", // 선택된 하둡URL
    
    init: function () {
//        log('Initializing TajoBrowserController');
        this.control({
            'tajoBrowserPanel _workflowEngineCombo': {
                change: this.onEngineChange
            },

            'tajoBrowserPanel #comboDBSelect': {
            	select: this.onComboSelectDB
            },
            
            'tajoBrowserPanel #comboTableSelect': {
            	select: this.onComboSelectTable
            },
            'tajoBrowserPanel #btnQuery': {
            	click: this.onClickQuery
            },
            'tajoBrowserPanel #textfMaxLine':{
            	keyup:this.setMaxLine
            }
        });
//        log('Initialized TajoBrowserController');

        this.onLaunch();
    },

    onLaunch: function () {
//        log('Launched TajoBrowserController');

        var textfPort = Ext.ComponentQuery.query('tajoBrowserPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
        var textafQuery = Ext.ComponentQuery.query('tajoBrowserPanel #textafQuery')[0]; // 쿼리문
        var comboDBSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboDBSelect')[0]; // DB 선택
        var comboTableSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboTableSelect')[0]; // 테이블 선택
        var btnQuery = Ext.ComponentQuery.query('tajoBrowserPanel #btnQuery')[0]; // 쿼리 실행
    },
    

    /**
     * Workflow Engine Combo를 변경한 경우 이벤트를 처리한다.
     * Workflow Engine을 변경하게 되면 디렉토리와 파일 목록을 /를 기준으로 모두 업데이트하고
     * lastCluster에 선택한 Workflow Engine을 설정한다.
     */
    onEngineChange: function (combo, newValue, oldValue, eOpts) {
    	var me = this;
    	me.requestHadoopInfo();
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
    	
    	var comboTableSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboTableSelect')[0]; // 테이블 선택
    	var textafQuery = Ext.ComponentQuery.query('tajoBrowserPanel #textafQuery')[0]; // 쿼리문
    	var textfMaxLine = Ext.ComponentQuery.query('tajoBrowserPanel #textfMaxLine')[0]; // 최대 라인 수
    	
    	var sql = "SELECT * FROM " + comboTableSelect.getValue() + " LIMIT " + textfMaxLine.getValue();
    	textafQuery.setValue(sql);
    }
    
    /**
     * 쿼리를 실행한다.
     */
    ,onClickQuery: function(){
//    	console.log("onClickQuery");
    	var me = this;
    	
    	// 엔진 값 설정
    	var engineCombo = Ext.ComponentQuery.query('tajoBrowserPanel _workflowEngineCombo')[0];
    	var engineId = engineCombo.getValue();
    	var textfPort = Ext.ComponentQuery.query('tajoBrowserPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
    	var comboDBSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboDBSelect')[0]; // DB 선택
    	var comboTableSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboTableSelect')[0]; // 선택한 테이블 선택
    	var dasebaseName = comboDBSelect.getValue();
    	var tableName = comboTableSelect.getValue();
    	var textafQuery = Ext.ComponentQuery.query('tajoBrowserPanel #textafQuery')[0]; // 쿼리문
    	var query = textafQuery.getValue();
    	
    	if(engineId === undefined){
    		me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.ADMIN_SELECT_WORKFLOW_ENG);
    		return;
    	}
    	
    	if(dasebaseName === undefined || dasebaseName === null){
    		me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.TAJO_MSG_DASEBASE_SELECT);
    		return;
    	}
    	
    	if(tableName === undefined || tableName === null){
    		me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.TAJO_MSG_TABLE_SELECT);
    		return;
    	}
    	
    	if(query.length == 0){
    		me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.TAJO_MSG_NOT_QUERY);
    		return;
    	}
    	
    	var param = {"ip":me.hadoopIP, "port":textfPort.getValue(), "database":dasebaseName, "sql":query};
    	me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_RUN_QUERY, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	me.setPreview(obj);
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.COMMON_FAIL);
                }
			}
		);
    	
    }
    
    /**
     * 하둡 정보를 요청한다.
     */
    ,requestHadoopInfo:function(){
//    	console.log("requestHadoopInfo");
    	var me = this;
    	
    	var engineCombo = Ext.ComponentQuery.query('tajoBrowserPanel _workflowEngineCombo')[0];
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
            			me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.COMMON_FAIL);
            		}
                },
                function (failure) {
                	me.closeLoading();
                	me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.COMMON_FAIL);
                }
            );
    }
    
    /**
     * 타조 DB 목록을 요청한다.
     */
    ,requestTajoDBList:function(){
//    	console.log("requestTajoDBList");
    	var me = this;
    	var textfPort = Ext.ComponentQuery.query('tajoBrowserPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
        var param = {"ip":me.hadoopIP, "port":textfPort.getValue()};
        me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_GET_DATABASES, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	me.setTajoDBList(obj.data);
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.COMMON_FAIL);
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
    	var comboDBSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboDBSelect')[0];
    	comboDBSelect.bindStore(store);
    	
    	// DB 선택값 초기화
    	comboDBSelect.setValue();
    	
    	// 테이블 초기화
    	var comboTableSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboTableSelect')[0]; // 선택할 테이블 선택
    	comboTableSelect.getStore().removeAll();
    	comboTableSelect.bindStore(comboTableSelect.getStore());
    	comboTableSelect.setValue();
    }
    
    /**
     * 타조 테이블 목록을 요청한다.
     */
    ,requestTajoTableList:function(){
//    	console.log("requestTajoTableList");
    	var me = this;
    	
    	var comboDBSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboDBSelect')[0]; // DB 선택
    	var textfPort = Ext.ComponentQuery.query('tajoBrowserPanel #textfPort')[0]; // Tajo 디폴트 포트 설정
        
        var param = {"ip":me.hadoopIP, "port":textfPort.getValue(), "database":comboDBSelect.getValue()};
        me.showLoading();
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_TAJO_GET_TABLES, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
                if(obj.code === 0){ // 성공
                	me.setTajoTableList(obj.data);
                }else{ // 실패
                	me.showMsg(MSG.MENU_TAJO_BROWSER, MSG.COMMON_FAIL);
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
    	
    	var comboTableSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboTableSelect')[0]; // 선택할 테이블 선택
    	comboTableSelect.bindStore(store);
    	
    	// 테이블 선택값 초기화
    	comboTableSelect.setValue();
    }
    
    /**
     * 프리뷰 설정
     */
    ,setPreview:function(obj){
//    	console.log("setPreview");
    	var me = this;
    	var headers = obj.fields;
    	var datas = obj.data;
    	
    	var gridPreview = Ext.ComponentQuery.query('tajoBrowserPanel #gridPreview')[0]; // 그리드뷰
    	
    	var columns = [];
    	var fields = [];
    	for(var i=0; i<headers.length; i++){
    		columns.push({
				text : headers[i],
				dataIndex : headers[i]
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
    
    /**
     * 전체라인수 키 입력시 이벤트 처리
     */
    , setMaxLine:function(form, e){
    	var me = this;
    	var comboDBSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboDBSelect')[0]; // DB 선택
    	var comboTableSelect = Ext.ComponentQuery.query('tajoBrowserPanel #comboTableSelect')[0]; // 선택한 테이블 선택
    	var dasebaseName = comboDBSelect.getValue();
    	var tableName = comboTableSelect.getValue();
    	var textafQuery = Ext.ComponentQuery.query('tajoBrowserPanel #textafQuery')[0]; // 쿼리문
    	var textfMaxLine = Ext.ComponentQuery.query('tajoBrowserPanel #textfMaxLine')[0]; // 최대 라인 수
    	var maxLine = textfMaxLine.getValue();
    	var query = textafQuery.getValue();
    	
    	if(dasebaseName === undefined || dasebaseName === null){
    		return;
    	}
    	
    	if(tableName === undefined || tableName === null){
    		return;
    	}
    	
    	if(query.length == 0){
    		return;
    	}
    	
    	if(query.indexOf("LIMIT") > -1){
    		query = query.substring(0, query.indexOf("LIMIT")) + "LIMIT " + maxLine;
    	}else{
    		query = query + "LIMIT " + maxLine;
    	}
    	
    	textafQuery.setValue(query);
    	
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
    	var win = Ext.ComponentQuery.query('#tajo-browser-win')[0];
		win.setLoading(true);
    }
    
    /**
     * 로딩 팝업 종료
     */
    , closeLoading:function(){
    	var win = Ext.ComponentQuery.query('#tajo-browser-win')[0];
    	win.setLoading(false);
    }
});