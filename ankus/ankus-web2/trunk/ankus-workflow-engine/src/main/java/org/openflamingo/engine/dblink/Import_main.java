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

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;


public class Import_main  implements Runnable{
	
	/*
	 * db config 정보
	 *  2016.01.06
	 *
	 *  by shm7255@onycom.com
	 */

//	@Value("${jdbc.driver}")
	public String jdbc_driver = "com.mysql.jdbc.Driver";

//	@Value("${jdbc.url}")
	public String jdbc_url = "jdbc:mysql://db.ankus:3306/FLAMINGO?useUnicode=true&characterEncoding=UTF8";

//	@Value("${jdbc.username}")
	public String jdbc_username = "root";

//	@Value("${jdbc.password}")
	public String jdbc_password = "djslcom!)";    
	
	
	public String remote_sql = "";
	public String hdfs_path = "";
	public int file_mode = 0;
	public int process_id = 0;
	
	public String REMOTE_DB_ADDRESS = "";
	public int REMOTE_DB_PORT = 0;
	public String REMOTE_ID = "";
	public String REMOTE_PASSWORD = "";
	public String DELIMITER = "\t"; //기본값을 탭으로 설정.
	public String DB_NAME = "";
	public String TABLE_NAME = "";
	public String DBTYPE = "";
	Connection conn = null;    
	FileSystem hdfs =null;
	public boolean internel_runable = false;
	BufferedWriter br =null;
	String overwritepath = "";
	String sequencepath = "";
	Path outFile =  null;
	boolean current_thread_stop = false;
	public Import_main()
	{
		try
		{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
	    	conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	public void update_errorlog(String log)
	{
		try
		{
			String sql = "";
			PreparedStatement pstmt = null;
			sql = "UPDATE DBWORK_HISTORY SET LOG = ? WHERE PROCESS_ID = ?";
			
			pstmt = conn.prepareStatement(sql); // prepareStatement에서 해당 sql을 미리 컴파일한다.
			pstmt.setString(1,  log);	                   //PROCESS ID
			pstmt.setInt(2,	process_id); 		       //WORK_ID
			pstmt.executeUpdate();                                        // 쿼리를 실행한다. 
			
			if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			pstmt.close();
		
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	public synchronized void import_configuration()
	{
		try
		{
			internel_runable = true;//다른 thread를 생성 할 수 있도록 함.			
			Configuration conf = new Configuration();
			conf.addResource(new Path("/Users/ankus/hadoop/conf/core-site.xml"));
		    conf.addResource(new Path("/Users/ankus/hadoop/conf/hdfs-site.xml"));
			hdfs = FileSystem.get(conf);			
			if(this.file_mode == 0)
			{
				update_import_state(4, process_id, "File Mode (is 0) Error");
				System.out.println( "File Mode (is 0) Error");	
			}
			
			//단일 파일 모드로 저장함.
			overwritepath = hdfs_path + "/" + "dbimport" + "00000";
			
			outFile = new Path(overwritepath);
			if(hdfs.exists(outFile))
			{
				//존재할 경우 중지.
				System.out.println(hdfs_path + "is created");
				current_thread_stop = true;
			}
			else 
			{
				//존재하지 않을 경우 생성.
				hdfs.mkdirs(new Path(hdfs_path));
				br = new BufferedWriter(new OutputStreamWriter(hdfs.create(outFile,true)));
			}
			/*
			switch(this.file_mode)
			{
			case 2://overwrite or news create 
				overwritepath = hdfs_path + "/" + "dbimport" + "00000";
				outFile = new Path(overwritepath);
				if(hdfs.exists(outFile))
				{
					hdfs.delete(outFile, true);
				}
				break;
			case 1: //sequence append 
				FileStatus[] status = hdfs.listStatus(new Path(hdfs_path));
				int seqnum = 0;
				for (int i=0;i<status.length;i++)
	            {
					Path path = status[i].getPath();
					String filename = path.toString();
					String[] filepattern  = filename.split("/dbimport");
					String str_fileseq = filepattern[1];
					int cur_seqnum = Integer.parseInt(str_fileseq);
					if(cur_seqnum > seqnum)
					{
						seqnum = cur_seqnum;
					}	
	            }			
				String new_filename = String.format("%05d", seqnum+1);
				sequencepath = hdfs_path + "/" + "dbimport" + new_filename;
				outFile = new Path(sequencepath);	
				
				break;
			}
			*/
			//dout = hdfs.create(outFile);
			//br = new BufferedWriter(new OutputStreamWriter(hdfs.create(outFile,true)));
		}
		catch(Exception e)
		{
			update_import_state(4, process_id, e.toString());
			System.out.println(e.toString());
			
		}
	}
	public void update_import_state(int status, int process_id, String log)
	{
		try
		{
			Connection report_conn = null;  
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/flamingo";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
			report_conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			PreparedStatement pstmt = null;
			Calendar calendar = Calendar.getInstance();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
			String sql = "";		
			if(status == 2) //CONTINUE
			{	  
					
				sql = "UPDATE DBWORK_PROCESS SET STATUS = ?, START_TIME = ? WHERE PROCESS_ID = ?";				
				pstmt = report_conn.prepareStatement(sql);  // prepareStatement에서 해당 sql을 미리 컴파일한다.
				pstmt.setInt(1,  status);	//PROCESS ID			
				pstmt.setString(2,  dateFormat.format(calendar.getTime()));	//START TIME				
				pstmt.setLong(3,	process_id); //WORK_ID
				pstmt.executeUpdate();   // 쿼리를 실행한다. 				
				if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			}
			else if(status == 3) //COMPLETE
			{		  		
				sql = "UPDATE DBWORK_PROCESS SET STATUS = ?, END_TIME = ? WHERE PROCESS_ID = ?";				
				pstmt = report_conn.prepareStatement(sql); // prepareStatement에서 해당 sql을 미리 컴파일한다.
				pstmt.setInt(1,  status);	//PROCESS ID			
				pstmt.setString(2,  dateFormat.format(calendar.getTime()));	//END TIME
				pstmt.setLong(3,	process_id); 		//WORK_ID		
				pstmt.executeUpdate();                                        // 쿼리를 실행한다. 				
				if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			}
			else if(status == 4)//FAILD
			{		  			
				sql = "UPDATE DBWORK_PROCESS SET STATUS = ? , LOG = ? WHERE PROCESS_ID = ?";				
				pstmt = report_conn.prepareStatement(sql);                          					// prepareStatement에서 해당 sql을 미리 컴파일한다.
				pstmt.setInt(1,  status);	//PROCESS ID
				pstmt.setString(2,	log); 		//WORK_ID
				pstmt.setLong(3,	process_id); 		//WORK_ID
				pstmt.executeUpdate();                                        // 쿼리를 실행한다. 				
				if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			}
			else if(status == 5) //KILL
			{		  			
				sql = "UPDATE DBWORK_PROCESS SET STATUS = ? , LOG = ? WHERE PROCESS_ID = ?";				
				pstmt = report_conn.prepareStatement(sql);                          					// prepareStatement에서 해당 sql을 미리 컴파일한다.
				pstmt.setInt(1,  status);	//PROCESS ID
				pstmt.setString(2,	log); 		//WORK_ID
				pstmt.setLong(3,	process_id); 		//WORK_ID
				pstmt.executeUpdate();                                        // 쿼리를 실행한다. 				
				if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			}
			pstmt.close();
			report_conn.close();
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
			//update_errorlog(e.toString());
		}
	}
	private void update_process_rate(int currate, int totalcount, int process_id)
	{
		try
		{
			String sql = "";
			PreparedStatement pstmt = null;
			sql = "UPDATE DBWORK_PROCESS SET PROGRESS = ?, TOTALCOUNT =? WHERE PROCESS_ID = ?";
			pstmt = conn.prepareStatement(sql);                          					// prepareStatement에서 해당 sql을 미리 컴파일한다.
			pstmt.setInt(1,  currate);	//PROCESS ID
			pstmt.setInt(2,  totalcount);	//PROCESS ID
			pstmt.setInt(3,	process_id); 		//WORK_ID
			pstmt.executeUpdate();                                        // 쿼리를 실행한다. 
			
			if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			
		}
		catch(Exception e)
		{
			System.out.println("update rate :" + e.toString());
			update_import_state(4, process_id, e.toString());
		}
	}
	
	private int importDb()
	{
		 if(current_thread_stop == true)
		 {
			 update_import_state(4, process_id, "The path is exists");
			 return 1;
		 }
		 
		try
		{
			String url = "";
			Connection conn_remote = null; 
			String id = REMOTE_ID;
			String pw = REMOTE_PASSWORD;
			
			if(this.DBTYPE.equals("MySQL"))
			{
				url = "jdbc:mysql://" + REMOTE_DB_ADDRESS +":" + REMOTE_DB_PORT;	
				Class.forName("com.mysql.jdbc.Driver");                       
				conn_remote=DriverManager.getConnection(url,id,pw);   
				
			}
			else if(this.DBTYPE.equals("MSSQL"))
			{
				Class.forName("net.sourceforge.jtds.jdbc.Driver");	
				url = "jdbc:jtds:sqlserver://" + REMOTE_DB_ADDRESS  +":" + REMOTE_DB_PORT;
				conn_remote =	DriverManager.getConnection(url , id , pw);
			}
			
			System.out.println("Import working");
			
			ResultSet rs_remote = null;
			PreparedStatement pstmt_remote = null;
			
		
			//페이징을 위한 레코드 수 획득 구간.
			/*
			String page_sql = "SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_ROWS ";
			page_sql +="FROM information_schema.tables where ";
			page_sql += " TABLE_SCHEMA = '"+ DB_NAME + "' AND TABLE_NAME = '" + TABLE_NAME +"'";
			rs_remote.getInt("TABLE_ROWS");
			*/			
			String page_sql = remote_sql;
			int fromidx  = page_sql.indexOf("from");
	    	String fields = page_sql.substring(6, fromidx);
	    	
	    	String sql2 = page_sql.replace(fields,  " count(*) ");
	    	int numofrow = 0;	
			pstmt_remote = conn_remote.prepareStatement(sql2);
			//System.out.println("Ready to get record count");
			rs_remote  = pstmt_remote.executeQuery();
			if(rs_remote.next())
			{
				//int rowCount = rs_remote.last()? rs_remote.getRow():0;
				//rowCount = rowCount -1;
				//numofrow = rowCount;
				numofrow = rs_remote.getInt(1);
			}		
			
			pstmt_remote.close();
			rs_remote.close();
			conn_remote.close();
			
			
			//실제 조회 쿼리 구간(페이징 사용)
			Connection conn_import = null;
			PreparedStatement pstmt_import = null;
			ResultSet rs_import = null;
			
			//Class.forName("com.mysql.jdbc.Driver");                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
			//conn_import=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			
			if(this.DBTYPE.equals("MySQL"))
			{
				url = "jdbc:mysql://" + REMOTE_DB_ADDRESS +":" + REMOTE_DB_PORT;	
				Class.forName("com.mysql.jdbc.Driver");                       
				conn_import=DriverManager.getConnection(url,id,pw);   
				
			}
			else if(this.DBTYPE.equals("MSSQL"))
			{
				Class.forName("net.sourceforge.jtds.jdbc.Driver");	
				url = "jdbc:jtds:sqlserver://" + REMOTE_DB_ADDRESS  +":" + REMOTE_DB_PORT;
				conn_import =	DriverManager.getConnection(url , id , pw);
			}
			
			String full_string = "";
			String sql = remote_sql;
			pstmt_import = conn_import.prepareStatement(sql);
			rs_import  = pstmt_import.executeQuery();			
			int cur_index = 0;
			ResultSetMetaData rsmd_import= rs_import.getMetaData();
			int columnsNumber = rsmd_import.getColumnCount();
			
			System.out.println("IMPORT SQL " + sql );			
			while(rs_import.next())
			{	
				String buffer_record = "";				
				for(int ci = 1; ci <= columnsNumber; ci++)
				{
					String type = rsmd_import.getColumnTypeName(ci);
					if(columnsNumber >= 2)
					{
						if(type.indexOf("INT") >= 0)
						{
							buffer_record += rs_import.getInt(ci) + this.DELIMITER;
						}
						else
						{	
							buffer_record += rs_import.getString(ci) +this.DELIMITER;
						}
					}
					else
					{
						buffer_record += rs_import.getString(ci);
					}
				}
				cur_index++;
				System.out.println("IMPORT CI " + cur_index + " TOTAL " + numofrow + " PID " + process_id);
				update_process_rate(cur_index, numofrow,	process_id );
				
				//2개 이상일 경우 마지막에 구분자가 추가되는 것을 삭제해야 함.
				if(columnsNumber >= 2)
				{
					buffer_record = buffer_record.substring(0, buffer_record.length()-this.DELIMITER.length());
				}
				
				System.out.println("-"+buffer_record+"-");
				br.write(buffer_record+"\n");
				br.flush();
				
				full_string += buffer_record+"\n";
				
				sql = "SELECT STATUS FROM FLAMINGO.DBWORK_PROCESS ";			
				sql += "WHERE PROCESS_ID = ?";
				PreparedStatement pstmt_stopped = conn.prepareStatement(sql);		
				pstmt_stopped.setLong(1, process_id);						
				ResultSet rs_stopped  = pstmt_stopped.executeQuery();						
				
				if(rs_stopped.next())
				{
					if(rs_stopped.getInt("STATUS") == 5)
					{
						rs_stopped.close();
						pstmt_stopped.close();
						
						br.close();
						
						hdfs.delete(new Path(hdfs_path), true);//stopped시 작업 내용 저장 내용 삭제함.
						hdfs.close();							
						pstmt_remote.close();
						update_import_state(5, process_id ,"stoppeded");
						return 0;
					}
				}
			}//End of RecordSet import
			System.out.println("Import Finished");			
			rs_import.close();
			pstmt_import.close();
			
			/*
			for(;cur_index < numofrow ;)
			{
				String sql = remote_sql +  " LIMIT " + cur_index + "," + (cur_index+1);
				pstmt_import = conn_import.prepareStatement(sql );
				rs_import  = pstmt_import.executeQuery();			
				
				ResultSetMetaData rsmd_import= rs_import.getMetaData();
				int columnsNumber = rsmd_import.getColumnCount();
				
				System.out.println("IMPORT SQL " + sql );			
				while(rs_import.next())
				{	
					String buffer_record = "";				
					for(int ci = 1; ci <= columnsNumber; ci++)
					{
						String type = rsmd_import.getColumnTypeName(ci);
						if(columnsNumber >= 2)
						{
							if(type.indexOf("INT") >= 0)
							{
								buffer_record += rs_import.getInt(ci) + this.DELIMITER;
							}
							else
							{	
								buffer_record += rs_import.getString(ci) +this.DELIMITER;
							}
						}
						else
						{
							buffer_record += rs_import.getString(ci);
						}
					}
					cur_index++;
					System.out.println("IMPORT CI " + cur_index + " TOTAL " + numofrow + " PID " + process_id);
					update_process_rate(cur_index, numofrow,	process_id );
					
					//2개 이상일 경우 마지막에 구분자가 추가되는 것을 삭제해야 함.
					if(columnsNumber >= 2)
					{
						buffer_record = buffer_record.substring(0, buffer_record.length()-this.DELIMITER.length());
					}
					
					System.out.println("-"+buffer_record+"-");
					br.write(buffer_record+"\n");
					br.flush();
					
					full_string += buffer_record+"\n";
					
					sql = "SELECT STATUS FROM FLAMINGO.DBWORK_PROCESS ";			
					sql += "WHERE PROCESS_ID = ?";
					PreparedStatement pstmt_stopped = conn.prepareStatement(sql);		
					pstmt_stopped.setLong(1, process_id);						
					ResultSet rs_stopped  = pstmt_stopped.executeQuery();						
					
					if(rs_stopped.next())
					{
						if(rs_stopped.getInt("STATUS") == 5)
						{
							rs_stopped.close();
							pstmt_stopped.close();
							
							br.close();
							
							hdfs.delete(new Path(hdfs_path), true);//stopped시 작업 내용 저장 내용 삭제함.
							hdfs.close();							
							pstmt_remote.close();
							update_import_state(5, process_id ,"stoppeded");
							return 0;
						}
					}
				}//End of RecordSet import
				System.out.println("Import Finished");			
				rs_import.close();
				pstmt_import.close();
			}//end of paging search query
			*/
			
			conn_import.close();
			System.out.println(full_string);
			br.close();
			hdfs.close();
			
			update_import_state(3, process_id ,"");
			return 0;
		}
		catch(Exception e)
		{
			System.out.println("import process:" + e.toString());
			update_import_state(4, process_id , e.toString());//error status
			return 1;
		}
	}
	@Override
	public void run()
	{
		try
		{
			importDb();
			conn.close();
		}
		catch(Exception e)
		{
			update_import_state(4, process_id, e.toString());
		}
	}
	
}
