package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;

public class EntropyDisPrepareReducer extends Reducer<Text, Text, Text, Text>
{
	private MultipleOutputs<Text, Text> mos;
	String m_delimiter;
	
	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
		 mos = new MultipleOutputs<Text, Text>(context);
		 Configuration conf = context.getConfiguration();
		 m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
    }
	protected void reduce(Text Attribute, Iterable<Text> Class_Appears, Context context) throws IOException, InterruptedException
	{
		Iterator<Text> iterator = Class_Appears.iterator();
		String[] class_appear = null;
	
		HashMap<String, Integer> class_count_map = new HashMap<String, Integer>();
		int full_record_size = 0;
		while (iterator.hasNext())
        {
			class_appear = iterator.next().toString().split(m_delimiter);
			if(class_count_map.containsKey(class_appear[1]) == true)
			{
				int count = class_count_map.get(class_appear[1]);
				count++;
				class_count_map.put(class_appear[1], count);
			}
			else
			{
				class_count_map.put(class_appear[1], 1);
			}
			full_record_size = Integer.parseInt(class_appear[2]);
        }
		
		Set<String> keySet = class_count_map.keySet();
		Iterator<String> attr_key = keySet.iterator();
		int TOTAL_class_sum = 0;
		
		while (attr_key.hasNext())
		{
		   String key = attr_key.next();
		   int value = class_count_map.get(key);
		   TOTAL_class_sum += value;	
		}
		Iterator<String> attr_key_mos = keySet.iterator();
		String pureAttribute  = Attribute.toString();
		String tag = pureAttribute.substring(pureAttribute.length()-1, pureAttribute.length());
		pureAttribute  = pureAttribute.substring(0,pureAttribute.length()-1);
		while (attr_key_mos.hasNext())
		{
		   String key = attr_key_mos.next();
		   int each_class_count = class_count_map.get(key);
		
		   mos.write("sortedattribute",  pureAttribute, tag + ":" + key +":" + each_class_count+":"+ TOTAL_class_sum +":" + full_record_size);	
		}
	}
	public void cleanup(Context context) throws IOException, InterruptedException{
		mos.close();
	}
}
