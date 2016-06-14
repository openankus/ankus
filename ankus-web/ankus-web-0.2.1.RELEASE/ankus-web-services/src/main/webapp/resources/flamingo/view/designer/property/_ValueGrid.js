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
 * Value Grid : Value & Description
 *
 * @class
 * @extends Flamingo.view.designer.property._Grid
 * @author <a href="mailto:fharenheit@gmail.com">Byoung Gon, Kim</a>
 */
Ext.define('Flamingo.view.designer.property._ValueGrid', {
    extend: 'Flamingo.view.designer.property._Grid',
    alias: 'widget._valueGrid',

    store: {
        type: 'value'
    },
    selType: 'rowmodel',
    forceFit: true,
    columnLines: true,
    columns: [
        {
            text: 'Value',
            dataIndex: 'variableValues',
            width: 200,
            editor: {
                vtype: 'exceptcomma',
                allowBlank: false,
                listeners: {
                    errorchange: function (comp, error, eopts) {
                        comp.focus(false, 30);
                    }
                }
            }
        },
        {
            text: 'Description',
            dataIndex: 'variableDescriptions',
            width: 200,
            editor: {
                vtype: 'exceptcomma',
                allowBlank: true
            }
        }
    ]
});