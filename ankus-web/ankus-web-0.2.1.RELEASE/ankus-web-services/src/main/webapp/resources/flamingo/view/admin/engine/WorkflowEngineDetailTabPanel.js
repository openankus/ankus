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

Ext.define('Flamingo.view.admin.engine.WorkflowEngineDetailTabPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowEngineDetailTabPanel',

    border: false,

    layout: {
        type: 'fit'
    },

    requires: [
        'Flamingo.view.admin.engine.WorkflowEngineEnvsPanel',
        'Flamingo.view.admin.engine.WorkflowEnginePropsPanel',
        'Flamingo.view.admin.engine.WorkflowEngineTriggersPanel',
        'Flamingo.view.admin.engine.WorkflowEngineRunningJobsPanel'
    ],

    initComponent: function () {
        this.items = [
            {
                xtype: 'tabpanel',
                activeTab: 0,
                flex: 1.5,
                border: false,
                items: [
                    {
                        title: MSG.ADMIN_ENVIROMENTS,
                        xtype: 'workflowEngineEnvsPanel'
                    },
                    {
                        title: MSG.ADMIN_SYSTEM_PROP,
                        xtype: 'workflowEnginePropsPanel'
                    },
                    {
                        title: 'Triggers',
                        xtype: 'workflowEngineTriggersPanel'
                    },
                    {
                        title: MSG.DASHBOARD_TITLE_RUNNING_JOB,
                        xtype: 'workflowEngineRunningJobsPanel'
                    }
                ],
                bbar: {
                    xtype: '_statusBar'
                }
            }
        ];
        this.callParent(arguments);
    }
});
