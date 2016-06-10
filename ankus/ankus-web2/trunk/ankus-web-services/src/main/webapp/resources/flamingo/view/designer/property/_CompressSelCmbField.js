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
 * Inner FieldContainer : CompressSelCmbField
 *
 * @class
 * @extends Ext.form.FieldContainer
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._CompressSelCmbField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget._compressSelCmbField',

    fieldLabel: '압축 방법',
    defaults: {
        hideLabel: true
    },
    layout: 'hbox',
    items: [
        {
            xtype: 'combo',
            name: 'compressionType',
            value: 'NO',
            flex: 1,
            forceSelection: true,
            editable: false,
            displayField: 'name',
            valueField: 'value',
            mode: 'local',
            queryMode: 'local',
            disabled: true,
            triggerAction: 'all',
            tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'value', 'description'],
                data: [
                    {name: '압축하지 않음', value: 'NO', description: '압축하지 않음'},
                    {name: 'Snappy', value: 'SNAPPY', description: 'Snappy 압축'},
                    {name: 'LZO', value: 'LZO', description: 'LZO 압축'},
                    {name: 'BZIP', value: 'BZIP', description: 'BZIP 압축'}
                ]
            })
        },
        {
            xtype: 'checkboxfield',
            name: 'isGetMerge',
            boxLabel: 'Get Merge',
            flex: 1
        }
    ]
});