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
Ext.define('Flamingo.view.fs.tajo.TajoMetaFilePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tajoMetaFilePanel',

    layout: 'fit',

    border: false,    
    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                border: false,
                stripeRows: true,
                viewConfig: {
                    enableTextSelection: true
                },
                columns: [     
                    {
                    	text: MSG.HDFS_TYPE, name:'directory', dataIndex: 'directory', align: 'center', flex: 1.5, 
                    	renderer: function(value, metadata, record, rowIndex, colIndex, store) {  
                    		var val = value+"";
                    		 if(val == 'true') {
                    			 metadata.css = 'HDFS-folder';                        			 
                    		}else{
                    			return '';
                    		}               
                    		 
                    	}
                    },
                    {
                    	text: MSG.HDFS_FILE_NAME, dataIndex: 'filename', align: 'center', flex: 2,
            		},
                    {
                        text: MSG.HDFS_FILE_SIZE, sortable: true, dataIndex: 'length', align: 'center', flex: 2,                       
                        renderer: function (num, metadata, record, rowIndex, colIndex, store) {
                            metadata.style = '!important;cursor: pointer;';
                            metadata.tdAttr = 'data-qtip="' + Flamingo.Util.String.toCommaNumber(num) + '"';                            
                            return Ext.util.Format.fileSize(num);                                                       
                        }
                       
                    },
                    {
                        text: MSG.HDFS_FILE_TIME_STAMP, dataIndex: 'modificationTime', align: 'center', flex: 2,
                        renderer: function (value) {
                            var date = new Date(value);
                            return Ext.Date.format(date, 'Y-m-d H:i:s')
                        }
                    }
                ],
                store: Ext.create('Flamingo.store.tajo.TajoMetaFileStore'),
            }            
        ];
        this.callParent(arguments);
    }
});
