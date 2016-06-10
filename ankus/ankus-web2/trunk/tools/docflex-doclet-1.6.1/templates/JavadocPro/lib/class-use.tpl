<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-07-24 02:46:52'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='ClassDoc'
TITLE_EXPR='title = "Uses of " +
        (getAttrBooleanValue("isInterface") ? "Interface" : "Class")
        + " " +
        getAttrValue("qualifiedName");

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "Uses of " +
        (getAttrBooleanValue("isInterface") ? "Interface" : "Class")
        + " " +
        getAttrValue("qualifiedName");

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
		style.name='Heading 2';
		style.id='s2';
		text.font.size='15';
		text.font.style.bold='true';
		par.margin.top='15';
		par.margin.bottom='15';
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
			par.style='s2';
			par.alignment='Center';
		}
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Uses of'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isInterface")'
						TEXT='Interface'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='! getAttrBooleanValue("isInterface")'
						TEXT='Class'
					</TEXT_CTRL>
					<DELIMITER>
						FMT={
							txtfl.delimiter.type='nl';
						}
					</DELIMITER>
					<DATA_CTRL>
						ATTR='qualifiedName'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<ELEMENT_ITER>
		DESCR='list of packages that use the class'
		TARGET_ET='PackageDoc'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByKey ("class-use-packages", contextElement.id)'
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
										'"uses-of-class-in-package"';
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
									text.style='cs5';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Packages that use'
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
		DESCR='details of uses of the class in each packages'
		STEP_EXPR='output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")'
		TARGET_ET='PackageDoc'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByKey ("class-use-packages", contextElement.id)'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		<BODY>
			<AREA_SEC>
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
				}
				<HTARGET>
					HKEYS={
						'"uses-of-class-in-package"';
						'rootElement.id';
						'contextElement.id';
					}
					NAME_EXPR='getAttrStringValue("name")'
				</HTARGET>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<PANEL>
								FMT={
									ctrl.size.width='499.5';
									ctrl.size.height='43.5';
									tcell.bkgr.color='#CCCCFF';
									par.style='s1';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Uses of'
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
												TEXT='in'
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
			<ELEMENT_ITER>
				DESCR='Subclasses/subinterfaces of <class> in <package>'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-superclass",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
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
									<SS_CALL_CTRL>
										SS_NAME='Class Modifiers'
										PARAMS_EXPR='Array (
  false,
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Class Name'
														FMT={
															text.style='cs1';
															text.font.style.bold='true';
														}
													</SS_CALL_CTRL>
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														COND='rootElement.getAttrBooleanValue("isClass")'
														TEXT='Subclasses'
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='rootElement.getAttrBooleanValue("isInterface")'
														TEXT='Subinterfaces'
													</TEXT_CTRL>
													<TEXT_CTRL>
														TEXT='of'
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
														TEXT='in'
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
				DESCR='Classes in <package> that implement <interface>'
				COND='rootElement.getAttrBooleanValue("isInterface")'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-implemented-interface",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
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
									<SS_CALL_CTRL>
										SS_NAME='Class Modifiers'
										PARAMS_EXPR='Array (
  false,
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Class Name'
														FMT={
															text.style='cs1';
															text.font.style.bold='true';
														}
													</SS_CALL_CTRL>
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Classes in'
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
													<TEXT_CTRL>
														TEXT='that implement'
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
				DESCR='Classes in <package> with annotations of type <class>'
				COND='rootElement.getAttrBooleanValue("isAnnotationType")'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-class-annotation-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("qualifiedName")',ascending}
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
									<SS_CALL_CTRL>
										SS_NAME='Class Modifiers'
										PARAMS_EXPR='Array (
  false,
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Class Name'
														FMT={
															text.style='cs1';
															text.font.style.bold='true';
														}
													</SS_CALL_CTRL>
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Classes in'
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
													<TEXT_CTRL>
														TEXT='with annotations of type'
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
				DESCR='Classes in <package> with type parameters of type <class>'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-class-type-param-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("qualifiedName")',ascending}
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
									<SS_CALL_CTRL>
										SS_NAME='Class Modifiers'
										PARAMS_EXPR='Array (
  false,
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Class Name'
														FMT={
															text.style='cs1';
															text.font.style.bold='true';
														}
													</SS_CALL_CTRL>
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Classes in'
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
													<TEXT_CTRL>
														TEXT='with type parameters of type'
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
				DESCR='Fields in <package> with annotations of type <class>'
				COND='rootElement.getAttrBooleanValue("isAnnotationType")'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'FieldDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-field-annotation-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='FieldDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Field Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
										MATCHING_ET='FieldDoc'
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													text.font.style.bold='true';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Fields in'
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
													<TEXT_CTRL>
														TEXT='with annotations of type'
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
				DESCR='Fields in <package> declared as <class>'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'FieldDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-field-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='FieldDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Field Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
										MATCHING_ET='FieldDoc'
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													text.font.style.bold='true';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Fields in'
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
													<TEXT_CTRL>
														TEXT='declared as'
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
				DESCR='Fields in <package> with type parameters of type <class>'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'FieldDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-field-type-argument",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='FieldDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Field Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
										MATCHING_ET='FieldDoc'
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													text.font.style.bold='true';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Fields in'
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
													<TEXT_CTRL>
														TEXT='with type parameters of type'
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
				DESCR='Methods in <package> with annotations of type <class>'
				COND='rootElement.getAttrBooleanValue("isAnnotationType")'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MethodDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-method-annotation-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='MethodDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Operation Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															ctrl.size.width='145.5';
															ctrl.size.height='17.3';
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															text.font.style.bold='true';
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
													</SS_CALL_CTRL>
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
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														SS_NAME='Comment_Summary (Method)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Methods in'
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
													<TEXT_CTRL>
														TEXT='with annotations of type'
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
				DESCR='Methods in <package> with type parameters of type <class>'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MethodDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-method-type-param-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='MethodDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Operation Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															ctrl.size.width='145.5';
															ctrl.size.height='17.3';
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															text.font.style.bold='true';
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
													</SS_CALL_CTRL>
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
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														SS_NAME='Comment_Summary (Method)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Methods in'
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
													<TEXT_CTRL>
														TEXT='with type parameters of type'
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
				DESCR='Methods in <package> that return <class>'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MethodDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-method-return-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='MethodDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Operation Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															ctrl.size.width='145.5';
															ctrl.size.height='17.3';
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															text.font.style.bold='true';
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
													</SS_CALL_CTRL>
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
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														SS_NAME='Comment_Summary (Method)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Methods in'
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
													<TEXT_CTRL>
														TEXT='that return'
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
				DESCR='Methods in <package> that return types with arguments of type <class>'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MethodDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-method-return-type-argument",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='MethodDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Operation Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															ctrl.size.width='145.5';
															ctrl.size.height='17.3';
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															text.font.style.bold='true';
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
													</SS_CALL_CTRL>
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
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														SS_NAME='Comment_Summary (Method)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Methods in'
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
													<TEXT_CTRL>
														TEXT='that return types with arguments of type'
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
				DESCR='Methods in <package> with parameters of type <class>'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MethodDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-method-param-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='MethodDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Operation Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															ctrl.size.width='145.5';
															ctrl.size.height='17.3';
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															text.font.style.bold='true';
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
													</SS_CALL_CTRL>
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
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														SS_NAME='Comment_Summary (Method)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Methods in'
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
													<TEXT_CTRL>
														TEXT='with parameters of type'
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
				DESCR='Method parameters in <package> with type arguments of type <class>'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MethodDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-method-param-type-argument",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='MethodDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Operation Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															ctrl.size.width='145.5';
															ctrl.size.height='17.3';
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															text.font.style.bold='true';
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
													</SS_CALL_CTRL>
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
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														SS_NAME='Comment_Summary (Method)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Method parameters in'
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
													<TEXT_CTRL>
														TEXT='with type arguments of type'
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
				DESCR='Method parameters in <package> with annotations of type <class>'
				COND='rootElement.getAttrBooleanValue("isAnnotationType")'
				COLLAPSED
				TARGET_ETS={'#CUSTOM';'MethodDoc'}
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-method-param-annotation-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
				FMT={
					sec.outputStyle='table';
					sec.spacing.after='20';
					table.sizing='Relative';
					table.border.style='solid';
					table.border.color='#000000';
				}
				<BODY>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ?
{
  thisContext.setVar (
    "containingClass",
    findElementById (getAttrValue("adoptingClassId"))
  );

  thisContext.setVar (
    "parentClassInvocation",
    getAttrValue ("parentClassInvocation")
  );

  contextElement.value.toElement()

} : {

  thisContext.setVar (
    "containingClass",
    getElementByLinkAttr("containingClass")
  );

  thisContext.setVar ("parentClassInvocation", null);

  contextElement
}'
						MATCHING_ET='MethodDoc'
						<AREA>
							<CTRL_GROUP>
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Operation Modifiers'
										PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
										FMT={
											ctrl.size.width='39';
											ctrl.size.height='68.3';
											tcell.sizing='Minimal';
											tcell.align.horz='Right';
											tcell.align.vert='Top';
											text.style='cs2';
										}
									</SS_CALL_CTRL>
									<PANEL>
										FMT={
											ctrl.size.width='460.5';
											ctrl.size.height='68.3';
											tcell.align.vert='Top';
										}
										<AREA>
											<CTRL_GROUP>
												FMT={
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														FORMULA='thisContext.getElementVar("containingClass").getAttrValue("name")'
														FMT={
															ctrl.size.width='145.5';
															ctrl.size.height='17.3';
															text.font.style.bold='true';
														}
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															text.font.style.bold='true';
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'thisContext.getElementVar("containingClass").id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (thisContext.getVar("parentClassInvocation"))'
													</SS_CALL_CTRL>
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
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														SS_NAME='Comment_Summary (Method)'
														PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Method parameters in'
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
													<TEXT_CTRL>
														TEXT='with annotations of type'
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
				DESCR='Constructors in <package> with annotations of type <class>'
				COND='rootElement.getAttrBooleanValue("isAnnotationType")'
				COLLAPSED
				TARGET_ET='ConstructorDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-constructor-annotation-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
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
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id';
																'"detail"';
															}
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PARAMS_EXPR='Array (
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
													</SS_CALL_CTRL>
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (getElementByLinkAttr("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Constructors in'
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
													<TEXT_CTRL>
														TEXT='with annotations of type'
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
				DESCR='Constructors in <package> with type parameters of type <class>'
				COLLAPSED
				TARGET_ET='ConstructorDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-constructor-type-param-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
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
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id';
																'"detail"';
															}
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PARAMS_EXPR='Array (
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
													</SS_CALL_CTRL>
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (getElementByLinkAttr("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Constructors in'
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
													<TEXT_CTRL>
														TEXT='with type parameters of type'
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
				DESCR='Constructors in <package> with parameters of type <class>'
				COLLAPSED
				TARGET_ET='ConstructorDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-constructor-param-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
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
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id';
																'"detail"';
															}
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PARAMS_EXPR='Array (
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
													</SS_CALL_CTRL>
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (getElementByLinkAttr("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Constructors in'
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
													<TEXT_CTRL>
														TEXT='with parameters of type'
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
				DESCR='Constructor parameters in <package> with type arguments of type <class>'
				COLLAPSED
				TARGET_ET='ConstructorDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-constructor-param-type-argument",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
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
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id';
																'"detail"';
															}
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PARAMS_EXPR='Array (
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
													</SS_CALL_CTRL>
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (getElementByLinkAttr("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Constructor parameters in'
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
													<TEXT_CTRL>
														TEXT='with type arguments of type'
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
				DESCR='Constructor parameters in <package> with annotations of type <class>'
				COND='rootElement.getAttrBooleanValue("isAnnotationType")'
				COLLAPSED
				TARGET_ET='ConstructorDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "class-use-as-constructor-param-annotation-type",
  HashKey (rootElement.id, contextElement.id)
)'
				SORTING='by-expr'
				SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
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
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<CTRLS>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															text.font.style.bold='true';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id';
																'"detail"';
															}
														</DOC_HLINK>
													</DATA_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Operation Parameters'
														PARAMS_EXPR='Array (
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
													</SS_CALL_CTRL>
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
														SS_NAME='Comment_Summary (Member)'
														PARAMS_EXPR='Array (getElementByLinkAttr("containingClass"))'
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
									<PANEL>
										FMT={
											ctrl.size.width='499.5';
											ctrl.size.height='41.3';
											tcell.bkgr.color='#EEEEFF';
											text.font.style.bold='true';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Constructor parameters in'
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
													<TEXT_CTRL>
														TEXT='with annotations of type'
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
			DESCR='No usage of <class>'
			COLLAPSED
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='No usage of'
							</TEXT_CTRL>
							<DATA_CTRL>
								ATTR='qualifiedName'
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
	<AREA_SEC>
		SS_NAME='Class Modifiers'
		MATCHING_ET='ClassDoc'
		FMT={
			sec.outputStyle='text-par';
		}
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isProtected")'
						TEXT='protected'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isPackagePrivate")'
						TEXT='(package private)'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isPrivate")'
						TEXT='private'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isStatic")'
						TEXT='static'
					</TEXT_CTRL>
					<DELIMITER>
						COND='getAttrBooleanValue("isStatic")'
						FMT={
							txtfl.delimiter.type='nbsp';
						}
					</DELIMITER>
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
						TEXT='@interface'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		SS_NAME='Class Name'
		MATCHING_ET='ClassDoc'
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<SS_CALL_CTRL>
						SS_NAME='Type Name<Params>'
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
(specified with -link/-linkoffline options on Javadoc command line),  when 
by the previous definition no internal target (within the currently generated docs) 
can be found.
Note that both hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
							TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
							URL_EXPR='getExternalDocURL()'
						</URL_HLINK>
					</SS_CALL_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
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
						PARAMS_EXPR='stockSection.params'
					</SS_CALL>
				</BODY>
			</FOLDER>
			<TEMPLATE_CALL>
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
		SS_NAME='Comment_Summary (Member)'
		DESCR='SUMMARY COMMENT TO ANY CLASS MEMBER (except a method);

param: GOMElement representing the class containing the member'
		MATCHING_ET='MemberDoc'
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
								PARAMS_EXPR='containingClass = stockSection.param.toElement();

Array (
  "inlineTags",
  containingClass.getAttrValue("containingPackage"),
  containingClass.id
)'
								FMT={
									text.font.style.italic='true';
								}
							</SS_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				DESCR='automatically add "deprecated" when the whole containing class is deprecated'
				COND='containgClass = stockSection.param.toElement();

containgClass.hasTag("@deprecated") || 
containgClass.hasAnnotation("java.lang.Deprecated")'
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
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<SS_CALL>
				DESCR='if no @deprecated tag, generate a description by the method\'s "firstSentenceTags" inline tags'
				SS_NAME='Comment'
				PARAMS_EXPR='containingClass = stockSection.param.toElement();

Array (
  "firstSentenceTags",
  containingClass.getAttrValue("containingPackage"),
  containingClass.id
)'
			</SS_CALL>
		</BODY>
		<ELSE>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT=' '
								FMT={
									text.option.nbsps='true';
								}
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</ELSE>
	</FOLDER>
	<FOLDER>
		SS_NAME='Comment_Summary (Method)'
		DESCR='SUMMARY COMMENT TO A METHOD;

param: GOMElement representing the class containing the method'
		MATCHING_ET='MethodDoc'
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
								SS_NAME='Comment (Method)'
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
			<AREA_SEC>
				DESCR='automatically add "deprecated" when the whole class is deprecated'
				COND='containgClass = stockSection.param.toElement();

containgClass.hasTag("@deprecated") || 
containgClass.hasAnnotation("java.lang.Deprecated")'
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
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<SS_CALL>
				DESCR='if no @deprecated tag, generate a description by the method\'s "firstSentenceTags" inline tags'
				BREAK_PARENT_BLOCK='when-output'
				SS_NAME='Comment (Method)'
				PARAMS_EXPR='Array ("firstSentenceTags")'
			</SS_CALL>
			<FOLDER>
				DESCR='if still no description, try to copy it from the inherited method of an implemented interface or parent class. (see switching to this method in the "Context Element " tab)'
				CONTEXT_ELEMENT_EXPR='// find the closest overridden or implemented method 
// that has any documentation by it

findElementByKey (
  "overridden-implemented-methods",
  contextElement.id,
  BooleanQuery (! getAttrValues("firstSentenceTags").isEmpty())
)'
				MATCHING_ET='MethodDoc'
				INIT_EXPR='/* Assign a new search path for the input files associated with the method
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method. */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")
'
				<BODY>
					<SS_CALL>
						SS_NAME='Comment (Method)'
						PARAMS_EXPR='Array ("firstSentenceTags")'
					</SS_CALL>
				</BODY>
			</FOLDER>
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
	<FOLDER>
		SS_NAME='Field Modifiers'
		DESCR='param: when this is an adopted field, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that field'
		MATCHING_ET='FieldDoc'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isProtected")'
								TEXT='protected'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isPrivate")'
								TEXT='private'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isStatic") &&
rootElement.getAttrBooleanValue("isClass")'
								TEXT='static'
							</TEXT_CTRL>
							<DELIMITER>
								COND='getAttrBooleanValue("isStatic")'
								FMT={
									txtfl.delimiter.type='nbsp';
								}
							</DELIMITER>
							<PANEL>
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("type")'
								MATCHING_ET='Type'
								FMT={
									ctrl.size.width='330.8';
									ctrl.size.height='38.3';
									txtfl.delimiter.type='none';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='Array (false, null, stockSection.params [1])'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Parameters'
												PARAMS_EXPR='Array (false, null, stockSection.params [1])'
											</SS_CALL_CTRL>
											<DATA_CTRL>
												ATTR='dimension'
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</PANEL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Operation Modifiers'
		DESCR='param: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method'
		MATCHING_ET='ExecutableMemberDoc'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isProtected")'
								TEXT='protected'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isPrivate")'
								TEXT='private'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isAbstract") && 
rootElement.getAttrBooleanValue("isClass")'
								TEXT='abstract'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isStatic")'
								TEXT='static'
							</TEXT_CTRL>
							<SS_CALL_CTRL>
								DESCR='the formal type parameters of this method or constructor'
								SS_NAME='Type Parameters'
							</SS_CALL_CTRL>
							<DELIMITER>
								COND='hasChild("TypeVariable") ?
  callStockSection("Type Parameters").indexOf (\' \') < 0
  : getAttrBooleanValue("isStatic")'
								FMT={
									txtfl.delimiter.type='nbsp';
								}
							</DELIMITER>
							<PANEL>
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("returnType")'
								MATCHING_ET='Type'
								FMT={
									ctrl.size.width='330.8';
									ctrl.size.height='38.3';
									txtfl.delimiter.type='none';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='Array (false, null, stockSection.params [1])'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Parameters'
												PARAMS_EXPR='Array (false, null, stockSection.params [1])'
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
	<ELEMENT_ITER>
		SS_NAME='Operation Parameters'
		DESCR='param: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method'
		MATCHING_ET='ExecutableMemberDoc'
		ALWAYS_PROC_HDRFTR
		TARGET_ET='Parameter'
		SCOPE='simple-location-rules'
		RULES={
			'* -> Parameter';
		}
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
							txtfl.delimiter.type='space';
						}
						<CTRLS>
							<PANEL>
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("type")'
								MATCHING_ET='Type'
								FMT={
									ctrl.size.width='456.8';
									ctrl.size.height='56.3';
									txtfl.delimiter.type='none';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='Array (false, null, stockSection.param)'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Parameters'
												PARAMS_EXPR='Array (false, null, stockSection.param)'
											</SS_CALL_CTRL>
											<DATA_CTRL>
												FORMULA='iterator.isLastItem && 
iterator.contextElement.getAttrBooleanValue("isVarArgs") ? 
"..." : getAttrStringValue("dimension")'
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
	<FOLDER>
		SS_NAME='Type Name'
		DESCR='print the type name (i.e. the name of the referenced class/interface or the name of the type variable);

param[0]: boolean \'true\' prohibits hyperlinks from type variables
param[1]: context class ID; may be specified to prohinit hyperlinks to itself
param[2]: when the given type is associated with an adopted member (e.g. result type of a field/method, type of a method parameter), the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that member'
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
						COND='// test if this type variable is defined in a different class
// (not being currently documented)

owner_id = getAttrValue("owner");

owner_id != rootElement.id && 
findElementById (owner_id, "ClassDoc") != null'
						CONTEXT_ELEMENT_EXPR='// the parameterized type, which represents
// the invocation of a generic class/interface 
// where this member is defined

invokedType = stockSection.params[2].toElement();

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
											COND='// check if hyperlinks from type variables are allowed
// (not prohibited) and this type variable is declared for a class
// (not a generic constructor or method)

! stockSection.param.toBoolean() &&
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
default one). However, the one defined the first will be executed the first */

! stockSection.param.toBoolean()'
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
									COND='stockSection.params[1] != getAttrValue("asClassDoc")'
									TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
									HKEYS={
										'getAttrValue("asClassDoc")';
										'"detail"';
									}
								</DOC_HLINK>
								<URL_HLINK>
									COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line),  when 
by the previous definition no internal target (within the currently generated docs) 
can be found.
Note that both hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */

stockSection.params[1] != getAttrValue("asClassDoc")'
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
	<FOLDER>
		SS_NAME='Type Name<Params>'
		MATCHING_ET='Type'
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='none';
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
			<ELEMENT_ITER>
				DESCR='the formal type parameters of the class/interface'
				MATCHING_ET='ClassDoc'
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
									<DATA_CTRL>
										ATTR='typeName'
									</DATA_CTRL>
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
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='nbsp';
												}
											</DELIMITER>
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
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name<Params>'
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
						FMT={
							txtfl.delimiter.type='space';
						}
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
														TEXT='super'
													</TEXT_CTRL>
													<DELIMITER>
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
											<DATA_CTRL>
												ATTR='typeName'
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</BODY>
					</FOLDER>
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
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Type Parameters'
		DESCR='prints formal type parameters of the class/interface/method/constructor or type arguments of the invocation of a generic class or interface.

param[0]: boolean \'true\' prohibits hyperlinks from type variables
param[1]: context class ID; may be specified to prohinit hyperlinks to itself
param[2]: when the given type is associated with an adopted member (e.g. result type of a field/method, type of a method parameter), the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that member'
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
						FMT={
							txtfl.delimiter.type='space';
						}
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
CHECKSUM='R3CNcyngU7zktPqsbzhrZPXY1+YhU9jMFmzMl0KhEfc'
</DOCFLEX_TEMPLATE>