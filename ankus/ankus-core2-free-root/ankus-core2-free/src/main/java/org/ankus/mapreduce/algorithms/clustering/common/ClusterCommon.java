package org.ankus.mapreduce.algorithms.clustering.common;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.ankus.util.Constants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

/**
 * Created with IntelliJ IDEA.
 * User: Wonmoon
 * Date: 14. 8. 12
 * Time: 오후 10:46
 * To change this template use File | Settings | File Templates.
 */
public class ClusterCommon {

    public static String[] getParametersForPurity(Configuration conf, int clusterIndex) throws Exception
    {
        String params[] = new String [10];

        params[0] = ArgumentsConstants.INPUT_PATH;
        params[1] = conf.get(ArgumentsConstants.INPUT_PATH);

        params[2] = ArgumentsConstants.OUTPUT_PATH;
        params[3] = conf.get(ArgumentsConstants.OUTPUT_PATH);

        params[4] = ArgumentsConstants.DELIMITER;
        params[5] = conf.get(ArgumentsConstants.DELIMITER, "\t");

        params[6] = ArgumentsConstants.TARGET_INDEX;
        params[7] = clusterIndex + "";

        params[8] = ArgumentsConstants.TEMP_DELETE;
        params[9] = "true";

        return params;

    }


    public static int getClusterIndex(Configuration conf) throws Exception
    {
        String delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");

        FileSystem fs = FileSystem.get(conf);

        Path inputPath = new Path(conf.get(ArgumentsConstants.INPUT_PATH));
        inputPath = CommonMethods.findFile(fs, inputPath);

        FSDataInputStream fin = fs.open(inputPath);
        BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));

        int index = br.readLine().split(delimiter).length - 2;

        br.close();
        fin.close();

        return index;
    }

    public static void finalPurityGen(Configuration conf, String finalOutputFilePath) throws Exception
    {
        FileSystem fs = FileSystem.get(conf);

        FSDataOutputStream fout = fs.create(new Path(finalOutputFilePath), true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fout, Constants.UTF8));
        bw.write("# Clustering Result - Purity" + "\n");
        bw.write("# Cluster Number, Assigned Data Count, Assigned Data Ratio" + "\n");

        Path inputPath = new Path(conf.get(ArgumentsConstants.OUTPUT_PATH));
        FileStatus[] status = fs.listStatus(inputPath);
        for(int i=0; i<status.length; i++)
        {
            if(!status[i].getPath().toString().contains("part-m-")) continue;

            FSDataInputStream fin = fs.open(status[i].getPath());
            BufferedReader br = new BufferedReader(new InputStreamReader(fin, Constants.UTF8));
            String readStr;
            while((readStr = br.readLine())!=null)
            {
                bw.write(readStr + "\n");
            }
            br.close();
            fin.close();
        }

        bw.close();
        fout.close();
    }


}
