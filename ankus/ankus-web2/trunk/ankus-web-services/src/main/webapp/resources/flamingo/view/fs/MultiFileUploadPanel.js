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
Ext.define('Flamingo.view.fs.MultiFileUploadPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.multiFileUploadPanel',

    requires: [
        'Flamingo.store.fs.MultiFileStore'
    ],

    /**
     * 업로드 경로
     */
    uploadPath: '',

    /**
     * 엔진ID
     */
    engineId: '',

    /**
     * Upload 최대 파일 사이즈(byte)
     */
    maxUploadSize: 100000000,

    /**
     * 업로드 URL
     */
    uploadUrl: '/fs/hdfs/upload',

    width: 800,
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
                    var grid = field.up('multiFileUploadPanel'),
                        store = grid.getStore(),
                        files = field.fileInputEl.dom.files,
                        record;
                    for (var i = 0; i < files.length; i++) {
                        record = store.getById(files[i].name);
                        if (Ext.isEmpty(record)) {
                            store.add({name: files[i].name, size: files[i].size, type: files[i].type,
                                status: files[i].size >= grid.maxUploadSize ? MSG.HDFS_TOO_LARGE : MSG.COMMON_READY,
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
                var grid = btn.up('multiFileUploadPanel'),
                    store = grid.getStore();
                store.remove(grid.getSelectionModel().getSelection());
            }
        },
        {
            text: MSG.COMMON_REMOVE_ALL,
            iconCls: 'common-delete',
            handler: function (btn) {
                var grid = btn.up('multiFileUploadPanel'),
                    store = grid.getStore();
                store.removeAll();
            }
        },
        '->',
        {
            text: MSG.COMMON_UPLOAD,
            iconCls: 'hdfs-file-upload',
            handler: function (btn) {
                var grid = btn.up('multiFileUploadPanel'),
                    store = grid.getStore(),
                    record,
                    xhr;

                grid.xhrHashMap = new Ext.util.HashMap();

                for (var i = 0; i < store.getCount(); i++) {
                    record = store.getAt(i);
                    if (record.get('status') == MSG.COMMON_READY || record.get('status') == MSG.COMMON_ABORT) {
                        xhr = new XMLHttpRequest();
                        grid.xhrHashMap.add(record.get('name'), xhr);
                        grid.upload(record, xhr);
                    }
                }
            }
        },
        {

            text: MSG.COMMON_ABORT,
            iconCls: 'common-cancel',
            handler: function (btn) {
                var grid = btn.up('multiFileUploadPanel'),
                    store = grid.getStore(),
                    record;
                if (grid.xhrHashMap) {
                    grid.xhrHashMap.each(function (key, value, length) {
                        record = store.getById(key);
                        if (record && record.get('status') == MSG.HDFS_UPLOADING) {
                            value.abort();
                        }
                    });
                }
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
            }
        },
        {
            dataIndex: 'type',
            header: MSG.HDFS_TYPE,
            width: 150,
            fixed: true
        },
        {
            dataIndex: 'status',
            header: MSG.HDFS_STATUS,
            width: 70,
            fixed: true,
            align: 'center'
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
            }
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
        text: Ext.String.format(MSG.HDFS_MSG_FILE_UPLOAD_BYTES, Ext.util.Format.fileSize(parseInt(config.fs_browser_upload_max_file_size)))
    },

    xhrHashMap: new Ext.util.HashMap(),

    /**
     * 파일을 업로드한다.
     *
     * @param {Flamingo.model.fs.MultiFile} record
     * @param {XMLHttpRequest} xhr
     */
    upload: function (record, xhr) {
        var formData = new FormData();

        formData.append("file", record.get('file'));
        formData.append("path", this.uploadPath);
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