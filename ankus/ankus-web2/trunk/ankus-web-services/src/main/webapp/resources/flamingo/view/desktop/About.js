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

Ext.define('Flamingo.view.desktop.About', {
    extend: 'Flamingo.view.desktop.ux.Module',

    windowId: 'about-window',

    tipWidth: 160,
    tipHeight: 96,

    init: function () {
        this.launcher = {
            text: 'About ankus',
            iconCls: 'video'
        }
    },

    createWindow: function () {
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                id: me.windowId,
                title: 'About ankus',
                width: 450,
                height: 340,
                resizable: false,
                maximizable: false,
                iconCls: 'video',
                animCollapse: false,
                border: false,
//                manual: MANUAL.ABOUT,
                layout: 'fit',
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {
                                    width: '100%'
                                }
                            }
                        },
                        width: '100%',
                        padding: 5,
                        border: 0,
                        style: {
                            background: '#ffffff'
                        },
                        defaults: {
                            xtype: 'displayfield',
                            cls: 'about-window-field'
                        },
                        items: [
                            {
                                xtype: 'component',
                                cls: 'about-window-logo',
                                height: 140,
                                colspan: 2
                            },
                            /*
                            {
                                fieldLabel: MSG.COMMON_VERSION,
                                labelWidth: 45,
                                value: '<b> 0.2.2 </b>',
                                tdAttrs: {
                                    align: 'center'
                                },
                                colspan: 4
                            },
                            */
                            {
                                colspan: 2
                            },
                            {	
                            	xtype:'button',                            	
                            	text:'google groups',                            	
                            	cls:'about-btn-size',                            	
                            	iconCls:'google',   
                            	width : 120,
                            	tdAttrs: {align: 'center'},
                                href: 'https://groups.google.com/forum/?hl=ko#!forum/open-ankus-user-group'                               
                            },
                            {
                            	xtype:'button',                            	
                            	text:'community',
                            	cls:'about-btn-size',
                            	iconCls:'facebook',   
                            	width : 120,
                            	tdAttrs: {align: 'center'},
                                href: 'https://www.facebook.com/groups/openankus' 
                            },
                            {
                                colspan: 2
                            },
                            {
                            	xtype:'button',                            	
                            	text:'ankus wiki',
                            	cls:'about-btn-size',
                            	iconCls:'wiki',    
                            	width : 120,
                            	tdAttrs: {align: 'center'},
                                href: 'http://openankus.org'  
                            },
                            {
                            	xtype:'button',                            	
                            	text:'community(eng)',
                            	cls:'about-btn-size',
                            	iconCls:'facebook',  
                            	width : 120,
                            	tdAttrs: { align: 'center'},
                                href: 'https://www.facebook.com/openankus' 
                             },
                            {
                                xtype: 'component',
                                html: ' ',
                                colspan: 2,
                                height: 20
                             },     
                            {
                                value: '© Ankus Community',
                                tdAttrs: {
                                    align: 'center'
                                },                               
                                colspan: 2
                            }
                        ]
                    }
                ]
            });
        }

        return win;
    }
});

