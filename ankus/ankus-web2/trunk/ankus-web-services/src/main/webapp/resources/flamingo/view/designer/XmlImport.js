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
 * Multi File Upload Panel
 *
 * @class
 * @extends Ext.grid.Panel
 *
 * @param {String} path 업로드 경로
 * @param {String} engineId 엔진ID
 * @param {String} uploadUrl 업로드 URL
 * @param {Number} maxUploadSize Upload 최대 파일 사이즈(byte) - 디폴트 100000000 byte(100 M)
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.XmlImport', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.XmlImport',

    requires: [
        'Flamingo.store.designer.XmlImportStore'
    ],
    
    //var requestsStore= Ext.create('Flamingo.store.designer.XmlImportStore', {
     //   autoLoad: true                          
    //});     

    /**
     * 업로드 경로
     */
    uploadPath: '',

    /**
     * 엔진ID
     */
    engineId: '11',
    
    /**
     * 업로드 URL
     */
    uploadUrl: '/fs/hdfs/upload',

    width: 400,
    height: 250,

    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },

    store: {
        type: 'multiFileStore'
    },

    tbar: [
        {
            itemId: 'MF_FILEFIELD',
            xtype: 'filefield',
            buttonOnly: true,
            buttonConfig: {
                iconCls: 'common-folder',
                text: MSG.COMMON_BROWSE
            },
            listeners: {
                afterrender: function (field, eOpts) {
                    field.fileInputEl.dom.setAttribute('multiple', 'multiple');
                },
                change: function (field, value, eOpts) {
                    var grid = field.up('XmlImport'),
                        store = grid.getStore(),
                        files = field.fileInputEl.dom.files,
                        record;                 
                    for (var i = 0; i < files.length; i++) {
                        record = store.getById(files[i].name);
                        if (Ext.isEmpty(record)) {
                            store.add({name: files[i].name, size: files[i].size, type: files[i].type,
                                status: files[i].type,
                                file: files[i]});
                        } else {
                            record.set('size', files[i].size);
                            record.set('type', files[i].type);                           
                            record.set('status', files[i].size >= grid.maxUploadSize ? MSG.HDFS_TOO_LARGE : MSG.COMMON_READY);
                            record.set('file', files[i]);
                            record.commit();
                        }
                    }
                }              
            }
        },
        '-',
        {
            text: MSG.COMMON_REMOVE,
            iconCls: 'common-delete',
            handler: function (btn) {
                var grid = btn.up('XmlImport'),
                    store = grid.getStore();
                store.remove(grid.getSelectionModel().getSelection());
            }
        },
        {
            text: MSG.COMMON_REMOVE_ALL,
            iconCls: 'common-delete',
            handler: function (btn) {
                var grid = btn.up('XmlImport'),
                    store = grid.getStore();
                store.removeAll();
            }
        },
        '->',
        {
            text: 'Import',
            iconCls: 'hdfs-file-upload',
            handler: function (btn) {
                var grid = btn.up('XmlImport'),
                    store = grid.getStore(),
                    record,
                    xhr;

                grid.xhrHashMap = new Ext.util.HashMap();

                for (var i = 0; i < store.getCount(); i++) {
                    record = store.getAt(i);                   
                    xhr = new XMLHttpRequest();
                    grid.xhrHashMap.add(record.get('name'), xhr);
                    grid.Import(record, xhr);
                }
                              
                Ext.MessageBox.show({
                    title: 'Import Xml',
                    msg: 'Do you want Import selectd Workflow Files?',
                    width: 300,
                    buttons: Ext.MessageBox.YESNO,
                    icon: Ext.MessageBox.INFO,
                    scope: this,
                    fn: function (btn, text, eOpts) {

                        if (btn === 'yes') {
                        	 for (var i = 0; i < store.getCount(); i++) {
                        		record = store.getAt(i);	 
                        		var str_type = record.get('type');
                        		if(str_type != ''){
                        			Ext.Msg.alert( 'Fail','Not a suitable extension.' );    
                        			return;
                        		}
                        		
                                Ext.Ajax.request({
                             	   url:'/wfimport/get',
             						method:'GET',
             						params:{ 
             							'name': record.get('name') 
             						},
                                		success:function( result, request )
          						{
          							
          							Ext.Msg.alert( "Success", "Import successfully " );                                                    							
          						},
          							failure: function( result, request ){
          							Ext.Msg.alert( "Failed", result.responseText );
          						} 
                   	      		});   
                                console.info(record.get('name') );
                        	 } 
                        }
                    }
                });
            }        
        },
        {
            text: MSG.COMMON_CANCEL,
            iconCls: 'common-cancel',
            handler: function () {
                var win = this.up('window');
                win.close();
            }
        }
    ],
    columns: [
        {
            dataIndex: 'name',
            header: MSG.HDFS_FILE,
            flex: 1
        },
        {
            dataIndex: 'size',
            header: MSG.HDFS_FILE_SIZE,
            width: 70,
            fixed: true,
            align: 'right',
            renderer: function (value) {
                return Ext.util.Format.fileSize(value);
            },
            hidden:true            
        },
        {
            dataIndex: 'type',
            header: MSG.HDFS_TYPE,
            width: 150,
            fixed: true
           // hidden:true
        },
        {
            dataIndex: 'status',
            header: MSG.HDFS_STATUS,
            width: 70,
            fixed: true,
            align: 'center',
            hidden:true
        },
        {
            dataIndex: 'progress',
            header: MSG.HDFS_PROGRESS,
            width: 90,
            fixed: true,
            align: 'center',
            renderer: function (value, metaData, record, row, col, store, gridView) {
                if (!value) {
                    value = 0;
                }
                return Ext.String.format('<div class="x-progress x-progress-default x-border-box">' +
                    '<div class="x-progress-text x-progress-text-back" style="width: 76px;">{0}%</div>' +
                    '<div class="x-progress-bar x-progress-bar-default" role="presentation" style="width:{0}%">' +
                    '<div class="x-progress-text" style="width: 76px;"><div>{0}%</div></div></div></div>', value);
            },
            hidden:true
        },
        {
            dataIndex: 'message',
            width: 1,
            hidden: true
        }
    ],
    listeners: {
        afterrender: function (grid, eOpts) {
            // Enable Drag & Drop
            var gridBody = grid.body.dom;
            gridBody.addEventListener("dragover", function (event) {
                event.stopPropagation();
                event.preventDefault();
                gridBody.style.background = '#ffc';
            }, false);
            gridBody.addEventListener("dragleave", function (event) {
                event.stopPropagation();
                event.preventDefault();
                gridBody.style.background = 'white';
            }, false);
            gridBody.addEventListener("drop", function (event) {
                event.stopPropagation();
                event.preventDefault();
                gridBody.style.background = 'white';
                grid.down('#MF_FILEFIELD').fileInputEl.dom.files = event.target.files || event.dataTransfer.files;
            }, false);
        }
    },

    bbar: {
        xtype: '_statusBar',
        text: 'Import You can only .workflow.ankus extension.'
    },

    xhrHashMap: new Ext.util.HashMap(),

    /**
     * 파일을 업로드한다.
     *
     * @param {Flamingo.model.designer.XmlImportFile} record
     * @param {XMLHttpRequest} xhr
     */
    Import: function (record, xhr) {
        var formData = new FormData();

        formData.append("file", record.get('file'));
        formData.append("path", "/temp");
        formData.append("engineId", this.engineId);

        xhr.upload.addEventListener("progress", function (evt) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            record.set('progress', percentComplete);
            record.set('status', MSG.HDFS_UPLOADING);
            record.commit();
        }, false);

        xhr.addEventListener("load", function (evt) {
            record.set('status', MSG.COMMON_COMPLETE);
            record.commit();
        }, false);
        xhr.addEventListener("error", function (evt) {
            if (console) console.log(evt.target.responseText);
            record.set('status', MSG.COMMON_ERROR);
            record.commit();
        }, false);
        xhr.addEventListener("abort", function (evt) {
            record.set('status', MSG.COMMON_ABORT);
            record.commit();
        }, false);

        xhr.open("POST", this.uploadUrl);

        xhr.send(formData);        
    }

});