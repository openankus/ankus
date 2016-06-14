/*
 *  Licensed to the Proemion GmbH under the Apache License, Version 2 ("APL").
 *  You are allowed to use this file(s) under the terms of the APL, which is available from
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Feel free to contribute your changes to
 *  http://code.google.com/p/spring-remoting-cluster/
 * 
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the APL is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 * 
 *
 */

package org.openflamingo.remote.clustering;

/**
 * The result of a method invocation
 *
 * @author Steve Ulrich
 */
public class InvocationResult {

    /**
     * type of the invocation result
     */
    public static enum ResultType {
        /**
         * Error while in remoting procedure
         */
        REMOTING_ERROR,
        /**
         * A timeout occurred, which may result from a broken service
         */
        REMOTING_TIMEOUT,
        /**
         * The method was executed and returned with an exception
         */
        SERVER_METHOD_EXCEPTION,
        /**
         * The method was executed returned successfully
         */
        SERVER_METHOD_RETURNED,
    }

    /**
     * type of the invocation result
     */
    private final ResultType resultType;

    /**
     * the resulting object, regarding to the invocation result
     */
    private final Object result;

    /**
     * Create a new result
     *
     * @param resultType the type
     * @param result     the resulting value, if any
     */
    public InvocationResult(final ResultType resultType, final Object result) {
        this.resultType = resultType;
        this.result = result;

    }

    public ResultType getResultType() {
        return resultType;
    }

    public Object getResult() {
        return result;
    }
}
