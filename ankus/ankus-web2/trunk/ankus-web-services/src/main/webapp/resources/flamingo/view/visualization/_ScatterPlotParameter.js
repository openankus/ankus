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

Ext.define('Flamingo.view.visualization._ScatterPlotParameter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ScatterPlot',
	requires: [

	],
	 // controllers: ['Flamingo.controller.visualization.VisualController'],
	//autoScroll : true,    
	height: 190,	
	padding: 0,
	border: false,
	title: 'Scatter Plot',
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
							fieldLabel: 'Index of X-Axis',			
							labelWidth:130,
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
							fieldLabel: 'Name of X-Axis',
							labelWidth:130,
							id: 'v_xLabel',
							name: 'xLabel',
							itemId:'xLabel',
							flex: 1,
							allowBlank: true,
							vtype: 'exceptspace'
						}
					]
				},
				{
					xtype: 'fieldcontainer',					
					layout: 'hbox',
					items: [
				        {
				        	xtype: 'textfield',
				        	fieldLabel: 'Index of Y-Axis',
				        	labelWidth:130,
				        	id: 'v_yIndex',
				        	name: 'yIndex',
				        	itemId:'yIndex',
				        	flex: 1,
				        	allowBlank: false,
				        	vtype: 'numeric'
				        },
				        {
				        	xtype: 'button',
				        	text: '+',
				        	handler: function (grid, rowIndex, colIndex) {
				        		Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_yIndex'});
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
							fieldLabel: 'Name of Y-Axis',
							labelWidth:130,
							id: 'v_yLabel',
							name: 'yLabel',
							itemId:'yLabel',
							flex: 1,
							allowBlank: true,
							vtype: 'exceptspace'
						}
					]
				},
				{
					xtype: 'fieldcontainer',					
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Index of Class Attribute',
							labelWidth:130,
							id: 'v_classIndex',
							name: 'classIndex',
							itemId:'classIndex',
							flex: 1,
							allowBlank: true,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_classIndex'});
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
							fieldLabel: 'Index of Dot Size',
							labelWidth:130,
							id: 'v_sizeIndex',
							name: 'sizeIndex',
							itemId:'sizeIndex',
							flex: 1,
							allowBlank: true,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_sizeIndex'});
							} 
						}
					]
				}
			]
		}
	]
});
