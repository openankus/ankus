package org.openflamingo.mapreduce.etl.replace.column;

/**
 * Description.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 1.0
 */
public class DefaultReplacer implements Replacer {

	/**
	 * 변환할 문자열
	 */
	private String to;

	/**
	 * 기본 생성자.
	 *
	 * @param to 변환할 문자열
	 */
	public DefaultReplacer(String to) {
		this.to = to;
	}

	/**
	 * 기본 생성자.
	 */
	public DefaultReplacer() {
	}

	@Override
	public String replace(String from) {
		return to;
	}

	/**
	 * 변환할 문자열을 설정한다.
	 *
	 * @param to 변환할 문자열
	 */
	@Override
	public void setTo(String to) {
		this.to = to;
	}
}
