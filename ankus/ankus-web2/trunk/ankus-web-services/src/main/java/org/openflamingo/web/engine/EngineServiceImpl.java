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
package org.openflamingo.web.engine;

import java.util.List;

import org.openflamingo.core.exception.SystemException;
import org.openflamingo.model.rest.Engine;
import org.openflamingo.web.core.LocaleSupport;
import org.openflamingo.web.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EngineServiceImpl extends LocaleSupport implements EngineService {

    @Autowired
    private EngineRepository engineRepository;

    @Override
    public boolean removeEngine(Long id) {
        boolean deleted = engineRepository.delete(id) > 0;
        if (!deleted) {
            throw new SystemException(message("S_ENGINE", "CANNOT_REMOVE", null));
        }else{ // 삭제 성공
        	// 엔진에 설정된 권한 삭제
        	engineRepository.deletePermission(id);
        }
        return deleted;
    }

    @Override
    public List<Engine> getEngines(Member member) {
        return engineRepository.selectAll(member);
    }

    @Override
    public boolean addEngine(Engine engine) {
        boolean inserted = engineRepository.insert(engine) > 0;
        if (!inserted) {
            throw new SystemException(message("S_ENGINE", "CANNOT_INSERT", null));
        }else{
        	addPermissions(engine);
        }
        return inserted;
    }

    @Override
    public Engine getEngine(Long serverId) {
        Engine selected = engineRepository.select(serverId);
        if (selected == null) {
            throw new SystemException(message("S_ENGINE", "NOT_FOUND_ENGINE", null));
        }
        return selected;
    }
    
    @Override
    public boolean updateEngine(Engine engine) {
        boolean updated = engineRepository.update(engine) > 0;
        if (!updated) {
            throw new SystemException("updateEngine Error");
        }else{ // 삭제 성공
        	// 엔진에 설정된 권한 삭제
        	engineRepository.deletePermission(engine.getId());
        	addPermissions(engine);
        }
        return updated;
    }
    
    /**
     * 엔진에서 사용자별 권한인 경우 권한에 사용자 추가
     * @param engine
     */
    private void addPermissions(Engine engine){
    	if(engine.getIsPublic() == 0){ // 권한 선택 공개이면 엔진에 대한 권한 추가
    		String permission = engine.getPermission();
    		if(permission != null){
    			String[] userNames = permission.split("\\,");
    			for(int i=0; i<userNames.length; i++){ // 엔진과 권한사용자를 매핑해서 DB에 Add한다.
    				engineRepository.addPermission(engine.getId(), userNames[i]);
    			}
    		}
    	}
    }
    
}
