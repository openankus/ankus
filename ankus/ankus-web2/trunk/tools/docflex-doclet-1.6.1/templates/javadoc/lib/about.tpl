<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2005-10-17 11:23:00'
LAST_UPDATE='2012-05-24 08:56:31'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='<ANY>'
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
			txtfl.delimiter.type='none';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.border.top.style='solid';
					par.border.top.color='#808080';
					par.margin.top='30';
					par.margin.bottom='6';
					par.padding.top='2';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Java API documentation generated with '
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
					<TEXT_CTRL>
						TEXT=' v'
					</TEXT_CTRL>
					<DATA_CTRL>
						FORMULA='output.generator.version'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				<CTRLS>
					<PANEL>
						COND='output.generator.name == "DocFlex/Doclet"'
						FMT={
							ctrl.size.width='285.8';
						}
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='DocFlex/Doclet is both a multi-format Javadoc doclet and a free edition of '
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
										TEXT='. '
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</PANEL>
					<TEXT_CTRL>
						TEXT='If you need to customize your Javadoc without writing a full-blown doclet from scratch, '
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='DocFlex/Javadoc may be the only tool able to help you! '
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='Find out more at '
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
CHECKSUM='OrhxXUhJATT?Wn9dQBj8QhQ8HjazOivh7oRF0Dai2jQ'
</DOCFLEX_TEMPLATE>