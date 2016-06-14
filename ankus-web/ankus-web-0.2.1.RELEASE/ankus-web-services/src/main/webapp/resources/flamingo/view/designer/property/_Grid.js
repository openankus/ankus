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
 * Abstract Inner Grid of Node Property
 *
 * @class
 * @extends Ext.grid.Panel
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Ext.define('Flamingo.view.designer.property._Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget._grid',

    /**
     * 최소 레코드 갯수 : 최소 레코드 갯수를 설정하여 isFormValid 에서 유효성을 체크한다.
     */
    minRecordLength: 0,

    /**
     * 읽기 전용 여부 : true 이면 +, -, x 툴바를 제거하여 grid 를 변경 불가 하도록 한다.
     */
    readOnly: false,

    /**
     * 디폴트값 적용 여부 : true 이면 setParameters(parameters) 시 parameters 가 없는 경우 store 에 지정된 default 값을 적용한다.
     */
    hasDefaults: false,

    plugins: [],

    initComponent: function () {
        if (!this.readOnly) {
            this.plugins = [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    pluginId: 'rowEditorPlugin',
                    listeners: {
                        canceledit: function (editor, e, eOpts) {
                            // Cancel Edit 시 유효하지 않으면 추가된 레코드를 삭제한다.
                            if (e.store.getAt(e.rowIdx) != undefined && !e.store.getAt(e.rowIdx).isValid()) {
                                e.store.removeAt(e.rowIdx);
                            }
                        }
                    }
                })
            ];

            this.tools = [
                {
                    type: 'plus',
                    tooltip: MSG.COMMON_ADD,
                    handler: function (event, toolEl, panel) {
                        // 그리드의 row 를 추가한다.
                        var grid = panel.up('_grid'),
                            store = grid.getStore(),
                            rowEditor = grid.getPlugin('rowEditorPlugin');
                        rowEditor.cancelEdit();
                        store.insert(store.getCount(), {});
                        rowEditor.startEdit(store.getCount() - 1, 0);
                    }
                },
                {
                    type: 'minus',
                    tooltip: MSG.COMMON_DELETE,
                    handler: function (event, toolEl, panel) {
                        // 그리드의 row 를 삭제한다.
                        var grid = panel.up('_grid'),
                            store = grid.getStore(),
                            selectionModel = grid.getSelectionModel();
                        store.remove(selectionModel.getSelection());
                    }
                },
                {
                    type: 'close',
                    tooltip: MSG.COMMON_REMOVE_ALL,
                    handler: function (event, toolEl, panel) {
                        // 그리드의 모든 row 를 삭제한다.
                        var grid = panel.up('_grid'),
                            store = grid.getStore();
                        store.removeAll();
                    }
                }
            ];
        }

        this.callParent(arguments);
    },

    /**
     * 그리드 레코드를 파리미터형태로 변환하여 반환한다.
     * <pre>
     *     example)
     *     {
	 *             field1 : "value1,value2",
	 *             field2 : "value1,value2"
	 *     }
     * </pre>
     *
     * @return {Object} Property(name:value) Object
     */
    getParameters: function () {
        var hashMap = new Ext.util.HashMap(), parameters = {};
        this.store.each(function (record, idx) {
            var data = record.data;
            for (var key in data) {
                if (hashMap.containsKey(key)) {
                    hashMap.get(key).push(data[key]);
                } else {
                    hashMap.add(key, [data[key] || '']);
                }
            }
        });

        hashMap.each(function (key, value, length) {
            parameters[key] = value.toString();
        });

        return parameters;
    },

    /**
     * 주어진 파라미터정보로 그리드의 레코드를 설정한다.
     * <pre>
     *     parameters example)
     *     {
	 *             field1 : "value1,value2",
	 *             field2 : "value1,value2"
	 *     }
     * </pre>
     *
     * @param {Object} parameters Property(name:value) Object
     */
    setParameters: function (parameters) {
        var hashMap = new Ext.util.HashMap(), maxLength = 0, dataArray = [], data, values;
        Ext.each(this.store.model.getFields(), function (field, idx) {
            if (Ext.isDefined(parameters[field.name]) && !Ext.isEmpty(parameters[field.name])) {
                hashMap.add(field.name, parameters[field.name].split(','));
                if (maxLength < parameters[field.name].split(',').length) {
                    maxLength = parameters[field.name].split(',').length;
                }
            }
        });

        for (var i = 0; i < maxLength; i++) {
            data = {};
            Ext.each(hashMap.getKeys(), function (key, idx) {
                values = hashMap.get(key);
                data[key] = values[i] || '';
            });

            dataArray.push(data);
        }

        if (dataArray.length > 0) {
            this.store.loadData(dataArray);
        } else if (!this.hasDefaults) {
            this.store.removeAll();
        }
    },

    /**
     * 그리드 레코드의 form 유효성을 체크한다.
     *
     * @return {Boolean}
     */
    isFormValid: function () {
        var isValid = true;
        if (this.readOnly === true) {
            return true;
        }
        if (this.store.getCount() >= this.minRecordLength) {
            this.store.each(function (record, idx) {
                if (!record.isValid()) {
                    var rowEditor = this.getPlugin('rowEditorPlugin');
                    if (rowEditor) {
                        rowEditor.cancelEdit();
                        rowEditor.startEdit(idx, 0);
                    }
                    isValid = false;

                    return false;
                }
            }, this);
        } else {
            // 그리드의 row 를 추가한다.
            var rowEditor = this.getPlugin('rowEditorPlugin');
            if (rowEditor) {
                rowEditor.cancelEdit();
                this.store.insert(this.store.getCount(), {});
                rowEditor.startEdit(this.store.getCount() - 1, 0);
            }

            isValid = false;
        }

        return isValid;
    }
});