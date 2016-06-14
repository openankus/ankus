/*
 * Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the im plied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.apply(Ext.form.field.VTypes, {
    exceptcomma: function (v) {
        return !/,/g.test(v);
    },
    exceptcommaText: 'Cannot use comma.',
    exceptcommaMask: /[^,]/
});

Ext.apply(Ext.form.field.VTypes, {
	exceptspace: function (v) {
		return !/\s/g.test(v);
	},
	exceptspaceText: 'Cannot use space',
	exceptspaceMask: /[^\s]/
});

Ext.apply(Ext.form.field.VTypes, {
    exceptcommaspace: function (v) {
        return !/,|\s/g.test(v);
    },
    exceptcommaspaceText: 'Cannot use comma and space',
    exceptcommaspaceMask: /[^,\s]/
});

Ext.apply(Ext.form.field.VTypes, {
    ipaddress: function (v) {
        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
    },
    ipaddressText: 'Must be a numeric IP address',
    ipaddressMask: /[\d\.]/i
});

Ext.apply(Ext.form.field.VTypes, {
    port: function (v) {
        return /[0-9]/.test(v);
    },
    portText: 'Must be a numeric 0 - 65535'
});

Ext.apply(Ext.form.field.VTypes, {
    commaseperatednum: function (v) {
        return /^(-?)\d+(,\d+)*$/.test(v);
    },
    commaseperatednumText: 'Must be comma separated numerics. e.g. 1,2,3'
});

Ext.apply(Ext.form.field.VTypes, {
    numeric: function (v) {
        return /^\d+$/.test(v);
    },
    numericText: 'Must be a numeric'
});

Ext.apply(Ext.form.field.VTypes, {
    decimalpoint: function (v) {
        return /^[0-9]+(.[0-9]+)?$/.test(v);
    },
    decimalpointText: 'Must be a numeric or a decimal point'
});

/**
 * 시작 및 종료 날짜별 조회를 위한 Validator
 */
Ext.apply(Ext.form.field.VTypes, {
    dateRange: function (val, field) {
        var date = field.parseDate(val);

        if (!date) {
            return false;
        }

        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) { // for EndDate
            var start = Ext.ComponentQuery.query('#' + field.startDateField)[0];
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) { // for StartDate
            var end = Ext.ComponentQuery.query('#' + field.endDateField)[0];
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    }
});
