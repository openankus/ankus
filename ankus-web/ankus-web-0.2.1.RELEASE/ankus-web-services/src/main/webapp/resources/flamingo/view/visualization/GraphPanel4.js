Ext.define('Flamingo.view.visualization.GraphPanel4', {
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
                    axes: [
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['data1'],
                            title: 'Hits',
                            grid: true,
                            minimum: 0,
                            maximum: 100
                        },
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['name'],
                            title: 'Months',
                            label: {
                                rotate: {
                                    degrees: 270
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'column',
                            axis: 'left',
                            gutter: 80,
                            xField: 'name',
                            yField: ['data1'],
                            tips: {
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setTitle(storeItem.get('name'));
                                    this.update(storeItem.get('data1'));
                                }
                            },
                            style: {
                                fill: '#38B8BF'
                            }
                        }
                    ]
                })
            ]
        });
        me.callParent(arguments);
    }
});