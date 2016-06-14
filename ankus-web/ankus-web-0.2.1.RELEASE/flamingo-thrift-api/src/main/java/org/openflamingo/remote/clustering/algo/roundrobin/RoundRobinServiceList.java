package org.openflamingo.remote.clustering.algo.roundrobin;


import org.aopalliance.intercept.MethodInvocation;
import org.openflamingo.remote.clustering.RemoteService;
import org.openflamingo.remote.clustering.algo.AbstractServiceList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * A thread safe class, holding the current state of the services
 *
 * @author su1007
 */
public class RoundRobinServiceList extends AbstractServiceList {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    public class RoundRobinEntry extends AbstractEntry {

        public RoundRobinEntry(final URI uri) {
            super(uri);
        }

        @Override
        public void delete() {
            super.delete();
            refresh(this);
        }

        @Override
        public void setActive(final boolean connected) {
            if (connected == super.isActive()) {
                return;
            }
            super.setActive(connected);
            refresh(this);
        }

        //    @Override
        public void abandonInvocation(final MethodInvocation invocation) {
            //Nothing to be done
        }
    }

    //Collection of all entries
    private final List<RoundRobinEntry> fullList;

    //Concurrent Collections holding "dead" and "alive" services
    private final Set<RoundRobinEntry> deadSet = new CopyOnWriteArraySet<RoundRobinEntry>();
    private final Set<RoundRobinEntry> aliveSet = new CopyOnWriteArraySet<RoundRobinEntry>();

    //Volatile attributes, use read lock for non-atomic operations, write lock to set
    private volatile List<RoundRobinEntry> orderedAliveList = new ArrayList<RoundRobinEntry>();
    private volatile int aliveServicesCount;

    //Locks
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock(true);
    private final Lock read = rwLock.readLock();
    private final Lock write = rwLock.writeLock();

    //invocation counter to
    private final AtomicInteger invocationCount = new AtomicInteger(0);

    public RoundRobinServiceList() {
        fullList = new CopyOnWriteArrayList<RoundRobinEntry>();
    }

    private void refresh(final RoundRobinEntry entry) {
        write.lock();
        try {
            if (entry.isAlive()) {
                deadSet.remove(entry);
                aliveSet.add(entry);
                logger.info("alive " + entry.getURI());
            } else {
                aliveSet.remove(entry);

                if (!entry.isDeleted()) {
                    deadSet.add(entry);
                    logger.info("dead " + entry.getURI());
                } else {
                    deadSet.remove(entry);
                    fullList.remove(entry);
                    logger.info("removed " + entry.getURI());
                }
            }
            ArrayList<RoundRobinEntry> newAliveList = new ArrayList<RoundRobinEntry>(aliveSet);
            orderedAliveList = Collections.unmodifiableList(newAliveList);
            aliveServicesCount = orderedAliveList.size();
            invocationCount.set(aliveServicesCount - 1);
        } finally {
            write.unlock();
        }
    }

    //  @Override
    public RemoteService claimInvocation(final MethodInvocation invocation) {
        if (!isOneAlive()) {
            return null;
        }
        RoundRobinEntry entry;
        read.lock();
        try {
            entry = getNext();
        } finally {
            read.unlock();
        }
        return entry;
    }

    private RoundRobinEntry getNext() {
        if (aliveServicesCount == 0) {
            return null;
        }
        RoundRobinEntry entry;
        int pointer = invocationCount.incrementAndGet();
        pointer = pointer % aliveServicesCount;
        entry = orderedAliveList.get(pointer);
        return entry;
    }

    /* (non-Javadoc)
     * @see rm.proemion.commons.spring.ServiceList#isOneAlive()
     */
    public boolean isOneAlive() {
        return aliveServicesCount > 0;
    }

    /* (non-Javadoc)
     * @see rm.proemion.commons.spring.ServiceList#iterator()
     */
    //  @Override
    public Iterator<RemoteService> iterator() {
        return new Iterator<RemoteService>() {
            Iterator<RoundRobinEntry> entryIterator = fullList.iterator();

            //      @Override
            public boolean hasNext() {
                return entryIterator.hasNext();
            }

            //      @Override
            public RemoteService next() {
                return entryIterator.next();
            }

            //      @Override
            public void remove() {
                throw new UnsupportedOperationException();
            }
        };
    }

    public void setServiceURIs(final String URIs) throws URISyntaxException {
        if (!fullList.isEmpty()) {
            throw new IllegalStateException("uris are already set; reset not possible");
        }
        String[] serviceURIs = URIs.split("[\\s,;]");


        write.lock();
        try {
            for (String uri : serviceURIs) {
                RoundRobinEntry entry = new RoundRobinEntry(new URI(uri));
                fullList.add(entry);
                refresh(entry);
            }
        } finally {
            write.unlock();
        }
    }

    public void addUri(final String uri) throws URISyntaxException {
        RoundRobinEntry entry = new RoundRobinEntry(new URI(uri));

        if (fullList.contains(entry)) {
            return;
        }
        write.lock();
        try {
            fullList.add(entry);
            refresh(entry);
        } finally {
            write.unlock();
        }
    }

    /* (non-Javadoc)
     * @see rm.proemion.commons.spring.ServiceList#removeUrl(java.lang.String)
     */
    public void removeUri(final String uri) throws URISyntaxException {
        RoundRobinEntry entry = new RoundRobinEntry(new URI(uri));

        if (!fullList.contains(entry)) {
            return;
        }

        write.lock();
        try {
            for (RoundRobinEntry anEntry : fullList) {
                if (anEntry.equals(entry)) {
                    anEntry.delete();
                }
            }
        } finally {
            write.unlock();
        }
    }

    //  @Override
    public Iterable<? extends RemoteService> getDeadServices() {
        return deadSet;
    }
}
