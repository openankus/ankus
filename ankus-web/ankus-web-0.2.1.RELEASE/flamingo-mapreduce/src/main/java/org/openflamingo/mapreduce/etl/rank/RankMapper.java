package org.openflamingo.mapreduce.etl.rank;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

/**
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
// TODO mapper may not need.
public class RankMapper extends Mapper<LongWritable, Text, NullWritable, Text> {


    protected void setup(Context context) throws IOException, InterruptedException {
    }

    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {

        // FIXME mapper의 output key고민 필요!
        context.write(NullWritable.get(), value);
    }
}