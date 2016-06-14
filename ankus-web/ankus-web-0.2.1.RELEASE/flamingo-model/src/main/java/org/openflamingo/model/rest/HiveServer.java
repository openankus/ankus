package org.openflamingo.model.rest;

import org.codehaus.jackson.annotate.JsonAutoDetect;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "id",
        "name",
        "jdbcUrl",
        "jdbcDriver",
        "metastoreUris"
})
@XmlRootElement(name = "hiveServer")
@JsonAutoDetect(
        getterVisibility = JsonAutoDetect.Visibility.ANY,
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.ANY
)
public class HiveServer implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String name;

    private String jdbcUrl;

    private String jdbcDriver;

    private String metastoreUris;

    public HiveServer() {
    }

    public HiveServer(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJdbcUrl() {
        return jdbcUrl;
    }

    public void setJdbcUrl(String jdbcUrl) {
        this.jdbcUrl = jdbcUrl;
    }

    public String getJdbcDriver() {
        return jdbcDriver;
    }

    public void setJdbcDriver(String jdbcDriver) {
        this.jdbcDriver = jdbcDriver;
    }

    public String getMetastoreUris() {
        return metastoreUris;
    }

    public void setMetastoreUris(String metastoreUris) {
        this.metastoreUris = metastoreUris;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HiveServer server = (HiveServer) o;

        if (id != server.id) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }

    @Override
    public String toString() {
        return "HiveServer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", jdbcUrl='" + jdbcUrl + '\'' +
                ", jdbcDriver='" + jdbcDriver + '\'' +
                ", metastoreUris='" + metastoreUris + '\'' +
                '}';
    }
}
