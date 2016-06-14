package org.openflamingo.mapreduce.etl.groupby;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

/**
 * 지정한 키로 Group By하여 하나의 로우로 키와 값을 취합하는 GroupBy ETL Mapper.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class GroupByMapper extends Mapper<LongWritable, Text, Text, Text> {

	/**
	 * 입력 파일의 구분자.
	 */
	private String inputDelimiter;

	/**
	 * Group By할 키의 위치.
	 */
	private int keyColumn;

	@Override
	protected void setup(Context context) throws IOException, InterruptedException {
		Configuration configuration = context.getConfiguration();
		inputDelimiter = configuration.get("inputDelimiter");
		keyColumn = configuration.getInt("groupByKey", -1);
		if (keyColumn == -1) {
			throw new IllegalArgumentException("You must specify 'groupByKey' for Group By");
		}
	}

	@Override
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		String[] columns = value.toString().split(inputDelimiter);
		for (int index = 0; index < columns.length; index++) {
			if (index == keyColumn) {
				continue;
			}
			context.write(new Text(columns[keyColumn]), new Text(columns[index]));
		}
	}
}