<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:50:00'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='PackageDoc'
FINISH_EXPR='/* When the HTML output is being generated, copy all files from the local "doc-files" 
subdir contained in the package source directory to the destination Associated Files 
directory (to have all images inserted in the Java comments using <IMG> tags
get in the result documentation) */

output.generating && output.format.name == "HTML" ? 
  copyFiles (output.inputFilesPath + "doc-files", output.docFilesDir)'
TITLE_EXPR='(packageName = getAttrValue("name")) == null ? packageName = "<unnamed>";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? packageName + " (" + parentTitle + ")" : packageName'
HTML_HEAD_EXPR='(packageName = getAttrValue("name")) == null ? packageName = "<unnamed>";

title = ((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? packageName + " (" + parentTitle + ")" : packageName;

\'<SCRIPT type="text/javascript">
    window.onload = function() {
        if (location.href.indexOf(\\\'is-external=true\\\') == -1)
            parent.document.title="\' + encodeJScriptString (title) + \'";
    }
</SCRIPT>\''
<TEMPLATE_PARAMS>
	PARAM={
		param.name='$contextPackageId';
		param.description='GOMElement.id of the package for which the current document is being generated. This is used to shorten the linked program element\'s qualified name according to the context where it is mentioned.
<p>
Note: This parameter is assigned here to be auto-passed to the called subtemplates.';
		param.type='Object';
		param.defaultValue.expr='rootElement.id';
		param.fixed='true';
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
		style.name='Heading 2';
		style.id='s1';
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
		style.id='s2';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Package Heading';
		style.id='s3';
		text.font.name='Times New Roman';
		text.font.size='26';
		par.level='1';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Package Superheading';
		style.id='s4';
		text.font.name='Times New Roman';
		text.font.size='18';
	}
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs5';
		text.font.size='9';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs6';
		text.font.size='14';
		text.font.style.bold='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs4';
}
<HTARGET>
	HKEYS={
		'contextElement.id';
		'"detail"';
	}
</HTARGET>
<HTARGET>
	COND='mainContext.iterator.numItems == 1'
	HKEYS={
		'"single-package"';
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
					<TEXT_CTRL>
						TEXT='Package'
					</TEXT_CTRL>
					<DATA_CTRL>
						FORMULA='(name = getAttrValue("name")) != "" ? name : "<unnamed>"'
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
</PAGE_HEADER>
<ROOT>
	<FOLDER>
		DESCR='CASE OF SEPARATE FILE OUTPUT (\'package-summary.html\')'
		COND='output.type == "document"'
		INIT_EXPR='setVar (
  "has_package_description",
  checkStockSectionOutput("Package Description & Tags")
)'
		BREAK_PARENT_BLOCK='when-executed'
		<BODY>
			<TEMPLATE_CALL>
				DESCR='Navigation Bar'
				COND='getBooleanParam("gen.navbar")'
				TEMPLATE_FILE='navbar.tpl'
				PASSED_PARAMS={
					'$type','"package"';
					'$location','"header"';
				}
			</TEMPLATE_CALL>
			<AREA_SEC>
				DESCR='Title (used in framed documentation)'
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.style='s1';
						}
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
			</AREA_SEC>
			<AREA_SEC>
				DESCR='package annotations'
				COND='hasChild("AnnotationDesc")'
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEMPLATE_CALL_CTRL>
								TEMPLATE_FILE='annotations.tpl'
								FMT={
									text.style='cs2';
								}
							</TEMPLATE_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				DESCR='Package description summary'
				COND='getBooleanVar ("has_package_description")'
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.margin.top='14';
						}
						<CTRLS>
							<SS_CALL_CTRL>
								DESCR='the first sentence of package description'
								SS_NAME='Comment'
								PARAMS_EXPR='Array ("firstSentenceTags")'
							</SS_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							par.margin.top='14';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='See:'
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
							<TEXT_CTRL>
								TEXT='Description'
								FMT={
									text.font.style.bold='true';
								}
								<DOC_HLINK>
									HKEYS={
										'contextElement.id';
										'"description"';
									}
								</DOC_HLINK>
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<SS_CALL>
				SS_NAME='Class Summaries'
				FMT={
					sec.spacing.before='14';
				}
			</SS_CALL>
			<FOLDER>
				DESCR='Package description & tags'
				COND='getBooleanVar ("has_package_description")'
				<HTARGET>
					HKEYS={
						'contextElement.id';
						'"description"';
					}
					NAME_EXPR='"package_description"'
				</HTARGET>
				<BODY>
					<AREA_SEC>
						<AREA>
							<CTRL_GROUP>
								FMT={
									text.font.style.bold='true';
									par.style='s1';
								}
								<CTRLS>
									<TEXT_CTRL>
										TEXT='Package'
									</TEXT_CTRL>
									<DATA_CTRL>
										ATTR='name'
									</DATA_CTRL>
									<TEXT_CTRL>
										TEXT='Description'
									</TEXT_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<SS_CALL>
						SS_NAME='Package Description & Tags'
					</SS_CALL>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='Navigation Bar & bottom message'
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
							'$type','"package"';
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
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='CASE OF FRAGMENT OF SINGLE FILE DOCUMENTATION'
		COLLAPSED
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							par.style='s4';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Package'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							par.style='s3';
						}
						<CTRLS>
							<DATA_CTRL>
								FORMULA='(name = getAttrValue("name")) != "" ? name : "<unnamed>"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				DESCR='package annotations'
				COND='hasChild("AnnotationDesc")'
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEMPLATE_CALL_CTRL>
								TEMPLATE_FILE='annotations.tpl'
								FMT={
									text.style='cs2';
								}
							</TEMPLATE_CALL_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<SS_CALL>
				SS_NAME='Package Description & Tags'
				FMT={
					sec.spacing.before='14';
				}
			</SS_CALL>
			<SS_CALL>
				SS_NAME='Class Summaries'
				FMT={
					sec.spacing.before='15';
				}
			</SS_CALL>
		</BODY>
	</FOLDER>
</ROOT>
<STOCK_SECTIONS>
	<FOLDER>
		SS_NAME='Class Summaries'
		DESCR='SUMMARIES OF ALL CLASSES IN THE PACKAGE'
		MATCHING_ET='PackageDoc'
		COLLAPSED
		<BODY>
			<TEMPLATE_CALL>
				DESCR='Interface Summary'
				TEMPLATE_FILE='class-summary.tpl'
				PASSED_PARAMS={
					'$class.summary.scope','"interfaces"';
					'$class.summary.title','"Interface Summary"';
				}
				FMT={
					sec.spacing.after='18';
				}
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='Class Summary'
				TEMPLATE_FILE='class-summary.tpl'
				PASSED_PARAMS={
					'$class.summary.scope','"ordinaryClasses"';
					'$class.summary.title','"Class Summary"';
				}
				FMT={
					sec.spacing.after='18';
				}
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='Enum Summary'
				TEMPLATE_FILE='class-summary.tpl'
				PASSED_PARAMS={
					'$class.summary.scope','"enums"';
					'$class.summary.title','"Enum Summary"';
				}
				FMT={
					sec.spacing.after='18';
				}
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='Exception Summary'
				TEMPLATE_FILE='class-summary.tpl'
				PASSED_PARAMS={
					'$class.summary.scope','"exceptions"';
					'$class.summary.title','"Exception Summary"';
				}
				FMT={
					sec.spacing.after='18';
				}
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='Error Summary'
				TEMPLATE_FILE='class-summary.tpl'
				PASSED_PARAMS={
					'$class.summary.scope','"errors"';
					'$class.summary.title','"Error Summary"';
				}
				FMT={
					sec.spacing.after='18';
				}
			</TEMPLATE_CALL>
			<TEMPLATE_CALL>
				DESCR='Annotation Types Summary'
				TEMPLATE_FILE='class-summary.tpl'
				PASSED_PARAMS={
					'$class.summary.scope','"errors"';
					'$class.summary.title','"Annotation Types Summary"';
				}
				FMT={
					sec.spacing.after='18';
				}
			</TEMPLATE_CALL>
		</BODY>
	</FOLDER>
	<ELEMENT_ITER>
		SS_NAME='Comment'
		DESCR='param: the name of the passed context element\'s attribute which returns an array containing all inline tags representing the whole comment (e.g. "firstSentenceTags").

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
					'$contextClassId','stockSection.contextElement.instanceOf ("ClassDoc") ?
  stockSection.contextElement.id : null';
				}
			</TEMPLATE_CALL>
		</BODY>
	</ELEMENT_ITER>
	<FOLDER>
		SS_NAME='Package Description & Tags'
		MATCHING_ET='PackageDoc'
		<BODY>
			<SS_CALL>
				DESCR='description'
				SS_NAME='Comment'
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
  : tagInfo.getAttrBooleanValue ("packages"))'
				SORTING='by-expr'
				SORTING_KEY={expr='findElementByKey (
  "tags-to-document", getAttrValue("kind")
).toElement().getAttrIntValue ("number")',ascending,unique}
				FMT={
					sec.spacing.before='14';
				}
				<BODY>
					<ELEMENT_ITER>
						DESCR='@see'
						COND='hasAttrValue ("kind", "@see")'
						CONTEXT_ELEMENT_EXPR='rootElement'
						MATCHING_ET='PackageDoc'
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
					<ELEMENT_ITER>
						DESCR='any other tag'
						COLLAPSED
						ALWAYS_PROC_HDRFTR
						TARGET_ET='Tag'
						SCOPE='custom'
						ELEMENT_ENUM_EXPR='findElementsByIds (
  rootElement.tags (getAttrStringValue("kind"))
)'
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
			</ELEMENT_ITER>
		</BODY>
	</FOLDER>
</STOCK_SECTIONS>
CHECKSUM='jw8xeSx3ZhaEPIqwRPKdAl6rmk972VkNQfyuds3XQKQ'
</DOCFLEX_TEMPLATE>