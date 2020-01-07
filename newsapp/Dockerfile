FROM openjdk:8-jdk-alpine
ADD target/newsapp-spring-boot.jar newsapp-spring-boot.jar
RUN mkdir _temp
EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "newsapp-spring-boot.jar"]