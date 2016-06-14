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

Ext.define('Flamingo.controller.fs.hdfs.Viewer', {
    extend: 'Ext.app.Controller',
    alias: 'controller.viewer',

    init: function () {
        this.control({
            "#viewerRefreshButton": {
                click: this.onViewerRefreshButtonClick
            },
            "#downloadButton": {
                click: this.onDownloadClick
            },
            "#bottomButton": {
                click: this.onBottomClick
            },
            "#nextButton": {
                click: this.onNextClick
            },
            "#previousButton": {
                click: this.onPreviousClick
            },
            "#topButton": {
                click: this.onTopClick
            }
        });
    },

    /**
     * Viewer의 Refresh 버튼을 눌렀을 경우 현재 열려있는 내용을 갱신한다.
     *
     * @param button
     * @param e
     * @param options
     */
    onViewerRefreshButtonClick: function (button, e, options) {

    },

    onDownloadClick: function (button, e, options) {

    },

    onBottomClick: function (button, e, options) {

    },

    onNextClick: function (button, e, options) {

    },

    onPreviousClick: function (button, e, options) {

    },

    onTopClick: function (button, e, options) {

    }
});
