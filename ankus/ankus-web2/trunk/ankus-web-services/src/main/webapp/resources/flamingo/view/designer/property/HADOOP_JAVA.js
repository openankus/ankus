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
 * Java Property View
 *
 * @class
 * @extends Flamingo.view.designer.property._NODE_HADOOP
 * @author <a href="mailto:fharenheit@gmail.com">Byoung Gon, Kim</a>
 */
Ext.define('Flamingo.view.designer.property.HADOOP_JAVA', {
    extend: 'Flamingo.view.designer.property._NODE_HADOOP',
    alias: 'widget.HADOOP_JAVA',

    requires: [
        'Flamingo.view.designer.property._JarBrowserField',
        'Flamingo.view.designer.property._ValueGrid',
        'Flamingo.view.designer.property._JarGrid'
    ],

    width: 500,
    height: 300,

    items: [
        {
            title: 'Java',
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
                    xtype: '_jarBrowserField',
                    name: 'jar',
                    fieldLabel: 'Java JAR',
                    emptyText: 'Use the button on the right to select.',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: 'Main Class',
                    emptyText: 'Fully qualified class name',
                    allowBlank: false
                }
            ]
        },
        {
            title: 'Classpath',
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
                    xtype: '_jarGrid',
                    title: 'Library JAR',
                    flex: 1
                }
            ],
            listeners: {
                afterrender: function (form, eOpts) {
                }
            }
        },
        {
            title: 'Command Line Parameters',
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
                    value: 'Please enter command line parameters, one at a time. For example, if you enter "java jar <JAR> <CLASS> -input /INPUT -output /OUTPUT," enter each -input, /INPUT, -output, /OUTPUT in one line.'
                },
                {
                    xtype: '_valueGrid',
                    flex: 1
                }
            ]
        }
    ]
});