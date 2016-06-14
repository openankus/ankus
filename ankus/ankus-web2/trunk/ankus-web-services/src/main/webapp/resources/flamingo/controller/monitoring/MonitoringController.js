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
Ext.define('Flamingo.controller.monitoring.MonitoringController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.monitoringController',
    
    dataNodeIndex: -1, // 선택된 데이터노드 위치값
    dataNodeDatas: [], // DataNode 정보들
    timerId:100, // 타이머 ID값 종료할때 사용
    
    init: function () {
//        log('Initializing MonitoringController');
        this.control({
            'monitoringPanel _workflowEngineCombo': {
                change: this.onEngineChange
            },
            'monitoringPanel #refreshButton': {
                click: this.onRefreshClick
            },
            'monitoringPanel #gridDataNode': {
        		itemclick:this.onDataNodeItemClick
            }
        });
//        log('Initialized MonitoringController');

        this.onLaunch();
    },

    onLaunch: function () {
//        log('Launched MonitoringController');
        
        var comboInterval = Ext.ComponentQuery.query('monitoringPanel #comboInterval')[0]; // 새로고침 딜레이
        comboInterval.select(comboInterval.getStore().getAt(0)); // 첫번째 값을 디폴트로 한다.
    },
    

    /**
     * Workflow Engine Combo를 변경한 경우 이벤트를 처리한다.
     * Workflow Engine을 변경하게 되면 디렉토리와 파일 목록을 /를 기준으로 모두 업데이트하고
     * lastCluster에 선택한 Workflow Engine을 설정한다.
     */
    onEngineChange: function (combo, newValue, oldValue, eOpts) {
    	var me = this;
    	me.requestHadoopStatus(0);
    },
    
    /**
     * 새로고침 이벤트
     */
    onRefreshClick: function () {
    	var me = this;
    	me.requestHadoopStatus(2);
    }
    
    /**
     * DataNode 목록 아이템 선택 이벤트
     */
    , onDataNodeItemClick:function(dv, record, item, index, e) {
    	var me = this;
    	me.dataNodeIndex = index; 
    	me.setDataNodeInfo(index, 0);
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
     * 모니터링 정보를 요청한다.(웹,하둡,마스터노드,네임노드, CPU,메모리,용량 등);
     * param type 요청상태(0:최초,1:자동새로고침,2:수동새로고침
     */
    ,requestHadoopStatus:function(type){
//    	console.log("requestHadoopStatus");
    	var me = this;
    	
    	me.stopTimerRequest(); // 타이머 초기화
    	
    	var engineCombo = Ext.ComponentQuery.query('monitoringPanel _workflowEngineCombo')[0];
    	if(engineCombo.getValue() === undefined){
    		return;
    	}
        var engineId = engineCombo.findRecordByValue(engineCombo.getValue()).data.id;
    	
        var param = {"engineId":engineId};
//        var param = {"hadoopurl":me.hadoopIP, "account":account, "pwd":pwd};
        if(type === 0 || type === 2){
        	me.showLoading();
        }
        Flamingo.Ajax.Request.invokePostByJSON(CONSTANTS.REST_MONITORING_GET_HADOOPSTATUS, param, {}, 
            function(response) {
        		me.closeLoading();
                var obj = Ext.decode(response.responseText);
//                console.log(obj);
                if(obj.code === 0){ // 성공
                	me.setHadoopStatus(obj.data, type);
                }else{ // 실패
                	if(type === 0 || type === 2){
                    	me.showMsg(MSG.MENU_MONITORING, MSG.COMMON_FAIL);
                    }else{
                    	me.startTimerRequest();
                    }
                }
			},
			function(response, options) { // fail
				me.closeLoading();
				if(type === 0 || type === 2){
                	me.showMsg(MSG.MENU_MONITORING, MSG.COMMON_FAIL);
                }else{
                	me.startTimerRequest();
                }
			}
		);
    }
    
    /**
     * 모니터링 정보를 표시한다.
     * param obj 모니터링정보
     * 		 type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
    ,setHadoopStatus:function(obj, type){
//    	console.log("setHadoopStatus");
    	var me = this;
    	
    	var win = Ext.ComponentQuery.query('#monitoring-win')[0];
    	
    	if(win === undefined){ // 팝업창이 종료된 상태면 리턴
    		return;
    	}
    	
    	if(type === 0 || type === 2){
    		me.dataNodeIndex = -1 // 데이터노드 선택값 초기화
    	}
    	
//    	me.serverInfo = obj;
    	// 웹서버정보 설정
    	me.setWebServerInfo(obj, type);
    	// 하둡정보 설정 
    	me.setHadoopInfo(obj.hadoopclusterinfo, type);
    	// MasterNode 설정
    	me.setMasterNodeInfo(obj.hadoopclusterinfo, type);
    	// DataNodeList 설정
    	me.setDataNodeList(obj.hadoopclusterinfo, type);
    	
    	// 자동새로고침을 위한 타이머를 시작한다.
    	me.startTimerRequest();
    }
    
    /**
     * 웹서버 정보를 표시한다.(CPU,메모리,디스크)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
    , setWebServerInfo:function(obj, type){
//    	console.log("setWebServerInfo:type = " + type);
    	var me = this;
    	
    	var d3WebCPU = Ext.ComponentQuery.query('monitoringPanel #d3WebCPU')[0]; // Web서버  CPU 그래프
    	var d3WebMemory = Ext.ComponentQuery.query('monitoringPanel #d3WebMemory')[0]; // Web서버 메모리 그래프
    	var d3WebDisk = Ext.ComponentQuery.query('monitoringPanel #d3WebDisk')[0]; // Web서버 디스크 그래프
    	if(obj !== undefined){
    		// CPU 설정
    		if(obj.cpuload !== 0){
    			var cpuData = [{cpu:(obj.cpuload*100)}];
    			if(type === 0 || type === 2){
    				d3WebCPU.setData(cpuData);
    			}else{
    				d3WebCPU.addData(cpuData);
    			}
    		}
    		
    		// 메모리 용량 설정
    		var memoryData = [];
    		var usedMemory = obj.totalmemory - obj.freememory; // 사용중 메모리 구하기
    		var freeMemoryPercent = Math.floor(((obj.freememory/obj.totalmemory)*100)); // 남은 용량 %
			var usedMemoryPercent = 100-freeMemoryPercent; // 사용 용량 %
			
    		memoryData.push({label:MSG.HDFS_USAGE + " " + me.getCapacityText(usedMemory) + "   ", value:usedMemoryPercent}); // 사용중 메모리
    		memoryData.push({label:MSG.MONITORING_REMAINING_SIZE + " " + me.getCapacityText(obj.freememory), value:freeMemoryPercent}); // 남은 메모리
    		if(obj.totalmemory !== 0){
    			d3WebMemory.setData(memoryData);
    		}
    		
    		// 디스크 용량 설정
    		var diskData = [];
    		
    		var freeDisk = 0; // 남은 용량
			var usedDisk = 0; // 사용중 용량
			var totalDisk = 0; // 전체용량
    		Ext.each(obj.disks, function(disk){
    			totalDisk = totalDisk + disk.size;
    			freeDisk = freeDisk + disk.free;
    			usedDisk = usedDisk + disk.size - disk.free; 
    		});
    		var freeDiskPercent = Math.floor(((freeDisk/totalDisk)*100)); // 남은 용량 %
			var usedDiskPercent = 100-freeDiskPercent; // 사용 용량 %
    		
    		diskData.push({label:MSG.HDFS_USAGE + " " + me.getCapacityText(usedDisk) + "   ", value:usedDiskPercent}); // 사용중 메모리
    		diskData.push({label:MSG.MONITORING_REMAINING_SIZE + " " + me.getCapacityText(freeDisk), value:freeDiskPercent}); // 남은 메모리
    		if(totalDisk !== 0){
    			d3WebDisk.setData(diskData);
    		}
    	}
    }    
    /**
     * 하둡 정보를 표시한다.(하둡버전, live노드스, dead노드수, 복제수, 블럭크기, 하둡용량)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
    , setHadoopInfo:function(obj, type){
//    	console.log("setHadoopInfo");
    	var me = this;
    	
    	var gridHadoopInfo = Ext.ComponentQuery.query('monitoringPanel #gridHadoopInfo')[0]; // 그리드뷰
    	var d3HadoopCapacity = Ext.ComponentQuery.query('monitoringPanel #d3HadoopCapacity')[0]; // 하둡 용량 그래프
    	
    	var columns = [];
		columns.push({ text : 'key', dataIndex : 'key', flex:1});
		columns.push({ text : 'value', dataIndex : 'value', flex:1.7});
    	
		var datas = [];
		if(obj !== undefined){
			datas.push({ 'key':MSG.COMMON_VERSION,'value':obj.version }); // 하둡버젼
			datas.push({ 'key':MSG.HDFS_INFO_LIVE_NODES,'value':obj.livenode }); // live노드수
			datas.push({ 'key':MSG.HDFS_INFO_DEAD_NODES,'value':obj.deadnode }); // dead노드수
			datas.push({ 'key':MSG.HDFS_INFO_REPLICATION,'value':obj.replication }); // 복제수
			datas.push({ 'key':MSG.HDFS_INFO_BLOCK_SIZE,'value':me.getCapacityText(obj.blocksize) }); // 블럭크기(byte)
			
			// 하둡 용량 그래프 표시를 위한 데이터 설정
			var freeHadoop = obj.capacity - obj.used; // 하둡 남은용량
			var freeHadoopPercent = Math.floor(((freeHadoop/obj.capacity)*100)); // 남은 용량 %
			var usedHadoopPercent = 100-freeHadoopPercent; // 사용 용량 %
			
			var hadoopCapacityData = [];
			hadoopCapacityData.push({label:MSG.MONITORING_HDFS_USED + " " + me.getCapacityText(obj.used) + "   ", value:usedHadoopPercent}); // 하둡 사용량
			hadoopCapacityData.push({label:MSG.MONITORING_HDFS_REMAINING_SIZE + " " + me.getCapacityText(freeHadoop), value:freeHadoopPercent}); // 하둡 남은용량
			if(obj.capacity !== 0){
				d3HadoopCapacity.setData(hadoopCapacityData);
			}
		}
		
		var store = new Ext.data.ArrayStore({
    		fields:['key', 'value']
        });
		store.loadData(datas);
        
		gridHadoopInfo.reconfigure(store, columns);
    }
    
    /**
     * MasterNode 정보를 표시한다.(CPU, 메모리, 디스크)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
    , setMasterNodeInfo:function(obj, type){
//    	console.log("setMasterNodeInfo");
    	var me = this;
    	
    	var d3MasterCPU = Ext.ComponentQuery.query('monitoringPanel #d3MasterCPU')[0]; // MasterNode CPU 그래프
    	var d3MasterMemory = Ext.ComponentQuery.query('monitoringPanel #d3MasterMemory')[0]; // MasterNode 메모리 그래프
    	var d3MasterDisk = Ext.ComponentQuery.query('monitoringPanel #d3MasterDisk')[0]; // MasterNode 디스크 그래프
    	
    	if(obj !== undefined){
    		// CPU 설정
    		if(obj.cpuload !== 0){
    			var cpuData = [{cpu:(obj.cpuload*100)}];
    			if(type === 0 || type === 2){
    				d3MasterCPU.setData(cpuData);
    			}else{
    				d3MasterCPU.addData(cpuData);
    			}
    		}
    		
    		// 메모리 용량 설정
    		var memoryData = [];
    		var usedMemory = obj.totalmemory - obj.freememory; // 사용중 메모리 구하기
    		var freeMemoryPercent = Math.floor(((obj.freememory/obj.totalmemory)*100)); // 남은 용량 %
			var usedMemoryPercent = 100-freeMemoryPercent; // 사용 용량 %
			
    		memoryData.push({label:MSG.HDFS_USAGE + " " + me.getCapacityText(usedMemory) + "   ", value:usedMemoryPercent}); // 사용중 메모리
    		memoryData.push({label:MSG.MONITORING_REMAINING_SIZE + " " + me.getCapacityText(obj.freememory), value:freeMemoryPercent}); // 남은 메모리
    		if(obj.totalmemory !== 0){
    			d3MasterMemory.setData(memoryData);
    		}
    		
    		// 디스크 용량 설정
    		var diskData = [];
    		
    		var freeDisk = 0; // 남은 용량
			var usedDisk = 0; // 사용중 용량
			var totalDisk = 0; // 전체용량
    		Ext.each(obj.disks, function(disk){
    			totalDisk = totalDisk + disk.size;
    			freeDisk = freeDisk + disk.free;
    			usedDisk = usedDisk + disk.size - disk.free; 
    		});
    		var freeDiskPercent = Math.floor(((freeDisk/totalDisk)*100)); // 남은 용량 %
			var usedDiskPercent = 100-freeDiskPercent; // 사용 용량 %
    		
    		diskData.push({label:MSG.HDFS_USAGE + " " + me.getCapacityText(usedDisk) + "   ", value:usedDiskPercent}); // 사용중 메모리
    		diskData.push({label:MSG.MONITORING_REMAINING_SIZE + " " + me.getCapacityText(freeDisk), value:freeDiskPercent}); // 남은 메모리
    		if(totalDisk !== 0){
    			d3MasterDisk.setData(diskData);
    		}
    	}
    }
    
    /**
     * DataNode 목록 정보를 표시한다.(노드이름, IP)
     * param type 상태(0:최초,1:자동새로고침,2:수동새로고침
     */
    , setDataNodeList:function(obj, type){
//    	console.log("setDataNodeList::type = " + type);
    	var me = this;
    	
    	var gridDataNode = Ext.ComponentQuery.query('monitoringPanel #gridDataNode')[0]; // 그리드뷰
    	
    	var columns = [];
		columns.push({ text : MSG.COMMON_NAME, dataIndex : 'name', flex:1});
		columns.push({ text : MSG.COMMON_IP, dataIndex : 'ip', flex:1});
    	
		var nodeDatas = [];
		if(obj !== undefined){
			if(obj.nodes !== undefined){
				me.dataNodeDatas = obj.nodes;
				
				Ext.each(obj.nodes, function(node){
					nodeDatas.push({ 'name':node.name,'ip':node.ip }); 
				});
			}
		}
		
		var store = new Ext.data.ArrayStore({
    		fields:['name', 'ip']
        });
		store.loadData(nodeDatas);
        
		gridDataNode.reconfigure(store, columns);
		
		// 이미 선택된 데이터노드 정보 초기화 또는 갱신
		if(type === 0 || type === 2){
			// 초기화
			var d3DataNodeCPU = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeCPU')[0]; // DataNode CPU 그래프
			var d3DataNodeMemory = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeMemory')[0]; // DataNode 메모리 그래프
	    	var d3DataNodeDisk = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeDisk')[0]; // DataNode 디스크 그래프
	    	var d3DataNodeCapacity = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeCapacity')[0]; // DataNode 용량 그래프
	    	
	    	d3DataNodeCPU.clear();
	    	d3DataNodeMemory.clear();
	    	d3DataNodeDisk.clear();
	    	d3DataNodeCapacity.clear();
		}else{
			// 갱신
			if(nodeDatas.length > 0){
				me.setDataNodeInfo(me.dataNodeIndex, 1);
			}
		}
    }
    
    /**
     * DataNode 정보를 표시한다.(목록, CPU, 메모리, 디스크, 노드용량)
     * param type 상태(0:처음,1:업데이트)
     */
    , setDataNodeInfo:function(selectIndex, type){
//    	console.log("setDataNodeInfo");
    	var me = this;
    	
    	if(selectIndex === -1){ // 선택된 노드 정보가 없으면 리턴
    		return;
    	}
    	
    	var gridDataNode = Ext.ComponentQuery.query('monitoringPanel #gridDataNode')[0]; // 그리드뷰
    	var dataNodeDatas = me.dataNodeDatas;
    	// DataNode 목록에서 선택된 위치정보 가져오기
//    	var selectedRecord = gridDataNode.getSelectionModel().getSelection()[0];
//    	var selectIndex = gridDataNode.store.indexOf(selectedRecord);
    	
    	if(selectIndex < dataNodeDatas.length){
    	}else{
    		selectIndex = 0;
    	}
    	gridDataNode.getSelectionModel().select(selectIndex);
    	
    	var obj = dataNodeDatas[selectIndex];
    	
    	var d3DataNodeCPU = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeCPU')[0]; // DataNode CPU 그래프
    	var d3DataNodeMemory = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeMemory')[0]; // DataNode 메모리 그래프
    	var d3DataNodeDisk = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeDisk')[0]; // DataNode 디스크 그래프
    	var d3DataNodeCapacity = Ext.ComponentQuery.query('monitoringPanel #d3DataNodeCapacity')[0]; // DataNode 용량 그래프
    	
    	if(type === 0){ // 처음선택시 초기화 후 진행
    		d3DataNodeCPU.clear();
	    	d3DataNodeMemory.clear();
	    	d3DataNodeDisk.clear();
	    	d3DataNodeCapacity.clear();
    	}
    	
		if(obj !== undefined){
			// CPU 설정
			if(obj.cpuload !== 0){
				var cpuData = [{cpu:(obj.cpuload*100)}];
				if(type === 0){ // 처음
					d3DataNodeCPU.setData(cpuData);
				}else{ // 업데이트
					d3DataNodeCPU.addData(cpuData);
				}
			}
    		
			// 메모리 표시
    		var usedMemory = obj.totalmemory - obj.freememory; // 사용중 메모리 구하기
			var freeMemoryPercent = Math.floor(((obj.freememory/obj.totalmemory)*100)); // 남은 용량 %
			var usedMemoryPercent = 100-freeMemoryPercent; // 사용 용량 %
			
    		var memoryData = [];
    		memoryData.push({label:MSG.HDFS_USAGE + " " + me.getCapacityText(usedMemory) + "   ", value:usedMemoryPercent}); // 사용중 메모리
    		memoryData.push({label:MSG.MONITORING_REMAINING_SIZE + " " + me.getCapacityText(obj.freememory), value:freeMemoryPercent}); // 남은 메모리
    		if(obj.totalmemory !== 0){
    			d3DataNodeMemory.setData(memoryData);
    		}
			
    		// 디스크 용량 표시
			var freeDisk = 0; // 남은 용량
			var usedDisk = 0; // 사용중 용량
			var totalDisk = 0; // 전체용량
			Ext.each(obj.disks, function(disk){
				totalDisk = totalDisk + disk.size;
    			freeDisk = freeDisk + disk.free;
    			usedDisk = usedDisk + disk.size - disk.free; 
    		});
			var freeDiskPercent = Math.floor(((freeDisk/totalDisk)*100)); // 남은 용량 %
			var usedDiskPercent = 100-freeDiskPercent; // 사용 용량 %
			
			var diskData = [];
			diskData.push({label:MSG.HDFS_USAGE + " " + me.getCapacityText(usedDisk) + "   ", value:usedDiskPercent}); // 사용량
			diskData.push({label:MSG.MONITORING_REMAINING_SIZE + " " + me.getCapacityText(freeDisk), value:freeDiskPercent}); // 남은용량
			if(totalDisk !== 0){
				d3DataNodeDisk.setData(diskData);
			}
			
			// 노드 용량 표시
    		var freeCapacity = obj.capacity - obj.used; // 노드 남은용량
    		var freeCapacityPercent = Math.floor(((freeCapacity/obj.capacity)*100)); // 남은 용량 %
    		var usedCapacityPercent = 100-freeCapacityPercent; // 사용 용량 % 
    		var capacityData = [];
    		capacityData.push({label:MSG.HDFS_USAGE + " " + me.getCapacityText(obj.used) + "   ", value:usedCapacityPercent}); // 사용량
    		capacityData.push({label:MSG.MONITORING_REMAINING_SIZE + " " + me.getCapacityText(freeCapacity), value:freeCapacityPercent}); // 남은용량
    		if(obj.capacity !== 0){
    			d3DataNodeCapacity.setData(capacityData);
    		}
		}
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
    	var win = Ext.ComponentQuery.query('#monitoring-win')[0];
    	if(win !== undefined){
    		win.setLoading(true);
    	}
    }
    
    /**
     * 로딩 팝업 종료
     */
    , closeLoading:function(){
    	var win = Ext.ComponentQuery.query('#monitoring-win')[0];
    	if(win !== undefined){
    		win.setLoading(false);
    	}
    }
    
    /**
     * 용량 단위에 맞는 텍스트 리턴한다.
     * data byte
     */
    , getCapacityText:function(data){
    	var text = undefined;
    	
    	if(data !== undefined){
    		if((data/1024/1024/1024/1024) >= 1){ // 테라바이트
    			text = (data/1024/1024/1024/1024).toFixed(2) + " TB";
    		}
    		else if(data/1024/1024/1024 >= 1){ // 기가바이트
    			text = (data/1024/1024/1024).toFixed(2) + " GB";
    		}
    		else if(data/1024/1024 >= 1){ // 메가바이트
    			text = (data/1024/1024).toFixed(2) + " MB";
    		}else if(data/1024 >= 1){ // 키로바이트
    			text = (data/1024/1024).toFixed(2) + " KB";
    		}else if(data >= 1){ // 바이트
    			text = (data/1024).toFixed(2) + " B";
    		}else{ // 비트
    			text = data.toFixed(2) + " Bit";
    		}
    	}
    	
    	return text;
    }
    
    /**
     * 자동 새로고침을 위한 타이머를 시작한다.
     */
    , startTimerRequest:function(){
    	var comboInterval = Ext.ComponentQuery.query('monitoringPanel #comboInterval')[0]; // 새로고침 딜레이
    	var interval = comboInterval.getValue(); // 딜레이 시간
    	var me = this;
    	var run = function(){
//			console.log("startTimerRequest:run");
			
			var win = Ext.ComponentQuery.query('#monitoring-win')[0];
			if(win !== undefined){
				me.requestHadoopStatus(1);
			}
		};
    	
		timerId = setTimeout(run, interval); // Timer
		me.timerId = timerId;
    }
    
    /**
     * 자동 새로고침을 종료한다.
     */
    , stopTimerRequest:function(){
//    	console.log("stopTimerRequest");
    	var me = this;
    	clearTimeout(me.timerId);
    }
});