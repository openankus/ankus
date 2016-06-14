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
Ext.define('Flamingo.controller.dashboard.WorkflowHistoryController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.workflowHistoryController',

    stores: [
        'dashboard.WorkflowHistory'
    ],

    init: function () {
        this.control({
            'workflowHistory #first': {
                click: this.onPagingClick
            },
            'workflowHistory #prev': {
                click: this.onPagingClick
            },
            'workflowHistory #next': {
                click: this.onPagingClick
            },
            'workflowHistory #last': {
                click: this.onPagingClick
            },
            'workflowHistory #findWorkflowButton': {
                click: this.onFindClick
            },
            'workflowHistory #clearWorkflowButton': {
                click: this.onClearClick
            },
            'workflowHistory > grid': {
                itemdblclick: this.onItemDoubleClick
            }
        });
    },

    onPagingClick: function () {
        var panel = query('workflowHistory');
        var engineId = panel.query('#engineId')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var status = panel.query('#status')[0];
        var workflowName = panel.query('#workflowName')[0];
        var jobType = panel.query('#jobType')[0];
        
        var workflowHistoryPanel = query('workflowHistory gridpanel');
        workflowHistoryPanel.getStore().getProxy().extraParams.engineId = engineId;
        workflowHistoryPanel.getStore().getProxy().extraParams.startDate = Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d');
        workflowHistoryPanel.getStore().getProxy().extraParams.endDate = Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d');
        workflowHistoryPanel.getStore().getProxy().extraParams.status = status.getValue();
        workflowHistoryPanel.getStore().getProxy().extraParams.workflowName = workflowName.getValue();
//        workflowHistoryPanel.getStore().getProxy().extraParams.jobType = 'WORKFLOW';
        workflowHistoryPanel.getStore().getProxy().extraParams.jobType = jobType.getValue();
    },

    onClearClick: function () {
        var panel = query('workflowHistory');
        panel.query('#startDate')[0].setValue('');
        panel.query('#startDate')[0].setMaxValue();
        panel.query('#startDate')[0].setMinValue();

        panel.query('#endDate')[0].setValue('');
        panel.query('#endDate')[0].setMinValue();
        panel.query('#endDate')[0].setMaxValue();

        panel.query('#status')[0].setValue('ALL');
        panel.query('#workflowName')[0].setValue('');
        panel.query('#jobType')[0].setValue('ALL');
        
    },

    onFindClick: function () {
        var panel = query('workflowHistory');
        
        var engineId = panel.query('#engineId')[0].getValue();
        var startDate = panel.query('#startDate')[0];
        var endDate = panel.query('#endDate')[0];
        var status = panel.query('#status')[0];
        var workflowName = panel.query('#workflowName')[0];
        var jobType = panel.query('#jobType')[0];

        if (engineId) {
            if ((startDate.getValue() != null && endDate.getValue() == null)
                || endDate.getValue() != null && startDate.getValue() == null) {
                Ext.Msg.alert({
                    title: MSG.ADMIN_TITLE_HISTORY_LOG,
                    msg: MSG.DASHBOARD_MSG_ENTER_DATES,
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
                        title: MSG.ADMIN_TITLE_HISTORY_LOG,
                        msg: MSG.DASHBOARD_MSG_ENTER_EXACT,
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
                        title: MSG.ADMIN_TITLE_HISTORY_LOG,
                        msg: MSG.DASHBOARD_MSG_ENTER_EXACT,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        fn: function (e) {
                            return false;
                        }
                    });
                    return false;
                }
            }

            var workflowHistoryPanel = query('workflowHistory gridpanel');
            workflowHistoryPanel.getStore().load({
                params: {
                    startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d'),
                    endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d'),
                    status: status.getValue(),
                    workflowName: workflowName.getValue(),
                    engineId: engineId,
//                    jobType: 'WORKFLOW',
                    jobType: jobType.getValue(),
                    start: 0,
                    page: 1,
                    limit: CONSTANTS.GRID_SIZE_PER_PAGE
                }
            });

            workflowHistoryPanel.getStore().currentPage = 1;
        } else {
            Ext.MessageBox.show({
                title: MSG.DASHBOARD_TITLE_HISTORY_LOG,
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
    },

    /**
     * 그리드의 아이템을 더블클릭시 처리하는 이벤트 핸들러.
     */
    onItemDoubleClick: function (view, record, item, index, e, opts) {
        var panel = query('workflowHistory');
        var engineId = panel.query('#engineId')[0].getValue();
        var job = Ext.clone(record.data);

        job.startDate = Flamingo.Util.Date.format(new Date(job.startDate), 'yyyy-MM-dd HH:mm:ss');
        job.endDate = Flamingo.Util.Date.format(new Date(job.endDate), 'yyyy-MM-dd HH:mm:ss');
        job.elapsed = Flamingo.Util.Date.toHumanReadableTime(job.elapsed);
        job.progress = Math.floor(100 * (job.currentStep / job.totalStep)) + '%';
        job.engineId = engineId;

        var popWindow = Ext.create('Ext.Window', {
            title: record.data.workflowName + " - " + record.data.workflowId,
            width: 800,
            height: 650,
            modal: true,
            resizable: true,
            constrain: true,
            padding: '5 5 5 5',
            layout: 'fit',
            items: [
                Ext.create('Flamingo.view.dashboard.JobDetail', {
                    job: job
                })
            ],
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                        popWindow.close();
                    }
                }
            ]
        }).center().show();
    }

});