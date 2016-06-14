package org.openflamingo.mapreduce.etl.filter.filters;

/**
 * Filter ETL의 필터링 조건을 만족하는지 판단하는 필터 인터페이스.
 * 다수의 필터링 조건을 구현하기 위해서 이 인터페이스를 구현하고
 * Filter Registry에 등록해야 한다.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public interface Filter {

	/**
	 * 필터링을 할 것인지 결정한다.
	 *
	 * @param source 원본 소스 객체
	 * @param target 비교 대상 객체
	 * @param type   자료형
	 * @return 필터링시 <tt>true</tt>
	 */
	boolean doFilter(Object source, Object target, String type);

}
