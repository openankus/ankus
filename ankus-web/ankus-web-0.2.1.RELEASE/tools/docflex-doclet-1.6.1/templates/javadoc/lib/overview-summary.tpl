<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:50:00'
LAST_UPDATE='2012-05-24 08:56:31'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
FINISH_EXPR='/* When the HTML output is being generated, copy all files from the local "doc-files" 
subdir contained in the source directory (along with "overview.html" file) to the 
destination Associated Files directory (to have all images inserted in description 
with <IMG> tags get in the result documentation) */

output.generating && output.format.name == "HTML" ? 
  copyFiles (output.inputFilesPath + "doc-files", output.docFilesDir)'
TITLE_EXPR='title = "Overview";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='windowTitle';
		param.title='Window Title';
		param.type='string';
	}
	PARAM={
		param.name='docTitle';
		param.title='Documentation Title';
		param.type='string';
	}
	PARAM={
		param.name='include.deprecated';
		param.title='deprecated API';
		param.description='Controls whether to generate documentation for  any deprecated API.';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='include.details.packages';
		param.title='packages';
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
	PAR_STYLE={
		style.name='Overview Heading';
		style.id='s2';
		text.font.size='16';
		text.font.style.bold='true';
		text.color.foreground='#FFFFFF';
		par.bkgr.opaque='true';
		par.bkgr.color='#009999';
		par.border.style='solid';
		par.margin.bottom='1.7';
		par.padding.left='2.8';
		par.padding.right='2.8';
		par.padding.top='1.7';
		par.padding.bottom='1.7';
	}
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs4';
		text.font.size='9';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs5';
		text.font.size='12';
		text.font.style.bold='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs3';
}
<HTARGET>
	HKEYS={
		'"overview-summary"';
	}
</HTARGET>
<ROOT>
	<AREA_SEC>
		COND='getStringParam("docTitle") != ""'
		<AREA>
			<CTRL_GROUP>
				FMT={
					txtfl.delimiter.type='none';
					par.style='s2';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='getStringParam("docTitle")'
						FMT={
							text.font.style.bold='true';
							txtfl.ehtml.render='true';
						}
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				COND='! output.noTimeStamp'
				FMT={
					trow.cell.align.vert='Top';
				}
				<CTRLS>
					<DATA_CTRL>
						FORMULA='dateTime()'
						FMT={
							text.font.size='9';
							text.option.nbsps='true';
						}
					</DATA_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='Description Summary'
		COND='findHyperTarget (Array(contextElement.id, "description")) != null'
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.margin.top='14';
					par.margin.bottom='0';
				}
				<CTRLS>
					<SS_CALL_CTRL>
						SS_NAME='Comment_Summary'
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
					par.margin.left='30';
					par.margin.bottom='1.7';
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
	<ELEMENT_ITER>
		DESCR='iterates by all packages (both directly specified on the Javadoc command line and those containing classes specified separately)'
		TARGET_ET='PackageDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> PackageDoc';
			'* -> specifiedClasses^::ClassDoc/containingPackage^::PackageDoc';
		}
		FILTER='getBooleanParam("include.deprecated") || ! hasTag("@deprecated")'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		FMT={
			sec.outputStyle='table';
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
									ctrl.size.width='79.5';
									ctrl.size.height='17.3';
									tcell.sizing='Relative';
									text.font.style.bold='true';
								}
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
								SS_NAME='Comment_Summary (Package)'
								FMT={
									ctrl.size.width='391.5';
									ctrl.size.height='17.3';
									tcell.sizing='Relative';
								}
							</SS_CALL_CTRL>
							<DATA_CTRL>
								COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.packages")'
								DOCFIELD='page-htarget'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='17.3';
									ctrl.option.noHLinkFmt='true';
									tcell.sizing='Relative';
									tcell.align.horz='Center';
									text.style='cs4';
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
				<AREA>
					<SPACER>
						FMT={
							spacer.height='14';
						}
					</SPACER>
					<CTRL_GROUP>
						FMT={
							trow.bkgr.color='#CCCCFF';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Package Summary'
								FMT={
									ctrl.size.width='471';
									ctrl.size.height='17.3';
									tcell.sizing='Relative';
									text.style='cs5';
								}
							</TEXT_CTRL>
							<TEXT_CTRL>
								COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.packages")'
								TEXT='Page'
								FMT={
									ctrl.size.width='28.5';
									ctrl.size.height='17.3';
									tcell.sizing='Relative';
									tcell.align.horz='Center';
									text.style='cs4';
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
		DESCR='Overiew Description & tags'
		<HTARGET>
			HKEYS={
				'contextElement.id';
				'"description"';
			}
		</HTARGET>
		<BODY>
			<SS_CALL>
				SS_NAME='Comment'
				FMT={
					sec.spacing.before='14.2';
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
  : tagInfo.getAttrBooleanValue ("overview"))'
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
						MATCHING_ET='RootDoc'
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
	<TEMPLATE_CALL>
		DESCR='bottom message'
		COND='output.type == "document"'
		TEMPLATE_FILE='about.tpl'
	</TEMPLATE_CALL>
</ROOT>
<STOCK_SECTIONS>
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
								PARAMS_EXPR='Array ("firstSentenceTags")'
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
</STOCK_SECTIONS>
CHECKSUM='8EqAavnVu9QdU1E4tkt0FUdg1wurO4yxrAjoVHfqPLM'
</DOCFLEX_TEMPLATE>