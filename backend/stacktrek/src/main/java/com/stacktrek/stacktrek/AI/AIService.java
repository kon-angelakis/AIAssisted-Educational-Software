package com.stacktrek.stacktrek.AI;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Map;

@Service
public class AIService {

    private final WebClient webClient;

    @Autowired
    public AIService(Dotenv env) {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Authorization", "Bearer " + env.get("OPENAI_API_KEY"))
                .defaultHeader("OpenAI-Beta", "assistants=v2")
                .build();
    }

    public Mono<String> createThread() {
        return webClient.post()
                .uri("/threads")
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> response.get("id").toString());
    }

    public Mono<Void> addMessageToThread(String threadId, String message) {
        String requestBody = String.format("""
            {
              "role": "user",
              "content": "%s"
            }
        """, message);

        return webClient.post()
                .uri("/threads/{threadId}/messages", threadId)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(System.out::println)
                .then();
    }

    public Mono<String> createAssistantRun(String threadId, String assistantId) {
        String requestBody = String.format("""
            {
              "assistant_id": "%s"
            }
        """, assistantId);

        return webClient.post()
                .uri("/threads/{threadId}/runs", threadId)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> response.get("id").toString());
    }

    public Mono<Boolean> getAssistantRunStatus(String threadId, String runId) {
        return webClient.get()
                .uri("/threads/{threadId}/runs/{runId}", threadId, runId)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> "completed".equals(response.get("status").toString()));
    }

    public Mono<Void> waitForRunCompletion(String threadId, String runId) {
        return Mono.defer(() -> getAssistantRunStatus(threadId, runId))
                .repeatWhen(flux -> flux.delayElements(Duration.ofMillis(500)))
                .filter(Boolean::booleanValue)
                .next()
                .then();
    }

    public Mono<String> retrieveAssistantResponse(String threadId) {
        return webClient.get()
                .uri("/threads/{threadId}/messages", threadId)
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> {
                    try {
                        ObjectMapper mapper = new ObjectMapper();
                        JsonNode root = mapper.readTree(response);
                        JsonNode assistantMessage = root.path("data").get(0);
                        return assistantMessage
                                .path("content").get(0)
                                .path("text")
                                .path("value")
                                .asText();
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse assistant response", e);
                    }
                });
    }

    public Mono<Void> deleteThread(String threadId) {
        return webClient.delete()
                .uri("/threads/{threadId}", threadId)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(System.out::println)
                .then();
    }
}
