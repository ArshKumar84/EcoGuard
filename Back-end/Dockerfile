# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build  # Ensure this line is correct

# Copy the pom.xml file
COPY . .

# Package the application into a jar file
RUN mvn clean package -DskipTests

# Stage 2: Create a minimal runtime image
FROM openjdk:17-jre-slim  

# Copy the jar file from the build stage
COPY --from=build /target/EcoGuard-0.0.1-SNAPSHOT.jar EcoGuard.jar

EXPOSE 8080

# Run the application
CMD ["java", "-jar", "EcoGuard.jar"]
