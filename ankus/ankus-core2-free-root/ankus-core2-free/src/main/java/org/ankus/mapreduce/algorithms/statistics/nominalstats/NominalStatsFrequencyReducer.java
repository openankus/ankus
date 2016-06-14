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

import java.io.IOException;
import java.util.Iterator;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Reducer;

/**
 * NominalStatsFrequencyReducer
 * @desc 1st reducer class for nominal statistics computation mr job (2-step)
 * @version 0.0.1
 * @date : 2013.08.20
 * @author Moonie
 */
public class NominalStatsFrequencyReducer extends Reducer<Text, IntWritable, NullWritable, Text>{
	
	private String delimiter;
    private double totalCnt;

    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
        Configuration conf = context.getConfiguration();
        delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");

        totalCnt = (double)context.getCounter("NOMINALSTAT","MAPCOUNT").getValue();

//        Job j = new Job(context.getConfiguration());
//        totalCnt = (double)j.getCounters().findCounter("NOMINALSTAT","MAPCOUNT").getValue();
    }

	@Override
	protected void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException
	{
		Iterator<IntWritable> iterator = values.iterator();
						
		long sum = 0;
        while (iterator.hasNext()) 
        {
        	sum += iterator.next().get();
        }
        context.write(NullWritable.get(), new Text(key.toString() + delimiter + sum));

//        double ratio = (double)sum / totalCnt;
//        context.write(NullWritable.get(), new Text(key.toString() + delimiter + sum + delimiter + ratio));
	}

    @Override
    protected void cleanup(Context context) throws IOException, InterruptedException
    {
    }
}
