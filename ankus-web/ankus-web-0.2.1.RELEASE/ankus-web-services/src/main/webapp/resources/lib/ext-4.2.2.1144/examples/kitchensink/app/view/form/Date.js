Ext.define('KitchenSink.view.form.Date', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.panel.Panel',
        'Ext.picker.Date',
        'Ext.picker.Month',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox'
    ],
    xtype: 'form-date',

    //<example>
    exampleTitle: 'Date/Month Picking',
    exampleDescription: '<p>This example shows how to use the date/month pickers.</p>',
    //</example>

    layout: {
        type: 'vbox',
        align: 'center'
    },

    width: 500,

    initComponent: function () {
        this.items = [
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 20 0',
                items: [
                    {
                        title: 'Date Picker',
                        margin: '0 20 0 0',
                        items: {
                            xtype: 'datepicker'
                        }
                    },
                    {
                        title: 'Month Picker',
                        items: {
                            xtype: 'monthpicker'
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        title: 'Date Picker (no today)',
                        margin: '0 20 0 0',
                        items: {
                            xtype: 'datepicker',
                            showToday: false
                        }
                    },
                    {
                        title: 'Month Picker (no buttons)',
                        items: {
                            xtype: 'monthpicker',
                            showButtons: false
                        }
                    }
                ]
            }
        ];
        this.callParent();
    }
});
