<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2007-02-23 11:41:36'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='SeeTag'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='$contextClassId';
		param.description='GOMElement.id of the class for which the current document (or its fragment) is being generated.  This is used:
<ul>
<li>To shorten the linked program element\'s name according to the context where it is mentioned.</li>
<li>To resolve the adopting classes of linked orphan members (whose own containing classes are excluded)</li>
</ul>';
		param.type='Object';
	}
	PARAM={
		param.name='$contextPackageId';
		param.description='GOMElement.id of the package for which (or for whose class) the current document (or its fragment) is being generated.  This is used to shorten the linked program element\'s qualified name according to the context where it is mentioned.';
		param.type='Object';
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
							TITLE_EXPR='getBooleanParam("show.linkTitle") && 
  getAttrValue("referencedMember") == null ?
    getElementByLinkAttr("referencedClass").callStockSection("Class Link Title")
: ""'
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
							TITLE_EXPR='getBooleanParam("show.linkTitle") && 
  getAttrValue("referencedMember") == null ?
    getElementByLinkAttr("referencedClass").callStockSection("Class Link Title")
: ""'
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
		INIT_EXPR='(member = getElementByLinkAttr("referencedMember")) != null ?
{
  cls = member.getElementByLinkAttr("containingClass");

  cls.isVisible() && ! checkElementsByKey("excluded-classes", cls.id) ?
  {
    thisContext.setVar ("containingClass", cls)
  } : {

    inheritedMemberMapId = member.getAttrBooleanValue("isMethod") ?
                           "inherited-methods" : "inherited-fields";

    referencedClassId = getAttrValue("referencedClass");

    el = findElementByKey (
      "member-adoptions",
      member.id,
      BooleanQuery (
        referencedClassId == getAttrValue ("adoptingClassId")
        ||
        checkElementByKey (
          inheritedMemberMapId, 
          HashKey (referencedClassId, getAttrValue ("adoptingClassId")),
          member
        )
      )
    );

    el == null ?
    {
      (contextClassId = getParam("$contextClassId")) != null ?
      {
        el = findElementByKey (
          "member-adoptions",
          member.id,
          BooleanQuery (
            contextClassId == getAttrValue ("adoptingClassId")
            ||
            checkElementByKey (
              inheritedMemberMapId, 
              HashKey (contextClassId, getAttrValue ("adoptingClassId")),
              member
            )
          )
        )
      };

      el == null ?
        el = findElementByKey ("member-adoptions", member.id);
    };

    thisContext.setVar (
      "containingClass",
      el != null ? findElementById (el.getAttrValue("adoptingClassId")) : cls
    )
  }

} : {
  thisContext.setVar ("containingClass", null)
}'
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
								'getAttrValue("referencedMember")',required;
								'"detail"',required;
								'thisContext.getElementVar("containingClass").id';
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
							URL_EXPR='(containingClass = thisContext.getElementVar("containingClass")) == null ?
  containingClass = getElementByLinkAttr("referencedClass");

(classDocURL = getExternalDocURL (containingClass)) != null ?
{
  (member = getElementByLinkAttr("referencedMember")) != null ?
  {
    member.instanceOf("ExecutableMemberDoc")
      ? classDocURL + "#" + member.getAttrValue ("name") + member.getAttrValue ("rawSignature")
      : classDocURL + "#" + member.getAttrValue ("name")
  } : ""
} : ""'
						</URL_HLINK>
						<AREA>
							<CTRL_GROUP>
								<CTRLS>
									<DATA_CTRL>
										COND='containingClass = thisContext.getElementVar ("containingClass");

containingClass == null 
||
containingClass.id != ((contextClassId = getParam("$contextClassId")) != null ? 
                        contextClassId : getAttrValue("holder"))'
										FORMULA='(containingClass = thisContext.getElementVar ("containingClass")) != null ? 
{
  name = containingClass.getAttrStringValue("name");

  getBooleanParam("show.qualifier") &&
  containingClass.getAttrValue("containingPackage") != getParam("$contextPackageId") &&
  findHyperTarget (Array (containingClass.id, "detail")) == null ?
  {
    qualifiedName = containingClass.getAttrStringValue("qualifiedName");
    matchQualifiedName (qualifiedName, getArrayParam("show.qualifier.omit")) 
      ? name : qualifiedName
  } : name

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
						FORMULA='((class = getElementByLinkAttr("referencedClass")) != null) ?
{
  name = class.getAttrStringValue("name");

  getBooleanParam("show.qualifier") &&
  class.getAttrValue("containingPackage") != getParam("$contextPackageId") &&
  findHyperTarget (Array (class.id, "detail")) == null ?
  {
    qualifiedName = class.getAttrStringValue("qualifiedName");
    matchQualifiedName (qualifiedName, getArrayParam("show.qualifier.omit"))
      ? name : qualifiedName
  } : name

} : {
  getAttrStringValue("referencedClassName");
}'
						FMT={
							ctrl.option.text.noBlankOutput='true';
						}
						<DOC_HLINK>
							CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("referencedClass")'
							MATCHING_ET='ClassDoc'
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
							CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("referencedClass")'
							MATCHING_ET='ClassDoc'
							TITLE_EXPR='getBooleanParam("show.linkTitle") ?
  callStockSection("Class Link Title") : ""'
							URL_EXPR='getExternalDocURL()'
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
(specified with -link/-linkoffline options on Javadoc command line), when 
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
								FORMULA='qualifiedName = getAttrStringValue("qualifiedTypeName");

getBooleanParam("show.qualifier") &&
  ! matchQualifiedName (qualifiedName, getArrayParam("show.qualifier.omit"))
? qualifiedName : getAttrStringValue("typeName")'
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
CHECKSUM='6I?OHqu3NKWdCIL5NSOrvVLHLRk+KVRRyVCEdCoulMs'
</DOCFLEX_TEMPLATE>