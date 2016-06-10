package org.ankus.mapreduce.algorithms.preprocessing.etl;

public class LinkedListStack {
	private Node top;       // tail
    private Node list;      // head
 
    // 노드 추가
    public void push(Node newNode) {
        // 스택이 비어있을 경우
        if (list == null)
            list = newNode;
        // 스택이 비어있지 않으면
        else {
            // top(꼬리)을 찾아 연결한다.
            Node currentTop = list;
            while (currentTop.getNextNode() != null)
                currentTop = currentTop.getNextNode();
 
            currentTop.setNextNode(newNode);
        }
        top = newNode;
    }
 
    // 노드 제거
    public Node pop() {
        Node popped = top;
 
        // 제거할 노드가 head와 같다면 스택을 비운다.
        if (list == popped) {
            list = null;
            top = null;
        } else {
            // 그렇지 않다면 top을 갱신
            Node currentTop = list;
            while (currentTop.getNextNode() != popped)
                currentTop = currentTop.getNextNode();
 
            top = currentTop;
            top.setNextNode(null);
        }
        return popped;
    }
     
    // 최상위 노드 반환
    public Node getTop() {
        return top;
    }
 
    // 스택 사이즈 반환
    public int getSize() {
        Node currentTop = list;
        int count = 0;
 
        while (currentTop != null) {
            currentTop = currentTop.getNextNode();
            count++;
        } 
        return count;
    }
 
    // 노드가 비어있는지 확인
    public boolean isEmpty() {
        return list == null;
    }
}
