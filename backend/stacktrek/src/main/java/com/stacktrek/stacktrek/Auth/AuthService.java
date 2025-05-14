package com.stacktrek.stacktrek.Auth;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stacktrek.stacktrek.Security.JwtService;
import com.stacktrek.stacktrek.Users.User;



@Service
public class AuthService {

    private final AuthRepo authRepo;
    private final AuthenticationManager authManager;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwtService;

    @Autowired
    public AuthService(AuthRepo authRepo, AuthenticationManager authManager, BCryptPasswordEncoder encoder, JwtService jwtService) {
        this.authRepo = authRepo;
        this.authManager = authManager;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    //Generates and returns a map of the login status and the jwt token
    public Map<String, Object> Login(String user, String pass) {
        try {
            Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(user, pass));
            String jwt = jwtService.GenerateToken(UserExists(user));
                return Map.of(
                    "status", "Successful",
                    "token", jwt,
                    "details", jwtService.extractUser(jwt),
                    "StatusCode", HttpStatus.OK
                );

        } catch (AuthenticationException e){
            return Map.of(
                "status", "Failed",
                "token", "-",
                "details", "-",
                "StatusCode", HttpStatus.UNAUTHORIZED
            );
        }
    }

    // Save the user in the database
    public void Register(User user) throws IOException {
        user.setPassword(encoder.encode(user.getPassword()));
        authRepo.save(user);
    
    }



    public User UserExists(String user) {
        User loginedUser = authRepo.findByEmail(user).orElse(null);
        return loginedUser;
    }

    public Map<String,Object> RefreshJWT(String user){
        try {
            String jwt = jwtService.GenerateToken(UserExists(user));
                return Map.of(
                    "status", "Successful JWT Refresh",
                    "token", jwt,
                    "details", jwtService.extractUser(jwt),
                    "StatusCode", HttpStatus.OK
                );

        } catch (AuthenticationException e){
            return Map.of(
                "status", "Failed",
                "token", "-",
                "details", "-",
                "StatusCode", HttpStatus.UNAUTHORIZED
            );
        }
    }
    


}
