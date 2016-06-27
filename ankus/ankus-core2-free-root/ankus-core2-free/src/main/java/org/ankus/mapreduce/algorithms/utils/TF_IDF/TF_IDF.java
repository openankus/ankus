package org.ankus.mapreduce.algorithms.utils.TF_IDF;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import org.apache.hadoop.fs.FsStatus;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.io.WritableComparator;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.apache.hadoop.util.hash.Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


class sortComparator extends WritableComparator {

	 protected sortComparator() {
	  super(DoubleWritable.class, true);
	  // TODO Auto-generated constructor stub
	 }

	 @Override
	 public int compare(WritableComparable o1, WritableComparable o2) {
	  DoubleWritable k1 = (DoubleWritable) o1;
	  DoubleWritable k2 = (DoubleWritable) o2;
	  int cmp = k1.compareTo(k2);
	  return -1 * cmp;
	 }
}

public class TF_IDF extends Configured implements Tool {
	private Logger logger = LoggerFactory.getLogger(TF_IDF.class);
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
		
		job_getTerm.setJarByClass(TF_IDF.class);
		
		job_getTerm.setMapperClass(Mapper_Unique_Term.class);
		job_getTerm.setReducerClass(Reducer_Unique_Term.class);
		job_getTerm.setOutputKeyClass(Text.class);
		job_getTerm.setOutputValueClass(IntWritable.class);  
        if(!job_getTerm.waitForCompletion(true))
        {
            logger.info("Error: Get Terms is not Completeion");
            return 1;
        }
        
        conf.setInt("FILECOUNT", file_count);
        Job job_IDF = new Job(this.getConf());
        FileInputFormat.addInputPaths(job_IDF, conf.get(ArgumentsConstants.INPUT_PATH));
		FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_IDF"), true);//FOR LOCAL TEST
		FileOutputFormat.setOutputPath(job_IDF, new Path(conf.get(ArgumentsConstants.INPUT_PATH)+"_IDF"));
		
		job_IDF.setJarByClass(TF_IDF.class);
		
		job_IDF.setMapperClass(IDF_Mapper.class);
		job_IDF.setReducerClass(IDF_Reducer.class);
		job_IDF.setOutputKeyClass(Text.class);
		job_IDF.setOutputValueClass(Text.class);  
        if(!job_IDF.waitForCompletion(true))
        {
            logger.info("Error: Get IDF is not Completeion");
            return 1;
        }
        
        path = new Path(conf.get(ArgumentsConstants.INPUT_PATH));
		status = fs.listStatus(path);
		for(int i = 0; i < status.length; i++)//for each files
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
			String[] tokenizedTerms = sb.toString().replaceAll("[\\W&&[^\\s]]", "").split("\\W+");  
			
			br.close();
			conf.setInt("WC", tokenizedTerms.length);
			
			Job job_TF = new Job(this.getConf());
			FileInputFormat.addInputPaths(job_TF, eachpath);
			
	        int extension_start = file_name.lastIndexOf(".");
			int extension_length = file_name.length() - extension_start;
			String pure_file = file_name.substring(0,extension_start);
	        FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"tmp/"+pure_file+"~tf-idf"), true);//FOR LOCAL TEST
	        FileOutputFormat.setOutputPath(job_TF, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"tmp/"+pure_file+"~tf-idf"));
			
			job_TF.setJarByClass(TF_IDF.class);
			job_TF.setMapperClass(TF_Mapper.class);
			job_TF.setReducerClass(TF_Reducer.class);
			job_TF.setOutputKeyClass(Text.class);
			job_TF.setOutputValueClass(Text.class);  
	        if(!job_TF.waitForCompletion(true))
	        {
	            logger.info("Error: Get TF is not Completeion");
	            return 1;
	        }
	        
	        Job job_TF_IDF_SORT = new Job(this.getConf());
	        FileInputFormat.addInputPaths(job_TF_IDF_SORT, conf.get(ArgumentsConstants.OUTPUT_PATH)+"tmp/"+pure_file+"~tf-idf");
	        FileSystem.get(conf).delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"/"+pure_file+"~tf-idf"), true);//FOR LOCAL TEST
	        FileOutputFormat.setOutputPath(job_TF_IDF_SORT, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"/"+pure_file+"~tf-idf"));
			
	        job_TF_IDF_SORT.setMapperClass(TF_IDF_SORT_MAP.class);
	        job_TF_IDF_SORT.setReducerClass(TF_IDF_SORT_Reducer.class);
	        job_TF_IDF_SORT.setSortComparatorClass(sortComparator.class);
	        job_TF_IDF_SORT.setOutputKeyClass(DoubleWritable.class);
	        job_TF_IDF_SORT.setOutputValueClass(Text.class);
	        if(!job_TF_IDF_SORT.waitForCompletion(true))
	        {
	            logger.info("Error: TF_IDF_SORT is not Completeion");
	            return 1;
	        }
	        fs.delete(new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)+"tmp/"), true);
	        		
	        mFileIntegration(fs, conf.get(ArgumentsConstants.OUTPUT_PATH)+"/"+pure_file+"~tf-idf", "part-r", pure_file+"tf-idf.txt");
	        
		}
        //File Renameing..
        //FileSystem fs = FileSystem.get(conf);
        //mFileIntegration(fs, conf.get(ArgumentsConstants.INPUT_PATH) +"_ALLTERM", "part-m");
		return 0;
	}
	
	private void mFileIntegration(FileSystem fs , String inputPath, String filePrefix, String result_name)
    {
    	try
    	{
	    	FileStatus[] status = fs.listStatus(new Path(inputPath));
	    	FSDataOutputStream fout = fs.create(new Path(inputPath + "/"+ result_name), true);
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
	           
	            fs.delete(fp, true);
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
		int res = ToolRunner.run(new TF_IDF(), args);
        System.exit(res);
	}


}
