package org.ankus.mapreduce.algorithms.utils.DocSimilarity;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyDiscretizationDriver;
import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.ankus.util.ConfigurationVariable;
import org.ankus.util.Constants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.apache.hadoop.util.hash.Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DocSiliarityDriver extends Configured implements Tool {
	private Logger logger = LoggerFactory.getLogger(DocSiliarityDriver.class);
	public int run(String[] args) throws Exception
	{
		Configuration conf = this.getConf();
		if(!ConfigurationVariable.setFromArguments(args, conf))
		{
			logger.error("MR Job Setting Failed..");
			logger.info("Error: MR Job Setting Failed..: Configuration Failed");
		     return 1;
		}
		FileSystem fs = FileSystem.get(conf);
		Path path = new Path(conf.get(ArgumentsConstants.INPUT_PATH));
		FileStatus[] status = fs.listStatus(path);
		int file_count = status.length;
	
		Job job_getTerm = new Job(this.getConf());
		
		FileInputFormat.addInputPaths(job_getTerm, conf.get(ArgumentsConstants.INPUT_PATH));
		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_ALLTERM"), true);//FOR LOCAL TEST
		FileOutputFormat.setOutputPath(job_getTerm, new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_ALLTERM"));
		
		job_getTerm.setJarByClass(DocSiliarityDriver.class);
		
		job_getTerm.setMapperClass(Mapper_Unique_Term.class);
		job_getTerm.setReducerClass(Reducer_Unique_Term.class);
		job_getTerm.setOutputKeyClass(Text.class);
		job_getTerm.setOutputValueClass(IntWritable.class);  
        if(!job_getTerm.waitForCompletion(true))
        {
            logger.info("Error: Get Terms for TF-IDF(Rutine) is not Completeion");
            return 1;
        }
        
        conf.setInt("FILECOUNT", file_count);
        Job job_IDF = new Job(this.getConf());
        FileInputFormat.addInputPaths(job_IDF, conf.get(ArgumentsConstants.INPUT_PATH));
		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_IDF"), true);//FOR LOCAL TEST
		FileOutputFormat.setOutputPath(job_IDF, new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_IDF"));
		
		job_IDF.setJarByClass(DocSiliarityDriver.class);
		
		job_IDF.setMapperClass(IDF_Mapper.class);
		job_IDF.setReducerClass(IDF_Reducer.class);
		job_IDF.setOutputKeyClass(Text.class);
		job_IDF.setOutputValueClass(Text.class);  
        if(!job_IDF.waitForCompletion(true))
        {
            logger.info("Error: Get Terms for TF-IDF(Rutine) is not Completeion");
            return 1;
        }
        
        path = new Path(conf.get(ArgumentsConstants.INPUT_PATH));
		status = fs.listStatus(path);
		HashMap<String, String[]>doc_token = new HashMap<String, String[]>();
	
		for(int i = 0; i < status.length; i++)
		{
			if(fs.isFile(new Path(status[i].getPath().toString())) == false)
			{
				continue;
			}
			String eachpath =status[i].getPath().toString();
			String file_name = status[i].getPath().getName();
			
			Path doc_path = new Path(eachpath);
			BufferedReader br = new BufferedReader(new InputStreamReader(fs.open(doc_path)));
			String m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
			String line = "";
			
			StringBuilder sb = new StringBuilder();
			while((line = br.readLine())!= null)
			{
				sb.append(line);
			}
			br.close();
			String[] tokenizedTerms = sb.toString().replaceAll("[\\W&&[^\\s]]", "").split("\\W+");
			doc_token.put(file_name, tokenizedTerms);
			
		}
		for(int i = 0; i < status.length; i++)
		{
			if(fs.isFile(new Path(status[i].getPath().toString())) == false)
			{
				continue;
			}
			String[] tokenizedTerms = doc_token.get(status[i].getPath().getName());
			
			conf.setInt("WC", tokenizedTerms.length);
			Job job_TF = new Job(this.getConf());
			String eachpath =status[i].getPath().toString();
			String file_name = status[i].getPath().getName();
	        FileInputFormat.addInputPaths(job_TF, eachpath);
	        
	        int extension_start = file_name.lastIndexOf(".");
			int extension_length = file_name.length() - extension_start;
			String pure_file = file_name.substring(0,extension_start);
			
			FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"/"+pure_file+"_TF"), true);//FOR LOCAL TEST
			FileOutputFormat.setOutputPath(job_TF, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"/"+pure_file+"_TF"));
			
			job_TF.setJarByClass(DocSiliarityDriver.class);
			
			job_TF.setMapperClass(TF_Mapper.class);
			job_TF.setReducerClass(TF_Reducer.class);
			job_TF.setOutputKeyClass(Text.class);
			job_TF.setOutputValueClass(Text.class);  
	        if(!job_TF.waitForCompletion(true))
	        {
	            logger.info("Error: Get Terms for TF-IDF(Rutine) is not Completeion");
	            return 1;
	        }
	        
		}
		//Final Similarity Output
		FSDataOutputStream fout = fs.create(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH) + "/similarity_result.csv"), true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fout, Constants.UTF8));
        
		for(int i = 0; i < status.length; i++)
		{
			if(fs.isFile(new Path(status[i].getPath().toString())) == false)
			{
				continue;
			}
			String file_name = status[i].getPath().getName();
			int extension_start = file_name.lastIndexOf(".");
			int extension_length = file_name.length() - extension_start;
			String pure_file = file_name.substring(0,extension_start);
			
			String file_path = conf.get(ArgumentsConstants.OUTPUT_PATH)+"/"+pure_file+"_TF";
			FileStatus[] r_status = fs.listStatus(new Path(file_path));
			
			List<Double> WordVector_Src = load_WordVectorList(fs, r_status);
			
			HashMap<String, Double> doc_sim_map = new HashMap<String, Double>();
			
			for(int j = 0; j < status.length; j++)
			{
				if(fs.isFile(new Path(status[j].getPath().toString())) == false)
				{
					continue;
				}
				String file_namej = status[j].getPath().getName();
				if(file_name.equals(file_namej) == true)
					continue;
				extension_start = file_namej.lastIndexOf(".");
				extension_length = file_namej.length() - extension_start;
				pure_file = file_namej.substring(0,extension_start);
				
				String file_pathj = conf.get(ArgumentsConstants.OUTPUT_PATH)+"/"+pure_file+"_TF";
				FileStatus[] r_statusj = fs.listStatus(new Path(file_pathj));
				
				List<Double> WordVector_Target = load_WordVectorList(fs, r_statusj);
				double similarity = 0.0, up = 0.0;
				for(int wi = 0; wi < WordVector_Src.size(); wi++)
				{
					up += WordVector_Src.get(wi) * WordVector_Target.get(wi);
				}
				
				double down_A = 0.0, down_B = 0.0;
				for(int wi = 0; wi < WordVector_Src.size(); wi++)
				{
					down_A += WordVector_Src.get(wi) * WordVector_Src.get(wi);
				}
				down_A = Math.sqrt(down_A);
				
				for(int wi = 0; wi < WordVector_Target.size(); wi++)
				{
					down_B += WordVector_Target.get(wi) * WordVector_Target.get(wi);
				}
				down_B = Math.sqrt(down_B);
				similarity = up / (down_A * down_B);
				doc_sim_map.put(file_namej, similarity);
				
			}
			Iterator it = sortByValue(doc_sim_map).iterator();
	         
	        while(it.hasNext()){
	            String temp = (String) it.next();
	            System.out.println(temp + " = " + doc_sim_map.get(temp));
	            String pattern = "#.###";
	            DecimalFormat dformat = new DecimalFormat(pattern);
	            
	            bw.write(file_name +","+temp +",Similarity, " + dformat.format(doc_sim_map.get(temp)) +"\r\n");
	        }
	        bw.write("\r\n");
			
		}
		bw.close();
		fout.close();
		
        //File Renameing..
        //FileSystem fs = FileSystem.get(conf);
        //mFileIntegration(fs, conf.get(ArgumentsConstants.INPUT_PATH) +"_ALLTERM", "part-m");
		return 0;
	}
	public static List sortByValue(final HashMap map){
        List<String> list = new ArrayList();
        list.addAll(map.keySet());
         
        Collections.sort(list,new Comparator(){
             
            public int compare(Object o1,Object o2){
                Object v1 = map.get(o1);
                Object v2 = map.get(o2);
                 
                return ((Comparable) v1).compareTo(v2);
            }
             
        });
        Collections.reverse(list); // 주석시 오름차순
        return list;
    }
	private List<Double> load_WordVectorList(FileSystem fs , FileStatus[] status)
	{
		List<Double> WordVector = new ArrayList<Double>();
		try
    	{
			for(int i=0; i<status.length; i++)
	        {
	            Path fp = status[i].getPath();
	            
	            if(fp.getName().indexOf("r")<0) continue;
	
	            FSDataInputStream fin = fs.open(status[i].getPath());
	            BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));	            
	            
	            String readStr, tokens[];
	            int value;
	            while((readStr=br.readLine())!=null)
	            {
	               String [] vector = readStr.split("\t");
	               String[] tfidf = vector[3].split(":");
	               
	               WordVector.add(Double.parseDouble(tfidf[1]));
	            }
	            br.close();
	            fin.close();
	        }
	        
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return WordVector;
		
	}
	private HashMap<String, Double> load_WordVectorHashMap(FileSystem fs , FileStatus[] status)
	{
		HashMap<String, Double> WordVector = new HashMap<String, Double>();
		try
    	{
			for(int i=0; i<status.length; i++)
	        {
	            Path fp = status[i].getPath();
	            
	            if(fp.getName().indexOf("r")<0) continue;
	
	            FSDataInputStream fin = fs.open(status[i].getPath());
	            BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));	            
	            
	            String readStr, tokens[];
	            int value;
	            while((readStr=br.readLine())!=null)
	            {
	               String [] vector = readStr.split("\t");
	               String[] tfidf = vector[3].split(":");
	               
	               WordVector.put(vector[0], Double.parseDouble(tfidf[1]));
	            }
	            br.close();
	            fin.close();
	        }
	        
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
		return WordVector;
		
	}
	private void mFileIntegration(FileSystem fs , String inputPath, String filePrefix)
    {
    	try
    	{
	    	FileStatus[] status = fs.listStatus(new Path(inputPath));
	    	FSDataOutputStream fout = fs.create(new Path(inputPath + "/total_result.txt"), true);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fout, Constants.UTF8));
            
	        for(int i=0; i<status.length; i++)
	        {
	            Path fp = status[i].getPath();
	            
	            if(fp.getName().indexOf(filePrefix)<0) continue;
	
	            FSDataInputStream fin = fs.open(status[i].getPath());
	            BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));	            
	            
	            String readStr, tokens[];
	            int value;
	            while((readStr=br.readLine())!=null)
	            {
	               bw.write(readStr);
	               bw.write("\r\n");
	            }
	            br.close();
	            fin.close();
	        }
	        bw.close();
	        fout.close();
    	}
    	catch(Exception e)
    	{
    		System.out.println(e.toString());
    	}
    }
	public static void main(String args[]) throws Exception 
	{
		int res = ToolRunner.run(new DocSiliarityDriver(), args);
        System.exit(res);
	}


}
