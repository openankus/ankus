Ext.namespace('Flamingo.Ajax');

/**
 * @class Flamingo.Ajax.Request
 * @singleton
 * @author Edward KIM
 * @since 0.1
 */
Flamingo.Ajax.Request = new (function () {

    /**
     * HTTP POST Ajax 방식으로 서비스를 호출한다. 이 메소드는 XML 형식으로 요청하고 JSON 형식으로 응답을 받는다.
     *
     * @param httpUrl POST로 호출할 URL
     * @param params 요청으로 전달할 파라미터
     * @param body 요청으로 전달할 XML
     * @param onSuccess 성공시 호출하는 이벤트 콜백
     * @param onFailure 실패시 호출하는 이벤트 콜백
     */
    this.invokePostByXML = function (httpUrl, params, body, onSuccess, onFailure) {
        Ext.Ajax.request({
            url: httpUrl,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/xml; charset=utf-8;'
            },
            params: params,
            xmlData: body,
            success: onSuccess,
            failure: onFailure
        });
    },

    /**
     * HTTP POST Ajax 방식으로 서비스를 호출한다. 이 메소드는 JSON 형식으로 요청 및 응답을 주고 받는다.
     *
     * @param httpUrl POST로 호출할 URL
     * @param map 파라미터로 전달할 Key Value 형식의 Map
     * @param onSuccess 성공시 호출하는 이벤트 콜백
     * @param onFailure 실패시 호출하는 이벤트 콜백
     */
        this.invokePostByMap = function (httpUrl, map, onSuccess, onFailure) {
            Ext.Ajax.request({
                url: httpUrl,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8;'
                },
                params: Ext.encode(map),
                success: onSuccess,
                failure: onFailure
            });
        },

    /**
     * HTTP POST Ajax 방식으로 서비스를 호출한다. 이 메소드는 Text 형식으로 요청하고 JSON 형식으로 응답을 받는다.
     *
     * @param httpUrl POST로 호출할 URL
     * @param params 요청으로 전달할 파라미터
     * @param body 요청으로 전달할 Text
     * @param onSuccess 성공시 호출하는 이벤트 콜백
     * @param onFailure 실패시 호출하는 이벤트 콜백
     */
        this.invokePostByText = function (httpUrl, params, body, onSuccess, onFailure) {
            Ext.Ajax.request({
                url: httpUrl,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain; charset=utf-8;'
                },
                params: params,
                xmlData: body,
                success: onSuccess,
                failure: onFailure
            });
        },

    /**
     * HTTP POST Ajax 방식으로 서비스를 호출한다. 이 메소드는 JSON 형식으로 요청하고 JSON 형식으로 응답을 받는다.
     *
     * @param httpUrl POST로 호출할 URL
     * @param params 요청으로 전달할 파라미터
     * @param body 요청으로 전달할 JSON
     * @param onSuccess 성공시 호출하는 이벤트 콜백
     * @param onFailure 실패시 호출하는 이벤트 콜백
     */
        this.invokePostByJSON = function (httpUrl, params, body, onSuccess, onFailure) {
            Ext.Ajax.request({
                url: httpUrl,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8;'
                },
                params: params,
                xmlData: body,
                success: onSuccess,
                failure: onFailure
            });
        },

    /**
     * HTTP GET Ajax 방식으로 서비스를 호출한다. 이 메소드는 JSON 형식으로 응답을 주고 받는다.
     *
     * @param httpUrl GET로 호출할 URL
     * @param map 파라미터로 전달할 Key Value 형식의 Map
     * @param onSuccess 성공시 호출하는 이벤트 콜백
     * @param onFailure 실패시 호출하는 이벤트 콜백
     */
        this.invokeGet = function (httpUrl, map, onSuccess, onFailure) {
            Ext.Ajax.request({
                url: httpUrl,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8;'
                },
                params: map,
                success: onSuccess,
                failure: onFailure
            });
        },

    /**
     * HTTP GET Ajax 방식으로 서비스를 호출한다. 이 메소드는 JSON 형식으로 응답을 주고 받는다.
     *
     * @param httpUrl GET로 호출할 URL
     * @param headers GET로 호출시 사용할 HTTP Header
     * @param map 파라미터로 전달할 Key Value 형식의 Map
     * @param onSuccess 성공시 호출하는 이벤트 콜백
     * @param onFailure 실패시 호출하는 이벤트 콜백
     */
        this.invokeGetWithHeader = function (httpUrl, headers, map, onSuccess, onFailure) {
            Ext.Ajax.request({
                url: httpUrl,
                method: 'GET',
                headers: headers,
                params: map,
                success: onSuccess,
                failure: onFailure
            });
        }
});