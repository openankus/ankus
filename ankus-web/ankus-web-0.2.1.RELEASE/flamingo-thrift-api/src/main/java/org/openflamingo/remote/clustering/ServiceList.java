package org.openflamingo.remote.clustering;


import org.aopalliance.intercept.MethodInvocation;

import java.net.URISyntaxException;

/**
 * base interface for all service lists. <br>
 * A ServiceList contains all services, maintains dead and alive states and is responsible for load balancing
 *
 * @author Steve Ulrich
 */
public interface ServiceList extends Iterable<RemoteService> {

    /**
     * Checks if a minimum of one service is alive
     *
     * @return true if there's a service alive, false otherwise
     */
    public abstract boolean isOneAlive();

    /**
     * Adds a new {@link RemoteService}<br>
     * Normally new services are marked as "dead" and will be reactivated after they answered a heartbeat correctly
     *
     * @param uri the URL for the new {@link RemoteService}
     * @throws java.net.URISyntaxException
     */
    public abstract void addUri(String uri) throws URISyntaxException;

    /**
     * Removes a {@link RemoteService} from this list.
     *
     * @param uri the uri to remove from the list
     * @throws java.net.URISyntaxException
     */
    public abstract void removeUri(String uri) throws URISyntaxException;

    /**
     * A list with all dead services.
     *
     * @return a list with all dead services
     */
    public abstract Iterable<? extends RemoteService> getDeadServices();

    /**
     * a claim to execute a method on an server. This method is responsible for returning an alive {@link RemoteService}
     * If there's a load balancing algorithm, this method should notice a method invocation here.
     *
     * @param invocation the invocation to be executed
     * @return the {@link RemoteService} which will execute this invocation
     */
    public abstract RemoteService claimInvocation(MethodInvocation invocation);

}