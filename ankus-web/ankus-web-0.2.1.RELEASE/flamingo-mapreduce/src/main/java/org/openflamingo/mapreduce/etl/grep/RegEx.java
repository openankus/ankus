package org.openflamingo.mapreduce.etl.grep;

/**
 * Regular Expression Enumeration.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public enum RegEx {

	EMAIL("^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$"),
	JUMIN("[0-9]{6}-(1|2|3|4)[0-9]{6}"),
	HTML_LINK("(http|https|ftp)://[^\\s^\\.]+(\\.[^\\s^\\.]+)*"),
	HTML_TAG("<(?:.|\\s)*?>");

	/**
	 * Regular Expression
	 */
	private String regularExpression;

	/**
	 * Regular Expression를 설정한다.
	 *
	 * @param regularExpression regularExpression
	 */
	RegEx(String regularExpression) {
		this.regularExpression = regularExpression;
	}

	/**
	 * Regular Expression를 반환한다.
	 *
	 * @return regularExpression
	 */
	public String getRegularExpression() {
		return regularExpression;
	}
}
