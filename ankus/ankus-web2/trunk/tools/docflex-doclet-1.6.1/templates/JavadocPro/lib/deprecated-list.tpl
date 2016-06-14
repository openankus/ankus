<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-06-01 03:55:05'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
TITLE_EXPR='title = "Deprecated List";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "Deprecated List";

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
		text.font.size='14';
		text.font.style.bold='true';
		par.bkgr.opaque='true';
		par.bkgr.color='#CCCCFF';
		par.border.style='solid';
		par.border.color='#666666';
		par.margin.top='20';
		par.margin.bottom='1.4';
		par.padding.left='1.7';
		par.padding.right='1.7';
		par.padding.top='1.7';
		par.padding.bottom='1.7';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Heading 2';
		style.id='s2';
		text.font.size='15';
		text.font.style.bold='true';
		par.margin.top='15';
		par.margin.bottom='15';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs4';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s3';
		style.default='true';
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
	doc.hlink.style.link='cs4';
}
<HTARGET>
	HKEYS={
		'"deprecated-list"';
	}
</HTARGET>
<ROOT>
	<FOLDER>
		<BODY>
			<FOLDER>
				DESCR='CONTENTS'
				COLLAPSED
				FMT={
					sec.outputStyle='list';
					sec.spacing.after='14';
				}
				<BODY>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-interfaces") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Interfaces'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-interfaces"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-classes") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Classes'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-classes"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-enums") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Enums'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-enums"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-exceptions") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Exceptions'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-exceptions"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-errors") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Errors'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-errors"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-annotation-types") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Annotation Types'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-annotation-types"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-fields") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Fields'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-fields"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-methods") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Methods'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-methods"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-constructors") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Constructors'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-constructors"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-enum-constants") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Enum Constants'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-enum-constants"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='findHyperTarget ("deprecated-annotation-type-elements") != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Deprecated Annotation Type Elements'
										<DOC_HLINK>
											HKEYS={
												'"deprecated-annotation-type-elements"';
											}
										</DOC_HLINK>
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
				<HEADER>
					<AREA_SEC>
						<AREA>
							<HR>
								FMT={
									rule.thickness='3';
									par.margin.top='14';
									par.margin.bottom='4';
								}
							</HR>
							<CTRL_GROUP>
								FMT={
									par.margin.bottom='14';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Contents'
										FMT={
											text.font.style.bold='true';
										}
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</FOLDER>
			<ELEMENT_ITER>
				DESCR='DEPRECATED CLASSES'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> classes^::ClassDoc';
				}
				FILTER='(hasTag("@deprecated") || hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
				SORTING='by-compound-key'
				SORTING_KEY={
					{expr='getAttrBooleanValue("isInterface") ? 1 :
  getAttrBooleanValue("isOrdinaryClass") ? 2 :
    getAttrBooleanValue("isEnum") ? 3 :
      getAttrBooleanValue("isException") ? 4 :
        getAttrBooleanValue("isError") ? 5 : 6',ascending};
					{lpath='@qualifiedName',ascending};
				}
				GROUPING_KEY_EXPR='getAttrBooleanValue("isInterface") ? 1 :
  getAttrBooleanValue("isOrdinaryClass") ? 2 :
    getAttrBooleanValue("isEnum") ? 3 :
      getAttrBooleanValue("isException") ? 4 :
        getAttrBooleanValue("isError") ? 5 : 6'
				<BODY>
					<ELEMENT_ITER>
						DESCR='Deprecated Interfaces / Classes / Enums / Exceptions / Errors / Annotation Types'
						TARGET_ET='ClassDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='parentIterator.groupElements'
						FMT={
							sec.outputStyle='table';
							sec.spacing.after='18';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							COND='getAttrBooleanValue("isInterface")'
							HKEYS={
								'"deprecated-interfaces"';
							}
							NAME_EXPR='"interface"'
						</HTARGET>
						<HTARGET>
							COND='getAttrBooleanValue("isOrdinaryClass")'
							HKEYS={
								'"deprecated-classes"';
							}
							NAME_EXPR='"class"'
						</HTARGET>
						<HTARGET>
							COND='getAttrBooleanValue("isEnum")'
							HKEYS={
								'"deprecated-enums"';
							}
							NAME_EXPR='"enum"'
						</HTARGET>
						<HTARGET>
							COND='getAttrBooleanValue("isException")'
							HKEYS={
								'"deprecated-exceptions"';
							}
							NAME_EXPR='"exception"'
						</HTARGET>
						<HTARGET>
							COND='getAttrBooleanValue("isError")'
							HKEYS={
								'"deprecated-errors"';
							}
							NAME_EXPR='"error"'
						</HTARGET>
						<HTARGET>
							COND='getAttrBooleanValue("isAnnotationType")'
							HKEYS={
								'"deprecated-annotation-types"';
							}
							NAME_EXPR='"annotation-type"'
						</HTARGET>
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
																ATTR='qualifiedName'
																<DOC_HLINK>
																	TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
																	HKEYS={
																		'contextElement.id';
																		'"detail"';
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
																SS_NAME='Deprecated Comment'
																FMT={
																	text.font.style.italic='true';
																}
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
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<DATA_CTRL>
												FORMULA='getAttrBooleanValue("isInterface") ? "Deprecated Interfaces" :
getAttrBooleanValue("isOrdinaryClass") ? "Deprecated Classes" :
getAttrBooleanValue("isEnum") ? "Deprecated Enums" :
getAttrBooleanValue("isException") ? "Deprecated Exceptions" :
getAttrBooleanValue("isError") ? "Deprecated Errors" :
getAttrBooleanValue("isAnnotationType") ? "Deprecated Annotation Types" : "Deprecated ???"'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='18.8';
													text.style='cs5';
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
			<ELEMENT_ITER>
				DESCR='DEPRECATED MEMBERS'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MemberDoc'}
				SCOPE='advanced-location-rules'
				RULES={
					'* -> classes^::ClassDoc[! checkElementsByKey("excluded-classes", contextElement.id)]';
					'ClassDoc[resolveElementType(); true] -> MemberDoc[(hasTag("@deprecated") || hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)]',recursive;
					'ClassDoc -> {findElementsByKey ("adopted-members", contextElement.id)}::#CUSTOM[member = contextElement.value.toElement();
member.hasTag("@deprecated") || member.hasAnnotation("java.lang.Deprecated")]',recursive;
					'ClassDoc[getAttrBooleanValue("isEnum")] -> enumConstants^::MemberDoc[(hasTag("@deprecated") || hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)]',recursive;
				}
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrBooleanValue("isField") ? 1 :
getAttrBooleanValue("isMethod") ? 2 :
getAttrBooleanValue("isConstructor") ? 3 :
getAttrBooleanValue("isEnumConstant") ? 4 :
getAttrBooleanValue("isAnnotationTypeElement") ? 5 : 6',ascending}
				GROUPING_KEY_EXPR='getAttrBooleanValue("isField") ? 1 :
getAttrBooleanValue("isMethod") ? 2 :
getAttrBooleanValue("isConstructor") ? 3 :
getAttrBooleanValue("isEnumConstant") ? 4 :
getAttrBooleanValue("isAnnotationTypeElement") ? 5 : 6'
				<BODY>
					<ELEMENT_ITER>
						DESCR='Deprecated Fields'
						COND='getAttrBooleanValue("isField")'
						BREAK_PARENT_BLOCK='when-executed'
						TARGET_ETS={'#CUSTOM';'FieldDoc'}
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='parentIterator.groupElements'
						SORTING='by-expr'
						SORTING_KEY={expr='getAttrStringValue("name")',ascending}
						FMT={
							sec.outputStyle='table';
							sec.spacing.after='18';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							HKEYS={
								'"deprecated-fields"';
							}
							NAME_EXPR='"field"'
						</HTARGET>
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
																FORMULA='getAttrValue("qualifiedName")'
																<DOC_HLINK>
																	COND='instanceOf("FieldDoc")'
																	HKEYS={
																		'contextElement.id';
																		'"detail"';
																	}
																</DOC_HLINK>
																<DOC_HLINK>
																	COND='instanceOf("#CUSTOM")'
																	HKEYS={
																		'getAttrValue("id")';
																		'"detail"';
																		'getAttrValue("adoptingClassId")
';
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
																SS_NAME='Deprecated Comment'
																PASSED_ELEMENT_EXPR='instanceOf("FieldDoc") ? contextElement :
  contextElement.value.toElement()'
																PASSED_ELEMENT_MATCHING_ET='FieldDoc'
																FMT={
																	text.font.style.italic='true';
																}
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
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Deprecated Fields'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='18.8';
													text.style='cs5';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='Deprecated Methods'
						COND='getAttrBooleanValue("isMethod")'
						BREAK_PARENT_BLOCK='when-executed'
						TARGET_ETS={'#CUSTOM';'MethodDoc'}
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='parentIterator.groupElements'
						SORTING='by-expr'
						SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("signature")',ascending}
						FMT={
							sec.outputStyle='table';
							sec.spacing.after='18';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							HKEYS={
								'"deprecated-methods"';
							}
							NAME_EXPR='"method"'
						</HTARGET>
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
														<CTRLS>
															<DATA_CTRL>
																FORMULA='getAttrValue("qualifiedName") +
getAttrValue("flatSignature")'
																<DOC_HLINK>
																	COND='instanceOf("MethodDoc")'
																	HKEYS={
																		'contextElement.id';
																		'"detail"';
																	}
																</DOC_HLINK>
																<DOC_HLINK>
																	COND='instanceOf("#CUSTOM")'
																	HKEYS={
																		'getAttrValue("id")';
																		'"detail"';
																		'getAttrValue("adoptingClassId")
';
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
																SS_NAME='Deprecated Comment (Method)'
																PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
  contextElement.value.toElement() : contextElement'
																PASSED_ELEMENT_MATCHING_ET='MethodDoc'
																FMT={
																	text.font.style.italic='true';
																}
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
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Deprecated Methods'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='18.8';
													text.style='cs5';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='Deprecated Constructors'
						COND='getAttrBooleanValue("isConstructor")'
						BREAK_PARENT_BLOCK='when-executed'
						TARGET_ET='ConstructorDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='parentIterator.groupElements'
						SORTING='by-expr'
						SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("signature")',ascending}
						FMT={
							sec.outputStyle='table';
							sec.spacing.after='18';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							HKEYS={
								'"deprecated-constructors"';
							}
							NAME_EXPR='"constructor"'
						</HTARGET>
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
																FORMULA='getAttrValue("qualifiedName") +
getAttrValue("flatSignature")'
																<DOC_HLINK>
																	HKEYS={
																		'contextElement.id';
																		'"detail"';
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
																SS_NAME='Deprecated Comment'
																FMT={
																	text.font.style.italic='true';
																}
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
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Deprecated Constructors'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='18.8';
													text.style='cs5';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='Deprecated Enum Constants / Annotation Type Elements'
						TARGET_ET='MemberDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='parentIterator.groupElements'
						SORTING='by-attr'
						SORTING_KEY={lpath='@name',ascending}
						FMT={
							sec.outputStyle='table';
							sec.spacing.after='18';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							COND='getAttrBooleanValue("isEnumConstant")'
							HKEYS={
								'"deprecated-enum-constants"';
							}
							NAME_EXPR='"enum_constant"'
						</HTARGET>
						<HTARGET>
							COND='getAttrBooleanValue("isAnnotationTypeElement")'
							HKEYS={
								'"deprecated-annotation-type-elements"';
							}
							NAME_EXPR='"annotation_type_member"'
						</HTARGET>
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
																ATTR='qualifiedName'
																<DOC_HLINK>
																	HKEYS={
																		'contextElement.id';
																		'"detail"';
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
																SS_NAME='Deprecated Comment'
																FMT={
																	text.font.style.italic='true';
																}
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
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<DATA_CTRL>
												FORMULA='getAttrBooleanValue("isEnumConstant") ? "Deprecated Enum Constants" :
getAttrBooleanValue("isAnnotationTypeElement") ? "Deprecated Annotation Type Elements" : "Deprecated ???"'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='18.8';
													text.style='cs5';
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
		<HEADER>
			<TEMPLATE_CALL>
				DESCR='Navigation Bar'
				COND='output.type == "document" && getBooleanParam("gen.navbar")'
				TEMPLATE_FILE='navbar.tpl'
				PASSED_PARAMS={
					'$type','"deprecated"';
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
								TEXT='Deprecated API'
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
					'$type','"deprecated"';
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
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								FORMULA='trim (
  getAttrStringValue("text"),
  iterator.isFirstItem,
  false
)'
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
		SS_NAME='Deprecated Comment'
		DESCR='iterate by @deprecated tags'
		MATCHING_ET='Doc'
		ALWAYS_PROC_HDRFTR
		TARGET_ET='Tag'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByIds(tags("@deprecated"))'
		FMT={
			sec.spacing.after='14';
		}
		<BODY>
			<ELEMENT_ITER>
				TARGET_ET='Tag'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='getElementsByLinkAttr ("inlineTags")'
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
										FORMULA='trim (
  getAttrStringValue("text"),
  iterator.isFirstItem,
  false
)'
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
		</BODY>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Deprecated Comment (Method)'
		DESCR='iterate by @deprecated tags'
		MATCHING_ET='MethodDoc'
		ALWAYS_PROC_HDRFTR
		TARGET_ET='Tag'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByIds(tags("@deprecated"))'
		FMT={
			sec.spacing.after='14';
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
	</ELEMENT_ITER>
</STOCK_SECTIONS>
CHECKSUM='7B1ZdpE9u4q61UXoQ+jaRefkovWxrmIucXpmSsVTQfY'
</DOCFLEX_TEMPLATE>