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

Ext.define('Flamingo.view.visualization._TreePlotParameter', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TreePlot',
	requires: [

	],
	//controllers: ['Flamingo.controller.visualization.VisualController'],
	padding: 0,
	border: false,
	title: 'Tree Plot',
	items: [
		{
			xtype: 'form',
			id: 'v_detailParameterForm',
			border: false,
			padding: 5,
			items: [		
			    	{
						xtype: 'tbspacer',
						height: 80
					},
			        {
			        	xtype:'label',
			        	text:'Tree plot does not need any parameters.',	
			        	//text:'Tree plot is not supported in current version 1.0.0',		
			            margin: '0 0 0 35'
			        }
			]
		}
	]
});
