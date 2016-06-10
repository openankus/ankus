/**
 * Copyright (C) 2011  ankus Framework (http://www.openankus.org).
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

Ext.define('Flamingo.view.visualization.ChartParameterPanel', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.chartParameterPanel',
    requires: [
               'Flamingo.view.visualization.CommonParameter',
               'Flamingo.view.visualization.WorkflowHistory'
	],

	layout: 'auto',
	border: false,
	overflowX: false,
	overflowY: false,
	
	setParameters: function(xmlDoc, engineId, engineName) {
		
		var mapreduceStore = Ext.create('Ext.data.Store', { 
			fields: ['jar', 'className'],
			data: xmlDoc,
			proxy: {
				type: 'memory',
				reader: {
					type: 'xml',
					record: 'mapreduce',
					root: 'mapreduce',
					
				}
			}
		});
		
		var variableStore = Ext.create('Ext.data.Store', { 
			fields: ['variable'],
			data: xmlDoc,
			proxy: {
				type: 'memory',
				reader: {
					type: 'xml',
					record: 'variable',
					root: 'command',
					
				}
			}
		});
		console.log(mapreduceStore.data.get(0));
		console.log(variableStore.data);
	
		var count = variableStore.data.getCount();
		var chartParameter = {};
			chartParameter['jar'] = mapreduceStore.data.get(0).data.jar;
			chartParameter['className'] = mapreduceStore.data.get(0).data.className;
		
		for (var i=1; i<count; i=i+2) {
			var key = variableStore.data.get(i-1).raw.getAttribute('value');
			var value = variableStore.data.get(i).raw.getAttribute('value');
			chartParameter[key.slice(1)] = value;
		}
		
		//console.log("--------->" + chartParameter);
		
		//alert(chartParameter['jar']);
		//alert(chartParameter['className']);
		
		Ext.getCmp('v_commonParameterPanel').showDetailParameter(chartParameter.className);
		Ext.getCmp('v_simpleIFrame').reset();
		Ext.getCmp('v_engine').select();
		Ext.getCmp('v_input').getStore().removeAll();
		Ext.getCmp('v_useFirstRecord').setValue(false);
		Ext.getCmp('v_delimiter').setValue('\\t');
		Ext.getCmp('v_title').setValue('');
		
		Ext.getCmp('v_commonParameterForm').getForm().setValues(chartParameter);
		
		Ext.getCmp('v_detailParameterForm').getForm().setValues(chartParameter);
		
		if (Ext.getCmp('v_targetIDList')) {
			if (chartParameter.targetIDList == 'all' || chartParameter.targetIDList == 'none') {
				Ext.getCmp('v_targetIDList_c').setValue(chartParameter.targetIDList);
			} else {
				Ext.getCmp('v_targetIDList_c').setValue('CUSTOM');
				Ext.getCmp('v_targetIDList').setValue(chartParameter.targetIDList);
			}
		}
		
		if (engineId) {
			Ext.getCmp('v_engine').setValue(engineId);
			if (Ext.getCmp('v_engine').displayVlaue == undefined) {
				Ext.getCmp('v_engine').displayValue = engineName;
			}
		}
		if (chartParameter.input) {
			Ext.getCmp('v_input').getStore().insert(0, {input: chartParameter.input});
			Ext.getCmp('v_input').getSelectionModel().select(0);
		}
		
	},
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					id: 'v_btn_create',
					text: MSG.COMMON_NEW,
					iconCls: 'designer-create',
					tooltip: MSG.DESIGNER_TIP_BTN_CREATE,
					handler: function() {
						Ext.MessageBox.show({
							title: 'Create New Visualization',
							msg: 'Do you want to create a new visualization? The current visualization will be deleted if not saved.',
							buttons: Ext.MessageBox.YESNO,
							icon: Ext.MessageBox.WARNING,
							fn: function handler(btn) {
								if (btn == 'yes') {
									Ext.getCmp('v_commonParameterPanel').showDetailParameter('');
									Ext.getCmp('v_simpleIFrame').reset();
									Ext.getCmp('v_engine').select();
									Ext.getCmp('v_input').getStore().removeAll();
									Ext.getCmp('v_useFirstRecord').setValue(false);
									Ext.getCmp('v_delimiter').setValue('\\t');
									Ext.getCmp('v_title').setValue('');
									
									Ext.getCmp('v_btn_saveImg').setDisabled(true);
									Ext.getCmp('v_btn_saveHtml').setDisabled(true);
									
									Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf');
									Ext.getCmp('v_btnBox').setIconCls('visualization-box');
								    Ext.getCmp('v_btnBar').setIconCls('visualization-bar');
								    Ext.getCmp('v_btnPie').setIconCls('visualization-pie');
								    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter');							
								    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph');
								    Ext.getCmp('v_btnTree').setIconCls('visualization-tree');
				                }
				            }
				        });
						
						
					}
				},
				{
					id: 'v_btn_run',
					text: MSG.COMMON_RUN,
					iconCls: 'designer-action',
					tooltip: MSG.DESIGNER_TIP_BTN_RUN,
					handler: function () {
						
						if (!Ext.getCmp('v_commonParameterForm').getForm().isValid()) {
							return;
						}
						
						if(Ext.getCmp('v_detailParameterForm') == undefined){
							msg('Chart Error', 'Please select chart.');
							return;
						}
						
						if (!Ext.getCmp('v_detailParameterForm').getForm().isValid()) {							
							return;
						}
						
						Ext.MessageBox.show({
							title: 'Executing Visualization',
							msg: 'Do you want to execute the visualization?',
							width: 300,
							buttons: Ext.MessageBox.YESNO,
							icon: Ext.MessageBox.INFO,
							scope: this,
							fn: function (btn, text, eOpts) {
								if (btn === 'yes') {
									var commonParameterForm = Ext.getCmp('v_commonParameterForm');
									var params = commonParameterForm.getForm().getFieldValues();
									var inputGrid = commonParameterForm.down('_vinputGrid');
									var selectedInputPath = inputGrid.getView().getSelectionModel().getSelection();		
			                         
									if (selectedInputPath[0] === undefined) {
										msg('Add File and Dirctory', 'Please input File Path or Dirctory Path.');
										return;
									}

									params.input = selectedInputPath[0].data.input;

									var chartParam = Ext.getCmp('v_detailParameterForm').getForm().getFieldValues();
									var chartParamKeys = Object.keys(chartParam);
									for (var i=0; i<chartParamKeys.length; i++) {
										var key = chartParamKeys[i];
										
										if (!chartParam[key]) {
											delete chartParam[key]; 
										}				
										
										if (chartParam.targetIDList_c) {	
											delete chartParam.targetIDList_c;
										}								
									}								
																	
									params.chartParam = chartParam;									
																	
									var win = Ext.getCmp('visualization-win');
									win.setLoading(true);
									Flamingo.Ajax.Request.invokePostByMap("/visualization/run", params, function (result) {
										win.setLoading(false);
										console.log(result);
										var jsonData = Ext.JSON.decode(result.responseText);
										console.log(jsonData);
										
										if (!jsonData.success) {
											var errorMsg = "Fail";
											if (jsonData.error && jsonData.error.message) {
												errorMsg = jsonData.error.message;
											}
											
											Ext.MessageBox.show({ 
												title: 'Run Visualization',
												msg: "Please check Error message in History",//errorMsg,
												buttons: Ext.MessageBox.OK,
												icon: Ext.MessageBox.ERROR
											});
											Ext.getCmp('v_simpleIFrame').update("");
											return;
										}
										
										if (jsonData.object && jsonData.object.visualizationHtml) {
											Ext.getCmp('v_simpleIFrame').update(jsonData.object.visualizationHtml);
											Ext.getCmp('v_btn_saveImg').setDisabled(false);
											Ext.getCmp('v_btn_saveHtml').setDisabled(false);
										}
										
									}, function (result) {
										win.setLoading(false);
									});  
								}
							},
							animateTarget: 'v_btn_run'
  						});
  					}
  				},
  				'-',
  				{
					id: 'v_btn_pop',
					text: 'History',
					iconCls: 'designer-save',
					tooltip: 'History',
					handler: function() {
						var window = Ext.create('Ext.Window',{
							title: 'Visualization history',
							width: 900,
							height: 450,
							border: false,
							layout: 'fit',
							modal:true,
							items:{
								xtype: 'visualizationWorkflowHistory',
							},
							buttons: [
								{
									text: MSG.COMMON_OK,
									iconCls: 'common-confirm',
									handler: function () {
										var grid = query('visualizationWorkflowHistory > grid');
										var selectedItem = grid.getView().getSelectionModel().getSelection();
								        
										if (selectedItem[0] === undefined) {
											msg('Select workflow item', 'Please select workflow item from grid.');
											return;
										}
								        
										var data = selectedItem[0].data;
										var engineId = query('visualizationWorkflowHistory _workflowEngineCombo').value;
										var engineName = query('visualizationWorkflowHistory _workflowEngineCombo').getDisplayValue();
										
										var params = {};
										params.engineId = engineId;
										params.jobStringId = data.jobStringId;
										
										console.log(data);
										
										var xmlDoc = new DOMParser().parseFromString(data.workflowXml, 'text/xml');
										var chartParameterPanel = query('chartParameterPanel');
										chartParameterPanel.setParameters(xmlDoc, engineId, engineName);
										
										Flamingo.Ajax.Request.invokeGet("/visualization/visualization", params, function (result) {
											console.log(result);
											var jsonData = Ext.JSON.decode(result.responseText);
											console.log(jsonData);
											
											if (!jsonData.success) {
												var errorMsg = "Fail";
												if (jsonData.error && jsonData.error.message) {
													errorMsg = jsonData.error.message;
												}
												
												Ext.MessageBox.show({ 
													title: 'Run Visualization',
													msg: errorMsg,
													buttons: Ext.MessageBox.OK,
													icon: Ext.MessageBox.ERROR
												});
												return;
											}
											
											if (jsonData.object && jsonData.object.visualizationHtml) {
												Ext.getCmp('v_simpleIFrame').update(jsonData.object.visualizationHtml);
											}
											
											window.close();
										});  
										
									}
								},
								{
									text: MSG.COMMON_CANCEL,
									iconCls: 'common-cancel',
									handler: function () {
										window.close();
									}
								}
							]
						}).show();
						
					}
				},
				'-',
				{
					id: 'v_btn_export',
					iconCls: 'hdfs-file-download',
					tooltip: 'Export Parameters',
					handler: function() {
						
						if (!Ext.getCmp('v_commonParameterForm').getForm().isValid()) {
							return;
						}
						
						if(Ext.getCmp('v_detailParameterForm') == undefined){
							msg('Chart Error', 'Please select chart.');
							return;
						}
						
						var jar = Ext.getCmp('v_jar').value||'';
						var input = '';
						
						var selectedInputPath = Ext.getCmp('v_input').getView().getSelectionModel().getSelection();
						
						if (selectedInputPath[0] === undefined) {
							msg('Add File and Dirctory', 'Please input File Path or Dirctory Path.');
							return;
						}
						
						if (selectedInputPath.length > 0) {
							input = selectedInputPath[0].data.input;
						}

						var useFirstRecord = Ext.getCmp('v_useFirstRecord').value||false;
						var delimiter = Ext.getCmp('v_delimiterValue').value||'\\t';
						var title = Ext.getCmp('v_title').value||'';
						var chartType = Ext.getCmp('v_chartType').value;
						
						var chartParam = Ext.getCmp('v_detailParameterForm').getForm().getFieldValues();
						
						var xmlDoc = new DOMParser().parseFromString('<workflow></workflow>', 'text/xml');
						var root = xmlDoc.getElementsByTagName('workflow')[0];
							root.setAttribute('workflowName', title?title:'Visualization Job');
							root.setAttribute('xmlns', 'http://www.openflamingo.org/schema/workflow');
						
						var pi = xmlDoc.createProcessingInstruction("xml", "version='1.0' encoding='UTF-8' standalone='yes'");

						xmlDoc.appendChild(pi);
						xmlDoc.removeChild(root);
						xmlDoc.appendChild(root);
						
						var startEl = xmlDoc.createElement('start');
							startEl.setAttribute('to', chartType);
							startEl.setAttribute('name', 'Start');
							startEl.setAttribute('description', 'Start');
						
						root.appendChild(startEl);
							
						var actionEl = xmlDoc.createElement('action');
							actionEl.setAttribute('to', 'End');
							actionEl.setAttribute('name', chartType);
							actionEl.setAttribute('description', 'Visualization');
						
						
						var mapreduceEl = xmlDoc.createElement('mapreduce');
						
						var jarEl = xmlDoc.createElement('jar');
							jarEl.textContent = jar;
						
						var classNameEl = xmlDoc.createElement('className');
							classNameEl.textContent = chartType;
						
						var commandEl = xmlDoc.createElement('command');
						
						var variableEl = xmlDoc.createElement('variable');
						
						variableEl.setAttribute('value', '-input');
						commandEl.appendChild(variableEl);
						variableEl = xmlDoc.createElement('variable');
						variableEl.setAttribute('value', input);
						commandEl.appendChild(variableEl);

						variableEl = xmlDoc.createElement('variable');
						variableEl.setAttribute('value', '-useFirstRecord');
						commandEl.appendChild(variableEl);
						variableEl = xmlDoc.createElement('variable');
						variableEl.setAttribute('value', useFirstRecord);
						commandEl.appendChild(variableEl);
						
						variableEl = xmlDoc.createElement('variable');
						variableEl.setAttribute('value', '-delimiter');
						commandEl.appendChild(variableEl);
						variableEl = xmlDoc.createElement('variable');
						variableEl.setAttribute('value', delimiter);
						commandEl.appendChild(variableEl);
						
						if(title != ''){
						variableEl = xmlDoc.createElement('variable');
						variableEl.setAttribute('value', '-title');
						commandEl.appendChild(variableEl);
						variableEl = xmlDoc.createElement('variable');
						variableEl.setAttribute('value', title);
						commandEl.appendChild(variableEl);						
						}	
						
						if (!Ext.getCmp('v_detailParameterForm').getForm().isValid()) {
							return;
						}
						
						var keys = Object.keys(chartParam);						
						for (var i=0; i<keys.length; i++) {
							var key = keys[i];							
							if (chartParam[key]) {																
								variableEl = xmlDoc.createElement('variable');
								variableEl.setAttribute('value', '-' + key);
								commandEl.appendChild(variableEl);
								variableEl = xmlDoc.createElement('variable');
								variableEl.setAttribute('value', chartParam[key]);
								commandEl.appendChild(variableEl);
							}							
						}		
						
						mapreduceEl.appendChild(jarEl);
						mapreduceEl.appendChild(classNameEl);
						mapreduceEl.appendChild(commandEl);
						
						actionEl.appendChild(mapreduceEl);
						root.appendChild(actionEl);
						
						var endEl = xmlDoc.createElement('end');
							endEl.setAttribute('name', 'End');
							endEl.setAttribute('description', 'End');
						
						root.appendChild(endEl);
						
						console.log(xmlDoc);
						console.log(new XMLSerializer().serializeToString(xmlDoc));
						console.log(Ext.util.base64.encode(new XMLSerializer().serializeToString(xmlDoc)));
						
						var link = document.createElement('a');
						link.href = 'data:application/octet-stream;base64;charset=utf-8,' + Ext.util.base64.encode(new XMLSerializer().serializeToString(xmlDoc));
						link.download = 'Visualization.xml';
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					}
				},
				{
					itemId: 'MF_FILEFIELD',
					xtype: 'filefield',					
					buttonOnly: true,
					buttonConfig: {
						id: 'v_btn_import',
						iconCls: 'hdfs-file-upload',
						text: '',
						tooltip: 'Import Parameter'
					},
					listeners: {
						afterrender: function (field, eOpts) {
//							field.fileInputEl.dom.setAttribute('multiple', 'multiple');
						},
						change: function (field, value, eOpts) {
							var files = field.fileInputEl.dom.files;
							var reader = new FileReader();
	                        
							reader.onload = function() {
								var xmlhttp = new XMLHttpRequest();
								xmlhttp.open("GET", reader.result, false);
								xmlhttp.send();
								var xmlDoc = xmlhttp.responseXML;
								
								var chartParameterPanel = query('chartParameterPanel');
								chartParameterPanel.setParameters(xmlDoc);
							}

							reader.readAsDataURL(files[0], 'UTF-8');
							field.reset();
						}
					}
				}
  			]
  		}
  	],
	items: [
        {
			border: false,
			items: {
				xtype: 'commonParameter',
			}
        },
        {
        	id : 'detailParameter',
        	border: false
        	
		}
	]
});