package org.ankus.mapreduce.algorithms.etc;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ETL_TransformReducer   extends Reducer<LongWritable, Text, 
																		Text, DoubleWritable>
{
	private Logger logger = LoggerFactory.getLogger(ETL_TransformReducer.class);
	String delimiter = "";
	
	Map<Integer, String> reducer_hash = new HashMap<Integer, String>();
	
	protected void setup(Context context) throws IOException, InterruptedException
    {
    		delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
    }
	@Override
	protected void reduce(LongWritable key, Iterable<Text> value, Context context)  throws IOException, InterruptedException
	{
		String newRecord = "";
		logger.info("Reduce: "+ key.toString());
		for(Text val : value) 
		{
			String [] valToken = val.toString().split(",");
			
			reducer_hash.put(Integer.parseInt(valToken[0]), valToken[1]);
		}
		Iterator it = sortByValue(reducer_hash).iterator();
	
        while(it.hasNext())
        {
            int temp = (Integer) it.next();
            DoubleWritable outvalue = new DoubleWritable(0.0);
            newRecord += reducer_hash.get(temp) + delimiter;
            logger.info(newRecord);
        }
        context.write(new Text(newRecord), null);
	}
	protected List<String> sortByValue(final Map map){
		
        List<String> list = new ArrayList();
        list.addAll(map.keySet());
         
        Collections.sort(list,new Comparator()
        {
            public int compare(Object o1,Object o2)
            {
            	/*
                Object v1 = map.get(o1);
                Object v2 = map.get(o2);
                 */
            	Object v1 = o1;
                Object v2 = o2;
                return ((Comparable) v1).compareTo(v2);
            }
             
        });
        //Collections.reverse(list); // 주석시 오름차순
        return list;
    }
}
