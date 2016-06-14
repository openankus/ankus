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

Ext.define('Flamingo.view.job.JobCanvas', {
    extend: 'Ext.form.Panel',
    alias: 'widget.jobCanvas',

    /**
     * Workflow Designer의 UI 노드
     */
    requires: [
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

        'Flamingo.view.designer.shape.giraph.ALG_GIRAPH',

        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_CF_ITEM',
        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_KMEANS',
        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_MINHASH',
        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_CANOPY',
        'Flamingo.view.designer.shape.mahout.ALG_MAHOUT_PARALLEL_FP_MINING',

        'Flamingo.view.designer.shape.HADOOP_HIVE',
        'Flamingo.view.designer.shape.HADOOP_MR',
        'Flamingo.view.designer.shape.HADOOP_JAVA',
        'Flamingo.view.designer.shape.HADOOP_SHELL',
        'Flamingo.view.designer.shape.HADOOP_PYTHON',
        'Flamingo.view.designer.shape.HADOOP_PIG',

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

        'Flamingo.view.designer.property.giraph.ALG_GIRAPH',

        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_CF_ITEM',
        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_KMEANS',
        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_MINHASH',
        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_CANOPY',
        'Flamingo.view.designer.property.mahout.ALG_MAHOUT_PARALLEL_FP_MINING',

        'Flamingo.view.designer.property.HADOOP_HIVE',
        'Flamingo.view.designer.property.HADOOP_MR',
        'Flamingo.view.designer.property.HADOOP_JAVA',
        'Flamingo.view.designer.property.HADOOP_SHELL',
        'Flamingo.view.designer.property.HADOOP_PYTHON',
        'Flamingo.view.designer.property.HADOOP_PIG'
    ],

    layout: 'fit',

    border: false,

    autoScroll: true,

    forceLayout: true,

    cls: 'canvas_contents',

    graph: null

});