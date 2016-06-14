package org.openflamingo.mapreduce.etl.filter.filters;

/**
 * 소스 문자열이 지정한 문자열로 끝나는지 확인하는 필터.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class EndWithFilter extends FilterSupport {

	public boolean doFilter(Object source, Object target, String type) {
		return ((String) source).endsWith((String) target);
	}

}
