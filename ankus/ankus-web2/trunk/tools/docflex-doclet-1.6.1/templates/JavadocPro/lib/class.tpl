<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:49:00'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='ClassDoc'
FINISH_EXPR='/* When the HTML output is being generated, copy all files from the local "doc-files" 
subdir contained in the class source directory to the destination Associated Files 
directory (to have all images inserted in the Java comments using <IMG> tags
get in the result documentation) */

output.generating && output.format.name == "HTML" ? 
  copyFiles (output.inputFilesPath + "doc-files", output.docFilesDir)'
TITLE_EXPR='className = getAttrStringValue("name");

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? className + " (" + parentTitle + ")" : className'
HTML_HEAD_EXPR='className = getAttrStringValue("name");

title = ((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? className + " (" + parentTitle + ")" : className;

\'<SCRIPT type="text/javascript">
    window.onload = function() {
        if (location.href.indexOf(\\\'is-external=true\\\') == -1)
            parent.document.title="\' + encodeJScriptString (title) + \'";
    }
</SCRIPT>\''
<TEMPLATE_PARAMS>
	PARAM={
		param.name='$contextClassId';
		param.description='GOMElement.id of the class for which the current document is being generated. This is used in "see-link.tpl" subtemplate to shorten the names of linked program elements according to the context of this class.
<p>
Note: This parameter is assigned here to be auto-passed to the called subtemplates.';
		param.type='Object';
		param.defaultValue.expr='contextElement.id';
		param.fixed='true';
	}
	PARAM={
		param.name='$contextPackageId';
		param.description='GOMElement.id of the package for which (or for whose class) the current document (or its fragment) is being generated.  This is used to shorten the linked program element\'s qualified name according to the context where it is mentioned.
<p>
Note: This parameter is assigned here to be auto-passed to the called subtemplates.';
		param.type='Object';
		param.defaultValue.expr='getAttrValue("containingPackage")';
		param.fixed='true';
	}
	PARAM={
		param.name='$contextClassDeprecated';
		param.description='Indicates that the whole this class (being documented by this template) is deprecated. This is used to show automatically every member of this class as deprectated as well.';
		param.type='boolean';
		param.defaultValue.expr='hasTag("@deprecated") || hasAnnotation("java.lang.Deprecated")';
		param.fixed='true';
	}
	PARAM={
		param.name='$resourceOutputDir';
		param.title='Documentation resources directory';
		param.description='This parameter is assigned in FramedDoc.tpl main template';
		param.type='string';
	}
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
		param.name='gen.class.member.summary';
		param.title='Member Summary';
		param.group='true';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.class.member.summary.inherited';
		param.title='Inherited Members';
		param.group='true';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.class.member.summary.inherited.exclude';
		param.title='Exclude for Packages';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
	}
	PARAM={
		param.name='gen.class.member.detail';
		param.title='Member Detail';
		param.group='true';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.class.member.detail.constantValues';
		param.title='Constant Field Values';
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
		param.title='Deprecated API';
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
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs4';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='List Heading';
		style.id='s4';
		style.local='true';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='1.1';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Member Heading';
		style.id='s5';
		text.font.size='11.5';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s6';
		style.default='true';
	}
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs5';
		text.font.size='9';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs6';
		text.font.size='15';
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
		'"detail"';
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
					<DATA_CTRL>
						ATTR='qualifiedName'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</PAGE_HEADER>
<ROOT>
	<TEMPLATE_CALL>
		DESCR='Navigation Bar'
		COND='output.type == "document" && getBooleanParam("gen.navbar")'
		TEMPLATE_FILE='navbar.tpl'
		PASSED_PARAMS={
			'$type','"class"';
			'$location','"header"';
		}
	</TEMPLATE_CALL>
	<AREA_SEC>
		DESCR='Title (used in framed documentation)'
		FMT={
			sec.page.keepTogether='true';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s2';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='(name = getAttrValue("containingPackageName")) != "" ? name : "<unnamed>"'
						FMT={
							ctrl.option.text.trimSpaces='true';
							ctrl.option.text.noBlankOutput='true';
						}
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					par.style='s1';
				}
				<CTRLS>
					<PANEL>
						COND='output.type == "document"'
						FMT={
							ctrl.size.width='159.8';
						}
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isInterface")'
										TEXT='Interface'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isClass") &&
! getAttrBooleanValue("isEnum")'
										TEXT='Class'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isEnum")'
										TEXT='Enum'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isAnnotationType")'
										TEXT='Annotation Type'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</PANEL>
					<DATA_CTRL>
						ATTR='name'
					</DATA_CTRL>
					<DELIMITER>
						FMT={
							txtfl.delimiter.type='none';
						}
					</DELIMITER>
					<SS_CALL_CTRL>
						COND='output.type == "document"'
						SS_NAME='Type Parameters'
						PARAMS_EXPR='// prohibit hyperlinks from type variables and
// self-references
Array(true, contextElement.id)'
					</SS_CALL_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<FOLDER>
		DESCR='INTERFACE  (specific)'
		COND='getAttrBooleanValue("isInterface")'
		<BODY>
			<SS_CALL>
				DESCR='type parameters documentation'
				SS_NAME='Type Params Doc'
				FMT={
					sec.spacing.before='14';
				}
			</SS_CALL>
			<ELEMENT_ITER>
				DESCR='All Superinterfaces'
				COLLAPSED
				TARGET_ET='Type'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> interfaceTypes^::(ClassDoc|ParameterizedType)',recursive;
				}
				FILTER_BY_KEY='getAttrValue("asClassDoc")'
				FILTER='isVisible()
&&
! checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))'
				SORTING='by-attr'
				SORTING_KEY={lpath='@typeName',ascending}
				FMT={
					sec.outputStyle='list';
					list.type='delimited';
					list.margin.block='true';
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
										SS_NAME='Class Name'
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Type Parameters'
										PARAMS_EXPR='Array(true) // prohibit hyperlinks from type variables'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
				<HEADER>
					<AREA_SEC>
						FMT={
							sec.outputStyle='pars';
						}
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.style='s4';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='All Superinterfaces:'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<ELEMENT_ITER>
				DESCR='All Known Subinterfaces'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "all-known-subinterfaces",
  contextElement.id
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
								FMT={
									txtfl.delimiter.type='none';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
									</SS_CALL_CTRL>
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
								FMT={
									par.style='s4';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='All Known Subinterfaces:'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<ELEMENT_ITER>
				DESCR='All Known Implementing Classes'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "all-known-implementing-classes", 
  contextElement.id
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
								FMT={
									txtfl.delimiter.type='space';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
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
									par.style='s4';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='All Known Implementing Classes:'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<SS_CALL>
				SS_NAME='Enclosing Class'
			</SS_CALL>
			<FOLDER>
				DESCR='interface header'
				COLLAPSED
				FMT={
					sec.page.keepTogether='true';
					text.style='cs1';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<HR>
								FMT={
									par.margin.top='10';
									par.margin.bottom='0';
								}
							</HR>
							<CTRL_GROUP>
								FMT={
									par.margin.top='12';
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
										SS_NAME='Class Modifiers'
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
										SS_NAME='Type Parameters'
										PARAMS_EXPR='// prohibit hyperlinks from type variables and
// self-references
Array(true, contextElement.id)'
										FMT={
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<ELEMENT_ITER>
						DESCR='"extends" clause'
						TARGET_ET='Type'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> interfaceTypes^::(ClassDoc|ParameterizedType)';
							'*[! isVisible()
||
checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))] -> interfaceTypes^::(ClassDoc|ParameterizedType)',recursive;
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
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Class Name'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Parameters'
												PARAMS_EXPR='Array(true) // prohibit hyperlinks from type variables'
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
				</BODY>
			</FOLDER>
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='CLASS  (specific)'
		COND='getAttrBooleanValue("isClass")'
		<BODY>
			<ELEMENT_ITER>
				DESCR='ancestor tree'
				COND='getAttrValue("superclassType") != null'
				COLLAPSED
				TARGET_ET='Type'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> .';
					'(ClassDoc|ParameterizedType) -> superclassType^::Type',recursive;
				}
				FILTER='isVisible()
&&
! checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))'
				SORTING='reversed'
				FMT={
					sec.page.keepTogether='true';
					text.style='cs1';
					text.option.nbsps='true';
					txtfl.delimiter.type='none';
					par.option.nowrap='true';
				}
				<BODY>
					<AREA_SEC>
						COND='iterator.isFirstItem'
						BREAK_PARENT_BLOCK='when-executed'
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.margin.top='14';
								}
								<CTRLS>
									<DATA_CTRL>
										ATTR='qualifiedTypeName'
										<DOC_HLINK>
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
default one). However, the one defined the first will be executed the first */'
											URL_EXPR='getExternalDocURL()'
										</URL_HLINK>
									</DATA_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Type Parameters'
										PARAMS_EXPR='Array(true) // prohibit hyperlinks from type variables'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						COND='! iterator.isLastItem'
						BREAK_PARENT_BLOCK='when-executed'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										FORMULA='dup("  ", iterator.itemNo-2) + dup("  ", iterator.itemNo-1)'
										FMT={
											text.option.nbsps='true';
										}
									</DATA_CTRL>
									<IMAGE_CTRL>
										IMAGE_TYPE='file-image'
										FILE='inherit.gif'
										OUTPUT_DIR_EXPR='getStringParam("$resourceOutputDir")'
									</IMAGE_CTRL>
									<DATA_CTRL>
										ATTR='qualifiedTypeName'
										<DOC_HLINK>
											HKEYS={
												'getAttrValue("asClassDoc")';
												'"detail"';
											}
										</DOC_HLINK>
										<URL_HLINK>
											URL_EXPR='getExternalDocURL()'
										</URL_HLINK>
									</DATA_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Type Parameters'
										PARAMS_EXPR='Array(true) // prohibit hyperlinks from type variables'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.margin.bottom='0';
								}
								<CTRLS>
									<DATA_CTRL>
										FORMULA='dup("  ", iterator.itemNo-2) + dup("  ", iterator.itemNo-1)'
										FMT={
											text.option.nbsps='true';
										}
									</DATA_CTRL>
									<IMAGE_CTRL>
										IMAGE_TYPE='file-image'
										FILE='inherit.gif'
										OUTPUT_DIR_EXPR='getStringParam("$resourceOutputDir")'
									</IMAGE_CTRL>
									<DATA_CTRL>
										ATTR='qualifiedTypeName'
										FMT={
											text.font.style.bold='true';
										}
									</DATA_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Type Variables'
										FMT={
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</ELEMENT_ITER>
			<SS_CALL>
				DESCR='type parameters documentation'
				SS_NAME='Type Params Doc'
				FMT={
					sec.spacing.before='14';
				}
			</SS_CALL>
			<ELEMENT_ITER>
				DESCR='All Implemented Interfaces'
				COLLAPSED
				TARGET_ET='Type'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> interfaceTypes^::(ClassDoc|ParameterizedType)',recursive;
					'* -> superclassType^::(ClassDoc|ParameterizedType)',recursive;
				}
				FILTER_BY_KEY='getAttrValue("asClassDoc")'
				FILTER='cls = getElementByLinkAttr("asClassDoc");

cls.getAttrBooleanValue("isInterface")
&&
cls.isVisible()
&&
! checkElementsByKey("excluded-classes", cls.id)'
				FMT={
					sec.outputStyle='list';
					list.type='delimited';
					list.margin.block='true';
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
										SS_NAME='Class Name'
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Type Parameters'
										PARAMS_EXPR='Array(true) // prohibit hyperlinks from type variables'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
				<HEADER>
					<AREA_SEC>
						FMT={
							sec.outputStyle='pars';
						}
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.style='s4';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='All Implemented Interfaces:'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<ELEMENT_ITER>
				DESCR='Direct Known Subclasses'
				COND='getAttrValue("qualifiedName") != "java.lang.Object"'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "direct-known-subclasses", 
  contextElement.id
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
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
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
									par.style='s4';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Direct Known Subclasses:'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<SS_CALL>
				SS_NAME='Enclosing Class'
			</SS_CALL>
			<FOLDER>
				DESCR='class header'
				COLLAPSED
				FMT={
					sec.page.keepTogether='true';
					text.style='cs1';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<HR>
								FMT={
									par.margin.top='10';
									par.margin.bottom='0';
								}
							</HR>
							<CTRL_GROUP>
								FMT={
									par.margin.top='12';
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
										SS_NAME='Class Modifiers'
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
										SS_NAME='Type Parameters'
										PARAMS_EXPR='// prohibit hyperlinks from type variables and
// self-references
Array(true, contextElement.id)'
										FMT={
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<ELEMENT_ITER>
						DESCR='"extends" clause'
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
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Class Name'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Parameters'
												PARAMS_EXPR='Array(true) // prohibit hyperlinks from type variables'
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
						DESCR='"implements" clause'
						TARGET_ET='Type'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> interfaceTypes^::(ClassDoc|ParameterizedType)';
							'* -> superclassType^::(ClassDoc|ParameterizedType)';
							'*[! isVisible()
||
checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))] -> interfaceTypes^::(ClassDoc|ParameterizedType)',recursive;
							'*[! isVisible()
||
checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))] -> superclassType^::(ClassDoc|ParameterizedType)',recursive;
						}
						FILTER='cls = getElementByLinkAttr("asClassDoc");

cls.getAttrBooleanValue("isInterface")
&&
cls.isVisible()
&&
! checkElementsByKey("excluded-classes", cls.id)'
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
											<SS_CALL_CTRL>
												SS_NAME='Class Name'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												SS_NAME='Type Parameters'
												PARAMS_EXPR='Array(true) // prohibit hyperlinks from type variables'
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
												TEXT='implements'
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
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='ANNOTATION TYPE  (specific)'
		COND='getAttrBooleanValue("isAnnotationType")'
		COLLAPSED
		<BODY>
			<ELEMENT_ITER>
				DESCR='All Known Subinterfaces'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "all-known-subinterfaces",
  contextElement.id
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
								FMT={
									txtfl.delimiter.type='none';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
									</SS_CALL_CTRL>
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
								FMT={
									par.style='s4';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='All Known Subinterfaces:'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<ELEMENT_ITER>
				DESCR='All Known Implementing Classes'
				COLLAPSED
				TARGET_ET='ClassDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
  "all-known-implementing-classes", 
  contextElement.id
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
								FMT={
									txtfl.delimiter.type='space';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
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
									par.style='s4';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='All Known Implementing Classes:'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</HEADER>
			</ELEMENT_ITER>
			<SS_CALL>
				SS_NAME='Enclosing Class'
			</SS_CALL>
			<FOLDER>
				DESCR='annotation type header'
				FMT={
					sec.page.keepTogether='true';
					text.style='cs1';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<HR>
								FMT={
									par.margin.top='10';
									par.margin.bottom='0';
								}
							</HR>
							<CTRL_GROUP>
								FMT={
									par.margin.top='12';
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
										SS_NAME='Class Modifiers'
									</SS_CALL_CTRL>
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
				</BODY>
			</FOLDER>
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='DOCUMENTATION & TAGS'
		<BODY>
			<SS_CALL>
				DESCR='@deprecated tags'
				COND='hasTag("@deprecated") || 
hasAnnotation("java.lang.Deprecated")'
				SS_NAME='Comment_Deprecated'
				FMT={
					sec.spacing.before='14';
				}
			</SS_CALL>
			<SS_CALL>
				DESCR='description'
				SS_NAME='Comment'
				FMT={
					sec.outputStyle='text-par';
					sec.spacing.before='14';
				}
			</SS_CALL>
			<ELEMENT_ITER>
				DESCR='tag documentation'
				COLLAPSED
				STEP_EXPR='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

setVar ("tagTitle", tagInfo.getAttrValue ("title"));'
				TARGET_ETS={'#CUSTOM';'Tag'}
				SCOPE='advanced-location-rules'
				RULES={
					'* -> Tag';
					'*[getAttrBooleanValue("isSerializable")] -> {Enum (CustomElement (null, Attr ("kind", "@see")))

/* When this class is serializable, add a stub element disguised as
 a @see tag to ensure that "Serialized Form" link is added under 
 "See Also" heading (along with other @see links) even when no real
 @see tags have been found */}::#CUSTOM';
				}
				FILTER='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

tagInfo != null
&&
(tagInfo.hasAttr ("all")
  ? tagInfo.getAttrBooleanValue ("all")
  : tagInfo.getAttrBooleanValue ("types"))'
				SORTING='by-expr'
				SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
				FMT={
					sec.spacing.before='14';
				}
				<BODY>
					<FOLDER>
						DESCR='@see'
						COND='hasAttrValue ("kind", "@see")'
						CONTEXT_ELEMENT_EXPR='rootElement'
						MATCHING_ET='ClassDoc'
						BREAK_PARENT_BLOCK='when-executed'
						FMT={
							sec.outputStyle='list';
							list.type='delimited';
							list.margin.block='true';
						}
						<BODY>
							<ELEMENT_ITER>
								TARGET_ET='SeeTag'
								SCOPE='advanced-location-rules'
								RULES={
									'* -> seeTags^::SeeTag';
								}
								FMT={
									sec.outputStyle='list-items-delimited';
									list.type='delimited';
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
							<AREA_SEC>
								COND='getAttrBooleanValue("isSerializable")
&&
findHyperTarget (
  Array (contextElement.id, "serialized-form")
) != null'
								FMT={
									sec.outputStyle='list-item-delimited';
								}
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Serialized Form'
												<DOC_HLINK>
													HKEYS={
														'contextElement.id';
														'"serialized-form"';
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
						CONTEXT_ELEMENT_EXPR='rootElement'
						MATCHING_ET='ClassDoc'
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
		DESCR='MEMBERS'
		<BODY>
			<FOLDER>
				DESCR='MEMBER SUMMARY'
				COND='getBooleanParam("gen.class.member.summary")'
				<BODY>
					<FOLDER>
						DESCR='Nested Class Summary'
						COLLAPSED
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"nested_class_summary"';
							}
						</HTARGET>
						<BODY>
							<ELEMENT_ITER>
								DESCR='Own Nested Classes'
								TARGET_ET='ClassDoc'
								SCOPE='advanced-location-rules'
								RULES={
									'* -> ClassDoc';
								}
								FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
								SORTING='by-attr'
								SORTING_KEY={lpath='@name',ascending}
								FMT={
									sec.outputStyle='table';
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
														PARAMS_EXPR='Array ("brief")'
														FMT={
															ctrl.size.width='46.5';
															ctrl.size.height='68.3';
															tcell.sizing='Minimal';
															tcell.align.horz='Right';
															tcell.align.vert='Top';
															text.style='cs2';
														}
													</SS_CALL_CTRL>
													<PANEL>
														FMT={
															ctrl.size.width='426';
															ctrl.size.height='68.3';
															tcell.align.vert='Top';
															tcell.option.maxNbrWidth='80';
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
(specified with -link/-linkoffline options on Javadoc command line),  when 
by the previous definition no internal target (within the currently generated docs) 
can be found.
Note that both hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
																			TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
																			URL_EXPR='getExternalDocURL()'
																		</URL_HLINK>
																	</DATA_CTRL>
																	<SS_CALL_CTRL>
																		SS_NAME='Type Parameters'
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
													<DATA_CTRL>
														COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")'
														DOCFIELD='page-htarget'
														FMT={
															ctrl.size.width='27';
															ctrl.size.height='68.3';
															ctrl.option.noHLinkFmt='true';
															tcell.sizing='Minimal';
															tcell.align.horz='Center';
															tcell.align.vert='Top';
															text.style='cs5';
															text.hlink.fmt='none';
														}
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
									</AREA_SEC>
								</BODY>
								<HEADER>
									<AREA_SEC>
										FMT={
											trow.page.keepWithNext='true';
										}
										<AREA>
											<SPACER>
												FMT={
													spacer.height='14';
												}
											</SPACER>
											<CTRL_GROUP>
												FMT={
													trow.bkgr.color='#CCCCFF';
													trow.page.keepTogether='true';
													trow.page.keepWithNext='true';
												}
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Nested Class Summary'
														FMT={
															ctrl.size.width='472.5';
															ctrl.size.height='19.5';
															text.style='cs6';
														}
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")'
														TEXT='Page'
														FMT={
															ctrl.size.width='27';
															ctrl.size.height='19.5';
															tcell.sizing='Minimal';
															tcell.align.horz='Center';
															text.style='cs5';
															text.font.style.bold='true';
														}
													</TEXT_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
							</ELEMENT_ITER>
							<FOLDER>
								DESCR='Nested classes/interfaces inherited from ancestor classes and implemented interfaces'
								COND='! getAttrBooleanValue("isAnnotationType")'
								COLLAPSED
								<BODY>
									<ELEMENT_ITER>
										DESCR='Iterates by all superclasses'
										TARGET_ET='ClassDoc'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> superclass^::ClassDoc',recursive;
										}
										FILTER='isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)
&&
! matchQualifiedName (getAttrStringValue("qualifiedName"),
                      getArrayParam("gen.class.member.summary.inherited.exclude"))'
										FMT={
											par.option.nowrap='true';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<BODY>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<SS_CALL_CTRL>
																		SS_NAME='Inherited Nested Types'
																		PARAMS_EXPR='Array (rootElement)'
																		FMT={
																			content.outputStyle='text-par';
																			ctrl.size.width='499.5';
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
														FMT={
															trow.page.keepWithNext='true';
														}
														<AREA>
															<SPACER>
																FMT={
																	spacer.height='14';
																}
															</SPACER>
															<CTRL_GROUP>
																FMT={
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
																						TEXT='Nested classes/interfaces inherited from class'
																					</TEXT_CTRL>
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
											</FOLDER>
										</BODY>
									</ELEMENT_ITER>
									<ELEMENT_ITER>
										DESCR='Iterates by all implemented intefaces or superintefaces'
										TARGET_ET='ClassDoc'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> superclass^::ClassDoc',recursive;
											'* -> interfaces^::ClassDoc',recursive;
										}
										FILTER='getAttrBooleanValue("isInterface")
&& 
isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)
&&
! matchQualifiedName (getAttrStringValue("qualifiedName"),
                      getArrayParam("gen.class.member.summary.inherited.exclude"))'
										FMT={
											par.option.nowrap='true';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<BODY>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<SS_CALL_CTRL>
																		SS_NAME='Inherited Nested Types'
																		PARAMS_EXPR='Array (rootElement)'
																		FMT={
																			content.outputStyle='text-par';
																			ctrl.size.width='499.5';
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
														FMT={
															trow.page.keepWithNext='true';
														}
														<AREA>
															<SPACER>
																FMT={
																	spacer.height='14';
																}
															</SPACER>
															<CTRL_GROUP>
																FMT={
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
																						TEXT='Nested classes/interfaces inherited from interface'
																					</TEXT_CTRL>
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
											</FOLDER>
										</BODY>
									</ELEMENT_ITER>
								</BODY>
							</FOLDER>
						</BODY>
					</FOLDER>
					<ELEMENT_ITER>
						DESCR='Enum Constant Summary'
						COND='getAttrBooleanValue("isEnum")'
						COLLAPSED
						TARGET_ET='FieldDoc'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> enumConstants^::FieldDoc';
						}
						FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)'
						SORTING='by-attr'
						SORTING_KEY={lpath='@name',ascending}
						FMT={
							sec.outputStyle='table';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"enum_constant_summary"';
							}
							NAME_EXPR='"enum_constant_summary"'
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
													ctrl.size.width='473.3';
													ctrl.size.height='68.3';
													tcell.align.vert='Top';
													tcell.option.maxNbrWidth='90';
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
											<DATA_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												DOCFIELD='page-htarget'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='68.3';
													ctrl.option.noHLinkFmt='true';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													tcell.align.vert='Top';
													text.style='cs5';
													text.hlink.fmt='none';
												}
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
							</AREA_SEC>
						</BODY>
						<HEADER>
							<AREA_SEC>
								FMT={
									trow.page.keepWithNext='true';
								}
								<AREA>
									<SPACER>
										FMT={
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Enum Constant Summary'
												FMT={
													ctrl.size.width='473.3';
													ctrl.size.height='19.5';
													text.style='cs6';
												}
											</TEXT_CTRL>
											<TEXT_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												TEXT='Page'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='19.5';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													text.style='cs5';
													text.font.style.bold='true';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<FOLDER>
						DESCR='Field Summary'
						COLLAPSED
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"field_summary"';
							}
							NAME_EXPR='"field_summary"'
						</HTARGET>
						<BODY>
							<ELEMENT_ITER>
								DESCR='Own Fields
--
for details about Location Rules, see description of "Field Detail" iterator in MEMBER DETAIL'
								TARGET_ETS={'#CUSTOM';'FieldDoc'}
								SCOPE='advanced-location-rules'
								RULES={
									'* -> FieldDoc[(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)]';
									'* -> {findElementsByKey ("adopted-members", contextElement.id)}::#CUSTOM[getAttrBooleanValue("isField")]';
								}
								SORTING='by-expr'
								SORTING_KEY={expr='getAttrStringValue("name")',ascending}
								FMT={
									sec.outputStyle='table';
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
														SS_NAME='Field Modifiers'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='FieldDoc'
														PARAMS_EXPR='Array (
  true,
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
														FMT={
															ctrl.size.width='47.3';
															ctrl.size.height='68.3';
															tcell.sizing='Minimal';
															tcell.align.horz='Right';
															tcell.align.vert='Top';
															tcell.option.maxNbrWidth='40';
															text.style='cs2';
														}
													</SS_CALL_CTRL>
													<PANEL>
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='FieldDoc'
														FMT={
															ctrl.size.width='426';
															ctrl.size.height='68.3';
															tcell.align.vert='Top';
															tcell.option.maxNbrWidth='60';
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
																				'contextElement.id',required;
																				'"detail"',required;
																				'rootElement.id';
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
																		SS_NAME='Comment_Summary'
																	</SS_CALL_CTRL>
																</CTRLS>
															</CTRL_GROUP>
														</AREA>
													</PANEL>
													<DATA_CTRL>
														COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='FieldDoc'
														DOCFIELD='page-htarget'
														FMT={
															ctrl.size.width='26.3';
															ctrl.size.height='68.3';
															ctrl.option.noHLinkFmt='true';
															tcell.sizing='Minimal';
															tcell.align.horz='Center';
															tcell.align.vert='Top';
															text.style='cs5';
															text.hlink.fmt='none';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'rootElement.id';
															}
															HKEYS_MATCHING='supe'
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
											trow.page.keepWithNext='true';
										}
										<AREA>
											<SPACER>
												FMT={
													spacer.height='14';
												}
											</SPACER>
											<CTRL_GROUP>
												FMT={
													trow.bkgr.color='#CCCCFF';
													trow.page.keepTogether='true';
													trow.page.keepWithNext='true';
												}
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Field Summary'
														FMT={
															ctrl.size.width='473.3';
															ctrl.size.height='19.5';
															text.style='cs6';
														}
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
														TEXT='Page'
														FMT={
															ctrl.size.width='26.3';
															ctrl.size.height='19.5';
															tcell.sizing='Minimal';
															tcell.align.horz='Center';
															text.style='cs5';
															text.font.style.bold='true';
														}
													</TEXT_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
							</ELEMENT_ITER>
							<FOLDER>
								DESCR='Fields inherited from ancestor classes and implemented interfaces'
								COND='! getAttrBooleanValue("isAnnotationType") &&
getBooleanParam("gen.class.member.summary.inherited")'
								COLLAPSED
								<BODY>
									<ELEMENT_ITER>
										DESCR='Iterates by all superclasses'
										TARGET_ET='ClassDoc'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> superclass^::ClassDoc',recursive;
										}
										FILTER='isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)
&&
! matchQualifiedName (getAttrStringValue("qualifiedName"),
                      getArrayParam("gen.class.member.summary.inherited.exclude"))'
										FMT={
											par.option.nowrap='true';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<BODY>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<SS_CALL_CTRL>
																		SS_NAME='Inherited Fields'
																		FMT={
																			content.outputStyle='text-par';
																			ctrl.size.width='499.5';
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
														FMT={
															trow.page.keepWithNext='true';
														}
														<AREA>
															<SPACER>
																FMT={
																	spacer.height='14';
																}
															</SPACER>
															<CTRL_GROUP>
																FMT={
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
																						TEXT='Fields inherited from class'
																					</TEXT_CTRL>
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
											</FOLDER>
										</BODY>
									</ELEMENT_ITER>
									<ELEMENT_ITER>
										DESCR='Iterates by all implemented intefaces or superintefaces'
										TARGET_ET='ClassDoc'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> superclass^::ClassDoc',recursive;
											'* -> interfaces^::ClassDoc',recursive;
										}
										FILTER='getAttrBooleanValue("isInterface")
&&
isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)
&&
! matchQualifiedName (getAttrStringValue("qualifiedName"),
                      getArrayParam("gen.class.member.summary.inherited.exclude"))'
										FMT={
											par.option.nowrap='true';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<BODY>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<SS_CALL_CTRL>
																		SS_NAME='Inherited Fields'
																		FMT={
																			content.outputStyle='text-par';
																			ctrl.size.width='499.5';
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
														FMT={
															trow.page.keepWithNext='true';
														}
														<AREA>
															<SPACER>
																FMT={
																	spacer.height='14';
																}
															</SPACER>
															<CTRL_GROUP>
																FMT={
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
																				FMT={
																					txtfl.delimiter.type='space';
																				}
																				<CTRLS>
																					<TEXT_CTRL>
																						TEXT='Fields inherited from interface'
																					</TEXT_CTRL>
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
											</FOLDER>
										</BODY>
									</ELEMENT_ITER>
								</BODY>
							</FOLDER>
						</BODY>
					</FOLDER>
					<ELEMENT_ITER>
						DESCR='Constructor Summary'
						COLLAPSED
						TARGET_ET='ConstructorDoc'
						SCOPE='simple-location-rules'
						RULES={
							'* -> ConstructorDoc';
						}
						FILTER='! getAttrBooleanValue("isSynthetic")
&&
(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)'
						SORTING='by-attr'
						SORTING_KEY={lpath='@signature',ascending}
						FMT={
							sec.outputStyle='table';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"constructor_summary"';
							}
							NAME_EXPR='"constructor_summary"'
						</HTARGET>
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.page.keepTogether='true';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												COND='// the column is enabled only when the class has non-public constructors 
// to be documented

checkElementsByKey (
  "non-public-constructors",
  rootElement.id
)'
												SS_NAME='Operation Modifiers'
												PARAMS_EXPR='Array (true)'
												FMT={
													ctrl.size.width='47.3';
													ctrl.size.height='68.3';
													tcell.sizing='Minimal';
													tcell.align.horz='Right';
													tcell.align.vert='Top';
													tcell.option.maxNbrWidth='30';
													text.style='cs2';
												}
											</SS_CALL_CTRL>
											<PANEL>
												FMT={
													ctrl.size.width='426';
													ctrl.size.height='68.3';
													tcell.align.vert='Top';
													tcell.option.maxNbrWidth='60';
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
											<DATA_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												DOCFIELD='page-htarget'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='68.3';
													ctrl.option.noHLinkFmt='true';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													tcell.align.vert='Top';
													text.style='cs5';
													text.hlink.fmt='none';
												}
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
							</AREA_SEC>
						</BODY>
						<HEADER>
							<AREA_SEC>
								FMT={
									trow.page.keepWithNext='true';
								}
								<AREA>
									<SPACER>
										FMT={
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Constructor Summary'
												FMT={
													ctrl.size.width='473.3';
													ctrl.size.height='19.5';
													text.style='cs6';
												}
											</TEXT_CTRL>
											<TEXT_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												TEXT='Page'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='19.5';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													text.style='cs5';
													text.font.style.bold='true';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<FOLDER>
						DESCR='Method Summary'
						COLLAPSED
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"method_summary"';
							}
							NAME_EXPR='"method_summary"'
						</HTARGET>
						<BODY>
							<ELEMENT_ITER>
								DESCR='Own Methods
--
for details about Location Rules, see description of "Method Detail" iterator in MEMBER DETAIL'
								TARGET_ETS={'#CUSTOM';'MethodDoc'}
								SCOPE='advanced-location-rules'
								RULES={
									'* -> MethodDoc[(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)]';
									'* -> {findElementsByKey ("adopted-members", contextElement.id)}::#CUSTOM[getAttrBooleanValue("isMethod")]';
								}
								SORTING='by-expr'
								SORTING_KEY={expr='getAttrStringValue("name") +
getAttrStringValue("flatSignature")',ascending}
								FMT={
									sec.outputStyle='table';
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
														SS_NAME='Operation Modifiers'
														PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														PASSED_ELEMENT_MATCHING_ET='MethodDoc'
														PARAMS_EXPR='Array (
  true,
  instanceOf("#CUSTOM") ? getAttrValue ("parentClassInvocation") : null
)'
														FMT={
															ctrl.size.width='47.3';
															ctrl.size.height='68.3';
															tcell.sizing='Minimal';
															tcell.align.horz='Right';
															tcell.align.vert='Top';
															tcell.option.maxNbrWidth='40';
															text.style='cs2';
														}
													</SS_CALL_CTRL>
													<PANEL>
														FMT={
															ctrl.size.width='426';
															ctrl.size.height='68.3';
															tcell.align.vert='Top';
															tcell.option.maxNbrWidth='60';
														}
														<AREA>
															<CTRL_GROUP>
																FMT={
																	text.style='cs1';
																	txtfl.delimiter.type='none';
																}
																<CTRLS>
																	<DATA_CTRL>
																		CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
																		MATCHING_ET='MethodDoc'
																		ATTR='name'
																		FMT={
																			text.font.style.bold='true';
																		}
																		<DOC_HLINK>
																			HKEYS={
																				'contextElement.id',required;
																				'"detail"',required;
																				'rootElement.id';
																			}
																			HKEYS_MATCHING='supe'
																		</DOC_HLINK>
																	</DATA_CTRL>
																	<SS_CALL_CTRL>
																		SS_NAME='Operation Parameters'
																		PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
																		PASSED_ELEMENT_MATCHING_ET='MethodDoc'
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
																		CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
																		MATCHING_ET='MethodDoc'
																		SS_NAME='Comment_Summary (Method)'
																	</SS_CALL_CTRL>
																</CTRLS>
															</CTRL_GROUP>
														</AREA>
													</PANEL>
													<DATA_CTRL>
														COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
														CONTEXT_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
														MATCHING_ET='MethodDoc'
														DOCFIELD='page-htarget'
														FMT={
															ctrl.size.width='26.3';
															ctrl.size.height='68.3';
															ctrl.option.noHLinkFmt='true';
															tcell.sizing='Minimal';
															tcell.align.horz='Center';
															tcell.align.vert='Top';
															text.style='cs5';
															text.hlink.fmt='none';
														}
														<DOC_HLINK>
															HKEYS={
																'contextElement.id',required;
																'"detail"',required;
																'rootElement.id';
															}
															HKEYS_MATCHING='supe'
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
											trow.page.keepWithNext='true';
										}
										<AREA>
											<SPACER>
												FMT={
													spacer.height='14';
												}
											</SPACER>
											<CTRL_GROUP>
												FMT={
													trow.bkgr.color='#CCCCFF';
													trow.page.keepTogether='true';
													trow.page.keepWithNext='true';
												}
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Method Summary'
														FMT={
															ctrl.size.width='473.3';
															ctrl.size.height='19.5';
															text.style='cs6';
														}
													</TEXT_CTRL>
													<TEXT_CTRL>
														COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
														TEXT='Page'
														FMT={
															ctrl.size.width='26.3';
															ctrl.size.height='19.5';
															tcell.sizing='Minimal';
															tcell.align.horz='Center';
															text.style='cs5';
															text.font.style.bold='true';
														}
													</TEXT_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</AREA_SEC>
								</HEADER>
							</ELEMENT_ITER>
							<FOLDER>
								DESCR='Methods inherited from ancestor classes and implemented interfaces'
								COND='! getAttrBooleanValue("isAnnotationType") &&
getBooleanParam("gen.class.member.summary.inherited")'
								COLLAPSED
								<BODY>
									<ELEMENT_ITER>
										DESCR='Iterates by all superclasses'
										TARGET_ET='ClassDoc'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> superclass^::ClassDoc',recursive;
										}
										FILTER='isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)
&&
! matchQualifiedName (getAttrStringValue("qualifiedName"),
                      getArrayParam("gen.class.member.summary.inherited.exclude"))'
										FMT={
											par.option.nowrap='true';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<BODY>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<SS_CALL_CTRL>
																		SS_NAME='Inherited Methods'
																		PARAMS_EXPR='Array (rootElement)'
																		FMT={
																			content.outputStyle='text-par';
																			ctrl.size.width='499.5';
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
														FMT={
															trow.page.keepWithNext='true';
														}
														<AREA>
															<SPACER>
																FMT={
																	spacer.height='14';
																}
															</SPACER>
															<CTRL_GROUP>
																FMT={
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
																						TEXT='Methods inherited from class'
																					</TEXT_CTRL>
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
											</FOLDER>
										</BODY>
									</ELEMENT_ITER>
									<ELEMENT_ITER>
										DESCR='Iterates by all implemented intefaces or superintefaces'
										TARGET_ET='ClassDoc'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> superclass^::ClassDoc',recursive;
											'* -> interfaces^::ClassDoc',recursive;
										}
										FILTER='getAttrBooleanValue("isInterface")
&&
isVisible()
&&
! checkElementsByKey("excluded-classes", contextElement.id)
&&
! matchQualifiedName (getAttrStringValue("qualifiedName"),
                      getArrayParam("gen.class.member.summary.inherited.exclude"))'
										FMT={
											par.option.nowrap='true';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='table';
													table.sizing='Relative';
												}
												<BODY>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<SS_CALL_CTRL>
																		SS_NAME='Inherited Methods'
																		PARAMS_EXPR='Array (rootElement)'
																		FMT={
																			content.outputStyle='text-par';
																			ctrl.size.width='499.5';
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
														FMT={
															trow.page.keepWithNext='true';
														}
														<AREA>
															<SPACER>
																FMT={
																	spacer.height='14';
																}
															</SPACER>
															<CTRL_GROUP>
																FMT={
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
																						TEXT='Methods inherited from interface'
																					</TEXT_CTRL>
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
											</FOLDER>
										</BODY>
									</ELEMENT_ITER>
								</BODY>
							</FOLDER>
						</BODY>
					</FOLDER>
					<ELEMENT_ITER>
						DESCR='Required Element Summary'
						MATCHING_ET='AnnotationTypeDoc'
						COLLAPSED
						TARGET_ET='AnnotationTypeElementDoc'
						SCOPE='simple-location-rules'
						RULES={
							'* -> AnnotationTypeElementDoc';
						}
						FILTER='! hasChild("AnnotationValue")
&&
(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)
'
						SORTING='by-attr'
						SORTING_KEY={lpath='@name',ascending}
						FMT={
							sec.outputStyle='table';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"annotation_type_required_element_summary"';
							}
							NAME_EXPR='"annotation_type_required_element_summary"'
						</HTARGET>
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.page.keepTogether='true';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Operation Modifiers'
												PARAMS_EXPR='Array (true)'
												FMT={
													ctrl.size.width='47.3';
													ctrl.size.height='68.3';
													tcell.sizing='Minimal';
													tcell.align.horz='Right';
													tcell.align.vert='Top';
													tcell.option.maxNbrWidth='30';
													text.style='cs2';
												}
											</SS_CALL_CTRL>
											<PANEL>
												FMT={
													ctrl.size.width='426';
													ctrl.size.height='68.3';
													tcell.align.vert='Top';
													tcell.option.maxNbrWidth='60';
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
																SS_NAME='Comment_Summary (Method)'
															</SS_CALL_CTRL>
														</CTRLS>
													</CTRL_GROUP>
												</AREA>
											</PANEL>
											<DATA_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												DOCFIELD='page-htarget'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='68.3';
													ctrl.option.noHLinkFmt='true';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													tcell.align.vert='Top';
													text.style='cs5';
													text.hlink.fmt='none';
												}
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
							</AREA_SEC>
						</BODY>
						<HEADER>
							<AREA_SEC>
								FMT={
									trow.page.keepWithNext='true';
								}
								<AREA>
									<SPACER>
										FMT={
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Required Element Summary'
												FMT={
													ctrl.size.width='473.3';
													ctrl.size.height='19.5';
													text.style='cs6';
												}
											</TEXT_CTRL>
											<TEXT_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												TEXT='Page'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='19.5';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													text.style='cs5';
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
						DESCR='Optional Element Summary'
						MATCHING_ET='AnnotationTypeDoc'
						COLLAPSED
						TARGET_ET='AnnotationTypeElementDoc'
						SCOPE='simple-location-rules'
						RULES={
							'* -> AnnotationTypeElementDoc';
						}
						FILTER='hasChild("AnnotationValue")
&&
(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)'
						SORTING='by-attr'
						SORTING_KEY={lpath='@name',ascending}
						FMT={
							sec.outputStyle='table';
							table.sizing='Relative';
							table.border.style='solid';
							table.border.color='#000000';
						}
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"annotation_type_optional_element_summary"';
							}
							NAME_EXPR='"annotation_type_optional_element_summary"'
						</HTARGET>
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											trow.page.keepTogether='true';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Operation Modifiers'
												PARAMS_EXPR='Array (true)'
												FMT={
													ctrl.size.width='47.3';
													ctrl.size.height='68.3';
													tcell.sizing='Minimal';
													tcell.align.horz='Right';
													tcell.align.vert='Top';
													tcell.option.maxNbrWidth='30';
													text.style='cs2';
												}
											</SS_CALL_CTRL>
											<PANEL>
												FMT={
													ctrl.size.width='426';
													ctrl.size.height='68.3';
													tcell.align.vert='Top';
													tcell.option.maxNbrWidth='60';
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
																SS_NAME='Comment_Summary (Method)'
															</SS_CALL_CTRL>
														</CTRLS>
													</CTRL_GROUP>
												</AREA>
											</PANEL>
											<DATA_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												DOCFIELD='page-htarget'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='68.3';
													ctrl.option.noHLinkFmt='true';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													tcell.align.vert='Top';
													text.style='cs5';
													text.hlink.fmt='none';
												}
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
							</AREA_SEC>
						</BODY>
						<HEADER>
							<AREA_SEC>
								FMT={
									trow.page.keepWithNext='true';
								}
								<AREA>
									<SPACER>
										FMT={
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										FMT={
											trow.bkgr.color='#CCCCFF';
											trow.page.keepTogether='true';
											trow.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Optional Element Summary'
												FMT={
													ctrl.size.width='473.3';
													ctrl.size.height='19.5';
													text.style='cs6';
												}
											</TEXT_CTRL>
											<TEXT_CTRL>
												COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class.member.detail")'
												TEXT='Page'
												FMT={
													ctrl.size.width='26.3';
													ctrl.size.height='19.5';
													tcell.sizing='Minimal';
													tcell.align.horz='Center';
													text.style='cs5';
													text.font.style.bold='true';
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
			<FOLDER>
				DESCR='MEMBER DETAILS'
				COND='getBooleanParam("gen.class.member.detail")'
				<BODY>
					<ELEMENT_ITER>
						DESCR='Enum Constant Detail'
						COND='getAttrBooleanValue("isEnum")'
						COLLAPSED
						TARGET_ET='FieldDoc'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> enumConstants^::FieldDoc';
						}
						FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)'
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"enum_constant_detail"';
							}
							NAME_EXPR='"enum_constant_detail"'
						</HTARGET>
						<BODY>
							<SS_CALL>
								SS_NAME='Field'
								<HTARGET>
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
									NAME_EXPR='output.type == "document" ? getAttrStringValue("name") : ""'
								</HTARGET>
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
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Enum Constant Detail'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='19.5';
													tcell.bkgr.color='#CCCCFF';
													par.style='s3';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='Field Detail
--
About Location Rules.

The first rule (* -> FieldDoc) just collects all fields of this class. 

The second rule adds fields inherited from not documented direct ancestors of this class (which are either invisible or excluded by tags or annotations).'
						COLLAPSED
						TARGET_ETS={'#CUSTOM';'FieldDoc'}
						SCOPE='advanced-location-rules'
						RULES={
							'* -> FieldDoc[(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)]';
							'* -> {findElementsByKey ("adopted-members", contextElement.id)}::#CUSTOM[getAttrBooleanValue("isField")]';
						}
						SORTING='by-expr'
						SORTING_KEY={expr='getAttrStringValue("name")',ascending}
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"field_detail"';
							}
							NAME_EXPR='"field_detail"'
						</HTARGET>
						<BODY>
							<SS_CALL>
								SS_NAME='Field'
								PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
								PASSED_ELEMENT_MATCHING_ET='FieldDoc'
								PARAMS_EXPR='Array (
  instanceOf("#CUSTOM") ?
    getAttrValue ("parentClassInvocation") : null
)'
								<HTARGET>
									HKEYS={
										'instanceOf("#CUSTOM") ? 
  getAttrValue ("id") : contextElement.id';
										'"detail"';
										'rootElement.id';
									}
									NAME_EXPR='output.type == "document" ? getAttrStringValue("name") : ""'
								</HTARGET>
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
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Field Detail'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='19.5';
													tcell.bkgr.color='#CCCCFF';
													par.style='s3';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='Constructor Detail'
						COLLAPSED
						TARGET_ET='ConstructorDoc'
						SCOPE='simple-location-rules'
						RULES={
							'* -> ConstructorDoc';
						}
						FILTER='! getAttrBooleanValue("isSynthetic")
&&
(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)'
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"constructor_detail"';
							}
							NAME_EXPR='"constructor_detail"'
						</HTARGET>
						<BODY>
							<SS_CALL>
								SS_NAME='Operation'
								<HTARGET>
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
									NAME_EXPR='output.type == "document" ?
  getAttrStringValue("name") + getAttrStringValue("rawSignature") : ""'
								</HTARGET>
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
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Constructor Detail'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='19.5';
													tcell.bkgr.color='#CCCCFF';
													par.style='s3';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='Method Detail
--
About Location Rules.

The first rule (* -> MethodDoc) just collects all methods of this class. 

The second rule adds methods inherited from not documented direct ancestors of this class (which are either invisible or excluded by tags or annotations).'
						COLLAPSED
						TARGET_ETS={'#CUSTOM';'MethodDoc'}
						SCOPE='advanced-location-rules'
						RULES={
							'* -> MethodDoc[(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)]';
							'* -> {findElementsByKey ("adopted-members", contextElement.id)}::#CUSTOM[getAttrBooleanValue("isMethod")]';
						}
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"method_detail"';
							}
							NAME_EXPR='"method_detail"'
						</HTARGET>
						<BODY>
							<SS_CALL>
								SS_NAME='Operation'
								PASSED_ELEMENT_EXPR='instanceOf("#CUSTOM") ? 
  contextElement.value.toElement() : contextElement'
								PASSED_ELEMENT_MATCHING_ET='MethodDoc'
								PARAMS_EXPR='Array (
  instanceOf("#CUSTOM") ?
    getAttrValue ("parentClassInvocation") : null
)'
								<HTARGET>
									HKEYS={
										'instanceOf("#CUSTOM") ? 
  getAttrValue ("id") : contextElement.id';
										'"detail"';
										'rootElement.id';
									}
									NAME_EXPR='output.type == "document" ?
  getAttrStringValue("name") + getAttrStringValue("rawSignature") : ""'
								</HTARGET>
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
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Method Detail'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='19.5';
													tcell.bkgr.color='#CCCCFF';
													par.style='s3';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</HEADER>
					</ELEMENT_ITER>
					<ELEMENT_ITER>
						DESCR='Annotation Element Detail'
						MATCHING_ET='AnnotationTypeDoc'
						COLLAPSED
						TARGET_ET='AnnotationTypeElementDoc'
						SCOPE='simple-location-rules'
						RULES={
							'* -> AnnotationTypeElementDoc';
						}
						FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-members", contextElement.id)'
						<HTARGET>
							HKEYS={
								'contextElement.id';
								'"annotation_type_element_detail"';
							}
							NAME_EXPR='"annotation_type_element_detail"'
						</HTARGET>
						<BODY>
							<SS_CALL>
								SS_NAME='Annotation Element'
								<HTARGET>
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
									NAME_EXPR='output.type == "document" ?
  getAttrStringValue("name") + getAttrStringValue("rawSignature") : ""'
								</HTARGET>
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
											spacer.height='14';
										}
									</SPACER>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Element Detail'
												FMT={
													ctrl.size.width='499.5';
													ctrl.size.height='19.5';
													tcell.bkgr.color='#CCCCFF';
													par.style='s3';
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
		</BODY>
		<HEADER>
			<AREA_SEC>
				<AREA>
					<HR>
						FMT={
							par.margin.top='12';
							par.margin.bottom='0';
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
					'$type','"class"';
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
	<FOLDER>
		SS_NAME='Annotation Element'
		MATCHING_ET='AnnotationTypeElementDoc'
		<BODY>
			<AREA_SEC>
				FMT={
					sec.page.keepWithNext='true';
					par.style='s5';
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
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isPublic")'
								TEXT='public'
							</TEXT_CTRL>
							<TEXT_CTRL>
								TEXT='abstract'
							</TEXT_CTRL>
							<PANEL>
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("returnType")'
								MATCHING_ET='Type'
								FMT={
									ctrl.size.width='336.8';
									ctrl.size.height='38.3';
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
			<FOLDER>
				DESCR='Documentation & tags'
				FMT={
					sec.indent.block='true';
				}
				<BODY>
					<FOLDER>
						DESCR='deprecated-info'
						COLLAPSED
						<BODY>
							<SS_CALL>
								DESCR='process @deprecated tags'
								COND='hasTag("@deprecated") || 
hasAnnotation("java.lang.Deprecated")'
								BREAK_PARENT_BLOCK='when-executed'
								SS_NAME='Comment_Deprecated'
								FMT={
									sec.spacing.after='12';
								}
							</SS_CALL>
							<AREA_SEC>
								DESCR='alternatively, when the whole class is deprecated, add "Deprecated" for each member as well'
								COND='getBooleanParam("$contextClassDeprecated")'
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
					<FOLDER>
						DESCR='default value'
						CONTEXT_ELEMENT_EXPR='findChild("AnnotationValue")'
						MATCHING_ET='AnnotationValue'
						COLLAPSED
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											txtfl.delimiter.type='none';
											par.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Default:'
												FMT={
													text.font.style.bold='true';
												}
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<SS_CALL>
								SS_NAME='AnnotationValue'
								FMT={
									sec.indent.block='true';
								}
							</SS_CALL>
						</BODY>
					</FOLDER>
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
  : tagInfo.getAttrBooleanValue ("methods"))'
						SORTING='by-expr'
						SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
						<BODY>
							<SS_CALL>
								DESCR='@see'
								COND='hasAttrValue ("kind", "@see")'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='AnnotationTypeElementDoc'
								BREAK_PARENT_BLOCK='when-executed'
								SS_NAME='See Tags'
								PARAMS_EXPR='Array (getVar("tagTitle"))'
							</SS_CALL>
							<SS_CALL>
								DESCR='any other tag'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='AnnotationTypeElementDoc'
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
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='AnnotationValue'
		MATCHING_ET='AnnotationValue'
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='none';
		}
		<BODY>
			<AREA_SEC>
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("valueAsField")'
				MATCHING_ET='FieldDoc'
				BREAK_PARENT_BLOCK='when-output'
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<PANEL>
								FMT={
									ctrl.size.width='189.8';
									ctrl.size.height='38.3';
								}
								<DOC_HLINK>
									HKEYS={
										'contextElement.id';
										'"detail"';
									}
								</DOC_HLINK>
								<URL_HLINK>
									ALT_HLINK
									URL_EXPR='getExternalDocURL()'
								</URL_HLINK>
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("containingClass")'
												MATCHING_ET='ClassDoc'
												SS_NAME='Type Name'
											</SS_CALL_CTRL>
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='text';
													txtfl.delimiter.text='.';
												}
											</DELIMITER>
											<DATA_CTRL>
												ATTR='name'
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</PANEL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<FOLDER>
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("valueAsAnnotation")'
				MATCHING_ET='AnnotationDesc'
				BREAK_PARENT_BLOCK='when-output'
				<BODY>
					<AREA_SEC>
						MATCHING_ET='AnnotationDesc'
						FMT={
							txtfl.delimiter.type='none';
						}
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<PANEL>
										CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("annotationType")'
										MATCHING_ET='AnnotationTypeDoc'
										FMT={
											ctrl.size.width='162.8';
											ctrl.size.height='38.3';
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
											ALT_HLINK
											TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
											URL_EXPR='getExternalDocURL()'
										</URL_HLINK>
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='@'
													</TEXT_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Type Name'
													</SS_CALL_CTRL>
												</CTRLS>
											</CTRL_GROUP>
										</AREA>
									</PANEL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<ELEMENT_ITER>
						TARGET_ET='AnnotationDesc.ElementValuePair'
						SCOPE='simple-location-rules'
						RULES={
							'* -> AnnotationDesc.ElementValuePair';
						}
						FMT={
							txtfl.delimiter.type='text';
							txtfl.delimiter.text=', ';
						}
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<DATA_CTRL>
												CONTEXT_ELEMENT_EXPR='findChild("AnnotationTypeElementDoc")'
												MATCHING_ET='AnnotationTypeElementDoc'
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
													txtfl.delimiter.type='text';
													txtfl.delimiter.text='=';
												}
											</DELIMITER>
											<SS_CALL_CTRL>
												SS_NAME='AnnotationValue'
												PASSED_ELEMENT_EXPR='el = findChild("AnnotationValue");

// if the annotation value is a single-element array,
// use that element instead of the original value

el.getAttrValues("valueAsAnnotationValues").length() == 1 ?
  el.getElementByLinkAttr("valueAsAnnotationValues") : el'
												PASSED_ELEMENT_MATCHING_ET='AnnotationValue'
												PARAMS_EXPR='Array (
  // the value position
  getValueByLPath(
    "AnnotationTypeElementDoc/@name"
  ).toString().length() +
  stockSection.params[0].toInt() + 2,

  // the indent of the value list
  stockSection.params[1].toInt()
)'
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
				</BODY>
			</FOLDER>
			<ELEMENT_ITER>
				BREAK_PARENT_BLOCK='when-output'
				TARGET_ET='AnnotationValue'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='getElementsByLinkAttr("valueAsAnnotationValues")'
				FMT={
					txtfl.delimiter.type='text';
					txtfl.delimiter.text=', ';
				}
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='AnnotationValue'
										PARAMS_EXPR='indent = stockSection.params[1].toInt() + 2;
Array (indent, indent)'
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
										TEXT='{ '
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
										TEXT=' }'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</FOOTER>
			</ELEMENT_ITER>
			<AREA_SEC>
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("valueAsType")'
				MATCHING_ET='Type'
				BREAK_PARENT_BLOCK='when-output'
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<PANEL>
								FMT={
									ctrl.size.width='220.5';
									ctrl.size.height='38.3';
								}
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
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
											</SS_CALL_CTRL>
											<DATA_CTRL>
												ATTR='dimension'
											</DATA_CTRL>
											<TEXT_CTRL>
												TEXT='.class'
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
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='toString'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
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
						COND='getAttrBooleanValue("isPublic") &&
stockSection.param != "brief"'
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
						COND='getAttrBooleanValue("isAbstract") &&
getAttrBooleanValue("isClass")'
						TEXT='abstract'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isStatic")'
						TEXT='static'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isFinal") &&
! getAttrBooleanValue("isEnum")'
						TEXT='final'
					</TEXT_CTRL>
					<DELIMITER>
						COND='output.type == "document"
&&
getAttrBooleanValue("isStatic")'
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
		DESCR='Prints the name (hyperlink) of the class/interface represented by the \'Type\' element passed as the context element'
		MATCHING_ET='Type'
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
							COND='/* This hyperlink definition is used to generate a hyperlink 
to the external docs (specified with -link/-linkoffline 
options on Javadoc command line), when by the previous 
definition no internal target (within the currently generated 
docs) can be found. 
Note that both hyperlink definitions compete for the same 
targeted frame (the default one). However, the one defined 
the first will be executed the first */'
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
	<ELEMENT_ITER>
		SS_NAME='Comment'
		DESCR='PROCESS COMMENT TO ANYTHING 
(except a method and the method @param, @return and @throws/@exception tags).

param: the name of the attribute of the passed context element, which holds an array containing all inline tags representing the whole comment (e.g. "inlineTags" or "firstSentenceTags")

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
	<ELEMENT_ITER>
		SS_NAME='Comment (Method Return)'
		DESCR='PROCESS COMMENT TO A METHOD "RETURNS" SECTION.

The method is passed as the stock-section context element.

The section iterates by method\'s @return tags.'
		MATCHING_ET='MethodDoc'
		TARGET_ET='Tag'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByIds (tags("@return"))'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<ELEMENT_ITER>
				DESCR='iterate by the tag\'s comment inline tags and process them'
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
										FMT={
											ctrl.option.text.noBlankOutput='true';
										}
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<ELEMENT_ITER>
						DESCR='{@inheritDoc}'
						COND='getAttrValue("kind") == "@inheritDoc"'
						FINISH_EXPR='// Restore the input files search path initially received by this stock-section

output.inputFilesPath = null'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
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
   stockSection.contextElement.id
)'
						<BODY>
							<SS_CALL>
								SS_NAME='Comment (Method Return)'
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
			DESCR='if no return doc produced, try to copy it from the inherited method of an implemented interface or an ancestor class'
			<ELEMENT_ITER>
				STEP_EXPR='/* Assign a new search path for the input files associated with the iterated method, 
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method. */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")
'
				UNTIL_FIRST_OUTPUT
				TARGET_ET='MethodDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
   "overridden-implemented-methods",
   stockSection.contextElement.id
)'
				<BODY>
					<SS_CALL>
						SS_NAME='Comment (Method Return)'
					</SS_CALL>
				</BODY>
			</ELEMENT_ITER>
		</ELSE>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Comment (Method)'
		DESCR='PROCESS COMMENT TO A METHOD;

passed context element - the owner of the inline tags representing the comment;

param: the name of the context element\'s attribute that returns an array containing all inline tags representing the whole comment (e.g. "inlineTags").

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
										FMT={
											ctrl.option.text.noBlankOutput='true';
										}
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
	<ELEMENT_ITER>
		SS_NAME='Comment (Operation Param)'
		DESCR='PROCESS COMMENT TO A METHOD/CONSTRUCTOR PARAMETER.

The method/constructor is passed as the stock-section context element; the method parameter name is in the stock-section parameter.

The section iterates by the ParamTags documenting the given parameter.'
		MATCHING_ET='ExecutableMemberDoc'
		TARGET_ET='ParamTag'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> paramTags^::ParamTag';
		}
		FILTER='getAttrValue("parameterName") == stockSection.param'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<ELEMENT_ITER>
				DESCR='iterate by the tag\'s comment inline tags and process them'
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
										FMT={
											ctrl.option.text.noBlankOutput='true';
										}
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<ELEMENT_ITER>
						DESCR='{@inheritDoc}'
						COND='getAttrValue("kind") == "@inheritDoc"'
						FINISH_EXPR='// Restore the input files search path initially received by this stock-section

output.inputFilesPath = null'
						BREAK_PARENT_BLOCK='when-executed'
						COLLAPSED
						STEP_EXPR='/* Assign a new search path for the input files associated with the iterated method, 
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method.

After the all iterated methods processed, the previous seach path is restored
in the "Finish Expression" to continue processing of other tags */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")'
						UNTIL_FIRST_OUTPUT
						TARGET_ET='MethodDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByKey (
   "overridden-implemented-methods",
   stockSection.contextElement.id
)'
						<BODY>
							<SS_CALL>
								SS_NAME='Comment (Operation Param)'
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
			DESCR='if this is a method and no parameter doc produced, try to copy it from the inherited method of an implemented interface or an ancestor class'
			<ELEMENT_ITER>
				MATCHING_ET='MethodDoc'
				STEP_EXPR='/* Assign a new search path for the input files associated with the iterated method, 
from where inherited doc is to be taken.

In case of Javadoc, the associated files are images contained in a local 
"doc-files" directory and inserted in the method comments using <IMG> tags.

Since the new method may reside in a different class contained in a different 
package, its "doc-files" directory may be not the same as for the current method. */

output.inputFilesPath = findChild("SourcePosition").getAttrStringValue("fileDir")
'
				UNTIL_FIRST_OUTPUT
				TARGET_ET='MethodDoc'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByKey (
   "overridden-implemented-methods",
   stockSection.contextElement.id
)'
				<BODY>
					<SS_CALL>
						SS_NAME='Comment (Operation Param)'
						PARAMS_EXPR='stockSection.params'
					</SS_CALL>
				</BODY>
			</ELEMENT_ITER>
		</ELSE>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Comment_Deprecated'
		DESCR='DEPRECATED COMMENT:

Iterate by @deprecated tags. The header with "Deprecated." label is always printed (even if no @deprecated tags). See Processing | Option | Always Process header/footer.'
		MATCHING_ET='Doc'
		COLLAPSED
		ALWAYS_PROC_HDRFTR
		TARGET_ET='Tag'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByIds(tags("@deprecated"))'
		FMT={
			sec.outputStyle='text-par';
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
	<FOLDER>
		SS_NAME='Comment_Summary'
		DESCR='SUMMARY COMMENT TO ANY PROGRAM ELEMENT (except method)'
		MATCHING_ET='ProgramElementDoc'
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
			<AREA_SEC>
				DESCR='automatically add "deprecated" when the whole class is deprecated'
				COND='getBooleanParam("$contextClassDeprecated")'
				MATCHING_ET='MemberDoc'
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
				PARAMS_EXPR='Array ("firstSentenceTags")'
			</SS_CALL>
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Comment_Summary (Method)'
		DESCR='SUMMARY COMMENT TO A METHOD'
		MATCHING_ET='MethodDoc'
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
				COND='getBooleanParam("$contextClassDeprecated")'
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
		SS_NAME='Enclosing Class'
		MATCHING_ET='ClassDoc'
		<BODY>
			<AREA_SEC>
				DESCR='Enclosing Class'
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("containingClass")'
				MATCHING_ET='ClassDoc'
				FMT={
					txtfl.delimiter.type='none';
				}
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.style='s4';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enclosing class:'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							row.indent.block='true';
						}
						<CTRLS>
							<SS_CALL_CTRL>
								SS_NAME='Class Name'
							</SS_CALL_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Type Parameters'
							</SS_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Field'
		DESCR='param: when this is an adopted field, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that field'
		MATCHING_ET='FieldDoc'
		<BODY>
			<AREA_SEC>
				FMT={
					par.style='s5';
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
							<SS_CALL_CTRL>
								SS_NAME='Field Modifiers'
								PARAMS_EXPR='Array (false, stockSection.param)'
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
									txtfl.delimiter.type='text';
									txtfl.delimiter.text=' = ';
								}
							</DELIMITER>
							<DATA_CTRL>
								COND='getBooleanParam("gen.class.member.detail.constantValues")'
								ATTR='constantValueExpression'
								FMT={
									ctrl.option.text.trimSpaces='true';
									ctrl.option.text.noBlankOutput='true';
								}
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<FOLDER>
				DESCR='Documentation & tags'
				FMT={
					sec.indent.block='true';
				}
				<BODY>
					<FOLDER>
						DESCR='deprecated-info'
						COLLAPSED
						<BODY>
							<SS_CALL>
								DESCR='process @deprecated tags'
								COND='hasTag("@deprecated") || 
hasAnnotation("java.lang.Deprecated")'
								BREAK_PARENT_BLOCK='when-executed'
								SS_NAME='Comment_Deprecated'
								FMT={
									sec.spacing.after='12';
								}
							</SS_CALL>
							<AREA_SEC>
								DESCR='alternatively, when the whole class is deprecated, add "Deprecated" for the field as well'
								COND='getBooleanParam("$contextClassDeprecated")'
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
							'*[getAttrValue("constantValueExpression") != null] -> {Enum (CustomElement (null, Attr ("kind", "@see")))

/* When this field has a constant value expression, add a stub element
 disguised as a @see tag to ensure that "Constant Field Values" link
 is added under "See Also" heading (along with other @see links)
 even when no real @see tags have been found */}::#CUSTOM';
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
							<FOLDER>
								DESCR='@see'
								COND='hasAttrValue ("kind", "@see")'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='FieldDoc'
								BREAK_PARENT_BLOCK='when-executed'
								COLLAPSED
								FMT={
									sec.outputStyle='list';
									list.type='delimited';
									list.margin.block='true';
								}
								<BODY>
									<ELEMENT_ITER>
										TARGET_ET='SeeTag'
										SCOPE='advanced-location-rules'
										RULES={
											'* -> seeTags^::SeeTag';
										}
										FMT={
											sec.outputStyle='list-items-delimited';
											list.type='delimited';
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
									<AREA_SEC>
										COND='getAttrValue("constantValueExpression") != null
&&
findHyperTarget (
  Array (contextElement.id, "constant-value")
) != null'
										FMT={
											sec.outputStyle='list-item-delimited';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<TEXT_CTRL>
														TEXT='Constant Field Values'
														<DOC_HLINK>
															HKEYS={
																'contextElement.id';
																'"constant-value"';
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
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Field Modifiers'
		DESCR='param[0]: true - abbreviated (for summary table), false - detailed (show all modifiers)
param[1]: when this is an adopted field, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that field'
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
								COND='getAttrBooleanValue("isPublic") && 
! stockSection.param.toBoolean()'
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
								COND='getAttrBooleanValue("isStatic") &&
(rootElement.getAttrBooleanValue("isClass") || 
 ! stockSection.param.toBoolean())'
								TEXT='static'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isFinal") && 
! stockSection.param.toBoolean()'
								TEXT='final'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isTransient") && 
! stockSection.param.toBoolean()'
								TEXT='transient'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isVolatile") && 
! stockSection.param.toBoolean()'
								TEXT='volatile'
							</TEXT_CTRL>
							<DELIMITER>
								COND='output.type == "document"
&&
stockSection.param.toBoolean()
&&
getAttrBooleanValue("isStatic")'
								FMT={
									txtfl.delimiter.type='nbsp';
								}
							</DELIMITER>
							<PANEL>
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("type")'
								MATCHING_ET='Type'
								FMT={
									ctrl.size.width='334.5';
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
	<ELEMENT_ITER>
		SS_NAME='Inherited Fields'
		MATCHING_ET='ClassDoc'
		TARGET_ET='FieldDoc'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByKey (
  "inherited-fields", 
  HashKey (
    rootElement.id,
    stockSection.contextElement.id
  ),
  getBooleanParam("include.deprecated") ? null :
    BooleanQuery (
     ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated")
    )
)'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='text-par';
			text.style='cs1';
			txtfl.delimiter.type='text';
			txtfl.delimiter.text=', ';
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
										'contextElement.id',required;
										'"detail"',required;
										'stockSection.contextElement.id';
									}
									HKEYS_MATCHING='supe'
								</DOC_HLINK>
								<URL_HLINK>
									COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line),  when 
by the previous definition no internal target (within the currently generated docs) 
can be found.
Note that both hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
									URL_EXPR='getExternalDocURL()'
								</URL_HLINK>
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Inherited Methods'
		MATCHING_ET='ClassDoc'
		TARGET_ET='MethodDoc'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByKey (
  "inherited-methods",
  HashKey (
    rootElement.id,
    stockSection.contextElement.id
  ),
  getBooleanParam("include.deprecated") ? null :
    BooleanQuery (
     ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated")
    )
)'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='text-par';
			text.style='cs1';
			txtfl.delimiter.type='text';
			txtfl.delimiter.text=', ';
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
										'contextElement.id',required;
										'"detail"',required;
										'stockSection.contextElement.id';
									}
									HKEYS_MATCHING='supe'
								</DOC_HLINK>
								<URL_HLINK>
									COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line) in the case when
no internal target (within the currently generated docs) can be found by the previous
definitions. Note that both hyperlink definitions compete for the same targeted frame
(the default one). However, the one defined the first will be executed the first */'
									URL_EXPR='getExternalDocURL()'
								</URL_HLINK>
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Inherited Nested Types'
		MATCHING_ET='ClassDoc'
		TARGET_ET='ClassDoc'
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByKey (
  "inherited-nested-types",
  HashKey (
    rootElement.id,
    stockSection.contextElement.id
  ),
  getBooleanParam ("include.deprecated") ? null :
    BooleanQuery (
      ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated")
    )
)'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='text-par';
			text.style='cs1';
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
								ATTR='name'
								<DOC_HLINK>
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
									URL_EXPR='getExternalDocURL()'
								</URL_HLINK>
							</DATA_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Type Parameters'
							</SS_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</ELEMENT_ITER>
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
		SS_NAME='Operation'
		DESCR='param: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method'
		MATCHING_ET='ExecutableMemberDoc'
		<BODY>
			<AREA_SEC>
				FMT={
					sec.page.keepWithNext='true';
					par.style='s5';
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
								SS_NAME='Operation Modifiers'
								PARAMS_EXPR='Array (false, stockSection.param)'
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
								SS_NAME='Operation Params & Exceptions'
								PARAMS_EXPR='len = callStockSection (
  "Operation Modifiers",
  Array (false, stockSection.param)
).len();

Array (
  (len > 0 ? len + 1 : 0) + getAttrStringValue("name").len(),
  stockSection.param
)'
							</SS_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<FOLDER>
				DESCR='CASE OF METHOD -- description & tags'
				MATCHING_ET='MethodDoc'
				BREAK_PARENT_BLOCK='when-executed'
				FMT={
					sec.indent.block='true';
				}
				<BODY>
					<FOLDER>
						DESCR='deprecated-info'
						COLLAPSED
						<BODY>
							<ELEMENT_ITER>
								DESCR='process @deprecated tags'
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
								DESCR='alternatively, when the whole class is deprecated, add "Deprecated" for the method as well'
								COND='getBooleanParam("$contextClassDeprecated")'
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
														SS_NAME='Class Name'
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
						DESCR='specifying methods in implemented interfaces'
						COLLAPSED
						TARGET_ET='MethodDoc'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByKey (
  "overridden-implemented-methods",
  contextElement.id
)'
						FILTER='getValueByLPath("containingClass^::ClassDoc/@isInterface").toBoolean()
&&
isVisible()
&&
! checkElementsByKey("excluded-members", contextElement.id)'
						<BODY>
							<AREA_SEC>
								COND='cls = getElementByLinkAttr("containingClass");

cls.isVisible() && ! checkElementsByKey("excluded-classes", cls.id) ?
{
  stockSection.setVar ("containingClass", cls);
  true;
} : {
  // when containing class is excluded, find appropriate adopting class

  el = findElementByKey (
    "member-adoptions",
    contextElement.id,
    BooleanQuery ({

      adoptingClassId = getAttrValue ("adoptingClassId");

      // There may be several classes adopting the method,
      // however the suitable one must be an interface implemented 
      // by the class being documented. The following checks this.

      rootElement.checkElementsByLRules (
        Array (
          LocationRule ("* -> interfaces^::ClassDoc", true),
          LocationRule ("* -> superclass^::ClassDoc", true)
        ),
        "*",
        BooleanQuery (
          contextElement.id == adoptingClassId && getAttrBooleanValue("isInterface")
        )
      )
    })
  );

  el != null ? {
    stockSection.setVar ("containingClass", findElementById (el.getAttrValue("adoptingClassId")));
    true;
  } : false
}'
								<AREA>
									<CTRL_GROUP>
										FMT={
											row.indent.block='true';
										}
										<CTRLS>
											<DATA_CTRL>
												ATTR='name'
												FMT={
													text.style='cs1';
												}
												<DOC_HLINK>
													HKEYS={
														'contextElement.id';
														'"detail"';
														'stockSection.getElementVar ("containingClass").id';
													}
												</DOC_HLINK>
												<URL_HLINK>
													COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line),  when 
by the previous definition no internal target (within the currently generated docs) 
can be found.
Note that both hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
													URL_EXPR='getExternalDocURL()'
												</URL_HLINK>
											</DATA_CTRL>
											<TEXT_CTRL>
												TEXT='in interface'
											</TEXT_CTRL>
											<PANEL>
												CONTEXT_ELEMENT_EXPR='stockSection.getElementVar ("containingClass")'
												MATCHING_ET='ClassDoc'
												FMT={
													ctrl.size.width='297';
													text.style='cs1';
													txtfl.delimiter.type='none';
												}
												<AREA>
													<CTRL_GROUP>
														<CTRLS>
															<SS_CALL_CTRL>
																SS_NAME='Class Name'
															</SS_CALL_CTRL>
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
						</BODY>
						<HEADER>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										FMT={
											par.page.keepWithNext='true';
										}
										<CTRLS>
											<TEXT_CTRL>
												TEXT='Specified by:'
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
					<AREA_SEC>
						DESCR='overridden method in the parent class'
						COND='(m = getElementByLinkAttr("overriddenMethod")) != null
&&
m.isVisible()
&&
! checkElementsByKey("excluded-members", m.id)
&&
{
  cls = getElementByLinkAttr("overriddenClass");
  cls.isVisible() && ! checkElementsByKey("excluded-classes", cls.id) ?
  {
    stockSection.setVar ("containingClass", cls);
    true;
  } : {
    // when containing class is excluded, find appropriate adopting class

    el = findElementByKey (
      "member-adoptions",
      m.id,
      BooleanQuery ({

        adoptingClassId = getAttrValue ("adoptingClassId");

        // There may be several classes adopting the method,
        // however the suitable one must be an ancestor class of
        // the class being documented. The following checks this.

        rootElement.checkElementsByLRules (
          Array (LocationRule ("* -> superclass^::ClassDoc", true)),
          "*",
          BooleanQuery (contextElement.id == adoptingClassId)
        )
      })
    );

    el != null ? {
      stockSection.setVar ("containingClass", findElementById (el.getAttrValue("adoptingClassId")));
      true;
    } : false
  }
}'
						COLLAPSED
						<AREA>
							<CTRL_GROUP>
								FMT={
									par.page.keepWithNext='true';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Overrides:'
										FMT={
											text.font.style.bold='true';
										}
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<DATA_CTRL>
										CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("overriddenMethod")'
										MATCHING_ET='MethodDoc'
										ATTR='name'
										FMT={
											text.style='cs1';
										}
										<DOC_HLINK>
											HKEYS={
												'contextElement.id';
												'"detail"';
												'stockSection.getElementVar ("containingClass").id';
											}
										</DOC_HLINK>
										<URL_HLINK>
											COND='/* This hyperlink definition is used to generate a hyperlink to the external docs
(specified with -link/-linkoffline options on Javadoc command line),  when 
by the previous definition no internal target (within the currently generated docs) 
can be found.
Note that both hyperlink definitions compete for the same targeted frame (the 
default one). However, the one defined the first will be executed the first */'
											URL_EXPR='getExternalDocURL()'
										</URL_HLINK>
									</DATA_CTRL>
									<TEXT_CTRL>
										TEXT='in class'
									</TEXT_CTRL>
									<PANEL>
										CONTEXT_ELEMENT_EXPR='stockSection.getElementVar ("containingClass")'
										MATCHING_ET='ClassDoc'
										FMT={
											ctrl.size.width='297.8';
											ctrl.size.height='38.3';
											text.style='cs1';
											txtfl.delimiter.type='none';
										}
										<AREA>
											<CTRL_GROUP>
												<CTRLS>
													<SS_CALL_CTRL>
														SS_NAME='Class Name'
													</SS_CALL_CTRL>
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
					<ELEMENT_ITER>
						DESCR='tag documentation'
						COLLAPSED
						STEP_EXPR='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

setVar ("tagTitle", tagInfo.getAttrValue ("title"));'
						TARGET_ETS={'#CUSTOM';'Tag'}
						SCOPE='advanced-location-rules'
						RULES={
							'* -> Tag';
							'* -> {Enum (
 CustomElement (null, Attr ("kind", "@param")),
 CustomElement (null, Attr ("kind", "@return")),
 CustomElement (null, Attr ("kind", "@throws"))
)

/* Since documentation of parameters, returned value and exceptions
 may be inherited from overridden/implemented methods, add stub
 elements to ensure those tags are documented even when they are 
 not directly specified in the method */}::#CUSTOM';
						}
						FILTER='tagInfo = findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement();

tagInfo != null
&&
(tagInfo.hasAttr ("all")
  ? tagInfo.getAttrBooleanValue ("all")
  : tagInfo.getAttrBooleanValue ("methods"))'
						SORTING='by-expr'
						SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
						<BODY>
							<FOLDER>
								DESCR='@param'
								COND='hasAttrValue ("kind", "@param")'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='MethodDoc'
								BREAK_PARENT_BLOCK='when-executed'
								COLLAPSED
								<BODY>
									<SS_CALL>
										DESCR='type parameters documentation'
										SS_NAME='Type Params Doc'
									</SS_CALL>
									<ELEMENT_ITER>
										DESCR='method parameters documentation'
										TARGET_ET='Parameter'
										SCOPE='simple-location-rules'
										RULES={
											'* -> Parameter';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='text-par';
													sec.indent.block='true';
												}
												<BODY>
													<SS_CALL>
														SS_NAME='Comment (Operation Param)'
														PASSED_ELEMENT_EXPR='stockSection.contextElement'
														PASSED_ELEMENT_MATCHING_ET='ExecutableMemberDoc'
														PARAMS_EXPR='Array (getAttrValue("name"))'
													</SS_CALL>
												</BODY>
												<HEADER>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<DATA_CTRL>
																		ATTR='name'
																		FMT={
																			text.style='cs1';
																		}
																	</DATA_CTRL>
																	<DELIMITER>
																		FMT={
																			txtfl.delimiter.type='text';
																			txtfl.delimiter.text=' - ';
																		}
																	</DELIMITER>
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
							</FOLDER>
							<FOLDER>
								DESCR='@return'
								COND='hasAttrValue ("kind", "@return")'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='MethodDoc'
								BREAK_PARENT_BLOCK='when-executed'
								COLLAPSED
								<BODY>
									<SS_CALL>
										SS_NAME='Comment (Method Return)'
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
							</FOLDER>
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
														SS_NAME='Class Name'
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
				DESCR='CASE OF CONSTRUCTOR -- description & tags'
				MATCHING_ET='ConstructorDoc'
				FMT={
					sec.indent.block='true';
				}
				<BODY>
					<FOLDER>
						DESCR='deprecated-info'
						COLLAPSED
						<BODY>
							<SS_CALL>
								DESCR='process @deprecated tags'
								COND='hasTag("@deprecated") || 
hasAnnotation("java.lang.Deprecated")'
								BREAK_PARENT_BLOCK='when-executed'
								SS_NAME='Comment_Deprecated'
								FMT={
									sec.spacing.after='12';
								}
							</SS_CALL>
							<AREA_SEC>
								DESCR='alternatively, when the whole class is deprecated, add "Deprecated" for the constructor as well'
								COND='getBooleanParam("$contextClassDeprecated")'
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
  : tagInfo.getAttrBooleanValue ("constructors"))'
						SORTING='by-expr'
						SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
						<BODY>
							<FOLDER>
								DESCR='@param'
								COND='hasAttrValue ("kind", "@param")'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='ConstructorDoc'
								BREAK_PARENT_BLOCK='when-executed'
								COLLAPSED
								<BODY>
									<SS_CALL>
										DESCR='type parameters documentation'
										SS_NAME='Type Params Doc'
									</SS_CALL>
									<ELEMENT_ITER>
										DESCR='constructor parameters documentation'
										TARGET_ET='Parameter'
										SCOPE='simple-location-rules'
										RULES={
											'* -> Parameter';
										}
										<BODY>
											<FOLDER>
												FMT={
													sec.outputStyle='text-par';
													sec.indent.block='true';
												}
												<BODY>
													<SS_CALL>
														SS_NAME='Comment (Operation Param)'
														PASSED_ELEMENT_EXPR='stockSection.contextElement'
														PASSED_ELEMENT_MATCHING_ET='ExecutableMemberDoc'
														PARAMS_EXPR='Array (getAttrValue("name"))'
													</SS_CALL>
												</BODY>
												<HEADER>
													<AREA_SEC>
														<AREA>
															<CTRL_GROUP>
																<CTRLS>
																	<DATA_CTRL>
																		ATTR='name'
																		FMT={
																			text.style='cs1';
																		}
																	</DATA_CTRL>
																	<DELIMITER>
																		FMT={
																			txtfl.delimiter.type='text';
																			txtfl.delimiter.text=' - ';
																		}
																	</DELIMITER>
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
							</FOLDER>
							<ELEMENT_ITER>
								DESCR='@throws'
								COND='hasAttrValue ("kind", "@throws")'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='ConstructorDoc'
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
														SS_NAME='Class Name'
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
							<SS_CALL>
								DESCR='@see'
								COND='hasAttrValue ("kind", "@see")'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='ConstructorDoc'
								BREAK_PARENT_BLOCK='when-executed'
								SS_NAME='See Tags'
								PARAMS_EXPR='Array (getVar("tagTitle"))'
							</SS_CALL>
							<SS_CALL>
								DESCR='any other tag'
								CONTEXT_ELEMENT_EXPR='stockSection.contextElement'
								MATCHING_ET='ConstructorDoc'
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
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Operation Modifiers'
		DESCR='param[0]: true - abbreviated (for summary table); false - detailed (show all modifiers)
param[1]: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method'
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
								COND='getAttrBooleanValue("isPublic") &&
rootElement.getAttrBooleanValue("isClass") &&
! stockSection.param.toBoolean()'
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
								COND='getAttrBooleanValue("isAbstract") && 
rootElement.getAttrBooleanValue("isClass")'
								TEXT='abstract'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isStatic")'
								TEXT='static'
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='getAttrBooleanValue("isFinal") &&
! stockSection.param.toBoolean()'
								TEXT='final'
							</TEXT_CTRL>
							<SS_CALL_CTRL>
								DESCR='the formal type parameters of this method or constructor'
								SS_NAME='Type Parameters'
							</SS_CALL_CTRL>
							<DELIMITER>
								COND='output.type == "document"
&&
stockSection.param.toBoolean() &&
{
  hasChild("TypeVariable") ?
    callStockSection("Type Parameters").indexOf (\' \') < 0
    : getAttrBooleanValue("isStatic")
}'
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
		SS_NAME='Operation Params & Exceptions'
		DESCR='param[0]: the position of the parameter list (in characters)
param[1]: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method'
		MATCHING_ET='ExecutableMemberDoc'
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
														PARAMS_EXPR='Array (false, null, stockSection.params [1])'
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														SS_NAME='Type Parameters'
														PARAMS_EXPR='Array (false, null, stockSection.params [1])'
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
										SS_NAME='Class Name'
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
		SS_NAME='See Tags'
		DESCR='documents all @see tags of a Doc element (passed via context); this stock-section applies to all Doc elements except methods (because methods may inherit their @see tags from the overrided or implemented methods)
--
params[0] - the title for the tag documentation'
		MATCHING_ET='Doc'
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
								FORMULA='stockSection.param'
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
	<ELEMENT_ITER>
		SS_NAME='Type Params Doc'
		DESCR='generate documentation for type parameters of a class/interface/constructor/method'
		MATCHING_ETS={'ClassDoc';'ExecutableMemberDoc'}
		TARGET_ET='TypeVariable'
		SCOPE='simple-location-rules'
		RULES={
			'* -> TypeVariable';
		}
		<BODY>
			<ELEMENT_ITER>
				TARGET_ET='ParamTag'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='typeParamName = getAttrStringValue("typeName");

stockSection.contextElement.getElementsByLinkAttr (
  "typeParamTags",
  BooleanQuery (getAttrValue("parameterName") == typeParamName)
)'
				FMT={
					sec.outputStyle='text-par';
					sec.indent.block='true';
				}
				<BODY>
					<ELEMENT_ITER>
						DESCR='iterate by the tag\'s comment inline tags and process them'
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
												FMT={
													ctrl.option.text.noBlankOutput='true';
												}
											</DATA_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
							<TEMPLATE_CALL>
								BREAK_PARENT_BLOCK='when-output'
								TEMPLATE_FILE='inline-tag.tpl'
							</TEMPLATE_CALL>
							<AREA_SEC>
								DESCR='unknown inline tag'
								COLLAPSED
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<TEXT_CTRL>
												TEXT='{'
											</TEXT_CTRL>
											<DATA_CTRL>
												ATTR='name'
											</DATA_CTRL>
											<DELIMITER>
											</DELIMITER>
											<DATA_CTRL>
												ATTR='text'
												FMT={
													ctrl.option.text.noBlankOutput='true';
												}
											</DATA_CTRL>
											<DELIMITER>
												FMT={
													txtfl.delimiter.type='none';
												}
											</DELIMITER>
											<TEXT_CTRL>
												TEXT='}'
											</TEXT_CTRL>
										</CTRLS>
									</CTRL_GROUP>
								</AREA>
							</AREA_SEC>
						</BODY>
					</ELEMENT_ITER>
				</BODY>
				<HEADER>
					<AREA_SEC>
						<HTARGET>
							HKEYS={
								'getAttrValue("owner")';
								'"detail"';
								'getAttrStringValue("typeName")';
							}
						</HTARGET>
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										ATTR='typeName'
										FMT={
											text.style='cs1';
										}
									</DATA_CTRL>
									<DELIMITER>
										FMT={
											txtfl.delimiter.type='text';
											txtfl.delimiter.text=' - ';
										}
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
						FMT={
							txtfl.delimiter.type='none';
							par.page.keepWithNext='true';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Type Parameters:'
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
		SS_NAME='Type Variables'
		MATCHING_ETS={'ExecutableMemberDoc';'Type'}
		TARGET_ET='TypeVariable'
		SCOPE='advanced-location-rules'
		RULES={
			'Type -> asClassDoc^::ClassDoc/TypeVariable';
			'ExecutableMemberDoc -> TypeVariable';
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
CHECKSUM='+zKpdJeP2eBRgDMhrkTjAyfB3fLo9TAfPcj3ABwat5Y'
</DOCFLEX_TEMPLATE>