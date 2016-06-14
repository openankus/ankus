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

Ext.define('Flamingo.view.pig.PigEditor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pigEditor',

    layout: 'fit',

    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'codemirror',
                    itemId: 'pigScript',
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
                    value: '------------------------------------------------------------------------\r' + '-- ' + MSG.PIG_MSG_TOO_LARGE_SCRIPT_1 + '\r' + '-- ' + MSG.PIG_MSG_TOO_LARGE_SCRIPT_2 + '\r' + '------------------------------------------------------------------------\r\r',
                    modes: [
                        {
                            mime: ['text/x-pig'],
                            dependencies: ['x-pig/x-pig.js']
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});