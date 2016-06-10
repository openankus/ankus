#!/bin/sh

#----------------------------------------------------------------------
# Specify the location of JDK 1.4 here
#----------------------------------------------------------------------
JDK_HOME=/usr/java/j2sdk1.4

#----------------------------------------------------------------------
# Specify the location of DocFlex/Doclet home directory here
#----------------------------------------------------------------------
DFH=
    
#----------------------------------------------------------------------
# If DocFlex/Doclet home directory is not specified,
# derive it from the location of this shell script file
#----------------------------------------------------------------------
if [ -z "$DFH" -o ! -d "$DFH" ] ; then
  ## resolve links
  PRG="$0"
  progname=`basename "$0"`

  # need this for relative symlinks
  while [ -h "$PRG" ] ; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
    else
    PRG=`dirname "$PRG"`"/$link"
    fi
  done

  DFH=`dirname "$PRG"`/..

  # make it fully qualified
  DFH=`cd "$DFH" > /dev/null && pwd`
fi

#----------------------------------------------------------------------
# GENERATING DOCUMENTATION
#----------------------------------------------------------------------
# The command following this comment will generate sample documentation
# by a single Java package.
#----------------------------------------------------------------------
# -J-Xmx option sets the maximum heap size allocated by JVM.
# Check this option when running on big projects!
#
# DocFlex generator does need memory as it stores lots
# of temporary data in hash-tables in order to boost performance.
#
# According to our tests, allowing 512 Mb heap size on 32-bit Java is OK
# for most purposes (e.g. to generate an HTML documentation for the entire JDK 6
# Java API sources containing more than 4000 classes)
#
# However, for 64-bit Java this amount should be doubled.
# So, you should specify -Xmx1024m, instead of -Xmx512m.
#
# Note that allocating too much memory isn't good either because it may actually
# decrease the performance, especially when that amount of memory isn't backed
# by the physical RAM on your system.
#----------------------------------------------------------------------
# -breakiterator option is processed by Javadoc itself (not a doclet).
# Setting it may improve summary descriptions as well as suppress
# lots of warnings that Javadoc 1.4 would display without it.
#----------------------------------------------------------------------
# -docflexconfig option specifies the DocFlex main configuration file
# prepared for Linux
#----------------------------------------------------------------------
# DocFlex Doclet supports -link/-linkoffline options.
#
# For example, if you are connected to Internet, adding the following option
# (but only after specifying the -doclet):
#
#   -link http://download.oracle.com/javase/6/docs/api/
# 
# will generate the same sample documentation however with the direct hyperlinks
# to the online Java API docs located at Java Technology web-site.
#----------------------------------------------------------------------
# NOTE: double quotes in the command line are needed because file/dir
# pathnames may contain spaces 
#----------------------------------------------------------------------

"${JDK_HOME}/bin/javadoc" \
    -J-Xmx512m            \
    -breakiterator        \
    -docletpath "${DFH}/lib/docflex-doclet-1.4.jar" -doclet com.docflex.javadoc.Doclet \
    -docflexconfig "${DFH}/linux/docflex.config" \
    -d "${DFH}/out" \
    -sourcepath "${DFH}/demo" \
    java4
