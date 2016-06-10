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
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

/**
 * NumericStats1_2MRMergeMapper
 * @desc 2nd mapper class for numeric statistics computation mr job (2-step)
 * @version 0.0.1
 * @date : 2013.08.21
 * @author Moonie
 */
public class NumericStats2_QuartilesMapper extends Mapper<Object, Text, Text, Text>{

    private String m_delimiter;

    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
        m_delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
    }

	@Override
	protected void map(Object key, Text value, Context context) throws IOException, InterruptedException
	{
		String tokens[] = value.toString().split(m_delimiter);
		context.write(new Text(tokens[0]), new Text(tokens[1]));
	}


    @Override
    protected void cleanup(Context context)
            throws IOException, InterruptedException
    {

    }

}
