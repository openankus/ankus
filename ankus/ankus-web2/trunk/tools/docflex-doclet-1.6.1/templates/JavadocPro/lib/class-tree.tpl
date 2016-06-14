<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-05-15 04:24:17'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ETS={'PackageDoc';'RootDoc'}
INIT_EXPR='includeDeprecated = getBooleanParam("include.deprecated");

classFilter = BooleanQuery (
  isVisible() && ! checkElementsByKey("excluded-classes", contextElement.id)
);

prepareElementMap (
  "class-tree",
  findElementsByLRules (
    Array (
      LocationRule (
        \'RootDoc -> classes^::ClassDoc [
           getAttrBooleanValue("isClass") && ! getAttrBooleanValue("isEnum")
           &&
           (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
           &&
           execBooleanQuery (classFilter)
         ]\',
        false
      ),
      LocationRule (
        \'PackageDoc -> ClassDoc [
           getAttrBooleanValue("isClass") && ! getAttrBooleanValue("isEnum")
           &&
           (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
           &&
           execBooleanQuery (classFilter)
         ]\',
        false
      ),
      LocationRule (
        \'ClassDoc -> superclass^::ClassDoc\',
        true
      )
    ),
    "ClassDoc",
    classFilter
  ),
  FlexQuery ({
    ids = getElementIds (
      findElementsByLRules (
        Array (
          LocationRule ("* -> superclass^::ClassDoc", false),
          LocationRule ("*[! execBooleanQuery (classFilter)] -> superclass^::ClassDoc", true)
        ),
        "ClassDoc",
        classFilter
      )
    );

    ids.isEmpty() ? rootElement.id : ids
  })
);

prepareElementMap (
  "interface-tree",
  findElementsByLRules (
    Array (
      LocationRule (
        \'RootDoc -> classes^::ClassDoc [
           getAttrBooleanValue("isInterface")
           &&
           (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
           &&
           execBooleanQuery (classFilter)
         ]\',
        false
      ),
      LocationRule (
        \'PackageDoc -> ClassDoc [
           getAttrBooleanValue("isInterface")
           &&
           (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
           &&
           execBooleanQuery (classFilter)
         ]\',
        false
      ),
      LocationRule (
        \'ClassDoc -> interfaces^::ClassDoc\',
        true
      )
    ),
    "ClassDoc",
    classFilter
  ),
  FlexQuery ({
    ids = getElementIds (
      findElementsByLRules (
        Array (
          LocationRule ("* -> interfaces^::ClassDoc", false),
          LocationRule ("*[! execBooleanQuery (classFilter)] -> interfaces^::ClassDoc", true)
        ),
        "ClassDoc",
        classFilter
      )
    );

    ids.isEmpty() ? rootElement.id : ids
  })
);

prepareElementMap (
  "enum-tree",
  findElementsByLRules (
    Array (
      LocationRule (
        \'RootDoc -> classes^::ClassDoc [
           getAttrBooleanValue("isEnum")
           &&
           (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
           &&
           execBooleanQuery (classFilter)
         ]\',
        false
      ),
      LocationRule (
        \'PackageDoc -> ClassDoc [
           getAttrBooleanValue("isEnum")
           &&
           (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
           &&
           execBooleanQuery (classFilter)
         ]\',
        false
      ),
      LocationRule (
        \'ClassDoc -> superclass^::ClassDoc\',
        true
      )
    ),
    "ClassDoc",
    classFilter
  ),
  FlexQuery ({
    ids = getElementIds (
      findElementsByLRules (
        Array (
          LocationRule ("* -> superclass^::ClassDoc", false),
          LocationRule ("*[! execBooleanQuery (classFilter)] -> superclass^::ClassDoc", true)
        ),
        "ClassDoc",
        classFilter
      )
    );

    ids.isEmpty() ? rootElement.id : ids
  })
);'
FINISH_EXPR='removeElementMap ("class-tree");
removeElementMap ("interface-tree");
removeElementMap ("enum-tree");'
TITLE_EXPR='title = "Class Hierarchy";

instanceOf("PackageDoc") ? {
  (packageName = getAttrValue("name")) == null ? packageName = "<unnamed>";
  title = packageName + " " + title;
};

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "Class Hierarchy";

instanceOf ("PackageDoc") ? {
  (packageName = getAttrValue("name")) == null ? packageName = "<unnamed>";
  title = packageName + " " + title;
};

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
	PARAM={
		param.name='show';
		param.title='Show';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='show.linkTitle';
		param.title='Link Titles (Tooltips)';
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
		style.name='List Heading';
		style.id='s2';
		style.local='true';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='1.1';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s3';
		style.default='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs2';
}
<HTARGET>
	COND='instanceOf("RootDoc")'
	HKEYS={
		'"overview-tree"';
	}
</HTARGET>
<HTARGET>
	COND='instanceOf("PackageDoc")'
	HKEYS={
		'contextElement.id';
		'"package-tree"';
	}
</HTARGET>
<ROOT>
	<TEMPLATE_CALL>
		DESCR='Navigation Bar'
		COND='output.type == "document" && getBooleanParam("gen.navbar")'
		TEMPLATE_FILE='navbar.tpl'
		PASSED_PARAMS={
			'$type','"tree"';
			'$location','"header"';
		}
	</TEMPLATE_CALL>
	<AREA_SEC>
		MATCHING_ET='RootDoc'
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s1';
					par.alignment='Center';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Hierarchy For All Packages'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		MATCHING_ET='PackageDoc'
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s1';
					par.alignment='Center';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Hierarchy For Package'
					</TEXT_CTRL>
					<DATA_CTRL>
						FORMULA='(name = getAttrValue("name")) != "" ? name : "<unnamed>"'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<FOLDER>
		DESCR='Package Hierarchies'
		<BODY>
			<AREA_SEC>
				MATCHING_ET='PackageDoc'
				BREAK_PARENT_BLOCK='when-executed'
				FMT={
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='All Packages'
								<DOC_HLINK>
									HKEYS={
										'"overview-tree"';
									}
								</DOC_HLINK>
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<ELEMENT_ITER>
				MATCHING_ET='RootDoc'
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
				FMT={
					sec.outputStyle='list';
					list.type='delimited';
					list.margin.block='true';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										ATTR='name'
										<DOC_HLINK>
											HKEYS={
												'contextElement.id';
												'"package-tree"';
											}
										</DOC_HLINK>
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
		<HEADER>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.style='s2';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Package Hierarchies:'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</FOLDER>
	<FOLDER>
		DESCR='CLASS TREES'
		<BODY>
			<FOLDER>
				DESCR='Class Hierarchy'
				COLLAPSED
				<BODY>
					<SS_CALL>
						SS_NAME='Class Tree'
						PARAMS_EXPR='Array ("class-tree")'
					</SS_CALL>
				</BODY>
				<HEADER>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.style='s1';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Class Hierarchy'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</FOLDER>
			<FOLDER>
				DESCR='Interface Hierarchy'
				COLLAPSED
				<BODY>
					<SS_CALL>
						SS_NAME='Class Tree'
						PARAMS_EXPR='Array ("interface-tree")'
					</SS_CALL>
				</BODY>
				<HEADER>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.style='s1';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Interface Hierarchy'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</FOLDER>
			<ELEMENT_ITER>
				DESCR='Annotation Type Hierarchy'
				COLLAPSED
				TARGET_ET='AnnotationTypeDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'RootDoc -> classes^::AnnotationTypeDoc';
					'PackageDoc -> annotationTypes^::AnnotationTypeDoc';
				}
				FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
				FMT={
					sec.outputStyle='list';
					list.style.type='circle';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									txtfl.delimiter.type='none';
								}
								<CTRLS>
									<DATA_CTRL>
										ATTR='containingPackageName'
									</DATA_CTRL>
									<DELIMITER>
										FMT={
											txtfl.delimiter.type='text';
											txtfl.delimiter.text='.';
											txtfl.delimiter.override='false';
										}
									</DELIMITER>
									<DATA_CTRL>
										ATTR='name'
										FMT={
											text.font.style.bold='true';
										}
										<DOC_HLINK>
											TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
											HKEYS={
												'contextElement.id';
												'"detail"';
											}
										</DOC_HLINK>
									</DATA_CTRL>
									<DELIMITER>
									</DELIMITER>
									<SS_CALL_CTRL>
										SS_NAME='Directly Implemented Interfaces'
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
									par.style='s1';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Annotation Type Hierarchy'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<FOLDER>
				DESCR='Enum Hierarchy'
				COLLAPSED
				<BODY>
					<SS_CALL>
						SS_NAME='Class Tree'
						PARAMS_EXPR='Array ("enum-tree")'
					</SS_CALL>
				</BODY>
				<HEADER>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.style='s1';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Enum Hierarchy'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</FOLDER>
		</BODY>
		<HEADER>
			<AREA_SEC>
				<AREA>
					<HR>
						FMT={
							par.margin.top='12';
						}
					</HR>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</FOLDER>
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
					'$type','"tree"';
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
	<AREA_SEC>
		SS_NAME='Class Link Title'
		MATCHING_ET='ClassDoc'
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isInterface")'
						TEXT='interface'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isClass") && ! getAttrBooleanValue("isEnum")'
						TEXT='class'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isEnum")'
						TEXT='enum'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isAnnotationType")'
						TEXT='annotation'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='in'
					</TEXT_CTRL>
					<DATA_CTRL>
						FORMULA='((name = getAttrValue("containingPackageName")) != "" ? name : "<unnamed>")'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<ELEMENT_ITER>
		SS_NAME='Class Tree'
		DESCR='param: tree map id'
		MATCHING_ETS={'ClassDoc';'PackageDoc';'RootDoc'}
		TARGET_ET='ClassDoc'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByKey (
  stockSection.param, 
  contextElement.id
)'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='list';
			list.style.type='circle';
		}
		<BODY>
			<FOLDER>
				DESCR='list item'
				<BODY>
					<FOLDER>
						DESCR='class info'
						MATCHING_ET='ClassDoc'
						FMT={
							sec.outputStyle='text-par';
						}
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<DATA_CTRL>
												ATTR='containingPackageName'
											</DATA_CTRL>
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='text';
													txtfl.delimiter.text='.';
													txtfl.delimiter.override='false';
												}
											</DELIMITER>
											<DATA_CTRL>
												ATTR='name'
												FMT={
													text.font.style.bold='true';
												}
												<DOC_HLINK>
													TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
													HKEYS={
														'contextElement.id';
														'"detail"';
													}
												</DOC_HLINK>
												<URL_HLINK>
													COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line), when no internal
target (within the currently generated docs) can be found by the previous definitions.
Note that all these hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
													ALT_HLINK
													TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
													URL_EXPR='getExternalDocURL()'
												</URL_HLINK>
											</DATA_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Variables'
											</SS_CALL_CTRL>
											<DELIMITER>
											</DELIMITER>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<SS_CALL>
								DESCR='(for a class)'
								COND='getAttrBooleanValue("isClass") || getAttrBooleanValue("isAnnotationType")'
								SS_NAME='Directly Implemented Interfaces'
							</SS_CALL>
							<ELEMENT_ITER>
								DESCR='also extended interfaces (for an interface)'
								COND='getAttrBooleanValue("isInterface")'
								COLLAPSED
								TARGET_ET='ClassDoc'
								SCOPE='advanced-location-rules'
								RULES={
									'* -> interfaces^::ClassDoc';
									'*[! isVisible()
||
checkElementsByKey("excluded-classes", contextElement.id)] -> interfaces^::ClassDoc',recursive;
								}
								FILTER='contextElement.id != stockSection.contextElement.id
&&
isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
								SORTING='by-attr'
								SORTING_KEY={lpath='@name',ascending}
								FMT={
									txtfl.delimiter.type='text';
									txtfl.delimiter.text=', ';
								}
								<BODY>
									<AREA_SEC>
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														ATTR='containingPackageName'
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
															txtfl.delimiter.override='false';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														<DOC_HLINK>
															TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
															HKEYS={
																'contextElement.id';
																'"detail"';
															}
														</DOC_HLINK>
														<URL_HLINK>
															COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line), when no internal
target (within the currently generated docs) can be found by the previous definitions.
Note that all these hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
															ALT_HLINK
															TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
															URL_EXPR='getExternalDocURL()'
														</URL_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Type Variables'
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
												<CTRLS>
													<TEXT_CTRL>
														TEXT='(also extends '
													</TEXT_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
								<FOOTER>
									<AREA_SEC>
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT=')'
													</TEXT_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</FOOTER>
							</ELEMENT_ITER>
						</BODY>
					</FOLDER>
					<SS_CALL>
						SS_NAME='Class Tree'
						PARAMS_EXPR='stockSection.params'
					</SS_CALL>
				</BODY>
			</FOLDER>
		</BODY>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Directly Implemented Interfaces'
		MATCHING_ET='ClassDoc'
		TARGET_ET='ClassDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> interfaces^::ClassDoc';
			'* -> superclass^::ClassDoc';
			'*[! isVisible()
||
checkElementsByKey("excluded-classes", contextElement.id)] -> interfaces^::ClassDoc',recursive;
			'*[! isVisible()
||
checkElementsByKey("excluded-classes", contextElement.id)] -> superclass^::ClassDoc',recursive;
		}
		FILTER='getAttrBooleanValue("isInterface")
&&
isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='text';
			txtfl.delimiter.text=', ';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							txtfl.delimiter.type='none';
						}
						<CTRLS>
							<DATA_CTRL>
								ATTR='containingPackageName'
							</DATA_CTRL>
							<DELIMITER>
								FMT={
									txtfl.delimiter.type='text';
									txtfl.delimiter.text='.';
									txtfl.delimiter.override='false';
								}
							</DELIMITER>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
								</DOC_HLINK>
								<URL_HLINK>
									COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line), when no internal
target (within the currently generated docs) can be found by the previous definitions.
Note that all these hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
									ALT_HLINK
									TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
									URL_EXPR='getExternalDocURL()'
								</URL_HLINK>
							</DATA_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Type Variables'
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
						<CTRLS>
							<TEXT_CTRL>
								TEXT='(implements '
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
		<FOOTER>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT=')'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</FOOTER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Type Variables'
		MATCHING_ET='ClassDoc'
		TARGET_ET='TypeVariable'
		SCOPE='simple-location-rules'
		RULES={
			'* -> TypeVariable';
		}
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='text';
			txtfl.delimiter.text=',';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='typeName'
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
						<CTRLS>
							<TEXT_CTRL>
								TEXT='<'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
		<FOOTER>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='>'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</FOOTER>
	</ELEMENT_ITER>
</STOCK_SECTIONS>
CHECKSUM='w0k5SETu3BKStM6Wecl+j0CVElfcN4bylZG?wfSYa0M'
</DOCFLEX_TEMPLATE>