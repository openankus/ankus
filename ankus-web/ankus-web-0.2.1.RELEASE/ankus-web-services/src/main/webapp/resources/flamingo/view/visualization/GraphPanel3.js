Ext.define('Flamingo.view.visualization.GraphPanel3', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.graphPanel',

    layout: {
        type: 'fit'
    },

    bodyPadding: 5,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                Ext.create('Ext.chart.Chart', {
                    style: 'background:#fff',
                    animate: true,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'data1', 'data2'],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: '/viz/file?path=/viz/data1.txt&params=name,data1,data2',
                            headers: {
                                'Accept': 'application/json'
                            },
                            reader: {
                                type: 'json',
                                root: 'list'
                            },
                            listeners: {
                                exception: function (proxy, response, operation) {
                                    var result = Ext.decode(response.responseText);
                                    Ext.MessageBox.show({
                                        title: 'Server Error',
                                        msg: result.error.message,
                                        icon: Ext.MessageBox.ERROR,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                        }
                    }),
                    legend: {
                        position: 'bottom'
                    },
                    axes: [
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['data1', 'data2'],
                            title: 'Number of Hits',
                            grid: {
                                odd: {
                                    opacity: 1,
                                    fill: '#ddd',
                                    stroke: '#bbb',
                                    'stroke-width': 1
                                }
                            },
                            minimum: 0,
                            adjustMinimumByMajorUnit: 0
                        },
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['name'],
                            title: 'Month of the Year',
                            grid: true,
                            label: {
                                rotate: {
                                    degrees: 315
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'area',
                            highlight: false,
                            axis: 'left',
                            xField: 'name',
                            yField: ['data1', 'data2'],
                            style: {
                                opacity: 0.93
                            }
                        }
                    ]
                })
            ]
        });
        me.callParent(arguments);
    }
});