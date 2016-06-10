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
 * Abstract Node Property
 *
 * @class
 * @extends Ext.tab.Panel
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._NODE', {
    extend: 'Ext.tab.Panel',

    minTabWidth: 70,
    bodyPadding: 5,
    border: false,
    layout: 'fit',

    width: 400,
    height: 300,

    /**
     * 노드 데이터
     */
    nodeData: {},

    /**
     * 필터링할 데이터
     * ex) 다음과 같이 필터를 설정할 수 있다.
     * propFilters: {
     *     // 추가할 프라퍼티
     *     add   : [
     *         {'test1': '1'},
     *         {'test2': '2'}
     *     ],
     *
     *     // 변경할 프라퍼티
     *     modify: [
     *         {'delimiterType': 'delimiterType2'},
     *         {'config': 'config2'}
     *     ],
     *
     *     // 삭제할 프라퍼티
     *     remove: ['script', 'metadata']
     * }
     */
    propFilters: {
        add: [],
        modify: [],
        remove: []
    },

    afterPropertySet: function (props) {
    },

    /**
     * Shape Graph Element
     */
    shapeElement: null,

    listeners: {
        afterrender: function (panel, eOpts) {
            // 노드 랜더링시 프라퍼티정보를 설정한다.
            panel.setNodeProperties(panel.nodeData.properties);
        }
    },

    /**
     * 노드의 프라퍼티정보를 반환한다.
     *
     * @return {Object} Property(name:value) Object
     */
    getNodeProperties: function () {
        var properties = {};
        Ext.each(this.query('form'), function (formPanel) {
            Ext.apply(properties, formPanel.getForm().getValues());
            Ext.each(formPanel.query('_grid'), function (grid) {
                Ext.apply(properties, grid.getParameters());
            });
        });

        return properties;
    },

    /**
     * 노드의 필터링(변경, 삭제)된 프라퍼티정보를 반환한다.
     */
    getFilteredNodeProperties: function () {
        var properties = this.getNodeProperties();
        if (Ext.isDefined(this.propFilters)) {
            if (Ext.isArray(this.propFilters.add)) {
                for (var i = 0; i < this.propFilters.add.length; i++) {
                    Ext.apply(properties, this.propFilters.add[i]);
                }
            }

            if (Ext.isArray(this.propFilters.modify)) {
                for (var i = 0; i < this.propFilters.modify.length; i++) {
                    for (var prop in this.propFilters.modify[i]) {
                        if (properties.hasOwnProperty(prop)) {
                            properties[this.propFilters.modify[i][prop]] = properties[prop];
                            delete properties[prop];
                        }
                    }
                }
            }

            if (Ext.isArray(this.propFilters.remove)) {
                for (var i = 0; i < this.propFilters.remove.length; i++) {
                    delete properties[this.propFilters.remove[i]];
                }
            }
        }

        this.afterPropertySet(properties);

        return properties;
    },

    /**
     * 주어진 프라퍼티정보로 노드의 프라퍼티를 설정한다.
     *
     * @param {Object} nodeProperties Property(name:value) Object
     */
    setNodeProperties: function (nodeProperties) {
        if (nodeProperties) {
            Ext.each(this.query('form'), function (formPanel) {
                formPanel.getForm().setValues(nodeProperties);
                Ext.each(formPanel.query('_grid'), function (grid) {
                    grid.setParameters(nodeProperties);
                });
            });
        }
    },

    /**
     * 연결된 이전 노드들의 노드데이터를 반환한다.
     *
     * @return {Object[]} nodeData JSON Object's Array
     */
    getPrevNodeData: function () {
        var canvas = Ext.ComponentQuery.query('canvas')[0],
            nodeDataArray = [];
        if (canvas && canvas.graph && this.shapeElement) {
            Ext.each(canvas.graph.getPrevShapes(this.shapeElement), function (shape) {
                var nodeData = Ext.clone(canvas.graph.getCustomData(shape));
                if (nodeData) {
                    nodeDataArray.push(nodeData);
                }
            });
        }

        return nodeDataArray;
    },

    /**
     * 연결된 이후 노드들의 노드데이터를 반환한다.
     *
     * @return {Object[]} nodeData JSON Object's Array
     */
    getNextNodeData: function () {
        var canvas = Ext.ComponentQuery.query('canvas')[0],
            nodeDataArray = [];
        if (canvas && canvas.graph && this.shapeElement) {
            Ext.each(canvas.graph.getNextShapes(this.shapeElement), function (shape) {
                var nodeData = Ext.clone(canvas.graph.getCustomData(shape));
                if (nodeData) {
                    nodeDataArray.push(nodeData);
                }
            });
        }

        return nodeDataArray;
    },

    /**
     * 노드 프라퍼티의 form 유효성을 체크한다.
     *
     * @return {Boolean}
     */
    isFormValid: function () {
        var isValid = true;
        Ext.each(this.query('form'), function (formPanel, idx) {
            this.setActiveTab(idx);
            if (!formPanel.getForm().isValid()) {
                isValid = false;
                return false;
            }

            var grid = formPanel.query('_grid');
            for (var k in grid) {
                if (!grid[k].isFormValid()) {
                    isValid = false;
                    return false;
                }
            }
        }, this);

        return isValid;
    }
});