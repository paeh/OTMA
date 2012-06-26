package de.hsa.otma.android.config;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import java.util.Iterator;

/**
 * Implements iterator functionality for NodeList.
 */
public class IterableNodeList implements Iterable<Element> {

    private NodeList nodes;

    public IterableNodeList(NodeList nodes) {
        this.nodes = nodes;
    }

    @Override
    public Iterator<Element> iterator() {
        return new Iterator<Element>() {
            
            private int current = 0;
            
            @Override
            public boolean hasNext() {
                return nodes.getLength() > current;
            }

            @Override
            public Element next() {
                return (Element) nodes.item(current++);
            }

            @Override
            public void remove() {
                throw new UnsupportedOperationException("remove not supported");
            }
        };
    }
}
