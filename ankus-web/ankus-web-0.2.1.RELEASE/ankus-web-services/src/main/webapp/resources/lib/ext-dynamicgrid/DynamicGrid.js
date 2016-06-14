/**
 * Lukas Sliwinski
 * sliwinski.lukas@gmail.com
 *
 * Dynamic grid, allow to display data setting only URL.
 * Columns and model will be created dynamically.
 */

Ext.define('Ext.ux.grid.DynamicGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dynamicGrid',
    alternateClassName: 'Ext.grid.DynamicGrid',

    requires: [
        'Ext.ux.data.reader.DynamicReader'
    ],
    // URL used for request to the server. Required
    url: '',
    actionMethods: {
        create: undefined,
        read: undefined,
        update: undefined,
        destroy: undefined
    },

    initComponent: function () {
        console.log('DynamicGrid initComponent!');
        var me = this;

        if (me.url == '') {
            //Ext.Error.raise('url parameter is empty! You have to set proper url to get data form server.');
        }
        else {
            Ext.applyIf(me, {
                columns: [],
                forceFit: true,
                store: Ext.create('Ext.data.Store', {
                    // Fields have to be set as empty array. Without this Ext will not create dynamic model.
                    fields: [],
                    // After loading data grid have to reconfigure columns with dynamic created columns
                    // in Ext.ux.data.reader.DynamicReader
                    listeners: {
                        'metachange': function (store, meta) {
                            me.reconfigure(store, meta.columns);
                        }
                    },
                    autoLoad: false,
                    remoteSort: false,
                    remoteFilter: false,
                    remoteGroup: false,
                    proxy: {
                        reader: {
                            type: 'dynamicReader',
                            root: 'list'
                        },
                        type: 'ajax',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        url: me.url,
                        actionMethods: me.actionMethods,
                        listeners: {
                            exception: function (proxy, response, options) {
                                if (response.status == 200) {
                                    var result = JSON.parse(response.responseText);
                                    if (!result.success)
                                        Ext.Msg.alert('Error', result.error.message + "<br/>" + result.error.cause);
                                } else {
                                    Ext.Msg.alert('Error', '연결에 실패했습니다!');
                                }
                            }
                        }
                    }
                })
            });
        }

        me.callParent(arguments);
    }
});