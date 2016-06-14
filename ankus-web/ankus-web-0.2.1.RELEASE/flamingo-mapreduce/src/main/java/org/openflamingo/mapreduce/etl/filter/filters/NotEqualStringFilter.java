package org.openflamingo.mapreduce.etl.filter.filters;

/**
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class NotEqualStringFilter extends FilterSupport {

	public boolean doFilter(Object source, Object target, String type) {
		return !((String) source).equals((String) target);
	}
}
