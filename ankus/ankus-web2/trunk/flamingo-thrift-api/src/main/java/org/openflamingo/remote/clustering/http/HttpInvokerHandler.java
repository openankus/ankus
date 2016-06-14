package org.openflamingo.remote.clustering.http;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.openflamingo.remote.clustering.*;
import org.openflamingo.remote.clustering.annotations.ClusterMethodInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.remoting.RemoteAccessException;
import org.springframework.remoting.httpinvoker.HttpInvokerClientInterceptor;
import org.springframework.security.util.SimpleMethodInvocation;

import java.lang.reflect.Method;
import java.net.HttpURLConnection;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class HttpInvokerHandler implements ProtocolHandler, BeanClassLoaderAware, InitializingBean{
  
  Logger logger = LoggerFactory.getLogger(getClass());
  
  private class HttpServiceDefinition implements ProtocolDefinition {
    
    private final URI uri;
    private final MethodInterceptor interceptor;
    public HttpServiceDefinition (final URI uri, final MethodInterceptor interceptor) {
      this.uri = uri;
      this.interceptor = interceptor;
    }
    
    //    @Override
    public URI getURI() {
      return uri;
    }
    
    public MethodInterceptor getInterceptor() {
      return interceptor;
    }
    
  }
  
  private class MethodInvoker implements Runnable {
    
    private final MethodInvocation invocation;
    private volatile InvocationResult result;
    private final MethodInterceptor interceptor;
    
    protected MethodInvoker(final MethodInterceptor interceptor, final MethodInvocation invocation ){
      this.interceptor = interceptor;
      this.invocation = invocation;
    }
    
    //    @Override
    public void run() {
      try {
        Object returnValue = interceptor.invoke(invocation);
        result = new InvocationResult(InvocationResult.ResultType.SERVER_METHOD_RETURNED, returnValue);
      } catch (RemoteAccessException e) {
        result = new InvocationResult(InvocationResult.ResultType.REMOTING_ERROR, e);
      } catch (Throwable e) {
        result = new InvocationResult(InvocationResult.ResultType.SERVER_METHOD_EXCEPTION, e);
      }
      synchronized (this) {
        logger.debug("notifying");
        this.notifyAll();
      }
    }
    
    InvocationResult invoke(final long timeout){
      new Thread(this).start();
      synchronized (this) {
        if (result == null) {
          try {
            if (timeout <= 0) {
              this.wait();
              logger.debug("wakeup");
            } else {
              this.wait(timeout);
              logger.debug("wakeup");
            }
          } catch (InterruptedException e) {
            logger.warn("Thread was interrupted", e);
          }
        }
      }
      if (result == null) {
        result = new InvocationResult(InvocationResult.ResultType.REMOTING_TIMEOUT, null);
      }
      return result;
    }
  }
  
  private ClusteringConfiguration configuration;
  private ClassLoader beanClassLoader;
  private volatile List<Method> testMethods;
  //  private long defaultTimeout = TimeUnit.MINUTES.toMillis(5); //Java 6
  private long defaultTimeout = TimeUnit.SECONDS.toMillis(5*60); //Java 5
  
  public HttpInvokerHandler () {
  }
  
  //  @Override
  public InvocationResult invoke (final RemoteService service, final MethodInvocation invocation) {
    logger.debug("call to {}, routing to {}",invocation.getMethod().getName(), service);
    HttpServiceDefinition definition = getServiceDefinition(service);
    MethodInterceptor interceptor = definition.getInterceptor();
    if (interceptor == null) {
      throw new NullPointerException("No interceptor found! "+definition);
    }
    
    ClusterMethodInfo annotation = invocation.getMethod().getAnnotation(ClusterMethodInfo.class);
    long timeout;
    if ((annotation != null) && (annotation.timeout() >= 0)) {
      timeout = annotation.timeout();
    } else {
      timeout = getDefaultTimeout();
    }
    
    MethodInvoker invoker = new MethodInvoker(interceptor, invocation);
    InvocationResult result = invoker.invoke(timeout);
    return result;
  }
  
  private HttpServiceDefinition getServiceDefinition(final RemoteService service) {
    if (service.getProtocolDefinition() != null) {
      return (HttpServiceDefinition) service.getProtocolDefinition();
    }
    URI uri = service.getURI();
    HttpInvokerClientInterceptor clientInterceptor = new HttpInvokerClientInterceptor();
    clientInterceptor.setBeanClassLoader(beanClassLoader);
    clientInterceptor.setServiceUrl(uri.toString());
    clientInterceptor.setCodebaseUrl(configuration.getCodebaseUrl());
    clientInterceptor.setServiceInterface(configuration.getServiceInterface());
    clientInterceptor.afterPropertiesSet();
    
    HttpServiceDefinition definition = new HttpServiceDefinition(uri, clientInterceptor);
    service.setProtocolDefinition(definition);
    return definition;
  }
  
  //  @Override
  public void setBeanClassLoader(final ClassLoader beanClassLoader) {
    this.beanClassLoader = beanClassLoader;
  }
  
  public void setConfiguration(final ClusteringConfiguration configuration) {
    this.configuration = configuration;
  }
  
  public ClusteringConfiguration getConfiguration() {
    return configuration;
  }
  
  public void setDefaultTimeout(final long defaultTimeout) {
    this.defaultTimeout = defaultTimeout;
  }
  
  public long getDefaultTimeout() {
    return defaultTimeout;
  }
  
  //  @Override
  public boolean testConnection(final RemoteService service) {
    HttpServiceDefinition definition = getServiceDefinition(service);
    boolean testConnection;
    MethodInterceptor interceptor = (definition).getInterceptor();
    if (testMethods.isEmpty()) {
      testConnection = fallbackTests(definition);
    } else {
      testConnection = true;
      for (Method method : testMethods) {
        testConnection = testConnection && testMethod(interceptor, method);
      }
    }
    return testConnection;
  }
  
  private boolean fallbackTests(final ProtocolDefinition definition) {
    HttpURLConnection connection;
    try {
      connection = (HttpURLConnection) definition.getURI().toURL().openConnection();
      connection.setConnectTimeout(1000);
      connection.connect();
      return true;
    } catch (Exception e) {
      logger.warn("No connection to: {}... ignoring", definition);
      logger.warn("Message was: {}", e.toString());
      return false;
    }
  }
  
  public boolean testMethod(final MethodInterceptor interceptor, final Method method){
    logger.debug("testing {}, routing to {}",method.getName(), interceptor);
    MethodInvocation invocation = new SimpleMethodInvocation(null,method, new Object[0]);
    try {
      ClusterMethodInfo info = method.getAnnotation(ClusterMethodInfo.class);
      Object result = interceptor.invoke(invocation);
      
      if (info.expectedResults().length == 0) {
        return true;
      }
      for (String expected : info.expectedResults()) {
        if (result instanceof Boolean) {
          Boolean.valueOf(expected.toString()).equals(result);
        }
        if (expected.equals(String.valueOf(result.toString()))) {
          return true;
        }
        
      }
    } catch (Throwable e) {
      logger.warn("error while testing connection {}",(Object)e);
    }
    return false;
  }
  
  //  @Override
  public void afterPropertiesSet() throws Exception {
    ClusteringConfiguration config = getConfiguration();
    if (config == null) {
      throw new IllegalArgumentException("No configuration set");
    }
    Class<?> serviceInterface = config.getServiceInterface();
    Method[] methods = serviceInterface.getMethods();
    List<Method> tests = new ArrayList<Method>();
    for(Method method : methods) {
      //      logger.debug("Method {} has ClusterConfig? {}", method, (method.getAnnotation(ClusterMethodInfo.class) != null));
      if (method.getParameterTypes().length == 0) {
        ClusterMethodInfo info = method.getAnnotation(ClusterMethodInfo.class);
        if ((info != null) && (info.type() == ClusterMethodInfo.MethodType.HEARTBEAT)) {
          tests.add(method);
        }
      }
    }
    if (tests.isEmpty()) {
      logger.warn("No test methods given!");
    }
    this.testMethods = tests;
  }
  
}
