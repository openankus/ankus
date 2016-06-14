package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;

public class EntropyCountClassMapper extends Mapper<Object, Text, Text, IntWritable>{
	int m_indexArr[];
	int m_classIndex = 0;
	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
		Configuration conf = context.getConfiguration();
		m_indexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		m_classIndex = Integer.parseInt(conf.get(ArgumentsConstants.CLASS_INDEX, "-1"));
    }
	@Override
	protected void map(Object key, Text value, Context context) throws IOException, InterruptedException
	{
		String[] columns = value.toString().split(",");
		
		context.write(new Text(columns[m_classIndex]), new IntWritable(1));
		
	}
	public void cleanup(Context context) throws IOException, InterruptedException{
	
	}
}
