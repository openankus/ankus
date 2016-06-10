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
package org.openflamingo.web.menu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/menu")
public class MenuController {

    private Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private MenuService menuService;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView build(HttpServletRequest request, HttpServletResponse response) {
        String topCode = getTopCode(request);
        String subCode = getSubCode(request);

        Menu menu = menuService.getMenu(topCode, subCode);

        ModelAndView view = new ModelAndView(menu.getUrl());
        String menuLabel = menu.getLabel();

        logger.debug("Menu :: Label = {}, Top = {}, Sub = {}", new String[]{
                menuLabel, topCode, subCode
        });

        view.addObject("menuMap", menuService.getMenu(menu));
        view.addObject("currentTopMenu", menuService.getMenu(topCode, ""));
        view.addObject("currentSubMenu", menuService.getMenu(topCode, subCode));
        view.addObject("menu", menu);
        view.addObject("topCode", topCode);
        view.addObject("subCode", subCode);

        return view;
    }

    String getTopCode(HttpServletRequest request) {
        if (StringUtils.isEmpty(request.getParameter("T"))) {
            throw new IllegalArgumentException("Menu Parameter 'T' are required.");
        }
        return request.getParameter("T");
    }

    String getSubCode(HttpServletRequest request) {
        if (StringUtils.isEmpty(request.getParameter("S"))) {
            return "";
        }
        return request.getParameter("S");
    }
}
