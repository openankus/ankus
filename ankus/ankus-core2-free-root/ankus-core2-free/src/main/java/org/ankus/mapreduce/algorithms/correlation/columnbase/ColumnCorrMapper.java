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
package org.ankus.mapreduce.algorithms.correlation.columnbase;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;
import java.util.ArrayList;

/**
 * ColumnCorrMapper
 * @desc
 * @version
 * @date :
 * @author Moonie
 */
public class ColumnCorrMapper extends Mapper<Object, Text, Text, Text>{

	private String delimiter;
	private int indexArray[];
	private int exceptionIndexArr[];

    private String definedDelimiter = "@@";

    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
        delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
        indexArray = CommonMethods.convertIndexStr2IntArr(context.getConfiguration().get(ArgumentsConstants.TARGET_INDEX,  "-1"));
        exceptionIndexArr = CommonMethods.convertIndexStr2IntArr(context.getConfiguration().get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
    }

	@Override
	protected void map(Object key, Text value, Context context) throws IOException, InterruptedException 
	{
		String[] columns = value.toString().split(delimiter);
        ArrayList<Integer> targetIndexList = new ArrayList<Integer>();
		
		for(int i=0; i<columns.length; i++)
		{
			if(CommonMethods.isContainIndex(indexArray, i, true) && !CommonMethods.isContainIndex(exceptionIndexArr, i, false))
			{
                targetIndexList.add(i);
			}
		}

        if(targetIndexList.size()>1)
        {
            int size = targetIndexList.size();
            Integer targetIndexArr[] = new Integer[size];
            targetIndexArr = targetIndexList.toArray(targetIndexArr);

            for(int i=0; i<size; i++)
            {
                for(int j=i+1; j<size; j++)
                {
                    context.write(new Text(targetIndexArr[i] + definedDelimiter + targetIndexArr[j])
                                , new Text(columns[i] + definedDelimiter + columns[j]));
                }
            }
        }
	}


    @Override
    protected void cleanup(Context context) throws IOException, InterruptedException
    {
    	System.out.println("map cleanup");
    }
}
