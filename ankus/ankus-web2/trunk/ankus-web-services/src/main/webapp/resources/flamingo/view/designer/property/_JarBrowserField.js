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
 *  Inner FieldContainer : BrowserField
 *
 * @class
 * @extends Ext.form.FieldContainer
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._JarBrowserField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget._jarBrowserField',

    requires: [
        'Flamingo.view.fs.hdfs.Viewport'
    ],

    fieldLabel: MSG.DESIGNER_PATH,
    defaults: {
        hideLabel: true
    },
    layout: 'hbox',

    initComponent: function () {
        this.name = this.name || 'path';
        this.allowBlank = this.allowBlank || false;
        this.readOnly = this.readOnly || false;
        var me = this;
        this.items = [
            {
                xtype: 'textfield',
                name: this.name,
                allowBlank: this.allowBlank,
                readOnly: this.readOnly,
                flex: 1,
                listeners: {
                    errorchange: function (comp, error, eopts) {
                        comp.focus(false, 50);
                    }
                }
            },
            {
                xtype: 'button',
                text: MSG.DESIGNER_BROWSE,
                tooltip: MSG.DESIGNER_TIP_FILE_BROWSE,
                margin: '0 0 0 3',
                hidden: this.readOnly,
                handler: function () {
                    var panel = me;
                    var canvas = Ext.ComponentQuery.query('canvas')[0];
                    var form = canvas.getForm();
                    var engineId = form.getValues()['engine_id'];

                    if (engineId) {
                        var popWindow = Ext.create('Ext.Window', {
                            title: MSG.DESIGNER_TITLE_FILE_BROWSER,
                            width: 800,
                            height: 400,
                            modal: true,
                            resizable: true,
                            constrain: true,
                            layout: 'fit',
                            items: [
                                Ext.create('Flamingo.view.designer.property.browser.hdfs.BrowserPanel', {
                                    engineId: engineId
                                })
                            ],
                            buttonAlign: 'center',
                            buttons: [
                                {
                                    text: MSG.COMMON_OK,
                                    iconCls: 'common-confirm',
                                    handler: function () {
                                        var lastPathComp = popWindow.query('hdfsDirectoryPanelForDesigner #lastPath')[0];
                                        if (lastPathComp.getValue()) {
                                            // FLAMINGO-153
                                            if (Flamingo.Util.String.endsWith(lastPathComp.getValue(), '.jar')) {
                                                var textfield = panel.query('textfield')[0];
                                                textfield.setValue(lastPathComp.getValue());
                                                popWindow.close();
                                            } else {
                                                error(MSG.COMMON_WARN, MSG.DESIGNER_MSG_JAR_WARN);
                                            }
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
                        }).center().show();
                    } else {
                        error(MSG.COMMON_WARN, MSG.DESIGNER_MSG_SELECT_CLUSTER);
                    }
                }
            }
        ];

        this.callParent(arguments);
    }
});