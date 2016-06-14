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

/**
 * Constants
 * @desc
 *      Collected constants of general utility
 * @version 0.0.1
 * @date : 2013.07.15
 * @author Suhyun Jeon
 * @author Moonie Song
 */
public class Constants {

   // for map-reduce job driver class
    public static final String DRIVER_NUMERIC_STATS = "NumericStatistics";
    public static final String DRIVER_NOMINAL_STATS = "NominalStatistics";
    public static final String DRIVER_CERTAINTYFACTOR_SUM = "CertaintyFactorSUM";

    public static final String DRIVER_ETL_FILTER = "ETL";
    public static final String DRIVER_NORMALIZE = "Normalization";
    public static final String DRIVER_EMDISCRETIZATION = "Discretization";
    public static final String DRIVER_EntropyDISCRETIZATION = "EntropyDiscretization";
    

    public static final String DRIVER_COLUMN_BASED_CORRELATION = "ColumnCorrelation";
    public static final String DRIVER_BOOLEAN_DATA_CORRELATION = "BooleanDataCorrelation";
    public static final String DRIVER_NUMERIC_DATA_CORRELATION = "NumericDataCorrelation";
    public static final String DRIVER_STRING_DATA_CORRELATION = "StringDataCorrelation";

    public static final String DRIVER_PFPGROWTH_ASSOCIATION = "PFPGrowth";

    public static final String DRIVER_ID3_CLASSIFICATION = "ID3";
    public static final String DRIVER_kNN_CLASSIFICATION = "kNN";
    public static final String DRIVER_NB_CLASSIFICATION = "NaiveBayes";

    public static final String DRIVER_KMEANS_CLUSTERING = "KMeans";
    public static final String DRIVER_EM_CLUSTERING = "EM";
    public static final String DRIVER_CANOPY_CLUSTERING = "Canopy";

    public static final String DRIVER_CF_BASED_SIMILARITY = "CFBasedSimilarity";
    public static final String DRIVER_CONTENT_BASED_SIMILARITY = "ContentBasedSimilarity";
    public static final String DRIVER_RECOMMENDATION = "Recommendation";

    // for org.ankus.mapreduce.verify
    public static final String DRIVER_RMSE = "RMSE";
    public static final String DRIVER_COMPARE = "Compare";
    public static final String DRIVER_PREDICTION = "Prediction";


    // for common
    public static String DATATYPE_BOOLEAN = "boolean";
    public static String DATATYPE_NUMERIC = "numeric";
    public static String DATATYPE_NOMINAL = "nominal";
    public static String COMMON_MAP_OUTPUT_CNT = "mapOutputRecordCnt";

    public static String ATTR_CLASS = "class";

    // for statistics
    public static String STATS_MINMAX_VALUE = "minMaxValue";
    public static String STATS_NUMERIC_QUARTILE_COUNTER = "NUMERIC_STAT_BLOCK_DATA_CNT";

    // for correlation/similarity classes
    public static final String CORR_HAMMING = "hamming";
    public static final String CORR_DICE = "dice";
    public static final String CORR_JACCARD = "jaccard";
    public static final String CORR_TANIMOTO = "tanimoto";
    public static final String CORR_MANHATTAN = "manhattan";
    public static final String CORR_UCLIDEAN = "uclidean";
    public static final String CORR_COSINE = "cosine";
    public static final String CORR_PEARSON = "pearson";
    public static final String CORR_EDIT = "edit";
    public static final String CORR_MATCHING = "matching";


    // for classification
    public static final String ID3_RULE_CONDITION = "id3_rule_condition";
    public static final String DUPLICATE_KEY_EXCEPTION = "dup_key_exception_for_exec";


    // for recommendation
    public static final String RECOM_USER_BASED = "user";
    public static final String RECOM_ITEM_BASED = "item";
    public static final String RECOM_CB_NORMALSUM = "sum";
    public static final String RECOM_CB_AVGSUM = "avg";
    public static final String RECOM_CB_CFSUM = "cfsum";

    public static final String RECOMJOB_ITEM_DEFINED = "false";
    public static final String RECOMJOB_SIMIL_USER_INFOS = "simil_user_list";
    public static final String RECOMJOB_USERS_VIEWED_INFOS = "user_viwed_list";












    public static final String RECOM_SIMILARITY = "similarity";
    public static final String RECOM_SIMILARITY1 = "similarity1";
    public static final String RECOM_SIMILARITY2 = "similarity2";
    public static final String RECOM_MOVIELENS = "movielens";
    public static final String RECOM_CANDIDATE = "candidate";
    public static final String RECOM_ORIGINAL_DATA = "original";
    public static final String RECOM_RECOMMENDED = "recommended";
    public static final String RECOM_ITEM_LIST_HDFS_PATH = "itemListPath";








    ///////////////////////////////////////////////////////////////////////////////
    // TODO: refine variables
    /**
     * Option parameters for MapReduce driver 
     */
    public static final String KEY_INDEX = "keyIndex";
    public static final String TARGET_INDEX = "indexList";
    public static final String DELIMITER = "delimiter";
    // Separate of multi data to one column
    public static final String SUB_DELIMITER = "subDelimiter";
    public static final String ALGORITHM_OPTION = "algorithmOption";
    public static final String COMPUTE_INDEX = "computeIndex";
    public static final String THRESHOLD = "threshold";
    public static final String REMOVE_INDEX = "removeIndex";
    public static final String BASED_TYPE = "basedType";
    public static final String COMMON_COUNT = "commonCount";

    /**
     * Option parameters for create candidate data set
     */


    /**
     * Remove mode for midterm process
     */
    // TODO: tempDelete
    public static final String REMOVE_ON = "on";
    public static final String REMOVE_OFF = "off";
    public static final String MIDTERM_PROCESS_OUTPUT_DIR = "midterm.process.output.dir";
    public static final String MIDTERM_PROCESS_OUTPUT_REMOVE_MODE = "midterm.process.output.remove.mode";

    // etc.
    public static final String UTF8 = "UTF-8";
    public static final String YYYYMMDDHHMMSS = "yyyyMMddHHmmss";





}
