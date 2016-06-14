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

Ext.define('Flamingo.view.desktop.LanguageSetting', {
    extend: 'Flamingo.view.desktop.BogusModule',

    id: 'language_setting',

    init: function () {

        this.launcher = {
            text: MSG.MENU_LANGUAGES,
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
                        text: MSG.MENU_S_KOREA,
                        iconCls: 'bogus',
                        handler: function (src) {
                        	this.updateLanguage("ko");
                        },
                        scope: this
                    }, 
                    {
                        text: MSG.MENU_S_ENGLISH,
                        iconCls: 'bogus',
                        handler: function (src) {
                        	this.updateLanguage("en");
                        },
                        scope: this
                    }                 
                ]
            }
        };
    },
    updateLanguage:function(language){
    	Ext.Ajax.request({
			url:CONSTANTS.UPDATE_USER_LANGUAGE,
			method:"POST",
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8;'
            },
            jsonData:{
            	'username' : CONSTANTS.AUTH.USERNAME,
            	'language' : language
            },     	
			success:function(result, request){
				var jsonData = Ext.decode(result.responseText);
				console.log(jsonData);
				if(jsonData.success == true){
					CONSTANTS.AUTH.LANGUAGE = language;
					//console.log(CONSTANTS.AUTH.LANGUAGE);
					Ext.util.Cookies.set("language", CONSTANTS.AUTH.LANGUAGE);
					location.reload();
				}
			},
			failure: function( result, request ){
				Ext.Msg.alert( "Failed", result.responseText );
			}
		});
    }
});
