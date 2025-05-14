package com.stacktrek.stacktrek.Users;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<String> SubmitScore(@RequestBody Map<String, Object> payload) {
        try {
            // Ensure the required fields are present and cast them safely
            String email = (String) payload.get("email");
            String difficulty = (String) payload.get("difficulty");
            Integer subjectIndex = (Integer) payload.get("subjectIndex");
            Integer score = (Integer) payload.get("score");
            Integer mistakes = (Integer) payload.get("mistakes");
            List<String> failed = (List<String>) payload.get("failed");

            // Check if any required field is missing or invalid
            if (email == null || difficulty == null || subjectIndex == null || score == null || mistakes == null || failed == null) {
                return new ResponseEntity<>("Missing or invalid fields in request", HttpStatus.BAD_REQUEST);
            }

            // Call the service to update user stats
            boolean updated = userService.UpdateUserStats(email, difficulty, subjectIndex, score, mistakes, failed);
            
            if (updated) {
                return new ResponseEntity<>("ok", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("not ok", HttpStatus.BAD_REQUEST);
            }
        } catch (ClassCastException e) {
            // Handle invalid cast exceptions
            return new ResponseEntity<>("Invalid data type in request", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Catch other exceptions
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
