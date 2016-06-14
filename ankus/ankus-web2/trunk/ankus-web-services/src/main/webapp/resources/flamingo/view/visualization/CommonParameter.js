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

Ext.define('Flamingo.view.visualization.CommonParameter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.commonParameter',
	requires: [
		'Flamingo.view.visualization._InputGrid',
		'Flamingo.view.visualization._BarChartParameter',
		'Flamingo.view.visualization._BoxPlotsParameter',
		'Flamingo.view.visualization._ConnectedGraphParameter',
		'Flamingo.view.visualization._PDFGraphParameter',
		'Flamingo.view.visualization._PieChartParameter',
		'Flamingo.view.visualization._ScatterPlotParameter',
		'Flamingo.view.visualization._TreePlotParameter'
		
	],
	id : 'v_commonParameterPanel',
	border: false,
	padding: 5,
	afterRender: function() {
		this.callParent(arguments);
		this.showDetailParameter();
	},
	
	showDetailParameter: function(type) {
		Ext.getCmp('detailParameter').removeAll();
		Ext.getCmp('detailParameter').add({xtype:type });
		Ext.getCmp('v_chartType').setValue(type);
		var win = Ext.getCmp('visualization-win');
		win.setHeight(win.getHeight());
	},
	
	fadeInfadeOut : function(button, pressed) {
		    console.log('Button Click',pressed);
		    if(!pressed){
		     button.setText('aaaa');
		     Ext.get("v_btnPdf").fadeOut({
		         opacity: 0,
		         easing: 'easeOut',
		         duration: 2000,
		         remove: false,
		         useDisplay: false
		     });
		    }
		    else {
		     button.setText('bbb');
		     Ext.get("v_btnPdf").fadeIn({
		         opacity: 1,
		         easing: 'easeOut',
		         duration: 2000
		     });
		    }
		},
	
	items: [
		{
			xtype: 'form',
			id: 'v_commonParameterForm',
			border: false,
			items: [
				{
					xtype: 'hidden', 
					id: 'v_chartType', 
					name: 'chartType',
					itemId: 'chartType'
				},
				{
					xtype: 'fieldcontainer',                
					layout: 'hbox',
					items: {
						xtype: '_workflowEngineCombo',
						fieldLabel: 'Engine',     
						labelWidth:85,
						id: 'v_engine',
						name: 'engine',
						itemId:'engine',
						flex: 1,
						allowBlank: false,
						filter: 'HADOOP',
						listeners: {
							change: function (field, newValue, oldValue) {
								
							}
						}
					}
				},
				{					
					xtype: 'hidden',  
					fieldLabel: 'JAR',     
					labelWidth:85,
					id: 'v_jar',
					name: 'jar',                    
					itemId:'jar',
					flex: 1,
					value:'org.ankus:ankus-visualization:1.0.1',
					disabledCls: 'disabled-plain',
                   	allowBlank: false					
				},
				{	
					title: 'Chart List',
					border: false
				},
				{
					xtype: 'tbspacer',
					height: 5
				},
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					items: [	
						{
							xtype: 'tbspacer',
							width:3
						},    
						{
							xtype : 'button',		
							id : 'v_btnPdf',
							iconCls : 'visualization-pdf',					
							tooltip: 'PDF Graph',
							value: 'PDFGraph',					
							width : 36,
							height: 36,
							scale:'huge',							
							handler: function (button, e) {
								var panel = this.up('commonParameter');
								panel.showDetailParameter(this.value);
								
								Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf-c');
								Ext.getCmp('v_btnBox').setIconCls('visualization-box');
							    Ext.getCmp('v_btnBar').setIconCls('visualization-bar');
							    Ext.getCmp('v_btnPie').setIconCls('visualization-pie');
							    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter');
							    Ext.getCmp('v_btnTree').setIconCls('visualization-tree');
							    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph');
							    Ext.getCmp('v_btn_run').setDisabled(false);
							    Ext.getCmp('v_btn_export').setDisabled(false);
							    Ext.getCmp('v_btn_import').setDisabled(false);
							}
						},
						{
							xtype: 'tbspacer',
							width: 5
						},
						{
							xtype : 'button',
							id : 'v_btnBox',
							iconCls : 'visualization-box',
							tooltip: 'Box Plot',
							value: 'BoxPlots',
							width : 36,
							height: 36,		
							scale:'huge',
							handler: function (button, e) {								
								var panel = this.up('commonParameter');
								panel.showDetailParameter(this.value);
								
								Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf');
								Ext.getCmp('v_btnBox').setIconCls('visualization-box-c');
							    Ext.getCmp('v_btnBar').setIconCls('visualization-bar');
							    Ext.getCmp('v_btnPie').setIconCls('visualization-pie');
							    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter');
							    Ext.getCmp('v_btnTree').setIconCls('visualization-tree');
							    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph');
							    Ext.getCmp('v_btn_run').setDisabled(false);
							    Ext.getCmp('v_btn_export').setDisabled(false);
							    Ext.getCmp('v_btn_import').setDisabled(false);
							}
						},
						{
							xtype: 'tbspacer',
							width: 5
						},
						{
							xtype : 'button',
							id : 'v_btnBar',
							iconCls : 'visualization-bar',
							tooltip: 'Bar Chart',
							value: 'BarChart',
							width : 36,
							height: 36,
							scale:'huge',
							handler: function (button, e) {
								var panel = this.up('commonParameter');
								panel.showDetailParameter(this.value);	
								
								Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf');
								Ext.getCmp('v_btnBox').setIconCls('visualization-box');
							    Ext.getCmp('v_btnBar').setIconCls('visualization-bar-c');
							    Ext.getCmp('v_btnPie').setIconCls('visualization-pie');
							    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter');
							    Ext.getCmp('v_btnTree').setIconCls('visualization-tree');
							    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph');
							    
							    Ext.getCmp('v_btn_run').setDisabled(false);
							    Ext.getCmp('v_btn_export').setDisabled(false);
							    Ext.getCmp('v_btn_import').setDisabled(false);
							}
						},
						{
							xtype: 'tbspacer',
							width: 5
						},
						{
							xtype : 'button',
							id : 'v_btnPie',
							iconCls : 'visualization-pie',
							tooltip: 'Pie Chart',
							value: 'PieChart',
							width : 36,
							height: 36,
							scale:'huge',
							handler: function (button, e) {
								var panel = this.up('commonParameter');
								panel.showDetailParameter(this.value);
								
								Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf');
								Ext.getCmp('v_btnBox').setIconCls('visualization-box');
							    Ext.getCmp('v_btnBar').setIconCls('visualization-bar');
							    Ext.getCmp('v_btnPie').setIconCls('visualization-pie-c');
							    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter');
							    Ext.getCmp('v_btnTree').setIconCls('visualization-tree');
							    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph');
							    
							    Ext.getCmp('v_btn_run').setDisabled(false);
							    Ext.getCmp('v_btn_export').setDisabled(false);
							    Ext.getCmp('v_btn_import').setDisabled(false);
							}
						},
						{
							xtype: 'tbspacer',
							width: 5
						},
						{
							xtype : 'button',
							id : 'v_btnScatter',
							iconCls : 'visualization-scatter',
							tooltip: 'Scatter Plot',
							value: 'ScatterPlot',
							width : 36,
							height: 36,
							scale:'huge',
							handler: function (button, e) {
								var panel = this.up('commonParameter');
								panel.showDetailParameter(this.value);								
								Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf');
								Ext.getCmp('v_btnBox').setIconCls('visualization-box');
							    Ext.getCmp('v_btnBar').setIconCls('visualization-bar');
							    Ext.getCmp('v_btnPie').setIconCls('visualization-pie');
							    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter-c');
							    Ext.getCmp('v_btnTree').setIconCls('visualization-tree');
							    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph');
							    
							    Ext.getCmp('v_btn_run').setDisabled(false);
							    Ext.getCmp('v_btn_export').setDisabled(false);
							    Ext.getCmp('v_btn_import').setDisabled(false);
							}
						},
						{
							xtype: 'tbspacer',
							width: 5
						},						
						{
							xtype : 'button',
							id : 'v_btnTree',
							//iconCls : 'visualization-tree-dis',
							iconCls : 'visualization-tree',
							tooltip: 'Tree Plot',
							value: 'TreePlot',
							width : 36,
							height: 36,
							scale:'huge',
							handler: function (button, e) {
								
								var panel = this.up('commonParameter');
								panel.showDetailParameter(this.value);
								
								Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf');
								Ext.getCmp('v_btnBox').setIconCls('visualization-box');
							    Ext.getCmp('v_btnBar').setIconCls('visualization-bar');
							    Ext.getCmp('v_btnPie').setIconCls('visualization-pie');
							    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter');
							    Ext.getCmp('v_btnTree').setIconCls('visualization-tree-c');
							    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph');
							    
							    Ext.getCmp('v_btn_run').setDisabled(false);
							    Ext.getCmp('v_btn_export').setDisabled(false);
							    Ext.getCmp('v_btn_import').setDisabled(false);
							    
							  
							}
						},
						{
							xtype: 'tbspacer',
							width: 5
						},						
						{
							xtype : 'button',
							id : 'v_btnGraph',
							iconCls : 'visualization-graph',
							tooltip: 'Connected Graph',
							value: 'ConnectedGraph',
							width : 36,
							height: 36,
							scale:'huge',
							handler: function (button, e) {
								var panel = this.up('commonParameter');
								panel.showDetailParameter(this.value);
								
								Ext.getCmp('v_btnPdf').setIconCls('visualization-pdf');
								Ext.getCmp('v_btnBox').setIconCls('visualization-box');
							    Ext.getCmp('v_btnBar').setIconCls('visualization-bar');
							    Ext.getCmp('v_btnPie').setIconCls('visualization-pie');
							    Ext.getCmp('v_btnScatter').setIconCls('visualization-scatter');
							    Ext.getCmp('v_btnTree').setIconCls('visualization-tree');
							    Ext.getCmp('v_btnGraph').setIconCls('visualization-graph-c');
							    
							    Ext.getCmp('v_btn_run').setDisabled(false);
							    Ext.getCmp('v_btn_export').setDisabled(false);
							    Ext.getCmp('v_btn_import').setDisabled(false);
							}
						}
					]
				},
				{
					xtype: '_vinputGrid',
					id: 'v_input',
					name: 'input',
					itemId: 'input',
					engine: 'v_engine',
					title: MSG.DESIGNER_TITLE_INPUT_PATH,
					height: 90,
					overflowX: false
				},
				/*
				{
					xtype: 'checkbox',
					id:'v_useFirstRecord', 
					name:'useFirstRecord' ,
					itemId: 'useFirstRecord',
					fieldLabel: 'Use First Record'
				},
				 */
				 {
                    xtype: 'radiogroup',
                    fieldLabel: 'Use First Record',                   
                    columns: 2,
                    id:'v_useFirstRecord', 
                    itemId: 'useFirstRecord',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'useFirstRecord',
                            checked: false,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'useFirstRecord',
                            checked: true,
                            inputValue: 'false'
                        }
                    ]                                  
                },              
				{
					xtype: 'fieldcontainer',
					fieldLabel: 'Delimiter',                    
					layout: 'hbox',
					items: [
						{
							xtype: 'combo',
							id: 'v_delimiter',
							name: 'delimiter',
							itemId: 'delimiter',
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
							id: 'v_delimiterValue',
							name: 'delimiterValue',
							itemId: 'delimiterValue',
							vtype: 'exceptcommaspace',
							flex: 1,
							disabled: true,
							readOnly: this.readOnly,
							allowBlank: false,
							value: '\\t'
						}
					]
				},
				{
					xtype: 'fieldcontainer',
					fieldLabel: 'Chart Title',                    
					layout: 'hbox',
					items: {
						xtype: 'textfield',
						id: 'v_title',
						name: 'title',
						itemId: 'title',
						flex: 1
					}
				}				
			]
		}
	]
});
