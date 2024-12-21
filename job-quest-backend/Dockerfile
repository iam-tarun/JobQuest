# base image
FROM openjdk:23-jdk-slim-bullseye

RUN mkdir -p /app/files

# change the directory
WORKDIR /app
# copy the required files
COPY target/job-quest-backend-0.0.1-SNAPSHOT.jar app.jar
# listen to port 8080 in the container
EXPOSE 8080

# Add a health check for the application
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail http://localhost:8080/actuator/health || exit 1

# command to run after the setup
ENTRYPOINT ["java", "-jar", "app.jar"]

