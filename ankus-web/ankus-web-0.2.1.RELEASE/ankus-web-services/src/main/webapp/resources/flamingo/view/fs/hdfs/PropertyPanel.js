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
Ext.define('Flamingo.view.fs.hdfs.PropertyPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hdfsFilePropertyPanel',

    layout: {
        type: 'fit'
    },

    border: false,

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                hidden: false,
                itemId: 'propertyForm',
                autoScroll: false,
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'fieldset',
                        title: MSG.HDFS_INFO_BASIC,
                        items: [
                            {
                                xtype: 'displayfield',
                                itemId: 'name',
                                value: MSG.HDFS_UNKNOWN,
                                fieldLabel: MSG.HDFS_INFO_BASIC_NAME,
                                labelWidth: 100,
                                anchor: '100%'
                            },
                            {
                                xtype: 'textfield',
                                disabled: true,
                                disabledCls: 'disabled_plain',
                                itemId: 'path',
                                value: MSG.HDFS_UNKNOWN,
                                fieldLabel: MSG.HDFS_INFO_BASIC_PATH,
                                labelWidth: 100,
                                anchor: '100%'
                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'typeRadioGroup',
                                maintainFlex: false,
                                fieldLabel: MSG.HDFS_INFO_BASIC_TYPE,
                                labelWidth: 100,
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        disabled: true,
                                        disabledCls: 'disabled_plain',
                                        itemId: 'isFile',
                                        boxLabel: MSG.HDFS_FILE,
                                        checked: true
                                    },
                                    {
                                        xtype: 'radiofield',
                                        disabled: true,
                                        disabledCls: 'disabled_plain',
                                        itemId: 'isDirectory',
                                        boxLabel: MSG.HDFS_DIRECTORY
                                    }
                                ]
                            },
                            {
                                xtype: 'displayfield',
                                itemId: 'length',
                                value: MSG.HDFS_UNKNOWN,
                                fieldLabel: MSG.HDFS_INFO_BASIC_LENGTH,
                                labelWidth: 100,
                                anchor: '100%'
                            },
                            {
                                xtype: 'displayfield',
                                itemId: 'modification',
                                value: MSG.HDFS_UNKNOWN,
                                fieldLabel: MSG.HDFS_INFO_BASIC_MODIFICATION,
                                labelWidth: 100,
                                anchor: '100%'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: MSG.HDFS_INFO_PERMISSION,
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'ownerPermission',
                                fieldLabel: MSG.HDFS_INFO_PERMISSION_OWNER,
                                columns: 3,
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ownerRead',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_READ
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ownerWrite',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_WRITE
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ownerExecute',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_EXECUTE
                                    }
                                ]
                            },
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'groupPermission',
                                fieldLabel: MSG.HDFS_INFO_PERMISSION_GROUP,
                                columns: 3,
                                vertical: false,
                                name: 'Group',
                                formBind: false,
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'groupRead',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_READ
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'groupWrite',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_WRITE
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'groupExecute',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_EXECUTE
                                    }
                                ]
                            },
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'otherPermission',
                                fieldLabel: MSG.HDFS_INFO_PERMISSION_OTHER,
                                columns: 3,
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'otherRead',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_READ
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'otherWrite',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_WRITE
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'otherExecute',
                                        boxLabel: MSG.HDFS_INFO_PERMISSION_EXECUTE
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: MSG.HDFS_INFO_SPACE,
                        layout: 'column',
                        items: [
                            {
                                xtype: 'form',
                                itemId: 'jobInfoForm',
                                border: false,
                                autoScroll: true,
                                layout: {
                                    type: 'hbox'
                                },
                                defaults: {
                                    anchor: '100%',
                                    margins: '10 10 10 10'
                                },
                                defaultType: 'textfield',
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        labelStyle: 'font-weight:bold;padding:0',
                                        layout: 'vbox',
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                itemId: 'blockSize',
                                                value: MSG.HDFS_UNKNOWN,
                                                fieldLabel: MSG.HDFS_INFO_BLOCK_SIZE,
                                                labelWidth: 110
                                            },
                                            {
                                                xtype: 'displayfield',
                                                itemId: 'replication',
                                                value: MSG.HDFS_UNKNOWN,
                                                fieldLabel: MSG.HDFS_INFO_REPLICATION,
                                                labelWidth: 110
                                            },
                                            {
                                                xtype: 'displayfield',
                                                itemId: 'quota',
                                                value: MSG.HDFS_UNKNOWN,
                                                fieldLabel: MSG.HDFS_INFO_QUOTA,
                                                labelWidth: 110
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        labelStyle: 'font-weight:bold;padding:0',
                                        layout: 'vbox',
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                itemId: 'spaceQuota',
                                                value: MSG.HDFS_UNKNOWN,
                                                fieldLabel: MSG.HDFS_INFO_SPACE_QUOTA,
                                                labelWidth: 110
                                            },
                                            {
                                                xtype: 'displayfield',
                                                itemId: 'directoryCount',
                                                value: MSG.HDFS_UNKNOWN,
                                                fieldLabel: MSG.HDFS_INFO_DIRECTORY_COUNT,
                                                labelWidth: 110
                                            },
                                            {
                                                xtype: 'displayfield',
                                                itemId: 'fileCount',
                                                value: MSG.HDFS_UNKNOWN,
                                                fieldLabel: MSG.HDFS_INFO_FILE_COUNT,
                                                labelWidth: 110
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        labelStyle: 'font-weight:bold;padding:0',
                                        layout: 'vbox',
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                itemId: 'spaceConsumed',
                                                value: MSG.HDFS_UNKNOWN,
                                                fieldLabel: MSG.HDFS_INFO_SPACE_CONSUMED,
                                                labelWidth: 110
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});