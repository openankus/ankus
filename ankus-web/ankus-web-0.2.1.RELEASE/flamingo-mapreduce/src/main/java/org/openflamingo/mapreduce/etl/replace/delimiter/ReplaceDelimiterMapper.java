package org.openflamingo.mapreduce.etl.replace.delimiter;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.openflamingo.mapreduce.util.CounterUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

/**
 * Delimiter를 변경하는 Replace Delimiter Mapper.
 * 이 Mapper는 입력 ROW를 {@link String#replaceAll(String, String)}을 기반으로 동작한다.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class ReplaceDelimiterMapper extends Mapper<LongWritable, Text, NullWritable, Text> {

	/**
	 * SLF4J Logging
	 */
	private static Logger logger = LoggerFactory.getLogger(ReplaceDelimiterMapper.class);

	/**
	 * 변경하기전 원본 컬럼 구분자
	 */
	private String from;

	/**
	 * 변경할 컬럼 구분자
	 */
	private String to;

	@Override
	protected void setup(Context context) throws IOException, InterruptedException {
		Configuration configuration = context.getConfiguration();
		from = configuration.get("from");
		to = configuration.get("to");
	}

    @Override
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		try {
			CounterUtils.writerMapperCounter(this, "YES", context);
			context.write(NullWritable.get(), new Text(value.toString().replaceAll(from, to)));
		} catch (IllegalArgumentException ex) {
			CounterUtils.writerMapperCounter(this, "NO", context);
		}
	}
}