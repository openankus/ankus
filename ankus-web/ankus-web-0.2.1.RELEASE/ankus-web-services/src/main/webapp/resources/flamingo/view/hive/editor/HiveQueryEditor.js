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

Ext.define('Flamingo.view.hive.editor.HiveQueryEditor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hiveQueryEditor',

    layout: 'fit',

    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
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
                    mode: "text/x-plsql",
                    showModes: false,
                    value: '-- ' + MSG.HIVE_MSG_RESULT_CHECK_HISTORY + '\r' + '-- ' + MSG.HIVE_MSG_RESULT_TEMP_SAVED + '\r' + '-- ' + MSG.HIVE_MSG_ONE_QUERY_ONE_TIME + '\r\r\r',
                    modes: [
                        {
                            mime: ['text/x-plsql'],
                            dependencies: ['plsql/plsql.js']
                        }
                    ],
                    extraKeys: {
                        "Ctrl-Space": "autocomplete",
                        "Tab": "indentAuto"
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});