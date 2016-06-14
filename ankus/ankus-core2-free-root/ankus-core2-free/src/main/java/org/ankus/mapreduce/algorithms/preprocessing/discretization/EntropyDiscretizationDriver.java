/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.ankus.mapreduce.algorithms.preprocessing.discretization;

//import org.ankus.mapreduce.algorithms.preprocessing.discretization.

import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyDisPrepareReducer;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyDisSelAttributeMapper;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyDisSelAttributeReducer;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyDisTransMapper;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyDiscPrepareMapper;

import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyEvaluMapper;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyEvaluReducer;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyWeightedMapper;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyWeightedReducer;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.SortReducer.LineCounter;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyEvaluReducer.Entropy_result;
//import org.ankus.mapreduce.algorithms.classification.id3.ID3AttributeSplitMapper;
//import org.ankus.mapreduce.algorithms.classification.id3.ID3ComputeEntropyReducer;
//import org.ankus.mapreduce.algorithms.classification.id3.ID3Driver;
//import org.ankus.mapreduce.algorithms.clustering.em.EMDriver;

//import org.ankus.mapreduce.algorithms.statistics.nominalstats.NominalStatsFrequencyMapper;
//import org.ankus.mapreduce.algorithms.statistics.nominalstats.NominalStatsFrequencyReducer;
import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
//import org.ankus.util.CommonMethods;
import org.ankus.util.ConfigurationVariable;
//import org.ankus.util.Constants;
//import org.ankus.util.Usage;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
//import org.apache.hadoop.filecache.DistributedCache;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.DoubleWritable;
//import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.mapreduce.Counter;
import org.apache.hadoop.mapreduce.Counters;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
//import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

/**
 *
 * @desc
 *
 * @version 0.0.1
 * @date : 2016.02
 * @author WHITEPOO
 */
class class_split_info
{
	boolean upper = false;
	boolean down = false;
	double splitValue = 0.0;
	double start = 0.0;
	double end = 0.0;
	public class_split_info(boolean up, boolean down, double splitValue , double start, double end)
	{
		this.upper = up;
		this.down  = down;
		this.splitValue = splitValue;
		this.start = start;
		this.end = end;
	}
}
public class EntropyDiscretizationDriver extends Configured implements Tool {
	double gain = 0.0;
	double criteria = 0.0;
	
    private Logger logger = LoggerFactory.getLogger(EntropyDiscretizationDriver.class);
    boolean leftsubset = false;
    
    Stack split_stack = new Stack();
	List<Double> ListSplit_Point = new ArrayList();
	double split_point = 0.0;
    @SuppressWarnings("deprecation")
	public int getSV(String[] args, double new_start, double new_end,  Configuration conf)
    {
        boolean BTemp = false;
        boolean split_stop = false;
        int split_count = 0;
    	try
    	{
    		while(true)
    		{
		    	logger.info("Discretization for Numeric Data MR-Job is Started..");
		        List<Double> split_List = new ArrayList<Double>();
		        	 		
	 		  	if(BTemp == true)
	 		  	{
	 		  		conf.setBoolean("BTemp", true);
	 		  		conf.setInt("TempIdx", split_count);
	 		  	}
	 		  	else
	 		  	{
	 		  		conf.setBoolean("BTemp", false);
	 		  	}
	 		  	conf.setDouble("new_start", new_start);
	 		  	conf.setDouble("new_end", new_end);
	 		  	conf.setBoolean("leftsubset", leftsubset);
	 		  	conf.setInt("FilterTarget", FTi);
	 		  	if(FTi == 1)
	 		  	{
	 		  		System.out.println("Feature Index : " + FTi);
	 		  	}
	 	        Job jobPrepare = new Job(this.getConf());
	 	        FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)), true);//FOR LOCAL TEST
	 	        if(BTemp == true)
	 	        {
	             	FileInputFormat.addInputPaths(jobPrepare,conf.get(ArgumentsConstants.OUTPUT_PATH) + "_Bin/jobBinCreate" +split_count);
	 	        }
	 	        else
	         	{
	 	        	FileInputFormat.addInputPaths(jobPrepare, conf.get(ArgumentsConstants.OUTPUT_PATH) + "_sortedsource"); //input : sorted result
	         	}	    	
	 	        //각 속성값 기준으로 상,하에 속하는 각 클래스 개체의 수, 상하의 개체 수, 전체 수 계산.
	 	        /*
	 	        Output
	 	        4.3	L:Iris-setosa:1:1:150
				4.3	R:Iris-versicolor:50:149:150
				4.3	R:Iris-virginica:50:149:150
				4.3	R:Iris-setosa:49:149:150
	 	         */
	 	        FileOutputFormat.setOutputPath(jobPrepare, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)));
	 	        jobPrepare.setJarByClass(EntropyDiscretizationDriver.class);
	 	        jobPrepare.setMapperClass(EntropyDiscPrepareMapper.class);
	 	        jobPrepare.setReducerClass(EntropyDisPrepareReducer.class);
	 	        jobPrepare.setOutputKeyClass(Text.class);
	 	        jobPrepare.setOutputValueClass(Text.class);
	 	        MultipleOutputs.addNamedOutput(jobPrepare, "sortedattribute", TextOutputFormat.class, Text.class, Text.class);
	 	        if(!jobPrepare.waitForCompletion(true))
	 	        {
	 	            logger.info("Error: jobPrepare is not Completeion");
	 	            return 1;
	 	        }   
	 	       logger.info("jobPrepare is  Completeion");
	         
	 	        @SuppressWarnings("deprecation")
	 	        /*
	 	        각 속성 값 기준 상,하의 엔트로피를 계산.
	 	         */
				Job job_getEntropy = new Job(this.getConf());
	 	        FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) +"_entropy"));//FOR LOCAL TEST
	 	        //INPUT PATH
	 	        FileInputFormat.addInputPaths(job_getEntropy, conf.get(ArgumentsConstants.OUTPUT_PATH)+"/sortedattribute-r-00000");
	 	        //OUTPUT PATH
	 	        FileOutputFormat.setOutputPath(job_getEntropy, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_entropy"));
	 	        
	 	        job_getEntropy.setJarByClass(EntropyDiscretizationDriver.class);
	 	        job_getEntropy.setMapperClass(EntropyDisSelAttributeMapper.class);
	 	        job_getEntropy.setReducerClass(EntropyDisSelAttributeReducer.class);
	 	        job_getEntropy.setOutputKeyClass(Text.class);
	 	        job_getEntropy.setOutputValueClass(Text.class);
	 	        MultipleOutputs.addNamedOutput(job_getEntropy, "entropy", TextOutputFormat.class,	Text.class, Text.class);
	 	        if(!job_getEntropy.waitForCompletion(true))
	 	        {
	 	        	 logger.info("Error: job_getEntropy is not Completeion");
	 	             return 1;
	 	        }
	 	       logger.info("job_getEntropy is Completeion");
	 	        /*
	 	        각 속성 값의 가중치 엔트로피 계산.
	 	        */
	 	        Job get_weightedEntrpy = new Job(this.getConf());
	 	        FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) +"_weightedentropy"),true);//FOR LOCAL TEST
	 	        FileInputFormat.addInputPaths(get_weightedEntrpy, conf.get(ArgumentsConstants.OUTPUT_PATH)+"_entropy");
	 	        FileOutputFormat.setOutputPath(get_weightedEntrpy, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_weightedentropy"));
	 	        get_weightedEntrpy.setJarByClass(EntropyDiscretizationDriver.class);
	 	        get_weightedEntrpy.setMapperClass(EntropyWeightedMapper.class);
	 	        get_weightedEntrpy.setReducerClass(EntropyWeightedReducer.class);
	 	        get_weightedEntrpy.setOutputKeyClass(Text.class);
	 	        get_weightedEntrpy.setOutputValueClass(Text.class);
	 	        MultipleOutputs.addNamedOutput(get_weightedEntrpy, "weightedentropy", TextOutputFormat.class,	Text.class, Text.class);
	 	        if(!get_weightedEntrpy.waitForCompletion(true))
	 	        {
	 	        	 logger.info("Error get_weightedEntrpy is not Completeion");
	 	             return 1;
	 	        }
	 	       logger.info("get_weightedEntrpy is Completeion");
	 	        /*
	 	        최소 엔트로피를 가지는 분리 값 찾음.
	 	        */
	 	        Double min_entropy = Double.MAX_VALUE;
	 			Path path = null;
	 			BufferedReader br = null;
	 			String line = "";
	 			List<Double> attribute_temp = new ArrayList<Double>();
	 			double[] sp = new double[2];
	 	        try
	 			{
	 	        	//Minimum Entropy find -> SplitPoint candidate
	 				String[] token = null;
	 				path = new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_weightedentropy/weightedentropy-r-00000");
	 				FileSystem fs = FileSystem.get(conf);
	 				br = new BufferedReader(new InputStreamReader(fs.open(path)));
	 					
	 				int spi = 0;
	 				while((line = br.readLine())!= null)
	 				{
	 					token = line.split("\t");
	 					double attribute = Double.parseDouble(token[0]);
	 					double entropy = Double.parseDouble(token[1]);
	 					System.out.println("Current Attribute: " + attribute + " Weighted Current entropy:" + entropy);
	 					attribute_temp.add(attribute);
	 					
 						if(min_entropy > entropy)
	 					{
	 						min_entropy = entropy;
	 						split_point = attribute;
	 					}
	 				}
	 				br.close();
	 			}
	 	        catch(Exception e)
	 			{
	 				logger.info(e.toString());
	 			}
	 	        System.out.println("Best Cut : " + split_point + " Min entropy:" + min_entropy);	 	        		
        		
	 	        /*
	 	         split_point를 기준으로 gain과 criteria를 획득.
	 	         */
	 			conf.setDouble("min_entropy", min_entropy);
	 			conf.setDouble("split_point", split_point);
	 			
	 			conf.setDouble("new_start", new_start);
	 		  	conf.setDouble("new_end", new_end);
	 		  	conf.setBoolean("leftsubset", leftsubset);
	 		  	conf.setInt("FilterTarget", FTi);
	 			Job jobGain_Criteria = new Job(this.getConf());
	 			FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) +"_Evaluation"), true);//FOR LOCAL TEST
	 			if(BTemp == false)
	 			{
	 		        FileInputFormat.addInputPaths(jobGain_Criteria, conf.get(ArgumentsConstants.OUTPUT_PATH) + "_sortedsource");
	 			}
	 			else
	 			{
	 				//Evaluation New bin
	 		        //FileInputFormat.addInputPaths(job4, conf.get(ArgumentsConstants.OUTPUT_PATH)+"_Bin/jobBinCreate" + split_count);
	 			}
	 	        FileOutputFormat.setOutputPath(jobGain_Criteria, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_Evaluation"));
	 	        jobGain_Criteria.setJarByClass(EntropyDiscretizationDriver.class);
	 	        jobGain_Criteria.setMapperClass(EntropyEvaluMapper.class);
	 	        jobGain_Criteria.setReducerClass(EntropyEvaluReducer.class);
	 	        jobGain_Criteria.setOutputKeyClass(Text.class);
	 	        jobGain_Criteria.setOutputValueClass(Text.class);
	 	        if(!jobGain_Criteria.waitForCompletion(true))
	 	        {
	 	        	 logger.info("Error: jobGain_Criteria is not Completeion");
	 	             return 1;
	 	        }
	 	       logger.info("jobGain_Criteria is  Completeion");
	 	       
	 	        Counters counters = jobGain_Criteria.getCounters();
	 	        
	 	        Counter Counter_gain = counters.findCounter(Entropy_result.gain);	
	 	        long longGain = Counter_gain.getValue();
	 	        this.gain = ((double)longGain)/10000;
	 	        
	 	     	Counter Counter_criteria = counters.findCounter(Entropy_result.criteria);	  
	 	     	long longCriteria = Counter_criteria.getValue();
	 	     	this.criteria  = ((double)longCriteria)/10000;
	 	     	
	 	     	
	 	        break;
    		}
    	}
    	catch(Exception e)
    	{
    		return -1;
    	}
		return 0;
 	        
    }
    List<Double>  cutPoints = new ArrayList<Double>();	
    private List<Double> cutPointsForSubset(String[] args, double new_start, double new_end, double new_max)
    {
    	Configuration conf = this.getConf();
    	List<Double>  left  = new ArrayList<Double>();
    	List<Double> right = new ArrayList<Double>();
    	double bestCutPoint = -1;
    	
    	getSV(args, new_start, new_end, conf);
    	bestCutPoint = this.split_point ;
    	System.out.println("Splint :" + bestCutPoint+ " Gain : " + this.gain + " Criteria : " + this.criteria);
    	if(this.gain <= 0)
    	{
    		return null;
    	}
    	//Fayyad - Iranis MDL Criteria compare...
    	if(this.gain > this.criteria)
    	{
    		leftsubset = true;
    		new_end = this.split_point;
    		//new_end not include
    		System.out.println("Left Subsets" + new_start +"<->" + new_end);
    		left = cutPointsForSubset(args, new_start, new_end, new_max);   		
    		
    		leftsubset = false;
    		new_start = new_end;
    		new_end = new_max;
    		System.out.println("Right Subsets"+ new_start +"<->" + new_end);
    		right = cutPointsForSubset(args, new_start, new_end, new_max);
    		
    		if ((left == null) && (right == null))
    		{
    			if(cutPoints.contains(bestCutPoint) == false)
    			{
    				cutPoints.add(bestCutPoint);
    			}
    		} 
    		else if (right == null)
    		{
    			if(cutPoints.contains(bestCutPoint) == false)
    			{
    				cutPoints.add(bestCutPoint);
    			}
    		}
    		else if (left == null)
    		{
    			if(cutPoints.contains(bestCutPoint) == false)
    			{
    				cutPoints.add(bestCutPoint);
    			}
    		} 
    		else
    		{
    			if(cutPoints.contains(bestCutPoint) == false)
    			{
    				cutPoints.add(bestCutPoint);
    			}
    		}
    		return cutPoints;
    	}
    	else
    	{
    		return null;
    	}
			
    	
    }
    int FTi = 0;
    @SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public int run(String[] args) throws Exception
	{
    	
		Configuration conf = this.getConf();
		//conf.set("fs.default.name",  "hdfs://localhost:9000");
		if(!ConfigurationVariable.setFromArguments(args, conf))
		{
			logger.error("MR Job Setting Failed..");
			logger.info("Error: MR Job Setting Failed..: Configuration Failed");
		     return 1;
		}
		
		int m_indexArr[] = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		
		double SplitValue = 0.0;
    	double new_start = 0.0;
    	double new_end = 0.0;
    	double new_max =0.0;
    	double lineCount = 0.0;
    
    	Stack split_stack = new Stack();
    	HashMap<Integer, String> split_pointMap = new HashMap<Integer, String>();
		for(int i = 0; i < m_indexArr.length; i++)
	    {
			FTi = m_indexArr[i];
    		
	    	conf.setInt("FilterTarget", FTi);
	    
			//source sorting job
			Job jobSort = new Job(this.getConf());
			FileInputFormat.addInputPaths(jobSort, conf.get(ArgumentsConstants.INPUT_PATH));
			FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+ "_sortedsource"), true);//FOR LOCAL TEST
			FileOutputFormat.setOutputPath(jobSort, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + "_sortedsource"));
			jobSort.setJarByClass(EntropyDiscretizationDriver.class);
			jobSort.setMapperClass(SortMapper.class);
			jobSort.setReducerClass(SortReducer.class);
			jobSort.setNumReduceTasks(1);
			jobSort.setOutputKeyClass(DoubleWritable.class);
			jobSort.setOutputValueClass(Text.class);
	                
	        if(!jobSort.waitForCompletion(true))
	        {
	            logger.info("Error: 1-MR for ID3(Rutine) is not Completeion");
	            return 1;
	        }
        
	        Counters counters = jobSort.getCounters();
	        Counter lineCounter = counters.findCounter(LineCounter.LineCount);	  
	        
	     	System.out.println("Name:" + lineCounter.getDisplayName()+" Value:" + lineCounter.getValue());
	     	
	     	double dblLc = ((double)lineCounter.getValue())/10000;
	     	
	     	new_max = dblLc;
	     	new_end = new_max;
	     	List<Double> cutPoint = cutPointsForSubset(args, 0, new_end, new_max);
	     	if(cutPoint == null)
	     	{
	     		System.out.println("All");
	     	}
	     	else
	     	{
	     		System.out.println(cutPoint.toString());
	     	}
	     	
	     	String split_point_ps = "";
	     	
	     	if(cutPoint == null)
	     	{
	     		conf.setInt("BinNums", 0);
	     	}
	     	else
	     	{
	     		for(int cpi = 0; cpi < cutPoint.size(); cpi++)
	     		{
	     			split_point_ps += cutPoint.get(cpi) +",";
	     		}
	     	}
	     	split_point_ps = split_point_ps.substring(0, split_point_ps.length()-1);
	     	split_pointMap.put(FTi, split_point_ps);
	     	cutPoints.clear();//previous index's split point remove
			/*
	     	FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)), true);
	 		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_Bin"), true);
	 		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_classCount"), true);
	 		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_entropy"), true);
	 		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_Evaluation"), true);
	 		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"_weightedentropy"), true);
	 		*/
	    }	
		
		
		Iterator<Integer> keys = split_pointMap.keySet().iterator();
    	String FilterTargetInfo_Str = "";
        while( keys.hasNext() )
        {
            int FTi = keys.next();
            System.out.println( String.format("키 : %s, 값 : %s", FTi, split_pointMap.get(FTi)) );
            
            //FT:0#XXX.XX,XXX.XX&
            FilterTargetInfo_Str += "FT:" + FTi +"#" + split_pointMap.get(FTi) +"&";
        }
        FilterTargetInfo_Str = FilterTargetInfo_Str.substring(0, FilterTargetInfo_Str.length()-1);
        conf.set("FilterTargetInfo", FilterTargetInfo_Str);
     	Job jobTrans = new Job(this.getConf());
    
     	FileInputFormat.addInputPaths(jobTrans, conf.get(ArgumentsConstants.INPUT_PATH));
 		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+ "_converted"), true);//FOR LOCAL TEST
     	FileOutputFormat.setOutputPath(jobTrans, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + "_converted"));	
 	
     	jobTrans.setJarByClass(EntropyDiscretizationDriver.class);
     	jobTrans.setMapperClass(EntropyDisTransMapper.class);
	        
     	jobTrans.setOutputKeyClass(NullWritable.class);
     	jobTrans.setOutputValueClass(Text.class);
                
        if(!jobTrans.waitForCompletion(true))
        {
            logger.info("Error: 1-MR for jobTrans is not Completeion");
            return 1;
        }
        return 0;
	}

   

	public static void main(String args[]) throws Exception 
	{
		int res = ToolRunner.run(new EntropyDiscretizationDriver(), args);
        System.exit(res);
	}



}
