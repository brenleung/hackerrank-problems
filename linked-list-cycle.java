/*
Detect a cycle in a linked list. Note that the head pointer may be 'null' if the list is empty.

A Node is defined as: 
    class Node {
        int data;
        Node next;
    }
*/

boolean hasCycle(Node head) {
    // check if first node is null; if it is, then end 
    if (head == null) {
        return false;
    }
    else {
        ArrayList<Node> visited = new ArrayList<Node>();
        Node current = head;
        
        while (current.next != null) {
            visited.add(current);
            current = current.next;
            
            for (Node element : visited) {
                if (element == current) {
                    return true;
                }
            }
        }
        
        return false;
    }
}