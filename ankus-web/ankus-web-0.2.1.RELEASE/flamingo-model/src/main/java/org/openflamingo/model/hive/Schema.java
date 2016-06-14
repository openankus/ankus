package org.openflamingo.model.hive;

/**
 * Hive Schema
 *
 * @author Chiwan Park
 */
public class Schema {

    public String name;
    public String type;
    public String comment;

    public Schema(String name, String type, String comment) {
        this.name = name;
        this.type = type;
        this.comment = comment;
    }

}
