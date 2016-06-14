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

Ext.define('Flamingo.view.job.JobRegistPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jobRegistPanel',

    requires: [
        'Flamingo.view.component._WorkflowEngineCombo',
        'Flamingo.view.job.JobCanvas',
        'Flamingo.view.job.JobWorkflowTreePanel',
        'Flamingo.view.job.CronTrigger',
        'Flamingo.view.job.JobListPanel',
        'Flamingo.view.job.VariableGrid',
        'Flamingo.view.job.JobStatusBar'
    ],

    stores: ['job.WorkflowTree'],

    border: false,

    layout: {
        type: 'border'
    },

    constructor: function (config) {
        this.callParent(arguments);
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                border: false,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'panel',
                        flex: 1,
                        bodyPadding: 3,
                        border: false,
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'panel',
                                layout: {
                                    type: 'border'
                                },
                                border: false,
                                items: [
                                    {
                                        title: 'Job Information',
                                        region: 'north',
                                        border: false,
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
                                                    margins: '5 5 5 5'
                                                },
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        labelStyle: 'font-weight:bold;padding:0',
                                                        layout: 'vbox',
                                                        flex: 1,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                layout: 'column',
                                                                items: [
                                                                    {
                                                                        xtype: 'textfield',
                                                                        itemId: 'jobName',
                                                                        name: 'jobName',
                                                                        fieldLabel: 'Job Name',
                                                                        value: '',
                                                                        width: 450,
                                                                        margin: '0 0 5 5',
                                                                        allowBlank: false
                                                                    },
                                                                    {
                                                                        xtype: 'button',
                                                                        text: 'Choose',
                                                                        margin: '0 0 5 5',
                                                                        itemId: 'selectButton',
                                                                        handler: function () {
                                                                            var win = Ext.create('Ext.window.Window', {
                                                                                height: 450,
                                                                                width: 350,
                                                                                closable: true,
                                                                                title: 'Workflow',
                                                                                modal: true,
                                                                                closeAction: 'close',
                                                                                layout: 'fit',
                                                                                items: [
                                                                                    {
                                                                                        xtype: 'jobWorkflowTreePanel'
                                                                                    }
                                                                                ],
                                                                                buttons: [
                                                                                    {
                                                                                        text: MSG.COMMON_OK,
                                                                                        iconCls: 'common-confirm',
                                                                                        handler: function () {
                                                                                            var treepanel = win.query('jobWorkflowTreePanel > treepanel')[0];
                                                                                            var selected = treepanel.getSelectionModel().getLastSelected();

                                                                                            var regWin = win;
                                                                                            if (selected && selected.isLeaf()) {
                                                                                                var node = selected.raw;
                                                                                                invokeGet(CONSTANTS.JOB.GET_WORKFLOW, {id: node.workflowId},
                                                                                                    function (response) {
                                                                                                        regWin.close();

                                                                                                        var obj = Ext.decode(response.responseText);
                                                                                                        query('jobRegistPanel #writer').setValue(obj.object.username);
                                                                                                        query('jobRegistPanel #createDate').setValue(Flamingo.Util.Date.format(new Date(obj.object.create), 'yyyy-MM-dd HH:mm:ss'));
                                                                                                        query('jobRegistPanel #workflowXml').setValue(obj.object.workflowXml);
                                                                                                        query('jobRegistPanel #jobName').setValue(obj.object.workflowName);
                                                                                                        query('jobRegistPanel #workflowId').setValue(obj.object.workflowId);
                                                                                                        query('jobRegistPanel #status').setValue(obj.object.status);
                                                                                                        query('jobRegistPanel #wid').setValue(obj.object.id);
                                                                                                    },
                                                                                                    function (failure) {
                                                                                                        Ext.MessageBox.show({ title: '워크플로우 정보 확인', msg: '워크플로우 정보를 확인할 수 없습니다.',
                                                                                                            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                                                                                        });
                                                                                                    }
                                                                                                );

                                                                                                /*
                                                                                                 console.log(node);
                                                                                                 if (node.leaf) { // 폴더인 경우에는 경로 메시지를 띄우고 노드의 경우에는 정상 처리한다.
                                                                                                 var id = node.workflowId;
                                                                                                 Flamingo.Ajax.Request.invokeGetWithHeader(CONSTANTS.DESIGNER.LOAD_WORKFLOW, {'Accept': 'text/plain'}, {id: id},
                                                                                                 function (response) {
                                                                                                 var canvas = query('jobCanvas');

                                                                                                 if (canvas.graph) canvas.graph.clear();

                                                                                                 var graphXML, graphJSON, workflowData,
                                                                                                 form = canvas.getForm();

                                                                                                 // graph xml example
                                                                                                 graphXML = response.responseText;

                                                                                                 // XML 스트링을 JSON Object 로 변환하여 정보 획득
                                                                                                 graphJSON = OG.Util.xmlToJson(OG.Util.parseXML(graphXML));

                                                                                                 workflowData = OG.JSON.decode(unescape(graphJSON.opengraph['@data']));

                                                                                                 // 워크플로우 정보 로딩(클러스터, 워크플로우명, 설명, 워크플로우 식별자, 트리 식별자)
                                                                                                 form.setValues(workflowData.workflow);

                                                                                                 // 워크플로우 그래프 Shape 로딩
                                                                                                 canvas.graph.loadJSON(graphJSON);

                                                                                                 query('jobRegistPanel #jobName').setValue(workflowData.workflow.name);
                                                                                                 query('jobRegistPanel #editorEngineCombo').setValue(workflowData.workflow.engine_id);

                                                                                                 },
                                                                                                 function (response) {
                                                                                                 Ext.MessageBox.show({ title: 'Warning', msg: '워크플로우를 로딩할 수 없습니다. 원인: ' + response.responseText,
                                                                                                 buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR
                                                                                                 });
                                                                                                 }
                                                                                                 );
                                                                                                 } else {
                                                                                                 Ext.MessageBox.show({ title: 'Warning', msg: '워크플로우를 선택하여 주십시오.',
                                                                                                 buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR
                                                                                                 });
                                                                                                 }

                                                                                                 win.close();
                                                                                                 */
                                                                                            } else {
                                                                                                Ext.MessageBox.show({ title: '워크플로우 선택', msg: '워크플로우를 선택하십시오.',
                                                                                                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: MSG.COMMON_CANCEL,
                                                                                        iconCls: 'common-cancel',
                                                                                        handler: function () {
                                                                                            win.close();
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }).center().show();
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'displayfield',
                                                                        margin: '0 0 5 5',
                                                                        value: '실행할 워크플로우를 선택합니다.'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                layout: 'column',
                                                                items: [
                                                                    {
                                                                        xtype: 'displayfield',
                                                                        margin: '0 0 3 3',
                                                                        fieldLabel: 'Workflow Engine'
                                                                    },
                                                                    {
                                                                        xtype: '_workflowEngineCombo',
                                                                        itemId: 'editorEngineCombo',
                                                                        type: 'HADOOP',
                                                                        forceSelection: true
                                                                    },
                                                                    {
                                                                        xtype: 'displayfield',
                                                                        margin: '0 0 5 5',
                                                                        value: '워크플로우를 실행할 워크플로우 엔진을 선택합니다.'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                layout: 'column',
                                                                items: [
                                                                    {
                                                                        xtype: 'textfield',
                                                                        itemId: 'cronExpression',
                                                                        name: 'cronExpression',
                                                                        fieldLabel: 'Cron Expression',
                                                                        value: '0 0 * * * ? *',
                                                                        width: 300,
                                                                        margin: '0 0 5 5',
                                                                        allowBlank: false,
                                                                        listeners: {
                                                                            afterrender: function (element) {
                                                                                // Read Only
                                                                                element.setReadOnly(true);
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'button',
                                                                        text: 'Set',
                                                                        margin: '0 0 5 5',
                                                                        handler: function () {
                                                                            var win = Ext.create('Ext.window.Window', {
                                                                                height: 430,
                                                                                width: 550,
                                                                                closable: true,
                                                                                resizable: false,
                                                                                hideCollapseTool: false,
                                                                                title: 'Cron Expression',
                                                                                titleCollapse: false,
                                                                                modal: true,
                                                                                closeAction: 'close',
                                                                                layout: 'fit',
                                                                                items: [
                                                                                    {
                                                                                        xtype: 'cronTrigger'
                                                                                    }
                                                                                ],
                                                                                buttons: [
                                                                                    {
                                                                                        text: MSG.COMMON_OK,
                                                                                        iconCls: 'common-confirm',
                                                                                        handler: function () {
                                                                                            var cronExpression = query('jobRegistPanel #cronExpression');
                                                                                            var cronTrigger = win.down('cronTrigger');
                                                                                            cronExpression.setValue(cronTrigger.getValue());
                                                                                            win.close();
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        text: MSG.COMMON_CANCEL,
                                                                                        iconCls: 'common-cancel',
                                                                                        handler: function () {
                                                                                            win.close();
                                                                                        }
                                                                                    }
                                                                                ],
                                                                                listeners: {
                                                                                    afterrender: function (comp, opts) {
                                                                                        var cronTrigger = comp.down('cronTrigger');
                                                                                        cronTrigger.setValue(query('#cronExpression').getValue());
                                                                                    }
                                                                                }
                                                                            }).center().show();
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'displayfield',
                                                                        margin: '0 0 5 5',
                                                                        value: '워크플로우의 실행 주기를 Cron Expression으로 지정합니다.'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'fieldset',
                                                                border: false,
                                                                margin: '10 0 0 0',
                                                                layout: {
                                                                    type: 'hbox'
                                                                },
                                                                defaultType: 'textfield',
                                                                items: [
                                                                    {
                                                                        xtype: 'fieldcontainer',
                                                                        labelStyle: 'font-weight:bold;padding:0',
                                                                        layout: 'vbox',
                                                                        width: 250,
                                                                        defaults: {
                                                                            labelWidth: 80,
                                                                            margin: '0 0 5 5'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                xtype: 'displayfield',
                                                                                fieldLabel: 'Workflow ID',
                                                                                itemId: 'workflowId',
                                                                                value: ''
                                                                            },
                                                                            {
                                                                                xtype: 'displayfield',
                                                                                name: 'writer',
                                                                                itemId: 'writer',
                                                                                fieldLabel: 'Writer',
                                                                                value: ''
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'fieldcontainer',
                                                                        labelStyle: 'font-weight:bold;padding:0',
                                                                        layout: 'vbox',
                                                                        width: 250,
                                                                        defaults: {
                                                                            labelWidth: 80,
                                                                            margin: '0 0 5 5'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                fieldLabel: 'Last Modified',
                                                                                xtype: 'displayfield',
                                                                                name: 'createDate',
                                                                                itemId: 'createDate',
                                                                                value: ''
                                                                            },
                                                                            {
                                                                                xtype: 'displayfield',
                                                                                fieldLabel: 'Status',
                                                                                itemId: 'status',
                                                                                margin: '0 0 5 5'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'fieldcontainer',
                                                                        labelStyle: 'font-weight:bold;padding:0',
                                                                        layout: 'vbox',
                                                                        width: 250,
                                                                        defaults: {
                                                                            labelWidth: 80,
                                                                            margin: '0 0 5 5'
                                                                        },
                                                                        items: [
                                                                            {
                                                                                fieldLabel: 'Identifier',
                                                                                xtype: 'displayfield',
                                                                                name: 'wid',
                                                                                itemId: 'wid',
                                                                                value: ''
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        region: 'center',
                                        layout: 'fit',
                                        border: false,
                                        items: {
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            bodyPadding: 5,
                                            deferredRender: false,
                                            layoutOnTabChange: true,
                                            hideMode: 'offsets',
                                            border: false,
                                            items: [
                                                /*
                                                 {
                                                 title: 'Workflow',
                                                 layout: 'fit',
                                                 border: false,
                                                 items: [
                                                 {
                                                 xtype: 'jobCanvas'
                                                 }
                                                 ]
                                                 },
                                                 */
                                                {
                                                    title: 'Workflow XML',
                                                    layout: 'fit',
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'codemirror',
                                                            name: 'xml',
                                                            itemId: 'workflowXml',
                                                            flex: 1,
                                                            padding: '5 5 5 5',
                                                            pathModes: '/resources/lib/codemirror-2.35/mode',
                                                            pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                                                            readOnly: true,
                                                            lineNumbers: true,
                                                            lineWrapping: true,
                                                            matchBrackets: true,
                                                            indentUnit: 2,
                                                            mode: "application/xml",
                                                            showModes: false,
                                                            value: '',
                                                            modes: [
                                                                {
                                                                    mime: ['application/xml'],
                                                                    dependencies: ['xml/xml.js']
                                                                }
                                                            ],
                                                            extraKeys: {
                                                                "Ctrl-Space": "autocomplete",
                                                                "Tab": "indentAuto"
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Job Variables',
                                                    xtype: 'form',
                                                    border: false,
                                                    items: [
                                                        {
                                                            xtype: 'jobVariableGrid'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    },

    listeners: {
        /**
         * Initialize workflow canvas.
         */
        /*
         afterrender: function (component, eOpts) {
         var canvas = query('jobCanvas');

         // 내부 SVG 그래프 캔버스 인스턴스를 생성
         canvas.graph = new OG.Canvas(canvas.body.dom, [790, 600], 'white', 'url(' + CONSTANTS.CONTEXT_PATH + '/resources/images/wallpapers/white.jpg)');

         // OpenGraph 디폴트 스타일 설정
         canvas.graph._CONFIG.DEFAULT_STYLE.EDGE = {
         'stroke': 'blue',
         'stroke-width': 1,
         'stroke-opacity': 1,
         'edge-type': 'bezier',
         'edge-direction': 'c c',
         'arrow-start': 'none',
         'arrow-end': 'classic-wide-long',
         'stroke-dasharray': '',
         'label-position': 'center'
         };

         // OpenGraph 기능 활성화 여부
         canvas.graph._CONFIG.MOVABLE_.EDGE = false;
         canvas.graph._CONFIG.SELF_CONNECTABLE = false;
         canvas.graph._CONFIG.CONNECT_CLONEABLE = false;
         canvas.graph._CONFIG.RESIZABLE = false;
         canvas.graph._CONFIG.LABEL_EDITABLE_.GEOM = false;
         canvas.graph._CONFIG.LABEL_EDITABLE_.TEXT = false;
         canvas.graph._CONFIG.LABEL_EDITABLE_.HTML = false;
         canvas.graph._CONFIG.LABEL_EDITABLE_.IMAGE = false;
         canvas.graph._CONFIG.LABEL_EDITABLE_.EDGE = false;
         canvas.graph._CONFIG.LABEL_EDITABLE_.GROUP = false;
         canvas.graph._CONFIG.ENABLE_HOTKEY_DELETE = false;
         canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_A = false;
         canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_C = false;
         canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_V = false;
         canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_G = false;
         canvas.graph._CONFIG.ENABLE_HOTKEY_CTRL_U = false;
         canvas.graph._CONFIG.ENABLE_HOTKEY_ARROW = true;
         canvas.graph._CONFIG.ENABLE_HOTKEY_SHIFT_ARROW = true;
         }
         */
    }
});