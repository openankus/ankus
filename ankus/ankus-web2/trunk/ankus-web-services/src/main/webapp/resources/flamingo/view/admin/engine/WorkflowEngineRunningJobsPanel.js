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

Ext.define('Flamingo.view.admin.engine.WorkflowEngineRunningJobsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowEngineRunningJobsPanel',

    border: false,

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        this.items = [
            {
                itemId: 'runningTrigger',
                region: 'center',
                xtype: 'grid',
                border: true,
                columnLines: true,
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {text: MSG.ADMIN_GROUP, width: 120, dataIndex: 'group', align: 'center', hidden: false, sortable: true},
                    {text: MSG.ADMIN_JOBNAME, width: 120, dataIndex: 'name', align: 'center', hidden: false, sortable: true},
                    {text: 'Job Name', width: 170, dataIndex: 'jobName', align: 'center', hidden: true, sortable: true},
                    {text: MSG.ADMIN_START_TIME, flex: 1, dataIndex: 'startTime', align: 'center', hidden: false, sortable: true},
                    {text: MSG.ADMIN_PREV_FIRE_TIME, flex: 1, dataIndex: 'previousFireTime', align: 'center', hidden: true, sortable: true},
                    {text: MSG.ADMIN_NEXT_FIRE_TIME, flex: 1, dataIndex: 'nextFireTime', align: 'center', hidden: false, sortable: true},
                    {text: MSG.ADMIN_FIRE_TIME, flex: 1, dataIndex: 'fireTime', align: 'center', hidden: false, sortable: true},
                    {text: MSG.ADMIN_SCHELDULED_FIRE_TIME, flex: 1.2, dataIndex: 'scheduledFireTime', align: 'center', hidden: false, sortable: true},
                    {text: MSG.ADMIN_END_TIME, flex: 1, dataIndex: 'endTime', align: 'center', hidden: false, sortable: true},
                    {text: MSG.ADMIN_REFIRE_CNT, width: 80, dataIndex: 'refireCount', align: 'center', hidden: false, sortable: true},
                    {text: MSG.ADMIN_FINAL_FIRE_TIME, flex: 1, dataIndex: 'finalFireTime', align: 'center', hidden: false, sortable: false}
                ],
                store: Ext.create('Flamingo.store.admin.engine.WorkflowEngineRunningJobsStore', {
                    autoLoad: true
                }),
                viewConfig: {
                    enableTextSelection: true,
                    stripeRows: true
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                text: MSG.COMMON_REFRESH,
                                itemId: 'refreshRunningJobs',
                                iconCls: 'common-refresh'
                            }
                        ]
                    }
                ],
                listeners: {
                    afterrender: function () {
                    }
                }
            }
        ];

        this.callParent(arguments);
    }
});
