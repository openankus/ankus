package org.openflamingo.mapreduce.compress;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.io.compress.CodecPool;
import org.apache.hadoop.io.compress.CompressionCodec;
import org.apache.hadoop.io.compress.CompressionOutputStream;
import org.apache.hadoop.io.compress.Compressor;
import org.apache.hadoop.util.ReflectionUtils;

/**
 * 파일의 확장자에 따라서 Codec과 CodecPool을 적용하여 압축을 해제하는 Decompressor.
 *
 * @author Edward KIM
 * @author Seo Ji Hye
 * @since 0.1
 */
public class PooledStreamCompressor {

	public static void main(String[] args) throws Exception {
		String codecClassname = args[0];
		Class<?> codecClass = Class.forName(codecClassname);
		Configuration conf = new Configuration();
		CompressionCodec codec = (CompressionCodec) ReflectionUtils.newInstance(codecClass, conf);
		Compressor compressor = null;
		try {
			compressor = CodecPool.getCompressor(codec);
			CompressionOutputStream out = codec.createOutputStream(System.out, compressor);
			IOUtils.copyBytes(System.in, out, 4096, false);
			out.finish();
		} finally {
			CodecPool.returnCompressor(compressor);
		}
	}

}