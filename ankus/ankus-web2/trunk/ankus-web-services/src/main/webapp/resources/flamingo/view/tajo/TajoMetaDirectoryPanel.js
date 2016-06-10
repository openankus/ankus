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

Ext.define('Flamingo.view.tajo.TajoMetaDirectoryPanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tajoMetaDirectoryPanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo',
        'Flamingo.store.tajo.TajoMetaDirectoryStore'
    ],

    border: false,

    rootVisible: true,

    useArrows: false,

    store: {
        type: 'tajoMetaDirectoryStore'
    },

    root: {
        text: '/',
        id: '/',
        expanded: true
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'hidden',
                    itemId: 'lastPath',
                    allowBlank: true
                },
                {
                    xtype: 'hidden',
                    itemId: 'lastCluster',
                    allowBlank: true
                },
                {
                    xtype: 'displayfield',
                    labelWidth: 100,
                    fieldLabel: MSG.HDFS_CLUSTER
                },
                {
                    xtype: '_workflowEngineCombo',
                    type: 'HADOOP',
                    width: 200,
                    scope: this
                },
                '->',
                {
                    iconCls: 'common-refresh',
                    itemId: 'refreshButton',
                    tooltip: MSG.HDFS_TIP_REFRESH
                }
            ]
        }
    ]
});