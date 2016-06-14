package org.ankus.mapreduce.algorithms.preprocessing.etl;

import java.io.IOException;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.io.DoubleWritable;
//import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
//import com.jcraft.jsch.Logger;

//public class ETL_SortReducer  extends Reducer<DoubleWritable, Text, Text, DoubleWritable>
public class ETL_SortReducer  extends Reducer<Text, Text, Text, DoubleWritable>
{
	private Logger logger = LoggerFactory.getLogger(ETL_SortReducer.class);
	String delimiter = "";
	protected void setup(Context context) throws IOException, InterruptedException
    {

    		delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
	    
    }
	@Override
	//protected void reduce(DoubleWritable key, Iterable<Text> value, Context context)  throws IOException, InterruptedException
	protected void reduce(Text key, Iterable<Text> value, Context context)  throws IOException, InterruptedException
	{
		for(Text val : value) 
		{
				
		    //context.write(new Text(key + delimiter + val), null);
			logger.info(new Text(key + delimiter + val).toString());
			context.write(new Text(val), null);
		  
		}
	}
}