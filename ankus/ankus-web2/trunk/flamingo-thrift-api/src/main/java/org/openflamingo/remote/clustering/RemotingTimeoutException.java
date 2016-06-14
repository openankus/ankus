package org.openflamingo.remote.clustering;


/**
 * raised when a method call via remoting takes too long
 */
public class RemotingTimeoutException extends RemotingInvocationException {

    private static final long serialVersionUID = -1584428994507995517L;

    public RemotingTimeoutException() {
    }

    public RemotingTimeoutException(final String message) {
        super(message);
    }

    public RemotingTimeoutException(final Throwable cause) {
        super(cause);
    }

    public RemotingTimeoutException(final String message, final Throwable cause) {
        super(message, cause);
    }

}
