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
// Global Function
//////////////////////////////

var log = Flamingo.UI.log;
var newHelp = Flamingo.UI.newHelp;
var query = Flamingo.UI.query;

var wrap = Flamingo.Util.String.wrap;
var trim = Flamingo.Util.String.trim;
var escapeHTML = Flamingo.Util.String.escapeHTML;
var isBlank = Flamingo.Util.String.isBlank;
var replaceAll = Flamingo.Util.String.replaceAll;
var startsWith = Flamingo.Util.String.startsWith;
var endsWith = Flamingo.Util.String.endsWith;
var occurrence = Flamingo.Util.String.occurrence;
var toCommaNumber = Flamingo.Util.String.toCommaNumber;
var toBoolean = Flamingo.Util.Lang.toBoolean;
var format = Ext.String.format;

var invokePostByMap = Flamingo.Ajax.Request.invokePostByMap;
var invokeGet = Flamingo.Ajax.Request.invokeGet;
var invokePostByJSON = Flamingo.Ajax.Request.invokePostByJSON;
var invokeGetWithHeader = Flamingo.Ajax.Request.invokeGetWithHeader;

var msg = Flamingo.UI.msgPopup;
var info = Flamingo.UI.infomsg;
var error = Flamingo.UI.errormsg;
