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

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.ankus.util.Constants;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Counter;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

/**
 * NumericStats1_1MRMapper
 * @desc mapper class for numeric statistics computation mr job (1-step)
 * @version 0.0.1
 * @date : 2013.08.21
 * @author Moonie
 */
public class NumericStats2_BlockInfoMapper extends Mapper<Object, Text, NullWritable, Text>{

	private String delimiter;
    // attribute index array for stat computation
	private int indexArray[];
    // attribute index array for do not computation
	private int exceptionIndexArr[];

    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
        // TODO
        delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
        indexArray = CommonMethods.convertIndexStr2IntArr(context.getConfiguration().get(ArgumentsConstants.TARGET_INDEX,  "-1"));
        exceptionIndexArr = CommonMethods.convertIndexStr2IntArr(context.getConfiguration().get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
    }

	@Override
	protected void map(Object key, Text value, Context context) throws IOException, InterruptedException 
	{
		String[] columns = value.toString().split(delimiter);
		
		for(int i=0; i<columns.length; i++)
		{
			if(CommonMethods.isContainIndex(indexArray, i, true) && !CommonMethods.isContainIndex(exceptionIndexArr, i, false))
			{
                String blockInfo[] = context.getConfiguration().get(i + "Block").split(",");
                double val = Double.parseDouble(columns[i]);
                if(val < Double.parseDouble(blockInfo[0]))
                {
                    context.write(NullWritable.get(), new Text(i + "-1B" + delimiter + val));
                    Counter counter = context.getCounter(Constants.STATS_NUMERIC_QUARTILE_COUNTER, i + "-1B");
                    counter.increment(1);
                }
                else if(val < Double.parseDouble(blockInfo[1]))
                {
                    context.write(NullWritable.get(), new Text(i + "-2B" + delimiter + val));
                    Counter counter = context.getCounter(Constants.STATS_NUMERIC_QUARTILE_COUNTER, i + "-2B");
                    counter.increment(1);
                }
                else if(val < Double.parseDouble(blockInfo[2]))
                {
                    context.write(NullWritable.get(), new Text(i + "-3B" + delimiter + val));
                    Counter counter = context.getCounter(Constants.STATS_NUMERIC_QUARTILE_COUNTER, i + "-3B");
                    counter.increment(1);
                }
                else
                {
                    context.write(NullWritable.get(), new Text(i + "-4B" + delimiter + val));
                    Counter counter = context.getCounter(Constants.STATS_NUMERIC_QUARTILE_COUNTER, i + "-4B");
                    counter.increment(1);
                }
			}
		}
	}

    @Override
    protected void cleanup(Context context) throws IOException, InterruptedException
    {
    }
}
