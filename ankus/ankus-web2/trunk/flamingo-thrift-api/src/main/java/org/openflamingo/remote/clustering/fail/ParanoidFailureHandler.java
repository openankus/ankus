package org.openflamingo.remote.clustering.fail;

import org.aopalliance.intercept.MethodInvocation;
import org.openflamingo.remote.clustering.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.remoting.RemoteAccessException;

import java.util.Timer;
import java.util.TimerTask;

public class ParanoidFailureHandler implements FailureHandler, InitializingBean, DisposableBean {

    private ServiceList serviceList;
    private ProtocolHandler protocolHandler;
    private TimerTask reactivationTask;

    private final class ServiceTest implements Runnable {
        private final RemoteService service;

        private ServiceTest(final RemoteService service) {
            this.service = service;
        }

        //    @Override
        public void run() {
            if (getProtocolHandler().testConnection(service)) {
                logger.info("reactivating {}", service);
                service.setActive(true);
            } else {
                logger.warn("Failed test(s) for {}, service marked as dead", service);
                service.setActive(false);
            }

            synchronized (service) {
                service.notifyAll();
            }

        }
    }

    Logger logger = LoggerFactory.getLogger(getClass());

    private int reactivationTime = 5000;
    private long testTimeout = 5000;
    private int maxRetryCount = 20;

    //  @Override
    public void stateOk(final RemoteService service) {
        //We are paranoid, so this doesn't mean anything to us.
    }

    //  @Override
    public void timedOutInvocation(final RemoteService service, final MethodInvocation invocation, final int count) throws RemoteAccessException {
        service.setActive(false);
        if (count > maxRetryCount) {
            throw new RemotingTimeoutException("Timeout while executing Method " + invocation.getMethod());
        }
    }

    //  @Override
    public void failedInvocation(final RemoteService service, final MethodInvocation invocation, final int count) {
        service.setActive(false);
        if (count > maxRetryCount) {
            throw new RemotingInvocationException("Timeout while executing Method " + invocation.getMethod());
        }
    }

    private synchronized void tryReactivation() {
        for (final RemoteService service : getServiceList()) {

            Thread thread = new Thread(new ServiceTest(service));

            thread.start();
            synchronized (service) {
                try {
                    service.wait(getTestTimeout());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                if (thread.isAlive()) {
                    thread.interrupt();
                }
            }
        }

    }

    public void setTestTimeout(final long testTimeout) {
        this.testTimeout = testTimeout;
    }

    public long getTestTimeout() {
        return testTimeout;
    }

    //  @Override
    public void afterPropertiesSet() throws Exception {
        if (getServiceList() == null) {
            throw new IllegalArgumentException("ServiceList Property must be filled");
        }
        if (getProtocolHandler() == null) {
            throw new IllegalArgumentException("ProtocolHandler Property must be filled");
        }

        startUp();
    }

    private void startUp() {
        Timer timer = new Timer(true);
        reactivationTask = new TimerTask() {
            @Override
            public void run() {
                try {
                    tryReactivation();
                } catch (Exception e) {
                    logger.error("Error while reactivating", e);
                }
            }
        };
        timer.scheduleAtFixedRate(reactivationTask, getReactivationTime(), getReactivationTime());
    }

    //  @Override
    public void destroy() throws Exception {
        reactivationTask.cancel();
    }

    //  @Override
    public void forceReactivations() {
        int i = 0;
        do {
            if (i > 0) {
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            tryReactivation();
        } while (((++i) < getMaxRetryCount()) && !serviceList.isOneAlive());
        if (!serviceList.isOneAlive()) {
            throw new IllegalStateException("No Service alive");
        }
    }

    public void setServiceList(final ServiceList serviceList) {
        this.serviceList = serviceList;
    }

    public ServiceList getServiceList() {
        return serviceList;
    }

    public void setProtocolHandler(final ProtocolHandler protocolHandler) {
        this.protocolHandler = protocolHandler;
    }

    public ProtocolHandler getProtocolHandler() {
        return protocolHandler;
    }

    public void setReactivationTime(final int reactivationTime) {
        this.reactivationTime = reactivationTime;
    }

    public int getReactivationTime() {
        return reactivationTime;
    }

    public void setMaxRetryCount(final int maxRetryCount) {
        this.maxRetryCount = maxRetryCount;
    }

    public int getMaxRetryCount() {
        return maxRetryCount;
    }

}
