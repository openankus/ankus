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
package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import org.ankus.mapreduce.algorithms.clustering.em.EMDriver;
import org.ankus.mapreduce.algorithms.statistics.nominalstats.NominalStatsFrequencyMapper;
import org.ankus.mapreduce.algorithms.statistics.nominalstats.NominalStatsFrequencyReducer;
import org.ankus.util.ArgumentsConstants;
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
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;

/**
 *
 * @desc
 *
 * @version 0.4.0
 * @date : 2015.08.
 * @author Moonie
 */
public class DiscretizationDriver extends Configured implements Tool {

    private Logger logger = LoggerFactory.getLogger(DiscretizationDriver.class);

    @Override
	public int run(String[] args) throws Exception
	{
        logger.info("Discretization for Numeric Data MR-Job is Started..");

		Configuration conf = this.getConf();
		//conf.set("fs.default.name",  "hdfs://localhost:9000");
		if(!ConfigurationVariable.setFromArguments(args, conf))
		{
			logger.error("MR Job Setting Failed..");
            logger.info("Error: MR Job Setting Failed..: Configuration Failed");
            return 1;
		}

		String tempStr = "_tmpOutput";

        logger.info("MR-Job is Started..");

        String params[] = getParametersFor1DimEM(conf);
        int res = ToolRunner.run(new EMDriver(), params);
        if(res!=0)
        {
            logger.info("MR based 1 Dimension EM for Descretization is Failed..");
            return 1;
        }

        // model delete?  result representation   x <= 25 then group 1 else x > 25 then group 2

        logger.info("MR-Job is successfully finished..");
        return 0;
	}

    private String[] getParametersFor1DimEM(Configuration conf) throws Exception
    {
        //String params[] = new String[16];
        String params[] = new String[14];

        params[0] = ArgumentsConstants.INPUT_PATH;
        params[1] = conf.get(ArgumentsConstants.INPUT_PATH, null);

        params[2] = ArgumentsConstants.OUTPUT_PATH;
        params[3] = conf.get(ArgumentsConstants.OUTPUT_PATH, null);

        params[4] = ArgumentsConstants.DELIMITER;
        params[5] = conf.get(ArgumentsConstants.DELIMITER, "\t");

        params[6] = ArgumentsConstants.TARGET_INDEX;
        params[7] = conf.get(ArgumentsConstants.TARGET_INDEX);

        params[8] = ArgumentsConstants.TEMP_DELETE;
        params[9] = "true";

        params[10] = ArgumentsConstants.FINAL_RESULT_GENERATION;
        params[11] = "true";

        params[12] = ArgumentsConstants.CLUSTER_COUNT;
        params[13] = conf.get(ArgumentsConstants.DISCRETIZATION_COUNT, "2");

        return params;
    }



	public static void main(String args[]) throws Exception 
	{
		int res = ToolRunner.run(new DiscretizationDriver(), args);
        System.exit(res);
	}



}
