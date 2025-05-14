package com.stacktrek.stacktrek.Security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.stacktrek.stacktrek.Users.User;
import com.stacktrek.stacktrek.Users.UserJwtDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final Key SignedSecretKey;

    @Autowired
    public JwtService() {
        String jwtSecret = "MJiOwH9o7EvK5Myo-DQun0num4gaPKk_f7MdtkNLwrY=";
        SignedSecretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Generate a JWT token for some of the users details using a user DT object
    public String GenerateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        UserJwtDTO userDTO = new UserJwtDTO
        (   
            user.getFirstName(), 
            user.getLastName(), 
            user.getEmail(),
            user.getCorrect(),
            user.getTotalCorrect(),
            user.getMistakes(),
            user.getTotalMistakes(),
            user.getTestsTaken(),
            user.getFailedQuestions()
            
        );
        claims.put("User", userDTO);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(SignedSecretKey)
                .compact();
    }

    // Extract the user details from the received JWT token
    public UserJwtDTO extractUser(String receivedToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SignedSecretKey)
                    .build()
                    .parseClaimsJws(receivedToken)
                    .getBody();

            Map<String, Object> userClaims = claims.get("User", Map.class);

            if (userClaims == null) {
                return null;
            }

            return new UserJwtDTO(
        (String) userClaims.get("firstName"),
        (String) userClaims.get("lastName"),
        (String) userClaims.get("email"),
        ((List<List<Integer>>) userClaims.get("correct")).stream()
        .map(innerList -> innerList.stream().mapToInt(i -> i).toArray())
        .toArray(int[][]::new),
        ((List<Integer>) userClaims.get("totalCorrect")).stream().mapToInt(i -> i).toArray(),
        ((List<List<Integer>>) userClaims.get("mistakes")).stream()
        .map(innerList -> innerList.stream().mapToInt(i -> i).toArray())
        .toArray(int[][]::new),
        ((List<Integer>) userClaims.get("totalMistakes")).stream().mapToInt(i -> i).toArray(),
        ((List<Integer>) userClaims.get("testsTaken")).stream().mapToInt(i -> i).toArray(),
        ((List<String>) userClaims.get("failedQuestions"))
      
);
        } catch (JwtException | ClassCastException e) {
            return null;
        }
    }

    // Validate the received JWT token if it is not expired and the user exists
    public boolean validateToken(String receivedToken, UserDetails userDetails) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(SignedSecretKey)
                    .build()
                    .parseClaimsJws(receivedToken);

            String username = claimsJws.getBody().getSubject();
            return !isTokenExpired(claimsJws.getBody()) && username.equals(userDetails.getUsername());
        } catch (JwtException e) {
            return false;
        }
    }

    private boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

 
}