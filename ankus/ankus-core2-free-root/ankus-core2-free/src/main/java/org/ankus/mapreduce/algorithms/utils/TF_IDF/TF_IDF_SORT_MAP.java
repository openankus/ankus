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
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;

public class TF_IDF_SORT_MAP  extends Mapper<Object, Text, DoubleWritable, Text>{
	String m_delimiter;
   // String m_ruleCondition;
  //  int m_indexArr[];
   // int m_numericIndexArr[];
   // int m_exceptionIndexArr[];
   // int m_classIndex;
    List<String> term = new ArrayList<String>();
    
	@Override
	protected void map(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] tokens = value.toString().split("\t"); //default delimiter for mapreduce
		
		try
		{
			String wd = tokens[0];
			
			String measures;
			String[] measure;
			
			measures = tokens[1];
			measure = measures.split(":");
			String tf = measure[1];
			
			measures = tokens[2];
			measure = measures.split(":");
			String idf = measure[1];
			
			measures = tokens[3];
			measure = measures.split(":");
			Double dblTfIdf = Double.parseDouble(measure[1]);
			DoubleWritable tfidf = new DoubleWritable( dblTfIdf);
			
			//tfidf, wd, tf, idf
			context.write(tfidf, new Text(wd + "\t" + tf + "\t" +idf));
		
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
