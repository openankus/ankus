<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-11-26 11:28:56'
LAST_UPDATE='2012-05-24 08:56:34'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='docTitle';
		param.title='Documentation Title';
		param.type='text';
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
	PAR_STYLE={
		style.name='Title Heading';
		style.id='s2';
		text.font.name='Times New Roman';
		text.font.size='36';
		par.alignment='Center';
		par.page.keepWithNext='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.hlink.style.link='cs2';
}
<PAGE_FOOTER>
	DESCR='define empty page footer to override the default one'
</PAGE_FOOTER>
<ROOT>
	<AREA_SEC>
		COND='output.format.supportsPagination'
		<AREA>
			<SPACER>
				FMT={
					spacer.height='72';
					spacer.option.noSuppress='true';
				}
			</SPACER>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s2';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='getParam("docTitle")'
						FMT={
							txtfl.ehtml.render='true';
						}
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</ROOT>
CHECKSUM='lNUWNKdpxU8x6M9NNCgvvhvOO1fftjWntc6Y0IjLHnk'
</DOCFLEX_TEMPLATE>