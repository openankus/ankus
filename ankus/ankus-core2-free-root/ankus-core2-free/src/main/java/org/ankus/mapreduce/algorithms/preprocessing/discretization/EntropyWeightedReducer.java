package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;
import java.util.Iterator;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;

public class EntropyWeightedReducer extends Reducer<Text, Text, Text, Text>{
	
	private MultipleOutputs<Text, Text> mos;
	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
		mos = new MultipleOutputs<Text, Text>(context);
    }
	protected void reduce(Text Attribute, Iterable<Text> Atr_Info, Context context) throws IOException, InterruptedException
	{
		Iterator<Text> iterator = Atr_Info.iterator();
		double FullRecords = 0.0, Bean_count = 0.0, Entropy = 0.0;
		double WeightedEntpry = 0.0;
		
		while (iterator.hasNext())
        {
			String str_info = iterator.next().toString();
			
			String[] tokens = str_info.split(":");
			
			Entropy = Double.parseDouble(tokens[1]);
			Bean_count = Double.parseDouble(tokens[2]);
			FullRecords = Double.parseDouble(tokens[3]); //Fair
			
			WeightedEntpry += (Bean_count / FullRecords) * Entropy;
        }
		System.out.println("value:"+ Attribute.toString() + " weight:" + WeightedEntpry +" entropy:" + Entropy);
				 
		mos.write("weightedentropy", new Text(Attribute+""), new Text(WeightedEntpry+""));
	}
	public void cleanup(Context context) throws IOException, InterruptedException{
		
		mos.close();
	}
}
