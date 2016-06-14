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
package org.openflamingo.provider.fs;

import org.openflamingo.model.rest.Context;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.model.rest.FileSystemCommand;

import java.util.List;
import java.util.Map;

/**
 * Apaceh Hadoop HDFS File System Service Interface.
 *
 * @author Byoung Gon, Kim
 * @since 0.4
 */
public interface FileSystemService {

    /**
     * 사용자 디렉토리를 초기화한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     */
    void initializeUser(Context context, FileSystemCommand command);

    /**
     * 디렉토리 목록을 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 목록
     */
    List<FileInfo> getDirectories(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 생성한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 생성 여부
     */
    boolean createDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 삭제한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 삭제 여부
     */
    boolean deleteDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리명을 변경한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리명 변경 여부
     */
    boolean renameDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 이동한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 이동 여부
     */
    boolean moveDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 복사한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 복사 여부
     */
    boolean copyDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리의 정보를 확인한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 정보 확인 여부
     */
    FileInfo getFileInfo(Context context, FileSystemCommand command);

    /**
     * 파일 목록을 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 파일 목록
     */
    List<FileInfo> getFiles(Context context, FileSystemCommand command);

    /**
     * 파일명을 변경한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 변경 여부
     */
    boolean renameFile(Context context, FileSystemCommand command);

    /**
     * 파일을 복사한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 실패한 파일 목록
     */
    List<String> copyFiles(Context context, FileSystemCommand command);

    /**
     * 파일을 이동한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 실패한 파일 목록
     */
    List<String> moveFiles(Context context, FileSystemCommand command);

    /**
     * 파일을 삭제한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 실패한 파일 목록
     */
    List<String> deleteFiles(Context context, FileSystemCommand command);

    /**
     * 파일 정보를 확인한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 확인 여부
     */
    FileInfo infoFile(Context context, FileSystemCommand command);

    /**
     * 파일을 저장한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 파일 업로드 여부
     */
    boolean save(Context context, FileSystemCommand command);

    /**
     * 파일을 로딩한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 다운로드할 파일의 내용
     */
    byte[] load(Context context, FileSystemCommand command);

    /**
     * 파일 시스템의 상태 정보를 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return Key Value 형식의 파일 시스템의 상태 정보
     */
    Map<String, Object> getFileSystemStatus(Context context, FileSystemCommand command);

    /**
     * 디렉토리의 파일 용량을 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리의 파일 용량
     */
    int getSize(Context context, FileSystemCommand command);

    /**
     * 디렉토리의 파일 갯수를 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리의 파일 갯수
     */
    int getCount(Context context, FileSystemCommand command);
}
