<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:51:00'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='FramesetTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
DESCR='${include help/FramedDoc_tpl.htm}'
INIT_EXPR='callStockSection("Init")'
TITLE_EXPR='getStringParam("windowTitle")'
HTML_HEAD_EXPR='\'<SCRIPT type="text/javascript">
    targetPage = "" + window.location.search;
    if (targetPage != "" && targetPage != "undefined")
       targetPage = targetPage.substring(1);
    window.onload = function() {
        if (targetPage != "" && targetPage != "undefined")
             top.detail.location = top.targetPage;
    }
</SCRIPT>\''
<TEMPLATE_PARAMS>
	PARAM={
		param.name='$resourceOutputDir';
		param.title='Documentation resources directory';
		param.description='This parameter is used internally. It specifies the absolute pathname of a directory where all commonly used icons are to be stored.
<p>
If this pathname is empty, all resource (icon) files used by a given document will be stored in the local \'doc-files\' directory associated with that document.';
		param.type='string';
		param.defaultValue.expr='output.docFilesDir + "/resources"';
		param.hidden='true';
	}
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
		param.name='gen.overview';
		param.title='Overview';
		param.title.style.bold='true';
		param.description='${include help/params/gen.overview.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.type='boolean';
		param.defaultValue='true';
		param.fixed='true';
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
		param.name='gen.class';
		param.title='Class Detail';
		param.title.style.bold='true';
		param.description='${include help/params/gen.class.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.type='boolean';
		param.defaultValue='true';
		param.fixed='true';
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
		param.name='gen.refs';
		param.title='Cross-Reference Pages';
		param.title.style.bold='true';
		param.description='${include help/params/gen.refs.htm}';
		param.group='true';
		param.group.defaultState='expanded';
	}
	PARAM={
		param.name='gen.refs.allClasses';
		param.title='All Classes Summary';
		param.description='${include help/params/gen.refs.allClasses.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.refs.use';
		param.title='Use (Package/Class)';
		param.description='${include help/params/gen.refs.use.htm}';
		param.type='boolean';
		param.defaultValue.expr='hasOption("-use")';
	}
	PARAM={
		param.name='gen.refs.tree';
		param.title='Tree (Class Hierarchy)';
		param.description='${include help/params/gen.refs.tree.htm}';
		param.type='boolean';
		param.defaultValue.expr='! hasOption("-notree")';
	}
	PARAM={
		param.name='gen.refs.deprecatedList';
		param.title='Deprecated List';
		param.description='${include help/params/gen.refs.deprecatedList.htm}';
		param.type='boolean';
		param.defaultValue.expr='! hasOption("-nodeprecatedlist")';
	}
	PARAM={
		param.name='gen.refs.index';
		param.title='Index';
		param.description='${include help/params/gen.refs.index.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.group.enablingExpr='getBooleanParam("gen.refs.index")';
		param.type='boolean';
		param.defaultValue.expr='! hasOption("-noindex")';
	}
	PARAM={
		param.name='gen.refs.index.split';
		param.title='Split';
		param.description='${include help/params/gen.refs.index.split.htm}';
		param.type='boolean';
		param.defaultValue.expr='hasOption("-splitindex")';
	}
	PARAM={
		param.name='gen.refs.serializedForm';
		param.title='Serialized Form';
		param.description='${include help/params/gen.refs.serializedForm.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.refs.constantValues';
		param.title='Constant Field Values';
		param.description='${include help/params/gen.refs.constantValues.htm}';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.help';
		param.title='Help';
		param.description='${include help/params/gen.help.htm}';
		param.type='boolean';
		param.defaultValue.expr='! hasOption("-nohelp")';
	}
	PARAM={
		param.name='gen.navbar';
		param.title='Navigation Bar';
		param.title.style.bold='true';
		param.description='${include help/params/gen.navbar.htm}';
		param.group='true';
		param.group.defaultState='expanded';
		param.type='boolean';
		param.defaultValue='true';
		param.defaultValue.expr='! hasOption("-nonavbar")';
	}
	PARAM={
		param.name='gen.navbar.headerText';
		param.title='Header Text';
		param.description='${include help/params/gen.navbar.headerText.htm}';
		param.type='text';
		param.defaultValue.expr='getOption("-header")[0]';
	}
	PARAM={
		param.name='gen.navbar.footerText';
		param.title='Footer Text';
		param.description='${include help/params/gen.navbar.footerText.htm}';
		param.enablingExpr='getBooleanParam("gen.navbar")';
		param.type='text';
		param.defaultValue.expr='getOption("-footer")[0]';
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
		param.featureType='pro';
		param.type='enum';
		param.enum.values='full;short;none';
		param.defaultValue='short';
		param.defaultValue.limited='full';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='filter.byAnns.for.packages';
		param.title='packages';
		param.title.style.italic='true';
		param.description='${include help/params/filter.byAnns.for.packages.htm}';
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
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
		param.featureType='pro';
		param.type='boolean';
		param.defaultValue='true';
	}
</TEMPLATE_PARAMS>
<STYLES>
	PAR_STYLE={
		style.name='Class Heading';
		style.id='s1';
		text.font.size='15';
		text.font.style.bold='true';
		par.margin.bottom='15';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Class Superheading';
		style.id='s2';
		text.font.size='8.5';
		text.font.style.bold='true';
		par.margin.top='14';
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
		text.font.size='15';
		text.font.style.bold='true';
	}
	PAR_STYLE={
		style.name='Frame Heading';
		style.id='s4';
		text.font.name='Arial';
		text.font.size='9';
		text.font.style.bold='true';
		par.margin.top='7';
		par.margin.bottom='3';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Frame Item';
		style.id='s5';
		text.font.name='Arial';
		text.font.size='9';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Frame Title';
		style.id='s6';
		text.font.name='Arial';
		text.font.size='9.5';
		text.font.style.bold='true';
		par.margin.bottom='7';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Heading 1';
		style.id='s7';
		text.font.size='14.5';
		text.font.style.bold='true';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Heading 2';
		style.id='s8';
		text.font.size='14.5';
		text.font.style.bold='true';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Heading 3';
		style.id='s9';
		text.font.size='12';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs4';
	}
	PAR_STYLE={
		style.name='List Heading';
		style.id='s10';
		style.local='true';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='1.1';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Member Heading';
		style.id='s11';
		text.font.size='11.5';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='NavBar';
		style.id='cs5';
		text.font.name='Arial';
		text.color.foreground='#000000';
	}
	CHAR_STYLE={
		style.name='NavBar Highlighted';
		style.id='cs6';
		text.font.name='Arial';
		text.color.foreground='#FFFFFF';
	}
	CHAR_STYLE={
		style.name='NavBar Hyperlink';
		style.id='cs7';
		text.font.style.bold='true';
		text.color.foreground='#000000';
	}
	CHAR_STYLE={
		style.name='NavBar Small';
		style.id='cs8';
		text.font.name='Arial';
		text.font.size='6.5';
	}
	CHAR_STYLE={
		style.name='NavBar Small Hyperlink';
		style.id='cs9';
		text.font.style.bold='true';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s12';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Summary Heading';
		style.id='s13';
		text.font.size='15';
		text.font.style.bold='true';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs10';
		text.font.size='15';
		text.font.style.bold='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.hlink.style.link='cs4';
}
<FRAMESET>
	LAYOUT='columns'
	<FRAMESET>
		PERCENT_SIZE=20
		LAYOUT='rows'
		<FRAME>
			COND='documentByTemplate (
  "overview-frame"
) != null'
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
		SOURCE_EXPR='documentByTemplate (
  "overview;package;class"
)'
	</FRAME>
</FRAMESET>
<ROOT>
	<TEMPLATE_CALL>
		DESCR='generates the overview file for all documentation'
		TEMPLATE_FILE='lib/overview.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		FILE_NAME_EXPR='"overview-summary"'
		ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
		SUPPRESS_EMPTY_FILE
		INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
	</TEMPLATE_CALL>
	<TEMPLATE_CALL>
		DESCR='generates the overview summary file for all documentation'
		TEMPLATE_FILE='lib/overview-frame.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		SUPPRESS_EMPTY_FILE
	</TEMPLATE_CALL>
	<TEMPLATE_CALL>
		DESCR='generates the summary file for all classes'
		COND='getBooleanParam("gen.refs.allClasses")'
		TEMPLATE_FILE='lib/class-summary.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		FILE_NAME_EXPR='"all-classes-summary"'
		ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
		INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
	</TEMPLATE_CALL>
	<TEMPLATE_CALL>
		DESCR='generates the all classes list'
		TEMPLATE_FILE='lib/all-classes-frame.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
	</TEMPLATE_CALL>
	<ELEMENT_ITER>
		DESCR='iterates by all packages (both directly specified on the Javadoc command line and those containing classes specified separately)'
		TARGET_ET='PackageDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> PackageDoc';
			'* -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc';
		}
		FILTER='! getBooleanParam("filter.suppressEmptyPackages")
||
hasChild (
  "ClassDoc", 
  BooleanQuery (
    (getBooleanParam("include.deprecated") || 
     ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
    &&
    ! checkElementsByKey("excluded-classes", contextElement.id)
  )
)'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		<BODY>
			<TEMPLATE_CALL>
				DESCR='generates the overview file for the package'
				TEMPLATE_FILE='lib/package.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='packageName = getAttrStringValue("name");
output.docFilesDir + (packageName != "" ? packageName.replace(".", "/") : "")'
				FILE_NAME_EXPR='"package-summary"'
				ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
				INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='generates the summary file for the package'
				TEMPLATE_FILE='lib/package-frame.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='packageName = getAttrStringValue("name");
output.docFilesDir + (packageName != "" ? packageName.replace(".", "/") : "")'
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='generates hierarchy tree for the package'
				COND='getBooleanParam("gen.refs.tree")'
				TEMPLATE_FILE='lib/class-tree.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='packageName = getAttrStringValue("name");
output.docFilesDir + (packageName != "" ? packageName.replace(".", "/") : "")'
				FILE_NAME_EXPR='"package-tree"'
				ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
				INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				COND='getBooleanParam("gen.refs.use")'
				TEMPLATE_FILE='lib/package-use.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='packageName = getAttrStringValue("name");
output.docFilesDir + (packageName != "" ? packageName.replace(".", "/") : "")'
				FILE_NAME_EXPR='"package-use"'
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
				FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
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
					<TEMPLATE_CALL>
						COND='getBooleanParam("gen.refs.use")'
						TEMPLATE_FILE='lib/class-use.tpl'
						OUTPUT_TYPE='document'
						OUTPUT_DIR_EXPR='packageName = iterator.contextElement.getAttrStringValue("name");

output.docFilesDir +
(packageName != "" ? packageName.replace(".", "/")+"/" : "") +
"class-use/"'
						FILE_NAME_EXPR='getAttrStringValue("name")'
						ASSOCIATED_FILES_DIR_EXPR='"../doc-files"'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
					</TEMPLATE_CALL>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
	</ELEMENT_ITER>
	<TEMPLATE_CALL>
		DESCR='generates hierarchy tree for all packages'
		COND='getBooleanParam("gen.refs.tree")'
		TEMPLATE_FILE='lib/class-tree.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		FILE_NAME_EXPR='"overview-tree"'
		ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
		SUPPRESS_EMPTY_FILE
		INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
	</TEMPLATE_CALL>
	<FOLDER>
		DESCR='generates index'
		COND='getBooleanParam("gen.refs.index")'
		INIT_EXPR='includeDeprecated = getBooleanParam("include.deprecated");

classFilter = BooleanQuery (
  isIncluded()
  &&
  (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
  &&
  ! checkElementsByKey("excluded-classes", contextElement.id)
);

packageFilter = BooleanQuery (
  ! getBooleanParam("filter.suppressEmptyPackages") || hasChild ("ClassDoc", classFilter)
);

memberFilter = BooleanQuery (
  (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
  &&
  ! checkElementsByKey("excluded-members", contextElement.id)
);

prepareElementMap (
  "index",
  findElementsByLRules (
    Array (
      LocationRule (\'RootDoc -> PackageDoc [execBooleanQuery (packageFilter)]\', false),
      LocationRule (\'RootDoc -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc [execBooleanQuery (packageFilter)]\', false),
      LocationRule (\'RootDoc -> classes^::ClassDoc [execBooleanQuery (classFilter)]\', false),
      LocationRule (\'ClassDoc [resolveElementType(); true] -> MemberDoc [execBooleanQuery (memberFilter)]\', true),
      LocationRule (\'ClassDoc [getAttrBooleanValue("isEnum")] -> enumConstants^::FieldDoc [execBooleanQuery (memberFilter)]\', true),
      LocationRule (\'ClassDoc -> {findElementsByKey ("adopted-members", contextElement.id)}::#CUSTOM\', true)
    ),
    "PackageDoc | ClassDoc | MemberDoc | #CUSTOM"
  ),
  FlexQuery (getAttrStringValue("name").charAt(0).toUpperCase())
)'
		<BODY>
			<ELEMENT_ITER>
				DESCR='split index alphabetically into multiple files'
				COND='getBooleanParam("gen.refs.index.split")'
				BREAK_PARENT_BLOCK='when-executed'
				TARGET_ET='#CUSTOM'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='toCustomElements (getElementMapKeys ("index"))'
				SORTING='by-expr'
				SORTING_KEY={expr='/* this sorting key places \'_\' at the end of the list */

letter = contextElement.value.toString();
letter != "_" ? "!" + letter : letter',ascending}
				<BODY>
					<TEMPLATE_CALL>
						TEMPLATE_FILE='lib/index-letter.tpl'
						OUTPUT_TYPE='document'
						OUTPUT_DIR_EXPR='output.docFilesDir + "index-files"'
						FILE_NAME_EXPR='"index-" + iterator.itemNo'
						ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
					</TEMPLATE_CALL>
				</BODY>
			</ELEMENT_ITER>
			<TEMPLATE_CALL>
				DESCR='alternatively, generate a single index file'
				TEMPLATE_FILE='lib/index-all.tpl'
				OUTPUT_TYPE='document'
				OUTPUT_DIR_EXPR='output.docFilesDir'
				ASSOCIATED_FILES_DIR_EXPR='"doc-files"'
				SUPPRESS_EMPTY_FILE
				INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
	<TEMPLATE_CALL>
		COND='getBooleanParam("gen.refs.deprecatedList") &&
getBooleanParam("include.deprecated")'
		TEMPLATE_FILE='lib/deprecated-list.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		SUPPRESS_EMPTY_FILE
	</TEMPLATE_CALL>
	<TEMPLATE_CALL>
		COND='getBooleanParam("gen.refs.constantValues")'
		TEMPLATE_FILE='lib/constant-values.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		SUPPRESS_EMPTY_FILE
	</TEMPLATE_CALL>
	<TEMPLATE_CALL>
		COND='getBooleanParam("gen.refs.serializedForm")'
		TEMPLATE_FILE='lib/serialized-form.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		SUPPRESS_EMPTY_FILE
	</TEMPLATE_CALL>
	<TEMPLATE_CALL>
		COND='getBooleanParam("gen.help")'
		TEMPLATE_FILE='lib/help-doc.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		SUPPRESS_EMPTY_FILE
	</TEMPLATE_CALL>
	<TEMPLATE_CALL>
		DESCR='generates \'package-list\' plain text file'
		TEMPLATE_FILE='lib/package-list.tpl'
		OUTPUT_TYPE='document'
		OUTPUT_DIR_EXPR='output.docFilesDir'
		PLAIN_TEXT_FILE
	</TEMPLATE_CALL>
</ROOT>
<STOCK_SECTIONS>
	<TEMPLATE_CALL>
		SS_NAME='Init'
		MATCHING_ET='RootDoc'
		TEMPLATE_FILE='lib/init.tpl'
		OUTPUT_TYPE='document'
	</TEMPLATE_CALL>
</STOCK_SECTIONS>
CHECKSUM='ulUvBIbCmYt56buBoowzJr?xrl?NqR+EuM6xYgP75SY'
</DOCFLEX_TEMPLATE>