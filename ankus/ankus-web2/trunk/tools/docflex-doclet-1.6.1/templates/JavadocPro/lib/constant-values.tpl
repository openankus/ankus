<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-05-28 09:25:49'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
TITLE_EXPR='title = "Constant Field Values";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "Constant Field Values";

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
		param.title='Include deprecated API';
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
		style.name='Normal';
		style.id='s3';
		style.default='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.hlink.style.link='cs4';
}
<HTARGET>
	HKEYS={
		'"constant-field-values"';
	}
</HTARGET>
<ROOT>
	<FOLDER>
		<BODY>
			<ELEMENT_ITER>
				DESCR='Contents'
				TARGET_ET='PackageDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> PackageDoc';
					'* -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc';
				}
				SORTING='by-attr'
				SORTING_KEY={lpath='@name',ascending}
				FMT={
					sec.outputStyle='list';
				}
				<BODY>
					<AREA_SEC>
						COND='findHyperTarget (
  Array (contextElement.id, "constant-field-values")
) != null'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<PANEL>
										FMT={
											ctrl.size.width='81';
											ctrl.size.height='38.3';
										}
										<DOC_HLINK>
											HKEYS={
												'contextElement.id';
												'"constant-field-values"';
											}
										</DOC_HLINK>
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<DATA_CTRL>
														ATTR='name'
													</DATA_CTRL>
													<DELIMITER>
														FMT={
															txtfl.delimiter.type='text';
															txtfl.delimiter.text='.';
														}
													</DELIMITER>
													<TEXT_CTRL>
														TEXT='*'
													</TEXT_CTRL>
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
							<HR>
								FMT={
									rule.thickness='3';
									par.margin.top='0';
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
			</ELEMENT_ITER>
			<ELEMENT_ITER>
				DESCR='(1) collect all classes to be documented (see "Processing | Iteration Scope" & "Processing | Filtering | Filter Expression" tabs);
(2) sort collected classes by their qualified names (see "Processing | Sorting/Grouping | Sorting" tab);
(3) group classes by package names (see "Processing | Sorting/Grouping | Grouping" tab);
(4) iterate by class groups (effectively, by packages)'
				TARGET_ET='ClassDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> classes^::ClassDoc';
				}
				FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
				SORTING='by-attr'
				SORTING_KEY={lpath='@qualifiedName',ascending}
				GROUPING_KEY_EXPR='getAttrStringValue("containingPackageName")'
				<BODY>
					<ELEMENT_ITER>
						DESCR='iterate by classes within a group (see "Processing | Iteration Scope" tab)'
						TARGET_ET='ClassDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='parentIterator.groupElements'
						<BODY>
							<ELEMENT_ITER>
								DESCR='iterate by constant fields to be documented (see "Processing | Iteration Scope" & "Processing | Filtering | Filter Expression" tabs);

fields are sorted by names (see "Processing | Sorting/Grouping | Sorting" tab)'
								TARGET_ETS={'#CUSTOM';'FieldDoc'}
								SCOPE='advanced-location-rules'
								RULES={
									'* -> FieldDoc[getAttrValue("constantValueExpression") != ""
&&
(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)]';
									'* -> {findElementsByKey ("adopted-members", contextElement.id)}::#CUSTOM[getAttrBooleanValue("isField") &&
contextElement.value.toElement().getAttrValue("constantValueExpression") != ""]';
								}
								SORTING='by-expr'
								SORTING_KEY={expr='getAttrStringValue("name")',ascending}
								FMT={
									sec.outputStyle='table';
									sec.spacing.before='14';
								}
								<BODY>
									<AREA_SEC>
										CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
										MATCHING_ET='FieldDoc'
										<HTARGET>
											HKEYS={
												'contextElement.id';
												'"constant-value"';
											}
											NAME_EXPR='getAttrStringValue (
  sectionBlock.contextElement,
  "qualifiedName"
)'
										</HTARGET>
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Field Modifiers'
														FMT={
															ctrl.size.width='136.5';
															ctrl.size.height='17.3';
															tcell.align.horz='Right';
															tcell.option.nowrap='true';
															text.style='cs2';
														}
													</SS_CALL_CTRL>
													<DATA_CTRL>
														ATTR='name'
														FMT={
															ctrl.size.width='213.8';
															ctrl.size.height='17.3';
															tcell.option.nowrap='true';
															text.style='cs1';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'iterator.contextElement.id';
															}
															HKEYS_MATCHING='supe'
														</DOC_HLINK>
													</DATA_CTRL>
													<DATA_CTRL>
														ATTR='constantValueExpression'
														FMT={
															ctrl.size.width='149.3';
															ctrl.size.height='17.3';
															tcell.align.horz='Right';
															tcell.option.nowrap='true';
															text.style='cs1';
														}
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
													<PANEL>
														FMT={
															ctrl.size.width='499.5';
															ctrl.size.height='41.3';
															tcell.bkgr.color='#EEEEFF';
														}
														<AREA>
															<CTRL_GROUP>
																FMT={
																	text.font.style.bold='true';
																}
																<CTRLS>
																	<DATA_CTRL>
																		ATTR='containingPackageName'
																		FMT={
																			ctrl.option.text.noBlankOutput='true';
																		}
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
																			HKEYS={
																				'contextElement.id';
																				'"detail"';
																			}
																		</DOC_HLINK>
																	</DATA_CTRL>
																	<DELIMITER>
																		FMT={
																			txtfl.delimiter.type='none';
																		}
																	</DELIMITER>
																	<SS_CALL_CTRL>
																		SS_NAME='Type Parameters'
																	</SS_CALL_CTRL>
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
						<HEADER>
							<AREA_SEC>
								DESCR='package group heading'
								FMT={
									sec.outputStyle='table';
									table.sizing='Relative';
								}
								<HTARGET>
									HKEYS={
										'getAttrValue("containingPackage")';
										'"constant-field-values"';
									}
									NAME_EXPR='getAttrStringValue("containingPackageName")'
								</HTARGET>
								<AREA>
									<SPACER>
										FMT={
											spacer.height='14';
										}
									</SPACER>
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
															<DATA_CTRL>
																ATTR='containingPackageName'
															</DATA_CTRL>
															<DELIMITER>
																FMT={
																	txtfl.delimiter.type='text';
																	txtfl.delimiter.text='.';
																}
															</DELIMITER>
															<TEXT_CTRL>
																TEXT='*'
															</TEXT_CTRL>
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
								TEXT='Constant Field Values'
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
	<FOLDER>
		SS_NAME='Field Modifiers'
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
									ctrl.size.width='336.8';
									txtfl.delimiter.type='none';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Parameters'
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
		SS_NAME='Type Name'
		DESCR='print the type name (i.e. the name of the referenced class/interface or the name of the type variable)'
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
						CONTEXT_ELEMENT_EXPR='item = iterator.element;

// the member, in whose declaration this variable is used
member = item.instanceOf ("MemberDoc") ? 
           item : item.findPredecessorByType("MemberDoc");

// the parameterized type, which represents
// the invocation of a generic class/interface 
// where this member is defined

invokedType = member.findPredecessorByType("ParameterizedType");

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
	<FOLDER>
		SS_NAME='Type Parameters'
		DESCR='prints formal type parameters of a class/interface or type arguments of the invocation of a generic class or interface.'
		MATCHING_ET='Type'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
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
									<SS_CALL_CTRL>
										SS_NAME='Type Name'
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
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												MATCHING_ET='ParameterizedType'
												SS_NAME='Type Parameters'
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
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												MATCHING_ET='ParameterizedType'
												SS_NAME='Type Parameters'
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
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														MATCHING_ET='ParameterizedType'
														SS_NAME='Type Parameters'
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
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														MATCHING_ET='ParameterizedType'
														SS_NAME='Type Parameters'
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
CHECKSUM='6JSjjTBRGcdB1gvJldcPpX8qcN0OBQx1tLaSUdXZcOs'
</DOCFLEX_TEMPLATE>