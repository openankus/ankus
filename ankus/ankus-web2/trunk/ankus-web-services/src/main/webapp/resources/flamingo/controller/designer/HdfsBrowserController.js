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

Ext.define('Flamingo.controller.designer.HdfsBrowserController', {
    extend: 'Ext.app.Controller',

    init: function () {
        log('Initializing HDFS Browser Controller for Designer');
        this.control({
            'hdfsDirectoryPanelForDesigner': {
                itemclick: this.onDirectoryClick
            },
            'hdfsDirectoryPanelForDesigner #refreshButton': {
                click: this.onRefreshClick
            },
            'hdfsFilePanelForDesigner > grid': {
                itemclick: this.onFileClick
            },
            'hdfsFilePanelForDesigner #refreshButton': {
                click: this.onRefreshFileClick
            }
        });
        log('Initialized HDFS Browser Controller for Designer');

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched HDFS Browser Controller for Designer');

        var directoryPanel = query('hdfsDirectoryPanelForDesigner');
        directoryPanel.getRootNode().expand();
    },

    /**
     * 파일 클릭시 최근 경로에 선택한 경로를 선택한다.
     */
    onFileClick: function (view, record, item, index, e, opts) {
        var directoryPanel = query('hdfsDirectoryPanelForDesigner');
        var lastPathComp = directoryPanel.query('#lastPath')[0];
        lastPathComp.setValue(record.data.id);
    },

    /**
     * 디렉토리를 선택했을 때 파일 목록 정보를 업데이트한다.
     */
    onDirectoryClick: function (view, record, item, index, event, opts) {
        var directoryPanel = query('hdfsDirectoryPanelForDesigner');
        var filePanel = query('hdfsFilePanelForDesigner > grid');
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
    },

    getWorkflowEngine: function () {
    	return query('hdfsDirectoryPanelForDesigner').engineId;
//        var canvas = query('canvas');
//        var form = canvas.getForm();
//        return form.getValues()['engine_id'];
    },

    /**
     * Tree의 Refresh를 눌렀을 경우 Tree와 Grid를 모두 갱신한다.
     */
    onRefreshClick: function () {
        this.updateDirectoryStore(this.getWorkflowEngine(), '/');
        this.updateFileStore(this.getWorkflowEngine(), '/');
    },

    /**
     * Tree의 Refresh를 눌렀을 경우 Tree와 Grid를 모두 갱신한다.
     */
    onRefreshFileClick: function () {
        this.updateFileStore(this.getWorkflowEngine(), '/');
    },

    /**
     * 디렉토리 목록을 보여주는 디렉토리 목록을 갱신한다.
     */
    updateDirectoryStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }
        var directoryPanel = query('hdfsDirectoryPanelForDesigner');
        directoryPanel.getStore().load({
            params: {
                engineId: engineId,
                node: path
            }
        });
    },

    /**
     * 디렉토리 목록을 보여주는 디렉토리 목록을 갱신한다.
     */
    updateFileStore: function (engineId, path) {
        if (path == CONSTANTS.ROOT) {
            path = '/';
        }
        var fileStore = query('hdfsFilePanelForDesigner > grid').getStore()
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