package org.openflamingo.engine.job;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.openflamingo.engine.hive.HiveJdbcClient;

@RunWith(JUnit4.class)
public class HiveJdbcClientTest {

    private HiveJdbcClient hiveClient;

    @Before
    public void setUp() throws Exception {
        hiveClient = new HiveJdbcClient();

        hiveClient.openConnection("jdbc:hive2://14.63.199.15:10000/default;user=root", "default");
    }

    @After
    public void cleanup() throws Exception {
        hiveClient.closeConnection();
    }

    @Test
    public void testJdbcDefault() throws Exception {
/*
        List<Map<String, String>> results;

        long queryId = hiveClient.executeQuery("", "show databases");
        results = hiveClient.getResults(queryId);

        for (Map<String, String> row : results) {
            for (String column : row.keySet()) {
                System.out.println("key: " + column + ", " + row.get(column));
            }
        }
*/
    }

    @Test
    public void testMultipleQueries() throws Exception {
/*
        List<Map<String, String>> results;

        List<String> queries = new ArrayList<>();

        queries.add("show tables");
        queries.add("show databases");

        long queryId = hiveClient.executeQueries("", queries); // FIXME
        results = hiveClient.getResults(queryId);

        for (Map<String, String> row : results) {
            for (String column : row.keySet()) {
                System.out.println("key: " + column + ", " + row.get(column));
            }
        }
*/
    }
}
