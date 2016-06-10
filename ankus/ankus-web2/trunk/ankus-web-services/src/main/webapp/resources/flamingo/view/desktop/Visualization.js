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

Ext.define('Flamingo.view.desktop.Visualization', {   
	extend: 'Flamingo.view.desktop.ux.Module',
    
    requires: [
       'Flamingo.view.visualization.Viewport',
       
       //, 'Flamingo.view.visualization.visualPanel'
    ],
    
    id: 'visualization-win',
    
    tipWidth: 160,
    tipHeight: 96,
    
//    controllers: ['Flamingo.controller.visualization.VisualController'],  
    
    init: function () {
//        this.registControllers();

        this.launcher = {
            text: 'Ankus Visualization',
            iconCls: 'bogus'
        }
    },
    
    createWindow: function () {
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.id);

        if (!win) {
            win = desktop.createWindow({
                id: 'visualization-win',
                title: 'Ankus Visualization',
                width: 1000,
                height: 600,
                minHeight: 600,
    		    maxHeight: 600,
                iconCls: 'desktop-visualization-small',
                closeAction: 'hide',
                animCollapse: false,
                border: false,
                layout: 'fit',
                items: {
                    xtype: 'visualizationViewport'
                }
            });
        }

        return win;
    }
});
//