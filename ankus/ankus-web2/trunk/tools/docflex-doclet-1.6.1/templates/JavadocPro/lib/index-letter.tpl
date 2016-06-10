<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-05-22 04:34:45'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='#CUSTOM'
INIT_EXPR='prepareElementMap (
  "index",
  findElementsByLRules (
    Array (
      LocationRule ("RootDoc -> PackageDoc", false),
      LocationRule ("RootDoc -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc", false),
      LocationRule ("RootDoc -> classes^::ClassDoc", false),
      LocationRule ("ClassDoc -> MemberDoc", true)
    ),
    "PackageDoc | ClassDoc | MemberDoc"
  ),
  FlexQuery (getAttrStringValue("name").charAt(0).toUpperCase())
)'
TITLE_EXPR='title = contextElement.value + "-Index";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = contextElement.value + "-Index";

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
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.hlink.style.link='cs2';
}
<HTARGET>
	HKEYS={
		'"index"';
		'rootElement.value';
	}
</HTARGET>
<ROOT>
	<TEMPLATE_CALL>
		DESCR='Navigation Bar'
		COND='output.type == "document" && getBooleanParam("gen.navbar")'
		TEMPLATE_FILE='navbar.tpl'
		PASSED_PARAMS={
			'$type','"index"';
			'$location','"header"';
		}
	</TEMPLATE_CALL>
	<AREA_SEC>
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s1';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='rootElement.value'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<ELEMENT_ITER>
		TARGET_ETS={'#CUSTOM';'ClassDoc';'MemberDoc';'PackageDoc'}
		SCOPE='custom'
		ELEMENT_ENUM_EXPR='findElementsByKey (
  "index",
  contextElement.value
)'
		SORTING='by-expr'
		SORTING_KEY={expr='getAttrStringValue("name")',ascending}
		<BODY>
			<FOLDER>
				DESCR='METHOD'
				COND='getAttrBooleanValue("isMethod")'
				MATCHING_ETS={'#CUSTOM';'MethodDoc'}
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						MATCHING_ET='MethodDoc'
						INIT_EXPR='thisContext.setVar (
  "containingClass",
  getElementByLinkAttr("containingClass")
)'
						BREAK_PARENT_BLOCK='when-executed'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										FORMULA='getAttrStringValue("name") + getAttrStringValue("flatSignature")'
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
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='! getAttrBooleanValue("isStatic")'
										TEXT='Method'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isStatic")'
										TEXT='Static method'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='in'
									</TEXT_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Containing Class'
										PASSED_ELEMENT_EXPR='thisContext.getElementVar("containingClass")'
										PASSED_ELEMENT_MATCHING_ET='ClassDoc'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Method)'
										PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						MATCHING_ET='#CUSTOM'
						INIT_EXPR='thisContext.setVar (
  "containingClass",
  findElementById (getAttrValue("adoptingClassId"))
);'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										FORMULA='getAttrStringValue("name") + getAttrStringValue("flatSignature")'
										FMT={
											text.font.style.bold='true';
										}
										<DOC_HLINK>
											HKEYS={
												'getAttrValue("id")';
												'"detail"';
												'getAttrValue("adoptingClassId")';
											}
										</DOC_HLINK>
									</DATA_CTRL>
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='! contextElement.value.toElement().getAttrBooleanValue("isStatic")'
										TEXT='Method'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='contextElement.value.toElement().getAttrBooleanValue("isStatic")'
										TEXT='Static method'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='in'
									</TEXT_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Containing Class'
										PASSED_ELEMENT_EXPR='thisContext.getElementVar("containingClass")'
										PASSED_ELEMENT_MATCHING_ET='ClassDoc'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Method)'
										PASSED_ELEMENT_EXPR='contextElement.value.toElement()'
										PASSED_ELEMENT_MATCHING_ET='MethodDoc'
										PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='FIELD'
				COND='getAttrBooleanValue("isField") || getAttrBooleanValue("isEnumConstant")'
				MATCHING_ETS={'#CUSTOM';'FieldDoc'}
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						MATCHING_ET='FieldDoc'
						INIT_EXPR='thisContext.setVar (
  "containingClass",
  getElementByLinkAttr("containingClass")
)'
						BREAK_PARENT_BLOCK='when-executed'
						<AREA>
							<CTRL_GROUP>
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
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='! getAttrBooleanValue("isStatic")'
										TEXT='Variable'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isStatic") &&
! getAttrBooleanValue("isEnumConstant")'
										TEXT='Static variable'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isEnumConstant")'
										TEXT='Constant'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='in'
									</TEXT_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Containing Class'
										PASSED_ELEMENT_EXPR='thisContext.getElementVar("containingClass")'
										PASSED_ELEMENT_MATCHING_ET='ClassDoc'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Member)'
										PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						CONTEXT_ELEMENT_EXPR='thisContext.setVar (
  "containingClass",
  findElementById (getAttrValue("adoptingClassId"))
);

contextElement.value.toElement()'
						MATCHING_ET='FieldDoc'
						<AREA>
							<CTRL_GROUP>
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
												'sectionBlock.contextElement.getAttrValue("adoptingClassId")';
											}
										</DOC_HLINK>
									</DATA_CTRL>
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='! getAttrBooleanValue("isStatic")'
										TEXT='Variable'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isStatic") &&
! getAttrBooleanValue("isEnumConstant")'
										TEXT='Static variable'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isEnumConstant")'
										TEXT='Constant'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='in'
									</TEXT_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Containing Class'
										PASSED_ELEMENT_EXPR='thisContext.getElementVar("containingClass")'
										PASSED_ELEMENT_MATCHING_ET='ClassDoc'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Member)'
										PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='CONSTRUCTOR'
				MATCHING_ET='ConstructorDoc'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						INIT_EXPR='thisContext.setVar (
  "containingClass",
  getElementByLinkAttr("containingClass")
)'
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										FORMULA='getAttrStringValue("name") + getAttrStringValue("flatSignature")'
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
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='Constructor for'
									</TEXT_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Containing Class'
										PASSED_ELEMENT_EXPR='thisContext.getElementVar("containingClass")'
										PASSED_ELEMENT_MATCHING_ET='ClassDoc'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Member)'
										PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='CLASS'
				MATCHING_ET='ClassDoc'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
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
										SS_NAME='Type Parameters'
									</SS_CALL_CTRL>
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isInterface")'
										TEXT='Interface'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isOrdinaryClass")'
										TEXT='Class'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isEnum")'
										TEXT='Enum'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isException")'
										TEXT='Exception'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isError")'
										TEXT='Error'
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='getAttrBooleanValue("isAnnotationType")'
										TEXT='Annotation Type'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='in'
									</TEXT_CTRL>
									<DATA_CTRL>
										FORMULA='(name = getAttrValue("containingPackageName")) != "" ? name : "<unnamed>"'
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
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Class)'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='PACKAGE'
				MATCHING_ET='PackageDoc'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						COND='getAttrValue("name") != null'
						<AREA>
							<CTRL_GROUP>
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
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='package'
									</TEXT_CTRL>
									<DATA_CTRL>
										ATTR='name'
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Package)'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='ANNOTATION TYPE ELEMENT'
				COND='getAttrBooleanValue("isAnnotationTypeElement")'
				MATCHING_ET='AnnotationTypeElementDoc'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						INIT_EXPR='thisContext.setVar (
  "containingClass",
  getElementByLinkAttr("containingClass")
)'
						<AREA>
							<CTRL_GROUP>
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
									<TEXT_CTRL>
										TEXT='-'
									</TEXT_CTRL>
									<TEXT_CTRL>
										TEXT='Element in'
									</TEXT_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Containing Class'
										PASSED_ELEMENT_EXPR='thisContext.getElementVar("containingClass")'
										PASSED_ELEMENT_MATCHING_ET='ClassDoc'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
							<CTRL_GROUP>
								FMT={
									row.indent.block='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Member)'
										PARAMS_EXPR='Array (thisContext.getVar("containingClass"))'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
				</BODY>
			</FOLDER>
		</BODY>
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
					'$type','"index"';
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
	<ELEMENT_ITER>
		SS_NAME='Comment'
		DESCR='PROCESS COMMENT TO ANYTHING 
(except a method and the method @param, @return and @throws/@exception tags).

param[0] - the name of the attribute of the passed context element, which holds an array containing all inline tags representing the whole comment (e.g. "inlineTags" or "firstSentenceTags").
param[1] - context package id
param[2] - context class id

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
				PASSED_PARAMS={
					'$contextPackageId','stockSection.params[1]';
					'$contextClassId','stockSection.params[2]';
				}
			</TEMPLATE_CALL>
		</BODY>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		SS_NAME='Comment (Method)'
		DESCR='PROCESS COMMENT TO A METHOD;

passed context element - the owner of the inline tags representing the comment;

param[0] - the name of the context element\'s attribute that returns an array containing all inline tags representing the whole comment (e.g. "inlineTags").
param[1] - the class containing the method for which the whole comment is generated

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
				PASSED_PARAMS={
					'$contextClassId','stockSection.params[1].toElement().id';
					'$contextPackageId','contextClass = stockSection.params[1].toElement();
contextClass.getAttrValue("containingPackage")';
				}
			</TEMPLATE_CALL>
		</BODY>
	</ELEMENT_ITER>
	<FOLDER>
		SS_NAME='Comment_Summary (Class)'
		DESCR='SUMMARY COMMENT TO CLASS'
		MATCHING_ET='ClassDoc'
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
								PARAMS_EXPR='class = stockSection.contextElement;

Array (
  "inlineTags",
  class.getAttrValue("containingPackage"),
  class.id
)'
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
				PARAMS_EXPR='class = stockSection.contextElement;

Array (
  "firstSentenceTags",
  class.getAttrValue("containingPackage"),
  class.id
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
								PARAMS_EXPR='Array ("inlineTags", stockSection.param)'
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
				BREAK_PARENT_BLOCK='when-output'
				SS_NAME='Comment (Method)'
				PARAMS_EXPR='Array ("firstSentenceTags", stockSection.param)'
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
						PARAMS_EXPR='Array ("firstSentenceTags", stockSection.param)'
					</SS_CALL>
				</BODY>
			</FOLDER>
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
		SS_NAME='Comment_Summary (Package)'
		DESCR='SUMMARY COMMENT TO PACKAGE'
		MATCHING_ET='PackageDoc'
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<SS_CALL>
				DESCR='if no @deprecated tag, generate a description by the method\'s "firstSentenceTags" inline tags'
				SS_NAME='Comment'
				PARAMS_EXPR='Array (
  "firstSentenceTags",
  stockSection.contextElement.id
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
	<AREA_SEC>
		SS_NAME='Containing Class'
		MATCHING_ET='ClassDoc'
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isInterface")'
						TEXT='interface'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isOrdinaryClass")'
						TEXT='class'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isEnum")'
						TEXT='enum'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isException")'
						TEXT='exception'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isError")'
						TEXT='error'
					</TEXT_CTRL>
					<TEXT_CTRL>
						COND='getAttrBooleanValue("isAnnotationType")'
						TEXT='annotation type'
					</TEXT_CTRL>
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
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<FOLDER>
		SS_NAME='Type Name'
		DESCR='print the type name (i.e. the name of the referenced class/interface or the name of the type variable)'
		MATCHING_ET='Type'
		<BODY>
			<AREA_SEC>
				DESCR='otherwise, which this was a normal type variable declared somewhere within this class'
				MATCHING_ET='TypeVariable'
				BREAK_PARENT_BLOCK='when-executed'
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
						DESCR='otherwise, which this was a normal type variable declared somewhere within this class'
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
							<DELIMITER>
								FMT={
									txtfl.delimiter.type='none';
								}
							</DELIMITER>
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
CHECKSUM='lWDWVzqlqPO2oO9gIkNgXTrTeiwgtltWX4I4ZEo5+0I'
</DOCFLEX_TEMPLATE>