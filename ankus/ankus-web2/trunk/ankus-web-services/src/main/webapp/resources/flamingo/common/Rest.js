/*
 * Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

///////////////////////////////////////
// Variable Define
///////////////////////////////////////

var CONSTANTS = {};

CONSTANTS.CONTEXT_PATH = '';
CONSTANTS.DESIGNER = {};
CONSTANTS.PIG = {};
CONSTANTS.HIVE = {};
CONSTANTS.COLLECTOR = {};
CONSTANTS.ADMIN = {};
CONSTANTS.ADMIN.WE = {};
CONSTANTS.ADMIN.HADOOP = {};
CONSTANTS.ADMIN.HIVE = {};
CONSTANTS.ADMIN.USER_MANAGEMENT = {};
CONSTANTS.FS = {};
CONSTANTS.JOB = {};
CONSTANTS.DASHBOARD = {};
CONSTANTS.TREE = {};
CONSTANTS.USER = {};
CONSTANTS.AUTH = {};

///////////////////////////////////////
// Constants
///////////////////////////////////////

CONSTANTS.GRID_SIZE_PER_PAGE = 16;
CONSTANTS.ROOT = '/';
CONSTANTS.ROOT_PATH = '/';
//2015.01.30 whitepoo@onycom.com
//CONSTANTS.DEFAULT_WALLPAPER = '/resources/images/wallpapers/desktop2.jpg';
CONSTANTS.DEFAULT_WALLPAPER = '/resources/images/wallpapers/desktop.jpg';

///////////////////////////////////////
// Designer
///////////////////////////////////////

CONSTANTS.DESIGNER.GET_TREE = '/designer/tree/get';
CONSTANTS.DESIGNER.NEW_FOLDER = '/tree/folder/new';

CONSTANTS.DESIGNER.GET_STATUS = '/designer/status';

CONSTANTS.DESIGNER.LOAD_WORKFLOW = '/designer/load';
CONSTANTS.DESIGNER.LOAD_HDFS_FILE = '/designer/previewHDFSFile';
CONSTANTS.DESIGNER.LOAD_HDFS_FILE_FP = '/designer/previewHDFSFile_FP'; //2015.08.17.tkkim
CONSTANTS.DESIGNER.LOAD_HDFS_FILE_TAB = '/designer/previewHDFSFile_tab'; //2015.08.17.tkkim
CONSTANTS.DESIGNER.LOAD_HDFS_FILE_FP_ORIGINAL = '/designer/previewHDFSFile_FP_ORIGINAL'; // Tajo Preview 사용
CONSTANTS.DESIGNER.SAVE_WORKFLOW = '/designer/save';
CONSTANTS.DESIGNER.RUN_WORKFLOW = '/designer/run';
CONSTANTS.DESIGNER.SHOW_XML = '/designer/xml';
CONSTANTS.DESIGNER.DELETE = '/designer/delete';
CONSTANTS.DESIGNER.CREATE = '/designer/create';
CONSTANTS.DESIGNER.RENAME = '/designer/rename';

CONSTANTS.DESIGNER.HIVE_DBS = '/designer/hive/dbs';
CONSTANTS.DESIGNER.HIVE_COLUMNS = '/designer/hive/columns';

///////////////////////////////////////
// Job
///////////////////////////////////////

CONSTANTS.JOB.GET_WORKFLOW = '/designer/get';
CONSTANTS.JOB.REGIST = '/job/regist';
CONSTANTS.JOB.LIST = '/job/list';

///////////////////////////////////////
// Admin > Workflow Engine
///////////////////////////////////////

CONSTANTS.ADMIN.WE.REGIST_JOB = '/admin/engine/regist';
CONSTANTS.ADMIN.WE.ADD_ENGINE = '/admin/engine/add';
CONSTANTS.ADMIN.WE.DEL_ENGINE = '/admin/engine/delete';
CONSTANTS.ADMIN.WE.EDIT_ENGINE = '/admin/engine/edit';//2015.01.30 whitepoo@onycom.com
CONSTANTS.ADMIN.WE.LIST_ENGINES = '/admin/engine/engines';

CONSTANTS.ADMIN.WE.GET_ENVS = '/admin/engine/envs';
CONSTANTS.ADMIN.WE.GET_PROPS = '/admin/engine/props';
CONSTANTS.ADMIN.WE.GET_TRIGGERS = '/admin/engine/triggers';
CONSTANTS.ADMIN.WE.GET_RUNNING_JOBS = '/admin/engine/running';

CONSTANTS.ADMIN.WE.GET_AIO = '/admin/engine/aio';

///////////////////////////////////////
// Admin > Hadoop
///////////////////////////////////////
CONSTANTS.ADMIN.HADOOP.GET_HADOOP_CLUSTER = '/admin/hadoop/cluster';//2015.01.30 whitepoo@onycom.com
CONSTANTS.ADMIN.HADOOP.UPDATE_HADOOP_CLUSTER = '/admin/hadoop/update_a_cluster';//2015.01.30 whitepoo@onycom.com
CONSTANTS.ADMIN.HADOOP.GET_HADOOP_CLUSTERS = '/admin/hadoop/clusters';
CONSTANTS.ADMIN.HADOOP.ADD_HADOOP_CLUSTER = '/admin/hadoop/add';
CONSTANTS.ADMIN.HADOOP.DELETE_HADOOP_CLUSTER = '/admin/hadoop/delete';
CONSTANTS.ADMIN.HADOOP.CHECK_ENGINE_CLUSTER = '/admin/hadoop/check_enginewithCluster';//2015.01.30 whitepoo@onycom.com

///////////////////////////////////////
// Admin > Hive
///////////////////////////////////////

CONSTANTS.ADMIN.HIVE.GET_HIVE_SERVERS = '/admin/hive/servers';
CONSTANTS.ADMIN.HIVE.ADD_HIVE_SERVER = '/admin/hive/add';
CONSTANTS.ADMIN.HIVE.DELETE_HIVE_SERVER = '/admin/hive/delete';

///////////////////////////////////////
// Admin > User Management
///////////////////////////////////////

CONSTANTS.ADMIN.USER_MANAGEMENT.GET_USER_SERVERS = '/admin/user/servers';
CONSTANTS.ADMIN.USER_MANAGEMENT.GET_USER = '/admin/user/find';
CONSTANTS.ADMIN.USER_MANAGEMENT.UPDATE_USER = '/admin/user/update';
CONSTANTS.ADMIN.USER_MANAGEMENT.REMOVE_USER = '/admin/user/delete';

///////////////////////////////////////
// Pig > Editor
///////////////////////////////////////

CONSTANTS.PIG.SAVE = '/pig/save';
CONSTANTS.PIG.LOAD = '/pig/load';
CONSTANTS.PIG.RUN = '/pig/run';
CONSTANTS.PIG.LIST = '/pig/list';
CONSTANTS.PIG.GET_LOG = '/pig/log';

///////////////////////////////////////
// Hive > Editor
///////////////////////////////////////

CONSTANTS.HIVE.HISTORY = '/hive/editor/history';
CONSTANTS.HIVE.EXECUTE = '/hive/editor/execute';
CONSTANTS.HIVE.RESULTS = '/hive/editor/results';
CONSTANTS.HIVE.QUERY = '/hive/editor/query';
CONSTANTS.HIVE.EXPLAIN = '/hive/editor/explain';
CONSTANTS.HIVE.LIST = '/hive/editor/list';
CONSTANTS.HIVE.SAVE = '/hive/editor/save';
CONSTANTS.HIVE.DB = '/hive/editor/databases';
CONSTANTS.HIVE.CHECK_SIZE = '/hive/editor/size';
CONSTANTS.HIVE.DOWNLOAD = '/hive/editor/download';

///////////////////////////////////////
// Hive > Browser
///////////////////////////////////////

CONSTANTS.HIVE.BROWSER_GET_DATABASES = '/hive/browser/databases';
CONSTANTS.HIVE.BROWSER_GET_TABLES = '/hive/browser/tables';
CONSTANTS.HIVE.BROWSER_GET_COLUMMS = '/hive/browser/columnInfo';
CONSTANTS.HIVE.BROWSER_GET_COLUMMS = '/hive/browser/columns';
CONSTANTS.HIVE.BROWSER_GET_PARTITIONS = '/hive/browser/partitions';
CONSTANTS.HIVE.BROWSER_CREATE_DATABASE = '/hive/browser/createDB';
CONSTANTS.HIVE.BROWSER_DROP_DATABASE = '/hive/browser/dropDB';
CONSTANTS.HIVE.BROWSER_CREATE_TABLE = '/hive/browser/createTable';
CONSTANTS.HIVE.BROWSER_DROP_TABLE = '/hive/browser/dropTable';
CONSTANTS.HIVE.BROWSER_RENAME_TABLE = '/hive/browser/renameTable';
CONSTANTS.HIVE.BROWSER_UPDATE_TABLE = '/hive/browser/updateTable';
CONSTANTS.HIVE.BROWSER_UPDATE_PARTITION = '/hive/browser/updatePartition';
CONSTANTS.HIVE.BROWSER_ADD_PARTITION = '/hive/browser/addPartition';
CONSTANTS.HIVE.BROWSER_ADD_MULTITLE_PARTITIONS = '/hive/browser/addMultiPartitions';
CONSTANTS.HIVE.BROWSER_DROP_PARTITION = '/hive/browser/dropPartition';

///////////////////////////////////////
// File System > HDFS
///////////////////////////////////////

CONSTANTS.FS.HDFS_GET_DIRECTORY = '/fs/hdfs/directory';
CONSTANTS.FS.HDFS_GET_FILE = '/fs/hdfs/file';
CONSTANTS.FS.HDFS_NEW_DIRECTORY = '/fs/hdfs/newDirectory';
CONSTANTS.FS.HDFS_DELETE_DIRECTORY = '/fs/hdfs/deleteDirectory';
CONSTANTS.FS.HDFS_RENAME_DIRECTORY = '/fs/hdfs/renameDirectory';
CONSTANTS.FS.HDFS_MOVE_DIRECTORY = '/fs/hdfs/moveDirectory';
CONSTANTS.FS.HDFS_COPY_DIRECTORY = '/fs/hdfs/copyDirectory';
CONSTANTS.FS.HDFS_INFO_DIRECTORY = '/fs/hdfs/infoDirectory';
CONSTANTS.FS.HDFS_UPLOAD_FILE = '/fs/hdfs/upload';
CONSTANTS.FS.HDFS_DELETE_FILE = '/fs/hdfs/deleteFiles';
CONSTANTS.FS.HDFS_DOWNLOAD_FILE = '/fs/hdfs/download';
CONSTANTS.FS.HDFS_CHECK_DIRECTORY = '/fs/hdfs/existDirectory';
CONSTANTS.FS.HDFS_GET_INFO = '/fs/hdfs/info';
CONSTANTS.FS.HDFS_GET_SIZE = '/fs/hdfs/size';
CONSTANTS.FS.HDFS_GET_COUNT = '/fs/hdfs/count';
CONSTANTS.FS.HDFS_COPY_FILE = '/fs/hdfs/copy';
CONSTANTS.FS.HDFS_RENAME_FILE = '/fs/hdfs/rename';
CONSTANTS.FS.HDFS_MOVE_FILE = '/fs/hdfs/move';
CONSTANTS.FS.HDFS_FS_STATUS = '/fs/hdfs/fileSystemStatus';
CONSTANTS.FS.HDFS_SET_NAMENODE = '/fs/hdfs/nameNode';
CONSTANTS.FS.HDFS_NEW_HIVE_DB = '/fs/hive/db';

CONSTANTS.FS.AUDIT_HISTORY = '/fs/audit/list';

///////////////////////////////////////
// Workflow Management > Dashboard
///////////////////////////////////////

CONSTANTS.DASHBOARD.GET_ACTION_HISTORY = '/dashboard/actions';
CONSTANTS.DASHBOARD.GET_WORKFLOW_HISTORY = '/dashboard/workflows';
CONSTANTS.DASHBOARD.GET_WORKFLOW_XML = '/dashboard/xml';
CONSTANTS.DASHBOARD.GET_LOG = '/dashboard/log';
CONSTANTS.DASHBOARD.GET_SCRIPT = '/dashboard/script';
CONSTANTS.DASHBOARD.GET_WORKFLOW = '/dashboard/workflow';
CONSTANTS.DASHBOARD.KILL = '/dashboard/kill';
CONSTANTS.DASHBOARD.JOBS = '/dashboard/allJobs';
CONSTANTS.DASHBOARD.HADOOP_JOB_CONF = '/dashboard/jobConf';
CONSTANTS.DASHBOARD.HADOOP_JOB_COUNTERS = '/dashboard/jobCounters';
CONSTANTS.DASHBOARD.HADOOP_MR_SUMMARY = '/dashboard/mapreduceSummary';
CONSTANTS.DASHBOARD.HADOOP_JOB = '/dashboard/job';
CONSTANTS.DASHBOARD.HADOOP_PROGRESS_MAP = '/dashboard/map';
CONSTANTS.DASHBOARD.HADOOP_PROGRESS_REDUCE = '/dashboard/reduce';
CONSTANTS.DASHBOARD.HADOOP_JOB_TRACKER = '/dashboard/jobTracker';
CONSTANTS.DASHBOARD.HADOOP_HDFS = '/dashboard/hdfs';
CONSTANTS.DASHBOARD.HADOOP_CLUSTER_SUMMARY = '/dashboard/clusterSummary';
CONSTANTS.DASHBOARD.HADOOP_TASK_TRACKERS = '/dashboard/taskTrackers';
CONSTANTS.DASHBOARD.JOB_CONF_DOWNLOAD_FILE = '/dashboard/download';

///////////////////////////////////////
// Workflow Management > Designer
///////////////////////////////////////

CONSTANTS.REST_GET_CLUSTERS = '/rest/hadoop/clusters.do';
CONSTANTS.REST_NEW_TREE = '/rest/tree/new.do';
CONSTANTS.REST_RENAME_TREE = '/rest/tree/rename.do';
CONSTANTS.REST_CHECK_TREE = '/rest/tree/check.do';
CONSTANTS.REST_GET_WORKFLOW = '/rest/job/workflow.do';

CONSTANTS.REST_MOVE_TREE = '/rest/designer/move.do';
CONSTANTS.REST_GET_TREE = '/rest/designer/get.do';

CONSTANTS.REST_DELETE_WORKFLOW = '/rest/designer/delete.do';
CONSTANTS.REST_RENAME_RENAME = '/rest/designer/rename.do';
CONSTANTS.REST_METADATA_LOAD = '/rest/designer/loadMetadata.do';

CONSTANTS.REST_HDFS_GET_DIRECTORY = '/rest/hdfs/directory.do';
CONSTANTS.REST_HDFS_DELETE_DIRECTORY = '/rest/hdfs/deleteDirectory.do';
CONSTANTS.REST_HDFS_RENAME_DIRECTORY = '/rest/hdfs/renameDirectory.do';
CONSTANTS.REST_HDFS_MOVE_DIRECTORY = '/rest/hdfs/moveDirectory.do';
CONSTANTS.REST_HDFS_CHECK_DIRECTORY = '/rest/hdfs/existDirectory.do';
CONSTANTS.REST_HDFS_NEW_DIRECTORY = '/rest/hdfs/newDirectory.do';
CONSTANTS.REST_HDFS_GET_CLUSTER = '/rest/hadoop/clusters.do';
CONSTANTS.REST_HDFS_GET_FILE = '/rest/hdfs/file.do';
CONSTANTS.REST_HDFS_GET_INFO = '/rest/hdfs/info.do';
CONSTANTS.REST_HDFS_GET_SIZE = '/rest/hdfs/size.do';
CONSTANTS.REST_HDFS_GET_COUNT = '/rest/hdfs/count.do';
CONSTANTS.REST_HDFS_DELETE = '/rest/hdfs/delete.do';
CONSTANTS.REST_HDFS_COPY = '/rest/hdfs/copy.do';
CONSTANTS.REST_HDFS_RENAME = '/rest/hdfs/rename.do';
CONSTANTS.REST_HDFS_MOVE = '/rest/hdfs/move.do';
CONSTANTS.REST_HDFS_DOWNLOAD = '/rest/hdfs/download.do';
CONSTANTS.REST_HDFS_UPLOAD = '/rest/hdfs/upload.do';
CONSTANTS.REST_HDFS_FS_STATUS = '/rest/hadoop/fileSystemStatus.do';

///////////////////////////////////////
// USER LOGIN
///////////////////////////////////////

CONSTANTS.USER.AUTH = '/authenticate';

///////////////////////////////////////
// USER SIGNUP
///////////////////////////////////////
CONSTANTS.SIGNUP = '/signup';

///////////////////////////////////////
// FIND PASSWORD (forgot password?)
///////////////////////////////////////
CONSTANTS.FIND_PASSWORD = '/findpass';
CONSTANTS.FIND_USERNAME = '/finduser';
///////////////////////////////////////
// ADMINISTRATION
///////////////////////////////////////
CONSTANTS.LOGIN_ALLOWED = 'AUTH';
CONSTANTS.LOGIN_NOT_ALLOWED = 'NON-AUTH';

CONSTANTS.AUTH_ROLE_ADMIN = 'ROLE_ADMIN';
CONSTANTS.AUTH_ROLE_MANAGER = 'ROLE_MANAGER';
CONSTANTS.AUTH_ROLE_USER = 'ROLE_USER';

CONSTANTS.ABOUT_ANKUS = '<div><br><br>ankus is an open source data mining & machine learning library which is based on MapReduce.<br><br><a href=\'http://openankus.org\' target=\'_blank\'>@ Meet me on the web!</a></div>';

// 사용자 다국어 변경
CONSTANTS.UPDATE_USER_LANGUAGE = '/updateLanguage';

// TAJO
CONSTANTS.REST_TAJO_CREATE_DATABASE = '/create_tajoDatabase';
CONSTANTS.REST_TAJO_CREATE_TABLE = '/create_tajoTable';
CONSTANTS.REST_TAJO_DELETE_DATABASE = '/del_tajoDatabase';
CONSTANTS.REST_TAJO_DELETE_TABLE = '/del_tajoTable';
CONSTANTS.REST_TAJO_GET_DATABASES = '/get_tajodatabases';
CONSTANTS.REST_TAJO_GET_TABLES = '/get_tajotables';
CONSTANTS.REST_TAJO_RUN_QUERY = '/run_tajoQuery';

// MONITORING
CONSTANTS.REST_MONITORING_GET_HADOOPSTATUS = '/monitoring/get_hadoopstatus';