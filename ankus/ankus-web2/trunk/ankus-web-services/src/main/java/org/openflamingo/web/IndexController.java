/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.openflamingo.web;

import static java.lang.Math.abs;
import static java.lang.Math.min;
import static java.lang.Math.pow;
import static java.lang.Math.random;
import static java.lang.Math.round;
import static org.apache.commons.lang.StringUtils.leftPad;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.openflamingo.model.rest.Response;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.web.core.ConfigurationHelper;
import org.openflamingo.web.member.Member;
import org.openflamingo.web.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

/**
 * 인덱스 페이지 및 기본적인 페이지 이동 기능을 제공하는 컨트롤러.
 */
@Controller
@RequestMapping("/")
public class IndexController {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(IndexController.class);

    /**
     * Memberd Service
     */
    @Autowired
    private MemberService memberService;

    /**
     * 인덱스 페이지로 이동한다.
     *
     * @return Model And View
     */
    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView("/index");
        mav.addObject("locale", ConfigurationHelper.getHelper().get("application.locale", "English"));
        mav.addObject("mode", ConfigurationHelper.getHelper().get("application.mode", "development"));

        mav.addObject("version", ConfigurationHelper.getHelper().get("version"));
        mav.addObject("timestamp", ConfigurationHelper.getHelper().get("build.timestamp"));
        mav.addObject("buildNumber", ConfigurationHelper.getHelper().get("build.number"));
        mav.addObject("revision", ConfigurationHelper.getHelper().get("revision.number"));
        mav.addObject("buildKey", ConfigurationHelper.getHelper().get("build.key"));
        return mav;
    }
  
    /**
     * 사용자 계정에 비밀번호가 맞는지를 판단한다.
     * @param uesr_id
     * @param passwd
     * @return code 0:성공,-100:파라미터없음,-101:비밀번호틀림
     */
    @RequestMapping(value = "edit_authenticate", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response edit_authenticate(@RequestParam(value = "id") String uesr_id,
    		@RequestParam(value = "passwd") String passwd){
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try{
            if((uesr_id.length() == 0) || (passwd.length() == 0)){
            	resCode = -100;
            	resMessage = "Please insert Username and Password";
            }else{
            	int rc = memberService.existMember(uesr_id, passwd);
            	if(rc > 0){
            		response.setSuccess(true);
            		resMessage = "SUCCESS";
            		resCode = 0;
            	}else{
            		resCode = -101;
            		resMessage = "Your passward is not corrected";
            	}
            }
        }
        catch (Exception ex){ 
        }
        map.put("code", resCode);
		map.put("message", resMessage);
        response.setMap(map);
        return response;
    }
    
    /**
     * 로그인  처리를 한 후 메인 페이지로 이동한다.
     * @param request 
     * @param param uname:아이디, pwd:비밀번호
     * @return code 0:성공, -100:아이디,비번입력값 없음, -101:등록된 사용자 아님, -102:권한 없는사용자, -103:비밀번호틀림
     *               -104:DB연결 오류, -105:인증과정문제
     */
   @RequestMapping(value = "authenticate", method = RequestMethod.POST)
   @ResponseStatus(HttpStatus.OK)
   @ResponseBody
   public Response authenticate(HttpServletRequest request, @RequestBody Map<String, String> param){
		Response response = new Response();
		HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
		boolean isdbconnect = false;
		try {
			String uname = param.get("username".toString());
			String pwd = param.get("password").toString();
			if ((uname.length() == 0) | (pwd.length() == 0)) {
				resCode = -100;
				resMessage = "Please insert Username and Password";
			} else {
				Member member = memberService.getMemberByUser(param.get("username"));
				isdbconnect = true;

				if (member == null) { // 회원정보 없음
					resCode = -101;
					resMessage = "You are not registered.";
					// response.getError().setMessage("등록된 사용자가 아닙니다.");
				} else {
					if (member.getPassword().equals(param.get("password"))) {
						if (member.isEnabled() == true) { // 권한있음&로그인 성공
							response.setSuccess(true);
							resCode = 0;
							resMessage = "Login Success";

							memberService.updateByLastLogin(uname); // 마지막 로그인 시간 업데이트
							HttpSession session = request.getSession(true);

							session.setAttribute("user", member);
							// 2015.01.30 whitepoo@onycom.com
							// session.setAttribute("authority",
							// member.getAuthority());
							// session.setAttribute("username",
							// member.getUsername());
							// session.setAttribute("login", new Date());
							logger.info("'{}' 사용자의 세션을 생성했습니다.", member.getUsername());
						} else { // 권한 없음
							resCode = -102;
							resMessage = "You don't have permission to access.";
							// response.getError().setMessage("허가된 사용자가 아닙니다.");
						}
					} else {
						// response.getError().setMessage("패스워드가 정확하지 않습니다..");
						resCode = -103;
						resMessage = "Your passward is not corrected.";
					}
				}
			}
		} catch (Exception ex) {
			if (isdbconnect == false) {
				resCode = -104;
				resMessage = "A problem occurred accessing the authentication database.";
				// response.getError().setMessage("인증 데이터베이스에 문제가 발생했습니다.");
				logger.info(ex.toString());
			} else {
				// response.getError().setMessage("사용자 인증 과정에 문제가 발생했습니.");
				resCode = -105;
				resMessage = "An error occured during the authentication process.";
				logger.info(ex.toString());
			}
		} 
		
		map.put("code", resCode);
		map.put("message", resMessage);
		response.setMap(map);
		return response;
   }
   
    /**
     * 로그아웃 처리를 한 후 메인 페이지로 이동한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public ModelAndView logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();
        session = null;
        return new ModelAndView("/index");
    }

    /**
     * 메인 페이지로 이동한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView login(HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session == null) {
            return new ModelAndView("/index");
        }

        if (session.getAttribute("user") == null) {
            return new ModelAndView("/index");
        }

        ModelAndView mav = new ModelAndView("/main");
        Member member = memberService.getMemberByUser(((Member)session.getAttribute("user")).getUsername());
        mav.addObject("user", member);
        return mav;
    }

    /**
     * Username 과 Password 로 Email 을 조회한다.
     *
     * @param param
     * @return code 0:성공,-100:이메일사용자없음,-101:비밀번호틀림
     */
    @RequestMapping(value = "/finduser", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response findemail(@RequestBody Map<String, String> param) {
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try {
            String email = param.get("email");
            String password = param.get("password");

            Member member = memberService.getMemberByEmail(email);
            if (member == null) {
            	resCode = -100;
            	resMessage = "There is no email address. NOW you can join us!";
            }else{
            	if (member.getPassword().equals(password)) {
            		response.setSuccess(true);
            		response.setObject(member.getUsername());
            		resCode = 0;
            		resMessage = "SUCCESS";
            	}else{
            		resCode = -101;
                	resMessage = "Sorry, email and password are unmatched. Please try again.";
            	}
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        map.put("code", resCode);
        map.put("message", resMessage);
        response.setMap(map);
        return response;
    }

    /*
     username과 email을 받아 일치하는 것이 username이 있으면 password를 random code로 변경하고
     해당 code를 사용자에게 보여준다.
     2015.02.02
     whitepoo@onycom.com
     */
    /**
     * 비밀번호 찾기 임시비밀번호를 발송한다.
     * @param param
     * @return 
     */
    @RequestMapping(value = "/findpass", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response findpass(@RequestBody Map<String, String> param) {
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try {
            String username = param.get("username");
            String email = param.get("email");
            
            Member member = memberService.getMemberByPassword(username, email);
            
            if(member == null){//username or email이 틀릴때.
            	resCode = -100;
            	resMessage = "Sorry, username and E-mail address are unmatched!";
            } else {
    			String newPasswd =gen(5);
    			memberService.updateByPassword(username, newPasswd);
    	        response.setSuccess(true);
                response.setObject(newPasswd);
                resCode = 0;
                resMessage = "SUCCESS";
            }
        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        map.put("code", resCode);
        map.put("message", resMessage);
        response.setMap(map);
        return response;
    }
    public  String gen(int length) {
        StringBuffer sb = new StringBuffer();
        for (int i = length; i > 0; i -= 12) {
          int n = min(12, abs(i));
          sb.append(leftPad(Long.toString(round(random() * pow(36, n)), 36), n, '0'));
        }
        return sb.toString();
      }
    
    /**
     * 신규 Member 를 등록한다.
     *
     * @param param
     * @return code 0:성공, -100:아이디존재, -101:이메일존재
     */
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response signup(@RequestBody Map<String, String> param) {
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try {
            String username = param.get("username");
            int existUsername = memberService.existUsername(username);

            if (existUsername > 0) {
            	resCode = -100;
            	resMessage = "ID '" + username + "' already exists!";
            }else{
            	String email = param.get("email");
            	if (email != null && !email.isEmpty()) {
            		int count = memberService.getEmailCount(email);
            		if (count > 0) {
            			resCode = -101;
                    	resMessage = "Email already exists!";
            		}else{
            			resCode = 0;
            			resMessage = "SUCCESS";
            			
            			Member member = new Member();
            			member.setUsername(username);
            			member.setPassword(param.get("password"));
            			member.setName(param.get("username"));
            			member.setEmail(param.get("email"));
            			member.setAuthority("ROLE_USER");
            			member.setLanguage(param.get("language"));
            			
            			memberService.registerMember(member);
            			response.setSuccess(true);
            		}
            	}
            	
            }


        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        map.put("code", resCode);
        map.put("message", resMessage);
        response.setMap(map);
        return response;
    }

    /**
     * 전체 Member 목록을 가져온다.
     *
     * @param param
     * @return
     */
    @RequestMapping(value = "/getMembers", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getMembers(@RequestBody Map<String, String> param) {
        Response response = new Response();

        try {
            List<Member> members = memberService.getMembers(param);
            response.setSuccess(true);

        } catch (Exception ex) {
            ex.printStackTrace();
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }

    /**
     * 지정한 페이지로 리다이렉트한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "redirect", method = RequestMethod.GET)
    public ModelAndView redirect(@RequestParam String redirect) {
        return new ModelAndView("redirect:" + redirect);
    }

    /**
     * 지정한 페이지로 포워딩한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "forward", method = RequestMethod.GET)
    public ModelAndView forward(@RequestParam String redirect) {
        return new ModelAndView("forward:" + redirect);
    }
    
    /**
     * Member에 언어 설정
     * @param param
     * @return
     */
    @RequestMapping(value = "/updateLanguage", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateLanguage(@RequestBody Map<String, String> param) {
    	Map<String, Object> res = new HashMap<String, Object>();

        try {
        	int result = memberService.updateByLanguage(param.get("username"), param.get("language"));
        	res.put("success", true);
        	res.put("data", param.get("language"));
        } catch (Exception ex) {
            ex.printStackTrace();
            res.put("success", false);
        }

        return res;
    }

}
