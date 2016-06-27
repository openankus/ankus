package org.ankus.mapreduce.algorithms.utils.DocSimilarity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Reducer.Context;

public class TF_Reducer extends Reducer<Text, Text, Text, Text>
{
	int DocSize = 0;
	HashMap<String , Double> idf_term = new HashMap<String, Double>();
	double allTerm_length = 0.0;
	int wc = 0;
	
	@Override
	protected void setup(Context context) throws IOException, InterruptedException
	{
		Configuration conf = context.getConfiguration();
		
		DocSize  = conf.getInt("FILECOUNT", -1);
		
		FileSystem fs = FileSystem.get(conf);
		Path path = new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_IDF");
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
						if(idf_term.containsKey(token[0])== false)
						{
							idf_term.put(token[0], Double.parseDouble(token[1]));
						}
				}
				br.close();
			}
		}
		
		wc = conf.getInt("WC", 0);
	}
	
	protected void reduce(Text token, Iterable<Text> appears, Context context) 
	{
		double count = 0;

		try
		{
			Iterator<Text> iterator = appears.iterator();
			while (iterator.hasNext())
	        {
				String str_TknCount= iterator.next().toString();
				
				count +=  Double.parseDouble(str_TknCount);
	        }
			double tf = count /  wc;
			double idf = idf_term.get(token.toString());
			double tf_idf = tf *idf;
			context.write(new Text(token), new Text("tf:"+ tf + "\tidf:"+ idf +"\ttfidf:"+ tf_idf));
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
