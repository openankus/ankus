<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-06-06 12:57:26'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
TITLE_EXPR='title = "Serialized Form";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "Serialized Form";

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
		param.name='show';
		param.title='Show';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='show.qualifier';
		param.title='Package Qualifiers';
		param.group='true';
		param.type='boolean';
	}
	PARAM={
		param.name='show.qualifier.omit';
		param.title='Omit for Packages';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
	}
	PARAM={
		param.name='show.linkTitle';
		param.title='Link Titles (Tooltips)';
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
		style.id='s1';
		text.font.size='15';
		text.font.style.bold='true';
	}
	PAR_STYLE={
		style.name='Heading 1';
		style.id='s2';
		text.font.size='14.5';
		text.font.style.bold='true';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs4';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Member Heading';
		style.id='s3';
		text.font.size='11.5';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s4';
		style.default='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.hlink.style.link='cs4';
}
<HTARGET>
	HKEYS={
		'"serialized-form"';
	}
</HTARGET>
<ROOT>
	<FOLDER>
		<BODY>
			<ELEMENT_ITER>
				DESCR='iterate by all packages that may contain classes to be included in "Serialized Form"
(see "Processing | Iteration Scope" tab)'
				TARGET_ET='PackageDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> PackageDoc';
					'* -> specifiedClasses^::ClassDoc[getAttrBooleanValue("isSerializable") &&
getAttrBooleanValue("isClass") &&
! getAttrBooleanValue("isEnum") &&
! hasTag ("@serial", "exclude")]/containingPackage^::PackageDoc';
				}
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
				<BODY>
					<ELEMENT_ITER>
						DESCR='iterate by all classes in a package that must be included in "Serialized Form" (see "Processing | Iteration Scope"  & "Processing | Filtering | Filter Expression" tabs)'
						STEP_EXPR='thisContext.setVar (
 "class_deprecated",
 (hasTag("@deprecated") || hasAnnotation("java.lang.Deprecated"))
)'
						TARGET_ET='ClassDoc'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> allClasses^::ClassDoc';
						}
						FILTER='// the class implements java.io.Serializable
getAttrBooleanValue("isSerializable")
&&
// this is not enum
getAttrBooleanValue("isClass") && ! getAttrBooleanValue("isEnum")
&&
(
  // class has \'@serial include\' tag
  hasTag ("@serial", "include")
  ||
  // class has no \'@serial exclude\' tag and ...
  ! hasTag ("@serial", "exclude") &&
  (
    // this is a public or protected class and
    // the package has no \'@serial exclude\' tag

    (getAttrBooleanValue("isPublic") || getAttrBooleanValue("isProtected")) &&
    ! iterator.contextElement.hasTag ("@serial", "exclude")
    ||

    // this is a private or package private class and
    // the package has \'@serial include\' tag

    (getAttrBooleanValue("isPrivate") || getAttrBooleanValue("isPackagePrivate")) &&
    iterator.contextElement.hasTag ("@serial", "include")
  )
)
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
						SORTING='by-attr'
						SORTING_KEY={lpath='@name',ascending}
						<BODY>
							<AREA_SEC>
								DESCR='package group heading'
								FMT={
									sec.outputStyle='table';
									table.sizing='Relative';
								}
								<HTARGET>
									HKEYS={
										'contextElement.id';
										'"serialized-form"';
									}
								</HTARGET>
								<AREA>
									<SPACER>
										FMT={
											spacer.height='12';
										}
									</SPACER>
									<CTRL_GROUP>
										<CTRLS>
											<PANEL>
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='43.5';
													tcell.bkgr.color='#EEEEFF';
													par.style='s1';
												}
												<AREA>
													<CTRL_GROUP>
														<CTRLS>
															<TEXT_CTRL>
																TEXT='Class'
															</TEXT_CTRL>
															<DATA_CTRL>
																ATTR='qualifiedName'
																<DOC_HLINK>
																	HKEYS={
																		'contextElement.id';
																		'"detail"';
																	}
																</DOC_HLINK>
															</DATA_CTRL>
															<SS_CALL_CTRL>
																SS_NAME='Parent Class'
															</SS_CALL_CTRL>
															<TEXT_CTRL>
																TEXT='implements Serializable'
															</TEXT_CTRL>
														</CTRLS>
													</CTRL_GROUP>
												</AREA>
											</PANEL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<AREA_SEC>
								CONTEXT_ELEMENT_EXPR='findElementByLPath (\'allFields^::FieldDoc [
  hasAttrValue("name", "serialVersionUID") && 
  getAttrValue("constantValueExpression") != ""
]\')'
								MATCHING_ET='FieldDoc'
								<AREA>
									<CTRL_GROUP>
										FMT={
											par.margin.top='12';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='serialVersionUID:'
												FMT={
													text.font.style.bold='true';
												}
											</TEXT_CTRL>
											<DATA_CTRL>
												ATTR='constantValueExpression'
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<ELEMENT_ITER>
								DESCR='serialization methods'
								COLLAPSED
								TARGET_ET='MethodDoc'
								SCOPE='advanced-location-rules'
								RULES={
									'* -> serializationMethods^::MethodDoc';
								}
								FILTER='! checkElementsByKey("excluded-members", contextElement.id)'
								SORTING='by-attr'
								SORTING_KEY={lpath='@name',ascending}
								<BODY>
									<AREA_SEC>
										FMT={
											sec.page.keepWithNext='true';
											par.style='s3';
										}
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
									<AREA_SEC>
										FMT={
											sec.page.keepTogether='true';
											par.margin.bottom='12';
											par.option.nowrap='true';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													text.option.nbsps='true';
												}
												<CTRLS>
													<TEMPLATE_CALL_CTRL>
														COND='hasChild("AnnotationDesc")'
														TEMPLATE_FILE='annotations.tpl'
														FMT={
															text.style='cs2';
														}
													</TEMPLATE_CALL_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Method Modifiers'
														FMT={
															tcell.align.horz='Right';
															tcell.align.vert='Top';
														}
													</SS_CALL_CTRL>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='none';
														}
													</DELIMITER>
													<SS_CALL_CTRL>
														SS_NAME='Method Params & Exceptions'
														PARAMS_EXPR='len = callStockSection ("Method Modifiers").len();

Array (
  (len > 0 ? len + 1 : 0) + getAttrStringValue("name").len()
)'
													</SS_CALL_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
									<SS_CALL>
										SS_NAME='Method Description & Tags'
										PARAMS_EXPR='Array (thisContext.getVar ("class_deprecated"))'
										FMT={
											sec.indent.block='true';
										}
									</SS_CALL>
									<SS_CALL>
										COND='! iterator.isLastItem'
										SS_NAME='Item Separator'
									</SS_CALL>
								</BODY>
								<HEADER>
									<AREA_SEC>
										FMT={
											sec.outputStyle='table';
											table.sizing='Relative';
										}
										<AREA>
											<SPACER>
												FMT={
													spacer.height='12';
												}
											</SPACER>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Serialization Methods'
														FMT={
															ctrl.size.width='499.5';
															ctrl.size.height='19.5';
															tcell.bkgr.color='#CCCCFF';
															par.style='s1';
														}
													</TEXT_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
							</ELEMENT_ITER>
							<FOLDER>
								DESCR='when serializable fields are explicitly defined with \'serialPersistentFields\''
								COND='getAttrBooleanValue("definesSerializableFields")'
								CONTEXT_ELEMENT_EXPR='findElementByLPath (\'allFields^::FieldDoc [
  hasAttrValue("name", "serialPersistentFields")
]\')'
								MATCHING_ET='FieldDoc'
								BREAK_PARENT_BLOCK='when-executed'
								COLLAPSED
								<BODY>
									<FOLDER>
										DESCR='Serialization Overview (description & tags)'
										<BODY>
											<SS_CALL>
												SS_NAME='Field Description & Tags'
												PARAMS_EXPR='Array (thisContext.getVar ("class_deprecated"))'
												FMT={
													sec.indent.block='true';
												}
											</SS_CALL>
										</BODY>
										<HEADER>
											<AREA_SEC>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<AREA>
													<SPACER>
														FMT={
															spacer.height='12';
														}
													</SPACER>
													<CTRL_GROUP>
														<CTRLS>
															<TEXT_CTRL>
																TEXT='Serialization Overview'
																FMT={
																	ctrl.size.width='499.5';
																	ctrl.size.height='19.5';
																	tcell.bkgr.color='#CCCCFF';
																	par.style='s1';
																}
															</TEXT_CTRL>
														</CTRLS>
													</CTRL_GROUP>
													<SPACER>
														FMT={
															spacer.height='12';
														}
													</SPACER>
												</AREA>
											</AREA_SEC>
										</HEADER>
									</FOLDER>
									<ELEMENT_ITER>
										TARGET_ET='SerialFieldTag'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> serialFieldTags^::SerialFieldTag';
										}
										SORTING='by-attr'
										SORTING_KEY={lpath='@fieldName',ascending}
										<BODY>
											<AREA_SEC>
												<AREA>
													<CTRL_GROUP>
														FMT={
															par.style='s3';
														}
														<CTRLS>
															<DATA_CTRL>
																ATTR='fieldName'
															</DATA_CTRL>
														</CTRLS>
													</CTRL_GROUP>
													<CTRL_GROUP>
														FMT={
															text.style='cs1';
															par.margin.bottom='12';
														}
														<CTRLS>
															<SS_CALL_CTRL>
																SS_NAME='Type Name<Params>'
																PASSED_ELEMENT_EXPR='getElementByLinkAttr("fieldTypeDoc")'
																PASSED_ELEMENT_MATCHING_ET='ClassDoc'
																ALT_FORMULA='getAttrValue("fieldType")'
															</SS_CALL_CTRL>
															<DATA_CTRL>
																ATTR='fieldName'
																FMT={
																	text.font.style.bold='true';
																}
															</DATA_CTRL>
														</CTRLS>
													</CTRL_GROUP>
													<CTRL_GROUP>
														FMT={
															row.indent.block='true';
														}
														<CTRLS>
															<DATA_CTRL>
																ATTR='description'
															</DATA_CTRL>
														</CTRLS>
													</CTRL_GROUP>
												</AREA>
											</AREA_SEC>
											<SS_CALL>
												COND='! iterator.isLastItem'
												SS_NAME='Item Separator'
											</SS_CALL>
										</BODY>
										<HEADER>
											<AREA_SEC>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<AREA>
													<SPACER>
														FMT={
															spacer.height='12';
														}
													</SPACER>
													<CTRL_GROUP>
														<CTRLS>
															<TEXT_CTRL>
																TEXT='Serialized Fields'
																FMT={
																	ctrl.size.width='499.5';
																	ctrl.size.height='19.5';
																	tcell.bkgr.color='#CCCCFF';
																	par.style='s1';
																}
															</TEXT_CTRL>
														</CTRLS>
													</CTRL_GROUP>
												</AREA>
											</AREA_SEC>
										</HEADER>
									</ELEMENT_ITER>
								</BODY>
							</FOLDER>
							<ELEMENT_ITER>
								DESCR='otherwise, document separate serializable fields (those marked with @serial tag)'
								COLLAPSED
								TARGET_ET='FieldDoc'
								SCOPE='advanced-location-rules'
								RULES={
									'* -> serializableFields^::FieldDoc';
								}
								FILTER='! checkElementsByKey("excluded-members", contextElement.id)'
								SORTING='by-attr'
								SORTING_KEY={lpath='@name',ascending}
								<BODY>
									<AREA_SEC>
										FMT={
											par.style='s3';
										}
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
									<AREA_SEC>
										FMT={
											sec.page.keepTogether='true';
											par.margin.bottom='12';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
												}
												<CTRLS>
													<TEMPLATE_CALL_CTRL>
														COND='hasChild("AnnotationDesc")'
														TEMPLATE_FILE='annotations.tpl'
														FMT={
															text.style='cs2';
														}
													</TEMPLATE_CALL_CTRL>
													<TEXT_CTRL>
														COND='getAttrBooleanValue("isPublic")'
														TEXT='public'
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='getAttrBooleanValue("isProtected")'
														TEXT='protected'
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='getAttrBooleanValue("isPrivate")'
														TEXT='private'
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='getAttrBooleanValue("isStatic")'
														TEXT='static'
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='getAttrBooleanValue("isFinal")'
														TEXT='final'
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='getAttrBooleanValue("isTransient")'
														TEXT='transient'
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='getAttrBooleanValue("isVolatile")'
														TEXT='volatile'
													</TEXT_CTRL>
													<PANEL>
														CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("type")'
														MATCHING_ET='Type'
														FMT={
															ctrl.size.width='217.5';
															ctrl.size.height='38.3';
															txtfl.delimiter.type='none';
														}
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<SS_CALL_CTRL>
																		SS_NAME='Type Name<Params>'
																	</SS_CALL_CTRL>
																	<DATA_CTRL>
																		ATTR='dimension'
																	</DATA_CTRL>
																</CTRLS>
															</CTRL_GROUP>
														</AREA>
													</PANEL>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
													</DATA_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
									<SS_CALL>
										SS_NAME='Field Description & Tags'
										PARAMS_EXPR='Array (thisContext.getVar ("class_deprecated"))'
										FMT={
											sec.indent.block='true';
										}
									</SS_CALL>
									<SS_CALL>
										COND='! iterator.isLastItem'
										SS_NAME='Item Separator'
									</SS_CALL>
								</BODY>
								<HEADER>
									<AREA_SEC>
										FMT={
											sec.outputStyle='table';
											table.sizing='Relative';
										}
										<AREA>
											<SPACER>
												FMT={
													spacer.height='12';
												}
											</SPACER>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Serialized Fields'
														FMT={
															ctrl.size.width='499.5';
															ctrl.size.height='19.5';
															tcell.bkgr.color='#CCCCFF';
															par.style='s1';
														}
													</TEXT_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
							</ELEMENT_ITER>
						</BODY>
						<HEADER>
							<AREA_SEC>
								DESCR='package group heading'
								FMT={
									sec.outputStyle='table';
									table.sizing='Relative';
								}
								<AREA>
									<HR>
										FMT={
											rule.thickness='3';
											par.margin.top='12';
											par.margin.bottom='4';
										}
									</HR>
									<CTRL_GROUP>
										<CTRLS>
											<PANEL>
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='43.5';
													tcell.align.horz='Center';
													tcell.bkgr.color='#EEEEFF';
													par.style='s1';
												}
												<AREA>
													<CTRL_GROUP>
														<CTRLS>
															<TEXT_CTRL>
																TEXT='Package'
															</TEXT_CTRL>
															<DATA_CTRL>
																FORMULA='(name = getAttrValue("name")) != "" ? name : "<unnamed>"'
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
			</ELEMENT_ITER>
		</BODY>
		<HEADER>
			<TEMPLATE_CALL>
				DESCR='Navigation Bar'
				COND='output.type == "document" && getBooleanParam("gen.navbar")'
				TEMPLATE_FILE='navbar.tpl'
				PASSED_PARAMS={
					'$location','"header"';
				}
			</TEMPLATE_CALL>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.style='s2';
							par.alignment='Center';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Serialized Form'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
		<FOOTER>
			DESCR='Navigation Bar & bottom message'
			COND='output.type == "document"'
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
</ROOT>
<STOCK_SECTIONS>
	<AREA_SEC>
		SS_NAME='Class Link Title'
		DESCR='generates a title for the hyperlink to the type documentation.

The context element is switched to the type\'s ClassDoc in the control group; see the "Component | Context Element" tab in control group\'s properties dialog.'
		MATCHING_ET='Type'
		<AREA>
			<CTRL_GROUP>
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("asClassDoc")'
				MATCHING_ET='ClassDoc'
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
		SS_NAME='Comment'
		DESCR='PROCESS COMMENT TO ANYTHING 
(except a method and the method @param, @return and @throws/@exception tags).

The stock-section parameter is the name of the attribute of the passed context element, which holds an array containing all inline tags representing the whole comment (e.g. "inlineTags" or "firstSentenceTags").

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
				COLLAPSED
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
	<ELEMENT_ITER>
		SS_NAME='Comment (Method)'
		DESCR='PROCESS COMMENT TO A METHOD;

passed context element - the owner of the inline tags representing the comment;

param - the name of the context element\'s attribute that returns an array containing all inline tags representing the whole comment (e.g. "inlineTags").

The section iterates by inline tags and processes them.'
		MATCHING_ETS={'MethodDoc';'Tag'}
		TARGET_ET='Tag'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='getElementsByLinkAttr (stockSection.param.toString())'
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
				COLLAPSED
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
			<FOLDER>
				DESCR='{@inheritDoc}'
				COND='getAttrValue("kind") == "@inheritDoc"'
				CONTEXT_ELEMENT_EXPR='// the ID of the method being documented
method_id = (el = stockSection.contextElement).instanceOf ("Tag")
  ? el.getAttrValue("holder") : el.id;

// find the closest overridden or implemented method 
// that has any documentation by it

findElementByKey (
  "overridden-implemented-methods",
  method_id,
  BooleanQuery (! getAttrValues("inlineTags").isEmpty())
)'
				MATCHING_ET='MethodDoc'
				INIT_EXPR='/* Assign a new search path for the input files associated with the method
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method.

After the stock-section call is finished, the previous seach path is restored
in the "Finish Expression" to continue processing of other tags */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")
'
				FINISH_EXPR='// Restore the input files search path initially received by this stock-section

output.inputFilesPath = null'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<SS_CALL>
						SS_NAME='Comment (Method)'
						PARAMS_EXPR='Array (stockSection.param.toString(), contextElement)'
					</SS_CALL>
				</BODY>
			</FOLDER>
			<TEMPLATE_CALL>
				TEMPLATE_FILE='inline-tag.tpl'
			</TEMPLATE_CALL>
		</BODY>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Comment (Operation Exception)'
		DESCR='PROCESS COMMENT TO A METHOD/CONSTRUCTOR EXCEPTION.

The method/constructor is passed as the stock-section context element;
the exception name is in the stock-section parameter.

The section iterate by method\'s @throws tags documenting the given exception.'
		MATCHING_ET='ExecutableMemberDoc'
		TARGET_ET='ThrowsTag'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> throwsTags^::ThrowsTag';
		}
		FILTER='type = getElementByLinkAttr("exceptionType");

exceptionName = (type != null) 
  ? type.getAttrStringValue("qualifiedTypeName")
  : getAttrValue("exceptionName");

exceptionName == stockSection.param'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<ELEMENT_ITER>
				DESCR='iterate by the tag\'s comment inline tags and process them'
				COLLAPSED
				TARGET_ET='Tag'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> inlineTags^::Tag';
				}
				FMT={
					txtfl.delimiter.type='none';
					txtfl.ehtml.render='true';
				}
				<BODY>
					<AREA_SEC>
						DESCR='text'
						COND='getAttrValue("kind") == "Text"'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
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
					<ELEMENT_ITER>
						DESCR='{@inheritDoc} -- iterate by all overridden & implemented methods
until first non-empty output (see "Processing | Options" tab)'
						COND='getAttrValue("kind") == "@inheritDoc"'
						FINISH_EXPR='// Restore the input files search path initially received by this stock-section

output.inputFilesPath = null'
						BREAK_PARENT_BLOCK='when-executed'
						STEP_EXPR='/* Assign a new search path for the input files associated with the iterated method, 
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method.

After the all iterated methods processed, the previous seach path is restored
in the "Finish Expression" to continue processing of other tags */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")
'
						UNTIL_FIRST_OUTPUT
						TARGET_ET='MethodDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByKey (
  "overridden-implemented-methods",
  stockSection.contextElement.id  // the ID of the method being documented
)'
						<BODY>
							<SS_CALL>
								SS_NAME='Comment (Operation Exception)'
								PARAMS_EXPR='stockSection.params'
							</SS_CALL>
						</BODY>
					</ELEMENT_ITER>
					<TEMPLATE_CALL>
						TEMPLATE_FILE='inline-tag.tpl'
					</TEMPLATE_CALL>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
		<ELSE>
			DESCR='if this is a method and no exception doc produced, try to copy it from the inherited method of an implemented interface or an ancestor class'
			<ELEMENT_ITER>
				DESCR='iterate by all overridden & implemented methods until first non-empty output (see "Processing | Options" tab)'
				MATCHING_ET='MethodDoc'
				STEP_EXPR='/* Assign a new search path for the input files associated with the iterated method, 
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method. */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")'
				UNTIL_FIRST_OUTPUT
				TARGET_ET='MethodDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
 "overridden-implemented-methods",
 stockSection.contextElement.id  // the ID of the method being documented
)'
				<BODY>
					<SS_CALL>
						SS_NAME='Comment (Operation Exception)'
						PARAMS_EXPR='stockSection.params'
					</SS_CALL>
				</BODY>
			</ELEMENT_ITER>
		</ELSE>
	</ELEMENT_ITER>
	<FOLDER>
		SS_NAME='Field Description & Tags'
		DESCR='param: (boolean) indicates that the whole class containing the field is deprecated'
		MATCHING_ET='FieldDoc'
		<BODY>
			<FOLDER>
				DESCR='deprecated-info'
				COLLAPSED
				<BODY>
					<ELEMENT_ITER>
						DESCR='@deprecated tags'
						COND='hasTag("@deprecated") || hasAnnotation("java.lang.Deprecated")'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
						ALWAYS_PROC_HDRFTR
						TARGET_ET='Tag'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByIds(tags("@deprecated"))'
						FMT={
							sec.outputStyle='text-par';
							sec.spacing.after='12';
						}
						<BODY>
							<SS_CALL>
								SS_NAME='Comment'
								FMT={
									text.font.style.italic='true';
								}
							</SS_CALL>
						</BODY>
						<HEADER>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Deprecated.'
												FMT={
													text.font.style.bold='true';
												}
											</TEXT_CTRL>
											<DELIMITER>
											</DELIMITER>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<AREA_SEC>
						DESCR='alternatively, when the whole class is deprecated, add "Deprecated" for the field as well'
						COND='stockSection.param.toBoolean()'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated.'
										FMT={
											text.font.style.bold='true';
										}
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<SS_CALL>
				DESCR='description'
				SS_NAME='Comment'
				FMT={
					sec.outputStyle='text-par';
					sec.spacing.after='12';
				}
			</SS_CALL>
			<SS_CALL>
				DESCR='@serial description'
				CONTEXT_ELEMENT_EXPR='findElementById (tag ("@serial"))'
				MATCHING_ET='Tag'
				SS_NAME='Comment'
				FMT={
					sec.outputStyle='text-par';
					sec.spacing.after='12';
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
  : tagInfo.getAttrBooleanValue ("fields"))'
				SORTING='by-expr'
				SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
				<BODY>
					<ELEMENT_ITER>
						DESCR='@see'
						COND='hasAttrValue ("kind", "@see")'
						CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
						MATCHING_ET='FieldDoc'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
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
					<SS_CALL>
						DESCR='any other tag'
						CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
						MATCHING_ET='FieldDoc'
						SS_NAME='Simple Tag'
						PARAMS_EXPR='Array (
  iterator.element.getAttrValue("kind"),
  getVar("tagTitle")
)'
					</SS_CALL>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
	</FOLDER>
	<AREA_SEC>
		SS_NAME='Item Separator'
		<AREA>
			<HR>
				FMT={
					par.margin.top='14';
				}
			</HR>
		</AREA>
	</AREA_SEC>
	<FOLDER>
		SS_NAME='Method Description & Tags'
		DESCR='param: (boolean) indicates that the whole class containing the method is deprecated'
		MATCHING_ET='MethodDoc'
		<BODY>
			<FOLDER>
				DESCR='deprecated-info'
				COLLAPSED
				<BODY>
					<ELEMENT_ITER>
						DESCR='@deprecated tags'
						COND='hasTag("@deprecated") || hasAnnotation("java.lang.Deprecated")'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
						ALWAYS_PROC_HDRFTR
						TARGET_ET='Tag'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByIds(tags("@deprecated"))'
						FMT={
							sec.outputStyle='text-par';
							sec.spacing.after='12';
						}
						<BODY>
							<SS_CALL>
								SS_NAME='Comment (Method)'
								PARAMS_EXPR='Array ("inlineTags")'
								FMT={
									text.font.style.italic='true';
								}
							</SS_CALL>
						</BODY>
						<HEADER>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Deprecated.'
												FMT={
													text.font.style.bold='true';
												}
											</TEXT_CTRL>
											<DELIMITER>
											</DELIMITER>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<AREA_SEC>
						DESCR='alternatively, when the whole class is deprecated, add "Deprecated" for the field as well'
						COND='stockSection.param.toBoolean()'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated.'
										FMT={
											text.font.style.bold='true';
										}
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='description'
				COLLAPSED
				FMT={
					sec.spacing.after='12';
				}
				<BODY>
					<AREA_SEC>
						DESCR='Documentation'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment (Method)'
										PARAMS_EXPR='Array (
  "inlineTags",
  stockSection.contextElement
)'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
				<ELSE>
					DESCR='if no description, copy it from the overridden/implemented method inherited from the nearest ancestor class/interface'
					<ELEMENT_ITER>
						FINISH_EXPR='// Restore the input files search path initially received by this stock-section

output.inputFilesPath = null'
						STEP_EXPR='/* Assign a new search path for the input files associated with the method
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method.

After the stock-section call is finished, the previous seach path is restored
in the "Finish Expression" to continue processing of other tags */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")'
						FIRST_ITEM_ONLY
						TARGET_ET='MethodDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByKey (
  "overridden-implemented-methods",
  contextElement.id,
  BooleanQuery (! getAttrValues("inlineTags").isEmpty())
)'
						<BODY>
							<AREA_SEC>
								COND='isVisible()
&&
! checkElementsByKey("excluded-members", contextElement.id)
&& 
{
  cls = getElementByLinkAttr("containingClass");
  cls.isVisible() && ! checkElementsByKey("excluded-classes", cls.id)
}'
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("containingClass")'
								MATCHING_ET='ClassDoc'
								FMT={
									text.font.style.bold='true';
								}
								<AREA>
									<CTRL_GROUP>
										FMT={
											par.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Description copied from'
											</TEXT_CTRL>
											<TEXT_CTRL>
												COND='getAttrBooleanValue("isClass")'
												TEXT='class'
											</TEXT_CTRL>
											<TEXT_CTRL>
												COND='getAttrBooleanValue("isInterface")'
												TEXT='interface'
											</TEXT_CTRL>
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='text';
													txtfl.delimiter.text=': ';
												}
											</DELIMITER>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												FMT={
													text.style='cs1';
												}
											</SS_CALL_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Comment (Method)'
												PARAMS_EXPR='Array ("inlineTags")'
											</SS_CALL_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</BODY>
					</ELEMENT_ITER>
				</ELSE>
			</FOLDER>
			<ELEMENT_ITER>
				DESCR='tag documentation'
				STEP_EXPR='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

setVar ("tagTitle", tagInfo.getAttrValue ("title"));'
				TARGET_ETS={'#CUSTOM';'Tag'}
				SCOPE='advanced-location-rules'
				RULES={
					'* -> Tag';
					'* -> {Enum (
 CustomElement (null, Attr ("kind", "@throws"))
)

/* Since documentation of exceptions may be inherited 
 from overridden/implemented methods, add a stub element
 to ensure @throws tag to be documented even when it is
 not directly specified in the method */}::#CUSTOM';
				}
				FILTER='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

tagInfo != null
&&
(tagInfo.hasAttr ("all")
  ? tagInfo.getAttrBooleanValue ("all")
  : tagInfo.hasAttr ("serial_methods")
      ? tagInfo.getAttrBooleanValue ("serial_methods")
      : tagInfo.getAttrBooleanValue ("methods"))'
				SORTING='by-expr'
				SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
				<BODY>
					<ELEMENT_ITER>
						DESCR='@throws'
						COND='hasAttrValue ("kind", "@throws")'
						CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
						MATCHING_ET='MethodDoc'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
						TARGET_ETS={'ThrowsTag';'Type'}
						SCOPE='advanced-location-rules'
						RULES={
							'* -> thrownExceptionTypes^::Type';
							'* -> {findElementsByIds (tags("@throws"))}::ThrowsTag';
						}
						FILTER_BY_KEY='type = instanceOf("ThrowsTag")
     ? getElementByLinkAttr("exceptionType") 
     : contextElement;

type != null ? type.getAttrStringValue("qualifiedTypeName")
             : getAttrValue("exceptionName")
'
						FMT={
							txtfl.delimiter.type='nl';
							txtfl.delimiter.text=',';
						}
						<BODY>
							<AREA_SEC>
								CONTEXT_ELEMENT_EXPR='instanceOf("ThrowsTag")
  ? getElementByLinkAttr("exceptionType")
  : contextElement;'
								MATCHING_ET='Type'
								BREAK_PARENT_BLOCK='when-executed'
								FMT={
									sec.indent.block='true';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												FMT={
													text.style='cs1';
												}
											</SS_CALL_CTRL>
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='text';
													txtfl.delimiter.text=' - ';
												}
											</DELIMITER>
											<SS_CALL_CTRL>
												SS_NAME='Comment (Operation Exception)'
												PASSED_ELEMENT_EXPR='stockSection.contextElement'
												PASSED_ELEMENT_MATCHING_ET='ExecutableMemberDoc'
												PARAMS_EXPR='Array (getAttrValue("qualifiedTypeName"))'
											</SS_CALL_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<AREA_SEC>
								MATCHING_ET='ThrowsTag'
								FMT={
									sec.indent.block='true';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<DATA_CTRL>
												ATTR='exceptionName'
												FMT={
													text.style='cs1';
													txtfl.ehtml.render='true';
												}
												<DOC_HLINK>
													HKEYS={
														'getAttrValue("exception")';
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
													URL_EXPR='getExternalDocURL(getElementByLinkAttr("exception"))'
												</URL_HLINK>
											</DATA_CTRL>
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='text';
													txtfl.delimiter.text=' - ';
												}
											</DELIMITER>
											<SS_CALL_CTRL>
												SS_NAME='Comment (Operation Exception)'
												PASSED_ELEMENT_EXPR='stockSection.contextElement'
												PASSED_ELEMENT_MATCHING_ET='ExecutableMemberDoc'
												PARAMS_EXPR='Array (getAttrValue("exceptionName"))'
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
					<FOLDER>
						DESCR='@see'
						COND='hasAttrValue ("kind", "@see")'
						CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
						MATCHING_ET='MethodDoc'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
						<BODY>
							<ELEMENT_ITER>
								DESCR='iterate by all @see tags'
								BREAK_PARENT_BLOCK='when-output'
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
							</ELEMENT_ITER>
							<ELEMENT_ITER>
								DESCR='if this method has no @see tags, copy them form the overridden/implemented method inherited from the nearest ancestor class/interface'
								FINISH_EXPR='// Restore the input files search path initially received by this stock-section

output.inputFilesPath = null'
								STEP_EXPR='/* Assign a new search path for the input files associated with the method
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method.

After the stock-section call is finished, the previous seach path is restored
in the "Finish Expression" to continue processing of other tags */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")'
								FIRST_ITEM_ONLY
								TARGET_ET='MethodDoc'
								SCOPE='custom'
								ELEMENT_ENUM_EXPR='findElementsByKey (
  "overridden-implemented-methods",
  contextElement.id,
  BooleanQuery (hasTag("@see"))
)'
								<BODY>
									<ELEMENT_ITER>
										DESCR='iterate by all @see tags'
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
									</ELEMENT_ITER>
								</BODY>
							</ELEMENT_ITER>
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
					</FOLDER>
					<SS_CALL>
						DESCR='any other tag'
						CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
						MATCHING_ET='MethodDoc'
						SS_NAME='Simple Tag'
						PARAMS_EXPR='Array (
  iterator.element.getAttrValue("kind"),
  getVar("tagTitle")
)'
					</SS_CALL>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Method Modifiers'
		DESCR='param: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method'
		MATCHING_ET='MethodDoc'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isPublic")'
								TEXT='public'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isProtected")'
								TEXT='protected'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isPrivate")'
								TEXT='private'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isAbstract")'
								TEXT='abstract'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isStatic")'
								TEXT='static'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isFinal")'
								TEXT='final'
							</TEXT_CTRL>
							<SS_CALL_CTRL>
								DESCR='the formal type parameters of this method or constructor'
								SS_NAME='Type Parameters'
							</SS_CALL_CTRL>
							<PANEL>
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("returnType")'
								MATCHING_ET='Type'
								FMT={
									ctrl.size.width='228.8';
									ctrl.size.height='38.3';
									txtfl.delimiter.type='none';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name<Params>'
												PARAMS_EXPR='stockSection.params'
											</SS_CALL_CTRL>
											<DATA_CTRL>
												ATTR='dimension'
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</PANEL>
							<DELIMITER>
							</DELIMITER>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Method Params & Exceptions'
		DESCR='param[0]: the position of the parameter list (in characters)
param[1]: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method'
		MATCHING_ET='MethodDoc'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<ELEMENT_ITER>
				DESCR='parameter list'
				ALWAYS_PROC_HDRFTR
				TARGET_ET='Parameter'
				SCOPE='simple-location-rules'
				RULES={
					'* -> Parameter';
				}
				FMT={
					txtfl.delimiter.type='nl';
					txtfl.delimiter.text=',';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									txtfl.delimiter.type='space';
								}
								<CTRLS>
									<DATA_CTRL>
										COND='! iterator.isFirstItem'
										FORMULA='dup (" ", stockSection.param.toInt())'
									</DATA_CTRL>
									<PANEL>
										COND='hasChild("AnnotationDesc")'
										FMT={
											ctrl.size.width='259.5';
											ctrl.size.height='38.3';
											txtfl.delimiter.type='none';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEMPLATE_CALL_CTRL>
														TEMPLATE_FILE='annotations.tpl'
														PASSED_PARAMS={
															'$newLineIndent','stockSection.param.toInt() + 1';
														}
														FMT={
															text.style='cs2';
														}
													</TEMPLATE_CALL_CTRL>
													<DATA_CTRL>
														FORMULA='dup (" ", stockSection.param.toInt())'
													</DATA_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</PANEL>
									<PANEL>
										CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("type")'
										MATCHING_ET='Type'
										FMT={
											ctrl.size.width='455.3';
											ctrl.size.height='56.3';
											txtfl.delimiter.type='none';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Type Name'
														PARAMS_EXPR='Array (stockSection.params [1])'
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Type Parameters'
														PARAMS_EXPR='Array (stockSection.params [1])'
													</SS_CALL_CTRL>
													<DATA_CTRL>
														FORMULA='iterator.isLastItem && 
iterator.contextElement.getAttrBooleanValue("isVarArgs") ? 
"..." : getAttrStringValue("dimension")'
														FMT={
															ctrl.size.width='433.5';
															ctrl.size.height='17.3';
														}
													</DATA_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</PANEL>
									<DATA_CTRL>
										ATTR='name'
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
										TEXT='('
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
				DESCR='exception list'
				TARGET_ET='Type'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> thrownExceptionTypes^::Type';
				}
				FMT={
					txtfl.delimiter.type='nl';
					txtfl.delimiter.text=',';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									txtfl.delimiter.type='space';
								}
								<CTRLS>
									<DATA_CTRL>
										COND='! iterator.isFirstItem'
										FORMULA='dup (" ", (offs = stockSection.param.toInt()) < 10 ? offs + 7 : offs)

'
									</DATA_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Type Name'
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
									<DELIMITER>
										FMT={
											txtfl.delimiter.type='nl';
										}
									</DELIMITER>
									<DATA_CTRL>
										FORMULA='offs = stockSection.param.toInt();
dup (" ", offs < 10 ? offs + 1 : offs - 6) + "throws "'
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
		</BODY>
	</FOLDER>
	<ELEMENT_ITER>
		SS_NAME='Parent Class'
		DESCR='"extends" clause'
		MATCHING_ET='ClassDoc'
		TARGET_ET='Type'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> superclassType^::(ClassDoc|ParameterizedType)';
			'*[! isVisible()
||
checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))] -> superclassType^::(ClassDoc|ParameterizedType)',recursive;
		}
		FILTER='isVisible()
&&
! checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))'
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='text';
			txtfl.delimiter.text=', ';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<SS_CALL_CTRL>
								SS_NAME='Type Name<Params>'
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
								TEXT='extends'
							</TEXT_CTRL>
							<DELIMITER>
							</DELIMITER>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Simple Tag'
		DESCR='documents a simple tag of a Doc element (passed via context); for multiple instances of the same exist, their descriptions are printed together separated with comma (", ")
--
params[0] - the tag kind (e.g. "@author")
params[1] - the title for the tag documentation'
		MATCHING_ET='Doc'
		ALWAYS_PROC_HDRFTR
		TARGET_ET='Tag'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByIds (tags (
  stockSection.params[0].toString()
))'
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
								FORMULA='stockSection.params[1]'
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
	<FOLDER>
		SS_NAME='Type Name'
		DESCR='print the type name (i.e. the name of the referenced class/interface or the name of the type variable);

param: when the given type is associated with an adopted member (e.g. result type of a field/method, type of a method parameter), the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that member'
		MATCHING_ET='Type'
		<BODY>
			<FOLDER>
				DESCR='process the type variable;

since this class documentation may list as its own the fields and methods inherited from the excluded ancestor classes/interfaces (the invisible or excluded by tags/annotations), the original declarations of such fields and methods may still contain type variables declared in their actual containing classes. 

Such "foreign" type variables cannot appear here because they will make the documentation inconsistent and may even intersect with the equally named type variable of the given class. 

Therefore, such variables should be extended into actual types passed into them.

This is programmed in the first Area Section (below).'
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("asTypeVariable")'
				MATCHING_ET='TypeVariable'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						DESCR='if this is a "foreign" type variable (declared in a different class), it is replaced with the actual types passed into that variable'
						COND='// test if this type variable is declared for a class
// (not a generic constructor or method)

getElementByLinkAttr("owner", "ClassDoc") != null'
						CONTEXT_ELEMENT_EXPR='// the parameterized type, which represents
// the invocation of a generic class/interface 
// where this member is defined

invokedType = stockSection.param.toElement();

// the actual type argument passed to this variable 
// within that generic class/interface invovation

invokedType.getElementByLinkAttr (
  "typeArguments", 
  getAttrIntValue("index") // the index of the variable
)'
						MATCHING_ET='Type'
						BREAK_PARENT_BLOCK='when-executed'
						<AREA>
							<CTRL_GROUP>
								FMT={
									txtfl.delimiter.type='none';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Type Name'
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Type Parameters'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						DESCR='otherwise, which this was a normal type variable declared somewhere within this class'
						FMT={
							sec.outputStyle='text-par';
						}
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										ATTR='typeName'
										<DOC_HLINK>
											COND='// check if this type variable is declared for a class
// (not a generic constructor or method)

checkElementsByLPath("owner^::ClassDoc")'
											TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  "type parameter in " + getValueByLPath("owner^::ProgramElementDoc/@name")
: ""'
											HKEYS={
												'getAttrValue("owner")',required;
												'"detail"',required;
												'getAttrStringValue("typeName")';
											}
											HKEYS_MATCHING='supe'
										</DOC_HLINK>
										<URL_HLINK>
											COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line), when no internal
target (within the currently generated docs) can be found by the previous definitions.
Note that all these hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
											ALT_HLINK
											TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  "type parameter in " + getValueByLPath("owner^::ProgramElementDoc/@name")
: ""'
											URL_EXPR='getExternalDocURL (getElementByLinkAttr("owner", "ClassDoc"))'
										</URL_HLINK>
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<AREA_SEC>
				FMT={
					sec.outputStyle='text-par';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								FORMULA='name = getAttrStringValue("typeName");

getBooleanParam("show.qualifier") &&
findHyperTarget (Array (getAttrValue("asClassDoc"), "detail")) == null
? {
  qualifiedName = getAttrStringValue("qualifiedTypeName");
  matchQualifiedName (qualifiedName, getArrayParam("show.qualifier.omit"))
    ? name : qualifiedName
} : name'
								<DOC_HLINK>
									TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
									HKEYS={
										'getAttrValue("asClassDoc")';
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
									URL_EXPR='getExternalDocURL(getElementByLinkAttr("asClassDoc"))'
								</URL_HLINK>
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<AREA_SEC>
		SS_NAME='Type Name<Params>'
		MATCHING_ET='Type'
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='none';
		}
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<SS_CALL_CTRL>
						SS_NAME='Type Name'
						PARAMS_EXPR='stockSection.params'
					</SS_CALL_CTRL>
					<SS_CALL_CTRL>
						SS_NAME='Type Parameters'
						PARAMS_EXPR='stockSection.params'
					</SS_CALL_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<FOLDER>
		SS_NAME='Type Parameters'
		DESCR='prints formal type parameters of the class/interface/method/constructor or type arguments of the invocation of a generic class or interface.

param: when the given type is associated with an adopted member (e.g. result type of a field/method, type of a method parameter), the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that member'
		MATCHING_ETS={'ExecutableMemberDoc';'Type'}
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<ELEMENT_ITER>
				DESCR='the formal type parameters of the class/interface or the executable member'
				MATCHING_ETS={'ClassDoc';'ExecutableMemberDoc'}
				BREAK_PARENT_BLOCK='when-executed'
				TARGET_ET='TypeVariable'
				SCOPE='simple-location-rules'
				RULES={
					'* -> TypeVariable';
				}
				FMT={
					txtfl.delimiter.type='text';
					txtfl.delimiter.text=',';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									txtfl.delimiter.type='space';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Type Name'
										PARAMS_EXPR='stockSection.params'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<ELEMENT_ITER>
						DESCR='print the bounds of this type variable'
						TARGET_ET='Type'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> bounds^::Type';
						}
						FMT={
							txtfl.delimiter.type='text';
							txtfl.delimiter.text=' & ';
						}
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='stockSection.params'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												MATCHING_ET='ParameterizedType'
												SS_NAME='Type Parameters'
												PARAMS_EXPR='stockSection.params'
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
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='nbsp';
												}
											</DELIMITER>
											<TEXT_CTRL>
												TEXT='extends'
											</TEXT_CTRL>
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='nbsp';
												}
											</DELIMITER>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
				</BODY>
			</ELEMENT_ITER>
			<ELEMENT_ITER>
				DESCR='otherwise, print type arguments of the parameterized type'
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("asParameterizedType")'
				MATCHING_ET='ParameterizedType'
				TARGET_ET='Type'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> typeArguments^::Type';
				}
				FMT={
					txtfl.delimiter.type='text';
					txtfl.delimiter.text=',';
				}
				<BODY>
					<FOLDER>
						DESCR='if this is a parameterized type argument (an invocation of a generic class or interface)'
						MATCHING_ET='ParameterizedType'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='stockSection.params'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												MATCHING_ET='ParameterizedType'
												SS_NAME='Type Parameters'
												PARAMS_EXPR='stockSection.params'
											</SS_CALL_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</BODY>
					</FOLDER>
					<FOLDER>
						DESCR='otherwise, if this a wildcard type argument'
						MATCHING_ET='WildcardType'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='?'
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<ELEMENT_ITER>
								DESCR='print the upper bounds'
								TARGET_ET='Type'
								SCOPE='advanced-location-rules'
								RULES={
									'* -> extendsBounds^::Type';
								}
								FMT={
									txtfl.delimiter.type='text';
									txtfl.delimiter.text=' & ';
								}
								<BODY>
									<AREA_SEC>
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Type Name'
														PARAMS_EXPR='stockSection.params'
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														MATCHING_ET='ParameterizedType'
														SS_NAME='Type Parameters'
														PARAMS_EXPR='stockSection.params'
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
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='nbsp';
														}
													</DELIMITER>
													<TEXT_CTRL>
														TEXT='extends'
													</TEXT_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='nbsp';
														}
													</DELIMITER>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
							</ELEMENT_ITER>
							<ELEMENT_ITER>
								DESCR='print the lower bounds'
								TARGET_ET='Type'
								SCOPE='advanced-location-rules'
								RULES={
									'* -> superBounds^::Type';
								}
								FMT={
									txtfl.delimiter.type='text';
									txtfl.delimiter.text=' & ';
								}
								<BODY>
									<AREA_SEC>
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Type Name'
														PARAMS_EXPR='stockSection.params'
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														MATCHING_ET='ParameterizedType'
														SS_NAME='Type Parameters'
														PARAMS_EXPR='stockSection.params'
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
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='nbsp';
														}
													</DELIMITER>
													<TEXT_CTRL>
														TEXT='super'
													</TEXT_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='nbsp';
														}
													</DELIMITER>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
							</ELEMENT_ITER>
						</BODY>
					</FOLDER>
					<FOLDER>
						DESCR='otherwise, this is any other type argument (e.g TypeVariable)'
						COLLAPSED
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='stockSection.params'
											</SS_CALL_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</BODY>
					</FOLDER>
				</BODY>
			</ELEMENT_ITER>
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
	</FOLDER>
</STOCK_SECTIONS>
CHECKSUM='Dj6FC7MBt?WXks4jjKAvFrhvyKklBHrGk5YAtoxAe9U'
</DOCFLEX_TEMPLATE>