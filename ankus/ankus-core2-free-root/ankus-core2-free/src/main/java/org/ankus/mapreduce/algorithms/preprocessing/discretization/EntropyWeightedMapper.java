package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;
import java.util.Arrays;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;

public class EntropyWeightedMapper extends Mapper<Object, Text, Text, Text>{
	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
    
    }
	@Override
	protected void map(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] columns = value.toString().split("\t");
		//Candidate value\t{L,R}:Entropy:{L,R}Count:Total Records
		System.out.println(Arrays.toString(columns));
		try
		{
			//Candidate value  - {L,R}:Entropy:{L,R}Count:Total Records
			context.write(new Text(columns[0]) , new Text(columns[1]));		
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
}
