package org.ankus.mapreduce.algorithms.utils.TF_IDF;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;

public class TF_IDF_SORT_Reducer extends Reducer<DoubleWritable, Text, NullWritable, Text>
{
	
	protected void reduce(DoubleWritable tfidf, Iterable<Text> wd_tf_idf, Context context) 
	{
		try
		{
			Iterator<Text> iterator = wd_tf_idf.iterator();
			while (iterator.hasNext())
	        {
				String wti = iterator.next().toString();
				String[] wd_info = wti.split("\t");
				//wd, tf, idf, tfidf
				NullWritable out = NullWritable.get();
				context.write(out, new Text(wd_info[0]+",tf:" + wd_info[1] + ",idf,"+ wd_info[2] + ",if-idf," + tfidf.toString())) ;
				
			}
		}catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
}
