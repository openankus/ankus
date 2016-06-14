package org.openflamingo.model.rest;

import org.apache.commons.lang.builder.ToStringBuilder;
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
        "ip",
        "port",
        "hadoopClusterId",
        "hiveServerId"
})
@XmlRootElement(name = "engine")
@JsonAutoDetect(
        getterVisibility = JsonAutoDetect.Visibility.ANY,
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.ANY
)
public class Engine implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private Long id;

    private String name;

    private String ip;

    private String port;

    private long hadoopClusterId;

    private long hiveServerId;

    public Engine() {
    }

    public Engine(String name) {
        this.name = name;
    }

    public Engine(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public long getHadoopClusterId() {
        return hadoopClusterId;
    }

    public void setHadoopClusterId(long hadoopClusterId) {
        this.hadoopClusterId = hadoopClusterId;
    }

    public long getHiveServerId() {
        return hiveServerId;
    }

    public void setHiveServerId(long hiveServerId) {
        this.hiveServerId = hiveServerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Engine engine = (Engine) o;

        if (id != null ? !id.equals(engine.id) : engine.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
