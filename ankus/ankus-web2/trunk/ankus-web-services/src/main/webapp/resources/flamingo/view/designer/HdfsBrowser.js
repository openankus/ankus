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

Ext.define('Flamingo.view.designer.HdfsBrowser', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hdfsBrowser',

    border: false,

    autoCreate: true,

    layout: 'border',

    stores: ['HdfsBrowserTree', 'HdfsBrowserList'],

    initComponent: function () {
        this.items = [
            {
                region: 'west',
                border: false,
                collapsible: true,
                split: true,
                title: msg.hdfs_title_directory,
                width: 200,
                layout: 'fit',
                items: [
                    {
                        itemId: 'hdfsBrowserTree',
                        border: false,
                        xtype: 'treepanel',
                        rootVisible: true,
                        store: 'HdfsBrowserTree',
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                items: [
                                    '->',
                                    {
                                        text: msg.button_refresh,
                                        iconCls: 'common_refresh',
                                        itemId: 'refreshButton',
                                        tooltip: MSG.HDFS_TIP_FILE_REFRESH
                                    }
                                ]
                            }
                        ],
                        bbar: [
                            {
                                text: msg.hdfs_tree_dfs_usage,
                                itemId: 'usageButton',
                                iconCls: 'hdfs_used'
                            },
                            Ext.create('Ext.ProgressBar', { // HDFS 사용량을 보여주는 Progress Bar
                                itemId: 'hdfsSize',
                                width: 130,
                                text: '',
                                value: 0
                            })
                        ],
                        listeners: {
                            itemclick: function (view, node, item, index, event, opts) {
                                var listStore = Ext.ComponentQuery.query('#hdfsBrowserListGrid')[0].getStore();
                                listStore.load({ scope: this, params: {'node': node.data.id} });
                            }
                        }
                    }
                ]
            },
            {
                region: 'center',
                title: msg.hdfs_title_file,
                border: false,
                layout: 'fit',
                items: [
                    {
                        itemId: 'hdfsBrowserListGrid',
                        xtype: 'grid',
                        border: false,
                        stripeRows: true,
                        columnLines: true,
                        columns: [
                            {text: msg.hdfs_grid_filename, flex: 1, dataIndex: 'name'},
                            {text: msg.hdfs_grid_filesize, width: 100, sortable: true, dataIndex: 'length', align: 'right'},
                            {text: msg.hdfs_grid_timestamp, width: 150, dataIndex: 'modificationTime', align: 'center'},
                            {text: msg.hdfs_grid_permission, width: 80, dataIndex: 'permission', align: 'center', hidden: true},
                            {text: msg.hdfs_grid_group, width: 60, dataIndex: 'group', align: 'center', hidden: true},
                            {text: msg.hdfs_grid_owner, width: 60, dataIndex: 'owner', align: 'center', hidden: true},
                            {text: msg.hdfs_grid_replica, width: 40, dataIndex: 'replication', align: 'center', hidden: true},
                            {text: msg.hdfs_grid_block_size, width: 80, dataIndex: 'blocksize', align: 'center', hidden: true}
                        ],
                        store: 'HdfsBrowserList'
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                text: msg.button_refresh,
                                iconCls: 'common_refresh',
                                itemId: 'refreshButton',
                                tooltip: MSG.HDFS_TIP_FILE_REFRESH
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);

        // HDFS Progress Bar를 초기화 한다.
        var hdfsSizeProgressBar = Ext.ComponentQuery.query('#hdfsSize')[0];
        Flamingo.Ajax.Request.invokeGet(CONSTANTS.REST_HDFS_FS_STATUS, {},
            function (response) {
                if (config.hdfs_browser_show_wait != 'false') Ext.MessageBox.hide();
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    hdfsSizeProgressBar.updateProgress(obj.map['humanProgress'], obj.map['humanProgressPercent'], true);
                } else {
                    hdfsSizeProgressBar.updateProgress(0, '알 수 없음', true);
                }
            },
            function (response) {
                hdfsSizeProgressBar.updateProgress(0, '알 수 없음', true);
            }
        );
    }
});