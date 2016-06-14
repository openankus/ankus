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
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/flamingo/common/Rest.js"></script>
    <!-- 다국어 헤더에서 정의 
    <script type="text/javascript" src="${pageContext.request.contextPath}/message/bundle"></script>
    -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/message/config"></script>

    <!-- Flamingo Utility -->
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/flamingo/Flamingo.Ajax.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/flamingo/Flamingo.Util.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/lib/flamingo/Flamingo.UI.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/flamingo/common/Shortcut.js"></script>
    <script type="text/javascript">
        Ext.Loader.setPath({
            'Flamingo': '${pageContext.request.contextPath}/resources/flamingo'

        });

        Ext.require([
            'Flamingo.view.desktop.Login'
        ]);

        Ext.onReady(function () {
            var desktopApp = Ext.create('Flamingo.view.desktop.Login');
            Flamingo.app = desktopApp;
            Flamingo.app.controllers = new Flamingo.Util.Map();
            desktopApp.center().show();
        });
    </script>
</head>
<body>
</body>
</html>