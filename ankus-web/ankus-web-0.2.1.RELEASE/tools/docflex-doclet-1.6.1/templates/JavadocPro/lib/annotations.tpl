<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2007-03-25 09:31:16'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ETS={'PackageDoc';'Parameter';'ProgramElementDoc'}
<TEMPLATE_PARAMS>
	PARAM={
		param.name='$newLineIndent';
		param.title='external left indent of each new line';
		param.description='The external left indent (in characters) of each new line of the generated annotation representations. 

This indent, which is used only for annotations of method parameters, must be rendered with the same fixed-width font as the method headings ("Courier New", 9)';
		param.type='integer';
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
		style.name='Default Paragraph Font';
		style.id='cs2';
		style.default='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs3';
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
	doc.hlink.style.link='cs3';
}
<ROOT>
	<ELEMENT_ITER>
		DESCR='reproduce all annotations'
		TARGET_ET='AnnotationDesc'
		SCOPE='simple-location-rules'
		RULES={
			'* -> AnnotationDesc';
		}
		FILTER='annType = getElementByLinkAttr("annotationType");

annType.hasAnnotation ("java.lang.annotation.Documented")
&&
annType.isVisible()
&&
! checkElementsByKey("excluded-classes", annType.id)'
		FMT={
			sec.outputStyle='text-par';
			text.option.nbsps='true';
			txtfl.delimiter.type='none';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								COND='! iterator.isFirstItem'
								FORMULA='dup(" ", getIntParam("$newLineIndent"))'
								FMT={
									text.style='cs1';
								}
							</DATA_CTRL>
							<SS_CALL_CTRL>
								SS_NAME='Annotation'
							</SS_CALL_CTRL>
							<DELIMITER>
								FMT={
									txtfl.delimiter.type='nl';
								}
							</DELIMITER>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</ELEMENT_ITER>
</ROOT>
<STOCK_SECTIONS>
	<FOLDER>
		SS_NAME='Annotation'
		DESCR='print a single annotation;
param: the position of the annotation representation (in characters)'
		MATCHING_ET='AnnotationDesc'
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='none';
		}
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<PANEL>
								CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("annotationType")'
								MATCHING_ET='AnnotationTypeDoc'
								FMT={
									ctrl.size.width='164.3';
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
				DESCR='reproduce the element/value list'
				INIT_EXPR='annName = callStockSection (
  iterator.contextElement.getElementByLinkAttr ("annotationType"),
  "Type Name"
);

stockSection.setVar (
  "itemIndent", 
  stockSection.param.toInt() + annName.len() + 2
)'
				TARGET_ET='AnnotationDesc.ElementValuePair'
				SCOPE='simple-location-rules'
				RULES={
					'* -> AnnotationDesc.ElementValuePair';
				}
				FILTER='checkStockSectionOutput (
  findChild("AnnotationValue"),
  "AnnotationValue"
)'
				FMT={
					txtfl.delimiter.type='nl';
					txtfl.delimiter.text=',';
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
										COND='! iterator.isFirstItem'
										FORMULA='dup(" ", getIntParam("$newLineIndent"))'
										FMT={
											text.style='cs1';
										}
									</DATA_CTRL>
									<DATA_CTRL>
										COND='! iterator.isFirstItem'
										FORMULA='dup(" ", stockSection.getIntVar("itemIndent"))'
									</DATA_CTRL>
									<DATA_CTRL>
										CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("element")'
										MATCHING_ET='AnnotationTypeElementDoc'
										ATTR='name'
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
									</DATA_CTRL>
									<TEXT_CTRL>
										TEXT='='
									</TEXT_CTRL>
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
    "element^::AnnotationTypeElementDoc/@name"
  ).toString().length() +
  stockSection.getIntVar("itemIndent") + 1,

  // the annotation position
  stockSection.param
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
	<FOLDER>
		SS_NAME='AnnotationValue'
		DESCR='print an element\'s value;
param[0]: the position of the value representation (in characters)
param[1]: the indent of the value list (in characters)'
		MATCHING_ET='AnnotationValue'
		FMT={
			sec.outputStyle='text-par';
			txtfl.delimiter.type='none';
		}
		<BODY>
			<ELEMENT_ITER>
				DESCR='if the value is an array of other values'
				COND='hasAttr("valueAsAnnotationValues")'
				BREAK_PARENT_BLOCK='when-executed'
				COLLAPSED
				TARGET_ET='AnnotationValue'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> valueAsAnnotationValues^::AnnotationValue';
				}
				FILTER='checkStockSectionOutput("AnnotationValue")'
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									txtfl.delimiter.type='none';
								}
								<CTRLS>
									<DATA_CTRL>
										FORMULA='dup(" ", getIntParam("$newLineIndent"))'
										FMT={
											text.style='cs1';
										}
									</DATA_CTRL>
									<DATA_CTRL>
										FORMULA='dup(" ", stockSection.params[1].toInt() + 2)'
									</DATA_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='AnnotationValue'
										PARAMS_EXPR='indent = stockSection.params[1].toInt() + 2;
Array (indent, indent)'
									</SS_CALL_CTRL>
									<TEXT_CTRL>
										COND='! iterator.isLastItem'
										TEXT=','
									</TEXT_CTRL>
									<DELIMITER>
										FMT={
											txtfl.delimiter.type='nl';
										}
									</DELIMITER>
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
										TEXT='{'
									</TEXT_CTRL>
									<DELIMITER>
										FMT={
											txtfl.delimiter.type='nl';
										}
									</DELIMITER>
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
									<DATA_CTRL>
										FORMULA='dup(" ", getIntParam("$newLineIndent"))'
										FMT={
											text.style='cs1';
										}
									</DATA_CTRL>
									<DATA_CTRL>
										FORMULA='dup(" ", stockSection.params[1].toInt())'
									</DATA_CTRL>
									<TEXT_CTRL>
										TEXT='}'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</FOOTER>
			</ELEMENT_ITER>
			<AREA_SEC>
				DESCR='otherwise, if the value is an enum constant'
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("valueAsField")'
				MATCHING_ET='FieldDoc'
				BREAK_PARENT_BLOCK='when-executed'
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
				DESCR='otherwise, if the value is a nested annotation'
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("valueAsAnnotation")'
				MATCHING_ET='AnnotationDesc'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<SS_CALL>
						COND='hasAnnotation (
  getElementByLinkAttr("annotationType"),
  "java.lang.annotation.Documented"
)'
						SS_NAME='Annotation'
						PARAMS_EXPR='stockSection.params'
					</SS_CALL>
				</BODY>
			</FOLDER>
			<AREA_SEC>
				DESCR='otherwise, if the value is a primitive type or a class'
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("valueAsType")'
				MATCHING_ET='Type'
				BREAK_PARENT_BLOCK='when-executed'
				COLLAPSED
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
				DESCR='otherwise, the value is a string'
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
		SS_NAME='Type Name'
		MATCHING_ET='Type'
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
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</STOCK_SECTIONS>
CHECKSUM='iy0Ia8OAX4+X+cIVaJua0Q407YbPFQ+4YmayKjfc3wo'
</DOCFLEX_TEMPLATE>