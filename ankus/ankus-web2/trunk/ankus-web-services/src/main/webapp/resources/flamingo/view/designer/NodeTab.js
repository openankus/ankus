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
    	/*
        {
            title: MSG.DESIGNER_TITLE_ALL,
            xtype: 'nodeList'
        },
        {
            title: 'Statistics',
            xtype: 'nodeList',
            type: 'STATISTICS'
        },
        {
          title: 'Preprocessing',
          xtype: 'nodeList',
          type: 'PREPROCESSING'
        },
        {
            title: 'Correlation',
            xtype: 'nodeList',
            type: 'CORRELATION'
        },
        {
            title: 'Association',
            xtype: 'nodeList',
            type: 'ASSOCIATION'
        },
        {
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
            title: 'Recommendation',
            xtype: 'nodeList',
            type: 'RECOMMENDATION'
        },       
        {
            title: 'Hadoop Ecosystem',
            xtype: 'nodeList',
            type: 'HADOOP'
        }
		*/
		 
         
{
    title: 'etc',
    xtype: 'nodeList',
    type: 'etc'
},
    
        {
            title: MSG.DESIGNER_TITLE_ALL,
            xtype: 'nodeList'
        },        
        {
            title: 'Statistics',
            xtype: 'nodeList',
            type: 'STATISTICS'
        },
        {
          title: 'Preprocessing',
          xtype: 'nodeList',
          type: 'PREPROCESSING'
        },
        {
            title: 'Correlation',
            xtype: 'nodeList',
            type: 'CORRELATION'
        },
        {
            title: 'Association',
            xtype: 'nodeList',
            type: 'ASSOCIATION'
        },
        {
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
            title: 'Recommendation',
            xtype: 'nodeList',
            type: 'RECOMMENDATION'
        },       
        {
            title: 'Hadoop Ecosystem',
            xtype: 'nodeList',
            type: 'HADOOP'
        }    
    ],
    defaults:{
		listeners:{
			activate: function(selModel, Cmp){				
				var nodeMetaCommon = Ext.create('Flamingo.store.designer.NodeMetaCommon');
				
				nodeMetaCommon.load(function () {
					var filterType = selModel.type;
					//console.info(filterType);
					if (filterType) {
						nodeMetaCommon.filter({
							
		                    filterFn: function (item) {
//		                    	console.info('----------------');
//		                    	console.info(filterType);
		                    	//console.info(item.get("type"));
//		                    	console.info('----------------');
		                        if (item.get("type") == filterType) {
		                            return true;
		                        }
		                    }
		                    
		                });
		            } else {
		            	nodeMetaCommon.filter({
		                    filterFn: function (item) {
		                        if (item.get("type") !== 'START' && item.get("type") !== 'END') {
		                            return true;
		                        }
		                    }
		            	});
		            }
					selModel.store.data.removeAll();
					selModel.store.data.addAll(nodeMetaCommon.data.items);
					//console.log(nodeMetaCommon.data.items.length);
				});

			}

		}
	}
});