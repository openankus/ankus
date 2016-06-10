package org.openflamingo.remote.clustering;

/**
 * central configuration data for the whole project
 * @author Steve Ulrich
 *
 */
public class ClusteringConfiguration {
  
  /** The URL, where the the codebase can be downloaded */
  private String codebaseUrl;
  /** The interface class used to access the server instances */
  private Class<?> serviceInterface;
  
  /**
   * define which interface is used to access the servers
   * @param serviceInterface
   */
  public void setServiceInterface(final Class<?> serviceInterface) {
    this.serviceInterface = serviceInterface;
  }
  
  public Class<?> getServiceInterface() {
    return serviceInterface;
  }
  
  /**
   * The URL, where the the codebase can be downloaded
   * @param codebaseUrl url to fetch the codebase from
   */
  public void setCodebaseUrl(final String codebaseUrl) {
    this.codebaseUrl = codebaseUrl;
  }
  
  public String getCodebaseUrl() {
    return codebaseUrl;
  }
}
