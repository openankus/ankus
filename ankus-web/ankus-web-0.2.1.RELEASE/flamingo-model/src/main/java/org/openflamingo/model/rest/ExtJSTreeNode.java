package org.openflamingo.model.rest;

import java.io.Serializable;

public class ExtJSTreeNode implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String text;

    private String id;

    private String cls;

    private boolean leaf;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCls() {
        return cls;
    }

    public void setCls(String cls) {
        this.cls = cls;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }
}
