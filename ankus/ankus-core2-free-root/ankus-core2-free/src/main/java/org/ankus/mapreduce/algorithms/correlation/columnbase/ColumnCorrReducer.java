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
package org.ankus.mapreduce.algorithms.correlation.columnbase;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.Constants;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * ColumnCorrReducer
 * @desc
 * @version
 * @date :
 * @author Moonie
 */
public class ColumnCorrReducer extends Reducer<Text, Text, NullWritable, Text>{

	private String delimiter;
    private String algoOption;
    private String definedDelimiter = "@@";

    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
        delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
        algoOption = context.getConfiguration().get(ArgumentsConstants.ALGORITHM_OPTION, Constants.CORR_UCLIDEAN);
    }

	@Override
	protected void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException
	{
		String keySet[] = key.toString().split(definedDelimiter);

        String writeVal = keySet[0] + delimiter + keySet[1];
        Iterator<Text> iterator = values.iterator();
		
        double finalCorr = 0.0;
        if(algoOption.equals(Constants.CORR_HAMMING)) finalCorr = getHammingDistance(iterator);
        else if(algoOption.equals(Constants.CORR_DICE)) finalCorr = getDiceSimilarity(iterator);
        else if(algoOption.equals(Constants.CORR_JACCARD)) finalCorr = getJaccardSimilarity(iterator);
        else if(algoOption.equals(Constants.CORR_TANIMOTO)) finalCorr = getTanimotoSimilarity(iterator);
        else if(algoOption.equals(Constants.CORR_MANHATTAN)) finalCorr = getManhattanDistance(iterator);
        else if(algoOption.equals(Constants.CORR_UCLIDEAN)) finalCorr = getUclideanDistance(iterator);
        else if(algoOption.equals(Constants.CORR_COSINE)) finalCorr = getCosineSimilarity(iterator);
        else if(algoOption.equals(Constants.CORR_PEARSON)) finalCorr = getPearsonCorrelation(iterator);
        else if(algoOption.equals(Constants.CORR_EDIT)) finalCorr = getAvgEditDistance(iterator);
        else if(algoOption.equals(Constants.CORR_MATCHING)) finalCorr = getMatchingSimilarity(iterator);

        writeVal += delimiter + finalCorr + delimiter + algoOption;
        context.write(NullWritable.get(), new Text(writeVal));
	}

    // for binary
    private double getHammingDistance(Iterator<Text> iterator)
    {
        double distance = 0.0;
        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            if(!tokens[0].equals(tokens[1])) distance++;
        }

        return distance;
    }

    // for binary
    private double getDiceSimilarity(Iterator<Text> iterator)
    {
        double similarity = 0.0;

        double cnt_1 = 0;
        double cnt_2 = 0;
        double commonCnt = 0;

        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            double val1 = Double.parseDouble(tokens[0]);
            double val2 = Double.parseDouble(tokens[1]);

            cnt_1 += val1;
            cnt_2 += val2;
            commonCnt += val1*val2;
        }

        if((cnt_1 + cnt_2)==0) similarity = 0;
        else similarity = (2*commonCnt) / (cnt_1 + cnt_2);

        return similarity;
    }

    // for binary
    private double getJaccardSimilarity(Iterator<Text> iterator)
    {
        double similarity = 0.0;

        double cnt_1 = 0;
        double cnt_2 = 0;
        double commonCnt = 0;

        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            double val1 = Double.parseDouble(tokens[0]);
            double val2 = Double.parseDouble(tokens[1]);

            cnt_1 += val1;
            cnt_2 += val2;
            commonCnt += val1*val2;
        }

        if((cnt_1 + cnt_2 - commonCnt)==0) similarity = 0.0;
        else similarity = commonCnt / (cnt_1 + cnt_2 - commonCnt);
        return similarity;
    }

    // for binary
    private double getTanimotoSimilarity(Iterator<Text> iterator)
    {
        return getJaccardSimilarity(iterator);
    }

    // for numeric
    private double getManhattanDistance(Iterator<Text> iterator)
    {
        return getMinkowskiDistance(iterator, 1);
    }

    // for numeric
    private double getUclideanDistance(Iterator<Text> iterator)
    {
        return getMinkowskiDistance(iterator, 2);
    }

    // for numeric
    private double getMinkowskiDistance(Iterator<Text> iterator, int powVal)
    {
        double distance = 0.0;

        double powSum = 0;
        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            double val1 = Double.parseDouble(tokens[0]);
            double val2 = Double.parseDouble(tokens[1]);

            powSum += Math.pow(Math.abs(val1 - val2), (double)powVal);
        }

        distance = Math.pow(powSum, 1.0/(double)powVal);
        return distance;
    }

    // for numeric
    private double getCosineSimilarity(Iterator<Text> iterator)
    {
        double similarity = 0.0;

        double val1_squareSum = 0.0;
        double val2_squareSum = 0.0;
        double multiplySum = 0.0;

        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            double val1 = Double.parseDouble(tokens[0]);
            double val2 = Double.parseDouble(tokens[1]);

            val1_squareSum += Math.pow(val1, 2.0);
            val2_squareSum += Math.pow(val2, 2.0);
            multiplySum += (val1 * val2);
        }

        double denominator = (Math.sqrt(val1_squareSum) * Math.sqrt(val2_squareSum));

        if(denominator == 0) similarity = 0.0;
        else similarity = multiplySum / denominator;
        return similarity;
    }

    // for numeric
    private double getPearsonCorrelation(Iterator<Text> iterator)
    {
        double correlation = 0.0;

        double dataCnt = 0.0;
        double val1_sum = 0.0;
        double val1_squareSum = 0.0;
        double val2_sum = 0.0;
        double val2_squareSum = 0.0;
        double multiplySum = 0.0;

        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            double val1 = Double.parseDouble(tokens[0]);
            double val2 = Double.parseDouble(tokens[1]);

            dataCnt++;
            val1_sum += val1;
            val2_sum += val2;
            val1_squareSum += Math.pow(val1, 2.0);
            val2_squareSum += Math.pow(val2, 2.0);
            multiplySum += (val1 * val2);
        }

        if(dataCnt==0) correlation = 0.0;
        else
        {
            double subDenominator1 = val1_squareSum - (Math.pow(val1_sum, 2.0) / dataCnt);
            double subDenominator2 = val2_squareSum - (Math.pow(val2_sum, 2.0) / dataCnt);
            double denominator = Math.sqrt(subDenominator1 * subDenominator2);

            if(denominator==0) correlation = 0.0;
            else
            {
                double numerator = multiplySum - ((val1_sum * val2_sum) / dataCnt);
                correlation = numerator / denominator;
            }
        }

        return correlation;
    }

    // for nominal(string)
    private double getAvgEditDistance(Iterator<Text> iterator)
    {
        double distance = 0.0;
        double dataCnt = 0;
        int editSum = 0;

        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            dataCnt++;
            editSum += getEditDistance(tokens[0], tokens[1]);
        }

        if(dataCnt==0) distance = 0;
        else distance = (double)editSum / dataCnt;

        return distance;
    }

    // for nominal(string)
    private int getEditDistance(String str1, String str2)
    {
        int[][] distance = new int[str1.length() + 1][str2.length() + 1];

        for (int i = 0; i <= str1.length(); i++) distance[i][0] = i;
        for (int j = 1; j <= str2.length(); j++) distance[0][j] = j;

        for (int i = 1; i <= str1.length(); i++)
        {
            for (int j = 1; j <= str2.length(); j++)
            {
                distance[i][j] = minimum(distance[i - 1][j] + 1,
                                        distance[i][j - 1] + 1,
                                        distance[i - 1][j - 1] + ((str1.charAt(i - 1) == str2.charAt(j - 1)) ? 0 : 1));
            }
        }

        return distance[str1.length()][str2.length()];
    }

    private static int minimum(int a, int b, int c)
    {
        return Math.min(Math.min(a, b), c);
    }

    // for nominal matching
    private double getMatchingSimilarity(Iterator<Text> iterator)
    {
        double matchingRate = 0.0;
        double dataCnt = 0;
        double matchCount = 0;

        while (iterator.hasNext())
        {
            String tokens[] = iterator.next().toString().split(definedDelimiter);
            if(tokens.length < 2) continue;

            dataCnt++;
            if(tokens[0].equals(tokens[1])) matchCount++;
        }

        if(dataCnt==0) matchingRate = 0.0;
        else matchingRate = matchCount / dataCnt;
        return matchingRate;
    }

    @Override
    protected void cleanup(Context context) throws IOException, InterruptedException
    {
    	System.out.println("Reducer cleanup");
    }



}
