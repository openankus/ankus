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

Ext.define('Flamingo.view.designer.property._HiveColumnGrid', {
    extend: 'Flamingo.view.designer.property._Grid',
    alias: 'widget._hiveColumnGrid',

    store: {
        type: 'columnInfo'
    },

    selType: 'rowmodel',
    forceFit: true,
    columnLines: true,
    columns: [
        {
            text: 'Name',
            dataIndex: 'columnNames',
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
            text: 'Type',
            dataIndex: 'columnTypes',
            width: 80,
            sortable: false,
            editor: {
                xtype: 'combo',
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                queryMode: 'local',
                mode: 'local',
                store: new Ext.data.ArrayStore(
                    {
                        id: 0,
                        fields: ['typeId', 'typeString'],
                        data: [
                            ['1', 'STRING'],
                            ['2', 'INT'],
                            ['3', 'FLOAT'],
                            ['4', 'DOUBLE'],
                            ['5', 'BOOLEAN'],
                            ['6', 'SMALLINT'],
                            ['7', 'TINYINT'],
                            ['8', 'BIGINT'],
                            ['9', 'BINARY']
                        ]
                    }
                ),
                valueField: 'typeString',
                displayField: 'typeString',
                listClass: 'x-combo-list-small'
            }
        },
        {
            text: 'Comment',
            dataIndex: 'columnDescriptions',
            width: 150,
            sortable: false,
            editor: {
                allowBlank: true
            }
        }
    ],

    /**
     * Minimum Record
     */
    minRecordLength: 1
});