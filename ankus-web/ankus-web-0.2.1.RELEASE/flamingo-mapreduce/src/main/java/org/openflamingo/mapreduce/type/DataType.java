package org.openflamingo.mapreduce.type;

/**
 * 필터링시 해당 컬럼의 데이터 유형을 지정하기 위해서 사용하는 Enumeration.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public enum DataType {

	INTEGER("int"),
	LONG("long"),
	FLOAT("float"),
	DOUBLE("double"),
	STRING("string");

	/**
	 * 데이터 유형
	 */
	private String dataType;

	/**
	 * 데이터 유형을 설정한다.
	 *
	 * @param dataType 데이터 유형
	 */
	DataType(String dataType) {
		this.dataType = dataType;
	}

	/**
	 * 데이터 유형을 반환한다.
	 *
	 * @return 데이터 유형
	 */
	public String getDataType() {
		return dataType;
	}
}