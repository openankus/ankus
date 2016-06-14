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

Ext.define('Flamingo.view.job.Viewport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jobPanel',

    requires: [
        'Flamingo.view.job.JobListPanel',
        'Flamingo.view.job.JobStatusBar'
    ],

    layout: {
        type: 'border'
    },

    border: false,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    itemId: 'jobPanel',
                    layout: {
                        type: 'border'
                    },
                    region: 'center',
                    items: [
                        {
                            xtype: 'jobListPanel',
                            region: 'center'
                        }
                    ]
                }
            ],
            bbar: {
                xtype: 'jobStatusBar'
            }
        });

        me.callParent(arguments);
    }
});