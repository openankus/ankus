<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-07-26 02:40:30'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='PackageDoc'
TITLE_EXPR='title = "Uses of Package " + getAttrValue("name");

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "Uses of Package " + getAttrValue("name");

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
		param.name='gen';
		param.title='Generate';
		param.title.style.bold='true';
		param.group='true';
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
</TEMPLATE_PARAMS>
<STYLES>
	CHAR_STYLE={
		style.name='Default Paragraph Font';
		style.id='cs1';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Heading 2';
		style.id='s1';
		text.font.size='15';
		text.font.style.bold='true';
		par.margin.top='15';
		par.margin.bottom='15';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs2';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s2';
		style.default='true';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs3';
		text.font.size='14';
		text.font.style.bold='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.hlink.style.link='cs2';
}
<HTARGET>
	HKEYS={
		'contextElement.id';
		'"use"';
	}
</HTARGET>
<ROOT>
	<TEMPLATE_CALL>
		DESCR='Navigation Bar'
		COND='output.type == "document" && getBooleanParam("gen.navbar")'
		TEMPLATE_FILE='navbar.tpl'
		PASSED_PARAMS={
			'$type','"use"';
			'$location','"header"';
		}
	</TEMPLATE_CALL>
	<AREA_SEC>
		FMT={
			par.style='s1';
			par.alignment='Center';
		}
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Uses of Package'
					</TEXT_CTRL>
					<DELIMITER>
						FMT={
							txtfl.delimiter.type='nl';
						}
					</DELIMITER>
					<DATA_CTRL>
						ATTR='name'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<ELEMENT_ITER>
		DESCR='list of packages that use this package'
		TARGET_ET='PackageDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> ClassDoc[(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)]/{findElementsByKey ("class-use-packages", contextElement.id)}::PackageDoc';
		}
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='table';
			sec.spacing.after='20';
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
									ctrl.size.width='39';
									ctrl.size.height='17.3';
									tcell.sizing='Minimal';
									text.font.style.bold='true';
								}
								<DOC_HLINK>
									HKEYS={
										'"classes-used-by-package"';
										'rootElement.id';
										'contextElement.id';
									}
								</DOC_HLINK>
							</DATA_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Comment_Summary (Package)'
								FMT={
									ctrl.size.width='460.5';
									ctrl.size.height='17.3';
								}
							</SS_CALL_CTRL>
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
							<PANEL>
								FMT={
									ctrl.size.width='499.5';
									ctrl.size.height='42.8';
									text.style='cs3';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Packages that use'
											</TEXT_CTRL>
											<DATA_CTRL>
												ATTR='name'
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
							</PANEL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		DESCR='for all classes in the given package and all packages
where those classes are use, produce pairs:
{ package, class }
Those pairs are represented by #CUSTOM elements with "package", "class" attributes.

Sort those pairs by package/class names (see "Processing | Sorting/Grouping | Sorting" tab)
and
break them into groups by package names (see "Processing | Sorting/Grouping | Grouping" tab).

Iterate by the produced groups (that is by packages).'
		TARGET_ET='#CUSTOM'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> ClassDoc[(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)]/{convertEnum (
  findElementsByKey ("class-use-packages", contextElement.id),
  @package,
  null,
  FlexQuery (
    CustomElement (
      null,
      Array (
        Attr ("package", package),
        Attr ("class", contextElement)
      )
    )
  )
)}::#CUSTOM';
		}
		SORTING='by-compound-key'
		SORTING_KEY={
			{expr='getAttrValue("package").toElement().getAttrStringValue ("name")',ascending,case_sensitive};
			{expr='getAttrValue("class").toElement().getAttrStringValue ("name")',ascending};
		}
		GROUPING_KEY_EXPR='getAttrValue("package").toElement().getAttrStringValue ("name")'
		<BODY>
			<ELEMENT_ITER>
				DESCR='iterate by classes used in the current package'
				TARGET_ET='#CUSTOM'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='parentIterator.groupElements'
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='getAttrValue("class").toElement().getAttrValue("name")'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'"uses-of-class-in-package"';
																'getAttrValue("class").toElement().id';
																'getAttrValue("package").toElement().id';
															}
														</DOC_HLINK>
													</DATA_CTRL>
												</CTRLS>
											</CTRL_GROUP>
											<CTRL_GROUP>
												<CTRLS>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='nbtxt';
															txtfl.delimiter.text='          ';
															txtfl.delimiter.beforeOutput='true';
														}
													</DELIMITER>
													<SS_CALL_CTRL>
														SS_NAME='Comment_Summary'
														PASSED_ELEMENT_EXPR='getAttrValue("class").toElement()'
														PASSED_ELEMENT_MATCHING_ET='ClassDoc'
													</SS_CALL_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</PANEL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
				<HEADER>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='getAttrValue("package").toElement()'
						MATCHING_ET='PackageDoc'
						<HTARGET>
							HKEYS={
								'"classes-used-by-package"';
								'rootElement.id';
								'contextElement.id';
							}
							NAME_EXPR='getAttrStringValue("name")'
						</HTARGET>
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.bkgr.color='#CCCCFF';
								}
								<CTRLS>
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='42.8';
											text.style='cs3';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Classes in'
													</TEXT_CTRL>
													<DATA_CTRL>
														FORMULA='rootElement.getAttrValue("name")'
														<DOC_HLINK>
															HKEYS={
																'rootElement.id';
																'"detail"';
															}
														</DOC_HLINK>
													</DATA_CTRL>
													<TEXT_CTRL>
														TEXT='used by'
													</TEXT_CTRL>
													<DATA_CTRL>
														ATTR='name'
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
									</PANEL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
		</BODY>
		<ELSE>
			DESCR='No usage of <package>'
			COLLAPSED
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='No usage of'
							</TEXT_CTRL>
							<DATA_CTRL>
								ATTR='name'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</ELSE>
	</ELEMENT_ITER>
	<FOLDER>
		DESCR='Navigation Bar & bottom message'
		COND='output.type == "document"'
		COLLAPSED
		<BODY>
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
					'$type','"use"';
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
		</BODY>
	</FOLDER>
</ROOT>
<STOCK_SECTIONS>
	<ELEMENT_ITER>
		SS_NAME='Comment'
		DESCR='param - the name of the passed context element\'s attribute which returns an array containing all inline tags representing the whole comment (e.g. "firstSentenceTags").

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
			txtfl.ehtml.flatten='true';
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
		SS_NAME='Comment_Summary (Package)'
		DESCR='generates the summary description of a package

This stock-section switches the search path for the input associated files to the package source directory (see "Processing | Init Expression" tab), which is needed when there are some images specified in the package description that may get into the summary text.'
		MATCHING_ET='PackageDoc'
		INIT_EXPR='output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<SS_CALL>
				SS_NAME='Comment_Summary'
			</SS_CALL>
		</BODY>
	</FOLDER>
</STOCK_SECTIONS>
CHECKSUM='f1Bo8LZI9Eata5bjNNEuFusVAl3C9vsuv8VDSqdFyVM'
</DOCFLEX_TEMPLATE>