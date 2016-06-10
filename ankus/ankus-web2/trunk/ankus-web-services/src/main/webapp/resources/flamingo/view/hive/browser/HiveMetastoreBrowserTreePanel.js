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

Ext.define('Flamingo.view.hive.browser.HiveMetastoreBrowserTreePanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.hiveBrowserTreePanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo'
    ],
    border: false,
    rootVisible: true,
    useArrows: true,
    store: Ext.create('Flamingo.store.hive.HiveDatabaseStore'),
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'hidden',
                    itemId: 'engineId',
                    name: 'engineId',
                    tooltip: 'This is the Engine ID of Hive Server.',
                    allowBlank: true
                },
                {
                    xtype: 'tbtext',
                    text: 'Hive Server'
                },
                {
                    xtype: '_workflowEngineCombo',
                    itemId: 'metastoreEngineCombo',
                    type: 'HIVE'
                },
                /*{
                 text: 'Create Table'

                 },
                 {
                 text: 'Drop Table'

                 },*/
                '->',
                {
                    text: 'Refresh'

                }
            ]
        }
    ]

})