/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.openflamingo.web.menu;

public class Menu {

    public int menuId;
    public String icon;
    public String label;
    public String url;
    public String topCode;
    public String subCode;
    public String title;
    public String description;
    public int depth;
    public int parentId;
    public int order;

    public Menu() {
    }

    public Menu(int menuId, String icon, String label, String topCode, String subCode, String url, String title, String description, int depth, int parentID, int order) {
        this.menuId = menuId;
        this.icon = icon;
        this.label = label;
        this.topCode = topCode;
        this.subCode = subCode;
        this.url = url;
        this.title = title;
        this.description = description;
        this.depth = depth;
        this.parentId = parentID;
        this.order = order;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getDepth() {
        return depth;
    }

    public void setDepth(int depth) {
        this.depth = depth;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTopCode() {
        return topCode;
    }

    public void setTopCode(String topCode) {
        this.topCode = topCode;
    }

    public String getSubCode() {
        return subCode;
    }

    public void setSubCode(String subCode) {
        this.subCode = subCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Menu menu = (Menu) o;

        if (menuId != menu.menuId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return menuId;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "menuId=" + menuId +
                ", icon='" + icon + '\'' +
                ", label='" + label + '\'' +
                ", url='" + url + '\'' +
                ", topCode='" + topCode + '\'' +
                ", subCode='" + subCode + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", depth=" + depth +
                ", parentId=" + parentId +
                ", order=" + order +
                '}';
    }
}
