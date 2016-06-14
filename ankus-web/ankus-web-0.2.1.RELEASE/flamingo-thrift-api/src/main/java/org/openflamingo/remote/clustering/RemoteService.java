package org.openflamingo.remote.clustering;

import org.aopalliance.intercept.MethodInvocation;

import java.net.URI;

/**
 * Base Interface for all definitions for remote services. Instances should be created by the {@link org.openflamingo.remote.clustering.ServiceList}.
 * @author Steve Ulrich
 *
 */
public interface RemoteService {
  
  /**
   * Get associated {@link ProtocolDefinition}
   * @return the associated {@link ProtocolDefinition}
   */
  public ProtocolDefinition getProtocolDefinition();

  /**
   * Associate a {@link ProtocolDefinition} with this service
   * @param protocolDefinition the definition for this service
   */
  public void setProtocolDefinition(ProtocolDefinition protocolDefinition);

  /**
   * Gets the associated {@link FailureDefinition}
   * @return the associated {@link FailureDefinition}
   */
  public FailureDefinition getFailureDefinition();

  /**
   * Associate a {@link FailureDefinition} with this service
   * @param failureDefinition the definition for this service
   */
  public void setFailureDefinition(FailureDefinition failureDefinition);
  
  /**
   * Gets the generic URI for this service. The URI may be a URL, but don't have to be, as long, as the ProtocolHander can make a use of it
   * @return the URI to contact the server
   */
  public URI getURI();
  
  /**
   * Checks if this service is active
   * @return true if it is active and can be accessed, false otherwise
   */
  public boolean isActive();
  
  /**
   * Checks if this service is (going to be) deleted
   * @return true if the service is marked as deleted and will be removed from the service list.
   */
  public boolean isDeleted();
  
  /**
   * Renders a service active. Be careful with that method!
   * @param active true if the service is recognized as active, false otherwise
   */
  public void setActive(boolean active);
  
  /**
   * Marks this service as deleted and inactive
   */
  public void delete();
  
  /**
   * The service doesn't handle this method invocation anymore.<br>
   * May be called, if the server wasn't available, if the method was executed successfully or anything else happened so that the server isn't bloated with it.
   * @param invocation the invocation which has taken from the server.
   */
  public void abandonInvocation(MethodInvocation invocation);
}
