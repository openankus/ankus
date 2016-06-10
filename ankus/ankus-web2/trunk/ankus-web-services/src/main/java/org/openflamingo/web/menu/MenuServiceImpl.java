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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public Map<String, List<Menu>> getMenu(Menu menu) {
        Map<String, List<Menu>> menuMap = new HashMap<String, List<Menu>>();
        if (menu.depth == 2)
            menu = menuRepository.selectMenu(menu.parentId);

        menuMap.put("userMenu", menuRepository.selectUserMenu());
        menuMap.put("topMenu", menuRepository.selectTopMenu());
        menuMap.put("subMenu", menuRepository.selectSubMenu(menu.menuId));

        return menuMap;
    }

    @Override
    public Menu getMenu(String topCode, String subCode) {
        return menuRepository.selectMenuByCode(topCode, subCode);
    }
}
