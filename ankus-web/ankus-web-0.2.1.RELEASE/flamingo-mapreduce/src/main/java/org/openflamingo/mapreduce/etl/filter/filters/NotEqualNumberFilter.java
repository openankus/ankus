package org.openflamingo.mapreduce.etl.filter.filters;

import org.openflamingo.mapreduce.type.DataType;
import org.slf4j.helpers.MessageFormatter;

/**
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class NotEqualNumberFilter extends FilterSupport {

	public boolean doFilter(Object source, Object target, String type) {
		if (DataType.INTEGER.getDataType().equals(type.trim())) {
			return doFilterIntegerValue(source, target);
		} else if (DataType.LONG.getDataType().equals(type.trim())) {
			return doFilterLongValue(source, target);
		} else if (DataType.FLOAT.getDataType().equals(type.trim())) {
			return doFilterFloatValue(source, target);
		} else if (DataType.DOUBLE.getDataType().equals(type.trim())) {
			return doFilterDoubleValue(source, target);
		} else {
			String message = MessageFormatter.format("Not Supported Data Type ({} != {} ?) ({}) ", new Object[]{
				source, target, type
			}).getMessage();
			throw new IllegalArgumentException(message);
		}
	}

	private boolean doFilterDoubleValue(Object source, Object target) {
		try {
			double sourceValue = Double.parseDouble((String) source);
			double targetValue = Double.parseDouble((String) target);
			return sourceValue != targetValue;
		} catch (Exception ex) {
			String message = MessageFormatter.format("Data Type Mismatch (Double) ({} != {}) ", source, target).getMessage();
			throw new IllegalArgumentException(message, ex);
		}
	}

	private boolean doFilterFloatValue(Object source, Object target) {
		try {
			float sourceValue = Float.parseFloat((String) source);
			float targetValue = Float.parseFloat((String) target);
			return sourceValue != targetValue;
		} catch (Exception ex) {
			String message = MessageFormatter.format("Data Type Mismatch (Float) ({} != {}) ", source, target).getMessage();
			throw new IllegalArgumentException(message, ex);
		}
	}

	private boolean doFilterLongValue(Object source, Object target) {
		try {
			long sourceValue = Long.parseLong((String) source);
			long targetValue = Long.parseLong((String) target);
			return sourceValue != targetValue;
		} catch (Exception ex) {
			String message = MessageFormatter.format("Data Type Mismatch (Long) ({} != {}) ", source, target).getMessage();
			throw new IllegalArgumentException(message, ex);
		}
	}

	private boolean doFilterIntegerValue(Object source, Object target) {
		try {
			int sourceValue = Integer.parseInt((String) source);
			int targetValue = Integer.parseInt((String) target);
			return sourceValue != targetValue;
		} catch (Exception ex) {
			String message = MessageFormatter.format("Data Type Mismatch (Integer) ({} != {}) ", source, target).getMessage();
			throw new IllegalArgumentException(message, ex);
		}
	}
}
