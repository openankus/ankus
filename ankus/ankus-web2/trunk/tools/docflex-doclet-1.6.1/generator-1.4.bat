@echo off

::----------------------------------------------------------------------
:: Specify the location of JDK 1.4.x here
::----------------------------------------------------------------------
set JDK_HOME=C:\Program Files\Java\j2sdk1.4

::----------------------------------------------------------------------
:: Specify the location of DocFlex/Doclet home directory.
::
:: If you encounter a javadoc error like:
:: 'Cannot find doclet class com.docflex.javadoc.Doclet'
:: please specify directly the absolute pathname of your DocFlex/Doclet installation, e.g.
::
:: set DFH=C:\docflex-doclet
::
:: The default setting (below) assigns 'DFH' with the absolute pathname of 
:: this BAT file's parent directory
::----------------------------------------------------------------------
set DFH=%~dp0

::----------------------------------------------------------------------
:: Get rid of the trailing slash in 'DFH', if present
::----------------------------------------------------------------------
if %DFH:~-1%==\ set DFH=%DFH:~0,-1%

::----------------------------------------------------------------------
:: JAVADOC OPTIONS
::----------------------------------------------------------------------
:: Specify DocFlex Doclet class
:: (Double quotes are needed because file pathname(s) may contain spaces!)
::----------------------------------------------------------------------
set OPTIONS=-docletpath "%DFH%\lib\docflex-doclet-1.4.jar" -doclet com.docflex.javadoc.Doclet

::----------------------------------------------------------------------
:: JAVADOC OPTIONS (continued)
::----------------------------------------------------------------------
:: -breakiterator option is processed by Javadoc itself (not a doclet).
:: Setting it may improve summary annotations as well as suppress 
:: great a lots of warnings that Javadoc 1.4 would display without it. 
::----------------------------------------------------------------------
set OPTIONS=-breakiterator %OPTIONS%

::----------------------------------------------------------------------
:: JAVADOC OPTIONS (continued)
::----------------------------------------------------------------------
:: Set -J-Xmx option for maximum heap size allocated by JVM.
:: Check this option when running on big projects!
::
:: DocFlex generator does need memory as it stores lots
:: of temporary data in hash-tables in order to boost performance.
::
:: According to our tests, allowing 512 Mb heap size on 32-bit Java is OK
:: for most purposes (e.g. to generate an HTML documentation for the entire JDK 6
:: Java API sources containing more than 4000 classes)
::----------------------------------------------------------------------
set OPTIONS=-J-Xmx512m %OPTIONS%

::----------------------------------------------------------------------
:: GENERATING DOCUMENTATION
::----------------------------------------------------------------------
:: The command following this comment will generate sample documentation
:: by a single Java package.
:: (Double quotes are needed because file pathname(s) may contain spaces!)
::
:: Note, DocFlex Doclet supports -link/-linkoffline options. 
::
:: For example, if you are connected to internet, adding the following 
:: option will generate the same sample documentation however with the 
:: direct hyperlinks to the online Java API docs located at
:: Java Technology web-site:
::
:: set OPTIONS=%OPTIONS% -link http://download.oracle.com/javase/6/docs/api/
::----------------------------------------------------------------------

"%JDK_HOME%\bin\javadoc" %OPTIONS% -d out -sourcepath %DFH%\demo java4
