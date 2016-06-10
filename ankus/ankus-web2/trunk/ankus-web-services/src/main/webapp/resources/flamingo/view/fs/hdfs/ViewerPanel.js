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

Ext.define('Flamingo.view.fs.hdfs.ViewerPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hdfsFileViewerPanel',

    layout: {
        type: 'fit'
    },

    title: '파일 보기',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    itemId: 'viewerTopToolBar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'topButton',
                            iconCls: 'tbar-page-first',
                            text: ''
                        },
                        {
                            xtype: 'button',
                            itemId: 'previousButton',
                            iconCls: 'tbar-page-prev',
                            text: ''
                        },
                        {
                            xtype: 'button',
                            itemId: 'nextButton',
                            iconCls: 'tbar-page-next',
                            text: ''
                        },
                        {
                            xtype: 'button',
                            itemId: 'bottomButton',
                            iconCls: 'tbar-page-last',
                            text: ''
                        },
                        '-',
                        {
                            xtype: 'button',
                            itemId: 'downloadButton',
                            text: msg.hdfs_button_download
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'viewerRefreshButton',
                            iconCls: 'icon_refresh',
                            text: 'Refresh'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    html: '<a href=\'#\'>1. HTML property of a panel</a>',
                    itemId: 'contentPanel',
                    autoScroll: true,
                    bodyBorder: true,
                    bodyPadding: 10,
                    animCollapse: false,
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            itemId: 'bottomInfoToolBar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'position',
                                    value: 'Unknown',
                                    fieldLabel: '',
                                    labelWidth: 30
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});