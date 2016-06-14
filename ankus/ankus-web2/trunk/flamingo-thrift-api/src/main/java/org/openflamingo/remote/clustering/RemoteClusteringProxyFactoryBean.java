package org.openflamingo.remote.clustering;

/*
 * $Id: FileLegacyBOImpl.java 2921 2008-06-17 14:57:59Z cw1009 $
 * $HeadURL: http://10.10.1.210:8081/svn/pbos/trunk/bos/src/main/java/rm/proemion/bo/FileLegacyBOImpl.java $
 * $Rev: 2921 $
 * $Date: 2008-06-17 16:57:59 +0200 (Tue, 17 Jun 2008) $
 * $Author: cw1009 $
 *
 * Copyright (c) 2005-2008, Proemion GmbH.
 * Developed 2008 by Proemion GmbH.
 * All rights reserved.
 *
 * Use is subject to licence terms.
 *
 * This software uses software developed by the Apache Software
 * Foundation
 * Copyright (c) 1999-2008 The Apache Software Foundation.
 *
 */
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.remoting.support.RemotingSupport;

/**
 * Enables Clustering via HTTP Remoting
 */
public class RemoteClusteringProxyFactoryBean extends RemotingSupport implements InitializingBean, FactoryBean, MethodInterceptor, DisposableBean {
    Logger logger = LoggerFactory.getLogger(getClass());
    // Statics

    //Handlers
    private ServiceList serviceList;
    private FailureHandler failureHandler;
    private ProtocolHandler protocolHandler;
    private ClusteringConfiguration configuration;

    //Proxy
    private Object serviceProxy;

    //  @Override
    public Object invoke(final MethodInvocation invocation) throws Throwable {
        boolean fin = false; //finish without further tries
        Object returnValue = null;
        int counter = 0;
        do {
            counter++;
            RemoteService service = serviceList.claimInvocation(invocation);
            if (service == null) {
                getFailureHandler().forceReactivations();
                service = serviceList.claimInvocation(invocation);
            }
            InvocationResult result = getProtocolHandler().invoke(service, invocation);
            service.abandonInvocation(invocation);

            switch (result.getResultType()) {

                //Errors on remoting
                case REMOTING_ERROR:
                    logger.error("Failed invocation", (Exception) result.getResult());
                    getFailureHandler().failedInvocation(service, invocation, counter);
                    break;
                case REMOTING_TIMEOUT:
                    logger.error("timed out invocation");
                    getFailureHandler().timedOutInvocation(service, invocation, counter);
                    break;

                // remoting executed normally
                case SERVER_METHOD_RETURNED:
                    getFailureHandler().stateOk(service);
                    returnValue = result.getResult();
                    fin = true;
                    break;
                case SERVER_METHOD_EXCEPTION:
                    getFailureHandler().stateOk(service);
                    throw (Throwable) result.getResult();

                    //should not happen, just in case!
                default:
                    logger.error("Unexpexcted result type: {}", result.getResult());
                    break;
            }

            //loop until Failure Handler throws exception, or method was executed successfully
        } while (!fin);

        return returnValue;
    }


    private Object figetFailureHandler() {
        return null;
    }


    public void setServiceList(final ServiceList serviceList) {
        this.serviceList = serviceList;
    }

    public void setConfiguration(final ClusteringConfiguration configuration) {
        this.configuration = configuration;
    }


    public ClusteringConfiguration getConfiguration() {
        return configuration;
    }

    public Class<?> getServiceInterface() {
        if (configuration == null) {
            return null;
        }
        return configuration.getServiceInterface();
    }

    //  @Override
    public void afterPropertiesSet() {
        if (getConfiguration() == null) {
            throw new IllegalArgumentException("Clustering configuration required");
        }
        if (getServiceInterface() == null) {
            throw new IllegalArgumentException("Property 'serviceInterface' is required");
        }
        this.serviceProxy = new ProxyFactory(getServiceInterface(), this).getProxy(getBeanClassLoader());
    }

    public Object getObject() {
        return this.serviceProxy;
    }

    @SuppressWarnings("unchecked")
    public Class getObjectType() {
        return getServiceInterface();
    }

    public boolean isSingleton() {
        return true;
    }

    //  @Override
    public void destroy() throws Exception {

    }


    public void setFailureHandler(final FailureHandler failureHandler) {
        this.failureHandler = failureHandler;
    }


    public FailureHandler getFailureHandler() {
        return failureHandler;
    }


    public void setProtocolHandler(final ProtocolHandler protocolHandler) {
        this.protocolHandler = protocolHandler;
    }


    public ProtocolHandler getProtocolHandler() {
        return protocolHandler;
    }

}