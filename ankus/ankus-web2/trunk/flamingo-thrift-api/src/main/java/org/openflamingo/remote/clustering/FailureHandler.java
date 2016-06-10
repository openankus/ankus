package org.openflamingo.remote.clustering;


import org.aopalliance.intercept.MethodInvocation;
import org.springframework.remoting.RemoteAccessException;

/**
 * the base interface for all failure handlers.
 * A FailureHandler must provide strategies for failover and should be aware of the {@link org.openflamingo.remote.clustering.annotations.ClusterMethodInfo} annotation
 *
 * @author Steve Ulrich
 */
public interface FailureHandler {

    /**
     * Called when a method invocation failed, means: The method did not threw an Exception or returned successfully.
     *
     * @param service    The service that failed
     * @param invocation The method invocation that failed
     * @param count      the current (re)try-count
     * @throws org.springframework.remoting.RemoteAccessException In case of errors, the caller will receive an Exception
     */
    void failedInvocation(final RemoteService service, final MethodInvocation invocation, final int count) throws RemoteAccessException;

    /**
     * Called when a method invocation times out, without returning either successfully or with an exception.
     *
     * @param service    The service that failed
     * @param invocation The method invocation that failed
     * @param count      the current (re)try-count
     * @throws org.springframework.remoting.RemoteAccessException In case of errors, the caller will receive an Exception
     */
    void timedOutInvocation(final RemoteService service, final MethodInvocation invocation, final int count) throws RemoteAccessException;

    /**
     * a method call was returned successfully. Useful for failure counting handlers.
     *
     * @param service the service that returned successfully
     */
    void stateOk(RemoteService service);

    /**
     * Forces a check over all services. Useful if all services are marked as dead (e.g. on startup, or while switching from one location to another)
     */
    void forceReactivations();
}
