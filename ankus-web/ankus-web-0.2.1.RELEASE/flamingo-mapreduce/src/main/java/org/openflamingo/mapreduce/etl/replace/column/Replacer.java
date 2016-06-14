package org.openflamingo.mapreduce.etl.replace.column;

/**
 * 컬럼의 값을 from에서 to로 변환하는 Replacer.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public interface Replacer {

	/**
	 * 문자열을 변환한다.
	 *
	 * @param from 변환할 문자열
	 * @return 변환한 문자열
	 */
	String replace(String from);

	/**
	 * @param to
	 */
	void setTo(String to);
}
