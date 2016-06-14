package org.openflamingo.remote.clustering.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * defines additional clustering informations for methods.<br>
 * This way a method can be marked as a "test" method and, instead of checking
 * the availability of a service with a generic approach, the ProtocolHander can
 * try to access the method instead. See {@link org.openflamingo.remote.clustering.annotations.ClusterMethodInfo.MethodType} for more details.
 *
 * @author Steve Ulrich
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface ClusterMethodInfo {
    /**
     * defines a specific type of the method<br>
     *
     * @author su1007
     */
    public static enum MethodType {

        /**
         * A normal method, which will be routed through the proxy (default)
         */
        NORMAL,

        /**
         * A heartbeat method, which can be used to determine if a backend server is available
         */
        HEARTBEAT,
    }

    public static enum FailureType {RETRY, FAIL, HANDLER}

    MethodType type() default MethodType.NORMAL;

    FailureType fail() default FailureType.HANDLER;

    /**
     * The timeout to use for this method, 0 for no timeout, negative values for default timeout
     */
    long timeout() default -1;

    String[] expectedResults() default {};
}
