# Stage 1: Build JAR using Maven and Java 21 LTS
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# Copy Maven wrapper and POM first to leverage Docker layer caching for dependencies
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build production artifact
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Production Minimal Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-privileged system user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create directory for local uploads
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app

USER appuser:appgroup

# Copy compiled JAR from builder stage
COPY --from=builder /app/target/*.jar /app/app.jar

# Configuration defaults
ENV PORT=8080 \
    SPRING_PROFILES_ACTIVE=prod \
    JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/api/v1/public/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
