package com.stacktrek.stacktrek.AI;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
public class AIController {
    @Autowired
    private AIService aiService;

    @PostMapping("/QuestionGiver")
    public ResponseEntity<String> GenerateQuestions(@RequestBody Map<String, String> payload) throws JsonMappingException, JsonProcessingException, InterruptedException {
        String threadId = aiService.CreateThread();
        aiService.AddMessageToThread(threadId, payload.get("message").toString());
        String runId = aiService.CreateAssistantRun(threadId, "asst_HIJVbCjIN9jWayRWEgieZ2lQ");
        while(!aiService.GetAssistantRunStatus(threadId, runId)){
            Thread.sleep(500);
        }
        String assistantResponse = aiService.RetrieveAssistantResponse(threadId);
        String cleanResponse = assistantResponse.replaceAll("```json\\n|\\n```", "");
        System.out.println("Assistant Response: " + cleanResponse);
        aiService.DeleteThread(threadId);
        return new ResponseEntity<String>(cleanResponse, HttpStatus.OK);
    }

    @PostMapping("/WeaknessEvaluator")
    public ResponseEntity<String> EvaluateWeakness(@RequestBody Map<String, String> payload) throws JsonMappingException, JsonProcessingException, InterruptedException {
        String threadId = aiService.CreateThread();
        aiService.AddMessageToThread(threadId, payload.get("message").toString());
        String runId = aiService.CreateAssistantRun(threadId, "asst_T3MNodGzGHRH5stT1MWLES7J");
        while(!aiService.GetAssistantRunStatus(threadId, runId)){
            Thread.sleep(500);
        }
        String assistantResponse = aiService.RetrieveAssistantResponse(threadId);
        String cleanResponse = assistantResponse.replaceAll("```json\\n|\\n```", "");
        System.out.println("Assistant Response: " + cleanResponse);
        aiService.DeleteThread(threadId);
        return new ResponseEntity<String>(cleanResponse, HttpStatus.OK);
    }

    @PostMapping("/PersonalisedQuestionGiver")
    public ResponseEntity<String> GeneratePersonalisedQuestions(@RequestBody Map<String, String> payload) throws JsonMappingException, JsonProcessingException, InterruptedException {
        String threadId = aiService.CreateThread();
        aiService.AddMessageToThread(threadId, payload.get("message").toString());
        String runId = aiService.CreateAssistantRun(threadId, "asst_jDi9EOjUCqarau9eY3x3zYWW");
        while(!aiService.GetAssistantRunStatus(threadId, runId)){
            Thread.sleep(500);
        }
        String assistantResponse = aiService.RetrieveAssistantResponse(threadId);
        String cleanResponse = assistantResponse.replaceAll("```json\\n|\\n```", "");
        System.out.println("Assistant Response: " + cleanResponse);
        aiService.DeleteThread(threadId);
        return new ResponseEntity<String>(cleanResponse, HttpStatus.OK);
    }
}