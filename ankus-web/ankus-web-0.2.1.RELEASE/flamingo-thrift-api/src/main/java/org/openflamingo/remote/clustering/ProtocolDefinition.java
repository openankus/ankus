package org.openflamingo.remote.clustering;

import java.net.URI;


/**
 * A Definition to be filled by a {@link org.openflamingo.remote.clustering.ProtocolHandler}
 * A {@link org.openflamingo.remote.clustering.ProtocolHandler} can implement this interface and store implementation specific protocol information for a single {@link org.openflamingo.remote.clustering.RemoteService} in it.
 *
 * @author Steve Ulrich
 */
public interface ProtocolDefinition {

    URI getURI();
}
