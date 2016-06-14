<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:50:00'
LAST_UPDATE='2012-05-24 08:56:32'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='PackageDoc'
FINISH_EXPR='/* When the HTML output is being generated, copy all files from the local "doc-files" 
subdir contained in the package source directory to the destination Associated Files 
directory (to have all images inserted in the Java comments using <IMG> tags
get in the result documentation) */

output.generating && output.format.name == "HTML" ? 
  copyFiles (output.inputFilesPath + "doc-files", output.docFilesDir)'
TITLE_EXPR='(name = getAttrValue("name")) == null ? name = "<unnamed>";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? name + " (" + parentTitle + ")" : name'
<TEMPLATE_PARAMS>
	PARAM={
		param.name='windowTitle';
		param.title='Window Title';
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
		param.name='include.details.classes';
		param.title='classes';
		param.type='boolean';
		param.defaultValue='true';
	}
	PARAM={
		param.name='exclude.byTags.classes.all';
		param.title='exclude classes by tags';
		param.type='string';
		param.list='true';
	}
	PARAM={
		param.name='exclude.byAnns.classes.all';
		param.title='exclude classes by annotations';
		param.type='string';
		param.list='true';
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
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs4';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s1';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Package Heading';
		style.id='s2';
		text.font.size='16';
		text.font.style.bold='true';
		par.bkgr.opaque='true';
		par.bkgr.color='#D3EAFD';
		par.border.style='solid';
		par.padding.left='2.8';
		par.padding.right='2.8';
		par.padding.top='1.7';
		par.padding.bottom='1.7';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Page Reference Font';
		style.id='cs5';
		text.font.size='9';
	}
	CHAR_STYLE={
		style.name='Summary Heading Font';
		style.id='cs6';
		text.font.size='12';
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
	<AREA_SEC>
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s2';
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
				FMT={
					par.margin.top='14';
				}
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
		COND='findHyperTarget (Array(contextElement.id, "description")) != null'
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.margin.top='14';
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
	<FOLDER>
		DESCR='ALL CLASSES SUMMARIES'
		COLLAPSED
		<BODY>
			<ELEMENT_ITER>
				DESCR='Interface Summary'
				TARGET_ET='ClassDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> interfaces^::ClassDoc';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
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
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
										FMT={
											content.outputStyle='text-par';
											ctrl.size.width='79.5';
											ctrl.size.height='17.3';
											tcell.sizing='Minimal';
											text.font.style.bold='true';
											text.font.style.italic='true';
										}
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Class)'
										FMT={
											ctrl.size.width='391.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
										}
									</SS_CALL_CTRL>
									<DATA_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										DOCFIELD='page-htarget'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											ctrl.option.noHLinkFmt='true';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
										TEXT='Interface Summary'
										FMT={
											ctrl.size.width='471';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											text.style='cs6';
										}
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										TEXT='Page'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
			<ELEMENT_ITER>
				DESCR='Class Summary'
				TARGET_ET='ClassDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> ordinaryClasses^::ClassDoc';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
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
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
										FMT={
											content.outputStyle='text-par';
											ctrl.size.width='76.5';
											ctrl.size.height='17.3';
											tcell.sizing='Minimal';
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Class)'
										FMT={
											ctrl.size.width='394.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
										}
									</SS_CALL_CTRL>
									<DATA_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										DOCFIELD='page-htarget'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											ctrl.option.noHLinkFmt='true';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
										TEXT='Class Summary'
										FMT={
											ctrl.size.width='471';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											text.style='cs6';
										}
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										TEXT='Page'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
			<ELEMENT_ITER>
				DESCR='Enum Summary'
				TARGET_ET='ClassDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> enums^::ClassDoc';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
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
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
										FMT={
											content.outputStyle='text-par';
											ctrl.size.width='76.5';
											ctrl.size.height='17.3';
											tcell.sizing='Minimal';
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Class)'
										FMT={
											ctrl.size.width='394.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
										}
									</SS_CALL_CTRL>
									<DATA_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										DOCFIELD='page-htarget'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											ctrl.option.noHLinkFmt='true';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
										TEXT='Enum Summary'
										FMT={
											ctrl.size.width='471';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											text.style='cs6';
										}
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										TEXT='Page'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
			<ELEMENT_ITER>
				DESCR='Exception Summary'
				TARGET_ET='ClassDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> exceptions^::ClassDoc';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
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
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
										FMT={
											content.outputStyle='text-par';
											ctrl.size.width='76.5';
											ctrl.size.height='17.3';
											tcell.sizing='Minimal';
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Class)'
										FMT={
											ctrl.size.width='394.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
										}
									</SS_CALL_CTRL>
									<DATA_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										DOCFIELD='page-htarget'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											ctrl.option.noHLinkFmt='true';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
										TEXT='Exception Summary'
										FMT={
											ctrl.size.width='471';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											text.style='cs6';
										}
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										TEXT='Page'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
			<ELEMENT_ITER>
				DESCR='Error Summary'
				TARGET_ET='ClassDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> errors^::ClassDoc';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
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
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
										FMT={
											content.outputStyle='text-par';
											ctrl.size.width='76.5';
											ctrl.size.height='17.3';
											tcell.sizing='Minimal';
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Class)'
										FMT={
											ctrl.size.width='394.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
										}
									</SS_CALL_CTRL>
									<DATA_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										DOCFIELD='page-htarget'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											ctrl.option.noHLinkFmt='true';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
										TEXT='Error Summary'
										FMT={
											ctrl.size.width='471';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											text.style='cs6';
										}
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										TEXT='Page'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
			<ELEMENT_ITER>
				DESCR='Annotation Types Summary'
				TARGET_ET='AnnotationTypeDoc'
				SCOPE='advanced-location-rules'
				RULES={
					'* -> annotationTypes^::*';
				}
				FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
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
								FMT={
									trow.page.keepTogether='true';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Class Name'
										FMT={
											content.outputStyle='text-par';
											ctrl.size.width='76.5';
											ctrl.size.height='17.3';
											tcell.sizing='Minimal';
											text.font.style.bold='true';
										}
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										SS_NAME='Comment_Summary (Class)'
										FMT={
											ctrl.size.width='394.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
										}
									</SS_CALL_CTRL>
									<DATA_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										DOCFIELD='page-htarget'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											ctrl.option.noHLinkFmt='true';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
										TEXT='Annotation Types Summary'
										FMT={
											ctrl.size.width='471';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											text.style='cs6';
										}
									</TEXT_CTRL>
									<TEXT_CTRL>
										COND='output.format.supportsPageRefs &&
getBooleanParam("include.details.classes")'
										TEXT='Page'
										FMT={
											ctrl.size.width='28.5';
											ctrl.size.height='17.3';
											tcell.sizing='Relative';
											tcell.align.horz='Center';
											text.style='cs5';
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
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='DESCRIPTION & TAGS'
		<HTARGET>
			HKEYS={
				'contextElement.id';
				'"description"';
			}
		</HTARGET>
		<BODY>
			<ELEMENT_ITER>
				DESCR='deprecated description; iterate by @deprecated tags'
				COND='hasTag("@deprecated") || 
hasAnnotation("java.lang.Deprecated")'
				COLLAPSED
				ALWAYS_PROC_HDRFTR
				TARGET_ET='Tag'
				SCOPE='custom'
				ELEMENT_ENUM_EXPR='findElementsByIds(tags("@deprecated"))'
				FMT={
					sec.outputStyle='text-par';
					sec.spacing.before='14';
				}
				<BODY>
					<SS_CALL>
						SS_NAME='Comment'
						PASSED_ELEMENT_EXPR='stockSection.contextElement'
						PASSED_ELEMENT_MATCHING_ET='MethodDoc'
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
			<SS_CALL>
				DESCR='description'
				SS_NAME='Comment'
				FMT={
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
		<HEADER>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							text.font.size='16';
							text.font.style.bold='true';
							par.margin.top='14';
							par.margin.bottom='0';
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
		</HEADER>
	</FOLDER>
	<TEMPLATE_CALL>
		DESCR='bottom message'
		COND='output.type == "document"'
		TEMPLATE_FILE='about.tpl'
	</TEMPLATE_CALL>
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
							TITLE_EXPR='callStockSection("Class Link Title")'
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
							TITLE_EXPR='callStockSection("Class Link Title")'
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
				MATCHING_ET='ClassDoc'
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
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("asParameterizedType")'
				MATCHING_ET='ParameterizedType'
				COLLAPSED
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
						MATCHING_ET='ParameterizedType'
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
						MATCHING_ET='WildcardType'
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
								DESCR='extends'
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
								DESCR='super'
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
						COND='sectionBlock.execSecNone'
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
CHECKSUM='UI?WWESFzzkm3xRr1C0cktea5wCK6HbeDkbIxyrOa?4'
</DOCFLEX_TEMPLATE>