<%@ page contentType="text/html; charset=UTF-8" language="java" trimDirectiveWhitespaces="true" %>

<%@ include file="/WEB-INF/includes/header.jsp" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Ankus framework - data mining and machine learning algorithms</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- For sample logo only-->
    <!--Remove if you no longer need this font-->
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Aguafina+Script">
    <!--For sample logo only-->

    <%--
        <link rel="stylesheet" type="text/css"
              href="${pageContext.request.contextPath}/resources/lib/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" type="text/css"
              href="${pageContext.request.contextPath}/resources/lib/font-awesome/css/font-awesome.css">

        <script src="${pageContext.request.contextPath}/resources/lib/jquery-1.11.0.min.js" type="text/javascript"></script>
    --%>

    <!-- CANNOT SEARCH ON WWW
    <script src="${pageContext.request.contextPath}/resources/lib/awesome/build/javascripts/site.js"
            type="text/javascript"></script>

    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/lib/awesome/build/stylesheets/theme.css">
    -->

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">


    <!-- COPIED FROM index.jsp -->
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
            'Flamingo.view.desktop.FindPass'
        ]);

        Ext.onReady(function () {
            var findPassApp = Ext.create('Flamingo.view.desktop.FindPass');
            Flamingo.app = findPassApp;
            Flamingo.app.controllers = new Flamingo.Util.Map();
            findPassApp.center().show();
        });
    </script>


</head>
<body>
</body>
</html>