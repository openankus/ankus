package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

//import org.ankus.mapreduce.algorithms.classification.rulestructure.RuleNodeBaseInfo;
import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.ankus.util.Constants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;

public class EntropyDisSelAttributeMapper extends Mapper<Object, Text, Text, Text>{
	String m_delimiter;
    String m_ruleCondition;
 
    int m_numericIndexArr[];
    int m_exceptionIndexArr[];
    int m_classIndex;
     
    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
    	/*
        Configuration conf = context.getConfiguration();
        m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
        m_indexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
        m_numericIndexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.NUMERIC_INDEX, "-1"));
        m_exceptionIndexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
        m_classIndex = Integer.parseInt(conf.get(ArgumentsConstants.CLASS_INDEX, "-1"));
        m_ruleCondition = conf.get(Constants.ID3_RULE_CONDITION, "root");
        */
    }
    
	@Override
	protected void map(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] columns = value.toString().split("\t");
		
		try
		{
			String postFix = columns[1].substring(0, 1);
			
			context.write(new Text(columns[0] + postFix) , new Text(columns[1]));		
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	
}
