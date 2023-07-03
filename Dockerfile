FROM amazoncorretto:11-alpine
ARG JAR_FILE=/build/libs/KWU Campus-0.0.1-SNAPSHOT-plain.war
COPY ${JAR_FILE} /kampus.war
ENTRYPOINT ["java","-war","-Dspring.profiles.active=prod", "/kampus.war"]
