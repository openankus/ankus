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
Ext.define('Flamingo.view.designer.property.browser.hdfs.FilePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hdfsFilePanelForDesigner',

    layout: 'fit',

    border: false,

    store: {},

    engineId: {},

    constructor: function (config) {
        this.engineId = config.engineId;
        this.store = Ext.create('Flamingo.store.designer.property.browser.hdfs.FileStore');
        this.store.getProxy().extraParams.engineId = this.engineId;
        this.callParent(arguments);
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                border: false,
                stripeRows: true,
                columnLines: true,
                viewConfig: {
                    enableTextSelection: true
                },
                columns: [
                    {
                        xtype: 'rownumberer',
                        text: MSG.HDFS_NO,
                        width: 50,
                        sortable: false
                    },
                    {text: MSG.HDFS_FILE_NAME, flex: 2, dataIndex: 'filename'},
                    {
                        text: MSG.HDFS_FILE_SIZE, flex: 1, sortable: true, dataIndex: 'length', align: 'right',
                        renderer: function (num) {
                            return Flamingo.Util.String.toCommaNumber(num);
                        }
                    },
                    {
                        text: MSG.HDFS_FILE_TIME_STAMP, flex: 1.5, dataIndex: 'modificationTime', align: 'center',
                        renderer: function (value) {
                            var date = new Date(value);
                            return Ext.Date.format(date, 'Y-m-d H:i:s')
                        }
                    },
                    {text: MSG.HDFS_FILE_PERMISSION, flex: 1, dataIndex: 'permission', align: 'center'},
                    {text: MSG.HDFS_INFO_PERMISSION_GROUP, flex: 1, dataIndex: 'group', align: 'center', hidden: true},
                    {text: MSG.HDFS_INFO_PERMISSION_OWNER, flex: 1, dataIndex: 'owner', align: 'center', hidden: true},
                    {text: MSG.HDFS_INFO_REPLICATION, flex: 1, dataIndex: 'replication', align: 'center'},
                    {
                        text: MSG.HDFS_INFO_BLOCK_SIZE, flex: 1, dataIndex: 'blockSize', align: 'center', hidden: true,
                        renderer: function (num) {
                            return Flamingo.Util.String.toCommaNumber(num);
                        }
                    }
                ],
                store: this.store,
                tbar: [
                    '->',
                    {
                        text: MSG.COMMON_REFRESH,
                        iconCls: 'common-refresh',
                        itemId: 'refreshButton',
                        tooltip: MSG.HDFS_TIP_FILE_REFRESH
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
