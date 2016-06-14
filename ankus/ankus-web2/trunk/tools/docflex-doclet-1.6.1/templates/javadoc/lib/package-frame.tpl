<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2004-06-21 01:50:00'
LAST_UPDATE='2012-05-24 08:56:31'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='PackageDoc'
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
		style.name='Default Paragraph Font';
		style.id='cs1';
		style.default='true';
	}
	PAR_STYLE={
		style.name='Frame Heading';
		style.id='s1';
		text.font.size='9';
		text.font.style.bold='true';
		par.margin.top='7';
		par.margin.bottom='3';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Frame Item';
		style.id='s2';
		text.font.size='9';
		par.option.nowrap='true';
	}
	PAR_STYLE={
		style.name='Frame Title';
		style.id='s3';
		text.font.size='10';
		text.font.style.bold='true';
		par.margin.bottom='4';
		par.option.nowrap='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs2';
		text.decor.underline='true';
		text.color.foreground='#0000FF';
	}
	PAR_STYLE={
		style.name='Normal';
		style.id='s4';
		style.default='true';
	}
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
}
<HTARGET>
	HKEYS={
		'contextElement.id';
		'"summary"';
	}
</HTARGET>
<ROOT>
	<AREA_SEC>
		FMT={
			par.style='s3';
		}
		<AREA>
			<CTRL_GROUP>
				<CTRLS>
					<DATA_CTRL>
						FORMULA='(name = getAttrValue("name")) != "" ? name : "<unnamed>"'
						<DOC_HLINK>
							TARGET_FRAME_EXPR='"detail"'
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
	<ELEMENT_ITER>
		DESCR='iterates by all interfaces in the package'
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
		<BODY>
			<AREA_SEC>
				FMT={
					text.font.style.italic='true';
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='callStockSection("Class Link Title")'
									TARGET_FRAME_EXPR='"detail"'
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
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Interfaces'
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		DESCR='iterates by all ordinary classes in the package'
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
		<BODY>
			<AREA_SEC>
				FMT={
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='callStockSection("Class Link Title")'
									TARGET_FRAME_EXPR='"detail"'
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
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Classes'
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		DESCR='iterates by all enums in the package'
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
		<BODY>
			<AREA_SEC>
				FMT={
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='callStockSection("Class Link Title")'
									TARGET_FRAME_EXPR='"detail"'
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
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enums'
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		DESCR='iterates by all exception classes in the package'
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
		<BODY>
			<AREA_SEC>
				FMT={
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='callStockSection("Class Link Title")'
									TARGET_FRAME_EXPR='"detail"'
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
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Exceptions'
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		DESCR='iterates by all error classes in the package'
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
		<BODY>
			<AREA_SEC>
				FMT={
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='callStockSection("Class Link Title")'
									TARGET_FRAME_EXPR='"detail"'
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
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Errors'
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
	<ELEMENT_ITER>
		DESCR='iterates by all annotation types in the package'
		TARGET_ET='AnnotationTypeDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> annotationTypes^::AnnotationTypeDoc';
		}
		FILTER='getAttrBooleanValue("isIncluded")
&&
(getBooleanParam("include.deprecated") || ! hasTag("@deprecated"))
&&
findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
		SORTING='by-attr'
		SORTING_KEY={lpath='@name',ascending}
		<BODY>
			<AREA_SEC>
				FMT={
					par.style='s2';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								ATTR='name'
								<DOC_HLINK>
									TITLE_EXPR='callStockSection("Class Link Title")'
									TARGET_FRAME_EXPR='"detail"'
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
					par.style='s1';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Annotation Types'
							</TEXT_CTRL>
							<DATA_CTRL>
								FORMULA='"(" + iterator.numItems + ")"'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</HEADER>
	</ELEMENT_ITER>
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
</STOCK_SECTIONS>
CHECKSUM='NV4CiSjUwQHLdobR97?TXiVQ+NhME48pHTpA5dib8so'
</DOCFLEX_TEMPLATE>