FROM openjdk:11-alpine

ARG JAR_FILE=/build/libs/kampus-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} /kampus.jar

ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod", "/kampus.jar"]
