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
Ext.define('Flamingo.controller.fs.hdfs.BrowserController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.hdfsBrowserController',

    init: function () {
        log('Initializing HDFS Browser Controller');
        this.control({
            'hdfsDirectoryPanel': {
                itemcollapse: this.onItemCollapse,
                itemexpand: this.onItemExpand,
                itemclick: this.onItemClick,
                itemcontextmenu: this.onItemContextMenu
            },
            'hdfsDirectoryPanel #refreshButton': {
                click: this.onRefreshClick
            },
            'hdfsDirectoryPanel #usageButton': {
                click: this.onHdfsUsageClick
            },
            'hdfsDirectoryPanel _workflowEngineCombo': {
                change: this.onEngineChange
            },

            'hdfsFilePanel > grid': {
                itemdblclick: this.onGetFileInfoClick,
                itemclick: this.onItemFileClick
            },
            'hdfsFilePanel #copyButton': {
                click: this.onCopyFileClick
            },
            'hdfsFilePanel #renameButton': {
                click: this.onRenameFileClick
            },
            'hdfsFilePanel #moveButton': {
                click: this.onMoveFileClick
            },
            'hdfsFilePanel #deleteButton': {
                click: this.onDeleteFileClick
            },
            'hdfsFilePanel #refreshButton': {
                click: this.onRefreshFileClick
            },
            'hdfsFilePanel #downloadButton': {
                click: this.onDownloadFileClick
            },
            'hdfsFilePanel #uploadButton': {
                click: this.onUploadFileClick
            },
            'simpleHdfsBrowser #refreshButton': {
                click: this.onSimpleBrowserRefresh
            }
        });
        log('Initialized HDFS Browser Controller');

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched HDFS Browser Controller');

        var filePanel = Ext.ComponentQuery.query('hdfsFilePanel')[0];
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];

        filePanel.query('#totalCountText')[0].setText('Unknown');
        filePanel.query('#totalSizeText')[0].setText('Unknown');

        var hdfsSizeProgressBar = directoryPanel.query('#hdfsSize')[0];
        Flamingo.Ajax.Request.invokeGet(CONSTANTS.FS.HDFS_FS_STATUS, {},
            function (response) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    hdfsSizeProgressBar.updateProgress(obj.map['humanProgress'], obj.map['humanProgressPercent'], true);
                } else {
                    hdfsSizeProgressBar.updateProgress(0, 'Unknown', true);
                }
            },
            function (response) {
                hdfsSizeProgressBar.updateProgress(0, 'Unknown', true);
            }
        );
    },

    /**
     * Workflow Engine Combo를 변경한 경우 이벤트를 처리한다.
     * Workflow Engine을 변경하게 되면 디렉토리와 파일 목록을 /를 기준으로 모두 업데이트하고
     * lastCluster에 선택한 Workflow Engine을 설정한다.
     */
    onEngineChange: function (combo, newValue, oldValue, eOpts) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        directoryPanel.query('#lastCluster')[0].setValue(newValue);

        directoryPanel.getStore().getProxy().extraParams.engineId = newValue;

        this.updateDirectoryStore(newValue, '/');
        this.updateFileStore(newValue, '/');
        this.updateStatus(newValue);

        this._info(MSG.HDFS_MSG_CLUSTER_SELECTED);
    },

    /**
     * 디렉토리를 선택했을 때 파일 목록 정보를 업데이트한다.
     */
    onItemClick: function (view, node, item, index, event, opts) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var filePanel = Ext.ComponentQuery.query('hdfsFilePanel > grid')[0];
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        
        lastPathComp.setValue(node.data.id);

        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        directoryPanel.getStore().getProxy().extraParams.engineId = engineCombo.getValue();
        
        var params = {
            path: node.data.id,
            engineId: engineCombo.getValue()
        };

        filePanel.getStore().load({
            scope: this,
            params: params
        });
    },

    /**
     * 디렉토리에서 마우스 오른쪽 버튼을 누르는 경우 Context Menu를 표시한다.
     */
    onItemContextMenu: function (view, record, item, index, e) {
        var contextMenu = new Ext.menu.Menu({
            items: [
                {
                    text: MSG.HDFS_DIRECTORY_CREATE,
                    iconCls: 'hdfs-directory-create',
                    itemId: 'createFolderMenu',
                    tooltip: MSG.HDFS_TIP_CREATE_FOLDER_MENU,
                    handler: this.onCreateFolderMenuClick
                },
                '-',
                {
                    text: MSG.HDFS_DIRECTORY_RENAME,
                    iconCls: 'hdfs-directory-rename',
                    itemId: 'renameFolderMenu',
                    tooltip: MSG.HDFS_TIP_RENAME_FOLDER_MENU,
                    handler: this.onRenameFolderMenuClick
                },
                {
                    text: MSG.HDFS_DIRECTORY_DELETE,
                    iconCls: 'hdfs-directory-delete',
                    itemId: 'deleteFolderMenu',
                    tooltip: MSG.HDFS_TIP_DELETE_FOLDER_MENU,
                    handler: this.onDeleteFolderMenuClick
                },
                {
                    text: MSG.HDFS_DIRECTORY_MOVE,
                    iconCls: 'hdfs-directory-move',
                    itemId: 'moveFolderMenu',
                    tooltip: MSG.HDFS_TIP_MOVE_FOLDER_MENU,
                    handler: this.onMoveFolderMenuClick
                },
                {
                    text: MSG.HDFS_DIRECTORY_COPY,
                    iconCls: 'hdfs_directory_copy',
                    itemId: 'copyFolderMenu',
                    tooltip: MSG.HDFS_TIP_COPY_FOLDER_MENU,
                    handler: this.onCopyFolderMenuClick
                },
                '-',
                {
                    text: MSG.HDFS_FILE_UPLOAD,
                    iconCls: 'hdfs-file-upload',
                    itemId: 'uploadFileMenu',
                    tooltip: MSG.HDFS_TIP_UPLOAD_FILE_MENU,
                    handler: this.onUploadFileMenuClick
                },
                '-',
                {
                    text: MSG.COMMON_INFO,
                    iconCls: 'hdfs-directory-info',
                    itemId: 'getInfoMenu',
                    tooltip: MSG.HDFS_TIP_GET_INFO_MENU,
                    handler: this.onGetInfoMenuClick
                },
                '-',
                {
                    text: MSG.COMMON_REFRESH,
                    iconCls: 'common-refresh',
                    handler: this.onRefreshMenuClick
                },
                '-',
                {
                    text: MSG.HDFS_CREATE_HIVE_DB,
                    iconCls: 'hdfs-database',
                    itemId: 'createHiveDB',
                    tooltip: MSG.HDFS_TIP_CREATE_HIVE_DB,
                    handler: this.onCreateHiveDB
                }
                /*
                 ,
                 {
                 text: MSG.HDFS_CREATE_HIVE_TABLE,
                 iconCls: 'hdfs-table',
                 itemId: 'createHiveTable',
                 tooltip: MSG.HDFS_TIP_CREATE_HIVE_TABLE,
                 handler: this.onCreateHiveTable
                 }
                 */
            ]
        });

        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        if (!engineCombo.getValue()) {
            e.stopEvent();
            contextMenu.query('#createFolderMenu')[0].disabled = true;
            contextMenu.query('#renameFolderMenu')[0].disabled = true;
            contextMenu.query('#deleteFolderMenu')[0].disabled = true;
            contextMenu.query('#moveFolderMenu')[0].disabled = true;
            contextMenu.query('#uploadFileMenu')[0].disabled = true;
            contextMenu.query('#copyFolderMenu')[0].disabled = true;
            contextMenu.query('#getInfoMenu')[0].disabled = true;
            contextMenu.query('#createHiveDB')[0].disabled = true;
            // contextMenu.query('#createHiveTable')[0].disabled = true;
            contextMenu.showAt(e.xy);
        }

        if (record.data.id == '/' || record.data.id == CONSTANTS.ROOT) {
            e.stopEvent();
            contextMenu.query('#renameFolderMenu')[0].disabled = true;
            contextMenu.query('#deleteFolderMenu')[0].disabled = true;
            contextMenu.query('#moveFolderMenu')[0].disabled = true;
            contextMenu.query('#createHiveDB')[0].disabled = true;
            // contextMenu.query('#createHiveTable')[0].disabled = true;
            contextMenu.showAt(e.xy);
        } else if (record.data.cls == 'folder') {
            e.stopEvent();
            contextMenu.query('#renameFolderMenu')[0].disabled = false;
            contextMenu.query('#deleteFolderMenu')[0].disabled = false;
            contextMenu.query('#moveFolderMenu')[0].disabled = false;
            contextMenu.query('#createHiveDB')[0].disabled = false;
            // contextMenu.query('#createHiveTable')[0].disabled = false;
            contextMenu.showAt(e.xy);
        }
    },

    /**
     * 현재 선택한 디렉토리를 업데이트한다.
     */
    onRefreshMenuClick: function (widget, event) {
        var treepanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var selected = treepanel.getSelectionModel().getLastSelected();
        var node = treepanel.getStore().getNodeById(selected.data.id);
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        if (engineCombo.getValue()) {
            treepanel.getStore().load({
                node: node,
                engineId: engineCombo.getValue()
            });
        }
    },

    onCreateFolderMenuClick: function (widget, event) {
        var treepanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var selected = treepanel.getSelectionModel().getLastSelected();
        var isLeaf = selected.isLeaf();

        if (isLeaf) {
            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_CREATE,
                msg: MSG.HDFS_MSG_DIRECTORY_TARGET,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        Ext.MessageBox.show({
            title: MSG.HDFS_DIRECTORY_CREATE,
            msg: MSG.HDFS_MSG_DIRECTORY_NAME,
            width: 300,
            prompt: true,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.INFO,
            multiline: false,
            value: 'folder',
            fn: function (btn, text) {
                if (btn === 'yes') {
                    if (Flamingo.Util.String.isBlank(text)) {
                        return;
                    }

                    var target = '';
                    if (selected.get('id') != CONSTANTS.ROOT) {
                        target = selected.get('id') + "/" + text;
                    } else {
                        target = CONSTANTS.ROOT_PATH + text;
                    }

                    var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
                    var param = {
                        path: target,
                        engineId: engineCombo.getValue()
                    };

                    Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_NEW_DIRECTORY, param,
                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                hdfsBrowserController.updateDirectoryStore(param.engineId, '/');
                                hdfsBrowserController.updateFileStore(param.engineId, '/');
                                hdfsBrowserController.updateStatus(param.engineId);
                                hdfsBrowserController._info(format(MSG.HDFS_MSG_DIRECTORY_CREATED, param.path));
                            } else {
                                Ext.MessageBox.show({
                                    title: MSG.HDFS_DIRECTORY_CREATE,
                                    msg: obj.error.cause,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        },
                        function (response) {
                            Ext.MessageBox.show({
                                title: MSG.HDFS_DIRECTORY_CREATE,
                                msg: MSG.HDFS_MSG_DIRECTORY_CREATE_FAIL + response.statusText + '(' + response.status + ')',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                        }
                    );
                }
            }
        });
    },

    /**
     * 지정한 디렉토리의 이름을 변경한다.
     */
    onRenameFolderMenuClick: function (widget, event) {
        var treePanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var node = treePanel.getSelectionModel().getLastSelected();
        var isLeaf = node.isLeaf();

        if (isLeaf) {
            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_RENAME,
                msg: MSG.MSG_HDFS_MSG_DIRECTORY_SELECT,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        if (node.get('id') == CONSTANTS.ROOT) {
            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_RENAME,
                msg: MSG.HDFS_MSG_DIRECTORY_RENAME_FAIL,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var parentId = node.parentNode.data.id;

        Ext.MessageBox.show({
            title: MSG.HDFS_DIRECTORY_RENAME,
            msg: MSG.HDFS_MSG_DIRECTORY_RENAME,
            width: 300,
            prompt: true,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            multiline: false,
            value: node.get('text'),
            fn: function (btn, text) {
                if (btn === 'yes') {
                    var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
                    var param = {
                        from: node.get('id'),
                        to: (node.get('parentId') == CONSTANTS.ROOT ? '/' + text : node.get('parentId') + '/' + text),
                        engineId: engineCombo.getValue()
                    };

                    Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_RENAME_DIRECTORY, param,
                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                var controller = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                controller.updateDirectoryStore(param.engineId, '/');
                                controller.updateFileStore(param.engineId, '/');
                                controller.updateStatus(param.engineId);
                                controller._info(format(MSG.HDFS_MSG_DIRECTORY_RENAMED, param.from));
                            } else {
                                Ext.MessageBox.show({
                                    title: MSG.HDFS_DIRECTORY_RENAME,
                                    msg: obj.error.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        },
                        function (response) {
                            Ext.MessageBox.show({
                                title: MSG.HDFS_DIRECTORY_RENAME,
                                msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                        }
                    );
                }
            }
        });
    },

    /**
     * 지정한 디렉토리를 삭제한다.
     */
    onDeleteFolderMenuClick: function (widget, event) {
        var treepanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var node = treepanel.getSelectionModel().getLastSelected();

        if (node.get('id') == CONSTANTS.ROOT) {
            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_DELETE,
                msg: MSG.HDFS_MSG_DIRECTORY_DELETE_ROOT,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        Ext.MessageBox.show({
            title: MSG.HDFS_DIRECTORY_DELETE,
            msg: format(MSG.HDFS_MSG_DIRECTORY_DELETE, node.get('text')),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            fn: function handler(btn) {
                if (btn == 'yes') {

                    var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
                    var param = {
                        path: node.get('id'),
                        engineId: engineCombo.getValue()
                    };

                    Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_DELETE_DIRECTORY, param,
                        function (response) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                hdfsBrowserController.updateDirectoryStore(param.engineId, '/');
                                hdfsBrowserController.updateFileStore(param.engineId, '/');
                                hdfsBrowserController.updateStatus(param.engineId);
                                hdfsBrowserController._info(format(MSG.HDFS_MSG_DIRECTORY_DELETED, param.path));
                            } else {
                                Ext.MessageBox.show({
                                    title: MSG.HDFS_DIRECTORY_DELETE,
                                    msg: obj.error.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        },
                        function (response) {
                            Ext.MessageBox.show({
                                title: MSG.HDFS_DIRECTORY_DELETE,
                                msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                        }
                    );
                }
            }
        });
    },

    /**
     * 트리에서 이동 메뉴를 선택하는 경우 이동할 대상 디렉토리를 선택하는 윈도를 표시한다.
     */
    onMoveFolderMenuClick: function (widget, event) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var node = directoryPanel.getSelectionModel().getLastSelected();
        if (node.get('id') == CONSTANTS.ROOT) {
            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_MOVE,
                msg: MSG.HDFS_MSG_DIRECTORY_MOVE_ROOT,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        // 이동할 경로를 선택하기 위한 윈도를 생성하고 화면에 보여준다.
        var hdfsBrowser = Ext.create("Flamingo.view.fs.hdfs.SimpleHdfsBrowser", {
            engineId: engineCombo.getValue()
        });
        var okButton = hdfsBrowser.query("#okButton")[0];
        var cancelButton = hdfsBrowser.query("#cancelButton")[0];

        var browserTreePanel = hdfsBrowser.query("treepanel")[0];
        var sourceDirPath = node.get('id');
        var name = node.get('text');
        okButton.addListener('click', function (button, event, opt) {
            hdfsBrowser.close();

            // 이동할 대상 디렉토리를 알아낸다.
            var selModel = browserTreePanel.getSelectionModel();
            var selectedNode = selModel.getLastSelected();
            var targetDirPath = selectedNode.get('id');

            if (targetDirPath == null || targetDirPath == '') {
                Ext.MessageBox.show({
                    title: MSG.HDFS_DIRECTORY_MOVE,
                    msg: MSG.HDFS_MSG_DIRECTORY_MOVE_SOURCE,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }

            // Target Directory에 동일한 이름이 있는지 한번더 확인한다.
            if (targetDirPath == sourceDirPath) {
                Ext.MessageBox.show({
                    title: MSG.HDFS_DIRECTORY_MOVE,
                    msg: MSG.HDFS_MSG_DIRECTORY_MOVE_FAIL,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }

            var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];

            targetDirPath = (targetDirPath == CONSTANTS.ROOT || targetDirPath == CONSTANTS.ROOT_PATH) ? '/' + name : targetDirPath + '/' + name
            var param = {
                from: sourceDirPath, // 출발지 경로
                to: targetDirPath, // 목적지 경로,
                engineId: engineCombo.getValue()
            };

            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_MOVE,
                msg: format(MSG.HDFS_MSG_DIRECTORY_MOVE, sourceDirPath, targetDirPath),
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.WARNING,
                fn: function handler(btn) {
                    if (btn == 'yes') {
                        Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_MOVE_DIRECTORY, param,
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                    hdfsBrowserController.updateDirectoryStore(param.engineId, '/');
                                    hdfsBrowserController.updateFileStore(param.engineId, '/');
                                    hdfsBrowserController.updateStatus(param.engineId);
                                    hdfsBrowserController._info(format(MSG.HDFS_MSG_DIRECTORY_MOVED, param.from));
                                } else {
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_DIRECTORY_MOVE,
                                        msg: obj.error.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            },
                            function (response) {
                                Ext.MessageBox.show({
                                    title: MSG.HDFS_DIRECTORY_MOVE,
                                    msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        );
                    }
                }
            });
        });

        /**
         * Cancel 버튼을 눌렀을 경우 HDFS Browser를 닫는다.
         */
        cancelButton.addListener('click', function (button, event, opt) {
            hdfsBrowser.close();
        });

        hdfsBrowser.show();
    },

    /**
     * 트리에서 복사 메뉴를 선택하는 경우 복사할 대상 디렉토리를 선택하는 윈도를 표시한다.
     */
    onCopyFolderMenuClick: function (widget, event) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var node = directoryPanel.getSelectionModel().getLastSelected();
        if (node.get('id') == CONSTANTS.ROOT) {
            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_COPY,
                msg: MSG.HDFS_MSG_DIRECTORY_COPY_ROOT,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        // 복사할 경로를 선택하기 위한 윈도를 생성하고 화면에 보여준다.
        var hdfsBrowser = Ext.create("Flamingo.view.fs.hdfs.SimpleHdfsBrowser", {
            engineId: engineCombo.getValue()
        });
        var okButton = hdfsBrowser.query("#okButton")[0];
        var cancelButton = hdfsBrowser.query("#cancelButton")[0];

        var browserTreePanel = hdfsBrowser.query("treepanel")[0];
        var sourceDirPath = node.get('id');
        okButton.addListener('click', function (button, event, opt) {
            hdfsBrowser.close();

            // 복사할 대상 디렉토리를 알아낸다.
            var selModel = browserTreePanel.getSelectionModel();
            var selectedNode = selModel.getLastSelected();
            var targetDirPath = selectedNode.get('id');

            if (targetDirPath == null || targetDirPath == '') {
                Ext.MessageBox.show({
                    title: MSG.HDFS_DIRECTORY_COPY,
                    msg: MSG.HDFS_MSG_DIRECTORY_COPY_SOURCE,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }

            // Target Directory에 동일한 이름이 있는지 한번더 확인한다.
            if (targetDirPath == sourceDirPath) {
                Ext.MessageBox.show({
                    title: MSG.HDFS_DIRECTORY_COPY,
                    msg: MSG.HDFS_MSG_DIRECTORY_COPY_FAIL,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }

            var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];

            var param = {
                from: sourceDirPath, // 출발지 경로
                to: targetDirPath, // 목적지 경로
                engineId: engineCombo.getValue()
            };

            Ext.MessageBox.show({
                title: MSG.HDFS_DIRECTORY_COPY,
                msg: format(MSG.HDFS_MSG_DIRECTORY_COPY, sourceDirPath, targetDirPath),
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.INFO,
                fn: function handler(btn) {
                    if (btn == 'yes') {
                        Ext.MessageBox.show({
                            title: MSG.HDFS_DIRECTORY_COPY,
                            msg: MSG.HDFS_MSG_PLEASE_WAIT,
                            width: 300,
                            wait: true,
                            waitConfig: {interval: 200},
                            progress: true,
                            closable: true
                        });

                        Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_COPY_DIRECTORY, param,
                            function (response) {
                                Ext.MessageBox.hide();

                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                    hdfsBrowserController.updateDirectoryStore(param.engineId, '/');
                                    hdfsBrowserController.updateFileStore(param.engineId, '/');
                                    hdfsBrowserController.updateStatus(param.engineId);
                                    hdfsBrowserController._info(format(MSG.HDFS_MSG_DIRECTORY_COPIED, param.from));
                                } else {
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_DIRECTORY_COPY,
                                        msg: obj.error.cause,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            },
                            function (response) {
                                Ext.MessageBox.hide();

                                Ext.MessageBox.show({
                                    title: MSG.HDFS_DIRECTORY_COPY,
                                    msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        );
                    }
                }
            });
        });

        /**
         * Cancel 버튼을 눌렀을 경우 HDFS Browser를 닫는다.
         */
        cancelButton.addListener('click', function (button, event, opt) {
            hdfsBrowser.close();
        });

        hdfsBrowser.show();
    },

    /**
     * 트리에서 업로드 메뉴를 선택하는 경우 업로드 윈도를 표시한다.
     */
    onUploadFileMenuClick: function (widget, event) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];

        // 선택한 디렉토리가 없으면 에러 메시지를 표시한다.
        var lastSelected = directoryPanel.getSelectionModel().getLastSelected();
        if (!lastSelected || !engineCombo.getValue()) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_UPLOAD,
                msg: MSG.HDFS_MSG_DIRECTORY_UPLOAD_SOURCE,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var win = Ext.create('Ext.window.Window', {
            title: MSG.HDFS_FILE_UPLOAD,
            layout: 'fit',
            border: false,
            modal: true,
            closeAction: 'destroy',
            items: [
                Ext.create('Flamingo.view.fs.MultiFileUploadPanel', {
                    uploadPath: lastSelected.data.id,
                    engineId: engineCombo.getValue(),
                    maxUploadSize: parseInt(config.fs_browser_upload_max_file_size),
                    uploadUrl: CONSTANTS.FS.HDFS_UPLOAD_FILE
                })
            ],
            listeners: {
                close: function () {
                    var controller = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                    controller.updateFileStore(engineCombo.getValue(), lastSelected.data.id);
                }
            }
        }).center().show();
    },

    /**
     * 트리에서 정보 메뉴를 선택하는 경우 디렉토리의 정보를 화면에 표시한다.
     */
    onCreateHiveDB: function (widget, event) {
        var treepanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var selected = treepanel.getSelectionModel().getLastSelected();
        var isLeaf = selected.isLeaf();

        if (isLeaf) {
            Ext.MessageBox.show({
                title: MSG.HDFS_CREATE_HIVE_DB,
                msg: MSG.HDFS_MSG_DIRECTORY_TARGET,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var panel = Ext.create('Flamingo.view.fs.hdfs.HiveDatabasePanel');
        var popWindow = Ext.create('Ext.Window', {
            title: MSG.HDFS_CREATE_HIVE_DB,
            width: 450,
            height: 170,
            modal: true,
            padding: '5 5 5 5',
            resizable: false,
            constrain: true,
            layout: 'fit',
            items: [
                panel
            ],
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                        var param = {
                            engineId: engineCombo.getValue(),
                            database: panel.down('#databaseName').getValue(),
                            location: selected.get('id'),
                            comment: panel.down('#comment').getValue()
                        };

                        var win = popWindow;
                        Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_NEW_HIVE_DB, param,
                            function (response) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    win.close();
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_CREATE_HIVE_DB,
                                        msg: MSG.HDFS_MSG_CREATE_HIVE_DB_SUCC,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.INFO
                                    });
                                } else {
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_CREATE_HIVE_DB,
                                        msg: obj.error.cause,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            },
                            function (response) {
                                Ext.MessageBox.show({
                                    title: MSG.HDFS_CREATE_HIVE_DB,
                                    msg: format(MSG.HDFS_MSG_CREATE_HIVE_DB_FAIL, response.statusText, response.status),
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        );
                    }
                },
                {
                    text: MSG.COMMON_CANCEL,
                    iconCls: 'common-cancel',
                    handler: function () {
                        popWindow.close();
                    }

                }
            ],
            listeners: {
                afterrender: function () {
                    panel.down('#databaseName').setValue(selected.get('text'));
                    panel.down('#location').setValue(selected.get('id'));
                }
            }
        }).center().show();
    },

    /**
     * 트리에서 정보 메뉴를 선택하는 경우 디렉토리의 정보를 화면에 표시한다.
     */
    onCreateHiveTable: function (widget, event) {

    },

    /**
     * 트리에서 정보 메뉴를 선택하는 경우 디렉토리의 정보를 화면에 표시한다.
     */
    onGetInfoMenuClick: function (widget, event) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var selected = directoryPanel.getSelectionModel().getLastSelected();
        var isLeaf = selected.isLeaf();

        if (isLeaf) {
            Ext.MessageBox.show({
                title: MSG.HDFS_INFO_DIRECTORY_CHECK,
                msg: MSG.HDFS_MSG_DIRECTORY_SELECT,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var param = {
            path: selected.data.id,
            engineId: engineCombo.getValue()
        };

        Flamingo.Ajax.Request.invokeGet(CONSTANTS.FS.HDFS_INFO_DIRECTORY, param,
            function (response) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {

                    var propertyPanel = Ext.create('Flamingo.view.fs.hdfs.PropertyPanel');

                    // Basic
                    propertyPanel.query('#name')[0].setValue(obj.map['name']);
                    propertyPanel.query('#path')[0].setValue(obj.map['path']);
                    propertyPanel.query('#length')[0].setValue(Flamingo.Util.String.toCommaNumber(obj.map['length']));
                    propertyPanel.query('#modification')[0].setValue(obj.map['modification']);
                    propertyPanel.query('#isFile')[0].setValue(obj.map['isFile']);
                    propertyPanel.query('#isDirectory')[0].setValue(obj.map['isDirectory']);

                    // Permission
                    propertyPanel.query('#ownerRead')[0].setValue(obj.map['ownerRead']);
                    propertyPanel.query('#ownerWrite')[0].setValue(obj.map['ownerWrite']);
                    propertyPanel.query('#ownerExecute')[0].setValue(obj.map['ownerExecute']);
                    propertyPanel.query('#groupRead')[0].setValue(obj.map['groupRead']);
                    propertyPanel.query('#groupWrite')[0].setValue(obj.map['groupWrite']);
                    propertyPanel.query('#groupExecute')[0].setValue(obj.map['groupExecute']);
                    propertyPanel.query('#otherRead')[0].setValue(obj.map['otherRead']);
                    propertyPanel.query('#otherWrite')[0].setValue(obj.map['otherWrite']);
                    propertyPanel.query('#otherExecute')[0].setValue(obj.map['otherExecute']);

                    // Space
                    propertyPanel.query('#blockSize')[0].setValue(Flamingo.Util.String.toCommaNumber(obj.map['blockSize']));
                    propertyPanel.query('#replication')[0].setValue(obj.map['replication']);
                    propertyPanel.query('#directoryCount')[0].setValue(obj.map['directoryCount']);
                    propertyPanel.query('#fileCount')[0].setValue(obj.map['fileCount']);
                    propertyPanel.query('#quota')[0].setValue(obj.map['quota']);
                    propertyPanel.query('#spaceConsumed')[0].setValue(obj.map['spaceConsumed']);
                    propertyPanel.query('#spaceQuota')[0].setValue(obj.map['spaceQuota']);

                    var infoWin = Ext.create('Ext.window.Window', {
                        height: 450,
                        width: 600,
                        closable: true,
                        hideCollapseTool: false,
                        title: MSG.HDFS_INFO_DIRECTORY,
                        titleCollapse: false,
                        modal: true,
                        closeAction: 'close',
                        layout: 'fit',
                        items: [
                            propertyPanel
                        ]
                    }).center().show();

                } else {
                    Ext.MessageBox.show({
                        title: MSG.HDFS_INFO_DIRECTORY_CHECK,
                        msg: obj.error.cause,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
            },
            function (response) {
                Ext.MessageBox.show({
                    title: MSG.HDFS_INFO_DIRECTORY_CHECK,
                    msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        );
    },

    /**
     * Tree에서 노드를 접었을 때 Grid 정보를 업데이트한다.
     *
     * @param node 노드 정보
     * @param opts 옵션 정보
     */
    onItemCollapse: function (node, opts) {
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        this.updateFileStore(engineCombo.getValue(), node);
    },

    updateStatus: function (engine) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var hdfsSizeProgressBar = directoryPanel.query('#hdfsSize')[0];
        Flamingo.Ajax.Request.invokeGet(CONSTANTS.FS.HDFS_FS_STATUS, {engineId: engine},
            function (response) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    hdfsSizeProgressBar.updateProgress(obj.map['humanProgress'], obj.map['humanProgressPercent'], true);
                } else {
                    hdfsSizeProgressBar.updateProgress(0, MSG.HDFS_UNKNOWN, true);
                }
            },
            function (response) {
                hdfsSizeProgressBar.updateProgress(0, MSG.HDFS_UNKNOWN, true);
            }
        );
    },

    /**
     * 디렉토리 목록을 보여주는 Directory Panel을 갱신한다.
     */
    updateDirectoryStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        directoryPanel.getStore().load({
            params: {
                engineId: engineId,
                node: path
            }
        });
    },

    /**
     * 파일 목록을 보여주는 File Panel을 갱신한다.
     */
    updateFileStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }

        var fileStore = Ext.ComponentQuery.query('hdfsFilePanel > grid')[0].getStore()
        fileStore.removeAll();
        fileStore.load({
            scope: this,
            params: {
                engineId: engineId,
                path: path
            }
        });
    },

    /**
     * 디렉토리를 펼쳤을 때 서브 디렉토리와 파일 목록을 조회하여 업데이트한다.
     */
    onItemExpand: function (node, opts) {
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineId = engineCombo.getValue();
        var path = node.data.id;

        directoryPanel.getStore().getProxy().extraParams.engineId = engineId;
        this.updateFileStore(engineId, path);
    },

    /**
     * Directory Panel의 Refresh를 눌렀을 경우 Tree와 Grid를 모두 갱신한다.
     */
    onRefreshClick: function () {
        var controller = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var engineId = engineCombo.getValue();
        var lastPathComp = directoryPanel.query('#lastPath')[0];

        lastPathComp.setValue("/");

        controller.updateDirectoryStore(engineId, '/');
        controller.updateFileStore(engineId, '/');
        controller.updateStatus(engineId);
    },

    /**
     * File Panel의 Refresh를 눌렀을 경우 Grid를 갱신한다.
     */
    onRefreshFileClick: function () {
        var controller = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var engineId = engineCombo.getValue();
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        var node = directoryPanel.getSelectionModel().getLastSelected();

        lastPathComp.setValue(node.data.id);

        controller.updateFileStore(engineId, lastPathComp.getValue());
    },

    /**
     * HDFS 사용량 보기 버튼을 눌렀을 경우 사용장 패널을 보여준다.
     */
    onHdfsUsageClick: function () {
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
        var engineId = engineCombo.getValue();

        if (!engineCombo.getValue()) {
            Ext.MessageBox.show({
                title: MSG.COMMON_WARN,
                msg: MSG.HDFS_MSG_CLUSTER_SELECT,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var params = {
            engineId: engineId
        };

        Flamingo.Ajax.Request.invokeGet(CONSTANTS.FS.HDFS_FS_STATUS, params,
            function (response) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {

                    // Create new HDFS Information Panel and set values
                    var hdfsInfoPanel = Ext.create('Flamingo.view.fs.hdfs.HdfsInfo');
                    hdfsInfoPanel.query('#canonicalServiceName')[0].setValue(obj.map['canonicalServiceName']);
                    hdfsInfoPanel.query('#missingBlocksCount')[0].setValue(obj.map['missingBlocksCount']);
                    hdfsInfoPanel.query('#corruptBlocksCount')[0].setValue(obj.map['corruptBlocksCount']);
                    hdfsInfoPanel.query('#replication')[0].setValue(obj.map['defaultReplication']);
                    hdfsInfoPanel.query('#liveNodes')[0].setValue(obj.map['liveNodes']);
                    hdfsInfoPanel.query('#deadNodes')[0].setValue(obj.map['deadNodes']);
                    hdfsInfoPanel.query('#humanDefaultBlockSize')[0].setValue(obj.map['humanDefaultBlockSize']);
                    hdfsInfoPanel.query('#humanCapacity')[0].setValue(obj.map['humanCapacity']);
                    hdfsInfoPanel.query('#humanUsed')[0].setValue(obj.map['humanUsed']);
                    hdfsInfoPanel.query('#humanRemaining')[0].setValue(obj.map['humanRemaining']);
                    hdfsInfoPanel.query('#humanProgressPercent')[0].setValue(obj.map['humanProgressPercent']);

                    var usageWin = Ext.create('Ext.window.Window', {
                        height: 420,
                        width: 300,
                        closable: true,
                        hideCollapseTool: false,
                        title: MSG.HDFS_INFO_HDFS,
                        titleCollapse: false,
                        modal: false,
                        closeAction: 'close',
                        layout: 'fit',
                        items: [
                            hdfsInfoPanel
                        ]
                    });

                    /* FIXME 동작안함.
                     var bbar = Ext.ComponentQuery.query("hdfsDirectoryPanel > toolbar[dock='bottom']")[0];
                     usageWin.setPosition(30, bbar.y - usageWin.height, true);
                     */
                    usageWin.center().show();
                }
            },
            function (response) {
            }
        );
    },

    /////////////////
    // File Grid
    /////////////////

    /**
     * 파일 목록에서 선택한 모든 파일 목록을 반환한다.
     */
    getSelectedItemIds: function () {
        var fileStore = Ext.ComponentQuery.query('hdfsFilePanel > grid')[0];
        var sm = fileStore.getSelectionModel().getSelection();
        var list = [];
        for (var i = 0; i <= sm.length - 1; i++) {
            var file = new Object();
            file.path = sm[i].get('id');
            file.name = sm[i].get('name');
            file.text = sm[i].get('text');
            list.push(file);
        }
        return list;
    },

    /**
     * 파일을 다른 디렉토리로 복사한다.
     */
    onCopyFileClick: function () {
        var selectedFiles = this.getSelectedItemIds();

        if (selectedFiles.length == 0) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_COPY,
                msg: MSG.HDFS_MSG_FILE_COPY_SOURCE,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        } else {
            var fromItems = new Array();
            for (var i = 0; i < selectedFiles.length; i++) {
                fromItems[i] = selectedFiles[i].path;
            }

            var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];

            // 복사할 경로를 선택하기 위한 윈도를 생성하고 화면에 보여준다.
            var hdfsBrowser = Ext.create("Flamingo.view.fs.hdfs.SimpleHdfsBrowser", {
                engineId: engineCombo.getValue()
            });
            var okButton = hdfsBrowser.query("#okButton")[0];
            var cancelButton = hdfsBrowser.query("#cancelButton")[0];
            var browserTreePanel = hdfsBrowser.query("treepanel")[0];

            okButton.addListener('click', function (button, event, opt) {
                hdfsBrowser.close();

                // 복사할 대상 디렉토리를 알아낸다.
                var selModel = browserTreePanel.getSelectionModel();
                var selectedNode = selModel.getLastSelected();
                var targetDirPath = selectedNode.get('id');

                if (targetDirPath == null || targetDirPath == '') {
                    Ext.MessageBox.show({
                        title: MSG.HDFS_FILE_COPY,
                        msg: MSG.HDFS_MSG_FILE_COPY_SOURCE,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return false;
                }

                var param = {
                    paths: fromItems.join(), // 복사할 파일의 원본 파일의 경로
                    to: targetDirPath, // 목적지 경로
                    engineId: engineCombo.getValue()
                };

                Ext.MessageBox.show({
                    title: MSG.HDFS_FILE_COPY,
                    msg: format(MSG.HDFS_MSG_FILE_COPY, fromItems.join(), targetDirPath),
                    buttons: Ext.MessageBox.YESNO,
                    icon: Ext.MessageBox.INFO,
                    fn: function handler(btn) {
                        if (btn == 'yes') {
                            Ext.MessageBox.show({
                                title: MSG.HDFS_FILE_COPYING,
                                msg: MSG.HDFS_MSG_FILE_COPYING,
                                width: 300,
                                wait: true,
                                waitConfig: {interval: 200},
                                progress: true,
                                closable: true
                            });

                            Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_COPY_FILE, param,
                                function (response) {
                                    Ext.MessageBox.hide();

                                    var obj = Ext.decode(response.responseText);
                                    if (obj.success) {
                                        var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                        hdfsBrowserController.updateFileStore(param.engineId, obj.map.path);
                                        hdfsBrowserController.updateStatus(param.engineId);
                                        hdfsBrowserController._info(format(MSG.HDFS_MSG_FILE_COPIED, param.paths));
                                    } else {
                                        Ext.MessageBox.show({
                                            title: MSG.HDFS_FILE_COPY,
                                            msg: obj.error.cause,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.WARNING
                                        });
                                    }
                                },
                                function (response) {
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_FILE_COPY,
                                        msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            );
                        }
                    }
                });
            });

            /**
             * Cancel 버튼을 눌렀을 경우 HDFS Browser를 닫는다.
             */
            cancelButton.addListener('click', function (button, event, opt) {
                hdfsBrowser.close();
            });

            hdfsBrowser.show();
        }
    },

    /**
     * 파일을 다른 디렉토리로 이동한다.
     */
    onMoveFileClick: function () {
        var selectedFiles = this.getSelectedItemIds();

        if (selectedFiles.length == 0) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_MOVE,
                msg: MSG.HDFS_MSG_FILE_MOVE_SOURCE,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        } else {
            var fromItems = new Array();
            for (var i = 0; i < selectedFiles.length; i++) {
                fromItems[i] = selectedFiles[i].path;
            }

            var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];

            // 복사할 경로를 선택하기 위한 윈도를 생성하고 화면에 보여준다.
            var hdfsBrowser = Ext.create("Flamingo.view.fs.hdfs.SimpleHdfsBrowser", {
                engineId: engineCombo.getValue()
            });
            var okButton = hdfsBrowser.query("#okButton")[0];
            var cancelButton = hdfsBrowser.query("#cancelButton")[0];
            var browserTreePanel = hdfsBrowser.query("treepanel")[0];

            okButton.addListener('click', function (button, event, opt) {
                hdfsBrowser.close();

                // 복사할 대상 디렉토리를 알아낸다.
                var selModel = browserTreePanel.getSelectionModel();
                var selectedNode = selModel.getLastSelected();
                var targetDirPath = selectedNode.get('id');

                if (targetDirPath == null || targetDirPath == '') {
                    Ext.MessageBox.show({
                        title: MSG.HDFS_FILE_MOVE,
                        msg: MSG.HDFS_MSG_FILE_MOVE_SOURCE,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return false;
                }

                var param = {
                    paths: fromItems.join(), // 복사할 파일의 원본 파일의 경로
                    to: targetDirPath, // 목적지 경로
                    engineId: engineCombo.getValue()
                };

                Ext.MessageBox.show({
                    title: MSG.HDFS_FILE_MOVE,
                    msg: format(MSG.HDFS_MSG_FILE_MOVE, fromItems.join(), targetDirPath),
                    buttons: Ext.MessageBox.YESNO,
                    icon: Ext.MessageBox.WARNING,
                    fn: function handler(btn) {
                        if (btn == 'yes') {
                            Ext.MessageBox.show({
                                title: MSG.HDFS_MSG_FILE_MOVING,
                                msg: MSG.HDFS_MSG_PLEASE_WAIT,
                                width: 300,
                                wait: true,
                                waitConfig: {interval: 200},
                                progress: true,
                                closable: true
                            });

                            Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_MOVE_FILE, param,
                                function (response) {
                                    Ext.MessageBox.hide();

                                    var obj = Ext.decode(response.responseText);
                                    if (obj.success) {
                                        var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                        hdfsBrowserController.updateFileStore(param.engineId, obj.map.path);
                                        hdfsBrowserController.updateStatus(param.engineId);
                                        hdfsBrowserController._info(format(MSG.HDFS_MSG_FILE_MOVED, param.to));
                                    } else {
                                        Ext.MessageBox.show({
                                            title: MSG.HDFS_FILE_MOVE,
                                            msg: obj.error.cause,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.WARNING
                                        });
                                    }
                                },
                                function (response) {
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_FILE_MOVE,
                                        msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            );
                        }
                    }
                });
            });

            /**
             * Cancel 버튼을 눌렀을 경우 HDFS Browser를 닫는다.
             */
            cancelButton.addListener('click', function (button, event, opt) {
                hdfsBrowser.close();
            });

            hdfsBrowser.show();
        }
    },

    /**
     * 파일명을 변경한다.
     */
    onRenameFileClick: function () {
        var selectedFiles = this.getSelectedItemIds();

        if (selectedFiles.length != 1) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_RENAME,
                msg: MSG.HDFS_MSG_FILE_RENAME,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var lastPath = directoryPanel.query('#lastPath')[0].getValue();
        var fileStore = query('hdfsFilePanel > grid');
        var sm = fileStore.getSelectionModel().getSelection();
        var filename = sm[0].data.filename;

        Ext.MessageBox.show({
            title: MSG.HDFS_FILE_RENAME,
            msg: MSG.HDFS_MSG_FILE_RENAME_TARGET,
            width: 300,
            prompt: true,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.WARNING,
            multiline: false,
            value: filename,
            fn: function (btn, text) {
                if (trim(text) == filename) {
                    return;
                }

                if (btn === 'yes') {
                    var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];
                    var engineId = engineCombo.getValue();
                    var nodeToRename = {
                        path: lastPath,
                        filename: text,
                        engineId: engineId
                    };

                    Ext.Ajax.request({
                        url: CONSTANTS.FS.HDFS_RENAME_FILE,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8;'
                        },
                        method: 'POST',
                        params: Ext.encode(nodeToRename),
                        success: function (response) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                hdfsBrowserController.updateFileStore(engineId, obj.map.path);
                                hdfsBrowserController._info(format(MSG.HDFS_MSG_FILE_RENAMED, filename, nodeToRename.filename));
                            } else {
                                Ext.MessageBox.show({
                                    title: MSG.HDFS_FILE_RENAME,
                                    msg: obj.error.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.MessageBox.show({
                                title: MSG.HDFS_FILE_RENAME,
                                msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                        }
                    });
                }
            }
        });
    },

    /**
     * 파일 클릭시 최근 경로에 선택한 경로를 선택한다.
     */
    onItemFileClick: function (view, record, item, index, e, opts) {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        lastPathComp.setValue(record.data.id);
    },

    /**
     * 파일 목록 화면에서 다운로드 버튼을 클릭했을 경우 파일을 다운로드한다.
     */
    onDownloadFileClick: function () {
        var selectedFiles = this.getSelectedItemIds();
        
        console.info(selectedFiles);

        if (selectedFiles.length != 1) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_DOWNLOAD,
                msg: MSG.HDFS_MSG_FILE_DOWNLOAD_LIMIT,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var fileStore = Ext.ComponentQuery.query('hdfsFilePanel > grid')[0];
        var sm = fileStore.getSelectionModel().getSelection();
        
        if (sm[0].data.length > config.fs_browser_download_max_file_size) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_DOWNLOAD,
                msg: format(MSG.HDFS_MSG_FILE_DOWNLOAD_MAX_SIZE, config.fs_browser_download_max_file_size),
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        Ext.core.DomHelper.append(document.body, {
            tag: 'iframe',
            id: 'testIframe' + new Date().getTime(),
            css: 'display:none;visibility:hidden;height:0px;',
            src: CONSTANTS.FS.HDFS_DOWNLOAD_FILE + "?&path=" + selectedFiles[0].path + "&engineId=" + this.getCluster(),
            frameBorder: 0,
            width: 0,
            height: 0
        });
    },

    /**
     * 가장 마지막에 선택한 Hadoop Cluster를 반환한다.
     */
    getCluster: function () {
        var lastCluster = query('hdfsDirectoryPanel #lastCluster');
        return lastCluster.getValue();
    },

    /**
     * 파일 목록 화면에서 업로드 버튼을 클릭했을 경우 업로드 화면을 표시하고 업로드를 한다.
     */
    onUploadFileClick: function () {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var engineCombo = Ext.ComponentQuery.query('hdfsDirectoryPanel _workflowEngineCombo')[0];

        // 선택한 디렉토리가 없으면 에러 메시지를 표시한다.
        var lastSelected = directoryPanel.getSelectionModel().getLastSelected();
        if (!lastSelected || !engineCombo.getValue()) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_UPLOAD,
                msg: MSG.HDFS_MSG_DIRECTORY_UPLOAD_SOURCE,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }

        var win = Ext.create('Ext.window.Window', {
            title: MSG.HDFS_FILE_UPLOAD,
            layout: 'fit',
            border: false,
            modal: true,
            closeAction: 'destroy',
            items: [
                Ext.create('Flamingo.view.fs.MultiFileUploadPanel', {
                    uploadPath: lastSelected.data.id,
                    engineId: engineCombo.getValue(),
                    maxUploadSize: parseInt(config.fs_browser_upload_max_file_size),
                    uploadUrl: CONSTANTS.FS.HDFS_UPLOAD_FILE
                })
            ],
            listeners: {
                close: function () {
                    var controller = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                    controller.updateFileStore(engineCombo.getValue(), lastSelected.data.id);
                }
            }
        }).center().show();
    },

    /**
     * 선택한 파일을 삭제한다.
     */
    onDeleteFileClick: function () {
        var selectedFiles = this.getSelectedItemIds();

        if (selectedFiles.length == 0) {
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_DELETE,
                msg: MSG.HDFS_MSG_FILE_DELETE,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        } else {
            var fromItems = new Array();
            for (var i = 0; i < selectedFiles.length; i++) {
                fromItems[i] = selectedFiles[i].path;
            }

            var engineId = this.getCluster();
            Ext.MessageBox.show({
                title: MSG.HDFS_FILE_DELETE,
                msg: format(MSG.HDFS_MSG_FILE_DELETE_NUMBER, selectedFiles.length),
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.WARNING,
                fn: function handler(btn) {
                    if (btn == 'yes') {
                        Flamingo.Ajax.Request.invokePostByMap(CONSTANTS.FS.HDFS_DELETE_FILE + "?engineId=" + engineId, fromItems,
                            function (response) {
                                var obj = Ext.decode(response.responseText);

                                if (obj.success) {
                                    var hdfsBrowserController = Flamingo.app.controllers.get('Flamingo.controller.fs.hdfs.BrowserController');
                                    hdfsBrowserController.updateFileStore(engineId, obj.map.path);
                                    hdfsBrowserController._info(MSG.HDFS_MSG_FILE_DELETED);
                                } else {
                                    Ext.MessageBox.show({
                                        title: MSG.HDFS_FILE_DELETE,
                                        msg: obj.error.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            },
                            function (response) {
                                Ext.MessageBox.show({
                                    title: MSG.HDFS_FILE_DELETE,
                                    msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                        );
                    }
                }
            });
        }
    },

    /**
     * 파일을 더블클릭하면 파일의 상세 정보를 표시한다.
     */
    onGetFileInfoClick: function (view, record, item, index, e, opts) {
        var param = {
            path: record.data.id,
            engineId: this.getCluster()
        };

        Flamingo.Ajax.Request.invokeGet(CONSTANTS.FS.HDFS_GET_INFO, param,
            function (response) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {

                    var propertyPanel = Ext.create('Flamingo.view.fs.hdfs.PropertyPanel');

                    // Basic
                    propertyPanel.query('#name')[0].setValue(obj.map['name']);
                    propertyPanel.query('#path')[0].setValue(obj.map['path']);
                    propertyPanel.query('#length')[0].setValue(Flamingo.Util.String.toCommaNumber(obj.map['length']));
                    propertyPanel.query('#modification')[0].setValue(obj.map['modification']);
                    propertyPanel.query('#isFile')[0].setValue(obj.map['isFile']);
                    propertyPanel.query('#isDirectory')[0].setValue(obj.map['isDirectory']);

                    // Permission
                    propertyPanel.query('#ownerRead')[0].setValue(obj.map['ownerRead']);
                    propertyPanel.query('#ownerWrite')[0].setValue(obj.map['ownerWrite']);
                    propertyPanel.query('#ownerExecute')[0].setValue(obj.map['ownerExecute']);
                    propertyPanel.query('#groupRead')[0].setValue(obj.map['groupRead']);
                    propertyPanel.query('#groupWrite')[0].setValue(obj.map['groupWrite']);
                    propertyPanel.query('#groupExecute')[0].setValue(obj.map['groupExecute']);
                    propertyPanel.query('#otherRead')[0].setValue(obj.map['otherRead']);
                    propertyPanel.query('#otherWrite')[0].setValue(obj.map['otherWrite']);
                    propertyPanel.query('#otherExecute')[0].setValue(obj.map['otherExecute']);

                    // Space
                    propertyPanel.query('#blockSize')[0].setValue(Flamingo.Util.String.toCommaNumber(obj.map['blockSize']));
                    propertyPanel.query('#replication')[0].setValue(obj.map['replication']);
                    propertyPanel.query('#directoryCount')[0].setValue(obj.map['directoryCount']);
                    propertyPanel.query('#fileCount')[0].setValue(obj.map['fileCount']);
                    propertyPanel.query('#quota')[0].setValue(obj.map['quota']);
                    propertyPanel.query('#spaceConsumed')[0].setValue(obj.map['spaceConsumed']);
                    propertyPanel.query('#spaceQuota')[0].setValue(obj.map['spaceQuota']);

                    var infoWin = Ext.create('Ext.window.Window', {
                        height: 450,
                        width: 600,
                        closable: true,
                        hideCollapseTool: false,
                        title: MSG.HDFS_INFO_FILE,
                        titleCollapse: false,
                        modal: true,
                        closeAction: 'close',
                        layout: 'fit',
                        items: [
                            propertyPanel
                        ]
                    }).center().show();

                } else {
                    Ext.MessageBox.show({
                        title: MSG.INFO_FILE,
                        msg: obj.error.cause,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
            },
            function (response) {
                Ext.MessageBox.show({
                    title: MSG.HDFS_INFO_FILE,
                    msg: MSG.HDFS_MSG_UNABLE_TO_PROCESS + response.statusText + '(' + response.status + ')',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        );
    },

    /**
     * 현재 선택한 노드를 반혼한다.
     *
     * @return 현재 선택한 노드
     */
    getSelectedNode: function () {
        var directoryPanel = Ext.ComponentQuery.query('hdfsDirectoryPanel')[0];
        var selModel = directoryPanel.getSelectionModel();
        return selModel.getLastSelected();
    },

    /**
     * 현재 선택한 노드가 Leaf인지 확인한다.
     *
     * @return Leaf 여부
     */
    isLeaf: function () {
        return this.getSelectedNode().isLeaf();
    },

    /**
     * 선택한 노드에 자식 노드를 포함하고 있는지 확인한다.
     *
     * @return 자식 노드를 포함하고 있으면 true
     */
    hasChildNodes: function () {
        return this.getSelectedNode().hasChildNodes();
    },

    /**
     * 에러메시지를 팝업한다.
     *
     * @param {String} message
     * @private
     */
    _error: function (message) {
        var statusBar = Ext.ComponentQuery.query('_statusBar')[0];
        if (statusBar) {
            Ext.defer(function () {
                statusBar.setStatus({
                    text: message,
                    iconCls: 'x-status-error',
                    clear: true
                });
            }, 1500);
        }

        return false;
    },

    /**
     * 정보메시지를 팝업한다.
     *
     * @param {String} message
     * @private
     */
    _info: function (message) {
        var statusBar = Ext.ComponentQuery.query('_statusBar')[0];
        if (statusBar) {
            Ext.defer(function () {
                statusBar.setStatus({
                    text: message,
                    iconCls: 'x-status-valid',
                    clear: true
                });
            }, 1500);
        }
    }
});