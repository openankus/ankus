Ext.ns('Flamingo.view.designer.property.mahout');
Ext.define('Flamingo.view.designer.property.mahout.ALG_MAHOUT_MINHASH', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_MAHOUT_MINHASH',

    requires: [
        'Flamingo.view.designer.property._ConfigurationBrowserField',
        'Flamingo.view.designer.property._BrowserField',
        'Flamingo.view.designer.property._ColumnGrid',
        'Flamingo.view.designer.property._DependencyGrid',
        'Flamingo.view.designer.property._NameValueGrid',
        'Flamingo.view.designer.property._KeyValueGrid',
        'Flamingo.view.designer.property._EnvironmentGrid'
    ],

    width: 450,
    height: 320,

    items: [
        {
            title: MSG.DESIGNER_TITLE_PARAMETER,
            xtype: 'form',
            border: false,
            autoScroll: true,
            defaults: {
                labelWidth: 150
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: '_browserField',
                    name: 'vectorFile',
                    fieldLabel: '벡터 경로',
                    allowBlank: true
                },
                {
                    xtype: '_browserField',
                    name: 'outputFile',
                    fieldLabel: '출력 경로',
                    allowBlank: true
                },
                {
                    xtype: '_browserField',
                    name: 'overwrite',
                    fieldLabel: '디렉토리경로 수정',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'minClusterSize',
                    fieldLabel: '최소 클러스터 크기',
                    tooltip: 'Minimum points inside a cluster',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'minVectorSize',
                    fieldLabel: '최소 벡터 크기',
                    tooltip: 'Minimum size of vector to be hashed',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'hashType',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            name: 'algorithmOption',
                            value: 'linear',
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
                                    {name: 'LINEAR', value: 'linear', description: 'LINEAR'},
                                    {name: 'POLYNOMIAL', value: 'polynomial', description: 'POLYNOMIAL'},
                                    {name: 'MURMUR', value: 'murmur', description: 'MURMUR'}
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
                {
                    xtype: 'textfield',
                    name: 'numHashFunctions',
                    fieldLabel: '해쉬 함수 개수',
                    tooltip: 'Number of hash functions to be used',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'keyGroups',
                    fieldLabel: '키 그룹 개수',
                    tooltip: 'Number of key groups to be used',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'numReducers',
                    fieldLabel: '작업 감소 횟수',
                    tooltip: 'Number of reduce tasks (default = 2)',
                    vtype: 'numeric',
                    value: 2,
                    allowBlank: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '컬럼 구분자',
                    tooltip: '컬럼간 구분자이며 잘못 지정하는 경우 MapReduce 작업이 실패할 수 있습니다.',
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
                                            {name: 'Double Colons', value: '::', description: '::'},
                                            {name: 'Comma', value: ',', description: ','},
                                            {name: 'Tab', value: '\\t', description: '\\t'},
                                            {name: 'Space', value: '\\s', description: '\\s'},
                                            {name: 'Custom', value: 'CUSTOM', description: 'User Defined'}
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
                    fieldLabel: 'Mahout JAR',
                    value: 'org.apache.mahout:mahout-core:0.5',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'driver',
                    fieldLabel: 'Driver',
                    value: 'org.apache.mahout.clustering.minhash.MinHashDriver',
                    disabledCls: 'disabled-plain',
                    allowBlank: false
                },
                {
                    xtype: '_dependencyGrid',
                    title: MSG.DESIGNER_TITLE_MR_DEPEND_JAR,
                    flex: 1
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_INPUT_COL,
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
                    xtype: '_prevColumnGrid',
                    readOnly: true,
                    flex: 1
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_OUTPUT_COL,
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
                    xtype: 'hidden',
                    name: 'outputPathQualifier'
                },
                /*{
                 xtype : '_delimiterSelCmbField',
                 hidden: true
                 },*/
                {
                    xtype: '_columnGrid',
                    readOnly: true,
                    flex: 1
                }
            ]
        },
        {
            title: MSG.DESIGNER_TITLE_HADOOP,
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

        if (props.vectorFile) {
            props.mapreduce.params.push("-vectorFile", props.vectorFile);
        }

        if (props.outputFile) {
            props.mapreduce.params.push("-outputFile", props.outputFile);
        }

        if (props.overwrite) {
            props.mapreduce.params.push("-overwrite", props.overwrite);
        }

        if (props.minClusterSize) {
            props.mapreduce.params.push("-minClusterSize", props.minClusterSize);
        }

        if (props.minVectorSize) {
            props.mapreduce.params.push("-minVectorSize", props.minVectorSize);
        }

        if (props.algorithmOption) {
            props.mapreduce.params.push("-algorithmOption", props.algorithmOption);
        }

        if (props.numHashFunctions) {
            props.mapreduce.params.push("-numHashFunctions", props.numHashFunctions);
        }

        if (props.keyGroups) {
            props.mapreduce.params.push("-keyGroups", props.keyGroups);
        }

        if (props.numReducers) {
            props.mapreduce.params.push("-numReducers", props.numReducers);
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