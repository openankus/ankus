package org.openflamingo.fs.hdfs;

import org.apache.hadoop.conf.Configuration;
import org.junit.Assert;
import org.junit.Test;
import org.openflamingo.model.rest.HadoopCluster;

public class HdfsHelperTest {

    @Test
    public void getConfiguration() throws Exception {
        String hdfsUrl = "hdfs://1.1.1.1:9000";

        HadoopCluster hadoopCluster = new HadoopCluster();
        hadoopCluster.setHdfsUrl(hdfsUrl);

        Configuration configuration = HdfsHelper.getConfiguration(hadoopCluster);

        Assert.assertEquals(configuration.get("fs.default.name"), hdfsUrl);
    }

}
