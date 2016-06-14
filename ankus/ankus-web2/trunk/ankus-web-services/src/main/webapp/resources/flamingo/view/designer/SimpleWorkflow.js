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

Ext.define('Flamingo.view.designer.SimpleWorkflow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.simpleWorkflow',

    border: false,
    layout: 'border',
    forceFit: true,

    stores: ['designer.SimpleWorkflow'],

    initComponent: function () {
        this.items = [
            {
                region: 'center',
                border: false,
                xtype: 'treepanel',
                itemId: 'simpleWorkflowTreePanel',
                rootVisible: true,
                useArrows: true,
                store: 'designer.SimpleWorkflow',
                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop',
                        enableDrop: true,
                        enableDrag: true,
                        allowContainerDrop: true
                    },
                    listeners: {
                        drop: function (node, data, overModel, dropPosition) {
                            var target = overModel.data.id;
                            var source = data.records[0].data.id;
                            var param = {
                                from: String(source),
                                to: String(target),
                                type: CONSTANTS.TREE_NODE_TYPE
                            };
                            Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.REST_MOVE_TREE, param,
                                function (response) {
                                    var obj = Ext.decode(response.responseText);
                                    if (!obj.success) {
                                        var treePanel = Ext.ComponentQuery.query('simpleWorkflow #simpleWorkflowTreePanel')[0];
                                        var child = treePanel.getStore().getNodeById(source);
                                        var parentData = child.parentNode.data;
                                        var parent = treePanel.getStore().getNodeById(parentData.id);
                                        parent.insertChild(0, child);
                                        treePanel.getSelectionModel().select(child);

                                        Ext.MessageBox.show({ title: MSG.HDFS_DIRECTORY_MOVE, msg: MSG.DESIGNER_MSG_NOT_MOVE_FOLDER + ' ' + MSG.DESIGNER_CAUSE + ':' + obj.error.message,
                                            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                        });
                                    }
                                },
                                function (response) {
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_DIRECTORY_MOVE,
                                        msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            );
                        },
                        beforedrop: function (node, data, overModel, dropPosition, dropFunction) {
                            // 이동할 Target이 Folder가 아니면 이동할 필요가 없다.
                            if (overModel.data.cls != 'folder' && overModel.data.id != '/') {
                                return false;
                            }
                        }
                    }
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                iconCls: 'common-folder-expand',
                                itemId: 'hdfsExpandAllButton',
                                tooltip: MSG.DESIGNER_TIP_EXPAND,
                                handler: function () {
                                    var panel = Ext.ComponentQuery.query('simpleWorkflow #simpleWorkflowTreePanel')[0];
                                    panel.expandAll();
                                }
                            },
                            {
                                iconCls: 'common-folder-collapse',
                                itemId: 'hdfsCollapseAllButton',
                                tooltip: MSG.DESIGNER_TIP_COLLAPSE,
                                handler: function () {
                                    var panel = Ext.ComponentQuery.query('simpleWorkflow #simpleWorkflowTreePanel')[0];
                                    panel.collapseAll();
                                }
                            },
                            /*
                             '->',
                             {
                             itemId:'createFolderMenu',
                             iconCls:'common-folder-create',
                             tooltip:'Create a folder',
                             handler:function () {
                             var treepanel = Ext.ComponentQuery.query('#simpleWorkflowTreePanel')[0];
                             var selModel = treepanel.getSelectionModel();
                             var node = selModel.getLastSelected();

                             if (node === null || node.leaf) {
                             Ext.MessageBox.show({ title:'Warning', msg:'추가할 곳의 폴더를 선택하여 주십시오.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             return false;
                             }

                             Ext.MessageBox.prompt('Create', '새로 생성할 폴더명을 입력하여 주십시오.', function (btn, text) {
                             if (btn == 'ok') {

                             var param = {
                             id:'' + node.data.id,
                             text:node.data.text,
                             name:text,
                             nodeType:'folder',
                             treeType:CONSTANTS.TREE_NODE_TYPE
                             };

                             Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.REST_NEW_TREE, param,
                             function (response) {
                             var obj = Ext.decode(response.responseText);
                             if (obj.success) {
                             treepanel.getStore().load();
                             } else {
                             Ext.MessageBox.show({ title:'Warning', msg:'디렉토리를 생성할 수 없습니다. 원인:' + obj.error.message,
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             }
                             },
                             function (response) {
                             Ext.MessageBox.show({ title:'Warning', msg:'디렉토리를 생성할 수 없습니다.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });

                             }
                             );
                             }
                             }, this, false, 'Create a folder');
                             }
                             },
                             {
                             itemId:'renameFolderMenu',
                             tooltip:'Rename a folder',
                             iconCls:'common-folder-rename',
                             handler:function () {
                             var treepanel = Ext.ComponentQuery.query('#simpleWorkflowTreePanel')[0];
                             var selModel = treepanel.getSelectionModel();
                             var node = selModel.getLastSelected();

                             if (node === null || node.leaf) {
                             Ext.MessageBox.show({ title:'Warning', msg:'삭제할 폴더를 선택하여 주십시오.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             return false;
                             }

                             if (node.get('id') == '/') {
                             Ext.MessageBox.show({ title:'Warning', msg:'ROOT는 이름을 변경할 수 없습니다.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             return false;
                             }

                             Ext.MessageBox.prompt('Rename', '변경할 폴더명을 입력하여 주십시오.', function (btn, text) {
                             if (btn == 'ok') {
                             var param = {
                             id:'' + node.get('id'),
                             name:text
                             };

                             Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.REST_RENAME_TREE, param,
                             function (response) {
                             var obj = Ext.decode(response.responseText);
                             if (obj.success) {
                             treepanel.getStore().load();
                             } else {
                             Ext.MessageBox.show({ title:'Warning', msg:'이름을 변경할 수 없습니다. 원인:' + obj.error.message,
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             }
                             },
                             function (response) {
                             Ext.MessageBox.show({ title:'Warning', msg:'이름을 변경할 수 없습니다.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             }
                             );
                             }
                             }, this, false, node.get('text'));
                             }
                             },
                             {
                             itemId:'deleteFolderMenu',
                             tooltip:'Delete a folder',
                             iconCls:'common-folder-delete',
                             handler:function () {
                             var treepanel = Ext.ComponentQuery.query('#simpleWorkflowTreePanel')[0];
                             var selModel = treepanel.getSelectionModel();
                             var node = selModel.getLastSelected();

                             if (node === null || node.leaf) {
                             Ext.MessageBox.show({ title:'Warning', msg:'삭제할 폴더를 선택하여 주십시오.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             return false;
                             }

                             if (node.get('id') == '/') {
                             Ext.MessageBox.show({ title:'Warning', msg:'ROOT는 삭제할 수 없습니다.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             return false;
                             }

                             Ext.MessageBox.show({
                             title:'Warning',
                             msg:node.get('text') + ' 폴더를 삭제하시겠습니까?',
                             buttons:Ext.MessageBox.YESNO,
                             fn:function handler(btn) {
                             if (btn == 'yes') {

                             var param = {
                             id:'' + node.data.id,
                             text:node.data.text,
                             nodeType:'folder',
                             treeType:CONSTANTS.TREE_NODE_TYPE
                             };

                             Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.REST_DELETE_WORKFLOW, param,
                             function (response) {
                             var obj = Ext.decode(response.responseText);
                             if (obj.success) {
                             treepanel.getStore().load();
                             } else {
                             Ext.MessageBox.show({ title:'Warning', msg:'폴더를 삭제할 수 없습니다. 원인:' + obj.error.cause,
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             }
                             },
                             function (response) {
                             Ext.MessageBox.show({ title:'Warning', msg:'폴더를 삭제할 수 없습니다.',
                             buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR
                             });
                             }
                             );
                             }
                             }
                             });
                             }
                             },
                             */
                            '-',
                            {
                                tooltip: MSG.COMMON_REFRESH,
                                iconCls: 'common-refresh',
                                itemId: 'hdfsRefreshButton',
                                handler: function () {
                                    var panel = Ext.ComponentQuery.query('simpleWorkflow #simpleWorkflowTreePanel')[0];
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
                    beforerender: function (obj, eOpts) {
                        var simpleWorkflow = Ext.ComponentQuery.query('simpleWorkflow')[0];
                        var treepanel = simpleWorkflow.query('treepanel')[0];
                        treepanel.getStore().load();
                    },
                    itemclick: function (view, record, item, index, e) {
                        /*
                         if (record.data.cls == 'folder' || record.data.id == '/') {
                         if (record.isExpanded() == true) {
                         record.collapse();
                         } else {
                         record.expand();
                         }
                         }
                         */
                    },
                    itemcontextmenu: function (view, record, item, index, e) {
                    },
                    beforeitemdblclick: function (view, record, item, index, e) {
                    },
                    itemdblclick: function (view, record, item, index, e) {
                        if (record.data.cls != 'folder' && record.data.id != '/') {
                            var canvas = Ext.ComponentQuery.query('canvas')[0];
                            var popWindow = Ext.create('Ext.Window', {
                                title: MSG.DESIGNER_TITLE_SAVE_WORKFLOW,
                                width: 600,
                                height: 400,
                                modal: true,
                                resizable: true,
                                constrain: true,
                                constrainTo: canvas.body,
                                animateTarget: 'wd_btn_load',
                                layout: 'fit',
                                items: {
                                    xtype: 'designer.workflowTree'
                                },
                                buttons: [
                                    {
                                        text: MSG.COMMON_OK,
                                        iconCls: 'common-confirm',
                                        handler: function () {
                                            var treePanel = Ext.ComponentQuery.query('simpleWorkflow #simpleWorkflowTreePanel')[0];
                                            var node = treePanel.getSelectionModel().getSelection()[0].data;
                                            var win = popWindow;
                                            if (node.leaf) { // 폴더인 경우에는 경로 메시지를 띄우고 노드의 경우에는 정상 처리한다.
                                                var treeId = node.id;
                                                Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.REST_GET_WORKFLOW, {treeId: treeId},
                                                    function (response) {
                                                        var obj = Ext.decode(response.responseText);
                                                        if (obj.success) {
                                                            var canvas = Ext.ComponentQuery.query('canvas')[0];
                                                            var variableGrid = Ext.ComponentQuery.query('variableGrid')[0];

                                                            var graphXML, graphJSON, workflowData,
                                                                form = canvas.getForm();

                                                            // graph xml example
                                                            graphXML = GRAPH_XML;

                                                            // XML 스트링을 JSON Object 로 변환하여 정보 획득
                                                            graphJSON = OG.Util.xmlToJson(OG.Util.parseXML(graphXML));

                                                            // FIXME 빈 화면에서 누르게 되면 @data undefined가 발생함.
                                                            workflowData = OG.JSON.decode(unescape(graphJSON.opengraph['@data']));

                                                            // 워크플로우 정보 로딩(클러스터, 워크플로우명, 설명)
                                                            form.setValues(workflowData.workflow);

                                                            // 워크플로우 변수 정보 로딩
                                                            variableGrid.getStore().loadData(workflowData.globalVariables);

                                                            // 워크플로우 그래프 Shape 로딩
                                                            canvas.graph.loadJSON(graphJSON);

                                                            win.close();
                                                        } else {
                                                            Ext.MessageBox.show({
                                                                title: MSG.DESIGNER_TITLE_SAVE_WORKFLOW,
                                                                msg: obj.error.message,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.WARNING
                                                            });
                                                        }
                                                    },
                                                    function (response) {
                                                        Ext.MessageBox.show({
                                                            title: MSG.DESIGNER_TITLE_SAVE_WORKFLOW,
                                                            msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                                            buttons: Ext.MessageBox.OK,
                                                            icon: Ext.MessageBox.WARNING
                                                        });
                                                    }
                                                );
                                            } else {
                                                Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_SAVE_WORKFLOW, msg: MSG.DESIGNER_MSG_CHOOSE_WORKFLOW,
                                                    buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                                });
                                            }
                                        }
                                    }
                                ]
                            }).show();
                        }
                    }
                }
            }
        ];
        this.callParent(arguments);
    }
});