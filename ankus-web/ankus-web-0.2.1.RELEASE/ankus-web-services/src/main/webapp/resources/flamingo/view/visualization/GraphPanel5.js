Ext.define('Flamingo.view.visualization.GraphPanel5', {
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
                        fields: ['name', 'data1'],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: '/viz/file?path=/viz/data2.txt&params=name,data1',
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
                    shadow: true,
                    legend: {
                        position: 'right'
                    },
                    insetPadding: 60,
                    theme: 'Base:gradients',
                    series: [
                        {
                            type: 'pie',
                            field: 'data1',
                            showInLegend: true,
                            tips: {
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    //calculate percentage.
                                    var total = 0;
                                    store1.each(function (rec) {
                                        total += rec.get('data1');
                                    });
                                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                                }
                            },
                            highlight: {
                                segment: {
                                    margin: 20
                                }
                            },
                            label: {
                                field: 'name',
                                display: 'rotate',
                                contrast: true,
                                font: '18px Arial'
                            }
                        }
                    ]
                })
            ]
        });
        me.callParent(arguments);
    }
});