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
Ext.define('Flamingo.controller.dashboard.ActionHistoryController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.actionHistoryController',

    stores: [
        'dashboard.ActionHistory'
    ],

    init: function () {
        this.control({
            'actionHistory #refreshButton': {
                click: this.onRefreshClick
            }
        });
    },

    onRefreshClick: function () {
        var engineId = Ext.ComponentQuery.query('actionHistory #engineIdAction')[0].getValue();

        if (engineId) {
            var actionHistoryPanel = Ext.ComponentQuery.query('actionHistory')[0].down('gridpanel');
            actionHistoryPanel.getStore().load({
                params: {
                    status: 'RUNNING',
                    engineId: engineId,
                    jobId: '',
                    start: 0,
                    page: 1,
                    limit: CONSTANTS.GRID_SIZE_PER_PAGE
                }
            });

            actionHistoryPanel.getStore().currentPage = 1;
        } else {
            Ext.MessageBox.show({
                title: MSG.COMMON_REFRESH,
                msg: MSG.ADMIN_SELECT_WORKFLOW_ENG,
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING,
                scope: this,
                fn: function (btn, text, eOpts) {
                    return false;
                }
            });
        }
    }
});