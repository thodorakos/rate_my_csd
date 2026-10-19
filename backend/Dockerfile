# Stage 1: Cache dependencies
FROM maven:3.9-eclipse-temurin-21-alpine AS deps
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

# Stage 2: Build
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY --from=deps /root/.m2 /root/.m2
COPY --from=deps /app/pom.xml .
COPY src ./src
RUN mvn -q -DskipTests package

# Stage 3: Run
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
