INSERT INTO ADMIN_HADOOP_CLUSTER VALUES (1,'Cloud Cluster','hdfs://','172.27.163.147',9000,'hdfs://172.27.163.147:9000','172.27.163.147',9001,'http://14.63.199.15:50030','http://14.63.199.15:50070','','');
INSERT INTO ADMIN_HIVE_SERVER VALUES (1,'Cloud Hive Server 2','org.apache.hive.jdbc.HiveDriver','jdbc:hive2://14.63.199.15:10000','thrift://14.63.199.15:9083');
INSERT INTO ENGINE VALUES (1,'Cloud Test Server','14.63.199.15','8080',1,1);

INSERT INTO ADMIN_HADOOP_CLUSTER VALUES (2,'Test Cluster','hdfs://','10.0.1.100',9000,'hdfs://10.0.1.100:9000','10.0.1.100',9001,'http://10.0.1.100:50070','http://10.0.1.100:50030','','');
INSERT INTO ADMIN_HIVE_SERVER VALUES (2,'Test Hive Server 2','org.apache.hive.jdbc.HiveDriver','jdbc:hive2://10.0.1.100:10000','thrift://10.0.1.100:9083');
INSERT INTO ENGINE VALUES (2,'Test Server','10.0.1.100','9090',2,2);
