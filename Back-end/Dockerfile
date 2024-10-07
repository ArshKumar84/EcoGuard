# Use Ubuntu as the base image for building the application
FROM ubuntu:latest AS build

# Update the package manager and install OpenJDK 17
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y

# Install Maven
RUN apt-get install maven -y

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the application source code
COPY src ./src

# Package the application into a jar file
RUN mvn package -DskipTests

# Start a new stage for the final image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port on which the Spring Boot app runs
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
