# Use an official Maven image to build the app
FROM maven:3.8.6-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download the dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the application code
COPY src ./src

# Package the Spring Boot application into a jar file
RUN mvn package -DskipTests

# Use an official JDK image to run the app
FROM openjdk:17-jdk-slim

# Set the working directory for running the jar
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port on which the Spring Boot app runs
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
