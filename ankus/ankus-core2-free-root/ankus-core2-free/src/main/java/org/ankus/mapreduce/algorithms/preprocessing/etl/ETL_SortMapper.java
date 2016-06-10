package org.ankus.mapreduce.algorithms.preprocessing.etl;

import java.io.IOException;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ETL_SortMapper extends Mapper<LongWritable, Text,  Text, Text>
{
 
	private Logger logger = LoggerFactory.getLogger(ETL_SortMapper.class);
	private  long sort_index = 0;
	
	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
    	try
	    {
    		String str_sort_index = context.getConfiguration().get(ArgumentsConstants.ETL_NUMERIC_SORT_TARGET, 
    																						"0");
    		
    		if(str_sort_index != null)
    		{
    			sort_index = Long.parseLong(str_sort_index);
    			if(sort_index < 0)
    			{
    				sort_index = 0;
    			}
    		}
    		else
    		{
    				sort_index = 0;
    		}
	    }
    	catch(Exception e)
    	{
    		sort_index = 0;
    		logger.error(e.toString());
    	}
    }
    @Override
    protected void map(LongWritable key, Text value, Context context)   throws IOException, InterruptedException 
    {
        String val = value.toString();
        
        String delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
        
        if (val != null && !val.isEmpty() && val.length() >= 5) 
        {
            String[] splits = val.split(delimiter);
           
            String outKey = "", outValue = "";
            for(int i = 0; i < splits.length; i++)
            {
            	if(i == sort_index)
            	{
            		outKey = splits[i];
            		break;
            	}            
            }
            outValue = val;
        
            context.write(new Text(outKey), new Text(outValue));
        }
    }
}