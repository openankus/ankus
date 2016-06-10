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

Ext.define('Flamingo.view.visualization._PieChartParameter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.PieChart',
	requires: [

	],
	 // controllers: ['Flamingo.controller.visualization.VisualController'],
	padding: 0,
	border: false,
	title: 'Pie Chart',
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
							id: 'v_categoryIndex',
							name: 'categoryIndex',
							itemId:'categoryIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_categoryIndex'});
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
							fieldLabel: 'Index of Value',
							id: 'v_valueIndex',
							name: 'valueIndex',
							itemId:'valueIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_valueIndex'});
							} 
						}
					]
				},
				{
					xtype: 'hidden',
					id: 'v_isPrintLegend',
					name: 'isPrintLegend',
					itemId: 'isPrintLegend',
					value: 'true'
				}
			]
		}
	]
});
