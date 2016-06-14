Ext.define('Flamingo.view.visualization.GraphPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.graphPanel',

    requires: [
        'Chart.ux.HighChart'
    ],

    layout: {
        type: 'fit'
    },

    bodyPadding: 5,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'highchart',
                    store: new Ext.data.JsonStore({
                        url: 'test.json',
                        fields: [
                            { name: 'weight', type: 'string' },
                            { name: 'height', type: 'float' },
                            { name: 'today', type: 'float' }
                        ],
                        root: 'rows'
                    }),
                    chartConfig: {
                        chart: {
                            type: 'scatter',
                            zoomType: 'xy'
                        },
                        title: {
                            text: '성별 몸무게 및 키의 분포도'
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            title: {
                                enabled: true,
                                text: '키'
                            },
                            startOnTick: true,
                            endOnTick: true,
                            showLastLabel: true
                        },
                        yAxis: {
                            title: {
                                text: '몸무게'
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'left',
                            verticalAlign: 'top',
                            x: 100,
                            y: 70,
                            floating: true,
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1
                        },
                        plotOptions: {
                            scatter: {
                                marker: {
                                    radius: 5,
                                    states: {
                                        hover: {
                                            enabled: true,
                                            lineColor: 'rgb(100,100,100)'
                                        }
                                    }
                                },
                                states: {
                                    hover: {
                                        marker: {
                                            enabled: false
                                        }
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<b>{series.name}</b><br>',
                                    pointFormat: '{point.x} cm, {point.y} kg'
                                }
                            }
                        }
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
});