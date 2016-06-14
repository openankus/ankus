/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.ankus.mapreduce.algorithms.preprocessing.etl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

import org.ankus.util.ArgumentsConstants;
import org.ankus.util.CommonMethods;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Scanner;
import java.util.regex.Pattern;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

/*
class Node {
    private String data;
    private Node nextNode;
 
    public Node(String data) {
        this.data = data;
    }
 
    public String getData() {
        return data;
    }
 
    public void setNextNode(Node nextNode) {
        this.nextNode = nextNode;
    }
 
    public Node getNextNode() {
        return nextNode;
    }
}
*/
/*
class LinkedListStack 
{
    private Node top;       // tail
    private Node list;      // head
 
    // 노드 추가
    public void push(Node newNode) {
        // 스택이 비어있을 경우
        if (list == null)
            list = newNode;
        // 스택이 비어있지 않으면
        else {
            // top(꼬리)을 찾아 연결한다.
            Node currentTop = list;
            while (currentTop.getNextNode() != null)
                currentTop = currentTop.getNextNode();
 
            currentTop.setNextNode(newNode);
        }
        top = newNode;
    }
 
    // 노드 제거
    public Node pop() {
        Node popped = top;
 
        // 제거할 노드가 head와 같다면 스택을 비운다.
        if (list == popped) {
            list = null;
            top = null;
        } else {
            // 그렇지 않다면 top을 갱신
            Node currentTop = list;
            while (currentTop.getNextNode() != popped)
                currentTop = currentTop.getNextNode();
 
            top = currentTop;
            top.setNextNode(null);
        }
        return popped;
    }
     
    // 최상위 노드 반환
    public Node getTop() {
        return top;
    }
 
    // 스택 사이즈 반환
    public int getSize() {
        Node currentTop = list;
        int count = 0;
 
        while (currentTop != null) {
            currentTop = currentTop.getNextNode();
            count++;
        } 
        return count;
    }
 
    // 노드가 비어있는지 확인
    public boolean isEmpty() {
        return list == null;
    }
}
*/
/*
class Calculator 
{
    private final char[] NUMBER = { '0', '1'};
    private final char OPERAND = 'O';
    private final char LEFT_PARENTHESIS = '(';
    private final char RIGHT_PARENTHESIS = ')';
       
    private final char AND = '&';
    private final char OR = '|';
    
    private char[] token;
    private int tokenType;
    private LinkedListStack stack;
 
    public Calculator() {
        stack = new LinkedListStack();
    }
 
    // 연산자에 대해 우선순위를 매기는 함수
    public int getPriority(char operator, boolean inStack) {
        int priority = -1;
 
        switch (operator) {
        case LEFT_PARENTHESIS:
            // 왼쪽 괄호의 경우 항상 예외로 스택에 넣어준다.
            // 스택에 들어있는 왼쪽 괄호
            if (inStack)
                priority = 3;
            else
                priority = 0;
            break;
          
        case AND:
        case OR:
            priority = 2;
            break;
        }
 
        return priority;
    }
 
    // 토큰과 우선순위 비교하는 함수
    public boolean isPrior(char operatorInToken, char operatorInStack) {
        return (getPriority(operatorInToken, false) < getPriority(
                operatorInStack, true));
    }
 
    // 해당 토큰이 숫자인지 판별하는 함수
    public boolean isNumber(char token) {
        for (int i = 0; i < NUMBER.length; i++)
            if (token == NUMBER[i])
                return true;
 
        return false;
    }
 
    // 중위표기식에서 토큰을 추출하는 함수(토크나이징)
    public int getNextToken(String infixExpression, char[] chrArray) {
        int i = 0;
        infixExpression += ' ';
 
        // null이 나올때까지 반복
        for (i = 0; infixExpression.charAt(i) != 0; i++) {
            // 문자를 하나씩 추출한다.
            chrArray[i] = infixExpression.charAt(i);
 
            // 피연산자이면 타입을 표시
            if (isNumber(chrArray[i])) {
                tokenType = OPERAND;
                // 만약 피연산자 다음의 문자가 피연산자가 아니라면 중지
                if (!isNumber(infixExpression.charAt(i + 1)))
                    break;
            } else {
                // 연산자이면 대입한다.
                tokenType = infixExpression.charAt(i);
                break;
            }
        }
 
        // 추출된 토큰을 복사한다.
        token = new char[++i];
        for (int j = 0; j < i; j++)
            token[j] = chrArray[j];
 
        return i;
    }
 
    // 중위 -> 후위표기법 변환 함수
    public String getPostfix(String infixExpression) {
        StringBuffer postfixExpression = new StringBuffer();
        int position = 0;
        int length = infixExpression.length();
        char[] chArr = new char[length];
        Node popped;
 
        // 문자열을 다 읽을때까지 반복
        while (position < length) {
            // position 위치부터 토큰을 하나씩 가져온다.
            position += getNextToken(infixExpression.substring(position), chArr);
 
            // 추출된 토큰의 타입이 피연산자라면 출력
            if (tokenType == OPERAND) {
                postfixExpression.append(token);
                postfixExpression.append(' ');
            } else {
                // 연산자가 오른쪽 괄호 ')' 라면 스택에서 '('가 나올때까지 제거연산 수행
                if (tokenType == RIGHT_PARENTHESIS) {
                    while (!stack.isEmpty()) {
                        popped = stack.pop();
 
                        // 제거한 노드가 '(' 라면 중지
                        if (popped.getData().charAt(0) == LEFT_PARENTHESIS)
                            break;
                        else
                            postfixExpression.append(popped.getData());
                    }
                }
                // 나머지 연산자의 경우 토큰의 우선순위가 스택의 top보다 낮을 경우 제거연산 수행.
                // 제거연산은 토큰의 우선순위보다 낮은 노드가 나올때까지 수행(같은 거라도 수행)
                else {
                    // 스택이 비어있지 않고 토큰의 우선순위가 스택의 top보다 낮다면
                    while (!stack.isEmpty()
                            && !isPrior(token[0], stack.getTop().getData()
                                    .charAt(0))) {
                        // 제거연산 수행
                        popped = stack.pop();
 
                        // '(' 빼고 모두 출력
                        if (popped.getData().charAt(0) != LEFT_PARENTHESIS)
                            postfixExpression.append(popped.getData());
                    }
 
                    // 토큰의 우선순위가 스택의 top보다 높다면 삽입연산 수행
                    stack.push(new Node(String.valueOf(token)));
                }
            }
        }
 
        // 스택에 남아 있는 노드들을 제거연산한다.
        while (!stack.isEmpty()) {
            popped = stack.pop();
 
            // '(' 빼고 모두 출력
            if (popped.getData().charAt(0) != LEFT_PARENTHESIS)
                postfixExpression.append(popped.getData());
        }
 
        return postfixExpression.toString();
    }
 
    // 계산
    int calculate(String postfixExpression) {
        int position = 0;
        int length = postfixExpression.length();
        char[] chrArr = new char[length];
        int result = 0;
        int operand1, operand2;
        LinkedListStack stack = new LinkedListStack();
 
        while (position < length) {
            position += getNextToken(postfixExpression.substring(position),chrArr);
 
            // 공백은 패스
            if (tokenType == ' ')
                continue;
 
            // 피연산자이면 스택에 삽입
            if (tokenType == OPERAND) {
                stack.push(new Node(String.valueOf(token)));
            } else {
                // 연산자이면 스택에서 제거연산을 두 번 수행 후
                operand2 = Integer.parseInt(stack.pop().getData());
                operand1 = Integer.parseInt(stack.pop().getData());
                
                // 연산
                switch (tokenType) {
                
                case AND:
                	result = operand1 * operand2;
                    break;
                    
                case OR:
                	if( operand1 + operand2 >= 1)
                		{
                		result = 1;
                		}
                	else
                	{
                		result = 0;
                	}
                    break;
                }
                 
                stack.push(new Node(String.valueOf(result)));
            }
        }
 
        return result;
    }
}
*/
public class ETL_FilterMapper extends Mapper<Object, Text, NullWritable, Text>
{
	private Logger logger = LoggerFactory.getLogger(ETL_FilterMapper.class);
	private String mDelimiter;	
	private String filter_method ="";
	
    private List<String> Target_ColumnList = null;
    private List<String> Exception_ColumnList = null;
	
    private HashMap<String, String> hash_EvalNumericNorm = new HashMap<String, String>();
    
	private HashMap<Double , HashMap<Double, String>> hash_NumericNormRule = new HashMap<Double , HashMap<Double, String>>();
	
	private HashMap<Integer, List<String>> hash_columnIncludeExcludeRule = new HashMap<Integer, List<String>>();
	
	private HashMap<Integer, HashMap<String, String>> hash_columnReplaceRule = new HashMap<Integer, HashMap<String, String>>();
	
	String replaced_key = "";
	String filter_target = "";
	String filter_target_cp = null;
	String extrudded_value = "";
	String filter_rule_path = null;
	String filter_replace_rule = "";
	
	private int indexArray[];
    // attribute index array for do not computation
	private int exceptionIndexArr[];
	
	private enum ETL_T_Method {
		Replace, ColumnExtractor, FilterInclude, FilterExclude, Sorting, NumericNorm;
	}
    
    private static boolean isStringDouble(String s)
    {
        try {
            Double.parseDouble(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }  
    }
    
    private boolean matched(String regex, String inputTxt) {
		return Pattern.matches(regex, inputTxt);
	}
    public <T> List<T> intersection(List<T> list1, List<T> list2)
    {
    	List<T> list = new ArrayList<T>();
    	for(T t: list1)
    	{
    		if(list2.contains(t))
    		{
    			list.add(t);
    		}
    	}
    	return list;
    }
    @Override
    protected void setup(Context context) throws IOException, InterruptedException
    {
    	try
	    {
	        mDelimiter = context.getConfiguration().get(ArgumentsConstants.DELIMITER, "\t");	        
	        filter_method = context.getConfiguration().get(ArgumentsConstants.ETL_T_METHOD, "");//required	        
	        
	        Configuration conf = context.getConfiguration();
			FileSystem fs = FileSystem.get(conf);			
			String value = filter_method;
			ETL_T_Method method = ETL_T_Method.valueOf(value); // surround with try/catch
			
			logger.info(value);
			switch(method) 
			{
				case ColumnExtractor:
					indexArray = CommonMethods.convertIndexStr2IntArr(context.getConfiguration().get(ArgumentsConstants.TARGET_INDEX,  "-1"));
			        exceptionIndexArr = CommonMethods.convertIndexStr2IntArr(context.getConfiguration().get(ArgumentsConstants.EXCEPTION_INDEX, "-1"));
			        
					break;
			  	case NumericNorm:
			  		try
			  		{
			  			String number_norm_rule_path = context.getConfiguration().get(ArgumentsConstants.ETL_NUMERIC_NORM_RULE_PATH
			  																											,null);
				        if(number_norm_rule_path != null)
				        {
				        	Path path = new Path(number_norm_rule_path);
							BufferedReader in = new BufferedReader(new InputStreamReader(fs.open(path)));
							String line = "";
							//Start scan
							while ((line = in.readLine())!= null)
							{
								
								String[] NormRuleToken = line.split("@@"); //10~50->LITTLE&&51~80->NORMAL&&81~->HEAVY
					  			logger.info(line);		  			
					  			for(int nrt  = 0; nrt < NormRuleToken.length; nrt++)
					  			{
					  				String rule_pattern = NormRuleToken[nrt]; //X1~X2->Y1
					  				String[] rule_token = rule_pattern.split("->"); //X1~X2
					  				hash_EvalNumericNorm.put(rule_token[0], rule_token[1]);
					  			}
					  			/*
				  				String rule_pattern = line; //X1~X2->Y1
				  				String[] rule_token = rule_pattern.split("->"); //X1~X2
				  				hash_EvalNumericNorm.put(rule_token[0], rule_token[1]);
					  			*/
					  			logger.info("NumericNorm load finish");	
							}
				        }
			  			
				  		String StrNurmericform =  context.getConfiguration().get(ArgumentsConstants.ETL_NUMERIC_NORM, null);
				  		if(StrNurmericform != null)
				  		{
				  			String[] NormRuleToken = StrNurmericform.split("@@"); //10~50->LITTLE@@51~80->NORMAL@@81~->HEAVY
				  			logger.info(StrNurmericform);		  			
				  			for(int nrt  = 0; nrt < NormRuleToken.length; nrt++)
				  			{				  				
				  				String rule_pattern = NormRuleToken[nrt]; //X1~X2->Y1				  				
				  				String[] rule_token = rule_pattern.split("->"); //범위와 규칙으로 나눈다.				  				
				  				hash_EvalNumericNorm.put(rule_token[0], rule_token[1]);
				  			}
				  			logger.info("NumericNorm load finish");	
				  		}
			  		}
			  		catch(Exception e)
			  		{
			  			logger.info(e.toString());
			  		}
			  		
				  break;
			    case Replace:
			    	//문자열 변경 규칙 경로를 가져온다.
			        String filter_replace_rule_path = context.getConfiguration().get(ArgumentsConstants.ETL_REPLACE_RULE_PATH, null);
			        if(filter_replace_rule_path != null) //파일 기반.
			        {
			        	Path path = new Path(filter_replace_rule_path);
						BufferedReader in = new BufferedReader(new InputStreamReader(fs.open(path)));
						String line = "";
						//Start scan
						while ((line = in.readLine())!= null)
						{
							String[] rules = line.split("@@");
							for(int ri = 0; ri < rules.length; ri++)
							{
								String[] token = rules[ri].split(",");
								int column_id = Integer.parseInt(token[0]);
								
								if(hash_columnReplaceRule.containsKey(column_id) == false)
								{
									HashMap<String, String> hash_rule = new HashMap<String, String>();
									hash_rule.put(token[1], token[2]);
									hash_columnReplaceRule.put(column_id, hash_rule);							
								}
								else
								{
									HashMap<String, String> hash_rule = hash_columnReplaceRule.get(column_id);
									hash_rule.put(token[1], token[2]);
								}
							}
						}
			        }
			        else //명령창 기반.
					{
			        	//파리미터로 들어온 규칙을 파싱하여 hash_columnReplaceRule에 저장.
			        	filter_replace_rule = context.getConfiguration().get(ArgumentsConstants.ETL_REPLACE_RULE, null);
			        	
						String[] target_cols = filter_replace_rule.split("@@");
						for(int ti = 0; ti < target_cols.length; ti++)
						{
							String[] token = target_cols[ti].split(",");
							int column_id = Integer.parseInt(token[0]);
							if(hash_columnReplaceRule.containsKey(column_id) == false)
							{
								HashMap<String, String> hash_rule = new HashMap<String, String>();
								hash_rule.put(token[1], token[2]);
								hash_columnReplaceRule.put(column_id, hash_rule);							
							}
							else
							{
								HashMap<String, String> hash_rule = hash_columnReplaceRule.get(column_id);			
								hash_rule.put(token[1], token[2]);
							}
						}
					}
			        break;	
			 
			    case FilterExclude:
			    case FilterInclude:			    	
			    	 filter_rule_path = context.getConfiguration().get(ArgumentsConstants.ETL_RULE_PATH, null);
					if(filter_rule_path == null)//FILE을 사용하지 않고 규칙을 적용하는 경우
					{
						filter_target = context.getConfiguration().get(ArgumentsConstants.ETL_RULE, null);
						logger.info(filter_target);
				        String[] target = filter_target.split("&|\\|");
				        for(int i = 0; i <target.length; i++)
				    	{
				        	String breath_rem = target[i].replace("(", "");
				        	breath_rem = breath_rem.replace(")", "");
				        	
				        	String[] col_val = breath_rem.split(",");				        	
				        	int col_idx = Integer.parseInt(col_val[0]);
				        	String  col_value = col_val[1];				        	
				        	if(hash_columnIncludeExcludeRule.containsKey(col_idx) == true)
				        	{
				        		List<String> ExcludeRule = hash_columnIncludeExcludeRule.get(col_idx);
				        		if(ExcludeRule.contains(col_value) == false)
				        		{ ExcludeRule.add(col_value);	}
				        	}
				        	else
				        	{
				        		List<String> ExcludeRule = new ArrayList<String>(); ExcludeRule.add(col_value);
				        		hash_columnIncludeExcludeRule.put(col_idx, ExcludeRule);
				        	}
				    	}
					}   
					else
					{
						//Rule File Scan...
						Path path = new Path(filter_rule_path);
						BufferedReader in = new BufferedReader(new InputStreamReader(fs.open(path)));
						String line = "";
						//Start scan
						while ((line = in.readLine())!= null)
						{
							filter_target += line.trim();
							String[] target = line.split("&|\\|");
							logger.info(line);
					        for(int i = 0; i <target.length; i++)
					    	{
					        	
					        	String breath_rem = target[i].replace("(", "");
					        	breath_rem = breath_rem.replace(")", "");	
					        	String[] col_val = breath_rem.split(",");				  
					        	int col_idx = Integer.parseInt(col_val[0]);
					        	String  col_value = col_val[1];				        	
					        	if(hash_columnIncludeExcludeRule.containsKey(col_idx) == true)
					        	{
					        		List<String> ExcludeRule = hash_columnIncludeExcludeRule.get(col_idx);
					        		if(ExcludeRule.contains(col_value) == false)
					        		{ ExcludeRule.add(col_value);	}
					        	}
					        	else
					        	{
					        		List<String> ExcludeRule = new ArrayList<String>(); ExcludeRule.add(col_value);
					        		hash_columnIncludeExcludeRule.put(col_idx, ExcludeRule);
					        	}
					    	}
						}
						
						//End scan
						in.close();
					}
			        break;
			}
			
	    }
    	catch(Exception e)
    	{
    		logger.info(e.toString());
    	}
    }
    
    private int check_operator_dual(String input)
    {
    	int count = 0;
    	for(int i = 0; i < input.length(); i++)
    	{
    	
    		String view = input.substring(i, i+1);
    		if(view.equals("<") == true||	view.equals("<=") == true||	view.equals(">") == true||view.equals(">=") == true)
    		{
    			count++;
    		}
    	}
    	return count;    	
    }
    int line = 0;
	@Override
	protected void map(Object key, Text value, Context context) throws IOException, InterruptedException 
	{
		logger.info("ORIGINAL : " + value.toString());
		filter_target_cp = filter_target;
		String[] columns = value.toString().split(mDelimiter);	
		
		//원본 데이터의 컬럼수를 초과하는 경우. 사전에 0으로 처리한다.
		ETL_T_Method method = ETL_T_Method.valueOf(filter_method);
		boolean bNoRuleforFilterInEx = true;
		switch(method) 
		{
		 	case FilterInclude:
		    case FilterExclude:
				Set<Integer>col_set = hash_columnIncludeExcludeRule.keySet();
				for(int col : col_set)
				{
					if(col < 0)
						continue;
					if(col >= columns.length)
					{
						if(hash_columnIncludeExcludeRule.containsKey(col) == true)
			        	{
			        		List<String> ExcludeRule = hash_columnIncludeExcludeRule.get(col);
			        		        		
		        			for(String contrule: ExcludeRule)
		        			{
		        				String match_rule = "";
		        				match_rule = col + "," + contrule;
		        				bNoRuleforFilterInEx = false;
		        				filter_target_cp = filter_target_cp.replaceFirst(match_rule, "0");		    
		            			logger.info("Preprocess Result " + filter_target_cp);
		        			}
			        	}
					}
				}
				break;
		}
		if(bNoRuleforFilterInEx == false)
		{
			context.write(NullWritable.get(), new Text(""));
		}
		for(int col_num = 0;  col_num <columns.length; col_num++)
		{			
			method = ETL_T_Method.valueOf(filter_method);
			String  clmn_value = "";
			switch(method) 
			{
				
				case NumericNorm:
					try
					{
						String targetNum = columns[col_num];
						logger.info("check " + targetNum);
						if(isStringDouble(targetNum) == true)
						{
							
							ScriptEngineManager mgr = new ScriptEngineManager();
						    ScriptEngine engine = mgr.getEngineByName("JavaScript");
						    
						    Set<String> rules = hash_EvalNumericNorm.keySet();
						    boolean rtnEvaluation = false;
						    String matched_Rule = "";
						    
						    for(String rule: rules)
						    {
						    	 matched_Rule = rule;
						    	if(rule.indexOf("x") >= 0)
						    	{
						    	   if(check_operator_dual(rule) == 2)
						    	   {
						    		   rule = rule.replace("x","x&&x"); //dual case   
						    	   }
						    	   rule = rule.replace("x", targetNum);
						    	  
						    	}
						    	if(rule.indexOf("X") >= 0)
						    	{
						    		if(check_operator_dual(rule) == 2)
						    		{
						    		   rule = rule.replace("X","X&&X"); //dual case   
						    		}
						    		rule = rule.replace("X", targetNum);
						    	
						    	}
						    	String evaluation = rule;
						    	try
						    	{
						    		logger.info("평가: " + evaluation);
							    	rtnEvaluation = (Boolean) engine.eval(evaluation);
							    	if(rtnEvaluation == true)
							    	{
							    		logger.info("True");
							    		
							    		break; //범위가 맞을 경우 루프 아웃.
							    	}
						    	}
						    	catch(Exception e)
						    	{
						    		logger.info(e.toString());
						    	}
						    }						   
							
						    if(rtnEvaluation == true)
						    {
						    	columns[col_num] = hash_EvalNumericNorm.get(matched_Rule);		
						    }
						}
						replaced_key = replaced_key + columns[col_num] + mDelimiter;
						logger.info("MAP BUFFER " + replaced_key );
					}
					catch(Exception e)
					{
						logger.info(e.toString());
					}
				    break;
			  
			    case Replace:
			    	if(hash_columnReplaceRule.containsKey(col_num) == true)
		    		{
			    		HashMap<String, String> replaceRule = hash_columnReplaceRule.get(col_num);
			    		String sourcePattern = columns[col_num];
			    		
			    		Set<String> rules = replaceRule.keySet();
			    		for(String regex: rules)
			    		{
			    				
			    				if(Pattern.matches(regex, sourcePattern) == true)
			    				{
			    					String repCode = replaceRule.get(regex);
		    						columns[col_num] = columns[col_num].replaceAll(sourcePattern, repCode);	
			    				}
			    		}
			    		replaced_key = replaced_key + columns[col_num] + mDelimiter;
		    		}
			    	else
			    	{
			    		replaced_key = replaced_key + columns[col_num] + mDelimiter;
			    	}
			    	break;
			    case ColumnExtractor:
			    	if(CommonMethods.isContainIndex(indexArray, col_num, true) && 
			    			!CommonMethods.isContainIndex(exceptionIndexArr, col_num, false))
					{	
			    		replaced_key = replaced_key + columns[col_num] + mDelimiter;
			    		
					}
			    	break;
			    case FilterInclude:
			    case FilterExclude:
			    	String match_rule = "";
			    	if(hash_columnIncludeExcludeRule.containsKey(col_num) == true)
		        	{
		        		List<String> ExcludeRule = hash_columnIncludeExcludeRule.get(col_num);
		        		for(String rule: ExcludeRule)
		        		{
		        			if(columns[col_num].equals(rule) == true)
		        			{
		        				/*
		        				if(filter_rule_path == null)
		        				{
		        					match_rule = col_num + "," + columns[col_num];
		        				}
		        				else
		        				{
		        					match_rule = col_num + "\t" + columns[col_num];
		        				}
		        				*/
		        				match_rule = col_num + "," + columns[col_num];
		        				filter_target_cp = filter_target_cp.replaceFirst(match_rule, "1");
		        			}
		        			else
		        			{
		        				/*
		        				if(filter_rule_path == null)
		        				{
		        					match_rule = col_num + "," + rule;
		        				}
		        				else
		        				{
		        					match_rule = col_num + "\t" + rule;
		        				}  
		        				*/  		
		        				match_rule = col_num + "," + rule;
		        				filter_target_cp = filter_target_cp.replaceFirst(match_rule, "0");		 
		        			}
		        		}
		        	}			    
			    	extrudded_value += columns[col_num] + mDelimiter;
			    	break;
			default:
				break;		    	
			}
		}
		
		int result = 0;
		method = ETL_T_Method.valueOf(filter_method);
		Calculator c = new Calculator();
        String postfixExpression;
		switch(method) 
		{
		    case FilterInclude:		    	
		        logger.info("Bool Express : " + filter_target_cp);
		        postfixExpression = c.getPostfix(filter_target_cp);   
		        // 계산
		        result = c.calculate(postfixExpression);
		        logger.info("Calculation Result : " + result);
		        if(extrudded_value.trim().length() > 0 && result == 1)
				{
		        	int linenum =  line++;
					logger.info("FILE OUTPUT : " + linenum + " : " + extrudded_value);
					context.write(NullWritable.get(), new Text(extrudded_value));
				}
		    	extrudded_value = "";
				filter_target_cp = "";
				break;
		    case FilterExclude:		    			        
		        logger.info("Bool Express : " + filter_target_cp);
		        postfixExpression = c.getPostfix(filter_target_cp);   
		        // 계산
		        result = c.calculate(postfixExpression);
		        logger.info("Calculation Result : " + result);
		        if(extrudded_value.trim().length() > 0 && result != 1)
				{
		        	int linenum =  line++;
					logger.info("FILE OUTPUT : " + linenum + " : " + extrudded_value);
					context.write(NullWritable.get(), new Text(extrudded_value));
				}
		    	extrudded_value = "";
				filter_target_cp = "";
				break;
				
		    case ColumnExtractor:
		    case NumericNorm:
		    case Replace:
				if(replaced_key.trim().length() > 0)
				{
					context.write(NullWritable.get(), new Text(replaced_key));
					replaced_key = "";
				}
				break;
		}
		
	}//end of mapper
	@Override
    protected void cleanup(Context context) throws IOException, InterruptedException
    {
		
    }

	
}
