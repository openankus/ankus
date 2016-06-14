package org.openflamingo.provider.engine;

import org.openflamingo.model.rest.FileInfo;

import java.util.List;

public interface AdminService {

    List<FileInfo> getDirectoryAndFiles(String path);

}
