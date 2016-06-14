package org.openflamingo.fs.hdfs;

import org.junit.Test;
import org.openflamingo.model.rest.Authority;
import org.openflamingo.model.rest.Context;
import org.openflamingo.model.rest.FileInfo;
import org.openflamingo.model.rest.SecurityLevel;
import org.openflamingo.model.rest.HadoopCluster;

import java.util.List;

public class HdfsFileSystemServiceIntegrationTest {

    @Test
    public void getDirectories() {
        HdfsFileSystemProvider provider = new HdfsFileSystemProvider(getContext());
        List<FileInfo> list = provider.list("/", true);
        for (FileInfo file : list) {
            System.out.println(file.getFilename());
        }
    }

    private Context getContext() {
        Context context = new Context();
        context.putObject(Context.AUTORITY, new Authority("fharenheit", SecurityLevel.SUPER));
        context.putObject(Context.HADOOP_CLUSTER, new HadoopCluster("hdfs://localhost:9000"));
        return context;
    }
}
