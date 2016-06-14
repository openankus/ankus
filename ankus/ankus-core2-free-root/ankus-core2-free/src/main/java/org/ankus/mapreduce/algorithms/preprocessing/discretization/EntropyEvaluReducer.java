package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyEvaluReducer.Entropy_result;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;
//Compute MDL formula
public class EntropyEvaluReducer extends Reducer<Text, Text, Text, Text>{
	HashMap<String, Integer> BeanU = new HashMap<String, Integer>();
	HashMap<String, Integer> BeanD = new HashMap<String, Integer>();
	HashMap<String, Integer> BeanF = new HashMap<String, Integer>();
	
	public static enum  Entropy_result {gain, criteria };
	protected void setup(Context context) throws IOException, InterruptedException
    {
		
    }
	protected void reduce(Text key, Iterable<Text> Class_Info, Context context) throws IOException, InterruptedException
	{
		Iterator<Text> iterator = Class_Info.iterator();
		
		while (iterator.hasNext())
        {
			String sKey = key.toString();			
			if(sKey.equals("U"))
			{
				String class_lbl = iterator.next().toString();
				if(BeanU.containsKey(class_lbl) == true)
				{
					int cnt = BeanU.get(class_lbl);
					BeanU.put(class_lbl, cnt+1);
				}
				else
				{
					BeanU.put(class_lbl, 1);
				}
			}
			else if(sKey.equals("D"))
			{
				String class_lbl = iterator.next().toString();
				if(BeanD.containsKey(class_lbl) == true)
				{
					int cnt = BeanD.get(class_lbl);
					BeanD.put(class_lbl, cnt+1);
				}
				else
				{
					BeanD.put(class_lbl, 1);
				}
			}
			else if(sKey.equals("F"))
			{
				String class_lbl = iterator.next().toString();
				if(BeanF.containsKey(class_lbl) == true)
				{
					int cnt = BeanF.get(class_lbl);
					BeanF.put(class_lbl, cnt+1);
				}
				else
				{
					BeanF.put(class_lbl, 1);
				}
			}
        }
	}
	@SuppressWarnings("deprecation")
	public void cleanup(Context context) throws IOException, InterruptedException{
		//상위 계산
		double Usum = 0.0;
		double Uentropy = 0.0;
		
		double Dsum = 0.0;
		double Dentropy = 0.0;
		
		double bincounts = 0.0;
		double Fentropy = 0.0;
		
		Set<String> class_set  = null;
		Iterator<String> class_lblItr = null;
		/*
		 BeanU
		 BeanD
		 BeanF		 
		 */
		//UPPER BEAN
		
		class_set = BeanU.keySet();
		class_lblItr = class_set.iterator();
		while (class_lblItr.hasNext())
		{
		   String class_lbl = class_lblItr.next();
		   Usum += BeanU.get(class_lbl);
		}
		
		class_set = BeanU.keySet();
		class_lblItr = class_set.iterator();		
		System.out.println(BeanU.toString());
		while (class_lblItr.hasNext())
		{
		   String class_lbl = class_lblItr.next();
		   
		   double count = BeanU.get(class_lbl);
		   double proportion = count /Usum;
		   
		   Uentropy -= proportion*(Math.log(proportion)/Math.log(2));
		}
		//DOWN BEAN
		class_set = BeanD.keySet();
		class_lblItr = class_set.iterator();
		while (class_lblItr.hasNext())
		{
		   String class_lbl = class_lblItr.next();
		   Dsum += BeanD.get(class_lbl);
		}
		class_set = BeanD.keySet();
		class_lblItr = class_set.iterator();	
		System.out.println(BeanD.toString());
		while (class_lblItr.hasNext())
		{
		   String class_lbl = class_lblItr.next();
		   
		   double count = BeanD.get(class_lbl);
		   double proportion = count /Dsum;
		   
		   Dentropy -= proportion*(Math.log(proportion)/Math.log(2));
		}
		
		//F Bin
		class_set = BeanF.keySet();
		class_lblItr = class_set.iterator();
		while (class_lblItr.hasNext())
		{
		   String class_lbl = class_lblItr.next();
		   bincounts += BeanF.get(class_lbl);
		   System.out.println(class_lbl +":" + BeanF.get(class_lbl));
		}
		class_set = BeanF.keySet();
		class_lblItr = class_set.iterator();		
		Fentropy = 0.0;
				
		double count = 0.0;
		double proportion = 0.0;
		while (class_lblItr.hasNext())
		{
		   String class_lbl = class_lblItr.next();
		   count = BeanF.get(class_lbl);
		   proportion = count /(bincounts);
		   
		   Fentropy -= proportion*(Math.log(proportion)/Math.log(2));
		}
		
		Configuration conf = context.getConfiguration();		
		double min_entropy = conf.getDouble("min_entropy", -1);
		
		
		double gain = Fentropy - min_entropy;
		System.out.println("priorEntroy " + Fentropy + " bestEntropy " + min_entropy);
		System.out.println("Gain: " + gain);
		
		double k = BeanF.size();
		
		double powK = Math.pow(3, k);
		if(Double.isInfinite(powK)== true)
		{
			powK = Double.MAX_VALUE;
		}
		
		double k1 = BeanU.size();
		double k2 = BeanD.size();
		
		double delta = Log2(Math.pow(3, k)-2) - ((k * Fentropy) - (k2 * Dentropy) - (k1 * Uentropy));
		double criteria = (Log2(bincounts-1) + delta)/bincounts;
		
		context.getCounter(Entropy_result.gain).setDisplayName("gain");
		long dbl2longGain = (long)(gain * 10000);
		context.getCounter(Entropy_result.gain).setValue(dbl2longGain);
		
		context.getCounter(Entropy_result.criteria).setDisplayName("criteria");
		long dbl2longCriteria = (long)(criteria * 10000);
		context.getCounter(Entropy_result.criteria).setValue(dbl2longCriteria);
		
		if(Uentropy < Dentropy)
		{
			context.write(new Text(""), new Text(gain+ ":" + criteria + "\t" +Uentropy + "\t" + Dentropy + "\t"+ "D"));
		}
		else
		{
			context.write(new Text(""), new Text(gain+":" + criteria+"\t"+ +Uentropy + "\t" + Dentropy + "\t"+"U"));	
		}		
	}

	private double Log2(double x)
	{
		return Math.log(x)/Math.log(2);
	}
	
}
