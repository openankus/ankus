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

Ext.define('Flamingo.controller.admin.UserManagementController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.userManagementController',

    stores: [
        'admin.UserManagementStore'
    ],

    init: function () {
        log('Initializing User Management Controller');
        this.control({
            'userManagement #findUserManagementButton': {
                click: this.onSearchClick
            },
            'userManagement #clearUserManagementButton': {
                click: this.onClearClick
            }
        });

        this.onLaunch();
    },

    onLaunch: function () {
        log('Launched User Management Controller');
    },

    onSearchClick: function () {

        var panel = query('userManagement');
        var username = panel.query('#username')[0].getValue();
        var email = panel.query('#email')[0].getValue();
        var enabled = panel.query('#enabled')[0].getValue();
        var authority = panel.query('#authority')[0].getValue();
        var createDate = panel.query('#createDate')[0];

        var userManagementPanel = query('userManagement gridpanel');
        userManagementPanel.getStore().load({
            params: {
                createDate: Flamingo.Util.Date.formatExtJS(createDate.getValue(), 'Y-m-d'),
                username: username,
                email: email,
                enabled: enabled,
                authority: authority,
                jobType: 'USERMANAGEMENT',
                start: 0,
                page: 1,
                limit: CONSTANTS.GRID_SIZE_PER_PAGE
            }
        });
        userManagementPanel.getStore().currentPage = 1;
    },
    onClearClick: function () {
        var panel = query('userManagement');

        panel.query('#username')[0].setValue('');
        panel.query('#email')[0].setValue('');
        panel.query('#enabled')[0].setValue('ALL');
        panel.query('#authority')[0].setValue('ALL');
        panel.query('#createDate')[0].setValue('');
    }
});