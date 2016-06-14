<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2005-10-17 11:23:00'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='<ANY>'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='gen.about';
		param.title='About (footer)';
		param.type='enum';
		param.enum.values='full;short;none';
	}
</TEMPLATE_PARAMS>
<STYLES>
	CHAR_STYLE={
		style.name='Default Paragraph Font';
		style.id='cs1';
		style.default='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs2';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s1';
		style.default='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs2';
}
<ROOT>
	<AREA_SEC>
		FMT={
			text.font.name='Verdana';
			text.font.size='7';
			text.color.foreground='#808080';
		}
		<AREA>
			<HR>
			</HR>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Java API documentation generated with'
					</TEXT_CTRL>
					<DATA_CTRL>
						FORMULA='output.generator.name'
						<URL_HLINK>
							COND='output.generator.name == "DocFlex/Javadoc"'
							TARGET_FRAME_EXPR='"_blank"'
							TARGET_FRAME_ALWAYS
							URL_EXPR='"http://www.filigris.com/products/docflex_javadoc/"'
						</URL_HLINK>
						<URL_HLINK>
							COND='output.generator.name == "DocFlex/Doclet"'
							TARGET_FRAME_EXPR='"_blank"'
							TARGET_FRAME_ALWAYS
							URL_EXPR='"http://www.filigris.com/products/docflex_javadoc/#docflex-doclet"'
						</URL_HLINK>
					</DATA_CTRL>
					<DATA_CTRL>
						FORMULA='output.generator.version'
					</DATA_CTRL>
					<TEXT_CTRL>
						TEXT='using'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='JavadocPro'
						<URL_HLINK>
							TARGET_FRAME_EXPR='"_blank"'
							TARGET_FRAME_ALWAYS
							URL_EXPR='"http://www.filigris.com/products/docflex_javadoc/templates/JavadocPro/"'
						</URL_HLINK>
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='template set.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		COND='hasParamValue("gen.about", "full")'
		FMT={
			text.font.name='Verdana';
			text.font.size='7';
			text.color.foreground='#808080';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.margin.top='6';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='output.generator.name'
						<URL_HLINK>
							COND='output.generator.name == "DocFlex/Javadoc"'
							TARGET_FRAME_EXPR='"_blank"'
							TARGET_FRAME_ALWAYS
							URL_EXPR='"http://www.filigris.com/products/docflex_javadoc/"'
						</URL_HLINK>
						<URL_HLINK>
							COND='output.generator.name == "DocFlex/Doclet"'
							TARGET_FRAME_EXPR='"_blank"'
							TARGET_FRAME_ALWAYS
							URL_EXPR='"http://www.filigris.com/products/docflex_javadoc/#docflex-doclet"'
						</URL_HLINK>
					</DATA_CTRL>
					<PANEL>
						COND='output.generator.name == "DocFlex/Doclet"'
						FMT={
							ctrl.size.width='263.3';
							ctrl.size.height='38.3';
						}
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='is both a multi-format Javadoc doclet and a free edition of'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='DocFlex/Javadoc'
										<URL_HLINK>
											TARGET_FRAME_EXPR='"_blank"'
											TARGET_FRAME_ALWAYS
											URL_EXPR='"http://www.filigris.com/products/docflex_javadoc/"'
										</URL_HLINK>
									</TEXT_CTRL>
									<DELIMITER>
										FMT={
											txtfl.delimiter.type='text';
											txtfl.delimiter.text=', ';
										}
									</DELIMITER>
									<TEXT_CTRL>
										TEXT='which'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</PANEL>
					<TEXT_CTRL>
						TEXT='is a template-driven programming tool for rapid development of any Javadoc-based Java API documentation generators (i.e. doclets).'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='If you need to customize your Javadoc without writing a full-blown doclet from scratch,'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='DocFlex/Javadoc'
						<URL_HLINK>
							TARGET_FRAME_EXPR='"_blank"'
							TARGET_FRAME_ALWAYS
							URL_EXPR='"http://www.filigris.com/products/docflex_javadoc/"'
						</URL_HLINK>
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='may be the only tool able to help you!'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='Find out more at'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='www.docflex.com'
						<URL_HLINK>
							TARGET_FRAME_EXPR='"_blank"'
							TARGET_FRAME_ALWAYS
							URL_EXPR='"http://www.docflex.com/"'
						</URL_HLINK>
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</ROOT>
CHECKSUM='mSTMLSp7fBBn7SfU1jBGJMMF3lN?JPD0FDq8sa?VwJY'
</DOCFLEX_TEMPLATE>