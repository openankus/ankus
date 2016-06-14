package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;

public class EntropyCountClassReducer  extends Reducer<Text, IntWritable, Text, IntWritable>{

	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
		
    }
	protected void reduce(Text Attribute, Iterable<IntWritable> Class_Appears, Context context) throws IOException, InterruptedException
	{
		int sum = 0;
		for(IntWritable val: Class_Appears)
		{
			sum += val.get();
		}
		
		context.write(Attribute, new IntWritable(sum));
	}
	public void cleanup(Context context) throws IOException, InterruptedException{
		
	}
}
