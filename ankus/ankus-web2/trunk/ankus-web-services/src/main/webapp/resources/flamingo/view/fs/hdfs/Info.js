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

Ext.define('Flamingo.view.fs.hdfs.Info', {
    extend: 'Ext.window.Window',
    alias: 'widget.hdfsPropertyPanel',

    requires: [
        'Flamingo.view.fs.hdfs.PropertyPanel',
        'Flamingo.view.fs.hdfs.ViewerPanel'
    ],

    height: 550,
    width: 700,
    closable: true,
    hideCollapseTool: false,
    title: 'Information',
    titleCollapse: false,
    modal: true,
    closeAction: 'close',
    layout: 'fit',
    items: [
        {
            xtype: 'tabpanel',
            activeTab: 0,
            items: [
                {
                    xtype: 'propertyPanel'
                }
                /*
                 ,
                 {
                 xtype:'viewerPanel'
                 }
                 */
            ]
        }
    ]
});