<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2010-05-29 11:02:22'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='DocumentTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
TITLE_EXPR='title = "API Help";

((parentTitle = getStringParam("windowTitle").trim()) != null)
 ? title + " (" + parentTitle + ")" : title'
HTML_HEAD_EXPR='title = "API Help";

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
		param.name='gen.refs.use';
		param.title='Use (Package/Class)';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.refs.tree';
		param.title='Tree (Class Hierarchy)';
		param.type='boolean';
	}
	PARAM={
		param.name='gen.refs.index';
		param.title='Index';
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
		style.name='Detail Heading';
		style.id='s1';
		text.font.size='14';
		text.font.style.bold='true';
		par.bkgr.opaque='true';
		par.bkgr.color='#CCCCFF';
		par.border.style='solid';
		par.border.color='#666666';
		par.margin.top='20';
		par.margin.bottom='1.4';
		par.padding.left='1.7';
		par.padding.right='1.7';
		par.padding.top='1.7';
		par.padding.bottom='1.7';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Heading 1';
		style.id='s2';
		text.font.size='14.5';
		text.font.style.bold='true';
		par.margin.top='12';
		par.margin.bottom='12';
		par.page.keepWithNext='true';
	}
	PAR_STYLE={
		style.name='Heading 3';
		style.id='s3';
		text.font.size='12';
		text.font.style.bold='true';
		par.margin.top='14';
		par.margin.bottom='14';
		par.page.keepWithNext='true';
	}
	CHAR_STYLE={
		style.name='Hyperlink';
		style.id='cs4';
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
	doc.hlink.style.link='cs4';
}
<HTARGET>
	HKEYS={
		'"help-doc"';
	}
</HTARGET>
<ROOT>
	<TEMPLATE_CALL>
		DESCR='Navigation Bar'
		COND='output.type == "document" && getBooleanParam("gen.navbar")'
		TEMPLATE_FILE='navbar.tpl'
		PASSED_PARAMS={
			'$type','"help"';
			'$location','"header"';
		}
	</TEMPLATE_CALL>
	<AREA_SEC>
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s2';
					par.alignment='Center';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='How This API Document Is Organized'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				<CTRLS>
					<TEXT_CTRL>
						TEXT='This API (Application Programming Interface) document has pages corresponding to the items in the navigation bar, described as follows.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='Overview'
		COND='findHyperTarget ("overview") != null'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Overview'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.indent.block='true';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='The'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='Overview'
						<DOC_HLINK>
							HKEYS={
								'"overview"';
							}
						</DOC_HLINK>
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='page is the front page of this API document and provides a list of all packages with a summary for each.'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='This page can also contain an overall description of the set of packages.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<FOLDER>
		DESCR='Package'
		COLLAPSED
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							par.style='s3';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Package'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							row.indent.block='true';
							par.margin.bottom='14';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Each package has a page that contains a list of its classes and interfaces, with a summary for each.
This page can contain four categories:'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					sec.outputStyle='list';
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Interfaces (italic)'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Classes'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enums'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Exceptions'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Errors'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Annotation Types'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='Class/Interface'
		COLLAPSED
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							par.style='s3';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Class/Interface'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							row.indent.block='true';
							par.margin.bottom='14';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Each class, interface, nested class and nested interface has its own separate page.
Each of these pages has three sections consisting of a class/interface description, summary tables, and detailed member descriptions:'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					sec.outputStyle='list';
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Class inheritance diagram'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Direct Subclasses'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='All Known Subinterfaces'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='All Known Implementing Classes'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Class/interface declaration'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Class/interface description'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<SPACER>
						FMT={
							spacer.height='14';
						}
					</SPACER>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					sec.outputStyle='list';
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Nested Class Summary'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Field Summary'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Constructor Summary'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Method Summary'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<SPACER>
						FMT={
							spacer.height='14';
						}
					</SPACER>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					sec.outputStyle='list';
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Field Detail'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Constructor Detail'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Method Detail'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<SPACER>
						FMT={
							spacer.height='14';
						}
					</SPACER>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							row.indent.block='true';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Each summary entry contains the first sentence from the detailed description for that item.
The summary entries are alphabetical, while the detailed descriptions are in the order they appear in the source code.
This preserves the logical groupings established by the programmer.'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='Annotation Type'
		COLLAPSED
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							par.style='s3';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Annotation Type'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							row.indent.block='true';
							par.margin.bottom='14';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Each annotation type has its own separate page with the following sections:'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					sec.outputStyle='list';
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Annotation Type declaration'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Annotation Type description'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Required Element Summary'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Optional Element Summary'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Element Detail'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<FOLDER>
		DESCR='Enum'
		COLLAPSED
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							par.style='s3';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enum'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							row.indent.block='true';
							par.margin.bottom='14';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Each enum has its own separate page with the following sections:'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					sec.outputStyle='list';
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enum declaration'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enum description'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enum Constant Summary'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Enum Constant Detail'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<AREA_SEC>
		DESCR='Use'
		COND='getBooleanParam("gen.refs.use")'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Use'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.indent.block='true';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Each documented package, class and interface has its own Use page.
This page describes what packages, classes, methods, constructors and fields use any part of the given class or package.
Given a class or interface A, its Use page includes subclasses of A, fields declared as A, methods that return A,
and methods and constructors with parameters of type A.
You can access this page by first going to the package, class or interface, then clicking on the "Use" link in the navigation bar.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<FOLDER>
		DESCR='Class Hierarchy Tree'
		COND='getBooleanParam("gen.refs.tree")'
		COLLAPSED
		<BODY>
			<AREA_SEC>
				<AREA>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							par.style='s3';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='Tree (Class Hierarchy)'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						FMT={
							row.outputStyle='text-par';
							row.indent.block='true';
							par.margin.bottom='14';
						}
						<CTRLS>
							<TEXT_CTRL>
								TEXT='There is a'
							</TEXT_CTRL>
							<TEXT_CTRL>
								TEXT='Class Hierarchy'
								<DOC_HLINK>
									HKEYS={
										'"overview-tree"';
									}
								</DOC_HLINK>
							</TEXT_CTRL>
							<TEXT_CTRL>
								TEXT='page for all packages, plus a hierarchy for each package.'
							</TEXT_CTRL>
							<TEXT_CTRL>
								TEXT='Each hierarchy page contains a list of classes and a list of interfaces.
The classes are organized by inheritance structure starting with <code>java.lang.Object</code>.
The interfaces do not inherit from <code>java.lang.Object</code>.'
								FMT={
									txtfl.ehtml.render='true';
								}
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
			<AREA_SEC>
				FMT={
					sec.outputStyle='list';
					sec.indent.block='true';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='When viewing the Overview page, clicking on "Tree" displays the hierarchy for all packages.'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
					<CTRL_GROUP>
						<CTRLS>
							<TEXT_CTRL>
								TEXT='When viewing a particular package, class or interface page, clicking "Tree" displays the hierarchy for only that package.'
							</TEXT_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<AREA_SEC>
		DESCR='Deprecated API'
		COND='findHyperTarget ("deprecated-list") != null'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Deprecated API'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					row.indent.block='true';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='The'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='Deprecated API'
						<DOC_HLINK>
							HKEYS={
								'"deprecated-list"';
							}
						</DOC_HLINK>
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='page lists all of the API that have been deprecated.'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='A deprecated API is not recommended for use, generally due to improvements, and a replacement API is usually given.
Deprecated APIs may be removed in future implementations.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='Index'
		COND='getBooleanParam("gen.refs.index")'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Index'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					row.indent.block='true';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='The'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='Index'
						<DOC_HLINK>
							HKEYS={
								'"index"';
							}
						</DOC_HLINK>
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='contains an alphabetic list of all classes, interfaces, constructors, methods, and fields.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='Prev/Next'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Prev/Next'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='These links take you to the next or previous class, interface, package, or related page.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='Frames/No Frames'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Frames/No Frames'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='These links show and hide the HTML frames. All pages are available with or without frames.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='Serialized Form'
		COND='findHyperTarget ("serialized-form") != null'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Serialized Form'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					txtfl.delimiter.type='none';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Each serializable or externalizable class has a description of its serialization fields and methods.
This information is of interest to re-implementors, not to developers using the API.
While there is no link in the navigation bar, you can get to this information by going to any serialized class and clicking "'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='Serialized Form'
						<DOC_HLINK>
							HKEYS={
								'"serialized-form"';
							}
						</DOC_HLINK>
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='" in the "See also" section of the class description.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
	<AREA_SEC>
		DESCR='Constant Field Values'
		COND='findHyperTarget ("constant-field-values") != null'
		COLLAPSED
		<AREA>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
					par.style='s3';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='Constant Field Values'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
			<CTRL_GROUP>
				FMT={
					row.outputStyle='text-par';
				}
				<CTRLS>
					<TEXT_CTRL>
						TEXT='The'
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='Constant Field Values'
						<DOC_HLINK>
							HKEYS={
								'"constant-field-values"';
							}
						</DOC_HLINK>
					</TEXT_CTRL>
					<TEXT_CTRL>
						TEXT='page lists the static final fields and their values.'
					</TEXT_CTRL>
				</CTRLS>
			</CTRL_GROUP>
		</AREA>
	</AREA_SEC>
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
					'$type','"help"';
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
CHECKSUM='gY69DdbA4SbjsrQalH1+fr7I7S9pSKmH2aU5sryAyNo'
</DOCFLEX_TEMPLATE>