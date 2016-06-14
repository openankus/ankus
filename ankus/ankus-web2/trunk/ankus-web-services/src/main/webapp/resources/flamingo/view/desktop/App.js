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

// 쿠키 생성
 function setCookie(cName, cValue, cTime){
      var expire = new Date();
     
      expire.setMilliseconds(1000)* cTime; //1초*time;
      //expire.setDate(expire.getDate() + cDay);
      cookies = cName + '=' + escape(cValue) + '; path=/ '; 
  if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
      document.cookie = cookies;
 }

 // 쿠키 가져오기
 function getCookie(cName) {
      cName = cName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cName);
  var cValue = '';
  if(start != -1){
       start += cName.length;
       var end = cookieData.indexOf(';', start);
           if(end == -1)end = cookieData.length;
           cValue = cookieData.substring(start, end);
      }
      return unescape(cValue);
 }
Ext.define('Flamingo.view.desktop.App', {
    extend: 'Flamingo.view.desktop.ux.App',
    alias: 'widget.app',

    requires: [
        'Ext.window.MessageBox',
        'Flamingo.view.desktop.ux.ShortcutModel',
        'Flamingo.view.desktop.Dashboard',
        'Flamingo.view.desktop.Designer',
        'Flamingo.view.desktop.BogusModule',
        'Flamingo.view.desktop.About',
        'Flamingo.view.desktop.Admin',
        'Flamingo.view.desktop.Settings',
        'Flamingo.view.desktop.FileSystem',
        'Flamingo.view.desktop.Visualization',
        'Flamingo.view.desktop.DBLinkTest',
        'Flamingo.view.desktop.LanguageSetting',
        'Flamingo.view.desktop.TajoBrowser',
        'Flamingo.view.desktop.Monitoring'
    ],

    init: function () {
        this.callParent(arguments);

        if (!(Ext.isIE10 || Ext.isChrome || Ext.isSafari)) {
            log('Error', 'Not supported web browser.');
        }
    },
    //2015.02.05 whitepoo@onycom.com
    //About, AccountEdit, Designer, Dashboard, Filesystem class를 생성
    getModules: function () {
        var sessionAuthority = Ext.util.Cookies.get("Authority");
        if (sessionAuthority === CONSTANTS.AUTH_ROLE_USER) {
            return [
                Ext.create('Flamingo.view.desktop.About'),
                Ext.create('Flamingo.view.desktop.AccountEdit'),   //2015.02.05 whitepoo@onycom.coom       
                Ext.create('Flamingo.view.desktop.Designer'),
                Ext.create('Flamingo.view.desktop.Dashboard'),
                Ext.create('Flamingo.view.desktop.FileSystem'),
                Ext.create('Flamingo.view.desktop.Visualization'),
                Ext.create('Flamingo.view.desktop.Monitoring'),
                Ext.create('Flamingo.view.desktop.LanguageSetting')
            //    ,Ext.create('Flamingo.view.desktop.DBLinkTest')
            ];
        } else {
            return [
                Ext.create('Flamingo.view.desktop.About'),
                Ext.create('Flamingo.view.desktop.AccountEdit'),//2015.02.05 whitepoo@onycom.coom
                Ext.create('Flamingo.view.desktop.Designer'),
                Ext.create('Flamingo.view.desktop.Dashboard'),
                Ext.create('Flamingo.view.desktop.FileSystem'),
                Ext.create('Flamingo.view.desktop.Admin'),
                Ext.create('Flamingo.view.desktop.Visualization'),
                Ext.create('Flamingo.view.desktop.TajoBrowser'),
                Ext.create('Flamingo.view.desktop.Monitoring'),
                Ext.create('Flamingo.view.desktop.LanguageSetting')
              //   ,Ext.create('Flamingo.view.desktop.DBLinkTest')
            ];
        }
    },
	
	//바탕화면에 About, AccountEdit, Designer, Dashboard, Filesystem 바로 가기 아이콘 생성
	//module 이름과 class에 정의된 id가 같아야 함.
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
        var sessionAuthority = Ext.util.Cookies.get("Authority");
     
        // Check user authority - are you admin? you can change authority anyone to the user management menu
        if (sessionAuthority === CONSTANTS.AUTH_ROLE_USER) {
            return Ext.apply(ret, {
                contextMenuItems: [
                    { text: MSG.DESKTOP_CHANGE_SETTINGS, handler: me.onSettings, scope: me }
                ],

                shortcuts: Ext.create('Ext.data.Store', {
                    model: 'Flamingo.view.desktop.ux.ShortcutModel',
                    data: [
                        { name: 'Ankus Analyzer', iconCls: 'desktop-workflow', module: 'designer-win'},
                        //2015.02.05 whitepoo@onycom.coom
                        { name: MSG.MENU_MY_INFO, iconCls: 'desktop-user', module: 'accountedit-win'},                        
                        { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard', module: 'dashboard-win'},
                        { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs', module: 'fs-hdfs-win'},
                        { name: 'Visual', iconCls: 'desktop-visualization', module: 'visualization-win' },
                        { name: MSG.MENU_MONITORING, iconCls: 'desktop-monitoring', module: 'monitoring-win' }
                        //,{ name: 'DBLink',  iconCls: 'desktop-DBLink', module: 'DBLinkTest_Classs' }//DBLINK TEST WHITEPOO
                    ]
                }),

                wallpaper: CONSTANTS.DEFAULT_WALLPAPER,
                wallpaperStretch: true
            });
        } else {
            return Ext.apply(ret, {
                contextMenuItems: [
                    { text: MSG.DESKTOP_CHANGE_SETTINGS, handler: me.onSettings, scope: me }
                ],

                shortcuts: Ext.create('Ext.data.Store', {
                    model: 'Flamingo.view.desktop.ux.ShortcutModel',
                    data: [
                        { name: 'Ankus Analyzer', iconCls: 'desktop-workflow', module: 'designer-win'},
                        //2015.02.05 whitepoo@onycom.coom
                        { name: MSG.MENU_MY_INFO, iconCls: 'desktop-user', module: 'accountedit-win'},                       
                        { name: MSG.MENU_USER_MANAGEMENT, iconCls: 'desktop-usermgr', module: 'user-win'},
                        { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard', module: 'dashboard-win'},
                        { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs', module: 'fs-hdfs-win'},
                        { name: 'Visual', iconCls: 'desktop-visualization', module: 'visualization-win' },
                        { name: MSG.MENU_TAJO_BROWSER, iconCls: 'desktop-tajo', module: 'tajo-browser-win' },
                        { name: MSG.MENU_MONITORING, iconCls: 'desktop-monitoring', module: 'monitoring-win' }
                       //  ,{ name: 'DBLink',  iconCls: 'desktop-DBLink', module: 'DBLinkTest_Classs' }//DBLINK TEST WHITEPOO
                    ]
                }),

                wallpaper: CONSTANTS.DEFAULT_WALLPAPER,
                wallpaperStretch: true
            });
        }
    },
    //2015.01.30 whitepoo@onycom.com
    user_name:'',
    set_username:function(name)
    {
    	setCookie('user_name',name, 60);
    	
    	if(name.length==0)
    		this.user_name = 'Unknown';
    	else
    		this.user_name = name;
    },
    // config for the start menu
    getStartConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: this.user_name,//2015.01.30 whitepoo@onycom.com
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text: MSG.COMMON_SIGNOUT,
                        iconCls: 'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },
	//윈도우 하단(taskbar)에 About, AccountEdit, Designer, Dashboard, Filesystem 메뉴 생성.
	//module 이름과 class에 정의된 id가 같아야 함.
    getTaskbarConfig: function () {
        var ret = this.callParent();
        var sessionAuthority = Ext.util.Cookies.get("Authority");

        if (sessionAuthority === CONSTANTS.AUTH_ROLE_USER) {
            return Ext.apply(ret, {
                width: 50,
                quickStart: [
                    // { name: MSG.DESKTOP_HIVE_EDITOR, iconCls: 'icon-grid', module: 'hive-query-win' },
                    { name: 'Ankus Analyzer', iconCls: 'desktop-workflow-small', module: 'designer-win' },
                    //2015.02.05 whitepoo@onycom.coom
                    { name: MSG.MENU_MY_INFO, iconCls: 'desktop-user-small', module: 'accountedit-win' },                   
                    { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard-small', module: 'dashboard-win' },
                    { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs-small', module: 'fs-hdfs-win' },
                    { name: 'Visual', iconCls: 'desktop-visualization-small', module: 'visualization-win' },
                    { name: MSG.MENU_MONITORING, iconCls: 'desktop-monitoring-small', module: 'monitoring-win' }
                  //  ,{ name: 'DBLink',  iconCls: 'desktop-DBLink-small', module: 'DBLinkTest_Classs' }//DBLINK TEST WHITEPOO
                ]
                ,trayItems: [
                    { xtype: 'trayclock', flex: 1 }
                ]
            });
        } else {
            return Ext.apply(ret, {
                width: 50,
                quickStart: [
                    // { name: MSG.DESKTOP_HIVE_EDITOR, iconCls: 'icon-grid', module: 'hive-query-win' },
                    { name: 'Ankus Analyzer', iconCls: 'desktop-workflow-small', module: 'designer-win' },
                    //2015.02.05 whitepoo@onycom.coom
                    { name: MSG.MENU_MY_INFO, iconCls: 'desktop-user-small', module: 'accountedit-win' },                    
                    { name: MSG.MENU_USER_MANAGEMENT, iconCls: 'desktop-usermgr-small', module: 'user-win' },
                    { name: MSG.MENU_WF_DASHBOARD, iconCls: 'desktop-dashboard-small', module: 'dashboard-win' },
                    { name: MSG.DESKTOP_FS_BROWSER, iconCls: 'desktop-hdfs-small', module: 'fs-hdfs-win' },
                    { name: 'Visual', iconCls: 'desktop-visualization-small', module: 'visualization-win' },
                    { name: MSG.MENU_TAJO_BROWSER, iconCls: 'desktop-tajo-small', module: 'tajo-browser-win' },
                    { name: MSG.MENU_MONITORING, iconCls: 'desktop-monitoring-small', module: 'monitoring-win' }
                //    ,{ name: 'DBLink',  iconCls: 'desktop-DBLink-small', module: 'DBLinkTest_Classs' }//DBLINK TEST WHITEPOO
                ],
                trayItems: [
                    { xtype: 'trayclock' }
                ]
            });
        }
    },

    onLogout: function () {
        Ext.Msg.confirm(MSG.COMMON_SIGNOUT, MSG.DIALOG_MSG_LOG_OUT,
            function (btn) {
                if (btn === 'yes') {
                    window.location = '/logout';
                }
            }
        );
    },

    onSettings: function () {
        var dlg = Ext.create('Flamingo.view.desktop.Settings', {
            desktop: this.desktop
        });
        dlg.show();
    }
});