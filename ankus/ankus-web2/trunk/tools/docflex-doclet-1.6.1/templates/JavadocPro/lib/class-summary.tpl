<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-11-28 04:58:02'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ETS={'PackageDoc';'RootDoc'}
TITLE_EXPR='title = "All Classes";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "All Classes";

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
		param.name='$class.summary.scope';
		param.description='Specify which classes are included in the summary';
		param.type='enum';
		param.enum.values='allClasses;interfaces;ordinaryClasses;enums;exceptions;errors;annotationTypes';
	}
	PARAM={
		param.name='$class.summary.title';
		param.description='The title for the class summary';
		param.type='string';
		param.defaultValue='All Classes Summary';
	}
	PARAM={
		param.name='$page.heading.right';
		param.title='Page Heading (on the right)';
		param.type='string';
		param.defaultValue.expr='instanceOf("PackageDoc") ? "Package " +
  ((packageName = getAttrValue("name")) != "" ? packageName : "<unnamed>")
: ""';
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
		param.name='gen.class';
		param.title='Class';
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
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs3';
		text.font.size='9';
	}
	PAR_STYLE={
		style.name='Summary Heading';
		style.id='s2';
		text.font.size='15';
		text.font.style.bold='true';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs4';
		text.font.size='15';
		text.font.style.bold='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs2';
}
<HTARGET>
	COND='hasParamValue("$class.summary.scope", "allClasses")'
	HKEYS={
		'"all-classes-summary"';
	}
</HTARGET>
<PAGE_HEADER>
	<AREA_SEC>
		FMT={
			sec.outputStyle='table';
			text.font.style.italic='true';
			table.sizing='Relative';
			table.cell.padding.horz='0';
			table.cell.padding.vert='1.7';
			table.border.style='none';
			table.border.bottom.style='solid';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					trow.cell.align.vert='Top';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='getParam("$class.summary.title")'
						FMT={
							ctrl.size.width='234.8';
							ctrl.size.height='17.3';
						}
					</DATA_CTRL>
					<DATA_CTRL>
						FORMULA='getParam("$page.heading.right")'
						FMT={
							ctrl.size.width='264.8';
							ctrl.size.height='17.3';
							ctrl.option.text.trimSpaces='true';
							ctrl.option.text.noBlankOutput='true';
							tcell.align.horz='Right';
						}
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
			'$location','"header"';
		}
		FMT={
			sec.spacing.after='14';
		}
	</TEMPLATE_CALL>
	<ELEMENT_ITER>
		DESCR='iterates by classes to be included in the summary'
		TARGET_ET='ClassDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'RootDoc -> classes^::ClassDoc';
			'PackageDoc[hasParamValue("$class.summary.scope", "interfaces")] -> interfaces^::ClassDoc';
			'PackageDoc[hasParamValue("$class.summary.scope", "ordinaryClasses")] -> ordinaryClasses^::ClassDoc';
			'PackageDoc[hasParamValue("$class.summary.scope", "enums")] -> enums^::ClassDoc';
			'PackageDoc[hasParamValue("$class.summary.scope", "exceptions")] -> exceptions^::ClassDoc';
			'PackageDoc[hasParamValue("$class.summary.scope", "errors")] -> errors^::ClassDoc';
			'PackageDoc[hasParamValue("$class.summary.scope", "annotationTypes")] -> annotationTypes^::AnnotationTypeDoc';
		}
		FILTER='// if this is a nested class, include only when it is static
(getAttrValue("containingClass") == null || getAttrBooleanValue("isStatic"))
&&
(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)'
		SORTING='by-expr'
		SORTING_KEY={expr='/* this sorting key places at the bottom of the list
all classes whose name starts with \'_\' (which is how 
the Standard Doclet generates the "All Classes" list!) */

name = getAttrStringValue("name");
name.startsWith("_") ? name : "!" + name',ascending}
		FMT={
			sec.outputStyle='table';
			table.sizing='Relative';
		}
		<BODY>
			<AREA_SEC>
				COND='! hasParamValue("$class.summary.scope", "allClasses")
||
! getAttrBooleanValue("isInterface")'
				BREAK_PARENT_BLOCK='when-executed'
				<AREA>
					<CTRL_GROUP>
						FMT={
							trow.page.keepTogether='true';
						}
						<CTRLS>
							<SS_CALL_CTRL>
								SS_NAME='Class Name'
								FMT={
									content.outputStyle='text-par';
									ctrl.size.width='48.8';
									ctrl.size.height='17.3';
									tcell.sizing='Minimal';
									tcell.option.maxNbrWidth='50';
									text.font.style.bold='true';
								}
							</SS_CALL_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Comment_Summary (Class)'
								FMT={
									ctrl.size.width='422.3';
									ctrl.size.height='17.3';
									tcell.option.maxNbrWidth='40';
								}
							</SS_CALL_CTRL>
							<DATA_CTRL>
								COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class")'
								DOCFIELD='page-htarget'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='17.3';
									ctrl.option.noHLinkFmt='true';
									tcell.sizing='Minimal';
									tcell.align.horz='Center';
									text.style='cs3';
									text.font.style.italic='true';
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
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							trow.page.keepTogether='true';
						}
						<CTRLS>
							<SS_CALL_CTRL>
								SS_NAME='Class Name'
								FMT={
									content.outputStyle='text-par';
									ctrl.size.width='48.8';
									ctrl.size.height='17.3';
									tcell.sizing='Minimal';
									tcell.option.maxNbrWidth='50';
									text.font.style.bold='true';
									text.font.style.italic='true';
								}
							</SS_CALL_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Comment_Summary (Class)'
								FMT={
									ctrl.size.width='422.3';
									ctrl.size.height='17.3';
									tcell.option.maxNbrWidth='40';
								}
							</SS_CALL_CTRL>
							<DATA_CTRL>
								COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class")'
								DOCFIELD='page-htarget'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='17.3';
									ctrl.option.noHLinkFmt='true';
									tcell.sizing='Minimal';
									tcell.align.horz='Center';
									text.style='cs3';
									text.font.style.italic='true';
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
				DESCR='A separate table heading is actually needed here to specify a different paragraph style ("Summary Heading") on the main cell (with "All Classes Summary" text), which will cause producing by that heading a corresponding item in the documentation\'s Table Of Contents.'
				COND='hasParamValue("$class.summary.scope", "allClasses")'
				BREAK_PARENT_BLOCK='when-executed'
				FMT={
					trow.page.keepWithNext='true';
				}
				<AREA>
					<CTRL_GROUP>
						FMT={
							trow.bkgr.color='#CCCCFF';
							trow.page.keepTogether='true';
							trow.page.keepWithNext='true';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='All Classes Summary'
								FMT={
									ctrl.size.width='471';
									ctrl.size.height='19.5';
									par.style='s2';
								}
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class")'
								TEXT='Page'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='19.5';
									tcell.sizing='Minimal';
									tcell.align.horz='Center';
									text.style='cs3';
									text.font.style.bold='true';
									text.font.style.italic='true';
								}
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				DESCR='In this heading, only the character style "Summary Heading Font" is used, which has no effect on the Table Of Contents.'
				FMT={
					trow.page.keepWithNext='true';
				}
				<AREA>
					<CTRL_GROUP>
						FMT={
							trow.bkgr.color='#CCCCFF';
							trow.page.keepTogether='true';
							trow.page.keepWithNext='true';
						}
						<CTRLS>
							<DATA_CTRL>
								FORMULA='getParam("$class.summary.title")'
								FMT={
									ctrl.size.width='471';
									ctrl.size.height='19.5';
									text.style='cs4';
								}
							</DATA_CTRL>
							<TEXT_CTRL>
								COND='output.format.supportsPagination
&&
getBooleanParam("page.columns")
&&
getBooleanParam("gen.class")'
								TEXT='Page'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='19.5';
									tcell.sizing='Minimal';
									tcell.align.horz='Center';
									text.style='cs3';
									text.font.style.bold='true';
									text.font.style.italic='true';
								}
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
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

The section iterate by inline tags and processes them.'
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
								PARAMS_EXPR='Array("firstSentenceTags")'
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
		SS_NAME='Comment_Summary (Class)'
		DESCR='generates the summary description for a class.

This stock-section switches the search path for the input associated files to the class source location (see "Processing | Init Expression" tab), which is needed when there are some images to be inserted in the text. Although, initially (when starting the template) the search path is supposed to point to that very location, this will be the case only when there is "package.html" file in the package source directory.'
		MATCHING_ET='ClassDoc'
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
						COLLAPSED
						FMT={
							txtfl.delimiter.type='nbsp';
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
</STOCK_SECTIONS>
CHECKSUM='N4kk1S3vpXnJ0yfwzxV3eIcb+Lc9v276eZqMxD2xtkA'
</DOCFLEX_TEMPLATE>