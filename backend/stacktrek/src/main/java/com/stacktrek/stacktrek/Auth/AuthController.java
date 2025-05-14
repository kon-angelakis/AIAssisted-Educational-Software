package com.stacktrek.stacktrek.Auth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.stacktrek.stacktrek.Security.JwtService;
import com.stacktrek.stacktrek.Users.User;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<?> LoginUser(@RequestBody Map<String, String> payload, HttpServletResponse response) {
        Map<String, Object> userLogined = authService.Login(payload.get("email"), payload.get("password"));
        
        Map<String, Object> responseMap = Map.of(
                "User", payload.get("email"),
                "LoginStatus", userLogined.get("status"),
                "UserDetails", userLogined.get("details")
        );
        response.setHeader("authorization", "Bearer " + userLogined.get("token"));

        // Return the response in a json manner
        return new ResponseEntity<>(responseMap, (HttpStatus) userLogined.get("StatusCode"));
    }

    // Registration
    @PostMapping("/register")
    public ResponseEntity<String> RegisterUser(@RequestBody Map<String, String> payload) {
        try {
            User user = new User(payload.get("firstname"),
                    payload.get("lastname"),
                    payload.get("email"),
                    payload.get("password"));

            if (authService.UserExists(user.getEmail()) == null) {
                authService.Register(user);
                return new ResponseEntity<String>("User registered", HttpStatus.OK);
            }else{
                return new ResponseEntity<String>("User already registered", HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("Unexpected Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/authenticated")
    public ResponseEntity<String> AuthenticationCheck() {
        try{
            return new ResponseEntity<String>("User authorized", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<String>("User needs to login first", HttpStatus.UNAUTHORIZED);
        }
    }

    //used to update the jwt for realtime stats
    @PostMapping("/update")
    public ResponseEntity<?> RunUpdate(@RequestBody Map<String, String> payload, HttpServletResponse response) {
        Map<String, Object> userLogined = authService.RefreshJWT(payload.get("email"));
        
        Map<String, Object> responseMap = Map.of(
                "User", payload.get("email"),
                "LoginStatus", userLogined.get("status"),
                "UserDetails", userLogined.get("details")
        );
        response.setHeader("authorization", "Bearer " + userLogined.get("token"));

        // Return the response in a json manner
        return new ResponseEntity<>(responseMap, (HttpStatus) userLogined.get("StatusCode"));
    }

}