package com.stacktrek.stacktrek.AI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/CreateThread")
    public Mono<String> createThread(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");

        return aiService.createThread()
                .flatMap(threadId ->
                        aiService.addMessageToThread(threadId, message)
                                .then(aiService.createAssistantRun(threadId, "asst_n9Cxag4TYVXF8qGGgSFb0HYk")
                                        .flatMap(runId ->
                                                aiService.waitForRunCompletion(threadId, runId)
                                                        .then(aiService.retrieveAssistantResponse(threadId))
                                                        .map(resp -> resp.replaceAll("```json\\n|\\n```", ""))
                                                        .doOnNext(System.out::println)
                                                        .doFinally(signal -> aiService.deleteThread(threadId).subscribe())
                                        )
                                )
                );
    }
}
