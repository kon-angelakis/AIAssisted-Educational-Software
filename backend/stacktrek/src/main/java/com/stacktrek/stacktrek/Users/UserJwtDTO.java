package com.stacktrek.stacktrek.Users;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

// DTO class to be used in the jwt token
@Data
@AllArgsConstructor
public class UserJwtDTO {

    private String firstName;
    private String lastName;
    private String email;

    private int[][] correct;
    private int[] totalCorrect;
    private int[][] mistakes;
    private int[] totalMistakes;
    private int[] testsTaken;
    private List<String> failedQuestions;


}
