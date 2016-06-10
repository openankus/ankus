<!-- jquery i18n 다국어 -->
<script type="text/javascript" src="./resources/lib/opengraph/lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="./resources/lib/jquery/jquery.i18n.properties.js"></script>
<script type="text/javascript" >
	$(function (){
		var lang = Ext.util.Cookies.get("language");
		if(lang === null){
			lang = window.navigator.userLanguage || window.navigator.language;
			
			// 한국어,영어만 지원 다른 언어인 경우는 영어 디폴트
			if(lang === undefined){
				lang = "en";
			}else{
				lang = lang.substring(0, 2);
				if(lang === "ko" || lang === "en"){
				}else{
					lang = "en";	
				}
			}
			Ext.util.Cookies.set("language", lang);
		}
		
		// DB에 저장된 언어 설정하기
		if(CONSTANTS.AUTH.LANGUAGE !== undefined){
			if(CONSTANTS.AUTH.LANGUAGE.length > 0){
				lang = CONSTANTS.AUTH.LANGUAGE;
				Ext.util.Cookies.set("language", lang);
			}
		}
		
        // 다국어 설정
        jQuery.i18n.properties({
            name:'messages', 
            path:'resources/language/', 
            mode:'map',
        	language:lang, 
        	heckAvailableLanguages: true,
        	async: false,
            callback: function() {
            	MSG = $.i18n.map;
            	
            	// DB에 언어 저장하기
        		if(CONSTANTS.AUTH.LANGUAGE !== undefined){
        			if(CONSTANTS.AUTH.LANGUAGE.length > 0){
        				lang = CONSTANTS.AUTH.LANGUAGE;
        			}
        		}
        	}
        });
	});
</script>