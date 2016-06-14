/* rTerm - Ajaxterm Window Widget for Extjs (Ext.ux.rTerm)
 * Version: 1.0
 *
 * Copyright 2008 (c) David W Davis
 * xantus@xantus.org
 * http://xant.us/
 *
 * License: Same as Extjs 2.0
 *
 * Please do not remove this header
 */

Ext.namespace('Ext.ux', 'QoDesk');

// Can be used as a qwikioffice app module
// install in system/modules/rterm
if (Ext.app && Ext.app.Module) {
    QoDesk.rTerm = Ext.extend(Ext.app.Module, {

        moduleType: 'app',
        moduleId: 'rterm',

        init: function () {
            this.launcher = {
                text: 'rTerm',
                iconCls: 'x-rterm-icon',
                handler: this.createWindow,
                shortcutIconCls: 'x-rterm-shortcut',
                text: 'rTerm',
                tooltip: '<b>rTerm</b><br />Remote Terminal - (c) 2008 David Davis, Xantus',
                scope: this
            };
        },

        createWindow: function () {
            new Ext.ux.rTerm.App();
        }

    });
}


(function () {

    var log;
    if (window.console) {
        log = function (m) {
            window.console.log(m);
        };
    } else if (Ext.log) {
        log = window.Ext.log;
    } else {
        log = Ext.emptyFn;
    }

    Ext.ux.rTerm = function (config) {
        if (config === undefined)
            config = {};
        if (!config.hostname)
            config.hostname = 'localhost';
        Ext.apply(this, config);
        Ext.ux.rTerm.superclass.constructor.apply(this, arguments);
        this.initialize(config);
    };

    Ext.ux.rTerm.version = '1.0';

    Ext.extend(Ext.ux.rTerm, Ext.Window, {

        initialize: function (config) {
            log('init rterm window');

            if (!config.iconCls)
                this.setIconClass('x-rterm-icon');

            if (!Ext.ux.rTerm.keyManager)
                Ext.ux.rTerm.keyManager = new Ext.ux.rTerm.KeyManager();

            Ext.ux.rTerm.keyManager.register(this);
            this.on('documentKeypress', this._keypress, this);

            this.show();
            this._setupTerm();

            // TODO onshow
            this.body.addClass('x-rterm-content');
            this.body.mask();

            this.socket.on('socketData', this._socketData, this);
            this.socket.on('connect', this._socketConnected, this);
            this.socket.on('close', this._socketDisconnected, this);
            this.on('close', this.socket.destroy, this.socket);

            this._connecting = true;
            this.socket.connect();

            /*
             this.contentId = Ext.id();
             this.add({
             layout: 'border',
             border: false,
             items: [{
             width: '100%',
             height: '100%',
             region: 'center',
             layout: 'fit',
             border: false,
             margins: '0',
             items: [{
             html: '<div id="'+this.contentId+'" class="x-rterm-content">testing</div>'
             }]
             }]
             });
             */
        },

        initComponent: function () {
            Ext.apply(this, {
                height: '100%',
                tbar: [
                    {   text: 'Colors',
                        window: this,
                        pressed: true,
                        enableToggle: true,
                        scope: this,
                        iconCls: 'color-button',
                        Qtip: 'Enable/Display Colors in Terminal',
                        toggleHandler: function (btn, state) {
                            if (state) {
                                this.color = true;
                            } else {
                                this.color = false;
                            }
                        }
                    },
                    '-',
                    {   text: 'Get',
                        scope: this,
                        iconCls: 'get-button',
                        Qtip: 'Toggle to GET HTTP Method',
                        enableToggle: true,
                        toggleGroup: 'http-method',
                        handler: function () {
                            this.socket.method = 'GET'
                        }
                    },
                    {   text: 'Post',
                        scope: this,
                        iconCls: 'post-button',
                        Qtip: 'Toggle to GET HTTP Method',
                        pressed: true,
                        enableToggle: true,
                        toggleGroup: 'http-method',
                        handler: function () {
                            this.socket.method = 'POST'
                        }
                    },
                    '->',
                    {   text: 'Copy',
                        scope: this,
                        iconCls: 'copy-button',
                        Qtip: 'Copy to Browser Clipboard',
                        handler: function () {
                            Ext.Msg('TODO', 'Copy');
                        }
                    },
                    {   text: 'Paste',
                        scope: this,
                        iconCls: 'paste-button',
                        Qtip: 'Paste to Terminal',
                        handler: function () {
                            Ext.Msg('TODO', 'Paste');
                        }
                    }
                ]
            });
            Ext.ux.rTerm.superclass.initComponent.apply(this, arguments);
        },

        _socketData: function (socket, chunks) {
            try {
                for (var i = 0, len = chunks.length; i < len; i++) {
                    var o = chunks[ i ];
                    if (!o.html)
                        continue;
                    if (o.html == '<idem></idem>')
                        continue;
                    this._dterm.innerHTML = o.html;
                }
            } catch (e) {
                log('error parsing data from server:' + e.message);
            }
            ;
        },

        _socketConnected: function (socket) {
            this.body.unmask();
            log('connected');
            this._connecting = false;
            this._update();
        },

        _socketDisconnected: function (socket) {
            log('disconnected');
            this.body.mask();
        },

        _setupTerm: function () {
            if (this.sid)
                return;
            log('setup term');
            this.sid = "" + Math.round(Math.random() * 1000000000);
            Ext.applyIf(this, {
                _queueTimeout: 15, // ms
                cols: 80,
                rows: 25,
                color: true
            });
            this._timeout = null;
            this.error_timeout = null;
            this.keybuf = [];
            this.rmax = 1;

            var div = this.body.dom;
//        this.dstat = document.createElement('pre');
//        this.sdebug = document.createElement('span');
            this._dterm = document.createElement('div');

            /*
             this.sled = document.createElement('span');
             this.opt_color = document.createElement('a');
             var opt_paste = document.createElement('a');
             this.sled.appendChild(document.createTextNode('\xb7'));
             this.sled.className='off';
             this.dstat.appendChild(this.sled);
             this.dstat.appendChild(document.createTextNode(' '));
             this._opt_add(this.opt_color,'Colors');
             this.opt_color.className='on';
             this._opt_add(opt_paste,'Paste');
             */
//        this.dstat.appendChild(this.sdebug);
//        this.dstat.className='stat';
//        div.appendChild(this.dstat);
            div.appendChild(this._dterm);
            /*
             if(this.opt_color.addEventListener) {
             this.opt_color.addEventListener('click',this._do_color.createDelegate( this ),true);
             opt_paste.addEventListener('click',this._do_paste.createDelegate( this ),true);
             } else {
             this.opt_color.attachEvent("onclick", this._do_color.createDelegate( this ));
             opt_paste.attachEvent("onclick", this._do_paste.createDelegate( this ));
             }
             */
        },

        _update: function () {
            if (this._connecting)
                return;
            send_obj = {
                s: this.sid,
                w: this.cols,
                h: this.rows,
                k: this.keybuf.join('')
            };

            if (this.color == true)
                send_obj.c = true;

            this.socket.send([send_obj]);
            this.keybuf = [];
        },

        _queue: function (s) {
            this.keybuf.push(s);
            log('buffer:' + this.keybuf.join(''));
            if (this._connecting)
                return;
            if (this._timeout)
                window.clearTimeout(this._timeout);
            this._timeout = this._update.defer(this._queueTimeout, this);
        },

        _iekeys: {
            9: 1, 8: 1, 27: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1,
            39: 1, 40: 1, 45: 1, 46: 1, 112: 1, 113: 1, 114: 1, 115: 1,
            116: 1, 117: 1, 118: 1, 119: 1, 120: 1, 121: 1, 122: 1, 123: 1
        },

        _keypress: function (ev) {
//        log( 'keypress:'+ev.keyCode+' '+ev.which+' '+ev.button);
            if (!ev)
                ev = window.event;

            if (Ext.isIE) {
                // keydown
//        log("kd keyCode="+ev.keyCode+" which="+ev.which+" shiftKey="+ev.shiftKey+" ctrlKey="+ev.ctrlKey+" altKey="+ev.altKey);
                if (this._iekeys[ev.keyCode] || ev.ctrlKey || ev.altKey) {
                    ev.which = 0;
                } else
                    return;
            }
//        log("kp keyCode="+ev.keyCode+" which="+ev.which+" shiftKey="+ev.shiftKey+" ctrlKey="+ev.ctrlKey+" altKey="+ev.altKey);
//        return false;
//        else // if (!ev.ctrlKey || ev.keyCode==17) // return; //
            var kc;
            var k = "";
            if (ev.keyCode)
                kc = ev.keyCode;
            if (ev.which)
                kc = ev.which;
            if (ev.button >= 0)
                kc = ev.button + 1;
            if (ev.altKey) {
                if (kc >= 65 && kc <= 90)
                    kc += 32;
                if (kc >= 97 && kc <= 122) {
                    k = String.fromCharCode(27) + String.fromCharCode(kc);
                }
            } else if (ev.ctrlKey) {
                if (kc >= 65 && kc <= 90) k = String.fromCharCode(kc - 64); // Ctrl-A..Z
                else if (kc >= 97 && kc <= 122) k = String.fromCharCode(kc - 96); // Ctrl-A..Z
                else if (kc == 54)  k = String.fromCharCode(30); // Ctrl-^
                else if (kc == 109) k = String.fromCharCode(31); // Ctrl-_
                else if (kc == 219) k = String.fromCharCode(27); // Ctrl-[
                else if (kc == 220) k = String.fromCharCode(28); // Ctrl-\
                else if (kc == 221) k = String.fromCharCode(29); // Ctrl-]
                else if (kc == 219) k = String.fromCharCode(29); // Ctrl-]
                else if (kc == 219) k = String.fromCharCode(0);  // Ctrl-@
            } else if (ev.which == 0) {
                if (kc == 9) k = String.fromCharCode(9);  // Tab
                else if (kc == 8) k = String.fromCharCode(127);  // Backspace
                else if (kc == 27) k = String.fromCharCode(27); // Escape
                else {
                    if (kc == 33) k = "[5~";        // PgUp
                    else if (kc == 34) k = "[6~";   // PgDn
                    else if (kc == 35) k = "[4~";   // End
                    else if (kc == 36) k = "[1~";   // Home
                    else if (kc == 37) k = "[D";    // Left
                    else if (kc == 38) k = "[A";    // Up
                    else if (kc == 39) k = "[C";    // Right
                    else if (kc == 40) k = "[B";    // Down
                    else if (kc == 45) k = "[2~";   // Ins
                    else if (kc == 46) k = "[3~";   // Del
                    else if (kc == 112) k = "[[A";  // F1
                    else if (kc == 113) k = "[[B";  // F2
                    else if (kc == 114) k = "[[C";  // F3
                    else if (kc == 115) k = "[[D";  // F4
                    else if (kc == 116) k = "[[E";  // F5
                    else if (kc == 117) k = "[17~"; // F6
                    else if (kc == 118) k = "[18~"; // F7
                    else if (kc == 119) k = "[19~"; // F8
                    else if (kc == 120) k = "[20~"; // F9
                    else if (kc == 121) k = "[21~"; // F10
                    else if (kc == 122) k = "[23~"; // F11
                    else if (kc == 123) k = "[24~"; // F12
                    if (k.length) {
                        k = String.fromCharCode(27) + k;
                    }
                }
            } else {
                if (kc == 8)
                    k = String.fromCharCode(127);  // Backspace
                else
                    k = String.fromCharCode(kc);
            }
            if (k.length) {
                if (k == "+") {
                    this._queue("%2B");
                } else {
//                this._queue(escape(k));
                    this._queue(k);
                }
            }
            ev.cancelBubble = true;
            if (ev.stopPropagation) ev.stopPropagation();
            if (ev.preventDefault)  ev.preventDefault();
            return false;
        },

        _error: function () {
            //this.sled.className='off';
            log("Connection lost timeout ts:" + ((new Date).getTime()));
        },

        _opt_add: function (opt, name) {
            opt.className = 'off';
            opt.innerHTML = ' ' + name + ' ';
            this.dstat.appendChild(opt);
            this.dstat.appendChild(document.createTextNode(' '));
        },

        /*
         _do_color: function(event) {
         var o = this.opt_color.className=(this.opt_color.className=='off')?'on':'off';
         this.color = ( o == 'on' ) ? true : false;
         log('Color '+this.opt_color.className);
         },
         */

        _mozilla_clipboard: function () {
            // mozilla sucks
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (err) {
                //log('Access denied, <a href="http://kb.mozillazine.org/Granting_JavaScript_access_to_the_clipboard" target="_blank">more info</a>');
                return undefined;
            }
            var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
            var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            if (!clip || !trans) {
                return undefined;
            }
            trans.addDataFlavor("text/unicode");
            clip.getData(trans, clip.kGlobalClipboard);
            var str = new Object();
            var strLength = new Object();
            try {
                trans.getTransferData("text/unicode", str, strLength);
            } catch (err) {
                return "";
            }
            if (str)
                str = str.value.QueryInterface(Components.interfaces.nsISupportsString);

            return str ? str.data.substring(0, strLength.value / 2) : "";
        },

        _do_paste: function (event) {
            var p;
            if (window.clipboardData) {
                p = window.clipboardData.getData("Text");
            } else if (window.netscape) {
                p = this._mozilla_clipboard();
            }
            if (p) {
                log('Pasted');
                this._queue(encodeURIComponent(p));
            }
        }

    });

    Ext.reg('rterm', Ext.ux.rTerm);

    Ext.ux.rTerm.Filter = function (config) {
        Ext.ux.rTerm.Filter.superclass.constructor.apply(this, arguments);
    };


    Ext.extend(Ext.ux.rTerm.Filter, Ext.ux.Sprocket.Filter.Stream, {

        get: function () {
            var chunks = Ext.ux.rTerm.Filter.superclass.get.apply(this, arguments);

            // filter xml blocks off the front
            for (var i = 0, len = chunks.length; i < len; i++)
                chunks[ i ] = { html: chunks[ i ].replace(/^<\?xml[^>]+>/, '') };

            return chunks;
        },


        put: function (data) {
            return data;
        }

    });


    Ext.ux.rTerm.AjaxtermSocket = function (config) {
        if (config === undefined)
            config = {};
        Ext.apply(this, config);
        this.initialize(config);
    };

    Ext.extend(Ext.ux.rTerm.AjaxtermSocket, Ext.util.Observable, {

        initialize: function (config) {
            this.state = 'disconnected';
            this.reqFailures = 0;
            this.sending = false;
            this.queue = [];
            this.defaultParams = {};
            this.waitcount = 0;
            this.filter = new Ext.ux.rTerm.Filter();
            Ext.applyIf(this, {
                uri: '/ajaxterm/u',
                method: 'POST',
                waitlimit: 50,
            });
            this.addEvents({
                /**
                 * @event socketData
                 * Fires when a new color selected
                 * @param {Ext.ux.rTerm.AjaxtermSocket} this
                 * @param {Array} chunks
                 */
                socketData: true,
                /**
                 * @event connect
                 * Fires when connected
                 * @param {Ext.ux.rTerm.AjaxtermSocket} this
                 */
                connect: true,
                /**
                 * @event close
                 * Fires when disconnected
                 * @param {Ext.ux.rTerm.AjaxtermSocket} this
                 */
                close: true,
                /**
                 * @event ioError
                 * Fires when an input/output error occurs
                 * @param {Ext.ux.rTerm.AjaxtermSocket} this
                 * @param {String} error
                 */
                ioError: true,
                /**
                 * @event securityError
                 * Fires when a call to connect fails due to a security error
                 * @param {Ext.ux.rTerm.AjaxtermSocket} this
                 * @param {String} error
                 */
                securityError: true
            });
        },


        destroy: function () {
            if (this.timer)
                window.clearTimeout(this.timer);
            this.disconnect();
            this.purgeListeners();
        },


        /* methods  */
        connect: function () {
            if (this.state == 'disconnected')
                this.onConnected();
        },


        disconnect: function () {
            this.onDisconnected();
        },


        send: function (chunks) {
            //var chunks = this.filter.put( data );
            //if ( chunks )
            //    this.doRequest( chunks );
            for (var i = 0, len = chunks.length; i < len; i++)
                this.queue.push(chunks[ i ]);

            if (this.timer)
                window.clearTimeout(this.timer);

            this.timer = this.doRequest.defer(15, this);
        },


        /* same as send */
        write: function () {
            this.send.apply(this, arguments);
        },


        flush: function () {
            if (this.timer)
                window.clearTimeout(this.timer);

            this.doRequest();
        },


        onSocketData: function (data) {
            var chunks;
            try {
                chunks = this.filter.get(data);
            } catch (e) {
                log('Error in filter get call: ' + e.message);
            }
            ;
            try {
                if (chunks.length > 0)
                    this.fireEvent('socketData', this, chunks);
            } catch (e) {
                log('Error in socketData event call: ' + e.message);
            }
            ;
        },


        _getParams: function () {
            if (this.queue.length > 0) {
                var l = this.queue.length - 1;
                this.defaultParams.s = this.queue[ l ].s;
                this.defaultParams.w = this.queue[ l ].w;
                this.defaultParams.h = this.queue[ l ].h;
                this.defaultParams.c = this.queue[ l ].c;
//            Ext.apply( this.defaultParams, this.queue[ this.queue.length - 1 ] );
//            delete this.defaultParams.k;
            }

            var params = { k: '' };
            Ext.apply(params, this.defaultParams);

            for (var i = 0, len = this.queue.length; i < len; i++) {
                if (this.queue[ i ].k !== undefined)
                    params.k += this.queue[ i ].k;
            }

            this.queue = [];
//        log('params: '+Ext.encode(params));
            return params;
        },


        doRequest: function (data) {
            if (this.sending || this.state == 'disconnected')
                return;

            if (this.queue.length == 0) {
                this.waitcount++;
                if (this.waitcount < this.waitlimit) {
//                log('waiting, count:'+this.waitcount);
                    return this.timer = this.doRequest.defer(10, this);
                }
            }

            this.sending = true;
            this.waitcount = 0;

            Ext.Ajax.request({
                url: this.uri,
                method: this.method,
                success: this._requestSuccess,
                failure: this._requestFailure,
                scope: this,
                headers: {
                    'If-Modified-Since': 'Sat, 1 Jan 2000 00:00:00 GMT'
                },
                params: this._getParams()
            });
        },


        _requestSuccess: function (r, o) {
            this.reqFailures = 0;
            this.onSocketData(r.responseText);
            this.sending = false;
            if (this.timer)
                window.clearTimeout(this.timer);
            this.timer = this.doRequest.defer(10, this);
        },


        _requestFailure: function (r, o) {
            this.reqFailures++;
            this.sending = false;
            if (r.status != 200) {
                log('Connection error ' + r.status + ' ' + r.statusText);
            } else {
                log('Connection error ' + r);
            }
            if (this.reqFailures > 10) {
                // give up
                this.onIOError(r.responseText);
                this.onDisconnected();
            } else {
                //this.onIOError( r.responseText );
//            log('requeing data:'+Ext.encode(o.params));
                log('requeing after error');
                this.queue.unshift(o.params);
                if (this.timer)
                    window.clearTimeout(this.timer);

                this.timer = this.doRequest.defer(500, this);
            }
        },


        onConnected: function () {
            this.state = 'connected';
            this.fireEvent('connect', this);
        },


        onDisconnected: function () {
            this.state = 'disconnected';
            this.fireEvent('close', this);
        },


        onIOError: function (error) {
            this.fireEvent('ioError', this, error);
        },

        // not used ATM
        onSecurityError: function (error) {
            this.fireEvent('securityError', this, error);
        }

    });

    Ext.ux.rTerm.App = function (config) {
        if (config === undefined)
            config = {};
        Ext.apply(this, config);
        this.initialize(config);
    };

    Ext.extend(Ext.ux.rTerm.App, Ext.util.Observable, {

        initialize: function (config) {
            // TODO
        }
    });


    Ext.ux.rTerm.KeyManager = function (config) {
        if (config === undefined)
            config = {};
        Ext.apply(this, config);
        this.initialize(config);
    };


    Ext.extend(Ext.ux.rTerm.KeyManager, Ext.util.Observable, {

        initialize: function (config) {
            this.terms = [];
            this.active = false;

//        Ext.EventManager.on( document, 'keydown', this.keyEvent, this );
            if (Ext.isIE)
                document.onkeydown = this.keyEvent.createDelegate(this);
            else
                document.onkeypress = this.keyEvent.createDelegate(this);
//        Ext.EventManager.on( document, 'keypress', this.keyEvent, this );
        },

        keyEvent: function (ev) {
            if (!this.active)
                return;

            if (!this.activeWin) {
                this.active = false;
                log('active win is gone!');
                return;
            }

            return this.activeWin.fireEvent('documentKeypress', ev);
        },

        register: function (win) {
            // where is [].add()?
            for (var i = 0, len = this.terms.length; i < len; i++)
                if (this.terms[ i ] === win)
                    return;
            log('registered new rTerm window');
            win.addEvents({
                /**
                 * @event documentKeypress
                 * Fires when a keypress on the document occurs and the window is active
                 * @param {Ext.ux.rTerm.Window} this
                 * @param {Object} event
                 */
                documentKeypress: true
            });
            this.terms.push(win);
            win.on('close', this.windowClose, this);
            win.on('activate', this.windowActivate, this);
            win.on('deactivate', this.windowDeactivate, this);
        },

        windowActivate: function (win) {
            log('activate win');
            this.active = true;
            this.activeWin = win;
        },

        windowDeactivate: function (win) {
            log('deactivate win');
            this.active = false;
            this.activeWin = null;
        },

        windowClose: function (win) {
            log('window closed');
            this.unregister(win);
        },

        unregister: function (win) {
            if (this.activeWin === win) {
                this.active = false;
                this.activeWin = null;
            }
            this.terms.remove(win);
        }

    });


})();
