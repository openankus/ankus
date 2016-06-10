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

/*
 CREATE TABLE page_view(viewTime INT, userid BIGINT,
 page_url STRING, referrer_url STRING,
 ip STRING COMMENT 'IP Address of the User',
 country STRING COMMENT 'country of origination')
 COMMENT 'This is the staging page view table'
 PARTITIONED BY (ver timestamp)
 ROW FORMAT DELIMITED FIELDS TERMINATED BY '\054'
 STORED AS TEXTFILE
 LOCATION '<hdfs_location>';
 */
Ext.define('Flamingo.view.hive.browser.TableCreator', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tableCreator',

    requires: [
        'Flamingo.view.fs.hdfs.Viewport',
        'Flamingo.view.designer.property._HiveDelimiterSelCmbField',
        'Flamingo.view.designer.property._HiveColumnGrid'
    ],

    layout: 'border',

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                region: 'north',
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        defaults: {
                            width: 340
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'tableName',
                                itemId: 'tableTextField',
                                fieldLabel: 'Table Name',
                                allowBlank: false,
                                vtype: 'alphanum',
                                value: ''
                            },
                            {
                                xtype: 'textfield',
                                name: 'comment',
                                itemId: 'commentTextField',
                                fieldLabel: 'Comment'
                            },
                            {
                                itemId: 'delimiter',
                                xtype: '_hiveDelimiterSelCmbField'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            width: 340
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'location',
                                itemId: 'locationTextField',
                                fieldLabel: 'Location',
                                vtype: 'alphanum'
                            },
                            {
                                xtype: 'button',
                                text: 'Browse',
                                width: 60,
                                handler: function () {
                                    var popWindow = Ext.create('Ext.Window', {
                                        title: 'Apache Hadoop HDFS Browser',
                                        width: 950,
                                        height: 450,
                                        animCollapse: false,
                                        constrainHeader: true,
                                        layout: 'fit',
                                        items: [
                                            Ext.create('Flamingo.view.fs.hdfs.Viewport')
                                        ],
                                        buttons: [
                                            {
                                                text: MSG.COMMON_OK,
                                                iconCls: 'common-confirm',
                                                handler: function () {
                                                    // 서버 갔다가 저장함.
                                                }
                                            },
                                            {
                                                text: MSG.COMMON_CANCEL,
                                                iconCls: 'common-cancel',
                                                handler: function () {
                                                    popWindow.close();
                                                }
                                            }
                                        ]
                                    });
                                    popWindow.center().show();
                                }
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Column',
                region: 'center',
                border: false,
                layout: 'fit',
                items: [
                    {
                        itemId: 'columnGrid',
                        xtype: '_hiveColumnGrid'
                    }
                ]
            },
            {
                title: 'Partition',
                region: 'south',
                height: 150,
                border: false,
                layout: 'fit',
                items: [
                    {
                        itemId: 'partitionGrid',
                        xtype: '_hiveColumnGrid'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
