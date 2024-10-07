FROM maven:3.8.5-openjdk-17 AS build
COPY . .
WORKDIR /Back-end
RUN mvn clean package -DskipTests
FROM openjdk:17-oracle

WORKDIR /Back-end
COPY --from=build /target/EcoGuard-0.0.1-SNAPSHOT.jar EcoGuard.jar
EXPOSE 8080
CMD ["java", "-jar", "EcoGuard.jar"]

