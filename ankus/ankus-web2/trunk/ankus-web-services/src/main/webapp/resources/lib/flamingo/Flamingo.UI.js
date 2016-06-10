Ext.namespace('Flamingo.UI');

/**
 * @class Flamingo.UI
 * @singleton
 * @author Edward KIM
 * @since 0.1
 */
Flamingo.UI = new (function () {

    /**
     * 컴포넌트를 Selector를 이용하여 lookup한다. 한개의 컴포넌트인 경우에만 사용할 수 있다.
     */
    this.query = function (name) {
        return Ext.ComponentQuery.query(name)[0];
    },

        this.getCheckedValueOfRadioGroup = function (radioGroup) {
        },

    /**
     * UI 컴포넌트를 비활성화 시킨다.
     */
        this.disable = function (component) {
            if (this.is('String', component)) {
                var comp = this.lookup(component);
                comp.setDisabled(true);
            } else {
                component.setDisabled(true);
            }
        },

    /**
     * UI 컴포넌트를 활성화 시킨다.
     */
        this.enable = function (component) {
            if (this.is('String', component)) {
                var comp = this.lookup(component);
                comp.setDisabled(false);
            } else {
                component.setDisabled(false);
            }
        },

    /**
     * 자료형을 검사한다.
     */
        this.is = function is(type, obj) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas === type;
        },

    /**
     * 로그 메시지를 남긴다.
     */
        this.log = function (prefix, output) {
            if (typeof console === "object" && console.log) {
                if (typeof output !== "undefined") {
                    console.log('[' + prefix + '] ' + output);
                } else {
                    console.log(prefix);
                }
            }
        },

    /**
     * 도움말 창을 생성한다.
     */
        this.newHelp = function (title, height, width, url) {
            return Ext.create('Ext.Window', {
                title: title ? title : 'Help',
                width: height ? height : 850,
                height: width ? width : 600,
                closable: true,
                modal: false,
                closeAction: 'close',
                constrainHeader: true,
                resizable: true,
                constrain: true,
                padding: '5 5 5 5',
                layout: 'fit',
                url: url,
                listeners: {
                    beforerender: function () {
                        this.add(new Ext.Panel({
                            html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0"  src="' + this.url + '"></iframe>',
                            border: false,
                            autoScroll: true
                        }));
                    }
                }

            });
        },

    /**
     * 팝업창을 생성한다.
     */
        this.msg = function (title, format) {
            var msgCt = Ext.core.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var t = '<div class="msg"><h3>' + title + '</h3><p>' + s + '</p></div>'
            var m = Ext.core.DomHelper.append(msgCt, t, true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 6000, remove: true});
        },

    /**
     * 팝업창을 생성한다.
     */
        this.msgPopup = function (title, format) {
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var win = Ext.create('widget.uxNotification', {
                title: title,
                position: 't',
                iconCls: 'ux-notification-icon-information',
                width: 300,
                autoCloseDelay: 6000,
                slideInDelay: 600,
                slideDownAnimation: 'easeIn',
                html: s
            });
            win.show();
        },


    /**
     * 팝업창을 생성한다.
     */
        this.infomsg = function (title, format) {
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var win = Ext.create('widget.uxNotification', {
                title: title,
                position: 't',
                iconCls: 'ux-notification-icon-information',
                width: 300,
                autoCloseDelay: 6000,
                slideInDelay: 600,
                slideDownAnimation: 'easeIn',
                html: s
            });
            win.show();
        },

    /**
     * 팝업창을 생성한다.
     */
        this.errormsg = function (title, format) {
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var win = Ext.create('widget.uxNotification', {
                title: title,
                position: 't',
                iconCls: 'ux-notification-icon-error',
                width: 300,
                autoCloseDelay: 6000,
                slideInDelay: 600,
                slideDownAnimation: 'easeIn',
                html: s
            });
            win.show();
        }
});
