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
 * Visualization : File preview
 *
 * @author Jaesung Ahn
 */
Ext.define('Flamingo.view.visualization.FilePreview', {
	title: 'File Preview',
	itemId:'FilePreview',
	id:'FilePreview',
	alias: 'widget.FilePreview',
	
	requires: [
		'Flamingo.model.visualization.Preview'
	],
	
	targetFieldId : '',
	targetFieldName : '',
	isMulti : false,
	
	modal:true,
	constructor: function (config) {
		var me = this;
		this.config = config;
    	
		this.targetFieldId = config.targetFieldId;
		this.targetFieldName =  config.targetFieldId.slice(2);
		this.isMulti = config.isMulti;

		console.info(config);

		this.callParent(arguments);

		var previewGrid = Ext.getCmp('v_previewGrid');
		var inputGrid = Ext.getCmp('v_input');

		var selectedInputPath = inputGrid.getView().getSelectionModel().getSelection();

		if (selectedInputPath[0] === undefined) {
			msg('Add File and Dirctory', 'Please input File Path or Dirctory Path.');
			return;
		}

		var inputPath = selectedInputPath[0].data.input;
		var engineId = Ext.getCmp('v_engine').value;
		var delimiter = Ext.getCmp('v_delimiterValue').getValue();		
		var useFirstRecord = Ext.getCmp('v_useFirstRecord').getValue().useFirstRecord;	
		
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
			for (var i = 0; i < records.length; i++) {
				columnIndexList = records[i].get('columnIndex');
				rowDataList = records[i].get('rowData');

				for (var k = 0; k < columnIndexList.length; k++) {
					var name = '';
					var data = rowDataList[k];
					if (useFirstRecord!='true') {
						name = rowDataList[k].split(',')[0];
						//data = rowDataList[k].split(',').pop(0).toString();
						data = rowDataList[k].substring(name.length+1);	
					}
					rec = new Flamingo.model.visualization.Preview({
						rIndex: columnIndexList[k],
						rName: name,
						rData: data
					});

					store.insert(0, rec);
					//Remove get list from ajax
					store.remove(records);
				}
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
//			height: 300,
			columns: [
				{
					text: 'Index',
					width: 80,
					dataIndex: 'rIndex',
					id: 'rIndex'
				},
				{
					text: 'Name',
					dataIndex: 'rName',
					id: 'rName',
					width: 80
				},
				{
					text: 'Values',
					flex: 1,
					dataIndex: 'rData'
				},
				{
					xtype: 'checkcolumn',
					width: 55,
					header: 'Target',
					dataIndex: 'targetCheckIndex',
					editor: {
						xtype: 'checkbox',
						cls: 'x-grid-checkheader-editor'
					},
					listeners: {
						checkchange: function (column, recordIndex, checked) {
							if (!me.isMulti) {
								var previewGrid = Ext.getCmp('v_previewGrid');
								var range = previewGrid.store.getRange();
								for (var i = 0; i < range.length; i++) {
									if (range[i] != null) {
										record = previewGrid.getStore().getAt(i);
										record.set('targetCheckIndex', false);
									}
								}
								record = previewGrid.getStore().getAt(recordIndex);
								record.set('targetCheckIndex', true);
							}
							
    					}
    				}
				}
			],
			tbar: [
				{
					text: 'Target All',
					iconCls: 'common-confirm',
					scope: this,
					disabled : !me.isMulti,
					align: 'right',
					handler: function (store) {
						var range = previewGrid.store.getRange();

						for (var i = 0; i < range.length; i++) {
							if (range[i] != null) {
								var record = previewGrid.getStore().getAt(i);
								record.set('targetCheckIndex', true);
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
						var range = previewGrid.store.getRange();

						for (var i = 0; i < range.length; i++) {
							if (range[i] != null) {
								var record = previewGrid.getStore().getAt(i);
								record.set('targetCheckIndex', false);
							}
						}
					}
				}
			]
		};
		

		var window = Ext.create('Ext.Window',{
			title: 'File preview : ' + this.targetFieldName||'',
			width:500,
			height:350,
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
						var r = previewGrid.store.getRange();
						var targetIndexList = [];

						for (var i = 0; i < r.length; i++) {
							if (r[i] != null) {
								if (r[i].data.targetCheckIndex) {
									targetIndexList.push(r[i].data.rIndex);
								}
							}
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