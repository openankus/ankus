<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:51:00'
LAST_UPDATE='2012-05-24 08:56:31'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='FramesetTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
DESCR='This template generates framed HTML documentation similar to that produced by the Standard Javadoc doclet.
<p>
Full support of Java 5.0 language features: <i>Generic Types</i>, <i>Enums</i>, <i>Annotations</i>.
<p>
<b>Note:</b> This template is supported only by HTML output format.'
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
	}
	PARAM={
		param.name='omit.inheritedMemberLists.all';
		param.title='All inherited member lists';
		param.description='${include help/params/omit.inheritedMemberLists.all.htm}';
		param.type='boolean';
	}
</TEMPLATE_PARAMS>
<STYLES>
	CHAR_STYLE={
		style.name='Default Paragraph Font';
		style.id='cs1';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Frame Heading';
		style.id='s1';
		text.font.size='9';
		text.font.style.bold='true';
		par.margin.top='7';
		par.margin.bottom='3';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Frame Item';
		style.id='s2';
		text.font.size='9';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Frame Title';
		style.id='s3';
		text.font.size='10';
		text.font.style.bold='true';
		par.margin.bottom='4';
		par.option.nowrap='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs2';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s4';
		style.default='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs2';
}
<FRAMESET>
	LAYOUT='columns'
	<FRAMESET>
		PERCENT_SIZE=20
		LAYOUT='rows'
		<FRAME>
			COND='documentByTemplate("overview-frame") != ""'
			PERCENT_SIZE=30
			NAME='overview'
			SOURCE_EXPR='documentByTemplate("overview-frame")'
		</FRAME>
		<FRAME>
			PERCENT_SIZE=70
			NAME='summary'
			SOURCE_EXPR='documentByTemplate("all-classes-frame")'
		</FRAME>
	</FRAMESET>
	<FRAME>
		PERCENT_SIZE=80
		NAME='detail'
		SOURCE_EXPR='documentByTemplate("overview-summary;class")'
	</FRAME>
</FRAMESET>
<ROOT>
	<ELEMENT_ITER>
		DESCR='iterates by all packages (both directly specified on the Javadoc command line and those containing classes specified separately)'
		TARGET_ET='PackageDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> PackageDoc';
			'* -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc';
		}
		FILTER='getBooleanParam("include.deprecated") || ! hasTag("@deprecated")'
		<BODY>
			<TEMPLATE_CALL>
				DESCR='generates the summary file for a package'
				TEMPLATE_FILE='lib/package-frame.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='packageName = getAttrStringValue("name");
output.docFilesDir + (packageName != "" ? packageName.replace(".", "/") : "")'
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='generates the overview file for a package'
				TEMPLATE_FILE='lib/package-summary.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='packageName = getAttrStringValue("name");
output.docFilesDir + (packageName != "" ? packageName.replace(".", "/") : "")'
				ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
				INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
			</TEMPLATE_CALL>
			<ELEMENT_ITER>
				DESCR='iterates by all classes within the package to be documented'
				TARGET_ET='ClassDoc'
				SCOPE='simple-location-rules'
				RULES={
					'* -> ClassDoc';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
				<BODY>
					<TEMPLATE_CALL>
						DESCR='generates the documentation file for a class'
						TEMPLATE_FILE='lib/class.tpl'
						OUTPUT_TYPE='document'
						OUTPUT_DIR_EXPR='packageName = iterator.contextElement.getAttrStringValue("name");
output.docFilesDir + (packageName != "" ? packageName.replace(".", "/")+"/" : "")'
						FILE_NAME_EXPR='getAttrStringValue("name")'
						ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
					</TEMPLATE_CALL>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
		<FOOTER>
			DESCR='this block is executed only when there were documented packages'
			<TEMPLATE_CALL>
				DESCR='generates the overview summary file for all documentation'
				TEMPLATE_FILE='lib/overview-frame.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='output.docFilesDir'
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='generates the overview file for all documentation'
				TEMPLATE_FILE='lib/overview-summary.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='output.docFilesDir'
				ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
				INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='generates \'package-list\' plain text file'
				TEMPLATE_FILE='lib/package-list.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='output.docFilesDir'
				PLAIN_TEXT_FILE
			</TEMPLATE_CALL>
		</FOOTER>
	</ELEMENT_ITER>
	<TEMPLATE_CALL>
		DESCR='generates the summary file for all classes'
		TEMPLATE_FILE='lib/all-classes-frame.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
	</TEMPLATE_CALL>
</ROOT>
<STOCK_SECTIONS>
	<FOLDER>
		SS_NAME='Init'
		MATCHING_ET='RootDoc'
		<BODY>
			<TEMPLATE_CALL>
				TEMPLATE_FILE='lib/init.tpl'
				OUTPUT_TYPE='document'
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
</STOCK_SECTIONS>
CHECKSUM='20Mvb6GfVg?FskKU+HgoZHT7v4jun7mT6OwTpcr6sfM'
</DOCFLEX_TEMPLATE>