FROM openjdk:17-oracle
EXPOSE 8080
ARG JAR_FILE="jw-planner-app-1.0.0.jar"
ADD ${JAR_FILE} app.jar
ENTRYPOINT [\
"java", "-jar", "app.jar", \
"-D", "spring.datasource.url=${DATABASE_URL}", \
"-D", "spring.datasource.username=${DATABASE_USERNAME}", \
"-D", "spring.datasource.password=${DATABASE_PASSWORD}" \
]