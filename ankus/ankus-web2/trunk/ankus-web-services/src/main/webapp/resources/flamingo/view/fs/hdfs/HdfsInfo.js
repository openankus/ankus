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

Ext.define('Flamingo.view.fs.hdfs.HdfsInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hdfsInfoPanel',

    border: false,
    modal: true,
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            hidden: false,
            itemId: 'propertyForm',
            autoScroll: false,
            bodyPadding: 10,
            items: [
                {
                    xtype: 'displayfield',
                    itemId: 'canonicalServiceName',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_HDFS_URL,
                    labelWidth: 100,
                    anchor: '100%'
                },
                {
                    xtype: 'component',
                    cls: 'x-form-check-group-label'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'humanProgressPercent',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_REMAINING_PERCENT,
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'component',
                    cls: 'x-form-check-group-label'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'humanCapacity',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_CAPACITY,
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'humanUsed',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_USED,
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'humanRemaining',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_REMAINING_SIZE,
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'component',
                    cls: 'x-form-check-group-label'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'liveNodes',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_LIVE_NODES,
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'deadNodes',
                    value: '',
                    fieldCls: 'warning',
                    fieldLabel: MSG.HDFS_INFO_DEAD_NODES,
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'component',
                    cls: 'x-form-check-group-label'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'missingBlocksCount',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_MISSING_BLOCKS,
                    fieldCls: 'warning',
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'corruptBlocksCount',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_CORRUPT_BLOCKS,
                    fieldCls: 'warning',
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'component',
                    cls: 'x-form-check-group-label'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'replication',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_REPLICATION,
                    labelWidth: 130,
                    anchor: '100%'
                },
                {
                    xtype: 'displayfield',
                    itemId: 'humanDefaultBlockSize',
                    value: '',
                    fieldLabel: MSG.HDFS_INFO_BLOCK_SIZE,
                    labelWidth: 130,
                    anchor: '100%'
                }
            ]
        }
    ]
});