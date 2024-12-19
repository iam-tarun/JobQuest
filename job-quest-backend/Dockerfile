FROM openjdk:23-jdk
ARG JAR_FILE=target/job-quest-backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
