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
 * designer : File preview
 *
 * @author Jaesung Ahn
 */
Ext.define('Flamingo.view.designer.FilePreview', {
	title: 'File Preview',
	itemId:'FilePreview',
	id:'FilePreview',
	alias: 'widget.FilePreview',
	
	requires: [
		'Flamingo.model.designer.Preview'
	],
	
	targetFieldId : '',
	targetFieldName : '',
	idList: '',
	isMulti : false,
	
	modal:true,
	constructor: function (config) {
		var me = this;
		this.config = config;
		
		this.targetFieldId = config.targetFieldId;
		//this.targetFieldName =  config.targetFieldId.slice(2);
		this.isMulti = config.isMulti;

		this.callParent(arguments);

		var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
		var inputGrid = Ext.ComponentQuery.query('_inputGrid')[0];

		var selectedInputPath = inputGrid.getView().getSelectionModel().getSelection();

		if (selectedInputPath[0] === undefined) {
			msg('Add File and Dirctory', 'Please input File Path or Dirctory Path.');
			return;
		}

		var inputPath = selectedInputPath[0].data.input;
		var inputGridCanvas = Ext.ComponentQuery.query('canvas')[0];
        var inputGridForm = inputGridCanvas.getForm();
        var engineId = inputGridForm.getValues()['engine_id'];		
		var delimiter = Ext.getCmp('delimiterValue').getValue();	
		//var useFirstRecord = Ext.getCmp('v_useFirstRecord').getValue().useFirstRecord;	
		
		if(delimiter == undefined) {
			delimiter = '\\t';
		}

		var store = Ext.create('Ext.data.Store', {
			fields: [
				{name: 'columnIndex'},
				{name: 'rowData'}
			],
			autoLoad: true,
			proxy: {
				type: 'ajax',
				url: CONSTANTS.CONTEXT_PATH + CONSTANTS.DESIGNER.LOAD_HDFS_FILE,
				headers: {
					'Accept': 'application/json'
				},
				reader: {
					type: 'json',
					root: 'list'
				},
				extraParams: {
					'inputPath': inputPath,
					'delimiter': delimiter,
					'engineId': engineId
				}
			}
		});

		//Set grid row to preview file from hdfs
		var rec;
		var columnIndexList;
		var rowDataList;
		
		
		store.on('load', function (store, records) {			
			
		columnIndexList = records[0].get('columnIndex');
		
		for (var k = 0; k < columnIndexList.length; k++) {

			var jsonForm = Ext.getCmp('jsonForm'); 
			var selectIndex = [];
			
			for(var i=0; i<jsonForm.items.items.length; i++){
					
					var xtype = jsonForm.items.items[i].xtype;
				
					if(xtype == 'fieldcontainer'){		
					var paramVal = jsonForm.items.items[i].items.items[0].id;
					var v_val = Ext.getCmp(paramVal).getValue();
					
					var strval = v_val.split(',');
					for(var j=0; j<strval.length; j++){
						selectIndex.push(strval[j]);
					}
				}
				
			}	
			
			var str_data = 0;
			for(var i = 0; i < selectIndex.length; i++){

				if(selectIndex[i] != '' && selectIndex[i] == columnIndexList[k]){
					str_data = 2;
					break;
				}
			}
			
			var strval = Ext.getCmp(me.targetFieldId).getValue().split(',');
			
			for(var i = 0; i < strval.length; i++){

				if(strval[i] != '' && strval[i] == columnIndexList[k]){
					str_data = 1;
					break;
				}
			}
			
			//console.info(str_data);
			
			rec = new Flamingo.model.designer.Preview({
				rIndex: columnIndexList[k],		
				rData: str_data
			});
			
			store.insert(0, rec);
			//Remove get list from ajax
			store.remove(records);

		}
					
		store.sort('rIndex', 'ASC');
		
		});
		
		var previewGrid = {
			margin: '10 0 0 0',
			xtype: 'grid',
			id: 'v_previewGrid',
			itemId: 'previewGrid',
			multiSelect: true,
			store : store,
			columns: [
				{
					header: 'column',
					width: 90,
					dataIndex: 'rIndex',
					align:'center',
					id: 'rIndex'
				},				
				{
					xtype: 'checkcolumn',
					width: 75,					
					header: 'select',
					id: 'v_test',
					dataIndex: 'rData',
					editor: {
						xtype: 'checkbox',
						cls: 'x-grid-checkheader-editor'
					},
    				renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var cssPrefix = Ext.baseCSSPrefix,
                            cls = cssPrefix + 'grid-checkcolumn';

                        if (this.disabled || value == 2) {
                            metaData.tdCls += ' ' + this.disabledCls;
                        }
                        if (value) {
                            cls += ' ' + cssPrefix + 'grid-checkcolumn-checked';
                        }
                        return '<img class="' + cls + '" src="' + Ext.BLANK_IMAGE_URL + '"/>';
                    }
    				
					
				}
			],
			tbar: [
				{
					text: 'Target All',
					iconCls: 'common-confirm',
					scope: this,
					align: 'right',
					handler: function (store) {
						var previewGrid = Ext.getCmp('v_previewGrid');
						var range = previewGrid.store.getRange();

						for (var i = 0; i < range.length; i++) {
							if (range[i] != null) {
								var record = previewGrid.getStore().getAt(i);
								record.set('rData', true);
							}
						}
					}
				},
				{
					text: 'Reset',
					iconCls: 'common-find-clear',
					scope: this,
					align: 'right',
					handler: function (store) {
						var previewGrid = Ext.getCmp('v_previewGrid');
						var range = previewGrid.store.getRange();

						for (var i = 0; i < range.length; i++) {
							if (range[i] != null) {
								var record = previewGrid.getStore().getAt(i);
								record.set('rData', false);
							}
						}
					}
				}
			]
		};
		

		var window = Ext.create('Ext.Window',{
			title: 'File preview',
			width:180,
			height:250,
			border:false,
			layout: 'fit',
			modal:true,
			items:[
				previewGrid, 
			],
			buttons: [
				{
					text: MSG.COMMON_OK,
					iconCls: 'common-confirm',
					handler: function () {						
						var previewGrid = Ext.getCmp('v_previewGrid');
						var r = previewGrid.store.getRange();
						var targetCount = 0;
						var record;
						
						for (var i = 0; i < r.length; i++) {
							if (r[i] != null) {
								record = previewGrid.getStore().getAt(i);
								if (r[i].data.rData) targetCount++;							
							}
						}
						
						var targetIndexList = [];
						
						for (var i = 0; i < r.length; i++) {
							if (r[i] != null) {
								record = previewGrid.getStore().getAt(i);
                                if (targetCount != 0) {
                                    if (r[i].data.rData === true || r[i].data.rData === 1) { 
                                    	var v_r = r[i].data.rIndex;
                                        targetIndexList.push(v_r);                                        
                                        if (targetCount === targetCount - 1) {
                                            targetIndexList.push(',');
                                        }
                                    }
                                }
							}
						}						
						
						if (targetCount == r.length) {
                            Ext.getCmp(me.targetFieldId).setValue('-1');
                        } else if (targetCount === 0) {
                            Ext.getCmp(me.targetFieldId).setValue('');
                        } else {
                            Ext.getCmp(me.targetFieldId).setValue(targetIndexList);
                        }   
						
						Ext.getCmp(me.targetFieldId).setValue(targetIndexList);
						window.close();
					}
				},
				{
					text: MSG.COMMON_CANCEL,
					iconCls: 'common-cancel',
					handler: function () {
						window.close();
					}
				}
			]
				
		}).show();
	}
 });