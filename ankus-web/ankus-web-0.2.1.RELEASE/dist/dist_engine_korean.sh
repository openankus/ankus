#!/bin/sh

DIST=flamingo-workflow-engine-1.0.1-GA
LANGUAGE=korean
NAME=${DIST}_${LANGUAGE}

echo "Making Flamingo Workflow Engine 1.0.1 Distribution"
rm -rf ${NAME}*
tar xvfz apache-tomcat-7.0.50.tar.gz
mv apache-tomcat-7.0.50 ${NAME}
cd ${NAME}
rm -rf LICENSE
rm -rf NOTICE
rm -rf RELEASE-NOTES
rm -rf RUNNING.txt
mkdir database
cd webapps
rm -rf *
mkdir ROOT
cd ROOT
wget http://build.opencloudengine.org/browse/FLAMINGO-F101GA-1/artifact/shared/Workflow-Engine-WAR/${DIST}.war
jar xvf ${DIST}.war
rm -rf ${DIST}.war
cd ../../../
cp config/engine/server.xml ${NAME}/conf
cp config/INSTALLATION ${NAME}
cp config/engine/catalina.sh ${NAME}/bin
cp config/engine/${LANGUAGE}/flamingo-site.xml ${NAME}/webapps/ROOT/WEB-INF
cp config/engine/${LANGUAGE}/flamingo.sql ${NAME}/database
cp config/engine/LICENSE ${NAME}
tar -pczf ${NAME}.tar.gz ${NAME}
zip -r ${NAME}.zip ${NAME}
rm -rf ${NAME}
