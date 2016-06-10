<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:51:00'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
FEATURE_TYPE='pro'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
DESCR='${include help/PlainDoc_tpl.htm}'
INIT_EXPR='callStockSection("Init")'
TITLE_EXPR='getStringParam("windowTitle")'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='windowTitle';
		param.title='Window Title';
		param.description='${include help/params/windowTitle.htm}';
		param.type='string';
		param.defaultValue.expr='getOption("-windowtitle")[0]';
	}
	PARAM={
		param.name='docTitle';
		param.title='Documentation Title';
		param.description='${include help/params/docTitle.htm}';
		param.type='text';
		param.defaultValue.expr='getOption("-doctitle")[0]';
	}
	PARAM={
		param.name='gen';
		param.title='Generate';
		param.title.style.bold='true';
		param.description='${include help/params/gen.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='gen.titlePage';
		param.title='Title Page';
		param.description='${include help/params/gen.titlePage.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.toc';
		param.title='Table Of Contens';
		param.description='${include help/params/gen.toc.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.overview';
		param.title='Overview';
		param.title.style.bold='true';
		param.description='${include help/params/gen.overview.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.overview")';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.overview.packages';
		param.title='Package Summary';
		param.description='${include help/params/gen.overview.packages.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.overview.packages")';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.overview.packages.groups';
		param.title='Package Groups';
		param.description='${include help/params/gen.overview.packages.groups.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.list='true';
		param.list.recognizeEscapes='true';
		param.defaultValue.expr='v = Vector();

iterate (
  getOptions ("-group"),
  @(String[]) args,
  FlexQuery (
    v.addElement (args [1] + "::" + args [0])
  )
);

v.toArray()';
	}
	PARAM={
		param.name='gen.overview.allClasses';
		param.title='All Classes Summary';
		param.description='${include help/params/gen.overview.allClasses.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.package';
		param.title='Package Overviews';
		param.title.style.bold='true';
		param.description='${include help/params/gen.package.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.package")';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.package.classes';
		param.title='Class Summary';
		param.description='${include help/params/gen.package.classes.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.class';
		param.title='Class Detail';
		param.title.style.bold='true';
		param.description='${include help/params/gen.class.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.class")';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.class.member.summary';
		param.title='Member Summary';
		param.description='${include help/params/gen.class.member.summary.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.class.member.summary")';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.class.member.summary.inherited';
		param.title='Inherited Members';
		param.description='${include help/params/gen.class.member.summary.inherited.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.class.member.summary.inherited")';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.class.member.summary.inherited.exclude';
		param.title='Exclude for Packages';
		param.description='${include help/params/gen.class.member.summary.inherited.exclude.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
	}
	PARAM={
		param.name='gen.class.member.detail';
		param.title='Member Detail';
		param.description='${include help/params/gen.class.member.detail.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.class.member.detail")';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.class.member.detail.constantValues';
		param.title='Constant Field Values';
		param.description='${include help/params/gen.class.member.detail.constantValues.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.bottomText';
		param.title='Bottom Text';
		param.description='${include help/params/gen.bottomText.htm}';
		param.type='text';
		param.defaultValue.expr='getOption("-bottom")[0]';
	}
	PARAM={
		param.name='gen.about';
		param.title='About (footer)';
		param.description='${include help/params/gen.about.htm}';
		param.type='enum';
		param.enum.values='full;short;none';
		param.defaultValue='short';
	}
	PARAM={
		param.name='include';
		param.title='Include';
		param.title.style.bold='true';
		param.description='${include help/params/include.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='include.deprecated';
		param.title='Deprecated API';
		param.description='${include help/params/include.deprecated.htm}';
		param.type='boolean';
		param.defaultValue='true';
		param.defaultValue.expr='! hasOption("-nodeprecated")';
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
		param.name='include.tag.since';
		param.title='@since';
		param.description='${include help/params/include.tag.since.htm}';
		param.type='boolean';
		param.defaultValue='true';
		param.defaultValue.expr='! hasOption("-nosince")';
	}
	PARAM={
		param.name='include.tag.version';
		param.title='@version';
		param.description='${include help/params/include.tag.version.htm}';
		param.type='boolean';
		param.defaultValue.expr='hasOption("-version")';
	}
	PARAM={
		param.name='include.tag.author';
		param.title='@author';
		param.description='${include help/params/include.tag.author.htm}';
		param.type='boolean';
		param.defaultValue.expr='hasOption("-author")';
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
		param.defaultValue.expr='v = Vector();

iterate (
  getOptions ("-tag"),
  @(String[]) args,
  FlexQuery (v.addElement (args [0]))
);

v.toArray()';
	}
	PARAM={
		param.name='show';
		param.title='Show';
		param.title.style.bold='true';
		param.description='${include help/params/show.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='show.qualifier';
		param.title='Package Qualifiers';
		param.description='${include help/params/show.qualifier.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("show.qualifier")';
		param.type='boolean';
		param.defaultValue.expr='getOption("-noqualifier")[0] != "all"';
	}
	PARAM={
		param.name='show.qualifier.omit';
		param.title='Omit for Packages';
		param.description='${include help/params/show.qualifier.omit.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
		param.defaultValue='java.*:javax.*';
		param.defaultValue.expr='args = getOption("-noqualifier");

args != null && args[0] != "all"
  ? breakString (args[0].toString(), ":").toArray() 
  : null';
	}
	PARAM={
		param.name='show.linkTitle';
		param.title='Link Titles (Tooltips)';
		param.description='${include help/params/show.linkTitle.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='filter';
		param.title='Filter Classes & Members';
		param.title.style.bold='true';
		param.description='${include help/params/filter.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='filter.byTags';
		param.title='By Tags';
		param.title.style.bold='true';
		param.description='${include help/params/filter.byTags.htm}';
		param.group='true';
	}
	PARAM={
		param.name='filter.byTags.for.packages';
		param.title='For packages';
		param.title.style.italic='true';
		param.description='${include help/params/filter.byTags.for.packages.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
	}
	PARAM={
		param.name='filter.byTags.include';
		param.title='Include';
		param.title.style.bold='true';
		param.description='${include help/params/filter.byTags.include.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='filter.byTags.include.all';
		param.title='classes & members';
		param.description='${include help/params/filter.byTags.include.all.htm}';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.include.classes';
		param.title='classes';
		param.description='${include help/params/filter.byTags.include.classes.htm}';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.include.members';
		param.title='members';
		param.description='${include help/params/filter.byTags.include.members.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.exclude';
		param.title='Exclude';
		param.title.style.bold='true';
		param.description='${include help/params/filter.byTags.exclude.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='filter.byTags.exclude.all';
		param.title='classes & members';
		param.description='${include help/params/filter.byTags.exclude.all.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.exclude.classes';
		param.title='classes';
		param.description='${include help/params/filter.byTags.exclude.classes.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.exclude.members';
		param.title='members';
		param.description='${include help/params/filter.byTags.exclude.members.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns';
		param.title='By Annotations';
		param.title.style.bold='true';
		param.description='${include help/params/filter.byAnns.htm}';
		param.group='true';
	}
	PARAM={
		param.name='filter.byAnns.for';
		param.title='For';
		param.title.style.italic='true';
		param.description='${include help/params/filter.byAnns.for.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='filter.byAnns.for.activeSet';
		param.title='active set only';
		param.title.style.italic='true';
		param.description='${include help/params/filter.byAnns.for.activeSet.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='filter.byAnns.for.packages';
		param.title='packages';
		param.title.style.italic='true';
		param.description='${include help/params/filter.byAnns.for.packages.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
	}
	PARAM={
		param.name='filter.byAnns.include';
		param.title='Include';
		param.title.style.bold='true';
		param.description='${include help/params/filter.byAnns.include.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='filter.byAnns.include.all';
		param.title='classes & members';
		param.description='${include help/params/filter.byAnns.include.all.htm}';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.include.classes';
		param.title='classes';
		param.description='${include help/params/filter.byAnns.include.classes.htm}';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.include.members';
		param.title='members';
		param.description='${include help/params/filter.byAnns.include.members.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.exclude';
		param.title='Exclude';
		param.title.style.bold='true';
		param.description='${include help/params/filter.byAnns.exclude.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='filter.byAnns.exclude.all';
		param.title='classes & members';
		param.description='${include help/params/filter.byAnns.exclude.all.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.exclude.classes';
		param.title='classes';
		param.description='${include help/params/filter.byAnns.exclude.classes.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.exclude.members';
		param.title='members';
		param.description='${include help/params/filter.byAnns.exclude.members.htm}';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.suppressEmptyPackages';
		param.title='Suppress empty packages';
		param.description='${include help/params/filter.suppressEmptyPackages.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='page';
		param.title='Pagination';
		param.title.style.bold='true';
		param.description='${include help/params/page.htm}';
		param.group='true';
	}
	PARAM={
		param.name='page.columns';
		param.title='Generate page columns';
		param.description='${include help/params/page.columns.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='page.start';
		param.title='Start from new page';
		param.title.style.bold='true';
		param.description='${include help/params/page.start.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='page.start.toc';
		param.title='Table Of Contents';
		param.description='${include help/params/page.start.toc.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='page.start.overview';
		param.title='Overview';
		param.description='${include help/params/page.start.overview.htm}';
		param.group='true';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='page.start.overview.allClasses';
		param.title='All Classes Summary';
		param.description='${include help/params/page.start.overview.allClasses.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='page.start.package';
		param.title='Package Overviews';
		param.description='${include help/params/page.start.package.htm}';
		param.type='boolean';
	}
	PARAM={
		param.name='page.start.class';
		param.title='Class Detail';
		param.description='${include help/params/page.start.class.htm}';
		param.type='boolean';
	}
</TEMPLATE_PARAMS>
<STYLES>
	PAR_STYLE={
		style.name='Class Heading';
		style.id='s1';
		text.font.size='26';
		par.level='2';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Class Superheading';
		style.id='s2';
		text.font.size='14';
		text.font.style.bold='true';
		par.margin.bottom='1';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Code';
		style.id='cs1';
		text.font.name='Courier New';
		text.font.size='9';
	}
	CHAR_STYLE={
		style.name='Code Small';
		style.id='cs2';
		text.font.name='Courier New';
		text.font.size='7';
	}
	CHAR_STYLE={
		style.name='Default Paragraph Font';
		style.id='cs3';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Detail Heading';
		style.id='s3';
		text.font.size='16';
		text.font.style.bold='true';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Heading 2';
		style.id='s4';
		text.font.size='15';
		text.font.style.bold='true';
		par.margin.top='15';
		par.margin.bottom='15';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs4';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='List Heading';
		style.id='s5';
		style.local='true';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='1.1';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Member Heading';
		style.id='s6';
		text.font.size='13';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s7';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Overview Heading';
		style.id='s8';
		text.font.size='26';
		par.level='1';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Package Heading';
		style.id='s9';
		text.font.name='Times New Roman';
		text.font.size='26';
		par.level='1';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Package Superheading';
		style.id='s10';
		text.font.name='Times New Roman';
		text.font.size='18';
	}
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs5';
	}
	PAR_STYLE={
		style.name='Summary Heading';
		style.id='s11';
		text.font.size='12';
		text.font.style.bold='true';
		par.level='2';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs6';
		text.font.size='12';
		text.font.style.bold='true';
	}
	PAR_STYLE={
		style.name='Title Heading';
		style.id='s12';
		text.font.name='Times New Roman';
		text.font.size='36';
		par.alignment='Center';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='TOC Heading';
		style.id='s13';
		text.font.size='26';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Times New Roman';
	doc.hlink.style.link='cs4';
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
		COND='getBooleanParam("gen.titlePage")'
		TEMPLATE_FILE='lib/title-page.tpl'
		FMT={
			sec.page.breakAfter='true';
		}
	</TEMPLATE_CALL>
	<FOLDER>
		DESCR='table of contents'
		COND='getBooleanParam("gen.toc") &&
output.format.supportsPagination'
		FMT={
			sec.spacing.before='20';
		}
		<BODY>
			<TEMPLATE_CALL>
				DESCR='start from new page'
				COND='output.format.supportsPagination &&
getBooleanParam("page.start.toc")'
				BREAK_PARENT_BLOCK='when-executed'
				TEMPLATE_FILE='lib/TOC.tpl'
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='otherwise, continue on the current page'
				TEMPLATE_FILE='lib/TOC.tpl'
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='documentation overview'
		COND='getBooleanParam("gen.overview")'
		FMT={
			sec.spacing.before='20';
		}
		<BODY>
			<TEMPLATE_CALL>
				DESCR='start from new page'
				COND='output.format.supportsPagination &&
getBooleanParam("page.start.overview")'
				BREAK_PARENT_BLOCK='when-executed'
				TEMPLATE_FILE='lib/overview.tpl'
				INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
				FMT={
					sec.page.breakBefore='true';
				}
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='otherwise, continue on the current page'
				TEMPLATE_FILE='lib/overview.tpl'
				INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
				FMT={
					sec.page.breakBefore='true';
				}
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
	<ELEMENT_ITER>
		DESCR='iterates by all packages (both directly specified on the Javadoc command line and those containing classes specified separately)'
		TARGET_ET='PackageDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> PackageDoc';
			'* -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc';
		}
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		<BODY>
			<FOLDER>
				DESCR='package overview'
				COND='getBooleanParam("gen.package")
&&
(! getBooleanParam("filter.suppressEmptyPackages")
||
hasChild (
  "ClassDoc", 
  BooleanQuery (
    (getBooleanParam("include.deprecated") || 
     ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
    &&
    ! checkElementsByKey("excluded-classes", contextElement.id)
  )
))'
				FMT={
					sec.spacing.before='20';
				}
				<BODY>
					<TEMPLATE_CALL>
						DESCR='start from new page'
						COND='output.format.supportsPagination &&
getBooleanParam("page.start.package")'
						BREAK_PARENT_BLOCK='when-executed'
						TEMPLATE_FILE='lib/package.tpl'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
						FMT={
							sec.page.breakBefore='true';
						}
					</TEMPLATE_CALL>
					<TEMPLATE_CALL>
						DESCR='otherwise, continue on the current page'
						TEMPLATE_FILE='lib/package.tpl'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
					</TEMPLATE_CALL>
				</BODY>
			</FOLDER>
			<ELEMENT_ITER>
				DESCR='class details
--
iterates by all classes in the package (including inner classes)'
				COND='getBooleanParam("gen.class")'
				TARGET_ET='ClassDoc'
				SCOPE='simple-location-rules'
				RULES={
					'* -> ClassDoc';
				}
				FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
				<BODY>
					<TEMPLATE_CALL>
						DESCR='start from new page'
						COND='output.format.supportsPagination &&
getBooleanParam("page.start.class")'
						BREAK_PARENT_BLOCK='when-executed'
						TEMPLATE_FILE='lib/class.tpl'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
						FMT={
							sec.spacing.before='20';
							sec.page.breakBefore='true';
						}
					</TEMPLATE_CALL>
					<TEMPLATE_CALL>
						DESCR='otherwise, continue on the current page'
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
	<FOLDER>
		DESCR='bottom messages'
		COLLAPSED
		FMT={
			sec.spacing.before='20';
		}
		<BODY>
			<AREA_SEC>
				COND='getStringParam("gen.bottomText").length() > 0'
				<AREA>
					<HR>
					</HR>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								FORMULA='getStringParam("gen.bottomText")'
								FMT={
									txtfl.ehtml.render='true';
								}
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<TEMPLATE_CALL>
				DESCR='about DocFlex/Javadoc'
				COND='! hasParamValue("gen.about", "none")'
				TEMPLATE_FILE='lib/about.tpl'
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
</ROOT>
<STOCK_SECTIONS>
	<TEMPLATE_CALL>
		SS_NAME='Init'
		MATCHING_ET='RootDoc'
		TEMPLATE_FILE='lib/init.tpl'
		OUTPUT_TYPE='document'
	</TEMPLATE_CALL>
</STOCK_SECTIONS>
CHECKSUM='DFuToBFfg6XHjB9ypx9AA3vYSn0lDwgVirjUhNp+b4U'
</DOCFLEX_TEMPLATE>