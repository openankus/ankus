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
package org.openflamingo.provider.engine;

import java.util.List;
import java.util.Map;

/**
 * 워크플로우 엔진을 관리하기 위한 기능(환경 변수, 배치 작업, 데이터 수집 등등)을 제공하는 인터페이스.
 *
 * @author Byoung Gon, Kim
 * @version 0.4
 */
public interface WorkflowEngineService {

    /**
     * 로그 수집 작업을 등록한다.
     *
     * @param xml 로그 수집 작업을 정의한 XML
     * @return 로그 수집 작업이 정상적으로 등록된 경우 <tt>true</tt>
     */
    boolean registCollectionJob(String xml);

    /**
     * Workflow Engine의 상태 정보를 반환한다.
     *
     * @return 상태 정보
     */
    Map getStatus();

    /**
     * Workflow Engine의 환경 변수 정보를 반환한다.
     *
     * @return 환경 변수
     */
    List<Map> getEnvironments();

    /**
     * 스케줄러의 트리거 목록을 반환한다.
     *
     * @return 스케줄러의 트리거 목록
     */
    List<Map> getTriggers();

    /**
     * 워크플로우 엔진의 시스템 속성을 반환한다.
     *
     * @return 워크플로우 엔진의 시스템 속성
     */
    List<Map> getSystemProperties();

    /**
     * 지정한 작업과 작업 그룹에 대한 작업에 대한 정보를 반환한다.
     *
     * @param jobName  작업명
     * @param jobGroup 작업 그룹명
     * @return 작업 정보
     */
    List<Map> getJobInfos(String jobName, String jobGroup);

    /**
     * 워크플로우 엔진에서 실행중인 작업 목록을 반환한다.
     *
     * @return 워크플로우 엔진에서 실행중인 작업 목록
     */
    List<Map> getRunningJob();

    /**
     * JVM의 Heap 메모리 정보를 반환한다.
     *
     * @return JVM의 Heap 메모리 정보
     */
    Map getSystemMemoryInformation();

    /**
     * Cron Expression의 유효성 여부를 확인한다.
     *
     * @param expression Cron Expression
     * @return Cron Expression이 유효한 경우 <tt>true</tt>
     */
    boolean isValidCronExpression(String expression);

    /**
     * 지정한 경로의 파일 목록을 반환한다.
     *
     * @param path 파일 목록을 확인할 경로
     * @return 파일 목록
     */
    List<Map> getFiles(String path);

    /**
     * 지정한 경로의 디렉토리 정보를 반환한다.
     *
     * @param path 디렉토리 정보를 확인할 경로
     * @return 디렉토리 정보(예; 경로명, 권한 등등)
     */
    List<Map> getDirectory(String path);

    /**
     * 지정한 경로의 디렉토리 및 파일 목록을 반환한다.
     *
     * @param path 디렉토리 및 파일 목록을 확인할 경로
     * @return 디렉토리 정보(예; 경로명, 권한 등등)
     */
    List<Map> getDirectoryAndFiles(String path);
}
