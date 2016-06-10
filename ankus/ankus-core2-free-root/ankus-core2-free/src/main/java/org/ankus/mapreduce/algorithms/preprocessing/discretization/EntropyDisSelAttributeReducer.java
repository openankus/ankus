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

public class EntropyDisSelAttributeReducer extends Reducer<Text, Text, Text, Text>
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
	protected void reduce(Text Attribute, Iterable<Text> Class_Counts, Context context) throws IOException, InterruptedException
	{
		Iterator<Text> iterator = Class_Counts.iterator();
		String[] cls_attr = null;
		HashMap<String, Double> class_proportion = new HashMap<String, Double>();
		
		while (iterator.hasNext())
        {
			cls_attr = iterator.next().toString().split(":");
			
			String class_label = cls_attr[1];//클래스 레이블.			
			double count = Double.parseDouble(cls_attr[2]); //Left  or Right 의 데이터 수.
			double all  = Double.parseDouble(cls_attr[3]); //전체 레코드  수 
			
			class_proportion.put(class_label, (count / all)); //각 클래스의 비중을 구한다.
        }
		//Entropy calculation
		Set<String> class_set = class_proportion.keySet();
		Iterator<String> class_lblItr = class_set.iterator();
		
		double start_entropy = 0;
		while (class_lblItr.hasNext())
		{
		   String class_lbl = class_lblItr.next();
		   double proportion = class_proportion.get(class_lbl);
		   start_entropy -=  proportion*(Math.log(proportion)/Math.log(2));//후보값의 엔트로피를 구한다.
		}
		
		String keyAttribute = Attribute.toString();
		keyAttribute = keyAttribute.substring(0, keyAttribute.length()-1); //방향제거.
		
		String tag = Attribute.toString();
		tag = tag.substring(tag.length()-1, tag.length());
		System.out.println("atr:" + keyAttribute  +": Ent "+start_entropy+": Nums "+cls_attr[3] + ": Total " + cls_attr[4]);
		mos.write("entropy", new Text(keyAttribute), tag+":"+start_entropy+":"+cls_attr[3] + ":" + cls_attr[4]);
	}
	public void cleanup(Context context) throws IOException, InterruptedException{
		mos.close();
	}
}
