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

Ext.define('Flamingo.view.hadoop.NameNode', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.namenode',
    requires: [
        'Ext.chart.*',
        'Ext.Window',
        'Ext.fx.target.Sprite',
        'Ext.layout.container.Fit',
        'Ext.window.MessageBox',
        'Chart.ux.HighChart'
    ],

    controllers: ['Flamingo.controller.hadoop.NameNodeController'],
    border: false,
    layout: {
        type: 'fit'
    },

//    bodyPadding: 5,

    initComponent: function () {
        var namenodeStore = Ext.create('Flamingo.store.hadoop.NameNodeStore');

        this.items = [
            {
                border: false,
                store: namenodeStore,
                xtype: 'highchart',
                /*store:'StatisticsHistory',*/
                series: [
                    {
                        type: 'column',
                        name: 'Jane',
                        data: [3, 2, 1, 3, 4]
                    },
                    {
                        type: 'column',
                        name: 'John',
                        data: [2, 3, 5, 7, 6]
                    },
                    {
                        type: 'column',
                        name: 'Joe',
                        data: [4, 3, 3, 9, 0]
                    },
                    {
                        type: 'spline',
                        name: 'Average',
                        data: [3, 2.67, 3, 6.33, 3.33],
                        marker: {
                            lineWidth: 2,
                            lineColor: '#910000',
                            fillColor: 'white'
                        }
                    },
                    {
                        type: 'pie',
                        name: 'Total consumption',
                        data: [
                            {
                                name: 'Jane',
                                y: 13,
                                color: '#2f7ed8' // Jane's color
                            },
                            {
                                name: 'John',
                                y: 23,
                                color: '#0d233a' // John's color
                            },
                            {
                                name: 'Joe',
                                y: 19,
                                color: '#8bbc21' // Joe's color
                            }
                        ],
                        center: [100, 80],
                        size: 100,
                        showInLegend: false,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ],
                xField: 'time',
                chartConfig: {
                    chart: {
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
                    },
                    tooltip: {
                        formatter: function () {
                            var s;
                            if (this.point.name) { // the pie chart
                                s = '' +
                                    this.point.name + ': ' + this.y + ' fruits';
                            } else {
                                s = '' +
                                    this.x + ': ' + this.y;
                            }
                            return s;
                        }
                    },
                    labels: {
                        items: [
                            {
                                html: 'Total fruit consumption',
                                style: {
                                    left: '40px',
                                    top: '8px',
                                    color: 'black'
                                }
                            }
                        ]
                    }
                }
            }
        ];
//        me.callParent(arguments);
        this.callParent(arguments);
        this.on('afterrender', this.registControllers, this);
    },

    registControllers: function () {
        Ext.each(this.controllers, function (control) {
            var controller = Flamingo.app.controllers.get(control);
            if (!controller) {
                controller = Ext.create(control, {
                    application: Flamingo.app,
                    id: control
                });
                Flamingo.app.controllers.put(control, controller);
                controller.init(); // Run init on the controller
            }
        }, this);
    }

});