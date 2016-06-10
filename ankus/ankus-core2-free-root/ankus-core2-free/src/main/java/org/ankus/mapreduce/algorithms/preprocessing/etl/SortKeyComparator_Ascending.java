package org.ankus.mapreduce.algorithms.preprocessing.etl;

//import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.io.WritableComparator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
public class SortKeyComparator_Ascending extends WritableComparator 
{
	private Logger logger = LoggerFactory.getLogger(SortKeyComparator_Ascending.class);
    protected SortKeyComparator_Ascending() 
    {
        //super(LongWritable.class, true);
    	//super(DoubleWritable.class, true);
    	super(Text.class, true);
    }
    
    private boolean isNumber(String source)
    {
    	try
    	{
    		double x1 = Double.parseDouble(source) ;
    		return true;
    	}
    	catch(Exception e)
    	{
    		return false;
    	}
    }
 
    /**
     * Compares in the descending order of the keys.
     */
    @Override
    public int compare(WritableComparable a, WritableComparable b) 
    {
        //LongWritable o1 = (LongWritable) a;
        //LongWritable o2 = (LongWritable) b;       
        
        Text o1 = new Text(a.toString());
        Text o2 = new Text(b.toString());
        
        
        //오름 차순.
        String string_o1 = o1.toString();
        String string_o2 = o2.toString();
        //수치인 경우.
        
        
        if(isNumber(string_o1) == true && isNumber(string_o2) == true)
        {
        	double dblo1 = Double.parseDouble(string_o1);
        	double dblo2 = Double.parseDouble(string_o2);
        	
        	DoubleWritable dblwo1 = new DoubleWritable(dblo1);
            DoubleWritable dblwo2 =  new DoubleWritable(dblo2);
        	if(dblwo1.get() > dblwo2.get()) 
            {
               
                logger.info(dblwo1.get()+"" + ">" + dblwo2.get()+"");
                return 1;
            }
            else if(dblwo1.get() < dblwo2.get()) 
            {
            	logger.info(dblwo1.get()+"" + "<" + dblwo2.get()+"");
                return -1;
            }
            else 
            {
            	logger.info(dblwo1.get()+"" + "=" + dblwo2.get()+"");
                return 0;
            }
        }
        else
        {
        	
        	if(string_o1.compareTo(string_o2) > 0)
            {
        		logger.info(string_o1+"" + ">" + string_o2+"");
                return 1;
            }
            else if(string_o1.compareTo(string_o2) < 0)
            {
            	logger.info(string_o1+"" + "<" + string_o2+"");
                return -1;
            }
            else 
            {
            	logger.info(string_o1+"" + "=" + string_o2+"");
                return 0;
            }
        }
        
        
    }
     
}