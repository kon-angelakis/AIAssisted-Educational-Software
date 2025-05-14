package com.stacktrek.stacktrek.Auth;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stacktrek.stacktrek.Users.User;


@Repository
public interface AuthRepo extends MongoRepository<User, ObjectId> {

    public Optional<User> findByEmail(String email);

}
