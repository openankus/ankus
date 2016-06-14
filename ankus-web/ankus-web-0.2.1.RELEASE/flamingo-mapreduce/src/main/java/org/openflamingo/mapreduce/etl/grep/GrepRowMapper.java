package org.openflamingo.mapreduce.etl.grep;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.openflamingo.mapreduce.util.CounterUtils;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 정규 표현식을 이용하여 로우를 Grep하는 Grep ETL 매퍼
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class GrepRowMapper extends Mapper<LongWritable, Text, NullWritable, Text> {

	/**
	 * 정규 표현식
	 */
	private String regEx;

	/**
	 * 정규 표현식 패턴
	 */
	private Pattern pattern;

	@Override
	protected void setup(Context context) throws IOException, InterruptedException {
		Configuration configuration = context.getConfiguration();
		regEx = configuration.get("regEx", null);
		pattern = Pattern.compile(regEx);
	}

	@Override
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		String column = value.toString();
		Matcher matcher = pattern.matcher(column);
		if (matcher.find()) {
			CounterUtils.writerMapperCounter(this, "YES", context);
			context.write(NullWritable.get(), new Text(value));
		} else {
			CounterUtils.writerMapperCounter(this, "NO", context);
		}
	}
}