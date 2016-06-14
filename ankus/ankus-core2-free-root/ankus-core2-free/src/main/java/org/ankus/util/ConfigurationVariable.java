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

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * ConfigurationVariable
 * @desc
 * @version 0.0.1
 * @date : 2013.08.23
 * @author Moonie Song
 */
public class ConfigurationVariable {

    // SLF4J Logging
    private static Logger logger = LoggerFactory.getLogger(ConfigurationVariable.class);

    private static boolean isDefinedArgumentName(String str)
    {
        if(str.equals(ArgumentsConstants.INPUT_PATH)
				|| str.equals(ArgumentsConstants.OUTPUT_PATH)
                || str.equals(ArgumentsConstants.DELIMITER)
                || str.equals(ArgumentsConstants.SUB_DELIMITER)
                || str.equals(ArgumentsConstants.TARGET_INDEX)
                || str.equals(ArgumentsConstants.NOMINAL_INDEX)
                || str.equals(ArgumentsConstants.NUMERIC_INDEX)
                || str.equals(ArgumentsConstants.EXCEPTION_INDEX)
                || str.equals(ArgumentsConstants.MR_JOB_STEP)
                || str.equals(ArgumentsConstants.TEMP_DELETE)
                || str.equals(ArgumentsConstants.HELP)

                || str.equals(ArgumentsConstants.CERTAINTY_FACTOR_MAX)

                || str.equals(ArgumentsConstants.REMAIN_FIELDS)
                || str.equals(ArgumentsConstants.DISCRETIZATION_COUNT)

                || str.equals(ArgumentsConstants.KEY_INDEX)
                || str.equals(ArgumentsConstants.COMPUTE_INDEX)
                || str.equals(ArgumentsConstants.ALGORITHM_OPTION)

                || str.equals(ArgumentsConstants.AR_MINSUPP)
                || str.equals(ArgumentsConstants.AR_MAX_RULE_LENGTH)
                || str.equals(ArgumentsConstants.AR_METRIC_TYPE)
                || str.equals(ArgumentsConstants.AR_METRIC_VALUE)
                || str.equals(ArgumentsConstants.AR_RULE_COUNT)
                || str.equals(ArgumentsConstants.AR_TARGET_ITEM)

                || str.equals(ArgumentsConstants.RULE_PATH)
                || str.equals(ArgumentsConstants.CLASS_INDEX)
                || str.equals(ArgumentsConstants.MIN_LEAF_DATA)
                || str.equals(ArgumentsConstants.PURITY)

                || str.equals(ArgumentsConstants.K_CNT)
                || str.equals(ArgumentsConstants.DISTANCE_WEIGHT)
                || str.equals(ArgumentsConstants.IS_VALIDATION_EXEC)
                || str.equals(ArgumentsConstants.NOMINAL_DISTANCE_BASE)

                || str.equals(ArgumentsConstants.NORMALIZE)
                || str.equals(ArgumentsConstants.MAX_ITERATION)
                || str.equals(ArgumentsConstants.CLUSTER_COUNT)
                || str.equals(ArgumentsConstants.CLUSTER_PATH)
                || str.equals(ArgumentsConstants.CLUSTER_TRAINING_CONVERGE)

                || str.equals(ArgumentsConstants.CANOPY_T1)
                || str.equals(ArgumentsConstants.CANOPY_T2)

                || str.equals(ArgumentsConstants.DISTANCE_OPTION)
                || str.equals(ArgumentsConstants.FINAL_RESULT_GENERATION)
                || str.equals(ArgumentsConstants.TRAINED_MODEL)

                || str.equals(ArgumentsConstants.COMMON_COUNT)
                || str.equals(ArgumentsConstants.UID_INDEX)
                || str.equals(ArgumentsConstants.IID_INDEX)
                || str.equals(ArgumentsConstants.RATING_INDEX)
                || str.equals(ArgumentsConstants.BASED_TYPE)
                || str.equals(ArgumentsConstants.TARGET_ID)
                || str.equals(ArgumentsConstants.SUMMATION_OPTION)

                || str.equals(ArgumentsConstants.SIMILARITY_DELIMITER)
                || str.equals(ArgumentsConstants.SIMILARITY_PATH)
                || str.equals(ArgumentsConstants.SIMILARITY_THRESHOLD)
                || str.equals(ArgumentsConstants.RECOMMENDATION_CNT)
                || str.equals(ArgumentsConstants.TARGET_UID)
                || str.equals(ArgumentsConstants.TARGET_IID_LIST)

                || str.equals(ArgumentsConstants.USER_INDEX)
                || str.equals(ArgumentsConstants.ITEM_INDEX)
                || str.equals(ArgumentsConstants.THRESHOLD)
                || str.equals(ArgumentsConstants.SIMILARITY_DATA_INPUT)
                || str.equals(ArgumentsConstants.RECOMMENDED_DATA_INPUT)

                || str.equals(ArgumentsConstants.ETL_T_METHOD)
                || str.equals(ArgumentsConstants.ETL_RULE_PATH)
                || str.equals(ArgumentsConstants.ETL_RULE)
                || str.equals(ArgumentsConstants.ETL_FILTER_COLUMNS)
                || str.equals(ArgumentsConstants.ETL_REPLACE_RULE_PATH)
                || str.equals(ArgumentsConstants.ETL_REPLACE_RULE)
                
                || str.equals(ArgumentsConstants.ETL_NUMERIC_NORM)
                || str.equals(ArgumentsConstants.ETL_NUMERIC_NORM_RULE_PATH)
                
                || str.equals(ArgumentsConstants.ETL_NUMERIC_SORT_METHOD)
                || str.equals(ArgumentsConstants.ETL_NUMERIC_SORT_TARGET)
				// TODO:  Add here Compare-code for Variable (User Argument Name)
				
				) return true;
		return false;
	}
	
	public static boolean setFromArguments(String[] args, Configuration conf) throws IOException 
	{
		String argName = "";
		String argValue = "";

		for (int i=0; i<args.length; ++i) 
        {
			argName = args[i];
			
			if(isDefinedArgumentName(argName))
			{
                argValue = args[++i];
                /*
                if (argName.equals(ArgumentsConstants.INPUT_PATH) && FileSystem.get(conf).exists(new Path(argValue)))
                {
                	
                    String line = "";
			        try
			   		{
			        	FileSystem fs = FileSystem.get(conf);		
			        	Path path = new Path("/data/numeric_sample.txt");
			   			BufferedReader br = new BufferedReader(new InputStreamReader(fs.open(path)));
			   			while((line  = br.readLine())!= null)
			   			{
			   				logger.info(line);				
			   			}
			   		}catch(Exception e)
			   		{
			   			logger.info(e.toString());
			   		}
			        
                }
                */
                
                if (argName.equals(ArgumentsConstants.OUTPUT_PATH) && FileSystem.get(conf).exists(new Path(argValue)))
                {
                	FileSystem.get(conf).delete(new Path(argValue));//FOR LOCAL TEST
                   
                	//logger.error("Argument Error: Output Path '" + argValue + "' is already exist.!!");
                    //return false;
                }
                else if(argName.equals(ArgumentsConstants.DELIMITER))
                {
                    if(argValue.equals("t")||argValue.equals("\\t")||argValue.equals("'\t'")||argValue.equals("\"\t\"") ||argValue.equals(""))
                    {
                        argValue = "\t";
                    }
                }
                else if(argName.equals(ArgumentsConstants.SUB_DELIMITER))
                {
                    if(argValue.equals("t")||argValue.equals("\\t")||argValue.equals("'\t'")||argValue.equals("\"\t\"") ||argValue.equals(""))
                    {
                        argValue = "\t";
                    }
                }

                conf.set(argName, argValue);
			}
			else 
			{
                logger.error("Argument Error: Unknowned Argument '" + argName + "'");
				return false;
			}
        }
        
        return true;
	}

}
