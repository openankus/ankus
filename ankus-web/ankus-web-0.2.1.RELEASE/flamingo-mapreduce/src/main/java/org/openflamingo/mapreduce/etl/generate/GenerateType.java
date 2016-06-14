package org.openflamingo.mapreduce.etl.generate;

/**
 * Generate ETL에서 사용하는 유형을 표현하는 Enumeration.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public enum GenerateType {

    SEQUENCE("SEQUENCE"),
    TIMESTAMP("TIMESTAMP");

    /**
     * Generate Type
     */
    private String type;

    /**
     * Generate Type을 설정한다.
     *
     * @param type Generate Type
     */
    GenerateType(String type) {
        this.type = type;
    }

    /**
     * Generate Type을 반환한다.
     *
     * @return type Generate Type
     */
    public String getType() {
        return type;
    }
}
