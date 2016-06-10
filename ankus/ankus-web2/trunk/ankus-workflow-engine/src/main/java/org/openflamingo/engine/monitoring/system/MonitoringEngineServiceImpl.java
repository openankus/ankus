package org.openflamingo.engine.monitoring.system;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.lang.reflect.Method;
import java.net.URI;
import java.util.ArrayList;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.hdfs.DistributedFileSystem;
import org.apache.hadoop.hdfs.protocol.DatanodeInfo;
import org.openflamingo.model.monitoring.DiskInfo;
import org.openflamingo.model.monitoring.HadoopInfo;
import org.openflamingo.model.monitoring.HealthInfo;
import org.openflamingo.model.monitoring.NodeInfo;
import org.openflamingo.provider.engine.MonitoringEngineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sshtools.j2ssh.SshClient;
import com.sshtools.j2ssh.authentication.AuthenticationProtocolState;
import com.sshtools.j2ssh.authentication.PasswordAuthenticationClient;
import com.sshtools.j2ssh.connection.ChannelInputStream;
import com.sshtools.j2ssh.connection.ChannelOutputStream;
import com.sshtools.j2ssh.session.SessionChannelClient;
import com.sshtools.j2ssh.transport.IgnoreHostKeyVerification;

@Service
public class MonitoringEngineServiceImpl implements MonitoringEngineService {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(MonitoringEngineServiceImpl.class);

	public String exec_shell(String cmd)
	{
		try {
			
			StringBuffer buff = new StringBuffer();
			String[] cmds = cmd.split(";");

			for(int i=0; cmds!=null && i<cmds.length; i++)
			{
				Process p = Runtime.getRuntime().exec(cmds[i]);
				p.waitFor();
				InputStream is = p.getInputStream();
				OutputStream os = p.getOutputStream();
				byte[] b = new byte[4096];
				while(true)
				{
				   int cnt = is.read(b);
				   if(cnt<=0) break;
				   buff.append(new String(b, 0, cnt));
				}
			}
			return buff.toString();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
	
	@Override
	public HealthInfo getStatus(String hadoopurl)
	{
		HealthInfo stat = new HealthInfo();
		
		if(systeminfo==null) systeminfo = ManagementFactory.getOperatingSystemMXBean();
		
		String hinfo = exec_shell("hadoop version | grep Hadoop;hadoop dfsadmin -report -dead -live | grep nodes;echo corecnt;grep -c cores /proc/cpuinfo;iostat;df -k;free\n");
		String version = getSubstring(hinfo, "Hadoop ", "\n").trim();
//		System.out.printf("hinfo=[%s]\n", hinfo);
//		System.out.printf("version=[%s]\n", version);

		String livecnt = getSubstring(hinfo, "Live datanodes (", ")");
		String deadcnt = getSubstring(hinfo, "Dead datanodes (", ")");
		
		// grep -c processor /proc/cpuinfo
		stat.corecnt = Runtime.getRuntime().availableProcessors();
		stat.cpuload = (Double)getsystemvalue("getSystemCpuLoad");
		stat.totalmemory = (Long)getsystemvalue("getTotalPhysicalMemorySize");
		stat.freememory = (Long)getsystemvalue("getFreePhysicalMemorySize");
		
		File[] roots = File.listRoots();
		stat.disks = new ArrayList<DiskInfo>();
		for (File root : roots)
		{
			DiskInfo d = new DiskInfo();
			d.path = root.getAbsolutePath();
			d.size = root.getTotalSpace();
			d.free = root.getFreeSpace();
			stat.disks.add(d);
		}
		
		stat.hadoopclusterinfo = new HadoopInfo();
		try {
			  Configuration conf = new Configuration();
//			  conf.set("fs.default.name", hadoopurl);
//			  conf.set("fs.defaultFS", hadoopurl);
			  conf.set("fs.hdfs.impl", org.apache.hadoop.hdfs.DistributedFileSystem.class.getName());
			  conf.set("fs.file.impl", org.apache.hadoop.fs.LocalFileSystem.class.getName());			  
			  FileSystem dfs = FileSystem.get(new URI(hadoopurl), conf);
		
			  DistributedFileSystem hdfs = (DistributedFileSystem)dfs; 
			  stat.hadoopclusterinfo.blocksize = hdfs.getDefaultBlockSize();
			  stat.hadoopclusterinfo.version = version;
			  stat.hadoopclusterinfo.livenode = Integer.parseInt(livecnt);
			  stat.hadoopclusterinfo.deadnode = Integer.parseInt(deadcnt);
			  stat.hadoopclusterinfo.replication = hdfs.getDefaultReplication();
			  stat.hadoopclusterinfo.blocksize = hdfs.getDefaultBlockSize();
			  stat.hadoopclusterinfo.capacity = hdfs.getStatus().getCapacity();
			  stat.hadoopclusterinfo.used = hdfs.getStatus().getUsed();
			  
//			  String info = execcmd(session, "grep -c cores /proc/cpuinfo;iostat;df -k;free\n", " ~]$ ");
			  String info = hinfo;
//			  System.out.printf("info=[%s]\n", info);

			  String corecnt = getSubstring(info, "corecnt\n", "\n").trim();
//			  System.out.printf("corecnt=[%s]\n", corecnt);

			  String cpus = getSubstring(info, "%idle\n", "\n").trim();
//			  System.out.printf("cpus=[%s]\n", cpus);
			  String[] c = cpus.split("\\s+");
//			  System.out.printf("cpus=[%s]\n", c[5]);

			  String mems = getSubstring(info, "Mem:", "\n").trim();
//			  System.out.printf("mems=[%s]\n", mems);
			  String[] m = mems.split("\\s+");
//			  System.out.printf("mems=[%s]\n", m[0]);
			  
			  stat.hadoopclusterinfo.corecnt = Integer.parseInt(corecnt);
			  stat.hadoopclusterinfo.cpuload = (100.0-Double.parseDouble(c[5]))/100.0;
			  stat.hadoopclusterinfo.totalmemory = Long.parseLong(m[0])*1024;
			  stat.hadoopclusterinfo.freememory = Long.parseLong(m[2])*1024;
			  
			  stat.hadoopclusterinfo.disks = new ArrayList<DiskInfo>();

			  String df = getSubstring(info, "Mounted on\n", "total").trim();
//			  System.out.printf("df=[%s]\n", df);
			  
			  for (String mnt:df.split("\n"))
			  {
				  String[] t = mnt.split("\\s+");
				  if(t.length<6) continue;
				  if(t[0].equals("tmpfs")) continue;
				  DiskInfo d = new DiskInfo();
				  d.path = t[5];
				  d.size = Long.parseLong(t[1])*1024;
				  d.free = Long.parseLong(t[3])*1024;
//				  System.out.printf("df=[%s]\n", d.path);
				  stat.hadoopclusterinfo.disks.add(d);
			  }
			  
			  stat.hadoopclusterinfo.nodes = new ArrayList<NodeInfo>();
			  for(DatanodeInfo dn:hdfs.getDataNodeStats())
			  {
				  NodeInfo n = new NodeInfo();
				  n.name = dn.getHostName();
				  n.ip = dn.getIpAddr();
				  n.capacity = dn.getCapacity();
				  n.used = dn.getDfsUsed();
				  
				  //ssh 192.168.10.41 grep -c cores /proc/cpuinfo;iostat;df -k;free\n
				  String ninfo = exec_shell("ssh "+n.ip+" grep -c cores /proc/cpuinfo;iostat;df -k;free\n");
//				  System.out.printf("ninfo_%s[%s]\n", n.ip, ninfo);
				  
				  String ncpus = getSubstring(ninfo, "%idle\n", "\n").trim();
//				  System.out.printf("cpus=[%s]\n", ncpus);
				  String[] nc = ncpus.split("\\s+");
//				  System.out.printf("%s_cpus=[%s]\n", n.ip, nc[5]);

				  String nmems = getSubstring(ninfo, "Mem:", "\n").trim();
//				  System.out.printf("mems=[%s]\n", nmems);
				  String[] nm = nmems.split("\\s+");
//				  System.out.printf("mems=[%s]\n", nm[0]);
				  
				  String ncorecnt = getSubstring(ninfo, "", "\n").trim(); // 처음부터

				  /*
				  if(ncorecnt.isEmpty()) {
					  System.out.printf("ninfo=[%s]\n", ninfo);
					  return null;
				  }
				  */
				  
				  n.corecnt = Integer.parseInt(ncorecnt);
				  n.cpuload = (100.0-Double.parseDouble(nc[5]))/100.0;
				  n.totalmemory = Long.parseLong(nm[0])*1024;
				  n.freememory = Long.parseLong(nm[2])*1024;
				  
				  n.disks = new ArrayList<DiskInfo>();

				  String ndf = getSubstring(ninfo, "Mounted on\n", "total").trim();
//				  System.out.printf("df=[%s]\n", ndf);
				  
				  for (String mnt:ndf.split("\n"))
				  {
					  String[] t = mnt.split("\\s+");
					  if(t.length<6) continue;
					  if(t[0].equals("tmpfs")) continue;
					  DiskInfo d = new DiskInfo();
					  d.path = t[5];
					  d.size = Long.parseLong(t[1])*1024;
					  d.free = Long.parseLong(t[3])*1024;
//					  System.out.printf("df=[%s]\n", d.path);
					  n.disks.add(d);
				  }
//				  System.out.printf("name=[%s]\n", n.name);
				  stat.hadoopclusterinfo.nodes.add(n);
			  }
			  hdfs.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return stat;
	}		
	
	public HealthInfo getStatus_old(String hadoopurl, String hadoop_account, String hadoop_pwd) {
		HealthInfo stat = new HealthInfo();
		
		if(systeminfo==null) systeminfo = ManagementFactory.getOperatingSystemMXBean();
		
		String ip = getSubstring(hadoopurl, "hdfs://", ":");

//		System.out.printf("ip=[%s]\n", ip);
		
		SessionChannelClient session = connect_ssh(ip, 22, hadoop_account, hadoop_pwd);
		
		if(session==null) return null;
		
		String hinfo = execcmd(session, "hadoop version | grep Hadoop;hadoop dfsadmin -report -dead -live | grep nodes;echo corecnt;grep -c cores /proc/cpuinfo;iostat;df -k;free\n", " ~]$ ");
		String version = getSubstring(hinfo, "Hadoop ", "\r\n").trim();
//		System.out.printf("hinfo=[%s]\n", hinfo);
//		System.out.printf("version=[%s]\n", version);

		String livecnt = getSubstring(hinfo, "Live datanodes (", ")");
		String deadcnt = getSubstring(hinfo, "Dead datanodes (", ")");
		
		// grep -c processor /proc/cpuinfo
		
		/*
		stat.corecnt = Runtime.getRuntime().availableProcessors();
		stat.cpuload = (Double)getsystemvalue("getSystemCpuLoad");
		stat.totalmemory = (Long)getsystemvalue("getTotalPhysicalMemorySize");
		stat.freememory = (Long)getsystemvalue("getFreePhysicalMemorySize");
		
		File[] roots = File.listRoots();
		stat.disks = new ArrayList<DiskInfo>();
		for (File root : roots)
		{
			DiskInfo d = new DiskInfo();
			d.path = root.getAbsolutePath();
			d.size = root.getTotalSpace();
			d.free = root.getFreeSpace();
			stat.disks.add(d);
		}
		*/
		// web server setting...
		
		stat.hadoopclusterinfo = new HadoopInfo();
		try {
			  Configuration conf = new Configuration();
			  FileSystem dfs = FileSystem.get(new URI(hadoopurl), conf, hadoop_account);
		
			  DistributedFileSystem hdfs = (DistributedFileSystem)dfs; 
			  stat.hadoopclusterinfo.blocksize = hdfs.getDefaultBlockSize();
			  stat.hadoopclusterinfo.version = version;
			  stat.hadoopclusterinfo.livenode = parseint(livecnt);
			  stat.hadoopclusterinfo.deadnode = parseint(deadcnt);
			  stat.hadoopclusterinfo.replication = hdfs.getDefaultReplication();
			  stat.hadoopclusterinfo.blocksize = hdfs.getDefaultBlockSize();
			  stat.hadoopclusterinfo.capacity = hdfs.getStatus().getCapacity();
			  stat.hadoopclusterinfo.used = hdfs.getStatus().getUsed();
			  
//			  String info = execcmd(session, "grep -c cores /proc/cpuinfo;iostat;df -k;free\n", " ~]$ ");
			  String info = hinfo;
//			  System.out.printf("info=[%s]\n", info);

			  String corecnt = getSubstring(info, "corecnt\r\n", "\n").trim();
//			  System.out.printf("corecnt=[%s]\n", corecnt);

			  String cpus = getSubstring(info, "%idle\r\n", "\n").trim();
//			  System.out.printf("cpus=[%s]\n", cpus);
			  String[] c = cpus.split("\\s+");
//			  System.out.printf("cpus=[%s]\n", c[5]);

			  String mems = getSubstring(info, "Mem:", "\n").trim();
//			  System.out.printf("mems=[%s]\n", mems);
			  String[] m = mems.split("\\s+");
//			  System.out.printf("mems=[%s]\n", m[0]);
			  
			  stat.hadoopclusterinfo.corecnt = parseint(corecnt);
			  stat.hadoopclusterinfo.cpuload = (100.0-parsedouble(c[5]))/100.0;
			  stat.hadoopclusterinfo.totalmemory = parselong(m[0])*1024;
			  stat.hadoopclusterinfo.freememory = parselong(m[2])*1024;
			  
			  stat.hadoopclusterinfo.disks = new ArrayList<DiskInfo>();

			  String df = getSubstring(info, "Mounted on\r\n", "total").trim();
//			  System.out.printf("df=[%s]\n", df);
			  
			  for (String mnt:df.split("\r\n"))
			  {
				  String[] t = mnt.split("\\s+");
				  if(t.length<6) continue;
				  if(t[0].equals("tmpfs")) continue;
				  DiskInfo d = new DiskInfo();
				  d.path = t[5];
				  d.size = parselong(t[1])*1024;
				  d.free = parselong(t[3])*1024;
//				  System.out.printf("df=[%s]\n", d.path);
				  stat.hadoopclusterinfo.disks.add(d);
			  }
			  
			  stat.hadoopclusterinfo.nodes = new ArrayList<NodeInfo>();
			  for(DatanodeInfo dn:hdfs.getDataNodeStats())
			  {
				  NodeInfo n = new NodeInfo();
				  n.name = dn.getHostName();
				  n.ip = dn.getIpAddr();
				  n.capacity = dn.getCapacity();
				  n.used = dn.getDfsUsed();
				  
				  //ssh 192.168.10.41 grep -c cores /proc/cpuinfo;iostat;df -k;free\n
				  String ninfo = execcmd(session, "ssh "+n.ip+" grep -c cores /proc/cpuinfo;iostat;df -k;free\n", " ~]$ ");
//				  System.out.printf("ninfo=[%s]\n", info);
				  
				  String ncpus = getSubstring(ninfo, "%idle\r\n", "\n").trim();
//				  System.out.printf("cpus=[%s]\n", ncpus);
				  String[] nc = ncpus.split("\\s+");
//				  System.out.printf("cpus=[%s]\n", nc[5]);

				  String nmems = getSubstring(info, "Mem:", "\n").trim();
//				  System.out.printf("mems=[%s]\n", nmems);
				  String[] nm = nmems.split("\\s+");
//				  System.out.printf("mems=[%s]\n", nm[0]);
				  
				  String ncorecnt = getSubstring(ninfo, "free\r\n", "\n").trim();
				  
				  n.corecnt = parseint(ncorecnt);
				  n.cpuload = (100.0-parsedouble(nc[5]))/100.0;
				  n.totalmemory = parselong(nm[0])*1024;
				  n.freememory = parselong(nm[2])*1024;
				  
				  n.disks = new ArrayList<DiskInfo>();

				  String ndf = getSubstring(info, "Mounted on\r\n", "total").trim();
//				  System.out.printf("df=[%s]\n", ndf);
				  
				  for (String mnt:ndf.split("\r\n"))
				  {
					  String[] t = mnt.split("\\s+");
					  if(t.length<6) continue;
					  if(t[0].equals("tmpfs")) continue;
					  DiskInfo d = new DiskInfo();
					  d.path = t[5];
					  d.size = parselong(t[1])*1024;
					  d.free = parselong(t[3])*1024;
//					  System.out.printf("df=[%s]\n", d.path);
					  n.disks.add(d);
				  }
//				  System.out.printf("name=[%s]\n", n.name);
				  stat.hadoopclusterinfo.nodes.add(n);
			  }
			  
			  session.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return stat;
	}

	private SessionChannelClient connect_ssh(String host, int port, String uid, String pwd)
	{
		PasswordAuthenticationClient auth = null;

		try {
			  
		   SshClient client = new SshClient();
		   client.setSocketTimeout(70000);
		   client.connect(host, port, new IgnoreHostKeyVerification());
		   auth = new PasswordAuthenticationClient();
		   auth.setUsername(uid);
		   auth.setPassword(pwd);
		   int result = client.authenticate(auth);
		   
		   if (result != AuthenticationProtocolState.COMPLETE) {
			   
			   	System.out.print("login.fail===\n");
		    	return null;
		   }
		   // SSH 터미널 커맨드 실행용
		   SessionChannelClient session = client.openSessionChannel();
		   session.requestPseudoTerminal("vt100", 80, 25, 0, 0 , "");
		   session.startShell();
		   return session;
		}
		catch (Exception e) {
		   	System.out.println("Exception:"+e.getMessage());
		}
    	return null;
	}
	
	private String execcmd(SessionChannelClient session, String cmd, String prompt)
	{
		   ChannelInputStream is = session.getInputStream();
		   ChannelOutputStream os = session.getOutputStream();
		   StringBuffer buff = new StringBuffer();
		   byte[] b = new byte[4096];

		   try {
			   if(!cmd.isEmpty()) os.write(cmd.getBytes());
			   while(true)
			   {
				   int cnt = is.read(b);
				   buff.append(new String(b, 0, cnt));
				   
				   if(buff.toString().endsWith(prompt)) break;
			   }
		   } catch (Exception e) {
			   System.out.printf("execcmd(%s):%s\n", cmd, e.getMessage());
			   return buff.toString();
		   }
		return buff.toString();
	}
	
	private String getSubstring(String v, String fromstr, String endstr)
	{
		int spos, epos;
		if(fromstr.equals(""))
		{
			spos = v.indexOf(endstr);
			if(spos<0) return "";
			else return v.substring(0, spos);
		}
		spos = v.indexOf(fromstr);
		if (spos<0) return "";
		v = v.substring(spos+fromstr.length());
		if(endstr.equals("")) return v;
		epos = v.indexOf(endstr);
		if (epos<0) return v;
		else return v.substring(0, epos);
	}

	private OperatingSystemMXBean systeminfo = null;
	
	private Object getsystemvalue(String func)
	{
		try {
			if(systeminfo==null) return null;
			Method method = systeminfo.getClass().getDeclaredMethod(func);
			if(method==null) return null;
			method.setAccessible(true);
			return method.invoke(systeminfo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	int parseint(String v)
	{
		int iv = 0;
		if (v==null || v.isEmpty()) return 0;
		
		try {
			iv = Integer.parseInt(v);
		} catch(Exception e){}
		
		return iv;
		
	}

	long parselong(String v)
	{
		long iv = 0;
		if (v==null || v.isEmpty()) return 0;
		
		try {
			iv = Long.parseLong(v);
		} catch(Exception e){}
		
		return iv;
	}

	double parsedouble(String v)
	{
		double iv = 0;
		if (v==null || v.isEmpty()) return 0;
		
		try {
			iv = Double.parseDouble(v);
		} catch(Exception e){}
		
		return iv;
	}
	
}
