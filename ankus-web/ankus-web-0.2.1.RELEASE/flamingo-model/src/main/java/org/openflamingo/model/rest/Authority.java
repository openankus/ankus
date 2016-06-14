package org.openflamingo.model.rest;

import java.io.Serializable;

public class Authority implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String username;

    private String name;

    private SecurityLevel securityLevel;

    public Authority() {
    }

    public Authority(String username, SecurityLevel securityLevel) {
        this.username = username;
        this.securityLevel = securityLevel;
    }

    public Authority(String username, String name, SecurityLevel securityLevel) {
        this.username = username;
        this.name = name;
        this.securityLevel = securityLevel;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SecurityLevel getSecurityLevel() {
        return securityLevel;
    }

    public void setSecurityLevel(SecurityLevel securityLevel) {
        this.securityLevel = securityLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Authority authority = (Authority) o;

        if (username != null ? !username.equals(authority.username) : authority.username != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return username != null ? username.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Authority{" +
                "username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", securityLevel=" + securityLevel +
                '}';
    }
}
