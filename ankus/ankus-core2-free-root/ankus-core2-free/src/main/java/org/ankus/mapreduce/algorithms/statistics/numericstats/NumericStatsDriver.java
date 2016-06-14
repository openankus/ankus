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
package org.ankus.mapreduce.algorithms.statistics.numericstats;

import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.ankus.util.ConfigurationVariable;
import org.ankus.util.Constants;
import org.ankus.util.Usage;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Counter;
import org.apache.hadoop.mapreduce.CounterGroup;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.ankus.util.ArgumentsConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * NumericStatsDriver
 * @desc Statistics Computation for Numeric Features (Avg, Min, Max, StdDev, .....)
 * @version 0.0.1
 * @date : 2013.08.21
 * @author Moonie
 */
public class NumericStatsDriver extends Configured implements Tool {

    private Logger logger = LoggerFactory.getLogger(NumericStatsDriver.class);

    public static void main(String args[]) throws Exception
    {
        int res = ToolRunner.run(new NumericStatsDriver(), args);
        System.exit(res);
    }
    
    public void NumericStats(String args[])  throws Exception
    {
    	int res = ToolRunner.run(new NumericStatsDriver(), args);
        System.exit(res);
    }
    /**
     * @desc configuration setting for 1-step mr job
     * @parameter
     *      job : job identifier
     *      conf : configuration identifier for job
     */
    private void set1StepJob(Job job, Configuration conf, String outputPathStr) throws IOException
    {
        // TODO
        FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
        FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputPathStr));
        job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
        job.getConfiguration().set(ArgumentsConstants.TARGET_INDEX, conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
        job.getConfiguration().set(ArgumentsConstants.EXCEPTION_INDEX, conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
    }

    /**
     * @desc configuration setting for 1st job of 2-step mr job
     * @parameter
     *      job : job identifier
     *      conf : configuration identifier for job
     *      outputPathStr : output path for job
     */
    private void set2StepJob1(Job job, Configuration conf, String outputPathStr) throws IOException
    {
        FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
        FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputPathStr));
        job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
        job.getConfiguration().set(ArgumentsConstants.TARGET_INDEX, conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
        job.getConfiguration().set(ArgumentsConstants.EXCEPTION_INDEX, conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
    }

    /**
     * @desc configuration setting for 2nd job of 2-step mr job
     * @parameter
     *      job : job identifier
     *      conf : configuration identifier for job
     *      inputPathStr : input path for job
     *      mapOutCnt : total count of values (map count of 1st mr job)
     */
    private void set2StepJob2(Job job, Configuration conf, String inputPathStr, String outputPathStr) throws IOException
    {
        FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.OUTPUT_PATH) + inputPathStr);
        FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputPathStr));
        job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
    }

	@Override
	public int run(String[] args) throws Exception
	{
		/**
		 * 1st Job - Segmentation and Local Computation (MR)
		 * 2nd Job - Global Computation (MR)
		 */
        logger.info("Numeric Statistics MR-Job is Started..");

        Configuration conf = null;
        conf = this.getConf();
        //Configuration conf = new Configuration();//this.getConf();
        conf.set("fs.default.name",  "hdfs://localhost:9000");
        
		if(!ConfigurationVariable.setFromArguments(args, conf))
		{
			logger.error("MR Job Setting Failed..");
            Usage.printUsage(Constants.DRIVER_NUMERIC_STATS);

            logger.info("Error: MR Job Setting Failed..: Configuration Error");
            return 1;
		}

        String resultPath_1 = "_res1";
		
		if(conf.get(ArgumentsConstants.MR_JOB_STEP, "2").equals("1"))
		{
            logger.info("MR-Job for Basic Stats is set to 1-Step.");

			Job job = new Job(this.getConf());
			set1StepJob(job, conf, resultPath_1);
			job.setJarByClass(NumericStatsDriver.class);
			
			job.setMapperClass(NumericStats1_1MRMapper.class);
			job.setReducerClass(NumericStats1_1MRReducer.class);

			job.setMapOutputKeyClass(IntWritable.class);
			job.setMapOutputValueClass(Text.class);

			job.setOutputKeyClass(NullWritable.class);
			job.setOutputValueClass(Text.class);
			
			if(!job.waitForCompletion(true))
	    	{
	        	logger.error("Error: MR for Numeric Stats is not Completeion");
                logger.info("MR-Job for Basic Stats is Failed..");
	        	return 1;
	        }
		}
		else
		{
            logger.info("MR-Job for Basic Stats is set to 2-Step.");
			String outputTempStr = "_splitStat";
			
            logger.info("1st-Step of MR-Job is Started..");
            //Job job1 = new Job(); //runtime file access error
			Job job1 = new Job(this.getConf());
			set2StepJob1(job1, conf, outputTempStr);
			job1.setJarByClass(NumericStatsDriver.class);

	        job1.setMapperClass(NumericStats1_2MRSplitMapper.class);
	        job1.setReducerClass(NumericStats1_2MRSplitReducer.class);

	        job1.setMapOutputKeyClass(Text.class);
	        job1.setMapOutputValueClass(Text.class);

	        job1.setOutputKeyClass(Text.class);
	        job1.setOutputValueClass(Text.class);

	        if(!job1.waitForCompletion(true))
	    	{
	        	logger.error("Error: MR(1st step) for Numeric Stats is not Completion");
                logger.info("MR-Job is Failed..");
                return 1;
	        }

            logger.info("1st-Step of MR-Job is successfully finished..");
            logger.info("2nd-Step of MR-Job is Started..");
	        
	        Job job2 = new Job(this.getConf());
	        set2StepJob2(job2, conf, outputTempStr, resultPath_1);
	        job2.setJarByClass(NumericStatsDriver.class);

	        job2.setMapperClass(NumericStats1_2MRMergeMapper.class);
	        job2.setReducerClass(NumericStats1_2MRMergeReducer.class);

	        job2.setMapOutputKeyClass(Text.class);
	        job2.setMapOutputValueClass(Text.class);

	        job2.setOutputKeyClass(NullWritable.class);
	        job2.setOutputValueClass(Text.class);

	        if(!job2.waitForCompletion(true))
	    	{
	        	logger.error("Error: MR(2nd step) for Numeric Stats is not Completion");
                logger.info("MR-Job is Failed..");
                return 1;
	        }

            logger.info("2nd-Step of MR-Job is successfully finished..");
	        
	        // temp deletion
	        if(conf.get(ArgumentsConstants.TEMP_DELETE, "true").equals("true"))
	        {
                logger.info("Temporary Files are Deleted..: " + conf.get(ArgumentsConstants.OUTPUT_PATH) + outputTempStr);
	        	FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputTempStr), true);
	        }
		}
        logger.info("MR-Job for Basic Stats is successfully finished..");

        logger.info("MR-Job for Quartiles is Started....");
        logger.info("1st MR-Job for Quartiles (Block Position Setting) is Started....");
        String outputTmp2_1 = "_2_1_BlockPos";
        CounterGroup cg;
        if((cg=execBlockPositionSetMRJob(conf, resultPath_1, outputTmp2_1))==null)
        {
            logger.error("1st MR-Job for Quartiles (Block Position Setting) is Failed...");
            return 1;
        }

        logger.info("1st MR-Job for Quartiles (Get Quatiles) is Started....");
        String outputTmp2_2 = "_2_2_BlockPos";
        if(!getQuatilesInfoMRJob(conf, resultPath_1, outputTmp2_1, cg, outputTmp2_2))
        {
            logger.error("2nd MR-Job for Quartiles (Get Quatiles) is Failed...");
            return 1;
        }
        // final merge and computation

        logger.info("Final Computation and Result Integration is Starting..");
        String finalOutputFile = "/result";
        if(!finalComputationAndGeneration(conf, resultPath_1, outputTmp2_2, finalOutputFile))
        {
            logger.error("Final Result Integration is Failed...");
            return 1;
        }

        // tempDelete : resultPath_1 , outputTmp2_1 , outputTmp2_2
        if(conf.get(ArgumentsConstants.TEMP_DELETE, "true").equals("true"))
        {
            logger.info("Temporary Files are Deleted..: ");
            FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + resultPath_1), true);
            FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputTmp2_1), true);
            FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputTmp2_2), true);
        }

        return 0;
	}

    private boolean finalComputationAndGeneration(Configuration conf, String inputPath1, String inputPath2, String outputFile) throws Exception
    {
        HashMap<String, Double> quartileMap = getFinalQuartileValues(conf, conf.get(ArgumentsConstants.OUTPUT_PATH) + inputPath2);

        if(quartileMap==null) return false;

        String delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
        FileSystem fs = FileSystem.get(conf);

        FSDataOutputStream fout = fs.create(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputFile), true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fout, Constants.UTF8));
        bw.write("# AttrIndex" + delimiter +
                    "Sum" + delimiter +
                    "Average" + delimiter +
                    "HarmonicAverage" + delimiter +
                    "GeographicAverage" + delimiter +
                    "Variance" + delimiter +
                    "StandardDeviation" + delimiter +
                    "Max" + delimiter +
                    "Min" + delimiter +
                    "DataCnt" + delimiter +
                    "1stQuartile" + delimiter +
                    "2ndQuartile" + delimiter +
                    "3rdQuartile" + "\n");

        FileStatus[] status = fs.listStatus(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + inputPath1));
        for (int i=0;i<status.length;i++)
        {
            Path fp = status[i].getPath();

            if(fp.getName().indexOf("part-")==0)
            {
                FSDataInputStream fin = fs.open(fp);
                BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));

                String readStr, tokens[];
                while((readStr=br.readLine())!=null)
                {
                    tokens = readStr.split(delimiter);

                    String qStr = quartileMap.get(tokens[0] + "-1Q") + delimiter +
                                    quartileMap.get(tokens[0] + "-2Q") + delimiter +
                                    quartileMap.get(tokens[0] + "-3Q");
                    bw.write(readStr + delimiter + qStr + "\n");
                }

                br.close();
                fin.close();
            }
        }

        bw.close();
        fout.close();
        return true;
    }

    private HashMap<String, Double> getFinalQuartileValues(Configuration conf, String inputPath) throws Exception
    {
        HashMap<String, Double> retMap = new HashMap<String, Double>();
        String delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");

        FileSystem fs = FileSystem.get(conf);
        FileStatus[] status = fs.listStatus(new Path(inputPath));
        for (int i=0;i<status.length;i++)
        {
            Path fp = status[i].getPath();

            if(fp.getName().indexOf("part-")==0)
            {
                FSDataInputStream fin = fs.open(fp);
                BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));

                String readStr, tokens[];
                while((readStr=br.readLine())!=null)
                {
                    tokens = readStr.split(delimiter);
                    double curVal = Double.parseDouble(tokens[1]);
                    if(retMap.containsKey(tokens[0]))
                    {
                        double prevVal = retMap.get(tokens[0]);
                        curVal = (prevVal + curVal) / 2;
                    }

                    retMap.put(tokens[0], curVal);
                }

                br.close();
                fin.close();
            }
        }

        if(retMap.size() == 0) return null;
        return retMap;
    }

    private boolean getQuatilesInfoMRJob(Configuration conf, String preResultPathStr, String inputPathStr, CounterGroup cg, String outputPathStr) throws Exception
    {
    	//Job job = new Job(); //runtime error when file access
    	Job job = new Job(this.getConf());
        
        FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.OUTPUT_PATH) + inputPathStr);
        FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputPathStr));

        job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
        job.getConfiguration().set(ArgumentsConstants.OUTPUT_PATH, conf.get(ArgumentsConstants.OUTPUT_PATH));

        extractBlockInfoToConf(job.getConfiguration(), preResultPathStr);
        Iterator<Counter> iter = cg.iterator();
        while(iter.hasNext())
        {
            Counter c = iter.next();
            job.getConfiguration().set(c.getName(), c.getValue() + "");
        }

        job.setJarByClass(NumericStatsDriver.class);

        job.setMapperClass(NumericStats2_QuartilesMapper.class);
        job.setReducerClass(NumericStats2_QuartilesReducer.class);

        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(Text.class);

        job.setOutputKeyClass(NullWritable.class);
        job.setOutputValueClass(Text.class);

        if(!job.waitForCompletion(true))
        {
            logger.error("Error: MR-Job for Quartiles (Get Quatiles) is Failed...");
            logger.info("MR-Job is Failed..");
            return false;
        }


        return true;

    }

    private CounterGroup execBlockPositionSetMRJob(Configuration conf, String preResultPathStr, String outputPathStr) throws Exception
    {
    	//Job job = new Job(); //runtime error when file access
    	Job job = new Job(this.getConf());

        FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
        FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + outputPathStr));

        // delimiter, index, exception

        job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
        job.getConfiguration().set(ArgumentsConstants.TARGET_INDEX, conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
        job.getConfiguration().set(ArgumentsConstants.EXCEPTION_INDEX, conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));

        job.getConfiguration().set(ArgumentsConstants.OUTPUT_PATH, conf.get(ArgumentsConstants.OUTPUT_PATH));
        extractBlockInfoToConf(job.getConfiguration(), preResultPathStr);

        job.setJarByClass(NumericStatsDriver.class);

        job.setMapperClass(NumericStats2_BlockInfoMapper.class);
        job.setNumReduceTasks(0);

        job.setMapOutputKeyClass(NullWritable.class);
        job.setMapOutputValueClass(Text.class);

        if(!job.waitForCompletion(true))
        {
            logger.error("Error: MR-Job for Quartiles (Block Position Setting) is Failed...");
            logger.info("MR-Job is Failed..");
            return null;
        }

        return job.getCounters().getGroup(Constants.STATS_NUMERIC_QUARTILE_COUNTER);
    }

    private void extractBlockInfoToConf(Configuration conf, String inputPathStr) throws Exception
    {
        FileSystem fs = FileSystem.get(conf);
        FileStatus[] status = fs.listStatus(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + inputPathStr));
        String delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");

        for (int i=0;i<status.length;i++)
        {
            Path fp = status[i].getPath();
            if(fp.getName().indexOf("part-")==0)
            {
                FSDataInputStream fin = fs.open(fp);
                BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));

                String readStr, tokens[];
                while((readStr=br.readLine())!=null)
                {
                    tokens = readStr.split(delimiter);
                    String confKeyStr = tokens[0] + "Block";
                    double block2 = Double.parseDouble(tokens[2]);
                    double block1 = (block2 + Double.parseDouble(tokens[8]))/2.0;
                    double block3 = (block2 + Double.parseDouble(tokens[7]))/2.0;
                    String cntStr = tokens[9];

                    conf.set(confKeyStr, block1 + "," + block2 + "," + block3 + "," + cntStr);
                }

                br.close();
                fin.close();
            }
        }



    }
}
