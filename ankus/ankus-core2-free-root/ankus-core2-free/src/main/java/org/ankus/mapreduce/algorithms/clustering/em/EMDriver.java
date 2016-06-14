/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.ankus.mapreduce.algorithms.clustering.em;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import org.ankus.mapreduce.algorithms.clustering.common.ClusterCommon;
import org.ankus.mapreduce.algorithms.preprocessing.normalize.NormalizeDriver;
import org.ankus.mapreduce.algorithms.statistics.nominalstats.NominalStatsDriver;
import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.ankus.util.ConfigurationVariable;
import org.ankus.util.Constants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EMDriver extends Configured implements Tool {

    private Logger logger = LoggerFactory.getLogger(EMDriver.class);

	//private String m_subDelimiter = "@@";
//    private String m_numericDelimiter = "@@NU@@";
//    private String m_nominalDelimiter = "@@NO@@";
//	  private int m_indexArr[];
//	  private int m_nominalIndexArr[];
//	  private int m_exceptionIndexArr[];
//    private int m_initialDataCnt = 5;

    private double m_convergeRate = 0.001;
    private int m_iterMax = 100;
	
	@Override
	public int run(String[] args) throws Exception {

		Configuration conf = this.getConf();
		//conf.set("fs.default.name",  "hdfs://localhost:9000");
		if(!ConfigurationVariable.setFromArguments(args, conf))
		{
            logger.info("> MR Job Setting Failed..");
			return 1;		
		}

        boolean isOnlyTest = false;
        boolean isTrained = false;
        boolean isTrainResultGen = false;
        if(conf.get(ArgumentsConstants.TRAINED_MODEL, null) != null) isOnlyTest = true;

        String outputBase = conf.get(ArgumentsConstants.OUTPUT_PATH, null);
//        String delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
        String finalClusterPath = "";

        int iterCnt = 0;

        // training
        if(!isOnlyTest)
        {
            logger.info("Core Part for EM is Started..");

            m_convergeRate = Double.parseDouble(conf.get(ArgumentsConstants.CLUSTER_TRAINING_CONVERGE, m_convergeRate + ""));
//            setIndexArray(conf);

            String oldClusterPath = outputBase + "/cluster_center_0";
            String newClusterPath;

            logger.info("> EM cluster initialization is Started..");

            conf.set(ArgumentsConstants.OUTPUT_PATH, oldClusterPath);               // init cluster - case 2 (random assign)
            if(!assignAndResetCluster(conf, "", true)) return 1;

            logger.info("> EM cluster iterations are Started..");
            while(true)
            {
                iterCnt++;
                logger.info(">> EM cluster iteration - " + iterCnt);

                newClusterPath = outputBase + "/cluster_center_" + iterCnt;
                conf.set(ArgumentsConstants.OUTPUT_PATH, newClusterPath);

                logger.info(">> MR-Job for Cluster Assign / Cluster Update is Started..");
                if(!assignAndResetCluster(conf, oldClusterPath, false))
                {
                    logger.info(">> MR-Job for Cluster Assign / Cluster Update is Failed..");
                    return 1;			// MR Job, assign and update cluster
                }
                logger.info(">> MR-Job for Cluster Assign / Cluster Update is Finished...");

                logger.info(">> Iteration Break Condition Check..");
                if(isClustersEqual(conf, oldClusterPath, newClusterPath)) break;	// cluster check
                else if(iterCnt >= Integer.parseInt(conf.get(ArgumentsConstants.MAX_ITERATION, m_iterMax + ""))) break;

                logger.info(">> Iteration is not Broken. Continue Next Iteration..");
                oldClusterPath = newClusterPath;
            }
            logger.info(">> Iteration is Broken..");
            logger.info("> Iteration(Cluster Assign / Cluster Update) is Finished....");

            isTrained = true;
            if(conf.get(ArgumentsConstants.FINAL_RESULT_GENERATION, "true").equals("true"))
                isTrainResultGen = true;

            finalClusterPath = newClusterPath;
        }

        // testing (model adaptation), final assign
        if(isOnlyTest || isTrainResultGen)
        {
            if(isTrainResultGen)
            {
                conf.set(ArgumentsConstants.OUTPUT_PATH, outputBase + "/clustering_result");
                if(!finalAssignCluster(conf, finalClusterPath)) return 1;					// Map Job, final assign cluster
                logger.info("> Finish Cluster Assign and Compute Distance for Trained Data..");
            }
            else if(isOnlyTest)
            {
                String trainedModelBaseStr = conf.get(ArgumentsConstants.TRAINED_MODEL, null);
                String clusterCenterPath = "";

                FileSystem fs = FileSystem.get(conf);
                FileStatus[] status = fs.listStatus(new Path(trainedModelBaseStr));
                for (int i=0;i<status.length;i++)
                {
                    if(status[i].getPath().toString().contains("cluster_center_"))
                    {
                        clusterCenterPath = status[i].getPath().toString();
                    }
                }

                conf.set(ArgumentsConstants.OUTPUT_PATH, outputBase + "/clustering_result");
                conf.set(ArgumentsConstants.CLUSTER_PATH, clusterCenterPath);

                String modelInfoArr[] = getModelInfoStrArr(conf, clusterCenterPath);
                conf.set(ArgumentsConstants.TARGET_INDEX, modelInfoArr[0]);
                conf.set(ArgumentsConstants.NOMINAL_INDEX, modelInfoArr[1]);
                conf.set(ArgumentsConstants.CLUSTER_COUNT, modelInfoArr[2]);

                finalClusterPath = clusterCenterPath;
                if(!finalAssignCluster(conf, finalClusterPath)) return 1;					// Map Job, final assign cluster
                logger.info("> Finish Cluster Assign and Compute Distance for New Data..");
            }

            // purity generation
            conf.set(ArgumentsConstants.INPUT_PATH, conf.get(ArgumentsConstants.OUTPUT_PATH));
            conf.set(ArgumentsConstants.OUTPUT_PATH, outputBase + "/purity_mr");
            int clusterIndex = ClusterCommon.getClusterIndex(conf);
            String params[] = ClusterCommon.getParametersForPurity(conf, clusterIndex);

            int res = ToolRunner.run(new NominalStatsDriver(), params);
            if(res!=0)
            {
                logger.info("Purity Computation (Nominal Stats) for EM is Failed..");
                return 1;
            }

            // result merge - mr job files
            ClusterCommon.finalPurityGen(conf, outputBase + "/purity");
            FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)), true);
            logger.info("Purity Computation (Nominal Stats) for EM is Successfully Finished..");


        }

        // temp delete
        if(conf.get(ArgumentsConstants.TEMP_DELETE, "true").equals("true"))
        {
            logger.info("Temporary Files are Deleted..: Cluster Center Info Files");
            if(isTrained)
            {
                for(int i=0; i<iterCnt; i++)
                {
                    FileSystem.get(conf).delete(new Path(outputBase + "/cluster_center_" + i), true);
                }
            }
        }

        logger.info("Core Part for EM is Successfully Finished...");
		return 0;
	}

    private String[] getModelInfoStrArr(Configuration conf, String clusterCenterPath) throws Exception
    {
        String returnArr[] = new String[3];
        for(int i=0; i<returnArr.length; i++) returnArr[i] = "";
        int clusterCnt = 0;
        String baseInfoStr = "";

        FileSystem fs = FileSystem.get(conf);
        FileStatus[] status = fs.listStatus(new Path(clusterCenterPath));
        for (int i=0;i<status.length;i++)
        {
            Path fp = status[i].getPath();
            if(fp.getName().indexOf("part-") < 0) continue;

            FSDataInputStream fin = fs.open(fp);
            BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));

            String readStr;
            while((readStr = br.readLine())!=null)
            {
                clusterCnt++;
                if(baseInfoStr.length() < 1) baseInfoStr = readStr;
            }
            br.close();
            fin.close();
        }
        returnArr[2] = clusterCnt + "";

        String tokens[] = baseInfoStr.split(conf.get(ArgumentsConstants.DELIMITER, "\t"));
        for(int i=1; i<tokens.length; i++)
        {
            if(tokens[i+1].contains(EMClusterInfoMgr.mNominalDelimiter)) returnArr[1] += "," + tokens[i];
            else returnArr[0] += "," + tokens[i];
            i++;
        }

        if(returnArr[0].length() == 0) returnArr[0] = "-1";
        else returnArr[0] = returnArr[0].substring(1);

        if(returnArr[1].length() == 0) returnArr[1] = "-1";
        else returnArr[1] = returnArr[1].substring(1);

        return returnArr;
    }

    @Deprecated
    public int run_old(String[] args) throws Exception {

        Configuration conf = this.getConf();
        if(!ConfigurationVariable.setFromArguments(args, conf))
        {
            logger.info("> MR Job Setting Failed..");
            return 1;
        }

        /**
         * TODO:
         * clustering process
         * 1. set initial cluster center (old-cluster): Main Driver Class
         * 		numeric - statistics based pdf function (avg=value, variance=avg/5 or 10)
         * 		nominal - frequency ratio
         * 2. assign cluster to each data and update cluster center (MR Job)
         * 		2.1 assign cluster to data using cluster-data distance (for all data): Map
         * 		2.2 update cluster center (new-cluster): Reduce
         * 4. compare old-cluster / new-cluster: Main Driver Class
         * 5. decision: Main Driver Class
         * 		if(euqal) exec 2.1 and finish
         * 		else if(maxIter) exec 2.1 and finish
         * 		else
         * 		{
         * 			pre-cluster <= post-cluster
         * 			goto Step 2
         * 		}
         *
         *
         * cluster representation
         * 0. id
         * 1. numeric => index '' average@@variance
         * 2. nominal => index '' value@@ratio[@@value@@ratio]+
         *
         * cluster-data distance
         * 1. numeric => 1 - pdf function value
         * 2. nominal => 1 - ratio(cluster=data)
         * => Total Distance (Average / CFSum / GeoAvg / HarAvg)
         */
        m_convergeRate = Double.parseDouble(conf.get(ArgumentsConstants.CLUSTER_TRAINING_CONVERGE, m_convergeRate + ""));
        //setIndexArray(conf);

        int iterCnt = 0;
        String outputBase = conf.get(ArgumentsConstants.OUTPUT_PATH, null);

        String oldClusterPath = outputBase + "/cluster_center_0";
        String newClusterPath;

        logger.info("> EM cluster initialization is Started..");

        conf.set(ArgumentsConstants.OUTPUT_PATH, oldClusterPath);               // init cluster - case 2 (random assign)
        if(!assignAndResetCluster(conf, "", true)) return 1;

        logger.info("> EM cluster iterations are Started..");
        while(true)
        {
            iterCnt++;
            newClusterPath = outputBase + "/cluster_center_" + iterCnt;
            conf.set(ArgumentsConstants.OUTPUT_PATH, newClusterPath);

            logger.info(">> EM cluster iteration - " + iterCnt);
            if(!assignAndResetCluster(conf, oldClusterPath, false)) return 1;			// MR Job, assign and update cluster

            if(isClustersEqual(conf, oldClusterPath, newClusterPath)) break;	// cluster check
            else if(iterCnt >= Integer.parseInt(conf.get(ArgumentsConstants.MAX_ITERATION, m_iterMax + ""))) break;

            oldClusterPath = newClusterPath;
        }
        logger.info("> EM cluster iterations are Finished...");

        if(conf.get(ArgumentsConstants.FINAL_RESULT_GENERATION, "true").equals("true"))
        {
            logger.info("> EM cluster final assign...");
            conf.set(ArgumentsConstants.OUTPUT_PATH, outputBase + "/clustering_result");
            if(!finalAssignCluster(conf, newClusterPath)) return 1;					// Map Job, final assign cluster
        }

        if(conf.get(ArgumentsConstants.TEMP_DELETE, "true").equals("true"))
        {
            for(int i=0; i<iterCnt; i++)
            {
                FileSystem.get(conf).delete(new Path(outputBase + "/cluster_center_" + i), true);
            }
            logger.info("> Temporary Files are deleted..");
        }

        return 0;
    }
	

//    private void setInitialClusterCenter(Configuration conf, String clusterOutputPath) throws Exception
//	{
//		/**
//		 * TODO:
//		 * Current Process
//		 * 		- get top n data (n is defined cluster count)
//		 * 		- set each data to initial cluster center
//		 *
//		 * Following Process is reasonable. => MR Job
//		 * 		1. Distribution
//		 * 			- get statistics(distribution) for all attributes
//		 * 			- use min/max and freq for initial cluster center setting
//		 * 		numeric => (max-min) / cluster count
//		 * 		nominal => each value (freq sort)
//		 */
//		FileSystem fs = FileSystem.get(conf);
//
//		String readStr, tokens[];
//		int index = 0;
//		int clusterCnt = Integer.parseInt(conf.get(ArgumentsConstants.CLUSTER_COUNT, "1"));
//		EMClusterInfoMgr clusters[] = new EMClusterInfoMgr[clusterCnt];
//
//		Path inputPath = new Path(conf.get(ArgumentsConstants.INPUT_PATH, null));
//		if(!fs.isFile(inputPath))
//		{
//			boolean isFile = false;
//			while(!isFile)
//			{
//				FileStatus[] status = fs.listStatus(inputPath);
//		        if(fs.isFile(status[0].getPath())) isFile = true;
//
//		        inputPath = status[0].getPath();
//			}
//		}
//
//		FSDataInputStream fin = fs.open(inputPath);
//		BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));
//
//        while((readStr = br.readLine())!=null)
//		{
//			clusters[index] = new EMClusterInfoMgr();
//			clusters[index].setClusterID(index);
//
//			for(int k=0; k<m_initialDataCnt; k++)
//			{
//				tokens = readStr.split(conf.get(ArgumentsConstants.DELIMITER, "\t"));
//				for(int i=0; i<tokens.length; i++)
//				{
//					if(CommonMethods.isContainIndex(m_indexArr, i, true)
//							&& !CommonMethods.isContainIndex(m_exceptionIndexArr, i, false))
//					{
//						if(CommonMethods.isContainIndex(m_nominalIndexArr, i, false))
//						{
//							clusters[index].addAttributeValue(i, tokens[i], ConfigurationVariable.DATATYPE_NOMINAL);
//						}
//						else clusters[index].addAttributeValue(i, tokens[i], ConfigurationVariable.DATATYPE_NUMERIC);
//					}
//				}
//
//				if(k < (m_initialDataCnt-1)) readStr = br.readLine();
//			}
//			clusters[index].finalCompute(m_initialDataCnt);
//
//			index++;
//			if(index >= clusterCnt) break;
//		}
//
//		br.close();
//		fin.close();
//
//		FSDataOutputStream fout = fs.create(new Path(clusterOutputPath + "/part-r-00000"), true);
//		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fout, Constants.UTF8));
//
//		for(int i=0; i<clusters.length; i++)
//		{
//			bw.write(clusters[i].getClusterInfoString(conf.get(ArgumentsConstants.DELIMITER, "\t")) + "\n");
//		}
//
//		bw.close();
//		fout.close();
//
//	}
	
	private boolean assignAndResetCluster(Configuration conf, String oldClusterPath, boolean isInitial) throws Exception
	{
		/**
		 * Map Job
		 * 		- load old cluster center
		 * 		- each data -> compute distance to each cluster
		 * 		- assign cluster number using distance: Map Key for Reduce
		 * 
		 * Reduce Job
		 * 		- compute new center
		 * 		- save key and computed center info
		 */
		
		Job job = new Job(this.getConf());
		
		FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
		FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)));
		
		job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
		job.getConfiguration().set(ArgumentsConstants.TARGET_INDEX, conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.NOMINAL_INDEX, conf.get(ArgumentsConstants.NOMINAL_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.EXCEPTION_INDEX, conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.CLUSTER_COUNT, conf.get(ArgumentsConstants.CLUSTER_COUNT, "1"));
		job.getConfiguration().set(ArgumentsConstants.CLUSTER_PATH, oldClusterPath);
//		job.getConfiguration().set("subDelimiter", m_subDelimiter);

        if(isInitial) job.getConfiguration().set("IS_INITIAL", "TRUE");
        else job.getConfiguration().set("IS_INITIAL", "FALSE");

		job.setJarByClass(EMDriver.class);
		
		job.setMapperClass(EMClusterAssignMapper.class);
		job.setReducerClass(EMClusterUpdateReducer.class);

		job.setMapOutputKeyClass(IntWritable.class);
		job.setMapOutputValueClass(Text.class);

		job.setOutputKeyClass(NullWritable.class);
		job.setOutputValueClass(Text.class);

		if(!job.waitForCompletion(true))
    	{
            logger.info("> Error: MR for EM(Rutine) is not Completeion");
        	return false;
        }
		
        return true;
	}
	
	private boolean isClustersEqual(Configuration conf, String oldClusterPath, String newClusterPath) throws Exception
	{
		/**
		 * Check clusters are equal (cluster index and center info)
		 * Load 2 files
		 * 		HashMap Structure: Key - Cluster Index
		 * 							Value - Cluster Center Info. String
		 * for each Value of Keys, check
		 */

        /**
         * After Reducer, There are some Cluster that don't have any Data..
         * Then, the number of oldCluster is not equal the number of newCluster
         * --> isEqualClusterInfo: null pointer error
         */
		int clusterCnt = Integer.parseInt(conf.get(ArgumentsConstants.CLUSTER_COUNT, "1"));
		String delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");

		EMClusterInfoMgr oldClusters[] = EMClusterInfoMgr.loadClusterInfoFile(conf, new Path(oldClusterPath), clusterCnt, delimiter);
		EMClusterInfoMgr newClusters[] = EMClusterInfoMgr.loadClusterInfoFile(conf, new Path(newClusterPath), clusterCnt, delimiter);

        boolean isAllSame = true;
        boolean isNullCluster = false;
        String nullCLusterStr = "";

		for(int i=0; i<clusterCnt; i++)
		{
			if(newClusters[i]==null)
            {
                isNullCluster = true;
                nullCLusterStr += oldClusters[i].getClusterInfoString(delimiter) + "\n";
            }
            else if(!oldClusters[i].isEqualClusterInfo(newClusters[i], m_convergeRate)) isAllSame = false;
		}

        if(isNullCluster)
        {
            FileSystem fs = FileSystem.get(conf);
            FileStatus[] status = fs.listStatus(new Path(newClusterPath));
            Path newFilePath = new Path(newClusterPath + "/part-r-" + String.format("%05d", status.length + 10000));

            FSDataOutputStream fout = fs.create(newFilePath, true);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fout, Constants.UTF8));

            bw.write(nullCLusterStr);

            bw.close();
            fout.close();
        }

		return isAllSame;
	}
	
	private boolean finalAssignCluster(Configuration conf, String clusterPath) throws Exception
	{
		/**
		 * Map Job (ref. Map job of 'assignAndResetCluster()')
		 * 
		 * If cat use MR default delimiter then, use Map job of 'assignAndResetCluster()'
		 * else, * Modified Map Job for Writing (no key, key is used to last attribute)
		 */
		Job job = new Job(this.getConf());
		
		FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
		FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)));
		
		job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
		job.getConfiguration().set(ArgumentsConstants.TARGET_INDEX, conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.NOMINAL_INDEX, conf.get(ArgumentsConstants.NOMINAL_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.EXCEPTION_INDEX, conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.CLUSTER_COUNT, conf.get(ArgumentsConstants.CLUSTER_COUNT, "1"));
		job.getConfiguration().set(ArgumentsConstants.CLUSTER_PATH, clusterPath);
//		job.getConfiguration().set("nominalDelimiter", m_subDelimiter);
		
		job.setJarByClass(EMDriver.class);
		
		job.setMapperClass(EMClusterAssignFinalMapper.class);

		job.setMapOutputKeyClass(NullWritable.class);
		job.setMapOutputValueClass(Text.class);

		job.setNumReduceTasks(0);
		
		if(!job.waitForCompletion(true))
    	{
            logger.info("> Error: MR for EM(Final) is not Completeion");
        	return false;
        }
		
        return true;
	}
	
//	private void setIndexArray(Configuration conf)
//	{
//		m_indexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX,  "-1"));
//		m_nominalIndexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.NOMINAL_INDEX,  "-1"));
//		m_exceptionIndexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.EXCEPTION_INDEX,  "-1"));
//	}
	
	public static void main(String args[]) throws Exception 
	{
		int res = ToolRunner.run(new EMDriver(), args);
        System.exit(res);
	}
}
