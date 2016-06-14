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
 * HDFS Output Property View
 *
 * @class
 * @extends Flamingo.view.designer.property._NODE_INOUT
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property.INOUT_HDFS_OUT', {
    extend: 'Flamingo.view.designer.property._NODE_INOUT',
    alias: 'widget.INOUT_HDFS_OUT',

    requires: [
        'Flamingo.view.designer.property._DelimiterSelCmbField',
        'Flamingo.view.designer.property._CompressSelCmbField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._MetaBrowserField',
        'Flamingo.view.designer.property._ColumnGrid'
    ],

    items: [
        {
            title: MSG.DESIGNER_TITLE_PATH_INFORMATION,
            xtype: 'form',
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: MSG.DESIGNER_TITLE_OUTPUT_PATH_INFO,
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 100
                    },
                    items: [
                        {
                            name: 'outputPathQualifier',
                            fieldLabel: '식별자',
                            readOnly: true
                        },
                        {
                            xtype: '_browserField',
                            name: 'outputPath'
                        },
                        {
                            xtype: '_delimiterSelCmbField',
                            readOnly: true
                        }
                    ]
                }
                /*
                 ,
                 {
                 xtype      : 'fieldset',
                 title      : '기타 설정',
                 defaultType: 'textfield',
                 defaults   : {
                 anchor    : '100%',
                 labelWidth: 100
                 },
                 items      : [
                 {
                 xtype: '_compressSelCmbField'
                 }
                 ]
                 }
                 */
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_COL_INFO,
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
                    xtype: '_columnGrid',
                    flex: 1,
                    readOnly: true
                }
            ]
        }
    ]
});