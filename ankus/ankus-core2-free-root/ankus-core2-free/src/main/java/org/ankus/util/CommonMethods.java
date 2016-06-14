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
package org.ankus.util;

import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

/**
 * CommonMethods
 * @desc
 *
 * @version 0.0.1
 * @date : 2013.08.23
 * @author Moonie Song
 */
public class CommonMethods {

	private static boolean isContain(int[] indexArr, int index)
	{
		for(int i: indexArr)
		{
			if(i==index) return true;
		}
		
		return false;
	}
	
	public static boolean isContainIndex(int[] indexArr, int index, boolean defaultContain)
	{
		if((indexArr.length == 1) && (indexArr[0] == -1))
		{
			if(defaultContain) return true;
			else return false;
		}
		else return isContain(indexArr, index);
	}
	
	public static int[] convertIndexStr2IntArr(String strValue)
	{
		String indexStr[] = strValue.split(",");
		int arr[] = new int[indexStr.length];
		for(int i=0; i<indexStr.length; i++)			
		{
			arr[i] = Integer.parseInt(indexStr[i]);
		}
		
		return arr;
	}
	
	public static boolean isNumeric(String value)
	{
		try
		{
			Double.parseDouble(value);
			return true;
		} catch (Exception e) {}
		
		return false;
	}

    public static String genKeyStr(String valueStr, String m_delimiter)
    {
        String finalStr = valueStr;
        if(m_delimiter != null)
        {
            finalStr = "";
            String tokens[] = valueStr.split(m_delimiter);
            for(String s: tokens) finalStr += s + "@@";
        }

        return finalStr.hashCode() + "";
    }

    public static String genKeyStr(String valueStr[])
    {
        String finalStr = "";
        for(String s: valueStr) finalStr += s + "@@";

        return finalStr.hashCode() + "";
    }

    public static Path findFile(FileSystem fs, Path filePath) throws Exception
    {
        // TODO: edit findFile,
        /*
            as-is: find file in defined directory
            to-be: find fine in defined path (recursively)
         */
        if(fs.isFile(filePath)) return filePath;
        else
        {
            FileStatus[] status = fs.listStatus(filePath);
            boolean isFile = false;
            for(int i=0; i<status.length; i++)
            {
                Path fPath = status[i].getPath();
                String fNameStr = fPath.getName();

                if((fNameStr.charAt(0)!='.') && (fNameStr.charAt(0)!='_') && fs.isFile(fPath)) return fPath;
            }
            return filePath;
        }

    }

    public static Properties getConfigProperties() throws IOException, NullPointerException {

        InputStream resourceAsStream = null;
        Properties properties = new Properties();
        try{
            // Get configuration properties for hdfs output path from user
            resourceAsStream = CommonMethods.class.getResourceAsStream("/config.properties");
            properties.load(resourceAsStream);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            resourceAsStream.close();
        }
        return properties;
    }

    public static String createDirectoryForHDFS(String outputPath) throws IOException {

        Properties configProperties = getConfigProperties();

        // Generate date format for create file name
        DateFormat dateFormat = new SimpleDateFormat(Constants.YYYYMMDDHHMMSS);
        Date date = new Date();
        String currentDate = dateFormat.format(date);

        // Get key (hdfs.output.dir) from config.properties
        String hdfsTempDir = configProperties.get(Constants.MIDTERM_PROCESS_OUTPUT_DIR).toString();

        /**
         * Check key of properties
         * If value is null, add '_prepare' of output path by user
         * Else value is not null, set value to config.properties by user
         */
        String tempDirectory = null;

        if(hdfsTempDir.equals("")){
            tempDirectory = outputPath + "_prepare";
        }else{
            tempDirectory = hdfsTempDir + "/" + currentDate;
        }

        return tempDirectory;
    }

    public static double getDistance(String[] data1,
                                     String[] data2,
                                     String distanceOption,
                                     int[] indexArr,
                                     int[] nominalArr,
                                     int[] exceptionArr,
                                     int classIndex,
                                     double nominalDitanceBase)
    {
        int iterLen = data1.length;
        if(iterLen > data2.length) iterLen = data2.length;

        double dist = 0.0;
        if(distanceOption.equals(Constants.CORR_MANHATTAN))
        {
            for(int i=0; i<iterLen; i++)
            {
                if(isValidIndex(i, indexArr, nominalArr, exceptionArr, classIndex))
                {
                    if(isContainIndex(nominalArr, i, false))
                    {
                        if(!data1[i].equals(data2[i])) dist += nominalDitanceBase;
                    }
                    else
                    {
                        dist += Math.abs(Double.parseDouble(data1[i]) - Double.parseDouble(data2[i]));
                    }
                }
            }
        }
        else
        {
            for(int i=0; i<iterLen; i++)
            {
                if(isValidIndex(i, indexArr, nominalArr, exceptionArr, classIndex))
                {
                    if(isContainIndex(nominalArr, i, false))
                    {
                        if(!data1[i].equals(data2[i])) dist += nominalDitanceBase;
                    }
                    else
                    {
                        dist += Math.pow(Double.parseDouble(data1[i]) - Double.parseDouble(data2[i]), 2);
                    }
                }
            }
            dist = Math.sqrt(dist);
        }

        return dist;
    }

    private static boolean isValidIndex(int index, int[] indexArr, int[] nominalArr, int[] exceptionArr, int classIndex)
    {
        if(nominalArr == null)
        {
            if(CommonMethods.isContainIndex(indexArr, index, true)
                    && !CommonMethods.isContainIndex(exceptionArr, index, false)
                    && index != classIndex) return true;
            else return false;
        }
        else
        {
            if((CommonMethods.isContainIndex(indexArr, index, true) || CommonMethods.isContainIndex(nominalArr, index, false))
                    && !CommonMethods.isContainIndex(exceptionArr, index, false)
                    && index != classIndex) return true;
            else return false;
        }
    }
}
