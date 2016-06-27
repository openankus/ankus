package org.ankus.mapreduce.algorithms.utils.DocSimilarity;

import java.io.IOException;
import java.util.Iterator;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;

public class Reducer_Unique_Term extends Reducer<Text, IntWritable, Text, IntWritable>
{
	@Override
	protected void setup(Context context) throws IOException, InterruptedException
	{
		
	}
	
	protected void reduce(Text Attribute, Iterable<IntWritable> appears, Context context) throws IOException, InterruptedException
	{
		int count = 0;
		/*
		Iterator<IntWritable> iterator = appears.iterator();
		while (iterator.hasNext())
        {
			count += iterator.next().get();
        }
		*/
		context.write(new Text(Attribute), new IntWritable(count));
		
	}
}
