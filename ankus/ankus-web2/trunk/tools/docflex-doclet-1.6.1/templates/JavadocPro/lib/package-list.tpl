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
<TEMPLATE_PARAMS>
	PARAM={
		param.name='include';
		param.title='Include';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='include.deprecated';
		param.title='deprecated API';
		param.description='Controls whether to generate documentation for  any deprecated API.';
		param.type='boolean';
		param.defaultValue='true';
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
}
<ROOT>
	<ELEMENT_ITER>
		DESCR='iterates by all packages containing classes to be documented'
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
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</ELEMENT_ITER>
</ROOT>
CHECKSUM='R3P5LUv2GZz7CxXaTpVCTYzSWq6m9oUTHhcsMuKJSjo'
</DOCFLEX_TEMPLATE>