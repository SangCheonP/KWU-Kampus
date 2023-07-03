FROM amazoncorretto:11-alpine
ARG JAR_FILE=/build/libs/kampus.war
COPY ${JAR_FILE} /app.war
ENTRYPOINT ["java","-war","-Dspring.profiles.active=prod", "/app.war"]
