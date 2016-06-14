package org.openflamingo.engine.util;

import org.apache.commons.io.IOUtils;
import org.openflamingo.core.exception.WorkflowException;
import org.slf4j.Logger;

import java.io.*;

public class FileWriter {

    /**
     * 로그 파일명
     */
    private String filename;

    /**
     * 최대 파일의 크기
     */
    private long maxSize = Long.MAX_VALUE;

    /**
     * SLF4J Logging
     */
    private Logger logger;

    /**
     * Log File Writer
     */
    private OutputStreamWriter outputStreamWriter;

    /**
     * Buffered Writer
     */
    private BufferedWriter bufferedWriter;

    /**
     * File Output Stream
     */
    private FileOutputStream fileOutputStream;

    /**
     * 현재 로그 파일의 크기
     */
    private long currentLength = 0;

    /**
     * 동기화를 위한 Mutex
     */
    private Object mutex = new Object();

    /**
     * @param filename 로그 파일명
     */
    public FileWriter(Logger logger, String filename) {
        this.logger = logger;
        logger.info("로그를 기록할 파일의 위치는 '{}'입니다.", filename);
        try {
            this.fileOutputStream = new FileOutputStream(filename);
            this.outputStreamWriter = new OutputStreamWriter(this.fileOutputStream, "UTF-8");
            this.bufferedWriter = new BufferedWriter(outputStreamWriter);
            this.filename = filename;
        } catch (Exception ex) {
            throw new WorkflowException("Error initializing file writer for writing a log file.", ex);
        }
    }

    /**
     * @param filename 로그 파일명
     */
    public FileWriter(Logger logger, String filename, long maxSize) {
        this.logger = logger;
        logger.info("로그를 기록할 파일의 위치는 '{}'입니다.", filename);
        try {
            this.fileOutputStream = new FileOutputStream(filename);
            this.outputStreamWriter = new OutputStreamWriter(this.fileOutputStream, "UTF-8");
            this.bufferedWriter = new BufferedWriter(outputStreamWriter);
            this.maxSize = maxSize;
            this.filename = filename;
        } catch (Exception ex) {
            throw new WorkflowException("Error initializing file writer for writing a log file.", ex);
        }
    }

    public void log(String message) {
        try {
            if (currentLength > maxSize) {
                logger.info("지정한 크기를 초과하여 기존 파일 스트림을 닫고 다시 생성합니다.");
                synchronized (mutex) {
                    close();
                    new File(filename).delete();

                    this.fileOutputStream = new FileOutputStream(filename);
                    this.outputStreamWriter = new OutputStreamWriter(this.fileOutputStream, "UTF-8");
                    this.bufferedWriter = new BufferedWriter(outputStreamWriter);

                    this.currentLength = 0;
                }
            }
            int length = message.getBytes().length;
            bufferedWriter.write(message + "\n");
            bufferedWriter.flush();
            currentLength += length;
        } catch (IOException e) {
            logger.warn("Disk write failed", e);
        }
    }

    public void close() {
        try {
            bufferedWriter.flush();
        } catch (Exception ex) {
            logger.warn("Write flush failed", ex);
        }

        IOUtils.closeQuietly(fileOutputStream);
        IOUtils.closeQuietly(outputStreamWriter);
        IOUtils.closeQuietly(bufferedWriter);
    }
}
