package org.ankus.mapreduce.algorithms.preprocessing.etl;

public class Calculator {
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
