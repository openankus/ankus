package org.openflamingo.mapreduce.etl.replace.delimiter;

import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.util.ToolRunner;
import org.openflamingo.mapreduce.core.AbstractJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

import static org.openflamingo.mapreduce.core.Constants.JOB_FAIL;
import static org.openflamingo.mapreduce.core.Constants.JOB_SUCCESS;

/**
 * Delimiter를 변경하는 Replace Delimiter Driver.
 * 이 MapReduce ETL은 다음의 파라미터를 가진다.
 * <ul>
 *     <li><tt>from (f)</tt> - 원본 Delimiter (필수)</li>
 *     <li><tt>to (t)</tt> - 적용할 Delimiter (필수)</li>
 * </ul>
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class ReplaceDelimiterDriver extends AbstractJob {

	/**
	 * SLF4J API
	 */
	private static final Logger logger = LoggerFactory.getLogger(ReplaceDelimiterDriver.class);

	public static void main(String[] args) throws Exception {
		int res = ToolRunner.run(new ReplaceDelimiterDriver(), args);
		System.exit(res);
	}

	@Override
	public int run(String[] args) throws Exception {
		addInputOption();
		addOutputOption();

		addOption("from", "f", "변경 전 원본 컬럼 구분자", true);
		addOption("to", "t", "변경할 컬럼 구분자", true);

		Map<String, String> parsedArgs = parseArguments(args);
		if (parsedArgs == null) {
			return JOB_FAIL;
		}

		Job job = prepareJob(
			getInputPath(), getOutputPath(),
			TextInputFormat.class, ReplaceDelimiterMapper.class,
			NullWritable.class, Text.class,
			TextOutputFormat.class);

		job.getConfiguration().set("from", parsedArgs.get("--from"));
		job.getConfiguration().set("to", parsedArgs.get("--to"));

		// Run a Hadoop Job
		return job.waitForCompletion(true) ? JOB_SUCCESS : JOB_FAIL;
	}
}