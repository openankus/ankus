<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:51:00'
LAST_UPDATE='2012-05-24 08:56:31'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
DESCR='This template generates single-file Java API documentation in any of the supported output formats. It may be especially useful when the generated documentation is intended for printing.
<p>
Java 5.0 language features (<i>Generic Types</i>, <i>Enums</i>, <i>Annotations</i>) are fully supported.
'
INIT_EXPR='callStockSection("Init")'
TITLE_EXPR='getStringParam("windowTitle")'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='windowTitle';
		param.title='Window Title';
		param.description='${include help/params/windowTitle.htm}';
		param.type='string';
	}
	PARAM={
		param.name='docTitle';
		param.title='Documentation Title';
		param.description='${include help/params/docTitle.htm}';
		param.type='string';
	}
	PARAM={
		param.name='include';
		param.title='Include';
		param.title.style.bold='true';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='include.deprecated';
		param.title='deprecated API';
		param.description='${include help/params/include.deprecated.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='include.details';
		param.title='Details Of';
		param.title.style.bold='true';
		param.description='${include help/params/include.details.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='include.details.overview';
		param.title='overview';
		param.description='${include help/params/include.details.overview.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='include.details.packages';
		param.title='packages';
		param.description='${include help/params/include.details.packages.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='include.details.classes';
		param.title='classes';
		param.description='${include help/params/include.details.classes.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='include.details.innerClasses';
		param.title='inner classes';
		param.description='${include help/params/include.details.innerClasses.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='include.details.members';
		param.title='members';
		param.description='${include help/params/include.details.members.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='include.details.initialValues';
		param.title='initial values';
		param.description='${include help/params/include.details.initialValues.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='include.tag';
		param.title='Tags';
		param.title.style.bold='true';
		param.description='${include help/params/include.tag.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='include.tag.version';
		param.title='@version';
		param.description='${include help/params/include.tag.version.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='include.tag.author';
		param.title='@author';
		param.description='${include help/params/include.tag.author.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='include.tag.custom';
		param.title='Custom tags';
		param.description='${include help/params/include.tag.custom.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.recognizeEscapes='true';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='exclude';
		param.title='Exclude';
		param.title.style.bold='true';
		param.description='${include help/params/exclude.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='exclude.byTags';
		param.title='By Tags';
		param.title.style.bold='true';
		param.description='${include help/params/exclude.byTags.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='exclude.byTags.all';
		param.title='classes & members';
		param.description='${include help/params/exclude.byTags.all.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
	}
	PARAM={
		param.name='exclude.byTags.classes';
		param.title='classes';
		param.description='${include help/params/exclude.byTags.classes.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
	}
	PARAM={
		param.name='exclude.byTags.classes.all';
		param.title='exclude.byTags.classes + exclude.byTags.all';
		param.description='${include help/params/exclude.byTags.classes.all.htm}';
		param.type='string';
		param.list='true';
		param.defaultValue.expr='v = Vector();

v.addElements(
  getArrayParam("exclude.byTags.classes")
);

v.addElements(
  getArrayParam("exclude.byTags.all")
);

a = v.filterVector(null, null, true).toArray();

a.length() > 0 ? a : null';
		param.hidden='true';
	}
	PARAM={
		param.name='exclude.byTags.members';
		param.title='members';
		param.description='${include help/params/exclude.byTags.members.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
	}
	PARAM={
		param.name='exclude.byTags.members.all';
		param.title='exclude.byTags.members + exclude.byTags.all';
		param.description='${include help/params/exclude.byTags.members.all.htm}';
		param.type='string';
		param.list='true';
		param.defaultValue.expr='v = Vector();

v.addElements(
  getArrayParam("exclude.byTags.members")
);

v.addElements(
  getArrayParam("exclude.byTags.all")
);

a = v.filterVector(null, null, true).toArray();

a.length() > 0 ? a : null';
		param.hidden='true';
	}
	PARAM={
		param.name='exclude.byAnns';
		param.title='By Annotations';
		param.title.style.bold='true';
		param.description='${include help/params/exclude.byAnns.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='exclude.byAnns.all';
		param.title='classes & members';
		param.description='${include help/params/exclude.byAnns.all.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
	}
	PARAM={
		param.name='exclude.byAnns.classes';
		param.title='classes';
		param.description='${include help/params/exclude.byAnns.classes.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
	}
	PARAM={
		param.name='exclude.byAnns.classes.all';
		param.title='exclude.byAnns.classes + exclude.byAnns.all';
		param.description='${include help/params/exclude.byAnns.classes.all.htm}';
		param.type='string';
		param.list='true';
		param.defaultValue.expr='v = Vector();

v.addElements(
  getArrayParam("exclude.byAnns.classes")
);

v.addElements(
  getArrayParam("exclude.byAnns.all")
);

a = v.filterVector(null, null, true).toArray();

a.length() > 0 ? a : null';
		param.hidden='true';
	}
	PARAM={
		param.name='exclude.byAnns.members';
		param.title='members';
		param.description='${include help/params/exclude.byAnns.members.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
	}
	PARAM={
		param.name='exclude.byAnns.members.all';
		param.title='exclude.byAnns.members + exclude.byAnns.all';
		param.description='${include help/params/exclude.byAnns.members.all.htm}';
		param.type='string';
		param.list='true';
		param.defaultValue.expr='v = Vector();

v.addElements(
  getArrayParam("exclude.byAnns.members")
);

v.addElements(
  getArrayParam("exclude.byAnns.all")
);

a = v.filterVector(null, null, true).toArray();

a.length() > 0 ? a : null';
		param.hidden='true';
	}
	PARAM={
		param.name='omit';
		param.title='Omit';
		param.title.style.bold='true';
		param.description='${include help/params/omit.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='omit.packageQualifiers.for';
		param.title='Package qualifiers started with';
		param.description='${include help/params/omit.packageQualifiers.for.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.defaultValue='java.;javax.';
	}
	PARAM={
		param.name='omit.packageQualifiers.all';
		param.title='All package qualifiers';
		param.description='${include help/params/omit.packageQualifiers.all.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='omit.inheritedMemberLists.for';
		param.title='Inherited member lists for packages';
		param.description='${include help/params/omit.inheritedMemberLists.for.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.defaultValue='java.;javax.';
	}
	PARAM={
		param.name='omit.inheritedMemberLists.all';
		param.title='All inherited member lists';
		param.description='${include help/params/omit.inheritedMemberLists.all.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='fmt';
		param.title='Formatting';
		param.title.style.bold='true';
		param.description='${include help/params/fmt.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='fmt.page.breakBefore.package';
		param.title='Start package from new page';
		param.description='${include help/params/fmt.page.breakBefore.package.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='fmt.page.breakBefore.class';
		param.title='Start class from new page';
		param.description='${include help/params/fmt.page.breakBefore.class.htm}';
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
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s1';
		style.default='true';
		text.color.foreground='#000000';
	}
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs3';
		text.font.size='9';
		text.font.style.italic='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs2';
}
<PAGE_FOOTER>
	<AREA_SEC>
		FMT={
			sec.outputStyle='table';
			text.font.style.italic='true';
			table.sizing='Relative';
			table.cell.padding.horz='0';
			table.cell.padding.vert='1.7';
			table.border.style='none';
			table.border.top.style='solid';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					trow.cell.align.vert='Top';
				}
				<CTRLS>
					<PANEL>
						FMT={
							ctrl.size.width='390';
							ctrl.size.height='57.8';
						}
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										FORMULA='getStringParam("windowTitle")'
										FMT={
											ctrl.option.text.trimSpaces='true';
											ctrl.option.text.noBlankOutput='true';
										}
									</DATA_CTRL>
									<DELIMITER>
										FMT={
											txtfl.delimiter.type='text';
											txtfl.delimiter.text=' -- ';
										}
									</DELIMITER>
									<DATA_CTRL>
										COND='! output.noTimeStamp'
										FORMULA='date()'
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</PANEL>
					<PANEL>
						FMT={
							ctrl.size.width='109.5';
							ctrl.size.height='57.8';
							tcell.align.horz='Right';
						}
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Page'
									</TEXT_CTRL>
									<DATA_CTRL>
										DOCFIELD='page'
									</DATA_CTRL>
									<TEXT_CTRL>
										TEXT='of'
									</TEXT_CTRL>
									<DATA_CTRL>
										DOCFIELD='num-pages'
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</PANEL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</PAGE_FOOTER>
<ROOT>
	<TEMPLATE_CALL>
		DESCR='documentation overview'
		COND='getBooleanParam("include.details.overview")'
		TEMPLATE_FILE='lib/overview-summary.tpl'
		INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
	</TEMPLATE_CALL>
	<ELEMENT_ITER>
		DESCR='iterates by all packages (both directly specified on the Javadoc command line and those containing classes specified separately)'
		TARGET_ET='PackageDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'*[getBooleanParam("include.details.packages")] -> PackageDoc';
			'* -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc';
		}
		FILTER='getBooleanParam("include.deprecated") || ! hasTag("@deprecated")'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		<BODY>
			<FOLDER>
				DESCR='package overview'
				COND='getBooleanParam("include.details.packages")'
				<BODY>
					<TEMPLATE_CALL>
						DESCR='(start from new page)'
						COND='getBooleanParam("fmt.page.breakBefore.package")'
						BREAK_PARENT_BLOCK='when-executed'
						TEMPLATE_FILE='lib/package-summary.tpl'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
						FMT={
							sec.spacing.before='20';
							sec.page.breakBefore='true';
						}
					</TEMPLATE_CALL>
					<TEMPLATE_CALL>
						DESCR='(continue on the current page)'
						TEMPLATE_FILE='lib/package-summary.tpl'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
						FMT={
							sec.spacing.before='20';
						}
					</TEMPLATE_CALL>
				</BODY>
			</FOLDER>
			<ELEMENT_ITER>
				DESCR='iterates by all classes in the package (including inner classes)'
				COND='getBooleanParam("include.details.classes")'
				TARGET_ET='ClassDoc'
				SCOPE='simple-location-rules'
				RULES={
					'* -> ClassDoc';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
(getAttrValue("containingClass") == null || 
  getBooleanParam("include.details.innerClasses"))
&& 
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
				<BODY>
					<TEMPLATE_CALL>
						DESCR='documentation for a class (start from new page)'
						COND='getBooleanParam("fmt.page.breakBefore.class")'
						BREAK_PARENT_BLOCK='when-executed'
						TEMPLATE_FILE='lib/class.tpl'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
						FMT={
							sec.spacing.before='20';
							sec.page.breakBefore='true';
						}
					</TEMPLATE_CALL>
					<TEMPLATE_CALL>
						DESCR='documentation for a class (continue on the current page)'
						TEMPLATE_FILE='lib/class.tpl'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
						FMT={
							sec.spacing.before='20';
						}
					</TEMPLATE_CALL>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
	</ELEMENT_ITER>
	<TEMPLATE_CALL>
		DESCR='bottom message'
		TEMPLATE_FILE='lib/about.tpl'
	</TEMPLATE_CALL>
</ROOT>
<STOCK_SECTIONS>
	<FOLDER>
		SS_NAME='Init'
		<BODY>
			<TEMPLATE_CALL>
				TEMPLATE_FILE='lib/init.tpl'
				OUTPUT_TYPE='document'
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
</STOCK_SECTIONS>
CHECKSUM='crDhAVWrBgIMjMw0ZCvS5ekCY1u4QPr95EZ70hqpfwI'
</DOCFLEX_TEMPLATE>