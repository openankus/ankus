package org.ankus.mapreduce.algorithms.utils.TF_IDF;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.ankus.util.Constants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;

import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.mapreduce.lib.input.FileSplit;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;

public class IDF_Mapper extends Mapper<Object, Text, Text, Text>{
	String m_delimiter;
   // String m_ruleCondition;
  //  int m_indexArr[];
   // int m_numericIndexArr[];
   // int m_exceptionIndexArr[];
   // int m_classIndex;
    List<String> term = new ArrayList<String>();
    String filePathString = "";
    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
    	
        Configuration conf = context.getConfiguration();
       
        FileSystem fs = FileSystem.get(conf);
		Path path = new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_ALLTERM");
		FileStatus[] status = fs.listStatus(path);
		for(int i = 0; i < status.length; i++)
		{
			String eachpath =status[i].getPath().toString();
			if(eachpath.indexOf("part-r") > 0)
			{
				BufferedReader br = new BufferedReader(new InputStreamReader(fs.open(status[i].getPath())));
				String m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
				String line = "";
				while((line = br.readLine())!= null)
				{
						String [] token = line.split(m_delimiter);
						if(term.contains(token[0])== false)
						{
							term.add(token[0]);
						}
				}
				br.close();
			}
		}
		FileSplit fileSplit = (FileSplit)context.getInputSplit();
		filePathString = fileSplit.getPath().getName();
    }
    
	@Override
	protected void map(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] allTerms = value.toString().replaceAll("[\\W&&[^\\s]]", "").split("\\W+");
		
		try
		{
			for(int i = 0; i < allTerms.length; i++)
			{
				for(int t = 0; t < term.size(); t++)
				{
					if(term.get(t).equalsIgnoreCase(allTerms[i])== true)
					{
							context.write(new Text(allTerms[i]) , new Text(filePathString));					
					}
				}
				
			}
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
