package com.stacktrek.stacktrek.AI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import io.github.cdimascio.dotenv.Dotenv;
@Configuration
public class WebClientConfig {
    @Bean
    public WebClient openAiWebClient(Dotenv env) {
        return WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Authorization", "Bearer " + env.get("OPENAI_API_KEY"))
                .defaultHeader("OpenAI-Beta", "assistants=v2")
                .build();
    }
}