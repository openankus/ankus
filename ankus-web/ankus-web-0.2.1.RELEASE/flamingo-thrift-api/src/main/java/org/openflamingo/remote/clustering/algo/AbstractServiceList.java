package org.openflamingo.remote.clustering.algo;

import org.openflamingo.remote.clustering.FailureDefinition;
import org.openflamingo.remote.clustering.ProtocolDefinition;
import org.openflamingo.remote.clustering.RemoteService;
import org.openflamingo.remote.clustering.ServiceList;

import java.net.URI;

public abstract class AbstractServiceList implements ServiceList {

    public abstract class AbstractEntry implements RemoteService {

        private ProtocolDefinition protocolDefinition;
        private FailureDefinition failureDefinition;
        private final URI uri;

        private volatile boolean active = false;
        private volatile boolean deleted = false;

        public AbstractEntry(final URI uri) {
            this.uri = uri;
        }

        //    @Override
        public void delete() {
            deleted = true;
        }

        //    @Override
        public boolean isActive() {
            return active;
        }

        public boolean isAlive() {
            return active && !deleted;
        }

        @Deprecated
        public boolean isValid() {
            return !deleted;
        }

        //    @Override
        public boolean isDeleted() {
            return deleted;
        }

        //    @Override
        public void setActive(final boolean active) {
            this.active = active;
        }

        /**
         * @return the url
         */
        public URI getURI() {
            return uri;
        }

        @Override
        public int hashCode() {
            return getURI().hashCode();
        }

        @Override
        public boolean equals(final Object other) {
            if (!(other instanceof AbstractEntry)) {
                return false;
            }
            return getURI().equals(((AbstractEntry) other).getURI());
        }

        @Override
        public String toString() {
            return getURI() + " [" + (active ? "connected" : "dead") + ", " + (deleted ? "deleted" : "active") + "]";
        }

        public ProtocolDefinition getDefinition() {
            return getProtocolDefinition();
        }

        public void setProtocolDefinition(final ProtocolDefinition protocolDefinition) {
            this.protocolDefinition = protocolDefinition;
        }

        public ProtocolDefinition getProtocolDefinition() {
            return protocolDefinition;
        }

        public void setFailureDefinition(final FailureDefinition failureDefinition) {
            this.failureDefinition = failureDefinition;
        }

        public FailureDefinition getFailureDefinition() {
            return failureDefinition;
        }
    }

}
