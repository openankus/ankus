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
Ext.define('Flamingo.controller.fs.hdfs.AuditController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.hdfsAuditController',


    stores: [
        'fs.audit.AuditHistory'
    ],

    init: function () {
        this.control({
            'auditHistory #first': {
                click: this.onPagingClick
            },
            'auditHistory #prev': {
                click: this.onPagingClick
            },
            'auditHistory #next': {
                click: this.onPagingClick
            },
            'auditHistory #last': {
                click: this.onPagingClick
            },
            'auditHistory #findButton': {
                click: this.onFindClick
            },
            'auditHistory #clearButton': {
                click: this.onClearClick
            }
        });
    },

    onPagingClick: function () {
        var panel = query('auditHistory');
        var engineId = panel.query('#engineId')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var type = panel.query('#type')[0];
        var path = panel.query('#path')[0];

        var auditHistoryPanel = query('auditHistory gridpanel');
        auditHistoryPanel.getStore().getProxy().extraParams.engineId = engineId;
        auditHistoryPanel.getStore().getProxy().extraParams.startDate = Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d');
        auditHistoryPanel.getStore().getProxy().extraParams.endDate = Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d');
        auditHistoryPanel.getStore().getProxy().extraParams.type = type.getValue();
        auditHistoryPanel.getStore().getProxy().extraParams.path = path.getValue();
    },

    onClearClick: function () {
        var panel = query('auditHistory');
        panel.query('#startDate')[0].setValue('');
        panel.query('#startDate')[0].setMaxValue();
        panel.query('#startDate')[0].setMinValue();

        panel.query('#endDate')[0].setValue('');
        panel.query('#endDate')[0].setMinValue();
        panel.query('#endDate')[0].setMaxValue();

        panel.query('#type')[0].setValue('ALL');
        panel.query('#path')[0].setValue('');
    },

    onFindClick: function () {
        var panel = query('auditHistory');
        var engineId = panel.query('#engineId')[0];
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var type = panel.query('#type')[0];
        var path = panel.query('#path')[0];

        if (engineId.getValue()) {
            if ((startDate.getValue() != null && endDate.getValue() == null)
                || endDate.getValue() != null && startDate.getValue() == null) {
                Ext.Msg.alert({
                    title: MSG.AUDIT_TITLE_AUDIT_FIND,
                    msg: MSG.AUDIT_MSG_START_END_1,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (e) {
                        return false;
                    }
                });
                return false;
            }

            if (startDate.getValue() != null || endDate.getValue() != null) {
                if (startDate.getValue().length <= 1) {
                    Ext.Msg.alert({
                        title: MSG.AUDIT_TITLE_AUDIT_FIND,
                        msg: MSG.AUDIT_MSG_START_END_2,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        fn: function (e) {
                            return false;
                        }
                    });
                    return false;
                }
                else if (endDate.getValue().length <= 1) {
                    Ext.Msg.alert({
                        title: MSG.AUDIT_TITLE_AUDIT_FIND,
                        msg: MSG.AUDIT_MSG_START_END_2,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        fn: function (e) {
                            return false;
                        }
                    });
                    return false;
                }
            }

            var auditHistoryPanel = query('auditHistory gridpanel');
            auditHistoryPanel.getStore().load({
                params: {
                    startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d'),
                    endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d'),
                    type: type.getValue(),
                    path: path.getValue(),
                    engineId: engineId.getValue(),
                    start: 0,
                    page: 1,
                    limit: CONSTANTS.GRID_SIZE_PER_PAGE
                }
            });

            auditHistoryPanel.getStore().currentPage = 1;
        } else {
            Ext.MessageBox.show({
                title: MSG.AUDIT_TITLE_AUDIT_FIND,
                msg: MSG.AUDIT_MSG_H_CLUSTER,
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