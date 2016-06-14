package org.openflamingo.engine.job;


import org.apache.hive.service.cli.HiveSQLException;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.openflamingo.engine.hive.HiveThrift2Client;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RunWith(JUnit4.class)
public class HiveThrift2ClientTest {
    private HiveThrift2Client client;

    @Before
    public void setUp() throws SQLException {
        client = HiveThrift2Client.Factory.getClient("jdbc:hive2://14.63.199.15:10000?allowMultiQuery=true");
        client.connect();
    }

    @After
    public void tearDown() throws HiveSQLException {
        client.closeSession();
    }

    @Test
    public void singleQueryTest() throws Exception {
        System.out.println("========== singleQueryTest");

        client.execute("show databases");
        List<Map<String, String>> results = client.getResults();

        for (Map<String, String> row : results) {
            for (String key : row.keySet()) {
                System.out.println("key: " + key + ", value: " + row.get(key));
            }
        }
    }

    @Test
    public void multipleQueryTest() throws Exception {
        System.out.println("========== multipleQueryTest");

        List<String> queries = new ArrayList<>();

        queries.add("show databases");
        queries.add("show tables");

        client.execute(queries);

        List<Map<String, String>> results = client.getResults();

        for (Map<String, String> row : results) {
            for (String key : row.keySet()) {
                System.out.println("key: " + key + ", value: " + row.get(key));
            }
        }
    }

    @Test
    public void getResultsDoublyTest() throws Exception {
        System.out.println("========== getResultsDoublyTest");

        List<String> queries = new ArrayList<>();

        queries.add("show databases");

        client.execute(queries);

        List<Map<String, String>> results = client.getResults();
        results = client.getResults();

        for (Map<String, String> row : results) {
            for (String key : row.keySet()) {
                System.out.println("key: " + key + ", value: " + row.get(key));
            }
        }
    }
}
