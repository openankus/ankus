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

package org.openflamingo.engine.dblink;

import java.lang.Thread.State;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.beans.factory.annotation.Value;

public class dblinkmain implements ServletContextListener, Runnable{
	 /** 작업을 수행할 thread */
    private Thread thread;

	/*
	 * db config 정보
	 *  2016.01.06
	 *
	 *  by shm7255@onycom.com
	 */

	@Value("${jdbc.driver}")
	public String jdbc_driver; // = "com.mysql.jdbc.Driver" ;

	@Value("${jdbc.url}")
	public String jdbc_url; // = "jdbc:mysql://db.ankus:3306/FLAMINGO?useUnicode=true&characterEncoding=UTF8";

	@Value("${jdbc.username}")
	public String jdbc_username; // = "root";

	@Value("${jdbc.password}")
	public String jdbc_password; // = "djslcom!)";    
    /** context */
    private ServletContext sc; // (2)
    Connection conn = null;                                        // null로 초기화 한다.
	
    /** 작업을 수행한다 */
    public void startDaemon() {
        if (thread == null) { // (3)
            thread = new Thread(this, "Daemon thread for background task");
            thread.setDaemon(true);
        }
        
        if (!thread.isAlive()) { // (4)
            thread.start();
        }
    }
    /** 스레드가 실제로 작업하는 부분 */
    public void run() {
        	Thread currentThread = Thread.currentThread(); // (5)
        	boolean thread_start = true;
        	 try 
	        {
     	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
    	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
    	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
    	    	
    	    	
    	    	System.out.printf("ServletContextListener=[%s]\n", jdbc_driver);
    	    	
    	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
				conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
				currentThread.setName("Main Thread");
	        	while (currentThread == thread) 
		        {
					ResultSet rs = null;
					String sql = null;		
					SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat ( "HH:mm:ss:SSS", Locale.KOREA );
					Date currentTime = new Date ( );
					String mTime = mSimpleDateFormat.format ( currentTime );
					
					PreparedStatement pstmt = null;
					
					if(thread_start == true)
					{
						//System.out.println("Boot Thread");
						sql = "SELECT PROCESS_ID, STATUS, SQLSTATEMENT, HDFSPATH, FILEMODE, DELIMITER FROM DBWORK_PROCESS ";			
						sql +="WHERE (STATUS = ? OR STATUS = ?)";// AND (PROGRESS < TOTALCOUNT) ";
						pstmt = conn.prepareStatement(sql);					
						pstmt.setInt(1, 1);
						pstmt.setInt(2, 2);
					}
					else
					{
						sql = "SELECT PROCESS_ID, STATUS, SQLSTATEMENT, HDFSPATH, FILEMODE, DELIMITER FROM DBWORK_PROCESS ";			
						sql +="WHERE STATUS = ? ";//AND (PROGRESS < TOTALCOUNT) ";
						pstmt = conn.prepareStatement(sql);					
						pstmt.setInt(1, 1);
					}
					
					rs  = pstmt.executeQuery();					
					Thread.sleep(100);
					
					while(rs.next()) //PROCESS 검색.
					{
						Connection conn_process = null;                                        // null로 초기화 한다.
						Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
						System.out.println("Mysql Conect for Process Check");
						conn_process=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
						
						PreparedStatement history_pstmt = null;
						System.out.println("->Found Import process");
						sql = "SELECT DATABASE_NAME, DATABASE_TYPE, TABLE_NAME, DATABASE_ADDRESS, DATABASE_PORT, ID, PASSWORD FROM DBWORK_HISTORY ";			
						sql += "WHERE PROCESS_ID = ?";						
						history_pstmt = conn_process.prepareStatement(sql);						
						history_pstmt.setInt(1, rs.getInt("PROCESS_ID"));						
						ResultSet history_rs  = history_pstmt.executeQuery();						
						Import_main import_main = new Import_main();
						import_main.jdbc_driver = jdbc_driver;
						import_main.jdbc_url = jdbc_url;
						import_main.jdbc_username = jdbc_username;
						import_main.jdbc_password = jdbc_password;
						if(history_rs.next())
						{
							import_main.REMOTE_DB_ADDRESS = history_rs.getString("DATABASE_ADDRESS");
							import_main.REMOTE_DB_PORT  = history_rs.getInt("DATABASE_PORT");
							import_main.REMOTE_ID  = history_rs.getString("ID");
							import_main.REMOTE_PASSWORD  = history_rs.getString("PASSWORD");							
							import_main.remote_sql =  rs.getString("SQLSTATEMENT");
							import_main.hdfs_path = rs.getString("HDFSPATH");
							import_main.file_mode = rs.getInt("FILEMODE");
							import_main.DELIMITER = rs.getString("DELIMITER");
							import_main.process_id = rs.getInt("PROCESS_ID");	
							import_main.DB_NAME = history_rs.getString("DATABASE_NAME");	
							import_main.TABLE_NAME = history_rs.getString("TABLE_NAME");
							import_main.DBTYPE = history_rs.getString("DATABASE_TYPE");
						}						
						
						System.out.println("Import Thread init: " +  import_main.process_id );
						import_main.import_configuration();

						System.out.println("Import IS RUNABLE : " +  import_main.internel_runable );						
						import_main.update_import_state(2, import_main.process_id ,"");							
		
						Thread import_thread  = new Thread(import_main, "Import" +import_main.process_id);
						import_thread.setDaemon(true);
						import_thread.start();	
						while(import_thread.getState() != Thread.State.RUNNABLE)
						{	 
							System.out.println("Wait for Runable status");
						}	
								
						history_pstmt.close();
						conn_process.close();
						thread_start = false;
					}//End of process 검색.
					
					pstmt.close();
				} //end of while
	        	conn.close();
	        }//end of try
        	catch (Exception e) 
        	{
                System.out.println(e.toString());
            }
    }
    
    /** 컨텍스트 초기화 시 데몬 스레드를 작동한다 */
    public void contextInitialized(ServletContextEvent event) {
        sc = event.getServletContext(); // (2)
        startDaemon();
    }
  
    /** 컨텍스트 종료 시 thread를 종료시킨다 */
    public void contextDestroyed(ServletContextEvent event) {
        thread = null; // (7)
    }
	
}
