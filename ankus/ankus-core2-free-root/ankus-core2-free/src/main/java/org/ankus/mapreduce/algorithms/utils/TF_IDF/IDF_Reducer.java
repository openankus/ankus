package org.ankus.mapreduce.algorithms.utils.TF_IDF;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;

public class IDF_Reducer extends Reducer<Text, Text, Text, Text>
{
	int DocSize = 0;
	@Override
	protected void setup(Context context) throws IOException, InterruptedException
	{
		Configuration conf = context.getConfiguration();
		
		DocSize  = conf.getInt("FILECOUNT", -1);
		
	}
	
	protected void reduce(Text token, Iterable<Text> appears, Context context) 
	{
		double count = 0;
		List<String> containsFile = new ArrayList<String>();
		
		try
		{
		
			Iterator<Text> iterator = appears.iterator();
			while (iterator.hasNext())
	        {
				String file_name = iterator.next().toString();
				if(containsFile.contains(file_name)==false)
				{
					containsFile.add(file_name);
				}
				
	        }
			count = (double)containsFile.size();
			double idf = 1+ Math.log((double)DocSize /count);
			
			context.write(new Text(token), new Text(idf+""));
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	
	@Override
    protected void cleanup(Context context) throws IOException, InterruptedException
    {
    	System.out.println("cleanup");
    }
}
