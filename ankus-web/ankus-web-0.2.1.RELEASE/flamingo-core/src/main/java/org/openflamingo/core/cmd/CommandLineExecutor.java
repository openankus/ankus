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
package org.openflamingo.core.cmd;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteWatchdog;
import org.apache.commons.exec.Executor;

import java.io.IOException;

/**
 * CLI 커맨드를 실행하는 실행기.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class CommandLineExecutor {

    /**
     * 커맨드 라인을 실행한다.
     *
     * @param args 커맨드 라인 실행시 지정한 커맨드 라인 파라미터
     * @throws java.io.IOException  커맨드 라인 실행 실패시
     * @throws InterruptedException 커맨드 라인 실행 프로세스 처리 실패시
     */
    public static void main(String[] args) throws IOException, InterruptedException {
        CommandLine cmdLine = new CommandLine("/bin/ls");
        cmdLine.addArgument("-lsa");
        cmdLine.addArgument("/");
/*
        cmdLine.addArgument("/p");
		cmdLine.addArgument("/h");
		cmdLine.addArgument("${file}");

		HashMap map = new HashMap();
		map.put("file", new File("invoice.pdf"));

		cmdLine.setSubstitutionMap(map);
*/

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        TailExecuteResultHandler resultHandler = new TailExecuteResultHandler();

        ExecuteWatchdog watchdog = new ExecuteWatchdog(500);
        Executor executor = new DefaultExecutor();
        executor.setExitValue(1);
        executor.setWatchdog(watchdog);

        TailPumpStreamHandler psh = new TailPumpStreamHandler(out);
        executor.setStreamHandler(psh);
        executor.execute(cmdLine, resultHandler);

        System.out.println(out.toString());

        resultHandler.waitFor();
    }
}
