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

/**
 * Viewport 역할을 하는 Pig Editor Panel.
 */
Ext.define('Flamingo.view.pig.PigEditorPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pigEditorPanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo',
        'Flamingo.view.component._StatusBar',

        'Flamingo.view.designer.property._KeyValueGrid',
        'Flamingo.view.designer.property._JarGrid',

        'Flamingo.view.pig.PigEditor'
    ],

    layout: 'border',

    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: 'fit',
                    region: 'center',
                    items: [
                        {
                            xtype: 'pigEditor'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    region: 'south',
                    collapsible: true,
                    split: true,
                    height: 230,
                    activeTab: 0,
                    items: [
                        {
                            title: MSG.PIG_HADOOP_CONFIGURATION,
                            xtype: 'form',
                            border: false,
                            autoScroll: true,
                            defaults: {
                                labelWidth: 100
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: '_keyValueGrid',
                                    itemId: 'confs',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            title: MSG.PIG_SCRIPT_VARIABLE,
                            xtype: 'form',
                            border: false,
                            autoScroll: true,
                            defaults: {
                                labelWidth: 100
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: '_keyValueGrid',
                                    itemId: 'vars',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            title: MSG.PIG_UDF_JAR,
                            xtype: 'form',
                            border: false,
                            autoScroll: true,
                            defaults: {
                                labelWidth: 100
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: '_jarGrid',
                                    itemId: 'externals',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbtext',
                            text: MSG.COMMON_WORKFLOW_ENGINE
                        },
                        {
                            xtype: '_workflowEngineCombo',
                            itemId: 'editorEngineCombo',
                            type: 'HADOOP'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'tbtext',
                            text: MSG.PIG_PIG_SCRIPT_NAME
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            itemId: 'scriptName',
                            allowBlank: false
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'saveButton',
                            iconCls: 'designer-save',
                            text: MSG.PIG_SAVE
                        },
                        '-',
                        {
                            xtype: 'button',
                            itemId: 'runButton',
                            iconCls: 'designer-action',
                            text: MSG.PIG_RUN
                        },
                        // Save를 한 후에 PK가 여기에 설정된다. Save여부는 이 값으로 확인한다.
                        {
                            xtype: 'hidden',
                            itemId: 'scriptId',
                            name: 'scriptId',
                            allowBlank: true
                        },
                        // 작업을 실행한 후에 최근 실행한 Job ID를 기억한다. Pig에서는 Workflow History ID를 Job ID로 간주한다.
                        {
                            xtype: 'hidden',
                            itemId: 'workflowId',
                            name: 'workflowId',
                            allowBlank: true
                        }
                    ]
                }
            ],
            bbar: {
                xtype: '_statusBar'
            }
        });

        this.callParent(arguments);
    }
});