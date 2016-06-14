Ext.define('Flamingo.view.tajo.TajoMetaManagerPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tajoMetaManagerPanel',

    layout: 'fit',

    requires: [
        'Flamingo.view.tajo.TajoMetaDirectoryPanel',
        'Flamingo.view.tajo.TajoMetaFilePanel',
        'Flamingo.view.designer.property._TajoDelimiterSelCmbField'
    ],

    border: true,

    controllers: ['Flamingo.controller.tajo.TajoMetaManagerController'],

    initComponent: function () {
    	this.items = {
			layout : 'hbox',
			border: false,
			items: [
		        {
        			layout : 'vbox',
        			width: 350,
        			items: [
        		        {
                            split: true,
                            title: MSG.HDFS_FILESYSTEM,
                            width: 350,
                            height: 400,
                            layout: 'fit',
                            border: false,
                            items: [
                                {
                                    split: true,
                                    autoScroll: true,
                                    xtype: 'tajoMetaDirectoryPanel'
                                }
                            ]
        		        },
        		        {
        		        	width: 350,
        		        	height: 240,
                            title: MSG.HDFS_FILE,
                            layout: 'fit',
                            items: [
                                {
                                    split: true,
                                    xtype: 'tajoMetaFilePanel'
                                }
                            ]
        		        },
        	        ]
		        },
		        {
		        	layout : 'vbox',
		        	width: 900,
        			items: [
        		        {
        		        	title: MSG.TAJO_META,
        		        	width: 900,
        		        	height: 190,
        		        	items:[
    		        	       {
    		        	    	   layout : 'hbox',
    		        	    	   border: false,
    		        	    	   height: 30,
    		        	    	   margin: '10 0 0 10',
    		        	    	   items: [
		        	    	           {
		        	    	        	   // 타조 포트 설정
		        	    	        	   xtype: 'textfield',
		        	    	        	   itemId: 'textfPort',
		        	    	        	   fieldLabel: MSG.TAJO_PORT,
		        	    	        	   value: '26002' // 디폴트 포트 26002
		        	    	           },
		        	    	           {
		        	    	        	   // 전체 라인 수
		        	    	        	   xtype: 'textfield',
		        	    	        	   itemId: 'textfMaxLine',
		        	    	        	   labelWidth:65,
		        	    	        	   width: 150,
		        	    	        	   margin: '0 10 0 10',
		        	    	        	   fieldLabel: MSG.TAJO_MAX_LINE,
		        	    	        	   value: '100' // 디폴트 1000 라인
		        	    	           },
		        	    	           {
		        	    	        	   // 프리뷰 조회
		        	    	        	   xtype: 'button',
		        	    	        	   itemId: 'btnPreview',
		        	    	        	   width: 190,
		        	    	        	   margin: '0 10 0 10',
		        	    	        	   text : MSG.TAJO_PREVIEW_FILE_FORM_HDFS,
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
		    		        	    	   fieldLabel: MSG.TAJO_DATABASE,
		    		        	    	   displayField: 'name',
		    		        	    	   valueField: 'name'
		        	    	           },
		        	    	           {
		        	    	        	   // 데이터베이스 삭제
		        	    	        	   xtype: 'button',
		        	    	        	   itemId: 'btnDBDel',
		        	    	        	   margin: '0 10 0 10',
		        	    	               text : MSG.TAJO_DELETE,
		        	    	           },
		        	    	           {
		        	    	        	   // 생성할 데이터베이스명 
		        	    	        	   xtype: 'textfield',
		    		        	           itemId: 'textfDBName',
		    		        	           fieldLabel: MSG.TAJO_DATABASE_NAME
		        	    	           },
		        	    	           {
		        	    	        	   // 데이터베이스 생성
		        	    	        	   xtype: 'button',
		        	    	        	   itemId: 'btnDBCreate',
		        	    	        	   margin: '0 10 0 10',
		        	    	               text : MSG.TAJO_CREATE,
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
		        	    	        	   xtype:'combo',
		    		        	    	   itemId: 'comboTableDel',
		    		        	    	   editable: false,
		    		        	    	   typeAhead: true,
		    		        	    	   selectOnFocus: true,
		    		        	    	   fieldLabel:MSG.TAJO_TABLE,
		    		        	    	   displayField: 'name',
		    		        	    	   valueField: 'name'
		        	    	           },
		        	    	           {
		        	    	        	   // 테이블 삭제
		        	    	        	   xtype: 'button',
		        	    	        	   itemId: 'btnTableDel',
		        	    	        	   margin: '0 10 0 10',
		        	    	               text : MSG.TAJO_DELETE,
		        	    	           }
//		        	    	           {
//		        	    	        	   // 생성할 테이블명 
//		        	    	        	   xtype: 'textfield',
//		    		        	           itemId: 'textfTable',
//		    		        	           fieldLabel: MSG.TAJO_TABLE_NAME
//		        	    	           },
	        	    	           ]
    		        	       },
    		        	       {
    		        	    	   layout : 'hbox',
    		        	    	   border: false,
    		        	    	   height: 30,
    		        	    	   margin: '0 0 0 10',
    		        	    	   items: [
		        	    	           {
		        	    	        	   // 필드구분자 선택
		        	    	        	   itemId: 'comboDelimiter',
		                                   xtype: '_tajoDelimiterSelCmbField'
		        	    	           },
		        	    	           {
		        	    	        	   // 첫라인 컬럼 식별자 체크
		        	    	        	   xtype: 'fieldcontainer',
		        	    	        	   margin: '0 10 0 10',
		        	    	        	   labelWidth:150,
		    		        	    	   fieldLabel : MSG.TAJO_FIRST_LINE_IDENTIFIER,
		    		        	    	   defaultType: 'checkboxfield',
		    		        	    	   items: [
		    		        	    	           {
		    		        	    	        	   boxLabel  : '',
		    		        	    	        	   name      : 'firstLineIdentifier',
		    		        	    	        	   inputValue: '1',
		    		        	    	        	   id        : 'checkIdentifier'
		    		        	    	           }
		    		        	            ]
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
											// 테이블 생성
											xtype: 'button',
											itemId: 'btnTableCreate',
											width: 860,				
										    text : MSG.TAJO_TABLE_CREATE
										}
	        	    	           ]
    		        	       }
        		        	],
        		        },
        		        {
        		        	xtype: 'grid',
        		        	itemId: 'gridPreview',
        		        	title: MSG.TAJO_PREVIEW,
        		        	width: 900,
        		        	height: 450,
        		        	columns: [],
        		        	autoScroll: true
        		        },
        	        ]
		        },
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