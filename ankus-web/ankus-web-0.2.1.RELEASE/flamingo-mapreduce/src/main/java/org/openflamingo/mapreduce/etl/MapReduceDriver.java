package org.openflamingo.mapreduce.etl;

import org.apache.hadoop.util.ProgramDriver;
import org.openflamingo.mapreduce.core.Constants;
import org.openflamingo.mapreduce.etl.accounting.AccountingDriver;
import org.openflamingo.mapreduce.etl.aggregate.AggregateDriver;
import org.openflamingo.mapreduce.etl.clean.CleanDriver;
import org.openflamingo.mapreduce.etl.filter.FilterDriver;
import org.openflamingo.mapreduce.etl.generate.GenerateKeyDriver;
import org.openflamingo.mapreduce.etl.grep.GrepDriver;
import org.openflamingo.mapreduce.etl.groupby.GroupByDriver;
import org.openflamingo.mapreduce.etl.rank.RankDriver;
import org.openflamingo.mapreduce.etl.replace.column.ReplaceColumnDriver;
import org.openflamingo.mapreduce.etl.replace.delimiter.ReplaceDelimiterDriver;

/**
 * 모든 MapReduce를 실행하기 위한 Alias를 제공하는 Program Driver.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class MapReduceDriver {

	public static void main(String argv[]) {
		ProgramDriver programDriver = new ProgramDriver();
		try {
			programDriver.addClass("aggregate", AggregateDriver.class, "하나 이상의 파일을 합치는 MapReduce ETL");
			programDriver.addClass("clean", CleanDriver.class, "지정한 컬럼을 삭제하는 MapReduce ETL");
			programDriver.addClass("grep", GrepDriver.class, "파일의 ROW를 RegEx로 Grep하는 MapReduce ETL");
			programDriver.addClass("filter", FilterDriver.class, "파일의 특정 컬럼을 필터링 조건에 따라 필터링하는 MapReduce ETL");
			programDriver.addClass("replace_delimiter", ReplaceDelimiterDriver.class, "컬럼 구분자를 일괄 변경하는 MapReduce ETL");
			programDriver.addClass("replace_column", ReplaceColumnDriver.class, "컬럼 구분자를 일괄 변경하는 MapReduce ETL");
			programDriver.addClass("groupby", GroupByDriver.class, "지정한 Key를 기준으로 Value를 취합하는 MapReduce ETL");
			programDriver.addClass("generate", GenerateKeyDriver.class, "특정 COLUMN을 기준으로 SEQUENCE NUMBER를 생성하는 MapReduce ETL");
			programDriver.addClass("rank", RankDriver.class, "특정 COLUMN을 기준으로 순위를 정하는 MapReduce ETL(Top K기능 옵션)");
			programDriver.addClass("accounting", AccountingDriver.class, "사용자가 정의한 수식을 이용하여 컬럼별 계산을 할 수 있는 MapReduce ETL");
			programDriver.driver(argv);
			System.exit(Constants.JOB_SUCCESS);
		} catch (Throwable e) {
			e.printStackTrace();
			System.exit(Constants.JOB_FAIL);
		}
	}
}

