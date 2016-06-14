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
Ext.define('Flamingo.view.designer.property.browser.hdfs.DirectoryPanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.hdfsDirectoryPanelForDesigner',

    border: false,

    rootVisible: true,

    useArrows: false,

    store: {},

    engineId: {},

    constructor: function (config) {
        this.engineId = config.engineId;
        this.store = Ext.create('Flamingo.store.designer.property.browser.hdfs.DirectoryStore');
        this.store.getProxy().extraParams.engineId = this.engineId;
        this.callParent(arguments);
    },

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            store: this.store,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'hidden',
                            itemId: 'lastPath',
                            allowBlank: true
                        },
                        {
                            xtype: 'hidden',
                            itemId: 'lastCluster',
                            allowBlank: true
                        },
                        '->',
                        {
                            text: MSG.COMMON_REFRESH,
                            iconCls: 'common-refresh',
                            itemId: 'refreshButton',
                            tooltip: MSG.HDFS_TIP_FILE_REFRESH
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    }
});