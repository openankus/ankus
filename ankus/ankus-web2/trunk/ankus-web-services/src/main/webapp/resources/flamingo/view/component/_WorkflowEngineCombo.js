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

Ext.define('Flamingo.view.component._WorkflowEngineCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget._workflowEngineCombo',

    type: 'HADOOP',

    name: 'workflowEngineCombo',
    editable: false,
    typeAhead: true,
    selectOnFocus: true,
    displayField: 'instanceName',
    valueField: 'id',
    tpl: '<tpl for="."><div class="x-boundlist-item" data-qtip="Hadoop Cluster: {hadoopClusterName}">{instanceName}</div></tpl>',

    constructor: function (config) {
        this.type = config.type;
        this.store = Ext.create('Flamingo.store.admin.engine.WorkflowEngineStore');
        this.callParent(arguments);
    },

    listeners: {
        beforerender: function () {
            this.getStore().getProxy().extraParams.type = this.type;
            this.getStore().load();
        }
    }
});