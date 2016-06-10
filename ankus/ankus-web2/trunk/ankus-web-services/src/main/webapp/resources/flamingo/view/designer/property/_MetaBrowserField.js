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

Ext.define('Flamingo.view.designer.property._MetaBrowserField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget._metaBrowserField',

    fieldLabel: MSG.DESIGNER_METADATA,
    disabled: false,
    defaults: {
        hideLabel: true
    },
    layout: 'hbox',

    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'textfield',
                name: 'metadata',
                allowBlank: true,
                flex: 1
            },
            {
                xtype: 'button',
                text: MSG.DESIGNER_TITLE_FILE_BROWSER,
                tooltip: MSG.DESIGNER_TITLE_FILE_BROWSER,
                handler: function () {
                    var panel = me;
                    var popWindow = Ext.create('Ext.Window', {
                        title: MSG.DESIGNER_TITLE_FILE_BROWSER,
                        width: 800,
                        height: 400,
                        modal: true,
                        resizable: true,
                        constrain: true,
                        layout: 'fit',
                        items: {
                            xtype: 'hdfsBrowser'
                        },
                        buttonAlign: 'center',
                        buttons: [
                            {
                                text: MSG.COMMON_OK,
                                iconCls: 'common-confirm',
                                handler: function () {
                                    var grid = popWindow.query('#hdfsBrowserListGrid')[0];
                                    var columnGrid = panel.up().query('_columnGrid')[0];
                                    var clusterCombo = Ext.ComponentQuery.query('canvas #wd_cmb_cluster')[0];
                                    var textfield = panel.query('textfield')[0];

                                    var gridSelected = grid.getSelectionModel().getSelection();
                                    if (gridSelected.length != 0) {
                                        var metadataFile = gridSelected[0].data.id;

                                        // TODO FIX URL
                                        Flamingo.Ajax.Request.invokePostByMap('/rest/designer/loadMetadata.do', {file: metadataFile, cluster: clusterCombo.getValue()},
                                            function (response) {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj.success) {

                                                    textfield.setValue(metadataFile);
                                                    columnGrid.getStore().removeAll();
                                                    for (var i = 0; i < obj.total; i++) {
                                                        columnGrid.getStore().add(obj.list[i]);
                                                    }
                                                } else {
                                                    Ext.MessageBox.show({
                                                        title: MSG.DESIGNER_TITLE_META_LOADING,
                                                        msg: obj.error.message,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.WARNING
                                                    });
                                                }
                                            },
                                            function (response) {
                                                Ext.MessageBox.show({
                                                    title: MSG.DESIGNER_TITLE_META_LOADING,
                                                    msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                            }
                                        );

                                        popWindow.close();
                                    } else {
                                        Ext.MessageBox.show({ title: MSG.DESIGNER_TITLE_META_LOADING, msg: MSG.DESIGNER_MSG_META_OK,
                                            buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING
                                        });
                                    }
                                }
                            },
                            {
                                text: MSG.COMMON_CANCEL,
                                iconCls: 'common-cancel',
                                handler: function () {
                                    popWindow.close();
                                }
                            }
                        ]
                    }).show();
                }
            }
        ];
        this.callParent(arguments);
    }
});