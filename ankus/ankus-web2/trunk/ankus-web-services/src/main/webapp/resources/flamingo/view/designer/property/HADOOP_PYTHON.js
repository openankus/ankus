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
 * Python Script Property View
 *
 * @class
 * @extends Flamingo.view.designer.property.HADOOP_PYTHON
 * @author <a href="mailto:fharenheit@gmail.com">Byoung Gon, Kim</a>
 */
Ext.define('Flamingo.view.designer.property.HADOOP_PYTHON', {
    extend: 'Flamingo.view.designer.property._NODE_HADOOP',
    alias: 'widget.HADOOP_PYTHON',

    requires: [
        'Flamingo.view.designer.property._CommandlineGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._ValueGrid',
        'Flamingo.view.designer.property._EnvironmentGrid'
    ],

    width: 600,
    height: 350,

    items: [
        {
            title: MSG.DESIGNER_TITLE_PY_SCRIPT,
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
                    xtype: 'textfield',
                    fieldLabel: MSG.DESIGNER_PY_PATH,
                    name: 'path',
                    value: '/usr/bin/python',
                    padding: '2 5 0 5',   // Same as CSS ordering (top, right, bottom, left)
                    allowBlank: false,
                    listeners: {
                        render: function (p) {
                            var theElem = p.getEl();
                            var theTip = Ext.create('Ext.tip.Tip', {
                                html: MSG.DESIGNER_MSG_PY,
                                margin: '25 0 0 150',
                                shadow: false
                            });
                            p.getEl().on('mouseover', function () {
                                theTip.showAt(theElem.getX(), theElem.getY());
                            });
                            p.getEl().on('mouseleave', function () {
                                theTip.hide();
                            });
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: MSG.DESIGNER_WORKING_PATH,
                    name: 'working',
                    value: '',
                    padding: '2 5 0 5',   // Same as CSS ordering (top, right, bottom, left)
                    allowBlank: true,
                    listeners: {
                        render: function (p) {
                            var theElem = p.getEl();
                            var theTip = Ext.create('Ext.tip.Tip', {
                                html: MSG.DESIGNER_MSG_WORKING,
                                margin: '25 0 0 150',
                                shadow: false
                            });
                            p.getEl().on('mouseover', function () {
                                theTip.showAt(theElem.getX(), theElem.getY());
                            });
                            p.getEl().on('mouseleave', function () {
                                theTip.hide();
                            });
                        }
                    }
                },
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
                    showModes: false,
                    mode: "text/x-python",
                    modes: [
                        {
                            mime: ['text/x-python'],
                            dependencies: ['python/python.js']
                        }
                    ],
                    extraKeys: {
                        "Ctrl-Space": "autocomplete",
                        "Tab": "indentAuto"
                    }
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_SCRIPT_VAR,
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
                    height: 40,
                    value: MSG.DESIGNER_SCRIPT_VAR_EXAMPLE
                },
                {
                    xtype: '_nameValueGrid',
                    flex: 1
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_ENV_VAR,
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
                    xtype: '_environmentGrid',
                    flex: 1
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_CL_PARAM,
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
                    value: MSG.DESIGNER_CL_PARAM_EXAMPLE
                },
                {
                    xtype: '_commandlineGrid',
                    flex: 1
                }
            ]
        }
    ]
});