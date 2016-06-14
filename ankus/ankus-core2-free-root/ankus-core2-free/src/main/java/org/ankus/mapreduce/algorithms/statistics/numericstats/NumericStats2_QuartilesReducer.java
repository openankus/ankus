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
package org.ankus.mapreduce.algorithms.statistics.numericstats;

import org.ankus.util.ArgumentsConstants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;
import java.util.*;

/**
 * NumericStats1_2MRMergeReducer
 * @desc 2nd reducer class for numeric statistics computation mr job (2-step)
 * @version 0.0.1
 * @date : 2013.08.21
 * @author Moonie
 */
public class NumericStats2_QuartilesReducer extends Reducer<Text, Text, NullWritable, Text>{

	private String delimiter;

    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
        delimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");
    }


//	@Override
	protected void reduce(Text key, Iterable<Text> values, Context context)
			throws IOException, InterruptedException 
	{
		String keyStr = key.toString();

        int myAttrIndex = Integer.parseInt(keyStr.substring(0, keyStr.indexOf('-')));
        int myBlockNum = Integer.parseInt(keyStr.substring(keyStr.indexOf('-')+1, keyStr.length()-1));;

        String blockTokens[] = context.getConfiguration().get(myAttrIndex + "Block").split(",");

        long qIndexArr[][] = getQIndex(Long.parseLong(blockTokens[3]));
        long blockDataCntArr[] = getBlockDataCnt(myAttrIndex, context.getConfiguration());


        // 자신의 구간에서 써야 하는 (인덱스, 해당 인덱스의 사분위 수)를 저장
        // 저장한 목록이 0이 아니면,
        // 정렬 리스트를 만들고, 해당 인덱스를 출력 결과로 반한
        HashMap<Long, Integer> qIndexMap = isMatchQPosition(myBlockNum, blockDataCntArr, qIndexArr);
        if(qIndexMap!=null)
        {
            ArrayList<Double> valueList = new ArrayList<Double>();
            Iterator<Text> iterator = values.iterator();
            int size = 0;
            while (iterator.hasNext())
            {
                double value = Double.parseDouble(iterator.next().toString());

                if(size==0) valueList.add(value);
                if(size > 0)
                {
                    if(value <= valueList.get(0)) valueList.add(0, value);
                    else if(value >= valueList.get(size-1)) valueList.add(value);
                    else
                    {
                        int index = -1;
                        for(int i=0; i<size; i++)
                        {
                            if(value <= valueList.get(i))
                            {
                                index = i;
                                break;
                            }
                        }

                        if(index >= 0) valueList.add(index, value);
                    }
                }

                size = valueList.size();
            }
            Collections.sort(valueList);

            Set<Long> indexSet = qIndexMap.keySet();
            for(long i: indexSet)
            {
                context.write(NullWritable.get(), new Text(myAttrIndex + "-" + qIndexMap.get(i) + "Q" + delimiter
                                + valueList.get((int)i)));
            }
        }
	}

    private HashMap<Long, Integer> isMatchQPosition(int myBlockSeq, long[] blockCntArr, long[][] qIndexArr)
    {
        HashMap<Long, Integer> qIndexMap = new HashMap<Long, Integer>();

        if((myBlockSeq < 1) || (myBlockSeq > 4)) return null;
        else myBlockSeq--;

        long myStartIndex = 0;
        for(int i=0; i<myBlockSeq; i++) myStartIndex += blockCntArr[i];
        long myEndIndex = myStartIndex + blockCntArr[myBlockSeq] - 1;

        for(int i=0; i<qIndexArr.length; i++)
        {
            for(int k=0; k<qIndexArr[i].length; k++)
            {
                if((qIndexArr[i][k] >= 0)
                        && (qIndexArr[i][k] >= myStartIndex)
                        && (qIndexArr[i][k] <= myEndIndex))
                {
                    qIndexMap.put(qIndexArr[i][k] - myStartIndex, i+1);
                }
            }
        }

        if(qIndexMap.size() == 0) return null;
        else return qIndexMap;
    }

    private long[] getBlockDataCnt(int attrIndex, Configuration conf)
    {
        long retArr[] = new long[4];

        retArr[0] = Long.parseLong(conf.get(attrIndex + "-1B"));
        retArr[1] = Long.parseLong(conf.get(attrIndex + "-2B"));
        retArr[2] = Long.parseLong(conf.get(attrIndex + "-3B"));
        retArr[3] = Long.parseLong(conf.get(attrIndex + "-4B"));

        return retArr;
    }

    private long[][] getQIndex(long dataCnt)
    {
        long[][] retIndex = new long[3][2];

        double q1 = (double)dataCnt * 0.25;
        double q2 = (double)dataCnt * 0.5;
        double q3 = (double)dataCnt * 0.75;


        if((q1-(int)q1) > 0)
        {
            retIndex[0][0] = -1;
            retIndex[0][1] = (int)q1;
        }
        else
        {
            retIndex[0][0] = (int)q1 - 1;
            retIndex[0][1] = (int)q1;
        }

        if((q2-(int)q2) > 0)
        {
            retIndex[1][0] = -1;
            retIndex[1][1] = (int)q2;
        }
        else
        {
            retIndex[1][0] = (int)q2 - 1;
            retIndex[1][1] = (int)q2;
        }

        if((q3-(int)q3) > 0)
        {
            retIndex[2][0] = -1;
            retIndex[2][1] = (int)q3;
        }
        else
        {
            retIndex[2][0] = (int)q3 - 1;
            retIndex[2][1] = (int)q3;
        }

        return retIndex;
    }


    @Override
    protected void cleanup(Context context) throws IOException, InterruptedException {
    }
}
