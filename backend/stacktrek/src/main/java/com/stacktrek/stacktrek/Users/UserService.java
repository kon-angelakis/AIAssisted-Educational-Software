package com.stacktrek.stacktrek.Users;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User loginedUser = userRepo.findByEmail(email).orElse(null);
        if (loginedUser == null)
            throw new UsernameNotFoundException("User not found");
        return new UserPrincipal(loginedUser);
    }

    public boolean UpdateUserStats(String email, String difficulty, int subjectIndex, int correct, int mistakes, List<String> failedQuestions){
        User user = userRepo.findByEmail(email).orElse(null);
        if(user != null){
            int[][] pastCorrect = user.getCorrect();
            int[] totalCorrect = new int[3];
            int[][] pastMistakes = user.getMistakes();
            int[] totalMistakes = new int[3];
            int[] pastTestsTaken = user.getTestsTaken();
            switch(difficulty){
                case "Easy":
                    if (pastCorrect[0][subjectIndex] < correct)
                        pastCorrect[0][subjectIndex] = correct;
                    pastMistakes[0][subjectIndex] += mistakes;
                    pastTestsTaken[0] += 1;
                    break;
                case "Medium":
                    if (pastCorrect[1][subjectIndex] < correct)
                        pastCorrect[1][subjectIndex] = correct;
                    pastMistakes[1][subjectIndex] += mistakes;
                    pastTestsTaken[1] += 1;
                    break;
                case "Hard":
                    if (pastCorrect[2][subjectIndex] < correct)
                        pastCorrect[2][subjectIndex] = correct;
                    pastMistakes[2][subjectIndex] += mistakes;
                    pastTestsTaken[2] += 1;
                    break;
            }

            //Get the summed score per difficulty to be used to unlock the next category
            for (int dif = 0; dif < 3; dif++) {
                int sum = 0;
                for (int subject = 0; subject < pastCorrect[dif].length; subject++) {
                    sum += pastCorrect[dif][subject];
                }
                totalCorrect[dif] = sum;
                sum = 0;
                for (int subject = 0; subject < pastMistakes[dif].length; subject++) {
                    sum += pastMistakes[dif][subject];
                }
                totalMistakes[dif] = sum;
            }
            user.setTotalCorrect(totalCorrect);
            user.setTotalMistakes(totalMistakes);

            List<String> mergedFailedQuestions = new ArrayList<String>();
            mergedFailedQuestions.addAll(user.getFailedQuestions());
            mergedFailedQuestions.addAll(failedQuestions);

            user.setFailedQuestions(mergedFailedQuestions);
           
            userRepo.save(user);

            return true;
        }
        return false;
    }

    public int[][] GetWeakestSubjects(int[][] mistakes) {
        List<int[]> list = new ArrayList<>();

        for (int i = 0; i < mistakes.length; i++) {
            for (int j = 0; j < mistakes[i].length; j++) {
                list.add(new int[]{i, j, mistakes[i][j]});
            }
        }

        list.sort((a, b) -> Integer.compare(b[2], a[2]));

        int[][] result = new int[3][2];
        for (int k = 0; k < 3 && k < list.size(); k++) {
            result[k][0] = list.get(k)[0];
            result[k][1] = list.get(k)[1];
        }
        return result;
    }
}
