Ext.define('Flamingo.view.visualization.GraphPanel6', {
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
                    style: 'background:#fff',
                    animate: true,
                    shadow: true,
                    theme: 'Category1',
                    legend: {
                        position: 'right'
                    },
                    axes: [
                        {
                            type: 'Numeric',
                            minimum: 0,
                            position: 'left',
                            fields: ['data1', 'data2'],
                            title: 'Number of Hits',
                            minorTickSteps: 1,
                            grid: {
                                odd: {
                                    opacity: 1,
                                    fill: '#ddd',
                                    stroke: '#bbb',
                                    'stroke-width': 0.5
                                }
                            }
                        },
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['name'],
                            title: 'Month of the Year'
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            xField: 'name',
                            yField: 'data1',
                            markerConfig: {
                                type: 'cross',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            smooth: true,
                            xField: 'name',
                            yField: 'data2',
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        }
                    ]
                })
            ]
        });
        me.callParent(arguments);
    }
});