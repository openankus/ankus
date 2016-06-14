package org.openflamingo.remote.clustering;


import org.aopalliance.intercept.MethodInvocation;


/**
 * A base interface for all protocol implementations
 * A ProtocolHandler must provide protocol specific invocations and should be aware of the {@link org.openflamingo.remote.clustering.annotations.ClusterMethodInfo} annotation
 *
 * @author su1007
 */
public interface ProtocolHandler {

    /**
     * invokes a method on the remote service defined by the <code>service</code> object
     *
     * @param service    the remote service where the method should be invoked
     * @param invocation the invocation to be executed by the server
     * @return a result state
     */
    InvocationResult invoke(RemoteService service, MethodInvocation invocation);

    /**
     * Test the connection, either by a generic approach, or by using predefined heartbeat methods
     *
     * @param service the service to test
     * @return true if test was successfull, false otherwise
     */
    boolean testConnection(RemoteService service);

}
