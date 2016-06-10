Ext.define('Flamingo.view.desktop.TajoBrowser', {
    extend: 'Flamingo.view.desktop.BogusModule',

    requires: [
           'Flamingo.view.designer.Viewport',
           'Flamingo.view.dashboard.Viewport'
    ],

    id: 'tajo-browser-win',
    
    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getBrowserWindow();
    },
    
    init: function () {
        this.launcher = {
            text: MSG.MENU_TAJO_MANAGEMENT,
            iconCls: 'bogus',
            handler: function () {
                return false;
            },
            menu: {
                listeners: {
                    mouseleave: function (menu, e, eOpts) {
                        Ext.getCmp('deskmenu').deactivateActiveItem();
                    }
                },
                items: [
                    {
                        text: MSG.MENU_TAJO_META_MANAGER,
                        iconCls: 'bogus',
                        handler: function (src) {
                            return this.getMetaManagerWindow();
                        },
                        scope: this
                    },
                    {
                    	text: MSG.MENU_TAJO_BROWSER,
                        iconCls: 'bogus',
                        handler: function (src) {
                        	return this.getBrowserWindow();
                        },
                        scope: this
                    }
                ]
            }
        };
    },

	getMetaManagerWindow: function () {
	    var desktop = this.app.getDesktop();
	    var win = desktop.getWindow('tajo-meta-manager-win');
	    if (!win) {
	        win = desktop.createWindow({
	            id: 'tajo-meta-manager-win',
	            title: MSG.MENU_TAJO_META_MANAGER,
	            width: 1250,
	            height: 700,
	            iconCls: 'desktop-tajo-small',
	            closeAction: 'hide',
	            animCollapse: false,
	            constrainHeader: true,
//	            resizable: false,
	            layout: 'fit',
	            items: [
	                Ext.create('Flamingo.view.tajo.TajoMetaManagerPanel')
	            ]
	        });
	        win.center().show();
	    }
	    win.show();
	    return win;
	},
	
	getBrowserWindow: function () {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('tajo-browser-win');
		if (!win) {
			win = desktop.createWindow({
				id: 'tajo-browser-win',
				title: MSG.MENU_TAJO_BROWSER,
				width: 915,
				height: 600,
				iconCls: 'desktop-tajo-small',
				closeAction: 'hide',
				animCollapse: false,
				constrainHeader: true,
//				resizable: false,
				layout: 'fit',
				items: [
			        Ext.create('Flamingo.view.tajo.TajoBrowserPanel')
		        ]
			});
			win.center().show();
		}
		win.show();
		return win;
	}
});