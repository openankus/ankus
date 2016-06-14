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

Ext.define('Flamingo.view.visualization._ConnectedGraphParameter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ConnectedGraph',
	requires: [

	],
	 // controllers: ['Flamingo.controller.visualization.VisualController'],
	overflowY: true,  
	height: 210,	
	padding: 0,
	border: false,
	title: 'Connected Graph',
	items: [
		{
			xtype: 'form',
			id: 'v_detailParameterForm',
			border: false,
			padding: 5,
			items: [
			    /*    
				{
					xtype: 'checkbox',
					fieldLabel: 'isDirected'
					id: 'v_isDirected',
					name: 'isDirected',
					itemId: 'isDirected'
				},
				*/    
			    {
                    xtype: 'radiogroup',
                    fieldLabel: 'Graph Type',     
                    labelWidth:120,
                    columns: 2,
                    id:'v_isDirected', 
                    itemId: 'isDirected',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'Directed',
                            name: 'isDirected',
                            checked: false,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'Undirected',
                            name: 'isDirected',
                            checked: true,
                            inputValue: 'false'
                        }
                    ]                                  
                },      
				{
					xtype: 'fieldcontainer',					
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Index of Start Node',
							labelWidth:135,
							id: 'v_startNodeIndex',
							name: 'startNodeIndex',
							itemId:'startNodeIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_startNodeIndex'});
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
							fieldLabel: 'Index of Start Node Size',
							labelWidth:135,
							id: 'v_startNodeSize',
							name: 'startNodeSize',
							itemId:'startNodeSize',
							flex: 1,
							allowBlank: true,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_startNodeSize'});
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
							fieldLabel: 'Index of End Node',
							labelWidth:135,
							id: 'v_endNodeIndex',
							name: 'endNodeIndex',
							itemId:'endNodeIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_endNodeIndex'});
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
							fieldLabel: 'Index of End Node Size',
							labelWidth:135,
							id: 'v_endNodeSize',
							name: 'endNodeSize',
							itemId:'endNodeSize',
							flex: 1,
							allowBlank: true,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_endNodeSize'});
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
							fieldLabel: 'Index of Edge Value',
							labelWidth:135,
							id: 'v_edgeIndex',
							name: 'edgeIndex',
							itemId:'edgeIndex',
							flex: 1,
							allowBlank: false,
							vtype: 'numeric'
						},
						{
							xtype: 'button',
							text: '+',
							handler: function (grid, rowIndex, colIndex) {
								Ext.create('Flamingo.view.visualization.FilePreview', {targetFieldId:'v_edgeIndex'});
								}
						}
					]
				},
				/*
				{
					xtype: 'checkbox',
					id: 'v_isEdgeSize',
					inputValue: '1',
					name: 'isEdgeSize',
					itemId: 'isEdgeSize',
					fieldLabel: 'isEdgeSize'
				},
				{
					xtype: 'checkbox',
					fieldLabel: 'isPrintNodeLabel',					
					id: 'v_isPrintNodeLabel',
					name: 'isPrintNodeLabel',
					itemId: 'isPrintNodeLabel'					
				},
				{
					xtype: 'checkbox',
					id: 'v_isPrintEdgeValue',
					name: 'isPrintEdgeValue',
					itemId: 'isPrintEdgeValue',
					fieldLabel: 'isPrintEdgeValue'
				}
				*/
				{
                    xtype: 'radiogroup',
                    fieldLabel: 'Apply Edge Size',     
                    labelWidth:135,
                    columns: 2,
                    id:'v_isEdgeSize', 
                    itemId: 'isEdgeSize',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'isEdgeSize',
                            checked: false,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'isEdgeSize',
                            checked: true,
                            inputValue: 'false'
                        }
                    ]                                  
                },   
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Print Node Label',     
                    labelWidth:135,
                    columns: 2,
                    id:'v_isPrintNodeLabel', 
                    itemId: 'isPrintNodeLabel',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'isPrintNodeLabel',
                            checked: false,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'isPrintNodeLabel',
                            checked: true,
                            inputValue: 'false'
                        }
                    ]                                  
                }, 
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Print Edge Value',     
                    labelWidth:135,
                    columns: 2,
                    id:'v_isPrintEdgeValue', 
                    itemId: 'isPrintEdgeValue',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'isPrintEdgeValue',
                            checked: false,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'isPrintEdgeValue',
                            checked: true,
                            inputValue: 'false'
                        }
                    ]                                  
                }
			]
		}
	]
});
