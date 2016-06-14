<DOCFLEX_TEMPLATE VER='1.18'>
CREATED='2006-02-24 02:22:00'
LAST_UPDATE='2012-05-24 08:56:31'
DESIGNER_TOOL='DocFlex SDK 1.x'
DESIGNER_LICENSE_TYPE='Filigris Works Team'
APP_NAME='DocFlex/Javadoc | Basic Template Set for Java 5.0 (and later)'
APP_VER='1.5.6'
TEMPLATE_TYPE='ProcedureTemplate'
DSM_TYPE_ID='javadoc2'
ROOT_ET='RootDoc'
<TEMPLATE_PARAMS>
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
		param.list.noEmptyList='true';
	}
	PARAM={
		param.name='exclude.byTags.classes.all';
		param.title='exclude by tags: classes';
		param.type='string';
		param.list='true';
	}
	PARAM={
		param.name='exclude.byTags.members.all';
		param.title='exclude by tags: members';
		param.type='string';
		param.list='true';
	}
	PARAM={
		param.name='exclude.byTags.all';
		param.title='exclude by tags: classes & members';
		param.type='string';
		param.list='true';
	}
	PARAM={
		param.name='exclude.byAnns.classes.all';
		param.title='exclude by annotations: classes';
		param.type='string';
		param.list='true';
	}
	PARAM={
		param.name='exclude.byAnns.members.all';
		param.title='exclude by annotations: members';
		param.type='string';
		param.list='true';
	}
	PARAM={
		param.name='exclude.byAnns.all';
		param.title='exclude by annotations: classes & members';
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
		DESCR='create  \'overridden-implemented-methods\' hashmap that maps each method ID (GOMElement.id) to the enumeration of all methods of ancestor classes and implemented interfaces that this method overrides or implements.

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

        // the following two rules collect for each class/interface all its
        // superclasses and all implemented interfaces

        LocationRule (
          "(ClassDoc|ParameterizedType) -> interfaceTypes^::(ClassDoc|ParameterizedType)",
          true
        ),
        LocationRule (
          "(ClassDoc|ParameterizedType) -> superclassType^::(ClassDoc|ParameterizedType)",
          true
        ),

        // the following two rules collect for each class/interface all its
        // methods that the given method overrides or implements

        LocationRule (
          "ClassDoc -> MethodDoc[isOverriddenBy(method)]",
          true
        ),
        LocationRule (
          "ParameterizedType -> asClassDoc^::ClassDoc / MethodDoc[isOverriddenBy(method)]",
          true
        )
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
    Attr ("all", true),
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
);'
			</FOLDER>
			<FOLDER>
				DESCR='custom tags
--
filled from the values of \'include.tag.custom\' parameter;
see "Processing" tab'
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
  "all-known-subclasses",
  "all-known-subinterfaces",
  "all-known-implementing-classes",
  "non-public-constructors",
  "inherited-nested-types",
  "inherited-fields",
  "inherited-methods"
))'
		TARGET_ET='ClassDoc'
		SCOPE='advanced-location-rules'
		RULES={
			'* -> classes^::ClassDoc';
		}
		FILTER='findTag(getArrayParam("exclude.byTags.classes.all")) == null &&
findAnnotation(getArrayParam("exclude.byAnns.classes.all")) == null'
		<BODY>
			<FOLDER>
				DESCR='\'all-known-subclasses\'
--
maps each class\'s ID (GOMElement.id) to the enumeration of all subclasses of this class'
				COND='getAttrBooleanValue("isClass")'
				INIT_EXPR='excludeByTags = getArrayParam("exclude.byTags.classes.all");
excludeByAnns = getArrayParam("exclude.byAnns.classes.all");

putElementByKeys (
  "all-known-subclasses",
  getElementIds (
    findElementsByLRules (
      Array (
        LocationRule ("* -> superclass^::ClassDoc", false),

        LocationRule ("*[! isVisible() || 
                         findTag(excludeByTags) != null || 
                         findAnnotation(excludeByAnns) != null]
                      -> superclass^::ClassDoc", true)
      ),
      "ClassDoc",
      BooleanQuery (isVisible() && 
                    findTag(excludeByTags) == null && 
                    findAnnotation(excludeByAnns) == null)
    )
  ),
  contextElement
)'
			</FOLDER>
			<FOLDER>
				DESCR='\'all-known-subinterfaces\'
--
maps each interface\'s ID (GOMElement.id) to the enumeration of all subinterfaces of this interface'
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
maps each interface\'s ID (GOMElement.id) to the enumeration of all classes implementing this interface'
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
      ! getAttrBooleanValue("isSynthetic") &&
      (getAttrBooleanValue("isPrivate") || getAttrBooleanValue("isProtected") || 
       getAttrBooleanValue("isPackagePrivate")) &&
      ! hasTag(getArrayParam("exclude.byTags.members.all")) &&
      ! hasAnnotation(getArrayParam("exclude.byAnns.members.all"))
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
for the inherited nested types -- eliminating the shadowed types. **/

e = e.filterElementsByKey (FlexQuery (getAttrStringValue("name")));

/** At last, remove the types that belong to the given class itself
and those that cannot be inherited according to their visibility **/

e = e.filterElements (
  // the filtering query
  BooleanQuery (
    getAttrValue("containingClass") != classId && 
    (getAttrBooleanValue("isPublic") || 
     getAttrBooleanValue("isProtected") || 
  
     // Local nested types are allowed only when they are included in 
     // the active set (to be documented) and belong to the same package

     getAttrBooleanValue("isPackagePrivate") &&
     getAttrBooleanValue("isIncluded") &&
     getAttrValue("containingPackage") == packageId)
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
				INIT_EXPR='excludeClassesByTags = getArrayParam("exclude.byTags.classes.all");
excludeClassesByAnns = getArrayParam("exclude.byAnns.classes.all");
excludeMembersByTags = getArrayParam("exclude.byTags.members.all");
excludeMembersByAnns = getArrayParam("exclude.byAnns.members.all");
excludeAllByTags     = getArrayParam("exclude.byTags.all");
excludeAllByAnns     = getArrayParam("exclude.byAnns.all");

// the element ID of the given class
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
and those that cannot be inherited according to their visibility **/

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
    // remain only fields that can be visible in the documentation 
    // and are not excluded by tags/annotations
    isVisible() &&
    ! hasTag(excludeMembersByTags) && findTag(excludeAllByTags) == null && 
    ! hasAnnotation(excludeMembersByAnns) && findAnnotation(excludeAllByAnns) == null
  )
);

/* For each result field, put in the "inherited-fields" hashmap the mapping:

  { given class.id, field->containingClass.id } -> field

which says that the given class inherits the field \'field\' from the class
\'field->containingClass\'.
*/

mapId = "inherited-fields";

putElementsByKeys (
  mapId,
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

By each mapping like:  { C2.id, I.id } -> fff
we add a new mapping:  { C1.id, C2.id } -> fff
(provided that I is an excluded class/interface)
*/

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
      mapId,
      cls.findElementsByLRules (
        Array (
          LocationRule (\'* -> superclass^::ClassDoc [! isVisible() ||
                         findTag(excludeClassesByTags) != null ||
                         findAnnotation(excludeClassesByAnns) != null]\', true),

          LocationRule (\'* -> interfaces^::ClassDoc [! isVisible() || 
                         findTag(excludeClassesByTags) != null ||
                         findAnnotation(excludeClassesByAnns) != null]\', true)
        )
      ),
      FlexQuery (HashKey (classId, cls.id)),
      FlexQuery (findElementsByKey (mapId, HashKey (cls.id, contextElement.id)))
    )
  })
)'
			</FOLDER>
			<FOLDER>
				DESCR='\'inherited-methods\'
--
maps each two types T1 and T2 (classes or intefaces) to the enumeration of  methods which T1 inherits from T2. This takes into account overriding by methods specified in the intermediate types (which are both ancestors of T1 and descendants of T2).

The hash key is {T1.id, T2.id}.

If T1 is not a descendant of T2, the key is mapped to an empty enumeration.

See "Processing | Init Expression" tab.'
				INIT_EXPR='excludeClassesByTags = getArrayParam("exclude.byTags.classes.all");
excludeClassesByAnns = getArrayParam("exclude.byAnns.classes.all");
excludeMembersByTags = getArrayParam("exclude.byTags.members.all");
excludeMembersByAnns = getArrayParam("exclude.byAnns.members.all");
excludeAllByTags     = getArrayParam("exclude.byTags.all");
excludeAllByAnns     = getArrayParam("exclude.byAnns.all");

// the element ID of the given class
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
      // Remain only methods that can be visible in the documentation 
      // and are not excluded by tags/annotations
      isVisible() &&
      ! hasTag(excludeMembersByTags) && findTag(excludeAllByTags) == null &&
      ! hasAnnotation(excludeMembersByAnns) && findAnnotation(excludeAllByAnns) == null
    }
  })
);

removeElementMap (trackerMap);

/* For each result method, put in the "inherited-methods" hashmap the mapping:

  { given class.id, method->containingClass.id } -> method

which says that the given class inherits the method \'method\' from the class
\'method->containingClass\'.
*/

mapId = "inherited-methods";

putElementsByKeys (
  mapId,
  methods,
  FlexQuery (HashKey (classId, getAttrValue("containingClass")))
);

/* Now, that would be probably all. But here is a problem.

As some intermediate classes may be excluded from the documentation,
they may still contain methods to be documented.

Let\'s say we have the following:

  - class C1 extends class C2
  - class C2 extends class C3
  - extends class C3 contains a public method m()

Now, let\'s assume the class C3 must be excluded from the documentation.
What will happen with the method m() ?
It should be shown in the documentation as declared in the class C2!
Then, for the class C1, m() must appear as inherited from the class C2
(rather than from the class C3, as it actually is in the code).

So far, our "inherited-methods" hashmap doesn\'t say anything about this.

The following code adds that information.

By each mapping like:  { C2.id, C3.id } -> m
we add a new mapping:  { C1.id, C2.id } -> m
(provided that C3 is an excluded class/interface)
*/

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
      mapId,
      cls.findElementsByLRules (
        Array (
          LocationRule (\'* -> superclass^::ClassDoc [! isVisible() ||
                         findTag(excludeClassesByTags) != null ||
                         findAnnotation(excludeClassesByAnns) != null]\', true),

          LocationRule (\'* -> interfaces^::ClassDoc [! isVisible() || 
                         findTag(excludeClassesByTags) != null ||
                         findAnnotation(excludeClassesByAnns) != null]\', true)
        )
      ),
      FlexQuery (HashKey (classId, cls.id)),
      FlexQuery (findElementsByKey (mapId, HashKey (cls.id, contextElement.id)))
    )
  })
)'
			</FOLDER>
		</BODY>
	</ELEMENT_ITER>
</ROOT>
CHECKSUM='4AwZkEUbxuu0hjZWTPJsqeOB0x5W7JT2sRZNoG2oqG8'
</DOCFLEX_TEMPLATE>