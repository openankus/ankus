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

Ext.define('Flamingo.view.fs.hdfs.FileUploadWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.fileUploadWindow',

    height: 170,
    width: 550,
    closable: true,
    hideCollapseTool: false,
    title: MSG.HDFS_FILE_UPLOAD,
    titleCollapse: false,
    modal: true,
    closeAction: 'close',
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            frame: true,
            bodyPadding: '10 10 0',
            defaults: {
                anchor: '100%',
                allowBlank: false,
                msgTarget: 'side',
                labelWidth: 50
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'path',
                    fieldLabel: MSG.COMMON_PATH,
                    name: 'path',
                    disabled: true,
                    disabledCls: 'disabled_plain',
                    value: ''
                },
                {
                    xtype: 'filefield',
                    itemId: 'file',
                    emptyText: MSG.HDFS_MSG_FILE_UPLOAD_SELECT,
                    fieldLabel: MSG.COMMON_FILE,
                    name: 'file',
                    buttonText: MSG.COMMON_BROWSE
                },
                {
                    xtype: 'displayfield',
                    value: Ext.String.format(MSG.HDFS_MSG_FILE_UPLOAD_BYTES, Ext.util.Format.number(parseInt(config.fs_browser_upload_max_file_size), '0,000')),
                    fieldLabel: '',
                    anchor: '100%'
                }
            ],
            buttons: [
                {
                    text: MSG.HDFS_FILE_UPLOAD,
                    iconCls: 'hdfs-file-upload',
                    handler: function () {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
                            var lastSelected = directoryPanel.getSelectionModel().getLastSelected();
                            var lastCluster = directoryPanel.query('#lastCluster')[0].getValue();
                            var path = lastSelected.data.id;

                            form.submit({
                                url: CONSTANTS.FS.HDFS_UPLOAD_FILE,
                                waitTitle: MSG.HDFS_MSG_FILE_UPLOADING,
                                waitMsg: MSG.HDFS_MSG_FILE_UPLOAD_WAIT,
                                isUpload: true,
                                headers: {
                                    'Accept': 'application/json'
                                },
                                params: {
                                    path: form.findField("path").getValue(),
                                    engineId: lastCluster
                                },
                                timeout: parseInt(config.fs_browser_upload_timeout),
                                success: function (form, action) {
                                    info(MSG.HDFS_FILE_UPLOAD, MSG.HDFS_MSG_FILE_UPLOADED);

                                    var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                    hdfsBrowserController.updateFileStore(lastCluster, path);
                                },
                                failure: function (form, action) {
                                    var response = Ext.decode(action.response.responseText);
                                    Ext.MessageBox.alert(MSG.HDFS_FILE_UPLOAD, response.error.message);

                                    error(MSG.HDFS_FILE_UPLOAD, response.error.message);
                                }
                            });
                        }
                    }
                }
            ]
        }
    ]
});