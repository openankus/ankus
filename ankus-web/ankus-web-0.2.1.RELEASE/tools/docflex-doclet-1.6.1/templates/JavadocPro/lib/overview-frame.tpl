<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:50:00'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
TITLE_EXPR='title = "Overview List";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='windowTitle';
		param.title='Window Title';
		param.type='string';
	}
	PARAM={
		param.name='gen';
		param.title='Generate';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='gen.navbar.headerText';
		param.title='Header Text';
		param.type='text';
	}
	PARAM={
		param.name='include';
		param.title='Include';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='include.deprecated';
		param.title='Deprecated API';
		param.type='boolean';
	}
	PARAM={
		param.name='filter';
		param.title='Filter Classes & Members';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.suppressEmptyPackages';
		param.title='Suppress empty packages';
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
		par.margin.bottom='5';
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
}
<ROOT>
	<ELEMENT_ITER>
		DESCR='iterates by all packages (both specified directly and those which contain classes directly specified on the Javadoc command line)'
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
			<AREA_SEC>
				COND='iterator.numItems > 1'
				FMT={
					par.style='s2';
					par.padding.top='1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								FORMULA='(name = getAttrValue("name")) != "" ? name : "<unnamed>"'
								<DOC_HLINK>
									TARGET_FRAME_EXPR='"summary"'
									HKEYS={
										'contextElement.id';
										'"summary"';
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
				FMT={
					par.style='s3';
				}
				<AREA>
					<CTRL_GROUP>
						FMT={
							txtfl.delimiter.type='none';
						}
						<CTRLS>
							<DATA_CTRL>
								FORMULA='getStringParam("gen.navbar.headerText")'
								FMT={
									text.option.nbsps='true';
									txtfl.ehtml.render='true';
								}
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					text.option.nbsps='true';
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='All Classes'
								<URL_HLINK>
									TARGET_FRAME_EXPR='"summary"'
									URL_EXPR='documentByTemplate("all-classes-frame")'
								</URL_HLINK>
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					par.style='s1';
					par.margin.bottom='2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Packages'
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
</ROOT>
CHECKSUM='uwoqqOG1kbh++k2ZGBPW2GMrDt7LHBie56sM6ugB60k'
</DOCFLEX_TEMPLATE>