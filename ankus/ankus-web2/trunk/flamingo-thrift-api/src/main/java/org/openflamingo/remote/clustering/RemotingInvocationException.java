package org.openflamingo.remote.clustering;

/**
 * A generic base class for all types of exceptions that can happen on remoting.
 */
public class RemotingInvocationException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public RemotingInvocationException() {

    }

    public RemotingInvocationException(final String message) {
        super(message);
    }

    public RemotingInvocationException(final Throwable cause) {
        super(cause);
    }

    public RemotingInvocationException(final String message, final Throwable cause) {
        super(message, cause);
    }

}
