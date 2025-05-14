package com.stacktrek.stacktrek.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;


@Document(collection = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;

    private String firstName;
    private String lastName;

    private String email;
    private String password;

    //Stats
    private int[][] correct =  {{0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0}};
    //Each difficulties number of correct
    private int[] totalCorrect = {0, 0, 0};
    private int[][] mistakes = {{0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0}};
    private int[] totalMistakes = {0, 0, 0};
    private int[] testsTaken = {0, 0, 0};
    //for revision
    private List<String> failedQuestions = new ArrayList<String>();

    @CreatedDate
    private final LocalDateTime date_created = LocalDateTime.now();

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
