# base image
FROM openjdk:23-jdk
# change the directory
WORKDIR /app
# copy the required files
COPY target/job-quest-backend-0.0.1-SNAPSHOT.jar app.jar
# listen to port 8080 in the container
EXPOSE 8080
# command to run after the setup
ENTRYPOINT ["java", "-jar", "app.jar"]

