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
Ext.define('Flamingo.view.fs.hdfs.FilePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hdfsFilePanel',

    layout: 'fit',

    border: false,

    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                border: false,
                stripeRows: true,
                columnLines: true,
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                    ignoreRightMouseSelection: true
                }),
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
                    {text: MSG.HDFS_FILE_NAME, flex: 2, dataIndex: 'filename', align: 'center'},
                    {
                        text: MSG.HDFS_FILE_SIZE, flex: 1, sortable: true, dataIndex: 'length', align: 'center',
                        renderer: function (num, metadata, record, rowIndex, colIndex, store) {
                            metadata.style = '!important;cursor: pointer;';
                            metadata.tdAttr = 'data-qtip="' + Flamingo.Util.String.toCommaNumber(num) + '"';
                            return Ext.util.Format.fileSize(num);
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
                    {text: 'Group', flex: 1, dataIndex: 'group', align: 'center', hidden: true},
                    {text: 'Owner', flex: 1, dataIndex: 'owner', align: 'center', hidden: true},
                    {text: MSG.HDFS_FILE_REPLICATION, flex: 1, dataIndex: 'replication', align: 'center'},
                    {
                        text: MSG.HDFS_INFO_BLOCK_SIZE, flex: 1, dataIndex: 'blockSize', align: 'center', hidden: true,
                        renderer: function (num) {
                            return Flamingo.Util.String.toCommaNumber(num);
                        }
                    }
                ],
                store: Ext.create('Flamingo.store.fs.hdfs.FileStore'),
                bbar: [
                    {
                        xtype: 'tbtext',
                        itemId: 'totalSizeText',
                        text: MSG.HDFS_TOTAL_SIZE,
                        hidden: true,
                        tooltip: MSG.HDFS_TIP_TOTAL_SIZE
                    },
                    '->',
                    {
                        xtype: 'tbtext',
                        itemId: 'totalCountText',
                        text: MSG.HDFS_TOTAL_COUNT,
                        hidden: true,
                        tooltip: MSG.HDFS_TIP_TOTAL_COUNT
                    }
                ],
                tbar: [
                    {
                        text: MSG.COMMON_COPY,
                        iconCls: 'hdfs-file-copy',
                        itemId: 'copyButton',
                        tooltip: MSG.HDFS_TIP_FILE_COPY
                    },
                    {
                        text: MSG.COMMON_MOVE,
                        iconCls: 'hdfs-file-move',
                        itemId: 'moveButton',
                        tooltip: MSG.HDFS_TIP_FILE_MOVE
                    },
                    {
                        text: MSG.COMMON_RENAME,
                        iconCls: 'hdfs-file-rename',
                        itemId: 'renameButton',
                        tooltip: MSG.HDFS_TIP_FILE_RENAME
                    },
                    {
                        text: MSG.COMMON_DELETE,
                        iconCls: 'hdfs-file-delete',
                        itemId: 'deleteButton',
                        tooltip: MSG.HDFS_TIP_FILE_DELETE
                    },
                    '-',
                    {
                        text: MSG.COMMON_UPLOAD,
                        iconCls: 'hdfs-file-upload',
                        itemId: 'uploadButton', // http://jsjoy.com/blog/ext-js-extension-awesome-uploader
                        tooltip: MSG.HDFS_TIP_FILE_UPLOAD
                    },
                    {
                        text: MSG.COMMON_DOWNLOAD,
                        iconCls: 'hdfs-file-download',
                        itemId: 'downloadButton',
                        tooltip: MSG.HDFS_TIP_FILE_DOWNLOAD
                    },
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
