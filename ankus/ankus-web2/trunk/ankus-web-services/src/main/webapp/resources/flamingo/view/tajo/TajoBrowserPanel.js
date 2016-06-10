Ext.define('Flamingo.view.tajo.TajoBrowserPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tajoBrowserPanel',

    layout: 'fit',

    requires: [
           'Flamingo.view.component._WorkflowEngineCombo'
    ],

    border: true,

    controllers: ['Flamingo.controller.tajo.TajoBrowserController'],

    initComponent: function () {
    	this.items = {
        	layout : 'vbox',
        	width: 900,
			items: [
		        {
		        	width: 900,
		        	height: 210,
		        	items:[
	        	       {
	        	    	   layout : 'hbox',
	        	    	   border: false,
	        	    	   height: 30,
	        	    	   margin: '10 0 0 10',
	        	    	   items: [
								{
								    xtype: 'displayfield',
								    labelWidth: 100,
								    fieldLabel: MSG.HDFS_CLUSTER
								},
			 	        	   	{
									xtype : '_workflowEngineCombo',
									type : 'HADOOP',
									width : 155,
									scope : this
								},
								{
	    	    	        	   // 타조 포트 설정
	    	    	        	   xtype: 'textfield',
	    	    	        	   itemId: 'textfPort',
	    	    	        	   margin: '0 10 0 10',
	    	    	        	   labelWidth:60,
	    	    	        	   fieldLabel: MSG.TAJO_PORT,
	    	    	        	   value: '26002' // 디폴트 포트 26002
								}
    	    	           ]
	        	       },
	        	       {
	        	    	   layout : 'hbox',
	        	    	   border: false,
	        	    	   height: 30,
	        	    	   margin: '0 0 0 10',
	        	    	   items: [
        	    	           {
        	    	        	   // 데이터베이스 선택
        	    	        	   xtype:'combo',
    		        	    	   itemId: 'comboDBSelect',
    		        	    	   scope: this,
    		        	    	   editable: false,
    		        	    	   typeAhead: true,
    		        	    	   selectOnFocus: true,
    		        	    	   labelWidth:100,
    		        	    	   width : 260,
    		        	    	   fieldLabel:MSG.TAJO_DATABASE,
    		        	    	   displayField: 'name',
    		        	    	   valueField: 'name'
        	    	           },
        	    	           {
        	    	        	   xtype:'combo',
    		        	    	   itemId: 'comboTableSelect',
    		        	    	   editable: false,
    		        	    	   typeAhead: true,
    		        	    	   selectOnFocus: true,
    		        	    	   labelWidth:60,
    		        	    	   fieldLabel:MSG.TAJO_TABLE,
    		        	    	   displayField: 'name',
    		        	    	   valueField: 'name',
    		        	    	   margin: '0 10 0 10'
        	    	           },
        	    	           {
        	    	        	   // 전체 라인 수
        	    	        	   xtype: 'textfield',
        	    	        	   itemId: 'textfMaxLine',
        	    	        	   labelWidth:60,
        	    	        	   width: 150,
        	    	        	   margin: '0 10 0 10',
        	    	        	   fieldLabel: MSG.TAJO_MAX_LINE,
        	    	        	   value: '100' // 디폴트 1000 라인
        	    	        		,enableKeyEvents: true
        	    	            },
								{
	    	    	        	   // 타조 쿼리 실행
	    	    	        	   xtype: 'button',
	    	    	        	   itemId: 'btnQuery',
	    	    	        	   margin: '0 10 0 10',
	    	    	        	   width : 150,
	    	    	               text : MSG.TAJO_QUERY_RUN,
								}
    	    	           ]
	        	       },
	        	       {
	        	    	   layout : 'hbox',
	        	    	   border: false,
	        	    	   height: 120,
	        	    	   margin: '0 0 0 10',
	        	    	   items: [
        	    	           {
	    	    	        	   // 입력 쿼리문
	    	    	        	   xtype: 'textareafield',
	    	    	        	   itemId: 'textafQuery',
	    	    	        	   labelWidth:100,
	    	    	        	   width : 820,
	    	    	        	   height : 120,
	    	    	        	   fieldLabel: MSG.TAJO_QUERY
								}
    	    	           ]
	        	       }
		        	],
		        },
		        {
		        	xtype: 'grid',
		        	itemId: 'gridPreview',
		        	title: MSG.TAJO_DATA,
		        	width: 900,
		        	height: 330,
		        	columns: []
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
                controller.init(); // Run init on the controller
            }
        }, this);
    }
});