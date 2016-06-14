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
 * Workflow Designer : Main Canvas View
 *
 * @class
 * @extends Ext.form.Panel
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.ns('Flamingo.view.designer.shape');
Ext.ns('Flamingo.view.designer.shape.ankus');

Ext.define('Flamingo.view.designer.Canvas', {
    extend: 'Ext.form.Panel',
    alias: 'widget.canvas',

    /**
     * Workflow Designer의 UI 노드
     */
    requires: [
//        'Flamingo.view.component._WorkflowEngineCombo',

        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CERTAIN_FACTOR_SUM',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CF_ITEM_RECOMMEND',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CF_SIM',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CF_USER_RECOMMEND',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CONTENT_SIM',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CORR_BOOL',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CORR_NUMERIC',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_CORR_STRING',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_KMEANS',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_EM',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_ID3',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_NOMINAL_STATISTICS',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_NORMAL',
        'Flamingo.view.designer.shape.ankus.ALG_ANKUS_NUMERIC_STATISTICS',

        'Flamingo.view.designer.shape.HADOOP_HIVE',
        'Flamingo.view.designer.shape.HADOOP_MR',
        'Flamingo.view.designer.shape.HADOOP_JAVA',
        'Flamingo.view.designer.shape.HADOOP_PIG',

//        'Flamingo.view.designer.shape.giraph.ALG_GIRAPH',
//        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_CF_ITEM',
//        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_KMEANS',
//        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_MINHASH',
//        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_CANOPY',
//        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_PARALLEL_FP_MINING',
//        'Flamingo.view.designer.shape.HADOOP_SHELL',
//        'Flamingo.view.designer.shape.HADOOP_PYTHON',

        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CERTAIN_FACTOR_SUM',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CF_ITEM_RECOMMEND',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CF_SIM',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CF_USER_RECOMMEND',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CONTENT_SIM',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CORR_BOOL',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CORR_NUMERIC',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_CORR_STRING',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_KMEANS',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_EM',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_ID3',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_NOMINAL_STATISTICS',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_NORMAL',
        'Flamingo.view.designer.property.ankus.ALG_ANKUS_NUMERIC_STATISTICS',

        'Flamingo.view.designer.property.HADOOP_HIVE',
        'Flamingo.view.designer.property.HADOOP_MR',
        'Flamingo.view.designer.property.HADOOP_JAVA',
        'Flamingo.view.designer.property.HADOOP_PIG'

//        'Flamingo.view.designer.property.giraph.ALG_GIRAPH',
//        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_CF_ITEM',
//        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_KMEANS',
//        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_MINHASH',
//        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_CANOPY',
//        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_PARALLEL_FP_MINING',
//        'Flamingo.view.designer.property.HADOOP_SHELL',
//        'Flamingo.view.designer.property.HADOOP_PYTHON',

    ],

    layout: 'fit',

    border: false,

    autoScroll: true,

    forceLayout: true,

    cls: 'canvas_contents',

    graph: null,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'displayfield',
                    labelWidth: 100,
                    fieldLabel: MSG.DESIGNER_H_CLUSTER
                },
                {
                    xtype: '_workflowEngineCombo',
                    filter: 'HADOOP',
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            var canvas = this.up('canvas');
                            var form = canvas.getForm();
                            form.setValues({
                                engine_id: newValue
                            });
                        }
                    }
                },
                {
                    tooltip: MSG.DESIGNER_TIP_REFRESH,
                    iconCls: 'common-refresh',
                    handler: function () {
                        var cb = this.up('canvas').down('_workflowEngineCombo');
                        cb.store.removeAll();
                        cb.lastQuery = null;
                    }
                },
                {
                    xtype: 'textfield',
                    id: 'wd_fld_name',
                    name: 'name',
                    emptyText: MSG.DESIGNER_MSG_WORKFLOW_NAME,
                    width: 400,
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    xtype: 'hidden',
                    id: 'wd_fld_id',
                    name: 'id',
                    tooltip: MSG.DESIGNER_TIP_FLD_ID,
                    allowBlank: true
                },
                {
                    xtype: 'hidden',
                    id: 'wd_fld_tree_id',
                    name: 'tree_id',
                    tooltip: MSG.DESIGNER_TIP_FLD_TREE_ID,
                    allowBlank: true
                },
                {
                    xtype: 'hidden',
                    id: 'wd_fld_status',
                    name: 'status',
                    tooltip: MSG.DESIGNER_TIP_FLD_STATUS,
                    allowBlank: true
                },
                {
                    xtype: 'hidden',
                    id: 'wd_fld_instance_id',
                    name: 'workflow_id',
                    tooltip: MSG.DESIGNER_TIP_FLD_INSTANCE_ID,
                    allowBlank: true
                },
                {
                    xtype: 'hidden',
                    id: 'wd_fld_engine_id',
                    name: 'engine_id',
                    tooltip: MSG.DESIGNER_TIP_FLD_ENGINE_ID,
                    allowBlank: true
                },
                {
                    xtype: 'hidden',
                    id: 'wd_fld_desc',
                    name: 'desc',
                    tooltip: MSG.DESIGNER_TIP_FLD_DESC,
                    allowBlank: true
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    id: 'wd_btn_desc',
                    text: MSG.COMMON_DESC,
                    iconCls: 'designer-explanation',
                    tooltip: MSG.DESIGNER_TIP_BTN_DESC
                },
                '-',
                {
                    id: 'wd_btn_create',
                    text: MSG.COMMON_NEW,
                    iconCls: 'designer-create',
                    tooltip: MSG.DESIGNER_TIP_BTN_CREATE
                },
                {
                    id: 'wd_btn_save',
                    text: MSG.COMMON_SAVE,
                    iconCls: 'designer-save',
                    tooltip: MSG.DESIGNER_TIP_BTN_SAVE
                },
                {
                    id: 'wd_btn_run',
                    text: MSG.COMMON_RUN,
                    iconCls: 'designer-action',
                    tooltip: MSG.DESIGNER_TIP_BTN_RUN,
                    disabled: true
                }
                ,
                '-',
                {
                    id: 'wd_btn_xml',
                    text: MSG.COMMON_SHOW_XML,
                    iconCls: 'designer-workflow-xml',
                    tooltip: MSG.DESIGNER_TIP_BTN_XML,
                    disabled: true
                }
                /*
                 ,
                 '-',
                 {
                 id: 'wd_btn_clone',
                 text: 'Copy',
                 iconCls: 'hdfs-file-copy',
                 tooltip: 'Copy current workflow.'
                 }
                 */
            ]
        }
    ]
});