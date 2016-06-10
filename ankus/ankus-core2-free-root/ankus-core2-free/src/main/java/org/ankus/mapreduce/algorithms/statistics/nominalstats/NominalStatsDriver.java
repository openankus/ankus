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
package org.ankus.mapreduce.algorithms.statistics.nominalstats;

import java.io.*;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.Constants;
import org.ankus.util.Usage;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;

import org.ankus.util.ConfigurationVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * NominalStatsDriver
 * @desc Statistics Computation for Nominal Features (Frequency, Ratio)
 *
 * @version 0.0.1
 * @date : 2013.08.20
 * @author Moonie
 */
public class NominalStatsDriver extends Configured implements Tool {

    private Logger logger = LoggerFactory.getLogger(NominalStatsDriver.class);

    @Override
	public int run(String[] args) throws Exception
	{
		/**
		 * 1st Job - Frequency Computation (MR)
		 * 2nd Job - Ratio Computation (By Total Record Count, Map Only)
		 */
        logger.info("Nominal Statistics MR-Job is Started..");

		Configuration conf = this.getConf();
		//conf.set("fs.defaultFS",  "hdfs://localhost:9000");
		if(!ConfigurationVariable.setFromArguments(args, conf))
		{
			logger.error("MR Job Setting Failed..");
            Usage.printUsage(Constants.DRIVER_NOMINAL_STATS);
            logger.info("Error: MR Job Setting Failed..: Configuration Failed");
            return 1;
		}

		String tempStr = "_freqs";

        logger.info("1st-Step of MR-Job is Started..");

		Job job1 = new Job(this.getConf());
		set2StepJob1(job1, conf, tempStr);
        job1.setJarByClass(NominalStatsDriver.class);

        job1.setMapperClass(NominalStatsFrequencyMapper.class);
        //job1.setCombinerClass(NominalStatsFrequencyReducer.class);
        job1.setReducerClass(NominalStatsFrequencyReducer.class);

        job1.setMapOutputKeyClass(Text.class);
        job1.setMapOutputValueClass(IntWritable.class);

        job1.setOutputKeyClass(NullWritable.class);
        job1.setOutputValueClass(Text.class);

//        job1.getConfiguration().set("mapred.reduce.slowstart.completed.maps", "1.0");
        
        if(!job1.waitForCompletion(true))
    	{
        	logger.error("Error: MR(Step-1) for Nominal Stats is not Completion");
            logger.info("MR-Job is Failed..");
            return 1;
        }
        logger.info("1st-Step of MR-Job is successfully finished..");

        long mapOutCnt = job1.getCounters().findCounter("org.apache.hadoop.mapred.Task$Counter", "MAP_OUTPUT_RECORDS").getValue();


        logger.info("Final Ratio Computation and Result Integration is Starting..");
        String inputPath = conf.get(ArgumentsConstants.OUTPUT_PATH) + tempStr;
        String outputFile = conf.get(ArgumentsConstants.OUTPUT_PATH) + "/result";
        finalComputation(conf, inputPath, mapOutCnt, outputFile);
        logger.info("Final Ratio Computation and Result Integration is Finished..");


//        logger.info("2nd-Step of MR-Job is Started..");
//
//        Job job2 = new Job(this.getConf());
//        set2StepJob2(job2, conf, tempStr, mapOutCnt);
//        job2.setJarByClass(NominalStatsDriver.class);
//
//        job2.setMapperClass(NominalStatsRatioMapper.class);
//
//        job2.setMapOutputKeyClass(NullWritable.class);
//        job2.setMapOutputValueClass(Text.class);
//
//        job2.setNumReduceTasks(0);
//
//        if(!job2.waitForCompletion(true))
//    	{
//        	logger.error("Error: MR(Step-2) for Nominal Stats is not Completeion");
//            logger.info("MR-Job is Failed..");
//        	return 1;
//        }

        // temp deletetion
        if(conf.get(ArgumentsConstants.TEMP_DELETE, "true").equals("true"))
        {
            logger.info("Temporary Files are Deleted..: " + conf.get(ArgumentsConstants.OUTPUT_PATH) + tempStr);
        	FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + tempStr), true);
        }
        logger.info("MR-Job is successfully finished..");
        return 0;
	}

//    /**
//     * @desc configuration setting for 2nd job of 2-step mr job
//     * @parameter
//     *      job : job identifier
//     *      conf : configuration identifier for job
//     *      inputPathStr : input path for job
//     *      mapOutCnt : total count of values (map count of 1st mr job)
//     */
//    private void set2StepJob2(Job job, Configuration conf, String inputPathStr, long mapOutCnt) throws IOException
//    {
//        FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.OUTPUT_PATH) + inputPathStr);
//        FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)));
//        job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
//        job.getConfiguration().set(Constants.COMMON_MAP_OUTPUT_CNT, mapOutCnt + "");
//    }

    private void finalComputation(Configuration conf, String inputPath, long dataCnt, String outputFile) throws Exception
    {
        FileSystem fs = FileSystem.get(conf);
        String delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
        String targetIndex = conf.get(ArgumentsConstants.TARGET_INDEX, "-1");

        FSDataOutputStream fout = fs.create(new Path(outputFile), true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fout, Constants.UTF8));
        bw.write("# Attr-" + targetIndex + delimiter + "frequency" + delimiter + "ratio" + "\n");

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
                    long freq = Long.parseLong(tokens[1]);
                    if(freq == 0) bw.write(readStr + delimiter + "0\n");
                    else bw.write(readStr + delimiter + ((double)freq/(double)dataCnt) + "\n");
                }

                br.close();
                fin.close();
            }
        }
        bw.close();
        fout.close();
    }





	public static void main(String args[]) throws Exception 
	{
		int res = ToolRunner.run(new NominalStatsDriver(), args);
        System.exit(res);
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
	}


}
