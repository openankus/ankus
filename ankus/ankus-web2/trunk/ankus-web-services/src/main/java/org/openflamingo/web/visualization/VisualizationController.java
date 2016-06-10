/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.openflamingo.web.visualization;

import org.openflamingo.model.rest.Response;
import org.openflamingo.model.rest.Visualization;
import org.openflamingo.model.rest.VisualizationHistory;
import org.openflamingo.util.ExceptionUtils;
import org.openflamingo.web.core.LocaleSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Visualization Controller.
 *
 * @author Jaesung Ahn
 */
@Controller
@RequestMapping("/visualization")
public class VisualizationController extends LocaleSupport {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(VisualizationController.class);

    /**
     * Designer Service
     */
    @Autowired
    private VisualizationService visualizationService;

    @RequestMapping(value = "run", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response run(@RequestBody Visualization visualization) {
        Response response = new Response();
        
        try {
        	VisualizationHistory visualizationHistory = visualizationService.run(visualization, visualization.getEngine());
 
        	response.setObject(visualizationHistory);
            response.setSuccess(true);
        } catch (Exception ex) {
            String message = message("S_DESIGNER", "CANNOT_RUN_WORKFLOW", "visualization", ex.getMessage());
            logger.warn("{}", message, ex);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
            response.setSuccess(false);
        }
        return response;
    } 

    @RequestMapping(value = "visualization", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getVisualizationHistory(@RequestParam(defaultValue = "0") String jobStringId, @RequestParam(defaultValue = "0") long engineId) {
    	Response response = new Response();
    	
    	try {
    		VisualizationHistory visualizationHistory = visualizationService.getVisualizationHistoryByJobStringId(jobStringId, engineId);
    		
    		response.setObject(visualizationHistory);
    		response.setSuccess(true);
    	} catch (Exception ex) {
    		response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
    	}
    	return response;
    } 
}
