package org.openflamingo.web.tree;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.openflamingo.model.rest.NodeType;
import org.openflamingo.model.rest.Tree;
import org.openflamingo.model.rest.TreeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("applicationContext.xml")
public class TreeServiceTest {

    @Autowired
    private TreeService treeService;

    @Test
    public void createRoot() {
        Tree root = treeService.createRoot(TreeType.JOB, "hong");

        assertNotNull(root);
        assertEquals("hong", root.getUsername());
        assertEquals("JOB", root.getTreeType().toString());
        assertEquals("FOLDER", root.getNodeType().toString());
    }

    @Test
    public void getRoot() {
        Tree root = treeService.getRoot(TreeType.JOB, "rachell");

        assertNotNull(root);
        assertEquals("rachell", root.getUsername());
        assertEquals("JOB", root.getTreeType().toString());
        assertEquals("FOLDER", root.getNodeType().toString());
    }

    @Test
    public void create() {
        Tree parent = treeService.getRoot(TreeType.JOB, "fharenheit");

        Tree newNode = new Tree();
        newNode.setId(10);
        newNode.setName("hello");

        Tree child = treeService.create(parent, newNode, NodeType.ITEM);

        assertNotNull(child);
        assertEquals("fharenheit", parent.getUsername());
        assertEquals("JOB", parent.getTreeType().toString());
        assertEquals("ITEM", child.getNodeType().toString());
        assertEquals("hello", child.getName());
    }

    @Test
    public void get() {
        Tree tree = treeService.get(1);

        assertNotNull(tree);
        assertEquals("fharenheit", tree.getUsername());
        assertEquals("JOB", tree.getTreeType().toString());
        assertEquals("FOLDER", tree.getNodeType().toString());
        assertEquals("//", tree.getName());
    }

    @Test
    public void getChilds() {
        List<Tree> childs = treeService.getChilds(2);

        assertNotNull(childs);
        assertTrue(childs.size() == 1);
    }

    @Test
    public void delete() {
        Tree parent = treeService.getRoot(TreeType.JOB, "fharenheit");

        Tree newNode = new Tree();
        newNode.setId(11);
        newNode.setName("hello");

        treeService.create(parent, newNode, NodeType.ITEM);

        boolean delete = treeService.delete(11);

        assertTrue(delete);
    }

    @Test
    public void rename() {
        Tree parent = treeService.getRoot(TreeType.JOB, "fharenheit");
        boolean rename = treeService.rename(parent, "//");

        assertTrue(rename);

        Tree root = treeService.get(parent.getId());
        assertEquals("//", root.getName());
    }

}

