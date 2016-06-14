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
FINISH_EXPR='/* When the HTML output is being generated, copy all files from the local "doc-files" 
subdir contained in the source directory (along with "overview.html" file) to the 
destination Associated Files directory (to have all images inserted in description 
with <IMG> tags get in the result documentation) */

output.generating && output.format.name == "HTML" ? 
  copyFiles (output.inputFilesPath + "doc-files", output.docFilesDir)'
TITLE_EXPR='title = "Overview";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "Overview";

((parentTitle = getStringParam("windowTitle").trim()) != null)
  ? title = title + " (" + parentTitle + ")";

\'<SCRIPT type="text/javascript">
    window.onload = function() {
        if (location.href.indexOf(\\\'is-external=true\\\') == -1)
            parent.document.title="\' + encodeJScriptString (title) + \'";
    }
</SCRIPT>\''
<TEMPLATE_PARAMS>
	PARAM={
		param.name='windowTitle';
		param.title='Window Title';
		param.type='string';
	}
	PARAM={
		param.name='docTitle';
		param.title='Documentation Title';
		param.type='text';
	}
	PARAM={
		param.name='gen';
		param.title='Generate';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='gen.titlePage';
		param.title='Title Page';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.overview';
		param.title='Overview';
		param.group='true';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.overview.packages';
		param.title='Package Summary';
		param.group='true';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='gen.overview.packages.groups';
		param.title='Package Groups';
		param.type='string';
		param.trimSpaces='true';
		param.list='true';
		param.list.recognizeEscapes='true';
	}
	PARAM={
		param.name='gen.overview.allClasses';
		param.title='All Classes Summary';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.package';
		param.title='Package';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.navbar';
		param.title='Navigation Bar';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.bottomText';
		param.title='Bottom Text';
		param.type='text';
	}
	PARAM={
		param.name='gen.about';
		param.title='About (footer)';
		param.type='enum';
		param.enum.values='full;short;none';
	}
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
	PARAM={
		param.name='page.start.overview.allClasses';
		param.title='Start from new page: All Classes Summary';
		param.type='boolean';
	}
</TEMPLATE_PARAMS>
<STYLES>
	CHAR_STYLE={
		style.name='Code';
		style.id='cs1';
		text.font.name='Courier New';
		text.font.size='9';
	}
	CHAR_STYLE={
		style.name='Default Paragraph Font';
		style.id='cs2';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Heading 1';
		style.id='s1';
		text.font.size='14.5';
		text.font.style.bold='true';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs3';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s2';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Overview Heading';
		style.id='s3';
		text.font.size='15';
		text.font.style.bold='true';
		par.level='1';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs4';
		text.font.size='9';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs5';
		text.font.size='14';
		text.font.style.bold='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs3';
}
<HTARGET>
	HKEYS={
		'"overview"';
	}
</HTARGET>
<PAGE_HEADER>
	<AREA_SEC>
		FMT={
			text.font.style.italic='true';
			table.cell.padding.both='0';
			table.border.style='none';
			table.border.bottom.style='solid';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.border.bottom.style='solid';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Overview'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</PAGE_HEADER>
<ROOT>
	<FOLDER>
		DESCR='CASE OF SEPARATE FILE OUTPUT (\'overview-summary.html\')'
		COND='output.type == "document"'
		INIT_EXPR='setVar (
  "has_overview_description",
  checkStockSectionOutput("Overview Description")
)'
		BREAK_PARENT_BLOCK='when-executed'
		<BODY>
			<AREA_SEC>
				DESCR='Description Summary'
				COND='getBooleanVar ("has_overview_description")'
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<SS_CALL_CTRL>
								SS_NAME='Comment_Summary'
							</SS_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							par.margin.top='14';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='See:'
								FMT={
									text.font.style.bold='true';
								}
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							par.margin.left='30';
							par.margin.bottom='1.7';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Description'
								FMT={
									text.font.style.bold='true';
								}
								<DOC_HLINK>
									HKEYS={
										'contextElement.id';
										'"description"';
									}
								</DOC_HLINK>
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<SS_CALL>
				SS_NAME='Package Summary'
				PARAMS_EXPR='Array (getBooleanVar ("has_overview_description"))'
				FMT={
					sec.spacing.before='14';
				}
			</SS_CALL>
			<SS_CALL>
				SS_NAME='Overview Description'
			</SS_CALL>
		</BODY>
		<HEADER>
			<TEMPLATE_CALL>
				DESCR='Navigation Bar'
				COND='getBooleanParam("gen.navbar")'
				TEMPLATE_FILE='navbar.tpl'
				PASSED_PARAMS={
					'$type','"overview"';
					'$location','"header"';
				}
			</TEMPLATE_CALL>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.style='s1';
							par.alignment='Center';
						}
						<CTRLS>
							<DATA_CTRL>
								FORMULA='getStringParam("docTitle")'
								FMT={
									text.font.style.bold='true';
									txtfl.ehtml.render='true';
								}
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
		<FOOTER>
			DESCR='Navigation Bar & bottom message'
			COLLAPSED
			<AREA_SEC>
				<AREA>
					<SPACER>
						FMT={
							spacer.height='14';
						}
					</SPACER>
				</AREA>
			</AREA_SEC>
			<TEMPLATE_CALL>
				DESCR='Navigation Bar'
				COND='getBooleanParam("gen.navbar")'
				TEMPLATE_FILE='navbar.tpl'
				PASSED_PARAMS={
					'$type','"overview"';
					'$location','"footer"';
				}
			</TEMPLATE_CALL>
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
				TEMPLATE_FILE='about.tpl'
			</TEMPLATE_CALL>
		</FOOTER>
	</FOLDER>
	<FOLDER>
		DESCR='CASE OF FRAGMENT OF SINGLE FILE DOCUMENTATION'
		<BODY>
			<SS_CALL>
				SS_NAME='Overview Description'
			</SS_CALL>
			<SS_CALL>
				COND='getBooleanParam("gen.overview.packages")'
				SS_NAME='Package Summary'
				PARAMS_EXPR='Array (true)'
				FMT={
					sec.spacing.before='14';
				}
			</SS_CALL>
			<FOLDER>
				DESCR='summary of all classes'
				COND='getBooleanParam("gen.overview.allClasses")'
				FMT={
					sec.spacing.before='14';
				}
				<BODY>
					<TEMPLATE_CALL>
						DESCR='start from new page'
						COND='getBooleanParam("page.start.overview.allClasses")'
						BREAK_PARENT_BLOCK='when-executed'
						TEMPLATE_FILE='class-summary.tpl'
						PASSED_PARAMS={
							'$page.heading.right','"Overview"';
						}
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
						FMT={
							sec.page.breakBefore='true';
						}
					</TEMPLATE_CALL>
					<TEMPLATE_CALL>
						DESCR='otherwise, continue on the same page'
						TEMPLATE_FILE='class-summary.tpl'
						PASSED_PARAMS={
							'$page.heading.right','"Overview"';
						}
						INPUT_FILES_PATH_EXPR='findChild("SourcePosition").getAttrStringValue("fileDir")'
					</TEMPLATE_CALL>
				</BODY>
			</FOLDER>
		</BODY>
		<HEADER>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.style='s3';
							par.alignment='Center';
						}
						<CTRLS>
							<DATA_CTRL>
								FORMULA='getBooleanParam("gen.titlePage") ? 
  "Overview" : getStringParam("docTitle")'
								FMT={
									text.font.style.bold='true';
									txtfl.ehtml.render='true';
								}
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</FOLDER>
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
		DESCR='generates the summary description'
		MATCHING_ET='Doc'
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
	<FOLDER>
		SS_NAME='Overview Description'
		DESCR='Overview Description & Tags'
		<HTARGET>
			HKEYS={
				'contextElement.id';
				'"description"';
			}
			NAME_EXPR='"overview_description"'
		</HTARGET>
		<BODY>
			<SS_CALL>
				SS_NAME='Comment'
				FMT={
					sec.spacing.before='14.2';
				}
			</SS_CALL>
			<ELEMENT_ITER>
				DESCR='tag documentation'
				COLLAPSED
				STEP_EXPR='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

setVar ("tagTitle", tagInfo.getAttrValue ("title"));'
				TARGET_ET='Tag'
				SCOPE='simple-location-rules'
				RULES={
					'* -> Tag';
				}
				FILTER='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

tagInfo != null
&&
(tagInfo.hasAttr ("all")
  ? tagInfo.getAttrBooleanValue ("all")
  : tagInfo.getAttrBooleanValue ("overview"))'
				SORTING='by-expr'
				SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
				FMT={
					sec.spacing.before='14';
				}
				<BODY>
					<ELEMENT_ITER>
						DESCR='@see'
						COND='hasAttrValue ("kind", "@see")'
						CONTEXT_ELEMENT_EXPR='rootElement'
						MATCHING_ET='RootDoc'
						BREAK_PARENT_BLOCK='when-executed'
						TARGET_ET='SeeTag'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> seeTags^::SeeTag';
						}
						FMT={
							sec.outputStyle='list';
							list.type='delimited';
							list.margin.block='true';
						}
						<BODY>
							<TEMPLATE_CALL>
								BREAK_PARENT_BLOCK='when-output'
								TEMPLATE_FILE='see-link.tpl'
								FMT={
									text.style='cs1';
								}
							</TEMPLATE_CALL>
							<SS_CALL>
								DESCR='this is executed when the tag looks like: @see "text"'
								SS_NAME='Comment'
							</SS_CALL>
						</BODY>
						<HEADER>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
											par.page.keepWithNext='true';
										}
										<CTRLS>
											<DATA_CTRL>
												FORMULA='getVar("tagTitle")'
												FMT={
													text.font.style.bold='true';
												}
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='any other tag'
						COLLAPSED
						ALWAYS_PROC_HDRFTR
						TARGET_ET='Tag'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByIds (
  rootElement.tags (getAttrStringValue("kind"))
)'
						FMT={
							sec.outputStyle='list';
							list.type='delimited';
							list.margin.block='true';
						}
						<BODY>
							<SS_CALL>
								SS_NAME='Comment'
								FMT={
									sec.indent.block='true';
								}
							</SS_CALL>
						</BODY>
						<HEADER>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
											par.page.keepWithNext='true';
										}
										<CTRLS>
											<DATA_CTRL>
												FORMULA='getVar("tagTitle")'
												FMT={
													text.font.style.bold='true';
												}
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Package Summary'
		DESCR='param: allow single package; \'false\' indicates that a summary with the only package should be suppressed'
		MATCHING_ET='RootDoc'
		INIT_EXPR='groupDefs = Vector();

iterate (
  getArrayParam("gen.overview.packages.groups"),
  @(String) groupSpec,
  FlexQuery ({

    ((index = groupSpec.indexOf ("::")) >= 0) ?
    {
      patternSpec = groupSpec.substring(0, index).trim();
      groupTitle = groupSpec.substring(index + 2).trim();

      patternSpec.length() > 0 && groupTitle.length() > 0 ?
      {
        groupDefs.addElement (CustomElement (null,
          Array (
            Attr ("packagePatterns", breakString (patternSpec, ":").toArray()),
            Attr ("groupTitle", groupTitle)
          )
        ));
      }
    };
  })
);

groupDefs.size() > 0 ?
  thisContext.setVar ("groupDefs", groupDefs.toArray());'
		<BODY>
			<ELEMENT_ITER>
				DESCR='separate package summary into groups
(see "Processing | Sorting/Grouping" -> "Sorting" and "Grouping" tabs)'
				COND='thisContext.checkVar ("groupDefs")'
				BREAK_PARENT_BLOCK='when-executed'
				TARGET_ET='#CUSTOM'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> PackageDoc';
					'* -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc';
					'PackageDoc[! getBooleanParam("filter.suppressEmptyPackages")
||
hasChild (
  "ClassDoc", 
  BooleanQuery (
    (getBooleanParam("include.deprecated") || 
     ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
    &&
    ! checkElementsByKey("excluded-classes", contextElement.id)
  )
)] -> {package = contextElement;
packageName = getAttrStringValue("name");

groupDefs = thisContext.getVar ("groupDefs").toArray();

index = search (
  groupDefs,
  @(GOMElement) groupDef,
  BooleanQuery (
    matchQualifiedName (packageName, groupDef.getAttrValue ("packagePatterns").toArray())
  )
);

Enum (
  CustomElement (
    package,
    Attr ("groupNo", (index >= 0 ? index : groupDefs.length()))
  )
)}::#CUSTOM',recursive;
				}
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrIntValue ("groupNo")',ascending}
				GROUPING_KEY_EXPR='getAttrIntValue ("groupNo")'
				<BODY>
					<TEMPLATE_CALL>
						COND='iterator.groupSize > 1 || iterator.numItems > 1 ||
stockSection.param.toBoolean()'
						TEMPLATE_FILE='package-summary.tpl'
						PASSED_PARAMS={
							'$package.summary.vector','packages = Vector();

iterate (
  iterator.groupElements,
  @(GOMElement) el,
  FlexQuery (packages.addElement (el.value))
);

packages';
							'$package.summary.title','groupNo = getAttrIntValue ("groupNo");
groupDefs = thisContext.getVar ("groupDefs").toArray();

groupNo < groupDefs.length() ?
  groupDefs [groupNo].toElement().getAttrValue ("groupTitle")
  : "Other Packages"';
							'$page.heading.right','"Overview"';
						}
						FMT={
							sec.spacing.after='18';
						}
					</TEMPLATE_CALL>
				</BODY>
			</ELEMENT_ITER>
			<TEMPLATE_CALL>
				DESCR='package summary without groups (default)'
				TEMPLATE_FILE='package-summary.tpl'
				PASSED_PARAMS={
					'$package.summary.vector','packages = findElementsByLRules (
  Array (
    LocationRule (\'* -> PackageDoc\', false),
    LocationRule (\'* -> specifiedClasses^::ClassDoc / containingPackage^::PackageDoc\', false)
  ),
  "PackageDoc",
  BooleanQuery (
    ! getBooleanParam("filter.suppressEmptyPackages")
    ||
    hasChild (
      "ClassDoc", 
      BooleanQuery (
        (getBooleanParam("include.deprecated") || 
         ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
        &&
        ! checkElementsByKey("excluded-classes", contextElement.id)
      )
    )
  )
).toVector();

packages.size() > 1 || stockSection.param.toBoolean() ? packages : null';
					'$package.summary.title','"Package Summary"';
					'$page.heading.right','"Overview"';
				}
				FMT={
					sec.spacing.after='18';
				}
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
</STOCK_SECTIONS>
CHECKSUM='w4G?2uIbAEH0f3fd4KYGMqu3bJO0HBn6894mj1Xe+xA'
</DOCFLEX_TEMPLATE>