#!/bin/sh

DIST=flamingo-web-services-1.0.1-GA
LANGUAGE=korean
NAME=${DIST}_${LANGUAGE}

echo "Making Flamingo Web Service 1.0.1 Distribution"
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
wget http://build.opencloudengine.org/browse/FLAMINGO-F101GA-1/artifact/shared/Web-Services-WAR/${DIST}.war
jar xvf ${DIST}.war
rm -rf ${DIST}.war
cd ../../../
cp config/web/server.xml ${NAME}/conf
cp config/INSTALLATION ${NAME}
cp config/web/catalina.sh ${NAME}/bin
cp config/web/${LANGUAGE}/flamingo-site.xml ${NAME}/webapps/ROOT/WEB-INF
cp config/web/${LANGUAGE}/flamingo.sql ${NAME}/database
cp config/web/LICENSE ${NAME}
tar -pczf ${NAME}.tar.gz ${NAME}
zip -r ${NAME}.zip ${NAME}
rm -rf ${NAME}
