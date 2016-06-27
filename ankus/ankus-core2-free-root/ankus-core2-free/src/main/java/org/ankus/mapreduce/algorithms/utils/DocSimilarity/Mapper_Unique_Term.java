package org.ankus.mapreduce.algorithms.utils.DocSimilarity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.ankus.util.Constants;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Mapper.Context;
import org.apache.hadoop.mapreduce.lib.input.FileSplit;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;

public class Mapper_Unique_Term extends Mapper<Object, Text, Text, IntWritable>{
	String m_delimiter;
    String m_ruleCondition;
    int m_indexArr[];
    int m_numericIndexArr[];
    int m_exceptionIndexArr[];
    int m_classIndex;
    List<String> stop_word = new ArrayList<String>();
    
    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
    	
        Configuration conf = context.getConfiguration();
        m_delimiter = conf.get(ArgumentsConstants.DELIMITER, "\t");
        FileSplit fileSplit = (FileSplit)context.getInputSplit();
        
        //String filename = fileSplit.getPath().getName();
        //System.out.println(filename);
        stop_word.add("a");
		stop_word.add("about");
		stop_word.add("above");
		stop_word.add("after");
		stop_word.add("again");
		stop_word.add("against");
		stop_word.add("all");
		stop_word.add("am");
		stop_word.add("an");
		stop_word.add("and");
		stop_word.add("any");
		stop_word.add("are");
		stop_word.add("aren't");
		stop_word.add("as");
		stop_word.add("at");
		stop_word.add("be");
		stop_word.add("because");
		stop_word.add("been");
		stop_word.add("before");
		stop_word.add("being");
		stop_word.add("below");
		stop_word.add("between");
		stop_word.add("both");
		stop_word.add("but");
		stop_word.add("by");
		stop_word.add("can't");
		stop_word.add("cannot");
		stop_word.add("could");
		stop_word.add("couldn't");
		stop_word.add("did");
		stop_word.add("didn't");
		stop_word.add("do");
		stop_word.add("does");
		stop_word.add("doesn't");
		stop_word.add("doing");
		stop_word.add("don't");
		stop_word.add("down");
		stop_word.add("during");
		stop_word.add("each");
		stop_word.add("few");
		stop_word.add("for");
		stop_word.add("from");
		stop_word.add("further");
		stop_word.add("had");
		stop_word.add("hadn't");
		stop_word.add("has");
		stop_word.add("hasn't");
		stop_word.add("have");
		stop_word.add("haven't");
		stop_word.add("having");
		stop_word.add("he");
		stop_word.add("he'd");
		stop_word.add("he'll");
		stop_word.add("he's");
		stop_word.add("her");
		stop_word.add("here");
		stop_word.add("here's");
		stop_word.add("hers");
		stop_word.add("herself");
		stop_word.add("him");
		stop_word.add("himself");
		stop_word.add("his");
		stop_word.add("how");
		stop_word.add("how's");
		stop_word.add("i");
		stop_word.add("i'd");
		stop_word.add("i'll");
		stop_word.add("i'm");
		stop_word.add("i've");
		stop_word.add("if");
		stop_word.add("in");
		stop_word.add("into");
		stop_word.add("is");
		stop_word.add("isn't");
		stop_word.add("it");
		stop_word.add("it's");
		stop_word.add("its");
		stop_word.add("itself");
		stop_word.add("let's");
		stop_word.add("me");
		stop_word.add("more");
		stop_word.add("most");
		stop_word.add("mustn't");
		stop_word.add("my");
		stop_word.add("myself");
		stop_word.add("no");
		stop_word.add("nor");
		stop_word.add("not");
		stop_word.add("of");
		stop_word.add("off");
		stop_word.add("on");
		stop_word.add("once");
		stop_word.add("only");
		stop_word.add("or");
		stop_word.add("other");
		stop_word.add("ought");
		stop_word.add("our");
		stop_word.add("ours");
		stop_word.add("ourselves");
		stop_word.add("out");
		stop_word.add("over");
		stop_word.add("own");
		stop_word.add("same");
		stop_word.add("shan't");
		stop_word.add("she");
		stop_word.add("she'd");
		stop_word.add("she'll");
		stop_word.add("she's");
		stop_word.add("should");
		stop_word.add("shouldn't");
		stop_word.add("so");
		stop_word.add("some");
		stop_word.add("such");
		stop_word.add("than");
		stop_word.add("that");
		stop_word.add("that's");
		stop_word.add("the");
		stop_word.add("their");
		stop_word.add("theirs");
		stop_word.add("them");
		stop_word.add("themselves");
		stop_word.add("then");
		stop_word.add("there");
		stop_word.add("there's");
		stop_word.add("these");
		stop_word.add("they");
		stop_word.add("they'd");
		stop_word.add("they'll");
		stop_word.add("they're");
		stop_word.add("they've");
		stop_word.add("this");
		stop_word.add("those");
		stop_word.add("through");
		stop_word.add("to");
		stop_word.add("too");
		stop_word.add("under");
		stop_word.add("until");
		stop_word.add("up");
		stop_word.add("very");
		stop_word.add("was");
		stop_word.add("wasn't");
		stop_word.add("we");
		stop_word.add("we'd");
		stop_word.add("we'll");
		stop_word.add("we're");
		stop_word.add("we've");
		stop_word.add("were");
		stop_word.add("weren't");
		stop_word.add("what");
		stop_word.add("what's");
		stop_word.add("when");
		stop_word.add("when's");
		stop_word.add("where");
		stop_word.add("where's");
		stop_word.add("which");
		stop_word.add("while");
		stop_word.add("who");
		stop_word.add("who's");
		stop_word.add("whom");
		stop_word.add("why");
		stop_word.add("why's");
		stop_word.add("with");
		stop_word.add("won't");
		stop_word.add("would");
		stop_word.add("wouldn't");
		stop_word.add("you");
		stop_word.add("you'd");
		stop_word.add("you'll");
		stop_word.add("you're");
		stop_word.add("you've");
		stop_word.add("your");
		stop_word.add("yours");
		stop_word.add("yourself");
		stop_word.add("yourselves");
    }
    
	@Override
	protected void map(Object key, Text value, Context context)// throws IOException, InterruptedException
	{
		String[] tokenizedTerms = value.toString().replaceAll("[\\W&&[^\\s]]", "").split("\\W+");
		
		try
		{
			for (String term : tokenizedTerms) 
            {
				if(stop_word.contains(term.toLowerCase()) != true)//Skeep stop word
				context.write(new Text(term) , new IntWritable(1));
            }
			
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
		}
	}
	

}
