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
 * Inner Grid : NameValue
 *
 * @class
 * @extends Flamingo.view.designer.property._Grid
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._NameValueGrid', {
    extend: 'Flamingo.view.designer.property._Grid',
    alias: 'widget._nameValueGrid',

    store: {
        type: 'nameValue'
    },
    selType: 'rowmodel',
    forceFit: true,
    columnLines: true,
    columns: [
        {
            text: MSG.DESIGNER_COL_NAME,
            dataIndex: 'variableNames',
            width: 100,
            editor: {
                allowBlank: false,
                vtype: 'alphanum',
                listeners: {
                    errorchange: function (comp, error, eopts) {
                        comp.focus(false, 50);
                    }
                }
            }
        },
        {
            text: MSG.DESIGNER_COL_VALUE,
            dataIndex: 'variableValues',
            width: 100,
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
            text: MSG.DESIGNER_COL_DESC,
            dataIndex: 'variableDescriptions',
            width: 200,
            editor: {
                vtype: 'exceptcomma',
                allowBlank: true
            }
        }
    ]
});