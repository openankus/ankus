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

Ext.define('Flamingo.view.visualization._BarChartParameter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.BarChart',
	requires: [

	],
	 // controllers: ['Flamingo.controller.visualization.VisualController'],
	padding: 0,
	border: false,
	title: 'Bar Chart',
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
							xtype: 'textfield',
							fieldLabel: 'Index of ID',
							labelWidth:110,
							id: 'v_xIndex',
							name: 'xIndex',
							itemId:'xIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_xIndex'});
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
							fieldLabel: 'Index List of Values',
							labelWidth:110,
							id: 'v_yIndexList',
							name: 'yIndexList',
							itemId:'yIndexList',
							flex: 1,
							allowBlank: false,
							vtype: 'commaseperatednum'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_yIndexList', isMulti:true});
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
							fieldLabel: 'Name of X-Axis',
							labelWidth:110,
							id: 'v_xLabel',
							name: 'xLabel',
							itemId:'xLabel',
							flex: 1
							//,vtype: 'exceptspace'
						}
					]
				},
				/*
				{
					xtype: 'checkbox',
					fieldLabel: 'Print Value in Chart',
					id: 'v_printValue',
					name: 'printValue',
					itemId: 'printValue'
				},
				*/
				{
                    xtype: 'radiogroup',
                    fieldLabel: 'Print Value in Chart',     
                    labelWidth:110,
                    columns: 2,
                    id:'v_printValue', 
                    itemId: 'printValue',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'printValue',
                            checked: false,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'printValue',
                            checked: true,
                            inputValue: 'false'
                        }
                    ]                                  
                },      
                
				{
					xtype: 'fieldcontainer',					
					layout: 'hbox',
					items: {
						xtype: 'textfield', 
						fieldLabel: 'Max Value of Y-Axis',
						labelWidth:110,
						id: 'v_yMax', 
						name: 'yMax',
						itemId: 'yMax',
						flex: 1,
						vtype: 'numeric'
					}
				}
				
			]
		}
	]
});
