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
package org.openflamingo.engine.monitoring.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.rrd4j.DsType;
import org.rrd4j.core.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;

import static org.rrd4j.ConsolFun.*;

public class MonitoringQuartzJob extends QuartzJobBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(MonitoringQuartzJob.class);

    protected void executeInternal(JobExecutionContext ctx) throws JobExecutionException {
        long freeMemory = Runtime.getRuntime().freeMemory();
        long totalMemory = Runtime.getRuntime().totalMemory();
        long maxMemory = Runtime.getRuntime().maxMemory();
        int processors = Runtime.getRuntime().availableProcessors();

        logger.info("Free Heap={}, Total Heap={}, Max Heap={}, Processors={}", new Object[]{
                freeMemory, totalMemory, maxMemory, processors
        });
    }

    public static void main(String[] args) throws Exception {
        long start = Util.getTime(), end = start + 300 * 300;
        String rrdFile = Util.getRrd4jDemoPath("minmax.rrd");
        // create
        RrdDef rrdDef = new RrdDef(rrdFile, start - 1, 300);
        rrdDef.addDatasource("free", DsType.GAUGE, 600, Double.NaN, Double.NaN);
        rrdDef.addDatasource("total", DsType.GAUGE, 600, Double.NaN, Double.NaN);
        rrdDef.addDatasource("max", DsType.GAUGE, 600, Double.NaN, Double.NaN);
        rrdDef.addArchive(LAST, 0.5, 1, 300);
        rrdDef.addArchive(AVERAGE, 0.5, 1, 300);
        rrdDef.addArchive(MIN, 0.5, 12, 300);
        rrdDef.addArchive(MAX, 0.5, 12, 300);
        RrdDb rrdDb = new RrdDb(rrdDef);
        // update
        for (long t = start; t < end; t += 300) {
            Sample sample = rrdDb.createSample(t);
            sample.setValue("free", Runtime.getRuntime().freeMemory());
            sample.setValue("total", Runtime.getRuntime().totalMemory());
            sample.setValue("max", Runtime.getRuntime().maxMemory());
            sample.update();
        }

        FetchRequest fetchRequest = rrdDb.createFetchRequest(LAST, start, end);
        System.out.println(fetchRequest.dump());
        // System.out.println((new BigDecimal(Double.toString(fetchRequest.fetchData().get95Percentile("free")))).toPlainString());
        System.out.println(fetchRequest.fetchData().dump());
        rrdDb.close();
    }
}