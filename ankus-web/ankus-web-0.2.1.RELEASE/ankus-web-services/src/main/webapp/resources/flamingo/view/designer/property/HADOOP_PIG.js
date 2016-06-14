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
 * Apache Pig Property View
 *
 * @class
 * @extends Flamingo.view.designer.property._NODE_HADOOP
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property.HADOOP_PIG', {
    extend: 'Flamingo.view.designer.property._NODE_HADOOP',
    alias: 'widget.HADOOP_PIG',

    requires: [
        'Flamingo.view.designer.property._ConfigurationBrowserField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._ColumnGrid_Prev',
        'Flamingo.view.designer.property._ColumnGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._KeyValueGrid'
    ],

    width: 600,
    height: 400,

    items: [
        {
            title: MSG.DESIGNER_TITLE_PIG_LATIN,
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
                    xtype: 'codemirror',
                    name: 'script',
                    flex: 1,
                    padding: '5 5 5 5',
                    layout: 'fit',
                    pathModes: '/resources/lib/codemirror-2.35/mode',
                    pathExtensions: '/resources/lib/codemirror-2.35/lib/util',
                    lineNumbers: true,
                    matchBrackets: true,
                    indentUnit: 2,
                    mode: "text/x-pig",
                    showModes: false,
                    modes: [
                        {
                            mime: ['text/x-pig'],
                            dependencies: ['x-pig/x-pig.js']
                        }
                    ]
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_SCRIPT_VAR,
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
                    height: 40,
                    value: MSG.DESIGNER_SCRIPT_VAR_EXAMPLE
                },
                {
                    xtype: '_nameValueGrid',
                    flex: 1
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
        }
    ]
});