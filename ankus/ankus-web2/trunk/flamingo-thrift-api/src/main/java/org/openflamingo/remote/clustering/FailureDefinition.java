package org.openflamingo.remote.clustering;

import java.net.URI;

/**
 * A Definition to be filled by a {@link org.openflamingo.remote.clustering.FailureHandler}
 * A {@link org.openflamingo.remote.clustering.FailureHandler} can implement this interface and store implementation specific failure information for a single {@link org.openflamingo.remote.clustering.RemoteService} in it.
 *
 * @author Steve Ulrich
 */
public interface FailureDefinition {
    URI getURI();
}
