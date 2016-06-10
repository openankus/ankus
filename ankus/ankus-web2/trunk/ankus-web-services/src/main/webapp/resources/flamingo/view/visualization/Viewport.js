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

Ext.define('Flamingo.view.visualization.Viewport', {   
	extend: 'Ext.panel.Panel',
	alias: 'widget.visualizationViewport',
    requires: [
       'Flamingo.view.visualization.ChartParameterPanel',
       'Flamingo.view.component._SimpleIFrame'
    ],
 
    layout: 'border',

    border: false,
    
    items: [
		{
		    region: 'west',
		    collapsible: true,
		    collapsed: false,
		    split: true,
		    width: 300,
		    minWidth: 300,
		    maxWidth: 400,
		    layout: 'border',
		    title: "Chart Parameter",
		    items: {
		    	xtype: 'chartParameterPanel',
		    	region: 'center'
			}
		},
		{
			region: 'center',
			layout: 'fit',
			id : 'v_imgPlace',
			items: {
				xtype: '_simpleIFrame',
				id : 'v_simpleIFrame'				
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							id: 'v_btn_saveImg',
							text: 'Save to image',
							iconCls: 'designer-save',
							tooltip: 'Save to image',
							disabled:true,
							handler: function() {
								var iframe = Ext.getCmp('v_simpleIFrame');
								if (iframe) {
									var doc = iframe.getDocument();
									var svgs = doc.getElementsByTagName('svg');
									if (svgs) {
										saveSvgAsPng(svgs, 'Visualization.png', {document:doc});										
									}									
								}
							}
						},
						{
							id: 'v_btn_saveHtml',
							text: 'Save to html',
							iconCls: 'designer-save',
							tooltip: 'Save to html',
							disabled:true,
							handler: function() {
								var iframe = Ext.getCmp('v_simpleIFrame');
								if (iframe) {
									var doc = iframe.getDocument().documentElement.cloneNode(true);
									var svg = doc.getElementsByTagName('svg');
									while (svg.length > 0) {
										svg[0].remove();
									}
								
									var a = document.createElement('a');
							    	a.download = 'Visualization.html';
							    	a.href = 'data:application/octet-stream;base64;charset=utf-8,' + Ext.util.base64.encode(doc.innerHTML);
							    	document.body.appendChild(a);
							    	a.addEventListener("click", function(e) {
							    		a.parentNode.removeChild(a);
							    	});
							    	a.click();
								}
							}
						}
					]
				}
			]
		}
	],
	bbar: {
		xtype: 'workflowStatusBar'
	}
});