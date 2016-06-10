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
 * MapReduce Property View
 *
 * @class
 * @extends Flamingo.view.designer.property._NODE_HADOOP
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property.HADOOP_MR', {
    extend: 'Flamingo.view.designer.property._NODE_HADOOP',
    alias: 'widget.HADOOP_MR',

    requires: [
        'Flamingo.view.designer.property._ConfigurationBrowserField',
        'Flamingo.view.designer.property._JarBrowserField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._ColumnGrid',
        'Flamingo.view.designer.property._InputGrid',
        'Flamingo.view.designer.property._JarGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._KeyValueGrid'
    ],

    width: 600,
    height: 300,

    items: [
        {
            title: MSG.DESIGNER_MR,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    value: MSG.DESIGNER_MSG_MR_NOTICE
                },
                {
                    xtype: '_jarBrowserField',
                    name: 'jar',
                    fieldLabel: MSG.DESIGNER_MR_JAR,
                    emptyText: MSG.DESIGNER_MSG_MR_JAR_EMPTY,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: MSG.DESIGNER_DRIVER,
                    emptyText: MSG.DESIGNER_MSG_DRIVER_EMPTY,
                    allowBlank: false
                },
                {
                    xtype: '_jarGrid',
                    title: MSG.DESIGNER_TITLE_MR_DEPEND_JAR,
                    name: 'dependencies',
                    flex: 1
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_IO,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: '_inputGrid',
                    title: MSG.DESIGNER_TITLE_INPUT_PATH,
                    flex: 1
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG.DESIGNER_TITLE_OUTPUT_PATH,
                    defaults: {
                        hideLabel: true,
                        margin: "5 0 0 0"  // Same as CSS ordering (top, right, bottom, left)
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: '_browserField',
                            name: 'output',
                            allowBlank: false,
                            readOnly: false,
                            flex: 1
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: function (form, eOpts) {
                    var canvas = Ext.ComponentQuery.query('canvas')[0];
                    var canvasForm = canvas.getForm();
                }
            }
        },
        {
            title: MSG.DESIGNER_TITLE_OPTION,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    name: 'deleteIfExistOutput',
                    checked: true,
                    fieldLabel: MSG.DESIGNER_TITLE_OUTPUT_PATH,
                    boxLabel: MSG.DESIGNER_MSG_OPTION_OUTPUT
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_H_CONFIG,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    height: 20,
                    value: MSG.DESIGNER_H_CONFIG_EXAMPLE
                },
                {
                    xtype: '_keyValueGrid',
                    flex: 1
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_CL_PARAM,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 100
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    height: 50,
                    value: MSG.DESIGNER_CL_PARAM_EXAMPLE
                },
                {
                    xtype: '_commandlineGrid',
                    flex: 1
                }
            ]
        }
    ]
});