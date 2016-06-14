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
 * Workflow Designer : NodeTab View
 *
 * @class
 * @extends Ext.tab.Panel
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.NodeTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.nodeTab',

    minTabWidth: 100,

    border: false,

    items: [
        {
            title: MSG.DESIGNER_TITLE_ALL,
            xtype: 'nodeList'
        },
        /*
         {
         title: 'Input & Output',
         xtype: 'nodeList',
         type: 'IN,OUT'
         },

         {
         title: MSG.DESIGNER_TITLE_HADOOP,
         xtype: 'nodeList',
         type: 'HADOOP'
         },*/
        {
//            title: MSG.DESIGNER_TITLE_STATISTICS,
            title: 'Statistics',
            xtype: 'nodeList',
            type: 'STATISTICS'
        },
        {
//            title: MSG.DESIGNER_TITLE_MINING,
            title: 'Classification',
            xtype: 'nodeList',
            type: 'CLASSIFICATION'
        },
        {
            title: 'Clustering',
            xtype: 'nodeList',
            type: 'CLUSTERING'
        },
        {
            title: 'Correlation',
            xtype: 'nodeList',
            type: 'CORRELATION'
        },
        {
            title: 'Recommendation',
            xtype: 'nodeList',
            type: 'RECOMMENDATION'
        },

        {
//            title: MSG.DESIGNER_TITLE_ETL,
            title: 'Preprocessing',
            xtype: 'nodeList',
            type: 'PREPROCESSING'
        },
        {
            title: 'Hadoop Ecosystem',
            xtype: 'nodeList',
            type: 'HADOOP'
        }
//        {
//            title: MSG.DESIGNER_TITLE_OTHERS,
//            xtype: 'nodeList',
//            type: 'OTHERS'
//        }

        /*        {
         title: 'Apache',
         xtype: 'nodeList',
         type: 'ALG'
         }*/
        /*
         ,
         {
         title: 'ETL',
         xtype: 'nodeList',
         type: 'ETL'
         },
         {
         title: 'Integration',
         xtype: 'nodeList',
         type: 'INT'
         }
         */
    ]
});