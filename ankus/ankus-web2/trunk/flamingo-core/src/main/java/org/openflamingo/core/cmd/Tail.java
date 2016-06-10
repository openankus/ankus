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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Description.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class Tail implements Runnable {

    private static final int CHUNK_SIZE = 2048;

    private byte[] buffer;
    private boolean _stop = false;
    private List list = null;
    private Thread thread;

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(Tail.class);

    public Tail() {
        buffer = new byte[CHUNK_SIZE];
        list = Collections.synchronizedList(new LinkedList());
    }

    public void setLogger(Logger logger) {
        this.logger = logger;
    }

    public void start() {
        thread = new Thread(this);
        thread.start();
    }

    class FileWatcher {
        private RandomAccessFile _ras;
        private OutputStream _out;
        private long _pos;

        public FileWatcher(File file, OutputStream out, int pos)
            throws IOException {
            _ras = new RandomAccessFile(file, "r");
            _out = out;
            _pos = pos;
        }

        public void init()
            throws IOException {
            _ras.seek(_pos);
        }

        public long getDiff()
            throws IOException {
            return _ras.length() - _pos;
        }

        public void moveBuffer(byte[] buffer, int size)
            throws IOException {
            _ras.readFully(buffer, 0, size);
            _pos += size;

            if (logger.isDebugEnabled()) {
                logger.debug("[tail] output size: " + size);
            }

            _out.write(buffer, 0, size);
        }

        public void close() {
            try {
                _ras.close();
            } catch (Exception e) {
            }
            try {
                _out.close();
            } catch (Exception e) {
            }
        }
    }

    public void join()
        throws InterruptedException {
        thread.join();
    }

    public void addFile(File file, OutputStream out, int pos)
        throws IOException {
        list.add(new FileWatcher(file, out, pos));
    }

    public void run() {

        logger.debug("[tail] running...");

        long len;
        int size;

        Iterator iter = null;
        FileWatcher watcher = null;

        try {
            iter = list.iterator();
            while (iter.hasNext()) {
                watcher = (FileWatcher) iter.next();
                watcher.init();
            }

            while (!isDone()) {

                try {
                    Thread.sleep(2000);
                } catch (Exception e) {
                }

                iter = list.iterator();
                while (iter.hasNext()) {
                    watcher = (FileWatcher) iter.next();

                    len = watcher.getDiff();
                    if (len <= 0) continue;

                    while (len > 0) {
                        size = (len > CHUNK_SIZE) ? CHUNK_SIZE : (int) len;
                        watcher.moveBuffer(buffer, size);
                        len -= size;
                    }
                }
            }
        } catch (IOException e) {
            logger.debug("Unexpected error.", e);
        } finally {
            close();
        }

        logger.debug("[tail] done.");
    }

    private boolean isDone()
        throws IOException {
        if (!_stop) return false;
        Iterator iter = null;
        FileWatcher watcher = null;

        iter = list.iterator();
        while (iter.hasNext()) {
            watcher = (FileWatcher) iter.next();
            if (watcher.getDiff() > 0) return false;
        }

        return true;
    }

    private void close() {
        Iterator iter = null;
        FileWatcher watcher = null;
        iter = list.iterator();
        while (iter.hasNext()) {
            watcher = (FileWatcher) iter.next();
            watcher.close();
        }
    }

    public void stop() {
        logger.debug("[tail] stop called");
        _stop = true;
    }

}