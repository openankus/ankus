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
 * Inner FieldContainer : DelimiterSelCmbField
 *
 * @class
 * @extends Ext.form.FieldContainer
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._DelimiterSelCmbField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget._delimiterSelCmbField',

    fieldLabel: '컬럼 구분자',
    defaults: {
        hideLabel: true
    },
    layout: 'hbox',

    /**
     * 읽기 전용 여부
     */
    readOnly: false,

    initComponent: function () {
        this.items = [
            {
                xtype: 'combo',
                name: 'delimiterType',
                value: 'DEFAULT',
                flex: 1,
                forceSelection: true,
                multiSelect: false,
                editable: false,
                readOnly: this.readOnly,
                displayField: 'name',
                valueField: 'value',
                mode: 'local',
                queryMode: 'local',
                triggerAction: 'all',
                tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
                store: Ext.create('Ext.data.Store', {
                    fields: ['name', 'value', 'description'],
                    data: [
                        {name: '기본값', value: 'DEFAULT', description: ','},
                        {name: 'Tab', value: 'TAB', description: '\\t'},
                        {name: 'Space', value: 'SPACE', description: '\\s'},
                        {name: 'Custom', value: 'CUSTOM', description: '사용자입력'}
                    ]
                }),
                listeners: {
                    change: function (combo, newValue, oldValue, eOpts) {
                        // 콤보 값에 따라 관련 textfield 를 enable | disable 처리한다.
                        var customValueField = combo.nextSibling('textfield');
                        if (newValue === 'CUSTOM') {
                            customValueField.enable();
                            customValueField.isValid();
                        } else {
                            customValueField.disable();
                            customValueField.setValue('');
                        }
                    }
                }
            },
            {
                xtype: 'textfield',
                name: 'delimiterValue',
                vtype: 'exceptcommaspace',
                flex: 1,
                disabled: true,
                readOnly: this.readOnly,
                allowBlank: false
            },
            {
                xtype: 'hidden',
                name: 'prevDelimiterValue'
            }
        ];

        this.callParent(arguments);
    }
});