package org.openflamingo.mapreduce.etl.filter.filters;

/**
 * 두 문자열이 동일한지 확인하는 필터.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class EqualStringFilter extends FilterSupport {

	public boolean doFilter(Object source, Object target, String type) {
		return ((String) source).equals((String) target);
	}

}
