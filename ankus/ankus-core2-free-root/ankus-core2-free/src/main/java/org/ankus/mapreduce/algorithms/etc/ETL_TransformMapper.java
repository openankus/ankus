package org.ankus.mapreduce.algorithms.etc;

import java.io.IOException;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.mapreduce.lib.input.FileSplit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ETL_TransformMapper extends Mapper<LongWritable, Text, LongWritable, Text>//, OutputCollector<Text, IntWritable> , Reporter>
{
	private Logger logger = LoggerFactory.getLogger(ETL_TransformMapper.class);
	private String mDelimiter;	
	private final static IntWritable one = new IntWritable(1);
	 private Text word = new Text("Total Lines");
	protected void setup(Context context) throws IOException, InterruptedException
    {
		mDelimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");	        
    }
	
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException 
	{
		
		String[] columns = value.toString().split(mDelimiter);	
	
		long linenum = Long.parseLong(columns[0]);
		
		for(int ci = 1; ci < columns.length; ci++)
		{
			LongWritable outkey = new LongWritable(ci-1);
			System.out.println("Map(" +outkey + "[" + new Text(linenum + "," + columns[ci])+"])");
			context.write(outkey, new Text(linenum + "," + columns[ci]));
		}
	}
	

}
