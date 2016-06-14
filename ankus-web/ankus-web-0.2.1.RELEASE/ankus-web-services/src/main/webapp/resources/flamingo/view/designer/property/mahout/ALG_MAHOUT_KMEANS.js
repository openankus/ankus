Ext.ns('Flamingo.view.designer.property.mahout');
Ext.define('Flamingo.view.designer.property.mahout.ALG_MAHOUT_KMEANS', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_MAHOUT_KMEANS',

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
                    name: 'clusterFile',
                    fieldLabel: '클러스터 경로',
                    allowBlank: true
                },
                {
                    xtype: '_browserField',
                    name: 'workingFile',
                    fieldLabel: '작업 경로',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'distanceMeasure',
                    fieldLabel: '거리 측정 객체 클래스명',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'convergenceDelta',
                    fieldLabel: '수렴수치',
                    vtype: 'decimalpoint',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'maxIteration',
                    fieldLabel: '최대 반복 횟수',
                    vtype: 'numeric',
                    allowBlank: true
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '클러스터링 처리 조건',
                    columns: 2,
                    itemId: 'runCluster',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'runClustering',
                            checked: true,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'runClustering',
                            checked: false,
                            inputValue: 'false'
                        }
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '순자적 처리 조건',
                    columns: 2,
                    itemId: 'runSequential',
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'True',
                            name: 'runSequential',
                            checked: true,
                            inputValue: 'true'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'False',
                            name: 'runSequential',
                            checked: false,
                            inputValue: 'false'
                        }
                    ]
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
                    value: 'KMeans',
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
            title: 'Hadoop',
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

        if (props.clusterFile) {
            props.mapreduce.params.push("-clusterFile", props.clusterFile);
        }

        if (props.workingFile) {
            props.mapreduce.params.push("-workingFile", props.workingFile);
        }

        if (props.distanceMeasure) {
            props.mapreduce.params.push("-distanceMeasure", props.distanceMeasure);
        }

        if (props.convergenceDelta) {
            props.mapreduce.params.push("-convergenceDelta", props.convergenceDelta);
        }

        if (props.maxIteration) {
            props.mapreduce.params.push("-maxIteration", props.maxIteration);
        }

        if (props.runClustering) {
            props.mapreduce.params.push("-runClustering", props.runClustering);
        }

        if (props.runSequential) {
            props.mapreduce.params.push("-runSequential", props.runSequential);
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