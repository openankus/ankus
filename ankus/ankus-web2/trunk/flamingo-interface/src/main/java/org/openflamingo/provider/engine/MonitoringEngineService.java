package org.openflamingo.provider.engine;

import org.openflamingo.model.monitoring.HealthInfo;

public interface MonitoringEngineService {

	public HealthInfo getStatus(String hadoopurl);
}
