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
package org.openflamingo.engine.monitoring.system;

/*
import org.jrobin.core.RrdDef;
import org.jrobin.core.RrdException;
*/

/**
 * @see <a href="http://oldwww.jrobin.org/api/coreapi.html">JRobin Core API</a>
 * @see <a href="http://www.javacodegeeks.com/2012/07/jmx-and-spring-part-3.html">JMX and Spring</a>
 * @see <a href="https://code.google.com/p/jwatch/source/browse/trunk/jwatch/src/main/java/org/jwatch/handler/QuartzInstanceHandler.java">jwatch</a>
 */
public class JavaHeapMemoryMonitor {

/*
    RrdDef createRRD() throws RrdException {
        RrdDef def = new RrdDef("java-heap.rrd", 300);
        def.addDatasource("input", "COUNTER", 600, 0, Double.NaN);
        def.addDatasource("output", "COUNTER", 600, 0, Double.NaN);
        def.addArchive("AVERAGE", 0.5, 1, 600);
        def.addArchive("AVERAGE", 0.5, 6, 700);
        def.addArchive("AVERAGE", 0.5, 24, 797);
        def.addArchive("AVERAGE", 0.5, 288, 775);
        def.addArchive("MAX", 0.5, 1, 600);
        def.addArchive("MAX", 0.5, 6, 700);
        def.addArchive("MAX", 0.5, 24, 797);
        return def;
    }

    public static void main(String[] args) {
        long freeMemory = Runtime.getRuntime().freeMemory();
        long totalMemory = Runtime.getRuntime().totalMemory();
        long maxMemory = Runtime.getRuntime().maxMemory();

        List memBeans = ManagementFactory.getMemoryPoolMXBeans();
        for (Iterator i = memBeans.iterator(); i.hasNext(); ) {

            MemoryPoolMXBean mpool = (MemoryPoolMXBean) i.next();
            MemoryUsage usage = mpool.getUsage();

            String name = mpool.getName();
            float init = usage.getInit() / 1000;
            float used = usage.getUsed() / 1000;
            float committed = usage.getCommitted() / 1000;
            float max = usage.getMax() / 1000;
            float pctUsed = (used / max) * 100;
            float pctCommitted = (committed / max) * 100;

        }
    }
*/

}
