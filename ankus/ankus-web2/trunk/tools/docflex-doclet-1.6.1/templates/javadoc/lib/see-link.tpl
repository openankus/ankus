<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2007-02-23 11:41:36'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='SeeTag'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='contextClassId';
		param.description='The GOMElement.id of the class for which the current document (or its fragment) is being generated. This is used to shorten the linked program element\'s name according to the context where it is mentioned.';
		param.type='Object';
	}
	PARAM={
		param.name='omit.packageQualifiers.for';
		param.title='omit package qualifiers started with prefixes';
		param.type='string';
		param.list='true';
	}
	PARAM={
		param.name='omit.packageQualifiers.all';
		param.title='omit all package qualifiers';
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
	<AREA_SEC>
		DESCR='if the tag has a label'
		COND='getAttrStringValue("label") != ""'
		BREAK_PARENT_BLOCK='when-executed'
		FMT={
			sec.outputStyle='text-par';
		}
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.margin.bottom='0';
				}
				<CTRLS>
					<DATA_CTRL>
						ATTR='label'
						FMT={
							txtfl.ehtml.render='true';
						}
						<DOC_HLINK>
							TITLE_EXPR='(getAttrValue("referencedMember") != null) ? "" :
 getElementByLinkAttr("referencedClass").callStockSection("Class Link Title")'
							HKEYS={
								'(m = getAttrValue("referencedMember")) != null ? m :
  (c = getAttrValue("referencedClass")) != null ? c : 
     getAttrValue("referencedPackage")';
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
							TITLE_EXPR='(getAttrValue("referencedMember") != null) ? "" :
 getElementByLinkAttr("referencedClass").callStockSection("Class Link Title")'
							URL_EXPR='getExternalDocURL(
  (m = getElementByLinkAttr("referencedMember")) != null ? m :
    (c = getElementByLinkAttr("referencedClass")) != null ? c : 
       getElementByLinkAttr("referencedPackage")
)'
						</URL_HLINK>
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='otherwise, if there is a referenced member'
		COND='getAttrValue("referencedMemberName") != null'
		BREAK_PARENT_BLOCK='when-executed'
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.margin.bottom='0';
				}
				<CTRLS>
					<PANEL>
						DESCR='the panel is needed here to define a single hyperlink'
						FMT={
							ctrl.size.width='499.5';
							txtfl.delimiter.type='text';
							txtfl.delimiter.text='.';
						}
						<DOC_HLINK>
							HKEYS={
								'(id = getAttrValue("referencedMember")) != null ? id : getAttrValue("referencedClass")';
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
							URL_EXPR='getExternalDocURL(
  (el = getElementByLinkAttr("referencedMember")) != null ? el : getElementByLinkAttr("referencedClass")
)'
						</URL_HLINK>
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										COND='(classId = ((m = getElementByLinkAttr("referencedMember")) != null ? 
   m.getAttrValue("containingClass") : getAttrValue("referencedClass"))) == null 
||
classId != ((contextClassId = getParam("contextClassId")) != null ? 
             contextClassId : getAttrValue("holder"))'
										FORMULA='(class = ((m = getElementByLinkAttr("referencedMember")) != null ? 
   m.getElementByLinkAttr("containingClass") : 
   getElementByLinkAttr("referencedClass"))) != null ? 
{
  name = class.getAttrStringValue("name");

  getBooleanParam("omit.packageQualifiers.all") || 
    findHyperTarget (Array (class.id, "detail")) != null ? name :
  {
    qname = class.getAttrStringValue("qualifiedName");
    qname.startsWith (getArrayParam("omit.packageQualifiers.for"))
      ? name : qname
  }

} : getAttrValue("referencedClassName")'
										FMT={
											ctrl.option.text.noBlankOutput='true';
										}
									</DATA_CTRL>
									<DATA_CTRL>
										FORMULA='referencedName = getAttrStringValue("referencedMemberName");

(m = getElementByLinkAttr("referencedMember")) != null ? {

  name = m.getAttrStringValue("name");

  m.instanceOf("ExecutableMemberDoc") ? {
    referencedName.contains("(") ? referencedName : 
      name + m.callStockSection("Param Signature")
  } : name

} : referencedName'
										FMT={
											ctrl.option.text.collapseSpaces='true';
											ctrl.option.text.trimSpaces='true';
											ctrl.option.text.noBlankOutput='true';
										}
									</DATA_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</PANEL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='otherwise, if there is a referenced class'
		COND='getAttrValue("referencedClassName") != null'
		BREAK_PARENT_BLOCK='when-executed'
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.margin.bottom='0';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='class = getElementByLinkAttr("referencedClass");
name = class.getAttrStringValue("name");

getBooleanParam("omit.packageQualifiers.all") ||
  findHyperTarget (Array (class.id, "detail")) != null ? name : 
{
  qname = class.getAttrStringValue("qualifiedName");
  qname.startsWith (getArrayParam("omit.packageQualifiers.for"))
    ? name : qname
}'
						FMT={
							ctrl.option.text.noBlankOutput='true';
						}
						<DOC_HLINK>
							TITLE_EXPR='getElementByLinkAttr("referencedClass").callStockSection("Class Link Title")'
							HKEYS={
								'getAttrValue("referencedClass")';
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
							TITLE_EXPR='getElementByLinkAttr("referencedClass").callStockSection("Class Link Title")'
							URL_EXPR='getExternalDocURL(getElementByLinkAttr("referencedClass"))'
						</URL_HLINK>
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='otherwise, if there is only a referenced package'
		BREAK_PARENT_BLOCK='when-output'
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.margin.bottom='0';
				}
				<CTRLS>
					<DATA_CTRL>
						LPATH='referencedPackage^::PackageDoc/@name'
						FMT={
							ctrl.option.text.noBlankOutput='true';
						}
						<DOC_HLINK>
							HKEYS={
								'getAttrValue("referencedPackage")';
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
							URL_EXPR='getExternalDocURL(getElementByLinkAttr("referencedPackage"))'
						</URL_HLINK>
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='otherwise, no output has been produced -- print the tag\'s text as is (unless it is @see tag)'
		COND='getAttrValue("name") != "@see"'
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
		SS_NAME='Param Signature'
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
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("type")'
				MATCHING_ET='Type'
				<AREA>
					<CTRL_GROUP>
						FMT={
							txtfl.delimiter.type='none';
						}
						<CTRLS>
							<DATA_CTRL>
								FORMULA='qname = getAttrStringValue("qualifiedTypeName");

getBooleanParam("omit.packageQualifiers.all") ||
  qname.startsWith (getArrayParam("omit.packageQualifiers.for"))
? getAttrStringValue("typeName") : qname'
							</DATA_CTRL>
							<DATA_CTRL>
								FORMULA='iterator.isLastItem && 
iterator.contextElement.getAttrBooleanValue("isVarArgs") ? 
"..." : getAttrStringValue("dimension")'
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
</STOCK_SECTIONS>
CHECKSUM='a7XLfkHpZdzLLjDrM?XeqflrrnTV9bvXdHS?E0o3dpo'
</DOCFLEX_TEMPLATE>