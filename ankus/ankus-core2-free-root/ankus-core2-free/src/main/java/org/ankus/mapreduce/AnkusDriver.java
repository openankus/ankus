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
package org.ankus.mapreduce;



import org.ankus.mapreduce.algorithms.correlation.booleanset.BooleanSetDriver;
import org.ankus.mapreduce.algorithms.correlation.columnbase.ColumnCorrDriver;
import org.ankus.mapreduce.algorithms.correlation.numericset.NumericSetDriver;
import org.ankus.mapreduce.algorithms.correlation.stringset.StringSetDriver;

import org.ankus.mapreduce.algorithms.preprocessing.discretization.DiscretizationDriver;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EMDiscretizationDriver;
import org.ankus.mapreduce.algorithms.preprocessing.discretization.EntropyDiscretizationDriver;
import org.ankus.mapreduce.algorithms.preprocessing.etl.ETL_Trans_Driver;
import org.ankus.mapreduce.algorithms.preprocessing.normalize.NormalizeDriver;
import org.ankus.mapreduce.algorithms.statistics.certaintyfactorsum.CertaintyFactorSumDriver;
import org.ankus.mapreduce.algorithms.statistics.nominalstats.NominalStatsDriver;
import org.ankus.mapreduce.algorithms.statistics.numericstats.NumericStatsDriver;
import org.ankus.mapreduce.algorithms.utils.DocSimilarity.DocSiliarityDriver;
import org.ankus.mapreduce.algorithms.utils.TF_IDF.TF_IDF;
import org.ankus.util.Constants;
import org.apache.hadoop.util.ProgramDriver;

import java.lang.String;

/**
 * A description of an map/reduce program based on its class and a human-readable description.
 * @desc
 *      Collected constants of general utility
 * @version 0.0.1
 * @date : 2013.07.02
 * @update : 2013.10.7
 * @author Suhyun Jeon
 * @author Moonie Song
 */

public class AnkusDriver {

    public static void main(String[] args) {
        ProgramDriver programDriver = new ProgramDriver();
        
        try
        {
        	programDriver.addClass(Constants.DRIVE_TF_IDF, TF_IDF.class, "TF-IDF");//20160627 prism
        	programDriver.addClass(Constants.DRIVE_DOCSIMILITY, DocSiliarityDriver.class, "DocSiliarity"); //20160627 prism
        	
        	programDriver.addClass(Constants.DRIVER_NUMERIC_STATS, NumericStatsDriver.class, "Statistics for Numeric Attributes of Data");
            programDriver.addClass(Constants.DRIVER_NOMINAL_STATS, NominalStatsDriver.class, "Statistics(frequency/ratio) for Nominal Attributes of Data");
            programDriver.addClass(Constants.DRIVER_CERTAINTYFACTOR_SUM, CertaintyFactorSumDriver.class, "Certainty Factor based Summation for Numeric Attributes of Data");

            programDriver.addClass(Constants.DRIVER_ETL_FILTER, ETL_Trans_Driver.class, "Variable filtering for Data");
            programDriver.addClass(Constants.DRIVER_NORMALIZE, NormalizeDriver.class, "Normalization for Numeric Attributes of Data");
            programDriver.addClass(Constants.DRIVER_EMDISCRETIZATION, EMDiscretizationDriver.class, "Numeric Data Discretization");
            programDriver.addClass(Constants.DRIVER_EntropyDISCRETIZATION, EntropyDiscretizationDriver.class, "Numeric Data Discretization");
            
            programDriver.addClass(Constants.DRIVER_BOOLEAN_DATA_CORRELATION, BooleanSetDriver.class, "Boolean Data based Correlation/Similarity Computation");
        	programDriver.addClass(Constants.DRIVER_NUMERIC_DATA_CORRELATION, NumericSetDriver.class, "Numeric Data based Correlation/Similarity Computation");
        	programDriver.addClass(Constants.DRIVER_STRING_DATA_CORRELATION, StringSetDriver.class, "String Data based Correlation/Similarity Computation");
            programDriver.addClass(Constants.DRIVER_COLUMN_BASED_CORRELATION, ColumnCorrDriver.class, "Correlation/Similarity Computation between Column(Attribute) Data");
        	programDriver.driver(args);
        	
        	// Success
        	System.exit(0);

        } catch (Throwable e) {
            e.printStackTrace();
            System.exit(-1);
        }
    }
}