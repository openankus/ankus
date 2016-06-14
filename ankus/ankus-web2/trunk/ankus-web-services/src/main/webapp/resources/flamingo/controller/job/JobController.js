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

Ext.define('Flamingo.controller.job.JobController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.jobController',

    requires: ['Flamingo.view.job.JobRegistPanel'],

    init: function () {
        this.control({
            'jobListPanel #registJobButton': {
                click: this.onRegistClick
            },
            'jobListPanel #findJobButton': {
                click: this.onFindJobClick
            }
        });

        log('Job Controller', 'Initialized');

        this.onLaunch();
    },

    onLaunch: function () {
        log('Job Controller', 'Launched');
    },

    onRegistClick: function () {
        var win = Ext.create('Ext.window.Window', {
            height: 530,
            width: 800,
            resizable: false,
            closable: true,
            hideCollapseTool: false,
            title: 'Regist a batch job',
            titleCollapse: false,
            modal: true,
            closeAction: 'close',
            layout: 'fit',
            items: [
                {
                    xtype: 'jobRegistPanel'
                }
            ],
            buttons: [
                {
                    text: MSG.COMMON_OK,
                    iconCls: 'common-confirm',
                    handler: function () {
                        var form = query('jobRegistPanel #jobInfoForm');
                        var engineId = query('jobRegistPanel #editorEngineCombo').getValue();
                        if (form.isValid() && engineId) {
                            win.close();

                            var cronExpression = query('jobRegistPanel #cronExpression').getValue();
                            var jobName = query('jobRegistPanel #jobName').getValue();
                            var workflowId = query('jobRegistPanel #workflowId').getValue();
                            var wid = query('jobRegistPanel #wid').getValue();
                            var params = {
                                wid: wid,
                                engineId: engineId,
                                cron: cronExpression,
                                jobName: jobName,
                                workflowId: workflowId
                            };
                            invokePostByMap(CONSTANTS.JOB.REGIST, params,
                                function (response) {
                                    var obj = Ext.decode(response.responseText);
                                    var controller = Flamingo.app.controllers.get('Flamingo.controller.job.JobController');
                                    if (obj.success) {
                                        controller._info('Job을 등록했습니다.');
                                    } else {
                                        controller._error('Job을 등록할 수 없습니다. 원인 : ' + obj.error.message);
                                    }
                                },
                                function (response) {
                                    var controller = Flamingo.app.controllers.get('Flamingo.controller.job.JobController');
                                    controller._error('Job을 등록할 수 없습니다. 원인 : ' + response.statusText);
                                }
                            );
                        }
                    }
                },
                {
                    text: MSG.COMMON_CANCEL,
                    iconCls: 'common-cancel',
                    handler: function () {
                        win.close();
                    }
                }
            ]
        }).center().show();
    },

    onFindJobClick: function () {
        var panel = query('jobListPanel > gridpanel');

        var engineId = Ext.ComponentQuery.query('jobListPanel #engineId')[0].getValue();
        var startDate = Ext.ComponentQuery.query('jobListPanel #startDate')[0];
        var endDate = Ext.ComponentQuery.query('jobListPanel #endDate')[0];
        var status = Ext.ComponentQuery.query('jobListPanel #status')[0];
        var jobName = Ext.ComponentQuery.query('jobListPanel #jobName')[0];

        if (engineId) {
            panel.getStore().load({
                params: {
                    startDate: Flamingo.Util.Date.formatExtJS(startDate.getValue(), 'Y-m-d'),
                    endDate: Flamingo.Util.Date.formatExtJS(endDate.getValue(), 'Y-m-d'),
                    status: status.getValue(),
                    workflowName: jobName.getValue(),
                    engineId: engineId,
                    jobType: 'WORKFLOW',
                    start: 0,
                    page: 1,
                    limit: CONSTANTS.GRID_SIZE_PER_PAGE
                }
            });

            panel.getStore().currentPage = 1;
        } else {
            Ext.MessageBox.show({
                title: '작업 조회',
                msg: '워크플로우 엔진을 선택하십시오.',
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
            }, 2500);
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
            }, 2500);
        }
    }
});