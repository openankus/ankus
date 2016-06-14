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

Ext.define('Flamingo.view.job.JobWorkflowTreePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jobWorkflowTreePanel',

    border: false,

    layout: 'border',

    forceFit: true,

    initComponent: function () {
        this.items = [
            {
                region: 'center',
                border: false,
                xtype: 'treepanel',
                rootVisible: true,
                useArrows: true,
                store: Ext.create('Flamingo.store.job.JobWorkflowTree'),
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                iconCls: 'common-folder-expand',
                                tooltip: 'Expand all',
                                handler: function () {
                                    var panel = query('jobWorkflowTreePanel > treepanel');
                                    panel.expandAll();
                                }
                            },
                            {
                                iconCls: 'common-folder-collapse',
                                tooltip: 'Collapse all',
                                handler: function () {
                                    var panel = query('jobWorkflowTreePanel > treepanel');
                                    panel.collapseAll();
                                }
                            },
                            '->',
                            {
                                tooltip: 'Refresh all',
                                iconCls: 'common-refresh',
                                handler: function () {
                                    var panel = query('jobWorkflowTreePanel > treepanel');
                                    panel.getStore().load();
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    render: function () {
                        // 브라우저 자체 Right Button을 막고자 한다면 uncomment한다.
                        Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
                    }
                }
            }
        ];

        this.callParent(arguments);
    }
});