package org.ankus.mapreduce.algorithms.etc;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.ConfigurationVariable;
import org.ankus.util.Constants;
import org.ankus.util.Usage;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.LongWritable;
//import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.RawComparator;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.hadoop.mapreduce.lib.partition.InputSampler;
import org.apache.hadoop.mapreduce.lib.partition.TotalOrderPartitioner;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.filecache.DistributedCache;

public class ETL_Trans_Driver extends Configured implements Tool {
	private Logger logger = LoggerFactory.getLogger(ETL_Trans_Driver.class);
	
	private enum ETL_T_Method {
		//Replace, ColumnExtractor, ColumnValueExclude, ColumnValueFilter, Sort;
		Replace, ColumnExtractor, FilterInclude, FilterExclude, Sort, NumericNorm, Transform;
	}
	
	private String[] getParametersForStatJob(Configuration conf, String outputPath) throws Exception 
	{
		String params[] = new String[14];
		
		params[0] = ArgumentsConstants.INPUT_PATH;
		params[1] = conf.get(ArgumentsConstants.INPUT_PATH, null);
		
		params[2] = ArgumentsConstants.OUTPUT_PATH;
		params[3] = outputPath;
		
		params[4] = ArgumentsConstants.DELIMITER;
		params[5] = conf.get(ArgumentsConstants.DELIMITER, "\t");
		
		
		return params;
	}
	@SuppressWarnings("deprecation")
	private void make_line_number(Configuration conf , String fname)
	{
		
		String mDelimiter = "";
		try 
		{
			FileSystem dfs = FileSystem.get(conf);
			mDelimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");	 
			
			Path inpath = new Path(fname);	
			Path outpath = new Path(fname +"_.txt");	
			
			if(dfs.exists(inpath) == true)
			{
				BufferedReader br=new BufferedReader(new InputStreamReader(dfs.open(inpath)));
                String line = "";
                List<String> buffer = new ArrayList<String>();
          
                while ((line=br.readLine()) != null) 
                {
                        System.out.println(line);
                        buffer.add(line);
                       
                }
                br.close();
                BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(dfs.create(outpath, true)));
                for(int i = 0 ; i < buffer.size(); i++)
                {
                	line = i + mDelimiter + buffer.get(i) +"\n";
                	System.out.println(line);
                    bw.write(line);	
                }
                
                bw.close();
			}
			//dfs.delete(inpath, true);
			
			//inpath = new Path(fname+ ".crc");	
			
			dfs.rename(outpath, inpath);
			dfs.close();
			
		} 
		catch (IOException e) 
		{
			// TODO Auto-generated catch block
			logger.info(e.toString());
		}
		
	}
	private void remove_line_number(Configuration conf , String fname)
	{
		
		String mDelimiter = "";
		try 
		{
			FileSystem dfs = FileSystem.get(conf);
			mDelimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");	 
			
			Path inpath = new Path(fname);	
			Path outpath = new Path(fname +"_.txt");	
			
			if(dfs.exists(inpath) == true)
			{
				BufferedReader br=new BufferedReader(new InputStreamReader(dfs.open(inpath)));
                String line = "";
                List<String> buffer = new ArrayList<String>();
          
                while ((line=br.readLine()) != null) 
                {
                        String[] token = line.split(mDelimiter);
                        String newStr = "";
                        for(int ti = 1; ti < token.length; ti++)
                    	{
                        	newStr += token[ti] + mDelimiter;
                    	}
                        buffer.add(newStr);
                       
                }
                br.close();
                BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(dfs.create(outpath, true)));
                for(int i = 0 ; i < buffer.size(); i++)
                {
                	line = buffer.get(i) +"\n";
                	System.out.println(line);
                    bw.write(line);	
                }
                
                bw.close();
			}
			//dfs.delete(inpath , true);
			//inpath = new Path(fname+ ".crc");	
			//dfs.delete(inpath , true);
			dfs.rename(outpath , inpath);
			dfs.close();
			
		} 
		catch (IOException e) 
		{
			// TODO Auto-generated catch block
			logger.info(e.toString());
		}
		
	}
	
	@Override
	public int run(String[] args) throws Exception
	{
        logger.info("Fiter MR-Job is Started..");
		
		Configuration conf = this.getConf();
		if(!ConfigurationVariable.setFromArguments(args, conf))
		{
            Usage.printUsage(Constants.DRIVER_ETL_FILTER);
            logger.info("Error: MR Job Setting Failed..: Configuration Failed");
            return 1;
		}	
		String ETL_T_method =  conf.get(ArgumentsConstants.ETL_T_METHOD, null);
		if(ETL_T_method == null)
		{
			logger.info("Error: Needs filter method");
			return 1;
		}
		
		ETL_T_Method method = ETL_T_Method.valueOf(ETL_T_method); // surround with try/catch

		switch(method) 
		{
		    case ColumnExtractor:
		    	String columnList = conf.get(ArgumentsConstants.ETL_FILTER_COLUMNS, null);
				if(columnList == null)
				{
					logger.info("Error: Needs columns list");
					return 1;
				}
		    	break;
		    	
		    case FilterInclude:
		    	String filter_rule_path = conf.get(ArgumentsConstants.ETL_RULE_PATH, null);
				if(filter_rule_path == null)
				{
					String filter_rule = conf.get(ArgumentsConstants.ETL_RULE, null);
					if(filter_rule == null)
					{
						logger.info("Error: Needs Filter rule as exclude when Rule path doesn't exist for ColumnValueExclude method");
						return 1;
					}
				}
		    	break;
		    	
		}		
		
		String filter_output = conf.get(ArgumentsConstants.OUTPUT_PATH, null);
		if(filter_output == null)
		{
			logger.info("Error: Needs output path list");
			return 1;
		}
	
        logger.info("FilterDriver Step of MR-Job is Started..");

        Job job = new Job(this.getConf());
       
        FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
		FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)));
		job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
		job.getConfiguration().set(ArgumentsConstants.TARGET_INDEX, conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.EXCEPTION_INDEX, conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.REMAIN_FIELDS, conf.get(ArgumentsConstants.REMAIN_FIELDS, "true"));
       
        int numReduceTasks = 1;
        String partitionLocation = filter_output  + "/partition";
        switch(method) 
		{
        	case Transform:
        
        		make_line_number(conf, conf.get(ArgumentsConstants.INPUT_PATH));
        		
        		job.setJarByClass(ETL_Trans_Driver.class);
        		
		        job.setMapperClass(ETL_TransformMapper.class);
		        job.setReducerClass(ETL_TransformReducer.class);
		        
		        job.setMapOutputKeyClass(LongWritable.class);
		        job.setMapOutputValueClass(Text.class);
		        
		        job.setNumReduceTasks(10);
		        
		        if(!job.waitForCompletion(true))
		    	{
		        	logger.error("Error: MR for FilterDriver is not Completion");
		            logger.info("MR-Job is Failed..");
		        	return 1;
		        }		        
        		break;
		   
		}
        

        logger.info("FilterDriver Step of MR-Job is Successfully Finished...");
        remove_line_number(conf, conf.get(ArgumentsConstants.INPUT_PATH));
        return 0;
        
	}
	
	
	public static void main(String args[]) throws Exception 
	{
		int res = ToolRunner.run(new ETL_Trans_Driver(), args);
        System.exit(res);
	}
	 /**
     * @desc configuration setting for mr job
     * @parameter
     *      job : job identifier
     *      conf : configuration identifier for job
     */
	private void setJob(Job job, Configuration conf) throws IOException 
	{
		FileInputFormat.addInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
		FileOutputFormat.setOutputPath(job, new Path(conf.get(ArgumentsConstants.OUTPUT_PATH)));
		job.getConfiguration().set(ArgumentsConstants.DELIMITER, conf.get(ArgumentsConstants.DELIMITER, "\t"));
		job.getConfiguration().set(ArgumentsConstants.TARGET_INDEX, conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.EXCEPTION_INDEX, conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
		job.getConfiguration().set(ArgumentsConstants.REMAIN_FIELDS, conf.get(ArgumentsConstants.REMAIN_FIELDS, "true"));
	}
}
