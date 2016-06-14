package org.openflamingo.web;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

public class DatabaseInitilizer implements InitializingBean {

    private DataSource dataSource;

    private Resource resource;

    @Override
    public void afterPropertiesSet() throws Exception {
        ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
        databasePopulator.addScript(resource);
        DatabasePopulatorUtils.execute(databasePopulator, dataSource);
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }
}
