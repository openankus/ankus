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
Ext.ns('Flamingo.view.designer.property.ankus');
Ext.define('Flamingo.view.designer.property.ankus.ALG_ANKUS_kNN', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_ANKUS_kNN',
    requires: [
        'Flamingo.view.designer.property._ConfigurationBrowserField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._ColumnGrid',
        'Flamingo.view.designer.property._DependencyGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._KeyValueGrid',
        'Flamingo.view.designer.property._EnvironmentGrid',
        'Flamingo.model.designer.Preview'
    ],
    //overflowY: 'scroll',
    width: 520,
    height: 580,
    autoScroll : true,

    items: [
        {
            title: MSG.DESIGNER_TITLE_PARAMETER,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 170
            },
        
            layout: {
                type: 'vbox',
                align: 'stretch'
            },     
            items: [
                // Ankus MapReduce가 동작하는데 필요한 입력 경로를 지정한다.  이 경로는 N개 지정가능하다.     
                //layout 변경 start
                 {
                  xtype: 'fieldset',
                  height: 200,
                  title: 'File Path',
                  layout: 'anchor',
                  defaults: {
                      anchor: '100%',
                      labelWidth: 200,
                      hideEmptyLabel: false
                  }, 
                  items:[
			                {
			                    xtype: '_inputGrid',
			                    title: MSG.DESIGNER_TITLE_INPUT_PATH,
			                    height: 115
			                },                
			                {
			            	    forceFit: true,
			            	    columnLines: true,                	    
			            	    title: MSG.DESIGNER_TITLE_OUTPUT_PATH,            	    
			            	    defaults: {
			                        hideLabel: true,                              
			                    //    margin: "2 0 0 0"  // Same as CSS ordering (top, right, bottom, left)
			                    },
			                    layout: 'hbox',
			                    items: [
			                        {
			                            xtype: '_browserField',
			                            name: 'output',
			                            allowBlank: false,
			                            readOnly: false,
			                            flex: 1
			                        }
			                    ]
			                }
			                ]
                  },
                  //end
                  //start
                 {
                   xtype: 'fieldset',
                   height: 540,
                   title: 'Parameter Option',
                   layout: 'anchor',
                   defaults: {
                       anchor: '100%',
                       labelWidth: 200,
                       hideEmptyLabel: false
                 }, 
                items:[                             
		                {
		                    xtype: 'fieldcontainer',
		                    fieldLabel: MSG.DESIGNER_COL_DELIMITER,
		                    tooltip: MSG.DESIGNER_MSG_COL_DELIMITER,
		                    layout: 'hbox',
		                    items: [
		                        {
		                            xtype: 'fieldcontainer',
		                            layout: 'hbox',
		                            items: [
		                                {
		                                    xtype: 'combo',
		                                    name: 'delimiter',                                   
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
		                                    id: 'delimiterValue',
		                                    vtype: 'exceptcommaspace',
		                                    flex: 1,
		                                    disabled: true,
		                                    readOnly: this.readOnly,
		                                    allowBlank: false,
		                                    value: '\\t'
		                                }
		                            ]
		                        }
		                    ]
		                },
		                {
		                    xtype: 'button',                    
		                    text: 'Preview file from HDFS',  
		//                    iconCls: 'common-confirm',
		                    handler: function (grid, rowIndex, colIndex) {
		
		                        // Parameter form
		                        var canvas = Ext.ComponentQuery.query('form')[1];
		                        var form = canvas.getForm();
		
		                        // Preview grid
		                        var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
		
		                        // Input paths grid
		                        var inputGrid = Ext.ComponentQuery.query('_inputGrid')[0];
		                        var selectedInputPath = inputGrid.getView().getSelectionModel().getSelection();
		                        
		                        if (selectedInputPath[0] == undefined) {                        	
		                        	msg('Add File and Dirctory', 'Please input File Path or Dirctory Path.');
		                        	return;
		                        }                    
		                        
		                        var inputPath = selectedInputPath[0].data.input;                        
		                        
		                        var delimiter = Ext.getCmp('delimiterValue').getValue();
		                        
		                        if(delimiter == undefined){
		                        	delimiter = '\\t';
		                        }                        
		                       
		                        // Get _inputGrid values
		                        var inputGridCanvas = Ext.ComponentQuery.query('canvas')[0];
		                        var inputGridForm = inputGridCanvas.getForm();
		                        var engineId = inputGridForm.getValues()['engine_id'];
		
		                        var store = Ext.create('Ext.data.Store', {
		                            fields: [
		                                {name: 'columnIndex'},
		                                {name: 'rowData'}
		                            ],
		                            autoLoad: true,
		                            proxy: {
		                                type: 'ajax',
		                                url: CONSTANTS.CONTEXT_PATH + CONSTANTS.DESIGNER.LOAD_HDFS_FILE,
		                                headers: {
		                                    'Accept': 'application/json'
		                                },
		                                reader: {
		                                    type: 'json',
		                                    root: 'list'
		                                },
		                                extraParams: {
		                                    'inputPath': inputPath,
		                                    'delimiter': delimiter,
		                                    'engineId': engineId
		                                }
		                            }
		                        });
		
		                        // Set grid row to preview file from hdfs
		                        var rec;
		                        var columnIndexList;
		                        var rowDataList;
		                        
		                        store.on('load', function (store, records) {
		                        	
		                            for (var i = 0; i < records.length; i++) {
		                            	console.info("record.length : " + records.length);
		                                columnIndexList = records[i].get('columnIndex');
		                                rowDataList = records[i].get('rowData');
		
		                                for (var k = 0; k < columnIndexList.length; k++) {
		                                    rec = new Flamingo.model.designer.Preview({
		                                        rIndex: columnIndexList[k],
		                                        rData: rowDataList[k]
		                                    });
		
		                                    store.insert(0, rec);
		                                    //Remove get list from ajax
		                                    store.remove(records);
		                                    previewGrid.store.sort('rIndex', 'ASC');
		                                }
		                            }
		                        });
		                        
		                        Ext.suspendLayouts();
		                        previewGrid.reconfigure(store, [
		                            {
		                                text: 'Index',
		                                dataIndex: 'rIndex',
		                                id: 'rIndex',
		                                width: 80
		                            },
		                            {
		                                text: 'Value',
		                                dataIndex: 'rData',                                
		                                flex: 1
		                            },
		                            {
		                                xtype: 'checkcolumn',
		                                width: 55,
		                                header: 'Target',
		                                dataIndex: 'targetCheckIndex',
		                                listeners: {
		                                    checkchange: function (column, recordIndex, checked) {
		                                        var record = previewGrid.getStore().getAt(recordIndex);
		                                        var dataIndex = this.dataIndex;
		                                        checked = !record.get(dataIndex);
		                                        
		                                        var str_nominal = record.get('nominalCheckIndex');
		                                        var str_exception = record.get('exceptionCheckIndex');			                                        
		                                        var str_class = record.get('classCheckIndex');
		                                        
		                                        if(str_nominal==true){
		                                        	 record.set('nominalCheckIndex', checked);	
		                                        }else if(str_exception==true){                                       	 	
		                                       	 	record.set('exceptionCheckIndex', checked);	
		                                        }else if(str_class==true){                                       	 	
		                                       	 	record.set('classCheckIndex', checked);	
		                                        }	
		                                    }
		                                }
		                            },
		                            {
		                                xtype: 'checkcolumn',
		                                width: 65,
		                                header: 'Nominal',
		                                dataIndex: 'nominalCheckIndex',
		                                listeners: {
		                                    checkchange: function (column, recordIndex, checked) {
		
		                                        var rowCount = previewGrid.getStore().data.length;
		                                        var record = previewGrid.getStore().getAt(recordIndex);
		                                        var dataIndex = this.dataIndex;
		                                        checked = !record.get(dataIndex);
		                                        
		                                        var str_target = record.get('targetCheckIndex');
		                                        var str_exception = record.get('exceptionCheckIndex');			                                        
		                                        var str_class = record.get('classCheckIndex');
		                                        
		                                        if(str_target==true){
		                                        	 record.set('targetCheckIndex', checked);	
		                                        }else if(str_exception==true){                                       	 	
		                                       	 	record.set('exceptionCheckIndex', checked);	
		                                        }else if(str_class==true){                                       	 	
		                                       	 	record.set('classCheckIndex', checked);	
		                                        }	
		                                    }
		                                }
		                            },
		                            {
		                                xtype: 'checkcolumn',
		                                width: 65,
		                                header: 'Exception',
		                                dataIndex: 'exceptionCheckIndex',
		                                listeners: {
		                                    checkchange: function (column, recordIndex, checked) {
		                                        var record = previewGrid.getStore().getAt(recordIndex);
		                                        var dataIndex = this.dataIndex;
		                                        checked = !record.get(dataIndex);
		
		                                        var str_target = record.get('targetCheckIndex');
		                                        var str_nominal = record.get('nominalCheckIndex');			                                        
		                                        var str_class = record.get('classCheckIndex');
		                                        
		                                        if(str_target==true){
		                                        	 record.set('targetCheckIndex', checked);	
		                                        }else if(str_nominal==true){                                       	 	
		                                       	 	record.set('nominalCheckIndex', checked);	
		                                        }else if(str_class==true){                                       	 	
		                                       	 	record.set('classCheckIndex', checked);	
		                                        }
		                                    }
		                                }
		                            },
		                            {
		                                xtype: 'checkcolumn',
		                                width: 65,
		                                header: 'Class',
		                                dataIndex: 'classCheckIndex',
		                                listeners: {
		                                    checkchange: function (column, recordIndex, checked) {
		
		                                        var rowCount = previewGrid.getStore().data.length;
		                                        var record = previewGrid.getStore().getAt(recordIndex);
		                                        var dataIndex = this.dataIndex;
		                                        checked = !record.get(dataIndex);
		
		                                     // 하나 체크할 때 나머지는 체크 해지
		                                        for (var i = 0; i < rowCount; i++) {
		                                            if (i != recordIndex) {
		                                                previewGrid.getStore().getAt(i).set(dataIndex, checked=false);
		                                            }
		                                        }
		                                        
		                                        var str_target = record.get('targetCheckIndex');
		                                        var str_nominal = record.get('nominalCheckIndex');			                                        
		                                        var str_exception = record.get('exceptionCheckIndex');
		                                        
		                                        if(str_target==true){
		                                        	 record.set('targetCheckIndex', checked);	
		                                        }else if(str_nominal==true){                                       	 	
		                                       	 	record.set('nominalCheckIndex', checked);	
		                                        }else if(str_exception==true){                                       	 	
		                                       	 	record.set('exceptionCheckIndex', checked);	
		                                        }
		                                    }
		                                }
		                            }
		                        ]);
		                        Ext.resumeLayouts(true);
		                    }
		                },
		                {
		                    margin: '10 0 0 0',
		                    xtype: 'grid',
		                    minHeight: 100,
		                    height: 130,
		                    itemId: 'previewGrid',
		                    multiSelect: true,
		                    columns: [
		                        {
		                            text: 'Index',
		                            width: 80,
		                            dataIndex: 'rIndex',
		                            id: 'rIndex'
		                        },
		                        {
		                            text: 'Value',
		                            flex: 1,
		                            dataIndex: 'rData'
		                        },
		                        {
		                            xtype: 'checkcolumn',
		                            width: 55,
		                            header: 'Target',
		                            dataIndex: 'targetCheckIndex',
		                            editor: {
		                                xtype: 'checkbox',
		                                cls: 'x-grid-checkheader-editor'
		                            }
		                        },
		                        {
		                            xtype: 'checkcolumn',
		                            width: 65,
		                            text: 'Nominal',
		                            dataIndex: 'nominalCheckIndex'                           
		                        },
		                        {
		                            xtype: 'checkcolumn',
		                            width: 65,
		                            text: 'Exception',
		                            dataIndex: 'exceptionCheckIndex'                           
		                        },
		                        {
		                            xtype: 'checkcolumn',
		                            width: 65,
		                            text: 'Class',
		                            dataIndex: 'classCheckIndex'
		                        }
		                    ],
		                    tbar: [
		                        {
		                            text: 'Target All',
		                            iconCls: 'common-confirm',
		                            scope: this,
		                            align: 'right',
		                            handler: function (store) {
		
		                                var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
		                                var range = previewGrid.store.getRange();
		
		                                for (var i = 0; i < range.length; i++) {
		                                    if (range[i] != null) {
		                                        var record = previewGrid.getStore().getAt(i);
		                                        record.set('targetCheckIndex', true);
		                                        record.set('nominalCheckIndex', false);
		                                        record.set('exceptionCheckIndex', false);
		                                        record.set('classCheckIndex', false);
		                                    }
		                                }
		                            }
		                        },
		                        {
		                            text: 'Nominal All',
		                            scope: this,
		                            iconCls: 'common-confirm',
		                            align: 'right',
		                            handler: function (store) {
		                                var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
		                                var range = previewGrid.store.getRange();
		
		                                for (var i = 0; i < range.length; i++) {
		                                    if (range[i] != null) {
		                                        var record = previewGrid.getStore().getAt(i);
		                                        record.set('targetCheckIndex', false);
		                                        record.set('nominalCheckIndex', true);
		                                        record.set('exceptionCheckIndex', false);
		                                        record.set('classCheckIndex', false);                  
		                                                                             
		                                    }
		                                } 
		                            }
		                        },
		                        {
		                            text: 'Exception All',
		                            scope: this,
		                            iconCls: 'common-confirm',
		                            align: 'right',
		                            handler: function (store) {
		                                var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
		                                var range = previewGrid.store.getRange();
		
		                                for (var i = 0; i < range.length; i++) {
		                                    if (range[i] != null) {
		                                        var record = previewGrid.getStore().getAt(i);
		                                        record.set('targetCheckIndex', false);
		                                        record.set('nominalCheckIndex', false);
		                                        record.set('exceptionCheckIndex', true);
		                                        record.set('classCheckIndex', false);       
		                                    }
		                                } 
		                            }
		                        },
		                        {
		                            text: 'Reset',
		                            iconCls: 'common-find-clear',
		                            scope: this,
		                            align: 'right',
		                            handler: function (store) {
		                                var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
		                                var range = previewGrid.store.getRange();
		
		                                for (var i = 0; i < range.length; i++) {
		                                    if (range[i] != null) {
		                                        var record = previewGrid.getStore().getAt(i);
		                                        record.set('targetCheckIndex', false);
		                                        record.set('nominalCheckIndex', false);
		                                        record.set('exceptionCheckIndex', false);
		                                        record.set('classCheckIndex', false); 
		                                    }
		                                }
		                            }
		                        }
		                    ],
		                    viewConfig: {
		                        enableTextSelection: true,
		                        emptyText: 'Click a button to show preview data from HDFS',
		                        deferEmptyText: false
		                    }
		                },
		                {
		                    xtype: 'tbspacer',
		                    height: 10
		                },
		                {
		                    xtype: 'button',
		                    text: 'Select field number',
		                    iconCls: 'common-confirm',
		                    handler: function (store) {
		                        var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
		                        var r = previewGrid.store.getRange();
		
		                        var targetCount = 0;
		                        var nominalCount = 0;
		                        var exceptionCount = 0;
		                        var classCount = 0;
		                        var record;
		
		                        // Count checkbox from grid
		                        for (var i = 0; i < r.length; i++) {
		                            if (r[i] != null) {
		                                record = previewGrid.getStore().getAt(i);
		
		                                if (r[i].data.targetCheckIndex) targetCount++;
		                                if (r[i].data.nominalCheckIndex) nominalCount++;
		                                if (r[i].data.exceptionCheckIndex) exceptionCount++;
		                                if (r[i].data.classCheckIndex) classCount++;
		                            }
		                        }
		
		                        var targetIndexList = [];
		                        var nominalIndexList = [];
		                        var exceptionIndexList = [];
		                        var classIndex = [];
		
		                        // Set checkbox index from gird
		                        for (var i = 0; i < r.length; i++) {
		                            if (r[i] != null) {
		                                record = previewGrid.getStore().getAt(i);
		
		                                // Set target attribute(index) list
		                                if (targetCount != r.length && targetCount != 0) {
		                                    if (r[i].data.targetCheckIndex) {
		                                        targetIndexList.push(r[i].data.rIndex);
		                                        if (targetCount === targetCount - 1) {
		                                            targetIndexList.push(',');
		                                        }
		                                    }
		                                }
		                                
		                                if (nominalCount != r.length && nominalCount != 0) {
		                                    if (r[i].data.nominalCheckIndex) {
		                                    	nominalIndexList.push(r[i].data.rIndex);
		                                        if (nominalCount === nominalCount - 1) {
		                                        	nominalIndexList.push(',');
		                                        }
		                                    }
		                                }
		                                
		                                if (exceptionCount != r.length && exceptionCount != 0) {
		                                    if (r[i].data.exceptionCheckIndex) {
		                                    	exceptionIndexList.push(r[i].data.rIndex);
		                                        if (exceptionCount === exceptionCount - 1) {
		                                        	exceptionIndexList.push(',');
		                                        }
		                                    }
		                                }
		
		                                // Set exception attribute(index) list
		                                if (classCount != r.length && classCount != 0) {
		                                    if (r[i].data.classCheckIndex) {
		                                        classIndex.push(r[i].data.rIndex);
		                                        if (classCount === classCount - 1) {
		                                            classIndex.push(',');
		                                        }
		                                    }
		                                }
		                            }
		                        }
		
		                        // Set textfiled by grid
		                        if (targetCount == r.length) {
		                            Ext.getCmp('indexList').setValue('-1');
		                        } else if (targetCount === 0) {
		                            Ext.getCmp('indexList').setValue('');
		                        } else {
		                            Ext.getCmp('indexList').setValue(targetIndexList);
		                        }
		
		                        if (nominalCount == r.length) {
		                            Ext.getCmp('nominalIndexList').setValue('-1');
		                        } else if (nominalCount === 0) {
		                            Ext.getCmp('nominalIndexList').setValue('');
		                        } else {
		                            Ext.getCmp('nominalIndexList').setValue(nominalIndexList);
		                        }
		                        
		                        if (exceptionCount == r.length) {
		                            Ext.getCmp('exceptionIndexList').setValue('-1');
		                        } else if (exceptionCount === 0) {
		                            Ext.getCmp('exceptionIndexList').setValue('');
		                        } else {
		                            Ext.getCmp('exceptionIndexList').setValue(exceptionIndexList);
		                        }
		                        
		                        if (classCount == r.length) {
		                            Ext.getCmp('classIndex').setValue('-1');
		                        } else if (classCount === 0) {
		                            Ext.getCmp('classIndex').setValue('');
		                        } else {
		                            Ext.getCmp('classIndex').setValue(classIndex);
		                        }
		
		                    }
		                },
              
		                {
		                    xtype: 'fieldset',
		                    height: 290	,
		                    title: 'Select Parameter Option',
		                    layout: 'anchor',
		                    defaults: {
		                        anchor: '100%',
		                        labelWidth: 200,
		                        hideEmptyLabel: false
		                    },
		                    items: [   
								{
								    xtype: 'radiogroup',
								    fieldLabel: 'Supplied Test Set',
								    allowBlank: false,
								    columns: 2,
								    itemId: 'testRadio',
								    items: [
								        {
								            xtype: 'radiofield',
								            boxLabel: 'True(Test Only)',
								            name: 'suppliedTest',
								            checked: false,
								            inputValue: 'true'
								        },
								        {
								            xtype: 'radiofield',
								            boxLabel: 'False',
								            name: 'suppliedTest',
								            checked: true,
								            inputValue: 'false'
								        }
								    ],
								    listeners: {
								    	change: function(field, value){                            		
								    		if(value.suppliedTest == 'true'){						    		
								    			Ext.getCmp('modelPath').enable();
		                            			Ext.getCmp('indexList').disable();			
		                            			Ext.getCmp('nominalIndexList').disable();	
		                            			Ext.getCmp('exceptionIndexList').disable();		
		                            			Ext.getCmp('classIndex').allowBlank=true;		
		                            			Ext.getCmp('k').disable();			
		                            			Ext.getCmp('distanceOption').disable();	
		                            			Ext.getCmp('distanceWeight').disable();		
		                            			Ext.getCmp('isValidation').disable();				
		                            			Ext.getCmp('nominalDistBase').disable();				    			                   			
								    		}else{						    		
								    			Ext.getCmp('modelPath').disable();	
		                            			Ext.getCmp('indexList').enable();	
		                            			Ext.getCmp('nominalIndexList').enable();	
		                            			Ext.getCmp('exceptionIndexList').enable();	
		                            			Ext.getCmp('classIndex').allowBlank=false;
		                            			Ext.getCmp('k').enable();	                                  			
		                            			Ext.getCmp('distanceOption').enable();	
		                            			Ext.getCmp('distanceWeight').enable();		
		                            			Ext.getCmp('isValidation').enable();				
		                            			Ext.getCmp('nominalDistBase').enable();			    		    			
								    		}
								    	}
								    }                            
								}, 
								{
		                        	xtype: '_browserField',
					                name: 'modelPath',
					                id: 'modelPath',
					                hideLabel: true,
					                allowBlank: false,
					                readOnly: false,
					                disabled: true,
					                flex: 1
		                        },
		                        {
		                            xtype: 'textfield',
		                            name: 'indexList',
		                            id: 'indexList',
		                            fieldLabel: 'Target Attributes(Index) List',
		                            vtype: 'commaseperatednum',
		                            allowBlank: false
		                        },
		                        {
		                            xtype: 'textfield',
		                            name: 'nominalIndexList',
		                            id: 'nominalIndexList',
		                            fieldLabel: 'Nominal Attributes(Index) List',
		                            vtype: 'commaseperatednum',
		                            allowBlank: true
		                        },                       
		                        {
		                            xtype: 'textfield',
		                            name: 'exceptionIndexList',
		                            id: 'exceptionIndexList',
		                            fieldLabel: 'Exception Attributes(Index) List',
		                            vtype: 'commaseperatednum',
		                            allowBlank: true
		                        },                      
		                        {
		                            xtype: 'textfield',
		                            name: 'classIndex',
		                            id: 'classIndex',
		                            fieldLabel: 'Class Attribute(Index)',
		                            vtype: 'commaseperatednum',
		                            allowBlank: false
		                        },
		                        {
		                            xtype: 'textfield',
		                            name: 'k',
		                            id: 'k',
		                            fieldLabel: 'K',
		                            vtype: 'numeric',
		                            value: 2,
		                            allowBlank: false
		                        },
		                        {
		                            xtype: 'fieldcontainer',
		                            fieldLabel: 'Distance Option',
		                            id: 'distanceOption',
		                            layout: 'hbox',
		                            items: [
		                                {
		                                    xtype: 'combo',
		                                    name: 'distanceOption',		                                    
		                                    value: 'uclidean',
		                                    flex: 1,
		                                    forceSelection: true,
		                                    multiSelect: false,
		                                    disabled: false,
		                                    editable: false,
		                                    displayField: 'name',
		                                    valueField: 'value',
		                                    mode: 'local',
		                                    queryMode: 'local',
		                                    triggerAction: 'all',
		                                    store: Ext.create('Ext.data.Store', {
		                                        fields: ['name', 'value', 'description'],
		                                        data: [		                                           
		                                            {name: 'UCLIDEAN', value: 'uclidean', description: 'UCLIDEAN'},
		                                            {name: 'MANHATTAN', value: 'manhattan', description: 'MANHATTAN'}
		                                        ]
		                                    })                                    
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'radiogroup',
		                            fieldLabel: 'Distance Weight Adaptation',
		                            allowBlank: false,
		                            columns: 2,
		                            itemId: 'distanceWeight',
		                            id: 'distanceWeight',
		                            items: [
		                                {
		                                    xtype: 'radiofield',
		                                    boxLabel: 'True',
		                                    name: 'distanceWeight',		                                   
		                                    inputValue: 'true'
		                                },
		                                {
		                                    xtype: 'radiofield',
		                                    boxLabel: 'False',
		                                    name: 'distanceWeight',
		                                    checked: true,
		                                    inputValue: 'false'
		                                }
		                            ]
		                        },
		                        {
		                            xtype: 'radiogroup',
		                            fieldLabel: 'Cross Vaildation Generate',
		                            allowBlank: false,
		                            columns: 2,
		                            itemId: 'isValidation',
		                            id: 'isValidation',
		                            items: [
		                                {
		                                    xtype: 'radiofield',
		                                    boxLabel: 'True',
		                                    name: 'isValidation',
		                                    checked: true,
		                                    inputValue: 'true'
		                                },
		                                {
		                                    xtype: 'radiofield',
		                                    boxLabel: 'False',
		                                    name: 'isValidation',		                                 
		                                    inputValue: 'false'
		                                }
		                            ]
		                        }
		                        /*
		                        {
		                            xtype: 'textfield',
		                            name: 'nominalDistBase',
		                            id: 'nominalDistBase',
		                            fieldLabel: 'Base Distance of Nominal Vlaue',
		                            vtype: 'numeric',
		                            value: 1,
		                            allowBlank: true
		                        } 
		                        */                 
		                    ]
		                }               
                    ]                    
                }               
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_MAPREDUCE,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',                    
                    name: 'jar',                    
                    id:'CODENAME_VAR',                             
                    fieldLabel: MSG.DESIGNER_MR_JAR,                 
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: MSG.DESIGNER_DRIVER,
                    value: 'kNN',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_H_CONFIG,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                /*
                 {
                 xtype: '_configurationBrowserField'
                 },
                 */
                {
                    xtype: '_keyValueGrid',
                    flex: 1
                }
            ]
        }
    ],

    /**
     * UI 컴포넌트의 Key를 필터링한다.
     *
     * ex) 다음과 같이 필터를 설정할 수 있다.
     * propFilters: {
     *     // 추가할 프라퍼티
     *     add   : [
     *         {'test1': '1'},
     *         {'test2': '2'}
     *     ],
     *
     *     // 변경할 프라퍼티
     *     modify: [
     *         {'delimiterType': 'delimiterType2'},
     *         {'config': 'config2'}
     *     ],
     *
     *     // 삭제할 프라퍼티
     *     remove: ['script', 'metadata']
     * }
     */
    propFilters: {
        add: [],
        modify: [],
        remove: ['config']
    },

    /**
     * MapReduce의 커맨드 라인 파라미터를 수동으로 설정한다.
     * 커맨드 라인 파라미터는 Flamingo Workflow Engine에서 props.mapreduce를 Key로 꺼내어 구성한다.
     *
     * @param props UI 상에서 구성한 컴포넌트의 Key Value값
     */
    afterPropertySet: function (props) {
        props.mapreduce = {
            "driver": props.driver ? props.driver : '',
            "jar": props.jar ? props.jar : '',
            "confKey": props.hadoopKeys ? props.hadoopKeys : '',
            "confValue": props.hadoopValues ? props.hadoopValues : '',
            params: []
        };

        if (props.input) {
            props.mapreduce.params.push("-input", props.input);
        }

        if (props.output) {
            props.mapreduce.params.push("-output", props.output);
        }

        if (props.indexList) {
            props.mapreduce.params.push("-indexList", props.indexList);
        }
        
        if (props.nominalIndexList) {
            props.mapreduce.params.push("-nominalIndexList", props.nominalIndexList);
        }
        
        if (props.exceptionIndexList) {
            props.mapreduce.params.push("-exceptionIndexList", props.exceptionIndexList);
        }

        if (props.classIndex) {
            props.mapreduce.params.push("-classIndex", props.classIndex);
        }
                      
        if (props.k) {
            props.mapreduce.params.push("-k", props.k);
        }
        
        if (props.distanceOption) {
            props.mapreduce.params.push("-distanceOption", props.distanceOption);
        }
        
        if (props.distanceWeight) {
            props.mapreduce.params.push("-distanceWeight", props.distanceWeight);
        }
        
        if (props.isValidation) {
            props.mapreduce.params.push("-isValidation", props.isValidation);
        }
        
        /*
        if (props.nominalDistBase) {
            props.mapreduce.params.push("-nominalDistBase", props.nominalDistBase);
        }
        */

        if (props.delimiter) {
            if (props.delimiter == 'CUSTOM') {
                props.mapreduce.params.push("-delimiter", props.delimiterValue);
            } else {
                props.mapreduce.params.push("-delimiter", props.delimiter);
            }
        }
        
        if (props.modelPath) {
            props.mapreduce.params.push("-modelPath", props.modelPath);
        }

        this.callParent(arguments);
    }
});