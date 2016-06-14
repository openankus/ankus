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
package org.openflamingo.engine.util;

import org.apache.commons.exec.*;
import org.openflamingo.core.cmd.ByteArrayOutputStream;

import java.io.IOException;

/**
 * 리눅스의 커맨드 라인을 이용하여 파일의 지정한 범위를 로딩하는 파일 리더.
 *
 * @author Byoung Gon, Kim
 * @version 0.5
 */
public class FileReader {

    /**
     * 텍스트 파일의 지정한 라인 범위를 읽어서 내용을 반환한다.
     *
     * @param start    시작 라인수
     * @param end      종료 라인수
     * @param filename 읽어들일 파일명
     * @return 파일의 내용
     * @throws IOException          파일을 읽을 수 없는 경우
     * @throws InterruptedException 프로세스 실행 중 대기할 수 없는 경우
     */
    public static String read(long start, long end, String filename) throws IOException, InterruptedException {
        String command = org.slf4j.helpers.MessageFormatter.arrayFormat("sed '{},{}!d' {}", new Object[]{
                start, end, filename
        }).getMessage();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        DefaultExecuteResultHandler resultHandler = new DefaultExecuteResultHandler();
        PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(out);

        CommandLine cmdLine = CommandLine.parse(command);
        ExecuteWatchdog watchdog = new ExecuteWatchdog(60 * 1000);
        Executor executor = new DefaultExecutor();
        executor.setStreamHandler(pumpStreamHandler);
        executor.setExitValue(1);
        executor.setWatchdog(watchdog);
        executor.execute(cmdLine, resultHandler);

        resultHandler.waitFor();

        return new String(out.toByteArray());
    }

    /**
     * 텍스트 파일의 라인 수를 읽어서 반환한다.
     *
     * @param filename 라인 수를 확인할 파일명
     * @return 해당 파일의 라인 수
     * @throws IOException          파일을 읽을 수 없는 경우
     * @throws InterruptedException 프로세스 실행 중 대기할 수 없는 경우
     */
    public static int lines(String filename) throws IOException, InterruptedException {
        String command = org.slf4j.helpers.MessageFormatter.arrayFormat("sed -n '$=' {}", new Object[]{filename}).getMessage();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        DefaultExecuteResultHandler resultHandler = new DefaultExecuteResultHandler();
        PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(out);

        CommandLine cmdLine = CommandLine.parse(command);
        ExecuteWatchdog watchdog = new ExecuteWatchdog(60 * 1000);
        Executor executor = new DefaultExecutor();
        executor.setStreamHandler(pumpStreamHandler);
        executor.setExitValue(1);
        executor.setWatchdog(watchdog);
        executor.execute(cmdLine, resultHandler);

        resultHandler.waitFor();

        return Integer.parseInt(new String(out.toByteArray()).trim());
    }
}
