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

//////////////////////////////
// Global Button Text
//////////////////////////////

Ext.onReady(function() {
	Ext.MessageBox.buttonText = {
		ok: MSG.COMMON_OK,
		cancel: MSG.COMMON_CANCEL,
		yes: MSG.COMMON_YES,
		no: MSG.COMMON_NO
	};
});

//////////////////////////////
// Global Ajax Configuration
//////////////////////////////

Ext.Ajax.on('beforerequest', function (conn, options, eOpts) {
});

var isExpired = false;
Ext.Ajax.on('requestexception', function (conn, response, options) {
    if (response.status == 909 && !isExpired) {
        isExpired = true;
        Ext.MessageBox.show(
            {
                title: MSG.DIALOG_TITLE_SESSION_EXPIRED,
                msg: MSG.DIALOG_MSG_SESSION_EXPIRED,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR,
                fn: function (btn, text) {
                    window.location = "/";
                }
            }
        );
    }

    if (response.responseText) {
        var result = Ext.decode(response.responseText);
        Ext.MessageBox.show({
            title: MSG.DIALOG_TITLE_SERVER_ERROR,
            msg: result.error.message,
            icon: Ext.MessageBox.ERROR,
            buttons: Ext.Msg.OK
        });
    }
});

// ExtJS 4.2 Tooltip bug fix code
Ext.override(Ext.tip.QuickTip, {
    helperElId: 'ext-quicktips-tip-helper',
    initComponent: function () {
        var me = this;


        me.target = me.target || Ext.getDoc();
        me.targets = me.targets || {};
        me.callParent();


        // new stuff
        me.on('move', function () {
            var offset = me.hasCls('x-tip-form-invalid') ? 35 : 12,
                helperEl = Ext.fly(me.helperElId) || Ext.fly(
                    Ext.DomHelper.createDom({
                        tag: 'div',
                        id: me.helperElId,
                        style: {
                            position: 'absolute',
                            left: '-1000px',
                            top: '-1000px',
                            'font-size': '12px',
                            'font-family': 'tahoma, arial, verdana, sans-serif'
                        }
                    }, Ext.getBody())
                );

            if (me.html && (me.html !== helperEl.getHTML()
                || me.getWidth() !== (helperEl.dom.clientWidth + offset))) {
                helperEl.update(me.html);
                me.setWidth(Ext.Number.constrain(helperEl.dom.clientWidth +
                    offset, me.minWidth, me.maxWidth));
            }
        }, this);
    }
});