<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2006-02-24 02:22:00'
LAST_UPDATE='2012-05-24 08:56:33'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_ID='docflex-javadoc'
APP_NAME='DocFlex/Javadoc | JavadocPro'
APP_AUTHOR='Copyright © 2004-2012 Filigris Works, Leonid Rudy Softwareprodukte. All rights reserved.'
TEMPLATE_TYPE='ProcedureTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
<TEMPLATE_PARAMS>
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
		param.name='include';
		param.title='Include';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='include.deprecated';
		param.title='Deprecated API';
		param.type='boolean';
	}
	PARAM={
		param.name='include.tag';
		param.title='Tags';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='include.tag.since';
		param.title='@since';
		param.type='boolean';
	}
	PARAM={
		param.name='include.tag.version';
		param.title='@version';
		param.type='boolean';
	}
	PARAM={
		param.name='include.tag.author';
		param.title='@author';
		param.type='boolean';
	}
	PARAM={
		param.name='include.tag.custom';
		param.title='Custom tags';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.recognizeEscapes='true';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter';
		param.title='Filter Classes & Members';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byTags';
		param.title='By Tags';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byTags.for.packages';
		param.title='For packages';
		param.title.style.italic='true';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
	}
	PARAM={
		param.name='filter.byTags.include';
		param.title='Include';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byTags.include.all';
		param.title='all (classes & members)';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.include.classes';
		param.title='classes';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.include.members';
		param.title='members';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.exclude';
		param.title='Exclude';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byTags.exclude.all';
		param.title='all (classes & members)';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.exclude.classes';
		param.title='classes';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byTags.exclude.members';
		param.title='members';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns';
		param.title='By Annotations';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byAnns.for';
		param.title='For';
		param.title.style.italic='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byAnns.for.activeSet';
		param.title='active set only';
		param.title.style.italic='true';
		param.type='boolean';
	}
	PARAM={
		param.name='filter.byAnns.for.packages';
		param.title='packages';
		param.title.style.italic='true';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n:';
	}
	PARAM={
		param.name='filter.byAnns.include';
		param.title='Include';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byAnns.include.all';
		param.title='all (classes & members)';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.include.classes';
		param.title='classes';
		param.type='string';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.include.members';
		param.title='members';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.exclude';
		param.title='Exclude';
		param.title.style.bold='true';
		param.group='true';
	}
	PARAM={
		param.name='filter.byAnns.exclude.all';
		param.title='all (classes & members)';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.exclude.classes';
		param.title='classes';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='filter.byAnns.exclude.members';
		param.title='members';
		param.type='string';
		param.trimSpaces='true';
		param.noEmptyString='true';
		param.list='true';
		param.list.separators='\\n;:';
		param.list.noEmptyList='true';
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
</STYLES>
FMT={
	doc.lengthUnits='pt';
	doc.default.font='Arial';
	doc.hlink.style.link='cs2';
}
<ROOT>
	<FOLDER>
		DESCR='create \'excluded-classes\' and \'excluded-members\' hashmaps'
		INIT_EXPR='createElementMap ("excluded-classes");
createElementMap ("excluded-members");

includeByTagsAll     = getArrayParam("filter.byTags.include.all");
includeByTagsClasses = getArrayParam("filter.byTags.include.classes");
includeByTagsMembers = getArrayParam("filter.byTags.include.members");

includeByAnnsAll     = getArrayParam("filter.byAnns.include.all");
includeByAnnsClasses = getArrayParam("filter.byAnns.include.classes");
includeByAnnsMembers = getArrayParam("filter.byAnns.include.members");

excludeByTagsAll     = getArrayParam("filter.byTags.exclude.all");
excludeByTagsClasses = getArrayParam("filter.byTags.exclude.classes");
excludeByTagsMembers = getArrayParam("filter.byTags.exclude.members");

excludeByAnnsAll     = getArrayParam("filter.byAnns.exclude.all");
excludeByAnnsClasses = getArrayParam("filter.byAnns.exclude.classes");
excludeByAnnsMembers = getArrayParam("filter.byAnns.exclude.members");

filterByTags = ! includeByTagsAll.isEmpty() || ! includeByTagsClasses.isEmpty() || ! includeByTagsMembers.isEmpty() ||
               ! excludeByTagsAll.isEmpty() || ! excludeByTagsClasses.isEmpty() || ! excludeByTagsMembers.isEmpty();

filterByAnns = ! includeByAnnsAll.isEmpty() || ! includeByAnnsClasses.isEmpty() || ! includeByAnnsMembers.isEmpty() ||
               ! excludeByAnnsAll.isEmpty() || ! excludeByAnnsClasses.isEmpty() || ! excludeByAnnsMembers.isEmpty();

(! filterByTags && ! filterByAnns) ? return null;

filterByTagsPackages = getArrayParam("filter.byTags.for.packages");
filterByAnnsPackages = getArrayParam("filter.byAnns.for.packages");

iterate (
  findElementsByLRules (
    Array (
      // collect all classes/interfaces to be documented
      LocationRule ("RootDoc -> classes^::ClassDoc", false),

      // for each class/interface collect all its superclasses
      // and all implemented interfaces

      LocationRule ("ClassDoc -> interfaces^::ClassDoc", true),
      LocationRule ("ClassDoc -> superclass^::ClassDoc", true)
    )
  ),
  @(GOMElement) class,
  FlexQuery({

    qualifiedName = class.getAttrStringValue("qualifiedName");

    filterByTags2 = filterByTags && (filterByTagsPackages.isEmpty() || 
                                     matchQualifiedName (qualifiedName, filterByTagsPackages));

    filterByAnns2 = filterByAnns && (filterByAnnsPackages.isEmpty() || 
                                     matchQualifiedName (qualifiedName, filterByAnnsPackages));

    (! filterByTags2 && ! filterByAnns2) ? return null;

    ( filterByTags2 && class.isIncluded() &&
      (
        ! includeByTagsAll.isEmpty() && class.findTag (includeByTagsAll) == null
        ||
        ! includeByTagsClasses.isEmpty() && ! class.hasTag (includeByTagsClasses)
        ||
        class.findTag (excludeByTagsAll) != null
        ||
        class.hasTag (excludeByTagsClasses)
      )
      ||
      filterByAnns2 && (! getBooleanParam("filter.byAnns.for.activeSet") || class.isIncluded()) &&
      (
        ! includeByAnnsAll.isEmpty() && class.findAnnotation (includeByAnnsAll) == null
        ||
        ! includeByAnnsClasses.isEmpty() && ! class.hasAnnotation (includeByAnnsClasses)
        ||
        class.findAnnotation (excludeByAnnsAll) != null
        ||
        class.hasAnnotation (excludeByAnnsClasses)
      )

    ) ? putElementByKey ("excluded-classes", class.id, class);

    putElementsByKeys (
      "excluded-members",
      class.findChildren  (
        "MemberDoc",
        BooleanQuery 
        (
          filterByTags2 && isIncluded() &&
          (
            ! includeByTagsAll.isEmpty() && findTag (includeByTagsAll) == null
            ||
            ! includeByTagsMembers.isEmpty() && ! hasTag (includeByTagsMembers)
            ||
            findTag (excludeByTagsAll) != null
            ||
            hasTag (excludeByTagsMembers)
          )
          ||
          filterByAnns2 && (! getBooleanParam("filter.byAnns.for.activeSet") || isIncluded()) &&
          (
            ! includeByAnnsAll.isEmpty() && findAnnotation (includeByAnnsAll) == null
            ||
            ! includeByAnnsMembers.isEmpty() && ! hasAnnotation (includeByAnnsMembers)
            ||
            findAnnotation (excludeByAnnsAll) != null
            ||
            hasAnnotation (excludeByAnnsMembers)
          )
        )
      ),
      FlexQuery (contextElement.id)
    )
  })
)'
	</FOLDER>
	<FOLDER>
		DESCR='create \'overridden-implemented-methods\' hashmap that maps each method ID (GOMElement.id) to the enumeration of all methods of ancestor classes and implemented interfaces that this method overrides or implements.

The first element in the result enumeration is the overridden method of the base class, then follow the overridden methods of all ancestor classes (if any), then specifying methods in all interfaces (first directly implemented, then indirectly).

See "Processing | Init Expression" tab.

This hashmap is also used to create "inherited-methods" hashmap (see sections below)'
		INIT_EXPR='prepareElementMap (
  "overridden-implemented-methods",  // the element-map identifier

  // collect source elements: all methods that may override/implement anything 
  // and may be of interest in this documentation (further, the function will 
  // iterate by all these methods)

  findElementsByLRules (
    Array (
      // collect all classes/interfaces to be documented
      LocationRule ("RootDoc -> classes^::ClassDoc", false),

      // for each class/interface collect all its superclasses
      // and all implemented interfaces

      LocationRule ("ClassDoc -> interfaces^::ClassDoc", true),
      LocationRule ("ClassDoc -> superclass^::ClassDoc", true),

      // for each class/interface collect all non-static non-private methods
      LocationRule (
        "ClassDoc -> MethodDoc[
          ! getAttrBooleanValue(\'isPrivate\') && ! getAttrBooleanValue(\'isStatic\')]", 
        true)
    ),

    "MethodDoc" // leave only methods in the result collection
  ),

  FlexQuery (contextElement.id),  // each method\'s id will be the key

  // The following query should return elements to be associated with that key:
  // the methods of other classes/interfaces that the given method overrides or implements

  FlexQuery ({

    method = contextElement;  // the given method

    findElementsByLRules (

      // the Location Rules will be interpreted against 
      // the given method\'s containing class

      getElementByLinkAttr("containingClass"),

      // the Location Rules that search all overridden/implemented methods

      Array (

        // The following rule collects methods in each class/interface
        // that the given method overrides or implements.
        // The first position of this rule ensures that the overridden methods
        // found in nearer ancestor classes will be collected the first.

        LocationRule ("ClassDoc -> MethodDoc [isOverriddenBy (method)]", true),

        // The following two rules collect for each class/interface all its
        // superclasses and all implemented interfaces

        LocationRule ("ClassDoc -> interfaces^::ClassDoc", true),
        LocationRule ("ClassDoc -> superclass^::ClassDoc", true)
      ),

      "MethodDoc"  // leave only methods in the result collection
    )
  })
)'
	</FOLDER>
	<FOLDER>
		DESCR='create \'tags-to-document\' hashmap, which maps each tag kind (e.g. @author) 
to a custom element that holds the settings about how this tag should be documented
stored in element attributes:
(*) "title" attributes -- the tag documentation title
(*) the boolean attributes indicating that the tag should be processed/documented in the corresponding locations: "overview", "packages", "types", "constructors", "methods", "fields"
(*) "number" attribute -- represents a relative position for the tag ordering'
		INIT_EXPR='createElementMap ("tags-to-document")'
		<BODY>
			<FOLDER>
				DESCR='default tags
--
see "Processing" tab'
				INIT_EXPR='mapId = "tags-to-document";

tagNumber = 0;

putElementByKey (
  mapId,
  "@param",
  CustomElement (null, Array (
    Attr ("kind", "@param"),
    Attr ("title", "Parameters:"),
    Attr ("constructors", true),
    Attr ("methods", true),
    Attr ("serial_methods", false),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@return",
  CustomElement (null, Array (
    Attr ("kind", "@return"),
    Attr ("title", "Returns:"),
    Attr ("methods", true),
    Attr ("serial_methods", false),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@serialData",
  CustomElement (null, Array (
    Attr ("kind", "@serialData"),
    Attr ("title", "Serial Data:"),
    Attr ("serial_methods", true),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@throws",
  CustomElement (null, Array (
    Attr ("kind", "@throws"),
    Attr ("title", "Throws:"),
    Attr ("constructors", true),
    Attr ("methods", true),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@since",
  CustomElement (null, Array (
    Attr ("kind", "@since"),
    Attr ("title", "Since:"),
    Attr ("all", getBooleanParam("include.tag.since")),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@version",
  CustomElement (null, Array (
    Attr ("kind", "@version"),
    Attr ("title", "Version:"),
    Attr ("types", getBooleanParam("include.tag.version")),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@author",
  CustomElement (null, Array (
    Attr ("kind", "@author"),
    Attr ("title", "Author:"),
    Attr ("types", getBooleanParam("include.tag.author")),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@see",
  CustomElement (null, Array (
    Attr ("kind", "@see"),
    Attr ("title", "See Also:"),
    Attr ("all", true),
    Attr ("number", (tagNumber = tagNumber + 1))
  ))
);

putElementByKey (
  mapId,
  "@serial",
  CustomElement (null, Array (
    Attr ("kind", "@serial"),
    Attr ("all", false)
  ))
);

putElementByKey (
  mapId,
  "@serialField",
  CustomElement (null, Array (
    Attr ("kind", "@serialField"),
    Attr ("all", false)
  ))
);'
			</FOLDER>
			<FOLDER>
				DESCR='custom tags
--
filled from the values of \'include.tag.custom\' parameter; see "Processing" tab'
				INIT_EXPR='mapId = "tags-to-document";

tagNumber = countMappedElements (mapId);

// iterate by value items of \'include.tag.custom\' parameter
// (each item specifies documenting of a separate tag)

iterate (
  getArrayParam ("include.tag.custom"),
  @(String) tagSpec,
  FlexQuery ({
    // process the tag specification

    tagSpecLen = tagSpec.length();

    // retrieve the tag name (considering colon escapes)

    tagName = "";
    index1 = 0;
    esc = false;

    repeat (BooleanQuery ({

      (index1 < tagSpecLen) ?
      {
        next = true;

        ch = tagSpec.charAt (index1);

        (ch == \'\\\\\') ? 
          esc ? { tagName = tagName + \'\\\\\'; esc = false } : { esc = true }
        :
        (ch == \':\') ? 
          esc ? { tagName = tagName + \':\'; esc = false } : { next = false }
        :
          { tagName = tagName + ch };

        index1 = index1 + 1;
        next;

      } : false

    }));

    esc ? { tagName = tagName + \'\\\\\' };

    // now retrieve the tag placement part and the title

    (index1 < tagSpecLen) ?
    {
      ((index2 = tagSpec.indexOf (":", index1)) >= 0) ?
      {
        placement = tagSpec.substring (index1, index2).trim();
        title = tagSpec.substring (index2 + 1).trim();
      } : {
        placement = tagSpec.substring (index1).trim();
        title = null;
      }
    } : {
      placement = "a";
      title = null;
    };

    // the tag kind
    tagKind = "@" + (tagName == "exception" ? "throws" : tagName);
    
    // create a new custom element for this tag and put it in the map 
    // or obtain the existing element

    ((tagInfo = findElementByKey (mapId, tagKind)) == null) ?
    {
      tagInfo = CustomElement();
      tagInfo.setAttr ("kind", tagKind);
      tagInfo.setAttr ("title", title != "" ? title : tagName);

      putElementByKey (mapId, tagKind, tagInfo);

    } : {
      // if title is not specified now, leave the default title
      // (or the one defined earlier)

      title != "" ? tagInfo.setAttr ("title", title);
    };

    // now parse the tag placement specification 
    // (that says which locations of this tag must be processed)

    (placement.length() > 0) ?
    {
      placement = placement.toLowerCase();

      placement.startsWith ("x") ?  // if this is an exluded placement specification
      {
        all = (placement.length() == 1 || placement.contains ("a"));
        include = false;
      } : {
        all = placement.contains ("a");
        include = true;
      };

      (all) ? 
      {
        tagInfo.setAttr ("all", include);
      } : {
        tagInfo.removeAttr ("all");

        placement.contains ("o") ? tagInfo.setAttr ("overview", include);
        placement.contains ("p") ? tagInfo.setAttr ("packages", include);
        placement.contains ("t") ? tagInfo.setAttr ("types", include);
        placement.contains ("c") ? tagInfo.setAttr ("constructors", include);
        placement.contains ("m") ? tagInfo.setAttr ("methods", include);
        placement.contains ("f") ? tagInfo.setAttr ("fields", include);
      }
    };

    // the tag ordering number
    tagInfo.setAttr ("number", (tagNumber = tagNumber + 1));
  })
)'
			</FOLDER>
		</BODY>
	</FOLDER>
	<ELEMENT_ITER>
		DESCR='PREPARE OTHER HASHMAPS
--
iterate by all classes to be documented; 
the maps are initialized in "Processing | Init/Step/Finish | Init Expression" tab'
		INIT_EXPR='createElementMaps (Array (
  "direct-known-subclasses",
  "all-known-subinterfaces",
  "all-known-implementing-classes",
  "non-public-constructors",
  "inherited-nested-types",
  "inherited-fields",
  "inherited-methods",
  "adopted-members",
  "member-adoptions"
));

getBooleanParam("gen.refs.use") ?
{
  createElementMaps (Array (
    "class-use-packages",
    "class-use-as-superclass",
    "class-use-as-implemented-interface",
    "class-use-as-class-annotation-type",
    "class-use-as-class-type-param-type",
    "class-use-as-field-annotation-type",
    "class-use-as-field-type",
    "class-use-as-field-type-argument",
    "class-use-as-method-annotation-type",
    "class-use-as-method-type-param-type",
    "class-use-as-method-return-type",
    "class-use-as-method-return-type-argument",
    "class-use-as-method-param-annotation-type",
    "class-use-as-method-param-type",
    "class-use-as-method-param-type-argument",
    "class-use-as-constructor-annotation-type",
    "class-use-as-constructor-type-param-type",
    "class-use-as-constructor-param-annotation-type",
    "class-use-as-constructor-param-type",
    "class-use-as-constructor-param-type-argument"
  ))
};'
		TARGET_ET='ClassDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> classes^::ClassDoc';
		}
		FILTER='(getBooleanParam("include.deprecated") || 
 ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
&&
! checkElementsByKey("excluded-classes", contextElement.id)
'
		<BODY>
			<FOLDER>
				DESCR='\'direct-known-subclasses\'
--
maps class ID (GOMElement.id) to the enumeration of all direct subclasses of this class'
				COND='getAttrBooleanValue("isClass")'
				INIT_EXPR='classFilter = BooleanQuery (
  isVisible() && ! checkElementsByKey("excluded-classes", contextElement.id)
);

putElementByKeys (
  "direct-known-subclasses",
  getElementIds (
    findElementsByLRules (
      Array (
        LocationRule ("* -> superclass^::ClassDoc", false),
        LocationRule ("*[! execBooleanQuery (classFilter)] -> superclass^::ClassDoc", true)
      ),
      "ClassDoc"
    )
  ),
  contextElement
)'
			</FOLDER>
			<FOLDER>
				DESCR='\'all-known-subinterfaces\'
--
maps interface ID (GOMElement.id) to the enumeration of all subinterfaces of this interface'
				COND='getAttrBooleanValue("isInterface")'
				INIT_EXPR='putElementByKeys (
  "all-known-subinterfaces",
  getElementIds (
    findElementsByLRules (
      Array (LocationRule ("* -> interfaces^::ClassDoc", true)),
      "ClassDoc"
    )
  ),
  contextElement
)'
			</FOLDER>
			<FOLDER>
				DESCR='\'all-known-implementing-classes\'
--
maps interface ID (GOMElement.id) to the enumeration of all classes implementing this interface'
				COND='getAttrBooleanValue("isClass")'
				INIT_EXPR='putElementByKeys (
  "all-known-implementing-classes",
  getElementIds (
    findElementsByLRules (
      Array (
        LocationRule ("* -> interfaces^::ClassDoc", true),
        LocationRule ("* -> superclass^::ClassDoc", true)
      ),
      "ClassDoc",
      BooleanQuery (getAttrBooleanValue("isInterface"))
    )
  ),
  contextElement
)'
			</FOLDER>
			<FOLDER>
				DESCR='\'non-public-constructors\'
--
used to quickly find for a class all its non-public constructors to be documented; the key is the unique id of the class element'
				INIT_EXPR='putElementsByKeys (
  "non-public-constructors",
  findChildren (
    "ConstructorDoc", 
    BooleanQuery (
      ! getAttrBooleanValue("isSynthetic")
      &&
      (getBooleanParam("include.deprecated") || 
        ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
      &&
      (getAttrBooleanValue("isPrivate") || getAttrBooleanValue("isProtected") ||
       getAttrBooleanValue("isPackagePrivate"))
      &&
      ! checkElementsByKey("excluded-members", contextElement.id)
    )
  ),
  FlexQuery (getAttrValue("containingClass"))
)'
			</FOLDER>
			<FOLDER>
				DESCR='\'inherited-nested-types\'
--
maps each two types T1 and T2 (classes or intefaces) to the enumeration of nested types which T1 inherits from T2. This takes into account shadowing equally named types by those specified in the intermediate types (that are both ancestors of T1 and descendants of T2). 

The hash key is {T1.id, T2.id}.

If T1 is not a descendant of T2, the key is mapped to an empty enumeration.

See "Processing | Init Expression" tab.'
				INIT_EXPR='// the element ID of the given class
classId = contextElement.id;

// the element ID of the package containing the given class
packageId = getAttrValue("containingPackage");

/** Retrieve the enumeration all inner types (regardless of their 
visibility) contained in the given class/interface and in its ancestor 
classes and implemented interfaces.

The first parameter is an array of Location Rules. 

The first rule collects all inner types of the given class.
The second rule collects all innder types contained in all
ancestor classes and implemented interfaces of the given class.

The order in which rules are specified is important.
It determines that in the produced sequence, the first will follow 
the own inner types of the given class, then those of its direct 
superclasses, then from more distant superclasses/interfaces. **/

e = findElementsByLRules (
  Array (
    LocationRule ("ClassDoc -> allInnerClasses^::ClassDoc"),
    LocationRule ("ClassDoc -> { 
      findElementsByLRules (
        Array (
          LocationRule (\'* -> superclass^::ClassDoc\', true),
          LocationRule (\'* -> interfaces^::ClassDoc\', true)
        )
      )
    }::ClassDoc / allInnerClasses^::ClassDoc")
  )
);

/** Now, remove from the original enumeration all subsequent types
with the repeating names. This ensures the requirement we have 
for the inherited nested types: eliminating the shadowed types. **/

e = e.filterElementsByKey (FlexQuery (getAttrStringValue("name")));

/** At last, remove the types that belong to the given class itself
and those that cannot be inherited according to their visibility 
or include/exclude criteria **/

e = e.filterElements (
  // the filtering query
  BooleanQuery (
    getAttrValue("containingClass") != classId
    &&
    (getAttrBooleanValue("isPublic") || 
     getAttrBooleanValue("isProtected") || 
  
     // Local nested types are allowed only when they are included in 
     // the active set (to be documented) and belong to the same package

     getAttrBooleanValue("isPackagePrivate") &&
     isIncluded() &&
     getAttrValue("containingPackage") == packageId
    )
    &&
    ! checkElementsByKey("excluded-classes", contextElement.id)
  )
);

putElementsByKeys (
  "inherited-nested-types",
  e,
  FlexQuery (HashKey (classId, getAttrValue("containingClass")))
)'
			</FOLDER>
			<FOLDER>
				DESCR='\'inherited-fields\'
--
maps each two types T1 and T2 (classes or intefaces) to the enumeration of fields which T1 inherits from T2. This takes into account shadowing equally named fields by those specified in the intermediate types (which are both ancestors of T1 and descendants of T2).

The hash key is {T1.id, T2.id}.

If T1 is not a descendant of T2, the key is mapped to an empty enumeration.

See "Processing | Init Expression" tab.'
				INIT_EXPR='// the element ID of the given class
classId = contextElement.id;

// the element ID of the package containing the given class
packageId = getAttrValue("containingPackage");

/** Retrieve the enumeration all fields (regardless of their visibility)
contained in the given class/interface and in its ancestor classes 
and implemented interfaces.

The first parameter is an array of Location Rules. 
All rules are "recursive". That means their interpretation is repeated 
in cycle. On each step all rules are applied to a certain class.

The first rule collects all fields of a class.
The second rule collects direct superclasses.
The third rule collects direct implemented interfaces.
 
All rules are repeated for each new class/interface produced on each step.

The order in which rules are specified is important.
It determines that in the produced sequence, the first will follow 
the own fields of the class, then those of its direct superclasses, 
then from more distant superclasses/interfaces. **/

e = findElementsByLRules (
  Array (
    LocationRule ("ClassDoc -> allFields^::FieldDoc", true),
    LocationRule ("ClassDoc -> superclass^::ClassDoc", true),
    LocationRule ("ClassDoc -> interfaces^::ClassDoc", true)
  ),
  "FieldDoc",
  BooleanQuery (! getAttrBooleanValue("isSynthetic"))
);

/** Now, remove from the original enumeration all subsequent fields 
with the repeating names. This ensures the requirement we have 
for the inherited fields -- eliminating the shadowed fields. **/

e = e.filterElementsByKey (FlexQuery (getAttrStringValue("name")));

/** At last, remove the fields that belong to the given class itself
and those that cannot be inherited according to their visibility 
or include/exclude criteria **/

e = e.filterElements (
  // the filtering query
  BooleanQuery (
    getAttrValue("containingClass") != classId
    && 
    (getAttrBooleanValue("isPublic") || 
     getAttrBooleanValue("isProtected") || 
  
     // Local fields are allowed only when they are included in 
     // the active set (to be documented) and belong to the same package

     getAttrBooleanValue("isPackagePrivate") &&
     getAttrBooleanValue("isIncluded") &&
     getAttrValue("containingPackage") == packageId) 
    && 
    // remain only fields that can be visible in the documentation and are not excluded
    isVisible() && ! checkElementsByKey("excluded-members", contextElement.id)
  )
);

/* For each result field, put in the "inherited-fields" hashmap the mapping:

  { given class.id, field->containingClass.id } -> field

which says that the given class inherits the field \'field\' from the class
\'field->containingClass\'.
*/

putElementsByKeys (
  "inherited-fields",
  e,
  FlexQuery (HashKey (classId, getAttrValue("containingClass")))
);

/* Now, that would be probably all. But here is a problem.

As some intermediate classes may be excluded from the documentation,
they may still contain fields to be documented.

Let\'s say we have the following:

  - class C1 extends class C2
  - class C2 implements interface I
  - interface I contains a public field fff

Now, let\'s assume the interface I must be excluded from the documentation.
What will happen with the field fff?
It should be shown in the documentation as declared in the class C2!
Then, for the class C1, the field fff must appear as inherited from the class C2
(rather than from the interface I, as it actually is in the code).

So far, our "inherited-fields" hashmap doesn\'t say anything about this.

The following code adds that information.

By each mapping like:  { C1.id, I.id } -> fff
we add a new mapping:  { C1.id, C2.id } -> fff
(provided that I is an excluded class/interface)
*/

classFilter = BooleanQuery (
  isVisible() && ! checkElementsByKey("excluded-classes", contextElement.id)  
);

iterate (
  findElementsByLRules (
    Array (
      LocationRule ("* -> superclass^::ClassDoc", true),
      LocationRule ("* -> interfaces^::ClassDoc", true)
    )
  ),
  @(GOMElement) cls,
  FlexQuery({

    putElementsByKeys (
      "inherited-fields",
      cls.findElementsByLRules (
        Array (
          LocationRule (\'* -> superclass^::ClassDoc [! execBooleanQuery (classFilter)]\', true),
          LocationRule (\'* -> interfaces^::ClassDoc [! execBooleanQuery (classFilter)]\', true)
        )
      ),
      FlexQuery (HashKey (classId, cls.id)),
      FlexQuery (findElementsByKey ("inherited-fields", HashKey (classId, contextElement.id)))
    )
  })
);'
			</FOLDER>
			<FOLDER>
				DESCR='\'inherited-methods\'
--
maps each two types T1 and T2 (classes or intefaces) to the enumeration of  methods which T1 inherits from T2. This takes into account overriding by methods specified in the intermediate types (which are both ancestors of T1 and descendants of T2).

The hash key is {T1.id, T2.id}.

If T1 is not a descendant of T2, the key is mapped to an empty enumeration.

See "Processing | Init Expression" tab.'
				INIT_EXPR='// the element ID of the given class
classId = contextElement.id;

// the element ID of the package containing the given class
packageId = getAttrValue("containingPackage");

/** Retrieve the enumeration all non-private methods of the given class/interface 
and in its ancestor classes and implemented interfaces.

The first parameter is the array of Location Rules. 
All rules are "recursive". That means their interpretation is repeated 
in cycle. On each step all rules are applied to a certain class.

The first rule collects all methods of a class.
The second rule collects direct superclasses.
The third rule collects direct implemented interfaces.
 
All rules are repeated for each new class/interface produced on each step.

The order in which rules are specified is important.
It determines that in the produced sequence, the first will follow 
the own methods of the class, then those of its direct superclasses, 
then from more distant superclasses/interfaces. **/

methods = findElementsByLRules (
  Array (
    LocationRule ("ClassDoc -> allMethods^::MethodDoc", true),
    LocationRule ("ClassDoc -> superclass^::ClassDoc", true),
    LocationRule ("ClassDoc -> interfaces^::ClassDoc", true)
  ),
  "MethodDoc",
  BooleanQuery (! getAttrBooleanValue("isPrivate") && ! getAttrBooleanValue("isSynthetic"))
);

/** Now, remove from the original enumeration all subsequent methods overridden/implemented 
by previous ones. Such methods should not be shown as inherited by the class! **/

// Create a temporary hashmap to quickly check if a particular method is 
// overridden/implemented by some method already passed to the result enumeration.
// The hash key is the method\'s element id.

trackerMap = createElementMap ("Overridden/Implemented Method Tracker");

methods = methods.filterElements (

  // the filtering query
  BooleanQuery ({
   
    methodId = contextElement.id;

    checkElementsByKey (trackerMap, methodId) ? false :
    {
      putElementsByKeys (
        trackerMap, 
        findElementsByKey ("overridden-implemented-methods", methodId),
        FlexQuery (contextElement.id)
      );

      // Leave only methods that do not belong to the given class itself.
      getAttrValue("containingClass") != classId 
      && 
      // Local methods are allowed only when they are included in the active set 
      // (to be documented) and belong to the same package
      (! getAttrBooleanValue("isPackagePrivate") ||
       getAttrBooleanValue("isIncluded") &&
       getAttrValue("containingPackage") == packageId) 
      &&
      // remain only methods that can be visible in the documentation and are not excluded
      isVisible() && ! checkElementsByKey("excluded-members", contextElement.id)
    }
  })
);

removeElementMap (trackerMap);

/* For each result method, put in the "inherited-methods" hashmap the mapping:

  { given class.id, method->containingClass.id } -> method

which says that the given class inherits the method \'method\' from the class
\'method->containingClass\'.
*/

putElementsByKeys (
  "inherited-methods",
  methods,
  FlexQuery (HashKey (classId, getAttrValue("containingClass")))
);

/* Now, that would be probably all. But here is a problem.

As some intermediate classes may be excluded from the documentation,
they may still contain methods to be documented.

Let\'s say we have the following:

  - class C1 extends class C2
  - class C2 extends class C3
  - class C3 contains a public method m()

Now, let\'s assume the class C3 must be excluded from the documentation.
What will happen with the method m() ?
It should be shown in the documentation as declared in the class C2!
Then, for the class C1, m() must appear as inherited from the class C2
(rather than from the class C3, as it actually is in the code).

So far, our "inherited-methods" hashmap doesn\'t say anything about this.

The following code adds that information.

By each mapping like:  { C1.id, C3.id } -> m
we add a new mapping:  { C1.id, C2.id } -> m
(provided that C3 is an excluded class/interface)
*/

classFilter = BooleanQuery (
  isVisible() && ! checkElementsByKey("excluded-classes", contextElement.id)
);

iterate (

  findElementsByLRules (
    Array (
      LocationRule ("* -> superclass^::ClassDoc", true),
      LocationRule ("* -> interfaces^::ClassDoc", true)
    )
  ),

  @(GOMElement) cls,

  FlexQuery({

    putElementsByKeys (
      "inherited-methods",
      cls.findElementsByLRules (
        Array (
          LocationRule (\'* -> superclass^::ClassDoc [! execBooleanQuery (classFilter)]\', true),
          LocationRule (\'* -> interfaces^::ClassDoc [! execBooleanQuery (classFilter)]\', true)
        )
      ),
      FlexQuery (HashKey (classId, cls.id)),
      FlexQuery (findElementsByKey ("inherited-methods", HashKey (classId, contextElement.id)))
    )
  })
);'
			</FOLDER>
			<FOLDER>
				DESCR='\'adopted-members\'
--
maps each class to all members "adopted" by the given class.

The hash key is the class ID (GOMElement.id).

Classes specifically excluded from the documentation by tags/annotations may still contain public/protected members that may be visible and need to be documented. Such "orphan" members are "adopted" by the remaining (visible) classes derived from the excluded ones. The documentation will show such members so as if they are defined in those "adopting" classes. (Actually, there may be several "adopting" classes for the same member initial defined in an excluded class.)

In the hashmap, each adopted member is represented by a custom element. (Custom elements are created only with special functions in templates and never connected directly to anything contained in the external data source -- that is, Doclet API. All custom elements have #CUSTOM element type. )

Here, custom elements are used as envelops to hold the members themselves along with some additional information about them.

Each custom element\'s value is the GOMElement representing the member itself.

Additionally, the custom element has some attributes, which serve for various purposes:

- To allow processing such custom elements along with other (ordinary) ones (particularly in some element iterators)
- For faster access to some member\'s properties
- To hold additional information about the member

There are following attributes:

"isField" - indicates that the member is a field
"isMethod" - indicates that the member is a method
"name" - the member name
"qualifiedName" - the member adopted qualified name. This is nor a true qualified name (according to the class where the member is actually defined). Rather, this is a qualified name according to how the member is shown in the documentation.

Used for methods only:
"signature" - the method signature
"flatSignature" - the method flat signature
"rawSignature" - the method raw signature (see description for \'ExecutableMemberDoc/@rawSignature\' attribute)

"id" - the member element\'s ID (this is the same as would be obtained like: GOMElement.value.toElement().id )

"adoptingClassId" - the ID of the adopting class

"parentClassInvocation" - this is a type (i.e. GOMElement connected to it) that represents the actual invocation of the member\'s containing class. That invocation corresponds to the given "adopting" class (which is a descendant of the member\'s class). The invocation type is needed to correctly expand any type variables initially used in the member declaration according to the context of the given adopting class.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For example, let\'s have a class C1 defined like this:

class C1<V> {
  ...
  public void mmm (V param);
}

and class C2 that extends C1:

class C2 extends C1<String> {
  ...
}

Now, suppose that class C1 should be excluded from the documentation, but its method C1.mmm() should not.
Then, showing that method like: 

  C2.mmm (V param)

would be incorrect because class C2 has no type variable \'V\' (and even if it had that would be actually a different variable). To make it correct, \'V\' should be expanded as \'String\':

  C2.mmm (String param)

The "parentClassInvocation" is used exactly for this.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
				INIT_EXPR='typeFilter = BooleanQuery (
  isVisible() && ! checkElementsByKey("excluded-classes", getAttrValue("asClassDoc"))
);

// the GOMElement of the given class
class = contextElement;

putElementsByKey (
  "adopted-members",
  class.id,
  findElementsByLRules (
    Array (
      LocationRule (\'(ClassDoc|ParameterizedType) -> superclassType^::Type [! execBooleanQuery (typeFilter)]\', true),
      LocationRule (\'(ClassDoc|ParameterizedType) -> interfaceTypes^::Type [! execBooleanQuery (typeFilter)]\', true),

      LocationRule (
        \'Type [getAttrValue("asClassDoc") != class.id] -> {

          type = contextElement;

          convertEnum (
            findElementsByKey ("inherited-fields", HashKey (class.id, type.getAttrValue("asClassDoc"))),
            @(GOMElement) field,
            null,
            FlexQuery ({
              el = CustomElement (field);

              el.setAttr ("isField", true);

              fieldName = field.getAttrStringValue("name");
              el.setAttr ("name", fieldName);
              el.setAttr ("qualifiedName", class.getAttrStringValue("qualifiedName") + "." + fieldName);

              el.setAttr ("id", field.id);
              el.setAttr ("adoptingClassId", class.id);
              el.setAttr ("parentClassInvocation", type);

              putElementByKey ("member-adoptions", field.id, el);

              el
            })
          )
        }::#CUSTOM\',
        true
      ),

      LocationRule (
        \'Type [getAttrValue("asClassDoc") != class.id] -> {

          type = contextElement;

          convertEnum (
            findElementsByKey ("inherited-methods", HashKey (class.id, type.getAttrValue("asClassDoc"))),
            @(GOMElement) method,
            null,
            FlexQuery ({
              el = CustomElement (method);

              el.setAttr ("isMethod", true);

              methodName = method.getAttrStringValue("name");
              el.setAttr ("name", methodName);
              el.setAttr ("qualifiedName", class.getAttrStringValue("qualifiedName") + "." + methodName);

              el.setAttr (
                "signature",
                method.callStockSection ("Method Signature", Array (true, type, true))
              );

              el.setAttr (
                "flatSignature", 
                method.callStockSection ("Method Signature", Array (false, type, true))
              );

              el.setAttr (
                "rawSignature", 
                method.callStockSection ("Method Signature", Array (true, type, false))
              );

              el.setAttr ("id", method.id);
              el.setAttr ("adoptingClass", class);
              el.setAttr ("adoptingClassId", class.id);
              el.setAttr ("parentClassInvocation", type);

              putElementByKey ("member-adoptions", method.id, el);

              el
            })
          )
        }::#CUSTOM\',
        true
      )
    ),
    "#CUSTOM"
  )
);'
			</FOLDER>
			<FOLDER>
				DESCR='\'class-use-xxx\'
--
element maps used to generate "Class/Package Use" report:

class-use-packages
------------------
Maps each class to all documented packages where that class is used.
The hash key is the class ID (GOMElement.id).

class-use-as-superclass
-----------------------
Maps any {class/interface, package} pair to all documented classes/interfaces contained in the given package, for which the given class/interface is a superclass/superinterface (both direct and indirect). The hash key is HashKey (class.id, package.id).

class-use-as-implemented-interface
----------------------------------
Maps any {interface, package} pair to all documented classes contained in the given package that implement the given interface (both directly and indirectly). The hash key is HashKey (interface.id, package.id).

class-use-as-class-annotation-type
----------------------------------
Maps any {annotationType, package} pair to all documented classes contained in the given package that have an annotation of the given type. The hash key is HashKey (annotationType.id, package.id).

class-use-as-class-type-param-type
----------------------------------
Maps any {class, package} pair to all documented classes contained in the given package that have type parameters of the given type class. For example:

  class SomeClass <K extends ThisClass>

The hash key is HashKey (class.id, package.id).

class-use-as-field-type
-----------------------
Maps any {class, package} pair to all documented fields of the classes contained in the given package, whose type is the given class. For example:

  ThisClass field;

The hash key is HashKey (class.id, package.id).

The map elements representing the fields can be of two types:
- The fields defined in the class are represented by FieldDoc elements.
- The adopted fields are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-field-type-argument
--------------------------------
Maps any {class, package} pair to all documented fields of the classes contained in the given package, whose type has type arguments of the given class. For example:

  SomeType<ThisClass> field;
  SomeType<? extends ThisClass> field;

The hash key is HashKey (class.id, package.id).

The map elements representing the fields can be of two types:
- The fields defined in the class are represented by FieldDoc elements.
- The adopted fields are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-field-annotation-type
----------------------------------
Maps any {annotationType, package} pair to all documented fields of the classes contained in the given package that have annotations of the given type.

The hash key is HashKey (annotationType.id, package.id).

The map elements representing the fields can be of two types:
- The fields defined in the class are represented by FieldDoc elements.
- The adopted fields are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-method-annotation-type
-----------------------------------
Maps any {annotationType, package} pair to all documented methods of the classes contained in the given package that have annotations of the given type. 

The hash key is HashKey (annotationType.id, package.id).

The map elements representing the methods can be of two types:
- The methods defined in the class are represented by MethodDoc elements.
- The adopted methods are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-method-return-type
-------------------------------
Maps any {class, package} pair to all documented methods of the classes contained in the given package, whose type is the given class. For example:

  ThisClass method() {...}

The hash key is HashKey (class.id, package.id).

The map elements representing the methods can be of two types:
- The methods defined in the class are represented by MethodDoc elements.
- The adopted methods are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-method-return-type-argument
----------------------------------------
Maps any {class, package} pair to all documented methods of the classes contained in the given package, whose return type has type arguments of the given class. For example:

  SomeType<ThisClass> method() {...}
  SomeType<? extends ThisClass> method() {...}

The hash key is HashKey (class.id, package.id).

The map elements representing the methods can be of two types:
- The methods defined in the class are represented by MethodDoc elements.
- The adopted methods are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-method-type-param-type
-----------------------------------
Maps any {class, package} pair to all documented methods of the classes contained in the given package that have type parameters of the given type class. For example:

  <A extends ThisClass> A method() {...}
  <A extends ThisClass> void method(A param) {...}

The hash key is HashKey (class.id, package.id).

The map elements representing the methods can be of two types:
- The methods defined in the class are represented by MethodDoc elements.
- The adopted methods are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-method-param-annotation-type
-----------------------------------------
Maps any {annotationType, package} pair to all documented methods of the classes contained in the given package that have parameters with annotations of the given type.

The hash key is HashKey (annotationType.id, package.id).

The map elements representing the methods can be of two types:
- The methods defined in the class are represented by MethodDoc elements.
- The adopted methods are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-method-param-type
------------------------------
Maps any {class, package} pair to all documented methods of the classes contained in the given package that have parameters of the given type class. For example:

  void method (ThisClass param) {...}

The hash key is HashKey (class.id, package.id).

The map elements representing the methods can be of two types:
- The methods defined in the class are represented by MethodDoc elements.
- The adopted methods are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-method-param-type-argument
---------------------------------------
Maps any {class, package} pair to all documented methods of the classes contained in the given package that have parameters of types with type arguments of the given class. For example:

  void method (SomeType<ThisClass> param) {...}
  void method (SomeType<? extends ThisClass> param) {...}

The hash key is HashKey (class.id, package.id).

The map elements representing the methods can be of two types:
- The methods defined in the class are represented by MethodDoc elements.
- The adopted methods are represented by #CUSTOM elements, the same as in \'adopted-members\' map.

class-use-as-constructor-annotation-type
----------------------------------------
Maps any {annotationType, package} pair to all documented constructors of the classes contained in the given package that have annotations of the given type. The hash key is HashKey (annotationType.id, package.id).

class-use-as-constructor-type-param-type
----------------------------------------
Maps any {class, package} pair to all documented constructors of the classes contained in the given package that have type parameters of the given type class. For example:

  <A extends ThisClass> SomeClass(A param) {...}

The hash key is HashKey (class.id, package.id)

class-use-as-constructor-param-annotation-type
----------------------------------------------
Maps any {annotationType, package} pair to all documented constructors of the classes contained in the given package that have parameters with annotations of the given type. The hash key is HashKey (annotationType.id, package.id).

class-use-as-constructor-param-type
-----------------------------------
Maps any {class, package} pair to all documented constructors of the classes contained in the given package that have parameters of the given type class. For example:

  SomeClass (ThisClass param) {...}

The hash key is HashKey (class.id, package.id).

class-use-as-constructor-param-type-argument
--------------------------------------------
Maps any {class, package} pair to all documented constructors of the classes contained in the given package that have parameters of types with type arguments of the given class. For example:

  SomeClass (SomeType<ThisClass> param) {...}
  SomeClass (SomeType<? extends ThisClass> param) {...}

The hash key is HashKey (class.id, package.id).'
				COND='getBooleanParam("gen.refs.use")'
				INIT_EXPR='includeDeprecated = getBooleanParam("include.deprecated");

memberFilter = BooleanQuery (
  (includeDeprecated || ! hasTag("@deprecated") && ! hasAnnotation("java.lang.Deprecated"))
  &&
  ! checkElementsByKey("excluded-members", contextElement.id)
);

class = contextElement;
package = getElementByLinkAttr("containingPackage");

iterate (
  findElementsByLRules (
    Array (
      LocationRule ("* -> interfaces^::ClassDoc", true),
      LocationRule ("* -> superclass^::ClassDoc", true)
    )
  ),
  @(GOMElement) ancestor,
  FlexQuery({

    ancestor.isIncluded() && ! ancestor.hasAttrValue ("qualifiedName", "java.lang.Enum") ?
    {
      putElementByKey (

        ancestor.getAttrBooleanValue("isClass") || class.getAttrBooleanValue("isInterface")
          ? "class-use-as-superclass" : "class-use-as-implemented-interface",

        HashKey (ancestor.id, package.id),
        class
      );

      putElementByKey ("class-use-packages", ancestor.id, package);
    }
  })
);

iterate (
  findElementsByLPath("AnnotationDesc/annotationType^::AnnotationTypeDoc"),
  @(GOMElement) annType,
  FlexQuery({

    annType.isIncluded() ?
    {
      putElementByKey (
        "class-use-as-class-annotation-type",
        HashKey (annType.id, package.id),
        class
      );

      putElementByKey ("class-use-packages", annType.id, package);
    }
  })
);

iterate (
  findElementsByLPath ("TypeVariable/bounds^::Type"),
  @(GOMElement) type,
  FlexQuery({

    type.callStockSection (
      "Collect Classes Used By Type",
      Array (
        class,   // doc-element where the type is used
        package, // package that contains the doc-element

        // element map to track the usage of the type class
        "class-use-as-class-type-param-type",

        // element map to track the usage of type argument classes
        "class-use-as-class-type-param-type"
      )
    )
  })
);

iterate (
  Enum (
    findChildren ("FieldDoc", memberFilter),
    findElementsByKey ("adopted-members", contextElement.id, BooleanQuery (getAttrBooleanValue("isField")))
  ),
  @(GOMElement) el,
  FlexQuery({

    el.instanceOf ("#CUSTOM") ? {
      field = toElement (el.value);
      parentClassInvocation = el.getAttrValue ("parentClassInvocation");
    } : {
      field = el;
      parentClassInvocation = null;
    };

    iterate (
      field.findElementsByLPath("AnnotationDesc/annotationType^::AnnotationTypeDoc"),
      @(GOMElement) annType,
      FlexQuery({

        annType.isIncluded() ?
        {
          putElementByKey (
            "class-use-as-field-annotation-type",
            HashKey (annType.id, package.id),
            el
          );

          putElementByKey ("class-use-packages", annType.id, package);
        }
      })
    );

    fieldType = field.getElementByLinkAttr("type");

    fieldType.callStockSection (
      "Collect Classes Used By Type",
      Array (
        el,      // member that uses the type
        package, // package that contains the member

        // element map to track the usage of the type class
        "class-use-as-field-type",

        // element map to track the usage of type argument classes
        "class-use-as-field-type-argument",

        // for the adopted member, the invocation of its actual (generic) parent class
        parentClassInvocation
      )      
    );
  })
);

iterate (
  Enum (
    findChildren ("MethodDoc", memberFilter),
    findElementsByKey ("adopted-members", contextElement.id, BooleanQuery (getAttrBooleanValue("isMethod")))
  ),
  @(GOMElement) el,
  FlexQuery({

    el.instanceOf ("#CUSTOM") ? {
      method = toElement (el.value);
      parentClassInvocation = el.getAttrValue ("parentClassInvocation");
    } : {
      method = el;
      parentClassInvocation = null;
    };

    iterate (
      method.findElementsByLPath("AnnotationDesc/annotationType^::AnnotationTypeDoc"),
      @(GOMElement) annType,
      FlexQuery({

        annType.isIncluded() ?
        {
          putElementByKey (
            "class-use-as-method-annotation-type",
            HashKey (annType.id, package.id),
            el
          );

          putElementByKey ("class-use-packages", annType.id, package);
        }
      })
    );

    iterate (
      method.findElementsByLPath ("TypeVariable/bounds^::Type"),
      @(GOMElement) type,
      FlexQuery({

        type.callStockSection (
          "Collect Classes Used By Type",
          Array (
            el,      // member that uses the type
            package, // package that contains the member

            // element map to track the usage of the type class
            "class-use-as-method-type-param-type",

            // element map to track the usage of type argument classes
            "class-use-as-method-type-param-type",

            // for the adopted member, the invocation of its actual (generic) parent class
            parentClassInvocation
          )
        )
      })
    );

    returnType = method.getElementByLinkAttr("returnType");

    returnType.callStockSection (
      "Collect Classes Used By Type",
      Array (
        el,      // member that uses the type
        package, // package that contains the member

        // element map to track the usage of the type class
        "class-use-as-method-return-type",

        // element map to track the usage of type argument classes
        "class-use-as-method-return-type-argument",

        // for the adopted member, the invocation of its actual (generic) parent class
        parentClassInvocation
      )
    );

    iterate (
      method.findChildren ("Parameter"),
      @(GOMElement) param,
      FlexQuery({

        iterate (
          param.findElementsByLPath("AnnotationDesc/annotationType^::AnnotationTypeDoc"),
          @(GOMElement) annType,
          FlexQuery({

            annType.isIncluded() ?
            {
              putElementByKey (
                "class-use-as-method-param-annotation-type",
                HashKey (annType.id, package.id),
                el
              );

              putElementByKey ("class-use-packages", annType.id, package);
            }
          })
        );

        paramType = param.getElementByLinkAttr("type");

        paramType.callStockSection (
          "Collect Classes Used By Type",
          Array (
            el,      // member that uses the type
            package, // package that contains the member

            // element map to track the usage of the type class
            "class-use-as-method-param-type",

            // element map to track the usage of type argument classes
            "class-use-as-method-param-type-argument",

            // for the adopted member, the invocation of its actual (generic) parent class
            parentClassInvocation
          )
        )
      })
    );
  })
);

iterate (
  findChildren ("ConstructorDoc", memberFilter),
  @(GOMElement) constructor,
  FlexQuery({

    iterate (
      constructor.findElementsByLPath("AnnotationDesc/annotationType^::AnnotationTypeDoc"),
      @(GOMElement) annType,
      FlexQuery({

        annType.isIncluded() ?
        {
          putElementByKey (
            "class-use-as-constructor-annotation-type",
            HashKey (annType.id, package.id),
            constructor
          );

          putElementByKey ("class-use-packages", annType.id, package);
        }
      })
    );

    iterate (
      constructor.findElementsByLPath ("TypeVariable/bounds^::Type"),
      @(GOMElement) type,
      FlexQuery({

        type.callStockSection (
          "Collect Classes Used By Type",
          Array (
            constructor, // member that uses the type
            package,     // package that contains the member

            // element map to track the usage of the type class
            "class-use-as-constructor-type-param-type",

            // element map to track the usage of type argument classes
            "class-use-as-constructor-type-param-type",

            // for the adopted member, the invocation of its actual (generic) parent class
            parentClassInvocation
          )
        )
      })
    );

    iterate (
      constructor.findChildren ("Parameter"),
      @(GOMElement) param,
      FlexQuery({

        iterate (
          param.findElementsByLPath("AnnotationDesc/annotationType^::AnnotationTypeDoc"),
          @(GOMElement) annType,
          FlexQuery({

            annType.isIncluded() ?
            {
              putElementByKey (
                "class-use-as-constructor-param-annotation-type",
                HashKey (annType.id, package.id),
                constructor
              );

              putElementByKey ("class-use-packages", annType.id, package);
            }
          })
        );

        paramType = param.getElementByLinkAttr("type");

        paramType.callStockSection (
          "Collect Classes Used By Type",
          Array (
            constructor, // member that uses the type
            package,     // package that contains the member

            // element map to track the usage of the type class
            "class-use-as-constructor-param-type",

            // element map to track the usage of type argument classes
            "class-use-as-constructor-param-type-argument"
          )
        );
      })
    )
  })
);'
			</FOLDER>
		</BODY>
	</ELEMENT_ITER>
</ROOT>
<STOCK_SECTIONS>
	<FOLDER>
		SS_NAME='Collect Classes Used By Type'
		DESCR='param[0]: doc-element where the type is used (e.g. field or method whose return type it is)
param[1]: package that contains the doc-element

param[2]: element map (id) that tracks the usage of the primary class associated with this type (e.g. return type class)

param[3]: element map (id) that tracks the usage of classes as type arguments

param[4]: when the given type is used by an adopted member (e.g. result type of a field/method, type of a method parameter), this parameter provides the type element representing the invocation of the (excluded) generic class actually containing that member. Otherwise, the parameter value is null.'
		MATCHING_ET='Type'
		<BODY>
			<FOLDER>
				DESCR='when this is a type variable'
				MATCHING_ET='TypeVariable'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<SS_CALL>
						DESCR='if this is a "foreign" type variable (declared in a different class), it is replaced with the actual types passed into that variable'
						COND='// test if this type variable is declared for a class
// (not a generic constructor or method)

getElementByLinkAttr("owner", "ClassDoc") != null'
						BREAK_PARENT_BLOCK='when-executed'
						SS_NAME='Collect Classes Used By Type'
						PASSED_ELEMENT_EXPR='// the parameterized type, which represents
// the invocation of a generic class/interface 
// where this member is defined

invokedType = stockSection.params[4].toElement();

// the actual type argument passed to this variable 
// within that generic class/interface invovation

invokedType.getElementByLinkAttr (
  "typeArguments", 
  getAttrIntValue("index") // the index of the variable
)'
						PASSED_ELEMENT_MATCHING_ET='Type'
						PARAMS_EXPR='Array (
  stockSection.params [0], // member that uses the type
  stockSection.params [1], // package that contains the member
  stockSection.params [2], // element map to track the usage of the type class
  stockSection.params [3], // element map to track the usage of type argument classes
  null // for the adopted member, the invocation of its actual parent class (when it is generic one)
)'
					</SS_CALL>
				</BODY>
			</FOLDER>
			<FOLDER>
				DESCR='otherwise, register the usage of the class associated with the type'
				COND='isIncluded()'
				INIT_EXPR='member = toElement (stockSection.params [0]);
package = toElement (stockSection.params [1]);

classId = getAttrValue("asClassDoc");

putElementByKey (
  stockSection.params [2], 
  HashKey (classId, package.id),
  member
);

putElementByKey ("class-use-packages", classId, package);'
			</FOLDER>
			<ELEMENT_ITER>
				DESCR='process type arguments'
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
					<ELEMENT_ITER>
						DESCR='when this is a wildcard, iterate by its upper and lower bounds'
						MATCHING_ET='WildcardType'
						BREAK_PARENT_BLOCK='when-executed'
						TARGET_ET='Type'
						SCOPE='advanced-location-rules'
						RULES={
							'* -> extendsBounds^::Type';
							'* -> superBounds^::Type';
						}
						FMT={
							txtfl.delimiter.type='text';
							txtfl.delimiter.text=' & ';
						}
						<BODY>
							<SS_CALL>
								SS_NAME='Collect Classes Used By Type'
								PARAMS_EXPR='Array (
  stockSection.params [0], // member that uses the type
  stockSection.params [1], // package that contains the member
  stockSection.params [3], // element map to track the usage of the type class
  stockSection.params [3], // element map to track the usage of type argument classes
  stockSection.params [4]  // for the adopted member, the invocation of its actual (generic) parent class
)'
							</SS_CALL>
						</BODY>
					</ELEMENT_ITER>
					<SS_CALL>
						DESCR='otherwise, this is a class or type variable or parameterized type'
						SS_NAME='Collect Classes Used By Type'
						PARAMS_EXPR='Array (
  stockSection.params [0], // member that uses the type
  stockSection.params [1], // package that contains the member
  stockSection.params [3], // element map to track the usage of the type class
  stockSection.params [3], // element map to track the usage of type argument classes
  stockSection.params [4]  // for the adopted member, the invocation of its actual (generic) parent class
)'
					</SS_CALL>
				</BODY>
			</ELEMENT_ITER>
		</BODY>
	</FOLDER>
	<ELEMENT_ITER>
		SS_NAME='Method Signature'
		DESCR='print method signature;

param[0]: specify whether to print full signature (\'true\') or flat signature (\'false\')

param[1]: when this is an adopted method, the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that method

param[2]: specify whether to print type parameters (\'true\')'
		MATCHING_ET='MethodDoc'
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
							<SS_CALL_CTRL>
								SS_NAME='Type Name'
								PARAMS_EXPR='stockSection.params'
							</SS_CALL_CTRL>
							<SS_CALL_CTRL>
								COND='stockSection.params[2].toBoolean()'
								SS_NAME='Type Parameters'
								PARAMS_EXPR='stockSection.params'
							</SS_CALL_CTRL>
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
	<FOLDER>
		SS_NAME='Type Name'
		DESCR='print the type name (i.e. the name of the referenced class/interface or the name of the type variable);

param[0]: specify whether to print full qualified names of type classes (\'true\'), or only class names (\'false\')

param[1]: when the given type is associated with an adopted member (e.g. result type of a field/method, type of a method parameter), the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that member

param[2]: specify whether to print type parameters (\'true\')'
		MATCHING_ET='Type'
		<BODY>
			<FOLDER>
				DESCR='process the type variable;

since this class documentation may list as its own the fields and methods inherited from the excluded ancestor classes/interfaces (the invisible or excluded by tags/annotations), the original declarations of such fields and methods may still contain type variables declared in their actual containing classes. 

Such "foreign" type variables cannot appear here because they will make the documentation inconsistent and may even intersect with the equally named type variable of the given class. 

Therefore, such variables should be extended into actual types passed into them.

This is programmed in the first Area Section (below).'
				CONTEXT_ELEMENT_EXPR='getElementByLinkAttr("asTypeVariable")'
				MATCHING_ET='TypeVariable'
				BREAK_PARENT_BLOCK='when-executed'
				<BODY>
					<AREA_SEC>
						DESCR='if this is a "foreign" type variable (declared in a different class), it is replaced with the actual types passed into that variable'
						COND='// test if this type variable is declared for a class
// (not a generic constructor or method)

getElementByLinkAttr("owner", "ClassDoc") != null'
						CONTEXT_ELEMENT_EXPR='// the parameterized type, which represents
// the invocation of a generic class/interface 
// where this member is defined

invokedType = stockSection.params[1].toElement();

// the actual type argument passed to this variable 
// within that generic class/interface invovation

invokedType.getElementByLinkAttr (
  "typeArguments", 
  getAttrIntValue("index") // the index of the variable
)'
						MATCHING_ET='Type'
						BREAK_PARENT_BLOCK='when-executed'
						<AREA>
							<CTRL_GROUP>
								FMT={
									txtfl.delimiter.type='none';
								}
								<CTRLS>
									<SS_CALL_CTRL>
										SS_NAME='Type Name'
										PARAMS_EXPR='stockSection.params'
									</SS_CALL_CTRL>
									<SS_CALL_CTRL>
										COND='stockSection.params[2].toBoolean()'
										SS_NAME='Type Parameters'
										PARAMS_EXPR='stockSection.params'
									</SS_CALL_CTRL>
								</CTRLS>
							</CTRL_GROUP>
						</AREA>
					</AREA_SEC>
					<AREA_SEC>
						DESCR='otherwise, which this was a normal type variable declared somewhere within this class'
						FMT={
							sec.outputStyle='text-par';
						}
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
			<AREA_SEC>
				FMT={
					sec.outputStyle='text-par';
				}
				<AREA>
					<CTRL_GROUP>
						<CTRLS>
							<DATA_CTRL>
								FORMULA='stockSection.param.toBoolean()
  ? getAttrStringValue("qualifiedTypeName")
  : getAttrStringValue("typeName")'
							</DATA_CTRL>
						</CTRLS>
					</CTRL_GROUP>
				</AREA>
			</AREA_SEC>
		</BODY>
	</FOLDER>
	<FOLDER>
		SS_NAME='Type Parameters'
		DESCR='prints formal type parameters of the class/interface/method/constructor or type arguments of the invocation of a generic class or interface.

param[0]: specify whether to print full qualified names of type classes (\'true\'), or only class names (\'false\')

param[1]: when the given type is associated with an adopted member (e.g. result type of a field/method, type of a method parameter), the parameter value is the type element representing the invocation of the (excluded) generic class actually containing that member

param[2]: specify whether to print (nested) type parameters (\'true\')'
		MATCHING_ETS={'ExecutableMemberDoc';'Type'}
		FMT={
			sec.outputStyle='text-par';
		}
		<BODY>
			<ELEMENT_ITER>
				DESCR='the formal type parameters of the class/interface or the executable member'
				MATCHING_ETS={'ClassDoc';'ExecutableMemberDoc'}
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
									<SS_CALL_CTRL>
										SS_NAME='Type Name'
										PARAMS_EXPR='stockSection.params'
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
												PARAMS_EXPR='stockSection.params'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												MATCHING_ET='ParameterizedType'
												SS_NAME='Type Parameters'
												PARAMS_EXPR='stockSection.params'
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
										FMT={
											txtfl.delimiter.type='none';
										}
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='stockSection.params'
											</SS_CALL_CTRL>
											<SS_CALL_CTRL>
												MATCHING_ET='ParameterizedType'
												SS_NAME='Type Parameters'
												PARAMS_EXPR='stockSection.params'
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
														PARAMS_EXPR='stockSection.params'
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														MATCHING_ET='ParameterizedType'
														SS_NAME='Type Parameters'
														PARAMS_EXPR='stockSection.params'
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
														PARAMS_EXPR='stockSection.params'
													</SS_CALL_CTRL>
													<SS_CALL_CTRL>
														MATCHING_ET='ParameterizedType'
														SS_NAME='Type Parameters'
														PARAMS_EXPR='stockSection.params'
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
													</DELIMITER>
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
						<BODY>
							<AREA_SEC>
								<AREA>
									<CTRL_GROUP>
										<CTRLS>
											<SS_CALL_CTRL>
												SS_NAME='Type Name'
												PARAMS_EXPR='stockSection.params'
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
CHECKSUM='eCvlKkdCx2F11hc+ufFhS1UCkTJ?gvZR48cM2P6eAc8'
</DOCFLEX_TEMPLATE>