package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

//import org.ankus.mapreduce.algorithms.classification.rulestructure.RuleNodeBaseInfo;
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
//import org.apache.hadoop.mapred.FileSplit;
//import org.apache.hadoop.mapreduce.InputSplit;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.mapreduce.lib.input.FileSplit;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EntropyDiscPrepareMapper extends Mapper<Object, Text, Text, Text>{
	String m_delimiter;
    String m_ruleCondition;
  //int m_indexArr[];
  	int m_indexArr = 0;
    int m_numericIndexArr[];
    int m_exceptionIndexArr[];
    int m_classIndex;
    int full_record_size = 0;
    //Double splitCandidate = 0.0;
    private Logger logger = LoggerFactory.getLogger(EntropyDiscPrepareMapper.class);
    List<Double> splitCandidate  = null;
    String nextBin  = "";
    Double split_point = 0.0;
    double new_start  = 0.0;
    double new_end = 0.0;
    boolean leftsubset = false;
    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
        Configuration conf = context.getConfiguration();
        
        new_start = conf.getDouble("new_start",Double.MAX_VALUE);
        new_end = conf.getDouble("new_end",Double.MIN_VALUE);
        
        leftsubset = conf.getBoolean("leftsubset", false);
        FileSystem fs = null;
		fs = FileSystem.get(conf);
		FileStatus[] status;
		
		int tempInput = conf.getInt("TempIdx", -1);
		split_point = conf.getDouble("split_point", 0);
		splitCandidate = new ArrayList<Double>();
		FileSplit fsFileSplit = (FileSplit) context.getInputSplit();
		String filename = context.getConfiguration().get(fsFileSplit.getPath().getParent().getName());
		List<Double> tmpCandidate = new ArrayList<Double>();		
		try
		{
			String line = "";
			String[] token = null;
			Path path = null;
			
			boolean bTemp = conf.getBoolean("BTemp",false);
			if(bTemp == true)
			{
				path = new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+	"_Bin/jobBinCreate" + tempInput+"/part-r-00000");
			}
			else
			{
				path = new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + "_sortedsource");
			}
			status = fs.listStatus(path);			
			
			for(int i = 0; i < status.length; i++)
			{
				String eachpath =status[i].getPath().toString();
				if(eachpath.indexOf("part") > 0)
				{
					BufferedReader br = new BufferedReader(new InputStreamReader(fs.open(status[i].getPath())));
					String m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
					//m_indexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
					m_indexArr =  conf.getInt("FilterTarget", -1);
					if(m_indexArr == -1)
					{
						System.out.println("Filter Index not setted");
					}
					while((line = br.readLine())!= null)
					{
						if(line.length()> 0)
						{
							token = line.split(m_delimiter);
							
							Double dblColumn_value = Double.parseDouble(token[m_indexArr]);
							
							if(leftsubset == true)
							{
								
								if((new_start <= dblColumn_value) && (dblColumn_value < new_end))
								{
									System.out.println("Left :"+ new_start +"<="+ dblColumn_value +"<" + new_end);
									full_record_size++;		
									if(splitCandidate.contains(dblColumn_value) == false)//중복 제거.
									{
										splitCandidate.add(dblColumn_value);
									}			
								}
							}
							else
							{
								
								if((new_start <= dblColumn_value) && (dblColumn_value <= new_end))
								{
									System.out.println("Right :"+ new_start +"<="+ dblColumn_value +"<=" + new_end);
									full_record_size++;		
									if(splitCandidate.contains(dblColumn_value) == false)//중복 제거.
									{
										splitCandidate.add(dblColumn_value);
									}		
								}
							}
							
						}
					}
					br.close();
				}
			}
		}
		catch(Exception e)
		{
			logger.info(e.toString());
		}
		m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");		
		//m_indexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		m_indexArr =  conf.getInt("FilterTarget", -1);
        m_numericIndexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.NUMERIC_INDEX, "-1"));
        m_exceptionIndexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
        m_classIndex = Integer.parseInt(conf.get(ArgumentsConstants.CLASS_INDEX, "-1"));
        m_ruleCondition = conf.get(Constants.ID3_RULE_CONDITION, "root");
        
    }
	@Override
	protected void map(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] columns = value.toString().split(m_delimiter);
		
		int i = 0;
		Double dblColumn_value =0.0;
		DoubleWritable column_value  = null;
		try
		{
			double candidate = 0.0;
			dblColumn_value = Double.parseDouble(columns[m_indexArr]);
			column_value = new DoubleWritable(dblColumn_value);
			if(leftsubset == true)
			{
				if((new_start <= dblColumn_value) &&(dblColumn_value < new_end))
				{
					for(i = 0; i < splitCandidate.size(); i++)
					{
						//Append L,R for listing smaller and bigger group
						candidate = splitCandidate.get(i);
						if(dblColumn_value <= candidate)
						{
							context.write(new Text(candidate+"L" ),  new Text(column_value + m_delimiter + 
																													columns[m_classIndex] + m_delimiter + 
																													full_record_size));
						}
						else
						{
							context.write(new Text(candidate+ "R"), new Text(column_value + m_delimiter + 
																													columns[m_classIndex] + m_delimiter + 
																													full_record_size));
						}
					}
				}
			}
			else
			{
				if((new_start <= dblColumn_value) &&(dblColumn_value <= new_end))
				{
					for(i = 0; i < splitCandidate.size(); i++)
					{
						//Append L,R for listing smaller and bigger group
						candidate = splitCandidate.get(i);
						if(dblColumn_value < candidate)
						{
							context.write(new Text(candidate+"L" ),  new Text(column_value + m_delimiter + 
																													columns[m_classIndex] + m_delimiter + 
																													full_record_size));
						}
						else
						{
							context.write(new Text(candidate+ "R"), new Text(column_value + m_delimiter + 
																													columns[m_classIndex] + m_delimiter + 
																													full_record_size));
						}
					}
				}
			}
			
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	
	
	private boolean condition_filter(Double map_key)
	{
		boolean inCondition = false;
		if(nextBin.equals("F"))
		{
			inCondition = true;
		}
		else if(nextBin.equals("U")) //apply split
		{
			if(map_key < split_point)
			{
				inCondition = true;
			}
		}
		else if(nextBin.equals("D")) //apply split
		{
			if(map_key > split_point)
			{
				inCondition = true;
			}
		}
		return inCondition;
	}
	public void cleanup(Context context) throws IOException, InterruptedException{
		System.out.println("CLEAN UP SET MODE " + nextBin + " Record Size " + full_record_size);
		System.out.println("EntropyDiscPrepareMapper cleaup");
	}
	
}
