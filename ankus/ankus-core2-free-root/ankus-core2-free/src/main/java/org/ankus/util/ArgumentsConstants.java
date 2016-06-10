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
 * ArgumentsConstants
 * @desc
 *      Collected constants of parameter by user
 * @version 0.0.1
 * @date : 2013.08.23
 * @author Suhyun Jeon
 * @author Moonie Song
 */
public class ArgumentsConstants {

    // common
    public static final String INPUT_PATH = "-input";
    public static final String OUTPUT_PATH = "-output";
    public static final String DELIMITER = "-delimiter";
    public static final String SUB_DELIMITER = "-subDelimiter";
    public static final String TARGET_INDEX = "-indexList";
    public static final String NOMINAL_INDEX = "-nominalIndexList";
    public static final String NUMERIC_INDEX = "-numericIndexList";
    public static final String EXCEPTION_INDEX = "-exceptionIndexList";
    public static final String MR_JOB_STEP = "-mrJobStep";
    public static final String TEMP_DELETE = "-tempDelete";
    public static final String HELP = "-help";          // current not used, for CLI

    // for certainty factor sum
    public static final String CERTAINTY_FACTOR_MAX = "-cfsumMax";

    // for normalization
    public static final String REMAIN_FIELDS = "-remainAllFields";
    public static final String DISCRETIZATION_COUNT = "-categoryCount";

    // for correlation and similarity
    public static final String KEY_INDEX = "-keyIndex";                     // contents based sim
    public static final String COMPUTE_INDEX = "-computeIndex";
    public static final String ALGORITHM_OPTION = "-algorithmOption";       // cf-sim, contents based sim

    // for association mining - fp-growth
    public static final String AR_MINSUPP = "-minSup";
    public static final String AR_MAX_RULE_LENGTH = "-maxRuleLength";
    public static final String AR_METRIC_TYPE = "-metricType";              // confidence, lift
    public static final String AR_METRIC_VALUE = "-metricValue";
    public static final String AR_RULE_COUNT = "-ruleCount";
    public static final String AR_TARGET_ITEM = "-targetItemList";

    // for decision tree
    public static final String RULE_PATH = "-ruleFilePath";
    public static final String CLASS_INDEX = "-classIndex";
    public static final String MIN_LEAF_DATA = "-minLeafData";
    public static final String PURITY = "-purity";

    //for k-nn
    public static final String K_CNT = "-k";
    public static final String DISTANCE_WEIGHT = "-distanceWeight";
    public static final String IS_VALIDATION_EXEC = "-isValidation";
    public static final String NOMINAL_DISTANCE_BASE = "-nominalDistBase";

    // for k-means, em
    public static final String NORMALIZE = "-normalize";
    public static final String MAX_ITERATION = "-maxIteration";
    public static final String CLUSTER_COUNT = "-clusterCnt";
    public static final String CLUSTER_PATH = "-clusterPath";
    public static final String CLUSTER_TRAINING_CONVERGE = "-convergeRate";

    // for canopy
    public static final String CANOPY_T1 = "-t1";
    public static final String CANOPY_T2 = "-t2";

    // for classification and clustering
    public static final String DISTANCE_OPTION = "-distanceOption";
    public static final String FINAL_RESULT_GENERATION = "-finalResultGen";
    public static final String TRAINED_MODEL = "-modelPath";

    // for recomendation
    public static final String COMMON_COUNT = "-commonCount";
    public static final String UID_INDEX = "-uidIndex";
    public static final String IID_INDEX = "-iidIndex";
    public static final String RATING_INDEX = "-ratingIndex";
    public static final String BASED_TYPE = "-basedType";
    public static final String TARGET_ID = "-targetID";
    public static final String SUMMATION_OPTION = "-sumOption";


    public static final String SIMILARITY_DELIMITER = "-similDelimiter";
    public static final String SIMILARITY_PATH = "-similPath";
    public static final String SIMILARITY_THRESHOLD = "-similThreshold";
    public static final String RECOMMENDATION_CNT = "-recomCnt";
    public static final String TARGET_UID = "-targetUID";
    public static final String TARGET_IID_LIST = "-targetIIDList";

    
    public static final String USER_INDEX = "-userIndex";
    public static final String ITEM_INDEX = "-userIndex";
    public static final String THRESHOLD = "-threshold";
    public static final String SIMILARITY_DATA_INPUT = "-similarDataInput";
    public static final String RECOMMENDED_DATA_INPUT = "-recommendedDataInput";


    /*
     TODO: if new variables are added
     TODO: then, must update "ConfigurationVariable" class for input arguments setting
     */
    //to etl filter 
    public static final String ETL_T_METHOD = "-etlMethod";
    public static final String ETL_RULE_PATH = "-filterRulePath";
    public static final String ETL_RULE = "-filterRule";
    public static final String ETL_FILTER_COLUMNS = "-columnsList";
    
    public static final String ETL_REPLACE_RULE = "-ReplaceRule";
    public static final String ETL_REPLACE_RULE_PATH = "-ReplaceRulePath";
    
    public static final String ETL_NUMERIC_NORM = "-NumericForm"; //Method
    
    public static final String ETL_NUMERIC_NORM_RULE_PATH = "-NumericFormFile"; 
    
    public static final String ETL_NUMERIC_SORT_METHOD = "-Sort";
    
    public static final String ETL_NUMERIC_SORT_TARGET = "-SortTarget";
    
}
