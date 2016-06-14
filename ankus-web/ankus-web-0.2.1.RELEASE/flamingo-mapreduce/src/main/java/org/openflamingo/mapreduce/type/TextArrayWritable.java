package org.openflamingo.mapreduce.type;

import org.apache.hadoop.io.ArrayWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;

import java.math.BigDecimal;

/**
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class TextArrayWritable extends ArrayWritable {

	public TextArrayWritable() {
		super(Text.class);
	}

	public TextArrayWritable(BigDecimal[] values) {
		super(Text.class, getValueText(values));
	}

	private static Text[] getValueText(BigDecimal[] values) {
		Text[] text = new Text[values.length];
		for (int i = 0; i < text.length; i++) {
			text[i] = new Text(values[i].toPlainString());
		}
		return text;
	}

	public int compareTo(TextArrayWritable taw) {
		Writable[] source = this.get();
		Writable[] target = taw.get();

		int cmp = source.length - target.length;
		if (cmp != 0) {
			return cmp;
		}

		for (int i = 0; i < source.length; i++) {
			cmp = ((Text) source[i]).compareTo((Text) target[i]);
			if (cmp != 0) {
				return cmp;
			}
		}

		return cmp;
	}
}