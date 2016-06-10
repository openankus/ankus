package org.ankus.mapreduce.algorithms.preprocessing.discretization;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.conf.Configuration;
public class EntropyDisTransMapper extends Mapper<Object, Text, NullWritable, Text>{

	//List<Double> split_Point = new ArrayList<Double>();
	
	String m_delimiter = "";
    int m_classIndex = 0;
    int m_indexArr = 0;
    List<Integer> TargetIndex = new ArrayList<Integer>();
    HashMap<Integer, List> Convert_Map = new HashMap<Integer, List>();
    
	@Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
		Configuration conf = context.getConfiguration();
		
		//index level of Feature
		String FilterInfos[]  = conf.get("FilterTargetInfo", "").split("&");
		for(int FIi = 0; FIi < FilterInfos.length; FIi++)
		{
			String[] FilterInfo = FilterInfos[FIi].split("#");
			int targetIdx = Integer.parseInt(FilterInfo[0].split(":")[1]);
			TargetIndex.add(targetIdx);
			
			String[] split_range = FilterInfo[1].split(",");
			List<Double> BinPoint = new ArrayList<Double>();
			for(int sri = 0; sri < split_range.length; sri++)
			{
				BinPoint.add(Double.parseDouble(split_range[sri]));
			}
			//ASC 오름차순
			Collections.sort(BinPoint, new Comparator<Double>(){
			      public int compare(Double obj1, Double obj2)
			      {
			            // TODO Auto-generated method stub
			    	  return (obj1 < obj2) ? -1: (obj1 > obj2) ? 1:0 ;
			      }
			});
			Convert_Map.put(FIi, BinPoint);
		}
		
		//int numPoint = conf.getInt("BinNums", 0);
		/*
		if(numPoint > 0)
		{
			for(int i = 0; i < numPoint; i++)
			{
				double point = conf.getDouble("BinPoint"+ i, -1);
				BinPoint.add(point);
			}
			
			//ASC 오름차순
			Collections.sort(BinPoint, new Comparator<Double>(){
			      public int compare(Double obj1, Double obj2)
			      {
			            // TODO Auto-generated method stub
			    	  return (obj1 < obj2) ? -1: (obj1 > obj2) ? 1:0 ;
			      }
			});
		}
		*/
		m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
		//m_indexArr = CommonMethods.convertIndexStr2IntArr(conf.get(ArgumentsConstants.TARGET_INDEX, "-1"));
		//m_indexArr =  conf.getInt("FilterTarget", -1);
		m_classIndex = Integer.parseInt(conf.get(ArgumentsConstants.CLASS_INDEX, "-1"));
    }
	@Override
	protected void map(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] columns = value.toString().split(m_delimiter);		
		Double cmpSource = 0.0;
		try
		{
			for(int ci = 0; ci < columns.length; ci++)
			{
				if(TargetIndex.contains(ci) == true)
				{
					//Convert
					List<Double> BinPoint = Convert_Map.get(ci);
					double cmpTarget = Double.parseDouble(columns[ci]);
					
					if(BinPoint.size() == 1)
					{
						cmpSource = BinPoint.get(0);
						if(cmpTarget <= cmpSource)
						{
							//context.write(new Text(cmpTarget + "<=" +  BinPoint.get(0)) , new Text(","+ value.toString()));	
							columns[ci] = cmpTarget + "<=" +  BinPoint.get(0);
							
							
						}
						else
						{
							//context.write(new Text(cmpTarget + ">" + BinPoint.get(0)) , new Text(","+ value.toString()));
							columns[ci] = cmpTarget + ">" +  BinPoint.get(0);
						}
					}
					else if(BinPoint.size() >= 1)
					{
						//양극 범위 검사.
						if(cmpTarget <= BinPoint.get(0))//minimum
						{
							//context.write(new Text(cmpTarget + "<=" +  BinPoint.get(0)) , new Text("#"+ value.toString()));
							columns[ci] = cmpTarget + "<=" +  BinPoint.get(0);
						}
						else if(BinPoint.get(BinPoint.size()-1) < cmpTarget) //maximum
						{
							//context.write(new Text(cmpTarget +  ">" + BinPoint.get(BinPoint.size()-1)) , new Text("#"+ value.toString()));
							columns[ci] = cmpTarget + ">" +  BinPoint.get(BinPoint.size()-1);
						}
						
						else
						{
							for(int i = 0; i < BinPoint.size(); i++)
							{
								if(((BinPoint.get(i) < cmpTarget) &&( cmpTarget <= BinPoint.get(i+1)) ) && (i+1 < BinPoint.size()))
								{
									columns[ci] = cmpTarget + "(" + BinPoint.get(i) + "~" + BinPoint.get(i+1)+"]";
									break;
								}
							}
						}
						
					}
					else if(BinPoint.size() == 0)
					{
						columns[ci] = "All";
					}
				}				
			}
			String replace_instance = "";
			for(int  i = 0; i < columns.length; i++)
			{
				replace_instance += columns[i]+",";
			}
			replace_instance = replace_instance.substring(0, replace_instance.length()-1);
			NullWritable nw = NullWritable.get();
			context.write(nw, new Text(replace_instance));
			
			/*
			Double cmpTarget = Double.parseDouble(columns[m_indexArr]);
			Double cmpSource = 0.0;
			if(BinPoint.size() == 1)
			{
				cmpSource = BinPoint.get(0);
				if(cmpTarget <= cmpSource)
				{
					//context.write(new Text(cmpTarget + "<=" +  BinPoint.get(0)) , new Text(","+ value.toString()));	
					columns[m_indexArr] = cmpTarget + "<=" +  BinPoint.get(0);
					
					
				}
				else
				{
					//context.write(new Text(cmpTarget + ">" + BinPoint.get(0)) , new Text(","+ value.toString()));
					columns[m_indexArr] = cmpTarget + ">" +  BinPoint.get(0);
				}
			}
			else if(BinPoint.size() >= 1)
			{
				//양극 범위 검사.
				if(cmpTarget <= BinPoint.get(0))//minimum
				{
					//context.write(new Text(cmpTarget + "<=" +  BinPoint.get(0)) , new Text("#"+ value.toString()));
					columns[m_indexArr] = cmpTarget + "<=" +  BinPoint.get(0);
				}
				else if(BinPoint.get(BinPoint.size()-1) < cmpTarget) //maximum
				{
					//context.write(new Text(cmpTarget +  ">" + BinPoint.get(BinPoint.size()-1)) , new Text("#"+ value.toString()));
					columns[m_indexArr] = cmpTarget + ">" +  BinPoint.get(BinPoint.size()-1);
				}
				
				else
				{
					for(int i = 0; i < BinPoint.size(); i++)
					{
						if(((BinPoint.get(i) < cmpTarget) &&( cmpTarget <= BinPoint.get(i+1)) ) && (i+1 < BinPoint.size()))
						{
						//	context.write(new Text(cmpTarget + "(" + BinPoint.get(i) + "," + BinPoint.get(i+1)+"]") , new Text("#"+ value.toString()));
							columns[m_indexArr] = cmpTarget + "(" + BinPoint.get(i) + "~" + BinPoint.get(i+1)+"]";
							break;
						}
					}
				}
				
			}
			else if(BinPoint.size() == 0)
			{
				//context.write(new Text(cmpTarget+"") , new Text(","+ "All"));
				columns[m_indexArr] = "All";
			}
			String replace_instance = "";
			for(int  i = 0; i < columns.length; i++)
			{
				replace_instance += columns[i]+",";
			}
			replace_instance = replace_instance.substring(0, replace_instance.length()-1);
			NullWritable nw = NullWritable.get();
			context.write(nw, new Text(replace_instance));
			*/
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	/*
	protected void map_old(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] columns = value.toString().split(m_delimiter);
		try
		{
			
			Double cmpTarget = Double.parseDouble(columns[m_indexArr]);
			Double cmpSource = 0.0;
			
			if(BinPoint.size() == 1)
			{
				cmpSource = BinPoint.get(0);
				if(cmpTarget <= cmpSource)
				{
					context.write(new Text(cmpTarget + "<=" +  BinPoint.get(0)) , new Text(","+ value.toString()));				
					System.out.println("jobTrans :" + cmpTarget + "<=" +  BinPoint.get(0));
				}
				else
				{
					context.write(new Text(cmpTarget + ">" + BinPoint.get(0)) , new Text(","+ value.toString()));
					System.out.println("jobTrans :" + cmpTarget + ">" + BinPoint.get(0));
				}
			}
			else if(BinPoint.size() >= 1)
			{
				//양극 범위 검사.
				if(cmpTarget <= BinPoint.get(0))//minimum
				{
					context.write(new Text(cmpTarget + "<=" +  BinPoint.get(0)) , new Text("#"+ value.toString()));
				}
				else if(BinPoint.get(BinPoint.size()-1) < cmpTarget) //maximum
				{
					context.write(new Text(cmpTarget +  ">" + BinPoint.get(BinPoint.size()-1)) , new Text("#"+ value.toString()));
				}
				
				else
				{
					for(int i = 0; i < BinPoint.size(); i++)
					{
						if(((BinPoint.get(i) < cmpTarget) &&( cmpTarget <= BinPoint.get(i+1)) ) && (i+1 < BinPoint.size()))
						{
							context.write(new Text(cmpTarget + "(" + BinPoint.get(i) + "," + BinPoint.get(i+1)+"]") , new Text("#"+ value.toString()));
							break;
						}
					}
				}
			}
			else if(BinPoint.size() == 0)
			{
				context.write(new Text(cmpTarget+"") , new Text(","+ "All"));				
				System.out.println("jobTrans :" + cmpTarget + ":" + "All");
			}
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	*/
}
