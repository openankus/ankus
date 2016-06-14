package org.openflamingo.mapreduce.etl.aggregate;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.InputSplit;
import org.apache.hadoop.mapreduce.Mapper;
import org.openflamingo.mapreduce.util.CounterUtils;
import org.openflamingo.mapreduce.util.HdfsUtils;

import java.io.IOException;

/**
 * 하나 이상의 입력 파일을 받아서 합치는 Aggregation ETL Mapper.
 * 이 Mapper는 입력을 그대로 다시 출력한다.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class AggregateMapper extends Mapper<LongWritable, Text, NullWritable, Text> {

	/**
	 * Input Split의 file name
	 */
	private String filename;

	/**
	 * 개별 파일당 라인의 개수를 수집할지 여부
	 */
	private boolean lineCountPerFile;

	@Override
	protected void setup(Context context) throws IOException, InterruptedException {
		Configuration configuration = context.getConfiguration();
		lineCountPerFile = configuration.getBoolean("lineCountPerFile", false);
		if (lineCountPerFile) {
			InputSplit inputSplit = context.getInputSplit();
			try {
				filename = HdfsUtils.getFilename(inputSplit);
			} catch (Exception ex) {
                CounterUtils.writerMapperCounter(this, "Cannot get a file name from input split", context);
			}
		}
	}

	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		if (lineCountPerFile) CounterUtils.writerMapperCounter(this, filename, context);
		context.write(NullWritable.get(), value);
	}

}