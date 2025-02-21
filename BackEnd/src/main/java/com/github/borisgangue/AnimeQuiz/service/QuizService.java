package com.github.borisgangue.AnimeQuiz.service;

import com.github.borisgangue.AnimeQuiz.exception.UserNotFoundException;
import com.github.borisgangue.AnimeQuiz.model.Quiz;
import com.github.borisgangue.AnimeQuiz.repository.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    private final QuizRepo quizRepo;

    @Autowired
    public QuizService(QuizRepo quizRepo) {
        this.quizRepo = quizRepo;
    }

    // Find all quiz from the database
    public List<Quiz> findAllQuiz() {
        return quizRepo.findAll();
    }

    // Find quiz by id
    public Quiz findQuizById(Long id) {
        return quizRepo.findById(id).orElseThrow(()-> new UserNotFoundException("User by id " + id + " was not found !"));
    }

    // Add Quiz
    public Quiz addQuiz(Quiz quiz) {
        return quizRepo.save(quiz);
    }

    // Update Quiz
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepo.save(quiz);
    }

    // Delete Quiz
    public void deleteQuiz(Long id) {
        quizRepo.deleteById(id);
    }

}
