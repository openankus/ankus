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

Ext.ns('Flamingo.view.designer.property.ankus');
Ext.define('Flamingo.view.designer.property.ankus.ALG_ANKUS_CORR_BOOL', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_ANKUS_CORR_BOOL',

    requires: [
        'Flamingo.view.designer.property._ConfigurationBrowserField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._ColumnGrid',
        'Flamingo.view.designer.property._DependencyGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._KeyValueGrid',
        'Flamingo.view.designer.property._EnvironmentGrid',
        'Flamingo.model.designer.Preview'
    ],
    overflowY: 'scroll',
    width: 500,
    height: 550,

    items: [
        {
            title: MSG.DESIGNER_TITLE_PARAMETER,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 120
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
                    xtype: 'tbspacer',
                    height: 10
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
                                                    customValueField.setValue('::');
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
                {
                    xtype: 'button',
                    text: 'Preview file from HDFS',
//                    iconCls: 'common-confirm',
                    handler: function (grid, rowIndex, colIndex) {

                        // Parameter form
                        var canvas = Ext.ComponentQuery.query('form')[1];
                        var form = canvas.getForm();

                        // Preview grid
                        var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];

                        // Input paths grid
                        var inputGrid = Ext.ComponentQuery.query('_inputGrid')[0];
                        var selectedInputPath = inputGrid.getView().getSelectionModel().getSelection();

                        if (selectedInputPath[0] === undefined) {
                            msg('Select input path', 'Please select input path from File Path grid.');
                            return;
                        }

                        var inputPath = selectedInputPath[0].data.input;
                        var delimiter = form.getValues()['delimiter'];

                        // Get _inputGrid values
                        var inputGridCanvas = Ext.ComponentQuery.query('canvas')[0];
                        var inputGridForm = inputGridCanvas.getForm();
                        var engineId = inputGridForm.getValues()['engine_id'];

                        var store = Ext.create('Ext.data.Store', {
                            fields: [
                                {name: 'columnIndex'},
                                {name: 'rowData'}
                            ],
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: CONSTANTS.CONTEXT_PATH + CONSTANTS.DESIGNER.LOAD_HDFS_FILE,
                                headers: {
                                    'Accept': 'application/json'
                                },
                                reader: {
                                    type: 'json',
                                    root: 'list'
                                },
                                extraParams: {
                                    'inputPath': inputPath,
                                    'delimiter': delimiter,
                                    'engineId': engineId
                                }
                            }
                        });

                        // Set grid row to preview file from hdfs
                        var rec;
                        var columnIndexList;
                        var rowDataList;

                        store.on('load', function (store, records) {

                            for (var i = 0; i < records.length; i++) {

                                columnIndexList = records[i].get('columnIndex');
                                rowDataList = records[i].get('rowData');

                                for (var k = 0; k < columnIndexList.length; k++) {
                                    rec = new Flamingo.model.designer.Preview({
                                        rIndex: columnIndexList[k],
                                        rData: rowDataList[k]
                                    });

                                    store.insert(0, rec);
                                    //Remove get list from ajax
                                    store.remove(records);
                                    previewGrid.store.sort('rIndex', 'ASC');
                                }
                            }
                        });

                        Ext.suspendLayouts();
                        previewGrid.reconfigure(store, [
                            {
                                text: 'Index',
                                dataIndex: 'rIndex',
                                id: 'rIndex',
                                width: 80
                            },
                            {
                                text: 'Value',
                                dataIndex: 'rData',
                                flex: 1
                            },
                            {
                                xtype: 'checkcolumn',
                                width: 70,
                                header: 'Identifier',
                                dataIndex: 'targetCheckIndex',
                                listeners: {
                                    checkchange: function (column, recordIndex, checked) {

                                        var rowCount = previewGrid.getStore().data.length;
                                        var dataIndex = this.dataIndex;
                                        var record = previewGrid.getStore().getAt(recordIndex);
                                        checked = !record.get(dataIndex);

                                        // 하나 체크할 때 나머지는 체크 해지
                                        for (var i = 0; i < rowCount; i++) {
                                            if (i != recordIndex) {
                                                previewGrid.getStore().getAt(i).set(dataIndex, checked);
                                            }
                                        }
                                    }
                                }
                            }
                        ]);
                        Ext.resumeLayouts(true);
                    }
                },
                {
                    margin: '10 0 0 0',
                    xtype: 'grid',
                    minHeight: 100,
                    height: 130,
                    itemId: 'previewGrid',
                    multiSelect: true,
                    columns: [
                        {
                            text: 'Index',
                            width: 80,
                            dataIndex: 'rIndex',
                            id: 'rIndex'
                        },
                        {
                            text: 'Value',
                            flex: 1,
                            dataIndex: 'rData'
                        },
                        {
                            xtype: 'checkcolumn',
                            width: 70,
                            header: 'Identifier',
                            dataIndex: 'targetCheckIndex',
                            editor: {
                                xtype: 'checkbox',
                                cls: 'x-grid-checkheader-editor'
                            }
                        }
                    ],
                    tbar: [
                        {
                            text: 'Reset',
                            iconCls: 'common-find-clear',
                            scope: this,
                            align: 'right',
                            handler: function (store) {
                                var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
                                var range = previewGrid.store.getRange();

                                for (var i = 0; i < range.length; i++) {
                                    if (range[i] != null) {
                                        var record = previewGrid.getStore().getAt(i);
                                        record.set('targetCheckIndex', false);
                                    }
                                }
                            }
                        }

                    ],
                    viewConfig: {
                        enableTextSelection: true,
                        emptyText: 'Click a button to show preview data from HDFS',
                        deferEmptyText: false
                    }
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'button',
                    text: 'Select field number',
                    iconCls: 'common-confirm',
                    handler: function (store) {
                        var previewGrid = Ext.ComponentQuery.query('#previewGrid')[0];
                        var r = previewGrid.store.getRange();

                        var targetCount = 0
                        var record;

                        // Count checkbox from grid
                        for (var i = 0; i < r.length; i++) {
                            if (r[i] != null) {
                                record = previewGrid.getStore().getAt(i);

                                if (r[i].data.targetCheckIndex) targetCount++;
                            }
                        }

                        var targetIndexList = [];

                        // Set checkbox index from gird
                        for (var i = 0; i < r.length; i++) {
                            if (r[i] != null) {
                                record = previewGrid.getStore().getAt(i);

                                // Set target attribute(index) list
                                if (targetCount != r.length && targetCount != 0) {
                                    if (r[i].data.targetCheckIndex) {
                                        targetIndexList.push(r[i].data.rIndex);
                                        if (targetCount === targetCount - 1) {
                                            targetIndexList.push(',');
                                        }
                                    }
                                }
                            }
                        }

                        // Set textfiled by grid
                        if (targetCount == r.length) {
                            Ext.getCmp('keyIndex').setValue('-1');
                        } else if (targetCount === 0) {
                            Ext.getCmp('keyIndex').setValue('');

                        } else {
                            Ext.getCmp('keyIndex').setValue(targetIndexList);
                        }
                    }
                },
                {
                    xtype: 'fieldset',
                    height: 50,
                    title: 'Select Parameter Option',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 200,
                        hideEmptyLabel: false
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: MSG.DESIGNER_CORR_IDENTIFIER,
                            name: 'keyIndex',
                            id: 'keyIndex',
                            tooltip: MSG.DESIGNER_MSG_CORR_IDENTIFIER,
                            vtype: 'numeric',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 80,
                    title: 'Input Parameter Option',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 200,
                        hideEmptyLabel: false
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: MSG.DESIGNER_CORR_ALGORITHM,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    name: 'algorithmOption',
                                    value: 'dice',
                                    flex: 1,
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
                                            {name: 'DICE COEFFICIENT', value: 'dice', description: 'DICE COEFFICIENT'},
                                            {name: 'JACCARD COEFFICIENT', value: 'jaccard', description: 'JACCARD COEFFICIENT'},
                                            {name: 'HAMMING DISTANCE', value: 'hamming', description: 'HAMMING DISTANCE'}
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
                    value: 'BooleanDataCorrelation',
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

        if (props.keyIndex) {
            props.mapreduce.params.push("-keyIndex", props.keyIndex);
        }

        if (props.algorithmOption) {
            props.mapreduce.params.push("-algorithmOption", props.algorithmOption);
        }

        if (props.delimiter) {
            if (props.delimiter == 'CUSTOM') {
                props.mapreduce.params.push("-delimiter", props.delimiterValue);
            } else {
                props.mapreduce.params.push("-delimiter", props.delimiter);
            }
        }

        this.callParent(arguments);
    }
});