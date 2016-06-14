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
 * Ankus : Collaborative Filtering User based Recommendation
 *
 * @cli hadoop jar ankus-core.jar ItemBasedRecommendation -input <IN> -similarDataInput <IN> -output <HDFS_OUTPUT_FILE> -delimiter '\t'
 * @extends Flamingo.view.designer.property._NODE_ALG
 * @author <a href="mailto:fharenheit@gmail.com">Byoung Gon, Kim</a>
 * @author <a href="mailto:myeongha.kim@cloudine.co.kr">Myeong Ha, Kim</a>
 * @see <a href="http://www.openankus.org/display/DOC/Flamingo+Hadoop+Manager+Integration">Ankus Algorithm</a>
 */
Ext.ns('Flamingo.view.designer.property.ankus');
Ext.define('Flamingo.view.designer.property.ankus.ALG_ANKUS_CF_USER_RECOMMEND', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_ANKUS_CF_USER_RECOMMEND',

    requires: [
        'Flamingo.view.designer.property._ConfigurationBrowserField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._ColumnGrid',
        'Flamingo.view.designer.property._DependencyGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._KeyValueGrid',
        'Flamingo.view.designer.property._EnvironmentGrid'
    ],

    width: 500,
    height: 320,

    items: [
        {
            title: MSG.DESIGNER_TITLE_PARAMETER,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 90
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                // Ankus MapReduce가 동작하는데 필요한 입력 경로를 지정한다.  이 경로는 N개 지정가능하다.
                {
                    xtype: '_inputGrid',
                    title: MSG.DESIGNER_TITLE_INPUT_PATH,
                    height: 100
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG.DESIGNER_RECOMMEND_STANDARD,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            name: 'basedType',
                            value: 'user',
                            flex: 1,
                            tooltip: MSG.DESIGNER_MSG_RECOMMEND_STANDARD,
                            forceSelection: true,
                            multiSelect: false,
                            disabled: false,
                            editable: false,
                            displayField: 'name',
                            valueField: 'value',
                            mode: 'local',
                            queryMode: 'local',
                            triggerAction: 'all',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value', 'description'],
                                data: [
                                    {name: 'USER', value: 'user', description: MSG.DESIGNER_RECOMMEND_USER_BASED}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG.DESIGNER_COL_DELIMITER,
                    tooltip: MSG.DESIGNER_MSG_COL_DELIMITER,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'delimiter',
                                    value: '\\t',
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
                                            {name: MSG.COMMON_DOUBLE_COLON, value: '::', description: '::'},
                                            {name: MSG.COMMON_COMMA, value: ',', description: ','},
                                            {name: MSG.COMMON_TAB, value: '\\t', description: '\\t'},
                                            {name: MSG.COMMON_BLANK, value: '\\s', description: '\\s'},
                                            {name: MSG.COMMON_USER_DEFINED, value: 'CUSTOM', description: MSG.COMMON_USER_DEFINED}
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
                                                if (newValue) {
                                                    customValueField.setValue(newValue);
                                                } else {
                                                    customValueField.setValue('\\t');
                                                }
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
                                    allowBlank: false,
                                    value: '\\t'
                                }
                            ]
                        }
                    ]
                },
                // Ankus MapReduce가 동작하는데 필요한 출력 경로를 지정한다. 이 경로는 오직 1개만 지정가능하다.
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG.DESIGNER_TITLE_OUTPUT_PATH,
                    defaults: {
                        hideLabel: true,
                        margin: "5 0 0 0"  // Same as CSS ordering (top, right, bottom, left)
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: '_browserField',
                            name: 'output',
                            allowBlank: false,
                            readOnly: false,
                            flex: 1
                        }
                    ]
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_MAPREDUCE,
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
                    name: 'jar',
                    fieldLabel: MSG.DESIGNER_MR_JAR,
                    value: 'org.ankus:ankus-core:0.1',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: MSG.DESIGNER_DRIVER,
                    value: 'Recommendation',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_H_CONFIG,
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
                /*
                 {
                 xtype: '_configurationBrowserField'
                 },
                 */
                {
                    xtype: '_keyValueGrid',
                    flex: 1
                }
            ]
        }
    ],

    /**
     * UI 컴포넌트의 Key를 필터링한다.
     *
     * ex) 다음과 같이 필터를 설정할 수 있다.
     * propFilters: {
     *     // 추가할 프라퍼티
     *     add   : [
     *         {'test1': '1'},
     *         {'test2': '2'}
     *     ],
     *
     *     // 변경할 프라퍼티
     *     modify: [
     *         {'delimiterType': 'delimiterType2'},
     *         {'config': 'config2'}
     *     ],
     *
     *     // 삭제할 프라퍼티
     *     remove: ['script', 'metadata']
     * }
     */
    propFilters: {
        add: [],
        modify: [],
        remove: ['config']
    },

    /**
     * MapReduce의 커맨드 라인 파라미터를 수동으로 설정한다.
     * 커맨드 라인 파라미터는 Flamingo Workflow Engine에서 props.mapreduce를 Key로 꺼내어 구성한다.
     *
     * @param props UI 상에서 구성한 컴포넌트의 Key Value값
     */
    afterPropertySet: function (props) {
        props.mapreduce = {
            "driver": props.driver ? props.driver : '',
            "jar": props.jar ? props.jar : '',
            "confKey": props.hadoopKeys ? props.hadoopKeys : '',
            "confValue": props.hadoopValues ? props.hadoopValues : '',
            params: []
        };

        if (props.input) {
            props.mapreduce.params.push("-input", props.input);
        }

        if (props.output) {
            props.mapreduce.params.push("-output", props.output);
        }

        if (props.basedType) {
            props.mapreduce.params.push("-basedType", props.basedType);
        }

        if (props.delimiter) {
            if (props.delimiter == 'CUSTOM') {
                props.mapreduce.params.push("-delimiter", props.delimiterValue);
            } else {
                props.mapreduce.params.push("-delimiter", props.delimiter);
            }
        }

        if (props.similarDataInput) {
            props.mapreduce.params.push("-similarDataInput", props.similarDataInput);
        }

        this.callParent(arguments);
    }
});