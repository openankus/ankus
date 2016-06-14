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

/**
 * Workflow Designer : NodeList View
 *
 * @class
 * @extends Ext.view.View
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.NodeList', {
    extend: 'Ext.view.View',
    alias: 'widget.nodeList',

    requires: [
        'Flamingo.store.designer.NodeMeta'
    ],

    cls: 'node-list',
    tpl: [
        '<div style="width: {[values.length * 80]}px;">',
        '<tpl for=".">',
        '<div class="{[values.disabled ? "thumb-wrap-disable" : "thumb-wrap"]}" id="{identifier}">',
        '<div class="thumb"><img src="{icon}" title="{description}"></div>',
        '<span>{name}</span>',
        '</div>',
        '</tpl>',
        '</div>'
    ],
    singleSelect: true,
    trackOver: true,
    autoScroll: true,
    overItemCls: 'x-item-over',
    itemSelector: 'div.thumb-wrap',
    selectedItemClass: 'x-item-selected',

    initComponent: function () {
        this.store = Ext.create('Flamingo.store.designer.NodeMeta');
        if (this.type) {
            var types = this.type.split(',');
            this.store.filter({
                filterFn: function (item) {
                    for (var i = 0; i < types.length; i++) {
                        if (item.get("type") === types[i]) {
                            return true;
                        }
                    }
                }
            });
        } else {
            this.store.filter({
                filterFn: function (item) {
                    if (item.get("type") !== 'START' && item.get("type") !== 'END') {
                        return true;
                    }
                }
            });
        }

        this.callParent(arguments);
    }
});