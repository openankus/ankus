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
 * Inner Grid : PrevColumnInfo
 *
 * @class
 * @extends Flamingo.view.designer.property._Grid
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._ColumnGrid_Prev', {
    extend: 'Flamingo.view.designer.property._Grid',
    alias: 'widget._prevColumnGrid',

    store: {
        type: 'prevColumnInfo',
        groupField: 'prevQualifier'
    },
    selType: 'rowmodel',
    forceFit: true,
    columnLines: true,
    columns: [
        {
            text: '식별자',
            dataIndex: 'prevQualifier',
            width: 50,
            hidden: true,
            sortable: false,
            menuDisabled: true
        },
        {
            text: '컬럼명(영문)',
            dataIndex: 'prevColumnNames',
            width: 100,
            sortable: false,
            editor: {
                vtype: 'alphanum',
                allowBlank: false,
                listeners: {
                    errorchange: function (comp, error, eopts) {
                        comp.focus(false, 50);
                    }
                }
            }
        },
        {
            text: '컬럼명(한글)',
            dataIndex: 'prevColumnKorNames',
            width: 100,
            sortable: false,
            editor: {
                vtype: 'exceptcomma',
                allowBlank: true
            }
        },
        {
            text: '자료형',
            dataIndex: 'prevColumnTypes',
            width: 80,
            sortable: false,
            editor: {
                xtype: 'combo',
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                mode: 'local',
                store: [
                    ['String', 'String'],
                    ['Integer', 'Integer'],
                    ['Long', 'Long'],
                    ['Float', 'Float'],
                    ['Double', 'Double'],
                    ['Bytes', 'Bytes'],
                    ['Boolean', 'Boolean'],
                    ['Tuple', 'Tuple'],
                    ['Bag', 'Bag'],
                    ['Map', 'Map']
                ],
                listClass: 'x-combo-list-small'
            }
        },
        {
            text: '컬럼 설명',
            dataIndex: 'prevColumnDescriptions',
            width: 150,
            sortable: false,
            editor: {
                vtype: 'exceptcomma',
                allowBlank: true
            }
        }
    ]
});