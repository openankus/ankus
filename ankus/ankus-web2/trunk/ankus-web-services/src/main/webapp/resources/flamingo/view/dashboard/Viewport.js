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

Ext.define('Flamingo.view.dashboard.Viewport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboardViewport',

    layout: 'fit',

    requires: [
        'Flamingo.view.dashboard.WorkflowHistory',
        'Flamingo.view.dashboard.ActionHistory'
    ],

    border: false,

    initComponent: function () {
        this.items = {
            layout: 'border',
            border: false,
            items: [
                {
                    region: 'center',
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [
                        {
                            title: MSG.DASHBOARD_TITLE_WORKFLOW,
                            layout: 'border',
                            items: [
                                {
                                    xtype: 'workflowHistory',
                                    region: 'center'
                                }
                            ]
                        },
                        {
                            title: MSG.DASHBOARD_TITLE_RUNNING_JOB,
                            layout: 'border',
                            items: [
                                {
                                    xtype: 'actionHistory',
                                    region: 'center'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        this.callParent(arguments);
    }
});