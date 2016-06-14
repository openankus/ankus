 /* Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
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
Ext.define('Flamingo.view.designer.property.ankus.ALG_ANKUS_ETL', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_ANKUS_ETL',

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
    
    controllers: ['Flamingo.controller.designer.DesignerController'],
    
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
                labelWidth: 200
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
                 {
                     xtype: 'fieldset',
                     height: 360,
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
			
			                    // Parameter this form
			                    var canvas = Ext.ComponentQuery.query('form')[1];
			                    var form = canvas.getForm();
			                    console.info(form);
			                    // Preview grid
			                    var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
			
			                    // Input paths grid
			                    var inputGrid = Ext.ComponentQuery.query('_inputGrid')[0];
			                    var selectedInputPath = inputGrid.getView().getSelectionModel().getSelection();
			                    
			                    if (selectedInputPath[0] === undefined) {
			                        msg('Add File and Dirctory', 'Please input File Path or Dirctory Path.');
			                        return;
			                    }
			
			                    var inputPath = selectedInputPath[0].data.input;
			                    //var delimiter = form.getValues()['delimiter'];
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
			                            columnIndexList = records[i].get('columnIndex');
			                            rowDataList = records[i].get('rowData');
			
			                            for (var k = 0; k < columnIndexList.length; k++) {
			                                rec = new Flamingo.model.designer.Preview({
			                                    rIndex: columnIndexList[k],
			                                    rData: rowDataList[k]
			                                });
			
			                                store.insert(0, rec);                                   
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
		                        }
		                    ]
		                },
		                {
		                    xtype: 'tbspacer',
		                    height: 10
		                },               
		                {
		                    xtype: 'fieldset',
		                    height: 130,
		                    title: 'Select Parameter Option',
		                    layout: 'anchor',
		                    autoWidth: true,
		                    defaults: {
		                        anchor: '100%',
		                        labelWidth: 200,
		                        hideEmptyLabel: false
		                    },
		                    items: [                  
                                {                                   
                                    xtype: 'combo',
                                    name: 'etlMethod',	
                                    fieldLabel: 'Method',
                                    value: 'ColumnExtractor',
                                    id: 'etlMethod',
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
                                            {name: 'COLUMN EXTRACTOR', value: 'ColumnExtractor', description: 'COLUMN EXTRACTOR'},
                                            {name: 'FILTER INCLUDE', value: 'FilterInclude', description: 'FILTER INCLUDE'},
                                            {name: 'FILTER EXCLUDE', value: 'FilterExclude', description: 'FILTER EXCLUDE'},
                                            {name: 'REPLACE', value: 'Replace', description: 'REPLACE'},
                                            {name: 'CATEGORIZATION', value: 'NumericNorm', description: 'CATEGORIZATION'},
                                            {name: 'SORT', value: 'Sort', description: 'SORT'}
                                        ]
                                    }),                                   
                                    listeners:{
                                    	change:function(ele, newValue, oldValue){
                                    		if (newValue != oldValue && newValue != ele.lastSelectEvent) {
                                    			ele.fireEvent('select', ele, newValue);
                                    		}                                    			
                                    	},
                                    	select:function(combo, value){     
                                    		var str_select = combo.getValue();
                                    		                                    		
                                    		if(str_select == 'ColumnExtractor'){
                                    			Ext.getCmp('indexList').show();  
                                    			Ext.getCmp('exceptionIndexList').show();  
                                    			this.up().down('radiogroup').hide();
                                    			Ext.getCmp('filterRule').hide();
                                    			Ext.getCmp('filterRulePath').hide();
                                    			Ext.getCmp('sort').hide();
                                    			Ext.getCmp('SortTarget').hide();
                                    			Ext.getCmp('Sort_label').hide();
                                    			
                                    			Ext.getCmp('filterRule').allowBlank = true;                                            	                                         	
                                            	Ext.getCmp('indexList').allowBlank = false;                                            	
                                            	Ext.getCmp('SortTarget').allowBlank = true;
                                            	
                                            	Ext.getCmp('filterRule').reset();                                            	                                    	
                                    		
                                    		}else if(str_select == 'Sort' ){                                    			
                                    			Ext.getCmp('indexList').hide(); 
                                    			Ext.getCmp('exceptionIndexList').hide();  
                                    			this.up().down('radiogroup').hide();
                                    			Ext.getCmp('filterRulePath').hide();	
                                    			Ext.getCmp('filterRule').hide();
                                    			Ext.getCmp('sort').show();
                                    			Ext.getCmp('SortTarget').show();
                                    			Ext.getCmp('Sort_label').show();
                                    			
                                    			Ext.getCmp('filterRule').allowBlank = true;                                            	                                 	
                                            	Ext.getCmp('indexList').allowBlank = true;                                            
                                            	Ext.getCmp('SortTarget').allowBlank = false;   
                                            	
                                            	Ext.getCmp('filterRule').reset();                                                
                                            	Ext.getCmp('indexList').reset();
                                            	Ext.getCmp('exceptionIndexList').reset();
                                    			
                                    		}else{                                    			
                                    			Ext.getCmp('indexList').hide();
                                    			Ext.getCmp('exceptionIndexList').hide();  
                                    			this.up().down('radiogroup').show();
                                    			Ext.getCmp('filterRulePath').show();
                                    			Ext.getCmp('filterRule').show();
                                    			Ext.getCmp('sort').hide();
                                    			Ext.getCmp('SortTarget').hide();
                                    			Ext.getCmp('Sort_label').hide();
                                    			
                                    			Ext.getCmp('filterRule').allowBlank = false;                                                                                	
                                            	Ext.getCmp('indexList').allowBlank = true;                                            	
                                            	Ext.getCmp('SortTarget').allowBlank = true;       
                                            	
                                            	Ext.getCmp('filterRule').reset();                                                 	  
                                            	Ext.getCmp('indexList').reset();
                                            	Ext.getCmp('exceptionIndexList').reset();
                                    		} 
                                    	}
                                    }                                    
                                }, 
								{
								    xtype: 'radiogroup',
								    fieldLabel: 'Rule Type',								    
								    allowBlank: false,
								    columns: 2,
								    name: 'testRadio',
								    Id: 'testRadio',
								    itemId: 'testRadio',		
								    hidden:true,
								    items: [
								        {
								            xtype: 'radiofield',
								            boxLabel: 'File',
								            name: 'ruleType',
								            checked: false,
								            inputValue: 'true'
								        },
								        {
								            xtype: 'radiofield',
								            boxLabel: 'Text',
								            name: 'ruleType',
								            checked: true,
								            inputValue: 'false'
								        }
								    ],
								    listeners: {
								    	change: function(field, value){   
								    		if(value.ruleType == 'true'){                            		
								    			Ext.getCmp('filterRulePath').enable();		
								    			Ext.getCmp('filterRule').disable();	
								    		}else{                            		
								    			Ext.getCmp('filterRulePath').disable();	
								    			Ext.getCmp('filterRule').enable();	
								    		}
								    	}
								    }                            
								},								
                                {
									xtype: '_browserField',
								    name: 'filterRulePath',
								    id: 'filterRulePath',
								    fieldLabel:'Rule(File)',								 
								    allowBlank: false,
								    readOnly: false,
								    hidden:true,
								    disabled:true,
								    flex: 1
								 },
								 {
		                            xtype: 'textfield',		                           
		                            name: 'filterRule',
		                            id: 'filterRule',
		                            fieldLabel: 'Rule(Text)',		                            
		                            width:'100%',
		                            hidden: true
		                        }, 	
		                        {
		                            xtype: 'textfield',
		                            name: 'indexList',
		                            id: 'indexList',
		                            fieldLabel: 'Include Attributes(Index) List',
		                            vtype: 'commaseperatednum',
		                            allowBlank: false
		                        },
		                        {
		                            xtype: 'textfield',
		                            name: 'exceptionIndexList',
		                            id: 'exceptionIndexList',
		                            fieldLabel: 'Exclude Attributes(Index) List',
		                            vtype: 'commaseperatednum'		                          
		                        },  
						        {
						            xtype: 'combo',
						            name: 'sort',	
						            id: 'sort',		
						            fieldLabel: 'Sort Criterion',
						            value: 'asc',
						            flex: 1,
						            forceSelection: true,
						            multiSelect: false,
						            disabled: false,
						            editable: false,
						            hidden: true,
						            displayField: 'name',
						            valueField: 'value',
						            mode: 'local',
						            queryMode: 'local',
						            triggerAction: 'all',
						            selectOnFocus : true,
						            store: Ext.create('Ext.data.Store', {
						                fields: ['name', 'value', 'description'],
						                data: [
						                    {name: 'ASCENDING', value: 'asc', description: 'ASCENDING'},
						                    {name: 'DESCENDING', value: 'desc', description: 'DESCENDING'}
						                ]
						            })                                    
						        },								
		                        {
		                            xtype: 'textfield',
		                            name: 'SortTarget',
		                            id: 'SortTarget',
		                            fieldLabel: 'Target Index',
		                            value: 2,		                    
		                            hidden: true		                         
		                        },
		                        {
		                        	xtype: 'label',
		                        	name: 'Sort_label',
		                        	id: 'Sort_label',
		                        	hidden:true,
		                        	text:'※ Sort will be applied on an individual file basis.'		                     
		                        }
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
                    value: 'ETL',
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
        
        var str_combo = Ext.getCmp('etlMethod').getValue();       
        
        if (props.input) {
            props.mapreduce.params.push("-input", props.input);
        }

        if (props.output) {
            props.mapreduce.params.push("-output", props.output);
        }     
        
        if (props.delimiter) {
            if (props.delimiter == 'CUSTOM') {
                props.mapreduce.params.push("-delimiter", props.delimiterValue);
            } else {
                props.mapreduce.params.push("-delimiter", props.delimiter);
            }
        }        
        
        if (props.etlMethod) {
            props.mapreduce.params.push("-etlMethod", props.etlMethod);
        }
        
        if(str_combo == 'ColumnExtractor'){
        	 if (props.indexList) {
                 props.mapreduce.params.push("-indexList", props.indexList);
             }
             if (props.exceptionIndexList) {
                 props.mapreduce.params.push("-exceptionIndexList", props.exceptionIndexList);
             }  
        }  
       
        if(str_combo == 'FilterInclude' || str_combo == 'FilterExclude'){
        	if (props.filterRulePath) {
                props.mapreduce.params.push("-filterRulePath", props.filterRulePath);
            }        	
        	if (props.filterRule) {
                props.mapreduce.params.push("-filterRule", props.filterRule);
            }
        }
        
        if(str_combo == 'Replace'){
        	if (props.filterRulePath) {
                props.mapreduce.params.push("-ReplaceRulePath", props.filterRulePath);
            }        	
        	if (props.filterRule) {
                props.mapreduce.params.push("-ReplaceRule", props.filterRule);
            }
        }
        
        if(str_combo == 'NumericNorm'){
        	if (props.filterRulePath) {
                props.mapreduce.params.push("-NumericFormFile", props.filterRulePath);
            }        	
        	if (props.filterRule) {
                props.mapreduce.params.push("-NumericForm", props.filterRule);
            }
        }   
        
        if(str_combo == 'Sort'){        
        	 if (props.sort) {
                 props.mapreduce.params.push("-Sort", props.sort);
             }
             
             if (props.SortTarget) {
                 props.mapreduce.params.push("-SortTarget", props.SortTarget);
             }
        }       
        this.callParent(arguments);
    }
    
});






