Ext.define('Flamingo.view.desktop.Monitoring', {
    extend: 'Flamingo.view.desktop.BogusModule',

    requires: [
           'Flamingo.view.designer.Viewport',
           'Flamingo.view.dashboard.Viewport'
    ],

    id: 'monitoring-win',
    
    createWindow: function (src) {
        return this.getDefaultWindow();
    },

    getDefaultWindow: function () {
        return this.getMonitoringWindow();
    },
    
    init: function () {
        this.launcher = {
            text: MSG.MENU_MONITORING,
            iconCls: 'bogus'
        };
    },

    getMonitoringWindow: function () {
	    var desktop = this.app.getDesktop();
	    var win = desktop.getWindow('monitoring-win');
	    if (!win) {
	        win = desktop.createWindow({
	            id: 'monitoring-win',
	            title: MSG.MENU_MONITORING,
	            width: 1010,
	            height: 700,
	            iconCls: 'desktop-monitoring-small',
	            closeAction: 'hide',
	            animCollapse: false,
	            constrainHeader: true,
//	            resizable: false,
	            layout: 'fit',
	            items: [
	                Ext.create('Flamingo.view.monitoring.MonitoringPanel')
	            ]
	        });
	        win.center().show();
	    }
	    win.show();
	    return win;
	}
	
});