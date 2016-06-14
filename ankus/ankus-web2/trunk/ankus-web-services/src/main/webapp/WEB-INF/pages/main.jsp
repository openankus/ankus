<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>

<%@ include file="/WEB-INF/includes/header.jsp" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>Ankus framework - data mining and machine learning algorithms</title>

    <!-- ExtJS Flamingo Desktop CSS -->
    <link type="text/css" rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/lib/ext-4.2.5.1763/resources/css/ext-all-gray.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/flamingo-gray.css"/>
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/desktop.css"/>

    <!-- CodeMirror CSS -->
    <link type="text/css" rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/lib/codemirror-2.35/lib/codemirror.css"/>
    <link type="text/css" rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/lib/codemirror-2.35/lib/util/simple-hint.css"/>

    <!-- Workflow Designer CSS -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/node-list.css">
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/lib/mzext/ux/window/css/notification.css">
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/lib/ext-ux/statusbar/css/statusbar.css">

    <c:choose>
        <c:when test="${mode == 'development'}">
            <script type="text/javascript"
                    src="${pageContext.request.contextPath}/resources/lib/ext-4.2.5.1763/ext-all-debug.js"></script>
        </c:when>
        <c:otherwise>
            <script type="text/javascript"
                    src="${pageContext.request.contextPath}/resources/lib/ext-4.2.5.1763/ext-all.js"></script>
        </c:otherwise>
    </c:choose>

    <c:choose>
        <c:when test="${locale == 'Korean'}">
            <script type="text/javascript"
                    src="${pageContext.request.contextPath}/resources/lib/ext-4.2.5.1763/locale/ext-lang-ko.js"></script>
        </c:when>
        <c:when test="${locale == 'Japanese'}">
            <script type="text/javascript"
                    src="${pageContext.request.contextPath}/resources/lib/ext-4.2.5.1763/locale/ext-lang-ja.js"></script>
        </c:when>
        <c:otherwise>
            <script type="text/javascript"
                    src="${pageContext.request.contextPath}/resources/lib/ext-4.2.5.1763/locale/ext-lang-en.js"></script>
        </c:otherwise>
    </c:choose>

    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/flamingo/common/Manual.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/flamingo/common/Rest.js"></script>
    <!-- 다국어 헤더에서 정의 
    <script type="text/javascript" src="${pageContext.request.contextPath}/message/bundle"></script>
    -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/message/config"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/flamingo/common/Patch.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/flamingo/common/VTypes.js"></script>

    <!-- ExtJS Plugins -->
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/mzext/ux/window/Notification.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/ext-dynamicgrid/DynamicReader.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/ext-dynamicgrid/DynamicGrid.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/ext-base64/ext-base64.js"></script>

    <!-- Flamingo Utility -->
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/flamingo/Flamingo.Ajax.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/flamingo/Flamingo.Util.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/flamingo/Flamingo.UI.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/flamingo/common/Shortcut.js"></script>

    <!-- OpenGraph -->
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/lib/opengraph/lib/contextmenu/jquery.contextMenu.css">
    <!-- Header.jsp에서 선언 
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/opengraph/lib/jquery-1.7.2.min.js"></script>
    -->
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/opengraph/lib/ui-lightness/jquery-ui-1.8.19.custom.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/opengraph/lib/contextmenu/jquery.contextMenu-min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/opengraph/OpenGraph-0.1-SNAPSHOT.js"></script>

    <!-- Code Mirror -->
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/mzext/ux/form/field/Ext.ux.form.field.CodeMirror.411.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/codemirror-2.35/lib/codemirror.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/codemirror-2.35/mode/pig/pig.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/codemirror-2.35/lib/util/simple-hint.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/codemirror-2.35/lib/util/pig-hint.js"></script>

	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/saveSvgAsPng.js"></script>
	
	<!-- D3charts -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/d3-charts/js/d3.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/lib/d3-charts/js/nv.d3.min.js"></script>
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/lib/d3-charts/css/nv.d3.css"></script>
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/d3.custom.css"></script>

    <script type="text/javascript">
    	//console.info($user1);
        CONSTANTS.AUTH.USERNAME = '${user.username}';
        CONSTANTS.AUTH.AUTHORITY = '${user.authority}';
        CONSTANTS.AUTH.EMAIL = '${user.email}';
        CONSTANTS.AUTH.NAME = '${user.name}';
        CONSTANTS.AUTH.LANGUAGE = '${user.language}';

        CONSTANTS.CONTEXT_PATH = '${pageContext.request.contextPath}';

        log("ExtJS Ajax Caching", toBoolean(config.extjs_ajax_disable_cache));
        log('Demo Mode', toBoolean(config.demo_mode));
        log('Authority', CONSTANTS.AUTH.AUTHORITY);

        Ext.Loader.setConfig({
            enabled: true,
            disableCaching: (/^true$/i).test(config.extjs_ajax_disable_cache)
        });

        Ext.Loader.setPath({
            'Flamingo': '${pageContext.request.contextPath}/resources/flamingo',
            'Ext.ux': '${pageContext.request.contextPath}/resources/lib/ext-ux',
            'Chart': '${pageContext.request.contextPath}/resources/lib/ext4-highchart-ext/Chart',
            'D3Charts': '${pageContext.request.contextPath}/resources/lib/d3-charts',
            'WebSocket.proxy': '${pageContext.request.contextPath}/resources/lib/websocket/proxy',
            'WebSocket.manager': '${pageContext.request.contextPath}/resources/lib/websocket/manager'
        });

        Ext.require([
            'Flamingo.view.desktop.App'
        ]);

        // session save authority variable
        Ext.util.Cookies.set("Authority", CONSTANTS.AUTH.AUTHORITY);
        Ext.util.Cookies.set("Name", CONSTANTS.AUTH.USERNAME);

        // backward 방지
        Ext.EventManager.on(document, 'keydown', function (e, t) {
            if (e.getKey() == e.BACKSPACE &&
                    (!/^input$/i.test(t.tagName) || t.disabled || t.readOnly) &&
                    (!/^textarea/i.test(t.tagName) || t.disabled || t.readOnly)) {
                e.stopEvent();
            }
        });

        var desktopApp;
        Ext.onReady(function (){
            desktopApp = Ext.create('Flamingo.view.desktop.App');
            desktopApp.set_username(CONSTANTS.AUTH.USERNAME);
            Flamingo.app = desktopApp;
            Flamingo.app.controllers = new Flamingo.Util.Map();
        });
    </script>
</head>

<body>
</body>
</html>