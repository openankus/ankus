/**
 * Copyright (C) 2011  ankus Framework (http://www.openankus.org).
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

Ext.define('dblinkHdfsBrowserController', {
    extend: 'Ext.app.Controller',
	engineId: {},
    init: function () {
        log('Initializing HDFS Browser Controller for Designer');       
																							                            										
        this.control({
            'dblinkhdfsDirectory': {
                itemclick: this.onDBLinkDirectoryClick
            },
            'dblinkhdfsDirectory #refreshButton': {
                click: this.onRefreshClick
            },
            'dblinkhdfsFile > grid': {
                itemclick: this.onDBLinkFileClick
            },
            'dblinkhdfsFile #refreshButton': {
                click: this.onRefreshFileClick
            }
        });
        log('Initialized HDFS Browser Controller for Designer');

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched HDFS Browser Controller for Designer');

        var directoryPanel = query('dblinkhdfsDirectory');
        directoryPanel.getRootNode().expand();
    },

 
    onDBLinkFileClick: function (view, record, item, index, e, opts) {
        var directoryPanel = query('dblinkhdfsDirectory');
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        lastPathComp.setValue(record.data.id);
    },
   
    onDBLinkDirectoryClick: function (view, record, item, index, event, opts) {
    	var directoryPanel = query('dblinkhdfsDirectory');      
        var filePanel = query('dblinkhdfsFile > grid');        
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        
        lastPathComp.setValue(record.data.id);

        directoryPanel.getStore().getProxy().extraParams.engineId = this.getWorkflowEngine();

        var params = {
            path: record.data.id,
            engineId: this.getWorkflowEngine()
        };

        filePanel.getStore().load({
            scope: this,
            params: params
        });
        filePanelStore = filePanel.getStore();
        
        //var count = filePanelStore.snapshot ? filePanelStore.snapshot.length : filePanelStore.getCount();
       
        
    },

    getWorkflowEngine: function () {
        return this.engineId;
    },

    onRefreshClick: function () {
        this.updateDirectoryStore(this.getWorkflowEngine(), '/');
        this.updateFileStore(this.getWorkflowEngine(), '/');
    },


    onRefreshFileClick: function () {
        this.updateFileStore(this.getWorkflowEngine, '/');
    },

    updateDirectoryStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }
        var directoryPanel = query('dblinkhdfsDirectory');
        directoryPanel.getStore().load({
            params: {
                engineId: engineId,
                node: path
            }
        });
    },

    updateFileStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }
        var fileStore = query('dblinkhdfsFile > grid').getStore()
        fileStore.removeAll();
        fileStore.load({
            scope: this,
            params: {
                path: path,
                engineId: engineId
            }
        });
    }
});

Ext.define('FileStore', {
    extend: 'Ext.data.Store',
    //alias: 'store.fileStoreForDesigner',

    autoLoad: false,

    fields: ['filename', 'length', 'modificationTime', 'permission', 'group', 'owner', 'replication', 'blocksize','directory'],
    sortOnLoad: true,
    sorters: { property: "directory", direction: "DESC" },
    
    proxy: {
        type: 'ajax',
        url: CONSTANTS.FS.HDFS_GET_FILE,
        headers: {
            'Accept': 'application/json'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'engineId': ''
        }
    }
});

Ext.define('File', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dblinkhdfsFile',

    layout: 'fit',

    border: false,

    store: {},

    engineId:'',

    constructor: function (config) {
    	
        this.engineId = config.engineId;
        this.store = Ext.create('FileStore');
        this.store.getProxy().extraParams.engineId = this.engineId;
        this.callParent(arguments);
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'grid',
                border: false,
                stripeRows: true,
                columnLines: true,
                viewConfig: {
                    enableTextSelection: true
                },
                columns: [
                    {
                        xtype: 'rownumberer',
                        text: MSG.HDFS_NO,
                        width: 50,
                        align: 'center',
                        sortable: false
                    },
                    {
						text: 'Type',      
						name:'directory',
						dataIndex: 'directory', 
						align: 'center',        
						width: 50,
						renderer: function(value, metadata, record, rowIndex, colIndex, store) {  
							var val = value+"";
							 if(val == 'true') {
								 metadata.css = 'HDFS-folder';                        			 
							}else{
								return '';
							}               
							 
						}
					},     
                    {text: MSG.HDFS_FILE_NAME, flex: 2, dataIndex: 'filename'},
                    {
                        text: MSG.HDFS_FILE_SIZE, flex: 1, sortable: true, dataIndex: 'length', align: 'right',
                        renderer: function (num) {
                            return Flamingo.Util.String.toCommaNumber(num);
                        }
                    },
                    {
                        text: MSG.HDFS_FILE_TIME_STAMP, flex: 1.5, dataIndex: 'modificationTime', align: 'center',
                        renderer: function (value) {
                            var date = new Date(value);
                            return Ext.Date.format(date, 'Y-m-d H:i:s')
                        }
                    },
                    {text: MSG.HDFS_FILE_PERMISSION, flex: 1, dataIndex: 'permission', align: 'center'},
                    {text: MSG.HDFS_INFO_PERMISSION_GROUP, flex: 1, dataIndex: 'group', align: 'center', hidden: true},
                    {text: MSG.HDFS_INFO_PERMISSION_OWNER, flex: 1, dataIndex: 'owner', align: 'center', hidden: true},
                    {text: MSG.HDFS_INFO_REPLICATION, flex: 1, dataIndex: 'replication', align: 'center'},
                    {
                        text: MSG.HDFS_INFO_BLOCK_SIZE, flex: 1, dataIndex: 'blockSize', align: 'center', hidden: true,
                        renderer: function (num) {
                            return Flamingo.Util.String.toCommaNumber(num);
                        }
                    }
                ],
                store: this.store,
                tbar: [
                    '->',
                    {
                        text: MSG.COMMON_REFRESH,
                        iconCls: 'common-refresh',
                        itemId: 'refreshButton',
                        tooltip: MSG.HDFS_TIP_FILE_REFRESH
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});

Ext.define('DirectoryStore', {
    extend: 'Ext.data.TreeStore',
    //alias: 'store.directoryStoreForDesigner',

    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: CONSTANTS.FS.HDFS_GET_DIRECTORY,
        headers: {
            'Accept': 'application/json'
        },
        reader: {
            type: 'json',
            root: 'list'
        },
        extraParams: {
            'engineId': ''
        }
    },
    root: {
        text: '/',
        id: '/',
        expanded: false
    },
    folderSort: true,
    sorters: [
        {
            property: 'text',
            direction: 'ASC'
        }
    ]
});

Ext.define('Directory', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.dblinkhdfsDirectory',

    border: false,

    rootVisible: true,

    useArrows: false,

    store: {},

    engineId: {},

    constructor: function (config) {
        this.engineId = config.engineId;
        this.store = Ext.create('DirectoryStore');
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

//Start
Ext.define('Flamingo.view.desktop.dblink_hdfsBrowser', {
    extend: 'Ext.panel.Panel',
    aliase: 'widget.dblink_hdfsBrowser',
    layout: 'fit',
    requires: [
        'Directory',
        'File'
    ],
    border: true,
    engineId: 0,
    controllers: ['dblinkHdfsBrowserController'],	
    constructor: function (config) {
    	engineId = config.engineId;
        this.callParent(arguments);
    },

    initComponent: function () {
        this.items = {
            layout: 'border',
            border: false,
            items: [
                {
                    region: 'west',
                    split: true,
                    title: MSG.HDFS_DIRECTORY,
                    width: 240,
                    layout: 'fit',
                    border: false,
                    items: [
                        {
                            split: true,
                            autoScroll: true,
                            xtype: 'dblinkhdfsDirectory',
                            engineId: this.engineId
                        }
                    ]
                },
                {
                    region: 'center',
                    title: MSG.HDFS_FILE,
                    border: false,
                    layout: 'fit',                   
                    items: [
                        {
                            split: true,
                            xtype: 'dblinkhdfsFile',
                            engineId: this.engineId
                        }
                    ]
                }
            ]
        };
	
        this.callParent(arguments);
        this.on('afterrender', this.registControllers, this);
    },

    registControllers: function () {
        Ext.each(this.controllers, function (control) {
            var controller = Flamingo.app.controllers.get(control);
            if (!controller) {
                controller = Ext.create(control, {
                    application: Flamingo.app,
                    engineId:engineId,
                    id: control
                });
                Flamingo.app.controllers.put(control, controller);
            }

            controller.init(); // Run init on the controller
        }, this);
    }
});