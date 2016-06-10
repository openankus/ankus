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
package org.openflamingo.model.rest;

import java.io.Serializable;
import java.util.Date;

/**
 * Workflow Execution History Domain Object.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class WorkNameParameter implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;


    private String DatabaseAddress;
    private String DatabaseType;
    private String DatabasePort;
    private String DatabaseId;
    private String DatabasePassword;
    private String PROGRESS;
    private String TOTALCOUNT;
    private String SQLSTATEMENT;
    private String HDFSPATH;
    
    private String ENGINE_NAME;
    private String ENGINE_ID;
    
    private String DATABASE_NAME;
    private String TABLE_NAME;
    private int STATUS;
    
    public int getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(int sTATUS) {
		STATUS = sTATUS;
	}

	public String getDATABASE_NAME()
    {
    	return DATABASE_NAME;
    }
    
    public void  setDATABASE_NAME(String DATABASE_NAME)
    {
    	this.DATABASE_NAME = DATABASE_NAME;
    }
    
    public String getTABLE_NAME()
    {
    	return TABLE_NAME;
    }
    
    public void  setTABLE_NAME(String TABLE_NAME)
    {
    	this.TABLE_NAME = TABLE_NAME;
    }
    
    
    public String getENGINENAME()
    {
    	return ENGINE_NAME;
    }
    
    public void  setENGINENAME(String ENGINE_NAME)
    {
    	this.ENGINE_NAME = ENGINE_NAME;
    }
    
    public String getENGINEID()
    {
    	return ENGINE_ID;
    }
    
    public void  setENGINEID(String ENGINE_ID)
    {
    	this.ENGINE_ID = ENGINE_ID;
    }
    
    
    public String getPROGRESS()
    {
    	return PROGRESS;
    }
    
    public void  setPROGRESS(String PROGRESS)
    {
    	this.PROGRESS = PROGRESS;
    }
    
    public String getTOTALCOUNT()
    {
    	return TOTALCOUNT;
    }
    
    public void  setTOTALCOUNT(String TOTALCOUNT)
    {
    	this.TOTALCOUNT = TOTALCOUNT;
    }
    
    
    public String getSQLSTATEMENT()
    {
    	return SQLSTATEMENT;
    }
    
    public void  setSQLSTATEMENT(String SQLSTATEMENT)
    {
    	this.SQLSTATEMENT = SQLSTATEMENT;
    }
    
    public String getHDFSPATH()
    {
    	return HDFSPATH;
    }
    
    public void  setHDFSPATH(String HDFSPATH)
    {
    	this.HDFSPATH = HDFSPATH;
    }
    
    //ADDRESS
    public String getDatabaseAddress() {
        return DatabaseAddress;
    }
    
    public void setDatabaseAddress(String DatabaseAddress) {
        this.DatabaseAddress = DatabaseAddress;
    }
   
    //DATABASE TYPE
    public String getDatabaseType() {
        return DatabaseType;
    }
    
    public void setDatabaseType(String DatabaseType) {
        this.DatabaseType = DatabaseType;
    }
    
    //DATABASE PORT
    public String getDatabasePort() {
        return DatabasePort;
    }
    
    public void setDatabasePort(String DatabasePort) {
        this.DatabasePort = DatabasePort;
    }
    
    //DATABASE ID
    public String getDatabaseId() {
        return DatabaseId;
    }
    
    public void setDatabaseId(String DatabaseId) {
        this.DatabaseId = DatabaseId;
    }
    
    //DATABASE Password
    public String getDatabasePassword() {
        return DatabasePassword;
    }
    
    public void setDatabasePassword(String DatabasePassword) {
        this.DatabasePassword = DatabasePassword;
    }

	@Override
	public String toString() {
		return "WorkNameParameter [DatabaseAddress=" + DatabaseAddress
				+ ", DatabaseType=" + DatabaseType + ", DatabasePort="
				+ DatabasePort + ", DatabaseId=" + DatabaseId
				+ ", DatabasePassword=" + DatabasePassword + ", PROGRESS="
				+ PROGRESS + ", TOTALCOUNT=" + TOTALCOUNT + ", SQLSTATEMENT="
				+ SQLSTATEMENT + ", HDFSPATH=" + HDFSPATH + ", ENGINE_NAME="
				+ ENGINE_NAME + ", ENGINE_ID=" + ENGINE_ID + ", DATABASE_NAME="
				+ DATABASE_NAME + ", TABLE_NAME=" + TABLE_NAME + ", STATUS="
				+ STATUS + "]";
	}
}