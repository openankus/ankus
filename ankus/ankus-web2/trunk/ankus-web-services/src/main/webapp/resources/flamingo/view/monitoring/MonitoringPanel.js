Ext.define('Flamingo.view.monitoring.MonitoringPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.monitoringPanel',

    layout: 'fit',

    requires: [
           'Flamingo.view.component._WorkflowEngineCombo',
           'Flamingo.view.monitoring.D3MemoryPanel',
           'Flamingo.view.monitoring.D3CPUPanel'
    ],

    border: true,

    controllers: ['Flamingo.controller.monitoring.MonitoringController'],

    initComponent: function () {
    	this.items = {
        	layout : 'vbox',
        	width: 1040,
			items: [
		        {
		        	// 하둡선택 및 Web
		        	layout : 'hbox',
		        	width: 1000,
	     	    	height: 440,
		        	items:[
	        	       {
	        	    	   // 하둡선택 & 하둡정보
	        	    	    layout : 'vbox',
		   		        	width: 280,
		   	     	    	height: 440,
		   		        	items:[
		        	    	    {
		    	    	       	   // 새로고침 간격
		        	    	       layout : 'vbox',
			        	    	   border: false,
			        	    	   width: 280,
			        	    	   flex: 100,
			        	    	   title:MSG.MONITORING_SERVER,
			        	    	   items: [
										{
											//하둡선택
											layout : 'hbox',
											border: false,
											width: 280,
											items: [
													{
													    xtype: 'displayfield',
													    margin: '10 0 0 10',
													    labelWidth: 100,
													    fieldLabel: MSG.HDFS_CLUSTER
													},
												   	{
														xtype : '_workflowEngineCombo',
														margin: '10 0 0 0',
														type : 'HADOOP',
														width : 125,
														scope : this
												   	},
											        {
											            iconCls: 'common-refresh',
											            itemId: 'refreshButton',
											            margin: '10 0 10 10',
											            xtype: 'button'
											        }
											]
										},
										{
											// 새로고침 간격
											xtype:'combo',
									        fieldLabel:MSG.MONITORING_REFRESH_INTERVAL,
									        margin: '0 0 0 10',
									        itemId: 'comboInterval',
									        queryMode:'local',
									        store:{
												fields: ['interval', 'text'],
												data : [
												    {interval:5000,text:'5'+ MSG.MONITORING_SECOND}, // 5초
												    {interval:30000,text:'30' + MSG.MONITORING_SECOND}, // 30초
												    {interval:60000,text:'1' + MSG.MONITORING_MINUTE}, // 1분
												    {interval:60000,text:'5' + MSG.MONITORING_MINUTE}, // 5분
												    {interval:120000,text:'10' + MSG.MONITORING_MINUTE} // 10분
											    ]
									        },
									        editable: false,
									        displayField:'text',
									        valueField: 'interval',
									        labelWidth: 100,
									        autoSelect:true,
									        forceSelection:true
										}
		    	    	           ],
		        	    	    },
		        	    	    {
		        	    	    	// 하둡정보
		        	    	    	layout : 'vbox',
				   		        	width: 280,
				   		        	flex: 360,
				   	     	    	title:MSG.MONITORING_HADOOP,
				   		        	items:[
			   		        	       {
			   		        	    	   xtype: 'grid',
			   		        	    	   itemId: 'gridHadoopInfo',
			   		        	    	   border: false,
			   		        	    	   width:280,
			   		        	    	   height:130,
			   		        	    	   hideHeaders: true, // 헤더 미표시
			   		        	    	   columns: []
			   		        	       },
			   		        	       {
			   		        	    	   // 하둡 용량
				   		        	       xtype: 'd3MemoryPanel',
			   				        	   itemId: 'd3HadoopCapacity',
			   				        	   border: false,
			   				        	   width: 280,
				   				           height: 205,
				   				           localData : []
			   		        	       }
				           	        ]      
		        	    	    },
		           	        ]
	        	       },
	        	       {
		        	        // Web & MasterNode
	       	    	    	layout : 'vbox',
		   		        	width: 720,
		   	     	    	height: 440,
		   		        	items:[
   		        	        {
	   		        	    	   // Web
		   		        	    	layout : 'hbox',
				   		        	width: 720,
				   		        	flex: 1,
				   	     	    	title:MSG.MONITORING_SERVER_INFO,
				   		        	items:[
			   		        	       {
			   		        	    	    // CPU
			   		        	       		xtype: 'd3CPUPanel',
			   			        			itemId: 'd3WebCPU',
			   			        			height: 195,
			   			        			flex: 1,
			   			        			title:MSG.MONITORING_CPU,
			   			        			localData : []
			   		        	       },
			   		        	       {
	   		        	   				   // Memory
				   		        	       xtype: 'd3MemoryPanel',
			   				        	   itemId: 'd3WebMemory',
			   				        	   height: 195,
				   				           flex: 1,
				   				           title:MSG.MONITORING_MEMORY,
				   				           localData : []
			   		        	       },
			   		        	       {
			   		        	    	   // disks
			   		        	    	   xtype: 'd3MemoryPanel',
			   				        	   itemId: 'd3WebDisk',
			   				        	   height: 195,
				   				           flex: 1,
				   				           title:MSG.MONITORING_DISK,
				   				           localData : []
			   		        	       }
		   		        	        ]
	   		        	       },
	   		        	       {
	   		        	    	   // MasterNode
		   		        	    	layout : 'hbox',
				   		        	width: 720,
				   		        	flex: 1,
				   	     	    	title:MSG.MONITORING_MASTER_NODE,
				   		        	items:[
			   		        	       {
			   		        	    	    // CPU
					   		        	    xtype: 'd3CPUPanel',
			   			        			itemId: 'd3MasterCPU',
			   			        			height: 195,
			   			        			flex: 1,
			   			        			title:MSG.MONITORING_CPU,
			   			        			localData : [],
			   		        	       },
			   		        	       {
	   		        	   				   // Memory
				   		        	       xtype: 'd3MemoryPanel',
			   				        	   itemId: 'd3MasterMemory',
			   				        	   height: 195,
				   				           flex: 1,
				   				           title:MSG.MONITORING_MEMORY,
				   				           localData : []
			   		        	       },
			   		        	       {
			   		        	    	   // disks
			   		        	    	   xtype: 'd3MemoryPanel',
			   				        	   itemId: 'd3MasterDisk',
			   				        	   height: 195,
				   				           flex: 1,
				   				           title:MSG.MONITORING_DISK,
				   				           localData : []
			   		        	       }
		   		        	        ]
	   		        	       }
	   		        	    ]
	        	       }
        	        ]
		        },
		        {
		        	// DataNode
		        	layout : 'hbox',
		        	width: 1000,
		        	height: 200,
		        	title:MSG.MONITORING_DATA_NODE,
//		        	style : 'text-align:center',
		        	items:[
	        	       {
	        	    	   //데이터노드 목록
	        	       	   xtype: 'grid',
	        	    	   itemId: 'gridDataNode',
	        	    	   width: 280,
	        	    	   height: 175,
	        	    	   title:MSG.MONITORING_LIST,
	        	    	   columns: []
	        	       },
	        	       {
	        	    	   //CPU
	        	       	   xtype: 'd3CPUPanel',
		        		   itemId: 'd3DataNodeCPU',
		        		   height: 175,
		        		   flex: 1,
		        		   title:MSG.MONITORING_CPU,
		        		   localData : [],
	        	       },
	        	       {
	        	    	// Memory
   		        	       xtype: 'd3MemoryPanel',
			        	   itemId: 'd3DataNodeMemory',
			        	   height: 175,
   				           flex: 1,
   				           title:MSG.MONITORING_MEMORY,
   				           localData : []
	        	       },
	        	       {
	        	    	   // disks
	        	    	   xtype: 'd3MemoryPanel',
			        	   itemId: 'd3DataNodeDisk',
			        	   height: 175,
   				           flex: 1,
   				           title:MSG.MONITORING_DISK,
   				           localData : []
	        	       },
	        	       {
	        	    	   //노드용량
	        	    	   xtype: 'd3MemoryPanel',
			        	   itemId: 'd3DataNodeCapacity',
			        	   height: 175,
   				           flex: 1,
   				           title:MSG.MONITORING_NODE,
   				           localData : []
	        	       }
        	        ]      
     	       }
	        ],
    		bbar: {
    			xtype: '_statusBar'
        	}
    	}
    	
        this.callParent(arguments);
        this.on('afterrender', this.registControllers, this);
    },

    registControllers: function () {
        Ext.each(this.controllers, function (control) {
            var controller = Flamingo.app.controllers.get(control);
            if (!controller) {
                controller = Ext.create(control, {
                    application: Flamingo.app,
                    id: control
                });
                Flamingo.app.controllers.put(control, controller);
            }
            controller.init(); // Run init on the controller
        }, this);
    }
});