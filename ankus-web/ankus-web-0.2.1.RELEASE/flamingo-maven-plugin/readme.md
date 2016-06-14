#Flamingo Maven Plugin#

Latest release version - 1.0.0

Overview
---------------

Maven Plugin for running Apache Hadoop jobs in pseudo-distributed-mode (default configuration is changeable with hmp.hadoopConf property).

Goals
---------------

    start - start NameNode, DataNode, JobTracker and TaskTracker
    copyFromLocal - copy file/directory from local file system to HDFS
    submitJob - submit job to Apache
    copyToLocal - copy file/directory form HDFS to local file system
    delete - copy file/directory form HDFS to local file system
    stop - stop daemons started by 'start' goal (necessary only if -Dhmp.autoShutdown=false been used)

Quickstart
---------------

Add following snippet to your pom.xml (adjust &lt;hadoopHome/&gt; if needed) and hit "mvn hadoop:start -Dhmp.autoShutdown=false"

    <plugin>
        <groupId>org.openflamingo.maven</groupId>
        <artifactId>flamingo-maven-plugin</artifactId>
        <version>1.0.0</version>
        <configuration>
            <hadoopHome>${user.home}/hadoop-0.21.0</hadoopHome>
        </configuration>
    </plugin>

Sample
---------------

See [sample-maven-project](https://github.com/shyiko/hadoop-maven-plugin/tree/master/sample-maven-project).

Notes
---------------

In case you are going to use custom Hadoop conf directory (default one is shown [here](https://github.com/shyiko/hadoop-maven-plugin/tree/master/src/main/resources/pseudo-distributed-mode)), hdfs-site.xml should include a snippet provided below.
Otherwise, 'mvn hadoop:start hadoop:submitJob' may fail (during hadoop:submitJob goal) due to the DataNode being still unavailable.

    <property>
        <name>dfs.datanode.socket.write.timeout</name>
        <value>0</value>
    </property>

License
---------------

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
