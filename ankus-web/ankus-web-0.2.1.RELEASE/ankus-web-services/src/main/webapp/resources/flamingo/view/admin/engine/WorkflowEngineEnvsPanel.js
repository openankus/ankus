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

Ext.define('Flamingo.view.admin.engine.WorkflowEngineEnvsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowEngineEnvsPanel',

    border: false,

    layout: {
        type: 'fit'
    },

    initComponent: function () {
        this.items = [
            {
                itemId: 'environmentGrid',
                xtype: 'grid',
                border: false,
                columnLines: true,
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {
                        xtype: 'rownumberer',
                        text: MSG.DASHBOARD_HEADER_NO,
                        width: 50,
                        sortable: false
                    },
                    {text: MSG.ADMIN_ENV_NAME, flex: 1, dataIndex: 'name', hidden: false, sortable: true},
                    {text: MSG.COMMON_VALUE, flex: 3, dataIndex: 'value', hidden: false, sortable: false,
                        renderer: function (val) {
                            return '<div style="white-space:normal !important;">' + val + '</div>';
                        }
                    }
                ],
                store: Ext.create('Flamingo.store.admin.engine.WorkflowEngineEnvsStore', {
                    autoLoad: false
                }),
                viewConfig: {
                    enableTextSelection: true,
                    stripeRows: true
                }
            }
        ];

        this.callParent(arguments);
    }
});
