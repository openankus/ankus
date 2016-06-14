/**
 * Apache Mahout의 Item based CF
 *
 * @command hadoop jar mahout-core-0.5-job.jar org.apache.mahout.cf.taste.hadoop.item.RecommenderJob --input input --output output --similarityClassname SIMILARITY_PEARSON_CORRELATION
 * @data 5,3600222,5.000000 (User,Item,Rating)
 * @see https://cwiki.apache.org/confluence/display/MAHOUT/Itembased+Collaborative+Filtering
 * @author Edward KIM
 */

Ext.ns('Flamingo.view.designer.property.mahout');
Ext.define('Flamingo.view.designer.property.mahout.ALG_MAHOUT_CF_ITEM', {
    extend: 'Flamingo.view.designer.property._NODE_ALG',
    alias: 'widget.ALG_MAHOUT_CF_ITEM',

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
            title: MSG.DESIGNER_COL_PARAM,
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
                    name: 'usersFile',
                    fieldLabel: '사용자 파일',
                    allowBlank: true
                },
                {
                    xtype: '_browserField',
                    name: 'itemsFile',
                    fieldLabel: '아이템 파일',
                    allowBlank: true
                },
                {
                    xtype: '_browserField',
                    name: 'filterFile',
                    fieldLabel: '필터 파일',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'numRecommendations',
                    fieldLabel: '추천 개수',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'maxPrefsPerUser',
                    fieldLabel: '사용자별 최대 선호도 개수',
                    allowBlank: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '유사도 계산 방법',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combo',
                            name: 'similarityClassname',
                            value: 'SIMILARITY_PEARSON_CORRELATION',
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
                            tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="{description}">{name}</div></tpl>',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value', 'description'],
                                data: [
                                    {name: 'SIMILARITY_COOCCURRENCE', value: 'SIMILARITY_COOCCURRENCE', description: 'SIMILARITY_COOCCURRENCE'},
                                    {name: 'SIMILARITY_EUCLIDEAN_DISTANCE', value: 'SIMILARITY_EUCLIDEAN_DISTANCE', description: 'SIMILARITY_EUCLIDEAN_DISTANCE'},
                                    {name: 'SIMILARITY_LOGLIKELIHOOD', value: 'SIMILARITY_LOGLIKELIHOOD', description: 'SIMILARITY_LOGLIKELIHOOD'},
                                    {name: 'SIMILARITY_PEARSON_CORRELATION', value: 'SIMILARITY_PEARSON_CORRELATION', description: 'SIMILARITY_PEARSON_CORRELATION'},
                                    {name: 'SIMILARITY_TANIMOTO_COEFFICIENT', value: 'SIMILARITY_TANIMOTO_COEFFICIENT', description: 'SIMILARITY_TANIMOTO_COEFFICIENT'},
                                    {name: 'SIMILARITY_UNCENTERED_COSINE', value: 'SIMILARITY_UNCENTERED_COSINE', description: 'SIMILARITY_UNCENTERED_COSINE'},
                                    {name: 'SIMILARITY_UNCENTERED_ZERO_ASSUMING_COSINE', value: 'SIMILARITY_UNCENTERED_ZERO_ASSUMING_COSINE', description: 'SIMILARITY_UNCENTERED_ZERO_ASSUMING_COSINE'}
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
                    name: 'maxSimilaritiesPerItem',
                    fieldLabel: '아이템별 유사 아이템 개수',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'maxPrefsPerUserInItemSimilarity',
                    fieldLabel: '사용자별 선호도 최대값',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'minPrefsPerUser',
                    fieldLabel: '사용자별 선호도 최소값',
                    emptyText: '이 값보다 작은 선호도를 가진 사용자는 무시',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    name: 'threshold',
                    fieldLabel: '유사도 임계치',
                    allowBlank: true
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
                    value: 'org.apache.mahout.cf.taste.hadoop.item.RecommenderJob',
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
            title: '입력 컬럼',
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
            title: '출력 컬럼',
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

        if (props.input) {
            props.mapreduce.params.push("-input", props.input);
        }

        if (props.output) {
            props.mapreduce.params.push("-output", props.output);
        }

        if (props.usersFile) {
            props.mapreduce.params.push("-usersFile", props.usersFile);
        }

        if (props.itemsFile) {
            props.mapreduce.params.push("-itemsFile", props.itemsFile);
        }

        if (props.filterFile) {
            props.mapreduce.params.push("-filterFile", props.filterFile);
        }

        if (props.numRecommendations) {
            props.mapreduce.params.push("-numRecommendations", props.numRecommendations);
        }

        if (props.maxPrefsPerUser) {
            props.mapreduce.params.push("-maxPrefsPerUser", props.maxPrefsPerUser);
        }

        if (props.similarityClassname) {
            props.mapreduce.params.push("-similarityClassname", props.similarityClassname);
        }

        if (props.maxSimilaritiesPerItem) {
            props.mapreduce.params.push("-maxSimilaritiesPerItem", props.maxSimilaritiesPerItem);
        }

        if (props.maxPrefsPerUserInItemSimilarity) {
            props.mapreduce.params.push("-maxPrefsPerUserInItemSimilarity", props.maxPrefsPerUserInItemSimilarity);
        }

        if (props.minPrefsPerUser) {
            props.mapreduce.params.push("-minPrefsPerUser", props.minPrefsPerUser);
        }

        if (props.threshold) {
            props.mapreduce.params.push("-threshold", props.threshold);
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