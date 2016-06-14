CREATE DATABASE IF NOT EXISTS flamingo DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;
USE `flamingo`;

CREATE TABLE IF NOT EXISTS `ACTION_HISTORY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `WORKFLOW_ID` varchar(60) NOT NULL COMMENT 'Workflow String ID',
  `JOB_ID` int(11) NOT NULL COMMENT 'Job ID',
  `JOB_ID_STRING` varchar(60) NOT NULL COMMENT 'Job String ID',
  `ACTION_NAME` varchar(250) NOT NULL COMMENT 'Action Name',
  `WORKFLOW_NAME` varchar(250) NOT NULL COMMENT 'Workflow Name',
  `JOB_NAME` varchar(250) NOT NULL COMMENT 'Workflow Name',
  `START_DATE` datetime DEFAULT NULL COMMENT 'Start Date',
  `END_DATE` datetime DEFAULT NULL COMMENT 'End Date',
  `CAUSE` varchar(250) DEFAULT '' COMMENT 'cause',
  `CURRENT_STEP` int(11) DEFAULT NULL COMMENT 'Current Step',
  `TOTAL_STEP` int(11) DEFAULT NULL COMMENT 'Total Step',
  `ELAPSED` int(11) DEFAULT NULL COMMENT 'Elapsed Time',
  `LOG_PATH` varchar(255) DEFAULT NULL COMMENT 'Log Path',
  `SCRIPT` blob COMMENT 'Script',
  `COMMAND` blob COMMENT 'Command Line',
  `EXCEPTION` blob COMMENT 'Exception',
  `STATUS` varchar(10) NOT NULL COMMENT 'Workflow Status',
  `USERNAME` varchar(50) NOT NULL COMMENT 'Writer',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ADMIN_ENGINE_PERMISSION` (
  `ID` int(11) NOT NULL COMMENT 'Engine ID',
  `USERNAME` varchar(50) NOT NULL COMMENT 'User name',
  PRIMARY KEY (`ID`,`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ADMIN_HADOOP_CLUSTER` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `NAME` varchar(64) DEFAULT NULL COMMENT 'Hadoop Cluster Name',
  `NN_PROTOCOL` varchar(10) DEFAULT NULL COMMENT 'Namenode Protocol (s3n, hdfs)',
  `NN_IP` varchar(20) DEFAULT NULL COMMENT 'Namenode IP Address',
  `NN_PORT` int(11) DEFAULT NULL COMMENT 'Namenode Port',
  `HDFS_URL` varchar(256) DEFAULT NULL COMMENT 'HDFS URL',
  `JT_IP` varchar(20) DEFAULT NULL COMMENT 'Job Tracker IP Address',
  `JT_PORT` int(11) DEFAULT NULL COMMENT 'Job Tracker Port',
  `NN_CONSOLE` varchar(256) DEFAULT NULL COMMENT 'Namenode Console URL',
  `JT_CONSOLE` varchar(256) DEFAULT NULL COMMENT 'Job Tracker Console URL',
  `JT_MONITORING_PORT` int(5) DEFAULT NULL COMMENT 'Job Tracker Monitoring Port',
  `NN_MONITORING_PORT` int(5) DEFAULT NULL COMMENT 'Namenode Monitoring Port',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ADMIN_HIVE_SERVER` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `NAME` varchar(64) DEFAULT NULL COMMENT 'Hive Server Name',
  `JDBC_DRIVER` varchar(256) DEFAULT NULL COMMENT 'JDBC Driver',
  `JDBC_URL` varchar(256) DEFAULT NULL COMMENT 'JDBC URL',
  `METASTORE_USER` varchar(256) DEFAULT NULL,
  `METASTORE_PASSWORD` varchar(256) DEFAULT NULL,
  `METASTORE_URIS` varchar(256) DEFAULT NULL COMMENT 'Hive Metastore Thrift URIs',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ANKUS_CODE` (
  `seq` int(3) NOT NULL COMMENT 'Sequence',
  `codegroup` varchar(3) NOT NULL COMMENT 'Code Group',
  `groupname` varchar(50) NOT NULL COMMENT 'Group Name',
  `code` varchar(3) NOT NULL COMMENT 'Code',
  `codename` varchar(50) NOT NULL COMMENT 'Code Name',
  `description` varchar(100) DEFAULT NULL COMMENT 'Code Description',
  `vercheck` varchar(1) DEFAULT NULL COMMENT 'version Check',
  `create_dt` varchar(8) NOT NULL COMMENT 'Create Date',
  `modify_dt` varchar(8) DEFAULT NULL COMMENT 'Modify Date',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ANKUS_CODE` (`seq`, `codegroup`, `groupname`, `code`, `codename`, `description`, `vercheck`, `create_dt`, `modify_dt`) VALUES
	(1, 'A01', 'JAR', '0', 'version', '', 'N', '20150305', ''),
	(2, 'A01', 'JAR', '1', 'org.ankus:ankus-core:0.1', '', 'N', '20150305', ''),
	(3, 'A01', 'JAR', '2', 'org.ankus:ankus-core:0.2.2', '', 'N', '20150305', ''),
	(4, 'A01', 'JAR', '3', 'org.ankus:ankus-core:0.3.0', '', 'N', '20150305', ''),
	(5, 'A01', 'JAR', '4', 'org.ankus:ankus-core:0.4.0', '', 'N', '20150922', ''),
	(6, 'A01', 'JAR', '5', 'org.ankus:ankus-core:1.0.0', '', 'Y', '20151125', '');


CREATE TABLE IF NOT EXISTS `AUDIT_LOG` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `CLUSTER_ID` int(11) DEFAULT NULL COMMENT 'Hadoop Cluster Identifier',
  `CLUSTER_NAME` varchar(250) DEFAULT NULL COMMENT 'Hadoop Cluster Name',
  `FROM_PATH` text COMMENT 'From Path',
  `TO_PATH` text COMMENT 'To Path',
  `LENGTH` mediumtext COMMENT 'Total File Size',
  `FS_TYPE` varchar(50) NOT NULL COMMENT 'File System Type',
  `AUDIT_TYPE` varchar(50) NOT NULL COMMENT 'Audit Type',
  `FILE_TYPE` varchar(50) NOT NULL COMMENT 'File Type',
  `WORK_DATE` datetime DEFAULT NULL COMMENT 'Work Date',
  `USERNAME` varchar(50) NOT NULL COMMENT 'Writer',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `DBWORK_HISTORY` (
  `WORK_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ENGINE_ID` int(11) NOT NULL,
  `ENGINE_NAME` varchar(64) NOT NULL,
  `PROCESS_ID` int(11) DEFAULT NULL,
  `WORK_NAME` varchar(64) NOT NULL,
  `DATABASE_TYPE` varchar(64) NOT NULL,
  `DATABASE_ADDRESS` varchar(256) NOT NULL,
  `DATABASE_PORT` int(11) NOT NULL,
  `ID` varchar(64) NOT NULL,
  `PASSWORD` varchar(64) NOT NULL,
  `DATABASE_NAME` varchar(64) NOT NULL,
  `TABLE_NAME` varchar(64) NOT NULL,
  `USER` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`WORK_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `DBWORK_PROCESS` (
  `PROCESS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` int(11) NOT NULL,
  `PROGRESS` int(11) NOT NULL,
  `SQLSTATEMENT` longtext,
  `JOBTYPE` int(11) NOT NULL,
  `LOG` varchar(64) DEFAULT NULL,
  `HDFSPATH` varchar(256) NOT NULL,
  `FILEMODE` int(11) NOT NULL,
  `WORK_ID` int(11) NOT NULL,
  `TOTALCOUNT` int(11) DEFAULT NULL,
  `START_TIME` datetime DEFAULT NULL,
  `END_TIME` datetime DEFAULT NULL,
  `DELIMITER` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PROCESS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ENGINE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `NAME` varchar(64) DEFAULT NULL COMMENT 'Workflow Engine Name',
  `IP` varchar(256) DEFAULT NULL COMMENT 'Workflow Engine IP',
  `PORT` varchar(256) DEFAULT NULL COMMENT 'Workflow Engine Port',
  `CLUSTER_ID` int(11) DEFAULT NULL COMMENT 'Hadoop Cluster ID',
  `HIVE_ID` int(11) DEFAULT NULL COMMENT 'Hive Server ID',
  `ISPUBLIC` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `HIVE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `SERVER_ID` int(11) NOT NULL COMMENT 'Hive Server ID',
  `USERNAME` varchar(64) NOT NULL COMMENT 'User Name',
  `NAME` varchar(256) NOT NULL COMMENT 'Script Name',
  `SCRIPT` blob COMMENT 'Script',
  `VARIABLE` varchar(256) DEFAULT NULL COMMENT 'Variables in script',
  `LIBRARY` varchar(256) DEFAULT NULL COMMENT 'External JAR Library',
  `CONF` varchar(256) DEFAULT NULL COMMENT 'Hadoop Configuration',
  `DESCRIPTION` varchar(250) DEFAULT NULL COMMENT 'Description',
  `START_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Query Execution Start Time',
  `FINISHED_AT` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Query Execution End Time',
  `STATUS` varchar(16) DEFAULT NULL COMMENT 'Query Execution Status',
  PRIMARY KEY (`ID`),
  KEY `SERVER_ID` (`SERVER_ID`),
  CONSTRAINT `hive_ibfk_1` FOREIGN KEY (`SERVER_ID`) REFERENCES `ADMIN_HIVE_SERVER` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `HIVE_HISTORY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `EXECUTION_ID` varchar(60) NOT NULL COMMENT 'Hive Query Execution ID',
  `DB_NAME` varchar(250) NOT NULL COMMENT 'Hive Query Database Name',
  `QUERY_NAME` varchar(250) NOT NULL COMMENT 'Hive Query Name',
  `LOG_PATH` varchar(255) DEFAULT NULL COMMENT 'Log Path',
  `HIVE_JSON` blob COMMENT 'Hive JSON',
  `QUERY` blob COMMENT 'Hive Query',
  `START_DATE` datetime DEFAULT NULL COMMENT 'Start Date',
  `END_DATE` datetime DEFAULT NULL COMMENT 'End Date',
  `ELAPSED` int(11) DEFAULT NULL COMMENT 'Elapsed Time',
  `CAUSE` blob COMMENT 'cause',
  `STATUS` varchar(10) NOT NULL COMMENT 'Hive Query Execution Status',
  `USERNAME` varchar(50) NOT NULL COMMENT 'Writer',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `LOCALE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `LANG` varchar(4) NOT NULL COMMENT 'Language Code',
  `COUNTRY` varchar(4) DEFAULT NULL COMMENT 'Country Code',
  `NAME` varchar(20) DEFAULT NULL COMMENT 'Language Name',
  PRIMARY KEY (`ID`),
  KEY `LANG` (`LANG`),
  KEY `COUNTRY` (`COUNTRY`),
  KEY `NAME` (`NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `MESSAGE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `GROUP_KEY` varchar(64) DEFAULT NULL COMMENT 'Key',
  `MESSAGE_KEY` varchar(64) DEFAULT NULL COMMENT 'Key',
  `MESSAGE` varchar(500) DEFAULT NULL COMMENT 'Message',
  `LOCALE_ID` int(11) DEFAULT NULL COMMENT 'Locale Primary Key',
  PRIMARY KEY (`ID`),
  KEY `GROUP_KEY` (`GROUP_KEY`),
  KEY `MESSAGE_KEY` (`MESSAGE_KEY`),
  KEY `LOCALE_ID` (`LOCALE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `MONITORING` (
  `ID` varchar(30) NOT NULL COMMENT 'Timestamp based Sequence',
  `CREATE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Create Date',
  `YEAR` int(4) DEFAULT NULL COMMENT 'Year of Create Date',
  `MONTH` int(2) DEFAULT NULL COMMENT 'Month of Create Date',
  `DAY` int(2) DEFAULT NULL COMMENT 'Day of Create Date',
  `HOUR` int(2) DEFAULT NULL COMMENT 'Hour of Create Date',
  `ENGINE` int(11) DEFAULT NULL COMMENT 'Workflow Engine',
  `HADOOP` int(11) DEFAULT NULL COMMENT 'Apache Hadoop Cluster',
  `HIVE` int(11) DEFAULT NULL COMMENT 'Apache Hive Server',
  `TYPE` varchar(20) DEFAULT NULL COMMENT 'Metrics Type',
  `INTERV` varchar(20) DEFAULT NULL COMMENT 'Interval',
  `VALUE1` varchar(200) DEFAULT '' COMMENT 'Value1',
  `VALUE2` varchar(200) DEFAULT '' COMMENT 'Value2',
  `VALUE3` varchar(200) DEFAULT '' COMMENT 'Value3',
  `VALUE4` varchar(200) DEFAULT '' COMMENT 'Value4',
  `VALUE5` bigint(20) DEFAULT NULL COMMENT 'Value5',
  `VALUE6` bigint(20) DEFAULT NULL COMMENT 'Value6',
  `VALUE7` bigint(20) DEFAULT NULL COMMENT 'Value7',
  `VALUE8` bigint(20) DEFAULT NULL COMMENT 'Value8',
  `VALUE9` bigint(20) DEFAULT NULL COMMENT 'Value9',
  `VALUE10` bigint(20) DEFAULT NULL COMMENT 'Value10',
  `VALUE11` bigint(20) DEFAULT NULL COMMENT 'Value11',
  `VALUE12` bigint(20) DEFAULT NULL COMMENT 'Value12',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `PIG` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `USERNAME` varchar(64) NOT NULL COMMENT 'User Name',
  `SCRIPT_NAME` varchar(256) NOT NULL COMMENT 'Script Name',
  `SCRIPT` blob COMMENT 'Script',
  `CREATE_DATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created Time',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `TREE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `NAME` varchar(250) NOT NULL COMMENT 'Name',
  `TREE` varchar(10) NOT NULL COMMENT 'Tree Type',
  `NODE` varchar(10) NOT NULL COMMENT 'Node Type',
  `ROOT` tinyint(1) DEFAULT '0' COMMENT 'Username',
  `USERNAME` varchar(50) NOT NULL COMMENT 'Username',
  `PARENT_ID` int(11) DEFAULT NULL COMMENT 'Parent',
  PRIMARY KEY (`ID`),
  KEY `PARENT_ID` (`PARENT_ID`),
  CONSTRAINT `tree_ibfk_1` FOREIGN KEY (`PARENT_ID`) REFERENCES `TREE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


INSERT INTO `TREE` (`ID`, `NAME`, `TREE`, `NODE`, `ROOT`, `USERNAME`, `PARENT_ID`) VALUES
	(1, '/', 'WORKFLOW', 'FOLDER', 1, 'admin', NULL);


CREATE TABLE IF NOT EXISTS `USER` (
  `USERNAME` varchar(64) NOT NULL COMMENT 'Login name',
  `PASSWD` varchar(64) NOT NULL COMMENT 'Password',
  `NAME` varchar(250) NOT NULL COMMENT 'User name',
  `EMAIL` varchar(250) NOT NULL COMMENT 'Email Address',
  `ENABLED` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Account Enabled',
  `AC_NON_EXPIRED` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Account Non-expired',
  `AC_NON_LOCKED` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Account Non-locked',
  `CR_NON_EXPIRED` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'Credential Non-expired',
  `AUTHORITY` varchar(250) NOT NULL DEFAULT 'ROLE_USER' COMMENT 'User Authority',
  `CREATE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Workflow Varialbe',
  `LAST_LOGIN` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'LAST LOGIN TIME',
  `LANGUAGE` varchar(4) DEFAULT NULL COMMENT 'Language Code',
  PRIMARY KEY (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `USER` (`USERNAME`, `PASSWD`, `NAME`, `EMAIL`, `ENABLED`, `AC_NON_EXPIRED`, `AC_NON_LOCKED`, `CR_NON_EXPIRED`, `AUTHORITY`, `LANGUAGE`) VALUES
	('admin', 'admin', 'ankus', 'ankus@openankus.org', 1, 1, 1, 1, 'ROLE_ADMIN', 'en');


CREATE TABLE IF NOT EXISTS `VISUALIZATION_HISTORY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `WORKFLOW_ID` varchar(60) NOT NULL COMMENT 'Workflow String ID',
  `JOB_ID` int(11) NOT NULL COMMENT 'Job ID',
  `JOB_ID_STRING` varchar(60) NOT NULL COMMENT 'Job String ID',
  `VISUALIZATION_HTML` longblob NOT NULL COMMENT 'Visualization HTML',
  `CREATE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `WORKFLOW` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `WORKFLOW_ID` varchar(60) NOT NULL COMMENT 'Workflow String ID',
  `NAME` varchar(250) NOT NULL COMMENT 'Workflow Name',
  `DESCRIPTION` varchar(250) DEFAULT '' COMMENT 'Description',
  `VARIABLE` blob COMMENT 'Workflow Varialbe',
  `WORKFLOW_XML` blob NOT NULL COMMENT 'Workflow XML',
  `DESIGNER_XML` blob NOT NULL COMMENT 'Designer XML',
  `CREATE_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Workflow Varialbe',
  `STATUS` varchar(10) NOT NULL COMMENT 'Workflow Varialbe',
  `TREE_ID` int(11) NOT NULL COMMENT 'Tree ID',
  `USERNAME` varchar(50) NOT NULL COMMENT 'Writer',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `WORKFLOW_HISTORY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  `WORKFLOW_ID` varchar(60) NOT NULL COMMENT 'Workflow String ID',
  `JOB_ID` int(11) NOT NULL COMMENT 'Job ID',
  `JOB_ID_STRING` varchar(60) NOT NULL COMMENT 'Job String ID',
  `WORKFLOW_NAME` varchar(250) NOT NULL COMMENT 'Workflow Name',
  `CURRENT_ACTION` varchar(250) DEFAULT '' COMMENT 'Current Action',
  `JOB_NAME` varchar(250) NOT NULL COMMENT 'Workflow Name',
  `WORKFLOW_XML` blob NOT NULL COMMENT 'Workflow XML',
  `VARIABLE` blob COMMENT 'Workflow Varialbe',
  `START_DATE` datetime DEFAULT NULL COMMENT 'Start Date',
  `END_DATE` datetime DEFAULT NULL COMMENT 'End Date',
  `CAUSE` varchar(250) DEFAULT '' COMMENT 'cause',
  `CURRENT_STEP` int(11) DEFAULT NULL COMMENT 'Current Step',
  `TOTAL_STEP` int(11) DEFAULT NULL COMMENT 'Total Step',
  `ELAPSED` int(11) DEFAULT NULL COMMENT 'Elapsed Time',
  `EXCEPTION` blob COMMENT 'Description',
  `STATUS` varchar(10) NOT NULL COMMENT 'Workflow Status',
  `USERNAME` varchar(50) NOT NULL COMMENT 'Writer',
  `JOB_TYPE` varchar(20) NOT NULL COMMENT 'Job Type',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
