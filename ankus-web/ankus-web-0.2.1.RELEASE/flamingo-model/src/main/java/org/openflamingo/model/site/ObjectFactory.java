//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2013.06.21 at 03:25:37 오후 KST 
//


package org.openflamingo.model.site;

import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the org.openflamingo.model.site package.
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: org.openflamingo.model.site
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link Datanodes }
     * 
     */
    public Datanodes createDatanodes() {
        return new Datanodes();
    }

    /**
     * Create an instance of {@link Description }
     * 
     */
    public Description createDescription() {
        return new Description();
    }

    /**
     * Create an instance of {@link Configuration }
     * 
     */
    public Configuration createConfiguration() {
        return new Configuration();
    }

    /**
     * Create an instance of {@link Property }
     * 
     */
    public Property createProperty() {
        return new Property();
    }

    /**
     * Create an instance of {@link Hadoop }
     * 
     */
    public Hadoop createHadoop() {
        return new Hadoop();
    }

    /**
     * Create an instance of {@link Properties }
     * 
     */
    public Properties createProperties() {
        return new Properties();
    }

    /**
     * Create an instance of {@link Cluster }
     * 
     */
    public Cluster createCluster() {
        return new Cluster();
    }

}
