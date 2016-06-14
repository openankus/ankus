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

Ext.define('Flamingo.view.designer.WorkflowTree', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowTree',

    border: false,

    layout: 'border',

    forceFit: true,

    stores: ['designer.WorkflowTreeStore'],

    initComponent: function () {
        this.items = [
            {
                region: 'center',
                border: false,
                xtype: 'treepanel',
                itemId: 'workflowTreePanel',
                rootVisible: true,
                useArrows: true,
                store: 'designer.WorkflowTreeStore',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                iconCls: 'common-folder-expand',
                                itemId: 'hdfsExpandAllButton',
                                tooltip: MSG.DESIGNER_TIP_EXPAND,
                                handler: function () {
                                    var panel = Ext.ComponentQuery.query('workflowTree > treepanel')[0];
                                    panel.expandAll();
                                }
                            },
                            {
                                iconCls: 'common-folder-collapse',
                                itemId: 'hdfsCollapseAllButton',
                                tooltip: MSG.DESIGNER_TIP_COLLAPSE,
                                handler: function () {
                                    var panel = Ext.ComponentQuery.query('workflowTree > treepanel')[0];
                                    panel.collapseAll();
                                }
                            },
                            '->',
                            /*
                             {
                             itemId: 'createFolderMenu',
                             iconCls: 'common-folder-create',
                             tooltip: 'Create a folder'
                             },
                             {
                             itemId: 'renameFolderMenu',
                             tooltip: 'Rename a folder',
                             iconCls: 'common-folder-rename'
                             },
                             */
                            {
                                itemId: 'deleteFolderMenu',
                                tooltip: MSG.DESIGNER_TIP_DELETE_FOLDER,
                                iconCls: 'common-folder-delete'
                            },
                            '-',
                            {
                                tooltip: MSG.DESIGNER_TIP_REFRESH_ALL,
                                iconCls: 'common-refresh',
                                itemId: 'refreshWorkflowButton',
                                handler: function () {
                                    var panel = Ext.ComponentQuery.query('workflowTree > treepanel')[0];
                                    panel.getStore().load();
                                }
                            }
                        ]
                    }
                ],
                listeners: {
                    render: function () {
                        // 브라우저 자체 Right Button을 막고자 한다면 uncomment한다.
                        Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
                    },
                    itemdblclick: function (view, record, item, index, e) {
                        if (record.data.iconCls == 'designer_not_load') {
                            Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_WF_LOADING, msg: MSG.DESIGNER_MSG_WF_LOADING_WARN,
                                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                            });
                            return;
                        }

                        if (record.data.cls != 'folder' && record.data.id != '/') {
                            var canvas = Ext.ComponentQuery.query('canvas')[0];

                            Ext.MessageBox.show({
                                title: MSG.DESIGNER_TITLE_WF_LOADING,
                                msg: Ext.String.format(MSG.DESIGNER_MSG_WF_LOADING_YESNO, record.data.text),
                                buttons: Ext.MessageBox.YESNO,
                                icon: Ext.MessageBox.INFO,
                                fn: function handler(btn) {
                                    if (btn == 'yes') {
                                        var treePanel = Ext.ComponentQuery.query('workflowTree > treepanel')[0];
                                        var node = treePanel.getSelectionModel().getSelection()[0].raw;
                                        if (node.leaf) { // 폴더인 경우에는 경로 메시지를 띄우고 노드의 경우에는 정상 처리한다.
                                            var id = node.workflowId;
                                            Flamingo.Ajax.Request.invokeGetWithHeader(CONSTANTS.DESIGNER.LOAD_WORKFLOW, {'Accept': 'text/plain'}, {id: id},
                                                function (response) {
                                                    var canvas = Ext.ComponentQuery.query('canvas')[0];
                                                    var variableGrid = Ext.ComponentQuery.query('variableGrid')[0];

                                                    var graphXML, graphJSON, workflowData,
                                                        form = canvas.getForm();

                                                    // graph xml example
                                                    graphXML = response.responseText;

                                                    // XML 스트링을 JSON Object 로 변환하여 정보 획득
                                                    graphJSON = OG.Util.xmlToJson(OG.Util.parseXML(graphXML));

                                                    workflowData = OG.JSON.decode(unescape(graphJSON.opengraph['@data']));

                                                    // 워크플로우 정보 로딩(클러스터, 워크플로우명, 설명, 워크플로우 식별자, 트리 식별자)
                                                    form.setValues(workflowData.workflow);

                                                    // 워크플로우 변수 정보 로딩
                                                    variableGrid.getStore().loadData(workflowData.globalVariables);

                                                    // 워크플로우 그래프 Shape 로딩
                                                    canvas.graph.loadJSON(graphJSON);

                                                    var runButton = Ext.ComponentQuery.query('canvas #wd_btn_run')[0];
                                                    runButton.setDisabled(false);

                                                    var xmlButton = Ext.ComponentQuery.query('canvas #wd_btn_xml')[0];
                                                    xmlButton.setDisabled(false);
                                                },
                                                function (response) {
                                                    Ext.MessageBox.show({ title: TITLE_WF_LOADING, msg: MSG.DESIGNER_MSG_WF_LOADING_CAUSE + response.responseText,
                                                        buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                                    });
                                                }
                                            );
                                        } else {
                                            Ext.MessageBox.show({ title: TITLE_WF_LOADING, msg: MSG.DESIGNER_MSG_WF_LOADING_CHOICE,
                                                buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            }
        ];
        this.callParent(arguments);
    }
});