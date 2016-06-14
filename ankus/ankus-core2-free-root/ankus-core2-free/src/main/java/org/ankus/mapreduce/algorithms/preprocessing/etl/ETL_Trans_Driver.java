package org.ankus.mapreduce.algorithms.preprocessing.etl;

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
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.filecache.DistributedCache;
/*
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
*/

public class ETL_Trans_Driver extends Configured implements Tool {
	private Logger logger = LoggerFactory.getLogger(ETL_Trans_Driver.class);
	
	private enum ETL_T_Method {
		//Replace, ColumnExtractor, ColumnValueExclude, ColumnValueFilter, Sort;
		Replace, ColumnExtractor, FilterInclude, FilterExclude, Sort, NumericNorm, Transform, xlsImport;
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
	public <T> List<T> intersection(List<T> list1, List<T> list2)
    {
    	List<T> list = new ArrayList<T>();
    	for(T t: list1)
    	{
    		if(list2.contains(t))
    		{
    			list.add(t);
    		}
    	}
    	return list;
    }
	public int importExcel(Configuration conf , String xlspath, String outputpath)
	{
		try 
		{
			FileSystem dfs = FileSystem.get(conf);
		
			/*
			Path inpath = new Path(xlspath);	
			Path outpath = new Path(outputpath);
			FileInputStream fis=new FileInputStream(xlspath);
			HSSFWorkbook workbook=new HSSFWorkbook(fis);
			int rowindex=0;
			int columnindex=0;
			//시트 수 (첫번째에만 존재하므로 0을 준다)
			//만약 각 시트를 읽기위해서는 FOR문을 한번더 돌려준다
			HSSFSheet sheet=workbook.getSheetAt(0);
			//행의 수
			int rows=sheet.getPhysicalNumberOfRows();
			for(rowindex=0;rowindex<rows;rowindex++){
			    //행을 읽는다
			    HSSFRow row=sheet.getRow(rowindex);
			    if(row !=null){
			        //셀의 수
			        int cells=row.getPhysicalNumberOfCells();
			        for(columnindex=0;columnindex<=cells;columnindex++){
			            //셀값을 읽는다
			            HSSFCell cell=row.getCell(columnindex);
			            String value="";
			            //셀이 빈값일경우를 위한 널체크
			            if(cell==null){
			                continue;
			            }else{
			                //타입별로 내용 읽기
			                switch (cell.getCellType()){
			                case HSSFCell.CELL_TYPE_FORMULA:
			                    value=cell.getCellFormula();
			                    break;
			                case HSSFCell.CELL_TYPE_NUMERIC:
			                    value=cell.getNumericCellValue()+"";
			                    break;
			                case HSSFCell.CELL_TYPE_STRING:
			                    value=cell.getStringCellValue()+"";
			                    break;
			                case HSSFCell.CELL_TYPE_BLANK:
			                    value=cell.getBooleanCellValue()+"";
			                    break;
			                case HSSFCell.CELL_TYPE_ERROR:
			                    value=cell.getErrorCellValue()+"";
			                    break;
			                }
			            }
			            System.out.println("각 셀 내용 :"+value);
			            }
			        }
			       
			}
			 */
			/*
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
			}
			*/
		}
		catch (IOException e) 
		{
			// TODO Auto-generated catch block
			logger.info(e.toString());
		}
		
		return 0;
	}
	@Override
	public int run(String[] args) throws Exception
	{
        logger.info("Fiter MR-Job is Started..");
		
		Configuration conf = this.getConf();
		//conf.set("fs.default.name",  "hdfs://localhost:9000");
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
			case xlsImport:
				importExcel(conf, conf.get(ArgumentsConstants.INPUT_PATH), conf.get(ArgumentsConstants.OUTPUT_PATH));
				break;
		    case ColumnExtractor:
		    	//String strTargetColumnList = conf.get(ArgumentsConstants.TARGET_INDEX, "-1");
		        //String strExceptionColumnList = conf.get(ArgumentsConstants.EXCEPTION_INDEX, "-1");		        
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
        logger.info(method.toString());
        job.setJobName(method.toString());
        switch(method) 
		{
        	
		    case ColumnExtractor:
		    case FilterInclude:
		    case Replace:
		    case  FilterExclude:
		    case  NumericNorm:
		    	job.setJarByClass(ETL_Trans_Driver.class);
		        job.setMapperClass(ETL_FilterMapper.class);
		        job.setMapOutputKeyClass(NullWritable.class);
		        job.setMapOutputValueClass(Text.class);
		        job.setNumReduceTasks(0);
		        
		        if(!job.waitForCompletion(true))
		    	{
		        	logger.error("Error: MR for FilterDriver is not Completion");
		            logger.info("MR-Job is Failed..");
		        	return 1;
		        }		        
		    	break;
		    	
		    case Sort:
		    	job.setJarByClass(ETL_Trans_Driver.class);
		        job.setMapperClass(ETL_SortMapper.class);
		        job.setReducerClass(ETL_SortReducer.class);		        
		        
		        job.setInputFormatClass(TextInputFormat.class);
		        job.setOutputFormatClass(TextOutputFormat.class);
		 
		        job.setOutputKeyClass(Text.class);

		        job.setOutputValueClass(Text.class);
		        
		        //input parameter에 따라 오름/내림 정렬 클래스 변경.
		        String sort_method = conf.get(ArgumentsConstants.ETL_NUMERIC_SORT_METHOD, "asc");
		        sort_method = sort_method.toLowerCase();
		        if(sort_method.equals("asc") == true)
		        {
		        	job.setSortComparatorClass(SortKeyComparator_Ascending.class);
		        }
		        else if(sort_method.equals("desc") == true)
		        {
		        	job.setSortComparatorClass(SortKeyComparator_descending.class);
		        }
		        else
		        {
		        	logger.error("Unknown sort method. Please use asc or desc");
		        	return 1;		        	
		        }
		        FileInputFormat.setInputPaths(job, conf.get(ArgumentsConstants.INPUT_PATH));
		        
		        String output_path = conf.get(ArgumentsConstants.OUTPUT_PATH);
		        FileOutputFormat.setOutputPath(job, new Path(output_path));
		       
		        try 
		        {
		            job.waitForCompletion(true);
		        }
		        catch (InterruptedException ex) 
		        {
		            logger.error(ex.toString());
		        }
		        catch (ClassNotFoundException ex) 
		        {
		            logger.error(ex.toString());
		        }
		    	break;
		}
       // sort_valiation(conf,conf.get(ArgumentsConstants.OUTPUT_PATH)+"/part-r-00000",  conf.get(ArgumentsConstants.ETL_NUMERIC_SORT_METHOD, "asc"), true);

        logger.info("FilterDriver Step of MR-Job is Successfully Finished...");
        return 0;
        
	}
	
	private int sort_valiation(Configuration conf, String target, String strSort_mode, boolean skeep_head)
	{
		int rtn = 0;
		int sort_mode =0;
		if(strSort_mode.equals("asc") == true)
		{
			sort_mode = 0;
		}
		else
		{
			sort_mode = 1;
		}
		try 
		{
			
			FileSystem dfs = FileSystem.get(conf);
			Path targetPath = new Path(target);
			if(dfs.exists(targetPath) == true)
			{
				BufferedReader br=new BufferedReader(new InputStreamReader(dfs.open(targetPath)));
				int sort_index = conf.getInt(ArgumentsConstants.ETL_NUMERIC_SORT_TARGET, 0);
				String line = "";
				if(skeep_head == true)
				{
					line = br.readLine();
				}
				line = br.readLine();
	            String[] token = line.split(",");
	            int before = Integer.parseInt(token[sort_index]);
	            while ((line=br.readLine()) != null) 
	            {
	                 token = line.split(",");
	                 int after = Integer.parseInt(token[sort_index]);
	                 //String after = token[sort_index];
	                 if(sort_mode == 0) //asc
	                 {
	                	 if(before > after)
		                 {
		                	 logger.info(before + ">" + after + ":Error asc on Validation");
		                	 rtn = 1;
		                	 break;
		                 }
		                 
	                 }
	                 if(sort_mode == 1) //desc
	                 {
	                	 if(before < after)
		                 {
		                	 logger.info(before + "<" + after + ":Error asc on Validation");
		                	 rtn = 1;
		                 }
		                 
	                 }
	                 before = after;
	            }
	            br.close();
			}
		}
		catch(Exception e)
		{
			logger.info(e.toString());
		}
		return rtn;
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
