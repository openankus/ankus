<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-11-30 07:54:06'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='<ANY>'
FINISH_EXPR='/* When the HTML output is being generated, copy all files from the local "doc-files" 
subdir contained in the source directory (along with "overview.html" file) to the 
destination Associated Files directory (to have all images inserted in description 
with <IMG> tags get in the result documentation) */

output.generating && output.format.name == "HTML" ? 
  copyFiles (output.inputFilesPath + "doc-files", output.docFilesDir)'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='$package.summary.vector';
		param.description='The vector of packages to be included in the summary';
		param.type='Object';
	}
	PARAM={
		param.name='$package.summary.title';
		param.description='The title for the package summary';
		param.type='string';
		param.defaultValue='Package Summary';
	}
	PARAM={
		param.name='$page.heading.right';
		param.title='Page Heading (on the right)';
		param.type='string';
	}
	PARAM={
		param.name='gen';
		param.title='Generate';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='gen.package';
		param.title='Package';
		param.type='boolean';
	}
	PARAM={
		param.name='page';
		param.title='Pagination';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='page.columns';
		param.title='Generate page columns';
		param.type='boolean';
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
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs3';
		text.font.size='9';
	}
	PAR_STYLE={
		style.name='Summary Heading';
		style.id='s2';
		text.font.size='15';
		text.font.style.bold='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs2';
}
<PAGE_HEADER>
	<AREA_SEC>
		FMT={
			sec.outputStyle='table';
			text.font.style.italic='true';
			table.sizing='Relative';
			table.cell.padding.horz='0';
			table.cell.padding.vert='1.7';
			table.border.style='none';
			table.border.bottom.style='solid';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					trow.cell.align.vert='Top';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='getParam("$package.summary.title")'
						FMT={
							ctrl.size.width='234.8';
							ctrl.size.height='17.3';
						}
					</DATA_CTRL>
					<DATA_CTRL>
						FORMULA='getParam("$page.heading.right")'
						FMT={
							ctrl.size.width='264.8';
							ctrl.size.height='17.3';
							ctrl.option.text.trimSpaces='true';
							ctrl.option.text.noBlankOutput='true';
							tcell.align.horz='Right';
						}
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</PAGE_HEADER>
<ROOT>
	<ELEMENT_ITER>
		TARGET_ET='PackageDoc'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='getParam("$package.summary.vector").toEnum()'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='table';
			table.sizing='Relative';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								FORMULA='(name = getAttrValue("name")) != "" ? name : "<unnamed>"'
								FMT={
									ctrl.size.width='48.8';
									ctrl.size.height='17.3';
									tcell.sizing='Minimal';
									tcell.option.maxNbrWidth='50';
									text.font.style.bold='true';
								}
								<DOC_HLINK>
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
								</DOC_HLINK>
								<URL_HLINK>
									COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line),  when 
by the previous definition no internal target (within the currently generated docs) 
can be found.
Note that both hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
									URL_EXPR='getExternalDocURL()'
								</URL_HLINK>
							</DATA_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Comment_Summary'
								FMT={
									ctrl.size.width='422.3';
									ctrl.size.height='17.3';
									tcell.option.maxNbrWidth='40';
								}
							</SS_CALL_CTRL>
							<DATA_CTRL>
								COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.package")'
								DOCFIELD='page-htarget'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='17.3';
									ctrl.option.noHLinkFmt='true';
									tcell.sizing='Minimal';
									tcell.align.horz='Center';
									text.style='cs3';
									text.hlink.fmt='none';
								}
								<DOC_HLINK>
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
								</DOC_HLINK>
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
		<HEADER>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							trow.bkgr.color='#CCCCFF';
						}
						<CTRLS>
							<DATA_CTRL>
								FORMULA='getParam("$package.summary.title")'
								FMT={
									ctrl.size.width='471';
									ctrl.size.height='19.5';
									par.style='s2';
								}
							</DATA_CTRL>
							<TEXT_CTRL>
								COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.package")'
								TEXT='Page'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='19.5';
									tcell.sizing='Minimal';
									tcell.align.horz='Center';
									text.style='cs3';
									text.font.style.bold='true';
								}
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
</ROOT>
<STOCK_SECTIONS>
	<ELEMENT_ITER>
		SS_NAME='Comment'
		DESCR='param: the name of the passed context element\'s attribute which returns an array containing all inline tags representing the whole comment (e.g. "firstSentenceTags").

The section iterates by inline tags and processes them.'
		MATCHING_ETS={'Doc';'Tag'}
		TARGET_ET='Tag'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='attrName = stockSection.param.toString();

getElementsByLinkAttr (
 attrName.isBlank() ? "inlineTags" : attrName
)'
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='none';
			txtfl.ehtml.render='true';
		}
		<BODY>
			<AREA_SEC>
				DESCR='text'
				COND='getAttrValue("kind") == "Text"'
				BREAK_PARENT_BLOCK='when-executed'
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='text'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<TEMPLATE_CALL>
				DESCR='inline tag'
				TEMPLATE_FILE='inline-tag.tpl'
			</TEMPLATE_CALL>
		</BODY>
	</ELEMENT_ITER>
	<FOLDER>
		SS_NAME='Comment_Summary'
		DESCR='generates the summary description of a package.

This stock-section switches the search path for the input associated files to the package source directory (see "Processing | Init Expression" tab), which is needed when there are some images specified in the package description that may get into the summary text.'
		MATCHING_ET='PackageDoc'
		INIT_EXPR='output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")'
		FMT={
			sec.outputStyle='text-par';
			txtfl.ehtml.flatten='true';
		}
		<BODY>
			<AREA_SEC>
				DESCR='process @deprecated tag'
				COND='hasTag("@deprecated") || 
hasAnnotation("java.lang.Deprecated")'
				BREAK_PARENT_BLOCK='when-executed'
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Deprecated.'
								FMT={
									text.font.style.bold='true';
								}
							</TEXT_CTRL>
							<DELIMITER>
							</DELIMITER>
							<SS_CALL_CTRL>
								SS_NAME='Comment'
								PASSED_ELEMENT_EXPR='findElementById (tag("@deprecated"))'
								PASSED_ELEMENT_MATCHING_ET='Tag'
								PARAMS_EXPR='Array ("inlineTags")'
								FMT={
									text.font.style.italic='true';
								}
							</SS_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<SS_CALL>
				DESCR='if no @deprecated tag, generate a description by the method\'s "firstSentenceTags" inline tags'
				SS_NAME='Comment'
				PARAMS_EXPR='Array ("firstSentenceTags")'
			</SS_CALL>
		</BODY>
	</FOLDER>
</STOCK_SECTIONS>
CHECKSUM='DN7LvvkRHnwlFimfV9JAbN4FuAoptSB5rip6VdxdUHg'
</DOCFLEX_TEMPLATE>