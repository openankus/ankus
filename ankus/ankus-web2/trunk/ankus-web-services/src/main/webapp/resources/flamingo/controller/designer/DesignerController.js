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

/**
 * Workflow Designer : Controller Class
 *
 * @class
 * @extends Ext.app.Controller
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.controller.designer.DesignerController', {
    extend: 'Ext.app.Controller',

    models: ['designer.NodeMeta', 'designer.Variable', 'designer.property.ColumnInfo', 'designer.property.PrevColumnInfo', 'designer.property.Jar', 'designer.property.InputPath', 'designer.property.KeyValue', 'designer.property.NameValue', 'designer.property.DependencyInfo', 'designer.property.Value', 'designer.property.Input', 'designer.property.Environment', 'designer.property.Commandline', 'designer.FileColumn'],
    stores: ['designer.NodeMeta', 'designer.Variable', 'designer.property.ColumnInfo', 'designer.property.PrevColumnInfo', 'designer.property.Jar', 'designer.property.InputPath', 'designer.property.KeyValue', 'designer.property.NameValue', 'designer.property.DependencyInfo', 'designer.property.Value', 'designer.property.Input', 'designer.property.Environment', 'designer.property.Commandline', 'designer.WorkflowTreeStore', 'designer.HdfsBrowserTree', 'designer.HdfsBrowserList', 'designer.SimpleWorkflow'],

    refs: [
        {
            ref: 'canvas',
            selector: 'canvas'
        },
        {
            ref: 'variableGrid',
            selector: 'variableGrid'
        },
        {
            ref: 'nodeList',
            selector: 'nodeList'
        },
        {
            ref: 'idField',
            selector: 'canvas #wd_fld_id'
        },
        {
            ref: 'treeIdField',
            selector: 'canvas #wd_fld_tree_id'
        },
        {
            ref: 'nameField',
            selector: 'canvas #wd_fld_name'
        },
        {
            ref: 'descField',
            selector: 'canvas #wd_fld_desc'
        },
        {
            ref: 'descButton',
            selector: 'canvas #wd_btn_desc'
        },
        {
            ref: 'fullButton',
            selector: 'canvas #wd_btn_full'
        },
        {
            ref: 'createButton',
            selector: 'canvas #wd_btn_create'
        },
        {
            ref: 'saveButton',
            selector: 'canvas #wd_btn_save'
        },
        {
            ref: 'runButton',
            selector: 'canvas #wd_btn_run'
        },
        {
            ref: 'wd_btn_xml',
            selector: 'canvas #wd_btn_xml'
        }
    ],

    init: function () {
        this.control({
            'workflowTree #deleteFolderMenu': {
                click: this.onDeleteWorkflowClick
            },
            'workflowTree #createFolderMenu': {
                click: this.onCreateFolderClick
            },
            'workflowTree #renameFolderMenu': {
                click: this.onRenameWorkflowClick
            },
            'nodeList': {
                render: this.onNodeListRender
            },
            'canvas': {
                render: this.onCanvasRender,
                resize: this.onCanvasResize,
                nodeBeforeConnect: this.onCanvasNodeBeforeConnect,
                nodeConnect: this.onCanvasNodeConnect,
                nodeDisconnected: this.onCanvasNodeDisconnected,
                beforeLabelChange: this.onCanvasBeforeLabelChange,
                labelChanged: this.onCanvasLabelChanged,
                nodeChanged: this.onCanvasNodeChanged,
                nodeBeforeRemove: this.onCanvasNodeBeforeRemove
            },
            'canvas #wd_btn_desc': {
                click: this.onDescClick
            },
            'canvas #wd_btn_full': {
                click: this.onFullClick
            },
            'canvas #wd_btn_create': {
                click: this.onCreateClick
            },
            'canvas #wd_btn_save': {
                click: this.onSaveClick
            },
            'canvas #wd_btn_run': {
                click: this.onRunClick
            },
            'canvas #wd_btn_xml': {
                click: this.onWorkflowXMLClick
            }
        });
    },

    /**
     * 노드리스트 패널 Render 핸들러 : 노드의 DragZone 을 설정하고 Drag 시 노드 메타데이타를 설정한다.
     *
     * @param {Ext.Component} component
     * @param {Object} eOpts The options object passed to Ext.util.Observable.addListener.
     */
    onNodeListRender: function (component, eOpts) {
        component.dragZone = Ext.create('Ext.dd.DragZone', component.getEl(), {
            getDragData: function (e) {
                var sourceEl = e.getTarget(component.itemSelector, 10), d;

                if (sourceEl) {
                    d = sourceEl.cloneNode(true);
                    d.id = Ext.id();

                    return {
                        sourceEl: sourceEl,
                        repairXY: Ext.fly(sourceEl).getXY(),
                        ddel: d,
                        nodeMeta: component.store.getById(sourceEl.id).data
                    };
                }
            },

            getRepairXY: function () {
                return this.dragData.repairXY;
            }
        });
    },

    /**
     * 캔버스 패널 Render 핸들러 :
     * - 내부 SVG 그래프 캔버스 인스턴스를 생성한다.
     * - 노드의 DropZone 을 설정하고 Drop 되었을때 노드가 드로잉 되도록 한다.
     * - 노드를 더블클릭 하였을때 프라퍼티 설정창이 팝업되도록 한다.
     *
     * @param {Ext.Component} component
     * @param {Object} eOpts The options object passed to Ext.util.Observable.addListener.
     */
    onCanvasRender: function (component, eOpts) {
        var canvas = query('canvas'), getPropertyWindow = this._getPropertyWindow;

        // 내부 SVG 그래프 캔버스 인스턴스를 생성
        canvas.graph = new OG.Canvas(canvas.body.dom, [1024, 768], 'white', 'url(' + CONSTANTS.CONTEXT_PATH + '/resources/images/wallpapers/white.jpg)');

        // OpenGraph 디폴트 스타일 설정
        canvas.graph._CONFIG.DEFAULT_STYLE.EDGE = {
            'stroke': 'blue',
            'stroke-width': 1,
            'stroke-opacity': 1,
            'edge-type': 'bezier',
            'edge-direction': 'c c',
            'arrow-start': 'none',
            'arrow-end': 'classic-wide-long',
            'stroke-dasharray': '',
            'label-position': 'center'
        };

        // OpenGraph 기능 활성화 여부
        canvas.graph._CONFIG.MOVABLE_.EDGE = false;
        canvas.graph._CONFIG.SELF_CONNECTABLE = false;
        canvas.graph._CONFIG.CONNECT_CLONEABLE = false;
        canvas.graph._CONFIG.RESIZABLE = false;
        canvas.graph._CONFIG.LABEL_EDITABLE_.GEOM = false;
        canvas.graph._CONFIG.LABEL_EDITABLE_.TEXT = false;
        canvas.graph._CONFIG.LABEL_EDITABLE_.HTML = false;
        canvas.graph._CONFIG.LABEL_EDITABLE_.IMAGE = false;
        canvas.graph._CONFIG.LABEL_EDITABLE_.EDGE = true;
        canvas.graph._CONFIG.LABEL_EDITABLE_.GROUP = false;
        canvas.graph._CONFIG.ENABLE_HOTKEY_DELETE = true;
        canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_A = false;
        canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_C = false;
        canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_V = false;
        canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_G = false;
        canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_U = false;
        canvas.graph._CONFIG.ENABLE_HOTKEY_ARROW = true;
        canvas.graph._CONFIG.ENABLE_HOTKEY_SHIFT_ARROW = true;

        // 디폴트 시작, 끝 노드 드로잉
        this._drawDefaultNode();

        // 노드의 DropZone 설정
        canvas.dropZone = Ext.create('Ext.dd.DropZone', canvas.getEl(), {
            dropAllowed: 'canvas_contents',

            notifyOver: function (dragSource, event, data) {
                return Ext.dd.DropTarget.prototype.dropAllowed;
            },

            notifyDrop: function (dragSource, event, data) {
                var nodeMeta = data.nodeMeta,
                    shape = Ext.create("Flamingo." + nodeMeta.identifier, nodeMeta.icon, nodeMeta.name),
                    shapeElement;

                // Drop 되었을때 노드를 드로잉
                shapeElement = canvas.graph.drawShape([event.browserEvent.offsetX, event.browserEvent.offsetY], shape, [60, 60]);
                canvas.graph.setCustomData(shapeElement, {
                    metadata: nodeMeta,
                    properties: Ext.clone(nodeMeta.defaultProperties) || {},
                    isValidated: false
                });

                return true;
            }
        });

        // onDrawShape Listener
        /*
        canvas.graph.onDrawShape(function (event, element) {
            // 노드를 더블클릭 하였을때 프라퍼티 설정창 팝업
           
            Ext.EventManager.on(element, 'dblclick', function (e, ele) {
                var propertyWindow = getPropertyWindow(element); 
                 console.info(element);
           		propertyWindow.show();
           		var jar_setvalue = propertyWindow.down('#CODENAME_VAR').getValue();                
                if(jar_setvalue.length == 0)
                {
                   	//NEW NODE
                	if (propertyWindow)
                	{                
                	
                		Ext.Ajax.request({
								url:'/mrjar/get',
								method:'GET',
								params:{
									 'method':'gubun'
								},
								success:function( result, request )
								{
									var jsonData = Ext.JSON.decode( result.responseText );//ExtJS4      
									//console.info(jsonData.data.CODENAME);
									if(jsonData.success == "true"){ 
							    	    propertyWindow.down('#CODENAME_VAR').setValue(jsonData.data.CODENAME_VAR);
							    	}
									else{
										console.info(result);
									}     	                       	                	     	                         	 
								},
								failure: function( result, request ){
									Ext.Msg.alert( "Failed", result.responseText );
								}      	                         				
		      	      			});
					}                
                }
            }, element);
        });
		*/
		    canvas.graph.onDrawShape(function (event, element) {
            // 노드를 더블클릭 하였을때 프라퍼티 설정창 팝업        	
            Ext.EventManager.on(element, 'dblclick', function (e, ele) {
            	
                var propertyWindow = getPropertyWindow(element); 
                
                var jarfile = propertyWindow.items.items[0].xtype;
                
                var nodeData = Ext.clone(canvas.graph.getCustomData(element)),
                nodeMeta = nodeData ? nodeData.metadata : null,
                nodeProperty = nodeData ? nodeData.properties : null,
                popWindow;
           		
           		var jar_setvalue = propertyWindow.down('#CODENAME_VAR').getValue();  
           		
                if(jar_setvalue.length == 0)
                {
                   	//NEW NODE
                	if (propertyWindow)
                	{                
                	
                		Ext.Ajax.request({
								url:'/mrjar/get',
								method:'GET',
								params:{
									 'method':'gubun'
								},
								success:function( result, request )
								{
									var jsonData = Ext.JSON.decode( result.responseText );//ExtJS4      
									//console.info(jsonData.data.CODENAME);
									if(jsonData.success == "true" && jarfile != 'ALG_ANKUS_COMMON_INPUT'){ 
							    	    propertyWindow.down('#CODENAME_VAR').setValue(jsonData.data.CODENAME_VAR);
							    	}
									else{
										//console.info(result);
									}     	                       	                	     	                         	 
								},
								failure: function( result, request ){
									Ext.Msg.alert( "Failed", result.responseText );
								}      	                         				
		      	      			});
					} 
                }; 
                
                if(jarfile == 'ALG_ANKUS_COMMON_INPUT'){
                	
                	if(propertyWindow){
                    	Ext.Ajax.request({
    						url:'/getmoduleinfos',
    						method:'POST',						
    						success:function( result, request )
    						{
    							
    							var jsonData = Ext.JSON.decode( result.responseText ); 
    							var classnm = nodeMeta.className;
    							
    							for(j=0 ; j < jsonData.length ; j++){
    								
    								if(jsonData[j].classname == classnm){
    									Ext.getCmp('driver').setValue(jsonData[j].drive); 
    	    							Ext.getCmp('CODENAME_VAR').setValue(jsonData[j].nexus);
    	    														
    	    							for(i=0; i< jsonData[j].params.length; i++) {   
    	    								var type= jsonData[j].params[i].type;
    	    								    	    								
    	    								if(type == 'columnindex'){
    	    									var v_id = jsonData[j].params[i].name;
    	    									var v_allow = jsonData[j].params[i].required;
    	    									
    	    									if(v_allow == 'Y'){
    	    										v_allow = false;
    	    									}else{
    	    										v_allow = true;
    	    									}
    	    									
    	    									Ext.getCmp('jsonForm').add(
    											{
    												xtype: 'fieldcontainer',							
    												layout: 'hbox',	    												
    												items: [    	    												
    												        {
															 xtype:'textfield',
															 name:jsonData[j].params[i].name,
															 labelWidth:200,
															 id:v_id,
															 flex: 1,
															 fieldLabel:jsonData[j].params[i].description,	
															 allowBlank:v_allow															 
															},
    	    												{
    		    	    										xtype: 'button',
    		    	    										text: '+',
    		    	    										itemid: v_id,
    		    	    										handler: function (grid, rowIndex, colIndex) {
    		    	    											
    		    	    											Ext.create('Flamingo.view.designer.FilePreview', {targetFieldId:this.itemid});
    		    	    										}
    		    	    									}
    		    	    									
														]
    	    									});
    	    									
    	    								}
    	    								
    	    								if(type == 'text'){
    	    									var v_id = jsonData[j].params[i].name;
    	    									var v_allow = jsonData[j].params[i].required;
    	    									
    	    									if(v_allow == 'Y'){
    	    										v_allow = false;
    	    									}else{
    	    										v_allow = true;
    	    									}
    	    									
    	    									Ext.getCmp('jsonForm').add(
    											{
    												 xtype:"textfield",    												 
    												 id:jsonData[j].params[i].name,
    												 name:jsonData[j].params[i].name,
    												 labelWidth:200,
    												 width:450,
    												 flex: 1,
    												 fieldLabel:jsonData[j].params[i].description,
    												 allowBlank:v_allow,			 		 
    												 value:jsonData[j].params[i].values
    											});
    	    								}
    	    								
    	    								if(type == 'boolean'){
    	    									var v_id = jsonData[j].params[i].name;
    	    									var v_allow = jsonData[j].params[i].required;
    	    									
    	    									if(v_allow == 'Y'){
    	    										v_allow = false;
    	    									}else{
    	    										v_allow = true;
    	    									}
    	    									
    	    									Ext.getCmp('jsonForm').add(
    											{
    												 xtype:"radiogroup",
    												 itemId:jsonData[j].params[i].name,
    												 id:jsonData[j].params[i].name,
    												 labelWidth:200,
    												 fieldLabel:jsonData[j].params[i].description,
    												 allowBlank:v_allow,			 		 
    												 columns:2,
    												 items:[
    														{
    														xtype:"radiofield",
    														boxLabel:"True",
    														name:jsonData[j].params[i].name,
    														checked:true, 	                  
    														inputValue:"true"
    														},
    														{
    														xtype:"radiofield",
    														boxLabel:"False",
    														name:jsonData[j].params[i].name,
    														checked:false, 	
    										                inputValue:"false"
    										                }	
    													]
    												}
    	    									);
    	    								}
    	    								
    	    								/*
    	    								else{
    	    									var combodata = jsonData[j].params[i].data;
    	    									Ext.getCmp('jsonForm').add(    											
    	    											{
    	    												xtype: xtype,
    	    												fieldLabel: jsonData[j].params[i].fieldLabel,
    	    			                                    name: jsonData[j].params[i].name,
    	    			                                    value: jsonData[j].params[i].value,
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
    	    			                                        data: combodata
    	    			                                    })	
    	    											}
    	    									);
    	    								}
    	    								*/
    	    						     };
    								}
    							}    							
    						     
    						     var jsonForm = Ext.getCmp('jsonForm'); 
    						     //console.info(jsonForm.items.items.length);
    						     
    						     
          					     for(var i=0; i<jsonForm.items.items.length; i++){
          					    	
          					    	var name;
          					    	
          					    	if(jsonForm.items.items[i].xtype == 'fieldcontainer'){
          					    		name = jsonForm.items.items[i].items.keys[0]; 
          					    	}else{
          					    		name = jsonForm.items.items[i].id;
          					    	}          					    	 
          					    	//console.info(name);
          					    	//console.info(jsonForm.items.items[i].xtype);
          					    	for(var key in nodeProperty) {
          					    	    var value = nodeProperty[key];
          					    	  if(key === name){
          					    		if(jsonForm.items.items[i].xtype == 'fieldcontainer'){
          					    			jsonForm.items.items[i].items.items[0].setValue(value);
              					    	}else if(jsonForm.items.items[i].xtype == 'radiogroup'){
              					    		jsonForm.items.items[i].items.get(0).setValue(value);
              					    	}else if(jsonForm.items.items[i].xtype == 'textfield'){              					    		
              					    		jsonForm.items.items[i].setValue(value);
              					    	} 
          					    		
          					    	  }
          					    	}
          					     }
    						     
    						},
    						failure: function( result, request ){
    							Ext.Msg.alert( "Failed", result.responseText );
    						}      	                         				
          	      			});
                    }
                }
                               
                propertyWindow.show();   
            }, element);
        });
        
        // onBeforeConnectShape -> fireEvent canvas.nodeBeforeConnect
        canvas.graph.onBeforeConnectShape(function (event, edgeElement, fromElement, toElement) {
            return canvas.fireEvent('nodeBeforeConnect', canvas, event, edgeElement, fromElement, toElement);
        });

        // onBeforeRemoveShape -> fireEvent canvas.nodeBeforeRemove
        canvas.graph.onBeforeRemoveShape(function (event, element) {
            return canvas.fireEvent('nodeBeforeRemove', canvas, event, element);
        });

        // onConnectShape -> fireEvent canvas.nodeConnect
        canvas.graph.onConnectShape(function (event, edgeElement, fromElement, toElement) {
            canvas.fireEvent('nodeConnect', canvas, event, edgeElement, fromElement, toElement);
        });

        // onDisconnectShape -> fireEvent canvas.nodeDisconnected
        canvas.graph.onDisconnectShape(function (event, edgeElement, fromElement, toElement) {
            canvas.fireEvent('nodeDisconnected', canvas, event, edgeElement, fromElement, toElement);
        });

        // onBeforeLabelChange -> fireEvent canvas.beforeLabelChange
        canvas.graph.onBeforeLabelChange(function (event, element, afterText, beforeText) {
            return canvas.fireEvent('beforeLabelChange', canvas, event, element, afterText, beforeText);
        });

        // onLabelChanged -> fireEvent canvas.labelChanged
        canvas.graph.onLabelChanged(function (event, element, afterText, beforeText) {
            canvas.fireEvent('labelChanged', canvas, event, element, afterText, beforeText);
        });
    },

    /**
     * 캔버스 패널 Resize 핸들러 : 내부 SVG 그래프 캔버스 사이즈를 조정한다.
     *
     * @param {Ext.Component} component
     * @param {Number} width
     * @param {Number} height
     * @param {Number} oldWidth
     * @param {Number} oldHeight
     * @param {Object} eOpts The options object passed to Ext.util.Observable.addListener.
     */
    onCanvasResize: function (component, width, height, oldWidth, oldHeight, eOpts) {
        var graphBBox = component.graph.getRootBBox();

        // 내부 SVG 그래프 캔버스 사이즈가 외부 캔버스 패널 사이즈보다 작을 경우
        if (graphBBox.width < width || graphBBox.height < height) {
            component.graph.setCanvasSize([
                graphBBox.width < width ? width : graphBBox.width,
                graphBBox.height < height ? width : graphBBox.height
            ]);
        }
    },

    /**
     * 캔버스 패널 NodeBeforeConnected 핸들러 : 연결 직전 Validation 을 체크한다.
     *
     * @param {Ext.Component} canvas 캔버스패널
     * @param {Event} event 이벤트
     * @param {Element} edgeElement 라인엘리먼트
     * @param {Element} fromElement 시작엘리먼트
     * @param {Element} toElement 끝엘리먼트
     */
    onCanvasNodeBeforeConnect: function (canvas, event, edgeElement, fromElement, toElement) {
        var workflow = this, fromNodeData = Ext.clone(canvas.graph.getCustomData(fromElement)),
            fromNodeMeta = fromNodeData.metadata,
            fromNodeProperties = fromNodeData.properties,
            toNodeData = Ext.clone(canvas.graph.getCustomData(toElement)),
            toNodeMeta = toNodeData.metadata,
            toNodeProperties = toNodeData.properties,
            prevShapes = canvas.graph.getPrevShapes(toElement),
            checkInfinite = function (_shapeEle) {
                var _nextShapes = canvas.graph.getNextShapes(_shapeEle);
                for (var i = 0; i < _nextShapes.length; i++) {
                    if (_nextShapes[i].id === fromElement.id) {
                        workflow._error(MSG.DESIGNER_MSG_NOT_RECURSION);
                        return false;
                    }

                    if (!checkInfinite(_nextShapes[i])) {
                        return false;
                    }
                }
                return true;
            };

        // 0. 이미 연결된 노드가 있는 경우 체크
        for (var i = 0; i < prevShapes.length; i++) {
            if (prevShapes[i].id === fromElement.id) {
                this._error(MSG.DESIGNER_MSG_ALREADY_CONNECT);
                return false;
            }
        }

        // 1. 재귀 연결 체크
        if (!checkInfinite(toElement)) {
            return false;
        }

        // 2. 상호 연결 불가 노드 체크
        if (fromNodeMeta.notAllowedNextTypes.indexOf(toNodeMeta.type) >= 0) {
            this._error(MSG.DESIGNER_MSG_DENIED_CONNECT);
            return false;
        }
        if (toNodeMeta.notAllowedPrevTypes.indexOf(fromNodeMeta.type) >= 0) {
            this._error(MSG.DESIGNER_MSG_DENIED_CONNECT);
            return false;
        }
        if (fromNodeMeta.notAllowedNextNodes.indexOf(toNodeMeta.identifier) >= 0) {
            this._error(MSG.DESIGNER_MSG_DENIED_CONNECT);
            return false;
        }
        if (toNodeMeta.notAllowedPrevNodes.indexOf(fromNodeMeta.identifier) >= 0) {
            this._error(MSG.DESIGNER_MSG_DENIED_CONNECT);
            return false;
        }

        // 3. 이전 노드 연결 갯수 체크
        if (toNodeMeta.maxPrevNodeCounts >= 0 &&
            canvas.graph.getPrevShapes(toElement).length >= toNodeMeta.maxPrevNodeCounts) {
            this._error(MSG.DESIGNER_MSG_FULLY_CONNECT);
            return false;
        }

        // 4. 이후 노드 연결 갯수 체크
        if (fromNodeMeta.maxNextNodeCounts >= 0 &&
            canvas.graph.getNextShapes(fromElement).length >= fromNodeMeta.maxNextNodeCounts) {
            this._error(MSG.DESIGNER_MSG_FULLY_CONNECT);
            return false;
        }

        // 5. 컬럼구분자, 컬럼 일치 여부 체크
        /*
         if (fromNodeMeta.type !== 'START' && toNodeMeta.type !== 'END') {
         if (toNodeMeta.fixedInputColumns === true || toNodeMeta.isCheckColumns === true) {
         if (Ext.isEmpty(fromNodeProperties.columnNames)) {
         if (!Ext.isEmpty(toNodeProperties.prevColumnNames) && fromNodeMeta.readOnlyOutputColumns === false) {
         // 이전노드 컬럼정보가 없는 경우 컬럼정보 자동 설정(readOnlyOutputColumns 가 true 인 경우 제외)
         fromNodeProperties.columnNames = toNodeProperties.prevColumnNames;
         fromNodeProperties.columnKorNames = toNodeProperties.prevColumnKorNames;
         fromNodeProperties.columnTypes = toNodeProperties.prevColumnTypes;
         fromNodeProperties.columnDescriptions = toNodeProperties.prevColumnDescriptions;

         if (toNodeProperties.prevDelimiterValue === 'CUSTOM') {
         fromNodeProperties.delimiterType = 'CUSTOM';
         fromNodeProperties.delimiterValue = toNodeProperties.prevDelimiterValue;
         } else {
         fromNodeProperties.delimiterType = toNodeProperties.prevDelimiterValue;
         }

         canvas.graph.setCustomData(fromElement, fromNodeData);
         } else {
         this._error('컬럼정보가 존재하지 않아 연결할 수 없습니다.\n컬럼정보를 지정하세요.');
         return false;
         }
         } else if (!Ext.isEmpty(toNodeProperties.prevColumnNames)) {
         if (fromNodeProperties.columnNames !== toNodeProperties.prevColumnNames) {
         this._error('컬럼명이 일치하지 않아 연결할 수 없습니다.');
         return false;
         }

         if (fromNodeProperties.columnTypes !== toNodeProperties.prevColumnTypes) {
         this._error('컬럼자료형이 일치하지 않아 연결할 수 없습니다.');
         return false;
         }

         if (!(fromNodeProperties.delimiterType === toNodeProperties.prevDelimiterValue ||
         fromNodeProperties.delimiterValue === toNodeProperties.prevDelimiterValue)) {
         this._error('컬럼구분자가 일치하지 않아 연결할 수 없습니다.');
         return false;
         }
         }
         } else if (Ext.isEmpty(fromNodeProperties.columnNames)) {
         this._error('컬럼정보가 존재하지 않아 연결할 수 없습니다.\n컬럼정보를 지정하세요.');
         return false;
         }
         }
         */

        return true;
    },

    /**
     * 캔버스 패널 NodeConnected 핸들러 : 노드 연결 되었을 때 다음 노드로의 컬럼구분자, 컬럼정보를 전달한다.
     *
     * @param {Ext.Component} canvas 캔버스패널
     * @param {Event} event 이벤트
     * @param {Element} edgeElement 라인엘리먼트
     * @param {Element} fromElement 시작엘리먼트
     * @param {Element} toElement 끝엘리먼트
     */
    onCanvasNodeConnect: function (canvas, event, edgeElement, fromElement, toElement) {
        var fromNodeData = Ext.clone(canvas.graph.getCustomData(fromElement)),
            fromNodeMeta = fromNodeData.metadata,
            fromNodeProperties = fromNodeData.properties,
            toNodeData = Ext.clone(canvas.graph.getCustomData(toElement)),
            toNodeMeta = toNodeData.metadata,
            toNodeProperties = toNodeData.properties,
            edgeLabel;

        // 1. START, END 타입 노드외에 연결된 경우 디폴트 라벨 표시
        if (fromNodeMeta.type !== 'START' && toNodeMeta.type !== 'END') {
            if (toNodeMeta.type === 'OUT') {
                edgeLabel = toNodeProperties.outputPathQualifier || toNodeMeta.qualifierLabel || toNodeMeta.name;
            } else if (toNodeMeta.type === 'IN') {
                edgeLabel = fromNodeProperties.inputPathQualifiers || fromNodeMeta.qualifierLabel || fromNodeMeta.name;
            } else {
                edgeLabel = fromNodeProperties.outputPathQualifier || fromNodeMeta.qualifierLabel || fromNodeMeta.name;
            }
            canvas.graph.drawLabel(edgeElement, edgeLabel, {
                'font-size': 12,
                'font-color': 'black'
            });
        }

        // 2. INOUT 타입 노드를 연결된 경우 라인 스타일 번경
        if (fromNodeMeta.type === 'IN' || fromNodeMeta.type === 'OUT' ||
            toNodeMeta.type === 'IN' || toNodeMeta.type === 'OUT') {
            canvas.graph.setShapeStyle(edgeElement, {
                'stroke': 'red',
                'arrow-end': 'open-wide-long',
                'stroke-dasharray': '--'
            });
        }

        // 3. 노드 연결 되었을 때 다음 노드로의 컬럼구분자, 컬럼정보를 전달
        /*
         if (fromNodeMeta.type !== 'START' && toNodeMeta.type !== 'END') {
         this._applyPrevColumnInfo(toElement);
         }
         */
    },

    /**
     * 캔버스 패널 NodeDisconnected 핸들러 : 노드 연결 해제 되었을 때 다음 노드로의 컬럼구분자, 컬럼정보를 다시 설정한다.
     *
     * @param {Ext.Component} canvas 캔버스패널
     * @param {Event} event 이벤트
     * @param {Element} edgeElement 라인엘리먼트
     * @param {Element} fromElement 시작엘리먼트
     * @param {Element} toElement 끝엘리먼트
     */
    onCanvasNodeDisconnected: function (canvas, event, edgeElement, fromElement, toElement) {
        var fromNodeData = Ext.clone(canvas.graph.getCustomData(fromElement)),
            fromNodeMeta = fromNodeData.metadata,
            toNodeData = Ext.clone(canvas.graph.getCustomData(toElement)),
            toNodeMeta = toNodeData.metadata;

        // 노드 연결 해제 되었을 때 다음 노드로의 컬럼구분자, 컬럼정보를 다시 설정
        /*
         if (fromNodeMeta.type !== 'START' && toNodeMeta.type !== 'END') {
         this._applyPrevColumnInfo(toElement);
         }
         */
    },

    /**
     * 캔버스 패널 BeforeLabelChange 핸들러
     *
     * @param {Ext.Component} canvas 캔버스패널
     * @param {Event} event 이벤트
     * @param {Element} shapeElement 노드엘리먼트
     * @param {String} afterText 변경 후 라벨
     * @param {String} beforeText 변경 전 라벨
     */
    onCanvasBeforeLabelChange: function (canvas, event, shapeElement, afterText, beforeText) {

        // 1. 라벨명 공백 금지
        if (Ext.isEmpty(Ext.String.trim(afterText || ''))) {
            return false;
        }

        // 2. 리턴(\r\n), 콤마(,) 제거. 공백 '_' 로 대체
        afterText = Ext.String.trim(afterText || '').replace(/,|\r|\n/g, '').replace(/\s+/g, '_');

        // 3. 이전 노드 식별자 라벨 중복 금지(자동 _숫자 붙임)
        if (shapeElement.shape.TYPE === OG.Constants.SHAPE_TYPE.EDGE) {
            var connectInfo = canvas.graph.getRelatedElementsFromEdge(shapeElement),
                prevEdges = canvas.graph.getPrevEdges(connectInfo.to),
                label, labelMap = new Ext.util.HashMap(), num = 1;

            for (var i = 0; i < prevEdges.length; i++) {
                label = prevEdges[i].shape.label;
                if (prevEdges[i].id !== shapeElement.id && !Ext.isEmpty(label)) {
                    labelMap.add(label, label);
                }
            }

            label = afterText;
            while (labelMap.containsKey(label)) {
                label = afterText + '_' + num++;
            }
            afterText = label;
        }

        // 4. 라벨명 공백 금지
        if (Ext.isEmpty(Ext.String.trim(afterText || ''))) {
            return false;
        }

        event.afterText = afterText;

        return true;
    },

    /**
     * 캔버스 패널 LabelChanged 핸들러
     *
     * @param {Ext.Component} canvas 캔버스패널
     * @param {Event} event 이벤트
     * @param {Element} shapeElement 노드엘리먼트
     * @param {String} afterText 변경 후 라벨
     * @param {String} beforeText 변경 전 라벨
     */
    onCanvasLabelChanged: function (canvas, event, shapeElement, afterText, beforeText) {
        if (shapeElement.shape.TYPE === OG.Constants.SHAPE_TYPE.EDGE) {
            var connectInfo = canvas.graph.getRelatedElementsFromEdge(shapeElement),
                fromNodeData = Ext.clone(canvas.graph.getCustomData(connectInfo.from)),
                fromNodeMeta = fromNodeData.metadata,
                fromNodeProperties = fromNodeData.properties,
                toNodeData = Ext.clone(canvas.graph.getCustomData(connectInfo.to)),
                toNodeMeta = toNodeData.metadata,
                toNodeProperties = toNodeData.properties;

            if (fromNodeMeta.type !== 'START' && toNodeMeta.type !== 'END') {
                // 1. 라벨 변경시 inputPathQualifiers, outputPathQualifier 값을 자동 변경
                if (toNodeMeta.type === 'OUT') {
                    toNodeProperties.outputPathQualifier = afterText;
                    canvas.graph.setCustomData(connectInfo.to, toNodeData);
                } else if (fromNodeMeta.type === 'IN') {
                    fromNodeProperties.inputPathQualifiers = afterText;
                    fromNodeProperties.outputPathQualifier = afterText;
                    canvas.graph.setCustomData(connectInfo.from, fromNodeData);
                } else {
                    fromNodeProperties.outputPathQualifier = afterText;
                    canvas.graph.setCustomData(connectInfo.from, fromNodeData);
                }

                if (toNodeMeta.type !== 'OUT') {
                    // 2. 연결된 다른 Edge 라벨에도 같이 적용
                    Ext.each(canvas.graph.getNextEdges(connectInfo.from), function (edge) {
                        var _connectInfo = canvas.graph.getRelatedElementsFromEdge(edge),
                            _toNodeMeta = Ext.clone(canvas.graph.getCustomData(_connectInfo.to)).metadata;
                        if (edge.shape.label !== afterText && _toNodeMeta.type !== 'END' && _toNodeMeta.type !== 'OUT') {
                            canvas.graph.drawLabel(edge, afterText);
                        }
                    }, this);

                    // 3. 컬럼 정보 적용
                    /*
                     Ext.each(canvas.graph.getNextShapes(connectInfo.from), function (ele) {
                     this._applyPrevColumnInfo(ele);
                     }, this);
                     */
                }
            }
        }
    },

    /**
     * 캔버스 패널 NodeChanged 핸들러 : 노드 변경되었을 때 다음 노드로의 식별자, 컬럼구분자, 컬럼정보를 전달한다.
     *
     * @param {Ext.Component} canvas 캔버스패널
     * @param {Element} shapeElement 변경된 노드엘리먼트
     */
    onCanvasNodeChanged: function (canvas, shapeElement) {
        /*
         Ext.each(canvas.graph.getNextShapes(shapeElement), function (element) {
         this._applyPrevColumnInfo(element);
         }, this);
         */
    },

    /**
     * 캔버스 패널 NodeBeforeRemove 핸들러 : 시작, 종료 노드인 경우 삭제를 방지한다.
     *
     * @param {Ext.Component} canvas 캔버스패널
     * @param {Event} event 이벤트
     * @param {Element} element 엘리먼트
     */
    onCanvasNodeBeforeRemove: function (canvas, event, element) {
        var nodeData = Ext.clone(canvas.graph.getCustomData(element));

        // 시작, 종료 노드인 경우 삭제 방지
        if (nodeData && nodeData.metadata &&
            (nodeData.metadata.type === 'START' || nodeData.metadata.type === 'END')) {
            if (canvas.graph.getElementsByShapeId(element.getAttribute("_shape_id")).length === 1) {
                return false;
            }
        }

        return true;
    },

    /**
     * 설명 버튼 Click 핸들러 : 워크플로우 설명을 입력하는 Message Box 를 팝업한다.
     */
    onDescClick: function () {
        var descField = this.getDescField();

        Ext.MessageBox.show({
            title: MSG.DESIGNER_TITLE_WORKFLOW_DESC,
            msg: MSG.DESIGNER_ENTER_WORKFLOW_DESC,
            width: 300,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.INFO,
            multiline: true,
            value: descField.getValue(),
            fn: function (btn, text) {
                if (btn === 'yes') {
                    descField.setValue(text);
                }
            },
            animateTarget: 'wd_btn_desc'
        });
    },

    /**
     * 전체화면 버튼 Click 핸들러 : 워크플로우 디자이너를 새로운 창으로 팝업한다.
     */
    onFullClick: function () {
        window.open('/apps/designer');
    },

    /**
     * 생성 버튼 Click 핸들러 : 워크플로우를 새로 생성하기위해 초기화 한다.
     */
    onCreateClick: function () {
        var drawDefault = this._drawDefaultNode;
        var me = this;

        Ext.MessageBox.show({
            title: MSG.DESIGNER_TITLE_NEW_WORKFLOW,
            msg: MSG.DESIGNER_MSG_CREATE_WORKFLOW,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function handler(btn) {
                if (btn == 'yes') {
                    var canvas = query('canvas');
                    var variableGrid = Ext.ComponentQuery.query('variableGrid')[0];
                    var form = canvas.getForm();

                    // 워크플로우 기본 정보 초기화
                    form.reset();

                    // 워크플로우 변수 정보 로딩
                    variableGrid.getStore().removeAll();

                    // 워크플로우 그래프 Clear
                    canvas.graph.clear();

                    // 디폴트 시작, 끝 노드 드로잉
                    drawDefault();

                    // 툴바 버튼 초기화
                    me.getRunButton().setDisabled(true);
                    me.getWd_btn_xml().setDisabled(true);
                }
            }
        });
    },

    /**
     * 저장 버튼 클릭 핸들러 : 워크플로우를 저장한다.
     */
    onSaveClick: function () {
        var workflow = this;
        var canvas = query('canvas');
        var form = canvas.getForm();
        var id = form.getValues()['id'];
        var isValid = form.isValid() && this._isValidWorkflow();
        var makeXml = this._makeGraphXML;
        var variableGrid = Ext.ComponentQuery.query('variableGrid')[0];
        
        var name = form.getValues()['name'];
        var org_name = form.getValues()['org_name'];    
        
        if (!isValid) {
            return;
        }
      
        Flamingo.Ajax.Request.invokeGet(CONSTANTS.DESIGNER.GET_STATUS, {workflowId: id},
            function (r) {
                var res = Ext.decode(r.responseText);
                if (res.map.count > 0) {
                    workflow._error(MSG.DESIGNER_NOT_SAVE_SCHEDULING);
                } else {
                    var xml = makeXml;
                    if (form.getValues()['id'] != null && form.getValues()['id'] != undefined && form.getValues()['id'] != '') {    
                    	if(name == org_name){
                    		var saveMSG = 'Do you want to update the workflow?';
                    	}else{
                    		var saveMSG = 'Do you want to Add the workflow?';
                    	}
                    }else{             
                    	var saveMSG = 'Do you want to Save the workflow?';
                    };                    
                    Ext.MessageBox.show({
                        title: MSG.DESIGNER_TITLE_SAVE_WORKFLOW,                      
                    	msg: saveMSG,
                        width: 300,
                        buttons: Ext.MessageBox.YESNO,
                        icon: Ext.MessageBox.INFO,
                        scope: this,
                        fn: function (btn, text, eOpts) {
                            if (btn === 'yes') {
                                var canvas = query('canvas');
                                var form = canvas.getForm();

                                if (form.getValues()['id'] != null && form.getValues()['id'] != undefined && form.getValues()['id'] != '') {
                                    var params = {
                                        id: form.getValues()['id'],
                                        workflowId: form.getValues()['workflow_id'],
                                        treeId: form.getValues()['tree_id'],
                                        parentTreeId: form.getValues()['parent_id'],
                                        workflowName: form.getValues()['name'],
                                    	username:CONSTANTS.AUTH.USERNAME	//2015.01.30 whitepoo@onycom.com
                                    };
                                    Flamingo.Ajax.Request.invokePostByXML(CONSTANTS.DESIGNER.SAVE_WORKFLOW, params, xml(),
                                        function (response) {
                                            var obj = Ext.decode(response.responseText);
                                            if (obj.success) {

                                                Ext.ComponentQuery.query('#workflowTreePanel')[0].getStore().load();

                                                msg(MSG.DESIGNER_MSG_SAVE_SUCCESS, MSG.DESIGNER_MSG_SAVED, obj.map.name);

                                                var runButton = Ext.ComponentQuery.query('canvas #wd_btn_run')[0];
                                                runButton.setDisabled(false);

                                                var xmlButton = Ext.ComponentQuery.query('canvas #wd_btn_xml')[0];
                                                xmlButton.setDisabled(false);
                                            } else {
                                                msg(MSG.DESIGNER_MSG_SAVE_FAILURE, obj.error.cause);
                                            }
                                        },
                                        function (response) {
                                            msg(MSG.DESIGNER_MSG_SAVE_FAILURE, response.statusText);
                                        }
                                    );
                                } else {
                                    var popWindow = Ext.create('Ext.Window', {
                                        title: MSG.DESIGNER_TITLE_CHOOSE_SAVE_FOLDER,
                                        width: 450,
                                        height: 300,
                                        modal: true,
                                        resizable: true,
                                        constrain: true,
                                        animateTarget: 'wd_btn_save',
                                        layout: 'fit',
                                        items: {
                                            xtype: 'simpleWorkflow'
                                        },
                                        buttons: [
                                            {
                                                text: MSG.COMMON_OK,
                                                iconCls: 'common-confirm',
                                                handler: function () {
                                                    var treePanel = popWindow.query('treepanel')[0];
                                                    var selectedNode = treePanel.getSelectionModel().getLastSelected();
                                                    var form = canvas.getForm();
                                                    var win = popWindow;

                                                    if (selectedNode && selectedNode.data.leaf == false) {

                                                        var params = {
                                                            id: form.getValues()['id'],
                                                            workflowId: form.getValues()['workflow_id'],
                                                            treeId: form.getValues()['tree_id'],
                                                            parentTreeId: selectedNode.data.id,
                                                            username:CONSTANTS.AUTH.USERNAME, //2015.02.05 수정한 id로 실행한다. whitepoo@onycom.com                                                            
                                                            workflowName: form.getValues()['name'],
                                                            cluster: form.getValues()['hadoopCluster']
                                                        };

                                                        Flamingo.Ajax.Request.invokePostByXML(CONSTANTS.DESIGNER.SAVE_WORKFLOW, params, makeXml(),
                                                            function (response) {
                                                                var obj = Ext.decode(response.responseText);
                                                                if (obj.success) {
                                                                    form.setValues(obj.map);

                                                                    msg(MSG.DESIGNER_MSG_SAVE_SUCCESS, MSG.DESIGNER_MSG_SAVED, obj.map.name);

                                                                    win.close();
                                                                    Ext.ComponentQuery.query('#workflowTreePanel')[0].getStore().load();

                                                                    var runButton = Ext.ComponentQuery.query('canvas #wd_btn_run')[0];
                                                                    runButton.setDisabled(false);

                                                                    var xmlButton = Ext.ComponentQuery.query('canvas #wd_btn_xml')[0];
                                                                    xmlButton.setDisabled(false);
                                                                } else {
                                                                    msg(MSG.DESIGNER_MSG_SAVE_FAILURE, obj.error.cause);
                                                                }
                                                            },
                                                            function (response) {
                                                                msg(MSG.DESIGNER_MSG_SAVE_FAILURE, response.statusText);
                                                            }
                                                        );
                                                    } else {
                                                        msg(MSG.COMMON_WARN, MSG.DESIGNER_MSG_CHOOSE_SAVE_FOLDER);
                                                    }
                                                }
                                            }
                                        ]
                                    }).show();
                                }
                            }
                        },
                        animateTarget: 'wd_btn_save'
                    });
                }
            },
            function (failure) {
                msg(MSG.COMMON_WARN, MSG.DESIGNER_MSG_NOT_CHECK_WORKFLOW);
            }
        );
    },

    /**
     * 실행 버튼 Click 핸들러 : 워크플로우를 실행한다.
     */
    onRunClick: function () {
        log('1');
        var canvas = query('canvas');
        log('2');
        var form = canvas.getForm();
        log('3');
        var isValid = form.isValid() && this._isValidWorkflow();
        log('4');

        if (!isValid) {
            return;
        }
        log('5');

        if (form.getValues()['engine_id']) {
            var id = form.getValues()['id'];
            var engineId = form.getValues()['engine_id'];
            var visual_run_code = "ankus-visualization-0.1.0.jar BarChart -input /hdfs_barplot_input_dir -output /barplot_output -useFirstRecord false -xIndex 0 -yIndexList 1,2";
            var params = {
                id: id,
                engineId: engineId,
                //for visualization test whitepoo@onycom.com
                //visual_run_code:visual_run_code
            };

            log('6');
            Ext.MessageBox.show({
                title: MSG.DESIGNER_MSG_RUN_WORKFLOW,
                msg: MSG.DESIGNER_MSG_RUN_WORKFLOW_YESNO,
                width: 300,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.INFO,
                scope: this,
                fn: function (btn, text, eOpts) {
                    if (btn === 'yes') {
                        Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.DESIGNER.RUN_WORKFLOW, params,
                        //Flamingo.Ajax.Request.invokePostByMap("/designer/visualization_run", params,
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    log('8');
                                    msg(MSG.DESIGNER_MSG_RUN_SUCCESS, MSG.DESIGNER_MSG_PERFORMED, obj.map.name);
                                } else {
                                    log('9');
                                    msg(MSG.DESIGNER_MSG_FAIL_RUN, obj.error.cause);
                                }
                            },
                            function (response) {
                                log('7');
                                msg(MSG.DESIGNER_MSG_FAIL_RUN, response.statusText);
                            }
                        );
                    }
                },
                animateTarget: 'wd_btn_run'
            });
        } else {
            msg(MSG.COMMON_WARN, MSG.DESIGNER_MSG_CHOOSE_CLUSTER);
        }
    },

    /**
     * XML보기 버튼 Click 핸들러 : 워크플로우 XML 을 팝업으로 보여준다.
     */
    onWorkflowXMLClick: function () {
        var workflow = this;
        var canvas = query('canvas');
        var form = canvas.getForm();
        var id = form.getValues()['id'];

        Flamingo.Ajax.Request.invokeGet(CONSTANTS.DESIGNER.SHOW_XML, {id: id},
            function (response) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    var xmlWin = Ext.create('Ext.window.Window', {
                        title: MSG.DESIGNER_MSG_WORKFLOW_XML,
                        width: 750,
                        height: 500,
                        layout: 'fit',
                        modal: true,
                        closeAction: 'hide',
                        buttons: [
                            {
                                text: MSG.COMMON_OK,
                                iconCls: 'common-confirm',
                                handler: function () {
                                    xmlWin.close();
                                }
                            }
                        ],
                        items: [
                            {
                                xtype: 'panel',
                                border: false,
                                layout: 'fit',
                                items: [
                                    {
                                        xtype: 'codemirror',
                                        name: 'xml',
                                        flex: 1,
                                        padding: '5 5 5 5',
                                        pathModes: '/resources/lib/codemirror-2.35/mode',
                                        pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                        readOnly: true,
                                        lineNumbers: true,
                                        lineWrapping: true,
                                        matchBrackets: true,
                                        indentUnit: 2,
                                        mode: "application/xml",
                                        showModes: false,
                                        value: unescape(obj.map.xml),
                                        modes: [
                                            {
                                                mime: ['application/xml'],
                                                dependencies: ['xml/xml.js']
                                            }
                                        ],
                                        extraKeys: {
                                            "Ctrl-Space": "autocomplete",
                                            "Tab": "indentAuto"
                                        }
                                    }
                                ]
                            }
                        ],
                        animateTarget: 'wd_btn_xml'
                    }).center().show();
                }
            },
            function (response) {
                msg(MSG.DESGINER_MSG_LOADING_FAILURE, response.statusText);
            }
        );
    },

    /**
     * 워크플로우 그래프의 노드 연결 Validation 을 체크한다.
     *
     * @return {Boolean}
     * @private
     */
    _isValidWorkflow: function () {
        var canvas = query('canvas'),
            getPropertyWindow = this._getPropertyWindow,
            allNodes = canvas.graph.getElementsByType(),
            nodeData, nodeMeta, nodeProperties,
            prevShapes, nextShapes,
            nextOfPrevShapes, prevOfNextShapes, count = 0, customData,
            propertyWindow;

        canvas.graph.removeAllGuide();

        for (var i = 0; i < allNodes.length; i++) {
            nodeData = Ext.clone(canvas.graph.getCustomData(allNodes[i]));
            if (nodeData && nodeData.metadata) {
                nodeMeta = nodeData.metadata;
                nodeProperties = nodeData.properties;
                prevShapes = canvas.graph.getPrevShapes(allNodes[i]);
                nextShapes = canvas.graph.getNextShapes(allNodes[i]);

                // 1. 이후 노드 최소 연결 노드 수 체크
                if (nodeMeta.minNextNodeCounts >= 0 && nextShapes.length < nodeMeta.minNextNodeCounts) {
                    this._error(Ext.String.format(MSG.DESIGNER_MSG_AFTER_LEAST, nodeMeta.name, nodeMeta.minNextNodeCounts));
                    return false;
                }

                // 2. 이전 노드 최소 연결 노드 수 체크
                if (nodeMeta.minPrevNodeCounts >= 0 && prevShapes.length < nodeMeta.minPrevNodeCounts) {
                    this._error(Ext.String.format(MSG.DESIGNER_MSG_FRONT_LEAST, nodeMeta.name, nodeMeta.minPrevNodeCounts));
                    return false;
                }

                // 3. START 노드와 직접 연결된 노드는 IN 타입 노드와 반드시 1개 이상 연결 되어야 함
                if (nodeMeta.type === 'START') {
                    for (var j = 0; j < nextShapes.length; j++) {
                        customData = Ext.clone(canvas.graph.getCustomData(nextShapes[j]));

                        // ignoreInput 이 false 인 경우 체크
                        if (customData.metadata.ignoreInput !== true) {
                            prevOfNextShapes = canvas.graph.getPrevShapes(nextShapes[j]);
                            count = 0;
                            for (var k = 0; k < prevOfNextShapes.length; k++) {
                                customData = Ext.clone(canvas.graph.getCustomData(prevOfNextShapes[k]));
                                if (customData && customData.metadata.type === 'IN') {
                                    count++;
                                }
                            }

                            if (count < 1) {
                                canvas.graph.getEventHandler().selectShape(nextShapes[j]);
                                this._error(MSG.DESIGNER_MSG_NEED_START_NODE);
                                return false;
                            }
                        }
                    }
                }

                // 4. END 노드와 직접 연결된 노드는 OUT 타입 노드와 반드시 1개 이상 연결 되어야 함
                if (nodeMeta.type === 'END') {
                    for (var j = 0; j < prevShapes.length; j++) {
                        customData = Ext.clone(canvas.graph.getCustomData(prevShapes[j]));

                        // ignoreOutput 이 false 인 경우 체크
                        if (customData.metadata.ignoreOutput !== true) {
                            nextOfPrevShapes = canvas.graph.getNextShapes(prevShapes[j]);
                            count = 0;
                            for (var k = 0; k < nextOfPrevShapes.length; k++) {
                                customData = Ext.clone(canvas.graph.getCustomData(nextOfPrevShapes[k]));
                                if (customData && customData.metadata.type === 'OUT') {
                                    count++;
                                }
                            }

                            if (count < 1) {
                                canvas.graph.getEventHandler().selectShape(prevShapes[j]);
                                msg(MSG.COMMON_PATH, MSG.DESIGNER_MSG_NEED_END_NODE);
                                return false;
                            }
                        }
                    }
                }

                // 5. 노드 프라퍼티 form validation 체크
                if (Ext.isDefined(nodeData.isValidated) && !nodeData.isValidated) {
                    propertyWindow = getPropertyWindow(allNodes[i]);
                    console.info(allNodes[i]);
                    if (propertyWindow) {
                    	var jarfile = propertyWindow.items.items[0].xtype;    
                    	
                    	var nodeData = Ext.clone(canvas.graph.getCustomData(allNodes[i])),
                        nodeMeta = nodeData ? nodeData.metadata : null,
                        nodeProperty = nodeData ? nodeData.properties : null,
                        popWindow;
                    	
                   		var jar_setvalue = propertyWindow.down('#CODENAME_VAR').getValue();                
                        if(jar_setvalue.length == 0)
                        {
                           	//NEW NODE
                        	if (propertyWindow)
                        	{                
                        	
                        		Ext.Ajax.request({
        								url:'/mrjar/get',
        								method:'GET',
        								params:{
        									 'method':'gubun'
        								},
        								success:function( result, request )
        								{
        									var jsonData = Ext.JSON.decode( result.responseText );//ExtJS4      
        									//console.info(jsonData.data.CODENAME);
        									if(jsonData.success == "true" && jarfile != 'ALG_ANKUS_COMMON_INPUT'){ 
        							    	    propertyWindow.down('#CODENAME_VAR').setValue(jsonData.data.CODENAME_VAR);
        							    	}
        									else{
        										//console.info(result);
        									}     	                       	                	     	                         	 
        								},
        								failure: function( result, request ){
        									Ext.Msg.alert( "Failed", result.responseText );
        								}      	                         				
        		      	      			});
        					} 
                        }; 
                        
                        if(jarfile == 'ALG_ANKUS_COMMON_INPUT'){
                        	
                        	if(propertyWindow){
                            	Ext.Ajax.request({
            						url:'/getmoduleinfos',
            						method:'POST',						
            						success:function( result, request )
            						{
            							
            							var jsonData = Ext.JSON.decode( result.responseText ); 
            							var classnm = nodeMeta.className;
            							
            							for(j=0 ; j < jsonData.length ; j++){
            								
            								if(jsonData[j].classname == classnm){
            									Ext.getCmp('driver').setValue(jsonData[j].drive); 
            	    							Ext.getCmp('CODENAME_VAR').setValue(jsonData[j].nexus);
            	    														
            	    							for(i=0; i< jsonData[j].params.length; i++) {   
            	    								var type= jsonData[j].params[i].type;
            	    								    	    								
            	    								if(type == 'columnindex'){
            	    									var v_id = jsonData[j].params[i].name;
            	    									var v_allow = jsonData[j].params[i].required;
            	    									
            	    									if(v_allow == 'Y'){
            	    										v_allow = false;
            	    									}else{
            	    										v_allow = true;
            	    									}
            	    									
            	    									Ext.getCmp('jsonForm').add(
            											{
            												xtype: 'fieldcontainer',							
            												layout: 'hbox',	    												
            												items: [    	    												
            												        {
        															 xtype:'textfield',
        															 name:jsonData[j].params[i].name,
        															 labelWidth:200,
        															 id:v_id,
        															 flex: 1,
        															 fieldLabel:jsonData[j].params[i].description,	
        															 allowBlank:v_allow															 
        															},
            	    												{
            		    	    										xtype: 'button',
            		    	    										text: '+',
            		    	    										itemid: v_id,
            		    	    										handler: function (grid, rowIndex, colIndex) {
            		    	    											
            		    	    											Ext.create('Flamingo.view.designer.FilePreview', {targetFieldId:this.itemid});
            		    	    										}
            		    	    									}
            		    	    									
        														]
            	    									});
            	    									
            	    								}
            	    								
            	    								if(type == 'text'){
            	    									var v_id = jsonData[j].params[i].name;
            	    									var v_allow = jsonData[j].params[i].required;
            	    									
            	    									if(v_allow == 'Y'){
            	    										v_allow = false;
            	    									}else{
            	    										v_allow = true;
            	    									}
            	    									
            	    									Ext.getCmp('jsonForm').add(
            											{
            												 xtype:"textfield",    												 
            												 id:jsonData[j].params[i].name,
            												 name:jsonData[j].params[i].name,
            												 labelWidth:200,
            												 width:450,
            												 flex: 1,
            												 fieldLabel:jsonData[j].params[i].description,
            												 allowBlank:v_allow,			 		 
            												 value:jsonData[j].params[i].values
            											});
            	    								}
            	    								
            	    								if(type == 'boolean'){
            	    									var v_id = jsonData[j].params[i].name;
            	    									var v_allow = jsonData[j].params[i].required;
            	    									
            	    									if(v_allow == 'Y'){
            	    										v_allow = false;
            	    									}else{
            	    										v_allow = true;
            	    									}
            	    									
            	    									Ext.getCmp('jsonForm').add(
            											{
            												 xtype:"radiogroup",
            												 itemId:jsonData[j].params[i].name,
            												 id:jsonData[j].params[i].name,
            												 labelWidth:200,
            												 fieldLabel:jsonData[j].params[i].description,
            												 allowBlank:v_allow,			 		 
            												 columns:2,
            												 items:[
            														{
            														xtype:"radiofield",
            														boxLabel:"True",
            														name:jsonData[j].params[i].name,
            														checked:true, 	                  
            														inputValue:"true"
            														},
            														{
            														xtype:"radiofield",
            														boxLabel:"False",
            														name:jsonData[j].params[i].name,
            														checked:false, 	
            										                inputValue:"false"
            										                }	
            													]
            												}
            	    									);
            	    								}
            	    								
            	    								/*
            	    								else{
            	    									var combodata = jsonData[j].params[i].data;
            	    									Ext.getCmp('jsonForm').add(    											
            	    											{
            	    												xtype: xtype,
            	    												fieldLabel: jsonData[j].params[i].fieldLabel,
            	    			                                    name: jsonData[j].params[i].name,
            	    			                                    value: jsonData[j].params[i].value,
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
            	    			                                        data: combodata
            	    			                                    })	
            	    											}
            	    									);
            	    								}
            	    								*/
            	    						     };
            								}
            							}    							
            						     
            						     var jsonForm = Ext.getCmp('jsonForm'); 
            						     //console.info(jsonForm.items.items.length);
            						     
            						     
                  					     for(var i=0; i<jsonForm.items.items.length; i++){
                  					    	
                  					    	var name;
                  					    	
                  					    	if(jsonForm.items.items[i].xtype == 'fieldcontainer'){
                  					    		name = jsonForm.items.items[i].items.keys[0]; 
                  					    	}else{
                  					    		name = jsonForm.items.items[i].id;
                  					    	}          					    	 
                  					    	//console.info(name);
                  					    	//console.info(jsonForm.items.items[i].xtype);
                  					    	for(var key in nodeProperty) {
                  					    	    var value = nodeProperty[key];
                  					    	  if(key === name){
                  					    		if(jsonForm.items.items[i].xtype == 'fieldcontainer'){
                  					    			jsonForm.items.items[i].items.items[0].setValue(value);
                      					    	}else if(jsonForm.items.items[i].xtype == 'radiogroup'){
                      					    		jsonForm.items.items[i].items.get(0).setValue(value);
                      					    	}else if(jsonForm.items.items[i].xtype == 'textfield'){              					    		
                      					    		jsonForm.items.items[i].setValue(value);
                      					    	} 
                  					    		
                  					    	  }
                  					    	}
                  					     }
            						     
            						},
            						failure: function( result, request ){
            							Ext.Msg.alert( "Failed", result.responseText );
            						}      	                         				
                  	      			});
                            }
                        }
                        propertyWindow.show();
                        propertyWindow.child(nodeMeta.identifier).isFormValid();
                        return false;
                    }
                }
            }
        }

        return true;
    },

    /**
     * 디폴트 시작, 끝 노드를 드로잉한다.
     * @private
     */
    _drawDefaultNode: function () {
        var canvas = query('canvas'),
            nodeMetaStore = Ext.create('Flamingo.store.designer.NodeMeta'), startNode, endNode;
        	//console.info(nodeMetaStore);
        if (canvas.graph) {
            startNode = canvas.graph.drawShape([100, 100], new OG.E_Start('Start'), [30, 30]);
            endNode = canvas.graph.drawShape([500, 100], new OG.E_End('End'), [30, 30]);

            canvas.graph.setCustomData(startNode, {
                metadata: nodeMetaStore.getById('START').data
            });
            canvas.graph.setCustomData(endNode, {
                metadata: nodeMetaStore.getById('END').data
            });
        }
    },

    /**
     * 프라퍼티 윈도우 인스턴스를 생성하여 반환한다.
     *
     * @param {Element} graphElement 그래프 엘리먼트
     * @return {Ext.Window}
     * @private
     */
    _getPropertyWindow: function (graphElement) {
        var canvas = query('canvas'),
            nodeData = Ext.clone(canvas.graph.getCustomData(graphElement)),
            nodeMeta = nodeData ? nodeData.metadata : null,
            nodeProperty = nodeData ? nodeData.properties : null,
            popWindow;

        if (nodeMeta && nodeProperty) {
            popWindow = Ext.create('Ext.Window', {
                title: nodeMeta.name,
                modal: true,
                resizable: true,
                constrain: true,
                animateTarget: graphElement,
                layout: 'fit',
                tools: [
                    {
                        type: 'print',
                        tooltip: 'Print',
                        handler: function (event, toolEl, panel) {
                            var node = popWindow.child(nodeMeta.identifier);
                            if (console) console.log(node);
                            if (console) console.log(nodeMeta);
                            if (console) console.log(node.getNodeProperties());
                            if (console) console.log(node.getFilteredNodeProperties());
                        }
                    }
                ],
                items: {
                    xtype: nodeMeta.identifier,
                    nodeData: nodeData,
                    shapeElement: graphElement
                },
                buttonAlign: 'center',
                buttons: [
                    {
                        text: MSG.COMMON_OK,
                        iconCls: 'common-confirm',
                        handler: function () {
                            // 노드 프라퍼티 유효성 체크한 후 Graph Element 에 커스텀 데이터로 저장
                            var node = popWindow.child(nodeMeta.identifier), isChanged = false;
                            if (node.isFormValid()) {
                                isChanged = Ext.encode(Ext.clone(canvas.graph.getCustomData(graphElement)).properties) !== Ext.encode(node.getNodeProperties());

                                nodeData.properties = node.getNodeProperties();
                                nodeData.filteredProperties = node.getFilteredNodeProperties();
                                nodeData.isValidated = true;
                                node.nodeData = nodeData;
                                canvas.graph.setCustomData(graphElement, node.nodeData);

                                if (isChanged) {
                                    // nodeChanged 이벤트 발생시켜 컬럼 정보 적용
                                    canvas.fireEvent('nodeChanged', canvas, graphElement);
                                }

                                popWindow.close();
                            }
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
            });
        }

        return popWindow;
    },

    /**
     * 워크플로우 그래프 XML 을 생성한다.
     *
     * @return {String}
     * @private
     */
    _makeGraphXML: function () {
        var canvas = query('canvas');
        var form = canvas.getForm(),
            variableGrid = Ext.ComponentQuery.query('variableGrid')[0],
            variableArray = [];

        // shjeon 2014.02.07, variableGrid 제거 - 필요없는 옵션
        variableGrid.getStore().each(function (record, idx) {
            variableArray.push({
                name: record.get('name'),
                value: record.get('value')
            });
        });

        canvas.graph.setCustomData(canvas.graph.getRootGroup(), {
            workflow: form.getValues(),
            globalVariables: variableArray
        });

        return canvas.graph.toXML();
    },

    /**
     * 이전 노드들의 식별자, 컬럼구분자, 컬럼정보를 현재 노드에 적용한다.
     *
     * @param {Element} element
     * @private
     */
    _applyPrevColumnInfo: function (element) {
        var canvas = query('canvas'),
            nodeData = Ext.clone(canvas.graph.getCustomData(element)),
            nodeMeta = nodeData ? nodeData.metadata : {},
            nodeProperties = nodeData ? nodeData.properties : {},
            prevShapes, prevNodeData, prevNodeMeta, prevNodeProperties,
            nextShapes,
            columnNames, columnKorNames, columnTypes, columnDescriptions,
            delimiterType, delimiterValue;

        // 이전 노드들의 컬럼구분자, 컬럼정보를 현재 노드에 적용
        if (nodeMeta.type && nodeMeta.type !== 'START' && nodeMeta.type !== 'END') {
            var hashMap = new Ext.util.HashMap(), prevQualifiers = [], prevDelimiterValue;

            prevShapes = canvas.graph.getPrevShapes(element);
            for (var i = 0; i < prevShapes.length; i++) {
                prevNodeData = Ext.clone(canvas.graph.getCustomData(prevShapes[i]));
                prevNodeMeta = prevNodeData ? prevNodeData.metadata : {};
                prevNodeProperties = prevNodeData ? prevNodeData.properties : {};

                if (prevNodeMeta.type && prevNodeMeta.type !== 'START') {
                    delimiterType = prevNodeProperties.delimiterType;
                    delimiterValue = prevNodeProperties.delimiterValue;

                    // 1. 컬럼구분자, 컬럼명이 일치 해야하는 경우 연결 유효성 체크 -> 컬럼정보설정
                    if (nodeMeta.fixedInputColumns === true || nodeMeta.isCheckColumns === true) {
                        // 이전 노드와 컬럼정보 체크하여 불일치시 연결 해제 처리
                        if (!Ext.isEmpty(prevNodeProperties.columnNames) && !Ext.isEmpty(nodeProperties.prevColumnNames) && !Ext.isEmpty(nodeProperties.prevDelimiterValue) &&
                            (!this._checkColumnInfo(prevNodeProperties, nodeProperties) || !(prevNodeProperties.delimiterType === nodeProperties.prevDelimiterValue ||
                                prevNodeProperties.delimiterValue === nodeProperties.prevDelimiterValue))) {
                            if (this._disconnect(prevShapes[i], element)) {
                                msg(MSG.COMMON_INFO, MSG.DESIGNER_MSG_COL_CHANGE_LOST_CON);
                                this._info(MSG.DESIGNER_MSG_COL_CHANGE_LOST_CON);
                                break;
                            }
                        } else {
                            // 컬럼구분자, 컬럼명이 일치해야하는 경우 최종 정보 적용
                            Ext.each(['columnNames', 'columnKorNames', 'columnTypes', 'columnDescriptions'], function (field) {
                                if (Ext.isDefined(prevNodeProperties[field])) {
                                    hashMap.add(field, prevNodeProperties[field].split(','));
                                }
                            });
                        }

                        // 이전 노드 구분자
                        prevDelimiterValue = delimiterType === 'CUSTOM' ? delimiterValue : delimiterType;
                    }
                    // 2. 컬럼구분자, 컬럼명이 일치 안해도 되는 경우 Append
                    else {
                        if (Ext.isEmpty(prevNodeProperties.columnNames)) {
                            if (this._disconnect(prevShapes[i], element)) {
                                msg(MSG.COMMON_INFO, MSG.DESIGNER_MSG_NO_COLUMN_INFO);
                                this._info(MSG.DESIGNER_MSG_NO_COLUMN_INFO);
                                break;
                            }
                        }

                        // 컬럼정보 append
                        Ext.each(['columnNames', 'columnKorNames', 'columnTypes', 'columnDescriptions'], function (field) {
                            if (Ext.isDefined(prevNodeProperties[field])) {
                                if (hashMap.containsKey(field)) {
                                    hashMap.get(field).push(prevNodeProperties[field].split(','));
                                } else {
                                    hashMap.add(field, prevNodeProperties[field].split(','));
                                }
                            }
                        });

                        // 식별자 append
                        Ext.each(prevNodeProperties.columnNames.split(','), function () {
                            prevQualifiers.push(prevNodeProperties.outputPathQualifier);
                        });

                        // 이전 노드 구분자
                        prevDelimiterValue = delimiterType === 'CUSTOM' ? delimiterValue : delimiterType;
                    }
                }
            }

            columnNames = hashMap.containsKey('columnNames') ? hashMap.get('columnNames').toString() : "";
            columnKorNames = hashMap.containsKey('columnKorNames') ? hashMap.get('columnKorNames').toString() : "";
            columnTypes = hashMap.containsKey('columnTypes') ? hashMap.get('columnTypes').toString() : "";
            columnDescriptions = hashMap.containsKey('columnDescriptions') ? hashMap.get('columnDescriptions').toString() : "";

            // 3. OUT 타입이면 출력컬럼에 이전 노드 출력컬럼을 자동으로 설정
            if (nodeMeta.type === 'OUT' && nodeMeta.fixedOutputColumns !== true) {
                nodeProperties.columnNames = columnNames;
                nodeProperties.columnKorNames = columnKorNames;
                nodeProperties.columnTypes = columnTypes;
                nodeProperties.columnDescriptions = columnDescriptions;
                nodeProperties.delimiterType = delimiterType || nodeProperties.delimiterType;
                nodeProperties.delimiterValue = delimiterValue || nodeProperties.delimiterValue;
                if (nodeMeta.fixedInputColumns !== true) {
                    nodeProperties.prevDelimiterValue = prevDelimiterValue;
                }

                nodeData.isValidated = false;
                canvas.graph.setCustomData(element, nodeData);
            }
            // 4. 컬럼정보 변경 여부 체크하여 변경된 경우 입력컬럼 정보 적용
            else if (!this._checkColumnInfo(
                {
                    'columnNames': columnNames,
                    'columnTypes': columnTypes
                }, nodeProperties) ||
                prevQualifiers.toString() !== nodeProperties.prevQualifier ||
                prevDelimiterValue !== nodeProperties.prevDelimiterValue) {

                // 입력컬럼이 고정인 경우는 변경하지 않음
                if (nodeMeta.fixedInputColumns !== true) {
                    nodeProperties.prevDelimiterValue = prevDelimiterValue;
                    nodeProperties.prevQualifier = prevQualifiers.toString();
                    nodeProperties.prevColumnNames = columnNames;
                    nodeProperties.prevColumnKorNames = columnKorNames;
                    nodeProperties.prevColumnTypes = columnTypes;
                    nodeProperties.prevColumnDescriptions = columnDescriptions;

                    nodeData.isValidated = false;
                    canvas.graph.setCustomData(element, nodeData);
                }

                // 출력컬럼이 고정인 경우는 변경하지 않음
                if (nodeMeta.fixedOutputColumns !== true) {
                    // readOnlyOutputColumns 가 true 이고 입력컬럼정보가 없는 경우 출력컬럼 리셋처리
                    if (nodeMeta.readOnlyOutputColumns === true && Ext.isEmpty(columnNames)) {
                        nodeProperties.columnNames = columnNames;
                        nodeProperties.columnKorNames = columnKorNames;
                        nodeProperties.columnTypes = columnTypes;
                        nodeProperties.columnDescriptions = columnDescriptions;
                    }
                    nodeProperties.delimiterType = delimiterType || nodeProperties.delimiterType;
                    nodeProperties.delimiterValue = delimiterValue || nodeProperties.delimiterValue;

                    nodeData.isValidated = false;
                    canvas.graph.setCustomData(element, nodeData);

                    // recursive 하게 다음 노드에도 적용
                    nextShapes = canvas.graph.getNextShapes(element);
                    for (i = 0; i < nextShapes.length; i++) {
                        // recursive call
                        this._applyPrevColumnInfo(nextShapes[i]);
                    }
                }
            }
        }
    },

    /**
     * 이전, 이후 노드의 입,출력 컬럼 정보 일치 여부를 체크한다.
     *
     * @param {Object} prevProperties 이전 노드 프라퍼티
     * @param {Object} nextProperties 이후 노드 프라퍼티
     * @return {Boolean} 일치여부(true:일치, false:불일치)
     * @private
     */
    _checkColumnInfo: function (prevProperties, nextProperties) {
        return !(prevProperties.columnNames !== nextProperties.prevColumnNames ||
            prevProperties.columnTypes !== nextProperties.prevColumnTypes);
    },

    /**
     * 주어진 두 노드의 연결을 해제한다.
     *
     * @param {Element} prevShape 이전 노드
     * @param {Element} nextShape 이후 노드
     * @return {Boolean} 연결해제여부
     * @private
     */
    _disconnect: function (prevShape, nextShape) {
        var canvas = query('canvas'),
            edges = canvas.graph.getNextEdges(prevShape),
            _fromedge = nextShape.getAttribute("_fromedge").split(",");

        for (var i = 0; i < edges.length; i++) {
            for (var j = 0; j < _fromedge.length; j++) {
                if (edges[i].id === _fromedge[j]) {
                    canvas.graph.removeShape(edges[i]);
                    return true;
                }
            }
        }
        return false;
    },

    onRenameWorkflowClick: function () {
        var treepanel = Ext.ComponentQuery.query('workflowTree > treepanel')[0];
        var selModel = treepanel.getSelectionModel();
        var node = selModel.getLastSelected();

        if (node === null || node.leaf) {
            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_CHANGE_NAME, msg: MSG.DESIGNER_MSG_CHOOSE_CHANGE_NAME,
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        if (node.get('id') == '/') {
            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_CHANGE_NAME, msg: MSG.DESIGNER_MSG_NOT_CHANGE_ROOT,
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        Ext.MessageBox.prompt(MSG.DESIGNER_TITLE_CHANGE_NAME, MSG.DESIGNER_MSG_ENTER_NAME, function (btn, text) {
            if (btn == 'ok') {
                var param = {
                    id: '' + node.get('id'),
                    name: text
                };

                Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.REST_RENAME_TREE, param,
                    function (response) {
                        var obj = Ext.decode(response.responseText);
                        if (obj.success) {
                            treepanel.getStore().load();
                        } else {
                            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_CHANGE_NAME, msg: MSG.DESIGNER_MSG_NOT_CHANGE_NAME + ' ' + MSG.DESIGNER_CAUSE + ':' + obj.error.cause,
                                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                            });
                        }
                    },
                    function (response) {
                        Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_CHANGE_NAME, msg: MSG.DESIGNER_MSG_NOT_CHANGE_NAME,
                            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                        });
                    }
                );
            }
        }, this, false, node.get('text'));
    },

    onCreateFolderClick: function () {
        var treepanel = Ext.ComponentQuery.query('workflowTree > treepanel')[0];
        var selModel = treepanel.getSelectionModel();
        var node = selModel.getLastSelected();

        if (!Ext.isDefined(node) || node.isLeaf()) {
            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_CREATE_FOLDER, msg: MSG.DESIGNER_MSG_CHOOSE_FOLDER,
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        Ext.MessageBox.show({
            title: MSG.DESIGNER_TITLE_CREATE_FOLDER,
            msg: MSG.DESIGNER_MSG_ENTER_FOLDERNAME,
            width: 300,
            prompt: true,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.INFO,
            multiline: false,
            value: 'folder',
            fn: function (btn, text) {
                if (btn === 'yes') {
                    var param = {
                        id: '' + node.data.id,
                        text: node.data.text,
                        name: text,
                        nodeType: 'folder',
                        treeType: CONSTANTS.TREE_NODE_TYPE
                    };

                    Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.TREE.NEW, param,
                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                treepanel.getStore().load();
                            } else {
                                Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_CREATE_FOLDER, msg: MSG.DESIGNER_MSG_NOT_CREATE_FOLDER + ' ' + MSG.DESIGNER_CAUSE + ':' + obj.error.message,
                                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                });
                            }
                        },
                        function (response) {
                            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_CREATE_FOLDER, msg: MSG.DESIGNER_MSG_NOT_CREATE_FOLDER,
                                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                            });
                        }
                    );
                }
            }
        });
    },

    /**
     * 선택한 워크플로우를 삭제한다.
     */
    onDeleteWorkflowClick: function () {
        var treepanel = Ext.ComponentQuery.query('workflowTree > treepanel')[0];
        var selModel = treepanel.getSelectionModel();
        var node = selModel.getLastSelected();

        if (!node) {
            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_DELETE_WORKFLOW, msg: MSG.DESIGNER_MSG_CHOOSE_DELETE,
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        if (node.get('id') == '/') {
            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_DELETE_WORKFLOW, msg: MSG.DESIGNER_MSG_NOT_DELETE_ROOT,
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        if (node.get('job') > 0) {
            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_DELETE_WORKFLOW, msg: MSG.DESIGNER_MSG_NOT_BATCH_REGISTER,
                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var selectedNode = node;
        Ext.MessageBox.show({
            title: MSG.DESIGNER_TITLE_DELETE_WORKFLOW,
            msg: Ext.String.format(MSG.DESIGNER_MSG_DELETE_YN, node.get('text')),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function handler(btn) {
                if (btn == 'yes') {

                    var param = {
                        id: '' + selectedNode.data.id,
                        workflowId: '' + selectedNode.raw.workflowId,
                        text: selectedNode.data.text,
                        nodeType: selectedNode.data.cls,
                        leaf: selectedNode.data.cls == 'file' ? 'true' : 'false',
                        treeType: CONSTANTS.TREE_NODE_TYPE
                    };

                    Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.DESIGNER.DELETE, param,
                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                treepanel.getStore().load();

                                /////////////////////////////////////////////////////////
                                // 현재 로딩한 화면과 삭제할 트리 노드가 동일하다면 캔버스도 초기화한다.
                                /////////////////////////////////////////////////////////

                                var canvas = query('canvas');
                                var variableGrid = Ext.ComponentQuery.query('variableGrid')[0];
                                var form = canvas.getForm();
                                var treeId = form.getValues()['tree_id'];
                                var startNode, endNode;

                                if (param.id == treeId) {
                                    // 워크플로우 기본 정보 초기화
                                    form.reset();

                                    // 워크플로우 변수 정보 로딩
                                    variableGrid.getStore().removeAll();

                                    // 워크플로우 그래프 Clear
                                    canvas.graph.clear();

                                    if (canvas.graph) {
                                        startNode = canvas.graph.drawShape([100, 100], new OG.E_Start('Start'), [30, 30]);
                                        endNode = canvas.graph.drawShape([700, 100], new OG.E_End('End'), [30, 30]);

                                        canvas.graph.setCustomData(startNode, {
                                            metadata: {
                                                "type": "START",
                                                "identifier": "START",
                                                "name": "Start",
                                                "minPrevNodeCounts": "0",
                                                "maxPrevNodeCounts": "0",
                                                "minNextNodeCounts": "1",
                                                "maxNextNodeCounts": "N",
                                                "notAllowedPrevTypes": "",
                                                "notAllowedNextTypes": "END,IN,OUT",
                                                "notAllowedPrevNodes": "",
                                                "notAllowedNextNodes": "END"
                                            }
                                        });
                                        canvas.graph.setCustomData(endNode, {
                                            metadata: {
                                                "type": "END",
                                                "identifier": "END",
                                                "name": "End",
                                                "minPrevNodeCounts": "1",
                                                "maxPrevNodeCounts": "N",
                                                "minNextNodeCounts": "0",
                                                "maxNextNodeCounts": "0",
                                                "notAllowedPrevTypes": "START,IN,OUT",
                                                "notAllowedNextTypes": "",
                                                "notAllowedPrevNodes": "START",
                                                "notAllowedNextNodes": ""
                                            }
                                        });
                                    }
                                }
                            } else {
                                Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_DELETE_WORKFLOW, msg: MSG.DESIGNER_MSG_NOT_DELETE_WORKFLOW + ' ' + MSG.DESIGNER_CAUSE + ':' + obj.error.cause,
                                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                });
                            }
                        },
                        function (response) {
                            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_DELETE_WORKFLOW, msg: MSG.DESIGNER_MSG_NOT_DELETE_WORKFLOW,
                                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                            });
                        }
                    );
                }
            }
        });
    },

    /**
     * 에러메시지를 팝업한다.
     *
     * @param {String} message
     * @private
     */
    _error: function (message) {
        var statusBar = Ext.ComponentQuery.query('workflowStatusBar')[0];
        if (statusBar) {
            Ext.defer(function () {
                statusBar.setStatus({
                    text: message,
                    iconCls: 'x-status-error',
                    clear: true
                });
            }, 2500);
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
        var statusBar = Ext.ComponentQuery.query('workflowStatusBar')[0];
        if (statusBar) {
            Ext.defer(function () {
                statusBar.setStatus({
                    text: message,
                    iconCls: 'x-status-valid',
                    clear: true
                });
            }, 2500);
        }
    }
});