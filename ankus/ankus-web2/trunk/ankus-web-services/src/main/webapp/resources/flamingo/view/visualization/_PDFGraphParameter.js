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

Ext.define('Flamingo.view.visualization._PDFGraphParameter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.PDFGraph',
	requires: [

	],
	 // controllers: ['Flamingo.controller.visualization.VisualController'],		
	padding: 0,
	border: false,
	title: 'PDF Graph',
	items: [
		{
			xtype: 'form',
			id: 'v_detailParameterForm',
			border: false,
			padding: 5,
			items: [
				{
					xtype: 'fieldcontainer',					         
					layout: 'hbox',
					items: [
						{
							xtype: 'combo',
							fieldLabel: 'Target ID List',           
							labelWidth:110,	
							width:200,
							id: 'v_targetIDList_c',
							name: 'targetIDList_c',
							itemId: 'targetIDList_c',
							value: 'all',
							//flex: 1,
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
									{name: 'all', value: 'all', description: 'all'},
									{name: 'none', value: 'none', description: 'none'},
									{name: MSG.COMMON_USER_DEFINED, value: 'CUSTOM', description: MSG.COMMON_USER_DEFINED}
								]
							}),
							listeners: {
								change: function (combo, newValue, oldValue, eOpts) {
									// 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
									var customValueField = combo.nextSibling('textfield');
									if (newValue === 'CUSTOM') {
										customValueField.setReadOnly(false);
										customValueField.isValid();
										customValueField.setValue('');
									} else {
										if(customValueField!=null){
											customValueField.setReadOnly(true);
											if (newValue) {
												customValueField.setValue(newValue);
											} else {
												customValueField.setValue('none');
											}                                            		
										}else{
											customValueField = 'all';
										}
									}
									
									var idIndex = Ext.getCmp('v_idIndex');
									if (newValue === 'none') {
										idIndex.allowBlank = true; 
										idIndex.isValid();
									} else {
										idIndex.allowBlank = false; 
										idIndex.isValid();
									}
								}
							}
						},
						{
							xtype: 'textfield',
							id: 'v_targetIDList',
							name: 'targetIDList',
							itemId: 'targetIDList',
							//vtype: 'exceptcommaspace',
							//flex: 1,
							readOnly: true,
							allowBlank: false,
							value: 'all'
						}
					]
				},    
				{
					xtype: 'fieldcontainer',					
					layout: 'hbox'	,						
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Index of ID',
							labelWidth: 110,
							id: 'v_idIndex',
							name: 'idIndex',
							itemId:'idIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'							
						},
						{
							xtype: 'button',
							text: '+',							
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_idIndex'});
							}  
						}
					]
				}, 				
				{
					xtype: 'fieldcontainer',					
					layout: 'hbox',					
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Index of Average',
							labelWidth:110,
							id: 'v_avgIndex',
							name: 'avgIndex',
							itemId:'avgIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_avgIndex'});
							}
						}
					]
				},
				{
					xtype: 'fieldcontainer',					
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Index of Std. Dev.',
							labelWidth:110,
							id: 'v_stddevIndex',
							name: 'stddevIndex',
							itemId:'stddevIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_stddevIndex'});
							}
						}
					]
				},
				{
					xtype: 'fieldcontainer',					               
					layout: 'hbox',
					items: {
						xtype: 'textfield',
						fieldLabel: 'Name of X-Axis',     
						labelWidth:110,
						id: 'v_xLabel',
						name: 'xLabel',
						itemId: 'xLabel',
						flex: 1,
						vtype: 'exceptspace'
					}
				}				
			]
		}
	]
});
