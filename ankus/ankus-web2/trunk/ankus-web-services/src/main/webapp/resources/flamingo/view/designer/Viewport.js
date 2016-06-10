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
 * Workflow Designer : Main Viewport Layout
 *
 * @class
 * @extends Ext.container.Viewport
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.Viewport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.designerViewport',

    requires: [
        'Flamingo.view.designer.NodeList',
        'Flamingo.view.designer.NodeTab',
        'Flamingo.view.designer.VariableGrid',
        'Flamingo.view.designer.Canvas',
        'Flamingo.view.designer.WorkflowTree',
        'Flamingo.view.designer.HdfsBrowser',
        'Flamingo.view.designer.SimpleWorkflow',
        'Flamingo.view.designer.StatusBar'
    ],

    layout: 'border',

    border: false,

    items: [
        {
            region: 'north',
            collapseMode: 'mini',
            collapsible: true,
            split: true,
            header: false,
            height: 160,
            minHeight: 120,
            maxHeight: 160,
            layout: 'fit',
            items: {
                xtype: 'nodeTab'
            }
        },
        {
            region: 'center',
            layout: 'border',
            items: [
                {
                    region: 'center',
                    layout: 'fit',
                    items: {
                        xtype: 'canvas'
                    }
                },
                {
                    region: 'east',
                    collapsible: true,
                    split: true,
                    collapsed: true,
                    width: 200,
                    minWidth: 200,
                    maxWidth: 300,
                    layout: 'fit',
                    title: MSG.DESIGNER_TITLE_VARIABLES,
                    items: {
                        xtype: 'variableGrid'
                    }
                },
                {
                    region: 'west',
                    collapsible: true,
                    collapsed: false,
                    split: true,
                    width: 200,
                    minWidth: 200,
                    maxWidth: 300,
                    layout: 'fit',
                    title: MSG.DESIGNER_TITLE_WORKFLOW,
                    items: {
                        xtype: 'workflowTree'
                    }
                }
            ],
            bbar: {
                xtype: 'workflowStatusBar'
            }
        }
    ]
});
