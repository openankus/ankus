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
package org.openflamingo.engine.admin;

import org.openflamingo.fs.local.LocalFileInfo;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.provider.engine.AdminService;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AdminServiceImpl implements AdminService {

    @Override
    public List<FileInfo> getDirectoryAndFiles(String path) {
        List<FileInfo> fileinfos = new ArrayList<FileInfo>();

        // Hidden 파일이 아닌 경우에만 UI에서 표시한다.
        String[] files = new File(path).list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return !new File(dir, name).isHidden();
            }
        });

        // 파일 이름을 순서대로 정렬한다.
        Arrays.sort(files);
        for (String file : files) {
            File f = new File(path, file);
            fileinfos.add(new LocalFileInfo(f));
        }
        return fileinfos;
    }
}
