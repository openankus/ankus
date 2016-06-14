package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;

public class EntropyBinTempMapper extends Mapper<Object, Text, NullWritable, Text>{
	Double split_point = 0.0;
	String m_delimiter = "";
	int m_indexArr[];
	String nextBin = "";
	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
		Configuration conf = context.getConfiguration();
		m_indexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		split_point = conf.getDouble("split_point", -1);
		m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
		nextBin = conf.get("nextBin", "F");
		
    }
	@Override
	protected void map(Object key, Text value, Context context) throws IOException, InterruptedException
	{
		String[] columns = value.toString().split(m_delimiter);
		double target_column = Double.parseDouble(columns[m_indexArr[0]]);
		if(nextBin.equals("U") == true)
		{
			if(target_column <= split_point)
			{
				context.write(NullWritable.get(), new Text(value.toString()));
			}	
		}
		else if(nextBin.equals("D") == true)
		{
			if( split_point < target_column)
			{
				context.write(NullWritable.get(), new Text(value.toString()));
			}
		}
		else
		{
			System.out.println("binerror");
		}
		
	}
	public void cleanup(Context context) throws IOException, InterruptedException{
		
	}
}
